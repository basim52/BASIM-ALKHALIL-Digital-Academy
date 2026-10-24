import React from 'react';
import { useT } from '../lib/explainLang';
import type { BoardPersona } from '../data/saraBoardPersonas';
import type { KidsCard } from '../data/tutorTracks/nouraL1';
import { TutorVideoFace } from './tutor3d/TutorVideoFace';
import './tutor3d/tutorBoard.css';

/** Mark the lesson word inside a sentence card (whole word, first match). */
const Marked: React.FC<{ en: string; hl?: string; color: string }> = ({ en, hl, color }) => {
  if (!hl) return <>{en}</>;
  const m = new RegExp(`(^|[^\\w'])(${hl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![\\w'])`).exec(en);
  if (!m) return <>{en}</>;
  const at = m.index + m[1].length;
  return <>{en.slice(0, at)}<span className="px-1 rounded-md text-white" style={{ background: color }}>{m[2]}</span>{en.slice(at + m[2].length)}</>;
};

/** «من الصفر» board: the teacher's video face + numbered picture cards (emoji, bold English, Arabic under it) in her own bright frame. */
export const KidsCardBoard: React.FC<{ persona: BoardPersona; listTitle: string; cards: KidsCard[]; speaking: boolean; onSpeak: () => void }> = ({ persona, listTitle, cards, speaking, onSpeak }) => {
  const t = useT(); const k = persona.kids!;
  const NM = t(persona.nameAr, persona.nameEn);
  const sentences = cards.some(c => c.en.includes(' '));
  return (
    <div data-testid="kids-board" data-persona={persona.id} className="w-full h-full rounded-3xl overflow-hidden flex flex-col" style={{ background: k.soft, border: `5px solid ${k.accent}` }}>
      <div className="shrink-0 flex items-center gap-2.5 px-3 pt-2.5 pb-2" style={{ background: '#fff', borderBottom: `3px dashed ${k.accent}55` }}>
        <button type="button" onClick={onSpeak} aria-label={t(`استمع لـ${persona.nameAr}`, `Listen to ${persona.nameEn}`)} data-testid="kids-face"
          className="relative shrink-0 w-[68px] h-[68px] rounded-full" style={{ border: `4px solid ${k.accent}`, boxShadow: speaking ? `0 0 16px ${k.accent}` : undefined }}>
          <TutorVideoFace id={persona.id} alt={NM} isSpeaking={speaking} onFail={() => {}} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black" style={{ color: k.accent }}>{persona.emoji} {NM}</p>
          <p dir="ltr" className="text-[17px] leading-tight font-black text-start" style={{ color: k.ink }} data-testid="kids-list-title">{listTitle}</p>
        </div>
      </div>
      <ol className={`flex-1 min-h-0 overflow-y-auto p-2.5 grid gap-2 content-start ${sentences ? 'grid-cols-1' : 'grid-cols-2'}`} dir="ltr">
        {cards.map((c, i) => (
          <li key={i} data-testid="kids-card" className={`relative rounded-2xl bg-white shadow-sm flex ${sentences ? 'flex-row items-center gap-2.5 px-2.5 py-2' : 'flex-col items-center text-center px-2 pt-3 pb-2'}`} style={{ border: `3px solid ${k.accent}40` }}>
            <span className={`${sentences ? 'static' : 'absolute top-1.5 left-1.5'} shrink-0 w-6 h-6 rounded-full text-white text-[12px] font-black flex items-center justify-center`} style={{ background: k.accent }}>{i + 1}</span>
            <span className={`${sentences ? 'text-[30px]' : 'text-[40px]'} leading-none`} aria-hidden>{c.emoji}</span>
            <span className={`min-w-0 ${sentences ? 'flex-1 text-start' : ''}`}>
              <span className={`block font-black ${sentences ? 'text-[16px] leading-snug' : 'text-[19px] mt-1'}`} style={{ color: k.ink }}><Marked en={c.en} hl={c.hl} color={k.accent} /></span>
              {t(c.ar, '') && <span dir="rtl" className={`block text-[13px] font-bold text-slate-500 ${sentences ? 'text-end' : ''}`}>{c.ar}</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default KidsCardBoard;
