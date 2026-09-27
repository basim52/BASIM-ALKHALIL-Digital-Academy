import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export interface StreakData {
  current: number;
  longest: number;
  lastActiveDate: string; // YYYY-MM-DD (Asia/Riyadh timezone)
  freezesLeft: number; // 0 or 1
  lastFreezeWeek?: string; // e.g. "2026-W39"
}

export interface DayDotStatus {
  dateStr: string; // YYYY-MM-DD
  dayLabelAr: string; // e.g. "السبت", "الأحد"
  shortDayAr: string; // e.g. "سبت", "أحد"
  isToday: boolean;
  status: 'done' | 'missed' | 'today-pending';
}

export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];

export const MILESTONE_MESSAGES: Record<number, { title: string; desc: string; icon: string }> = {
  3: {
    title: '🔥 بداية أسطورية! 3 أيام متتالية',
    desc: 'ما شاء الله! انطلقت شعلتك التعليمية بقوة. الاستمرار لـ 3 أيام أولى خطوات العادات العظيمة!',
    icon: '🔥'
  },
  7: {
    title: '🌟 أسبوع ذهبي كامل! 7 أيام متتالية',
    desc: 'إنجاز استثنائي! أكملت أسبوعاً كاملاً من التعلم والتألق في أكاديمية باسم الخليل. فخورون بك!',
    icon: '🌟'
  },
  14: {
    title: '🚀 أسبوعان من الإبداع! 14 يوماً متواصلاً',
    desc: 'مستوى التزامك مبهر ومتميز! 14 يوماً متتالياً من الممارسة تثبت شغفك الحقيقي بالتفوق.',
    icon: '🚀'
  },
  30: {
    title: '🏆 شهر التميز الأكاديمي! 30 يوماً من العزيمة',
    desc: 'شهر كامل من المثابرة والنجاح اليومي! لقد أصبحت اللغة الإنجليزية عادة يومية في حياتك.',
    icon: '🏆'
  },
  60: {
    title: '👑 شهران من الإتقان والقيادة! 60 يوماً',
    desc: 'وسام الملكية والتميز الأكاديمي! 60 يوماً من التعلم الراسخ في أكاديمية باسم الخليل الرقمية.',
    icon: '👑'
  },
  100: {
    title: '💯 نادي المئة التاريخي! 100 يوم من الإصرار',
    desc: 'إنجاز تاريخي يخلّد اسمك في لوحة الشرف! 100 يوم من الإصرار الأسطوري. أنت قدوة ملهمة للجميع!',
    icon: '💯'
  }
};

/**
 * Returns current date in Asia/Riyadh timezone as "YYYY-MM-DD"
 */
export function getRiyadhDateStr(d: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Riyadh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(d);
  } catch {
    // Fallback if timezone not supported
    const offset = 3 * 60; // Riyadh is UTC+3
    const local = new Date(d.getTime() + (d.getTimezoneOffset() + offset) * 60000);
    return local.toISOString().split('T')[0];
  }
}

/**
 * Returns current time in Asia/Riyadh as "HH:MM" (24h)
 */
export function getRiyadhTimeStr(d: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Riyadh',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(d);
  } catch {
    const offset = 3 * 60;
    const local = new Date(d.getTime() + (d.getTimezoneOffset() + offset) * 60000);
    const h = String(local.getHours()).padStart(2, '0');
    const m = String(local.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }
}

/**
 * Returns the calendar week identifier in Riyadh (e.g. "2026-W39")
 */
export function getRiyadhWeekId(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const target = new Date(Date.UTC(y, m - 1, d));
  const dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = target.getTime();
  target.setUTCMonth(0, 1);
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
  }
  const weekNo = 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
  return `${y}-W${weekNo}`;
}

/**
 * Calculates calendar difference in days between two YYYY-MM-DD dates (today - past)
 */
export function getDaysDiff(todayStr: string, pastStr: string): number {
  if (!todayStr || !pastStr) return 999;
  const [y1, m1, d1] = todayStr.split('-').map(Number);
  const [y2, m2, d2] = pastStr.split('-').map(Number);
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  return Math.round((utc1 - utc2) / (1000 * 60 * 60 * 24));
}

// Milestone celebration listeners
type MilestoneListener = (milestone: number, currentStreak: number) => void;
const milestoneListeners: Set<MilestoneListener> = new Set();

export function subscribeToMilestoneCelebrations(callback: MilestoneListener): () => void {
  milestoneListeners.add(callback);
  return () => {
    milestoneListeners.delete(callback);
  };
}

export function triggerMilestoneCelebration(milestone: number, currentStreak: number) {
  milestoneListeners.forEach((cb) => {
    try {
      cb(milestone, currentStreak);
    } catch (e) {
      console.error('Error in milestone celebration listener:', e);
    }
  });
}

/**
 * Fetches the student's streak document from Firestore or localStorage fallback
 */
export async function getStudentStreak(userId: string): Promise<StreakData> {
  if (!userId) {
    return { current: 0, longest: 0, lastActiveDate: '', freezesLeft: 1 };
  }

  const isSimulated = userId.startsWith('sim_') || !auth.currentUser;
  if (isSimulated) {
    try {
      const stored = localStorage.getItem(`streak_${userId}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return { current: 0, longest: 0, lastActiveDate: '', freezesLeft: 1 };
  }

  try {
    const snap = await getDoc(doc(db, 'streaks', userId));
    if (snap.exists()) {
      const data = snap.data();
      return {
        current: Number(data.current) || 0,
        longest: Number(data.longest) || 0,
        lastActiveDate: String(data.lastActiveDate || ''),
        freezesLeft: Math.min(1, Math.max(0, Number(data.freezesLeft) ?? 1)),
        lastFreezeWeek: data.lastFreezeWeek ? String(data.lastFreezeWeek) : undefined
      };
    }
  } catch (e) {
    console.warn('Notice fetching student streak:', e);
  }

  return { current: 0, longest: 0, lastActiveDate: '', freezesLeft: 1 };
}

/**
 * Records activity completion for streak:
 * 1. Checks Asia/Riyadh date
 * 2. Same day again: no change
 * 3. Next consecutive day: current + 1, update longest
 * 4. Missed exactly one day and freezesLeft > 0: keep the streak, freezesLeft - 1 (1 free freeze per week)
 * 5. Otherwise: current resets to 1
 * 6. Checks for milestones (3, 7, 14, 30, 60, 100)
 */
export async function recordStreakActivity(userId: string): Promise<{
  streak: StreakData;
  celebratedMilestone?: number;
}> {
  if (!userId) {
    return { streak: { current: 0, longest: 0, lastActiveDate: '', freezesLeft: 1 } };
  }

  const todayStr = getRiyadhDateStr();
  const currentWeek = getRiyadhWeekId(todayStr);

  const prev = await getStudentStreak(userId);
  let current = prev.current;
  let longest = prev.longest;
  let freezesLeft = prev.freezesLeft;
  let lastFreezeWeek = prev.lastFreezeWeek;

  // Replenish 1 free freeze per week if a new week arrived
  if (lastFreezeWeek && lastFreezeWeek !== currentWeek && freezesLeft < 1) {
    freezesLeft = 1;
  }

  let newCurrent = current;
  let newLongest = longest;
  let newFreezes = freezesLeft;
  let newLastFreezeWeek = lastFreezeWeek;
  let isUpdated = false;

  if (!prev.lastActiveDate) {
    // First activity ever
    newCurrent = 1;
    newLongest = 1;
    newFreezes = 1;
    isUpdated = true;
  } else {
    const daysDiff = getDaysDiff(todayStr, prev.lastActiveDate);

    if (daysDiff === 0) {
      // Same day again: no change
      return { streak: prev };
    } else if (daysDiff === 1) {
      // Next consecutive day: current + 1, update longest if needed
      newCurrent = current + 1;
      newLongest = Math.max(longest, newCurrent);
      isUpdated = true;
    } else if (daysDiff === 2 && freezesLeft > 0) {
      // Missed exactly one day and freezesLeft > 0: keep streak, freezesLeft - 1
      newFreezes = freezesLeft - 1;
      newLastFreezeWeek = currentWeek;
      newCurrent = current > 0 ? current : 1;
      newLongest = Math.max(longest, newCurrent);
      isUpdated = true;
    } else {
      // Otherwise: current resets to 1
      newCurrent = 1;
      newLongest = Math.max(longest, 1);
      isUpdated = true;
    }
  }

  const updatedStreak: StreakData = {
    current: Math.round(newCurrent),
    longest: Math.round(newLongest),
    lastActiveDate: todayStr,
    freezesLeft: Math.min(1, Math.max(0, Math.round(newFreezes))),
    ...(newLastFreezeWeek ? { lastFreezeWeek: newLastFreezeWeek } : {})
  };

  // Save to Firestore or localStorage
  const isSimulated = userId.startsWith('sim_') || !auth.currentUser;
  if (isSimulated) {
    try {
      localStorage.setItem(`streak_${userId}`, JSON.stringify(updatedStreak));
    } catch {
      // ignore
    }
  } else {
    try {
      await setDoc(doc(db, 'streaks', userId), {
        current: updatedStreak.current,
        longest: updatedStreak.longest,
        lastActiveDate: updatedStreak.lastActiveDate,
        freezesLeft: updatedStreak.freezesLeft
      }, { merge: true });
    } catch (e) {
      console.error('Error saving streak to firestore:', e);
    }
  }

  // Check milestone celebration
  let celebratedMilestone: number | undefined;
  if (isUpdated && STREAK_MILESTONES.includes(updatedStreak.current)) {
    const milestoneKey = `milestone_${userId}_${updatedStreak.current}_${todayStr}`;
    try {
      if (!localStorage.getItem(milestoneKey)) {
        localStorage.setItem(milestoneKey, 'true');
        celebratedMilestone = updatedStreak.current;
        triggerMilestoneCelebration(updatedStreak.current, updatedStreak.current);
      }
    } catch {
      celebratedMilestone = updatedStreak.current;
      triggerMilestoneCelebration(updatedStreak.current, updatedStreak.current);
    }
  }

  return { streak: updatedStreak, celebratedMilestone };
}

/**
 * Builds the 7-day row of dots ending with today in Asia/Riyadh timezone
 */
export function getSevenDayStreakDots(
  streak: StreakData,
  activeDatesSet: Set<string> = new Set()
): DayDotStatus[] {
  const todayStr = getRiyadhDateStr();
  const dayNamesAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const shortNamesAr = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

  const dots: DayDotStatus[] = [];
  const [ty, tm, td] = todayStr.split('-').map(Number);
  const todayUtc = Date.UTC(ty, tm - 1, td);

  for (let i = 6; i >= 0; i--) {
    const targetUtc = new Date(todayUtc - i * 86400000);
    const y = targetUtc.getUTCFullYear();
    const m = String(targetUtc.getUTCMonth() + 1).padStart(2, '0');
    const d = String(targetUtc.getUTCDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    const dayOfWeek = targetUtc.getUTCDay();

    const isToday = dateStr === todayStr;
    const isExplicitlyActive = activeDatesSet.has(dateStr) || streak.lastActiveDate === dateStr;

    // Check if within the current active streak ending on lastActiveDate
    let isWithinStreak = false;
    if (streak.current > 0 && streak.lastActiveDate) {
      const diffFromLastActive = getDaysDiff(streak.lastActiveDate, dateStr);
      if (diffFromLastActive >= 0 && diffFromLastActive < streak.current) {
        isWithinStreak = true;
      }
    }

    let status: 'done' | 'missed' | 'today-pending' = 'missed';
    if (isExplicitlyActive || isWithinStreak) {
      status = 'done';
    } else if (isToday) {
      status = 'today-pending';
    }

    dots.push({
      dateStr,
      dayLabelAr: dayNamesAr[dayOfWeek],
      shortDayAr: shortNamesAr[dayOfWeek],
      isToday,
      status
    });
  }

  return dots;
}

/**
 * Generates and triggers download of an .ics calendar file with a DAILY recurring event
 */
export function downloadDailyReminderIcs(reminderTimeHHMM: string, siteOrigin?: string) {
  const origin = siteOrigin || (typeof window !== 'undefined' ? window.location.origin : 'https://basim-academy.com');
  const [hourStr, minStr] = (reminderTimeHHMM || '18:00').split(':');
  const h = parseInt(hourStr || '18', 10);
  const m = parseInt(minStr || '00', 10);

  const todayStr = getRiyadhDateStr().replace(/-/g, '');
  const startHourStr = String(h).padStart(2, '0');
  const startMinStr = String(m).padStart(2, '0');

  // iCalendar UTC stamp
  const now = new Date();
  const nowUtc = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  // DTSTART format for local recurring: YYYYMMDDTHHMM00
  const dtStart = `${todayStr}T${startHourStr}${startMinStr}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Basim Alkhalil Academy//Daily Learning Streak Reminder//AR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:streak-reminder-${Date.now()}@basimalkhalil.academy`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${dtStart}`,
    'RRULE:FREQ=DAILY',
    'SUMMARY:وقت التعلم في أكاديمية باسم الخليل 📚',
    `DESCRIPTION:حان وقت جلستك اليومية في أكاديمية باسم الخليل الرقمية! حافظ على استمرار شعلة تعلمك اليومية ومضاعفة رصيدك.\\n\\nرابط الدخول:\\n${origin}`,
    `URL:${origin}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:وقت التعلم في أكاديمية باسم الخليل 📚',
    'TRIGGER:-PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'وقت_التعلم_أكاديمية_باسم_الخليل.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
