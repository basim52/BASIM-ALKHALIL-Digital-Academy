import React from 'react';
import { translations, Language } from '../lib/translations';
import { Trophy, Medal, User } from 'lucide-react';

const topStudents = [
  { id: '1', name: 'Saif Ahmed', xp: 2450, rank: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saif' },
  { id: '2', name: 'Laila Hassan', xp: 2100, rank: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laila' },
  { id: '3', name: 'Omar Khalid', xp: 1980, rank: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar' },
  { id: '4', name: 'Mariam Ali', xp: 1850, rank: 4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariam' },
  { id: '5', name: 'Zaid Nour', xp: 1720, rank: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zaid' },
];

export const Leaderboard = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="max-w-4xl mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-6">
          <Trophy size={40} className="text-[#C49E3A]" />
        </div>
        <h2 className="text-4xl font-black text-[#002147] tracking-tight mb-3">{t.leaderboard}</h2>
        <p className="text-slate-500 font-medium">{isRtl ? 'أفضل الطلاب المبدعين في أكاديمية باسم الخليل' : 'Meet our top creative performers at Basim Academy'}</p>
      </header>

      <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-200 shadow-sm">
        <div className="grid grid-cols-12 gap-4 p-8 bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-400 uppercase tracking-widest">
          <div className="col-span-2 text-center">{t.rank}</div>
          <div className="col-span-7">{isRtl ? 'الطالب' : 'Student'}</div>
          <div className="col-span-3 text-right">{t.score}</div>
        </div>

        <div className="divide-y divide-slate-100">
          {topStudents.map((student) => (
            <div key={student.id} className={`grid grid-cols-12 gap-4 p-8 items-center transition-colors hover:bg-slate-50/50 ${student.rank <= 3 ? 'bg-orange-50/10' : ''}`}>
              <div className="col-span-2 flex justify-center">
                {student.rank === 1 ? <Medal className="text-yellow-500" /> : 
                 student.rank === 2 ? <Medal className="text-slate-400" /> :
                 student.rank === 3 ? <Medal className="text-orange-600" /> :
                 <span className="font-black text-slate-300">{student.rank}</span>}
              </div>
              <div className="col-span-7 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                  <img src={student.avatar} alt={student.name} />
                </div>
                <span className="font-bold text-[#002147] text-lg">{student.name}</span>
              </div>
              <div className="col-span-3 text-right font-black text-[#002147] text-xl">
                {student.xp.toLocaleString()} <span className="text-[10px] text-slate-400 uppercase">XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-8 bg-blue-600 rounded-[2.5rem] flex items-center justify-between text-white shadow-xl shadow-blue-200">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center font-black text-2xl">
            12
          </div>
          <div>
            <h4 className="font-black text-xl">{isRtl ? 'ترتيبك الحالي' : 'Your Global Rank'}</h4>
            <p className="opacity-80 text-sm">{isRtl ? 'أنت ضمن أفضل 5% من الطلاب' : 'You are in the top 5% of students'}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="block font-black text-3xl">1,240</span>
          <span className="text-sm opacity-80 uppercase font-bold tracking-widest">{t.score}</span>
        </div>
      </div>
    </div>
  );
};
