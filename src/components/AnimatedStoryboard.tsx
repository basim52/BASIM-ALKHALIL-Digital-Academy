import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clapperboard, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Play, 
  CheckCircle2, 
  Image as ImageIcon, 
  Film,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';
import { UserProfile } from '../types';

interface AnimatedStoryboardProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (xp: number) => void;
}

interface Scene {
  sceneNum: number;
  background: string;
  backgroundEn: string;
  character: string;
  characterEn: string;
  dialogue: string;
  dialogueAr: string;
  animation_note: string;
  animation_note_en: string;
  emojiBg: string;
  emojiChar: string;
}

export const AnimatedStoryboard: React.FC<AnimatedStoryboardProps> = ({
  lang,
  userProfile,
  onBack,
  onXPAdded
}) => {
  const isRtl = lang === 'ar';
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [scenesCompleted, setScenesCompleted] = useState<Record<number, boolean>>({});
  const [xpClaimed, setXpClaimed] = useState(false);

  const scenes: Scene[] = [
    {
      sceneNum: 1,
      background: "مطار هيثرو، صالة الوصول",
      backgroundEn: "Heathrow Airport, Arrival Hall",
      character: "نور (طفلة بـ 10 سنوات، ترتدي حقيبة ظهر وردية، تبدو متحمسة)",
      characterEn: "Noor (10-year-old girl, wearing a pink backpack, looking extremely excited)",
      dialogue: "Excuse me, where is the train station?",
      dialogueAr: "معذرةً، أين تقع محطة القطار؟",
      animation_note: "نور تنظر حولها بفضول ثم تقترب من رجل أمن وتسأله",
      animation_note_en: "Noor looks around curiously, then approaches a security guard with confidence.",
      emojiBg: "✈️💼🏢",
      emojiChar: "👧🌸🎒"
    },
    {
      sceneNum: 2,
      background: "محطة مترو أنفاق لندن",
      backgroundEn: "London Underground Station Corridor",
      character: "رجل الأمن الإنجليزي (ضاحك، يرتدي قبعة سوداء ومعطف أزرق ونظارة)",
      characterEn: "English Security Guard (smiling, wearing a black helmet crown and a navy jacket)",
      dialogue: "Go straight ahead, and you will find the ticket machine on your right.",
      dialogueAr: "اذهبي مباشرة إلى الأمام، وستجدين آلة بيع التذاكر على يمينكِ.",
      animation_note: "رجل الأمن يشير بيده الإلكترونية باتجاه آلات التذاكر ويبتسم بلطف لنور",
      animation_note_en: "The security guard points nicely with his hand towards the ticket machines.",
      emojiBg: "🚇🏗️🇬🇧",
      emojiChar: "👮‍♂️🏴󠁧󠁢󠁥󠁮󠁧󠁿✨"
    },
    {
      sceneNum: 3,
      background: "آلة التذاكر الفضية دائرية الشكل",
      backgroundEn: "Silver Ticket Machine Kiosk Screen",
      character: "نور (تمسك بضع جنيهات إسترلينية، ترتب خصلات شعرها)",
      characterEn: "Noor (holding some sterling coins, brushing her hair back slightly)",
      dialogue: "One child ticket to King's Cross station, please.",
      dialogueAr: "تذكرة طفل واحدة إلى محطة كينجز كروس، من فضلك.",
      animation_note: "نور تضغط على الشاشة الملونة للآلة وتدخل قطعة نقود معدنية تلمع",
      animation_note_en: "Noor presses the glowing digital screen of the machine, feeding coins.",
      emojiBg: "🎫📟⚙️",
      emojiChar: "👧🪙👆"
    },
    {
      sceneNum: 4,
      background: "رصيف القطار المزدحم، قطار أحمر سريع يصل للمحطة",
      backgroundEn: "Busy Train Platform, red subway arriving",
      character: "صوت المذيع الداخلي للقطار وصدى الصوت",
      characterEn: "Train Announcer Voice Echo",
      dialogue: "Mind the gap between the train and the platform!",
      dialogueAr: "انتبهوا للفجوة بين القطار والرصيف!",
      animation_note: "نور تراقب القطار بفرح شديد وتستعد للصعود بحذر شديد ممسكة بحقيبتها الوردية",
      animation_note_en: "Noor watches the iconic red train with great joy, preparing to step aboard.",
      emojiBg: "🚉🔴🚄",
      emojiChar: "📢🔊🇬🇧"
    }
  ];

  const currentScene = scenes[currentSceneIdx];

  const speakDialogue = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB'; // British English for London feel!
      utterance.rate = 0.85;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        // Mark scene as completed
        setScenesCompleted(prev => ({ ...prev, [currentSceneIdx]: true }));
      };
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentSceneIdx < scenes.length - 1) {
      setCurrentSceneIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx(prev => prev - 1);
    }
  };

  const handleClaimXP = () => {
    if (xpClaimed) return;
    setXpClaimed(true);
    if (onXPAdded) onXPAdded(25);
  };

  const allCompleted = Object.keys(scenesCompleted).length === scenes.length;

  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24 text-slate-800">
      
      {/* Decorative gradient header */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#E0F2F1] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 pt-6 relative z-10">

        {/* Top Header / Breadcrumbs */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-teal-100 ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-600/10 shrink-0">
              <Clapperboard size={22} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#002147] tracking-tight">
                {isRtl ? 'مسلسلات الكرتون: قصة سيناريو لندن 🎬' : 'Animated Series: London Storyboard 🎬'}
              </h1>
              <p className="text-xs text-teal-800 font-bold tracking-widest mt-0.5">
                {isRtl ? 'حولنا قصص "نور في لندن" لسيناريو كرتوني تفاعلي يعلمك المحاكاة وتأليف السيناريو' : 'Convert beautiful storylines into direct audio-enabled scene blocks'}
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-black text-xs transition-all cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <span>{isRtl ? 'العودة للمنصة ↩️' : 'Back to Academy ↩️'}</span>
          </button>
        </div>

        {/* Scene Progress Indicators */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          {scenes.map((sc, i) => {
            const isCurrent = i === currentSceneIdx;
            const isPrevCompleted = scenesCompleted[i];

            return (
              <button
                key={sc.sceneNum}
                onClick={() => setCurrentSceneIdx(i)}
                className={`w-9 h-9 rounded-full font-sans font-black text-xs flex items-center justify-center transition-all cursor-pointer border-2 ${
                  isCurrent 
                    ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                    : isPrevCompleted
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                }`}
              >
                {isPrevCompleted ? '✓' : sc.sceneNum}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[460px] flex flex-col justify-between">
          
          {/* Stage Body */}
          <div className="p-6 md:p-8 space-y-6 flex-1">
            
            {/* Top Stage Specs Card (Location / Character info) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left spec card: Location Background */}
              <div className="bg-[#FAF9F5] border border-stone-150 p-4 rounded-2xl flex items-center gap-3">
                <span className="text-3xl bg-white p-2 rounded-xl shadow-3xs">{currentScene.emojiBg}</span>
                <div>
                  <span className="text-[9px] font-black text-stone-400 block uppercase tracking-wider">
                    {isRtl ? 'الموقع الجغرافي وخلفية المشهد 📍' : 'SCENIC BACKGROUND 📍'}
                  </span>
                  <strong className="text-sm font-black text-[#002147] capitalize block mt-0.5">
                    {currentScene.backgroundEn}
                  </strong>
                  <p className="text-xs text-slate-500 font-bold">{isRtl ? currentScene.background : 'London Spotlight'}</p>
                </div>
              </div>

              {/* Right spec card: Character Description */}
              <div className="bg-[#E0F2F1]/30 border border-teal-100 p-4 rounded-2xl flex items-center gap-3">
                <span className="text-3xl bg-white p-2 rounded-xl shadow-3xs">{currentScene.emojiChar}</span>
                <div>
                  <span className="text-[9px] font-black text-teal-700 block uppercase tracking-wider">
                    {isRtl ? 'الشخصية المتحدثة والأبعاد 🎭' : 'ACTIVE CHARACTER DESIGN 🎭'}
                  </span>
                  <strong className="text-sm font-black text-[#002147] block mt-0.5">
                    {isRtl ? currentScene.character.split('(')[0] : 'Char Spotlight'}
                  </strong>
                  <p className="text-xs text-slate-500 font-bold max-w-xs truncate" title={currentScene.character}>
                    {isRtl ? currentScene.character : currentScene.characterEn}
                  </p>
                </div>
              </div>

            </div>

            {/* Simulated TV / Screen Monitor */}
            <div className="bg-slate-900 rounded-2xl border-4 border-slate-800 p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px] text-center shadow-inner">
              <div className="absolute top-3 left-4 flex items-center gap-1.5 text-rose-500 font-mono text-[9px]">
                <span className="w-2 h-2 bg-rose-600 rounded-full animate-ping" />
                <span>REC SCREEN</span>
              </div>
              <span className="absolute bottom-3 right-4 text-slate-600 font-mono text-[9px]">SCENE 0{currentScene.sceneNum} // SEC 04</span>

              {/* Dialogue balloon */}
              <div className="space-y-3 z-10 max-w-lg">
                <p className="font-mono text-xs text-[#06B6D4] font-black tracking-widest block uppercase">
                  {isRtl ? 'السيناريو المسجّل (AUDIO DIALOGUE)' : 'Dialogue Screen'}
                </p>

                <p className="font-sans font-black text-white text-xl md:text-2xl tracking-tight leading-relaxed italic">
                  &ldquo; {currentScene.dialogue} &rdquo;
                </p>

                <p className="text-teal-400 font-bold text-xs">
                  {currentScene.dialogueAr}
                </p>
              </div>

              {/* Speaker wave visualization overlay */}
              {isSpeaking && (
                <div className="absolute inset-0 bg-[#000]/60 flex items-center justify-center gap-1 transition-all z-20">
                  <span className="w-1.5 h-6 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-1.5 h-10 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  <span className="w-1.5 h-14 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-8 bg-[#06B6D4] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>

            {/* Technical Animation Notes block */}
            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-800">
                <Film size={13} />
                <span>{isRtl ? 'ملاحظة المخرج والتحريك (Director Notes):' : 'Animation & Camera Note:'}</span>
              </div>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">
                {isRtl ? currentScene.animation_note : currentScene.animation_note_en}
              </p>
            </div>

          </div>

          {/* Stage Actions control board */}
          <div className="bg-slate-50 border-t p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Dialogue narrator */}
            <button
              onClick={() => speakDialogue(currentScene.dialogue)}
              className={`px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-md ${
                isSpeaking ? 'animate-pulse' : ''
              }`}
            >
              <Volume2 size={13} />
              <span>{isRtl ? 'استمع للمشهد الصوتي 🔊' : 'Listen Voice Actor 🔊'}</span>
            </button>

            {/* Stepper buttons */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentSceneIdx === 0}
                onClick={handlePrev}
                className="p-2.5 bg-white border border-slate-200 text-[#002147] hover:bg-slate-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                disabled={currentSceneIdx === scenes.length - 1}
                onClick={handleNext}
                className="p-2.5 bg-white border border-slate-200 text-[#002147] hover:bg-slate-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

        {/* Story rewards and recommendations */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left panel: Recommendations */}
          <div className="md:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
            <h4 className="font-extrabold text-[#002147] text-sm flex items-center gap-2">
              <Info size={15} className="text-teal-600" />
              <span>{isRtl ? 'مفهوم لوحة القصة الكرتونية (Cartoon Storyboards)' : 'Why Storyboards?'}</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-bold">
              {isRtl
                ? 'فيديو الكرتون يبدأ دائماً بهذا الشكل! نقسم الأحداث إلى مشاهد، ثم نحدد حركة الشخصية والسيناريو الإنجليزي لتسهيل ترجمته رقمياً إلى كرتون ممتع ومتحرك.'
                : 'Behind every beautiful cartoon is a detailed scene layout. Children get to visualize London and practice spoken English from Heathrow arrival to busy subway gaps.'}
            </p>
          </div>

          {/* Right panel: Bonus Reward claim */}
          <div className="md:col-span-4 bg-teal-50 border border-teal-150 rounded-2xl p-5 flex flex-col justify-between text-center space-y-4">
            <div>
              <span className="text-2xl block mb-1">🎁</span>
              <h4 className="font-black text-[#002147] text-xs uppercase tracking-wider">{isRtl ? 'جائزة الاستكشاف السينمائي' : 'Exploration Bonus'}</h4>
              <p className="text-[10px] text-teal-700 font-bold mt-1">
                {isRtl ? 'تصفح جميع مشاهد السيناريو الـ 4 لتفتح الجائزة!' : 'Complete viewing of all 4 video scripts!'}
              </p>
            </div>

            {allCompleted ? (
              !xpClaimed ? (
                <button
                  onClick={handleClaimXP}
                  className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {isRtl ? 'حصد +25 نقطة سيناريست 🏆' : 'Claim +25 XP 🏆'}
                </button>
              ) : (
                <span className="w-full py-2 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 border border-emerald-200">
                  <CheckCircle2 size={13} />
                  <span>{isRtl ? 'تم إضافة النقاط!' : 'Successfully Claimed!'}</span>
                </span>
              )
            ) : (
              <div className="w-full py-2 bg-slate-100 text-slate-400 font-extrabold text-xs rounded-xl border border-dashed text-center">
                {isRtl ? `شاهدت ${Object.keys(scenesCompleted).length} من 4 مشاهد` : `Viewed ${Object.keys(scenesCompleted).length}/4 scenes`}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
