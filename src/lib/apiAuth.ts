import { auth } from './firebase';

/**
 * Attach the signed-in user's Firebase ID token to every same-origin POST /api/* call.
 * The server requires it for all AI endpoints (quota protection). GETs are untouched so
 * CDN-cached lesson audio and video streams stay cacheable/public.
 */
if (typeof window !== 'undefined' && !(window as any).__apiAuthPatched) {
  (window as any).__apiAuthPatched = true;
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
      const path = url.startsWith('/') ? url : (url.startsWith(location.origin) ? url.slice(location.origin.length) : '');
      if (method === 'POST' && path.startsWith('/api/') && auth.currentUser) {
        const headers = new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));
        if (!headers.has('Authorization')) {
          headers.set('Authorization', `Bearer ${await auth.currentUser.getIdToken()}`);
          return nativeFetch(input, { ...init, headers });
        }
      }
    } catch { /* fall through without token */ }
    return nativeFetch(input, init);
  };
}
export {};
