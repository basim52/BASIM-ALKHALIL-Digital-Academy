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

The board reuses Sara's lightweight `BoardAction` → `toToolCalls` model, not its heavy tldraw/editor, call logic or progress machinery. It shows the actual submitted explanation (clearly unverified while AI is unavailable), selectable words/sentences, literal color swatches and bounded counts from English/Arabic number words or digits. Preset lesson content is never substituted for his explanation; since the lesson-board follow-up, the reviewed lesson reference sits above it (see the next section).

Tap an actual word/sentence, then read that exact text or ask Badr/Reem to apply it through the same AI endpoint. Board focus is validated against the actual teacher source/history; replies must match the selected speaker (or Sara for a correction). This exploration has separate response state and cannot replace the lesson's pending question, advance its stage, grant completion/XP, or leak into another student's session. Reem's controlled error is explicitly labeled as a mistake; the correction is revealed only after Abboud's correction passes evaluation. Source, replies, highlights and pending requests reset on lesson/student changes.

The CI workflow now runs `npm run test:abboud` under Node 24 (matching the Vercel project and jsdom's supported engine), including the native-serverless regression; a successful bundled Vite build alone is no longer the only API startup check.

Follow-up verification: clean `npm ci --ignore-scripts`; 30/30 behavior tests passed; final `npx tsc --noEmit` passed; final credential-free production build passed with the existing large-chunk warnings. No physical microphone/speaker, production-provider success, GUI screenshot, merge or deployment was verified/performed for this follow-up. Existing audit findings remain 63. No new dependencies were added.

## Teacher stars, Sara's praise, chosen topics, parent summary and 15 lessons

- **Lessons:** 15 fixed beginner lessons. 1–5 are unchanged: lesson 5 is still the review of 1–4, with two review questions. 6–15 are animals, family, food and drinks, body parts, clothes, weather, days of the week, school, feelings and daily actions. All use the same structure: words, an English rule, and explain → answer → correct. Phones get a grouped native select; wider screens get one horizontally scrolling chip row, so the board keeps its height.
- **Controlled errors:** one per lesson, alternating. Reem errs in odd lessons; Badr errs in even ones (Badr acknowledges and applies in a single turn). The erring student comes from the lesson id, not from the AI. The error must appear verbatim in that student's turn. Sara's board shows it as «محاولة … (غير مؤكدة)» until Abboud's correction passes the AI check.
- **Stars** (two kinds, at most one of each per lesson; replays never add more):
  - Explanation star: the AI may add `understood.concept`. The client and server both keep it only if it is a whole phrase from Abboud's actual words and Badr says it.
  - Correction star: the correct-stage verdict must be accurate, and the erring student must say the corrected form without the error.
- **Sara's praise:** only on the turn that closes the lesson. `praise.quote` must be Abboud's own words, and `tip` must be a single sentence. Sara's spoken and written turn is then rebuilt deterministically from the validated praise (idempotent on re-validation). Ungrounded praise is dropped rather than invented.
- **«درس من اختياري»** (`sessionId` 16):
  - Abboud says the topic with the same continuous mic, or types it; ideas are suggested.
  - `sanitizeTopic` strips markup and symbols, caps it at 40 characters, and refuses unsuitable themes as whole words, so «كرة القدم» is not «دم». Unsuitable topics get a gentle redirect.
  - The server re-checks the topic (400 if unsuitable) and sends it only as untrusted payload data, never in the instructions. The AI is also told to redirect unsuitable talk with an off-topic reply.
  - Custom lessons never count toward fixed-lesson progress or the certificate.
- **Parent summary:** after each lesson the activity shows:
  - what he explained;
  - the English words he used;
  - how many of his turns contained English;
  - stars earned this run;
  - Sara's tip.

  The last 10 summaries are kept, and the parent can share them with Web Share or copy them; if neither works, a manual-copy box appears. Nothing is sent automatically.
- **Certificate «معلّم صغير»:** appears after all 15 fixed lessons. The name is editable and defaults to «عبود»: the activity is not given the profile name, and Sara's components were intentionally left untouched. It can be printed (print CSS shows only the certificate) or saved as a PNG drawn with the plain 2D canvas, with no libraries.
- **Separation:** stars, the certificate name and summaries are stored only in this device's localStorage under `abboud-teacher-awards:v1:<uid>` and `abboud-teacher-reports:v1:<uid>`. Guests keep them in memory only. They are not part of Sara's progress, XP, the academy's official certificates, Firestore or its rules. Lesson completion still uses `abboud-classroom:v2:<uid>`, now accepting ids 1–15.

## Full lesson on Sara's board while Abboud explains

- **What is written:** when a lesson starts (any of the 15), Sara's board writes, in her own BoardAction template (title → text → examples), the reviewed lesson reference: title, `📖` English title with progress `📊 شرحت X من N · ✅ = تم شرحها`, the words with Arabic meanings and emoji (`▫️` / `✅`), the rule in Arabic (`📏 القاعدة`), and the examples with Arabic (`✏️`). Content lives in `src/lib/abboud/curriculum.ts` (`words`, `ruleAr`, `examples`); `chalkTargetWords` is derived from `words` and is byte-identical to before, so the AI check and server are unchanged.
- **Order:** the lesson reference is on top. A `💬 من الحصة` divider follows, then the live class exactly as before: `🎙️ عبود: …`, colour/count arrows (3 instead of 4 when the lesson is shown), the unverified mistake attempt or the verified ❌/✅ fix, and Badr/Reem's board replies. Phones use the board's existing zoom/scroll.
- **Marking (`src/lib/abboud/lessonBoard.ts`):** an item is marked ✅ only when it appears in **Abboud's own** text (sent turns plus his live mic or typed draft), never from Badr, Reem or Sara. Matching is whole-word and in order within one utterance. It tolerates a plural `s`/`es`, one letter off for words of 5+ letters, digits as number words (2 → two, also Arabic-Indic digits), common contractions (what's, it's, I'm), and one missing word in examples of 5+ words. Substrings never count (red ≠ bored, ten ≠ tennis). Marks only accumulate within a lesson run; a reset or lesson change clears them. The parent summary adds `📋 عناصر السبورة التي ذكرها: X من N` (fixed lessons only).
- **Chosen topic (16):** no reviewed content exists, so nothing is invented. The board shows the title, an honest note, and the English words Abboud actually said; there is no progress line.
- **Performance:** a new lesson is written step by step like Sara's lessons. Live updates within the same lesson (✅ marks, replies) redraw instantly through the opt-in `animateReplay={false}` prop of `TutorTldrawBoard`. Sara's default (`true`) is unchanged and covered by a test.
- **Limits:** ✅ means "he said it", not "he taught it correctly" (the AI verdict still governs stages and stars). English spoken while recognition runs in Arabic may be transcribed in Arabic letters and is then not counted.

## Slim teaching dock and each student's own voice

- **Root cause (board covered on tablets):** the teaching controls were a flex item of up to `42dvh` with a sticky dock inside them. The dock held the hint, the mic, the language picker, a note and three buttons (169px), with the typing link, the class log and the footer below. On 1024×768 that left Sara's board at its 280px minimum (≈36% of the height), in normal and expanded mode alike.
- **Now:** the dock is one 56px row in the normal layout flow, never sticky/fixed: Abboud's face, the mic button (it becomes «✅ خلصت» while listening), the stage hint clamped to 2 lines (1 on phones), and «⋯». Below it, only when needed: the live transcript (≤2 scrollable lines, with the resend button), star/error/audio notices (≤2 lines each), and the topic picker. The workspace is `flex: 1; min-height: 320px`; when a short screen or the keyboard leaves too little room, the shell scrolls instead of overlapping. Safe-area bottom padding uses `env(safe-area-inset-bottom)`.
- **«⋯» menu** (`aria-expanded`/`aria-controls`, `hidden` when closed, Escape closes it and returns focus, and the focus trap skips its hidden items): speech language, the mic note, stop / mute / replay, typing, saved summaries, the class log and the privacy note. Choosing typing closes the menu and shows the form under the dock (≤40dvh, scrollable). The completion buttons and the parent summary appear there when a lesson completes.
- **Measured** with real Chrome (headless, CDP viewport emulation) on a local uncommitted harness that mounts the real activity with the real CSS; only the network and the mic were stubbed. Expanded mode gives Sara's canvas 63% (1024×768), 64% (1180×820), 71% (1366×1024), 68% (768×1024), 63% (1366×768) and 67% (1440×900) of the viewport height, with 0 sampled board points covered. Phones (360/390) get 46–51%. The «كلام عبود كما ورد» chip strip comes on top of those figures.
- **Voices:** Badr's TTS voice was «Puck», which is not in the server's `ALLOWED_VOICES`, so `safeVoice` silently turned it into Sara's «Kore». Each speaker now uses an allowlisted voice of their own: Badr «Orus» (male), Reem «Laomedeia», Sara «Kore». In the browser fallback each speaker gets a different installed voice and the children a higher pitch. The speaking face is the turn's speaker, unchanged; Sara's board avatar does not follow other playback. A test checks the voice names against the server allowlist. No server change.
