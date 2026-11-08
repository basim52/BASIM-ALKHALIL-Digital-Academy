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
  return 'تعذّر التعرّف على الصوت. لم نرسل شيئاً؛ حاول مجدداً أو استخدم الكتابة الاختيارية.';
}
