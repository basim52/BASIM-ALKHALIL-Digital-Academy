import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  CheckCircle2, 
  Film, 
  Info, 
  ArrowLeft 
} from 'lucide-react';
import { UserProfile } from '../types';
import { managedSpeak } from '../lib/audio';
import {
  SectionShell,
  GoldCard,
  LessonTile,
  PrimaryButton,
  GhostButton,
  ProgressPill,
  TutorFace,
} from './ui/academy';

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
      utterance.lang = 'en-GB';
      utterance.rate = 0.85;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setScenesCompleted(prev => ({ ...prev, [currentSceneIdx]: true }));
      };
      utterance.onerror = () => setIsSpeaking(false);

      managedSpeak(utterance);
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
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-arabic' : 'font-sans'}>
      {/* Top Header Card */}
      <GoldCard className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <TutorFace tutor="sara" size="md" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ProgressPill>
                {isRtl ? `المشهد ${currentSceneIdx + 1} من ${scenes.length}` : `Scene ${currentSceneIdx + 1} of ${scenes.length}`}
              </ProgressPill>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-[#002147]">
              {isRtl ? 'مسلسلات الكرتون: قصة سيناريو لندن 🎬' : 'Animated Series: London Storyboard 🎬'}
            </h1>
            <p className="text-xs text-[#002147]/70 font-bold mt-0.5">
              {isRtl ? 'حولنا قصص "نور في لندن" لسيناريو كرتوني تفاعلي يعلمك المحاكاة وتأليف السيناريو' : 'Convert beautiful storylines into direct audio-enabled scene blocks'}
            </p>
          </div>
        </div>

        <GhostButton onClick={onBack}>
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{isRtl ? 'العودة للمنصة' : 'Back to Academy'}</span>
        </GhostButton>
      </GoldCard>

      {/* Scene Navigation Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
        {scenes.map((sc, i) => (
          <LessonTile
            key={sc.sceneNum}
            order={sc.sceneNum}
            title={isRtl ? `المشهد ${sc.sceneNum}` : `Scene ${sc.sceneNum}`}
            subtitle={sc.backgroundEn}
            emoji={sc.emojiBg.slice(0, 2)}
            active={i === currentSceneIdx}
            done={!!scenesCompleted[i]}
            onClick={() => setCurrentSceneIdx(i)}
          />
        ))}
      </div>

      {/* Main Interactive Stage */}
      <GoldCard className="p-5 sm:p-7 space-y-5">
        {/* Specs Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-3.5 rounded-2xl flex items-center gap-3">
            <span className="text-2xl bg-white p-2 rounded-xl border border-[#C49E3A]/30">{currentScene.emojiBg}</span>
            <div>
              <span className="text-[10px] font-bold text-[#002147]/60 block uppercase">
                {isRtl ? 'الموقع وخلفية المشهد 📍' : 'Scenic Background 📍'}
              </span>
              <strong className="text-xs sm:text-sm font-black text-[#002147] block">
                {currentScene.backgroundEn}
              </strong>
              <p className="text-xs text-[#002147]/75 font-semibold">{isRtl ? currentScene.background : 'London Spotlight'}</p>
            </div>
          </div>

          <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-3.5 rounded-2xl flex items-center gap-3">
            <span className="text-2xl bg-white p-2 rounded-xl border border-[#C49E3A]/30">{currentScene.emojiChar}</span>
            <div>
              <span className="text-[10px] font-bold text-[#002147]/60 block uppercase">
                {isRtl ? 'الشخصية المتحدثة 🎭' : 'Active Character 🎭'}
              </span>
              <strong className="text-xs sm:text-sm font-black text-[#002147] block">
                {isRtl ? currentScene.character.split('(')[0] : 'Character Spotlight'}
              </strong>
              <p className="text-xs text-[#002147]/75 font-semibold truncate max-w-[200px]" title={currentScene.character}>
                {isRtl ? currentScene.character : currentScene.characterEn}
              </p>
            </div>
          </div>
        </div>

        {/* Dialogue Monitor Screen */}
        <div className="bg-[#002147] text-white rounded-2xl border-2 border-[#C49E3A] p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[170px] text-center shadow-sm">
          <div className="flex items-center justify-between w-full mb-3 text-[10px] text-[#E6C36A] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#E6C36A] rounded-full animate-pulse" />
              <span>SCENE 0{currentScene.sceneNum}</span>
            </span>
            <span>AUDIO DIALOGUE</span>
          </div>

          <div className="space-y-2 max-w-lg">
            <p className="text-lg sm:text-2xl font-black tracking-tight leading-relaxed text-white" dir="ltr">
              &ldquo; {currentScene.dialogue} &rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#E6C36A] font-bold">
              {currentScene.dialogueAr}
            </p>
          </div>

          {isSpeaking && (
            <div className="mt-3 flex items-center gap-1">
              <span className="w-1.5 h-3 bg-[#E6C36A] rounded-full animate-pulse" />
              <span className="w-1.5 h-5 bg-[#E6C36A] rounded-full animate-pulse" />
              <span className="w-1.5 h-7 bg-[#E6C36A] rounded-full animate-pulse" />
              <span className="w-1.5 h-4 bg-[#E6C36A] rounded-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Technical Animation Notes */}
        <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-4 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#002147]">
            <Film size={14} className="text-[#C49E3A]" />
            <span>{isRtl ? 'ملاحظة المخرج والتحريك (Director Notes):' : 'Animation & Camera Note:'}</span>
          </div>
          <p className="text-xs text-[#002147]/75 font-semibold leading-relaxed">
            {isRtl ? currentScene.animation_note : currentScene.animation_note_en}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#C49E3A]/20 pt-4">
          <PrimaryButton onClick={() => speakDialogue(currentScene.dialogue)}>
            <Volume2 size={15} />
            <span>{isRtl ? 'استمع للمشهد الصوتي 🔊' : 'Listen Voice Actor 🔊'}</span>
          </PrimaryButton>

          <div className="flex items-center gap-2">
            <GhostButton
              disabled={currentSceneIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={16} className={isRtl ? 'rotate-180' : ''} />
              <span>{isRtl ? 'السابق' : 'Previous'}</span>
            </GhostButton>

            <GhostButton
              disabled={currentSceneIdx === scenes.length - 1}
              onClick={handleNext}
            >
              <span>{isRtl ? 'التالي' : 'Next'}</span>
              <ChevronRight size={16} className={isRtl ? 'rotate-180' : ''} />
            </GhostButton>
          </div>
        </div>
      </GoldCard>

      {/* Bottom Information & Bonus Reward */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <GoldCard className="md:col-span-8 p-4 sm:p-5 space-y-2">
          <h4 className="font-black text-[#002147] text-sm flex items-center gap-2">
            <Info size={15} className="text-[#C49E3A]" />
            <span>{isRtl ? 'مفهوم لوحة القصة الكرتونية (Cartoon Storyboards)' : 'Why Storyboards?'}</span>
          </h4>
          <p className="text-xs text-[#002147]/75 leading-relaxed font-semibold">
            {isRtl
              ? 'فيديو الكرتون يبدأ دائماً بهذا الشكل! نقسم الأحداث إلى مشاهد، ثم نحدد حركة الشخصية والسيناريو الإنجليزي لتسهيل ترجمته رقمياً إلى كرتون ممتع ومتحرك.'
              : 'Behind every beautiful cartoon is a detailed scene layout. Children get to visualize London and practice spoken English from Heathrow arrival to busy subway gaps.'}
          </p>
        </GoldCard>

        <GoldCard className="md:col-span-4 p-4 sm:p-5 flex flex-col justify-between text-center space-y-3 bg-[#fdfaf3]">
          <div>
            <span className="text-2xl block mb-1">🎁</span>
            <h4 className="font-black text-[#002147] text-xs uppercase tracking-wider">{isRtl ? 'جائزة الاستكشاف السينمائي' : 'Exploration Bonus'}</h4>
            <p className="text-[11px] text-[#002147]/70 font-semibold mt-0.5">
              {isRtl ? 'تصفح جميع مشاهد السيناريو الـ 4 لتفتح الجائزة!' : 'Complete viewing of all 4 video scripts!'}
            </p>
          </div>

          {allCompleted ? (
            !xpClaimed ? (
              <PrimaryButton onClick={handleClaimXP} className="w-full text-xs py-2">
                {isRtl ? 'حصد +25 نقطة سيناريست 🏆' : 'Claim +25 XP 🏆'}
              </PrimaryButton>
            ) : (
              <span className="w-full py-2 bg-[#002147] text-[#E6C36A] font-black text-xs rounded-xl flex items-center justify-center gap-1">
                <CheckCircle2 size={13} />
                <span>{isRtl ? 'تم إضافة النقاط!' : 'Successfully Claimed!'}</span>
              </span>
            )
          ) : (
            <div className="w-full py-2 bg-white text-[#002147]/60 font-black text-xs rounded-xl border border-[#C49E3A]/40 text-center">
              {isRtl ? `شاهدت ${Object.keys(scenesCompleted).length} من 4 مشاهد` : `Viewed ${Object.keys(scenesCompleted).length}/4 scenes`}
            </div>
          )}
        </GoldCard>
      </div>
    </SectionShell>
  );
};
