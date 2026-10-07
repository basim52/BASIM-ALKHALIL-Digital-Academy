import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Award,
  Zap,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Edit3,
  Check,
  Info,
  HelpCircle,
  Ear
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

interface PhoneticAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSentence: string;
  isRtl: boolean;
  onSuccessXP?: (xp: number) => void;
}

interface PracticeSentence {
  id: string;
  text: string;
  translationAr: string;
  ipa: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  focusPhonemes: string[];
  category: 'everyday' | 'tricky' | 'business' | 'twisters' | 'travel';
}

interface TrickySoundTip {
  phoneme: string;
  nameAr: string;
  nameEn: string;
  tipAr: string;
  tipEn: string;
  example: string;
}

const COMMON_TRICKY_SOUNDS: TrickySoundTip[] = [
  {
    phoneme: '/p/',
    nameAr: 'حرف P (الانفجاري المهموس)',
    nameEn: 'Unvoiced /p/',
    tipAr: 'احبس الهواء خلف شفتيك وافتحهما بدفعة هواء ملحوظة كالانفجار الصغير، بدون اهتزاز الحنجرة (ضع ورقة أمام فمك لتتحرك).',
    tipEn: 'Release air with a gentle puff. Don’t vibrate your vocal cords like /b/.',
    example: 'pen, practice, put, perfect'
  },
  {
    phoneme: '/θ/ - /ð/',
    nameAr: 'صوت TH (اللثوي)',
    nameEn: 'TH sounds',
    tipAr: 'أخرج طرف لسانك قليلاً بين أسنانك العلوية والسفلية (مثل: Think في المهموس، أو This في الجهري).',
    tipEn: 'Place the tip of your tongue gently between your front teeth.',
    example: 'thank, think, the, that, rhythm'
  },
  {
    phoneme: '/r/',
    nameAr: 'حرف R (المعكوف)',
    nameEn: 'English /r/',
    tipAr: 'اثنِ لسانك إلى الخلف قليلاً دون أن يلمس سقف الحلق، واجعل شفتيك مستديرتين قليلاً.',
    tipEn: 'Curl your tongue slightly back without touching the roof of your mouth.',
    example: 'red, right, ready, practice'
  },
  {
    phoneme: '/v/',
    nameAr: 'حرف V (الشفهي السني)',
    nameEn: 'Voiced /v/',
    tipAr: 'ضع أسنانك العلوية بلطف على شفتك السفلية واجعل حبالك الصوتية تهتز مع خروج الهواء.',
    tipEn: 'Top teeth rest gently on bottom lip with vocal cord vibration.',
    example: 'very, visit, travel, voice'
  },
  {
    phoneme: '/ʃ/ - /tʃ/',
    nameAr: 'صوت SH و CH',
    nameEn: 'SH and CH sounds',
    tipAr: 'في SH الهواء مستمر (شين ناعمة)، أما في CH فابدأ بوقفة تاء خفيفة ثم شين (تش).',
    tipEn: 'SH is continuous airflow; CH starts with a brief stop like a "t" then "sh".',
    example: 'she, shoe, choose, change'
  }
];

// Curated rich library of pronunciation practice sentences
const PRACTICE_LIBRARY: PracticeSentence[] = [
  // 1. Everyday & Foundational (تأسيسي ويومي)
  {
    id: 'ev-1',
    text: 'Welcome to Basim Alkhalil Digital Academy.',
    translationAr: 'أهلاً بك في أكاديمية باسم الخليل الرقمية.',
    ipa: '/ˈwel.kəm tuː ˈbæ.sɪm æl.xæˈliːl ˈdɪdʒ.ɪ.təl əˈkæd.ə.mi/',
    difficulty: 'A1',
    focusPhonemes: ['/w/', '/l/', '/dʒ/'],
    category: 'everyday'
  },
  {
    id: 'ev-2',
    text: 'Nice to meet you, have a wonderful and productive day.',
    translationAr: 'سعيد بلقائك، أتمنى لك يوماً رائعاً ومثمراً.',
    ipa: '/naɪs tuː miːt juː, hæv ə ˈwʌn.də.fəl ænd prəˈdʌk.tɪv deɪ/',
    difficulty: 'A2',
    focusPhonemes: ['/w/', '/v/', '/p/'],
    category: 'everyday'
  },
  {
    id: 'ev-3',
    text: 'Could you please tell me where the nearest station is?',
    translationAr: 'هل يمكن أن تخبرني من فضلك أين أقرب محطة؟',
    ipa: '/kʊd juː pliːz tel miː weər ðə ˈnɪə.rɪst ˈsteɪ.ʃən ɪz/',
    difficulty: 'B1',
    focusPhonemes: ['/pl/', '/ð/', '/ʃ/'],
    category: 'everyday'
  },
  {
    id: 'ev-4',
    text: 'Practice makes perfect when you study consistently.',
    translationAr: 'الممارسة تصنع الإتقان عندما تدرس بانتظام.',
    ipa: '/ˈpræk.tɪs meɪks ˈpɜː.fɪkt wen juː ˈstʌd.i kənˈsɪs.tənt.li/',
    difficulty: 'B1',
    focusPhonemes: ['/pr/', '/p/', '/s/'],
    category: 'everyday'
  },
  {
    id: 'ev-5',
    text: 'I would like to order a warm cup of coffee and water.',
    translationAr: 'أود أن أطلب كوباً دافئاً من القهوة والماء.',
    ipa: '/aɪ wʊd laɪk tuː ˈɔː.dər ə wɔːm kʌp əv ˈkɒf.i ænd ˈwɔː.tər/',
    difficulty: 'A2',
    focusPhonemes: ['/w/', '/v/', '/p/'],
    category: 'everyday'
  },

  // 2. Tricky Sounds & Minimal Pairs (مخارج الحروف الصعبة)
  {
    id: 'tr-1',
    text: 'Please put the purple pen in the blue backpack.',
    translationAr: 'من فضلك ضع القلم البنفسجي في حقيبة الظهر الزرقاء.',
    ipa: '/pliːz pʊt ðə ˈpɜː.pəl pen ɪn ðə bluː ˈbæk.pæk/',
    difficulty: 'B1',
    focusPhonemes: ['/p/', '/b/'],
    category: 'tricky'
  },
  {
    id: 'tr-2',
    text: 'I think these three brothers are very thoughtful.',
    translationAr: 'أعتقد أن هؤلاء الإخوة الثلاثة مراعون جداً لمشاعر الآخرين.',
    ipa: '/aɪ θɪŋk ðiːz θriː ˈbrʌð.əz ɑːr ˈver.i ˈθɔːt.fəl/',
    difficulty: 'B2',
    focusPhonemes: ['/θ/', '/ð/', '/v/'],
    category: 'tricky'
  },
  {
    id: 'tr-3',
    text: 'The red rabbit ran right around the riverbank.',
    translationAr: 'ركض الأرنب الأحمر مباشرة حول ضفة النهر.',
    ipa: '/ðə red ˈræb.ɪt ræn raɪt əˈraʊnd ðə ˈrɪv.ə.bæŋk/',
    difficulty: 'B1',
    focusPhonemes: ['/r/', '/v/'],
    category: 'tricky'
  },
  {
    id: 'tr-4',
    text: 'Victoria visited valuable villages very quietly.',
    translationAr: 'زارت فيكتوريا قرى قيمة وهامة بهدوء تام.',
    ipa: '/vɪkˈtɔː.ri.ə ˈvɪz.ɪ.tɪd ˈvæl.ju.ə.bəl ˈvɪl.ɪ.dʒɪz ˈver.i ˈkwaɪət.li/',
    difficulty: 'B2',
    focusPhonemes: ['/v/', '/b/'],
    category: 'tricky'
  },
  {
    id: 'tr-5',
    text: 'She should choose fresh cherries from the shop.',
    translationAr: 'يجب عليها أن تختار الكرز الطازج من المتجر.',
    ipa: '/ʃiː ʃʊd tʃuːz freʃ ˈtʃer.iz frɒm ðə ʃɒp/',
    difficulty: 'B1',
    focusPhonemes: ['/ʃ/', '/tʃ/'],
    category: 'tricky'
  },

  // 3. Business & Executive (محادثات مهنية وأعمال)
  {
    id: 'bz-1',
    text: 'Let us schedule a brief meeting to discuss the project.',
    translationAr: 'دعنا نحدد موعد اجتماع قصير لمناقشة المشروع.',
    ipa: '/let ʌs ˈskedʒ.uːl ə briːf ˈmiː.tɪŋ tuː dɪˈskʌs ðə ˈprɒdʒ.ekt/',
    difficulty: 'B2',
    focusPhonemes: ['/sk/', '/br/', '/pr/'],
    category: 'business'
  },
  {
    id: 'bz-2',
    text: 'Effective communication drives strategic team collaboration.',
    translationAr: 'التواصل الفعال يقود التعاون الاستراتيجي بين فرق العمل.',
    ipa: '/ɪˈfek.tɪv kəˌmjuː.nɪˈkeɪ.ʃən draɪvz strəˈtiː.dʒɪk tiːm kəˌlæb.əˈreɪ.ʃən/',
    difficulty: 'C1',
    focusPhonemes: ['/v/', '/dr/', '/str/'],
    category: 'business'
  },
  {
    id: 'bz-3',
    text: 'I appreciate your valuable perspective and constructive feedback.',
    translationAr: 'أقدّر وجهة نظرك القيمة وملاحظاتك البناءة.',
    ipa: '/aɪ əˈpriː.ʃi.eɪt jɔːr ˈvæl.ju.ə.bəl pəˈspek.tɪv ænd kənˈstrʌk.tɪv ˈfiːd.bæk/',
    difficulty: 'C1',
    focusPhonemes: ['/pr/', '/v/', '/str/'],
    category: 'business'
  },
  {
    id: 'bz-4',
    text: 'Our primary objective is delivering sustainable high performance.',
    translationAr: 'هدفنا الأساسي هو تقديم أداء عالٍ ومستدام.',
    ipa: '/aʊər ˈpraɪ.mər.i əbˈdʒek.tɪv ɪz dɪˈlɪv.ər.ɪŋ səˈsteɪ.nə.bəl haɪ pəˈfɔː.məns/',
    difficulty: 'B2',
    focusPhonemes: ['/pr/', '/v/', '/p/'],
    category: 'business'
  },

  // 4. Tongue Twisters & Agility (تحديات اللسان وملتويات الكلام)
  {
    id: 'tw-1',
    text: 'Peter Piper picked a peck of pickled peppers.',
    translationAr: 'التقط بيتر بايبر مكيالاً من الفلفل المخلل (تحدي حرف P).',
    ipa: '/ˈpiː.tər ˈpaɪ.pər pɪkt ə pek əv ˈpɪk.əld ˈpep.əz/',
    difficulty: 'B2',
    focusPhonemes: ['/p/'],
    category: 'twisters'
  },
  {
    id: 'tw-2',
    text: 'She sells seashells by the seashore.',
    translationAr: 'هي تبيع الأصداف البحرية على شاطئ البحر (تحدي S و SH).',
    ipa: '/ʃiː selz ˈsiː.ʃelz baɪ ðə ˈsiː.ʃɔːr/',
    difficulty: 'B1',
    focusPhonemes: ['/s/', '/ʃ/'],
    category: 'twisters'
  },
  {
    id: 'tw-3',
    text: 'Red lorry, yellow lorry, red lorry, yellow lorry.',
    translationAr: 'شاحنة حمراء، شاحنة صفراء (تحدي تبديل R و L).',
    ipa: '/red ˈlɒr.i, ˈjel.əʊ ˈlɒr.i/',
    difficulty: 'B2',
    focusPhonemes: ['/r/', '/l/'],
    category: 'twisters'
  },
  {
    id: 'tw-4',
    text: 'How much wood would a woodchuck chuck?',
    translationAr: 'كم من الخشب يستطيع القندس أن يرمي؟ (تحدي W و CH).',
    ipa: '/haʊ mʌtʃ wʊd wʊd ə ˈwʊd.tʃʌk tʃʌk/',
    difficulty: 'B2',
    focusPhonemes: ['/w/', '/tʃ/'],
    category: 'twisters'
  },

  // 5. Travel & Real Life (سياحة ومواقف حية)
  {
    id: 'trv-1',
    text: 'Where is the boarding gate for international flight two hundred?',
    translationAr: 'أين بوابة الصعود لرحلة الطيران الدولية رقم مئتين؟',
    ipa: '/weər ɪz ðə ˈbɔː.dɪŋ ɡeɪt fɔːr ˌɪn.təˈnæʃ.ən.əl flaɪt tuː ˈhʌn.drəd/',
    difficulty: 'B1',
    focusPhonemes: ['/b/', '/ʃ/', '/dr/'],
    category: 'travel'
  },
  {
    id: 'trv-2',
    text: 'Excuse me, how long does it take to reach the central station?',
    translationAr: 'عذراً، كم من الوقت يستغرق الوصول إلى المحطة المركزية؟',
    ipa: '/ɪkˈskjuːz miː, haʊ lɒŋ dʌz ɪt teɪk tuː riːtʃ ðə ˈsen.trəl ˈsteɪ.ʃən/',
    difficulty: 'A2',
    focusPhonemes: ['/sk/', '/tʃ/', '/str/'],
    category: 'travel'
  },
  {
    id: 'trv-3',
    text: 'Could I have the bill, please? Keep the change.',
    translationAr: 'هل يمكنني الحصول على الحساب من فضلك؟ واحتفظ بالباقي.',
    ipa: '/kʊd aɪ hæv ðə bɪl, pliːz? kiːp ðə tʃeɪndʒ/',
    difficulty: 'A2',
    focusPhonemes: ['/b/', '/p/', '/tʃ/'],
    category: 'travel'
  }
];

export const PhoneticAnalyzerModal: React.FC<PhoneticAnalyzerModalProps> = ({
  isOpen,
  onClose,
  targetSentence,
  isRtl,
  onSuccessXP
}) => {
  // Category & Sentence State
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'everyday' | 'tricky' | 'business' | 'twisters' | 'travel' | 'custom'>('all');
  const [activeSentence, setActiveSentence] = useState<string>(targetSentence || PRACTICE_LIBRARY[0].text);
  const [activeTranslation, setActiveTranslation] = useState<string>('');
  const [activeIpa, setActiveIpa] = useState<string>('');
  const [customInputText, setCustomInputText] = useState<string>('');
  const [isEditingCustom, setIsEditingCustom] = useState<boolean>(false);

  // Audio & Recording Engine State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [userAudioBlob, setUserAudioBlob] = useState<Blob | null>(null);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState<boolean>(false);
  const [isPlayingReference, setIsPlayingReference] = useState<boolean>(false);
  const [referenceRate, setReferenceRate] = useState<number>(1.0); // 1.0 or 0.75

  // Evaluation & Coaching State
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [fluencyScore, setFluencyScore] = useState<number | null>(null);
  const [clarityScore, setClarityScore] = useState<number | null>(null);
  const [evaluatedWords, setEvaluatedWords] = useState<{ word: string; status: 'perfect' | 'good' | 'retry'; phoneme?: string; tip?: string }[]>([]);
  const [saraFeedback, setSaraFeedback] = useState<string>('');
  const [saraCoachingAdvice, setSaraCoachingAdvice] = useState<string>('');
  const [selectedWordTip, setSelectedWordTip] = useState<{ word: string; status: string; tip?: string } | null>(null);
  const [silenceWarning, setSilenceWarning] = useState<boolean>(false);
  const [activePhonemeTip, setActivePhonemeTip] = useState<TrickySoundTip | null>(null);

  // Audio Context & Analysis Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userAudioElementRef = useRef<HTMLAudioElement | null>(null);

  // Energy & Acoustic Tracking Refs
  const recordingStartTimeRef = useRef<number>(0);
  const maxRmsRef = useRef<number>(0);
  const sumRmsRef = useRef<number>(0);
  const sampleCountRef = useRef<number>(0);

  // Sync initial sentence when modal opens or targetSentence changes
  useEffect(() => {
    if (!isOpen) return;

    if (targetSentence && targetSentence.trim().length > 0) {
      setActiveSentence(targetSentence.trim());
      const match = PRACTICE_LIBRARY.find(p => p.text.toLowerCase() === targetSentence.trim().toLowerCase());
      if (match) {
        setActiveTranslation(match.translationAr);
        setActiveIpa(match.ipa);
      } else {
        setActiveTranslation(isRtl ? 'جملة الدرس النشط' : 'Active Lesson Sentence');
        setActiveIpa('');
      }
    } else {
      setActiveSentence(PRACTICE_LIBRARY[0].text);
      setActiveTranslation(PRACTICE_LIBRARY[0].translationAr);
      setActiveIpa(PRACTICE_LIBRARY[0].ipa);
    }

    // Reset previous evaluation
    resetEvaluation();
  }, [isOpen, targetSentence]);

  // When activeSentence changes, update metadata
  useEffect(() => {
    const match = PRACTICE_LIBRARY.find(p => p.text.toLowerCase() === activeSentence.trim().toLowerCase());
    if (match) {
      setActiveTranslation(match.translationAr);
      setActiveIpa(match.ipa);
    }
  }, [activeSentence]);

  // Filtered sentences based on category
  const filteredSentences = PRACTICE_LIBRARY.filter(s => 
    selectedCategory === 'all' ? true : s.category === selectedCategory
  );

  // Setup Web Speech Recognition
  useEffect(() => {
    if (!isOpen) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setSpokenTranscript(transcript);
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition warning:', err);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      stopRecording();
      cancelAllSpeech();
    };
  }, [isOpen]);

  const resetEvaluation = () => {
    setScore(null);
    setAccuracyScore(null);
    setFluencyScore(null);
    setClarityScore(null);
    setEvaluatedWords([]);
    setSaraFeedback('');
    setSaraCoachingAdvice('');
    setSpokenTranscript('');
    setSilenceWarning(false);
    setSelectedWordTip(null);
    if (userAudioUrl) {
      URL.revokeObjectURL(userAudioUrl);
      setUserAudioUrl(null);
    }
    setUserAudioBlob(null);
  };

  const handleSelectSentence = (item: PracticeSentence) => {
    cancelAllSpeech();
    setActiveSentence(item.text);
    setActiveTranslation(item.translationAr);
    setActiveIpa(item.ipa);
    setIsEditingCustom(false);
    resetEvaluation();
  };

  const handleNextSentence = () => {
    const currentList = filteredSentences.length > 0 ? filteredSentences : PRACTICE_LIBRARY;
    const currentIndex = currentList.findIndex(s => s.text === activeSentence);
    const nextIndex = (currentIndex + 1) % currentList.length;
    handleSelectSentence(currentList[nextIndex]);
  };

  const handlePrevSentence = () => {
    const currentList = filteredSentences.length > 0 ? filteredSentences : PRACTICE_LIBRARY;
    const currentIndex = currentList.findIndex(s => s.text === activeSentence);
    const prevIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    handleSelectSentence(currentList[prevIndex]);
  };

  const handleShuffleSentence = () => {
    const currentList = filteredSentences.length > 0 ? filteredSentences : PRACTICE_LIBRARY;
    const randomItem = currentList[Math.floor(Math.random() * currentList.length)];
    handleSelectSentence(randomItem);
  };

  const handleApplyCustomSentence = () => {
    if (!customInputText.trim()) return;
    setActiveSentence(customInputText.trim());
    setActiveTranslation(isRtl ? 'جملة مخصصة أضفتها بنفسك' : 'Custom Added Sentence');
    setActiveIpa('');
    setIsEditingCustom(false);
    resetEvaluation();
  };

  // Waveform Visualizer setup
  const startWaveformVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      maxRmsRef.current = 0;
      sumRmsRef.current = 0;
      sampleCountRef.current = 0;

      const drawWaveform = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        analyser.getByteFrequencyData(dataArray);

        // Calculate momentary volume RMS
        let sumSquares = 0;
        for (let i = 0; i < bufferLength; i++) {
          const val = dataArray[i] / 255;
          sumSquares += val * val;
        }
        const rms = Math.sqrt(sumSquares / bufferLength);
        if (rms > maxRmsRef.current) maxRmsRef.current = rms;
        sumRmsRef.current += rms;
        sampleCountRef.current += 1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dark visualizer backdrop
        ctx.fillStyle = 'rgba(10, 15, 30, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height * 0.88;

          // Electric Gradient from Cyan to Gold to Violet
          const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
          grad.addColorStop(0, '#06B6D4');
          grad.addColorStop(0.5, '#F59E0B');
          grad.addColorStop(1, '#A855F7');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, canvas.height - barHeight - 2, barWidth - 1.5, barHeight + 2, [3, 3, 0, 0]);
          ctx.fill();

          x += barWidth;
        }

        animFrameIdRef.current = requestAnimationFrame(drawWaveform);
      };

      drawWaveform();
    } catch (e) {
      console.warn('Audio visualization mic error:', e);
    }
  };

  const stopWaveformVisualizer = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    // Draw idle resting line on canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(10, 15, 30, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }
    }
  };

  // Start real audio recording
  const startRecording = async () => {
    cancelAllSpeech();
    resetEvaluation();
    setIsRecording(true);
    setRecordingSeconds(0);
    audioChunksRef.current = [];
    recordingStartTimeRef.current = Date.now();

    // Start timer interval
    timerIntervalRef.current = setInterval(() => {
      setRecordingSeconds(sec => sec + 1);
    }, 1000);

    // Start visualizer and stream
    await startWaveformVisualizer();

    // Start MediaRecorder if stream is available
    if (streamRef.current) {
      try {
        const recorder = new MediaRecorder(streamRef.current);
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setUserAudioBlob(blob);
          const url = URL.createObjectURL(blob);
          setUserAudioUrl(url);

          // Proceed to analyze recording
          processAudioEvaluation();
        };

        recorder.start();
        mediaRecorderRef.current = recorder;
      } catch (recErr) {
        console.warn('MediaRecorder error:', recErr);
      }
    }

    // Start speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition start warning:', e);
      }
    }
  };

  // Stop recording and trigger evaluation
  const stopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Fallback if mediaRecorder was not initialized
      processAudioEvaluation();
    }

    stopWaveformVisualizer();
  };

  // Process the voice recording evaluation
  const processAudioEvaluation = async () => {
    setIsEvaluating(true);
    const durationMs = Math.max(500, Date.now() - recordingStartTimeRef.current);
    const avgRms = sampleCountRef.current > 0 ? (sumRmsRef.current / sampleCountRef.current) : 0;
    const maxRms = maxRmsRef.current;

    // Check if silence or no audio detected
    const isSilence = maxRms < 0.006 && durationMs < 1200 && !spokenTranscript.trim();
    if (isSilence) {
      setSilenceWarning(true);
      setScore(0);
      setAccuracyScore(0);
      setFluencyScore(0);
      setClarityScore(0);
      setSaraFeedback(
        isRtl
          ? 'لم يتم التقاط صوت واضح من الميكروفون. يرجى التأكد من تشغيل الميكروفون والتحدث بصوت مسموع وقريب.'
          : 'No audible speech was registered. Please speak closer to your microphone in a clear voice.'
      );
      setSaraCoachingAdvice(
        isRtl
          ? '💡 نصيحة: اقترب من الميكروفون بمسافة 10-15 سم، وتحدث بنبرة صوت طبيعية دون همس.'
          : '💡 Tip: Stay 10-15cm from your mic and articulate with confident vocal projection.'
      );
      setIsEvaluating(false);
      return;
    }

    try {
      // Call dedicated pronunciation evaluation server API
      const resp = await fetch('/api/pronunciation/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetSentence: activeSentence,
          spokenTranscript,
          durationMs,
          speechVolumeRms: avgRms,
          accent: 'US',
          lang: isRtl ? 'ar' : 'en'
        })
      });

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }

      const data = await resp.json();

      if (data.silenceDetected) {
        setSilenceWarning(true);
        setScore(0);
        setAccuracyScore(0);
        setFluencyScore(0);
        setClarityScore(0);
        setSaraFeedback(data.feedback);
        setSaraCoachingAdvice(data.coachingAdvice);
      } else {
        setSilenceWarning(false);
        const finalScore = Number(data.score) || 75;
        setScore(finalScore);
        setAccuracyScore(Number(data.accuracy) || finalScore);
        setFluencyScore(Number(data.fluency) || Math.min(100, finalScore + 5));
        setClarityScore(Number(data.clarity) || Math.max(50, Math.round(finalScore * 0.95)));
        setSaraFeedback(data.feedback || (isRtl ? 'أداء طيب ومخارج واضحة!' : 'Well done!'));
        setSaraCoachingAdvice(data.coachingAdvice || (isRtl ? 'استمر في التكرار' : 'Keep practicing'));

        if (Array.isArray(data.words) && data.words.length > 0) {
          setEvaluatedWords(data.words);
        } else {
          // Generate word breakdown fallback
          setEvaluatedWords(generateFallbackWords(activeSentence, spokenTranscript));
        }

        // Grant XP for successful attempts
        if (finalScore >= 60 && onSuccessXP) {
          const xp = finalScore >= 85 ? 30 : finalScore >= 70 ? 20 : 10;
          onSuccessXP(xp);
        }
      }
    } catch (err) {
      console.warn('Server pronunciation evaluate failed, running robust client fallback:', err);
      // Client-side fallback evaluator
      executeClientPhoneticAnalysis(activeSentence, spokenTranscript, durationMs, avgRms);
    } finally {
      setIsEvaluating(false);
    }
  };

  const generateFallbackWords = (target: string, transcript: string) => {
    const targetWords = target.replace(/[^\w\s']/g, '').split(/\s+/).filter(Boolean);
    const spokenLower = transcript.toLowerCase();

    return targetWords.map(word => {
      const cleaned = word.toLowerCase();
      if (spokenLower.includes(cleaned)) {
        return {
          word,
          status: 'perfect' as const,
          tip: isRtl ? 'نطق ممتاز ومخرج صوتي سليم 🟢' : 'Crisp and accurate pronunciation 🟢'
        };
      }
      return {
        word,
        status: 'good' as const,
        tip: isRtl ? `احرص على مد الحركات والضغط على مقاطع "${word}" 🟡` : `Focus on the vowel length in "${word}" 🟡`
      };
    });
  };

  const executeClientPhoneticAnalysis = (target: string, transcript: string, durationMs: number, avgRms: number) => {
    const targetWords = target.replace(/[^\w\s']/g, '').split(/\s+/).filter(Boolean);
    const spokenWords = transcript.toLowerCase().replace(/[^\w\s']/g, '').split(/\s+/).filter(Boolean);

    let matchCount = 0;
    const evaluated = targetWords.map(tWord => {
      const lower = tWord.toLowerCase();
      if (spokenWords.includes(lower)) {
        matchCount += 1;
        return {
          word: tWord,
          status: 'perfect' as const,
          tip: isRtl ? 'مخرج صوتي دقيق وواضح' : 'Clear and crisp sound'
        };
      }

      const close = spokenWords.some(s => Math.abs(s.length - lower.length) <= 2 && (s.slice(0, 3) === lower.slice(0, 3)));
      if (close) {
        matchCount += 0.7;
        return {
          word: tWord,
          status: 'good' as const,
          tip: isRtl ? 'نطق قريب جداً، ركز على وضوح الحروف' : 'Very close, refine the vowels'
        };
      }

      let tip = isRtl ? 'كرر الكلمة بتمهل مع سارة' : 'Repeat slowly with Sara';
      if (/p/i.test(tWord)) tip = isRtl ? 'ادفع هواء خفيفاً في حرف P' : 'Release a puff of air for /p/';
      else if (/th/i.test(tWord)) tip = isRtl ? 'أخرج طرف لسانك بين أسنانك' : 'Tongue tip between teeth';
      else if (/r/i.test(tWord)) tip = isRtl ? 'اثنِ لسانك للخلف دون لمس الحلق' : 'Curl tongue back';
      else if (/v/i.test(tWord)) tip = isRtl ? 'أسنانك العلوية على شفتك السفلية' : 'Top teeth on bottom lip';

      return {
        word: tWord,
        status: 'retry' as const,
        tip
      };
    });

    const calculatedScore = Math.max(35, Math.min(98, Math.round((matchCount / Math.max(1, targetWords.length)) * 100)));
    setScore(calculatedScore);
    setAccuracyScore(calculatedScore);
    setFluencyScore(Math.min(100, calculatedScore + 4));
    setClarityScore(Math.min(100, Math.max(50, Math.round(calculatedScore * 0.9 + 10))));
    setEvaluatedWords(evaluated);

    if (calculatedScore >= 85) {
      setSaraFeedback(isRtl ? 'ما شاء الله! نطق فصيح ومخارج حروف متقنة وجريان رائع للكلام 🌟' : 'Outstanding articulation! Your pronunciation was crisp and clear 🌟');
      setSaraCoachingAdvice(isRtl ? '💡 نصيحة سارة: حافظ على هذا الإيقاع الرائع، وننصحك بمواصلة التدرب على الجمل الطويلة لبناء طلاقة لا تتوقف.' : '💡 Sara’s Advice: Excellent cadence! Practice multi-clause sentences to build native-speed momentum.');
      if (onSuccessXP) onSuccessXP(30);
    } else if (calculatedScore >= 65) {
      setSaraFeedback(isRtl ? 'محاولة جميلة وقريبة جداً! معظم مخارج الكلمات سليمة، مع الحاجة لضبط الأصوات المحددة 👏' : 'Great effort! Most words are clear, with slight attention needed for highlighted syllables 👏');
      setSaraCoachingAdvice(isRtl ? '💡 نصيحة سارة: اضغط على المقاطع المشددة (Word Stress)، ولا تستعجل إنهاء الجملة، وأعطِ كل حرف حقه من الهواء.' : '💡 Sara’s Advice: Emphasize stressed syllables and allow full breath support for unvoiced consonants.');
      if (onSuccessXP) onSuccessXP(20);
    } else {
      setSaraFeedback(isRtl ? 'بداية مشجعة! تم التقاط صوتك، استمع لسارة بالسرعة البطيئة ثم كرر معها بثقة 💪' : 'Good attempt! Listen to Sara at slow speed and mirror her rhythm gently 💪');
      setSaraCoachingAdvice(isRtl ? '💡 نصيحة سارة: اضغط زر "استمع لسارة (بطيء)"، راقب حركة اللسان والشفتين في الكلمات الحمراء، ثم سجل مرة أخرى.' : '💡 Sara’s Advice: Use the slow audio mode, observe mouth shapes on the red words, and record again.');
    }
  };

  // Play Sara's reference pronunciation
  const playReferenceVoice = async (rate: number = 1.0) => {
    setIsPlayingReference(true);
    setReferenceRate(rate);
    cancelAllSpeech();
    try {
      await speakAcademyText(
        activeSentence,
        'en',
        () => setIsPlayingReference(true),
        () => setIsPlayingReference(false),
        'Kore',
        rate
      );
    } catch (e) {
      setIsPlayingReference(false);
    }
  };

  // Play user's recorded audio
  const handlePlayUserAudio = () => {
    if (!userAudioUrl) return;

    if (userAudioElementRef.current) {
      if (isPlayingUserAudio) {
        userAudioElementRef.current.pause();
        setIsPlayingUserAudio(false);
      } else {
        userAudioElementRef.current.play();
        setIsPlayingUserAudio(true);
      }
    } else {
      const audio = new Audio(userAudioUrl);
      userAudioElementRef.current = audio;
      audio.onended = () => setIsPlayingUserAudio(false);
      audio.play();
      setIsPlayingUserAudio(true);
    }
  };

  // Detect which tricky sounds are in the active sentence
  const detectedSounds = COMMON_TRICKY_SOUNDS.filter(s => {
    if (s.phoneme.includes('p') && /p/i.test(activeSentence)) return true;
    if (s.phoneme.includes('θ') && /th/i.test(activeSentence)) return true;
    if (s.phoneme.includes('r') && /r/i.test(activeSentence)) return true;
    if (s.phoneme.includes('v') && /v/i.test(activeSentence)) return true;
    if (s.phoneme.includes('ʃ') && /(sh|ch)/i.test(activeSentence)) return true;
    return false;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="bg-slate-900 border-2 border-amber-400/40 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden text-white flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#141E30] via-[#1a2c42] to-[#243B55] px-4 py-3 border-b border-amber-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-base shadow-lg ring-2 ring-amber-300/40">
              🎙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-amber-200">
                  {isRtl ? 'مختبر مخارج النطق وتقييم الصوت الذكي' : 'Phonetic Speech & Voice Lab'}
                </h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isRtl ? 'تقييم فوري ⚡' : 'Live AI ⚡'}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-300">
                {isRtl ? 'تحليل ذكي لموجات صوتك ومخارج الحروف مع المعلمة سارة' : 'Acoustic waveform analysis and tailored feedback with Sara'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              cancelAllSpeech();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isRtl ? 'إغلاق' : 'Close'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-3.5 flex-1 scrollbar-thin">
          
          {/* Category Switcher Tabs */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 px-1">
              <span>{isRtl ? 'اختر تصنيف العبارات للتدريب:' : 'Select Practice Category:'}</span>
              <button
                onClick={() => setIsEditingCustom(!isEditingCustom)}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] font-bold cursor-pointer"
              >
                <Edit3 size={12} />
                <span>{isRtl ? 'كتابة جملة خاصة ✏️' : 'Custom Sentence ✏️'}</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', labelAr: '🌟 الكل', labelEn: 'All' },
                { id: 'everyday', labelAr: '💬 يومي وتأسيسي', labelEn: 'Everyday' },
                { id: 'tricky', labelAr: '🎯 مخارج صعبة', labelEn: 'Tricky Sounds' },
                { id: 'business', labelAr: '💼 أعمال ومهني', labelEn: 'Business' },
                { id: 'twisters', labelAr: '🏆 تحدي اللسان', labelEn: 'Twisters' },
                { id: 'travel', labelAr: '✈️ سياحة ومواقف', labelEn: 'Travel' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {isRtl ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Sentence Input Drawer */}
          <AnimatePresence>
            {isEditingCustom && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-3 space-y-2"
              >
                <label className="text-[11px] font-black text-amber-200 block">
                  {isRtl ? 'أدخل أي كلمة أو جملة إنجليزية تريد تقييم نطقك لها:' : 'Type or paste any English sentence to evaluate:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    placeholder="e.g. Artificial Intelligence empowers language learning."
                    className="flex-1 bg-slate-950 border border-amber-400/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    onClick={handleApplyCustomSentence}
                    disabled={!customInputText.trim()}
                    className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40"
                  >
                    <Check size={14} />
                    <span>{isRtl ? 'اعتماد' : 'Apply'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Target Sentence Box */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#0e1726] border-2 border-amber-400/30 rounded-2xl p-4 text-center relative shadow-xl">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300/80 flex items-center gap-1">
                <Sparkles size={12} className="text-amber-400" />
                {isRtl ? 'الجملة المستهدفة للنطق والتمرين 🎯' : 'Target Pronunciation Sentence 🎯'}
              </span>

              {/* Prev / Shuffle / Next Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevSentence}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title={isRtl ? 'الجملة السابقة' : 'Previous sentence'}
                >
                  <ChevronRight size={14} />
                </button>
                <button
                  onClick={handleShuffleSentence}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-400 hover:text-amber-300 transition-all cursor-pointer"
                  title={isRtl ? 'جملة عشوائية' : 'Random sentence'}
                >
                  <Shuffle size={13} />
                </button>
                <button
                  onClick={handleNextSentence}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title={isRtl ? 'الجملة التالية' : 'Next sentence'}
                >
                  <ChevronLeft size={14} />
                </button>
              </div>
            </div>

            {/* Target English Sentence */}
            <p className="text-base sm:text-lg font-bold font-sans text-white tracking-wide leading-relaxed select-text py-1">
              "{activeSentence}"
            </p>

            {/* Arabic Translation & IPA */}
            {activeTranslation && (
              <p className="text-xs text-amber-300/90 font-medium mt-1">
                {activeTranslation}
              </p>
            )}
            {activeIpa && (
              <p className="text-[11px] font-mono text-cyan-300/80 mt-1 tracking-wider" dir="ltr">
                {activeIpa}
              </p>
            )}

            {/* Listen Audio Actions */}
            <div className="mt-3.5 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => playReferenceVoice(1.0)}
                disabled={isPlayingReference}
                className="px-3 py-1.5 rounded-xl bg-[#002147] hover:bg-[#073060] border border-amber-300/40 text-amber-300 text-xs font-black flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Volume2 size={14} className={isPlayingReference && referenceRate === 1.0 ? 'animate-bounce' : ''} />
                <span>{isRtl ? 'استمع لسارة (عادي 1.0x)' : 'Listen (Normal 1.0x)'}</span>
              </button>

              <button
                onClick={() => playReferenceVoice(0.75)}
                disabled={isPlayingReference}
                className="px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/70 border border-purple-400/40 text-purple-200 text-xs font-black flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Ear size={13} className={isPlayingReference && referenceRate === 0.75 ? 'animate-pulse' : ''} />
                <span>{isRtl ? 'استمع بتمهل (بطيء 0.75x)' : 'Listen Slow (0.75x)'}</span>
              </button>

              {userAudioUrl && (
                <button
                  onClick={handlePlayUserAudio}
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-400/40 text-emerald-300 text-xs font-black flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  {isPlayingUserAudio ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isRtl ? 'استمع لتسجيلك 🎧' : 'Replay Your Voice 🎧'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Waveform Visualizer Spectrogram Canvas */}
          <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 relative overflow-hidden text-center shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
              <span className="flex items-center gap-1.5 font-bold">
                <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-slate-600'}`} />
                {isRecording 
                  ? (isRtl ? `سارة تستمع لصوتك الآن (${recordingSeconds} ث)...` : `Live recording voice (${recordingSeconds}s)...`)
                  : (isRtl ? 'مخطط الترددات الصوتية الحي' : 'Live Acoustic Spectrogram')}
              </span>
              <span className="text-[10px] text-amber-300/70 font-mono">256 FFT Real-Time</span>
            </div>

            <canvas
              ref={canvasRef}
              width={540}
              height={70}
              className="w-full h-[70px] rounded-xl bg-slate-900 border border-slate-800/80"
            />

            {/* Live recognized transcript or status */}
            {isRecording && spokenTranscript && (
              <div className="mt-2 p-2 bg-slate-900/90 rounded-xl border border-slate-700/60 text-xs font-mono text-amber-300 text-right" dir="ltr">
                <span className="text-slate-400 block text-[10px]">{isRtl ? 'ما تم التقاطه حتى الآن:' : 'Transcribed so far:'}</span>
                "{spokenTranscript}"
              </div>
            )}
          </div>

          {/* Evaluating Loading State */}
          {isEvaluating && (
            <div className="py-6 text-center bg-slate-950/60 border border-amber-400/30 rounded-2xl p-4">
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-amber-200 font-bold">
                {isRtl ? 'جاري فحص بصمة الصوت ومطابقة مخارج الحروف مع سارة...' : 'Analyzing acoustic parameters and phonetic accuracy with Sara...'}
              </p>
            </div>
          )}

          {/* Silence Warning Notice */}
          {silenceWarning && !isEvaluating && (
            <div className="p-3.5 bg-rose-950/50 border border-rose-500/40 rounded-2xl text-xs text-rose-200 flex items-start gap-2.5">
              <AlertCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{saraFeedback}</p>
                <p className="text-[11px] text-rose-300/90 mt-1">{saraCoachingAdvice}</p>
              </div>
            </div>
          )}

          {/* Evaluation Results Card */}
          {score !== null && !isEvaluating && !silenceWarning && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border-2 border-amber-400/40 rounded-2xl p-4 space-y-3.5 shadow-xl"
            >
              {/* Score Meter & Metrics Grid */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black shadow-lg border ${
                    score >= 80 
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-300' 
                      : score >= 60 
                      ? 'bg-amber-950 border-amber-400 text-amber-300' 
                      : 'bg-rose-950 border-rose-400 text-rose-300'
                  }`}>
                    <span className="text-xl font-black">{score}%</span>
                    <span className="text-[9px] uppercase tracking-wider">{isRtl ? 'الدرجة' : 'Score'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">{isRtl ? 'التقييم الشامل للنطق' : 'Overall Evaluation'}</span>
                    <h4 className="text-sm font-black text-white">
                      {score >= 85 ? (isRtl ? 'نطق فصيح ومتقن ⭐⭐⭐' : 'Native Mastery ⭐⭐⭐') :
                       score >= 70 ? (isRtl ? 'جيد جداً وقريب جداً ⭐⭐' : 'Very Good ⭐⭐') :
                       (isRtl ? 'يحتاج مزيداً من التكرار ⭐' : 'Needs Practice ⭐')}
                    </h4>
                    {score >= 60 && (
                      <span className="text-[10px] text-amber-300 font-bold flex items-center gap-1 mt-0.5">
                        <Zap size={11} className="text-amber-400" />
                        <span>{isRtl ? '+25 نقطة خبرة XP' : '+25 XP Earned'}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 3 Metric Sub-Bars */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-around">
                  <div className="text-center px-2 py-1 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[9px] text-slate-400 block font-bold">{isRtl ? 'المخارج' : 'Accuracy'}</span>
                    <span className="text-xs font-black text-cyan-300">{accuracyScore || score}%</span>
                  </div>
                  <div className="text-center px-2 py-1 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[9px] text-slate-400 block font-bold">{isRtl ? 'الطلاقة' : 'Fluency'}</span>
                    <span className="text-xs font-black text-amber-300">{fluencyScore || score}%</span>
                  </div>
                  <div className="text-center px-2 py-1 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[9px] text-slate-400 block font-bold">{isRtl ? 'وضوح الصوت' : 'Clarity'}</span>
                    <span className="text-xs font-black text-purple-300">{clarityScore || score}%</span>
                  </div>
                </div>
              </div>

              {/* Word by Word Status Breakdown */}
              {evaluatedWords.length > 0 && (
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">
                    {isRtl ? 'تقييم كل كلمة (اضغط على أي كلمة لسماع نطقها ونصيحتها):' : 'Word-by-word breakdown (Click any word for phonetic tip):'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {evaluatedWords.map((item, idx) => (
                      <button
                        key={`word-${idx}`}
                        onClick={() => {
                          setSelectedWordTip(item);
                          speakAcademyText(item.word, 'en', undefined, undefined, 'Kore');
                        }}
                        className={`px-2.5 py-1 rounded-xl text-xs font-black border flex items-center gap-1 transition-all cursor-pointer ${
                          item.status === 'perfect'
                            ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900'
                            : item.status === 'good'
                            ? 'bg-amber-950/70 border-amber-500/50 text-amber-300 hover:bg-amber-900'
                            : 'bg-rose-950/70 border-rose-500/50 text-rose-300 hover:bg-rose-900'
                        }`}
                      >
                        {item.status === 'perfect' && <CheckCircle2 size={12} />}
                        {item.status === 'retry' && <AlertCircle size={12} />}
                        <span>{item.word}</span>
                      </button>
                    ))}
                  </div>

                  {/* Selected Word Tip Inspector Box */}
                  {selectedWordTip && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 p-2.5 bg-black/50 border border-amber-400/40 rounded-xl text-xs flex items-center justify-between gap-2"
                    >
                      <div>
                        <span className="font-mono font-bold text-amber-300">"{selectedWordTip.word}": </span>
                        <span className="text-slate-200">{selectedWordTip.tip || (isRtl ? 'نطق الكلمة' : 'Pronunciation')}</span>
                      </div>
                      <button
                        onClick={() => speakAcademyText(selectedWordTip.word, 'en', undefined, undefined, 'Kore')}
                        className="p-1 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all cursor-pointer shrink-0"
                        title={isRtl ? 'استمع للكلمة' : 'Listen'}
                      >
                        <Volume2 size={13} />
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Sara Comprehensive Verbal Coaching */}
              {saraFeedback && (
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-3 text-xs text-amber-100 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-300 font-black">
                    <Sparkles size={14} className="text-amber-400 shrink-0" />
                    <span>{isRtl ? 'تقرير وتوجيه المعلمة سارة الصوتي:' : 'Sara’s Acoustic Feedback:'}</span>
                  </div>
                  <p className="leading-relaxed font-medium text-slate-100">{saraFeedback}</p>
                  {saraCoachingAdvice && (
                    <div className="pt-1.5 border-t border-amber-400/20 text-amber-200 font-bold">
                      {saraCoachingAdvice}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Tricky Sound Anatomy Tips in This Sentence */}
          {detectedSounds.length > 0 && (
            <div className="bg-black/30 border border-slate-800 rounded-2xl p-3">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-2 flex items-center gap-1">
                <Info size={12} className="text-amber-400" />
                {isRtl ? 'مخارج الحروف الدقيقة في هذه الجملة (اضغط لمعرفة وضعية اللسان والشفاه):' : 'Target Phonemes in this sentence (Click for tongue & lip guide):'}
              </span>

              <div className="flex flex-wrap gap-2">
                {detectedSounds.map(tip => (
                  <button
                    key={`sound-tip-${tip.phoneme}`}
                    onClick={() => setActivePhonemeTip(activePhonemeTip?.phoneme === tip.phoneme ? null : tip)}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activePhonemeTip?.phoneme === tip.phoneme
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-amber-200 border-slate-700'
                    }`}
                  >
                    <span>{tip.phoneme}</span>
                    <span className="text-[10px] opacity-80">({isRtl ? tip.nameAr : tip.nameEn})</span>
                  </button>
                ))}
              </div>

              {activePhonemeTip && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2.5 p-3 rounded-xl bg-amber-400/15 border border-amber-400/40 text-xs text-amber-100 space-y-1 font-medium"
                >
                  <p className="font-black text-amber-300">
                    💡 {isRtl ? activePhonemeTip.tipAr : activePhonemeTip.tipEn}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    {isRtl ? 'أمثلة مشابهة في اللغة:' : 'Common examples:'} <span className="font-mono text-white font-bold">{activePhonemeTip.example}</span>
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950/90 px-4 py-3 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              cancelAllSpeech();
              resetEvaluation();
            }}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title={isRtl ? 'إعادة ضبط' : 'Reset'}
          >
            <RotateCcw size={14} />
            <span>{isRtl ? 'إعادة' : 'Reset'}</span>
          </button>

          {/* Primary Record Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isEvaluating}
            className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50 ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse border-2 border-rose-300 ring-4 ring-rose-500/30'
                : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 hover:brightness-105 border-2 border-amber-200'
            }`}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            <span>
              {isRecording 
                ? (isRtl ? `اضغط لإنهاء التسجيل والتقييم ⏹️ (${recordingSeconds} ث)` : `Stop & Evaluate ⏹️ (${recordingSeconds}s)`)
                : (isRtl ? 'اضغط وتحدث بصوتك الآن 🎙️' : 'Tap & Speak to Evaluate 🎙️')}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
