import React, { useEffect, useReducer } from 'react';
/** Minimal tldraw stand-in: records the shapes Sara's board creates and renders their text so tests can read the board. */
const registry = (globalThis.__tldrawStub ??= { editors: [] });
let n = 0;
export const createShapeId = () => `shape:${++n}`;
export const toRichText = text => ({ text });
export const renderPlaintextFromRichText = (_editor, rich) => rich?.text ?? '';
export class Box {
  constructor(x = 0, y = 0, w = 0, h = 0) { Object.assign(this, { x, y, w, h, minX: x, minY: y, maxX: x + w, maxY: y + h }); }
  static Common() { return new Box(0, 0, 640, 400); }
  get center() { return { x: this.x + this.w / 2, y: this.y + this.h / 2 }; }
  clone() { return this; } expandBy() { return this; } union() { return this; }
}
export function Tldraw({ onMount }) {
  const [, rerender] = useReducer(x => x + 1, 0);
  const [editor] = React.useState(() => {
    const shapes = new Map();
    const e = {
      shapes,
      getViewportScreenBounds: () => new Box(0, 0, 800, 600), getViewportPageBounds: () => new Box(0, 0, 800, 600),
      getCurrentPageShapes: () => [...shapes.values()], getCurrentPageShapeIds: () => new Set(shapes.keys()),
      getShapePageBounds: () => new Box(100, 100, 600, 50), getCurrentPageBounds: () => new Box(0, 0, 640, 400),
      setCamera() {}, zoomToBounds() {}, getZoomLevel: () => 1,
      createShape(shape) { const id = shape.id ?? createShapeId(); shapes.set(id, { ...shape, id }); rerender(); },
      deleteShapes(ids) { for (const id of ids) shapes.delete(id); rerender(); },
      getEditingShapeId: () => null, complete() {}, setEditingShape() {}, getSelectedShapes: () => [],
      getAsset: () => null, resolveAssetUrl: async () => null,
      store: { listen: () => () => {} }, user: { updateUserPreferences() {} }
    };
    registry.editors.push(e); return e;
  });
  useEffect(() => { onMount?.(editor); }, []); // eslint-disable-line
  return React.createElement('div', { className: 'tl-container', 'data-testid': 'tldraw-canvas', tabIndex: 0 },
    [...editor.shapes.values()].map(shape => React.createElement('div', { key: shape.id, 'data-shape': shape.type, 'data-tutor': String(!!shape.meta?.tutor) },
      shape.props?.richText?.text ?? '')));
}
