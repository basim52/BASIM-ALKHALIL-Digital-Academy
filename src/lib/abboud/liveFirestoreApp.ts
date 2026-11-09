// The app's live-class store, bound to the academy's Firestore. Imported lazily so the activity chunk stays light.
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { createFirestoreLiveStore } from './liveFirestore';
export const liveStore = createFirestoreLiveStore(db);
/** The signed-in account's uid: the identity firestore.rules checks (request.auth.uid), whatever the profile object holds. */
export const watchLiveUid = (cb: (uid: string | null) => void) => onAuthStateChanged(auth, user => cb(user?.uid ?? null));
