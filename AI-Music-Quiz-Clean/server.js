import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
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

app.listen(port, () => {
  console.log(`AI Music Quiz Studio running at http://localhost:${port}`);
});
