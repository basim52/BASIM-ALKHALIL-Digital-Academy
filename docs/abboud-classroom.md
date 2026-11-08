# Abboud's optional voice classroom

Entry: Sara's existing “عبود المعلّم” tool (also available in Sara's board). It remains lazy-loaded. The opening screen shows Badr and Reem, their desks, a blackboard, and the teacher's microphone. No typed onboarding or canned explanation chips.

## Interaction and boundaries

- Abboud clicks the mic; Web Speech produces a transcript, never a fabricated “heard” event. Arabic/English recognition can be selected. Final speech is sent automatically on recognition end. Typing is hidden until explicitly opened.
- Existing server-side AI receives the actual latest speech and bounded full conversation. It evaluates the explanation, Badr's pending question, or Reem's specific error. Wrong/off-topic answers retain the same stage with a short Sara hint.
- Students speak sequentially through existing `/api/tts` and the shared audio manager. Completion waits for `ended`, not TTS fetch completion. Cloud voice failure attempts browser speech with a visible notice; playback failures are visible and replayable. Browser voices may not distinguish characters.
- Five lessons: greetings/names, colors/objects, all numbers 1–10/plurals, simple sentences, review. Review additionally requires Abboud's two different questions, answered by Badr and Reem in turn.
- Invalid/unavailable AI returns HTTP 503 without student responses, verdict, progress, or fallback success. Client validates replies too. A generated misconception must include distinct incorrect/correct phrases and the incorrect phrase must appear in Reem's utterance.
- Stop, close, lesson/student switch, and unmount abort recognition and requests, silence owned audio, release pending playback, revoke audio object URLs, and invalidate late results. No polling. Network/playback watchdogs are not student time limits.
- Activity completion is idempotent, device-local and scoped to UID (`abboud-classroom:v2:<uid>`). Guests are not persisted. No XP, certificates, main Sara progress or Firestore writes. Legacy hard-coded progress is not migrated because it could represent simulated success.
- Existing auth/rate-limit middleware is unchanged, including the pre-existing anonymous route exception. No new API keys/services, client secrets, Firebase rules, payment/auth, camera, call, or curriculum changes.

## Automated checks

```
npm run test:abboud
npx tsc --noEmit
npm run build
```

Tests use real React DOM in jsdom, real HTTP handler requests, protocol/state logic, and the real audio queue. Only external AI, Web Speech, TTS, and media hardware are mocked. Covered: opening screen, typed opt-in, voice explanation/answer/correction, review questions, bad teaching, malformed/unavailable AI, mic permissions/no-speech, audio ordering/errors, mute/replay, cleanup, stale replies, UID isolation and no XP effects.

Build verification can avoid external translation calls by unsetting `GEMINI_API_KEY`, `GOOGLE_GENAI_API_KEY`, `GOOGLE_API_KEY`, `API_KEY`, and `FIREBASE_SERVICE_ACCOUNT`. Existing pretranslation scripts rewrite generated UI/trigram artifacts; do not include those unrelated artifacts in this change.

## Manual verification still needed

No physical microphone/speaker or production AI credentials were exercised in automated tests; real model teaching accuracy remains a model-dependent boundary.

Run `npm run dev -- --port 3187` locally, open `http://localhost:3187`, sign in normally and enter Sara → عبود المعلّم. Confirm both students are visible before interacting. Test Arabic and English speech, actual grounded AI replies, deliberate wrong teaching/correction retries, two-question review, real sequential voices, denied permissions, unsupported browser, blocked playback, stop/mute/replay, switch/close during speech, and student isolation. Check a narrow/mobile viewport as well. HTTPS or localhost is required for microphone permission. Without existing server AI credentials, a truthful unavailable error is expected; do not describe that as successful live AI interaction.

## Verification record

- `npm run test:abboud`: 20 tests passed (external AI/voice/hardware mocked).
- `npx tsc --noEmit`: passed.
- `npm run build`: passed with existing large-chunk warnings. Activity remains a separate small lazy chunk; jsdom is dev-only.
- Full local server at port 3187: root HTTP 200; actual registered classroom endpoint returns HTTP 503 `AI_UNAVAILABLE` without credentials, and HTTP 400 `INVALID_REQUEST` for blank speech. No success-shaped fallback.
- No GUI screenshot, real microphone/audio device, production AI/TTS, or deployment was verified. Existing dependency audit reports 63 findings (2 low, 48 moderate, 11 high, 2 critical), unchanged in count after adding the DOM test dependency; unrelated dependency remediation is not included.
