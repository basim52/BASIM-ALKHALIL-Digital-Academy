export interface RecognitionResult { isFinal: boolean; [index: number]: { transcript: string } }
export interface RecognitionEvent { resultIndex: number; results: ArrayLike<RecognitionResult> }
export interface Recognition {
  lang: string; continuous: boolean; interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; stop(): void; abort(): void;
}
declare global {
  interface Window { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }
}
export function disposeRecognition(recognition: Recognition | null) {
  if (!recognition) return;
  recognition.onstart = null; recognition.onresult = null; recognition.onerror = null; recognition.onend = null;
  try { recognition.abort(); } catch { /* Already stopped. */ }
}
export function microphoneError(code: string) {
  if (code === 'not-allowed' || code === 'service-not-allowed') return 'لم يُسمح بالميكروفون. اسمح له من إعدادات المتصفح ثم حاول، أو افتح الكتابة الاختيارية.';
  if (code === 'no-speech') return 'لم يُلتقط كلام واضح. لم نرسل شيئاً للطالبين؛ جرّب مجدداً.';
  if (code === 'audio-capture') return 'لم نجد ميكروفوناً يعمل. تأكّد من توصيله ثم حاول، أو افتح الكتابة الاختيارية.';
  return 'تعذّر التعرّف على الصوت. لم نرسل شيئاً؛ حاول مجدداً أو استخدم الكتابة الاختيارية.';
}

/** Longest single dictation before we pause the mic (text is kept, never auto-sent). */
export const MAX_DICTATION_MS = 3 * 60_000;
/** Browser sessions that end this quickly without hearing anything count as a failing restart loop. */
const RAPID_END_MS = 1_000;
const MAX_RAPID_ENDS = 3;
/** If the browser never fires onend after "finished", deliver what we already have. */
const FINISH_GRACE_MS = 1_500;
/** Errors the user (or device) must fix; restarting would only loop. */
const FATAL_ERRORS = new Set(['not-allowed', 'service-not-allowed', 'audio-capture', 'language-not-supported', 'bad-grammar']);

export type DictationPause = 'limit' | 'restart-failed';
export interface DictationEvents {
  onListening(): void;
  /** Live text: everything committed so far plus the words still being recognised. */
  onText(text: string): void;
  /** Only after the teacher pressed "finished": the complete collected speech (may be empty). */
  onFinished(text: string): void;
  /** Fatal browser/permission error. Collected text is passed so nothing is lost. */
  onError(code: string, text: string): void;
  /** Mic stopped without the teacher finishing (time limit or the browser refused a restart). */
  onPaused(reason: DictationPause, text: string): void;
}
export interface DictationClock {
  now(): number;
  setTimeout(run: () => void, ms: number): unknown;
  clearTimeout(handle: unknown): void;
}
const systemClock: DictationClock = {
  now: () => Date.now(),
  setTimeout: (run, ms) => setTimeout(run, ms),
  clearTimeout: handle => clearTimeout(handle as ReturnType<typeof setTimeout>)
};

const normalise = (value: string) => value.replace(/\s+/g, ' ').trim();
/** Joins final results of ONE browser session; Android Chrome may re-emit each final cumulatively. */
export function sessionFinalText(results: ArrayLike<RecognitionResult>) {
  const finals: string[] = [];
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (!result.isFinal) continue;
    const segment = normalise(result[0]?.transcript || '');
    if (!segment) continue;
    const previous = finals[finals.length - 1];
    if (previous && segment.toLowerCase().startsWith(previous.toLowerCase())) finals[finals.length - 1] = segment;
    else if (previous?.toLowerCase() !== segment.toLowerCase()) finals.push(segment);
  }
  return finals.join(' ');
}
function sessionInterimText(results: ArrayLike<RecognitionResult>) {
  let interim = '';
  for (let i = 0; i < results.length; i++) if (!results[i].isFinal) interim += ' ' + (results[i][0]?.transcript || '');
  return normalise(interim);
}
/**
 * Appends a restarted session's text. Some browsers re-emit the previous phrase at the start of the
 * next session, so a repeated tail (two or more words, or the whole segment) is dropped once.
 */
export function appendSegment(committed: string, segment: string) {
  const next = normalise(segment);
  if (!next) return committed;
  if (!committed) return next;
  const before = committed.split(' '), after = next.split(' ');
  const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
  for (let k = Math.min(before.length, after.length); k >= 1; k--) {
    if (k < 2 && k < after.length) break;
    if (after.slice(0, k).every((word, i) => same(word, before[before.length - k + i]))) {
      const rest = after.slice(k).join(' ');
      return rest ? `${committed} ${rest}` : committed;
    }
  }
  return `${committed} ${next}`;
}

type DictationState = 'idle' | 'listening' | 'finishing' | 'done';

/**
 * Keeps one teacher explanation open across browser speech sessions.
 * Web Speech ends a session after silence (and some browsers ignore `continuous`),
 * so we restart until the teacher explicitly finishes, cancels, or a limit/fatal error stops us.
 * Nothing leaves this class except via onFinished, which only follows finish().
 */
export class ContinuousDictation {
  private state: DictationState = 'idle';
  private active: Recognition | null = null;
  private committed: string;
  private sessionFinal = '';
  private sessionInterim = '';
  private sessionStarted = 0;
  private heardInSession = false;
  private rapidEnds = 0;
  private limitTimer: unknown = null;
  private finishTimer: unknown = null;

  constructor(
    private readonly create: () => Recognition,
    private readonly lang: string,
    private readonly events: DictationEvents,
    initialText = '',
    private readonly clock: DictationClock = systemClock,
    private readonly maxMs = MAX_DICTATION_MS
  ) { this.committed = normalise(initialText); }

  get text() { return normalise(`${appendSegment(this.committed, this.sessionFinal)} ${this.sessionInterim}`); }
  get listening() { return this.state === 'listening'; }

  /** Throws if the very first browser session cannot start (caller shows an honest error). */
  start() {
    if (this.state !== 'idle') return;
    this.state = 'listening';
    this.limitTimer = this.clock.setTimeout(() => this.pause('limit'), this.maxMs);
    try { this.open(); } catch (error) { this.teardown(); throw error; }
  }
  /** The teacher pressed "finished": stop listening and deliver the whole explanation once. */
  finish() {
    if (this.state !== 'listening') return;
    this.state = 'finishing';
    this.finishTimer = this.clock.setTimeout(() => this.deliver(), FINISH_GRACE_MS);
    try { this.active?.stop(); } catch { this.deliver(); }
  }
  /** Leaving, switching lesson, or explicit stop: release the mic and deliver nothing. */
  cancel() { this.teardown(); }

  private open() {
    const mic = this.create();
    this.active = mic;
    this.sessionFinal = ''; this.sessionInterim = ''; this.heardInSession = false;
    this.sessionStarted = this.clock.now();
    mic.lang = this.lang; mic.interimResults = true; mic.continuous = true;
    const mine = () => this.active === mic;
    mic.onstart = () => { if (mine() && this.state === 'listening') this.events.onListening(); };
    mic.onresult = event => {
      if (!mine() || this.state === 'done') return;
      this.sessionFinal = sessionFinalText(event.results);
      this.sessionInterim = sessionInterimText(event.results);
      if (this.sessionFinal || this.sessionInterim) { this.heardInSession = true; this.rapidEnds = 0; }
      this.events.onText(this.text);
    };
    mic.onerror = event => {
      if (!mine() || this.state === 'done') return;
      // Silence and our own stop/abort are normal; onend decides whether to restart.
      if (!FATAL_ERRORS.has(event.error)) return;
      const text = this.commitSession();
      this.teardown();
      this.events.onError(event.error, text);
    };
    mic.onend = () => {
      if (!mine() || this.state === 'done') return;
      this.commitSession();
      if (this.state === 'finishing') { this.deliver(); return; }
      const quick = !this.heardInSession && this.clock.now() - this.sessionStarted < RAPID_END_MS;
      this.rapidEnds = quick ? this.rapidEnds + 1 : 0;
      if (this.rapidEnds >= MAX_RAPID_ENDS) { this.pause('restart-failed'); return; }
      try { this.open(); } catch { this.pause('restart-failed'); }
    };
    mic.start();
  }
  /** Moves the current session (including unfinalised words when it ends) into the committed text. */
  private commitSession() {
    this.committed = appendSegment(appendSegment(this.committed, this.sessionFinal), this.sessionInterim);
    this.sessionFinal = ''; this.sessionInterim = '';
    return this.committed;
  }
  private deliver() {
    if (this.state !== 'finishing') return;
    const text = this.commitSession();
    this.teardown();
    this.events.onFinished(text);
  }
  private pause(reason: DictationPause) {
    if (this.state !== 'listening') return;
    const text = this.commitSession();
    this.teardown();
    this.events.onPaused(reason, text);
  }
  private teardown() {
    this.state = 'done';
    if (this.limitTimer !== null) this.clock.clearTimeout(this.limitTimer);
    if (this.finishTimer !== null) this.clock.clearTimeout(this.finishTimer);
    this.limitTimer = this.finishTimer = null;
    disposeRecognition(this.active); this.active = null;
  }
}
