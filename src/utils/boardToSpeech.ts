/**
 * Single source of truth: Sara's spoken narration is ALWAYS derived from the
 * exact lines written on the whiteboard (same content, same order).
 * Only presentation symbols are removed so TTS reads naturally.
 */
const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{20E3}]/gu;

export function boardLineToSpeech(line: string): string {
  return String(line || '')
    // IPA / phonetic transcriptions like /bɪrd/ stay visible on the board but are not read aloud
    .replace(/(^|[\s(:،,])\/[^\/\s][^\/\n]{0,40}?\/(?=[\s.,،:;!?)]|$)/g, '$1 ')
    .replace(EMOJI_RE, ' ')
    .replace(/[*_`#>|]+/g, ' ')
    .replace(/\s*(➜|➡|→|=>)\s*/g, ', ')
    .replace(/\s*[·•]\s*/g, ', ')
    .replace(/…/g, '...')
    .replace(/\s+([.,،:;!?؟])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function boardLinesToSpeech(lines: string[] | undefined | null): string {
  return (Array.isArray(lines) ? lines : [])
    .map(boardLineToSpeech)
    .filter(Boolean)
    .map(l => (/[.!?؟。…"»)]$/.test(l) ? l : `${l}.`))
    .join(' ');
}
