import { useT } from '../lib/explainLang';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mic, Send, Square } from 'lucide-react';
import { playCloudAudioAs, cancelAllSpeech, fetchCloudVoice } from '../lib/audio';
import type { BoardPersona } from '../data/saraBoardPersonas';

/**
 * 💬 محاورة نورة / محمد / علي — the same streamed conversation mechanism as Sara's free talk (/api/sara/call-turn, NDJSON
 * sentences + cloud audio), with the tutor's own role and own Gemini voice (persona param). Sara's call modal is not used or changed.
 */
const OWNER = 'tutor-talk';
const STARTERS: Record<string, { en: string; scenario: string }> = {
  grammar: { en: "Hi! I'm Noura. Tell me about your day, and I'll help you fix any mistakes as we talk. What did you do today?", scenario: 'Everyday chat: the student talks about daily life; gently model the correct form of typical Arabic-speaker mistakes' },
  business: { en: "Hello, I'm Mohammed. Let's practise English for work. Could you introduce yourself and tell me what you do?", scenario: 'Workplace English: introductions, meetings, emails, small talk with colleagues and job interview answers' },
  exams: { en: "Hi, I'm Ali. Let's practise IELTS Speaking Part 1. First question: do you work or are you a student?", scenario: 'IELTS Speaking practice: ask one exam-style question at a time (Part 1 topics), encourage extended answers with reasons and examples' },
};
type Line = { role: 'tutor' | 'me'; text: string };

/** In-lesson conversation (like Sara's lesson chat): scoped to this lesson's topic and examples only. */
export type TutorLessonTopic = { titleEn: string; titleAr: string; examples: string[] };
export const TutorConversation: React.FC<{ persona: BoardPersona; level?: string; name?: string; onBack: () => void; lesson?: TutorLessonTopic }> = ({ persona, level = 'B1', name = '', onBack, lesson }) => {
  const base = STARTERS[persona.id] || STARTERS.grammar;
  const tr = useT(); const NM = tr(persona.nameAr, persona.nameEn);
  const st = lesson ? {
    en: `Hi! Let's practise today's lesson: ${lesson.titleEn}. I'll ask you questions about it. Ready? Try making your own sentence like: ${lesson.examples[0] || ''}`,
    scenario: `In-lesson practice ONLY about this lesson: "${lesson.titleEn}". Stay on this lesson's point.`,
    context: `Lesson: "${lesson.titleEn}" (${lesson.titleAr}). Lesson examples: ${lesson.examples.join(' | ')}. Ask one short question at a time that makes the student use exactly this point, gently model the correct form when they get it wrong, and if they drift off-topic, kindly bring them back to this lesson.`,
  } : { ...base, context: '' };
  const [lines, setLines] = useState<Line[]>([{ role: 'tutor', text: st.en }]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [err, setErr] = useState('');
  const queue = useRef<{ text: string; audio?: string | null }[]>([]);
  const playIdx = useRef(0);
  const playing = useRef<{ stop: () => void } | null>(null);
  const turn = useRef(0);
  const pumping = useRef(-1);
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [lines]);

  const stopAudio = () => { turn.current++; try { playing.current?.stop(); } catch { /* ignore */ } playing.current = null; cancelAllSpeech(OWNER); setSpeaking(false); };
  useEffect(() => () => stopAudio(), []); // eslint-disable-line react-hooks/exhaustive-deps

  /** Play queued sentences in order as their audio arrives (tutor's cloud voice only, never a browser voice). */
  const pump = async (t: number, done: () => boolean) => {
    if (pumping.current === t) return; // one player loop per turn
    pumping.current = t;
    while (t === turn.current) {
      const seg = queue.current[playIdx.current];
      if (!seg || seg.audio === undefined) { if (done() && playIdx.current >= queue.current.length) { setSpeaking(false); pumping.current = -1; return; } await new Promise(r => setTimeout(r, 120)); continue; }
      playIdx.current++;
      if (!seg.audio) continue;
      setSpeaking(true);
      await new Promise<void>(res => { void playCloudAudioAs(OWNER, seg.audio!, () => res()).then(p => { playing.current = p; if (!p) res(); }); });
      playing.current = null;
    }
  };

  const speakStarter = async () => {
    stopAudio(); const t = turn.current;
    try {
      const j = await fetchCloudVoice(st.en, persona.voice);
      if (!j?.audio || t !== turn.current) { if (!j?.audio) setErr(tr('الصوت غير متاح الآن', 'Audio is not available right now')); return; }
      queue.current = [{ text: st.en, audio: j.audio }]; playIdx.current = 0; void pump(t, () => true);
    } catch { setErr(tr('الصوت غير متاح الآن', 'Audio is not available right now')); }
  };

  const send = async (msg: string) => {
    const m = msg.trim(); if (!m || busy) return;
    stopAudio(); const t = turn.current;
    setErr(''); setText('');
    const history = lines.slice(-8).map(l => ({ role: l.role === 'tutor' ? 'model' : 'user', text: l.text }));
    setLines(ls => [...ls, { role: 'me', text: m }]);
    setBusy(true);
    queue.current = []; playIdx.current = 0;
    let finished = false; let first = true;
    try {
      const r = await fetch('/api/sara/call-turn', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: m, history, scenario: `${persona.nameEn}: ${st.scenario}`, context: st.context, level, name, persona: persona.id }) });
      if (!r.ok || !r.body) throw new Error(String(r.status));
      const reader = r.body.getReader(); const dec = new TextDecoder(); let buf = ''; let failed = false;
      const handle = (line: string) => {
        if (!line.trim() || t !== turn.current) return;
        let ev: any; try { ev = JSON.parse(line); } catch { return; }
        if (ev.t === 's') {
          queue.current[ev.i] = { text: ev.text, audio: queue.current[ev.i]?.audio };
          setLines(ls => first ? [...ls, { role: 'tutor', text: ev.text }] : [...ls.slice(0, -1), { role: 'tutor', text: `${ls[ls.length - 1].text} ${ev.text}` }]);
          first = false;
        } else if (ev.t === 'a') { if (queue.current[ev.i]) queue.current[ev.i].audio = ev.audio || null; void pump(t, () => finished); }
        else if (ev.t === 'error') failed = true;
      };
      for (;;) { const { value, done } = await reader.read(); if (done) break; buf += dec.decode(value, { stream: true }); let nl: number; while ((nl = buf.indexOf('\n')) >= 0) { handle(buf.slice(0, nl)); buf = buf.slice(nl + 1); } }
      handle(buf);
      finished = true;
      queue.current.forEach(s => { if (s && s.audio === undefined) s.audio = null; });
      if (failed && first) throw new Error('AI');
      void pump(t, () => true);
    } catch { if (t === turn.current) setErr(tr(`${persona.nameAr} ما ${persona.gender === 'female' ? 'قدرت ترد' : 'قدر يرد'} الحين، جرّب مرة ثانية.`, `${persona.nameEn} could not reply right now, please try again.`)); }
    finally { setBusy(false); }
  };

  const mic = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setErr(tr('المايك غير مدعوم في هذا المتصفح، اكتب رسالتك.', 'The mic is not supported in this browser, please type.')); return; }
    stopAudio();
    const rec = new SR(); rec.lang = 'en-US'; rec.interimResults = false;
    rec.onresult = (e: any) => { const tr = e.results?.[0]?.[0]?.transcript || ''; if (tr) void send(tr); };
    rec.onend = () => setListening(false); rec.onerror = () => setListening(false);
    setListening(true); rec.start();
  };

  return (
    <div data-testid={`tutor-talk-${persona.id}`} className="flex-1 min-h-0 p-3 flex flex-col gap-2 bg-[#001a38] text-white overflow-hidden">
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={() => { stopAudio(); onBack(); }} aria-label={tr("رجوع", "Back")} className="p-1.5 rounded-lg bg-white/10"><ArrowRight size={16} /></button>
        <span className={`w-9 h-9 rounded-full bg-[#0a2d5c] border-2 border-[#C49E3A] flex items-center justify-center text-[18px] ${speaking ? 'ring-4 ring-amber-300/50 animate-pulse' : ''}`}>{persona.emoji}</span>
        <div className="min-w-0 flex-1"><p className="text-[13px] font-black text-amber-300">{tr('محاورة', 'Talk with')} {NM}</p><p className="text-[10px] font-bold text-white/70 truncate">{lesson ? tr(lesson.titleAr, lesson.titleEn) : tr(persona.roleAr, persona.roleEn || persona.nameEn)} · {tr(persona.gender === 'female' ? 'ترد بصوتها' : 'يرد بصوته', 'replies in their own voice')}</p></div>
        {speaking
          ? <button onClick={stopAudio} className="px-2.5 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[11px] font-black"><Square size={12} className="inline" /> {tr("إيقاف", "Stop")}</button>
          : <button onClick={() => void speakStarter()} data-testid="tutor-talk-listen" className="px-2.5 py-1.5 rounded-xl bg-white/10 border border-amber-400/50 text-[11px] font-black">🔊 {tr("البداية", "Start")}</button>}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-1.5 rounded-2xl bg-[#0a2d5c]/60 border border-white/10 p-2" data-testid="tutor-talk-lines">
        {lines.map((l, i) => (
          <p key={i} dir="ltr" className={`max-w-[85%] px-3 py-2 rounded-2xl text-[13.5px] font-bold leading-snug text-start ${l.role === 'tutor' ? 'self-start bg-white text-[#001a38]' : 'self-end bg-amber-400 text-[#001a38]'}`}>{l.text}</p>
        ))}
        {busy && <p className="self-start text-[11px] font-bold text-amber-200">{NM} {tr(persona.gender === 'female' ? 'تكتب' : 'يكتب', 'is typing')}…</p>}
        <div ref={endRef} />
      </div>
      {err && <p className="text-[12px] font-bold text-rose-300 shrink-0">{err}</p>}
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={mic} disabled={busy} aria-label="mic" data-testid="tutor-talk-mic" className={`p-3 rounded-xl ${listening ? 'bg-rose-500 animate-pulse' : 'bg-amber-400 text-[#001a38]'}`}><Mic size={18} /></button>
        <input dir="ltr" value={text} maxLength={600} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') void send(text); }}
          placeholder="Type in English…" data-testid="tutor-talk-input"
          className="flex-1 min-w-0 rounded-xl bg-[#0a2d5c] border border-amber-400/40 px-3 py-2.5 text-[14px] font-bold text-white placeholder:text-white/30 outline-none focus:border-amber-400" />
        <button onClick={() => void send(text)} disabled={busy || !text.trim()} aria-label="send" data-testid="tutor-talk-send" className="p-3 rounded-xl bg-[#C49E3A] text-[#001a38] disabled:opacity-40"><Send size={18} /></button>
      </div>
    </div>
  );
};
export default TutorConversation;
