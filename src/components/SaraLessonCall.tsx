import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { SaraLivePhoneCallModal, type PhoneScenario } from './SaraLivePhoneCallModal';
import { saraStopNarrator } from './SaraTrackPlayer';

export type CallPreset = PhoneScenario & { keyPhrases?: string[]; trackTag?: string };
const LEVEL_CEFR: Record<string, string> = { a: 'A1', b: 'A2', c: 'B1', d: 'B2' };
export const levelToCefr = (levelId?: string) => LEVEL_CEFR[levelId || 'a'] || 'A2';

/** Lesson-based voice dialogue: Sara stays on this lesson's topic and nudges the student to use its key phrases / words / rule. */
export function lessonCallPreset(o: { id: string; titleAr: string; titleEn: string; icon?: string; kind: 'role' | 'vocab' | 'grammar' | 'conversation'; phrases: string[]; rule?: string; starter?: string; tag: string }): CallPreset {
  const ph = o.phrases.filter(Boolean).slice(0, 6);
  const how = {
    role: `Role-play the everyday situation "${o.titleEn}". You play the other person in the situation (not a tutor); stay in role.`,
    vocab: `Have a natural conversation built around the lesson topic "${o.titleEn}" that makes the student use the lesson's words.`,
    grammar: `Have a natural conversation that makes the student use the grammar point "${o.titleEn}"${o.rule ? ` (${o.rule.slice(0, 160)})` : ''}. Ask questions whose natural answer needs it.`,
    conversation: `Practise the lesson "${o.titleEn}" as a real conversation; ask questions that need the lesson's expressions.`,
  }[o.kind];
  return {
    id: `lesson-${o.id}`, titleAr: `حاور سارة: ${o.titleAr}`, titleEn: `Talk with Sara: ${o.titleEn}`, icon: o.icon || '💬', category: 'Lesson',
    initialPrompt: `${how} Target ${o.kind === 'vocab' ? 'words' : 'phrases'}: ${ph.join(' | ')}. If the student has not used one yet, steer the talk so they need it; praise briefly when they do.`,
    starterSaraSpeech: o.starter || `Let's practise "${o.titleEn}" together. Are you ready? Tell me, how would you start?`,
    starterSaraSpeechAr: '', keyPhrases: ph, trackTag: o.tag,
  };
}

export const FREE_CALL_PRESET: CallPreset = {
  id: 'free-talk', titleAr: 'محاورة حرة مع سارة', titleEn: 'Free conversation with Sara', icon: '💬', category: 'Free',
  initialPrompt: 'Open, friendly free conversation about anything the student wants. Follow their topic, ask one question at a time.',
  starterSaraSpeech: "Hi! Let's just chat in English. What would you like to talk about today?", starterSaraSpeechAr: '',
};

/** The two buttons shown after a lesson's exercises, plus the call screen. Sara's cloud voice only (call engine). */
const SaraLessonCall: React.FC<{ preset: CallPreset; uid?: string; level?: string; withFree?: boolean; studentName?: string; label?: string }> = ({ preset, uid, level, withFree, studentName, label }) => {
  const [open, setOpen] = useState<CallPreset | null>(null);
  const start = (p: CallPreset) => { saraStopNarrator(); setOpen(p); };
  return (
    <>
      <div className="flex gap-1.5 w-full">
        <button data-testid="lesson-call" onClick={() => start(preset)} className="flex-1 py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-[13px] flex items-center justify-center gap-1.5 border-2 border-[#C49E3A]">
          <Phone size={15} />{label || 'حاور سارة'}
        </button>
        {withFree && <button data-testid="free-call" onClick={() => start(FREE_CALL_PRESET)} className="flex-1 py-2.5 rounded-xl bg-white text-[#002147] font-black text-[13px] flex items-center justify-center gap-1.5 border-2 border-[#C49E3A]">
          <MessageCircle size={15} />محاورة حرة
        </button>}
      </div>
      {open && <SaraLivePhoneCallModal isOpen onClose={() => setOpen(null)} studentName={studentName || ''} studentLevel={level || 'A2'} isRtl studentId={uid} preset={open} />}
    </>
  );
};
export default SaraLessonCall;
