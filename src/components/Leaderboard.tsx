import React, { useState, useEffect } from 'react';
import { translations, Language } from '../lib/translations';
import { RefreshCw } from 'lucide-react';
import { collection, query, where, orderBy, limit, getDocs, writeBatch } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserRole } from '../types';
import { SectionShell, GoldCard, GhostButton, ProgressPill } from './ui/academy';

export const Leaderboard = ({ lang, isAdmin }: { lang: Language, isAdmin?: boolean }) => {
  const t = Object.assign(
    (ar: string, en: string) => (lang === 'ar' ? ar : en),
    translations[lang]
  );
  const isRtl = lang === 'ar';
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [resetting, setResetting] = useState(false);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'users'),
        where('role', '==', UserRole.STUDENT),
        orderBy('points', 'desc'),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const studentsList = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        rank: index + 1
      }));
      setStudents(studentsList);
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleResetPoints = async () => {
    if (!confirm(t('هل أنت متأكد من تصفير كافة النقاط لجميع الطلاب؟', 'Are you sure you want to reset all points for all students?'))) return;
    
    setResetting(true);
    try {
      const q = query(collection(db, 'users'), where('role', '==', UserRole.STUDENT));
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);
      
      querySnapshot.docs.forEach((studentDoc) => {
        batch.update(studentDoc.ref, { points: 0 });
      });
      
      await batch.commit();
      await fetchLeaderboard();
      alert(t('تم تصفير النقاط بنجاح', 'Points reset successfully'));
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'users');
    } finally {
      setResetting(false);
    }
  };

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className="max-w-4xl">
      <div className="space-y-4 animate-in fade-in duration-300">
        {isAdmin && (
          <div className="flex justify-end">
            <GhostButton
              onClick={handleResetPoints}
              disabled={resetting}
              className="!px-4 !py-2 !text-xs uppercase tracking-widest"
            >
              <RefreshCw size={14} className={resetting ? 'animate-spin' : ''} />
              {t('تصفير النقاط', 'Reset All Points')}
            </GhostButton>
          </div>
        )}

        {loading ? (
          <GoldCard className="p-16 text-center">
            <div className="w-10 h-10 border-4 border-[#002147] border-t-[#C49E3A] rounded-full animate-spin mx-auto"></div>
          </GoldCard>
        ) : students.length > 0 ? (
          <div className="space-y-3">
            <GoldCard className="px-4 py-3 sm:px-6 bg-[#fdfaf3]">
              <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center text-xs font-black text-[#002147]/70 uppercase tracking-widest">
                <div className="col-span-2 text-center">{t.rank}</div>
                <div className="col-span-7">{t('الطالب', 'Student')}</div>
                <div className="col-span-3 text-end">{t.score}</div>
              </div>
            </GoldCard>

            {students.map((student) => {
              const isCurrentStudent = Boolean(
                auth.currentUser?.uid &&
                (student.id === auth.currentUser.uid || student.uid === auth.currentUser.uid)
              );
              const medalEmoji =
                student.rank === 1
                  ? '🥇'
                  : student.rank === 2
                  ? '🥈'
                  : student.rank === 3
                  ? '🥉'
                  : null;

              return (
                <GoldCard
                  key={student.id}
                  className={`px-4 py-3.5 sm:px-6 sm:py-4 transition-transform ${
                    isCurrentStudent
                      ? '!bg-[#E6C36A]/25 !border-[#C49E3A]'
                      : 'bg-white'
                  }`}
                >
                  <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                    <div className="col-span-2 flex justify-center">
                      {medalEmoji ? (
                        <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#002147] text-[#E6C36A] border border-[#C49E3A] text-lg sm:text-xl shadow-sm">
                          {medalEmoji}
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#fdfaf3] border border-[#C49E3A]/40 font-black text-[#002147] text-sm">
                          {student.rank}
                        </span>
                      )}
                    </div>

                    <div className="col-span-7 flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 overflow-hidden shrink-0">
                        <img
                          src={student.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.displayName}`}
                          alt={student.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-black text-[#002147] text-sm sm:text-base truncate">
                        {isAdmin ? student.displayName : String(student.displayName || "").trim().split(/\s+/)[0]}
                      </span>
                    </div>

                    <div className="col-span-3 flex justify-end">
                      <ProgressPill className="!px-2.5 !py-1 !text-xs sm:!text-sm font-black whitespace-nowrap">
                        {(student.points || 0).toLocaleString()} XP
                      </ProgressPill>
                    </div>
                  </div>
                </GoldCard>
              );
            })}
          </div>
        ) : (
          <GoldCard className="p-12 text-center">
            <p className="text-base font-black text-[#002147]">
              {t('لا يوجد ترتيب بعد', 'No rankings yet')}
            </p>
          </GoldCard>
        )}
      </div>
    </SectionShell>
  );
};


