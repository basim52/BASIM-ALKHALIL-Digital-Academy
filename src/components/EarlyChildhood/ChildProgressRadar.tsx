import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';
import { Brain, Sparkles, BookOpen, Mic, Calendar } from 'lucide-react';

interface ChildProgressRadarProps {
  data: {
    vocabulary: number;
    logic: number;
    creativity: number;
    phonics: number;
    consistency: number;
  };
  isRtl: boolean;
}

export const ChildProgressRadar: React.FC<ChildProgressRadarProps> = ({ data, isRtl }) => {
  const chartData = [
    { subject: isRtl ? 'المفردات' : 'Vocabulary', A: data.vocabulary, icon: BookOpen },
    { subject: isRtl ? 'المنطق' : 'Logic', A: data.logic, icon: Brain },
    { subject: isRtl ? 'الإبداع' : 'Creativity', A: data.creativity, icon: Sparkles },
    { subject: isRtl ? 'النطق' : 'Phonics', A: data.phonics, icon: Mic },
    { subject: isRtl ? 'الالتزام' : 'Consistency', A: data.consistency, icon: Calendar },
  ];

  return (
    <div className="w-full bg-white rounded-[3rem] p-8 md:p-12 border-4 border-slate-50 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-30 -mr-32 -mt-32" />
      
      <header className="mb-8 relative z-10">
         <h3 className="text-2xl font-black text-[#002147] mb-2">{isRtl ? 'خريطة المواهب' : 'Talent Map'}</h3>
         <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            {isRtl ? 'تحليل ذكاء اصطناعي شامل' : 'COMPREHENSIVE AI ANALYSIS'}
         </p>
      </header>

      <div className="h-[350px] w-full relative z-10 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Student"
              dataKey="A"
              stroke="#6366f1"
              strokeWidth={4}
              fill="#6366f1"
              fillOpacity={0.15}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8 relative z-10">
         {chartData.map((item, idx) => (
           <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center group/item hover:bg-indigo-50 transition-colors">
              <item.icon size={16} className="text-slate-400 group-hover/item:text-indigo-600 transition-colors mb-2" />
              <p className="text-[10px] font-black uppercase tracking-tight text-slate-500 mb-1">{item.subject}</p>
              <p className="text-lg font-black text-[#002147]">{item.A}%</p>
           </div>
         ))}
      </div>

      <div className="absolute bottom-6 left-8 opacity-5">
         <Sparkles size={120} />
      </div>
    </div>
  );
};
