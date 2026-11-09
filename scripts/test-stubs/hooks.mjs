const stub = name => new URL(`./${name}`, import.meta.url).href;
export async function resolve(specifier, context, next) {
  if (specifier === 'tldraw') return { url: stub('tldraw.mjs'), shortCircuit: true };
  if (specifier.endsWith('.css')) return { url: 'data:text/javascript,export default {}', shortCircuit: true };
  if (/(^|\/)Tutor3DAvatar(\.tsx)?$/.test(specifier)) return { url: stub('Tutor3DAvatar.mjs'), shortCircuit: true };
  if (/(^|\/)explainLang(\.ts|\.js)?$/.test(specifier) && context.parentURL?.includes('/src/components/')) return { url: stub('explainLang.mjs'), shortCircuit: true };
  if (/(^|\/)liveFirestoreApp(\.ts|\.js)?$/.test(specifier)) return { url: stub('liveStore.mjs'), shortCircuit: true };
  return next(specifier, context);
}
