import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { 
  Sparkles, 
  Home, 
  Target, 
  UserPlus, 
  RefreshCw,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ParentAIInsightsProps {
  lang: Language;
  studentName: string;
  studentLevel: string;
}

export const ParentAIInsights = ({ lang, studentName, studentLevel }: ParentAIInsightsProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateRecommendation = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch('/api/admin/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { studentName, studentLevel },
          prompt: `As an expert language learning advisor from "Basim Alkhalil Academy", generate a "Smart Home Recommendation" as JSON: { "activityTitle": "...", "learningGoal": "...", "parentRole": "...", "steps": ["..."] }. Language: ${isRtl ? 'Arabic' : 'English'}`,
          useJson: true
        })
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${resp.status}`);
      }

      const rawData = await resp.json();
      const text = rawData.text || "";
      if (!text) throw new Error("AI returned an empty response");
      
      const jsonStr = (text || '').replace(/```json|```/g, '').trim();
      try {
        setRecommendation(JSON.parse(jsonStr));
      } catch (pErr) {
        console.error("JSON Parse Error in Insights:", pErr, "Text:", text);
        // Fallback: if not valid JSON, treat as plain text if we want, but schema expects object
        throw new Error("AI response was not in the expected format. Please try again.");
      }
    } catch (err: any) {
      console.error("AI Insight Error:", err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 opacity-50" />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
            <Lightbulb size={28} />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#002147]">{t.homeRecommendations}</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.homeRecommendationsDesc}</p>
          </div>
        </div>
        
        <button 
          onClick={generateRecommendation}
          disabled={loading}
          className="bg-[#002147] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#C49E3A] transition-all flex items-center gap-3 disabled:opacity-50 shadow-lg shadow-blue-100"
        >
          {loading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
          {t.generateActivity}
        </button>
      </header>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">⚠️</div>
            <div>
              <p>{isRtl ? 'عذراً، فشل توليد التوصية حالياً.' : 'Sorry, failed to generate recommendation.'}</p>
              <p className="text-[10px] opacity-70 font-mono mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {recommendation ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <Home className="text-blue-500" size={18} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.activityTitle}</span>
                </div>
                <h4 className="text-lg font-black text-[#002147]">{recommendation.activityTitle}</h4>
              </div>

              <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="text-emerald-500" size={18} />
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{t.learningGoal}</span>
                </div>
                <p className="text-sm text-emerald-800 font-medium leading-relaxed">{recommendation.learningGoal}</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-[2rem] border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <UserPlus className="text-purple-500" size={18} />
                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">{t.parentParticipation}</span>
                </div>
                <p className="text-sm text-purple-800 font-medium leading-relaxed">{recommendation.parentRole}</p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#002147] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
               <h4 className="text-xl font-black mb-8 flex items-center gap-3 relative z-10">
                 <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">🚀</div>
                 {isRtl ? 'خطوات التنفيذ' : 'Action Steps'}
               </h4>
                <div className="space-y-6 relative z-10">
                  {recommendation.steps.map((step: string, idx: number) => (
                    <motion.div 
                     initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     key={`insight-step-${studentName}-${idx}`} 
                     className="flex items-start gap-4"
                    >
                     <div className="w-8 h-8 rounded-full bg-[#C49E3A] text-[#002147] flex items-center justify-center font-black text-xs shrink-0 shadow-lg">
                       {idx + 1}
                     </div>
                     <p className="text-blue-100 font-medium leading-relaxed pt-1">{step}</p>
                   </motion.div>
                 ))}
               </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[2.5rem]">
            <div className="w-16 h-16 bg-amber-50 text-amber-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb size={32} />
            </div>
            <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">
              {isRtl ? 'اضغط لتوليد نشاط منزلي ممتع اليوم' : 'Click to generate a fun home activity today'}
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
