import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Lock, Check, MessageCircle, ChevronsDown, ChevronsUp } from 'lucide-react';
import { getStudentStreak } from '../services/streakService';
import { mapNodeState, mapNodeOpen, currentLessonOrder, zigzagOffset, lessonIcon, levelColor, type MapNodeState, type MapKind } from '../lib/saraLessonMap';
import { zoneFor, readAvatar } from '../lib/gamify';
import { useGamifyData } from './gamify/useGamifyData';
import GamifyBar from './gamify/GamifyBar';
import MapZoneScene from './gamify/MapZoneScene';
import AvatarFigure from './gamify/AvatarFigure';
import { ROOM_EVENT, syncRoom } from './gamify/roomCloud';

/** Minimal shape every Sara lesson list already has. */
export interface MapLesson { id: string; order: number; titleAr: string; titleEn?: string; icon?: string; levelId?: string }
export interface SaraLessonMapLevel {
  id: string; titleAr: string; titleEn?: string;
  /** Short tab label (default: CEFR code / "المستوى n"). */
  shortAr?: string; shortEn?: string;
  /** Extra line under the level banner (e.g. "يفتح بعد إنهاء دروس المستوى الأول"). */
  noteAr?: string; noteEn?: string;
}

interface Props<T extends MapLesson> {
  lessons: T[];
  levels?: SaraLessonMapLevel[];
  /** Which level a lesson belongs to (default: lesson.levelId). */
  sectionOf?: (l: T) => string;
  /** Existing saved progress counter (highest open lesson order). Read only. */
  unlocked: number;
  unlockAll?: boolean;
  /** Existing open rule when it is more than `order <= unlocked` (e.g. level gates). */
  isOpen?: (l: T) => boolean;
  lang: 'ar' | 'en';
  trackTitleAr: string;
  trackTitleEn?: string;
  /** Lesson family: picks fitting emojis when a lesson has no icon of its own. */
  kind?: MapKind;
  /** First level colour (each track starts on its own colour). */
  colorOffset?: number;
  onOpen: (lesson: T) => void;
  onFreeChat?: () => void;
  /** Existing streak value (days). Hidden when missing/0. */
  streak?: number | null;
  /** Rendered after a level's last lesson (the existing end-of-level test). */
  renderLevelEnd?: (levelId: string) => React.ReactNode;
  /** Sara's existing portrait. */
  saraImage?: string;
  /** Another teacher's portrait (/tutors/{id}.webp); wins over saraImage. */
  teacherImage?: string;
  /** Teacher shown on top of the map (default: Sara). */
  teacherNameAr?: string;
  teacherNameEn?: string;
  /** Shown instead of the photo if it fails to load. */
  teacherEmoji?: string;
  /** Number lessons across the whole track (default) or inside each level (like the levelled lists). */
  numbering?: 'track' | 'level';
  /** Student uid for the streak / room / parent card row (default: signed-in user). Read only. */
  uid?: string;
}

/** 🔥 The student's existing streak (read only; null when there is none). Nothing is written. */
export function useSaraStreak(uid?: string): number | null {
  const [streak, setStreak] = useState<number | null>(null);
  useEffect(() => {
    if (!uid) return;
    let alive = true;
    getStudentStreak(uid).then(s => { if (alive) setStreak(s.current > 0 ? s.current : null); }).catch(() => {});
    return () => { alive = false; };
  }, [uid]);
  return streak;
}

const NODE = 68;      // circle size (px)
const ROW = 112;      // vertical distance between nodes (px)
const STEP = 58;      // horizontal px per zigzag unit
const TOP = 84;       // first node centre (px)
const CEFR = /^[abc][12]$/i;

/** 🗺️ Duolingo-style winding lesson map for Sara's and the other teachers' lesson lists (display + navigation only; never writes progress). */
export function SaraLessonMap<T extends MapLesson>({ lessons, levels, sectionOf, unlocked, unlockAll, isOpen, lang, trackTitleAr, trackTitleEn, kind = 'grammar', colorOffset = 0, onOpen, onFreeChat, streak, renderLevelEnd, saraImage = '/tutors/sara.webp', teacherImage, teacherNameAr = 'سارة', teacherNameEn = 'Sara', teacherEmoji = '👩‍🏫', numbering = 'track', uid }: Props<T>) {
  const [photoBad, setPhotoBad] = useState(false);
  const gamify = useGamifyData(uid);
  // 🧒 The student's character from "غرفتي" (device only) walks on the map.
  const [avatar, setAvatar] = useState(() => readAvatar(gamify.uid));
  useEffect(() => {
    const re = () => setAvatar(readAvatar(gamify.uid)); re();
    window.addEventListener(ROOM_EVENT, re); window.addEventListener('storage', re);
    void syncRoom(gamify.uid); // the character chosen on another device walks here too
    return () => { window.removeEventListener(ROOM_EVENT, re); window.removeEventListener('storage', re); };
  }, [gamify.uid]);
  const [walked, setWalked] = useState(false);
  const t = (ar: string, en: string) => (lang === 'en' ? en : ar);
  const rtl = lang !== 'en';
  const secOf = (l: T) => (sectionOf ? sectionOf(l) : l.levelId) ?? 'all';
  const sections = useMemo(() => {
    const defs: SaraLessonMapLevel[] = levels?.length ? levels : [{ id: 'all', titleAr: trackTitleAr, titleEn: trackTitleEn }];
    return defs.map((lv, i) => ({ ...lv, index: i, lessons: lessons.filter(l => (levels?.length ? secOf(l) === lv.id : true)) })).filter(s => s.lessons.length);
  }, [lessons, levels, trackTitleAr, trackTitleEn, sectionOf]); // eslint-disable-line react-hooks/exhaustive-deps
  const openOf = (l: T) => (isOpen ? isOpen(l) : mapNodeOpen(l.order, unlocked, unlockAll));
  const currentOrder = useMemo(() => currentLessonOrder(lessons.map(l => l.order), unlocked), [lessons, unlocked]);
  const currentSection = Math.max(0, sections.findIndex(s => s.lessons.some(l => l.order === currentOrder)));
  const [tab, setTab] = useState(currentSection);
  useEffect(() => { setTab(currentSection); }, [currentSection]);
  const section = sections[Math.min(tab, sections.length - 1)];
  // Avatar walks from the previous lesson to the current one each time the level opens.
  useEffect(() => { setWalked(false); const id = setTimeout(() => setWalked(true), 450); return () => clearTimeout(id); }, [section?.id, currentOrder]);

  const scroller = useRef<HTMLDivElement>(null);
  const pathBox = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLButtonElement | null>(null);
  const [width, setWidth] = useState(360);
  const [currentVisible, setCurrentVisible] = useState(true);
  const [currentAbove, setCurrentAbove] = useState(false);

  useLayoutEffect(() => {
    const el = pathBox.current; if (!el) return;
    const measure = () => setWidth(el.clientWidth || 360);
    measure();
    const RO = (window as any).ResizeObserver;
    if (!RO) return;
    const ro = new RO(measure); ro.observe(el); return () => ro.disconnect();
  }, [section?.id]);

  // Show the floating "jump to my lesson" button whenever the current lesson is off-screen.
  useEffect(() => {
    const el = currentRef.current; const root = scroller.current;
    const IO = (window as any).IntersectionObserver;
    if (!el || !root || !IO) { setCurrentVisible(!!el); return; }
    const io = new IO((entries: IntersectionObserverEntry[]) => {
      const e = entries[0]; setCurrentVisible(e.isIntersecting);
      setCurrentAbove(e.boundingClientRect.top < (e.rootBounds?.top ?? 0));
    }, { root, threshold: 0.6 });
    io.observe(el); return () => io.disconnect();
  }, [section?.id, currentOrder]);

  const jumpToCurrent = (smooth = true) => {
    if (tab !== currentSection) { setTab(currentSection); requestAnimationFrame(() => setTimeout(() => jumpToCurrent(false), 30)); return; }
    currentRef.current?.scrollIntoView?.({ block: 'center', behavior: smooth ? 'smooth' : 'auto' });
  };
  // Open on the student's current lesson.
  useEffect(() => { const id = setTimeout(() => jumpToCurrent(false), 60); return () => clearTimeout(id); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!section) return null;
  const colorOf = (i: number) => levelColor('', i, colorOffset);
  const color = colorOf(section.index);
  const doneIn = (s: typeof section) => s.lessons.filter(l => mapNodeState(l.order, unlocked) === 'done').length;
  const shortOf = (s: typeof section) => s.shortAr ? t(s.shortAr, s.shortEn || s.shortAr) : CEFR.test(s.id) ? s.id.toUpperCase() : t(`المستوى ${s.index + 1}`, `Level ${s.index + 1}`);
  const sign = rtl ? -1 : 1; // first bend goes toward the reading direction
  const pts = section.lessons.map((_, i) => ({ x: width / 2 + sign * zigzagOffset(i) * STEP, y: TOP + i * ROW }));
  const pathD = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const a = pts[i - 1]; const my = (a.y + p.y) / 2;
    return `C ${a.x} ${my}, ${p.x} ${my}, ${p.x} ${p.y}`;
  }).join(' ');
  const height = TOP + (section.lessons.length - 1) * ROW + 90;
  // Path colour: coloured up to the current lesson, grey after it.
  const lastDoneIdx = section.lessons.reduce((acc, l, i) => (mapNodeState(l.order, unlocked) !== 'locked' ? i : acc), -1);
  const doneD = lastDoneIdx > 0 ? pathD.split(' C ').slice(0, lastDoneIdx + 1).join(' C ') : '';
  const showJump = !currentVisible || tab !== currentSection;
  const posInLevel = (l: T) => section.lessons.indexOf(l) + 1;
  const showLevelPos = numbering === 'level';
  const zoneOf = (s: { index: number }) => zoneFor(s.index);
  const zone = zoneOf(section);
  const sectionOpen = (s: typeof section) => s.lessons.some(l => openOf(l));
  const zoneLocked = !sectionOpen(section);
  const zoneIsNew = !zoneLocked && section.index > 0 && doneIn(section) === 0;
  const walkIdx = section.lessons.findIndex(l => l.order === currentOrder);
  const showAvatar = walkIdx >= 0 && openOf(section.lessons[walkIdx]);
  // Stands beside a lesson circle, on the side away from its title.
  const besideOf = (i: number) => {
    const p = pts[i] || pts[0];
    const lblLeft = p.x > width / 2 + 1 || (Math.abs(p.x - width / 2) <= 1 && (pts[i + 1]?.x ?? pts[i - 1]?.x ?? 0) > width / 2);
    return { x: p.x + (lblLeft ? 1 : -1) * (NODE / 2 + 30), y: p.y + 22 };
  };
  const avFrom = besideOf(Math.max(0, walkIdx - 1));
  const avTo = besideOf(Math.max(0, walkIdx));
  const avAt = walked ? avTo : avFrom;

  return (
    <div data-testid="sara-lesson-map" className="relative flex-1 min-h-0 flex flex-col bg-white" dir={rtl ? 'rtl' : 'ltr'}>
      <style>{`
        @keyframes slm-pulse { 0% { transform: scale(1); opacity: .55 } 100% { transform: scale(1.55); opacity: 0 } }
        @keyframes slm-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
        .slm-pulse { animation: slm-pulse 1.6s ease-out infinite }
        .slm-bob { animation: slm-bob 1.4s ease-in-out infinite }
        @keyframes slm-hop { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        .slm-hop { animation: slm-hop .45s ease-in-out infinite }
        @keyframes slm-pop { 0% { transform: scale(.6); opacity: 0 } 70% { transform: scale(1.08) } 100% { transform: scale(1); opacity: 1 } }
        .slm-pop { animation: slm-pop .6s ease-out both }
      `}</style>
      <div ref={scroller} className="flex-1 min-h-0 overflow-y-auto overscroll-contain pb-24">
        {/* Teacher header (Sara by default) */}
        <div className="m-3 rounded-3xl bg-gradient-to-br from-[#002147] to-[#0b3d7a] text-white p-3 flex items-center gap-3 shadow-md">
          {photoBad
            ? <span data-testid="sara-map-teacher-emoji" className="w-16 h-16 rounded-full border-[3px] border-[#E6C36A] bg-[#001a38] shrink-0 flex items-center justify-center text-[30px]">{teacherEmoji}</span>
            : <img data-testid="sara-map-teacher-photo" src={teacherImage || saraImage} alt={t(teacherNameAr, teacherNameEn)} width={64} height={64} onError={() => setPhotoBad(true)} className="w-16 h-16 rounded-full object-cover border-[3px] border-[#E6C36A] bg-[#001a38] shrink-0" />}
          <div className="flex-1 min-w-0">
            <p data-testid="sara-map-teacher-name" className="text-[15px] font-black">{t(teacherNameAr, teacherNameEn)}</p>
            <p className="text-[11px] text-amber-200 font-bold truncate">{t(trackTitleAr, trackTitleEn || trackTitleAr)}</p>
            {!!streak && streak > 0 && (
              <span data-testid="sara-map-streak" className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 text-[11px] font-black">🔥 {streak} {t('يوم', streak === 1 ? 'day' : 'days')}</span>
            )}
          </div>
          {onFreeChat && (
            <button data-testid="sara-map-free-chat" onClick={onFreeChat}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] text-white text-[12px] font-black active:translate-y-0.5 active:border-b-2">
              <MessageCircle size={16} /> {t('دردشة حرة', 'Free chat')}
            </button>
          )}
        </div>

        {/* 🔥 streak · 🏠 room · 🏅 parent card */}
        <GamifyBar data={gamify} lang={lang} />

        {/* Level tabs */}
        {sections.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-3 pb-1 no-scrollbar">
            {sections.map((s, i) => {
              const c = colorOf(s.index); const active = i === tab;
              return (
                <button key={s.id} data-testid={`sara-map-tab-${s.id}`} onClick={() => setTab(i)}
                  className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-black border-2"
                  style={active ? { background: c.fill, borderColor: c.shadow, color: '#fff' } : { background: '#fff', borderColor: '#e5e7eb', color: '#475569' }}>
                  {sectionOpen(s) ? zoneOf(s).emoji : '🔒'} {shortOf(s)} · {doneIn(s)}/{s.lessons.length}
                </button>
              );
            })}
          </div>
        )}

        {/* Unit banner */}
        <div className="mx-3 mt-2 rounded-2xl p-3 text-white" style={{ background: color.fill, boxShadow: `0 4px 0 ${color.shadow}` }}>
          <p className="text-[11px] font-black opacity-90">{sections.length > 1 ? t(`المستوى ${section.index + 1} · ${section.lessons.length} درس`, `Level ${section.index + 1} · ${section.lessons.length} lessons`) : t(`${section.lessons.length} درس`, `${section.lessons.length} lessons`)}</p>
          <p className="text-[15px] font-black leading-snug">{t(section.titleAr, section.titleEn || section.titleAr)}</p>
          <p data-testid="sara-map-zone-name" className="text-[11px] font-black opacity-95">{zone.emoji} {t(zone.nameAr, zone.nameEn)}{zoneLocked ? t(' · مقفلة', ' · locked') : ''}</p>
          {zoneIsNew && <p data-testid="sara-map-zone-new" className="slm-pop mt-1 inline-block px-2 py-0.5 rounded-full bg-white/25 text-[11px] font-black">✨ {t('منطقة جديدة انفتحت لك!', 'New zone unlocked!')}</p>}
          {section.noteAr && <p data-testid="sara-map-level-note" className="text-[11px] font-bold opacity-90">🔒 {t(section.noteAr, section.noteEn || section.noteAr)}</p>}
          <div className="mt-2 h-2.5 rounded-full bg-white/30 overflow-hidden">
            <div className="h-full rounded-full bg-white" style={{ width: `${Math.round((doneIn(section) / section.lessons.length) * 100)}%` }} />
          </div>
        </div>

        {/* Winding path */}
        <div ref={pathBox} dir="ltr" className="relative mx-auto w-full mt-2" style={{ height }}>
          <MapZoneScene zone={zone} width={width} height={height} rows={pts} locked={zoneLocked} />
          <svg className="absolute left-0 top-0 pointer-events-none" width={width} height={height} aria-hidden>
            <path d={pathD} fill="none" stroke="#e5e7eb" strokeWidth={14} strokeLinecap="round" />
            {doneD && <path d={doneD} fill="none" stroke={color.soft} strokeWidth={14} strokeLinecap="round" />}
            <path d={pathD} fill="none" stroke="#ffffff" strokeWidth={3} strokeDasharray="2 12" strokeLinecap="round" opacity={0.9} />
          </svg>
          {section.lessons.map((l, i) => {
            const state: MapNodeState = mapNodeState(l.order, unlocked);
            const open = openOf(l);
            const p = pts[i];
            const isCurrent = state === 'current' && open;
            const isJumpTarget = l.order === currentOrder;
            // Title sits beside the circle, on the roomier side (away from the bend).
            const labelLeft = p.x > width / 2 + 1 || (Math.abs(p.x - width / 2) <= 1 && (pts[i + 1]?.x ?? pts[i - 1]?.x ?? 0) > width / 2);
            const fill = !open ? '#e5e7eb' : color.fill;
            const shadow = !open ? '#c4c9d1' : color.shadow;
            const num = showLevelPos ? posInLevel(l) : l.order;
            return (
              <div key={l.id} className="absolute" style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}>
                <button
                  ref={isJumpTarget ? (el => { currentRef.current = el; }) : undefined}
                  data-testid={`sara-map-node-${l.id}`} data-state={open || state === 'done' ? state : 'locked'} disabled={!open}
                  onClick={() => open && onOpen(l)}
                  aria-label={`${num}. ${t(l.titleAr, l.titleEn || l.titleAr)}`}
                  className="relative rounded-full flex items-center justify-center transition-transform active:translate-y-1 disabled:cursor-not-allowed"
                  style={{ width: NODE, height: NODE, background: fill, boxShadow: `0 6px 0 ${shadow}` }}>
                  {isCurrent && <span className="slm-pulse absolute inset-0 rounded-full" style={{ background: color.fill }} />}
                  {isCurrent && <span className="absolute -inset-2 rounded-full border-4" style={{ borderColor: color.soft }} />}
                  <span className={`relative text-[28px] leading-none ${!open ? 'grayscale opacity-50' : ''}`}>{l.icon || lessonIcon(l.titleEn || l.titleAr, i, kind)}</span>
                  {state === 'done' && (
                    <span className="absolute -bottom-1 -end-1 w-6 h-6 rounded-full bg-[#ffc800] border-2 border-white flex items-center justify-center text-white shadow"><Check size={14} strokeWidth={4} /></span>
                  )}
                  {!open && (
                    <span className="absolute -bottom-1 -end-1 w-6 h-6 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center text-white"><Lock size={12} strokeWidth={3} /></span>
                  )}
                </button>
                <div dir={rtl ? 'rtl' : 'ltr'} className="absolute top-1/2 -translate-y-1/2 w-[128px]"
                  style={labelLeft ? { right: NODE + 12, textAlign: 'right' } : { left: NODE + 12, textAlign: 'left' }}>
                  <p className={`inline-block px-2 py-1 rounded-xl bg-white/95 text-[11px] font-black leading-tight line-clamp-3 ${open ? 'text-slate-800' : 'text-slate-400'}`}
                    style={isCurrent ? { boxShadow: `0 0 0 2px ${color.fill}` } : undefined}>
                    <span style={{ color: open ? color.shadow : undefined }}>{num}.</span> {t(l.titleAr, l.titleEn || l.titleAr)}
                  </p>
                  {isCurrent && (
                    <span className="slm-bob mt-1 block w-fit px-2.5 py-0.5 rounded-lg text-white text-[11px] font-black"
                      style={{ background: color.fill, boxShadow: `0 3px 0 ${color.shadow}`, marginInlineStart: labelLeft === rtl ? 0 : 'auto' }}>
                      {t('ابدأ ◀', 'Start ▶')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {showAvatar && (
            <div data-testid="sara-map-avatar" data-walked={walked ? '1' : '0'} className="absolute z-10 pointer-events-none"
              style={{ left: avAt.x, top: avAt.y, transform: 'translate(-50%,-100%)', transition: 'left 1.1s ease-in-out, top 1.1s ease-in-out' }}>
              <div className={walked ? 'slm-bob' : 'slm-hop'}>
                <AvatarFigure character={avatar.character} hat={avatar.hat} pet={avatar.pet} size={34} />
              </div>
            </div>
          )}
        </div>
        {renderLevelEnd && <div className="px-3 pb-4">{renderLevelEnd(section.id)}</div>}
        {tab < sections.length - 1 && (
          <div className="px-3 pb-6">
            <button data-testid="sara-map-next-level" onClick={() => { setTab(tab + 1); scroller.current?.scrollTo?.({ top: 0 }); }}
              className="w-full py-2.5 rounded-2xl border-2 border-slate-200 text-[12px] font-black text-slate-600">
              {t('المستوى التالي ←', 'Next level →')}
            </button>
          </div>
        )}
      </div>

      {showJump && currentOrder !== null && (
        <button data-testid="sara-map-jump" onClick={() => jumpToCurrent()} aria-label={t('ارجع لدرسي', 'Go to my lesson')}
          className="absolute bottom-5 end-4 z-20 w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 shadow-lg flex items-center justify-center"
          style={{ color: colorOf(currentSection).fill }}>
          {currentAbove && tab === currentSection ? <ChevronsUp size={28} strokeWidth={3} /> : <ChevronsDown size={28} strokeWidth={3} />}
        </button>
      )}
    </div>
  );
}

export default SaraLessonMap;
