import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface WeeklyTopic {
  id: string; icon: string; titleAr: string; titleEn: string; theme: string; starter: string;
}
export type TopicBand = 'beginner' | 'intermediate' | 'advanced';
export interface WeeklyTopicPick {
  weekKey: string; topic: WeeklyTopic; band: TopicBand; bandAr: string;
  openerEn: string; instructionEn: string; examplesEn: string[];
}
export interface FreeTopicWeek { weekKey: string; done: boolean; topicId: string }

/** Rotating pool (30). The same ISO week gives everyone the same topic. */
export const WEEKLY_TOPICS: WeeklyTopic[] = [
  ['hobbies','🎨','الهوايات','Hobbies','the things you enjoy in your free time','playing football'],
  ['family','👨‍👩‍👧','العائلة','Family','the people in your family','spending time with my brother'],
  ['school','🏫','المدرسة','School','your school day','learning with my teacher'],
  ['sports','⚽','الرياضة','Sports','sports you play or watch','playing football'],
  ['food','🍽️','الطعام','Food','food you love','rice and chicken'],
  ['travel','✈️','السفر','Travel','places you want to visit','going to the beach'],
  ['animals','🐾','الحيوانات','Animals','animals you like','playing with cats'],
  ['ambitions','🌟','الطموحات','Ambitions','things you want to achieve','becoming a doctor'],
  ['weather','🌤️','الطقس','Weather','the weather where you live','sunny days'],
  ['friends','🤝','الأصدقاء','Friends','your friends','playing with my best friend'],
  ['technology','💻','التقنية','Technology','apps and devices you use','using my phone to learn'],
  ['movies','🎬','الأفلام','Movies','films and shows you enjoy','funny movies'],
  ['books','📚','الكتب','Books','stories you like','adventure stories'],
  ['weekend','🗓️','عطلة نهاية الأسبوع','The Weekend','your weekend','visiting my family'],
  ['holidays','🎉','الإجازات','Holidays','your favourite holiday','celebrating Eid'],
  ['health','🩺','الصحة','Health','staying healthy','sleeping well'],
  ['nature','🌿','الطبيعة','Nature','nature around you','trees and the sea'],
  ['future-job','💼','وظيفة المستقبل','My Future Job','the job you want one day','working as a teacher'],
  ['inventions','💡','الاختراعات','Inventions','inventions that help people','helpful robots'],
  ['music','🎵','الموسيقى','Music','sounds and songs you listen to','calm music'],
  ['shopping','🛍️','التسوق','Shopping','things you like to buy','buying new shoes'],
  ['city-village','🏙️','المدينة والقرية','City and Village','where you live','living in the city'],
  ['seasons','🍂','الفصول','Seasons','your favourite season','enjoying winter'],
  ['daily-routine','⏰','الروتين اليومي','My Daily Routine','your normal day','waking up early'],
  ['dreams','💭','الأحلام','Dreams','your dreams for the future','travelling around the world'],
  ['kindness','💛','اللطف','Kindness','kind things people do','helping a friend'],
  ['home','🏠','البيت','Home','your home','spending time in my room'],
  ['games','🎮','الألعاب','Games','games you enjoy','playing board games'],
  ['transport','🚗','وسائل النقل','Transport','how you travel','riding in a car'],
  ['creativity','🎭','الفن والإبداع','Art and Creativity','things you create','drawing pictures'],
].map(([id, icon, titleAr, titleEn, theme, starter]) => ({ id, icon, titleAr, titleEn, theme, starter }));

const riyadhDate = (d: Date) => {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(d);
  const get = (t: string) => Number(parts.find(p => p.type === t)?.value || 0);
  return { y: get('year'), m: get('month'), d: get('day') };
};

/** ISO week (Monday start) for the calendar date in Asia/Riyadh. */
export function riyadhIsoWeek(date = new Date()): { year: number; week: number; weekKey: string } {
  const { y, m, d } = riyadhDate(date);
  const cur = new Date(Date.UTC(y, m - 1, d));
  const day = (cur.getUTCDay() + 6) % 7; // Mon=0
  cur.setUTCDate(cur.getUTCDate() - day + 3); // Thursday of this ISO week
  const isoYear = cur.getUTCFullYear();
  const first = new Date(Date.UTC(isoYear, 0, 4));
  const fday = (first.getUTCDay() + 6) % 7;
  first.setUTCDate(first.getUTCDate() - fday + 3);
  const week = 1 + Math.round((cur.getTime() - first.getTime()) / 604800000);
  return { year: isoYear, week, weekKey: `${isoYear}-W${String(week).padStart(2, '0')}` };
}

export const topicBand = (level?: string): TopicBand => {
  const l = String(level || '').toUpperCase();
  return l.startsWith('A') ? 'beginner' : l.startsWith('B') ? 'intermediate' : 'advanced';
};

/** This week's topic and level-adapted opening/examples. Deterministic: ISO year-week modulo pool size. */
export function getWeeklyTopic(date = new Date(), level?: string): WeeklyTopicPick {
  const { year, week, weekKey } = riyadhIsoWeek(date);
  const topic = WEEKLY_TOPICS[(year * 53 + week) % WEEKLY_TOPICS.length];
  const band = topicBand(level);
  const bandAr = band === 'beginner' ? 'جمل قصيرة وبسيطة تناسب مستواك' : band === 'intermediate' ? 'احكِ مثالاً وسبباً من حياتك' : 'ناقش الفوائد والتحديات برأيك';
  const openerEn = band === 'beginner'
    ? `Let's talk about ${topic.titleEn.toLowerCase()}! What do you like most about it?`
    : band === 'intermediate'
      ? `Let's talk about ${topic.titleEn.toLowerCase()}! How does it affect your life? Give me one example.`
      : `Let's talk about ${topic.titleEn.toLowerCase()}! What is most interesting or challenging about it, and why?`;
  const examplesEn = band === 'beginner'
    ? [`I like ${topic.starter}.`, 'My favourite is ...']
    : band === 'intermediate'
      ? ['In my life, ...', 'For example, ...']
      : ['In my view, ...', 'One benefit is ..., but ...'];
  const instructionEn = band === 'beginner'
    ? 'Use very simple, short questions and easy words; invite one short answer at a time.'
    : band === 'intermediate'
      ? 'Ask for examples and reasons, with natural follow-up questions.'
      : 'Invite opinions, comparisons, benefits and challenges, while keeping replies concise.';
  return { weekKey, topic, band, bandAr, openerEn, instructionEn, examplesEn };
}

const KEY = (uid?: string) => `sara_free_topic_week_${uid || 'guest'}`;
export function readFreeTopicWeek(uid?: string): FreeTopicWeek | null {
  try { const v = JSON.parse(localStorage.getItem(KEY(uid)) || 'null'); return v && v.weekKey && v.topicId ? v as FreeTopicWeek : null; } catch { return null; }
}
export function writeFreeTopicWeekLocal(uid: string | undefined, v: FreeTopicWeek) {
  try { localStorage.setItem(KEY(uid), JSON.stringify(v)); } catch { /* ignore */ }
}
/** Save this week's topic completion to the device and users/{uid}.saraFreeTopicWeek. */
export async function saveFreeTopicWeek(uid: string | undefined, v: FreeTopicWeek): Promise<void> {
  writeFreeTopicWeekLocal(uid, v);
  if (!uid) return;
  try { await updateDoc(doc(db, 'users', uid), { saraFreeTopicWeek: v }); } catch { /* offline: local copy remains */ }
}
/** Account copy wins when it belongs to a newer (or the same, completed) week. */
export async function loadFreeTopicWeek(uid?: string): Promise<FreeTopicWeek | null> {
  const local = readFreeTopicWeek(uid);
  if (!uid) return local;
  try {
    const cloud = (await getDoc(doc(db, 'users', uid))).data()?.saraFreeTopicWeek as FreeTopicWeek | undefined;
    if (cloud?.weekKey && cloud.topicId && (!local || cloud.weekKey > local.weekKey || (cloud.weekKey === local.weekKey && cloud.done))) {
      writeFreeTopicWeekLocal(uid, cloud); return cloud;
    }
  } catch { /* offline */ }
  return local;
}
