import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = createServer(app);
const io = new IOServer(httpServer);
const port = Number(process.env.PORT || 3000);

const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;
const textModel = process.env.OPENAI_TEXT_MODEL || 'gpt-4o-mini';
const ttsModel = process.env.OPENAI_TTS_MODEL || 'tts-1';
const ttsVoice = process.env.OPENAI_TTS_VOICE || 'nova';

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function requireOpenAI(res) {
  if (!openai) {
    res.status(500).json({ error: 'OPENAI_API_KEY is missing. Copy .env.example to .env and add your key.' });
    return false;
  }
  return true;
}

function safeParseTracks(text) {
  const trimmed = text.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
  const parsed = JSON.parse(trimmed);
  if (!Array.isArray(parsed)) throw new Error('AI did not return an array');
  return parsed
    .map((x) => ({ a: String(x.a || '').trim(), t: String(x.t || '').trim() }))
    .filter((x) => x.a && x.t)
    .slice(0, 12);
}

app.post('/api/generate-tracks', async (req, res) => {
  if (!requireOpenAI(res)) return;
  const theme = String(req.body?.theme || '').trim().slice(0, 80);
  if (!theme) return res.status(400).json({ error: 'Theme is required.' });
  try {
    const completion = await openai.chat.completions.create({
      model: textModel,
      messages: [
        {
          role: 'system',
          content: 'You are a music expert. Generate exactly 12 well-known songs for the given theme. Return ONLY valid JSON array, no markdown: [{"a":"Artist","t":"Title"}]. No explanation.'
        },
        { role: 'user', content: `Theme: ${theme}` }
      ],
      max_tokens: 700,
      temperature: 0.8
    });
    const tracks = safeParseTracks(completion.choices?.[0]?.message?.content || '[]');
    if (tracks.length < 6) throw new Error('Not enough usable tracks returned.');
    res.json({ tracks });
  } catch (error) {
    console.error('/api/generate-tracks', error);
    res.status(500).json({ error: 'Could not generate tracks.' });
  }
});

app.post('/api/classify-theme', async (req, res) => {
  if (!requireOpenAI(res)) return;
  const transcript = String(req.body?.transcript || '').trim().slice(0, 200);
  const themes = Array.isArray(req.body?.themes) ? req.body.themes : [];
  if (!transcript || !themes.length) return res.json({ id: 'none' });
  const themeList = themes.map((t) => `${t.id}: ${t.label}`).join('; ');
  try {
    const completion = await openai.chat.completions.create({
      model: textModel,
      messages: [{ role: 'user', content: `Themes: ${themeList}. User said: "${transcript}". Reply with only the exact theme ID or "none".` }],
      max_tokens: 15,
      temperature: 0
    });
    const id = String(completion.choices?.[0]?.message?.content || 'none').toLowerCase().replace(/[^a-z0-9]/g, '');
    res.json({ id });
  } catch (error) {
    console.error('/api/classify-theme', error);
    res.json({ id: 'none' });
  }
});

app.post('/api/tts', async (req, res) => {
  if (!requireOpenAI(res)) return;
  const text = String(req.body?.text || '').trim().slice(0, 600);
  if (!text) return res.status(400).json({ error: 'Text is required.' });
  try {
    const speech = await openai.audio.speech.create({
      model: ttsModel,
      voice: ttsVoice,
      input: text,
      response_format: 'mp3'
    });
    const buffer = Buffer.from(await speech.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(buffer);
  } catch (error) {
    console.error('/api/tts', error);
    res.status(500).json({ error: 'Could not generate speech.' });
  }
});

// ── Multiplayer rooms ────────────────────────────────────────────────────────

const rooms     = new Map(); // code → room
const sockRoom  = new Map(); // socketId → code
const ROOM_ROUNDS   = 10;
const ROOM_DURATION = 30;   // seconds per round
const REVEAL_PAUSE  = 8000; // ms before auto-advance

function genCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = '';
  for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return rooms.has(c) ? genCode() : c;
}

// Fuzzy match – mirrors game.js exactly
function norm(s) {
  return String(s).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}
function lev(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}
function answerOk(guess, answer) {
  const g = norm(guess), a = norm(answer);
  if (!g || !a) return false;
  if (g === a) return true;
  if (a.length >= 4 && g.includes(a)) return true;
  if (a.length >= 4 && a.includes(g) && g.length >= Math.floor(a.length * 0.6)) return true;
  const tol = a.length <= 5 ? 1 : a.length <= 10 ? 2 : 3;
  return lev(g, a) <= tol;
}
function speedBonus(elapsed) {
  return elapsed <= 10 ? 20 : elapsed <= 20 ? 10 : elapsed <= 25 ? 5 : 0;
}

function getScores(room) {
  const arr = [];
  room.players.forEach((p, id) =>
    arr.push({ id, name: p.name, avatar: p.avatar, score: p.score }));
  return arr.sort((a, b) => b.score - a.score);
}

function broadcastPlayers(room) {
  const players = [];
  room.players.forEach((p, id) =>
    players.push({ id, name: p.name, avatar: p.avatar, isHost: id === room.hostId, score: p.score }));
  io.to(room.code).emit('players-update', { players });
}

function startRound(room) {
  if (room.round >= room.tracks.length || room.round >= ROOM_ROUNDS) {
    endGame(room); return;
  }
  room.phase        = 'playing';
  room.roundAnswers = new Map();
  room.roundStartTime = Date.now();
  const tr = room.tracks[room.round];
  io.to(room.code).emit('round-start', {
    round:      room.round + 1,
    total:      Math.min(ROOM_ROUNDS, room.tracks.length),
    previewUrl: tr.previewUrl,
    startedAt:  room.roundStartTime,
  });
  room.roundTimer = setTimeout(() => endRound(room), ROOM_DURATION * 1000);
}

function endRound(room) {
  if (room.roundTimer) { clearTimeout(room.roundTimer); room.roundTimer = null; }
  if (room.phase !== 'playing') return;
  room.phase = 'revealing';
  const tr = room.tracks[room.round];
  const results = [];
  room.players.forEach((p, id) => {
    const ans = room.roundAnswers.get(id) || { artistOk: false, titleOk: false, pts: 0 };
    results.push({ id, name: p.name, avatar: p.avatar, artistOk: ans.artistOk, titleOk: ans.titleOk, pts: ans.pts });
  });
  io.to(room.code).emit('round-end', {
    round:         room.round + 1,
    correctArtist: tr.src ?? tr.a,
    correctTitle:  tr.t,
    cover:         tr.cover || null,
    results,
    scores:        getScores(room),
  });
  room.round++;
  const hasMore = room.round < Math.min(ROOM_ROUNDS, room.tracks.length);
  room.roundTimer = setTimeout(() => {
    if (room.phase === 'revealing') {
      hasMore ? startRound(room) : endGame(room);
    }
  }, REVEAL_PAUSE);
}

function endGame(room) {
  if (room.roundTimer) { clearTimeout(room.roundTimer); room.roundTimer = null; }
  room.phase = 'gameover';
  io.to(room.code).emit('game-end', { scores: getScores(room) });
  setTimeout(() => rooms.delete(room.code), 5 * 60 * 1000);
}

io.on('connection', socket => {

  socket.on('create-room', ({ name }) => {
    const safeName = String(name || 'Player').trim().replace(/[<>"']/g, '').slice(0, 20) || 'Player';
    const code = genCode();
    const room = {
      code, hostId: socket.id,
      players:      new Map([[socket.id, { name: safeName, score: 0, avatar: '🎧' }]]),
      tracks: [], theme: null, round: 0, phase: 'lobby',
      roundAnswers: new Map(), roundTimer: null, roundStartTime: null,
    };
    rooms.set(code, room);
    sockRoom.set(socket.id, code);
    socket.join(code);
    socket.emit('room-created', {
      code,
      players: [{ id: socket.id, name: safeName, avatar: '🎧', isHost: true, score: 0 }],
    });
  });

  socket.on('join-room', ({ code, name }) => {
    const c = String(code || '').toUpperCase().trim().slice(0, 4);
    const n = String(name || 'Player').trim().replace(/[<>"']/g, '').slice(0, 20) || 'Player';
    const room = rooms.get(c);
    if (!room)                   return socket.emit('error', { message: 'Room not found. Check the code.' });
    if (room.phase !== 'lobby')  return socket.emit('error', { message: 'Game already in progress.' });
    if (room.players.size >= 8)  return socket.emit('error', { message: 'Room is full (max 8).' });
    room.players.set(socket.id, { name: n, score: 0, avatar: '🎵' });
    sockRoom.set(socket.id, c);
    socket.join(c);
    const players = [];
    room.players.forEach((p, id) =>
      players.push({ id, name: p.name, avatar: p.avatar, isHost: id === room.hostId, score: p.score }));
    socket.emit('room-joined', { code: c, players, isHost: false });
    socket.to(c).emit('players-update', { players });
  });

  socket.on('start-game', ({ tracks, theme }) => {
    const code = sockRoom.get(socket.id);
    if (!code) return;
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id || room.phase !== 'lobby') return;
    if (!Array.isArray(tracks) || tracks.length < 1)
      return socket.emit('error', { message: 'No tracks available. Try a different theme.' });

    room.tracks = tracks
      .filter(t => t && typeof t.previewUrl === 'string' && t.previewUrl.startsWith('https://'))
      .map(t => ({
        a:          String(t.a   || '').slice(0, 100),
        t:          String(t.t   || '').slice(0, 100),
        src:        t.src ? String(t.src).slice(0, 100) : undefined,
        previewUrl: t.previewUrl,
        cover:      typeof t.cover === 'string' && t.cover.startsWith('https://') ? t.cover : null,
      }))
      .slice(0, ROOM_ROUNDS + 3);

    if (room.tracks.length < 1)
      return socket.emit('error', { message: 'No valid previews found. Try a different theme.' });

    room.theme = theme
      ? { id: String(theme.id || ''), label: String(theme.label || ''), emoji: String(theme.emoji || '') }
      : null;
    room.round = 0;
    room.players.forEach(p => { p.score = 0; });

    io.to(code).emit('game-start', {
      themeId:     room.theme?.id     || '',
      themeLabel:  room.theme?.label  || 'Music Quiz',
      themeEmoji:  room.theme?.emoji  || '🎵',
      totalRounds: Math.min(ROOM_ROUNDS, room.tracks.length),
    });
    room.phase = 'starting';
    setTimeout(() => startRound(room), 2000);
  });

  socket.on('submit-answer', ({ artist, title }) => {
    const code = sockRoom.get(socket.id);
    if (!code) return;
    const room = rooms.get(code);
    if (!room || room.phase !== 'playing' || room.roundAnswers.has(socket.id)) return;
    const tr = room.tracks[room.round];
    if (!tr) return;
    const elapsed   = (Date.now() - room.roundStartTime) / 1000;
    const artistAns = tr.src ?? tr.a;
    const artistOk  = answerOk(String(artist || ''), artistAns);
    const titleOk   = answerOk(String(title  || ''), tr.t);
    let pts = 0;
    if (artistOk) pts += 50;
    if (titleOk)  pts += 50;
    if (artistOk || titleOk) pts += speedBonus(elapsed);
    room.roundAnswers.set(socket.id, { artistOk, titleOk, pts });
    room.players.get(socket.id).score += pts;
    socket.emit('answer-result', { artistOk, titleOk, pts });
    io.to(code).emit('score-update', {
      scores:        getScores(room),
      answeredCount: room.roundAnswers.size,
      totalPlayers:  room.players.size,
    });
    if (room.roundAnswers.size >= room.players.size) endRound(room);
  });

  socket.on('skip-round', () => {
    const code = sockRoom.get(socket.id);
    if (!code) return;
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id || room.phase !== 'playing') return;
    endRound(room);
  });

  socket.on('next-round', () => {
    const code = sockRoom.get(socket.id);
    if (!code) return;
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id || room.phase !== 'revealing') return;
    if (room.roundTimer) { clearTimeout(room.roundTimer); room.roundTimer = null; }
    room.round < Math.min(ROOM_ROUNDS, room.tracks.length) ? startRound(room) : endGame(room);
  });

  socket.on('disconnect', () => {
    const code = sockRoom.get(socket.id);
    sockRoom.delete(socket.id);
    if (!code) return;
    const room = rooms.get(code);
    if (!room) return;
    room.players.delete(socket.id);
    if (room.players.size === 0) {
      if (room.roundTimer) clearTimeout(room.roundTimer);
      rooms.delete(code); return;
    }
    if (room.hostId === socket.id) {
      room.hostId = room.players.keys().next().value;
      io.to(code).emit('host-changed', { hostId: room.hostId });
    }
    broadcastPlayers(room);
    if (room.phase === 'playing' && room.roundAnswers.size >= room.players.size) endRound(room);
  });
});

httpServer.listen(port, () => {
  console.log(`AI Music Quiz Studio running at http://localhost:${port}`);
});
