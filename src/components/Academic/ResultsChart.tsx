import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Trophy, 
  Target, 
  Users, 
  Calendar,
  Activity,
  ArrowLeft,
  ChevronRight,
  Download,
  Filter,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { translations, Language } from '../../lib/translations';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

interface ResultsChartProps {
  lang: Language;
  onBack: () => void;
  onNavigateToAnalytics: () => void;
  planItems?: any[] | null;
  studentName?: string;
  studentId?: string;
  isAdmin?: boolean;
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ 
  lang, 
  onBack, 
  onNavigateToAnalytics,
  planItems,
  studentName,
  studentId,
  isAdmin
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [loading, setLoading] = React.useState(true);
  const [results, setResults] = React.useState<any[]>([]);
  const [allStudents, setAllStudents] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (isAdmin) {
          // Fetch all students and their aggregated results
          const studentsSnap = await getDocs(query(collection(db, 'users'), where('role', '==', 'student'), limit(20)));
          const studentsList = studentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAllStudents(studentsList);

          // Fetch recent results globally for some stats if needed
          const resultsSnap = await getDocs(query(collection(db, 'lessonResults'), orderBy('timestamp', 'desc'), limit(50)));
          setResults(resultsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else if (studentId) {
          // Fetch results for specific student
          const q = query(collection(db, 'lessonResults'), where('userId', '==', studentId), orderBy('timestamp', 'desc'));
          const snap = await getDocs(q);
          setResults(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (err) {
        console.error("Error fetching results data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId, isAdmin]);

  const totalLessons = planItems?.length || 0;
  
  // Calculate category averages
  const getCategoryAvg = (categoryId: string) => {
    const catResults = results.filter(r => {
      // Try to find if this result belongs to a course
      // This is a bit tricky without a direct mapping, but we can try to match lesson names or IDs if we had them
      // For now, let's assume lessonResults might eventually have a courseId. 
      // If not, we'll use fallback or filter by lessonId prefixes if they exist.
      return r.courseId === categoryId || r.lessonId?.startsWith(categoryId);
    });
    if (catResults.length === 0) return 0;
    const total = catResults.reduce((acc, r) => acc + (r.score || 0), 0);
    const possible = catResults.reduce((acc, r) => acc + (r.total || 10), 0);
    return Math.round((total / possible) * 100);
  };

  const gradeData = [
    { subject: isRtl ? 'الأكسفورد' : 'Oxford', score: getCategoryAvg('oxford'), avg: 72 },
    { subject: isRtl ? 'القواعد' : 'Grammar', score: getCategoryAvg('grammar'), avg: 68 },
    { subject: isRtl ? 'القراءة' : 'Reading', score: getCategoryAvg('reading'), avg: 75 },
    { subject: isRtl ? 'المحادثة' : 'Conv.', score: getCategoryAvg('conversation'), avg: 70 },
    { subject: isRtl ? 'الكتابة' : 'Writing', score: getCategoryAvg('writing'), avg: 65 },
  ];

  const participationData = [
    { name: isRtl ? 'منهجية' : 'Curric.', value: results.length > 0 ? 80 : 0, color: '#2563eb' },
    { name: isRtl ? 'لامنهجية' : 'Extra', value: results.length > 0 ? 20 : 0, color: '#fbbf24' },
  ];

  const studentsResults = isAdmin ? allStudents.map(s => {
    const studentResults = results.filter(r => r.userId === s.id);
    const total = studentResults.reduce((acc, r) => acc + (r.score || 0), 0);
    const possible = studentResults.reduce((acc, r) => acc + (r.total || 0), 0);
    const avg = possible > 0 ? Math.round((total / possible) * 100) : 0;
    
    return {
      id: s.id,
      name: s.displayName || 'Unnamed Student',
      level: s.level || 'A1',
      grade: `${avg}%`,
      status: avg > 85 ? 'Excellent' : avg > 70 ? 'Good' : avg > 0 ? 'Improving' : 'Pending'
    };
  }) : results.map(r => ({
    id: r.id,
    name: r.lessonTitle || r.lessonId,
    level: r.timestamp?.toDate ? r.timestamp.toDate().toLocaleDateString() : '---',
    grade: `${Math.round((r.score / r.total) * 100)}%`,
    status: r.score === r.total ? 'Mastered' : 'Completed'
  }));

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto ${isRtl ? 'rtl' : 'ltr'}`}>
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-[#002147] transition-colors mb-2"
          >
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
            <span className="font-bold">{isRtl ? 'رجوع' : 'Back'}</span>
          </button>
          <h2 className="text-3xl font-black text-[#002147] flex items-center gap-3">
            <Activity className="text-blue-600" />
            {t.academicResults}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm">
            <Filter size={18} />
            {isRtl ? 'تصفية' : 'Filter'}
          </button>
          <button 
            onClick={onNavigateToAnalytics}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 text-sm"
          >
            {t.academicAnalytics}
            <ChevronRight size={18} className={isRtl ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Statistics Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Charts Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-[#002147] text-lg flex items-center gap-2">
                  <BarChart3 size={20} className="text-blue-500" />
                  {isRtl ? 'مقارنة مستويات المواد' : 'Subject Comparison'}
                </h3>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontFamily: 'inherit' }}
                      cursor={{ fill: '#f8fafc' }}
                    />
                    <Bar dataKey="score" fill="#2563eb" radius={[6, 6, 0, 0]} name={isRtl ? 'درجتك' : 'Your Score'} barSize={20} />
                    <Bar dataKey="avg" fill="#e2e8f0" radius={[6, 6, 0, 0]} name={isRtl ? 'المتوسط' : 'Average'} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-[#002147] text-lg flex items-center gap-2">
                  <Activity size={20} className="text-amber-500" />
                  {isRtl ? 'توزيع المشاركة' : 'Participation Mix'}
                </h3>
              </div>
              <div className="h-[250px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={participationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {participationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                       contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                  <div className="text-center">
                    <p className="text-2xl font-black text-[#002147]">
                      {results.length > 0 ? (Math.round(results.reduce((acc, r) => acc + (r.score / r.total), 0) / results.length * 100)) : '0'}%
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{isRtl ? 'الإجمالي' : 'Total'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-[#002147] text-xl flex items-center gap-3">
                <Users className="text-blue-600" />
                {isAdmin ? (isRtl ? 'إحصائيات الطلاب الجدد' : 'Recent Student Stats') : (isRtl ? 'تفاصيل دروسك المكتملة' : 'Completed Lessons Detail')}
              </h3>
              <button className="text-blue-600 font-bold text-sm hover:underline">
                {isRtl ? 'تصدير الكل' : 'Export All'}
              </button>
            </div>
            <div className="overflow-x-auto min-h-[300px]">
              {loading ? (
                <div className="flex items-center justify-center p-20">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : studentsResults.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 text-left">
                      <th className={`p-6 text-xs font-black text-slate-400 uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                        {isAdmin ? (isRtl ? 'الطالب' : 'Student') : (isRtl ? 'الدرس' : 'Lesson')}
                      </th>
                      <th className={`p-6 text-xs font-black text-slate-400 uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                        {isAdmin ? (isRtl ? 'المستوى' : 'Level') : (isRtl ? 'التاريخ' : 'Date')}
                      </th>
                      <th className={`p-6 text-xs font-black text-slate-400 uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                        {isRtl ? 'المعدل' : 'Grade'}
                      </th>
                      <th className={`p-6 text-xs font-black text-slate-400 uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                        {isRtl ? 'الحالة' : 'Status'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {studentsResults.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-[#002147]">
                              {student.name.charAt(0)}
                            </div>
                            <span className="font-black text-[#002147]">{student.name}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 ${isAdmin ? 'bg-blue-50 text-blue-600' : 'text-slate-500'} rounded-full text-xs font-black`}>
                            {student.level}
                          </span>
                        </td>
                        <td className="p-6">
                          <span className="font-bold text-slate-800">{student.grade}</span>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500" />
                            <span className="text-sm font-bold text-slate-500">{student.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-20 text-center text-slate-400 italic">
                  {isRtl ? 'لا توجد بيانات نتائج متاحة حالياً' : 'No results data available currently'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#002147] p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Trophy size={32} className="text-amber-400" />
              </div>
              <p className="text-blue-200 font-bold text-sm mb-1 uppercase tracking-widest">
                {isRtl ? 'معدل الأكاديمية' : 'Academy Average'}
              </p>
              <h4 className="text-4xl font-black mb-2">
                {results.length > 0 ? (Math.round(results.reduce((acc, r) => acc + (r.score / r.total), 0) / results.length * 100)) : '0'}%
              </h4>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <Activity size={14} />
                +2.4% {isRtl ? 'مقارنة بالشهر الماضي' : 'vs last month'}
              </div>
            </div>
            {/* Abstract Background SVG */}
            <svg className="absolute top-0 right-0 opacity-10 w-48" viewBox="0 0 100 100">
               <circle cx="80" cy="20" r="40" fill="white" />
            </svg>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-[#002147] mb-6 flex items-center gap-2">
              <Target size={20} className="text-rose-500" />
              {isRtl ? 'الأداء حسب المادة' : 'Subject Performance'}
            </h3>
            <div className="space-y-6">
              {[
                { label: isRtl ? 'القواعد' : 'Grammar', value: getCategoryAvg('grammar'), color: 'bg-emerald-500' },
                { label: isRtl ? 'المحادثة' : 'Conversation', value: getCategoryAvg('conversation'), color: 'bg-blue-500' },
                { label: isRtl ? 'القراءة' : 'Reading', value: getCategoryAvg('reading'), color: 'bg-amber-500' },
                { label: isRtl ? 'الكتابة' : 'Writing', value: getCategoryAvg('writing'), color: 'bg-purple-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-600">{item.label}</span>
                    <span className="text-sm font-black text-[#002147]">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                <Download size={24} />
              </div>
              <div>
                <h4 className="font-black text-[#002147] text-sm uppercase">{isRtl ? 'تصدير التقارير' : 'Export Reports'}</h4>
                <p className="text-xs text-emerald-700/70 font-bold mb-3">
                  {isRtl ? 'قم بتحميل النتائج بصيغة PDF أو بصورة عالية الدقة' : 'Download results as PDF or High-Res Image'}
                </p>
                <button 
                  onClick={onNavigateToAnalytics}
                  className="w-full py-3 bg-white text-emerald-600 rounded-xl font-bold text-xs hover:bg-emerald-100 transition-all border border-emerald-200"
                >
                  {isRtl ? 'المنتقل للتحليل الذكي' : 'Go to AI Analytics'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
