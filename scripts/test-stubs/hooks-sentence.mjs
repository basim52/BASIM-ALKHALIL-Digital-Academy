const stub = name => new URL(`./${name}`, import.meta.url).href;
export async function resolve(specifier, context, next) {
  if (specifier === 'tldraw') return { url: stub('tldraw.mjs'), shortCircuit: true };
  if (specifier.endsWith('.css')) return { url: 'data:text/javascript,export default {}', shortCircuit: true };
  if (/(^|\/)Tutor3DAvatar(\.tsx)?$/.test(specifier)) return { url: stub('Tutor3DAvatar.mjs'), shortCircuit: true };
  if (/(^|\/)SaraTrackPlayer(\.tsx)?$/.test(specifier)) return { url: stub('saraNarrator.mjs'), shortCircuit: true };
  if (/(^|\/)firebase(\.ts|\.js)?$/.test(specifier) && !specifier.includes('firebase-admin') && context.parentURL?.includes('/src/lib/saraSentenceBuilder')) {
    return { url: 'data:text/javascript,export const db = {};', shortCircuit: true };
  }
  if (specifier.includes('firebase/firestore') && context.parentURL?.includes('/src/lib/saraSentenceBuilder')) {
    return { url: 'data:text/javascript,export const doc = () => ({}); export const getDoc = async () => ({ data: () => ({}) }); export const updateDoc = async () => {};', shortCircuit: true };
  }
  return next(specifier, context);
}
