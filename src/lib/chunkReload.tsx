import React from 'react';

// After a new deploy, a tab that was already open still asks for the OLD hashed chunks (/assets/X-oldhash.js),
// which no longer exist (404). A lazy screen (lesson, test, board…) then fails to load and, with no boundary,
// React unmounts the whole app → blank screen ("I can't enter the test"). Fix: reload once to get the fresh bundle.

const KEY = 'chunk-reload-at';
const WINDOW_MS = 30_000; // at most one automatic reload per 30s → never a reload loop

export const isChunkLoadError = (e: unknown): boolean => {
  const m = String((e as { message?: string })?.message ?? e ?? '');
  return /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS|ChunkLoadError|Loading chunk .* failed/i.test(m);
};

/** Reload once (guarded). Returns true when a reload was started. */
export const reloadForFreshBundle = (): boolean => {
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0);
    if (Date.now() - last < WINDOW_MS) return false;
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch { /* storage blocked: still reload once per page life */
    if ((window as unknown as { __chunkReloaded?: boolean }).__chunkReloaded) return false;
    (window as unknown as { __chunkReloaded?: boolean }).__chunkReloaded = true;
  }
  window.location.reload();
  return true;
};

export const installChunkReload = () => {
  if (typeof window === 'undefined') return;
  window.addEventListener('vite:preloadError', (e: Event) => {
    if (reloadForFreshBundle()) e.preventDefault();
  });
  window.addEventListener('unhandledrejection', e => { if (isChunkLoadError(e.reason)) reloadForFreshBundle(); });
};

/** App-wide safety net: a stale chunk reloads the page; any other crash shows a refresh card instead of a blank screen. */
export class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: unknown }> {
  state = { error: null as unknown };
  static getDerivedStateFromError(error: unknown) { return { error }; }
  componentDidCatch(error: unknown) {
    console.error('[app] crashed:', error);
    if (isChunkLoadError(error)) reloadForFreshBundle();
  }
  render() {
    if (!this.state.error) return this.props.children;
    const chunk = isChunkLoadError(this.state.error);
    return (
      <div dir="rtl" data-testid="app-error" style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#002147', padding: 24, fontFamily: 'inherit' }}>
        <div style={{ maxWidth: 360, width: '100%', background: '#fff', borderRadius: 20, padding: 20, textAlign: 'center', border: '3px solid #C49E3A' }}>
          <p style={{ fontSize: 32, margin: 0 }}>🔄</p>
          <p style={{ fontWeight: 900, color: '#002147', fontSize: 16, margin: '8px 0' }}>{chunk ? 'نزل تحديث جديد للمنصة' : 'صار خلل بسيط في الصفحة'}</p>
          <p style={{ fontWeight: 700, color: '#475569', fontSize: 13, margin: '0 0 14px' }}>اضغط «تحديث الصفحة» وكمّل من حيث وقفت.</p>
          <button data-testid="app-error-reload" onClick={() => { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } window.location.reload(); }}
            style={{ width: '100%', padding: '12px 0', borderRadius: 14, background: '#C49E3A', color: '#002147', fontWeight: 900, fontSize: 15, border: 0 }}>تحديث الصفحة</button>
        </div>
      </div>
    );
  }
}
