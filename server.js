const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Force no-cache on HTML files, allow caching on assets.js
app.use((req, res, next) => {
  if (req.path.endsWith('.html') || req.path === '/') {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

let state = {
  screen: 'intro',
  scenarioIdx: 0,
  votes: {},
  voters: new Set(),
  totalPlayers: 0,
};

const hosts = new Set();
const players = new Set();

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(c => { if (c.readyState === 1) c.send(msg); });
}

function broadcastHosts(data) {
  const msg = JSON.stringify(data);
  hosts.forEach(c => { if (c.readyState === 1) c.send(msg); });
}

wss.on('connection', (ws, req) => {
  const isHost = req.url.includes('?host');
  if (isHost) { hosts.add(ws); }
  else {
    players.add(ws);
    broadcastHosts({ type: 'playerCount', count: players.size });
  }

  ws.send(JSON.stringify({ type: 'state', state: {
    screen: state.screen,
    scenarioIdx: state.scenarioIdx,
    votes: state.votes,
    totalPlayers: state.totalPlayers
  }}));

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch(e) { return; }

    if (msg.type === 'host_advance' && isHost) {
      state.screen = msg.screen;
      if (msg.screen === 'voting') { state.votes = { 0: 0, 1: 0 }; state.voters = new Set(); }
      if (msg.scenarioIdx !== undefined) state.scenarioIdx = msg.scenarioIdx;
      broadcast({ type: 'state', state: {
        screen: state.screen,
        scenarioIdx: state.scenarioIdx,
        votes: state.votes,
        totalPlayers: state.totalPlayers
      }});
    }

    if (msg.type === 'vote' && !isHost) {
      const pid = msg.playerId;
      if (!state.voters.has(pid) && state.screen === 'voting') {
        state.voters.add(pid);
        state.votes[msg.choice] = (state.votes[msg.choice] || 0) + 1;
        broadcast({ type: 'votes', votes: state.votes, total: state.voters.size });
      }
      ws.send(JSON.stringify({ type: 'voted', choice: msg.choice }));
    }
  });

  ws.on('close', () => {
    if (isHost) { hosts.delete(ws); }
    else {
      players.delete(ws);
      broadcastHosts({ type: 'playerCount', count: players.size });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`God's Draft Day live on port ${PORT}`));
