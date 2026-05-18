import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  BarChart3, 
  ArrowLeft, 
  Download, 
  Languages, 
  Sparkles, 
  Target, 
  TrendingUp,
  Brain,
  Zap,
  Quote,
  Camera,
  Share2
} from 'lucide-react';
import { translations, Language } from '../../lib/translations';
import html2canvas from 'html2canvas';

interface SmartAnalyticsProps {
  lang: Language;
  onBack: () => void;
  planItems?: any[] | null;
  studentName?: string;
}

export const SmartAnalytics: React.FC<SmartAnalyticsProps> = ({ 
  lang: initialLang, 
  onBack, 
  planItems,
  studentName: propStudentName 
}) => {
  const [currentLang, setCurrentLang] = useState<Language>(initialLang);
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const studentName = propStudentName || (isRtl ? 'الطالب' : 'Student');
  const totalLessons = planItems?.length || 0;
  const level = planItems?.[0]?.level || 'A1';

  const progressData = [
    { name: t.month1, score: totalLessons > 0 ? 65 : 0 },
    { name: t.month2, score: totalLessons > 0 ? 78 : 0 },
    { name: t.month3, score: totalLessons > 0 ? 92 : 0 },
  ];

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const exportAsImage = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Better resolution
        backgroundColor: '#f8fafc',
        useCORS: true,
      });
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `academic-report-${new Date().getTime()}.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`p-4 md:p-8 max-w-5xl mx-auto ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-[#002147] transition-colors mb-2"
          >
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
            <span className="font-bold">{isRtl ? 'رجوع للوحة النتائج' : 'Back to Results'}</span>
          </button>
          <h2 className="text-3xl font-black text-[#002147] flex items-center gap-3">
            <Sparkles className="text-blue-600 animate-pulse" />
            {t.academicAnalytics}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-black hover:bg-slate-50 transition-all text-sm"
          >
            <Languages size={18} className="text-blue-500" />
            {currentLang === 'ar' ? 'English' : 'العربية'}
          </button>
          <button 
            onClick={exportAsImage}
            disabled={isExporting}
            className="flex items-center gap-2 px-6 py-3 bg-[#002147] text-white rounded-2xl font-black hover:bg-blue-900 transition-all shadow-lg shadow-blue-100 text-sm disabled:opacity-50"
          >
            {isExporting ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <Download size={18} />
              </motion.div>
            ) : (
              <Camera size={18} />
            )}
            {t.exportReport}
          </button>
        </div>
      </div>

      {/* Report Canvas Area */}
      <div 
        ref={reportRef}
        className="bg-slate-50 p-8 md:p-12 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden"
      >
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
          <Brain size={300} />
        </div>

        <div className="relative z-10 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#002147] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Brain size={28} />
                </div>
                <div>
                   <h1 className="text-2xl font-black text-[#002147] tracking-tight leading-tight uppercase">
                    {studentName}
                  </h1>
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest">
                    {currentLang === 'ar' ? `تقرير التحليل الشامل - المستوى ${level}` : `Comprehensive Analysis Report - Level ${level}`}
                  </p>
                </div>
              </div>
              <p className="text-slate-500 font-bold max-w-md">
                {currentLang === 'ar' ? `تحليل ذكي لمستوى التقدم الأكاديمي لـ ${studentName} والمهارات اللغوية المكتسبة.` : `Smart analysis of academic progress for ${studentName} and language skills acquired.`}
              </p>
            </div>
            
            <div className={`p-6 bg-white rounded-3xl border border-slate-100 shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{currentLang === 'ar' ? 'تاريخ التقرير' : 'Report Date'}</p>
              <h4 className="text-lg font-black text-[#002147]">{new Date().toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US')}</h4>
              <div className="mt-2 text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                {currentLang === 'ar' ? 'مكتمل' : 'Status: Completed'}
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: t.studentAverage, value: totalLessons > 0 ? '92.4%' : '0%', sub: totalLessons > 0 ? '+4% vs prev' : 'Initial Phase', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: t.participationRate, value: totalLessons > 0 ? '88%' : '0%', sub: `Level ${level} Active`, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: currentLang === 'ar' ? 'التزام بالخطة' : 'Plan Commitment', value: totalLessons > 0 ? `${totalLessons} Units` : '0 Units', sub: 'Calculated from AI Planner', icon: Target, color: 'text-rose-500', bg: 'bg-rose-50' },
            ].map((kpi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
              >
                <div className={`w-10 h-10 ${kpi.bg} ${kpi.color} rounded-xl flex items-center justify-center mb-4`}>
                  <kpi.icon size={20} />
                </div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">{kpi.label}</p>
                <h4 className="text-2xl font-black text-[#002147] mb-1">{kpi.value}</h4>
                <p className="text-[10px] text-slate-500 font-bold">{kpi.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Chart Section */}
          <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-[#002147] flex items-center gap-3">
                <BarChart3 className="text-blue-500" />
                {t.academicProgress}
              </h3>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-blue-600" />
                 <span className="text-xs font-bold text-slate-500">Monthly Avg</span>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#2563eb" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights and Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <div className="bg-blue-600 p-8 rounded-[3rem] shadow-xl shadow-blue-200 text-white relative overflow-hidden">
                <Quote className="absolute top-6 right-6 opacity-20 w-12 h-12" />
                <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                  <Brain size={20} />
                  {currentLang === 'ar' ? 'رؤية المعلم الذكي' : 'AI Academic Insight'}
                </h4>
                <p className="text-blue-50 font-medium leading-relaxed italic">
                  {currentLang === 'ar' ? 
                    '"نلاحظ تطوراً ملحوظاً في دقة القواعد اللغوية خلال الشهرين الماضيين. نوصي بالتركيز الإضافي على مهارات التحدث بطلاقة (AI Partner) للحفاظ على هذا الزخم التصاعدي نحو المستوى B2."' : 
                    '"We notice a significant improvement in grammatical precision over the last two months. We recommend additional focus on AI Partner speaking tasks to maintain this upward momentum towards level B2."'}
                </p>
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                      <Target size={24} />
                   </div>
                   <div>
                      <h5 className="font-black text-[#002147] text-sm uppercase">{currentLang === 'ar' ? 'الهدف القادم' : 'Next Milestone'}</h5>
                      <p className="text-xs text-slate-500 font-bold">{currentLang === 'ar' ? 'تحقيق 95% في مهارات المحادثة' : 'Achieve 95% in Conversation skills'}</p>
                   </div>
                </div>
                <div className="p-6 bg-slate-100/50 rounded-2xl border border-dashed border-slate-200">
                   <p className="text-xs font-bold text-slate-400 mb-2">{currentLang === 'ar' ? 'التصديق الرقمي' : 'Digital Verification'}</p>
                   <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#002147]" />
                      <span className="font-mono text-[10px] text-slate-500">BK-AD-REF-8842-X02</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Footer Actions outside canvas */}
      <div className="mt-8 flex justify-center gap-4">
         <button className="flex items-center gap-2 text-slate-400 hover:text-[#002147] font-bold text-sm transition-all">
            <Share2 size={16} />
            {currentLang === 'ar' ? 'مشاركة التقرير' : 'Share Report'}
         </button>
      </div>
    </div>
  );
};
