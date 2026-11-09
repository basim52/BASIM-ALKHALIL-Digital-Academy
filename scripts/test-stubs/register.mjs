// Test-only: lets the real Sara board component (TutorTldrawBoard) run under Node/jsdom.
// Only heavy/browser-only leaves are replaced: tldraw's canvas, the WebGL avatar, CSS, and the Firebase-backed language store.
import { register } from 'node:module';
register('./hooks.mjs', import.meta.url);
