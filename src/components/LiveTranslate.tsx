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
    window.speechSynthesis.speak(utterance);
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
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setTranslationResult(data);
      playPristineChime('success');
    } catch (e: any) {
      setTranslationError(isRtl ? 'تعذر الاتصال بمدقق الترجمة الذكي. حاول مجدداً.' : 'Could not reach linguistic engine.');
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

  return (
    <div className="flex-1 p-3 md:p-8 bg-slate-50 min-h-screen text-slate-800" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Tuwaiq Top Hero bar with Navigation back */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-gradient-to-r from-[#002147] to-[#01336c] p-6 rounded-3xl border-2 border-[#C49E3A] shadow-xl text-white">
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2">
              <span className="p-1 px-2.5 bg-amber-accent/15 border border-[#C49E3A]/30 text-amber-accent font-black text-[9px] rounded-full uppercase tracking-wider">
                {isRtl ? 'أحدث التقنيات لـ وبث اللغات 🚀' : 'CEFR Translation AI'}
              </span>
              <span className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse" />
            </div>
            <h2 className="text-2xl font-serif font-black tracking-tight flex items-center gap-2 text-white">
              <Languages className="text-[#C49E3A]" size={28} />
              {isRtl ? 'مترجم المباشر وعالم اللغات 🌐' : 'Gemini 3.5 Live Translate'}
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              {isRtl 
                ? 'استغل قدرات الترجمة الفورية، المحاكاة البنائية العميقة، المراجعات السياقية، وتدريب المترجم الترشيدي اليومي لتطوير تميزك.' 
                : 'Interactive dynamic playground utilizing high-performance Gemini translation & custom academic annotation.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-black rounded-xl border border-white/10 transition active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>{isRtl ? 'العودة للرئيسية 🏠' : 'Dashboard 🏠'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Mode Tabs with Pristine Audio */}
        <div className="space-y-4">
          {/* Category 1: Professional Translation Tools */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold text-[#002147] uppercase tracking-wider block text-right px-1">
              {isRtl ? '🛠️ أدوات الترجمة والتدقيق السياقي المهني:' : '🛠️ Professional Translation Suite:'}
            </span>
            <div className="grid grid-cols-3 gap-2 bg-slate-200/60 p-1 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleTabChange('sandbox')}
                className={`py-3 text-center font-black rounded-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-2 ${
                  activeTab === 'sandbox'
                    ? 'bg-[#002147] text-white shadow-md shadow-[#002147]/10'
                    : 'text-slate-600 hover:text-slate-900 border-none bg-transparent text-xs hover:bg-slate-300/40'
                }`}
              >
                <Languages size={15} />
                <span className="text-[10px] md:text-xs leading-none font-bold">
                  {isRtl ? 'مدقق الترجمة والسياق' : 'Translation Sandbox'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('idioms')}
                className={`py-3 text-center font-black rounded-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-2 ${
                  activeTab === 'idioms'
                    ? 'bg-[#002147] text-white shadow-md shadow-[#002147]/10'
                    : 'text-slate-600 hover:text-slate-900 border-none bg-transparent text-xs hover:bg-slate-300/40'
                }`}
              >
                <Compass size={15} />
                <span className="text-[10px] md:text-xs leading-none font-bold">
                  {isRtl ? 'مصنع التعابير الروحية' : 'Idiom Transformer'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('challenge')}
                className={`py-3 text-center font-black rounded-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-2 ${
                  activeTab === 'challenge'
                    ? 'bg-[#002147] text-white shadow-md shadow-[#002147]/10'
                    : 'text-slate-600 hover:text-slate-900 border-none bg-transparent text-xs hover:bg-slate-300/40'
                }`}
              >
                <Flame size={15} className="text-orange-500 animate-pulse" />
                <span className="text-[10px] md:text-xs leading-none font-bold">
                  {isRtl ? 'تحدي المترجم المبارز' : 'Gladiator Challenge'}
                </span>
              </button>
            </div>
          </div>

          {/* Category 2: Interactive Language Academy */}
          <div className="space-y-1.5 pb-1 border-b border-slate-100">
            <div className="flex justify-between items-center px-1">
              <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-700 rounded text-[8px] font-black uppercase">Basim Academy</span>
              <span className="text-[10px] font-extrabold text-[#002147] uppercase tracking-wider block text-right">
                {isRtl ? '🏛️ صالونات وأكاديمية تعلم اللغات الحية:' : '🏛️ Interactive Language Academy Suite:'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 bg-amber-50/50 p-1 rounded-2xl border border-amber-200/60">
              <button
                type="button"
                onClick={() => handleTabChange('letters')}
                className={`py-3 text-center font-black rounded-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-2 ${
                  activeTab === 'letters'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/10'
                    : 'text-slate-600 hover:text-amber-800 border-none bg-transparent text-xs hover:bg-amber-100/30'
                }`}
              >
                <BookOpenText size={15} />
                <span className="text-[10px] md:text-sm leading-none font-black">
                  {isRtl ? 'تعلم الحروف والفونيمات' : 'Learn Alphabets'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('vocab')}
                className={`py-3 text-center font-black rounded-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-2 ${
                  activeTab === 'vocab'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/10'
                    : 'text-slate-600 hover:text-amber-800 border-none bg-transparent text-xs hover:bg-amber-100/30'
                }`}
              >
                <ClipboardList size={15} />
                <span className="text-[10px] md:text-sm leading-none font-black">
                  {isRtl ? 'تعلم المفردات والكلمات' : 'Learn Vocabulary'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('conversation')}
                className={`py-3 text-center font-black rounded-xl transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-2 ${
                  activeTab === 'conversation'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/10'
                    : 'text-slate-600 hover:text-amber-800 border-none bg-transparent text-xs hover:bg-amber-100/30'
                }`}
              >
                <MessageSquare size={15} />
                <span className="text-[10px] md:text-sm leading-none font-black">
                  {isRtl ? 'المحادثة والتقمص الحواري' : 'Interactive Conversations'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Translation Sandbox Component Block */}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Input Config Control Column (4 cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Globe className="text-[#002147]" size={18} />
                <h3 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                  {isRtl ? 'تكوين الترجمة والتحليل:' : 'Translation Configuration:'}
                </h3>
              </div>

              {/* Source/Target language selection */}
              <div className="space-y-2 pb-1 border-b border-slate-100">
                <label className="text-[10px] font-extrabold text-[#002147] block uppercase tracking-wider">
                  {isRtl ? '🌐 اختر إحدى اللغات الحية للتعلم والترجمة:' : '🌐 Choose a Live Language for Translation/Learning:'}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {LIVE_LEARNING_LANGUAGES.map((elem) => (
                    <button
                      key={elem.id}
                      type="button"
                      onClick={() => { setTargetLanguage(elem.id as any); playPristineChime('message'); }}
                      className={`py-2 px-1 text-center rounded-xl border transition-all text-[10px] font-bold flex flex-col items-center justify-center gap-1 ${
                        targetLanguage === elem.id 
                          ? 'bg-amber-accent/20 border-[#C49E3A] text-slate-950 font-black ring-1 ring-[#C49E3A]/30' 
                          : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 cursor-pointer'
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
                    <div className="bg-[#002147]/5 border border-[#002147]/10 p-3 rounded-2xl space-y-1 text-right mt-2">
                      <div className="flex justify-between items-center text-[8.5px]">
                        <span className="font-extrabold text-[#002147] bg-[#002147]/5 px-1.5 py-0.5 rounded">
                          {info.rank}
                        </span>
                        <span className="text-slate-500 font-bold">
                          {isRtl ? 'مستوى الصعوبة:' : 'Difficulty:'} <span className="text-[#002147] font-black">{info.difficulty}</span>
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-700 leading-normal font-semibold">
                        {info.fact}
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Register tone selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 block">
                  {isRtl ? '⚖️ مستوى صياغة ومقام السياق (Tone modifier):' : '⚖️ Conversation style & Tone register:'}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'academic', label: isRtl ? '🎓 أكاديمي / لغوي فائق' : 'Academy (Formal)' },
                    { id: 'business', label: isRtl ? '💼 مهني / لغة أعمال' : 'Business (Elite)' },
                    { id: 'colloquial', label: isRtl ? '🗣️ محادثة يومية عامة' : 'Colloquial Context' },
                    { id: 'slang', label: isRtl ? '🔥 شبابي / دارج ممتع' : 'Slang Expressions' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => { setToneRegister(style.id as any); playPristineChime('message'); }}
                      className={`p-2 rounded-xl text-[10px] text-right font-semibold border transition ${
                        toneRegister === style.id 
                          ? 'bg-[#002147] border-[#002147] text-white font-bold' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Help Quick Prompts List */}
              <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">
                  ⚠️ {isRtl ? 'أقوال وعبارات نموذجية للتحليل مسبقاً:' : 'Preselected sample texts:'}
                </span>
                <div className="space-y-1.5 pt-1.5">
                  {PRESET_TEXTS.map((pText, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSourceText(pText.ar);
                        playPristineChime('message');
                      }}
                      className="w-full p-2 text-right text-[10px] bg-white border border-slate-200 hover:border-amber-accent/50 rounded-xl transition block truncate select-none text-slate-600 cursor-pointer font-medium"
                    >
                      {pText.ar}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Translation Input Pane (8 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Main Input Textarea block */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="text-[#002147]" size={16} />
                    <span className="text-xs font-black text-[#002147]">
                      {isRtl ? 'العبارة أو الفقرة المُراد تدقيقها وترجمتها:' : 'Linguistic input box:'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSourceText(''); setTranslationResult(null); }}
                    className="text-[10px] font-bold text-[#002147] hover:underline"
                  >
                    {isRtl ? '🧹 مسح النص' : 'Clear'}
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder={isRtl ? 'اكتب أو الصق العبارة هنا باللغة العربية أو الإنجليزية...' : 'Write any paragraph or phrase here...'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-semibold focus:outline-none focus:border-amber-accent leading-relaxed resize-none"
                  />
                  <div className="absolute bottom-3 left-3 text-[10.5px] font-mono text-slate-400 font-bold">
                    {sourceText.length} c
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isTranslating || !sourceText.trim()}
                  onClick={handleTranslate}
                  className="w-full py-3.5 bg-gradient-to-r from-[#002147] to-[#013167] text-white hover:to-slate-800 disabled:opacity-35 text-[11px] font-black rounded-2xl transition shadow-lg shadow-blue-900/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isTranslating ? (
                    <div className="flex items-center gap-1.5 justify-center">
                      <span className="w-2 h-2 bg-amber-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-amber-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-amber-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span>{isRtl ? 'يقرأ Gemini المعنى والتركيبة العميقة...' : 'Decrypting syntactical flow...'}</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="text-amber-accent" size={14} />
                      <span>{isRtl ? 'بث وتحليل الترجمة التفاعلية بميزات غامرة' : 'Translate & Run Deep Context Evaluation'}</span>
                    </>
                  )}
                </button>

                {translationError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>{translationError}</span>
                  </div>
                )}
              </div>

              {/* Dynamic Output Response Box with Grammar Cubes & Vocab cards */}
              <AnimatePresence mode="wait">
                {translationResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-5"
                  >
                    {/* The translation translation block */}
                    <div className="bg-[#002147] text-white border-2 border-amber-accent rounded-3xl p-5 shadow-lg space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#C49E3A]/5 rounded-full pointer-events-none filter blur-xl" />
                      
                      <div className="flex justify-between items-center pb-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Languages className="text-[#C49E3A]" size={16} />
                          <span className="text-[11px] font-black tracking-wider text-amber-accent uppercase">
                            {isRtl ? 'مخرجات الترجمة فئة Gemini 3.5:' : 'Gemini 3.5 Core Translation Output:'}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 bg-white/10 text-white border border-white/20 text-[9px] font-bold rounded-full uppercase">
                          {translationResult.formalityLevel || 'Academic (A2)'}
                        </span>
                      </div>

                      <div className="py-2">
                        <h4 className="text-xl md:text-2xl font-serif text-white hover:text-amber-accent transition tracking-wide leading-relaxed select-all">
                          {translationResult.translation}
                        </h4>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => speakText(translationResult.translation, targetLanguage)}
                            className="p-2 bg-white/10 hover:bg-white/15 text-amber-accent hover:text-white rounded-full transition cursor-pointer"
                          >
                            <Volume2 size={13} />
                          </button>
                          <span className="text-[10px] text-slate-300 font-mono font-bold">
                            {(() => {
                              const vCodes: Record<string, string> = {
                                ar: 'ar-SA', en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', tr: 'tr-TR', ja: 'ja-JP', zh: 'zh-CN'
                              };
                              return vCodes[targetLanguage] || 'en-US';
                            })()} - {isRtl ? 'انقر للاستماع للنطق السليم للغة الحية' : 'Click to hear live pronunciation audio'}
                          </span>
                        </div>
                        
                        <div className="text-[9.5px] italic text-slate-300 bg-white/5 px-2 py-1 rounded-lg border border-white/5 font-semibold">
                          {isRtl ? 'الترجمة العكسية للتدقيق:' : 'Reverse Verification:'} {translationResult.reverseTranslation}
                        </div>
                      </div>
                    </div>

                    {/* Cultural explanation / Preposition guidance */}
                    <div className="bg-amber-accent/5 border border-amber-accent/30 rounded-3xl p-5 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-[#002147]">
                        <BookOpen size={14} className="text-[#C49E3A]" />
                        <span className="text-xs font-black tracking-wider uppercase">
                          {isRtl ? '💡 التحليل البنائي وشرح الدلالات السياقية:' : '💡 Grammatical Nuances & Context insights:'}
                        </span>
                      </div>
                      <p className="text-[11.5px] leading-relaxed text-[#002147] font-semibold">
                        {translationResult.contextExplanation}
                      </p>
                    </div>

                    {/* Grammar Cubes Annotations */}
                    {translationResult.grammarCubes && translationResult.grammarCubes.length > 0 && (
                      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3.5 shadow-sm">
                        <div className="flex items-center gap-1.5 text-[#002147]">
                          <Layers size={14} className="text-[#C49E3A]" />
                          <span className="text-xs font-black tracking-wider uppercase">
                            {isRtl ? '🧱 مكعبات الجمل والقواعد اللغوية المستخدمة (Grammar Cubes):' : '🧱 Grammar Cubes Annotated:'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {translationResult.grammarCubes.map((cube: any, i: number) => (
                            <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 space-y-1 hover:border-amber-accent/30 transition">
                              <div className="flex justify-between items-center">
                                <span className="text-[11.5px] font-black text-[#002147] font-mono">{cube.word}</span>
                                <span className="bg-slate-200 text-slate-700 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                                  {cube.partOfSpeech}
                                </span>
                              </div>
                              <p className="text-[11px] font-bold leading-normal text-[#C49E3A]">
                                {cube.meaningAr}
                              </p>
                              <p className="text-[9.5px] text-slate-500 font-semibold leading-relaxed">
                                {cube.usageTip}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Word-for-Word Visual Cards Generation */}
                    {translationResult.extractedVocab && translationResult.extractedVocab.length > 0 && (
                      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
                        <div className="flex items-center gap-1.5 text-[#002147]">
                          <BookMarked size={14} className="text-[#C49E3A]" />
                          <span className="text-xs font-black tracking-wider uppercase">
                            {isRtl ? '🗂️ بطاقات الكلمات المكتشفة تلقائياً من الترجمة:' : '🗂️ Autoconfigured Lexicon Flashcards:'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {translationResult.extractedVocab.map((voc: any, i: number) => (
                            <div key={i} className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.01] transition duration-200">
                              <div className="space-y-1.5">
                                <div className="flex justify-between items-start">
                                  <h5 className="text-[15px] font-black text-[#002147] font-mono tracking-wide">{voc.en}</h5>
                                  <button
                                    type="button"
                                    onClick={() => speakText(voc.en, 'en')}
                                    className="p-1.5 bg-white border border-slate-200 hover:bg-[#002147] hover:text-white rounded-full transition cursor-pointer"
                                  >
                                    <Volume2 size={10} />
                                  </button>
                                </div>
                                <span className="text-[9.5px] font-mono text-slate-400 block font-bold tracking-widest">{voc.pronunciation}</span>
                                <h6 className="text-[11.5px] font-black text-amber-accent leading-none">{voc.ar}</h6>
                                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed italic bg-white p-1.5 rounded-lg border border-slate-100">
                                  "{voc.contextPhrase}"
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
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
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Compass className="text-[#002147]" size={18} />
                <h3 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                  {isRtl ? 'مصنع المصطلحات المجازية:' : 'Idiomatic Navigator:'}
                </h3>
              </div>

              <p className="text-[11px] text-slate-500 font-semibold leading-normal">
                {isRtl 
                  ? 'الترجمة الحرفية تقتل المظهر الثقافي للغة. اكتب تعبيرك البسيط لنموذج ذكاء المترجم وسيتلقاها ليصنع صيغاً اصطلاحية دارجة يستخدمها متحدث اللغة الأصلي.' 
                  : 'Convert raw, plain phrases into high-grade cultural idioms natively used by native speakers of English or Arabic.'}
              </p>

              {/* Presets Grid */}
              <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">
                  🚀 {isRtl ? 'اضغط لتجربة عبارات شائعة:' : 'Click to convert presets:'}
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
                      className="w-full text-right p-2.5 bg-white border border-slate-200 hover:border-amber-accent hover:border-solid rounded-xl text-[10.5px] transition block font-bold text-[#002147] cursor-pointer"
                    >
                      <span className="block text-slate-400 text-[8px] font-normal uppercase font-mono tracking-widest mb-0.5">Preset {index+1}</span>
                      {idi.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Interactive Screen (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-xs font-black text-[#002147]">
                    {isRtl ? 'اكتب عبارة عادية تريد تحويلها لمصطلح مجازي native:' : 'Enter a basic concept or plain sentence:'}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={idiomPhrase}
                    onChange={(e) => setIdiomPhrase(e.target.value)}
                    placeholder={isRtl ? 'مثال: "أبذل أقصى مجهود للعمل" أو "الطقس حار جداً"... ' : 'E.g., "I am under huge pressure to pass"...'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-amber-accent"
                  />
                </div>

                <button
                  type="button"
                  disabled={isConvertingIdiom || !idiomPhrase.trim()}
                  onClick={() => handleIdiomConvert('')}
                  className="w-full py-3 bg-gradient-to-r from-amber-accent to-amber-500 text-ink text-xs font-black rounded-xl transition shadow-md shadow-amber-600/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isConvertingIdiom ? (
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#002147] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#002147] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#002147] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span>{isRtl ? 'يصنع Gemini تشبيهات وتراكيب لغوية مذهلة...' : 'Culturing native phrase...'}</span>
                    </div>
                  ) : (
                    <>
                      <Compass className="text-[#002147]" size={14} />
                      <span>{isRtl ? 'تحويل للغة واصطلاحات متحدث اللغة الأصلي 🚀' : 'Convert & Enhance into Native Idiom 🚀'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Idioms Result Display */}
              <AnimatePresence mode="wait">
                {idiomResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-4"
                  >
                    {/* Golden Highlight Card */}
                    <div className="bg-gradient-to-br from-[#002147] to-[#012d61] text-white border-2 border-amber-accent rounded-3xl p-6 shadow-md relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-28 h-28 bg-[#C49E3A]/10 rounded-full pointer-events-none filter blur-xl" />
                      
                      <div className="space-y-1 pb-3.5 border-b border-white/10 text-right">
                        <span className="text-[9px] font-black tracking-widest text-[#C49E3A] uppercase block">
                          {isRtl ? 'التعبير اللغوي الأصيل المكتشف:' : 'NATIVE IDIOMATIC PHRASE DEFINITION:'}
                        </span>
                        <h4 className="text-2xl font-serif font-black text-amber-accent tracking-wide hover:scale-[1.01] transition leading-relaxed">
                          {idiomResult.translatedIdiom}
                        </h4>
                      </div>

                      <div className="py-4 space-y-1">
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
                          🗺️ {isRtl ? 'الخلفية والأصل الثقافي لهذا النطق التعبيري:' : '🗺️ Cultural Origins & Metaphorical context:'}
                        </span>
                        <p className="text-[12px] text-white/90 leading-relaxed font-semibold">
                          {idiomResult.culturalContext}
                        </p>
                      </div>

                      <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => speakText(idiomResult.translatedIdiom, 'en')}
                            className="p-2 bg-white/10 hover:bg-white/15 text-amber-accent rounded-full transition cursor-pointer"
                          >
                            <Volume2 size={12} />
                          </button>
                          <span className="text-[9px] text-[#C49E3A] font-mono font-bold tracking-widest">
                            LISTEN PRONUNCIATION
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Example Sentences */}
                    {idiomResult.examples && idiomResult.examples.length > 0 && (
                      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3.5 shadow-sm">
                        <h5 className="text-[11px] font-black text-[#002147] uppercase tracking-wider">
                          📚 {isRtl ? 'أمثلة توضيحية مطابقة مع الترجمة:' : '📚 Rich Practice Sentences:'}
                        </h5>
                        <div className="space-y-2.5">
                          {idiomResult.examples.map((ex: any, i: number) => (
                            <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-1.5">
                              <div className="flex justify-between items-start">
                                <p className="text-xs font-mono font-bold text-[#002147] tracking-wider">
                                  {ex.sentence}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => speakText(ex.sentence, 'en')}
                                  className="p-1 px-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer text-[10px]"
                                >
                                  🔊
                                </button>
                              </div>
                              <p className="text-[11px] text-slate-500 font-bold">
                                {ex.translation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Alternatives Grid */}
                    {idiomResult.alternativeIdioms && idiomResult.alternativeIdioms.length > 0 && (
                      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
                        <h5 className="text-[11px] font-black text-[#002147] uppercase tracking-wider">
                          🔄 {isRtl ? 'تعبيرات مرادفة ومصطلحات تخدم نفس المفهوم:' : '🔄 Alternative Native Expressions:'}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {idiomResult.alternativeIdioms.map((alt: string, i: number) => (
                            <span 
                              key={i} 
                              className="px-3.5 py-1.5 bg-slate-100 border border-slate-200 text-[#002147] font-mono text-[10px] font-bold rounded-xl"
                            >
                              🚀 {alt}
                            </span>
                          ))}
                        </div>
                      </div>
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
              <div className="bg-gradient-to-br from-[#002147] to-[#011c3b] text-white border-2 border-[#C49E3A] rounded-3xl p-5 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-accent/5 rounded-full pointer-events-none filter blur-lg animate-pulse" />
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-accent/20 border-2 border-amber-accent rounded-2xl flex items-center justify-center text-2xl">
                    ⚔️
                  </div>
                  <div>
                    <h4 className="text-[14px] font-black tracking-wide text-white uppercase font-sans">
                      {isRtl ? 'حلبة مبارزة المترجم المحترف' : 'Linguistic Gladiator Dome'}
                    </h4>
                    <p className="text-[10px] text-slate-300 font-bold">
                      {isRtl ? 'نقاط الجوائز المكتسبة:' : 'Academy points earned:'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 pt-2">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                    <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-widest">{isRtl ? 'تقدير النقاط' : 'Gladiator XP'}</span>
                    <strong className="text-xl font-black font-mono text-amber-accent">+{gladiatorPoints} XP</strong>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                    <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-widest">{isRtl ? 'المحاولات الفعالة' : 'Dual Challenges'}</span>
                    <strong className="text-xl font-black font-mono text-white">{challengeHistory.length}</strong>
                  </div>
                </div>
              </div>

              {/* Challenge parameters Configuration */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Activity className="text-[#002147]" size={16} />
                  <h3 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                    {isRtl ? 'تخصيص تحدي الترجمة الصارم:' : 'Configure Target Challenge:'}
                  </h3>
                </div>

                {/* Level selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 block">
                    {isRtl ? '🏆 تحديد المستوى اللغوي الأوروبي السائد:' : '🏆 Target CEFR Level:'}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => { setChallengeLevel(lvl as any); playPristineChime('message'); }}
                        className={`py-1.5 text-center text-[10px] font-black rounded-lg border transition ${
                          challengeLevel === lvl 
                            ? 'bg-[#002147] border-[#002147] text-white font-black' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Challenge Target Language selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 block">
                    {isRtl ? '🌐 اللغة الحية المستهدفة للتحدي:' : '🌐 Target Challenge Language:'}
                  </label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => {
                      setTargetLanguage(e.target.value as any);
                      playPristineChime('message');
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#002147] focus:outline-none focus:border-amber-accent"
                  >
                    {LIVE_LEARNING_LANGUAGES.map(lang => (
                      <option key={lang.id} value={lang.id}>
                        {lang.flag} {lang.label} ({lang.nativeName})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic options select field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 block">
                    {isRtl ? '🧭 محتوى ومجال الجمل المطروحة:' : '🧭 Vocabulary Topic:'}
                  </label>
                  <select
                    value={challengeTopic}
                    onChange={(e) => setChallengeTopic(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#002147] focus:outline-none focus:border-amber-accent"
                  >
                    <option value="Business negotiation & Deals">{isRtl ? '💼 صفقات ومفاوضات الأعمال الاحترافية' : 'Business negotiation & Deals'}</option>
                    <option value="Everyday conversations & slang">{isRtl ? '🗣️ محادثات يومية وطقوس شعبية دارجة' : 'Everyday conversations & slang'}</option>
                    <option value="Tourism & Airport Checkins">{isRtl ? '✈️ السياحة وحجوزات المطار' : 'Tourism & Airport Checkins'}</option>
                    <option value="Philosophy, Reading & Culture">{isRtl ? '📚 الفلسفة والأدب والثقافة العميقة' : 'Philosophy, Reading & Culture'}</option>
                  </select>
                </div>

                <button
                  type="button"
                  disabled={isGeneratingChallenge}
                  onClick={handleGenerateChallenge}
                  className="w-full py-3 bg-gradient-to-r from-[#002147] to-[#01356e] text-white hover:to-slate-800 disabled:opacity-30 text-xs font-black rounded-xl transition shadow-lg shadow-blue-900/15 cursor-pointer"
                >
                  {isGeneratingChallenge ? (
                    <span>{isRtl ? 'جاري صياغة جملة ذكية...' : 'Generating educational battle...'}</span>
                  ) : (
                    <span>⚔️ {isRtl ? 'توليد وسحب التحدي الموجه الآن' : 'Draw New Translation Challenge'}</span>
                  )}
                </button>
              </div>

            </div>

            {/* Right Challenge active panel (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              
              {activeChallenge ? (
                <div className="space-y-5">
                  
                  {/* Arabic source phrase block */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                      <span className="text-[10.5px] font-black text-[#002147] uppercase tracking-wider block">
                        ⚙️ {isRtl ? 'الجملة المطلوب ترجمتها بدقة متناهية للإنجليزية (Level' : 'Translate this sentence into English (Level'} {activeChallenge.level || challengeLevel}):
                      </span>
                    </div>

                    <div className="p-5 bg-slate-50/80 rounded-2xl border-2 border-dashed border-slate-200 text-right">
                      <h4 className="text-lg md:text-xl font-black text-[#002147] leading-relaxed">
                        {activeChallenge.sourceSentence}
                      </h4>
                    </div>

                    {/* Hints & Help */}
                    {activeChallenge.hints && activeChallenge.hints.length > 0 && (
                      <div className="bg-amber-accent/5 p-4 rounded-2xl border border-amber-accent/30 space-y-1.5">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">💡 {isRtl ? 'تلميحات وقرائن تمنحك الأفضلية:' : '💡 Grammatical Clues:'}</span>
                        <ul className="list-disc list-inside text-[11px] text-[#002147] font-semibold space-y-1">
                          {activeChallenge.hints.map((hint: string, index: number) => (
                            <li key={index}>{hint}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Conceptual Vocab Helper */}
                    {activeChallenge.conceptualVocabulary && activeChallenge.conceptualVocabulary.length > 0 && (
                      <div className="space-y-1 text-right">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{isRtl ? 'الكلمات والمصطلحات المساعدة المقترحة:' : 'Suggested Helper Vocabulary:'}</span>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {activeChallenge.conceptualVocabulary.map((word: string, i: number) => (
                            <span key={i} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 font-semibold text-[10px] rounded-lg">
                              📌 {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Block for translation submission */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                    <span className="text-xs font-black text-[#002147] block">
                      ✍️ {isRtl ? 'اكتب صياغتك المترجمة بالإنجليزية هنا للتصحيح والتقييم الـ AI:' : 'Write your target English translation below:'}
                    </span>
                    
                    <textarea
                      rows={3}
                      value={userTranslation}
                      onChange={(e) => setUserTranslation(e.target.value)}
                      placeholder={isRtl ? 'اكتب صياغتك الدقيقة باللغة الإنجليزية كاملة...' : 'Type your final translated English statement...'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-semibold focus:outline-none focus:border-amber-accent"
                    />

                    <button
                      type="button"
                      disabled={isCheckingTranslation || !userTranslation.trim()}
                      onClick={handleEvaluateChallenge}
                      className="w-full py-3.5 bg-[#002147] hover:bg-slate-800 text-white disabled:opacity-35 text-[11px] font-black rounded-xl transition shadow-lg cursor-pointer"
                    >
                      {isCheckingTranslation ? (
                        <span>{isRtl ? 'يجري مجلس تقييم الـ AI المقارنة والمطابقة النحوية صنف بـ صنف...' : 'Ai is analyzing grammatical alignment scale...'}</span>
                      ) : (
                        <span>🔍 {isRtl ? 'إرسال الترجمة للمطابقة وتصحيح الأخطاء فوراً' : 'Check Translation & Grade Syntax Accuracy'}</span>
                      )}
                    </button>
                  </div>

                  {/* Grading results report display */}
                  <AnimatePresence mode="wait">
                    {evaluationResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="bg-white border-2 border-[#C49E3A] rounded-3xl p-5 space-y-4 shadow-sm"
                      >
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <span className="p-1 px-2 text-[8px] bg-amber-accent/20 border border-amber-accent text-[#002147] font-black rounded-lg">AI EVALUATION DEED</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Assessment Report</span>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-[9px] font-bold text-slate-400 block uppercase">Accuracy Rating</span>
                            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                              {evaluationResult.accuracyRating || 'Great attempt'}
                            </span>
                          </div>
                        </div>

                        {/* Huge score meter */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#002147]/5 p-4 rounded-2xl border border-[#002147]/10">
                          <div className="w-16 h-16 rounded-full bg-[#002147] text-white border-2 border-amber-accent flex items-center justify-center font-mono font-black text-xl shrink-0">
                            {evaluationResult.score}%
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-[12px] font-black text-[#002147] uppercase tracking-wider">
                              {isRtl ? '📝 تقرير التحليل الإيجابي والملاحظات البنائية:' : '📝 Detailed grammatical evaluation feedback:'}
                            </h5>
                            <p className="text-[11px] leading-relaxed text-[#002147] font-semibold">
                              {evaluationResult.feedback}
                            </p>
                          </div>
                        </div>

                        {/* Table of corrections */}
                        {evaluationResult.corrections && evaluationResult.corrections.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[9.5px] font-black text-slate-400 block uppercase tracking-widest">{isRtl ? '🛠️ جدول تدقيق مفرداتك والتصحيحات المطروحة:' : '🛠️ Diagnostic corrections list:'}</span>
                            <div className="space-y-2">
                              {evaluationResult.corrections.map((corr: any, i: number) => (
                                <div key={i} className="p-3 bg-red-50/50 border border-red-100/60 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-2 text-right">
                                  <div className="md:col-span-4">
                                    <span className="text-[8px] font-bold text-red-500 block uppercase">{isRtl ? 'الخطأ أو الجزء الصعب:' : 'Issue'}</span>
                                    <span className="text-xs font-mono font-bold text-red-700">{corr.error}</span>
                                  </div>
                                  <div className="md:col-span-4 text-emerald-700">
                                    <span className="text-[8px] font-bold text-emerald-600 block uppercase">{isRtl ? 'التصحيح المقترح والمفصل:' : 'Fix'}</span>
                                    <span className="text-xs font-mono font-black">{corr.fix}</span>
                                  </div>
                                  <div className="md:col-span-4 text-slate-500">
                                    <span className="text-[8px] font-bold text-slate-400 block uppercase">{isRtl ? 'السبب والتحليل لقواعد الكلمة:' : 'Reason'}</span>
                                    <span className="text-[10px] font-semibold block">{corr.reason}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Model alternatives and optimal phrase comparison */}
                        {evaluationResult.suggestedAlternatives && evaluationResult.suggestedAlternatives.length > 0 && (
                          <div className="space-y-2 bg-[#002147] text-white p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full pointer-events-none filter blur-xl" />
                            <span className="text-[9px] font-black text-amber-accent block uppercase tracking-widest">{isRtl ? '✨ صياغة الترجمة النموذجية السليمة بالكامل:' : '✨ High-grade translation models:'}</span>
                            
                            <div className="space-y-2 pt-1 font-mono">
                              {evaluationResult.suggestedAlternatives.map((alt: string, i: number) => (
                                <div key={i} className="flex justify-between items-start gap-3 p-1.5 px-2 bg-white/5 border border-white/10 rounded-xl">
                                  <span className="text-xs font-semibold leading-relaxed font-mono text-slate-200">{alt}</span>
                                  <button
                                    type="button"
                                    onClick={() => speakText(alt, 'en')}
                                    className="p-1 px-1.5 bg-white/10 text-white rounded-lg hover:bg-white/15 text-[10px]"
                                  >
                                    🔊
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              ) : (
                <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl space-y-3 shadow-sm">
                  <div className="text-5xl">🛡️</div>
                  <h4 className="text-sm font-black text-[#002147]">
                    {isRtl ? 'هل أنت مستعد لدخول حلبة المبارزة اللغوية؟' : 'Ready to claim translation dominance?'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-semibold">
                    {isRtl 
                      ? 'اختر مستواك اللغوي والأكاديمي وتصنيف المفردات من الشاشاة الجانبية، ثم اضغط على توليد وسحب التحدي لتبدأ المنافسة.' 
                      : 'Customize level context on the left and draw a dynamic challenge block.'}
                  </p>
                </div>
              )}

              {/* Challenge logs History list */}
              {challengeHistory.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
                  <h5 className="text-[11px] font-black text-[#002147] uppercase tracking-wider block">
                    🕰️ {isRtl ? 'آرثيف ومستند مبارزاتك السابقة:' : '🕰️ Translation Battles History:'}
                  </h5>
                  <div className="space-y-2">
                    {challengeHistory.map((hist, i) => (
                      <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-right">
                        <div className="space-y-0.5 max-w-[80%]">
                          <p className="text-[11px] text-slate-400 truncate select-all">"{hist.source}"</p>
                          <p className="text-xs font-black text-[#002147] truncate select-all">"{hist.mine}"</p>
                        </div>
                        <div className="text-left shrink-0">
                          <span className="text-[8px] font-bold text-slate-400 block font-mono">{hist.time}</span>
                          <span className="text-[11px] font-black text-amber-accent font-mono">Score: {hist.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
    </div>
  );
}
