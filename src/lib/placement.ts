import { auth } from './firebase';

export interface PlacementScores {
  totalScore?: number;
  conversationScore?: number;
  quizScore?: number;
  spellingScore?: number;
}

/**
 * Saves the student's placement level through the server (Firestore rules block
 * students from writing `level` themselves). Returns true when the server saved it.
 */
export async function savePlacementLevel(level: string, scores: PlacementScores = {}): Promise<boolean> {
  try {
    const user = auth.currentUser;
    if (!user) return false;
    const idToken = await user.getIdToken();
    const res = await fetch('/api/placement/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ level, ...scores }),
    });
    if (!res.ok) {
      console.warn('savePlacementLevel failed:', res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('savePlacementLevel error:', err);
    return false;
  }
}
