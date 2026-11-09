import { cleanText, MAX_FEED_TEXT, nameOf, type FeedItem, type LiveClassConfig, type LiveMessage } from './liveClass';

/**
 * One clean line from a finished recognition result: no interim words ever reach here. Speech engines (Android
 * Chrome especially) repeat phrases when they re-emit or restart; immediately repeated word runs are kept once.
 */
export function tidyUtterance(raw: string): string {
  let words = cleanText(raw, 4000).split(' ').filter(Boolean);
  const same = (a: string, b: string) => a.toLowerCase().replace(/[.,!?؟،]/g, '') === b.toLowerCase().replace(/[.,!?؟،]/g, '');
  for (let changed = true; changed;) {
    changed = false;
    for (let n = Math.floor(words.length / 2); n >= 1 && !changed; n--) {
      for (let i = 0; i + 2 * n <= words.length; i++) {
        let repeat = true;
        for (let k = 0; k < n && repeat; k++) repeat = same(words[i + k], words[i + n + k]);
        if (repeat) {
          // Keep the first copy (its capitals); carry over punctuation that ended the dropped copy.
          const mark = words[i + 2 * n - 1].match(/[.,!?؟،]+$/)?.[0] || '';
          const kept = words.slice(0, i + n);
          if (mark && !/[.,!?؟،]$/.test(kept[kept.length - 1])) kept[kept.length - 1] += mark;
          words = [...kept, ...words.slice(i + 2 * n)]; changed = true; break;
        }
      }
    }
  }
  return words.join(' ').slice(0, MAX_FEED_TEXT);
}

export const LIVE_NAMES: Record<FeedItem['who'], string> = { abboud: 'عبود', badr: 'بدر', reem: 'ريم', sara: 'سارة' };
export type TimelineEntry = { key: string; who: FeedItem['who'] | 'student'; uid?: string; name: string; text: string; at: number; via?: 'mic' | 'text' };
/** One bubble per utterance, everyone in time order: Abboud, Badr/Reem/Sara (feed) and the allowed students (messages). */
export function timeline(feed: readonly FeedItem[], messages: readonly LiveMessage[], config: LiveClassConfig | null, me?: string): TimelineEntry[] {
  return [
    ...feed.map(i => ({ key: `f${i.id}`, who: i.who, name: LIVE_NAMES[i.who], text: i.text, at: i.at })),
    ...messages.map(m => ({ key: `m${m.id}`, who: 'student' as const, uid: m.senderId, name: m.senderId === me ? 'أنت' : nameOf(config, m.senderId), text: m.text, at: m.createdAt, via: m.via }))
  ].sort((a, b) => a.at - b.at);
}
