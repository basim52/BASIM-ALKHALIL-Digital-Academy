// The app's live-class store, bound to the academy's Firestore. Imported lazily so the activity chunk stays light.
import { db } from '../firebase';
import { createFirestoreLiveStore } from './liveFirestore';
export const liveStore = createFirestoreLiveStore(db);
