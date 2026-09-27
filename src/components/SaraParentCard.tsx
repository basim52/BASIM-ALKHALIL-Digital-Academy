import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  BookMarked, 
  Award, 
  Clock, 
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../lib/translations';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { TutorMemoryDoc, TutorSessionDoc } from '../types';

interface SaraParentCardProps {
  studentId: string;
  studentName: string;
  lang: Language;
  isRtl?: boolean;
}

export const SaraParentCard: React.FC<SaraParentCardProps> = ({
  studentId,
  studentName,
  lang,
  isRtl = true
}) => {
  const [loading, setLoading] = useState(true);
  const [memory, setMemory] = useState<TutorMemoryDoc | null>(null);
  const [sessions, setSessions] = useState<TutorSessionDoc[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!studentId) return;

    const fetchData = async () => {
      setLoading(true);
      const isSimulated = studentId.startsWith('sim_') || !auth.currentUser;

      if (isSimulated) {
        // Mock data for simulated demo students
        setMemory({
          level: 'A1',
          age: 11,
          interests: ['Video Games', 'Space & Science'],
          goal: 'School English Excellence & Speaking Fluency',
          wordsLearned: ['Diligent', 'Adventure', 'Curious', 'Explore', 'Achievement', 'Galaxy', 'Friendly', 'Challenge'],
          frequentMistakes: [
            'Third-person singular "s" (he/she goes vs go)',
            'Past simple irregular verbs (went vs goed)',
            'Articles: "a" vs "an" before vowels'
          ],
          lastSessionSummary: 'أتقن الطالب قاعدة المفرد والجمع، وتدرب على جمل التحية واستخدام المضارع البسيط.',
          dailyCount: 14,
          dailyCountDate: new Date().toISOString().split('T')[0]
        });

        setSessions([
          {
            id: 'sess_1',
            startedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
            endedAt: new Date(Date.now() - 3600000 * 2.8).toISOString(),
            skill: 'Present Simple & Daily Habits 📐',
            quizScore: 3,
            summary: 'تدرب الطالب على أفعال الروتين اليومي، وصححنا توافق الفعل مع الفاعل بنجاح.'
          },
          {
            id: 'sess_2',
            startedAt: new Date(Date.now() - 86400000).toISOString(),
            endedAt: new Date(Date.now() - 86400000 + 720000).toISOString(),
            skill: 'Active Reading: The Little Astronaut 📖',
            quizScore: 2,
            summary: 'قراءة قصة رائد الفضاء الصغير واستخراج 4 كلمات جديدة مع تدريب النطق.'
          },
          {
            id: 'sess_3',
            startedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            endedAt: new Date(Date.now() - 86400000 * 2 + 650000).toISOString(),
            skill: 'Pronunciation & Phonics: Short vowels 🎙️',
            quizScore: 3,
            summary: 'التفريق بين نطق الحروف الصوتية القصيرة وحل تحدي النطق الصوتي.'
          }
        ]);
        setLoading(false);
        return;
      }

      try {
        // Fetch tutorMemory doc
        const memRef = doc(db, 'tutorMemory', studentId);
        const memSnap = await getDoc(memRef);
        if (memSnap.exists() && isMounted) {
          setMemory(memSnap.data() as TutorMemoryDoc);
        }

        // Fetch last 7 sessions
        const sessRef = collection(db, 'tutorMemory', studentId, 'sessions');
        let sessSnap;
        try {
          const q = query(sessRef, orderBy('startedAt', 'desc'), limit(7));
          sessSnap = await getDocs(q);
        } catch {
          // Fallback query without orderBy if index is building
          sessSnap = await getDocs(sessRef);
        }

        if (sessSnap && isMounted) {
          const list: TutorSessionDoc[] = [];
          sessSnap.forEach(d => {
            list.push({ id: d.id, ...d.data() } as TutorSessionDoc);
          });
          // Sort client-side descending
          list.sort((a, b) => {
            const timeA = new Date(a.startedAt || 0).getTime();
            const timeB = new Date(b.startedAt || 0).getTime();
            return timeB - timeA;
          });
          setSessions(list.slice(0, 7));
        }
      } catch (err) {
        console.warn('SaraParentCard fetch error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [studentId]);

  return (
    <div className={`bg-white border-2 border-b-4 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#002147] to-[#1a3a60] text-white flex items-center justify-center text-xl shadow-md border-2 border-amber-300 shrink-0">
            👩‍🏫
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-[#002147] leading-tight">
                {isRtl ? 'جلسات المعلمة سارة الذكية 👩‍🏫' : 'Teacher Sara AI Sessions 👩‍🏫'}
              </h3>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-200">
                {isRtl ? 'تقرير تفاعلي' : 'Live Report'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              {isRtl 
                ? `متابعة جلسات الطالب (${studentName})، الكلمات المكتسبة، والأخطاء المعالجة`
                : `Tracking sessions, learned vocabulary & corrected mistakes for ${studentName}`}
            </p>
          </div>
        </div>

        {/* Action Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-end sm:self-center p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
        >
          <span>{isExpanded ? (isRtl ? 'طي البطاقة' : 'Collapse') : (isRtl ? 'عرض التفاصيل' : 'Expand')}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-[#002147] border-t-transparent rounded-full animate-spin" />
          <span>{isRtl ? 'جارٍ تحميل تقرير جلسات سارة...' : 'Loading Sara sessions report...'}</span>
        </div>
      ) : (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              {/* Quick KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                    {isRtl ? 'الجلسات المكتملة' : 'Completed Sessions'}
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-[#002147]">
                    {sessions.length}
                  </p>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-3.5 text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block mb-1">
                    {isRtl ? 'حصيلة الكلمات المكتسبة' : 'Words Learned'}
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-emerald-800">
                    {memory?.wordsLearned?.length || 0}
                  </p>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-amber-50/60 border border-amber-200 rounded-2xl p-3.5 text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-1">
                    {isRtl ? 'أخطاء تم علاجها' : 'Mistakes Addressed'}
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-amber-900">
                    {memory?.frequentMistakes?.length || 0}
                  </p>
                </div>
              </div>

              {/* 1. LAST 7 SESSIONS */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-[#002147]" />
                  <h4 className="text-xs sm:text-sm font-black text-[#002147]">
                    {isRtl ? 'سجل آخر 7 جلسات دراسية مع سارة 🗓️' : 'Last 7 Sessions with Sara 🗓️'}
                  </h4>
                </div>

                {sessions.length === 0 ? (
                  <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center text-slate-500 text-xs">
                    <p className="font-bold">{isRtl ? 'لم يبدأ الطالب جلسات دراسية مع سارة بعد.' : 'No sessions recorded with Sara yet.'}</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {isRtl ? 'بمجرد أن يبدأ الطالب محادثته اليومية مع سارة ستظهر تفاصيل الجلسات والاختبارات هنا فوراً.' : 'Once the student starts their daily chat with Sara, sessions will appear here.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {sessions.map((sess, sIdx) => {
                      const dateStr = sess.startedAt 
                        ? new Date(sess.startedAt).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : '---';

                      return (
                        <div
                          key={sess.id || `sess-${sIdx}`}
                          className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-slate-100/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-black text-[#002147] text-xs sm:text-sm">
                                {sess.skill || (isRtl ? 'جلسة إنجليزية يومية' : 'Daily English Session')}
                              </span>
                              <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                                {dateStr}
                              </span>
                            </div>
                            <p className="text-slate-600 font-medium text-[11px] sm:text-xs leading-relaxed">
                              {sess.summary}
                            </p>
                          </div>

                          {/* Quiz Score Badge */}
                          {typeof sess.quizScore === 'number' && (
                            <div className="flex items-center gap-1.5 self-start sm:self-center px-3 py-1.5 bg-emerald-100/80 text-emerald-900 border border-emerald-300 rounded-xl font-black text-xs shrink-0">
                              <Award size={14} className="text-emerald-700" />
                              <span>{isRtl ? `نتيجة الاختبار: ${sess.quizScore}/3` : `Quiz: ${sess.quizScore}/3`}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. FREQUENT MISTAKES TRACKER */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <AlertCircle size={16} className="text-amber-600" />
                  <h4 className="text-xs sm:text-sm font-black text-[#002147]">
                    {isRtl ? 'نقاط الدقة اللغوية والأخطاء المعالجة 🔍' : 'Corrected Linguistic Nuances & Mistakes 🔍'}
                  </h4>
                </div>

                {(!memory?.frequentMistakes || memory.frequentMistakes.length === 0) ? (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {isRtl ? 'لم تسجل سارة أي أخطاء متكررة بعد، أداء الطالب دقيق وممتاز!' : 'No frequent mistakes logged yet. Good accuracy!'}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {memory.frequentMistakes.map((mistake, mIdx) => (
                      <span
                        key={`mistake-${mIdx}`}
                        className="px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{mistake}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. WORDS LEARNED */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <BookMarked size={16} className="text-[#58cc02]" />
                  <h4 className="text-xs sm:text-sm font-black text-[#002147]">
                    {isRtl ? 'بنك المفردات المكتسبة مع سارة 📚' : 'Vocabulary Acquired with Sara 📚'}
                  </h4>
                </div>

                {(!memory?.wordsLearned || memory.wordsLearned.length === 0) ? (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {isRtl ? 'ستظهر الكلمات الجديدة التي يتعلمها الطالب في جلساته هنا.' : 'New words learned in sessions will appear here.'}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                    {memory.wordsLearned.map((word, wIdx) => (
                      <span
                        key={`word-${wIdx}`}
                        className="px-2.5 py-1 bg-white hover:bg-slate-50 text-[#002147] border border-slate-200 rounded-lg text-xs font-bold font-sans shadow-2xs transition-all"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
