// Test-only (test:sara-map): lets the real Sara lesson lists load under Node/jsdom; only CSS, tldraw and the WebGL avatar are replaced.
const stub = name => new URL(`./${name}`, import.meta.url).href;
export async function resolve(specifier, context, next) {
  if (specifier === 'tldraw') return { url: stub('tldraw.mjs'), shortCircuit: true };
  if (specifier.endsWith('.css')) return { url: 'data:text/javascript,export default {}', shortCircuit: true };
  if (/(^|\/)Tutor3DAvatar(\.tsx)?$/.test(specifier)) return { url: stub('Tutor3DAvatar.mjs'), shortCircuit: true };
  return next(specifier, context);
}
