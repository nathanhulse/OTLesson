const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static(path.join(__dirname, 'public')));

// Game state
let state = {
  screen: 'intro',      // intro | scenario | voting | results | reveal | scripture
  scenarioIdx: 0,
  votes: {},            // { 0: count, 1: count }
  voters: new Set(),    // track who voted
  totalPlayers: 0,
};

const hosts = new Set();
const players = new Set();

function broadcast(data, exclude = null) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(c => {
    if (c !== exclude && c.readyState === 1) c.send(msg);
  });
}

function broadcastPlayers(data) {
  const msg = JSON.stringify(data);
  players.forEach(c => { if (c.readyState === 1) c.send(msg); });
}

function broadcastHosts(data) {
  const msg = JSON.stringify(data);
  hosts.forEach(c => { if (c.readyState === 1) c.send(msg); });
}

wss.on('connection', (ws, req) => {
  const isHost = req.url.includes('?host');
  if (isHost) {
    hosts.add(ws);
  } else {
    players.add(ws);
    state.totalPlayers++;
    broadcastHosts({ type: 'playerCount', count: players.size });
  }

  // Send current state to new connection
  ws.send(JSON.stringify({ type: 'state', state }));

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch(e) { return; }

    if (msg.type === 'host_advance' && isHost) {
      state.screen = msg.screen;
      if (msg.screen === 'voting') {
        state.votes = { 0: 0, 1: 0 };
        state.voters = new Set();
      }
      if (msg.scenarioIdx !== undefined) state.scenarioIdx = msg.scenarioIdx;
      broadcast({ type: 'state', state });
    }

    if (msg.type === 'vote' && !isHost) {
      const pid = msg.playerId;
      if (!state.voters.has(pid) && state.screen === 'voting') {
        state.voters.add(pid);
        state.votes[msg.choice] = (state.votes[msg.choice] || 0) + 1;
        broadcast({ type: 'votes', votes: state.votes, total: state.voters.size });
      }
      // Confirm back to voter
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
