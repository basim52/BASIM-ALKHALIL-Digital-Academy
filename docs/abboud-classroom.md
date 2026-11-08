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

## Serverless/audio repair and interactive board follow-up

### Reproduced cause

A safe production POST with blank teacher speech and a GET to the same endpoint both returned HTTP 500 `FUNCTION_INVOCATION_FAILED` before request validation. The native-ESM regression (unbundled transpilation of the actual `api/index.ts` dependency graph, then Node 24 import) reproduced `ERR_MODULE_NOT_FOUND` for `src/server/abboudTeacher`, imported extensionlessly by `routes.ts`. The new handler also imported protocol/curriculum extensionlessly. `tsx` and the bundled local build hid this defect. All three imports now use `.js`, matching the existing serverless entrypoint/import convention. After repair, the same native entrypoint boots: blank speech 400, unavailable provider 503, health 200 and unauthenticated TTS 401. Production logs were not available, so the remote stack itself was not retrieved; the startup defect is directly reproduced locally, not inferred as a microphone permission failure.

### Audio and response contract

- Existing AI provider, auth wrapper, TTS endpoint, voices and shared audio manager are retained; no auth/environment/payment/rules changes.
- Provider requests now include a structured JSON schema. Malformed/schema-invalid AI is HTTP 502; provider failure remains 503. Diagnostics log only event/kind/stage/session, never speech, credentials or provider error contents. Client distinguishes startup, auth, rate-limit and response errors while retaining speech and progress truthfully.
- The activity keeps at most eight cloud audio clips and eight native-fallback keys in instance memory. After an autoplay-blocked first attempt, clicking replay calls `audio.play()`/native `speak()` synchronously in that click, rather than losing activation behind another TTS request. Cache is neither persistent nor shared between students; it is collected with the activity instance. Initial playback may still require a replay gesture on restrictive browsers. No physical-device claim is made.

### Interactive board

The board reuses Sara's lightweight `BoardAction` → `toToolCalls` model, not its heavy tldraw/editor, call logic or progress machinery. It shows the actual submitted explanation (clearly unverified while AI is unavailable), selectable words/sentences, literal color swatches and bounded counts from English/Arabic number words or digits. No preset lesson examples are substituted.

Tap an actual word/sentence, then read that exact text or ask Badr/Reem to apply it through the same AI endpoint. Board focus is validated against the actual teacher source/history; replies must match the selected speaker (or Sara for a correction). This exploration has separate response state and cannot replace the lesson's pending question, advance its stage, grant completion/XP, or leak into another student's session. Reem's controlled error is explicitly labeled as a mistake; the correction is revealed only after Abboud's correction passes evaluation. Source, replies, highlights and pending requests reset on lesson/student changes.

The CI workflow now runs `npm run test:abboud` under Node 24 (matching the Vercel project and jsdom's supported engine), including the native-serverless regression; a successful bundled Vite build alone is no longer the only API startup check.

Follow-up verification: clean `npm ci --ignore-scripts`; 30/30 behavior tests passed; final `npx tsc --noEmit` passed; final credential-free production build passed with the existing large-chunk warnings. No physical microphone/speaker, production-provider success, GUI screenshot, merge or deployment was verified/performed for this follow-up. Existing audit findings remain 63. No new dependencies were added.
