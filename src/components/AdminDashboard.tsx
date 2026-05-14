import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { 
  Users, 
  Activity, 
  Send, 
  Sparkles, 
  ArrowRight,
  BrainCircuit,
  Bell,
  Ticket,
  Plus
} from 'lucide-react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  getDocs,
  limit,
  doc,
  setDoc,
  orderBy
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserRole } from '../types';
import ReactMarkdown from 'react-markdown';

export const AdminDashboard = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [onlineStudents, setOnlineStudents] = useState<any[]>([]);
  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  const testApiConnection = async () => {
    setAnalyzing(true);
    setAnalysisResult(null);
    try {
      const pingResp = await fetch('/ping');
      const pingText = await pingResp.text();
      
      const resp = await fetch('/api/health');
      const contentType = resp.headers.get("content-type");
      let errorDetails = "";
      
      if (!resp.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await resp.json();
          errorDetails = JSON.stringify(errorData, null, 2);
        } else {
          errorDetails = await resp.text();
        }
        throw new Error(`HTTP ${resp.status} (Ping: ${pingText}): ${errorDetails.substring(0, 500)}`);
      }
      const data = await resp.json();
      setAnalysisResult(`### System Health\n- **Intelligence Engine:** 🚀 Gemini 3 Flash Preview (Active)\n- **Ping:** ${pingText}\n- **Status:** ${data.status}\n- **Gemini Key:** ${data.geminiKeySet ? '✅ Configured' : '❌ NOT SET'}\n- **Environment:** ${data.isProduction ? 'Production' : 'Development'}\n- **Server Time:** ${data.time}`);
    } catch (err: any) {
      setAnalysisResult(`### ❌ Connection Failed\nError: ${err.message}`);
    } finally {
      setAnalyzing(false);
    }
  };
  
  // Voucher State
  const [voucherCredits, setVoucherCredits] = useState(12);
  const [generating, setGenerating] = useState(false);
  const [recentVouchers, setRecentVouchers] = useState<any[]>([]);
  
  // Settings State
  const [videoLessonsEnabled, setVideoLessonsEnabled] = useState(true);

  useEffect(() => {
    if (!db || !auth.currentUser) return;
    
    // Prevent unauthorized listeners that cause console errors
    const isHardcodedAdmin = auth.currentUser.email === 'basim5252@gmail.com';
    if (!isHardcodedAdmin) return;
    
    // Threshold: 5 minutes ago
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    
    let studentsUnsubscribe = () => {};
    let vouchersUnsubscribe = () => {};
    let settingsUnsubscribe = () => {};

    try {
      studentsUnsubscribe = onSnapshot(
        query(collection(db, 'users'), where('role', '==', UserRole.STUDENT)),
        (snapshot) => {
          const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAllStudents(students);
          setOnlineStudents(students.filter((s: any) => (s.lastSeen || 0) > fiveMinutesAgo));
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'users');
        }
      );

      vouchersUnsubscribe = onSnapshot(
        query(collection(db, 'vouchers'), orderBy('createdAt', 'desc'), limit(10)),
        (snapshot) => {
          setRecentVouchers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'vouchers');
        }
      );

      settingsUnsubscribe = onSnapshot(
        doc(db, 'settings', 'global'),
        (snapshot) => {
          if (snapshot.exists()) {
            setVideoLessonsEnabled(snapshot.data().videoLessonsEnabled !== false);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'settings/global');
        }
      );
    } catch (err) {
      console.error("Setup listeners error:", err);
    }

    return () => {
      studentsUnsubscribe();
      vouchersUnsubscribe();
      settingsUnsubscribe();
    };
  }, []);

  const toggleVideoLessons = async () => {
    try {
      const newValue = !videoLessonsEnabled;
      setVideoLessonsEnabled(newValue);
      await setDoc(doc(db, 'settings', 'global'), {
        videoLessonsEnabled: newValue,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.error("Error toggling video lessons:", err);
    }
  };

  const generateVoucher = async () => {
    if (voucherCredits <= 0) return;
    setGenerating(true);
    try {
      // Generate a random code AK-XXXX-XXXX
      const randomPart = Math.random().toString(36).substring(2, 11).toUpperCase();
      const code = `AK-${randomPart.substring(0, 4)}-${randomPart.substring(4, 9)}`;
      
      await setDoc(doc(db, 'vouchers', code), {
        code,
        credits: voucherCredits,
        status: 'active',
        createdAt: serverTimestamp(),
        createdBy: 'admin'
      });
      
      alert(isRtl ? `تم توليد الكود: ${code}` : `Voucher generated: ${code}`);
    } catch (err) {
      console.error("Voucher Generation Error:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleBroadcast = async () => {
    if (!broadcastMessage.trim()) return;
    setSending(true);
    try {
      await addDoc(collection(db, 'notifications'), {
        titleAr: 'تنبيه إداري من الأستاذ باسم',
        titleEn: 'Administrative Alert from Mr. Basim',
        messageAr: broadcastMessage,
        messageEn: broadcastMessage,
        createdAt: serverTimestamp()
      });
      setBroadcastMessage('');
      alert(t.broadcastSuccess);
    } catch (err) {
      console.error("Error sending broadcast:", err);
    } finally {
      setSending(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const studentsMeta = await getDocs(query(collection(db, 'users'), where('role', '==', UserRole.STUDENT), limit(20)));
      const grades = await getDocs(query(collection(db, 'grades'), limit(50)));
      
      const dataForAI = {
        students: studentsMeta.docs.map(d => d.data()),
        grades: grades.docs.map(d => d.data())
      };

      const resp = await fetch('/api/admin/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: dataForAI })
      });

      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
      const result = await resp.json();
      setAnalysisResult(result.text || "No analysis available.");
    } catch (err: any) {
      console.error("Analysis Error:", err);
      setAnalysisResult(`### ❌ Analysis Failed\nError: ${err.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  const [designingCurriculum, setDesigningCurriculum] = useState(false);
  const [designSubject, setDesignSubject] = useState('');
  const [curriculumDesign, setCurriculumDesign] = useState<any>(null);

  const handleDesignCurriculum = async () => {
    if (!designSubject.trim()) return;
    setDesigningCurriculum(true);
    setCurriculumDesign(null);
    try {
      const resp = await fetch('/api/curriculum/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: designSubject, goals: 'High impact education', lang })
      });
      if (!resp.ok) throw new Error("Failed to design curriculum");
      const data = await resp.json();
      setCurriculumDesign(data);
    } catch (err) {
      console.error("Design Error:", err);
    } finally {
      setDesigningCurriculum(false);
    }
  };

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#002147]">{t.adminCommandCenter}</h2>
          <p className="text-slate-400 mt-1 font-medium">{isRtl ? 'إدارة الأكاديمية والتحليل الذكي للمنصة' : 'Academy Management & Smart Platform Analysis'}</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             {onlineStudents.length} {t.activeStudents}
           </div>
           
           <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2">
              <span className="text-[10px] font-black text-[#002147] uppercase tracking-widest">{t.interactiveVideos}</span>
              <button 
                onClick={toggleVideoLessons}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${videoLessonsEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}
              >
                <motion.div 
                  animate={{ x: videoLessonsEnabled ? (isRtl ? -24 : 24) : 0 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </button>
           </div>
        </div>
      </header>

      {/* Diagnostics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#002147] p-8 rounded-[2.5rem] shadow-xl text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Activity className="text-emerald-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black">{isRtl ? 'حالة النظام' : 'System Diagnostics'}</h2>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{isRtl ? 'فحص الاتصال والذكاء الاصطناعي' : 'VERIFY CONNECTIVITY'}</p>
            </div>
          </div>
          <div className="space-y-4">
            <button
               onClick={testApiConnection}
               disabled={analyzing}
               className="w-full py-4 bg-emerald-500 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-50"
            >
              <BrainCircuit size={18} />
              {analyzing ? (isRtl ? 'جاري الفحص...' : 'Checking...') : (isRtl ? 'فحص اتصال API V2' : 'Test API Connection V2')}
            </button>
            
            {analysisResult && (
              <div className="bg-white/10 p-6 rounded-2xl border border-white/5 prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{analysisResult}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#002147]">{isRtl ? 'الطلاب النشطون' : 'Active Students'}</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{isRtl ? 'إحصائيات فورية' : 'REAL-TIME STATS'}</p>
            </div>
          </div>
          <div className="text-5xl font-black text-[#002147] mb-2">{onlineStudents.length}</div>
          <p className="text-sm font-bold text-slate-400">{isRtl ? 'من إجمالي' : 'out of'} {allStudents.length} {isRtl ? 'طالباً مسجلاً' : 'registered students'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Active Students & Stats */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-[#002147] flex items-center gap-3">
                <Activity className="text-blue-600" />
                {t.activeStudents}
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{onlineStudents.length} / {allStudents.length}</span>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {onlineStudents.length === 0 ? (
                <div className="text-center py-10 opacity-40 italic text-sm">{t.noActiveStudents}</div>
              ) : (
                onlineStudents.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 overflow-hidden shadow-sm">
                        <img src={student.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.displayName}`} alt="" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#002147]">{student.displayName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{student.email}</p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={16} className="text-blue-600" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 opacity-50" />
             <h3 className="text-xl font-black text-[#002147] mb-6 flex items-center gap-3 relative">
               <Ticket className="text-amber-500" />
               {isRtl ? 'إدارة قسائم الشحن' : 'Voucher Management'}
             </h3>
             
             <div className="space-y-4 relative z-10">
               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{isRtl ? 'عدد دروس القسيمة' : 'Credits Per Voucher'}</label>
                 <div className="flex gap-2">
                   {[2, 12, 35, 80].map(val => (
                     <button 
                       key={val}
                       onClick={() => setVoucherCredits(val)}
                       className={`flex-1 py-2 rounded-xl font-black text-xs transition-all ${voucherCredits === val ? 'bg-[#002147] text-white' : 'bg-white text-[#002147] border border-slate-200'}`}
                     >
                       {val === 2 ? (isRtl ? 'هدية' : 'Gift') : val}
                     </button>
                   ))}
                 </div>
               </div>

               <button 
                 onClick={generateVoucher}
                 disabled={generating}
                 className="w-full bg-[#002147] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#C49E3A] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
               >
                 {generating ? <Plus className="animate-spin" /> : <Plus size={16} />}
                 {isRtl ? 'توليد كود جديد' : 'Generate New Code'}
               </button>

               <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{isRtl ? 'الأكواد الأخيرة' : 'Recent Codes'}</h4>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {recentVouchers.map(v => (
                       <div key={v.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-[10px] font-black text-[#002147]">{v.code}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">{v.credits} Credits • {v.status}</p>
                          </div>
                          {v.status === 'active' && (
                            <button 
                              onClick={() => navigator.clipboard.writeText(v.code)}
                              className="text-blue-600 font-bold text-[9px] uppercase tracking-widest hover:underline"
                            >
                              Copy
                            </button>
                          )}
                       </div>
                    ))}
                  </div>
               </div>
             </div>
          </section>

          <section className="bg-gradient-to-br from-[#002147] to-[#003366] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
             <div className="space-y-6 relative">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={14} className="text-blue-200" />
                    <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em]">{t.totalStudents}</p>
                  </div>
                  <h4 className="text-4xl font-black">{allStudents.length}</h4>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{t.averageLevel}</p>
                  <h4 className="text-4xl font-black">B1+</h4>
                </div>
             </div>
          </section>
        </div>

        {/* Middle & Right: AI Analysis & Broadcast */}
        <div className="lg:col-span-2 space-y-8">
          {/* Broadcast Section */}
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50" />
            <h3 className="text-xl font-black text-[#002147] mb-6 flex items-center gap-3 relative">
              <Bell className="text-orange-500" />
              {t.sendBroadcast}
            </h3>
            <div className="flex gap-4 items-end relative">
              <div className="flex-1">
                <textarea 
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder={t.broadcastPlaceholder}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 text-sm focus:outline-none focus:border-blue-600 h-32 resize-none transition-all"
                />
              </div>
              <button 
                onClick={handleBroadcast}
                disabled={sending || !broadcastMessage.trim()}
                className="bg-[#002147] text-white p-6 rounded-3xl hover:bg-[#C49E3A] transition-all disabled:opacity-50 shadow-lg shadow-blue-100 shrink-0"
              >
                {sending ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={24} className={isRtl ? 'rotate-180' : ''} />}
              </button>
            </div>
          </section>

          {/* AI Analysis Section */}
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <h3 className="text-xl font-black text-[#002147] flex items-center gap-3">
                <BrainCircuit className="text-purple-600" />
                {t.aiAnalysis}
              </h3>
              <button 
                onClick={handleAnalyze}
                disabled={analyzing}
                className="bg-purple-50 text-purple-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all flex items-center gap-3 disabled:opacity-50 w-full md:w-auto justify-center"
              >
                {analyzing ? <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" /> : <Sparkles size={16} />}
                {t.analyzePlatform}
              </button>
            </header>

            {analysisResult ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-slate max-w-none custom-markdown-content font-arabic leading-relaxed prose-headings:text-[#002147] prose-headings:font-black prose-p:text-slate-600 prose-strong:text-[#C49E3A] bg-slate-50 p-8 rounded-[3rem] border border-slate-100"
              >
                <ReactMarkdown>{analysisResult}</ReactMarkdown>
              </motion.div>
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                <div className="w-16 h-16 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity size={32} />
                </div>
                <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">{isRtl ? 'بانتظار التحليل الذكي...' : 'Waiting for AI analysis...'}</p>
              </div>
            )}
          </section>

          {/* Curriculum Designer Section */}
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm overflow-hidden">
            <h3 className="text-xl font-black text-[#002147] mb-6 flex items-center gap-3">
              <Plus className="text-blue-600" />
              {isRtl ? 'مصمم المناهج الذكي' : 'Smart Curriculum Designer'}
            </h3>
            <div className="flex gap-4 mb-8">
              <input 
                type="text" 
                value={designSubject}
                onChange={(e) => setDesignSubject(e.target.value)}
                placeholder={isRtl ? 'مثال: فيزياء الجسيمات أو ريادة الأعمال' : 'e.g. Particle Physics or Entrepreneurship'}
                className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-600 transition-all font-bold"
              />
              <button 
                onClick={handleDesignCurriculum}
                disabled={designingCurriculum || !designSubject.trim()}
                className="bg-blue-600 text-white px-8 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#002147] transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
              >
                {designingCurriculum ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  isRtl ? 'تصميم' : 'Design'
                )}
              </button>
            </div>

            {curriculumDesign && (
              <div className="space-y-6">
                {Object.entries(curriculumDesign).map(([level, units]: [any, any]) => (
                  <div key={level} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <h4 className="font-black text-[#002147] mb-4 flex items-center gap-2">
                       <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs">{level}</span>
                       {isRtl ? 'محتوى المستوى' : 'Level Content'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {units.map((u: any, i: number) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                           <h5 className="font-bold text-sm text-[#002147]">{isRtl ? u.titleAr : u.title}</h5>
                           <p className="text-[10px] text-slate-400 mt-1">{isRtl ? u.descriptionAr : u.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Technical Replacement Strategy (User Request) */}
          <section className="bg-[#002147] rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Sparkles className="text-blue-400" />
                {isRtl ? 'خطة إحلال التقنية وتطوير المناهج' : 'Technology Replacement & Curriculum Strategy'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl mb-4 flex items-center justify-center">
                    <Hash className="text-white w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm mb-2">{isRtl ? 'إحلال المحرك الأساسي (G3)' : 'Core Engine Replacement (G3)'}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isRtl ? 'تم ترقية الأكاديمية بالكامل إلى Gemini 3 Flash بنظام المعاينة لدقة فائقة وسرعة تفاعلية غير مسبوقة.' : 'The academy has been fully upgraded to Gemini 3 Flash Preview for superior precision and unprecedented interactive speed.'}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-indigo-500 rounded-xl mb-4 flex items-center justify-center">
                    <LayoutDashboard className="text-white w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm mb-2">{isRtl ? 'المناهج الديناميكية' : 'Dynamic Curriculums'}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isRtl ? 'توليد مسارات تعلم مخصصة لكل طالب بدلاً من المناهج الثابتة، مما يزيد من معدل الإنجاز.' : 'Generating personalized learning paths for each student instead of static content, increasing completion rates.'}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl mb-4 flex items-center justify-center">
                    <CheckCircle className="text-white w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm mb-2">{isRtl ? 'التقييم الآلي' : 'Automated Assessment'}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isRtl ? 'إلغاء التقييم اليدوي واستبداله بتحليل ذكاء اصطناعي فوري لمستوى الكفاءة (CEFR).' : 'Eliminating manual assessment and replacing it with real-time AI analysis of proficiency levels (CEFR).'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
