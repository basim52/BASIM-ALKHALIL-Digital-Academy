import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Languages, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Award, 
  Volume2, 
  Compass, 
  Send, 
  CheckCircle2, 
  ArrowLeftRight, 
  Flame, 
  BookMarked, 
  Globe, 
  Activity, 
  FileText, 
  HelpCircle,
  HelpCircle as QuestionIcon,
  ChevronRight,
  Sparkles as IdiomIcon,
  Check,
  TrendingUp,
  AlertCircle,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';
import { LiveTranslate_Letters } from './LiveTranslate_Letters';
import { LiveTranslate_Vocab } from './LiveTranslate_Vocab';
import { LiveTranslate_Conversation } from './LiveTranslate_Conversation';
import { ClipboardList, MessageSquare, BookOpenText } from 'lucide-react';
import { managedSpeak } from '../lib/audio';
import { SectionShell, GoldCard, PrimaryButton, GhostButton, ProgressPill } from './ui/academy';

interface LiveTranslateProps {
  isRtl?: boolean;
  lang?: 'ar' | 'en';
  userProfile?: UserProfile | null;
  onBack?: () => void;
}

// Chime feedback audio generator via Web Audio API 
const playPristineChime = (type: 'open' | 'message' | 'close' | 'think' | 'success') => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'open') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'message') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, now); // E5
      osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.1); // B5
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.2); // C6
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'think') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.linearRampToValueAtTime(460, now + 0.2);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'close') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.18); // A4
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    console.warn("Chime synth failed", e);
  }
};

// Live global languages for active learning and translation
export interface LiveLanguage {
  id: 'en' | 'es' | 'fr' | 'de' | 'tr' | 'it' | 'ja' | 'zh' | 'ar';
  label: string;
  nativeName: string;
  fact: string;
  rank: string;
  difficulty: string;
  flag: string;
}

export const LIVE_LEARNING_LANGUAGES: LiveLanguage[] = [
  { id: 'en', label: 'English', nativeName: 'الإنجليزية 🇺🇸', fact: 'اللغة العالمية الأولى للعلوم والمحتوى العلمي والتقني والصناعي، والتمكين المهني المتكامل.', rank: 'الأعلى طلباً عالمياً 🌟', difficulty: 'سهل ومباشر ومريح', flag: '🇺🇸' },
  { id: 'es', label: 'Español', nativeName: 'الإسبانية 🇪🇸', fact: 'اللغة الرسمية لأكثر من عشرين دولة، غنية بالاشتقاقات والتركيب وسهلة النطق لمتوافقي لغات شرق الأوسط.', rank: 'انتشار جغرافي ساحق 🌍', difficulty: 'سهل إلى متوسط', flag: '🇪🇸' },
  { id: 'fr', label: 'Français', nativeName: 'الفرنسية 🇫🇷', fact: 'لغة الآداب والفنون والدبلوماسية والأبحاث البستنية، وتتشارك جذوراً ومصطلحات واسعة مع معجم الإنجليزية.', rank: 'لغة الثقافة والدبلوماسية ⚜️', difficulty: 'متوسط اللفظ والوزن', flag: '🇫🇷' },
  { id: 'de', label: 'Deutsch', nativeName: 'الألمانية 🇩🇪', fact: 'محرك الاقتصاد والصناعة والتقنية المتطورة في القارة الأوروبية، وبوابة المجالات والتعليم الهندسي.', rank: 'صناعي وفلسفي رائد ⚙️', difficulty: 'متوسط إلى صعب البناء', flag: '🇩🇪' },
  { id: 'tr', label: 'Türkçe', nativeName: 'التركية 🇹🇷', fact: 'لغة رشيقة وموسيقية تتقارب جغرافياً وثقافياً واجتماعياً، تحتفظ بأكثر من خمسة آلاف مفردة عربية الأصل.', rank: 'الاهتمام الإقليمي والسياحي ✈️', difficulty: 'سهل جداً للعرب', flag: '🇹🇷' },
  { id: 'it', label: 'Italiano', nativeName: 'الإيطالية 🇮🇹', fact: 'لغة الفنون الكلاسيكية، الطهي، الموضة والتصميم المطور؛ نطقها نغمي ومخارجها شديدة الانتظام.', rank: 'الفنون والتصميم والطهي 🎨', difficulty: 'سهل وعذب وممتع', flag: '🇮🇹' },
  { id: 'ja', label: '日本語', nativeName: 'اليابانية 🇯🇵', fact: 'بوابة الابتكار الحديثة والأنمي والقيادة التقنية الميكانيكية والتراث العائلي المنضبط.', rank: 'تكنولوجي عالي القيمة 🤖', difficulty: 'صعب الرسوم والتراكيب', flag: '🇯🇵' },
  { id: 'zh', label: '中文', nativeName: 'الصينية 🇨🇳', fact: 'لغة المستقبل والتبادل الاقتصادي الأكبر، معتمدة على التصوير الحسي الصوري والنغمات الصوتية.', rank: 'العملاق الاقتصادي والتجاري 📈', difficulty: 'صعب جداً بالنبرات', flag: '🇨🇳' },
  { id: 'ar', label: 'العربية', nativeName: 'العربية 🇸🇦', fact: 'لغة الضاد غنية بالبلاغة الفائقة والتراكيب الأصيلة، تمثل الرصينة الهوية والعراقة التعليمية للبرنامج.', rank: 'لغة الأصالة والجزالة ✍️', difficulty: 'اللغة الأم / رئيسي', flag: '🇸🇦' }
];

// SpeechSynthesis wrapper
const speakText = (text: string, langCode: string) => {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    let voiceLang = 'en-US';
    if (langCode === 'ar') voiceLang = 'ar-SA';
    else if (langCode === 'es') voiceLang = 'es-ES';
    else if (langCode === 'fr') voiceLang = 'fr-FR';
    else if (langCode === 'de') voiceLang = 'de-DE';
    else if (langCode === 'it') voiceLang = 'it-IT';
    else if (langCode === 'tr') voiceLang = 'tr-TR';
    else if (langCode === 'ja') voiceLang = 'ja-JP';
    else if (langCode === 'zh') voiceLang = 'zh-CN';
    
    utterance.lang = voiceLang;
    
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(langCode.toLowerCase()));
    if (!preferredVoice && voices.length > 0) {
      preferredVoice = voices.find(v => v.lang.startsWith(langCode));
    }
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 0.95;
    managedSpeak(utterance);
  } catch (err) {
    console.error("speechSynthesis error", err);
  }
};

export function LiveTranslate({ isRtl = true, lang = 'ar', userProfile, onBack }: LiveTranslateProps) {
  const [activeTab, setActiveTab] = useState<'sandbox' | 'idioms' | 'challenge' | 'letters' | 'vocab' | 'conversation'>('sandbox');
  
  // Tab 1: Translation Sandbox states
  const [sourceText, setSourceText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'ar' | 'fr' | 'es' | 'ja' | 'de' | 'tr' | 'it' | 'zh'>('en');
  const [toneRegister, setToneRegister] = useState<'academic' | 'colloquial' | 'business' | 'slang' | 'poetic'>('academic');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<any>(null);
  const [translationError, setTranslationError] = useState<string | null>(null);

  // Tab 2: Idiomatic Converter states
  const [idiomPhrase, setIdiomPhrase] = useState('');
  const [isConvertingIdiom, setIsConvertingIdiom] = useState(false);
  const [idiomResult, setIdiomResult] = useState<any>(null);
  const [idiomError, setIdiomError] = useState<string | null>(null);

  // Tab 3: Language Gladiator Challenge states
  const [challengeLevel, setChallengeLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('B1');
  const [challengeTopic, setChallengeTopic] = useState('Business English & Travel');
  const [isGeneratingChallenge, setIsGeneratingChallenge] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<any>(null);
  const [userTranslation, setUserTranslation] = useState('');
  const [isCheckingTranslation, setIsCheckingTranslation] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [gladiatorPoints, setGladiatorPoints] = useState<number>(0);
  const [challengeHistory, setChallengeHistory] = useState<any[]>([]);

  // Sound triggering on first render / tab change
  const handleTabChange = (tab: 'sandbox' | 'idioms' | 'challenge' | 'letters' | 'vocab' | 'conversation') => {
    setActiveTab(tab);
    playPristineChime('open');
  };

  // Preset prompts for translate
  const PRESET_TEXTS = [
    { ar: "العلم والعمل هما جناحا التقدم الحضاري وبناء غدٍ مشرق للجيل القادم.", en: "Knowledge and work are the wings of civilizational progress to build a bright tomorrow for the next generation." },
    { ar: "يرجى العلم بأن الموعد النهائي لتسليم التقارير المالية لمجلس الإدارة هو يوم الخميس المقبل دون تأخير.", en: "Please be informed that the deadline for submitting the financial reports to the Board of Directors is next Thursday without fail." },
    { ar: "الترجمة لا تتعلق بنقل الكلمات حرفياً بل صياغة الفكرة بذكاء وبثقافة اللغة المستهدفة.", en: "Translation is not about converting words literally; rather, it is about framing the concept intelligently with the target culture." }
  ];

  // Preset idioms for Tab 2
  const PRESET_IDIOMS = [
    { label: "مطر شديد بغزارة", value: "Heavy rain" },
    { label: "أبذل أقصى ما أملك من قوة لتسهيل الأمر", value: "Do my best to make things easy" },
    { label: "التعب والجهد المضني بعد العمل الشاق", value: "Feeling extremely exhausted" },
    { label: "التوفيق في عرض غنائي أو أداء مسرحي", value: "Break a leg / success" },
    { label: "بدء الحديث لكسر حواجز الخجل والجليد", value: "Break the ice" }
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);
    setTranslationError(null);
    playPristineChime('think');

    try {
      const response = await fetch('/api/live-translate/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          targetLang: targetLanguage,
          toneStyle: toneRegister
        })
      });

      if (!response.ok) {
        throw new Error(response.status === 429 ? 'LIMIT' : 'Translation failed');
      }

      const data = await response.json();
      setTranslationResult(data);
      playPristineChime('success');
    } catch (e: any) {
      setTranslationError(e?.message === 'LIMIT' ? (isRtl ? 'وصلت لحد الترجمة المؤقت (٤٠ طلب كل ١٠ دقائق). انتظر قليلاً ثم حاول.' : 'Translation limit reached (40 per 10 min). Please wait a little.') : (isRtl ? 'تعذر الاتصال بمدقق الترجمة الذكي. حاول مجدداً.' : 'Could not reach linguistic engine.'));
      playPristineChime('close');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleIdiomConvert = async (phrase: string) => {
    const textToUse = phrase || idiomPhrase;
    if (!textToUse.trim()) return;
    setIsConvertingIdiom(true);
    setIdiomError(null);
    playPristineChime('think');

    try {
      const response = await fetch('/api/live-translate/idiom-transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phrase: textToUse })
      });

      if (!response.ok) {
        throw new Error('Idiom translation failed');
      }

      const data = await response.json();
      setIdiomResult(data);
      playPristineChime('success');
    } catch (e: any) {
      setIdiomError(isRtl ? 'تعذر تحويل المصطلح. يرجى المحاولة لاحقاً.' : 'Could not translate idioms.');
      playPristineChime('close');
    } finally {
      setIsConvertingIdiom(false);
    }
  };

  const handleGenerateChallenge = async () => {
    setIsGeneratingChallenge(true);
    setEvaluationResult(null);
    setUserTranslation('');
    playPristineChime('think');

    try {
      const response = await fetch('/api/live-translate/challenge/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: challengeLevel,
          topic: challengeTopic,
          targetLang: targetLanguage
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate challenge');
      }

      const data = await response.json();
      setActiveChallenge(data);
      playPristineChime('open');
    } catch (e) {
      // Fallback
      setActiveChallenge({
        sourceSentence: "إن الاستثمار في تعليم المهارات اللغوية يقود الكادر الإداري للمنافسة العالمية.",
        hints: ["استخدم 'Invest in'", "المهارات اللغوية 'linguistic skills'", "الكادر الإداري 'administrative staff'"],
        conceptualVocabulary: ["Investment (استثمار)", "Elite (نخبة)", "Competency (كفاءة)"],
        modelTranslation: "Investing in linguistic skills education drives the administrative staff to global competitiveness."
      });
      playPristineChime('open');
    } finally {
      setIsGeneratingChallenge(false);
    }
  };

  const handleEvaluateChallenge = async () => {
    if (!userTranslation.trim() || !activeChallenge) return;
    setIsCheckingTranslation(true);
    playPristineChime('think');

    try {
      const response = await fetch('/api/live-translate/challenge/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceSentence: activeChallenge.sourceSentence,
          modelTranslation: activeChallenge.modelTranslation,
          userTranslation: userTranslation
        })
      });

      if (!response.ok) {
        throw new Error('Evaluation failed');
      }

      const data = await response.json();
      setEvaluationResult(data);
      
      // Update score and history
      const scoreGained = data.score || 0;
      setGladiatorPoints(prev => prev + Math.floor(scoreGained / 10));
      
      setChallengeHistory(prev => [
        {
          source: activeChallenge.sourceSentence,
          mine: userTranslation,
          correct: activeChallenge.modelTranslation,
          score: scoreGained,
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);

      if (scoreGained > 75) {
        playPristineChime('success');
      } else {
        playPristineChime('message');
      }
    } catch (e: any) {
      playPristineChime('close');
    } finally {
      setIsCheckingTranslation(false);
    }
  };

  const t = (ar: string, en: string) => (isRtl ? ar : en);

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className="max-w-6xl">
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Dynamic Mode Tabs */}
        <GoldCard className="p-4 sm:p-5 space-y-4">
          {/* Category 1: Professional Translation Tools */}
          <div className="space-y-2">
            <span className="text-[11px] font-black text-[#002147] uppercase tracking-wider block text-right px-1">
              {t('🛠️ أدوات الترجمة والتدقيق السياقي المهني:', '🛠️ Professional Translation Suite:')}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleTabChange('sandbox')}
                className={`py-2.5 px-2 text-center font-black rounded-xl border transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                  activeTab === 'sandbox'
                    ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
                    : 'bg-white text-[#002147] border-[#C49E3A] hover:bg-[#fdfaf3]'
                }`}
              >
                <Languages size={15} className="shrink-0" />
                <span className="text-[11px] sm:text-xs leading-tight font-black">
                  {t('مدقق الترجمة والسياق', 'Translation Sandbox')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('idioms')}
                className={`py-2.5 px-2 text-center font-black rounded-xl border transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                  activeTab === 'idioms'
                    ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
                    : 'bg-white text-[#002147] border-[#C49E3A] hover:bg-[#fdfaf3]'
                }`}
              >
                <Compass size={15} className="shrink-0" />
                <span className="text-[11px] sm:text-xs leading-tight font-black">
                  {t('مصنع التعابير الروحية', 'Idiom Transformer')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('challenge')}
                className={`py-2.5 px-2 text-center font-black rounded-xl border transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                  activeTab === 'challenge'
                    ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
                    : 'bg-white text-[#002147] border-[#C49E3A] hover:bg-[#fdfaf3]'
                }`}
              >
                <Flame size={15} className="text-[#C49E3A] shrink-0" />
                <span className="text-[11px] sm:text-xs leading-tight font-black">
                  {t('تحدي المترجم المبارز', 'Gladiator Challenge')}
                </span>
              </button>
            </div>
          </div>

          {/* Category 2: Interactive Language Academy (3 sub-tabs: Letters / Vocab / Conversation) */}
          <div className="space-y-2 pt-2 border-t border-[#C49E3A]/20">
            <div className="flex justify-between items-center px-1">
              <ProgressPill>Basim Academy</ProgressPill>
              <span className="text-[11px] font-black text-[#002147] uppercase tracking-wider block text-right">
                {t('🏛️ صالونات وأكاديمية تعلم اللغات الحية:', '🏛️ Interactive Language Academy Suite:')}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleTabChange('letters')}
                className={`py-2.5 px-2 text-center font-black rounded-xl border transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                  activeTab === 'letters'
                    ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
                    : 'bg-white text-[#002147] border-[#C49E3A] hover:bg-[#fdfaf3]'
                }`}
              >
                <BookOpenText size={15} className="shrink-0" />
                <span className="text-[11px] sm:text-xs leading-tight font-black">
                  {t('تعلم الحروف والفونيمات', 'Learn Alphabets')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('vocab')}
                className={`py-2.5 px-2 text-center font-black rounded-xl border transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                  activeTab === 'vocab'
                    ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
                    : 'bg-white text-[#002147] border-[#C49E3A] hover:bg-[#fdfaf3]'
                }`}
              >
                <ClipboardList size={15} className="shrink-0" />
                <span className="text-[11px] sm:text-xs leading-tight font-black">
                  {t('تعلم المفردات والكلمات', 'Learn Vocabulary')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('conversation')}
                className={`py-2.5 px-2 text-center font-black rounded-xl border transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                  activeTab === 'conversation'
                    ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
                    : 'bg-white text-[#002147] border-[#C49E3A] hover:bg-[#fdfaf3]'
                }`}
              >
                <MessageSquare size={15} className="shrink-0" />
                <span className="text-[11px] sm:text-xs leading-tight font-black">
                  {t('المحادثة والتقمص الحواري', 'Interactive Conversations')}
                </span>
              </button>
            </div>
          </div>
        </GoldCard>

        {/* Tab 1: Translation Sandbox Component Block */}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Config Control Column (5 cols) */}
            <GoldCard className="lg:col-span-5 p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#C49E3A]/20 pb-3">
                <Globe className="text-[#002147]" size={18} />
                <h3 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                  {t('تكوين الترجمة والتحليل:', 'Translation Configuration:')}
                </h3>
              </div>

              {/* Source/Target language selection */}
              <div className="space-y-2 pb-2 border-b border-[#C49E3A]/20">
                <label className="text-[10px] font-black text-[#002147] block uppercase tracking-wider">
                  {t('🌐 اختر إحدى اللغات الحية للتعلم والترجمة:', '🌐 Choose a Live Language for Translation/Learning:')}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {LIVE_LEARNING_LANGUAGES.map((elem) => (
                    <button
                      key={elem.id}
                      type="button"
                      onClick={() => { setTargetLanguage(elem.id as any); playPristineChime('message'); }}
                      className={`py-2 px-1 text-center rounded-xl border transition active:scale-95 text-[10px] font-black flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        targetLanguage === elem.id
                          ? 'bg-[#002147] border-[#C49E3A] text-[#E6C36A]'
                          : 'border-[#C49E3A]/40 text-[#002147] bg-white hover:bg-[#fdfaf3]'
                      }`}
                    >
                      <span className="text-[15px]">{elem.flag}</span>
                      <span className="truncate max-w-full leading-none text-[10px]">{elem.label}</span>
                    </button>
                  ))}
                </div>

                {/* Selected target language fact card */}
                {(() => {
                  const info = LIVE_LEARNING_LANGUAGES.find(l => l.id === targetLanguage);
                  if (!info) return null;
                  return (
                    <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-3 rounded-2xl space-y-1.5 text-right mt-2">
                      <div className="flex flex-wrap justify-between items-center gap-1 text-[10px]">
                        <ProgressPill className="!px-2 !py-0.5 !text-[10px]">
                          {info.rank}
                        </ProgressPill>
                        <span className="text-[#002147]/70 font-bold">
                          {t('مستوى الصعوبة:', 'Difficulty:')} <span className="text-[#002147] font-black">{info.difficulty}</span>
                        </span>
                      </div>
                      <p className="text-xs text-[#002147] leading-normal font-bold">
                        {info.fact}
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Register tone selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#002147] block">
                  {t('⚖️ مستوى صياغة ومقام السياق (Tone modifier):', '⚖️ Conversation style & Tone register:')}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'academic', label: t('🎓 أكاديمي / لغوي فائق', 'Academy (Formal)') },
                    { id: 'business', label: t('💼 مهني / لغة أعمال', 'Business (Elite)') },
                    { id: 'colloquial', label: t('🗣️ محادثة يومية عامة', 'Colloquial Context') },
                    { id: 'slang', label: t('🔥 شبابي / دارج ممتع', 'Slang Expressions') }
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => { setToneRegister(style.id as any); playPristineChime('message'); }}
                      className={`p-2 rounded-xl text-[11px] text-right font-black border transition active:scale-95 cursor-pointer ${
                        toneRegister === style.id
                          ? 'bg-[#002147] border-[#C49E3A] text-[#E6C36A]'
                          : 'border-[#C49E3A]/40 text-[#002147] bg-white hover:bg-[#fdfaf3]'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Help Quick Prompts List */}
              <div className="space-y-1.5 bg-[#fdfaf3] p-3.5 rounded-2xl border border-[#C49E3A]/40">
                <span className="text-[10px] font-black text-[#002147]/70 block uppercase tracking-wider">
                  ⚠️ {t('أقوال وعبارات نموذجية للتحليل مسبقاً:', 'Preselected sample texts:')}
                </span>
                <div className="space-y-1.5 pt-1">
                  {PRESET_TEXTS.map((pText, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSourceText(pText.ar);
                        playPristineChime('message');
                      }}
                      className="w-full p-2.5 text-right text-xs bg-white border border-[#C49E3A]/40 hover:border-[#C49E3A] rounded-xl transition block truncate select-none text-[#002147] cursor-pointer font-bold"
                    >
                      {pText.ar}
                    </button>
                  ))}
                </div>
              </div>
            </GoldCard>

            {/* Translation Input & Output Pane (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Input Textarea block */}
              <GoldCard className="p-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#C49E3A]/20">
                  <div className="flex items-center gap-2">
                    <FileText className="text-[#002147]" size={16} />
                    <span className="text-xs font-black text-[#002147]">
                      {t('العبارة أو الفقرة المُراد تدقيقها وترجمتها:', 'Linguistic input box:')}
                    </span>
                  </div>
                  <GhostButton
                    onClick={() => { setSourceText(''); setTranslationResult(null); }}
                    className="!px-3 !py-1 !min-h-[30px] !text-xs"
                  >
                    {t('🧹 مسح النص', 'Clear')}
                  </GhostButton>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder={t('اكتب أو الصق العبارة هنا باللغة العربية أو الإنجليزية...', 'Write any paragraph or phrase here...')}
                    className="w-full bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl p-4 text-xs sm:text-sm font-bold text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#C49E3A] leading-relaxed resize-none"
                  />
                  <div className="absolute bottom-3 left-3 text-[10.5px] font-mono text-[#002147]/50 font-bold">
                    {sourceText.length} c
                  </div>
                </div>

                <PrimaryButton
                  disabled={isTranslating || !sourceText.trim()}
                  onClick={handleTranslate}
                  className="w-full"
                >
                  {isTranslating ? (
                    <span>{t('يقرأ Gemini المعنى والتركيبة العميقة...', 'Decrypting syntactical flow...')}</span>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      <span>{t('بث وتحليل الترجمة التفاعلية بميزات غامرة', 'Translate & Run Deep Context Evaluation')}</span>
                    </>
                  )}
                </PrimaryButton>

                {translationError && (
                  <div className="p-3 bg-[#fdfaf3] text-[#002147] text-xs font-black rounded-xl border border-[#C49E3A] flex items-center gap-2">
                    <AlertCircle size={14} className="text-[#C49E3A]" />
                    <span>{translationError}</span>
                  </div>
                )}
              </GoldCard>

              {/* Dynamic Output Response Box with Grammar Cubes & Vocab cards */}
              <AnimatePresence mode="wait">
                {translationResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* The translation output block */}
                    <GoldCard className="p-5 space-y-4">
                      <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-[#C49E3A]/20">
                        <div className="flex items-center gap-2">
                          <Languages className="text-[#C49E3A]" size={16} />
                          <span className="text-xs font-black tracking-wider text-[#002147] uppercase">
                            {t('مخرجات الترجمة فئة Gemini 3.5:', 'Gemini 3.5 Core Translation Output:')}
                          </span>
                        </div>
                        <ProgressPill>
                          {translationResult.formalityLevel || 'Academic (A2)'}
                        </ProgressPill>
                      </div>

                      <div className="py-2 bg-[#fdfaf3] p-4 rounded-2xl border border-[#C49E3A]/40">
                        <h4 className="text-lg sm:text-xl font-black text-[#002147] tracking-wide leading-relaxed select-all">
                          {translationResult.translation}
                        </h4>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-2 border-t border-[#C49E3A]/20">
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => speakText(translationResult.translation, targetLanguage)}
                            className="w-10 h-10 bg-[#002147] text-[#E6C36A] border-2 border-[#C49E3A] rounded-full flex items-center justify-center transition active:scale-95 cursor-pointer shrink-0"
                          >
                            <Volume2 size={15} />
                          </button>
                          <span className="text-[11px] text-[#002147]/80 font-mono font-bold">
                            {(() => {
                              const vCodes: Record<string, string> = {
                                ar: 'ar-SA', en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', tr: 'tr-TR', ja: 'ja-JP', zh: 'zh-CN'
                              };
                              return vCodes[targetLanguage] || 'en-US';
                            })()} - {t('انقر للاستماع للنطق السليم للغة الحية', 'Click to hear live pronunciation audio')}
                          </span>
                        </div>

                        <div className="text-[11px] text-[#002147] bg-[#fdfaf3] px-3 py-1.5 rounded-xl border border-[#C49E3A]/40 font-bold">
                          {t('الترجمة العكسية للتدقيق:', 'Reverse Verification:')} {translationResult.reverseTranslation}
                        </div>
                      </div>
                    </GoldCard>

                    {/* Cultural explanation / Preposition guidance */}
                    <GoldCard className="p-5 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-[#002147]">
                        <BookOpen size={15} className="text-[#C49E3A]" />
                        <span className="text-xs font-black tracking-wider uppercase">
                          {t('💡 التحليل البنائي وشرح الدلالات السياقية:', '💡 Grammatical Nuances & Context insights:')}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#002147] font-bold">
                        {translationResult.contextExplanation}
                      </p>
                    </GoldCard>

                    {/* Grammar Cubes Annotations */}
                    {translationResult.grammarCubes && translationResult.grammarCubes.length > 0 && (
                      <GoldCard className="p-5 space-y-3.5">
                        <div className="flex items-center gap-1.5 text-[#002147]">
                          <Layers size={15} className="text-[#C49E3A]" />
                          <span className="text-xs font-black tracking-wider uppercase">
                            {t('🧱 مكعبات الجمل والقواعد اللغوية المستخدمة (Grammar Cubes):', '🧱 Grammar Cubes Annotated:')}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {translationResult.grammarCubes.map((cube: any, i: number) => (
                            <div key={i} className="bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl p-3.5 space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-black text-[#002147] font-mono">{cube.word}</span>
                                <ProgressPill className="!px-2 !py-0.5 !text-[9px]">
                                  {cube.partOfSpeech}
                                </ProgressPill>
                              </div>
                              <p className="text-xs font-black leading-normal text-[#C49E3A]">
                                {cube.meaningAr}
                              </p>
                              <p className="text-[11px] text-[#002147]/75 font-bold leading-relaxed">
                                {cube.usageTip}
                              </p>
                            </div>
                          ))}
                        </div>
                      </GoldCard>
                    )}

                    {/* Word-for-Word Visual Cards Generation */}
                    {translationResult.extractedVocab && translationResult.extractedVocab.length > 0 && (
                      <GoldCard className="p-5 space-y-3">
                        <div className="flex items-center gap-1.5 text-[#002147]">
                          <BookMarked size={15} className="text-[#C49E3A]" />
                          <span className="text-xs font-black tracking-wider uppercase">
                            {t('🗂️ بطاقات الكلمات المكتشفة تلقائياً من الترجمة:', '🗂️ Autoconfigured Lexicon Flashcards:')}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {translationResult.extractedVocab.map((voc: any, i: number) => (
                            <div key={i} className="bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl p-4 flex flex-col justify-between">
                              <div className="space-y-1.5">
                                <div className="flex justify-between items-start">
                                  <h5 className="text-base font-black text-[#002147] font-mono tracking-wide">{voc.en}</h5>
                                  <GhostButton
                                    onClick={() => speakText(voc.en, 'en')}
                                    className="!px-2 !py-1 !min-h-[30px]"
                                  >
                                    <Volume2 size={12} />
                                  </GhostButton>
                                </div>
                                <span className="text-[10px] font-mono text-[#002147]/65 block font-bold tracking-widest">{voc.pronunciation}</span>
                                <h6 className="text-xs font-black text-[#C49E3A] leading-none">{voc.ar}</h6>
                                <p className="text-[11px] text-[#002147] font-bold leading-relaxed italic bg-white p-2 rounded-xl border border-[#C49E3A]/30">
                                  "{voc.contextPhrase}"
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </GoldCard>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Tab 2: Idiomatic Converter Component Block */}
        {activeTab === 'idioms' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Control Pane & Presets (4 cols) */}
            <GoldCard className="lg:col-span-4 p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#C49E3A]/20 pb-3">
                <Compass className="text-[#002147]" size={18} />
                <h3 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                  {t('مصنع المصطلحات المجازية:', 'Idiomatic Navigator:')}
                </h3>
              </div>

              <p className="text-xs text-[#002147]/75 font-bold leading-normal">
                {t(
                  'الترجمة الحرفية تقتل المظهر الثقافي للغة. اكتب تعبيرك البسيط لنموذج ذكاء المترجم وسيتلقاها ليصنع صيغاً اصطلاحية دارجة يستخدمها متحدث اللغة الأصلي.',
                  'Convert raw, plain phrases into high-grade cultural idioms natively used by native speakers of English or Arabic.'
                )}
              </p>

              {/* Presets Grid */}
              <div className="space-y-1.5 bg-[#fdfaf3] p-3.5 rounded-2xl border border-[#C49E3A]/40">
                <span className="text-[10px] font-black text-[#002147]/70 block uppercase tracking-wider">
                  🚀 {t('اضغط لتجربة عبارات شائعة:', 'Click to convert presets:')}
                </span>
                <div className="space-y-1.5 pt-1.5">
                  {PRESET_IDIOMS.map((idi, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setIdiomPhrase(idi.value);
                        handleIdiomConvert(idi.value);
                      }}
                      className="w-full text-right p-2.5 bg-white border border-[#C49E3A]/40 hover:border-[#C49E3A] rounded-xl text-xs transition block font-black text-[#002147] cursor-pointer active:scale-95"
                    >
                      <span className="block text-[#C49E3A] text-[9px] font-bold uppercase font-mono tracking-widest mb-0.5">Preset {index + 1}</span>
                      {idi.label}
                    </button>
                  ))}
                </div>
              </div>
            </GoldCard>

            {/* Main Interactive Screen (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              <GoldCard className="p-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#C49E3A]/20">
                  <span className="text-xs font-black text-[#002147]">
                    {t('اكتب عبارة عادية تريد تحويلها لمصطلح مجازي native:', 'Enter a basic concept or plain sentence:')}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={idiomPhrase}
                    onChange={(e) => setIdiomPhrase(e.target.value)}
                    placeholder={t('مثال: "أبذل أقصى مجهود للعمل" أو "الطقس حار جداً"... ', 'E.g., "I am under huge pressure to pass"...')}
                    className="w-full bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#C49E3A]"
                  />
                </div>

                <PrimaryButton
                  disabled={isConvertingIdiom || !idiomPhrase.trim()}
                  onClick={() => handleIdiomConvert('')}
                  className="w-full"
                >
                  {isConvertingIdiom ? (
                    <span>{t('يصنع Gemini تشبيهات وتراكيب لغوية مذهلة...', 'Culturing native phrase...')}</span>
                  ) : (
                    <>
                      <Compass size={15} />
                      <span>{t('تحويل للغة واصطلاحات متحدث اللغة الأصلي 🚀', 'Convert & Enhance into Native Idiom 🚀')}</span>
                    </>
                  )}
                </PrimaryButton>

                {idiomError && (
                  <p className="text-xs font-bold text-[#002147] bg-[#fdfaf3] p-3 rounded-xl border border-[#C49E3A]/40">
                    {idiomError}
                  </p>
                )}
              </GoldCard>

              {/* Idioms Result Display */}
              <AnimatePresence mode="wait">
                {idiomResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Golden Highlight Card */}
                    <GoldCard className="p-6 space-y-4">
                      <div className="space-y-1 pb-3.5 border-b border-[#C49E3A]/20 text-right">
                        <span className="text-[10px] font-black tracking-widest text-[#C49E3A] uppercase block">
                          {t('التعبير اللغوي الأصيل المكتشف:', 'NATIVE IDIOMATIC PHRASE DEFINITION:')}
                        </span>
                        <h4 className="text-2xl font-black text-[#002147] tracking-wide leading-relaxed">
                          {idiomResult.translatedIdiom}
                        </h4>
                      </div>

                      <div className="py-2 space-y-1 bg-[#fdfaf3] p-4 rounded-2xl border border-[#C49E3A]/40">
                        <span className="text-[10px] font-black text-[#002147] uppercase tracking-wider block">
                          🗺️ {t('الخلفية والأصل الثقافي لهذا النطق التعبيري:', '🗺️ Cultural Origins & Metaphorical context:')}
                        </span>
                        <p className="text-xs text-[#002147] leading-relaxed font-bold">
                          {idiomResult.culturalContext}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <GhostButton
                          onClick={() => speakText(idiomResult.translatedIdiom, 'en')}
                        >
                          <Volume2 size={14} />
                          <span className="text-[10px] font-mono font-black tracking-widest">
                            LISTEN PRONUNCIATION
                          </span>
                        </GhostButton>
                      </div>
                    </GoldCard>

                    {/* Example Sentences */}
                    {idiomResult.examples && idiomResult.examples.length > 0 && (
                      <GoldCard className="p-5 space-y-3.5">
                        <h5 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                          📚 {t('أمثلة توضيحية مطابقة مع الترجمة:', '📚 Rich Practice Sentences:')}
                        </h5>
                        <div className="space-y-2.5">
                          {idiomResult.examples.map((ex: any, i: number) => (
                            <div key={i} className="p-3.5 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl space-y-1.5">
                              <div className="flex justify-between items-start gap-2">
                                <p className="text-xs font-mono font-black text-[#002147] tracking-wider">
                                  {ex.sentence}
                                </p>
                                <GhostButton
                                  onClick={() => speakText(ex.sentence, 'en')}
                                  className="!px-2 !py-1 !min-h-[28px] !text-xs shrink-0"
                                >
                                  🔊
                                </GhostButton>
                              </div>
                              <p className="text-xs text-[#C49E3A] font-black">
                                {ex.translation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </GoldCard>
                    )}

                    {/* Alternatives Grid */}
                    {idiomResult.alternativeIdioms && idiomResult.alternativeIdioms.length > 0 && (
                      <GoldCard className="p-5 space-y-3">
                        <h5 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                          🔄 {t('تعبيرات مرادفة ومصطلحات تخدم نفس المفهوم:', '🔄 Alternative Native Expressions:')}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {idiomResult.alternativeIdioms.map((alt: string, i: number) => (
                            <ProgressPill key={i}>
                              🚀 {alt}
                            </ProgressPill>
                          ))}
                        </div>
                      </GoldCard>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Tab 3: Language Gladiator Challenge Component Block */}
        {activeTab === 'challenge' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Stats Scoreboard & Config panel (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Gladiator Profile Scorecard */}
              <GoldCard className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#002147] text-[#E6C36A] border-2 border-[#C49E3A] rounded-2xl flex items-center justify-center text-2xl shrink-0">
                    ⚔️
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-wide text-[#002147] uppercase font-sans">
                      {t('حلبة مبارزة المترجم المحترف', 'Linguistic Gladiator Dome')}
                    </h4>
                    <p className="text-xs text-[#002147]/70 font-bold">
                      {t('نقاط الجوائز المكتسبة:', 'Academy points earned:')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-3 rounded-2xl text-center">
                    <span className="text-[9px] font-black text-[#002147]/70 block uppercase tracking-widest">{t('تقدير النقاط', 'Gladiator XP')}</span>
                    <strong className="text-lg font-black font-mono text-[#C49E3A]">+{gladiatorPoints} XP</strong>
                  </div>
                  <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-3 rounded-2xl text-center">
                    <span className="text-[9px] font-black text-[#002147]/70 block uppercase tracking-widest">{t('المحاولات الفعالة', 'Dual Challenges')}</span>
                    <strong className="text-lg font-black font-mono text-[#002147]">{challengeHistory.length}</strong>
                  </div>
                </div>
              </GoldCard>

              {/* Challenge parameters Configuration */}
              <GoldCard className="p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-[#C49E3A]/20 pb-3">
                  <Activity className="text-[#002147]" size={16} />
                  <h3 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                    {t('تخصيص تحدي الترجمة الصارم:', 'Configure Target Challenge:')}
                  </h3>
                </div>

                {/* Level selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#002147] block">
                    {t('🏆 تحديد المستوى اللغوي الأوروبي السائد:', '🏆 Target CEFR Level:')}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => { setChallengeLevel(lvl as any); playPristineChime('message'); }}
                        className={`py-1.5 text-center text-xs font-black rounded-xl border transition active:scale-95 cursor-pointer ${
                          challengeLevel === lvl
                            ? 'bg-[#002147] border-[#C49E3A] text-[#E6C36A]'
                            : 'border-[#C49E3A]/40 text-[#002147] bg-white hover:bg-[#fdfaf3]'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Challenge Target Language selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#002147] block">
                    {t('🌐 اللغة الحية المستهدفة للتحدي:', '🌐 Target Challenge Language:')}
                  </label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => {
                      setTargetLanguage(e.target.value as any);
                      playPristineChime('message');
                    }}
                    className="w-full bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl px-3 py-2 text-xs font-bold text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#C49E3A]"
                  >
                    {LIVE_LEARNING_LANGUAGES.map(l => (
                      <option key={l.id} value={l.id}>
                        {l.flag} {l.label} ({l.nativeName})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic options select field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#002147] block">
                    {t('🧭 محتوى ومجال الجمل المطروحة:', '🧭 Vocabulary Topic:')}
                  </label>
                  <select
                    value={challengeTopic}
                    onChange={(e) => setChallengeTopic(e.target.value)}
                    className="w-full bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl px-3 py-2 text-xs font-bold text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#C49E3A]"
                  >
                    <option value="Business negotiation & Deals">{t('💼 صفقات ومفاوضات الأعمال الاحترافية', 'Business negotiation & Deals')}</option>
                    <option value="Everyday conversations & slang">{t('🗣️ محادثات يومية وطقوس شعبية دارجة', 'Everyday conversations & slang')}</option>
                    <option value="Tourism & Airport Checkins">{t('✈️ السياحة وحجوزات المطار', 'Tourism & Airport Checkins')}</option>
                    <option value="Philosophy, Reading & Culture">{t('📚 الفلسفة والأدب والثقافة العميقة', 'Philosophy, Reading & Culture')}</option>
                  </select>
                </div>

                <PrimaryButton
                  disabled={isGeneratingChallenge}
                  onClick={handleGenerateChallenge}
                  className="w-full"
                >
                  {isGeneratingChallenge ? (
                    <span>{t('جاري صياغة جملة ذكية...', 'Generating educational battle...')}</span>
                  ) : (
                    <span>⚔️ {t('توليد وسحب التحدي الموجه الآن', 'Draw New Translation Challenge')}</span>
                  )}
                </PrimaryButton>
              </GoldCard>
            </div>

            {/* Right Challenge active panel (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              {activeChallenge ? (
                <div className="space-y-5">
                  {/* Arabic source phrase block */}
                  <GoldCard className="p-5 space-y-4">
                    <div className="flex justify-between items-center pb-2.5 border-b border-[#C49E3A]/20">
                      <span className="text-xs font-black text-[#002147] uppercase tracking-wider block">
                        ⚙️ {t('الجملة المطلوب ترجمتها بدقة متناهية للإنجليزية (Level', 'Translate this sentence into English (Level')} {activeChallenge.level || challengeLevel}):
                      </span>
                    </div>

                    <div className="p-5 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/40 text-right">
                      <h4 className="text-lg md:text-xl font-black text-[#002147] leading-relaxed">
                        {activeChallenge.sourceSentence}
                      </h4>
                    </div>

                    {/* Hints & Help */}
                    {activeChallenge.hints && activeChallenge.hints.length > 0 && (
                      <div className="bg-[#fdfaf3] p-4 rounded-2xl border border-[#C49E3A]/40 space-y-1.5">
                        <span className="text-[10px] font-black text-[#C49E3A] uppercase tracking-widest block">💡 {t('تلميحات وقرائن تمنحك الأفضلية:', '💡 Grammatical Clues:')}</span>
                        <ul className="list-disc list-inside text-xs text-[#002147] font-bold space-y-1">
                          {activeChallenge.hints.map((hint: string, index: number) => (
                            <li key={index}>{hint}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Conceptual Vocab Helper */}
                    {activeChallenge.conceptualVocabulary && activeChallenge.conceptualVocabulary.length > 0 && (
                      <div className="space-y-1.5 text-right">
                        <span className="text-[10px] font-black text-[#002147]/70 uppercase tracking-widest block">{t('الكلمات والمصطلحات المساعدة المقترحة:', 'Suggested Helper Vocabulary:')}</span>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {activeChallenge.conceptualVocabulary.map((word: string, i: number) => (
                            <ProgressPill key={i}>
                              📌 {word}
                            </ProgressPill>
                          ))}
                        </div>
                      </div>
                    )}
                  </GoldCard>

                  {/* Input Block for translation submission */}
                  <GoldCard className="p-5 space-y-4">
                    <span className="text-xs font-black text-[#002147] block">
                      ✍️ {t('اكتب صياغتك المترجمة بالإنجليزية هنا للتصحيح والتقييم الـ AI:', 'Write your target English translation below:')}
                    </span>

                    <textarea
                      rows={3}
                      value={userTranslation}
                      onChange={(e) => setUserTranslation(e.target.value)}
                      placeholder={t('اكتب صياغتك الدقيقة باللغة الإنجليزية كاملة...', 'Type your final translated English statement...')}
                      className="w-full bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl p-3.5 text-xs sm:text-sm font-bold text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#C49E3A]"
                    />

                    <PrimaryButton
                      disabled={isCheckingTranslation || !userTranslation.trim()}
                      onClick={handleEvaluateChallenge}
                      className="w-full"
                    >
                      {isCheckingTranslation ? (
                        <span>{t('يجري مجلس تقييم الـ AI المقارنة والمطابقة النحوية صنف بـ صنف...', 'Ai is analyzing grammatical alignment scale...')}</span>
                      ) : (
                        <span>🔍 {t('إرسال الترجمة للمطابقة وتصحيح الأخطاء فوراً', 'Check Translation & Grade Syntax Accuracy')}</span>
                      )}
                    </PrimaryButton>
                  </GoldCard>

                  {/* Grading results report display */}
                  <AnimatePresence mode="wait">
                    {evaluationResult && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <GoldCard className="p-5 space-y-4">
                          <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-[#C49E3A]/20">
                            <div className="flex items-center gap-2">
                              <ProgressPill>AI EVALUATION DEED</ProgressPill>
                              <span className="text-[10px] font-bold text-[#002147]/70 uppercase">Assessment Report</span>
                            </div>

                            <div className="text-right">
                              <span className="text-[9px] font-bold text-[#002147]/60 block uppercase">Accuracy Rating</span>
                              <ProgressPill>
                                {evaluationResult.accuracyRating || 'Great attempt'}
                              </ProgressPill>
                            </div>
                          </div>

                          {/* Huge score meter */}
                          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#fdfaf3] p-4 rounded-2xl border border-[#C49E3A]/40">
                            <div className="w-16 h-16 rounded-full bg-[#002147] text-[#E6C36A] border-2 border-[#C49E3A] flex items-center justify-center font-mono font-black text-xl shrink-0">
                              {evaluationResult.score}%
                            </div>
                            <div className="space-y-1">
                              <h5 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                                {t('📝 تقرير التحليل الإيجابي والملاحظات البنائية:', '📝 Detailed grammatical evaluation feedback:')}
                              </h5>
                              <p className="text-xs leading-relaxed text-[#002147] font-bold">
                                {evaluationResult.feedback}
                              </p>
                            </div>
                          </div>

                          {/* Table of corrections */}
                          {evaluationResult.corrections && evaluationResult.corrections.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-[10px] font-black text-[#002147]/70 block uppercase tracking-widest">{t('🛠️ جدول تدقيق مفرداتك والتصحيحات المطروحة:', '🛠️ Diagnostic corrections list:')}</span>
                              <div className="space-y-2">
                                {evaluationResult.corrections.map((corr: any, i: number) => (
                                  <div key={i} className="p-3 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-2 text-right">
                                    <div className="md:col-span-4">
                                      <span className="text-[9px] font-black text-[#002147]/60 block uppercase">{t('الخطأ أو الجزء الصعب:', 'Issue')}</span>
                                      <span className="text-xs font-mono font-bold text-[#002147]">{corr.error}</span>
                                    </div>
                                    <div className="md:col-span-4">
                                      <span className="text-[9px] font-black text-[#C49E3A] block uppercase">{t('التصحيح المقترح والمفصل:', 'Fix')}</span>
                                      <span className="text-xs font-mono font-black text-[#002147]">{corr.fix}</span>
                                    </div>
                                    <div className="md:col-span-4">
                                      <span className="text-[9px] font-black text-[#002147]/60 block uppercase">{t('السبب والتحليل لقواعد الكلمة:', 'Reason')}</span>
                                      <span className="text-[11px] font-bold text-[#002147]/80 block">{corr.reason}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Model alternatives and optimal phrase comparison */}
                          {evaluationResult.suggestedAlternatives && evaluationResult.suggestedAlternatives.length > 0 && (
                            <div className="space-y-2 bg-[#fdfaf3] p-4 rounded-2xl border border-[#C49E3A]/40">
                              <span className="text-[10px] font-black text-[#C49E3A] block uppercase tracking-widest">{t('✨ صياغة الترجمة النموذجية السليمة بالكامل:', '✨ High-grade translation models:')}</span>

                              <div className="space-y-2 pt-1 font-mono">
                                {evaluationResult.suggestedAlternatives.map((alt: string, i: number) => (
                                  <div key={i} className="flex justify-between items-start gap-3 p-2 bg-white border border-[#C49E3A]/40 rounded-xl">
                                    <span className="text-xs font-bold leading-relaxed font-mono text-[#002147]">{alt}</span>
                                    <GhostButton
                                      onClick={() => speakText(alt, 'en')}
                                      className="!px-2 !py-1 !min-h-[28px] !text-xs shrink-0"
                                    >
                                      🔊
                                    </GhostButton>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </GoldCard>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <GoldCard className="text-center py-14 space-y-3">
                  <div className="text-4xl">🛡️</div>
                  <h4 className="text-sm font-black text-[#002147]">
                    {t('هل أنت مستعد لدخول حلبة المبارزة اللغوية؟', 'Ready to claim translation dominance?')}
                  </h4>
                  <p className="text-xs text-[#002147]/70 max-w-sm mx-auto font-bold">
                    {t(
                      'اختر مستواك اللغوي والأكاديمي وتصنيف المفردات من الشاشاة الجانبية، ثم اضغط على توليد وسحب التحدي لتبدأ المنافسة.',
                      'Customize level context on the left and draw a dynamic challenge block.'
                    )}
                  </p>
                </GoldCard>
              )}

              {/* Challenge logs History list */}
              {challengeHistory.length > 0 && (
                <GoldCard className="p-5 space-y-3">
                  <h5 className="text-xs font-black text-[#002147] uppercase tracking-wider block">
                    🕰️ {t('آرثيف ومستند مبارزاتك السابقة:', '🕰️ Translation Battles History:')}
                  </h5>
                  <div className="space-y-2">
                    {challengeHistory.map((hist, i) => (
                      <div key={i} className="p-3 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl flex items-center justify-between text-right gap-2">
                        <div className="space-y-0.5 max-w-[75%]">
                          <p className="text-[11px] text-[#002147]/70 truncate select-all">"{hist.source}"</p>
                          <p className="text-xs font-black text-[#002147] truncate select-all">"{hist.mine}"</p>
                        </div>
                        <div className="text-left shrink-0">
                          <span className="text-[9px] font-bold text-[#002147]/60 block font-mono">{hist.time}</span>
                          <ProgressPill>Score: {hist.score}%</ProgressPill>
                        </div>
                      </div>
                    ))}
                  </div>
                </GoldCard>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Letters & Phonetics */}
        {activeTab === 'letters' && (
          <LiveTranslate_Letters
            isRtl={isRtl}
            targetLang={targetLanguage}
            onPlayChime={playPristineChime}
            speakText={speakText}
          />
        )}

        {/* Tab 5: Vocab Builder */}
        {activeTab === 'vocab' && (
          <LiveTranslate_Vocab
            isRtl={isRtl}
            targetLang={targetLanguage}
            onPlayChime={playPristineChime}
            speakText={speakText}
          />
        )}

        {/* Tab 6: Dialogue Conversation Simulator */}
        {activeTab === 'conversation' && (
          <LiveTranslate_Conversation
            isRtl={isRtl}
            targetLang={targetLanguage}
            onPlayChime={playPristineChime}
            speakText={speakText}
          />
        )}
      </div>
    </SectionShell>
  );
}

