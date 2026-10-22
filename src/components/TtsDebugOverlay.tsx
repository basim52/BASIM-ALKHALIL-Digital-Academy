import React, { useEffect, useState } from 'react';
/** Hidden speech diagnostics: open the site with ?ttsdebug=1 (or long-press the tutor name) to show window.__ttsLog. */
export const TtsDebugOverlay: React.FC = () => {
  const [on, setOn] = useState(() => { try { return new URLSearchParams(location.search).has('ttsdebug') || sessionStorage.getItem('ttsdebug') === '1'; } catch { return false; } });
  const [, tick] = useState(0);
  useEffect(() => { const h = () => { try { sessionStorage.setItem('ttsdebug', '1'); } catch {} setOn(true); }; window.addEventListener('tts-debug-open', h); return () => window.removeEventListener('tts-debug-open', h); }, []);
  useEffect(() => { if (!on) return; try { sessionStorage.setItem('ttsdebug', '1'); } catch {} const i = setInterval(() => tick(x => x + 1), 1000); return () => clearInterval(i); }, [on]);
  if (!on) return null;
  const log: any[] = (window as any).__ttsLog || [];
  return (
    <div data-no-i18n dir="ltr" style={{ position: 'fixed', left: 6, bottom: 6, zIndex: 99999, width: 'min(96vw,460px)', maxHeight: '45vh', overflow: 'auto', background: 'rgba(0,26,56,.95)', color: '#fde68a', border: '1px solid #C49E3A', borderRadius: 10, font: '11px/1.35 monospace', padding: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><b>TTS log · {innerWidth}x{innerHeight} · {navigator.userAgent.slice(0, 60)}</b><button onClick={() => { try { sessionStorage.removeItem('ttsdebug'); } catch {} setOn(false); }}>✕</button></div>
      {log.length ? log.slice().reverse().map((e, i) => <div key={i}>{JSON.stringify(e)}</div>) : <div>(empty — press a Listen button)</div>}
    </div>
  );
};
export const openTtsDebug = () => window.dispatchEvent(new Event('tts-debug-open'));
/** Long-press (700ms) handlers for any element. */
export const longPressDebug = () => { let t: any; return { onPointerDown: () => { t = setTimeout(openTtsDebug, 700); }, onPointerUp: () => clearTimeout(t), onPointerLeave: () => clearTimeout(t) }; };
