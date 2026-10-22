import { useT } from '../lib/explainLang';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tldraw, createShapeId, toRichText, renderPlaintextFromRichText, type Editor, type TLShape } from 'tldraw';
import { playCloudAudioAs, cancelAllSpeech } from '../lib/audio';
import { getExplainLang } from '../lib/explainLang';
import ExplainLangToggle from './ExplainLangToggle';
import 'tldraw/tldraw.css';
import './tutor3d/tutorBoard.css';
import type { BoardToolCall } from '../lib/boardActions';
import { Tutor3DAvatar } from './tutor3d/Tutor3DAvatar';
import { personaById } from '../data/saraBoardPersonas';

/**
 * Port of ai-tutor-platform's lesson whiteboard: full native tldraw editor (style panel, toolbar, page menu, zoom),
 * the board toolbar chips above it, and the 3D tutor avatar beside it (desktop) or floating (mobile).
 * Tutor tool calls are applied like the original applyAction (drawBoardText / highlightError / addNote), one by one (write-on).
 */
const STEP_MS = 1100;
/** WebGL can be unavailable (old phones, some browsers): never let the avatar take the board down. */
class AvatarBoundary extends React.Component<{ children: React.ReactNode; name: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(e: unknown) { console.warn('[tutor-avatar] disabled:', e); }
  render() { return this.state.failed ? <div className="w-full h-full rounded-xl bg-[#001a38] text-amber-300 flex items-center justify-center text-[12px] font-black p-2 text-center">{this.props.name}</div> : this.props.children; }
}
const hasWebGL = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } };
type Props = { calls: BoardToolCall[]; personaId: string; speaking?: boolean; onSpeak?: () => void; replayKey?: number; lessonTitle?: string };
const T = { tutor: true };
const NOTE_GAP_MS = 8000, NOTE_MAX = 12, NOTE_IDLE_MS = 3500;
const IMG_MAX_SIDE = 1280, IMG_MAX_B64 = 1_500_000;
/** tldraw asset src (data:, blob: or http URL) -> downscaled JPEG data URL (~1280px) for the vision request. */
async function imageToJpeg(src: string): Promise<string> {
  const blob = await (await fetch(src)).blob();
  const bmp = await createImageBitmap(blob);
  let q = 0.82, side = IMG_MAX_SIDE;
  for (let i = 0; i < 4; i++) {
    const k = Math.min(1, side / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(bmp.width * k)); c.height = Math.max(1, Math.round(bmp.height * k));
    const g = c.getContext('2d'); if (!g) throw new Error('NO_CANVAS');
    g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(bmp, 0, 0, c.width, c.height);
    const url = c.toDataURL('image/jpeg', q);
    if (url.length <= IMG_MAX_B64 + 30) { bmp.close?.(); return url; }
    q -= 0.12; side = Math.round(side * 0.8);
  }
  bmp.close?.(); throw new Error('TOO_BIG');
}

const TutorTldrawBoard: React.FC<Props> = ({ calls, personaId, speaking = false, onSpeak, replayKey = 0, lessonTitle = '' }) => {
  const persona = personaById(personaId);
  const t = useT(); const NM = t(persona.nameAr, persona.nameEn);
  const ed = useRef<Editor | null>(null);
  const timers = useRef<number[]>([]);
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 900);
  const [showAvatar, setShowAvatar] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 900);
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  // Docked avatar only when the BOARD itself is wide (not the window): narrow lesson pages on desktop keep the floating avatar.
  useEffect(() => {
    const el = rootRef.current;
    const f = () => { const w = el ? el.getBoundingClientRect().width : window.innerWidth; setWide(w >= 900); };
    f();
    if (el && typeof ResizeObserver !== 'undefined') { const ro = new ResizeObserver(f); ro.observe(el); return () => ro.disconnect(); }
    window.addEventListener('resize', f); return () => window.removeEventListener('resize', f);
  }, []);

  const fit = (editor: Editor) => { try { editor.zoomToFit({ animation: { duration: 200 } }); if (editor.getZoomLevel() > 1) editor.resetZoom(editor.getViewportScreenCenter(), { animation: { duration: 0 } }); } catch { /* ignore */ } };

  /** Same shapes as the original applyAction, stacked top-to-bottom so mobile can zoom to fit. */
  const apply = (editor: Editor, c: BoardToolCall, y: number): number => {
    if (c.tool === 'drawBoardText') {
      const id = createShapeId();
      const color = c.payload.color === 'yellow' ? 'blue' : c.payload.color === 'light-blue' ? 'black' : 'black';
      editor.createShape({ meta: T, id, type: 'text', x: 100, y, props: { richText: toRichText(c.payload.content), size: c.payload.fontSize, color: c.payload.fontSize === 'l' ? 'blue' : color, font: 'draw', autoSize: false, w: 600 } as any });
      return y + (editor.getShapePageBounds(id)?.h ?? 50) + 24;
    }
    if (c.tool === 'highlightError') {
      editor.createShape({ meta: T, id: createShapeId(), type: 'geo', x: 80, y, props: { geo: 'rectangle', w: 640, h: 120, color: 'red', fill: 'semi' } as any });
      editor.createShape({ meta: T, id: createShapeId(), type: 'text', x: 95, y: y + 15, props: { richText: toRichText(`❌ ${c.payload.incorrectSnippet}\n✅ ${c.payload.correctedSnippet}`), size: 'm', color: 'black', font: 'draw', autoSize: false, w: 600 } as any });
      return y + 144;
    }
    if (c.tool === 'addNote') {
      const id = createShapeId();
      editor.createShape({ meta: T, id, type: 'note', x: 100, y, props: { richText: toRichText(c.payload.content), color: 'yellow', size: 'm', font: 'draw' } as any });
      return y + (editor.getShapePageBounds(id)?.h ?? 200) + 24;
    }
    // drawArrow: two words joined by a native tldraw arrow
    const a = createShapeId(); const b = createShapeId();
    editor.createShape({ meta: T, id: a, type: 'text', x: 100, y, props: { richText: toRichText(c.payload.from), size: 'l', color: 'black', font: 'draw' } as any });
    editor.createShape({ meta: T, id: b, type: 'text', x: 460, y, props: { richText: toRichText(c.payload.to), size: 'l', color: 'green', font: 'draw' } as any });
    const ba = editor.getShapePageBounds(a); const bb = editor.getShapePageBounds(b);
    const mid = y + (ba?.h ?? 40) / 2;
    editor.createShape({ meta: T, id: createShapeId(), type: 'arrow', x: 0, y: 0, props: { start: { x: (ba?.maxX ?? 200) + 20, y: mid }, end: { x: (bb?.minX ?? 440) - 20, y: mid }, color: 'orange', size: 'l' } as any });
    return y + Math.max(ba?.h ?? 40, bb?.h ?? 40) + 30;
  };

  const draw = useCallback((animate: boolean) => {
    const editor = ed.current; if (!editor) return;
    timers.current.forEach(t => clearTimeout(t)); timers.current = [];
    const ids = Array.from(editor.getCurrentPageShapeIds()); if (ids.length) editor.deleteShapes(ids);
    let y = 80;
    calls.forEach((c, i) => {
      const run = () => { y = apply(editor, c, y); fit(editor); };
      if (!animate) run(); else timers.current.push(window.setTimeout(run, 400 + i * STEP_MS));
    });
    if (!animate) fit(editor);
  }, [calls]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (replayKey) draw(true); }, [replayKey, draw]);
  useEffect(() => () => timers.current.forEach(t => clearTimeout(t)), []);

  /** Student notes/questions (text or sticky shapes the student made) -> the tutor answers in lesson context, speaks, writes a reply beside it. */
  const [asking, setAsking] = useState(false);
  const [noteErr, setNoteErr] = useState('');
  const answered = useRef(new Map<string, string>());
  const lastAsk = useRef(0); const asks = useRef(0); const idle = useRef<number | null>(null);
  const studentNotes = (editor: Editor) => editor.getCurrentPageShapes().filter((sh: TLShape) => (sh.type === 'note' || sh.type === 'text') && !(sh.meta as any)?.tutor)
    .map(sh => ({ sh, text: renderPlaintextFromRichText(editor, (sh.props as any).richText).replace(/📝/g, '').trim() }))
    .filter(n => n.text.length >= 2 && answered.current.get(n.sh.id) !== n.text);
  const askTutor = async (manual: boolean) => {
    const editor = ed.current; if (!editor) return;
    if (asking) { if (manual) setNoteErr(t(`${persona.nameAr} ${persona.gender === 'female' ? 'ترد' : 'يرد'} على سؤالك…`, `${persona.nameEn} is answering your question…`)); return; }
    if (editor.getEditingShapeId()) {
      // Still typing: the button finishes the edit; the auto trigger waits until the student stops editing.
      if (!manual) { if (idle.current) clearTimeout(idle.current); idle.current = window.setTimeout(() => void askRef.current(false), NOTE_IDLE_MS); return; }
      try { editor.complete(); } catch { /* ignore */ } try { editor.setEditingShape(null); } catch { /* ignore */ }
    }
    const pending = studentNotes(editor); const n = pending[pending.length - 1];
    if (!n) {
      if (manual) {
        const drew = editor.getCurrentPageShapes().some((sh: TLShape) => sh.type === 'draw' && !(sh.meta as any)?.tutor);
        setNoteErr(drew ? t('ما أقدر أقرأ الكتابة بخط اليد. اكتب سؤالك بأداة النص (T) أو في 📝 ملاحظة لاصقة', 'I can\'t read handwriting. Type your question with the text tool (T) or in a 📝 sticky note') : t('اكتب سؤالك في 📝 ملاحظة لاصقة أو بأداة النص (T)، وبعدها اضغط اسأل', 'Write your question in a 📝 sticky note or with the text tool (T), then press Ask'));
      }
      return;
    }
    const wait = NOTE_GAP_MS - (Date.now() - lastAsk.current);
    if (asks.current >= NOTE_MAX) { if (manual) setNoteErr(t('وصلت حد الأسئلة لهذي السبورة، افتح الدرس من جديد', 'Question limit for this board reached, reopen the lesson')); return; }
    if (wait > 0) { if (manual) setNoteErr(t(`لحظة، جرّب بعد ${Math.ceil(wait / 1000)} ثواني`, `One moment, try again in ${Math.ceil(wait / 1000)} seconds`)); else { if (idle.current) clearTimeout(idle.current); idle.current = window.setTimeout(() => void askRef.current(false), wait + 200); } return; }
    lastAsk.current = Date.now(); asks.current++; answered.current.set(n.sh.id, n.text); setAsking(true); setNoteErr('');
    try {
      const r = await fetch('/api/sara/board-note', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ persona: persona.id, note: n.text, lesson: lessonTitle, lang: getExplainLang() }) });
      const j: any = await r.json().catch(() => null);
      if (!r.ok || !j?.answer) {
        answered.current.delete(n.sh.id);
        setNoteErr(r.status === 401 ? t('سجّل دخولك عشان تسأل المعلم', 'Sign in to ask the teacher') : r.status === 429 ? t('وصلت حد الأسئلة، جرّب بعد شوي', 'Question limit reached, try again later') : t(`${persona.nameAr} ما ${persona.gender === 'female' ? 'قدرت ترد' : 'قدر يرد'} الحين (${r.status}${j?.error ? ' ' + j.error : ''})، جرّب مرة ثانية`, `${persona.nameEn} could not reply right now (${r.status}${j?.error ? ' ' + j.error : ''}), try again`));
        return;
      }
      const bb = editor.getShapePageBounds(n.sh.id);
      const rid = createShapeId();
      editor.createShape({ meta: T, id: rid, type: 'text', x: bb?.minX ?? 100, y: (bb?.maxY ?? 100) + 16, props: { richText: toRichText(`${persona.emoji} ${j.answer}`), size: 's', color: 'blue', font: 'draw', autoSize: false, w: 360 } as any });
      try { const rb = editor.getShapePageBounds(rid); if (rb) editor.zoomToBounds(rb.clone().expandBy(80), { animation: { duration: 250 }, targetZoom: Math.min(1, editor.getZoomLevel()) }); } catch { /* ignore */ }
      if (j.audio) { cancelAllSpeech('board-note'); const p = await playCloudAudioAs('board-note', j.audio, () => {}); if (!p) setNoteErr(t('الرد مكتوب على السبورة، بس الصوت ما اشتغل. اضغط على الصفحة وجرّب مرة ثانية', 'The reply is on the board, but the audio did not play. Tap the page and try again')); }
      else setNoteErr(t('الرد مكتوب على السبورة، بس الصوت غير متاح الحين', 'The reply is on the board, but audio is not available right now'));
    } catch { answered.current.delete(n.sh.id); setNoteErr(t('تعذّر الاتصال بالمعلم، تأكد من النت وجرّب مرة ثانية', 'Could not reach the teacher, check your connection and try again')); }
    finally { setAsking(false); }
  };
  /** Student image (paste/drop/upload) -> the tutor reads it with vision, explains it in lesson context, speaks it, writes beside it. */
  const explainedImgs = useRef(new Set<string>());
  const studentImages = (editor: Editor) => editor.getCurrentPageShapes().filter((sh: TLShape) => sh.type === 'image' && !(sh.meta as any)?.tutor && (sh.props as any).assetId);
  const explainImage = async (manual: boolean, shapeId?: string) => {
    const editor = ed.current; if (!editor) return;
    if (asking) { if (manual) setNoteErr(t(`${persona.nameAr} ${persona.gender === 'female' ? 'ترد' : 'يرد'} الحين…`, `${persona.nameEn} is answering…`)); return; }
    const imgs = studentImages(editor);
    const sel = editor.getSelectedShapes().find(sh => sh.type === 'image');
    const sh = (shapeId && imgs.find(i => i.id === shapeId)) || (manual && sel) || (manual ? imgs[imgs.length - 1] : imgs.filter(i => !explainedImgs.current.has(i.id)).pop());
    if (!sh) { if (manual) setNoteErr(t('حط صورة على السبورة (الصق أو اسحبها أو ارفعها) وبعدها اضغط 📷 اشرح الصورة', 'Put an image on the board (paste, drop or upload), then press 📷 Explain image')); return; }
    const wait = NOTE_GAP_MS - (Date.now() - lastAsk.current);
    if (asks.current >= NOTE_MAX) { if (manual) setNoteErr(t('وصلت حد الأسئلة لهذي السبورة، افتح الدرس من جديد', 'Question limit for this board reached, reopen the lesson')); return; }
    if (wait > 0) { if (manual) setNoteErr(t(`لحظة، جرّب بعد ${Math.ceil(wait / 1000)} ثواني`, `One moment, try again in ${Math.ceil(wait / 1000)} seconds`)); else window.setTimeout(() => void imgRef.current(false, sh.id), wait + 200); return; }
    const asset: any = editor.getAsset((sh.props as any).assetId);
    let src: string = asset?.props?.src || '';
    if (!src) { // asset still uploading/resolving: retry shortly (auto) or tell the student
      if (!manual && !explainedImgs.current.has(sh.id + ':retry')) { explainedImgs.current.add(sh.id + ':retry'); window.setTimeout(() => void imgRef.current(false, sh.id), 1500); }
      else setNoteErr(t('الصورة لسا تتحمّل، جرّب بعد ثواني', 'The image is still loading, try again in a few seconds'));
      return;
    }
    try { const r = await editor.resolveAssetUrl(asset.id, { shouldResolveToOriginal: true }); if (r) src = r; } catch { /* use raw src */ }
    explainedImgs.current.add(sh.id); lastAsk.current = Date.now(); asks.current++; setAsking(true);
    setNoteErr(t(`📷 ${persona.nameAr} ${persona.gender === 'female' ? 'تقرأ' : 'يقرأ'} الصورة…`, `📷 ${persona.nameEn} is reading the image…`));
    try {
      let image: string;
      try { image = await imageToJpeg(src); } catch (e: any) { explainedImgs.current.delete(sh.id); setNoteErr(String(e?.message) === 'TOO_BIG' ? t('الصورة كبيرة مرة، قصّها أو صوّر جزء أصغر', 'The image is too large, crop it or take a smaller photo') : t('ما قدرت أفتح الصورة، جرّب صورة JPG أو PNG', 'Could not open the image, try a JPG or PNG')); return; }
      const r = await fetch('/api/sara/board-note', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ persona: persona.id, image, lesson: lessonTitle, lang: getExplainLang() }) });
      const j: any = await r.json().catch(() => null);
      if (!r.ok || !j?.answer) {
        explainedImgs.current.delete(sh.id);
        setNoteErr(r.status === 401 ? t('سجّل دخولك عشان المعلم يشرح الصورة', 'Sign in so the teacher can explain the image') : r.status === 429 ? t('وصلت حد الأسئلة، جرّب بعد شوي', 'Question limit reached, try again later') : r.status === 413 ? t('الصورة كبيرة أو نوعها غير مدعوم', 'The image is too large or not supported') : t(`${persona.nameAr} ما ${persona.gender === 'female' ? 'قدرت تشرح' : 'قدر يشرح'} الصورة الحين (${r.status}${j?.error ? ' ' + j.error : ''})، اضغط 📷 اشرح الصورة`, `${persona.nameEn} could not explain the image right now (${r.status}${j?.error ? ' ' + j.error : ''}), press 📷 Explain image`));
        return;
      }
      setNoteErr('');
      const bb = editor.getShapePageBounds(sh.id);
      const rid = createShapeId();
      const vp = editor.getViewportPageBounds();
      const right = (bb?.maxX ?? 100) + 24; const below = !bb || right + 420 > vp.maxX + 200 && bb.w > 500;
      editor.createShape({ meta: T, id: rid, type: 'text', x: below ? (bb?.minX ?? 100) : right, y: below ? (bb?.maxY ?? 100) + 16 : (bb?.minY ?? 100), props: { richText: toRichText(`${persona.emoji} ${j.answer}`), size: 's', color: 'blue', font: 'draw', autoSize: false, w: 400 } as any });
      try { const rb = editor.getShapePageBounds(rid); if (rb && bb) editor.zoomToBounds(rb.clone().union(bb).expandBy(60), { animation: { duration: 250 }, targetZoom: Math.min(1, editor.getZoomLevel()) }); } catch { /* ignore */ }
      if (j.audio) { cancelAllSpeech('board-note'); const p = await playCloudAudioAs('board-note', j.audio, () => {}); if (!p) setNoteErr(t('الشرح مكتوب على السبورة، بس الصوت ما اشتغل. اضغط على الصفحة وجرّب مرة ثانية', 'The explanation is on the board, but the audio did not play. Tap the page and try again')); }
      else setNoteErr(t('الشرح مكتوب على السبورة، بس الصوت غير متاح الحين', 'The explanation is on the board, but audio is not available right now'));
    } catch { explainedImgs.current.delete(sh.id); setNoteErr(t('تعذّر الاتصال بالمعلم، تأكد من النت وجرّب مرة ثانية', 'Could not reach the teacher, check your connection and try again')); }
    finally { setAsking(false); }
  };
  const imgRef = useRef(explainImage); imgRef.current = explainImage;
  const askRef = useRef(askTutor); askRef.current = askTutor;
  useEffect(() => () => { if (idle.current) clearTimeout(idle.current); cancelAllSpeech('board-note'); }, []);

  const onMount = (editor: Editor) => {
    ed.current = editor;
    // auto-detect: after the student stops editing their note for a short pause, the tutor answers it
    editor.store.listen(() => { if (idle.current) clearTimeout(idle.current); idle.current = window.setTimeout(() => void askRef.current(false), NOTE_IDLE_MS); }, { source: 'user', scope: 'document' });
    editor.store.listen(() => { if (!editor.getEditingShapeId() && studentNotes(editor).length) { if (idle.current) clearTimeout(idle.current); idle.current = window.setTimeout(() => void askRef.current(false), 1200); } }, { source: 'user', scope: 'session' });
    // auto: a new student image (paste/drop/upload) -> explain it once its asset is ready
    editor.store.listen(({ changes }) => {
      const added = Object.values(changes.added).filter((r: any) => r.typeName === 'shape' && r.type === 'image' && !r.meta?.tutor);
      if (added.length) window.setTimeout(() => void imgRef.current(false, (added[added.length - 1] as any).id), 900);
    }, { scope: 'document' });
    editor.user.updateUserPreferences({ colorScheme: 'light' });
    draw(true);
  };
  const addNote = () => {
    const editor = ed.current; if (!editor) return;
    const c = editor.getViewportPageBounds().center;
    editor.createShape({ id: createShapeId(), type: 'note', x: c.x - 100, y: c.y - 100, props: { richText: toRichText('📝'), color: 'yellow', font: 'draw' } as any });
  };
  const clear = () => { const e = ed.current; if (!e) return; const ids = Array.from(e.getCurrentPageShapeIds()); if (ids.length) e.deleteShapes(ids); };

  const webgl = useRef<boolean | null>(null); if (webgl.current === null) webgl.current = hasWebGL();
  const avatar = !webgl.current ? <div className="w-full h-full rounded-xl bg-[#001a38] text-amber-300 flex items-center justify-center text-[13px] font-black">{persona.emoji} {persona.nameAr}</div> : (
    <AvatarBoundary name={`${persona.emoji} ${persona.nameAr}`}>
    <Tutor3DAvatar agentId={persona.id} isArabic isSpeaking={speaking} compact mode={wide ? 'docked' : 'floating'}
      onToggleFloating={() => setShowAvatar(false)} onTriggerVoicePreview={onSpeak} />
    </AvatarBoundary>
  );

  return (
    <div ref={rootRef} data-testid="tldraw-board" className={`${expanded ? 'fixed inset-0 z-[400]' : 'w-full h-full'} flex ${wide ? 'flex-row' : 'flex-col'} gap-2 bg-white rounded-2xl border-2 border-amber-400/70 overflow-hidden`} dir={t("rtl", "ltr")}>
      {wide && showAvatar && <div className="w-[320px] shrink-0 min-h-0 overflow-hidden p-2">{avatar}</div>}
      <div className="flex-1 min-w-0 min-h-0 flex flex-col">
        <div className="magic-board-toolbar" style={{ overflowX: 'auto', height: 'auto', minHeight: 48, padding: '6px 10px' }}>
          <div className="board-title-group shrink-0"><span className="board-title-badge">📋 {t("السبورة التفاعلية", "Interactive board")}</span><span className="board-coach-tag">{persona.emoji} {NM}</span></div>
          <div className="board-actions-group" dir={t("rtl", "ltr")}>
            <ExplainLangToggle />
            <button className="board-tool-action-btn" onClick={() => setShowAvatar(v => !v)}><span>🧊</span><span>{t("معلم 3D", "3D teacher")}</span></button>
            <button className="board-tool-action-btn" onClick={() => { setExpanded(v => !v); setTimeout(() => ed.current && fit(ed.current), 80); }}><span>🖥️</span><span>{expanded ? t('تصغير', 'Shrink') : t('توسيع السبورة', 'Expand board')}</span></button>
            <button className="board-tool-action-btn tool-inspect" onClick={() => draw(true)} data-testid="board-replay"><span>📋</span><span>{t("قالب الدرس", "Lesson template")}</span></button>
            <button className="board-tool-action-btn tool-note" onClick={addNote}><span>📝</span><span>{t("ملاحظة لاصقة", "Sticky note")}</span></button>
            <button className="board-tool-action-btn" onClick={() => void askTutor(true)} disabled={asking} data-testid="board-ask-tutor"><span>🙋</span><span>{asking ? t(`${persona.nameAr} ${persona.gender === 'female' ? 'ترد' : 'يرد'}…`, `${persona.nameEn} is answering…`) : t(`اسأل ${persona.nameAr}`, `Ask ${persona.nameEn}`)}</span></button>
            <button className="board-tool-action-btn" onClick={() => void explainImage(true)} disabled={asking} data-testid="board-explain-image"><span>📷</span><span>{t('اشرح الصورة', 'Explain image')}</span></button>
            <button className="board-tool-action-btn tool-clear" onClick={clear}><span>🧽</span><span>{t("مسح", "Clear")}</span></button>
          </div>
        </div>
        <div className="magic-canvas-container relative" style={{ height: 'auto', minHeight: 0 }} dir="ltr">
          <div className="magic-whiteboard-inner" style={{ position: 'absolute', inset: 0 }}>
            <Tldraw onMount={onMount} />
          </div>
          {noteErr && <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[360] px-3 py-1.5 rounded-xl bg-[#001a38] text-amber-300 text-[12px] font-black" dir="rtl" onClick={() => setNoteErr('')}>{noteErr}</div>}
          {!wide && showAvatar && <div className="absolute bottom-14 right-2 z-[350] w-[170px] h-[230px] rounded-xl overflow-hidden shadow-xl">{avatar}</div>}
        </div>
      </div>
    </div>
  );
};
export default TutorTldrawBoard;
