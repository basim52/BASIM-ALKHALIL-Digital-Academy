import React, { useState, useEffect } from 'react';
import { translations, Language } from '../lib/translations';
import { Trophy, Medal, User, RefreshCw } from 'lucide-react';
import { collection, query, where, orderBy, limit, getDocs, doc, writeBatch } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserRole } from '../types';

export const Leaderboard = ({ lang, isAdmin }: { lang: Language, isAdmin?: boolean }) => {
  const t = translations[lang];
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
    if (!confirm(isRtl ? 'هل أنت متأكد من تصفير كافة النقاط لجميع الطلاب؟' : 'Are you sure you want to reset all points for all students?')) return;
    
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
      alert(isRtl ? 'تم تصفير النقاط بنجاح' : 'Points reset successfully');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'users');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="mb-12 text-center relative">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-6">
          <Trophy size={40} className="text-[#C49E3A]" />
        </div>
        <h2 className="text-4xl font-black text-[#002147] tracking-tight mb-3">{t.leaderboard}</h2>
        <p className="text-slate-500 font-medium">{isRtl ? 'أفضل الطلاب المبدعين في أكاديمية باسم الخليل' : 'Meet our top creative performers at Basim Academy'}</p>
        
        {isAdmin && (
          <button
            onClick={handleResetPoints}
            disabled={resetting}
            className="absolute top-0 right-0 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-red-100 flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={resetting ? 'animate-spin' : ''} />
            {isRtl ? 'تصفير النقاط' : 'Reset All Points'}
          </button>
        )}
      </header>

      {loading ? (
        <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-200">
          <div className="w-12 h-12 border-4 border-[#002147] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-200 shadow-sm min-h-[400px]">
          <div className="grid grid-cols-12 gap-4 p-8 bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-400 uppercase tracking-widest">
            <div className="col-span-2 text-center">{t.rank}</div>
            <div className="col-span-7">{isRtl ? 'الطالب' : 'Student'}</div>
            <div className="col-span-3 text-right">{t.score}</div>
          </div>

          <div className="divide-y divide-slate-100">
            {students.length > 0 ? (
              students.map((student) => (
                <div key={student.id} className={`grid grid-cols-12 gap-4 p-8 items-center transition-colors hover:bg-slate-50/50 ${student.rank <= 3 ? 'bg-orange-50/10' : ''}`}>
                  <div className="col-span-2 flex justify-center">
                    {student.rank === 1 ? <Medal className="text-yellow-500" /> : 
                     student.rank === 2 ? <Medal className="text-slate-400" /> :
                     student.rank === 3 ? <Medal className="text-orange-600" /> :
                     <span className="font-black text-slate-300">{student.rank}</span>}
                  </div>
                  <div className="col-span-7 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                      <img src={student.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.displayName}`} alt={student.displayName} />
                    </div>
                    <span className="font-bold text-[#002147] text-lg">{student.displayName}</span>
                  </div>
                  <div className="col-span-3 text-right font-black text-[#002147] text-xl">
                    {(student.points || 0).toLocaleString()} <span className="text-[10px] text-slate-400 uppercase">XP</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center text-slate-400 italic">
                {isRtl ? 'لا يوجد بيانات حالياً' : 'No leaderboard data yet'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

