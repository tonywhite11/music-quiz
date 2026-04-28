# AI Music Quiz Studio

Standalone version of the Hugging Face music quiz concept with the Reachy/robot dependency removed.

## What changed

- Removed Reachy Mini login, robot SDK import, robot WebRTC audio routing, robot profiles, and robot-only backend files.
- Kept the browser music quiz flow, Deezer preview lookup, scoring, timer, visualizer, voice input, and AI theme mode.
- Moved OpenAI calls behind a local Express server so your API key is not exposed in browser JavaScript.
- Replaced robot branding with a browser-only AI DJ visual style.
- Scores are saved locally in the browser instead of requiring Hugging Face login.

## Models/services used

- Deezer public search endpoint for 30-second music previews.
- OpenAI text model for AI-generated theme track lists and spoken-theme classification.
- OpenAI TTS for the optional voice host.
- Browser SpeechRecognition for voice input.

Defaults are in `.env.example`:

```env
OPENAI_TEXT_MODEL=gpt-4o-mini
OPENAI_TTS_MODEL=tts-1
OPENAI_TTS_VOICE=nova
```

## Run locally

```bash
npm install
copy .env.example .env
npm start
```

Then open:

```text
http://localhost:3000
```

On Mac/Linux, use:

```bash
cp .env.example .env
```

Paste your OpenAI API key into `.env` before using AI mode.

## Notes

Free mode works without an OpenAI key. AI mode requires the server and a valid `OPENAI_API_KEY`.

The original project was Apache-2.0 licensed, so the original `LICENSE` file is preserved in `public/LICENSE`.
