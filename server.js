// Dare to Be a Daniel — live phone quiz (Kahoot-style)
// Projector:  https://YOUR-APP.onrender.com/host
// Phones:     https://YOUR-APP.onrender.com   (or scan the QR on the host screen)

const express = require("express");
const http = require("http");
const path = require("path");
const { WebSocketServer } = require("ws");
const QRCode = require("qrcode");
const deck = require("./deck");

const QUESTION_SECONDS = 25;   // time per question (younger kids → generous)
const MAX_POINTS = 1000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const noCache = (res) => res.set("Cache-Control", "no-cache, no-store, must-revalidate");
app.get("/", (req, res) => { noCache(res); res.sendFile(path.join(__dirname, "index.html")); });
app.get(["/host", "/host.html"], (req, res) => { noCache(res); res.sendFile(path.join(__dirname, "host.html")); });
app.get("/qr.svg", async (req, res) => {
  const proto = (req.headers["x-forwarded-proto"] || req.protocol || "http").split(",")[0];
  const svg = await QRCode.toString(`${proto}://${req.headers.host}/`, { type: "svg", margin: 1, color: { dark: "#0b1430", light: "#ffffff" } });
  res.type("image/svg+xml").send(svg);
});
app.get(["/review", "/review.html"], (req, res) => { noCache(res); res.sendFile(path.join(__dirname, "review.html")); });
app.get("/deck.json", (req, res) => { noCache(res); res.json(deck); });
app.get("/dura.js", (req, res) => res.sendFile(path.join(__dirname, "dura.js")));
app.get("/dura.svg", (req, res) => res.type("image/svg+xml").send(require("./dura")()));
app.get("/healthz", (req, res) => res.send("ok"));

// ── game state ─────────────────────────────────────────────
let phase = "lobby";      // lobby | item | reveal | leaderboard | final
let idx = -1;
let deadline = 0;
let timer = null;
let answers = new Map();  // playerId -> { choice, points }
const players = new Map(); // id -> { id, name, icon, score, lastGain, connected, ws }
const hosts = new Set();

const cur = () => deck[idx];
const isScored = (it) => it && it.type === "q";
const isAsk = (it) => it && (it.type === "q" || it.type === "poll");
const questionNumber = () => deck.slice(0, idx + 1).filter((d) => d.type === "q").length;
const totalQuestions = deck.filter((d) => d.type === "q").length;

function send(ws, msg) { if (ws && ws.readyState === 1) ws.send(JSON.stringify(msg)); }

function roster() {
  return [...players.values()]
    .map(({ id, name, icon, score, lastGain, connected }) => ({ id, name, icon, score, lastGain, connected }))
    .sort((a, b) => b.score - a.score);
}

function counts() {
  const c = [0, 0, 0, 0];
  answers.forEach((a) => { if (c[a.choice] !== undefined) c[a.choice]++; });
  return c;
}

function hostView() {
  const it = cur();
  return {
    type: "state", phase, idx, deckLength: deck.length,
    item: it || null,
    qNum: questionNumber(), qTotal: totalQuestions,
    deadline, seconds: QUESTION_SECONDS, now: Date.now(),
    counts: counts(), answered: answers.size,
    players: roster(),
  };
}

function playerView(p) {
  const it = cur();
  const base = { type: "state", phase, now: Date.now(), deadline, me: p ? { name: p.name, icon: p.icon, score: p.score } : null };
  if (phase === "leaderboard" || phase === "final") {
    const r = roster();
    const rank = p ? r.findIndex((x) => x.id === p.id) + 1 : 0;
    return { ...base, rank, of: r.length, top: r.slice(0, 3).map(({ name, icon, score }) => ({ name, icon, score })) };
  }
  if (phase === "lobby" || !it) return base;
  if (phase === "item") {
    if (it.type === "story") return { ...base, kind: "story", title: it.title };
    const a = p && answers.get(p.id);
    return { ...base, kind: it.type, question: it.question, answers: it.answers, qNum: questionNumber(), qTotal: totalQuestions, myChoice: a ? a.choice : null };
  }
  if (phase === "reveal") {
    if (!isAsk(it)) return { ...base, kind: "story" };
    const a = p && answers.get(p.id);
    const r = roster();
    const rank = p ? r.findIndex((x) => x.id === p.id) + 1 : 0;
    return {
      ...base, kind: it.type, myChoice: a ? a.choice : null,
      correct: it.type === "q" ? it.correct : null,
      correctText: it.type === "q" ? it.answers[it.correct] : null,
      gained: a ? a.points : 0, rank, of: r.length,
    };
  }
  if (phase === "leaderboard" || phase === "final") {
    const r = roster();
    const rank = p ? r.findIndex((x) => x.id === p.id) + 1 : 0;
    return { ...base, rank, of: r.length, top: r.slice(0, 3).map(({ name, icon, score }) => ({ name, icon, score })) };
  }
  return base;
}

function broadcast() {
  const hv = hostView();
  hosts.forEach((ws) => send(ws, hv));
  players.forEach((p) => send(p.ws, playerView(p)));
}

function clearTimer() { if (timer) { clearTimeout(timer); timer = null; } }

function goTo(i) {
  clearTimer();
  idx = i;
  answers = new Map();
  players.forEach((p) => (p.lastGain = 0));
  if (idx >= deck.length) { phase = "final"; deadline = 0; return broadcast(); }
  phase = "item";
  const it = cur();
  if (isAsk(it)) {
    deadline = Date.now() + QUESTION_SECONDS * 1000;
    timer = setTimeout(reveal, QUESTION_SECONDS * 1000 + 300);
  } else deadline = 0;
  broadcast();
}

function reveal() {
  clearTimer();
  if (phase !== "item" || !isAsk(cur())) return;
  phase = "reveal";
  deadline = 0;
  broadcast();
}

function next() {
  const it = cur();
  if (phase === "lobby") return goTo(0);
  if (phase === "item" && isAsk(it)) return reveal();
  // after a scored question's reveal, flash the leaderboard every 3 questions
  if (phase === "reveal" && isScored(it) && questionNumber() % 3 === 0 && questionNumber() < totalQuestions) {
    phase = "leaderboard"; return broadcast();
  }
  return goTo(idx + 1);
}

function restart() {
  clearTimer();
  phase = "lobby"; idx = -1; deadline = 0; answers = new Map();
  players.forEach((p) => { p.score = 0; p.lastGain = 0; });
  broadcast();
}

function handleAnswer(p, choice) {
  const it = cur();
  if (phase !== "item" || !isAsk(it) || answers.has(p.id)) return;
  if (!(choice >= 0 && choice < it.answers.length)) return;
  let points = 0;
  if (it.type === "q" && choice === it.correct) {
    const left = Math.max(0, deadline - Date.now()) / (QUESTION_SECONDS * 1000);
    points = Math.round(MAX_POINTS * (0.5 + 0.5 * left));
  }
  answers.set(p.id, { choice, points });
  p.score += points;
  p.lastGain = points;
  const connected = [...players.values()].filter((x) => x.connected).length;
  if (answers.size >= connected && connected > 0) return reveal();
  broadcast();
}

wss.on("connection", (ws, req) => {
  const isHost = (req.url || "").includes("host");
  let me = null;
  if (isHost) { hosts.add(ws); send(ws, hostView()); }
  else send(ws, playerView(null));

  ws.on("message", (raw) => {
    let m; try { m = JSON.parse(raw); } catch { return; }
    if (isHost) {
      if (m.type === "next") next();
      else if (m.type === "reveal") reveal();
      else if (m.type === "back" && idx > 0) goTo(idx - 1);
      else if (m.type === "restart") restart();
      else if (m.type === "kick" && players.has(m.id)) { const p = players.get(m.id); send(p.ws, { type: "kicked" }); players.delete(m.id); broadcast(); }
      return;
    }
    if (m.type === "join") {
      const id = String(m.id || "").slice(0, 40) || Math.random().toString(36).slice(2);
      const name = String(m.name || "").trim().slice(0, 16) || "Player";
      const icon = String(m.icon || "🦁").slice(0, 8);
      me = players.get(id) || { id, score: 0, lastGain: 0 };
      Object.assign(me, { name, icon, ws, connected: true });
      players.set(id, me);
      send(ws, { type: "joined", id });
      broadcast();
    } else if (m.type === "answer" && me) {
      handleAnswer(me, Number(m.choice));
    }
  });

  ws.on("close", () => {
    if (isHost) hosts.delete(ws);
    else if (me && me.ws === ws) { me.connected = false; broadcast(); }
  });
});

// keep connections alive through Render's proxy
setInterval(() => wss.clients.forEach((c) => { try { c.ping(); } catch {} }), 25000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Dare to Be a Daniel running on :${PORT}  (host: /host)`));
