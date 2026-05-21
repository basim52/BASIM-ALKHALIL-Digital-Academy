import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Server, 
  Terminal, 
  Cpu, 
  FileText, 
  Database, 
  Sparkles, 
  Play, 
  ArrowRight, 
  Settings, 
  Check, 
  Copy, 
  BookOpen, 
  Info, 
  Brain, 
  Layers, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface GeminiDeveloperHubProps {
  lang: 'en' | 'ar';
  onBack: () => void;
  userProfile?: any;
}

export const GeminiDeveloperHub = ({ lang, onBack, userProfile }: GeminiDeveloperHubProps) => {
  const isRtl = lang === 'ar';
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'docs' | 'sandbox' | 'snippets'>('docs');
  const [sandboxType, setSandboxType] = useState<'function' | 'code' | 'doc'>('function');
  
  // Sandbox Interactive States
  const [promptInput, setPromptInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sandboxResponse, setSandboxResponse] = useState<any | null>(null);
  const [customLogs, setCustomLogs] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPrepopulatedPrompt = (type: 'function' | 'code' | 'doc', subType?: string) => {
    if (isRtl) {
      if (type === 'function') {
        if (subType === 'inventory') return 'هل كتاب Oxford Discover 1 متوفر في المستودع وكم تبلغ قيمته المالية؟';
        return 'أعطني بطاقة الطالب أحمد وسجله الأكاديمي بالتفصيل';
      }
      if (type === 'code') return 'احسب متوسط درجات الفصول ومجموع التقييمات الآتية: [92, 85, 94, 76, 89] ومثل الانحراف المعياري باستخدام صيغة رياضية.';
      return 'ما هو الحد الأقصى لعدد الطلاب المسموح به في صفوف المناهج المطورة؟ ومن هي الطالبة المعفاة بالكامل من رسوم الكتب؟';
    } else {
      if (type === 'function') {
        if (subType === 'inventory') return 'Is there stock remaining for Writing Essentials B2 and how much does it cost?';
        return 'Retrieve academic records and points for the student named Sarah';
      }
      if (type === 'code') return 'Compute Python-based standard deviation for student quiz scores: [84, 90, 95, 78, 92] and explain.';
      return 'What are the administration fees for registrations and which days are classes held?';
    }
  };

  const handleRunSandbox = async (type: 'function' | 'code' | 'doc') => {
    if (!promptInput.trim()) return;

    setIsLoading(true);
    setSandboxResponse(null);
    setCustomLogs([
      { status: 'info', message: isRtl ? 'جاري الاتصال بخوادم بوابات الدعم وتمرير المعطيات الموثقة...' : 'Initializing tunnel request to secure backend gateway...' }
    ]);

    try {
      const taskTypeMap = {
        'function': 'function-calling',
        'code': 'code-execution',
        'doc': 'document-processing'
      };

      const response = await fetch('/api/gemini/developer-sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptInput,
          taskType: taskTypeMap[type]
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Gateway exception caught during transaction pipeline.');
      }

      setSandboxResponse(data);
      if (data.logs) {
        setCustomLogs(data.logs);
      } else {
        setCustomLogs([
          { status: 'success', message: isRtl ? 'تمت تلبية الطلب من نموذج Gemini واستخلاص الإجابة.' : 'Transaction achieved successfully from Gemini Endpoint.' }
        ]);
      }
    } catch (err: any) {
      setCustomLogs([
        { status: 'error', message: err.message || (isRtl ? 'فشلت معالجة الطلبية. عذراً!' : 'Pipeline transaction error.') }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 font-sans pb-16">
      {/* Premium Header */}
      <header className="bg-gradient-to-r from-[#002147] to-[#0d3460] text-white py-10 px-6 md:px-12 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C49E3A]/10 rounded-full blur-3xl transform translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-12 translate-y-12"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C49E3A] text-xs font-bold uppercase mb-4 tracking-wider border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              {isRtl ? 'بوابة الوكلاء الذكيين المحدثة' : 'Next-Gen Autonomous Agent Portal'}
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              {isRtl ? 'مركز دمج وبناء وكلاء Gemini API' : 'Gemini AI Agent Integration Portal'}
            </h1>
            <p className="text-slate-300 font-serif text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              {isRtl 
                ? 'مستندات تشغيلية تفاعلية، ومحاكاة حية لاستدعاء الموارد البرمجية (Tool Use & Code Execution) وحوسبة بايثون من خوادم Google المستقلة.'
                : 'Interactive deployment guide, real-time code executions, and autonomous tool calling schemas leveraging Google Gemini 3.5 Models.'}
            </p>
          </div>

          <button 
            onClick={onBack}
            className="px-5 py-2.5 bg-[#C49E3A] hover:bg-[#b08d30] text-white rounded-xl transition-all duration-200 text-xs font-black shadow-lg flex items-center justify-center gap-2 w-fit"
          >
            {isRtl ? 'العودة للوحة الرئيسية' : 'Return to Dashboard'}
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </header>

      {/* Navigation Sub-Header */}
      <div className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex space-x-0 md:space-x-1 overflow-x-auto no-scrollbar py-2">
            {[
              { id: 'docs', label: isRtl ? 'التوجيهات وأفضل الممارسات' : 'Integration Guidelines', icon: BookOpen },
              { id: 'sandbox', label: isRtl ? 'البيئة التجريبية الحية Sandbox' : 'Interactive Playgrounds', icon: Terminal },
              { id: 'snippets', label: isRtl ? 'قوالب الأكواد (TypeScript SDK)' : 'Production Snippets', icon: Code }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-black text-sm whitespace-nowrap transition-all duration-200 ${
                    isActive 
                      ? 'border-[#002147] text-[#002147]' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#C49E3A]' : ''}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>SDK Version: @google/genai v0.1.2</span>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {activeTab === 'docs' && (
          <div className="space-y-10">
            {/* Overview Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center">
              <div className="w-16 h-16 bg-[#002147]/5 rounded-2xl flex items-center justify-center text-[#002147] shrink-0">
                <Brain className="w-8 h-8 text-[#C49E3A]" />
              </div>
              <div className="text-right flex-1">
                <h3 className="text-xl font-bold text-slate-900">{isRtl ? 'بناء الوكيل المستقل (Autonomous General Agent)' : 'General Agentic Concept'}</h3>
                <p className="text-slate-500 text-sm font-serif mt-1 leading-relaxed">
                  {isRtl 
                    ? 'الوكلاء بالأكاديمية ليسوا مجرد روبوتات محادثة؛ هم أنظمة فرعية مستقلة تمتلك صلاحيات تشغيل الكود البرمجي (Code Execution) وقراءة قواعد البيانات والتحقق من التوفر عبر الـ APIs بشكل ثنائي الخطى وديناميكي تماماً.'
                    : 'AI Agents are autonomous loop engines equipped with system variables, sandbox execution properties, and standard REST interface connectors.'}
                </p>
              </div>
            </div>

            {/* Layout Grid of 3 Main Core Concepts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-right">
              {/* Box 1: Document Processor */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-5">
                    <FileText className="w-5.5 h-5.5" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">1. وكلاء قراءة المستندات والمراجع</h4>
                  <p className="text-slate-500 text-xs font-serif leading-relaxed mb-4">
                    يدعم نموذج Gemini معالجة المستندات الضخمة (حتى 2 مليون ملف) عبر معالجة الملفات والبحث المبرهن (Grounded Document QA). يتميز بعدم حاجته لتقطيع النصوص المعقدة (Chuncking) في غالب الأحيان بفضل نافذة السياق الضخمة.
                  </p>
                  <ul className="text-xs space-y-2 text-slate-600 font-serif border-t border-slate-100 pt-3">
                    <li className="flex gap-2 items-start justify-end">
                      <span>دقة متناهية بالاقتباس عبر الفهرسة المترابطة.</span>
                      <span className="text-orange-500 font-bold">•</span>
                    </li>
                    <li className="flex gap-2 items-start justify-end">
                      <span>دعم ممتاز لقراءة اللوائح الأكاديمية والملازم.</span>
                      <span className="text-orange-500 font-bold">•</span>
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setActiveTab('sandbox'); setSandboxType('doc'); }}
                  className="mt-6 flex items-center justify-center gap-1.5 text-xs font-bold text-[#002147] hover:text-[#C49E3A] transition-colors"
                >
                  {isRtl ? 'تجربة المحاكاة' : 'Try Live Simulation'}
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>

              {/* Box 2: Code Execution */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-5">
                    <Cpu className="w-5.5 h-5.5" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">2. تحليل البيانات والأكواد حياً</h4>
                  <p className="text-slate-500 text-xs font-serif leading-relaxed mb-4">
                    تفعيل أداة `codeExecution` يمنح الوكيل بيئة تشغيل بايثون معزولة (Sandbox). يقوم الوكيل بكتابة وتنفيذ التعليمات تلقائياً لحساب المعادلات الإحصائية، رسم اتجاهات تقدم الطلاب، أو تصنيف البيانات بشكل مستقل ونشر المخرجات للواجهة.
                  </p>
                  <ul className="text-xs space-y-2 text-slate-600 font-serif border-t border-slate-100 pt-3">
                    <li className="flex gap-2 items-start justify-end">
                      <span>تشغيل حقيقي لأكثر من 15 مكتبة بيانات.</span>
                      <span className="text-green-500 font-bold">•</span>
                    </li>
                    <li className="flex gap-2 items-start justify-end">
                      <span>دقة رياضية تامة بعكس المعالجة اللغوية البسيطة.</span>
                      <span className="text-green-500 font-bold">•</span>
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setActiveTab('sandbox'); setSandboxType('code'); }}
                  className="mt-6 flex items-center justify-center gap-1.5 text-xs font-bold text-[#002147] hover:text-[#C49E3A] transition-colors"
                >
                  {isRtl ? 'تجربة المحاكاة' : 'Try Live Simulation'}
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>

              {/* Box 3: Function Calling */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                    <Database className="w-5.5 h-5.5" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">3. استدعاء الدوال والتجاوب الهيكلي</h4>
                  <p className="text-slate-500 text-xs font-serif leading-relaxed mb-4">
                    أهم مميزات الوكلاء لربطهم بقواعد البيانات المباشرة (مثل PostgreSQL أو Firestore). تصرّح للوكيل بالدالة وصيغة مدخلاتها، فيقوم الوكيل بصياغة هيكل الطلب رداً على سؤال المستخدم ليقوم تطبيقك بتنفيذه محلياً وإرجاع النتيجة للنموذج.
                  </p>
                  <ul className="text-xs space-y-2 text-slate-600 font-serif border-t border-slate-100 pt-3">
                    <li className="flex gap-2 items-start justify-end">
                      <span>ربط آمن وحصين ومغلق مع قواعد بياناتك الداخلية.</span>
                      <span className="text-blue-500 font-bold">•</span>
                    </li>
                    <li className="flex gap-2 items-start justify-end text-right">
                      <span>مرونة مطلقة لحجز المواعيد والتحكم بالأجهزة كالمقابس الذكية.</span>
                      <span className="text-blue-500 font-bold">•</span>
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setActiveTab('sandbox'); setSandboxType('function'); }}
                  className="mt-6 flex items-center justify-center gap-1.5 text-xs font-bold text-[#002147] hover:text-[#C49E3A] transition-colors"
                >
                  {isRtl ? 'تجربة المحاكاة' : 'Try Live Simulation'}
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>

            {/* System Architectural Loop Diagram */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm text-right">
              <h3 className="text-xl font-bold text-slate-900 mb-6">مخطط دورة استدعاء الدوال (Agent Action Cycle Loop)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {[
                  { step: '1', title: 'السؤال والمطالبة', desc: 'يطرح المستخدم سياق يحتاج التقصي عن البيانات (مثلاً: رصيد مخزون كتب Oxford).' },
                  { step: '2', title: 'استنباط الدالة', desc: 'يرى Gemini دالة check_inventory المعرّفة فيقرر استدعاءها ويخرج معامل bookName.' },
                  { step: '3', title: 'التنفيذ المحلي', desc: 'يتلقى خادمك الباركود أو معامل البحث، يغذي قاعدة بياناتك، ويحصل على النتيجة.' },
                  { step: '4', title: 'الصياغة والناتج الإنساني', desc: 'يعاد إرجاع المخرجات للنموذج ليقوم بصهر الأرقام وصناعة مخرج نصي ذكي ومقروء.' }
                ].map((node, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 relative">
                    <div className="absolute top-4 left-4 w-7 h-7 rounded-lg bg-[#002147] text-white flex items-center justify-center font-bold text-xs ring-4 ring-[#002147]/5">
                      {node.step}
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm mt-4 mb-2">{node.title}</h5>
                    <p className="text-slate-500 text-xs font-serif leading-relaxed">{node.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sandbox Controls Side (Left on screen, right conceptually) */}
            <div className="lg:col-span-4 space-y-6 text-right order-last lg:order-first">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <h4 className="font-black text-slate-800 text-base mb-4 flex items-center justify-end gap-2 border-b border-slate-100 pb-3">
                  {isRtl ? 'اختيار وكيل المحاكاة والـ Sandbox' : 'Sandbox Services'}
                  <Settings className="w-4 h-4 text-[#C49E3A]" />
                </h4>

                <div className="space-y-3">
                  {[
                    { id: 'function', title: 'وكيل استدعاء الدوال والربط', desc: 'يربط Gemini بقاعدة تفاعلية للمخزن والطلاب', color: 'border-l-blue-500 text-blue-700' },
                    { id: 'code', title: 'بيئة بايثون المعزولة (التحليل)', desc: 'مهمات حسابية مع كتابة وتشغيل كود حقيقي', color: 'border-l-green-500 text-green-700' },
                    { id: 'doc', title: 'معالجة المراجع والمستندات', desc: 'يفحص سياسات ولوائح الأكاديمية بنظام Citations', color: 'border-l-orange-500 text-orange-700' }
                  ].map((item) => {
                    const isSelected = sandboxType === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSandboxType(item.id as any);
                          setPromptInput('');
                          setSandboxResponse(null);
                        }}
                        className={`w-full text-right p-4 rounded-xl border-l-[4px] transition-all flex flex-col justify-center text-xs ${
                          isSelected 
                            ? 'bg-slate-50 border-slate-300 ' + item.color + ' shadow-sm' 
                            : 'bg-transparent border-transparent hover:bg-slate-50 text-slate-600 border-l-slate-200'
                        }`}
                      >
                        <span className="font-extrabold text-sm mb-1">{item.title}</span>
                        <span className="text-slate-400 font-serif text-[11px] leading-relaxed">{item.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Prompt Suggester */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span className="text-[10px] tracking-wide text-slate-400 uppercase font-black block mb-3">
                  {isRtl ? 'مطالبات تجريبية نموذجية سريعة' : 'Try Prepopulated Prompts'}
                </span>
                <div className="space-y-2">
                  {sandboxType === 'function' ? (
                    <>
                      <button 
                        onClick={() => setPromptInput(getPrepopulatedPrompt('function', 'inventory'))}
                        className="w-full text-right text-xs bg-slate-50 hover:bg-slate-100 p-2.5 rounded-lg text-slate-700 font-serif border border-slate-100 truncate block"
                      >
                        {isRtl ? '🔎 استعلام عن كفاية كتب Oxford Discover' : 'Check Oxford inventory'}
                      </button>
                      <button 
                        onClick={() => setPromptInput(getPrepopulatedPrompt('function', 'grades'))}
                        className="w-full text-right text-xs bg-slate-50 hover:bg-slate-100 p-2.5 rounded-lg text-slate-700 font-serif border border-slate-100 truncate block"
                      >
                        {isRtl ? '🎓 جلب كرت تقييم سارة الأكاديمي والدرجات' : 'Retrieve Sarah\'s profile details'}
                      </button>
                    </>
                  ) : sandboxType === 'code' ? (
                    <button 
                      onClick={() => setPromptInput(getPrepopulatedPrompt('code'))}
                      className="w-full text-right text-xs bg-slate-50 hover:bg-slate-100 p-2.5 rounded-lg text-slate-700 font-serif border border-slate-100 truncate block"
                    >
                      {isRtl ? '🐍 مصفوفة رياضية وتشغيل بايثون لمعرفة الانحراف' : 'Compute standard deviation stats'}
                    </button>
                  ) : (
                    <button 
                      onClick={() => setPromptInput(getPrepopulatedPrompt('doc'))}
                      className="w-full text-right text-xs bg-slate-50 hover:bg-slate-100 p-2.5 rounded-lg text-slate-700 font-serif border border-slate-100 truncate block"
                    >
                      {isRtl ? '📑 حد الطلاب بصفوف المناهج المطورة وشروط إعفاء الكتب' : 'Registration caps and waiver conditions'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sandbox Stage (Middle of layout) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm text-right">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="text-left">
                    <span className="text-[10px] bg-[#002147]/10 text-[#002147] px-3 py-1 rounded-full font-bold">
                      {sandboxType === 'function' ? 'Tool Grounded AI' : sandboxType === 'code' ? 'Code Sandbox Console' : 'Contextual Grounding QA'}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {sandboxType === 'function' ? 'محاكاة استدعاء الدوال (SQL / DB Tool Call)' : sandboxType === 'code' ? 'منفّذ بايثون والتحاليل الحسابية' : 'مستكشف المراجع والوثائق بدقة الاستشهاد'}
                  </h3>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wide">
                    {isRtl ? 'اكتب مطالبتك البرمجية أو سؤالك الذكي' : 'Developer Prompt input'}
                  </label>
                  <div className="relative">
                    <textarea
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      placeholder={
                        sandboxType === 'function' 
                          ? (isRtl ? 'اكتب مثلاً: كم رصيد كتاب Oxford Discover 1 في قاعدة البيانات؟' : 'e.g. Find pricing details for book Grammar Galaxy A1...')
                          : sandboxType === 'code'
                          ? (isRtl ? 'اكتب دراسة إحصائية تطلب حساب مصفوفات رياضية وبايثون...' : 'e.g. Write a script to calculate scores trend and summarize...')
                          : (isRtl ? 'اكتب استعلاماً حول سياسات الفروع أو الدفع للأكاديمية...' : 'e.g. What is the cancellation policy or maximum levels...')
                      }
                      className="w-full p-4 pr-4 bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl font-serif text-sm focus:ring-2 focus:ring-[#002147] focus:border-transparent min-h-[100px] outline-none transition-all resize-none text-right"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      disabled={isLoading || !promptInput.trim()}
                      onClick={() => handleRunSandbox(sandboxType)}
                      className="px-6 py-3 bg-[#002147] hover:bg-[#003366] disabled:bg-slate-200 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{isRtl ? 'جاري التشغيل والفرز...' : 'Executing pipeline...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{isRtl ? 'تشغيل حلقة التطوير واستخلاص الناتج' : 'Compile & Run Command'}</span>
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Console Execution Timeline & Logs Panel */}
              {(customLogs.length > 0 || sandboxResponse) && (
                <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 md:p-8 font-mono text-xs shadow-xl relative overflow-hidden border-2 border-slate-800">
                  {/* Neon Status lines */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 animate-pulse"></div>

                  <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-[10px] text-slate-500 tracking-wider">SECURE DEVELOPER TUNNEL LOGS</span>
                  </div>

                  {/* Logs Feed */}
                  <div className="space-y-4 mb-6">
                    {customLogs.map((log, index) => {
                      const isErr = log.status === 'error';
                      const isExec = log.status === 'executing';
                      const isSucc = log.status === 'success';
                      return (
                        <div key={index} className="flex gap-3 justify-end items-start text-right">
                          <div className="flex-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded-md inline-block mb-1 ${
                              isErr ? 'bg-red-500/10 text-red-400' :
                              isExec ? 'bg-yellow-500/10 text-yellow-400' :
                              isSucc ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                            }`}>
                              [{log.status.toUpperCase()}]
                            </span>
                            <p className="text-slate-200 text-xs font-serif leading-relaxed">{log.message}</p>
                            
                            {/* Embedded parameters inside payload logs */}
                            {log.payload && (
                              <pre className="mt-2 p-3 bg-black/40 rounded-xl text-[11px] text-[#C49E3A] whitespace-pre-wrap max-w-full text-left overflow-x-auto border border-white/5">
                                {JSON.stringify(log.payload, null, 2)}
                              </pre>
                            )}
                          </div>
                          <span className="text-slate-600 font-bold block mt-1">•</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sandbox Response Output Block */}
                  {sandboxResponse && (
                    <div className="border-t border-slate-800 pt-6 space-y-6">
                      
                      {/* Section for Python Code showing generated code blocks */}
                      {sandboxResponse.taskType === 'code-execution' && sandboxResponse.hasCodeExecution && (
                        <div className="space-y-2 text-right">
                          <span className="text-[10px] text-slate-500 block">GENERATED PYTHON SCRIPT EXECUTION Sandbox</span>
                          <div className="bg-black/80 rounded-2xl p-4 border border-slate-800 relative group text-left">
                            <button 
                              onClick={() => handleCopy(sandboxResponse.pythonCode, 'py')}
                              className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                            >
                              {copiedId === 'py' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            <pre className="text-[11px] text-green-400 font-mono whitespace-pre overflow-x-auto pr-8">
                              {sandboxResponse.pythonCode}
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Code Stdout console block */}
                      {sandboxResponse.taskType === 'code-execution' && sandboxResponse.executionStdout && (
                        <div className="space-y-2 text-right">
                          <span className="text-[10px] text-slate-500 block">PYTHON STDOUT / CONSOLE OUTPUT</span>
                          <div className="bg-black text-slate-100 p-4 rounded-xl text-left border border-slate-800">
                            <span className="text-[10px] text-green-500 block border-b border-slate-800 pb-1 mb-2">RUN COMPLETED:</span>
                            <pre className="text-[11px] text-yellow-500">{sandboxResponse.executionStdout}</pre>
                          </div>
                        </div>
                      )}

                      {/* Grounded Citation context */}
                      {sandboxResponse.taskType === 'document-processing' && (
                        <div className="space-y-2 text-right">
                          <span className="text-[10px] text-slate-500 block">DOCK PARSED CITATION CONTEXT</span>
                          <div className="p-4 bg-black/40 border border-slate-800/60 rounded-xl leading-relaxed font-serif text-[11px] text-slate-300">
                            {sandboxResponse.groundedContextUsed}
                          </div>
                        </div>
                      )}

                      {/* Final Natural Language Answer block */}
                      <div className="space-y-2 text-right">
                        <span className="text-[10px] text-slate-500 block">FINAL GROUNDED HUMAN RESPONSE FROM GEMINI</span>
                        <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700 leading-relaxed font-serif text-slate-100 text-sm whitespace-pre-wrap">
                          {sandboxResponse.finalResponseText}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'snippets' && (
          <div className="space-y-8 text-right">
            <h3 className="text-xl font-bold text-slate-800 mb-6">قوالب الأكواد الموثقة للمطورين (Production Integration Boilerplates)</h3>

            {/* Template Card 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <span className="text-left font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded">TypeScript Server Side (Express)</span>
                <h4 className="text-base font-black text-slate-900">1. التهيئة الآمنة واستدعاء الدوال (Modern @google/genai SDK)</h4>
              </div>
              <p className="text-slate-500 text-xs font-serif leading-relaxed mb-4">
                قالب متكامل يوضح التهيئة اللحظية الكسولة (Lazy initialization) لتلافي توقف التطبيق في حال نسيان مفاتيح الترخيص، مع آلية الفهرسة وتصريح الأدوات.
              </p>

              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 relative group text-left">
                <button 
                  onClick={() => handleCopy(serverSnippetCode, 'sn1')}
                  className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  {copiedId === 'sn1' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="text-[11px] text-blue-400 font-mono overflow-x-auto max-h-[450px] no-scrollbar pr-10">
                  {serverSnippetCode}
                </pre>
              </div>
            </div>

            {/* Template Card 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <span className="text-left font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded">Direct Server Side (Tool Call Response Integration)</span>
                <h4 className="text-base font-black text-slate-900">2. استعادة مخرجات الدوال وتغذيتها ثنائية الدورة (Complete Action Loop)</h4>
              </div>
              <p className="text-slate-500 text-xs font-serif leading-relaxed mb-4">
                أصح طريقة لتنفيذ حلقة الإجراء. يتلقى الخادم الطلب الأول من Gemini، يفحص إن كان يحمل استدعاء دالة، ينفذ المورد برمجياً، ثم يمرره كمدخل مستقل في الدورة التالية للحصول على ناتج نهائي منمق لغوياً بمحددات Gemini.
              </p>

              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 relative group text-left">
                <button 
                  onClick={() => handleCopy(callbackSnippetCode, 'sn2')}
                  className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  {copiedId === 'sn2' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="text-[11px] text-blue-400 font-mono overflow-x-auto max-h-[450px] no-scrollbar pr-10">
                  {callbackSnippetCode}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Pure boilerplates containing best practices as requested
const serverSnippetCode = `import { GoogleGenAI, Type } from "@google/genai";
import express from "express";

const app = express();
app.use(express.json());

// الممارسة الأفضل: التهيئة اللحظية الكسولة لتلافي توقف البرنامج عند غياب المفتاح
let aiClientInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClientInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("تتطلب العمليات المتقدمة لـ API ضبط متغير بيئة باسم GEMINI_API_KEY");
    }
    aiClientInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build' // الترويسة الموصى بها لرصد الفرز الجيد بالأستوديو
        }
      }
    });
  }
  return aiClientInstance;
}

// تصريح وكيل البيانات وحوسبة بايثون Code Execution
app.post("/api/analyze-academic-data", async (req, res) => {
  try {
    const { prompt } = req.body;
    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash", // النموذج المقترح والمدعوم للفرز الفوري
      contents: prompt,
      config: {
        systemInstruction: "أنت عالم بيانات أكاديمي ذكي. حلل المجموعات البرمجية بمساعدة مفسّر بايثون المدمج.",
        tools: [{ codeExecution: {} }] // تفعيل الـ Sandbox البرمي حياً ومباشراً
      }
    });

    // استخلاص كود وجوانب بايثون إن وجدت
    const parts = response.candidates?.[0]?.content?.parts || [];
    let generatedPython = "";
    let executionResult = "";

    for (const part of parts) {
      if ((part as any).executableCode) {
        generatedPython = (part as any).executableCode.code;
      }
      if ((part as any).codeExecutionResult) {
        executionResult = (part as any).codeExecutionResult.output;
      }
    }

    res.json({
      text: response.text,
      pythonCode: generatedPython,
      consoleOutput: executionResult
    });

  } catch (error: any) {
    res.status(500).json({ status: "error", message: error.message });
  }
});`;

const callbackSnippetCode = `// دورة المعالجة ثنائية الخطى لاستدعاء الدوال وهندستها محلياً
app.post("/api/query-inventory-agent", async (req, res) => {
  try {
    const { prompt } = req.body;
    const ai = getGeminiClient();

    // 1. تعريف مصفوف دالة الاستعلام والأدوات المتاحة
    const checkInventoryTool = {
      name: "check_inventory",
      description: "طلب كمية مخزون كتاب أكاديمي معين ومعرفة السعر.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          bookName: {
            type: Type.STRING,
            description: "اسم الكتاب الأكاديمي للبحث السريع."
          }
        },
        required: ["bookName"]
      }
    };

    // 2. الفرز الأولي لمعرفة ما إن كان Gemini بحاجة لاستدعاء دالة
    const response1 = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: [{ functionDeclarations: [checkInventoryTool] }]
      }
    });

    const functionCalls = response1.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      
      // 3. الخطوة الإدارية الحيوية: تنفيذ المورد على قاعدة بياناتك المحلية
      let dbOutput = {};
      if (call.name === "check_inventory") {
        const bookName = call.args.bookName;
        // قم بالاستعلام محلياً من SQL / Oracle / Firestore
        dbOutput = await myLocalDatabaseQuery(bookName);
      }

      // 4. الخطوة الحيوية الثانية: تغذية النتيجة المباشرة مجدداً لنموذج Gemini
      const previousContent = response1.candidates?.[0]?.content;
      const toolResponsePayload = {
        role: "user",
        parts: [{
          functionResponse: {
            name: call.name,
            response: dbOutput
          }
        }]
      };

      const response2 = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          { role: "user", parts: [{ text: prompt }] },
          previousContent,
          toolResponsePayload
        ],
        config: {
          tools: [{ functionDeclarations: [checkInventoryTool] }]
        }
      });

      return res.json({
        finalAnswer: response2.text, // الإجابة النهائية المصاغة بلغة المستخدم
        functionExecuted: call.name,
        argumentsReceived: call.args,
        localDbResponse: dbOutput
      });
    }

    // إجابة عادية مباشرة إن لم يطلب النموذج استدعاء دوال
    res.json({ finalAnswer: response1.text });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});`;
