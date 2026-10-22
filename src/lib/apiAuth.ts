import { auth } from './firebase';

/**
 * Attach the signed-in user's Firebase ID token to every same-origin POST /api/* call.
 * The server requires it for all AI endpoints (quota protection). GETs are untouched so
 * CDN-cached lesson audio and video streams stay cacheable/public.
 */
if (typeof window !== 'undefined' && !(window as any).__apiAuthPatched) {
  (window as any).__apiAuthPatched = true;
  const nativeFetch = window.fetch.bind(window);
  const patchedFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
      const path = url.startsWith('/') ? url : (url.startsWith(location.origin) ? url.slice(location.origin.length) : '');
      if (method === 'POST' && path.startsWith('/api/')) {
        // Wait for Firebase to restore the session (slow tablets: currentUser can still be null on first calls).
        if (!auth.currentUser) { try { await Promise.race([auth.authStateReady(), new Promise(r => setTimeout(r, 4000))]); } catch { /* ignore */ } }
        const user = auth.currentUser;
        const headers = new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));
        if (user && !headers.has('Authorization')) {
          // Body may be a stream only for Request inputs; we only retry string/plain bodies.
          headers.set('Authorization', `Bearer ${await user.getIdToken()}`);
          const r = await nativeFetch(input, { ...init, headers });
          if (r.status !== 401 || input instanceof Request) return r;
          // 401 → the cached token was rejected (e.g. tablet clock behind → SDK thinks an expired token is fresh). Force-refresh once.
          const fresh = await user.getIdToken(true).catch(() => '');
          if (!fresh) return r;
          headers.set('Authorization', `Bearer ${fresh}`);
          return nativeFetch(input, { ...init, headers });
        }
      }
    } catch { /* fall through without token */ }
    return nativeFetch(input, init);
  };
  let installed = false;
  try { window.fetch = patchedFetch as typeof window.fetch; installed = window.fetch === patchedFetch; } catch { /* getter-only fetch (e.g. sandboxed preview iframes) */ }
  if (!installed) {
    try { Object.defineProperty(window, 'fetch', { value: patchedFetch, configurable: true, writable: true }); installed = window.fetch === patchedFetch; } catch { /* not configurable */ }
  }
  if (!installed) console.warn('[apiAuth] could not patch window.fetch; API calls will be sent without the automatic auth header in this environment.');
}
export {};
