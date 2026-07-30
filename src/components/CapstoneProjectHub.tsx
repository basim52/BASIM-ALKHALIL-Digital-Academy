import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { 
  CAPSTONE_PROJECT_IDEAS, 
  CapstoneIdea 
} from './CapstoneProjectData';
import { 
  GraduationCap, 
  Code, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Eye, 
  Award, 
  ArrowRight, 
  Bot, 
  Layers, 
  Search, 
  Filter, 
  PlusCircle, 
  Laptop, 
  Play, 
  RefreshCw, 
  Download, 
  Share2, 
  Star, 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  HeartPulse, 
  Briefcase, 
  MapPin, 
  Smile, 
  BarChart3,
  ExternalLink,
  Camera,
  Printer,
  Image as ImageIcon
} from 'lucide-react';

interface CapstoneProjectHubProps {
  isRtl?: boolean;
  onBackToMain?: () => void;
}

export const CapstoneProjectHub: React.FC<CapstoneProjectHubProps> = ({
  isRtl = true,
  onBackToMain
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Active Project Selection
  const [activeIdea, setActiveIdea] = useState<CapstoneIdea | null>(CAPSTONE_PROJECT_IDEAS[0]);
  const [currentStep, setCurrentStep] = useState<'ideas' | 'prd' | 'code' | 'certificate'>('ideas');
  
  // Custom Idea Form
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('الابتكار والخدمات المبتكرة');
  const [customAudience, setCustomAudience] = useState<string>('');
  const [customConcept, setCustomConcept] = useState<string>('');

  // Interactive Simulator States
  const [simActiveTab, setSimActiveTab] = useState<'home' | 'demo' | 'analytics'>('home');
  const [simInputText, setSimInputText] = useState<string>('');
  const [simOutputText, setSimOutputText] = useState<string>('');
  const [simLoading, setSimLoading] = useState<boolean>(false);

  // Certificate / Student Name
  const [studentName, setStudentName] = useState<string>('');
  const [certGenerated, setCertGenerated] = useState<boolean>(false);
  const [isExportingCertImage, setIsExportingCertImage] = useState<boolean>(false);

  const handleExportCertAsImage = async () => {
    setIsExportingCertImage(true);
    setTimeout(async () => {
      const element = document.getElementById('capstone-certificate-card');
      if (element) {
        try {
          const options = {
            cacheBust: true,
            pixelRatio: 2.5,
            backgroundColor: '#080d19',
            styleSheetsFilter: (styleSheet: CSSStyleSheet) => {
              try {
                const rules = styleSheet.cssRules;
                return true;
              } catch (e) {
                return false;
              }
            }
          };

          // Warm up resources and render twice for maximum resolution and accurate rendering
          await toPng(element, options);
          const dataUrl = await toPng(element, options);

          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `شهادة-تخرج-مشروع-الذكاء-الاصطناعي-${studentName || 'البطل'}-${new Date().getTime()}.png`;
          link.click();
        } catch (error) {
          console.error("Error exporting capstone certificate image:", error);
          alert(isRtl ? 'حدث خطأ أثناء تصدير شهادة التخرج كصورة عالية الدقة' : 'Error exporting certificate image');
        }
      }
      setIsExportingCertImage(false);
    }, 400);
  };

  // Icon Resolver
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-cyan-400" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-purple-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-amber-400" />;
      case 'Smile': return <Smile className="w-5 h-5 text-teal-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-indigo-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-amber-400" />;
      default: return <Code className="w-5 h-5 text-amber-400" />;
    }
  };

  // Filter Ideas
  const filteredIdeas = CAPSTONE_PROJECT_IDEAS.filter(idea => {
    const matchesCat = selectedCategory === 'all' || idea.categoryAr.includes(selectedCategory) || idea.categoryEn.includes(selectedCategory);
    const matchesSearch = idea.titleAr.includes(searchQuery) || idea.summaryAr.includes(searchQuery) || idea.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Handle Custom Idea Submission
  const handleCreateCustomIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customConcept) return;

    const customObj: CapstoneIdea = {
      id: 999,
      titleAr: customTitle,
      titleEn: customTitle,
      categoryAr: customCategory,
      categoryEn: "Custom Idea",
      badgeAr: "فكرة مبتكرة خاصة 🚀",
      badgeEn: "Custom Idea 🚀",
      iconName: "Sparkles",
      summaryAr: customConcept,
      summaryEn: customConcept,
      targetAudienceAr: customAudience || "جمهور عام مستهدف بناءً على الفكرة",
      targetAudienceEn: customAudience || "Target audience",
      keyFeaturesAr: [
        "واجهة رئيسية لتلقي المدخلات من المستخدم",
        "معالجة البيانات بالذكاء الاصطناعي بنماذج Gemini Flash",
        "عرض النتائج المباشرة والتقارير في لوحة تفاعلية",
        "خيارات التصدير والمشاركة والمحفظة"
      ],
      aiIntegrationsAr: ["Gemini 2.5 Flash API", "Multimodal Engine"],
      recommendedTech: ["React 18", "Tailwind CSS", "Gemini API"],
      samplePromptAr: `قم ببناء موقع لمشروع تخرج باسم (${customTitle}) يحقق المفهوم التالي: ${customConcept}`,
      defaultPRDAr: {
        problemStatement: `صعوبة إنجاز المهمة بالشكل التقليدي بدون أتمتة ودعم الذكاء الاصطناعي.`,
        solutionOverview: `تطبيق ويب متكامل باسم (${customTitle}) يوفر حلولاً مبتكرة وسريعة للمستخدمين.`,
        targetUsers: customAudience || "الجمهور المهتم بالفكرة",
        coreModules: [
          "صفحة الهبوط التعريفية",
          "منطقة معالجة الذكاء الاصطناعي",
          "لوحة التحكم وعرض النتائج",
          "منطقة الإعدادات والتكاملات"
        ],
        aiServicesUsed: ["Gemini API Services"],
        dataFlow: "المدخلات ⬅️ المعالجة الذكية ⬅️ النتيجة المباشرة",
        commercialModel: "نموذج اشتراك مجاني مع باقات متقدمة."
      },
      simulatedAppConfig: {
        bannerTitle: customTitle,
        bannerSub: customConcept,
        features: [
          { title: "الواجهة الرئيسية", desc: "استقبال بيانات ومعاملات المستخدم", badge: "تفاعلي ⚡" },
          { title: "المحرك الذكي", desc: "المعالجة الحية بنماذج الذكاء الاصطناعي", badge: "ذكاء 🧠" },
          { title: "عرض النتائج", desc: "لوحة تفاعلية لإبراز المخرجات", badge: "دقيق 📊" }
        ],
        aiActionLabel: "تشغيل المعالجة الذكية المباشرة",
        sampleAiOutput: `تمت معالجة الفكرة (${customTitle}) بنجاح! جميع المؤشرات تعمل بنسبة كفاءة 100%.`
      }
    };

    setActiveIdea(customObj);
    setIsCustomMode(false);
    setCurrentStep('prd');
  };

  // Run Simulator Action
  const handleRunSimulator = () => {
    if (!activeIdea) return;
    setSimLoading(true);
    setSimOutputText('');
    setTimeout(() => {
      setSimOutputText(activeIdea.simulatedAppConfig.sampleAiOutput);
      setSimLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-10 text-right font-sans dir-rtl" dir="rtl">
      
      {/* CAPSTONE HUB HERO HEADER */}
      <div className="bg-gradient-to-br from-[#0c1329] via-[#091b3d] to-[#040817] border border-amber-500/20 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 bg-amber-500/15 text-amber-300 rounded-full text-xs font-black uppercase tracking-widest border border-amber-500/20 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                {isRtl ? 'مشروع التخرج المعتمد 🎓' : 'Official Graduation Capstone 🎓'}
              </span>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs font-bold border border-blue-500/20">
                {isRtl ? 'بناء موقع بالذكاء الاصطناعي 🚀' : 'AI Web App Builder Track'}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {isRtl ? 'مشروع التخرج النهائي: بناء موقع إلكتروني ذكي' : 'Final Graduation Capstone: Build an AI Web App'}
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              {isRtl 
                ? 'مرحباً بك في مرحلة التتويج والاعتماد! اختر إحدى الأفكار الريادية العشر المجهزة، أو أدخل فكرتك المبتكرة الخاصة لبناء موقعك التفاعلي الكامل بالذكاء الاصطناعي، واستخراج وثيقة المتطلبات، ثم معاينة الموقع مباشرة واستلام شهادة التخرج الرسمية.'
                : 'Welcome to the Capstone Phase! Choose from 10 curated web app ideas or input your custom concept. Generate the full specification, interact with the web prototype, and earn your official graduation credential.'}
            </p>
          </div>

          {/* Stepper Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0 bg-slate-950/80 p-2.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setCurrentStep('ideas')}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                currentStep === 'ideas' 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles size={16} />
              {isRtl ? '1. اختيار الفكرة' : '1. Choose Idea'}
            </button>

            <button
              onClick={() => { if (activeIdea) setCurrentStep('prd'); }}
              disabled={!activeIdea}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                currentStep === 'prd' 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-40'
              }`}
            >
              <FileText size={16} />
              {isRtl ? '2. وثيقة PRD' : '2. PRD Spec'}
            </button>

            <button
              onClick={() => { if (activeIdea) setCurrentStep('code'); }}
              disabled={!activeIdea}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                currentStep === 'code' 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-40'
              }`}
            >
              <Laptop size={16} />
              {isRtl ? '3. معاينة الموقع' : '3. Prototype'}
            </button>

            <button
              onClick={() => { if (activeIdea) setCurrentStep('certificate'); }}
              disabled={!activeIdea}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                currentStep === 'certificate' 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-40'
              }`}
            >
              <Award size={16} />
              {isRtl ? '4. الشهادة والتقييم' : '4. Certificate'}
            </button>
          </div>
        </div>
      </div>

      {/* STEP 1: IDEAS SELECTION */}
      {currentStep === 'ideas' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Top Bar: Search & Category Filter */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'الجميع (10 أفكار)' },
                { id: 'التعليم', label: 'التعليم والتدريب (EdTech)' },
                { id: 'التجارة', label: 'الأعمال والتجارة (Business)' },
                { id: 'الصحة', label: 'الصحة واللياقة (Wellness)' },
                { id: 'الابتكار', label: 'الخدمات المبتكرة (Innovative)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md' 
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search + Custom Idea Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن فكرة مشروع..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                onClick={() => setIsCustomMode(!isCustomMode)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg shrink-0"
              >
                <PlusCircle size={16} />
                {isCustomMode ? 'إلغاء وإظهار الأفكار' : 'إدخال فكرة مبتكرة خاصة 🚀'}
              </button>
            </div>
          </div>

          {/* CUSTOM IDEA BUILDER FORM */}
          {isCustomMode && (
            <div className="bg-[#0b1426] border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl animate-fade-in">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-xl font-black text-white">إدخال فكرة مشروع تخرج مبتكرة من اختيار المتدرب</h3>
                  <p className="text-xs text-slate-400 mt-1">اكتب مفهوم فكرتك لبناء موقع ذكي وسيتولى الذكاء الاصطناعي أتمتة المواصفات وتطويرها فوراً</p>
                </div>
              </div>

              <form onSubmit={handleCreateCustomIdea} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-2">اسم الموقع / المشروع المبتكر *</label>
                    <input
                      type="text"
                      required
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="مثال: منصة مسار - المحلل المهني بالذكاء الاصطناعي"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-2">تصنيف المشروع *</label>
                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="التعليم والتدريب الذكي (EdTech)">التعليم والتدريب الذكي (EdTech)</option>
                      <option value="التجارة والأعمال والإنتاجية (Business)">التجارة والأعمال والإنتاجية (Business)</option>
                      <option value="الصحة والنمط الحيوي (Health)">الصحة والنمط الحيوي (Health)</option>
                      <option value="الابتكار والخدمات المبتكرة (Services)">الابتكار والخدمات المبتكرة (Services)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-2">الجمهور المستهدف *</label>
                  <input
                    type="text"
                    required
                    value={customAudience}
                    onChange={(e) => setCustomAudience(e.target.value)}
                    placeholder="مثال: الطلاب الجامعيون والباحثون عن فرصة عمل جديدة"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-2">شرح فكرة الموقع والوظائف الذكية التي يقوم بها *</label>
                  <textarea
                    rows={4}
                    required
                    value={customConcept}
                    onChange={(e) => setCustomConcept(e.target.value)}
                    placeholder="اشرح ماذا يفعل الموقع، وكيف يستخدم الذكاء الاصطناعي لمساعدة المستخدمين..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCustomMode(false)}
                    className="px-5 py-3 bg-slate-900 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-800"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-xl shadow-amber-500/20"
                  >
                    <CheckCircle2 size={16} />
                    اعتمد فكرتي وانتقل لوثيقة المشروع (PRD) 🚀
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* IDEAS GRID (10 CURATED IDEAS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredIdeas.map((idea) => {
              const isSelected = activeIdea?.id === idea.id;
              return (
                <div
                  key={idea.id}
                  className={`bg-slate-900/80 border rounded-3xl p-6 transition-all space-y-5 flex flex-col justify-between relative overflow-hidden group ${
                    isSelected 
                      ? 'border-amber-500 bg-slate-900/90 shadow-2xl ring-2 ring-amber-500/30' 
                      : 'border-white/10 hover:border-amber-500/40 hover:bg-slate-900/95'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header Badge & Category */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[11px] font-black">
                        {idea.badgeAr}
                      </span>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                        {idea.categoryAr}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-slate-950 rounded-2xl border border-white/10 shrink-0">
                        {renderIcon(idea.iconName)}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                          {idea.titleAr}
                        </h3>
                        <p className="text-xs text-slate-400 font-sans mt-0.5">{idea.titleEn}</p>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-white/5">
                      {idea.summaryAr}
                    </p>

                    {/* Key Features */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">
                        الوظائف المبتكرة للموقع:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {idea.keyFeaturesAr.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* AI Integrations Badge List */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {idea.aiIntegrationsAr.map((ai, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-[10px] font-bold border border-blue-500/10">
                          ⚡ {ai}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Select CTA Button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400 font-bold">
                      الجمهور: {idea.targetAudienceAr.split('،')[0]}
                    </span>

                    <button
                      onClick={() => {
                        setActiveIdea(idea);
                        setCurrentStep('prd');
                      }}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md ${
                        isSelected 
                          ? 'bg-amber-500 text-slate-950 font-black' 
                          : 'bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white'
                      }`}
                    >
                      {isSelected ? 'الفكرة المختارة حالياً ✓' : 'اختيار هذه الفكرة لمشروع التخرج 🚀'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: PRD SYSTEM SPECIFICATION */}
      {currentStep === 'prd' && activeIdea && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6">
            
            {/* PRD Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                  <FileText className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 rounded-full text-[10px] font-black">
                      وثيقة المشروع الرسمية (PRD Spec)
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{activeIdea.categoryAr}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mt-1">{activeIdea.titleAr}</h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep('ideas')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                >
                  تغيير الفكرة
                </button>
                <button
                  onClick={() => setCurrentStep('code')}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Laptop size={16} />
                  معاينة الموقع وتطوير الكود 🛠️
                </button>
              </div>
            </div>

            {/* PRD Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Problem & Solution */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5 space-y-3">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} />
                  1. الفجوة وحل مشروع التخرج
                </h4>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p><strong className="text-white">المشكلة:</strong> {activeIdea.defaultPRDAr.problemStatement}</p>
                  <p><strong className="text-white">حل المنصة:</strong> {activeIdea.defaultPRDAr.solutionOverview}</p>
                </div>
              </div>

              {/* Target Users & Model */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5 space-y-3">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase size={14} />
                  2. الجمهور والنموذج التجاري
                </h4>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p><strong className="text-white">الجمهور المستهدف:</strong> {activeIdea.defaultPRDAr.targetUsers}</p>
                  <p><strong className="text-white">النموذج الربحي:</strong> {activeIdea.defaultPRDAr.commercialModel}</p>
                </div>
              </div>

              {/* Core System Modules */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5 space-y-3">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Layers size={14} />
                  3. الوحدات البرمجية الرئيسية (Modules)
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeIdea.defaultPRDAr.coreModules.map((mod, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI & Data Flow */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5 space-y-3">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Bot size={14} />
                  4. خدمات الذكاء الاصطناعي وتدفق البيانات
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong className="text-white">الخدمات المستخدمة:</strong> {activeIdea.defaultPRDAr.aiServicesUsed.join("، ")}</p>
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 font-mono text-[11px] text-amber-300 dir-ltr text-left">
                    {activeIdea.defaultPRDAr.dataFlow}
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Master Prompt for AI Studio Code Generation */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-amber-400 flex items-center gap-2">
                  <Sparkles size={14} />
                  أمر التطوير الشامل لبناء الموقع (Master Prompt)
                </h4>
                <span className="text-[10px] text-slate-500">انسخ الأمر واستخدمه لبناء الموقع في أي محرر كود</span>
              </div>
              <p className="text-xs text-slate-300 font-mono bg-slate-900 p-4 rounded-xl border border-white/5 leading-relaxed dir-rtl">
                {activeIdea.samplePromptAr}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: LIVE WEB APP INTERACTIVE SIMULATOR & PROTOTYPE */}
      {currentStep === 'code' && activeIdea && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-[10px] font-black uppercase">
                  المعاينة الحية للموقع المطور 💻
                </span>
                <h3 className="text-2xl font-black text-white mt-1">{activeIdea.titleAr}</h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep('prd')}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                >
                  العودة للوثيقة
                </button>
                <button
                  onClick={() => setCurrentStep('certificate')}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Award size={16} />
                  تسليم المشروع والتخرج 🎓
                </button>
              </div>
            </div>

            {/* SIMULATED BROWSER WINDOW */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Browser Address Bar */}
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex-1 max-w-xl bg-slate-950 border border-slate-800 rounded-xl px-4 py-1.5 text-center text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2 dir-ltr">
                  <span className="text-emerald-400">https://</span>
                  <span>{activeIdea.titleEn.toLowerCase().replace(/[^a-z0-demo]/g, '')}.ai-studio.app</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <RefreshCw size={14} className="hover:text-white cursor-pointer" />
                  <ExternalLink size={14} className="hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Simulated App Navigation Header */}
              <div className="bg-[#080d1a] px-6 py-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    {renderIcon(activeIdea.iconName)}
                  </div>
                  <span className="font-black text-sm text-white">{activeIdea.simulatedAppConfig.bannerTitle}</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => setSimActiveTab('home')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simActiveTab === 'home' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
                  >
                    الرئيسية
                  </button>
                  <button
                    onClick={() => setSimActiveTab('demo')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simActiveTab === 'demo' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
                  >
                    التجربة الذكية
                  </button>
                  <button
                    onClick={() => setSimActiveTab('analytics')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simActiveTab === 'analytics' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
                  >
                    المؤشرات والنتائج
                  </button>
                </div>
              </div>

              {/* Simulated App Body */}
              <div className="p-6 md:p-8 space-y-8 min-h-[350px]">
                
                {/* TAB 1: HOME LANDING PAGE */}
                {simActiveTab === 'home' && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="text-center max-w-2xl mx-auto space-y-4 py-4">
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-[10px] font-black border border-amber-500/20">
                        {activeIdea.badgeAr}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black text-white">
                        {activeIdea.simulatedAppConfig.bannerTitle}
                      </h2>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeIdea.simulatedAppConfig.bannerSub}
                      </p>

                      <div className="pt-2">
                        <button
                          onClick={() => setSimActiveTab('demo')}
                          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl inline-flex items-center gap-2 shadow-xl shadow-amber-500/20"
                        >
                          <Play size={14} />
                          جرب الوظيفة الذكية للموقع الآن
                        </button>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      {activeIdea.simulatedAppConfig.features.map((feat, i) => (
                        <div key={i} className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 space-y-2">
                          <span className="text-[10px] text-amber-400 font-extrabold">{feat.badge}</span>
                          <h4 className="text-xs font-black text-white">{feat.title}</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: INTERACTIVE AI DEMO */}
                {simActiveTab === 'demo' && (
                  <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
                    <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-4">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-black">
                        <Bot size={16} />
                        اختبار الوظيفة الذكية التفاعلية
                      </div>

                      <p className="text-xs text-slate-300">
                        ادخل البيانات التجريبية للمشروع واضغط على زر المعالجة بالذكاء الاصطناعي:
                      </p>

                      <textarea
                        rows={3}
                        value={simInputText}
                        onChange={(e) => setSimInputText(e.target.value)}
                        placeholder={`مثال: ادخل البيانات أو النص الخاص بـ ${activeIdea.titleAr}...`}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />

                      <button
                        onClick={handleRunSimulator}
                        disabled={simLoading}
                        className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg"
                      >
                        {simLoading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            جاري المعالجة بنماذج الذكاء الاصطناعي...
                          </>
                        ) : (
                          <>
                            <Sparkles size={16} />
                            {activeIdea.simulatedAppConfig.aiActionLabel}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Output Panel */}
                    {simOutputText && (
                      <div className="bg-slate-900 p-5 rounded-2xl border border-amber-500/30 space-y-3 animate-fade-in">
                        <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wider block">
                          مخرجات الذكاء الاصطناعي للموقع ⚡
                        </span>
                        <div className="bg-slate-950 p-4 rounded-xl text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap border border-white/5">
                          {simOutputText}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: ANALYTICS & DASHBOARD */}
                {simActiveTab === 'analytics' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold block">زوار الموقع الشهر الجاري</span>
                        <span className="text-xl font-mono text-amber-400 font-black">12,450 زائر</span>
                      </div>
                      <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold block">المعاملات الذكية الناجحة</span>
                        <span className="text-xl font-mono text-emerald-400 font-black">99.4%</span>
                      </div>
                      <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold block">متوسط زمن الاستجابة</span>
                        <span className="text-xl font-mono text-cyan-400 font-black">0.8 ثانية</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/5 space-y-2">
                      <h4 className="text-xs font-black text-white">حالة الجاهزية والنشر</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        الموقع جاهز تماماً للنشر السحابي، وجميع المسارات البرمجية وواجهات API متصلة وموثقة بإنتاجية فائقة.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: GRADUATION EVALUATION & OFFICIAL CERTIFICATE */}
      {currentStep === 'certificate' && activeIdea && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Review Board Score Banner */}
          <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-slate-900 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-right">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-[10px] font-black uppercase">
                  تقرير لجنة التقييم الأكاديمي 🎓
                </span>
                <h3 className="text-2xl font-black text-white">
                  تقييم مشروع التخرج النهائي للموقع الذكي
                </h3>
                <p className="text-xs text-slate-300">
                  المشروع: <strong className="text-amber-400">{activeIdea.titleAr}</strong>
                </p>
              </div>

              {/* Score Pill */}
              <div className="p-6 bg-slate-950 border-2 border-amber-500 rounded-3xl text-center space-y-1 shadow-2xl shrink-0 min-w-[180px]">
                <span className="text-[10px] text-slate-400 font-extrabold block">النتيجة النهائية</span>
                <span className="text-3xl font-mono font-black text-amber-400 block">98 / 100</span>
                <span className="text-[11px] text-emerald-400 font-black block">ممتاز مرتفع (High Honors)</span>
              </div>
            </div>

            {/* Evaluation Grid Criteria */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
              {[
                { title: "الابتكار والجدوى", score: "20/20" },
                { title: "واجهة UI/UX", score: "20/20" },
                { title: "دمج الذكاء الاصطناعي", score: "19/20" },
                { title: "المعمارية البرمجية", score: "20/20" },
                { title: "العرض والتقديم", score: "19/20" }
              ].map((crit, idx) => (
                <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-white/5 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 block">{crit.title}</span>
                  <span className="text-xs font-mono font-black text-amber-400 block">{crit.score}</span>
                </div>
              ))}
            </div>

            {/* Input Student Name for Certificate */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-3">
              <label className="block text-xs font-extrabold text-amber-300">
                ادخل اسم المتدرب الثلاثي لاعتماده وطباعته في شهادة التخرج الرسمية:
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="مثال: المهندس باسم الخليل"
                  className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={() => setCertGenerated(true)}
                  disabled={!studentName.trim()}
                  className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 text-xs font-black rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <Award size={16} />
                  إصدار شهادة مشروع التخرج 🪪
                </button>
              </div>
            </div>
          </div>

          {/* OFFICIAL DIPLOMA / CERTIFICATE CARD */}
          {certGenerated && (
            <div id="capstone-certificate-card" className="bg-[#080d19] border-4 border-amber-500/50 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl text-center space-y-8 animate-fade-in">
              <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Certificate Branding */}
              <div className="space-y-3 relative z-10">
                <div className="w-16 h-16 bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl mx-auto flex items-center justify-center">
                  <Award className="w-10 h-10 text-amber-400" />
                </div>
                <span className="text-xs font-black text-amber-400 tracking-widest uppercase block">
                  أكاديمية الذكاء الاصطناعي المعتمدة • AI ACADEMY
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-wide">
                  شهادة تخرج واعتتماد مشروع نهائي
                </h2>
                <p className="text-xs text-slate-400 font-sans">
                  Official Artificial Intelligence Capstone Graduation Certificate
                </p>
              </div>

              {/* Certificate Body */}
              <div className="space-y-4 max-w-2xl mx-auto py-4 relative z-10 border-y border-white/10">
                <p className="text-xs text-slate-300">تشهد الأكاديمية بأن المتدرب القدير / المتدربة القديرة:</p>
                <h3 className="text-3xl font-black text-amber-400 font-serif tracking-wider">
                  {studentName}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
                  قد أتم بنجاح واقتدار كافة متطلبات تطوير واجتياز مشروع التخرج المعتمد لبناء الموقع الذكي:
                </p>
                <div className="p-4 bg-slate-900/80 rounded-2xl border border-amber-500/30 inline-block px-8">
                  <span className="text-base font-black text-white">{activeIdea ? activeIdea.titleAr : customTitle}</span>
                  <span className="block text-[11px] text-amber-400 font-mono mt-1">بدرجة تقييم: 98/100 (ممتاز مرتفع)</span>
                </div>
              </div>

              {/* Certificate Footer Seals */}
              <div className="flex flex-wrap items-center justify-around gap-6 pt-4 text-center relative z-10">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">تاريخ الاعتماد</span>
                  <span className="text-xs font-mono font-bold text-slate-300">{new Date().toLocaleDateString('ar-SA')}</span>
                </div>

                <div className="w-20 h-20 rounded-full border-2 border-amber-500/40 bg-slate-950 flex flex-col items-center justify-center space-y-0.5 shadow-xl">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-[8px] font-black text-amber-400 uppercase">اعتماد رسمي</span>
                  <span className="text-[7px] text-slate-400 font-mono">SEAL-2026</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">رئيس لجنة التقييم</span>
                  <span className="text-xs font-bold text-slate-300">د. رئيس قسم الذكاء الاصطناعي</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-4 relative z-10">
                <button
                  onClick={handleExportCertAsImage}
                  disabled={isExportingCertImage}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Camera size={16} />
                  {isExportingCertImage 
                    ? (isRtl ? 'جاري تصدير الشهادة كصورة... 📸' : 'Exporting image...') 
                    : (isRtl ? 'تصدير شهادة التخرج كصورة عالية الدقة (PNG) 📸' : 'Export Certificate as High-Res PNG 📸')
                  }
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-black text-xs rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Printer size={16} />
                  {isRtl ? 'طباعة وحفظ كـ PDF 🖨️' : 'Print / Save as PDF 🖨️'}
                </button>
                <button
                  onClick={onBackToMain}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 font-bold text-xs rounded-xl flex items-center gap-2"
                >
                  العودة للبرنامج الرئيسي
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
