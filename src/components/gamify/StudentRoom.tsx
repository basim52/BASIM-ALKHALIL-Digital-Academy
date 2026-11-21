import React, { useEffect, useMemo, useState } from 'react';
import { X, Lock } from 'lucide-react';
import AvatarFigure from './AvatarFigure';
import { ROOM_ITEMS, WALLS, MAX_DECOR, itemUnlocked, nextUnlock, loadRoom, roomItem, type RoomSlot, type RoomState } from '../../lib/gamify';

import { ROOM_EVENT, saveRoomEverywhere, syncRoom } from './roomCloud';
export { ROOM_EVENT };
const SLOTS: { slot: RoomSlot; ar: string; en: string; icon: string }[] = [
  { slot: 'character', ar: 'الشخصية', en: 'Character', icon: '🧒' },
  { slot: 'hat', ar: 'القبعة', en: 'Hat', icon: '🧢' },
  { slot: 'pet', ar: 'الرفيق', en: 'Pet', icon: '🐥' },
  { slot: 'wall', ar: 'الجدار', en: 'Wall', icon: '🖼️' },
  { slot: 'decor', ar: 'الديكور', en: 'Decor', icon: '🧸' },
];
/** Where decorations sit in the room (floor and shelf). */
const SPOTS: React.CSSProperties[] = [
  { left: '8%', bottom: '10%' }, { right: '8%', bottom: '10%' }, { left: '14%', top: '30%' }, { right: '14%', top: '30%' },
];

/** 🏠 "غرفتي": the student dresses a character and decorates a room. Items unlock by existing XP (read only — nothing is spent). Choices stay on this device. */
export function StudentRoom({ uid, xp, name, lang = 'ar', onClose }: { uid: string | null; xp: number | null; name?: string; lang?: 'ar' | 'en'; onClose: () => void }) {
  const t = (ar: string, en: string) => (lang === 'en' ? en : ar);
  const points = xp ?? 0;
  const [room, setRoom] = useState<RoomState>(() => loadRoom(uid, points));
  const [slot, setSlot] = useState<RoomSlot>('character');
  useEffect(() => { setRoom(loadRoom(uid, points)); }, [uid, points]);
  // Pull the choices saved on another device (most recent wins), then re-read the device copy.
  useEffect(() => {
    const re = () => setRoom(loadRoom(uid, points));
    window.addEventListener(ROOM_EVENT, re); void syncRoom(uid);
    return () => window.removeEventListener(ROOM_EVENT, re);
  }, [uid, points]);
  const update = (next: RoomState) => { setRoom(next); saveRoomEverywhere(uid, next); };
  const choose = (id: string) => {
    const it = roomItem(id); if (!it || !itemUnlocked(points, it)) return;
    if (it.slot === 'decor') {
      const has = room.decor.includes(id);
      const decor = has ? room.decor.filter(d => d !== id) : [...room.decor, id].slice(-MAX_DECOR);
      update({ ...room, decor });
    } else update({ ...room, [it.slot]: id });
  };
  const next = nextUnlock(points);
  const items = useMemo(() => ROOM_ITEMS.filter(i => i.slot === slot), [slot]);
  const unlockedCount = ROOM_ITEMS.filter(i => itemUnlocked(points, i)).length;
  const e = (id: string) => roomItem(id)?.emoji || '';
  const dark = room.wall === 'wall-space';
  const prevStep = next ? Math.max(0, ...ROOM_ITEMS.filter(i => i.xp <= points).map(i => i.xp)) : 0;
  const pct = next ? Math.round(((points - prevStep) / Math.max(1, next.item.xp - prevStep)) * 100) : 100;

  return (
    <div data-testid="gamify-room" className="fixed inset-0 z-[400] bg-slate-950/60 flex items-stretch sm:items-center justify-center" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <div className="w-full sm:max-w-xl bg-white sm:rounded-3xl flex flex-col max-h-[100dvh] sm:max-h-[94vh] overflow-hidden shadow-2xl">
        <div className="shrink-0 flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-[#002147] to-[#0b3d7a] text-white">
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-black">🏠 {name ? t(`غرفة ${name}`, `${name}'s room`) : t('غرفتي', 'My room')}</p>
            <p className="text-[11px] font-bold text-amber-200">{t(`فتحت ${unlockedCount} من ${ROOM_ITEMS.length} غرض`, `${unlockedCount} of ${ROOM_ITEMS.length} items unlocked`)}</p>
          </div>
          <span data-testid="gamify-room-xp" className="px-3 py-1 rounded-full bg-white/15 text-[12px] font-black">⭐ {points.toLocaleString('en-US')} XP</span>
          <button onClick={onClose} aria-label={t('إغلاق', 'Close')} className="p-1.5 rounded-xl bg-white/10"><X size={18} /></button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* Room scene */}
          <div data-testid="gamify-room-scene" className="relative mx-3 mt-3 rounded-3xl overflow-hidden border-4 border-[#E6C36A]" style={{ height: 230, background: WALLS[room.wall] }}>
            {dark && [8, 22, 40, 61, 77, 90].map((x, i) => <span key={i} className="absolute text-[10px]" style={{ left: `${x}%`, top: `${8 + (i % 3) * 9}%` }}>✨</span>)}
            <div className="absolute rounded-xl border-4 border-white/90" style={{ left: '50%', top: 16, width: 92, height: 62, transform: 'translateX(-50%)', background: dark ? '#0b0f33' : '#d9f1ff' }}>
              <span className="absolute inset-0 flex items-center justify-center text-[22px]">{dark ? '🌙' : '☀️'}</span>
            </div>
            <div className="absolute inset-x-[8%] h-2 rounded bg-[#a0703f]" style={{ top: '46%' }} />
            <div className="absolute inset-x-0 bottom-0 h-[30%]" style={{ background: 'repeating-linear-gradient(90deg,#d9a066 0 34px,#c98f55 34px 36px)' }} />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[14%] w-36 h-5 rounded-[50%] bg-[#ff9fb2]/80" />
            {room.decor.map((id, i) => <span key={id} className="absolute text-[34px] leading-none" style={SPOTS[i % SPOTS.length]}>{e(id)}</span>)}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[16%]">
              <AvatarFigure character={e(room.character)} hat={e(room.hat)} pet={e(room.pet)} size={68} />
            </div>
          </div>
          {/* Progress to the next unlock (XP only read) */}
          <div className="mx-3 mt-3 rounded-2xl bg-amber-50 border border-amber-200 p-3">
            {next ? (
              <>
                <p data-testid="gamify-room-next" className="text-[12px] font-black text-slate-800">{t(`باقي ${next.missing} نقطة وينفتح لك ${next.item.emoji} ${next.item.nameAr}`, `${next.missing} XP more to unlock ${next.item.emoji} ${next.item.nameEn}`)}</p>
                <div className="mt-2 h-2.5 rounded-full bg-amber-100 overflow-hidden"><div className="h-full rounded-full bg-[#ffc800]" style={{ width: `${Math.max(4, Math.min(100, pct))}%` }} /></div>
              </>
            ) : <p className="text-[12px] font-black text-slate-800">{t('🏆 فتحت كل الأغراض! أنت بطل', '🏆 Everything unlocked!')}</p>}
            <p className="mt-1 text-[10px] font-bold text-slate-500">{t('نقاطك ما تنقص أبداً — كل ما تتعلم أكثر تنفتح لك أشياء جديدة', 'Your XP never goes down — learn more to unlock more')}</p>
          </div>
          {/* Slots */}
          <div className="flex gap-2 overflow-x-auto px-3 pt-3 no-scrollbar">
            {SLOTS.map(s => (
              <button key={s.slot} data-testid={`gamify-room-tab-${s.slot}`} onClick={() => setSlot(s.slot)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-black border-2 ${slot === s.slot ? 'bg-[#002147] border-[#002147] text-white' : 'bg-white border-slate-200 text-slate-600'}`}>
                {s.icon} {t(s.ar, s.en)}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3 pb-6">
            {items.map(it => {
              const open = itemUnlocked(points, it);
              const on = it.slot === 'decor' ? room.decor.includes(it.id) : (room as any)[it.slot] === it.id;
              return (
                <button key={it.id} data-testid={`gamify-item-${it.id}`} data-locked={open ? '0' : '1'} disabled={!open} onClick={() => choose(it.id)}
                  className={`relative rounded-2xl p-2 flex flex-col items-center gap-1 border-2 transition ${on ? 'border-[#58cc02] bg-[#f0ffe4]' : open ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50'}`}>
                  <span className={`text-[34px] leading-none h-10 flex items-center ${open ? '' : 'grayscale opacity-40'}`}>{it.emoji || '🚫'}</span>
                  <span className="text-[11px] font-black text-slate-700">{t(it.nameAr, it.nameEn)}</span>
                  {!open && <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-slate-500"><Lock size={10} /> {it.xp} XP</span>}
                  {on && <span className="absolute -top-1.5 -end-1.5 w-5 h-5 rounded-full bg-[#58cc02] text-white text-[11px] font-black flex items-center justify-center">✓</span>}
                </button>
              );
            })}
          </div>
          {!uid && <p className="px-4 pb-6 text-[11px] font-bold text-slate-500">{t('سجّل دخولك عشان تنحسب نقاطك وتنفتح أغراضك.', 'Sign in so your XP unlocks items.')}</p>}
        </div>
      </div>
    </div>
  );
}
export default StudentRoom;
