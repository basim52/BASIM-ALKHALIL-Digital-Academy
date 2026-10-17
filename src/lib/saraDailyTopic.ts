import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from './firebase';

export interface DailyTopic {
  id: string; icon: string; titleAr: string; titleEn: string; theme: string; starter: string;
}
export type TopicBand = 'beginner' | 'intermediate' | 'advanced';
export interface DailyTopicPick {
  dateKey: string; topic: DailyTopic; band: TopicBand; bandAr: string;
  openerEn: string; instructionEn: string; examplesEn: string[];
}
export interface FreeTopicDay { dateKey: string; done: boolean; topicId: string }

/** Rotating pool (30). The same ISO week gives everyone the same topic. */
export const DAILY_TOPICS: DailyTopic[] = [
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
const pad = (n: number) => String(n).padStart(2, '0');

/** Calendar date in Asia/Riyadh as YYYY-MM-DD (the day boundary for the topic). */
export function riyadhDateKey(date = new Date()): string {
  const { y, m, d } = riyadhDate(date);
  return `${y}-${pad(m)}-${pad(d)}`;
}

export const topicBand = (level?: string): TopicBand => {
  const l = String(level || '').toUpperCase();
  return l.startsWith('A') ? 'beginner' : l.startsWith('B') ? 'intermediate' : 'advanced';
};

/** Today's topic and level-adapted opening/examples. Deterministic by Riyadh date: consecutive days cycle through the pool. */
export function getDailyTopic(date = new Date(), level?: string): DailyTopicPick {
  const { y, m, d } = riyadhDate(date);
  const dateKey = `${y}-${pad(m)}-${pad(d)}`;
  const epochDays = Math.floor(Date.UTC(y, m - 1, d) / 86400000);
  const topic = DAILY_TOPICS[((epochDays % DAILY_TOPICS.length) + DAILY_TOPICS.length) % DAILY_TOPICS.length];
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
  return { dateKey, topic, band, bandAr, openerEn, instructionEn, examplesEn };
}

const KEY = (uid?: string) => `sara_free_topic_day_${uid || 'guest'}`;
const LEGACY_KEY = (uid?: string) => `sara_free_topic_week_${uid || 'guest'}`;
export function readFreeTopicDay(uid?: string): FreeTopicDay | null {
  try { const v = JSON.parse(localStorage.getItem(KEY(uid)) || 'null'); return v && v.dateKey && v.topicId ? v as FreeTopicDay : null; } catch { return null; }
}
export function writeFreeTopicDayLocal(uid: string | undefined, v: FreeTopicDay) {
  try { localStorage.setItem(KEY(uid), JSON.stringify(v)); localStorage.removeItem(LEGACY_KEY(uid)); } catch { /* ignore */ }
}
/** Save today's topic completion locally and to users/{uid}.saraFreeTopicDay; removes the old weekly field. */
export async function saveFreeTopicDay(uid: string | undefined, v: FreeTopicDay): Promise<void> {
  writeFreeTopicDayLocal(uid, v);
  if (!uid) return;
  try { await updateDoc(doc(db, 'users', uid), { saraFreeTopicDay: v, saraFreeTopicWeek: deleteField() }); } catch { /* offline: local copy remains */ }
}
/** Account copy wins when it belongs to a newer date (or the same date, completed). Old weekly records are not converted: they carry no completion date. */
export async function loadFreeTopicDay(uid?: string): Promise<FreeTopicDay | null> {
  const local = readFreeTopicDay(uid);
  if (!uid) return local;
  try {
    const cloud = (await getDoc(doc(db, 'users', uid))).data()?.saraFreeTopicDay as FreeTopicDay | undefined;
    if (cloud?.dateKey && cloud.topicId && (!local || cloud.dateKey > local.dateKey || (cloud.dateKey === local.dateKey && cloud.done))) {
      writeFreeTopicDayLocal(uid, cloud); return cloud;
    }
  } catch { /* offline */ }
  return local;
}
