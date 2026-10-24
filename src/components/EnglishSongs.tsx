import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Star,
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  X,
  Info,
  Heart,
} from 'lucide-react';
import { UserProfile } from '../types';
import { ENGLISH_WITH_SONGS_DATA } from '../data/interactiveCurriculum';
import { createManagedAudio, managedSpeak } from '../lib/audio';
import { useT } from '../lib/explainLang';
import {
  SectionShell,
  GoldCard,
  LessonTile,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  TutorFace,
} from './ui/academy';

interface EnglishSongsProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (
    xp: number,
    details?: {
      lessonId: string;
      courseId: string;
      score: number;
      total: number;
      title: string;
      level?: string;
    }
  ) => void;
  initialSongId?: string;
}

export const EnglishSongs: React.FC<EnglishSongsProps> = ({
  lang,
  userProfile: _userProfile,
  onBack: _onBack,
  onXPAdded,
  initialSongId,
}) => {
  const t = useT();
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
  const [selectedSongId, setSelectedSongId] = useState<string>(initialSongId || 'song_001');
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizXPClaimed, setQuizXPClaimed] = useState(false);

  // Custom song entities designed by the child/parent
  const [customSongs, setCustomSongs] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('custom_english_songs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorite bookmarked song IDs
  const [favoriteSongs, setFavoriteSongs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('favorite_english_songs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State to custom build songs
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongTitleAr, setNewSongTitleAr] = useState('');
  const [newSongEngLyrics, setNewSongEngLyrics] = useState('');
  const [newSongArLyrics, setNewSongArLyrics] = useState('');
  const [songTab, setSongTab] = useState<'review' | 'add'>('review');
  const [songsMsg, setSongsMsg] = useState('');

  // Dynamic song details generation based on selected ID
  const getSongData = (id: string) => {
    const customMatch = customSongs.find((s) => s.id === id);
    if (customMatch) {
      return customMatch;
    }

    const meta =
      ENGLISH_WITH_SONGS_DATA.find((s) => s.id === id) || ENGLISH_WITH_SONGS_DATA[0];

    if (id === 'song_001') {
      return {
        title: 'Twinkle Twinkle Little Star',
        titleAr: 'لمعي لمعي أيتها النجمة الصغيرة ✨',
        lyrics: [
          { en: 'Twinkle, twinkle, little star,', ar: 'لمعي، لمعي، أيتها النجمة الصغيرة،' },
          { en: 'How I wonder what you are!', ar: 'كم أتساءل عن حقيقتكِ!' },
          { en: 'Up above the world so high,', ar: 'عالياً فوق هذا العالم المرتفع،' },
          { en: 'Like a diamond in the sky.', ar: 'مثل قطعت ألماس تلمع في السماء.' },
          { en: 'Twinkle, twinkle, little star,', ar: 'لمعي، لمعي، أيتها النجمة الصغيرة،' },
          { en: 'How I wonder what you are!', ar: 'كم أتساءل عن حقيقتكِ!' },
        ],
        vocab: [
          {
            word: 'Twinkle',
            trigger: 'twinkle',
            meaning: 'تلمع / تومض',
            example: 'Stars twinkle in the dark night.',
            emoji: '✨',
          },
          {
            word: 'Wonder',
            trigger: 'wonder',
            meaning: 'يتساءل / يتعجب',
            example: 'I wonder where the birds sleep.',
            emoji: '💭',
          },
          {
            word: 'Above',
            trigger: 'above',
            meaning: 'فوق / في الأعلى',
            example: 'The sky is blue above us.',
            emoji: '☁️',
          },
          {
            word: 'Diamond',
            trigger: 'diamond',
            meaning: 'ألماس / جوهرة',
            example: 'Her ring shines like a diamond.',
            emoji: '💎',
          },
          {
            word: 'Sky',
            trigger: 'sky',
            meaning: 'السماء',
            example: 'Birds are flying in the blue sky.',
            emoji: '🌌',
          },
        ],
        questions: [
          {
            id: 1,
            question: 'What shines high in the sky in this song?',
            questionAr: 'ما الذي يلمع عالياً في السماء في هذه الأغنية؟',
            options: ['A little bird 🐦', 'A little star ⭐', 'A bright airplane ✈️'],
            correctIndex: 1,
            explanation: "The song says: 'Twinkle, twinkle, little star!'",
          },
          {
            id: 2,
            question: 'What looks like a diamond in the sky?',
            questionAr: 'ما الذي يشبّهه الكاتب بقطعة الألماس في السماء؟',
            options: ['The cloud ☁️', 'The golden moon 🌙', 'The twinkling star ⭐'],
            correctIndex: 2,
            explanation:
              "The lyric states: 'Like a diamond in the sky' describing the star.",
          },
          {
            id: 3,
            question: 'Where is the star shining?',
            questionAr: 'أين تلمع هذه النجمة الصغيرة؟',
            options: [
              'Up above the world so high 🌍',
              'Under the deep blue ocean 🌊',
              'In the school garden 🏡',
            ],
            correctIndex: 0,
            explanation:
              "The line says: 'Up above the world so high, like a diamond in the sky.'",
          },
        ],
      };
    }

    if (id === 'song_002') {
      return {
        title: 'Old MacDonald Had a Farm',
        titleAr: 'مزرعة العم ماكدونالد السعيدة 🚜',
        lyrics: [
          {
            en: 'Old MacDonald had a farm, E-I-E-I-O!',
            ar: 'العم ماكدونالد كان لديه مزرعة!',
          },
          {
            en: 'And on his farm he had a cow, E-I-E-I-O!',
            ar: 'وفي مزرعته كان لديه بقرة!',
          },
          {
            en: 'With a moo moo here, and a moo moo there,',
            ar: 'مع صوت موو موو هنا، وموو موو هناك،',
          },
          {
            en: 'Here a moo, there a moo, everywhere a moo moo!',
            ar: 'هنا موو، هناك موو، في كل مكان موو موو!',
          },
        ],
        vocab: [
          {
            word: 'Farm',
            trigger: 'farm',
            meaning: 'مزرعة',
            example: 'Chickens run on the open farm.',
            emoji: '🚜',
          },
          {
            word: 'Cow',
            trigger: 'cow',
            meaning: 'بقرة',
            example: 'The cow gives us fresh milk.',
            emoji: '🐮',
          },
          {
            word: 'Everywhere',
            trigger: 'everywhere',
            meaning: 'في كل مكان',
            example: 'Flowers grow everywhere in spring.',
            emoji: '🌱',
          },
        ],
        questions: [
          {
            id: 1,
            question: 'Whose farm is mentioned in this song?',
            questionAr: 'مزرعة مَن المذكورة في هذه الأغنية؟',
            options: [
              'Old MacDonald 🧑‍🌾',
              'Noor the Explorer 👧',
              'The Flying Captain 🧑‍✈️',
            ],
            correctIndex: 0,
            explanation: "The song starts with: 'Old MacDonald had a farm.'",
          },
          {
            id: 2,
            question: 'What animal sound does the cow make?',
            questionAr: 'ما هو صوت البقرة في هذه الأغنية؟',
            options: ['Quack quack 🦆', 'Meow meow 🐱', 'Moo moo 🐮'],
            correctIndex: 2,
            explanation: "The cow makes the sound 'moo moo'.",
          },
        ],
      };
    }

    return {
      title: meta.title,
      titleAr: isRtl
        ? `${meta.title} (${meta.artist || 'كلاسيكي تفاعلي'}) ✨`
        : `${meta.title} by ${meta.artist || 'Traditional'} ✨`,
      lyrics: [
        {
          en: `We are listening to the beautiful song: ${meta.title}.`,
          ar: `نستمع الآن للأغنية الجميلة التفاعلية: ${meta.title}.`,
        },
        {
          en: `English songs are perfect for learning new words and rhythms!`,
          ar: `الأغاني الإنجليزية هي الطريقة الأفضل لتعلم كلمات ونغمات جديدة للجميع!`,
        },
        {
          en: `Let's practice singing it and recording our progress.`,
          ar: `دعونا نتدرب على ترنيمها وتسجيل نطقنا السليم لها لتعزيز تقدمنا.`,
        },
      ],
      vocab: [
        {
          word: 'Melody',
          trigger: 'melody',
          meaning: 'النغمة / اللحن',
          example: 'This song has a beautiful melody.',
          emoji: '🎵',
        },
        {
          word: 'Rhythm',
          trigger: 'rhythm',
          meaning: 'الإيقاع اللغوي',
          example: 'Clap your hands to the song rhythm.',
          emoji: '👏',
        },
        {
          word: 'Singing',
          trigger: 'singing',
          meaning: 'الغناء والترنيم',
          example: 'Singing makes learning English easier.',
          emoji: '🎤',
        },
      ],
      questions: [
        {
          id: 1,
          question: `What is the correct title of this song?`,
          questionAr: 'ما هو العنوان الصحيح لهذه الأغنية؟',
          options: [meta.title, 'Other Old Melodies 🎻', "Noor's Adventure Song 🗺️"],
          correctIndex: 0,
          explanation: `The title is ${meta.title}.`,
        },
        {
          id: 2,
          question: `Why do we sing along in our Language Lab?`,
          questionAr: 'لماذا نغني ونرنم في معمل اللغويات؟',
          options: [
            'To master correct English rhythm and words 🎙️',
            'To go to sleep early 🛌',
            'To paint a canvas wall 🖌️',
          ],
          correctIndex: 0,
          explanation:
            'Singing along helps build perfect vocabulary, accent, and linguistic intuition.',
        },
      ],
    };
  };

  const songData = getSongData(selectedSongId);

  const handleSelectSong = (id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setActivePlaybackLine(null);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizXPClaimed(false);

    setRecordedBlobUrl(null);
    setRecordingSeconds(0);
    setRecordingXPClaimed(false);

    setSelectedSongId(id);
  };

  useEffect(() => {
    if (initialSongId) {
      handleSelectSong(initialSongId);
    }
  }, [initialSongId]);

  const speakText = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;

      utterance.onstart = () => setIsSpeaking(id);
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);

      managedSpeak(utterance);
    }
  };

  const togglePlaySong = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setActivePlaybackLine(null);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    } else {
      setIsPlaying(true);
      setPlayProgress(0);
      progressTimerRef.current = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setActivePlaybackLine(null);
            if (progressTimerRef.current) clearInterval(progressTimerRef.current);
            return 0;
          }
          const next = prev + 5;
          const lineIndex = Math.min(
            Math.floor((next / 100) * songData.lyrics.length),
            songData.lyrics.length - 1
          );
          setActivePlaybackLine(lineIndex);
          return next;
        });
      }, 1000);

      speakText(
        'Twinkle, twinkle, little star, how I wonder what you are! Up above the world so high, like a diamond in the sky. Twinkle, twinkle, little star, how I wonder what you are!',
        'song'
      );
    }
  };

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
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);

        recordingTimerRef.current = setInterval(() => {
          setRecordingSeconds((prev) => prev + 1);
        }, 1000);
      } else {
        setIsRecording(true);
        recordingTimerRef.current = setInterval(() => {
          setRecordingSeconds((prev) => {
            if (prev >= 10) {
              stopRecording();
              return 10;
            }
            return prev + 1;
          });
        }, 1000);
      }
    } catch (err) {
      console.warn(
        'Could not access microphone directly (may be iframe restrictions). Running audio simulator instead.',
        err
      );
      setIsRecording(true);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 6) {
            setIsRecording(false);
            if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
            setRecordedBlobUrl('simulated_recording.wav');
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
      setIsRecording(false);
      setRecordedBlobUrl('simulated_recording.wav');
    }
  };

  const playRecordedAudio = () => {
    if (!recordedBlobUrl) return;
    if (recordedBlobUrl === 'simulated_recording.wav') {
      setIsRecordingPlayback(true);
      speakText(
        'Twinkle twinkle little star, how I wonder what you are!',
        'vocal_playback'
      );
      setTimeout(() => {
        setIsRecordingPlayback(false);
      }, 4000);
    } else {
      const audio = createManagedAudio(recordedBlobUrl);
      audio.onplay = () => setIsRecordingPlayback(true);
      audio.onended = () => setIsRecordingPlayback(false);
      audio.onerror = () => setIsRecordingPlayback(false);
      audio.play();
    }
  };

  const claimRecordingXP = () => {
    if (recordingXPClaimed) return;
    setRecordingXPClaimed(true);
    if (onXPAdded) {
      const currentSongMeta =
        ENGLISH_WITH_SONGS_DATA.find((s) => s.id === selectedSongId) ||
        ENGLISH_WITH_SONGS_DATA[0];
      const songLevel = currentSongMeta.level === 'أطفال' ? 'Kids' : 'Adults';
      onXPAdded(20, {
        lessonId: String(selectedSongId),
        courseId: 'english_songs',
        score: 10,
        total: 10,
        title: songData.title,
        level: songLevel,
      });
    }
  };

  const handleSelectOption = (qIdx: number, valIdx: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: valIdx }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    songData.questions.forEach((q: any, idx: number) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const gainedXP = correctCount * 10;
    if (gainedXP > 0 && onXPAdded && !quizXPClaimed) {
      const currentSongMeta =
        ENGLISH_WITH_SONGS_DATA.find((s) => s.id === selectedSongId) ||
        ENGLISH_WITH_SONGS_DATA[0];
      const songLevel = currentSongMeta.level === 'أطفال' ? 'Kids' : 'Adults';
      onXPAdded(gainedXP, {
        lessonId: String(selectedSongId),
        courseId: 'english_songs',
        score: correctCount,
        total: songData.questions.length,
        title: songData.title,
        level: songLevel,
      });
      setQuizXPClaimed(true);
    }
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="space-y-6">
        {/* Song List: LessonTile rows with a gold play icon + Small TutorFace (Sara) next to title */}
        <GoldCard className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-3">
            <TutorFace
              tutor="sara"
              size="sm"
              isSpeaking={isPlaying || Boolean(isSpeaking)}
            />
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#002147]">
                {t(
                  'اختر أغنية للبدء في الغناء والترنيم والتحدث:',
                  'Choose a Song to Start Singing, Practicing, and Learning:'
                )}
              </h2>
              <p className="text-xs font-bold text-[#002147]/70">
                {t(
                  'استمع للأغاني، احفظ المفردات، وسجل نطقك لتبهر عائلتك',
                  'Learn basic vocabulary through lovely children songs with voice challenges'
                )}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Kids Category */}
            <div className="space-y-2">
              <p className="text-[11px] uppercase font-black tracking-wider text-[#C49E3A]">
                {t(
                  '👧 أغاني مسلية للأطفال (المستوى الأساسي)',
                  '👧 Fun Kids Songs (Elementary)'
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[...ENGLISH_WITH_SONGS_DATA.filter((s) => s.level === 'أطفال'), ...customSongs].map((s, idx) => (
                  <LessonTile
                    key={s.id}
                    order={idx + 1}
                    title={s.title}
                    emoji="🎵"
                    level="▶"
                    active={selectedSongId === s.id}
                    done={favoriteSongs.includes(s.id)}
                    onClick={() => handleSelectSong(s.id)}
                  />
                ))}
              </div>
            </div>

            {/* Adults Category */}
            <div className="pt-3 border-t border-[#C49E3A]/30 space-y-2">
              <p className="text-[11px] uppercase font-black tracking-wider text-[#002147]">
                {t(
                  '🧑‍💼 أغاني متطورة للكبار واليافعين',
                  '🧑‍💼 Elite Songs for Adults & Juniors'
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ENGLISH_WITH_SONGS_DATA.filter((s) => s.level === 'كبار').map((s, idx) => (
                  <LessonTile
                    key={s.id}
                    order={idx + 1}
                    title={s.title}
                    subtitle={s.artist}
                    emoji="🎶"
                    level="▶"
                    active={selectedSongId === s.id}
                    done={favoriteSongs.includes(s.id)}
                    onClick={() => handleSelectSong(s.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </GoldCard>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 8 cols: Player + Lyrics + Recording + Quiz */}
          <div className="col-span-1 lg:col-span-8 space-y-6">
            {/* Player Area: Navy card with gold frame + Small TutorFace (Sara) next to title */}
            <div className="bg-[#002147] text-white rounded-2xl border-2 border-[#C49E3A] p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <TutorFace
                    tutor="sara"
                    size="sm"
                    isSpeaking={isPlaying || Boolean(isSpeaking)}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3
                        dir="ltr"
                        className="text-[#E6C36A] font-black text-sm sm:text-base capitalize truncate"
                      >
                        {songData.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          const isFav = favoriteSongs.includes(selectedSongId);
                          const nextFavs = isFav
                            ? favoriteSongs.filter((id) => id !== selectedSongId)
                            : [...favoriteSongs, selectedSongId];
                          setFavoriteSongs(nextFavs);
                          localStorage.setItem(
                            'favorite_english_songs',
                            JSON.stringify(nextFavs)
                          );
                        }}
                        className={`p-1.5 rounded-lg border transition-transform active:scale-95 cursor-pointer shrink-0 ${
                          favoriteSongs.includes(selectedSongId)
                            ? 'bg-[#C49E3A] border-[#E6C36A] text-[#002147]'
                            : 'bg-[#001a38] border-[#C49E3A]/40 text-[#E6C36A]'
                        }`}
                        title={t('إضافة إلى المفضلات', 'Add to favorites')}
                      >
                        <Heart
                          size={12}
                          fill={
                            favoriteSongs.includes(selectedSongId)
                              ? 'currentColor'
                              : 'none'
                          }
                        />
                      </button>
                    </div>
                    <p className="text-white/80 text-xs font-bold mt-0.5 truncate">
                      {isRtl ? songData.titleAr : 'Interactive Children Anthem'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                  <div className="flex-1 sm:w-28 bg-[#001a38] border border-[#C49E3A]/40 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C49E3A] h-full transition-all duration-300"
                      style={{ width: `${playProgress}%` }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={togglePlaySong}
                    className="px-4 py-2 bg-[#C49E3A] hover:bg-[#E6C36A] text-[#002147] font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-transform active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C36A]"
                  >
                    {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                    <span>
                      {isPlaying
                        ? t('إيقاف الأغنية', 'PAUSE')
                        : t('شغّل وانطق 🔊', 'PLAY SONG 🔊')}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lyrics in a white GoldCard, current line highlighted in soft gold (#E6C36A) */}
            <GoldCard className="p-4 sm:p-6 space-y-3.5">
              <span className="text-[11px] uppercase font-black text-[#002147]/70 tracking-wider block">
                {t(
                  'كلمات الأنشودة بالإنجليزية والترجمة بالعربية (اضغط للاستماع لكل سطر)',
                  'Click on any lyric line to listen individually:'
                )}
              </span>

              <div className="space-y-2.5">
                {songData.lyrics.map((line: { en: string; ar: string }, index: number) => {
                  const isLinePlaying = activePlaybackLine === index;
                  const isSpeakingThis = isSpeaking === `line_${index}`;
                  const isHighlighted = isLinePlaying || isSpeakingThis;

                  return (
                    <div
                      key={index}
                      onClick={() => speakText(line.en, `line_${index}`)}
                      className={`p-3.5 rounded-2xl border transition-transform active:scale-95 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-2.5 select-none ${
                        isHighlighted
                          ? 'bg-[#E6C36A] border-[#C49E3A] text-[#002147] shadow-sm'
                          : 'bg-[#fdfaf3] border-[#C49E3A]/30 hover:border-[#C49E3A] text-[#002147]'
                      }`}
                    >
                      <div
                        dir="ltr"
                        className="flex items-center gap-2 font-black text-sm sm:text-base text-[#002147] text-left"
                      >
                        <span className="text-xs text-[#C49E3A] font-mono">
                          0{index + 1}.
                        </span>
                        <p className="tracking-tight italic">{line.en}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        <p className="text-xs text-[#002147]/80 font-bold">{line.ar}</p>
                        <span className="p-1.5 bg-[#002147] border border-[#C49E3A] rounded-lg text-[#E6C36A]">
                          <Volume2 size={12} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GoldCard>

            {/* Vocal Practice Singing Task */}
            <GoldCard className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🎤</span>
                <div>
                  <h3 className="font-black text-[#002147] text-base">
                    {t(
                      'تحدي الميكروفون الغنائي (Singing Challenge)',
                      'Singing Challenge!'
                    )}
                  </h3>
                  <p className="text-xs text-[#C49E3A] font-black">
                    {t(
                      'سجل صوتك وأنت تغني بالإنجليزية السطر الأول!',
                      'Sing the first line: "Twinkle, Twinkle, Little Star, How I wonder what you are!"'
                    )}
                  </p>
                </div>
              </div>

              <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer border-2 ${
                      isRecording
                        ? 'bg-[#001a38] text-[#E6C36A] border-[#E6C36A]'
                        : 'bg-[#002147] text-[#E6C36A] border-[#C49E3A]'
                    }`}
                  >
                    {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>

                  <div>
                    <span className="text-[10px] font-black text-[#002147]/60 block uppercase">
                      {isRecording
                        ? t(
                            'جاري الاستماع لصوتك العذب...',
                            'Listening closely to your voice...'
                          )
                        : t('الحالة', 'STATUS')}
                    </span>
                    <strong className="text-sm font-black text-[#002147]">
                      {isRecording
                        ? isRtl
                          ? `جاري التسجيل (${recordingSeconds} ثانية)`
                          : `Recording (${recordingSeconds}s)`
                        : recordedBlobUrl
                        ? t(
                            'توجد أغنية مسجلة جاهزة! 🥳',
                            'Awesome singing recorded!'
                          )
                        : t('جاهز للتحدي', 'Ready to start')}
                    </strong>
                  </div>
                </div>

                {recordedBlobUrl && !isRecording && (
                  <div className="flex flex-wrap items-center gap-2">
                    <GhostButton
                      onClick={playRecordedAudio}
                      className="!px-3.5 !py-2 !text-xs"
                    >
                      <Volume2 size={13} />
                      <span>{t('استمع لتسجيلك 🎧', 'Listen Recording 🎧')}</span>
                    </GhostButton>

                    {!recordingXPClaimed ? (
                      <PrimaryButton
                        onClick={claimRecordingXP}
                        className="!px-3.5 !py-2 !text-xs"
                      >
                        <span>
                          {t('حصد +20 نقطة تفوق 💎', 'Claim +20 XP 💎')}
                        </span>
                      </PrimaryButton>
                    ) : (
                      <span className="text-[#002147] font-black text-xs flex items-center gap-1 bg-[#E6C36A]/35 px-3 py-1.5 rounded-xl border border-[#C49E3A]">
                        <CheckCircle2 size={13} />
                        <span>{t('حصدت الجائزة', 'XP Claimed')}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </GoldCard>

            {/* Song Comprehension Quiz Widget */}
            <GoldCard className="p-4 sm:p-6 space-y-5">
              <div className="border-b border-[#C49E3A]/30 pb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <div>
                    <h3 className="font-black text-[#002147] text-base">
                      {t('أسئلة فهم واستيعاب الأغنية', 'Song Comprehension Test')}
                    </h3>
                    <p className="text-[11px] text-[#002147]/70 font-bold">
                      {t(
                        'أثبت أنك عبقري وحلّ الأسئلة لتنال نقاط تفوق مضاعفة!',
                        'Demonstrate comprehension to earn stars'
                      )}
                    </p>
                  </div>
                </div>

                <GhostButton onClick={resetQuiz} className="!px-3 !py-1.5 !text-xs">
                  <RotateCcw size={12} />
                  <span>{t('تصفير الأسئلة', 'Reset')}</span>
                </GhostButton>
              </div>

              <div className="space-y-4">
                {songData.questions.map((q: any, qIdx: number) => {
                  const selectedOpt = userAnswers[qIdx];

                  return (
                    <div
                      key={q.id}
                      className="space-y-3 bg-[#fdfaf3] p-4 rounded-2xl border border-[#C49E3A]/30"
                    >
                      <div className="space-y-1">
                        <h4
                          dir="ltr"
                          className="font-black text-sm sm:text-base text-[#002147] text-left"
                        >
                          Q{q.id}. {q.question}
                        </h4>
                        {q.questionAr && (
                          <p className="text-xs text-[#002147]/75 font-bold">
                            {q.questionAr}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {q.options.map((opt: string, optIdx: number) => {
                          const isSelected = selectedOpt === optIdx;
                          const isCorrect = optIdx === q.correctIndex;

                          let state: 'normal' | 'correct' | 'wrong' = 'normal';
                          if (quizSubmitted) {
                            if (isCorrect) state = 'correct';
                            else if (isSelected) state = 'wrong';
                          }

                          return (
                            <AnswerOption
                              key={optIdx}
                              label={opt}
                              state={state}
                              selected={isSelected}
                              disabled={quizSubmitted}
                              onClick={() => handleSelectOption(qIdx, optIdx)}
                            />
                          );
                        })}
                      </div>

                      {quizSubmitted && selectedOpt !== undefined && (
                        <p
                          dir="ltr"
                          className="text-xs text-[#002147]/80 font-bold pt-1"
                        >
                          ℹ️ {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <div className="flex justify-end pt-2 border-t border-[#C49E3A]/30">
                  <PrimaryButton
                    disabled={
                      Object.keys(userAnswers).length < songData.questions.length
                    }
                    onClick={handleSubmitQuiz}
                  >
                    <span>
                      {t('إرسال الإجابات وحصد الجوائز 🏆', 'Submit Answers 🏆')}
                    </span>
                  </PrimaryButton>
                </div>
              ) : (
                <div className="p-4 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[#002147] font-black text-sm block">
                      {t(
                        'مبارك! أكملت مراجعة الفهم بنجاح',
                        'Congratulations! Completed comprehension checks'
                      )}
                    </span>
                    <p className="text-[#C49E3A] text-xs font-black">
                      {isRtl
                        ? `حصلت على +${
                            songData.questions.length * 10
                          } نقطة تفوق مضاعفة تم إضافتها فوراً.`
                        : `Earned +${
                            songData.questions.length * 10
                          } XP for your vocabulary mastery.`}
                    </p>
                  </div>
                  <PrimaryButton onClick={resetQuiz} className="!text-xs">
                    <span>{t('إعادة الإجابة', 'Try Again')}</span>
                  </PrimaryButton>
                </div>
              )}
            </GoldCard>
          </div>

          {/* Right 4 cols: Extracted Vocabulary Items */}
          <div className="col-span-1 lg:col-span-4 space-y-4">
            <GoldCard className="p-4 sm:p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#C49E3A]/30 pb-3">
                <span className="text-xl">⭐</span>
                <div>
                  <h3 className="font-black text-[#002147] text-sm uppercase">
                    {t('5 كلمات جديدة من الأغنية', '5 New Words to Learn')}
                  </h3>
                  <p className="text-[11px] text-[#002147]/70 font-bold">
                    {t(
                      'اضغط لسماع الكلمة وطريقة نطقها ومثال عليها',
                      'Extracted premium vocabulary from twilight'
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {songData.vocab.map((item: any) => {
                  const isSpeakingThis = isSpeaking === `vocab_${item.word}`;

                  return (
                    <div
                      key={item.word}
                      onClick={() => speakText(item.word, `vocab_${item.word}`)}
                      className={`p-3.5 rounded-2xl border transition-transform active:scale-95 cursor-pointer bg-[#fdfaf3] ${
                        isSpeakingThis
                          ? 'border-[#C49E3A] ring-2 ring-[#C49E3A]/40'
                          : 'border-[#C49E3A]/30 hover:border-[#C49E3A]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-[#C49E3A]/25 pb-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg bg-white p-1 rounded-lg border border-[#C49E3A]/30">
                            {item.emoji}
                          </span>
                          <h4
                            dir="ltr"
                            className="font-black text-sm sm:text-base text-[#002147] capitalize"
                          >
                            {item.word}
                          </h4>
                        </div>

                        <span className="text-xs font-black text-[#E6C36A] bg-[#002147] px-2.5 py-0.5 rounded-full">
                          {item.meaning}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-[#002147]/60 font-black uppercase tracking-wider block">
                          {t('مثال معبر', 'Example Sentence')}
                        </span>
                        <p
                          dir="ltr"
                          className="text-xs text-[#002147]/80 font-bold leading-relaxed italic"
                        >
                          &ldquo;{item.example}&rdquo;
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#fdfaf3] p-3.5 rounded-2xl border border-[#C49E3A]/30 flex items-start gap-2.5 text-xs text-[#002147]/75 font-bold">
                <Info size={14} className="text-[#C49E3A] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {t(
                    'الأغاني والأناشيد تساعد الأطفال على التقاط الإيقاع اللغوي وحفظ مخارج الحروف الإنجليزية بسلاسة دون مجهود ميكانيكي.',
                    'Encouraging children to hum along creates neural pathways specifically adapted to language acquisition.'
                  )}
                </p>
              </div>
            </GoldCard>
          </div>
        </div>

        {/* Review & Custom Songs Creator Dashboard */}
        <GoldCard className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-5 border-b border-[#C49E3A]/30 gap-3">
            <div>
              <h3 className="text-base font-black text-[#002147] flex items-center gap-2">
                <Star className="text-[#C49E3A]" size={18} fill="currentColor" />
                <span>
                  {t(
                    '🎨 لوحة الإضافة والمراجعة للأناشيد التفاعلية',
                    '🎨 Kids Music Board: Add & Review Songs'
                  )}
                </span>
              </h3>
              <p className="text-xs text-[#002147]/70 font-bold mt-0.5">
                {t(
                  'صمم أناشيد مخصصة لصف طفلك، وراجع الأناشيد المفضلة لديه بلمسات سريعة!',
                  'Compose interactive nursery rhymes, and list bookmarked audio tracks with easy playback!'
                )}
              </p>
            </div>

            <div className="flex gap-1.5 bg-[#fdfaf3] p-1 rounded-2xl border border-[#C49E3A]/40">
              {[
                {
                  id: 'review',
                  label: t('❤️ المفضلة المحفوظة', '❤️ My Bookmarks'),
                },
                {
                  id: 'add',
                  label: t('➕ تصميم أنشودة مخصصة', '➕ Compose New Song'),
                },
              ].map((tabItem) => (
                <button
                  key={tabItem.id}
                  type="button"
                  onClick={() => setSongTab(tabItem.id as 'review' | 'add')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-transform active:scale-95 ${
                    songTab === tabItem.id
                      ? 'bg-[#002147] text-[#E6C36A] shadow-sm'
                      : 'text-[#002147]/70 hover:text-[#002147]'
                  }`}
                >
                  {tabItem.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {songTab === 'review' && (
              <motion.div
                key="song_review"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <h4 className="text-xs font-black text-[#002147]">
                  {isRtl
                    ? `📋 قائمة الأناشيد المفضلة المحصورة حالياً (${favoriteSongs.length}):`
                    : `📋 Bookmarked audio songs list (${favoriteSongs.length}):`}
                </h4>

                {favoriteSongs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {favoriteSongs.map((songId) => {
                      const sMeta = [...ENGLISH_WITH_SONGS_DATA, ...customSongs].find(
                        (it) => it.id === songId
                      );
                      if (!sMeta) return null;

                      return (
                        <div
                          key={songId}
                          className="p-3 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl flex justify-between items-center gap-2"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-2xl bg-white p-1.5 rounded-xl border border-[#C49E3A]/30 shrink-0">
                              🎼
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs font-black text-[#002147] capitalize truncate">
                                {sMeta.title}
                              </p>
                              <span className="text-[10px] text-[#C49E3A] font-black block mt-0.5">
                                {sMeta.level === 'كبار'
                                  ? t('مستوى متقدم', 'Advanced Level')
                                  : t('مستوى الأطفال', 'Kids Level')}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <PrimaryButton
                              onClick={() => handleSelectSong(songId)}
                              className="!px-3 !py-1.5 !text-xs"
                            >
                              <span>{t('تشغيل حاد 🔊', 'Open 🔊')}</span>
                            </PrimaryButton>
                            <button
                              type="button"
                              onClick={() => {
                                const nextFavs = favoriteSongs.filter(
                                  (id) => id !== songId
                                );
                                setFavoriteSongs(nextFavs);
                                localStorage.setItem(
                                  'favorite_english_songs',
                                  JSON.stringify(nextFavs)
                                );
                              }}
                              className="w-8 h-8 bg-white border border-[#C49E3A]/40 text-[#002147] rounded-xl flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-[#fdfaf3] border border-[#C49E3A]/30 p-4 rounded-2xl">
                    <Heart className="text-[#C49E3A] mx-auto mb-2 opacity-60" size={24} />
                    <p className="text-xs text-[#002147] font-black">
                      {t(
                        'لم تختر أي أنشودة مفضلة حتى الآن.',
                        'Bookmarked twilight anthems show up here.'
                      )}
                    </p>
                    <p className="text-[11px] text-[#002147]/70 font-bold mt-1">
                      {t(
                        'انقر على رمز القلب ❤️ بجانب عنوان الأغنية النشطة لحفظها في هذه القائمة والوصول إليها بسرعة.',
                        'Click the Heart bookmark icon next to any active song title to review its lyrics instantly!'
                      )}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {songTab === 'add' && (
              <motion.div
                key="song_add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newSongTitle || !newSongEngLyrics) return;

                    const linesArr = newSongEngLyrics
                      .split('\n')
                      .filter(Boolean)
                      .map((line, idx) => {
                        const rawAr =
                          newSongArLyrics.split('\n')[idx] || 'ترجمة تفاعلية.';
                        return { en: line.trim(), ar: rawAr.trim() };
                      });

                    const designId = `custom_song_${Date.now()}`;
                    const customObj = {
                      id: designId,
                      title: newSongTitle.trim(),
                      titleAr: newSongTitleAr.trim() || 'أنشودة مخصصة ✨',
                      level: 'أطفال',
                      lyrics:
                        linesArr.length > 0
                          ? linesArr
                          : [
                              {
                                en: 'This is a custom interactive nursery rhyme draft.',
                                ar: 'هذه مسودة لأنشودة تفاعلية مخصصة.',
                              },
                              {
                                en: 'Sing with confidence and have fun playing words!',
                                ar: 'رنم بثقة واستمتع بلعب الكلمات اللطيفة!',
                              },
                            ],
                      vocab: [
                        {
                          word: 'Rhyme',
                          trigger: 'rhyme',
                          meaning: 'سجع / قافية لغوية',
                          example: 'Nursery rhymes have a beautiful flow.',
                          emoji: '🌸',
                        },
                        {
                          word: 'Harmony',
                          trigger: 'harmony',
                          meaning: 'تناسق الأصوات والانسجام',
                          example: 'We sing in perfect harmony.',
                          emoji: '✨',
                        },
                      ],
                      questions: [
                        {
                          id: 1,
                          question: 'What language is this song designed in?',
                          questionAr: 'بأي لغة تم تصميم هذه الأنشودة؟',
                          options: ['English Language 🇬🇧', 'Español 🇪🇸', 'French 🇫🇷'],
                          correctIndex: 0,
                          explanation: 'The song is designed in English.',
                        },
                      ],
                    };

                    const updated = [...customSongs, customObj];
                    setCustomSongs(updated);
                    localStorage.setItem(
                      'custom_english_songs',
                      JSON.stringify(updated)
                    );

                    setNewSongTitle('');
                    setNewSongTitleAr('');
                    setNewSongEngLyrics('');
                    setNewSongArLyrics('');

                    setSongsMsg(
                      t(
                        '✨ مبارك! تم إنشاء الأنشودة المخصصة للأطفال بنجاح وأصبحت جاهزة للتشغيل.',
                        '✨ Song configured and added to basic level!'
                      )
                    );
                    setTimeout(() => setSongsMsg(''), 4500);

                    if (onXPAdded) onXPAdded(15);
                  }}
                  className="space-y-4"
                >
                  {songsMsg && (
                    <div className="bg-[#fdfaf3] border border-[#C49E3A] text-[#002147] text-xs font-black p-3 rounded-xl text-center">
                      {songsMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#002147] block">
                        {t('🔑 عنوان الأنشودة بالإنجليزية *:', '🔑 English Song Title *:')}
                      </label>
                      <input
                        type="text"
                        required
                        value={newSongTitle}
                        onChange={(e) => setNewSongTitle(e.target.value)}
                        placeholder="e.g., Row Row Row Your Boat"
                        className="w-full text-xs font-bold bg-white border border-[#C49E3A]/40 rounded-xl p-3 text-[#002147] focus:outline-none focus:border-[#C49E3A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#002147]/70 block">
                        {t('🎨 ترجمة الاسم للعربية:', '🎨 Arabic Translation / Intro:')}
                      </label>
                      <input
                        type="text"
                        value={newSongTitleAr}
                        onChange={(e) => setNewSongTitleAr(e.target.value)}
                        placeholder="مثال: جدّف جدّف بقاربك الصغير مائيًا 🚣‍♂️"
                        className="w-full text-xs font-bold bg-white border border-[#C49E3A]/40 rounded-xl p-3 text-[#002147] focus:outline-none focus:border-[#C49E3A] text-right"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#002147] block">
                        {t(
                          '📝 الكلمات بالإنجليزية (كل سطر منفصل) *:',
                          '📝 English Lyrics (One line per row) *:'
                        )}
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newSongEngLyrics}
                        onChange={(e) => setNewSongEngLyrics(e.target.value)}
                        placeholder="Row, row, row your boat&#10;Gently down the stream&#10;Merrily, merrily, merrily!..."
                        className="w-full text-xs font-mono font-bold bg-white border border-[#C49E3A]/40 rounded-xl p-3 text-[#002147] focus:outline-none focus:border-[#C49E3A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#002147]/70 block">
                        {t(
                          '🎯 الترجمة المقابلة بالعربية (كل سطر منفصل):',
                          '🎯 Corresponding Arabic Translation:'
                        )}
                      </label>
                      <textarea
                        rows={3}
                        value={newSongArLyrics}
                        onChange={(e) => setNewSongArLyrics(e.target.value)}
                        placeholder="جدّف جدّف جدّف بقاربك&#10;بلطفٍ لأسفل المجرى المائي&#10;بكل مرح وبسمات رائعة!..."
                        className="w-full text-xs font-bold bg-white border border-[#C49E3A]/40 rounded-xl p-3 text-[#002147] focus:outline-none focus:border-[#C49E3A] text-right"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <PrimaryButton type="submit" className="!text-xs">
                      <span>
                        {t(
                          'حفظ الأنشودة في المزرعة وتجهيز المشغّل (+15 XP) 💾',
                          'Compile & Save nursery rhyme (+15 XP) 💾'
                        )}
                      </span>
                    </PrimaryButton>
                  </div>
                </form>

                {customSongs.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-[#C49E3A]/30">
                    <h5 className="text-[11px] font-black text-[#002147]/70 tracking-wider mb-2 uppercase">
                      {t(
                        '⚙️ الأناشيد المصممة من قبلك المرفقة بالتطبيق:',
                        '⚙️ Custom compiled rhymes created:'
                      )}
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {customSongs.map((cuSong) => (
                        <div
                          key={cuSong.id}
                          className="p-2.5 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl flex items-center justify-between text-xs"
                        >
                          <span className="font-black text-[#002147] truncate gap-1.5 flex items-center">
                            <span>🎵</span>
                            <span className="capitalize">{cuSong.title}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = customSongs.filter(
                                (c) => c.id !== cuSong.id
                              );
                              setCustomSongs(updated);
                              localStorage.setItem(
                                'custom_english_songs',
                                JSON.stringify(updated)
                              );
                              if (favoriteSongs.includes(cuSong.id)) {
                                setFavoriteSongs((prev) =>
                                  prev.filter((id) => id !== cuSong.id)
                                );
                              }
                              setSelectedSongId('song_001');
                            }}
                            className="p-1 text-[#002147]/70 hover:text-[#002147] rounded-lg cursor-pointer"
                            title={t('حذف', 'Delete')}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </GoldCard>
      </div>
    </SectionShell>
  );
};
