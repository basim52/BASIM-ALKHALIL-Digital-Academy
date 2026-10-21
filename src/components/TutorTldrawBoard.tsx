import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tldraw, createShapeId, toRichText, type Editor } from 'tldraw';
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
type Props = { calls: BoardToolCall[]; personaId: string; speaking?: boolean; onSpeak?: () => void; replayKey?: number };

const TutorTldrawBoard: React.FC<Props> = ({ calls, personaId, speaking = false, onSpeak, replayKey = 0 }) => {
  const persona = personaById(personaId);
  const ed = useRef<Editor | null>(null);
  const timers = useRef<number[]>([]);
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 900);
  const [showAvatar, setShowAvatar] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 900);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { const f = () => setWide(window.innerWidth >= 900); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);

  const fit = (editor: Editor) => { try { editor.zoomToFit({ animation: { duration: 200 } }); if (editor.getZoomLevel() > 1) editor.resetZoom(editor.getViewportScreenCenter(), { animation: { duration: 0 } }); } catch { /* ignore */ } };

  /** Same shapes as the original applyAction, stacked top-to-bottom so mobile can zoom to fit. */
  const apply = (editor: Editor, c: BoardToolCall, y: number): number => {
    if (c.tool === 'drawBoardText') {
      const id = createShapeId();
      const color = c.payload.color === 'yellow' ? 'blue' : c.payload.color === 'light-blue' ? 'black' : 'black';
      editor.createShape({ id, type: 'text', x: 100, y, props: { richText: toRichText(c.payload.content), size: c.payload.fontSize, color: c.payload.fontSize === 'l' ? 'blue' : color, font: 'draw', autoSize: false, w: 600 } as any });
      return y + (editor.getShapePageBounds(id)?.h ?? 50) + 24;
    }
    if (c.tool === 'highlightError') {
      editor.createShape({ id: createShapeId(), type: 'geo', x: 80, y, props: { geo: 'rectangle', w: 640, h: 120, color: 'red', fill: 'semi' } as any });
      editor.createShape({ id: createShapeId(), type: 'text', x: 95, y: y + 15, props: { richText: toRichText(`❌ ${c.payload.incorrectSnippet}\n✅ ${c.payload.correctedSnippet}`), size: 'm', color: 'black', font: 'draw', autoSize: false, w: 600 } as any });
      return y + 144;
    }
    if (c.tool === 'addNote') {
      const id = createShapeId();
      editor.createShape({ id, type: 'note', x: 100, y, props: { richText: toRichText(c.payload.content), color: 'yellow', size: 'm', font: 'draw' } as any });
      return y + (editor.getShapePageBounds(id)?.h ?? 200) + 24;
    }
    // drawArrow: two words joined by a native tldraw arrow
    const a = createShapeId(); const b = createShapeId();
    editor.createShape({ id: a, type: 'text', x: 100, y, props: { richText: toRichText(c.payload.from), size: 'l', color: 'black', font: 'draw' } as any });
    editor.createShape({ id: b, type: 'text', x: 460, y, props: { richText: toRichText(c.payload.to), size: 'l', color: 'green', font: 'draw' } as any });
    const ba = editor.getShapePageBounds(a); const bb = editor.getShapePageBounds(b);
    const mid = y + (ba?.h ?? 40) / 2;
    editor.createShape({ id: createShapeId(), type: 'arrow', x: 0, y: 0, props: { start: { x: (ba?.maxX ?? 200) + 20, y: mid }, end: { x: (bb?.minX ?? 440) - 20, y: mid }, color: 'orange', size: 'l' } as any });
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

  const onMount = (editor: Editor) => {
    ed.current = editor;
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
    <div data-testid="tldraw-board" className={`${expanded ? 'fixed inset-0 z-[400]' : 'w-full h-full'} flex ${wide ? 'flex-row' : 'flex-col'} gap-2 bg-white rounded-2xl border-2 border-amber-400/70 overflow-hidden`} dir="rtl">
      {wide && showAvatar && <div className="w-[320px] shrink-0 min-h-0 overflow-hidden p-2">{avatar}</div>}
      <div className="flex-1 min-w-0 min-h-0 flex flex-col">
        <div className="magic-board-toolbar" style={{ overflowX: 'auto', height: 'auto', minHeight: 48, padding: '6px 10px' }}>
          <div className="board-title-group shrink-0"><span className="board-title-badge">📋 السبورة التفاعلية</span><span className="board-coach-tag">{persona.emoji} {persona.nameAr}</span></div>
          <div className="board-actions-group" dir="rtl">
            <button className="board-tool-action-btn" onClick={() => setShowAvatar(v => !v)}><span>🧊</span><span>معلم 3D</span></button>
            <button className="board-tool-action-btn" onClick={() => { setExpanded(v => !v); setTimeout(() => ed.current && fit(ed.current), 80); }}><span>🖥️</span><span>{expanded ? 'تصغير' : 'توسيع السبورة'}</span></button>
            <button className="board-tool-action-btn tool-inspect" onClick={() => draw(true)} data-testid="board-replay"><span>📋</span><span>قالب الدرس</span></button>
            <button className="board-tool-action-btn tool-note" onClick={addNote}><span>📝</span><span>ملاحظة لاصقة</span></button>
            <button className="board-tool-action-btn tool-clear" onClick={clear}><span>🧽</span><span>مسح</span></button>
          </div>
        </div>
        <div className="magic-canvas-container relative" style={{ height: 'auto', minHeight: 0 }} dir="ltr">
          <div className="magic-whiteboard-inner" style={{ position: 'absolute', inset: 0 }}>
            <Tldraw onMount={onMount} />
          </div>
          {!wide && showAvatar && <div className="absolute bottom-14 right-2 z-[350] w-[170px] h-[230px] rounded-xl overflow-hidden shadow-xl">{avatar}</div>}
        </div>
      </div>
    </div>
  );
};
export default TutorTldrawBoard;
