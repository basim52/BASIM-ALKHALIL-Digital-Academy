import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { translations, Language } from '../lib/translations';
import { Trophy, Clock, BookCheck, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Mon', xp: 400 },
  { name: 'Tue', xp: 300 },
  { name: 'Wed', xp: 600 },
  { name: 'Thu', xp: 800 },
  { name: 'Fri', xp: 500 },
  { name: 'Sat', xp: 900 },
  { name: 'Sun', xp: 700 },
];

export const StudentStats = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="space-y-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="mb-8">
        <h2 className="text-3xl font-black text-[#002147] tracking-tight">{t.performanceStats}</h2>
        <p className="text-slate-500 font-medium">{isRtl ? 'نظرة عامة على رحلتك التعليمية هذا الأسبوع' : 'Overview of your learning journey this week'}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600">
            <Clock size={32} />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t.learningHrs}</span>
            <span className="text-2xl font-black text-[#002147]">12.5</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600">
            <BookCheck size={32} />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t.modulesCompleted}</span>
            <span className="text-2xl font-black text-[#002147]">4 <span className="text-xs text-slate-400">/ 12</span></span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-600">
            <TrendingUp size={32} />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t.totalXp}</span>
            <span className="text-2xl font-black text-[#002147]">1,240</span>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-black text-[#002147] flex items-center gap-3">
            <Trophy className="text-[#C49E3A]" />
            {t.weeklyActivity}
          </h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              XP Growth
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                dy={10}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  fontWeight: '800',
                  color: '#002147'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="xp" 
                stroke="#2563eb" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorXp)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};
