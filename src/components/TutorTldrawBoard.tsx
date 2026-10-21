import React, { useCallback, useRef, useState } from 'react';
import { Tldraw, createShapeId, toRichText, type Editor, type TLShapeId } from 'tldraw';
import 'tldraw/tldraw.css';
import type { BoardToolCall } from '../lib/boardActions';

const W = 560; // board column width in canvas units; camera zooms to fit the phone
/** The ai-tutor-platform whiteboard (tldraw) driven by the tutor's tool calls, stacked top-to-bottom and zoomed to fit. */
const TutorTldrawBoard: React.FC<{ calls: BoardToolCall[] }> = ({ calls }) => {
  const ed = useRef<Editor | null>(null);
  const [tool, setTool] = useState<'draw' | 'eraser' | 'hand'>('hand');

  const draw = useCallback((editor: Editor) => {
    editor.run(() => {
      const ids = Array.from(editor.getCurrentPageShapeIds());
      if (ids.length) editor.deleteShapes(ids);
      let y = 0;
      const text = (content: string, size: 's' | 'm' | 'l' | 'xl', color: string, x = 0, w = W) => {
        const id = createShapeId();
        editor.createShape({ id, type: 'text', x, y, props: { richText: toRichText(content), size, color: color as any, autoSize: false, w, font: 'sans', textAlign: 'start' } as any });
        return id;
      };
      const h = (id: TLShapeId) => editor.getShapePageBounds(id)?.h ?? 40;
      for (const c of calls) {
        if (c.tool === 'drawBoardText') { const id = text(c.payload.content, c.payload.fontSize, c.payload.color); y += h(id) + 18; }
        else if (c.tool === 'addNote') {
          const id = createShapeId();
          editor.createShape({ id, type: 'geo', x: 0, y, props: { geo: 'rectangle', w: W, h: 70, color: 'yellow', fill: 'solid', richText: toRichText(c.payload.content), size: 'm', font: 'sans', labelColor: 'black' } as any });
          y += h(id) + 18;
        } else if (c.tool === 'highlightError') {
          const id = createShapeId();
          editor.createShape({ id, type: 'geo', x: 0, y, props: { geo: 'rectangle', w: W, h: 110, color: 'red', fill: 'semi', richText: toRichText(`❌ ${c.payload.incorrectSnippet}\n✅ ${c.payload.correctedSnippet}`), size: 'm', font: 'sans', labelColor: 'white', align: 'start' } as any });
          y += h(id) + 18;
        } else if (c.tool === 'drawArrow') {
          const a = text(c.payload.from, 'm', 'white', 0, 220); const b = text(c.payload.to, 'm', 'light-green', 340, 220);
          const mid = y + Math.max(h(a), h(b)) / 2;
          editor.createShape({ id: createShapeId(), type: 'arrow', x: 0, y: 0, props: { start: { x: 230, y: mid }, end: { x: 330, y: mid }, color: 'yellow', size: 'l' } as any });
          y += Math.max(h(a), h(b)) + 18;
        }
      }
    });
    editor.zoomToFit({ animation: { duration: 0 } });
  }, [calls]);

  const onMount = (editor: Editor) => {
    ed.current = editor;
    editor.user.updateUserPreferences({ colorScheme: 'dark' });
    editor.updateInstanceState({ isGridMode: true });
    editor.setCurrentTool('hand');
    draw(editor);
    setTimeout(() => editor.zoomToFit({ animation: { duration: 0 } }), 50);
  };
  const pick = (t: 'draw' | 'eraser' | 'hand') => { setTool(t); ed.current?.setCurrentTool(t); };

  return (
    <div data-testid="tldraw-board" className="sara-tl relative w-full h-full overflow-hidden rounded-2xl border-2 border-amber-400/60" style={{ touchAction: 'none' }}>
      <style>{`.sara-tl .tl-container{--color-background:#0a2d5c;--color-grid:rgba(251,191,36,.18)} .sara-tl .tl-background{background:#0a2d5c}`}</style>
      <Tldraw hideUi onMount={onMount} inferDarkMode={false} />
      <div className="absolute top-2 left-2 z-[300] flex gap-1" dir="ltr">
        {([['hand', '✋'], ['draw', '✏️'], ['eraser', '🧽']] as const).map(([t, e]) => (
          <button key={t} onClick={() => pick(t)} aria-label={t} className={`w-8 h-8 rounded-lg text-[14px] border ${tool === t ? 'bg-amber-400 border-amber-300' : 'bg-[#001a38]/90 border-white/20'}`}>{e}</button>
        ))}
        <button onClick={() => ed.current && draw(ed.current)} aria-label="reset" className="w-8 h-8 rounded-lg text-[14px] border bg-[#001a38]/90 border-white/20">↺</button>
      </div>
    </div>
  );
};
export default TutorTldrawBoard;
