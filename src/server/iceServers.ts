import type { Request, Response } from 'express';

/**
 * ICE servers for «فصل عبود المباشر» (live WebRTC voice).
 * STUN alone cannot connect most phones on mobile data / strict home routers (carrier NAT), so the class falls silent.
 * A TURN relay fixes that; it is configured only through env vars (values are never logged or returned in errors):
 *  - Cloudflare Realtime TURN (short-lived credentials minted per request):
 *      CLOUDFLARE_TURN_KEY_ID, CLOUDFLARE_TURN_KEY_API_TOKEN
 *  - or any TURN service / own coturn with fixed credentials:
 *      ABBOUD_TURN_URLS (comma-separated turn:/turns: URLs), ABBOUD_TURN_USERNAME, ABBOUD_TURN_CREDENTIAL
 * Without them the endpoint still answers with public STUN and `relay: false`, so the client can tell the teacher honestly.
 */
export type IceServer = { urls: string | string[]; username?: string; credential?: string };
export type IceConfig = { iceServers: IceServer[]; relay: boolean; source: 'cloudflare' | 'static' | 'stun-only'; ttlSeconds: number };
export const PUBLIC_STUN: IceServer = { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] };
const TTL_SECONDS = 6 * 60 * 60;
type Env = Record<string, string | undefined>;
type Fetch = (url: string, init: { method: string; headers: Record<string, string>; body: string; signal?: AbortSignal }) => Promise<{ ok: boolean; status: number; json(): Promise<unknown> }>;

const isTurn = (url: string) => /^turns?:/i.test(url);
function cleanServers(list: unknown): IceServer[] {
  const raw = Array.isArray(list) ? list : list && typeof list === 'object' ? [list] : [];
  const out: IceServer[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const { urls, username, credential } = item as Record<string, unknown>;
    // Port 53 is blocked by browsers; without trickle ICE it would only stall gathering (Cloudflare lists it as an alternate).
    const list = (Array.isArray(urls) ? urls : [urls]).filter((u): u is string => typeof u === 'string' && /^(stun|turns?):/i.test(u) && !/:53(\?|$)/.test(u));
    if (!list.length) continue;
    out.push({ urls: list, ...(typeof username === 'string' ? { username } : {}), ...(typeof credential === 'string' ? { credential } : {}) });
  }
  return out;
}
export const hasRelay = (servers: readonly IceServer[]) => servers.some(s => (Array.isArray(s.urls) ? s.urls : [s.urls]).some(isTurn) && !!s.username && !!s.credential);

/** Which TURN option is configured (names only; safe to show in the health check). */
export function turnMode(env: Env): IceConfig['source'] {
  if (env.CLOUDFLARE_TURN_KEY_ID?.trim() && env.CLOUDFLARE_TURN_KEY_API_TOKEN?.trim()) return 'cloudflare';
  if (env.ABBOUD_TURN_URLS?.trim() && env.ABBOUD_TURN_USERNAME?.trim() && env.ABBOUD_TURN_CREDENTIAL?.trim()) return 'static';
  return 'stun-only';
}

export async function iceConfig(env: Env, fetchImpl: Fetch, log: (line: string) => void = () => {}): Promise<IceConfig> {
  const mode = turnMode(env);
  if (mode === 'cloudflare') {
    try {
      const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 5000);
      const r = await fetchImpl(`https://rtc.live.cloudflare.com/v1/turn/keys/${encodeURIComponent(env.CLOUDFLARE_TURN_KEY_ID!.trim())}/credentials/generate-ice-servers`, {
        method: 'POST', headers: { Authorization: `Bearer ${env.CLOUDFLARE_TURN_KEY_API_TOKEN!.trim()}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ ttl: TTL_SECONDS }), signal: controller.signal
      }).finally(() => clearTimeout(timer));
      if (!r.ok) throw new Error(`cloudflare-turn-${r.status}`);
      const servers = cleanServers(((await r.json()) as { iceServers?: unknown })?.iceServers);
      if (hasRelay(servers)) return { iceServers: [PUBLIC_STUN, ...servers], relay: true, source: 'cloudflare', ttlSeconds: TTL_SECONDS };
      throw new Error('cloudflare-turn-empty');
    } catch (e) { log(`[ice] cloudflare TURN unavailable: ${e instanceof Error ? e.message : 'error'}`); }
  }
  const urls = (env.ABBOUD_TURN_URLS || '').split(',').map(s => s.trim()).filter(isTurn);
  const username = env.ABBOUD_TURN_USERNAME?.trim(), credential = env.ABBOUD_TURN_CREDENTIAL?.trim();
  if (urls.length && username && credential) return { iceServers: [PUBLIC_STUN, { urls, username, credential }], relay: true, source: 'static', ttlSeconds: TTL_SECONDS };
  return { iceServers: [PUBLIC_STUN], relay: false, source: 'stun-only', ttlSeconds: TTL_SECONDS };
}

/** POST /api/abboud/ice-servers — behind the app's sign-in middleware (every POST /api/* needs a Firebase ID token). */
export function iceServersHandler(env: Env = process.env, fetchImpl: Fetch = fetch as unknown as Fetch, log?: (line: string) => void) {
  return async (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json(await iceConfig(env, fetchImpl, log));
  };
}
