import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Lock, Check, MessageCircle, ChevronsDown, ChevronsUp } from 'lucide-react';
import type { SaraTrackLesson } from '../data/saraTracks/foundations';
import { mapNodeState, mapNodeOpen, currentLessonOrder, zigzagOffset, lessonIcon, levelColor, type MapNodeState } from '../lib/saraLessonMap';

export interface SaraLessonMapLevel { id: string; titleAr: string; titleEn?: string }

interface Props {
  lessons: SaraTrackLesson[];
  levels?: SaraLessonMapLevel[];
  /** Existing saved progress counter (highest open lesson order). Read only. */
  unlocked: number;
  unlockAll?: boolean;
  lang: 'ar' | 'en';
  trackTitleAr: string;
  trackTitleEn?: string;
  onOpen: (lesson: SaraTrackLesson) => void;
  onFreeChat?: () => void;
  /** Existing streak value (days). Hidden when missing/0. */
  streak?: number | null;
  /** Rendered after a level's last lesson (the existing end-of-level test button). */
  renderLevelEnd?: (levelId: string) => React.ReactNode;
  /** Sara's existing portrait. */
  saraImage?: string;
}

const NODE = 68;      // circle size (px)
const ROW = 112;      // vertical distance between nodes (px)
const STEP = 58;      // horizontal px per zigzag unit
const TOP = 84;       // first node centre (px)

/** 🗺️ Duolingo-style winding lesson map for one of Sara's tracks (display + navigation only). */
export const SaraLessonMap: React.FC<Props> = ({ lessons, levels, unlocked, unlockAll, lang, trackTitleAr, trackTitleEn, onOpen, onFreeChat, streak, renderLevelEnd, saraImage = '/tutors/sara.webp' }) => {
  const t = (ar: string, en: string) => (lang === 'en' ? en : ar);
  const rtl = lang !== 'en';
  const sections = useMemo(() => {
    const defs = levels?.length ? levels : [{ id: lessons[0]?.levelId || 'all', titleAr: trackTitleAr, titleEn: trackTitleEn }];
    const out = defs.map((lv, i) => ({ ...lv, index: i, lessons: lessons.filter(l => (levels?.length ? l.levelId === lv.id : true)) })).filter(s => s.lessons.length);
    return out;
  }, [lessons, levels, trackTitleAr, trackTitleEn]);
  const currentOrder = useMemo(() => currentLessonOrder(lessons.map(l => l.order), unlocked), [lessons, unlocked]);
  const currentSection = Math.max(0, sections.findIndex(s => s.lessons.some(l => l.order === currentOrder)));
  const [tab, setTab] = useState(currentSection);
  useEffect(() => { setTab(currentSection); }, [currentSection]);
  const section = sections[Math.min(tab, sections.length - 1)];

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
  const color = levelColor(section.id, section.index);
  const doneIn = (s: typeof section) => s.lessons.filter(l => mapNodeState(l.order, unlocked) === 'done').length;
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

  return (
    <div data-testid="sara-lesson-map" className="relative flex-1 min-h-0 flex flex-col bg-white" dir={rtl ? 'rtl' : 'ltr'}>
      <style>{`
        @keyframes slm-pulse { 0% { transform: scale(1); opacity: .55 } 100% { transform: scale(1.55); opacity: 0 } }
        @keyframes slm-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
        .slm-pulse { animation: slm-pulse 1.6s ease-out infinite }
        .slm-bob { animation: slm-bob 1.4s ease-in-out infinite }
      `}</style>
      <div ref={scroller} className="flex-1 min-h-0 overflow-y-auto overscroll-contain pb-24">
        {/* Sara header */}
        <div className="m-3 rounded-3xl bg-gradient-to-br from-[#002147] to-[#0b3d7a] text-white p-3 flex items-center gap-3 shadow-md">
          <img src={saraImage} alt={t('سارة', 'Sara')} width={64} height={64} className="w-16 h-16 rounded-full object-cover border-[3px] border-[#E6C36A] bg-[#001a38] shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-black">{t('سارة', 'Sara')}</p>
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

        {/* Level tabs */}
        {sections.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-3 pb-1 no-scrollbar">
            {sections.map((s, i) => {
              const c = levelColor(s.id, s.index); const active = i === tab;
              return (
                <button key={s.id} data-testid={`sara-map-tab-${s.id}`} onClick={() => setTab(i)}
                  className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-black border-2"
                  style={active ? { background: c.fill, borderColor: c.shadow, color: '#fff' } : { background: '#fff', borderColor: '#e5e7eb', color: '#475569' }}>
                  {s.id === 'a' ? t('التأسيس', 'Foundations') : s.id.toUpperCase()} · {doneIn(s)}/{s.lessons.length}
                </button>
              );
            })}
          </div>
        )}

        {/* Unit banner */}
        <div className="mx-3 mt-2 rounded-2xl p-3 text-white" style={{ background: color.fill, boxShadow: `0 4px 0 ${color.shadow}` }}>
          <p className="text-[11px] font-black opacity-90">{t(`المستوى ${section.index + 1} · ${section.lessons.length} درس`, `Level ${section.index + 1} · ${section.lessons.length} lessons`)}</p>
          <p className="text-[15px] font-black leading-snug">{t(section.titleAr, section.titleEn || section.titleAr)}</p>
          <div className="mt-2 h-2.5 rounded-full bg-white/30 overflow-hidden">
            <div className="h-full rounded-full bg-white" style={{ width: `${Math.round((doneIn(section) / section.lessons.length) * 100)}%` }} />
          </div>
        </div>

        {/* Winding path */}
        <div ref={pathBox} dir="ltr" className="relative mx-auto w-full" style={{ height }}>
          <svg className="absolute left-0 top-0 pointer-events-none" width={width} height={height} aria-hidden>
            <path d={pathD} fill="none" stroke="#e5e7eb" strokeWidth={14} strokeLinecap="round" />
            {doneD && <path d={doneD} fill="none" stroke={color.soft} strokeWidth={14} strokeLinecap="round" />}
            <path d={pathD} fill="none" stroke="#ffffff" strokeWidth={3} strokeDasharray="2 12" strokeLinecap="round" opacity={0.9} />
          </svg>
          {section.lessons.map((l, i) => {
            const state: MapNodeState = mapNodeState(l.order, unlocked);
            const open = mapNodeOpen(l.order, unlocked, unlockAll);
            const p = pts[i];
            const isCurrent = state === 'current';
            const isJumpTarget = l.order === currentOrder;
            // Title sits beside the circle, on the roomier side (away from the bend).
            const labelLeft = p.x > width / 2 + 1 || (Math.abs(p.x - width / 2) <= 1 && (pts[i + 1]?.x ?? pts[i - 1]?.x ?? 0) > width / 2);
            const fill = state === 'locked' && !open ? '#e5e7eb' : color.fill;
            const shadow = state === 'locked' && !open ? '#c4c9d1' : color.shadow;
            return (
              <div key={l.id} className="absolute" style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}>
                <button
                  ref={isJumpTarget ? (el => { currentRef.current = el; }) : undefined}
                  data-testid={`sara-map-node-${l.id}`} data-state={state} disabled={!open}
                  onClick={() => open && onOpen(l)}
                  aria-label={`${l.order}. ${t(l.titleAr, l.titleEn)}`}
                  className="relative rounded-full flex items-center justify-center transition-transform active:translate-y-1 disabled:cursor-not-allowed"
                  style={{ width: NODE, height: NODE, background: fill, boxShadow: `0 6px 0 ${shadow}` }}>
                  {isCurrent && <span className="slm-pulse absolute inset-0 rounded-full" style={{ background: color.fill }} />}
                  {isCurrent && <span className="absolute -inset-2 rounded-full border-4" style={{ borderColor: color.soft }} />}
                  <span className={`relative text-[28px] leading-none ${!open ? 'grayscale opacity-50' : ''}`}>{lessonIcon(l.titleEn, i)}</span>
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
                    <span style={{ color: open ? color.shadow : undefined }}>{l.order}.</span> {t(l.titleAr, l.titleEn)}
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
        </div>
        {renderLevelEnd && <div className="px-3 pb-4">{renderLevelEnd(section.id)}</div>}
        {tab < sections.length - 1 && (
          <div className="px-3 pb-6">
            <button onClick={() => { setTab(tab + 1); scroller.current?.scrollTo?.({ top: 0 }); }}
              className="w-full py-2.5 rounded-2xl border-2 border-slate-200 text-[12px] font-black text-slate-600">
              {t('المستوى التالي ←', 'Next level →')}
            </button>
          </div>
        )}
      </div>

      {showJump && currentOrder !== null && (
        <button data-testid="sara-map-jump" onClick={() => jumpToCurrent()} aria-label={t('ارجع لدرسي', 'Go to my lesson')}
          className="absolute bottom-5 end-4 z-20 w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 shadow-lg flex items-center justify-center"
          style={{ color: levelColor(sections[currentSection].id, currentSection).fill }}>
          {currentAbove && tab === currentSection ? <ChevronsUp size={28} strokeWidth={3} /> : <ChevronsDown size={28} strokeWidth={3} />}
        </button>
      )}
    </div>
  );
};

export default SaraLessonMap;
