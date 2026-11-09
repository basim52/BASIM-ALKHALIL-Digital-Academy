import assert from 'node:assert/strict';
import test from 'node:test';
import { appendSegment, ContinuousDictation, MAX_DICTATION_MS, sessionFinalText, type DictationClock, type Recognition, type RecognitionEvent } from '../src/lib/abboud/recognition';

class Mic implements Recognition {
  static all: Mic[] = []; static failStart = false;
  lang = ''; continuous = false; interimResults = false;
  onstart: Recognition['onstart'] = null; onresult: Recognition['onresult'] = null;
  onerror: Recognition['onerror'] = null; onend: Recognition['onend'] = null;
  aborted = false; stopped = 0; results: { isFinal: boolean; 0: { transcript: string } }[] = [];
  constructor() { Mic.all.push(this); }
  start() { if (Mic.failStart) throw new Error('InvalidStateError'); this.onstart?.(); }
  stop() { this.stopped++; }
  abort() { this.aborted = true; }
  emit(results: { isFinal: boolean; 0: { transcript: string } }[]) { this.results = results; this.onresult?.({ resultIndex: 0, results } as RecognitionEvent); }
}
const final = (transcript: string) => ({ isFinal: true, 0: { transcript } });
const interim = (transcript: string) => ({ isFinal: false, 0: { transcript } });
function clock() {
  let now = 0; let id = 0; const timers = new Map<number, { at: number; run: () => void }>();
  const c: DictationClock & { advance(ms: number): void } = {
    now: () => now,
    setTimeout: (run, ms) => { timers.set(++id, { at: now + ms, run }); return id; },
    clearTimeout: handle => { timers.delete(handle as number); },
    advance(ms) { now += ms; for (const [key, t] of [...timers]) if (t.at <= now) { timers.delete(key); t.run(); } }
  };
  return c;
}
function setup(initial = '') {
  Mic.all = []; Mic.failStart = false;
  const log = { finished: [] as string[], errors: [] as string[], paused: [] as string[], texts: [] as string[] };
  const c = clock();
  const d = new ContinuousDictation(() => new Mic(), 'en-US', {
    onListening: () => {}, onText: t => log.texts.push(t),
    onFinished: t => log.finished.push(t), onError: (code, t) => log.errors.push(`${code}:${t}`), onPaused: (r, t) => log.paused.push(`${r}:${t}`)
  }, initial, c);
  return { d, c, log, mic: () => Mic.all[Mic.all.length - 1] };
}

test('automatic browser end restarts with continuous+interim and never delivers', () => {
  const { d, c, log, mic } = setup(); d.start();
  assert.equal(mic().continuous, true); assert.equal(mic().interimResults, true); assert.equal(mic().lang, 'en-US');
  mic().emit([final('hello class')]); c.advance(4000); mic().onend?.();
  assert.equal(Mic.all.length, 2); assert.deepEqual(log.finished, []); assert.equal(d.listening, true);
});
test('segments across restarts join without repeats; interim shown live; finish delivers exactly once', () => {
  const { d, c, log, mic } = setup(); d.start();
  mic().emit([final('This is a book')]); c.advance(3000); mic().onend?.();
  mic().emit([final('This is a book')]); // browser re-emits the previous segment after restart
  mic().emit([final('This is a book'), interim('I like')]);
  assert.equal(log.texts.at(-1), 'This is a book I like');
  mic().emit([final('This is a book'), final('I like apples')]);
  d.finish(); assert.equal(mic().stopped, 1); assert.deepEqual(log.finished, []);
  mic().onend?.(); mic().onend?.();
  assert.deepEqual(log.finished, ['This is a book I like apples']);
  c.advance(5000); assert.equal(log.finished.length, 1);
});
test('Android-style cumulative finals inside one session collapse to the longest', () => {
  assert.equal(sessionFinalText([final('one'), final('one two'), final('one two three')]), 'one two three');
  assert.equal(appendSegment('red book', 'red book'), 'red book');
  assert.equal(appendSegment('red book', 'blue pen'), 'red book blue pen');
});
test('words still interim when the user finishes are kept, and a missing onend cannot hang the send', () => {
  const { d, c, log, mic } = setup(); d.start();
  mic().emit([final('Number one'), interim('number two')]);
  d.finish(); c.advance(1600);
  assert.deepEqual(log.finished, ['Number one number two']); assert.equal(mic().aborted, true);
});
test('permission, device and language errors stop immediately with no restart loop', () => {
  for (const code of ['not-allowed', 'service-not-allowed', 'audio-capture', 'language-not-supported']) {
    const { d, log, mic } = setup(); d.start(); mic().emit([final('kept words')]);
    const only = mic(); only.onerror?.({ error: code }); only.onend?.();
    assert.equal(Mic.all.length, 1); assert.equal(only.aborted, true);
    assert.deepEqual(log.errors, [`${code}:kept words`]); assert.deepEqual(log.finished, []);
  }
});
test('silence (no-speech) just restarts; repeated instant failures pause instead of looping', () => {
  const { d, c, log, mic } = setup(); d.start();
  mic().onerror?.({ error: 'no-speech' }); c.advance(8000); mic().onend?.();
  assert.equal(Mic.all.length, 2); assert.deepEqual(log.errors, []);
  for (let i = 0; i < 3; i++) { c.advance(50); mic().onerror?.({ error: 'network' }); mic().onend?.(); }
  assert.ok(Mic.all.length <= 5); assert.deepEqual(log.paused, ['restart-failed:']); assert.equal(d.listening, false);
});
test('a restart the browser refuses pauses with the text kept', () => {
  const { d, log, mic } = setup(); d.start(); mic().emit([final('my words')]);
  Mic.failStart = true; mic().onend?.();
  assert.deepEqual(log.paused, ['restart-failed:my words']); assert.deepEqual(log.finished, []);
});
test('three-minute ceiling pauses (not sends) and releases the mic', () => {
  const { d, c, log, mic } = setup(); d.start(); mic().emit([final('long lesson')]);
  c.advance(MAX_DICTATION_MS - 1); assert.deepEqual(log.paused, []);
  c.advance(1); assert.deepEqual(log.paused, ['limit:long lesson']); assert.equal(mic().aborted, true);
  assert.deepEqual(log.finished, []); mic().onend?.(); assert.equal(Mic.all.length, 1);
});
test('cancel releases the mic and drops every later browser event; resume continues previous text', () => {
  const { d, log, mic } = setup('earlier part'); d.start(); mic().emit([final('more')]);
  const current = mic(); d.cancel(); assert.equal(current.aborted, true); assert.equal(current.onresult, null);
  d.finish(); assert.deepEqual(log.finished, []); assert.equal(log.texts.at(-1), 'earlier part more');
});
test('first start failure throws so the caller shows an honest error and timers are cleared', () => {
  Mic.failStart = true;
  const c = clock(); let paused = 0;
  const d = new ContinuousDictation(() => new Mic(), 'ar-SA', { onListening() {}, onText() {}, onFinished() {}, onError() {}, onPaused() { paused++; } }, '', c);
  assert.throws(() => d.start()); c.advance(MAX_DICTATION_MS * 2); assert.equal(paused, 0);
  Mic.failStart = false;
});
test('overlap join keeps genuine single-word repeats and new phrases', () => {
  assert.equal(appendSegment('This is a book', 'This is a book I like apples'), 'This is a book I like apples');
  assert.equal(appendSegment('one two', 'two three'), 'one two two three');
  assert.equal(appendSegment('the cat', 'cat'), 'the cat');
  assert.equal(appendSegment('', ' hi  there '), 'hi there');
});
