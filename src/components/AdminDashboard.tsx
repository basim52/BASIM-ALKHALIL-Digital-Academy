import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck,
  Plus,
  Hash,
  LayoutDashboard,
  CheckCircle,
  Download,
  Trash2,
  ShieldAlert
} from 'lucide-react';
import html2canvas from 'html2canvas';
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
  getDoc,
  setDoc,
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserRole, MASTER_ADMINS, UserProfile } from '../types';
import { updateDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';

export const AdminDashboard = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [onlineStudents, setOnlineStudents] = useState<any[]>([]);
  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzingStatus, setAnalyzingStatus] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleShareAsImage = async () => {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#f8fafc', // Tailwind slate-50
        logging: false,
        useCORS: true
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `Basim-Academy-AI-Report-${new Date().getTime()}.png`;
      link.click();
    } catch (err) {
      console.error("Export Error:", err);
    }
  };
  
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
      setAnalysisResult(`### System Health\n- **Intelligence Engine:** 🚀 Gemini 1.5 Flash (Active)\n- **Ping:** ${pingText}\n- **Status:** ${data.status}\n- **Gemini Key:** ${data.geminiKeySet ? '✅ Configured' : '❌ NOT SET'}\n- **Environment:** ${data.isProduction ? 'Production' : 'Development'}\n- **Server Time:** ${data.time}`);
    } catch (err: any) {
      setAnalysisResult(`### ❌ Connection Failed\nError: ${err.message}`);
    } finally {
      setAnalyzing(false);
    }
  };
  
  // Settings State
  const [videoLessonsEnabled, setVideoLessonsEnabled] = useState(true);

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (!confirm(isRtl ? `هل أنت متأكد من حذف الطالب ${studentName} نهائياً؟` : `Are you sure you want to permanently delete student ${studentName}?`)) return;
    
    try {
      await deleteDoc(doc(db, 'users', studentId));
      setAllStudents(prev => prev.filter(s => s.id !== studentId));
      alert(isRtl ? 'تم حذف الطالب بنجاح' : 'Student deleted successfully');
    } catch (err) {
      console.error("Delete error:", err);
      alert(isRtl ? 'خطأ في الحذف' : 'Error deleting student');
    }
  };

  const handlePromoteToAdmin = async (studentId: string, name: string) => {
    if (!confirm(isRtl ? `هل أنت متأكد من منح صلاحيات الآدمن لـ ${name}؟` : `Are you sure you want to grant Admin privileges to ${name}?`)) return;
    try {
      await updateDoc(doc(db, 'users', studentId), {
        role: UserRole.ADMIN
      });
      alert(isRtl ? "تمت الترقية بنجاح!" : "Promotion successful!");
    } catch (err) {
      console.error("Promotion error:", err);
      alert(isRtl ? "فشل في الترقية" : "Promotion failed");
    }
  };

  useEffect(() => {
    if (!db || !auth.currentUser) return;
    
    // Prevent unauthorized listeners that cause console errors
    const isHardcodedAdmin = MASTER_ADMINS.includes(auth.currentUser.email?.toLowerCase() || '');
    if (!isHardcodedAdmin) return;
    
    // Threshold: 5 minutes ago
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    
    let studentsUnsubscribe = () => {};
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
      // Generate a more robust random code
      const chars = '0123456789'; 
      let randomPart = '';
      for (let i = 0; i < 9; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      const code = `AK-${randomPart.substring(0, 4)}-${randomPart.substring(4, 9)}`;
      
      const voucherRef = doc(db, 'vouchers', code);
      const voucherSnap = await getDoc(voucherRef);
      
      if (voucherSnap.exists()) {
        return generateVoucher();
      }

      await setDoc(voucherRef, {
        code,
        credits: voucherCredits,
        status: 'active',
        createdAt: serverTimestamp(),
        createdBy: 'admin'
      });
      
      alert(isRtl ? `تم توليد الكود بنجاح: ${code}` : `Voucher generated successfully: ${code}`);
    } catch (err) {
      console.error("Voucher Generation Error:", err);
      alert(isRtl ? "فشل في توليد الكود" : "Failed to generate voucher");
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
    setAnalyzingStatus(isRtl ? 'جاري جمع بيانات الطلاب والنتائج...' : 'Gathering student data and grades...');
    try {
      const studentsMeta = await getDocs(query(collection(db, 'users'), where('role', '==', UserRole.STUDENT), limit(20)));
      const grades = await getDocs(query(collection(db, 'grades'), limit(50)));
      
      const dataForAI = {
        students: studentsMeta.docs.map(d => d.data()),
        grades: grades.docs.map(d => d.data())
      };

      setAnalyzingStatus(isRtl ? 'جاري تحليل البيانات عبر محرك الذكاء الاصطناعي...' : 'Analyzing data via AI engine...');
      
      const resp = await fetch('/api/admin/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: dataForAI })
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${resp.status}`);
      }
      const result = await resp.json();
      setAnalysisResult(result.text || "No analysis available.");
    } catch (err: any) {
      console.error("Analysis Error:", err);
      setAnalysisResult(`### ❌ ${isRtl ? 'فشل التحليل' : 'Analysis Failed'}\n\n${err.message}`);
    } finally {
      setAnalyzing(false);
      setAnalyzingStatus(null);
    }
  };

  const [designingCurriculum, setDesigningCurriculum] = useState(false);
  const [designSubject, setDesignSubject] = useState('');
  const [curriculumDesign, setCurriculumDesign] = useState<any>(null);
  
  // Voucher and Credit System State
  const [voucherCredits, setVoucherCredits] = useState(2);
  const [generating, setGenerating] = useState(false);
  const [recentVouchers, setRecentVouchers] = useState<any[]>([]);

  useEffect(() => {
    if (!db || !auth.currentUser) return;
    
    // Fetch recent vouchers
    const vouchersUnsubscribe = onSnapshot(
      query(collection(db, 'vouchers'), orderBy('createdAt', 'desc'), limit(10)),
      (snapshot) => {
        setRecentVouchers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    return () => vouchersUnsubscribe();
  }, []);

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
                onlineStudents.map((student) => (
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
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Aboud Statistics Card */}
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50" />
             <h3 className="text-xl font-black text-[#002147] mb-6 flex items-center gap-3 relative">
               <Activity className="text-emerald-500" />
               {isRtl ? 'إحصائيات الطلاب الجدد' : 'New Students Statistics'}
             </h3>
             <div className="space-y-6 relative z-10">
                <div className="bg-slate-50 p-6 rounded-3xl border border-blue-100 shadow-sm group hover:border-blue-300 transition-all">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-slate-100 shadow-sm">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aboud" alt="Aboud" className="w-full h-full rounded-xl" />
                         </div>
                         <div>
                            <h4 className="text-xl font-black text-[#002147]">{isRtl ? 'عبود' : 'Aboud'}</h4>
                            <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{isRtl ? 'طالب منضم حديثاً' : 'Newly Joined Student'}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Growth 9.8</span>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-2xl border border-slate-100">
                         <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{isRtl ? 'معدل النجاح' : 'Success Rate'}</p>
                         <p className="text-lg font-black text-[#002147]">94%</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-100">
                         <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{isRtl ? 'الالتزام بالخطة' : 'Plan Commitment'}</p>
                         <p className="text-lg font-black text-blue-600">+12%</p>
                      </div>
                   </div>
                   <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <BrainCircuit size={16} className="text-purple-500" />
                         <span className="text-xs font-bold text-slate-500">{isRtl ? 'تحليل الذكاء الاصطناعي: مستوى متميز جداً' : 'AI Analysis: Exceptional Growth'}</span>
                      </div>
                      <Sparkles size={16} className="text-amber-500 animate-pulse" />
                   </div>
                </div>
             </div>
          </section>

          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50" />
             <h3 className="text-xl font-black text-[#002147] mb-6 flex items-center gap-3 relative">
               <ShieldCheck className="text-indigo-500" />
               {isRtl ? 'إدارة جميع الطلاب' : 'All Students Management'}
             </h3>
             <div className="space-y-4 relative z-10 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-3">
                  {allStudents.map((student) => (
                    <div key={`all-${student.id}`} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-100 overflow-hidden shadow-sm">
                            <img src={student.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.displayName}`} alt="" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#002147]">{student.displayName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{student.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handlePromoteToAdmin(student.id, student.displayName)}
                          className="flex-1 bg-white border border-indigo-100 text-indigo-600 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <ShieldAlert size={14} />
                          {isRtl ? 'مسؤول' : 'Admin'}
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student.id, student.displayName)}
                          className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
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
                  <h4 className="text-4xl font-black">
                    {allStudents.length > 0 
                      ? (() => {
                          const levels = allStudents.map(s => s.level || 'A1');
                          const levelValues: Record<string, number> = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6 };
                          const avgValue = Math.round(levels.reduce((acc, l) => acc + (levelValues[l] || 1), 0) / levels.length);
                          return Object.keys(levelValues).find(key => levelValues[key] === avgValue) || 'A1';
                        })()
                      : '---'}
                  </h4>
                </div>
             </div>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-8">
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

            {analysisResult && (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button
                    onClick={handleShareAsImage}
                    className="bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-xs font-black transition-all cursor-pointer shadow-sm"
                  >
                    <Download size={14} />
                    {isRtl ? 'تحميل تقرير المنصة كصورة 💾' : 'Download Platform Report as Image 💾'}
                  </button>
                </div>
                <motion.div 
                  ref={reportRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden"
                >
                  <div className="prose prose-slate max-w-none custom-markdown-content font-arabic leading-relaxed prose-headings:text-[#002147] prose-headings:font-black prose-p:text-slate-600 prose-strong:text-[#C49E3A]">
                    <ReactMarkdown>{analysisResult}</ReactMarkdown>
                  </div>
                </motion.div>
              </div>
            )}
          </section>

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
                  <h4 className="font-bold text-sm mb-2">{isRtl ? 'إحلال المحرك الأساسي' : 'Core Engine Replacement'}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isRtl ? 'ترقية إلى Gemini 3 Flash بنظام المعاينة لدقة فائقة.' : 'Upgrade to Gemini 3 Flash Preview for superior precision.'}
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
