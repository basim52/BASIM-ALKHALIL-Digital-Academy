import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Every child linked to a parent, from ALL linking fields (read-only):
 *  - parent doc: linkedStudentIds[], linkedStudentId, childrenIds[]
 *  - child docs: parentIds[] / linkedParentIds[] containing the parent
 * Child-side queries need the "linked parent may list" rule in firestore.rules; until published they fail quietly
 * and the parent-doc fields still work.
 */
export interface LinkedChild { uid: string; displayName: string; level?: string; data: any }
export async function loadLinkedChildIds(parentUid: string, parentData?: any): Promise<string[]> {
  if (!parentUid || parentUid.startsWith('sim_')) return [];
  let p = parentData;
  if (!p) { try { p = (await getDoc(doc(db, 'users', parentUid))).data() || {}; } catch { p = {}; } }
  const ids = new Set<string>();
  const add = (v: unknown) => { if (typeof v === 'string' && v && v !== parentUid) ids.add(v); };
  (Array.isArray(p.linkedStudentIds) ? p.linkedStudentIds : []).forEach(add);
  add(p.linkedStudentId);
  (Array.isArray(p.childrenIds) ? p.childrenIds : []).forEach(add);
  const qs = [
    query(collection(db, 'users'), where('parentIds', 'array-contains', parentUid)),
    query(collection(db, 'users'), where('linkedParentIds', 'array-contains', parentUid)),
  ];
  await Promise.all(qs.map(q => getDocs(q).then(s => s.forEach(d => add(d.id))).catch(() => { /* rule not published yet */ })));
  return [...ids];
}
export async function loadLinkedChildren(parentUid: string, parentData?: any): Promise<LinkedChild[]> {
  const ids = await loadLinkedChildIds(parentUid, parentData);
  const out = await Promise.all(ids.map(async (id): Promise<LinkedChild | null> => {
    try { const d = await getDoc(doc(db, 'users', id)); if (!d.exists()) return null; const x: any = d.data(); return { uid: id, displayName: String(x.displayName || x.name || x.email || id), level: x.level, data: x }; }
    catch { return null; }
  }));
  return out.filter((c): c is LinkedChild => !!c);
}
