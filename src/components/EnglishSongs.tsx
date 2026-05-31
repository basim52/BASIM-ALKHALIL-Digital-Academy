import React, { useState, useRef } from 'react';
import { 
  Music, 
  Volume2, 
  Award, 
  Star, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  HelpCircle, 
  RotateCcw, 
  CheckCircle2, 
  X, 
  Check, 
  Info, 
  Heart,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';
import { ENGLISH_WITH_SONGS_DATA } from '../data/interactiveCurriculum';

interface EnglishSongsProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (xp: number) => void;
}

export const EnglishSongs: React.FC<EnglishSongsProps> = ({
  lang,
  userProfile,
  onBack,
  onXPAdded
}) => {
  const isRtl = lang === 'ar';

  // Audio Playback Player simulation states
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [activePlaybackLine, setActivePlaybackLine] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Recording feature simulation
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [isRecordingPlayback, setIsRecordingPlayback] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingXPClaimed, setRecordingXPClaimed] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Comprehension questions states
  const [selectedSongId, setSelectedSongId] = useState<string>('song_001');
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizXPClaimed, setQuizXPClaimed] = useState(false);

  // Dynamic song details generation based on selected ID
  const getSongData = (id: string) => {
    const meta = ENGLISH_WITH_SONGS_DATA.find(s => s.id === id) || ENGLISH_WITH_SONGS_DATA[0];
    
    if (id === 'song_001') {
      return {
        title: "Twinkle Twinkle Little Star",
        titleAr: "لمعي لمعي أيتها النجمة الصغيرة ✨",
        lyrics: [
          { en: "Twinkle, twinkle, little star,", ar: "لمعي، لمعي، أيتها النجمة الصغيرة،" },
          { en: "How I wonder what you are!", ar: "كم أتساءل عن حقيقتكِ!" },
          { en: "Up above the world so high,", ar: "عالياً فوق هذا العالم المرتفع،" },
          { en: "Like a diamond in the sky.", ar: "مثل قطعت ألماس تلمع في السماء." },
          { en: "Twinkle, twinkle, little star,", ar: "لمعي، لمعي، أيتها النجمة الصغيرة،" },
          { en: "How I wonder what you are!", ar: "كم أتساءل عن حقيقتكِ!" }
        ],
        vocab: [
          { word: "Twinkle", trigger: "twinkle", meaning: "تلمع / تومض", example: "Stars twinkle in the dark night.", emoji: "✨" },
          { word: "Wonder", trigger: "wonder", meaning: "يتساءل / يتعجب", example: "I wonder where the birds sleep.", emoji: "💭" },
          { word: "Above", trigger: "above", meaning: "فوق / في الأعلى", example: "The sky is blue above us.", emoji: "☁️" },
          { word: "Diamond", trigger: "diamond", meaning: "ألماس / جوهرة", example: "Her ring shines like a diamond.", emoji: "💎" },
          { word: "Sky", trigger: "sky", meaning: "السماء", example: "Birds are flying in the blue sky.", emoji: "🌌" }
        ],
        questions: [
          {
            id: 1,
            question: "What shines high in the sky in this song?",
            questionAr: "ما الذي يلمع عالياً في السماء في هذه الأغنية؟",
            options: ["A little bird 🐦", "A little star ⭐", "A bright airplane ✈️"],
            correctIndex: 1,
            explanation: "The song says: 'Twinkle, twinkle, little star!'"
          },
          {
            id: 2,
            question: "What looks like a diamond in the sky?",
            questionAr: "ما الذي يشبّهه الكاتب بقطعة الألماس في السماء؟",
            options: ["The cloud ☁️", "The golden moon 🌙", "The twinkling star ⭐"],
            correctIndex: 2,
            explanation: "The lyric states: 'Like a diamond in the sky' describing the star."
          },
          {
            id: 3,
            question: "Where is the star shining?",
            questionAr: "أين تلمع هذه النجمة الصغيرة؟",
            options: ["Up above the world so high 🌍", "Under the deep blue ocean 🌊", "In the school garden 🏡"],
            correctIndex: 0,
            explanation: "The line says: 'Up above the world so high, like a diamond in the sky.'"
          }
        ]
      };
    }

    if (id === 'song_002') {
      return {
        title: "Old MacDonald Had a Farm",
        titleAr: "مزرعة العم ماكدونالد السعيدة 🚜",
        lyrics: [
          { en: "Old MacDonald had a farm, E-I-E-I-O!", ar: "العم ماكدونالد كان لديه مزرعة!" },
          { en: "And on his farm he had a cow, E-I-E-I-O!", ar: "وفي مزرعته كان لديه بقرة!" },
          { en: "With a moo moo here, and a moo moo there,", ar: "مع صوت موو موو هنا، وموو موو هناك،" },
          { en: "Here a moo, there a moo, everywhere a moo moo!", ar: "هنا موو، هناك موو، في كل مكان موو موو!" }
        ],
        vocab: [
          { word: "Farm", trigger: "farm", meaning: "مزرعة", example: "Chickens run on the open farm.", emoji: "🚜" },
          { word: "Cow", trigger: "cow", meaning: "بقرة", example: "The cow gives us fresh milk.", emoji: "🐮" },
          { word: "Everywhere", trigger: "everywhere", meaning: "في كل مكان", example: "Flowers grow everywhere in spring.", emoji: "🌱" }
        ],
        questions: [
          {
            id: 1,
            question: "Whose farm is mentioned in this song?",
            questionAr: "مزرعة مَن المذكورة في هذه الأغنية؟",
            options: ["Old MacDonald 🧑‍🌾", "Noor the Explorer 👧", "The Flying Captain 🧑‍✈️"],
            correctIndex: 0,
            explanation: "The song starts with: 'Old MacDonald had a farm.'"
          },
          {
            id: 2,
            question: "What animal sound does the cow make?",
            questionAr: "ما هو صوت البقرة في هذه الأغنية؟",
            options: ["Quack quack 🦆", "Meow meow 🐱", "Moo moo 🐮"],
            correctIndex: 2,
            explanation: "The cow makes the sound 'moo moo'."
          }
        ]
      };
    }

    const isKids = meta.level === 'أطفال';
    return {
      title: meta.title,
      titleAr: isRtl ? `${meta.title} (${meta.artist || 'كلاسيكي تفاعلي'}) ✨` : `${meta.title} by ${meta.artist || 'Traditional'} ✨`,
      lyrics: [
        { en: `We are listening to the beautiful song: ${meta.title}.`, ar: `نستمع الآن للأغنية الجميلة التفاعلية: ${meta.title}.` },
        { en: `English songs are perfect for learning new words and rhythms!`, ar: `الأغاني الإنجليزية هي الطريقة الأفضل لتعلم كلمات ونغمات جديدة للجميع!` },
        { en: `Let's practice singing it and recording our progress.`, ar: `دعونا نتدرب على ترنيمها وتسجيل نطقنا السليم لها لتعزيز تقدمنا.` }
      ],
      vocab: [
        { word: "Melody", trigger: "melody", meaning: "النغمة / اللحن", example: "This song has a beautiful melody.", emoji: "🎵" },
        { word: "Rhythm", trigger: "rhythm", meaning: "الإيقاع اللغوي", example: "Clap your hands to the song rhythm.", emoji: "👏" },
        { word: "Singing", trigger: "singing", meaning: "الغناء والترنيم", example: "Singing makes learning English easier.", emoji: "🎤" }
      ],
      questions: [
        {
          id: 1,
          question: `What is the correct title of this song?`,
          questionAr: "ما هو العنوان الصحيح لهذه الأغنية؟",
          options: [meta.title, "Other Old Melodies 🎻", "Noor's Adventure Song 🗺️"],
          correctIndex: 0,
          explanation: `The title is ${meta.title}.`
        },
        {
          id: 2,
          question: `Why do we sing along in our Language Lab?`,
          questionAr: "لماذا نغني ونرنم في معمل اللغويات؟",
          options: ["To master correct English rhythm and words 🎙️", "To go to sleep early 🛌", "To paint a canvas wall 🖌️"],
          correctIndex: 0,
          explanation: "Singing along helps build perfect vocabulary, accent, and linguistic intuition."
        }
      ]
    };
  };

  const songData = getSongData(selectedSongId);

  const handleSelectSong = (id: string) => {
    // Clean up current playbacks
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setActivePlaybackLine(null);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    
    // Reset quiz
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizXPClaimed(false);
    
    // Reset voice recording
    setRecordedBlobUrl(null);
    setRecordingSeconds(0);
    setRecordingXPClaimed(false);
    
    setSelectedSongId(id);
  };

  // Text to Speech
  const speakText = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // slightly slower for comprehension

      utterance.onstart = () => setIsSpeaking(id);
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Simulation timer for Song Player
  const togglePlaySong = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setActivePlaybackLine(null);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    } else {
      setIsPlaying(true);
      setPlayProgress(0);
      progressTimerRef.current = setInterval(() => {
        setPlayProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            setActivePlaybackLine(null);
            if (progressTimerRef.current) clearInterval(progressTimerRef.current);
            return 0;
          }
          const next = prev + 5;
          // Calculate active line based on percentage
          const lineIndex = Math.min(Math.floor((next / 100) * songData.lyrics.length), songData.lyrics.length - 1);
          setActivePlaybackLine(lineIndex);
          return next;
        });
      }, 1000);

      // Play introductory synthesis or keep track
      speakText("Twinkle, twinkle, little star, how I wonder what you are! Up above the world so high, like a diamond in the sky. Twinkle, twinkle, little star, how I wonder what you are!", "song");
    }
  };

  // Recording API Implementation (or fallback simulator)
  const startRecording = async () => {
    setRecordedBlobUrl(null);
    setRecordingSeconds(0);
    audioChunksRef.current = [];

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setRecordedBlobUrl(audioUrl);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);

        recordingTimerRef.current = setInterval(() => {
          setRecordingSeconds(prev => prev + 1);
        }, 1000);
      } else {
        // Fallback simulated recording
        setIsRecording(true);
        recordingTimerRef.current = setInterval(() => {
          setRecordingSeconds(prev => {
            if (prev >= 10) {
              stopRecording();
              return 10;
            }
            return prev + 1;
          });
        }, 1000);
      }
    } catch (err) {
      console.warn("Could not access microphone directly (may be iframe restrictions). Running audio simulator instead.", err);
      setIsRecording(true);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 6) {
            setIsRecording(false);
            if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
            setRecordedBlobUrl("simulated_recording.wav");
            return 6;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      // simulator stop
      setIsRecording(false);
      setRecordedBlobUrl("simulated_recording.wav");
    }
  };

  const playRecordedAudio = () => {
    if (!recordedBlobUrl) return;
    if (recordedBlobUrl === "simulated_recording.wav") {
      setIsRecordingPlayback(true);
      speakText("Twinkle twinkle little star, how I wonder what you are!", "vocal_playback");
      setTimeout(() => {
        setIsRecordingPlayback(false);
      }, 4000);
    } else {
      const audio = new Audio(recordedBlobUrl);
      audio.onplay = () => setIsRecordingPlayback(true);
      audio.onended = () => setIsRecordingPlayback(false);
      audio.onerror = () => setIsRecordingPlayback(false);
      audio.play();
    }
  };

  // Claims XP for voice recording
  const claimRecordingXP = () => {
    if (recordingXPClaimed) return;
    setRecordingXPClaimed(true);
    if (onXPAdded) onXPAdded(20);
  };

  // Submits context quiz
  const handleSelectOption = (qIdx: number, valIdx: number) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qIdx]: valIdx }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    // count score
    let correctCount = 0;
    songData.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const gainedXP = correctCount * 10;
    if (gainedXP > 0 && onXPAdded && !quizXPClaimed) {
      onXPAdded(gainedXP);
      setQuizXPClaimed(true);
    }
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF5] pb-24 text-slate-800">
      {/* Curved background top banner */}
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-[#E3F2FD] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 pt-6 relative z-10">
        
        {/* Navigation / Header */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-blue-100 ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/10 shrink-0">
              <Music size={24} className="animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#002147] tracking-tight">
                {isRtl ? 'الإنجليزية عبر الأغاني 🎵' : 'English With Songs 🎵'}
              </h1>
              <p className="text-xs text-blue-700 font-bold tracking-widest mt-0.5">
                {isRtl ? 'استمع للأغاني، احفظ المفردات، وسجل نطقك لتبهر عائلتك' : 'Learn basic vocabulary through lovely children songs with voice challenges'}
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

        {/* Song Selectors Pane */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 mb-6 space-y-4">
          <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
            <span className="text-xl">✨</span>
            <h2 className="text-base font-black text-[#002147]">
              {isRtl ? 'اختر أغنية للبدء في الغناء والترنيم والتحدث:' : 'Choose a Song to Start Singing, Practicing, and Learning:'}
            </h2>
          </div>
          
          <div className="space-y-3">
            {/* Kids category */}
            <div>
              <p className={`text-[10px] uppercase font-black tracking-wider text-blue-600 mb-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                {isRtl ? '👧 أغاني مسلية للأطفال (المستوى الأساسي)' : '👧 Fun Kids Songs (Elementary)'}
              </p>
              <div className="flex flex-wrap gap-2 justify-start">
                {ENGLISH_WITH_SONGS_DATA.filter(s => s.level === 'أطفال').map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSong(s.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
                      selectedSongId === s.id
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10 scale-95'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    🎵 {s.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Adults category */}
            <div className="pt-2 border-t border-slate-100">
              <p className={`text-[10px] uppercase font-black tracking-wider text-emerald-600 mb-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                {isRtl ? '🧑‍💼 أغاني متطورة للكبار واليافعين' : '🧑‍💼 Elite Songs for Adults & Juniors'}
              </p>
              <div className="flex flex-wrap gap-2 justify-start">
                {ENGLISH_WITH_SONGS_DATA.filter(s => s.level === 'كبار').map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSong(s.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
                      selectedSongId === s.id
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/10 scale-95'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    🎶 {s.title} <span className="opacity-75 text-[10px] font-normal">({s.artist})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Outer Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: Song Player and Translation Lyrics (8 cols) */}
          <div className="col-span-1 lg:col-span-8 space-y-6">
            
            {/* Playback Container Box */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
              
              {/* Media Player Head */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#EDF7FF] rounded-2xl p-4 border border-blue-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⭐</span>
                  <div>
                    <h3 className="text-slate-800 font-black text-sm capitalize">{songData.title}</h3>
                    <p className="text-blue-700 text-[10px] font-bold mt-0.5">{isRtl ? songData.titleAr : 'Interactive Children Anthem'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Progress Indicator Slider (Disabled) */}
                  <div className="flex-1 sm:w-28 bg-slate-200 h-1 rounded-full overflow-hidden relative">
                    <div 
                      className="bg-blue-500 h-full transition-all duration-300" 
                      style={{ width: `${playProgress}%` }}
                    />
                  </div>

                  <button
                    onClick={togglePlaySong}
                    className={`px-4 py-2 bg-blue-600 text-white font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all hover:bg-blue-700 ${
                      isPlaying ? 'animate-pulse' : ''
                    }`}
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                    <span>{isPlaying ? (isRtl ? 'إيقاف الأغنية' : 'PAUSE') : (isRtl ? 'شغّل وانطق 🔊' : 'PLAY SONG 🔊')}</span>
                  </button>
                </div>
              </div>

              {/* Display lyrics line by line */}
              <div className="space-y-3.5 pt-2">
                <span className="text-[9px] uppercase font-black text-blue-700 tracking-wider">
                  {isRtl ? 'كلمات الأنشودة بالإنجليزية والترجمة بالعربية (اضغط للاستماع لكل سطر отдельно)' : 'Click on any lyric line to listen individually:'}
                </span>

                <div className="space-y-2">
                  {songData.lyrics.map((line, index) => {
                    const isLinePlaying = activePlaybackLine === index;
                    const isSpeakingThis = isSpeaking === `line_${index}`;

                    return (
                      <div
                        key={index}
                        onClick={() => speakText(line.en, `line_${index}`)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 text-right select-none ${
                          isLinePlaying || isSpeakingThis
                            ? 'bg-[#E3F2FD] border-blue-300 text-slate-800 scale-[1.01] shadow-xs'
                            : 'bg-[#fafafa]/50 border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-sans font-black text-sm md:text-base text-[#002147] text-left">
                          <span className="text-xs text-blue-400 font-mono">0{index + 1}.</span>
                          <p className="tracking-tight italic">{line.en}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2 shrink-0">
                          <p className="text-xs text-slate-500 font-bold">{line.ar}</p>
                          <span className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 text-[10px]">
                            <Volume2 size={12} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Vocal Practice singing task */}
            <div className="bg-[#FFFCEF] rounded-3xl border border-amber-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🎤</span>
                <div>
                  <h3 className="font-extrabold text-[#002147] text-base">{isRtl ? 'تحدي الميكروفون الغنائي (Singing Challenge) 🌟' : 'Singing Challenge! 🌟'}</h3>
                  <p className="text-xs text-amber-800 font-bold">
                    {isRtl ? 'سجل صوتك وأنت تغني بالإنجليزية السطر الأول!' : 'Sing the first line: "Twinkle, Twinkle, Little Star, How I wonder what you are!"'}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-amber-100 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Visual mic controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all cursor-pointer ${
                      isRecording 
                        ? 'bg-rose-600 animate-pulse hover:bg-rose-700' 
                        : 'bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20'
                    }`}
                  >
                    {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
                  </button>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">
                      {isRecording ? (isRtl ? 'جاري الاستماع لصوتك العذب...' : 'Listening closely to your voice...') : (isRtl ? 'الحالة' : 'STATUS')}
                    </span>
                    <strong className="text-sm font-black text-[#002147]">
                      {isRecording 
                        ? (isRtl ? `جاري التسجيل (${recordingSeconds} ثانية)` : `Recording (${recordingSeconds}s)`) 
                        : (recordedBlobUrl ? (isRtl ? 'توجد أغنية مسجلة جاهزة! 🥳' : 'Awesome singing recorded!') : (isRtl ? 'جاهز للتحدي' : 'Ready to start'))}
                    </strong>
                  </div>
                </div>

                {/* Simulated waveforms */}
                {isRecording && (
                  <div className="flex items-center gap-1 my-2">
                    <span className="w-1.5 h-6 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-1.5 h-10 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    <span className="w-1.5 h-7 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                    <span className="w-1.5 h-12 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-4 bg-red-300 rounded-full animate-bounce" style={{ animationDelay: '0.7s' }} />
                  </div>
                )}

                {/* Actions on audio track */}
                {recordedBlobUrl && !isRecording && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={playRecordedAudio}
                      className={`px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black rounded-xl cursor-pointer flex items-center gap-2 ${
                        isRecordingPlayback ? 'animate-bounce' : ''
                      }`}
                    >
                      <Volume2 size={13} />
                      <span>{isRtl ? 'استمع لتسجيلك 🎧' : 'Listen Recording 🎧'}</span>
                    </button>

                    {!recordingXPClaimed ? (
                      <button
                        onClick={claimRecordingXP}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl cursor-pointer"
                      >
                        {isRtl ? 'حصد +20 نقطة تفوق 💎' : 'Claim +20 XP 💎'}
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-extrabold text-xs flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                        <CheckCircle2 size={13} />
                        <span>{isRtl ? 'حصدت الجائزة' : 'XP Claimed'}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Song Comprehension Quiz Widget */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="border-b pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <div>
                    <h3 className="font-extrabold text-[#002147] text-base">{isRtl ? 'أسئلة فهم واستيعاب الأغنية' : 'Song Comprehension Test'}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold">{isRtl ? 'أثبت أنك عبقري وحلّ الأسئلة لتنال نقاط تفوق مضاعفة!' : 'Demonstrate comprehension to earn stars'}</p>
                  </div>
                </div>

                <button
                  onClick={resetQuiz}
                  className="p-1 px-2.5 bg-slate-50 border hover:bg-slate-100 rounded-lg font-bold text-[10px] text-slate-500 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={10} />
                  <span>{isRtl ? 'تصفير الأسئلة' : 'Reset'}</span>
                </button>
              </div>

              <div className="space-y-6">
                {songData.questions.map((q, qIdx) => {
                  const selectedOpt = userAnswers[qIdx];
                  const hasAnswered = selectedOpt !== undefined;

                  return (
                    <div key={q.id} className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      <div className="space-y-1 block md:flex md:items-center md:justify-between text-right">
                        <h4 className="font-sans font-black text-base text-[#002147] text-left">
                          Q{q.id}. {q.question}
                        </h4>
                        {q.questionAr && (
                          <p className="text-xs text-slate-500 font-bold block">{q.questionAr}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedOpt === optIdx;
                          const isCorrect = optIdx === q.correctIndex;

                          let choiceStyle = "bg-white border-slate-200 text-slate-700 hover:border-slate-300";
                          if (quizSubmitted) {
                            if (isCorrect) {
                              choiceStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-black";
                            } else if (isSelected) {
                              choiceStyle = "bg-red-50 border-red-400 text-red-800 font-black";
                            } else {
                              choiceStyle = "bg-white border-slate-150 text-slate-350 opacity-60";
                            }
                          } else if (isSelected) {
                            choiceStyle = "bg-blue-50 border-blue-400 text-blue-800 font-black";
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleSelectOption(qIdx, optIdx)}
                              className={`p-3 rounded-xl border-2 text-xs font-bold transition-all text-center cursor-pointer relative overflow-hidden select-none ${choiceStyle}`}
                            >
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && selectedOpt !== undefined && (
                        <p className="text-[10px] text-slate-400 leading-normal pl-2 font-mono">
                          ℹ️ {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Quiz actions footer */}
              {!quizSubmitted ? (
                <div className="flex justify-end pt-2 border-t">
                  <button
                    disabled={Object.keys(userAnswers).length < songData.questions.length}
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2.5 bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    {isRtl ? 'إرسال الإجابات وحصد الجوائز 🏆' : 'Submit Answers 🏆'}
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div>
                    <span className="text-emerald-800 font-black text-sm block">
                      {isRtl ? 'مبارك! أكملت مراجعة الفهم بنجاح' : 'Congratulations! Completed comprehension checks'}
                    </span>
                    <p className="text-emerald-600 text-[10px] font-bold">
                      {isRtl ? `حصلت على +${songData.questions.length * 10} نقطة تفوق مضاعفة تم إضافتها فوراً.` : `Earned +${songData.questions.length * 10} XP for your vocabulary mastery.`}
                    </p>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="px-4 py-2 bg-[#002147] text-white text-xs font-black rounded-lg hover:bg-[#002d5d] cursor-pointer"
                  >
                    {isRtl ? 'إعادة الإجابة' : 'Try Again'}
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Column 2: Extracted 5 Vocabulary Items (4 cols) */}
          <div className="col-span-1 lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
              
              <div className="flex items-center gap-2 border-b pb-3">
                <span className="text-xl">⭐️</span>
                <div>
                  <h3 className="font-extrabold text-[#002147] text-sm uppercase">
                    {isRtl ? '5 كلمات جديدة من الأغنية' : '5 New Words to Learn'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold">{isRtl ? 'اضغط لسماع الكلمة وطريقة نطقها ومثال عليها' : 'Extracted premium vocabulary from twilight'}</p>
                </div>
              </div>

              <div className="space-y-3">
                {songData.vocab.map((item) => {
                  const isSpeakingThis = isSpeaking === `vocab_${item.word}`;

                  return (
                    <div
                      key={item.word}
                      onClick={() => speakText(item.word, `vocab_${item.word}`)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative bg-[#FCFAF0]/80 hover:bg-amber-50/50 group ${
                        isSpeakingThis ? 'border-amber-400 bg-amber-50/30 ring-2 ring-amber-300/10' : 'border-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-amber-100/60 pb-1.5 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg bg-white p-1 rounded-lg border shadow-3xs">{item.emoji}</span>
                          <h4 className="font-sans font-black text-sm md:text-base text-slate-800 capitalize leading-none">{item.word}</h4>
                        </div>

                        <span className="text-xs font-black text-amber-600 block bg-amber-100/40 px-2 py-0.5 rounded-lg">
                          {item.meaning}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                          {isRtl ? 'مثال معبر' : 'Example Sentence'}
                        </span>
                        <p className="text-[11px] text-slate-500 font-bold leading-relaxed italic pr-4">
                          &ldquo; {item.example} &rdquo;
                        </p>
                      </div>

                      {/* Speaking indicator overlay */}
                      {isSpeakingThis && (
                        <div className="absolute right-3.5 bottom-3.5 flex items-center gap-0.5">
                          <span className="w-1 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <span className="w-1 h-4 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                          <span className="w-1 h-2.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Family recommendation */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex items-start gap-2.5 text-[10px] text-slate-400 mt-2">
                <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {isRtl
                    ? 'الأغاني والأناشيد تساعد الأطفال على التقاط الإيقاع اللغوي وحفظ مخارج الحروف الإنجليزية بسلاسة دون مجهود ميكانيكي.'
                    : 'Encouraging children to hum along creates neural pathways specifically adapted to language acquisition.'}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
