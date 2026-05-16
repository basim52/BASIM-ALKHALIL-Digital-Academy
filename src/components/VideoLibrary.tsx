import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { 
  Play, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Youtube,
  Trophy,
  BrainCircuit,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { UserProfile, CreditCost, MASTER_ADMINS } from '../types';
import { deductCredits } from '../lib/firebase';

interface VideoLesson {
  id: string;
  youtubeId: string;
  titleEn: string;
  titleAr: string;
  level: string;
  duration: string;
  thumbnail: string;
}

const VIDEOS: VideoLesson[] = [
  {
    id: '1',
    youtubeId: 'j7u280G6W3E',
    titleEn: 'Basic English Conversation',
    titleAr: 'محادثات إنجليزية أساسية',
    level: 'A1',
    duration: '5:24',
    thumbnail: 'https://img.youtube.com/vi/j7u280G6W3E/maxresdefault.jpg'
  },
  {
    id: '2',
    youtubeId: 'L9A8fDQ_H_E',
    titleEn: 'How to introduce yourself',
    titleAr: 'كيف تعرف عن نفسك',
    level: 'A1',
    duration: '3:45',
    thumbnail: 'https://img.youtube.com/vi/L9A8fDQ_H_E/maxresdefault.jpg'
  },
  {
    id: '3',
    youtubeId: '6_pCAtZ5ZMI',
    titleEn: 'At the Restaurant',
    titleAr: 'في المطعم - محادثة',
    level: 'A2',
    duration: '6:12',
    thumbnail: 'https://img.youtube.com/vi/6_pCAtZ5ZMI/maxresdefault.jpg'
  },
  {
    id: '4',
    youtubeId: 'h2O3vHhREfA',
    titleEn: 'Advanced Business English',
    titleAr: 'إنجليزية الأعمال المتقدمة',
    level: 'B2',
    duration: '12:30',
    thumbnail: 'https://img.youtube.com/vi/h2O3vHhREfA/maxresdefault.jpg'
  }
];

export const VideoLibrary = ({ 
  lang, 
  profile, 
  onUpdateProfile, 
  onNavigate,
  enabled = true
}: { 
  lang: Language, 
  profile: UserProfile, 
  onUpdateProfile: (p: UserProfile) => void, 
  onNavigate: (v: any) => void,
  enabled?: boolean
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [deducting, setDeducting] = useState(false);

  const handleSelectVideo = async (video: VideoLesson) => {
    if (!enabled) return;
    if (selectedVideo?.id === video.id) return;

    const isAdmin = MASTER_ADMINS.includes(profile.email?.toLowerCase() || '');
    const credits = (profile as any).credits || 0;
    
    if (!isAdmin && credits < CreditCost.VIDEO_LESSON) {
      alert(t.insufficientCredits);
      onNavigate('credits');
      return;
    }

    setDeducting(true);
    try {
      if (!isAdmin) {
        await deductCredits(profile.uid, CreditCost.VIDEO_LESSON, `Video Lesson: ${video.titleEn}`);
        onUpdateProfile({ ...profile, credits: credits - CreditCost.VIDEO_LESSON } as UserProfile);
      }
      setSelectedVideo(video);
    } catch (err) {
      console.error("Video deduction error:", err);
    } finally {
      setDeducting(false);
    }
  };

  const generateQuiz = async (video: VideoLesson) => {
    setQuizLoading(true);
    try {
      const resp = await fetch('/api/generate/video-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoTitle: video.titleEn,
          level: video.level,
          lang: isRtl ? 'Arabic' : 'English'
        })
      });

      if (!resp.ok) {
        throw new Error(`Server responded with ${resp.status}`);
      }

      const questions = await resp.json();
      setQuizQuestions(questions);
      setQuizStarted(true);
    } catch (err) {
      console.error("Error generating quiz:", err);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswer = (index: number) => {
    const newAnswers = [...userAnswers, index];
    setUserAnswers(newAnswers);
    if (newAnswers.length === quizQuestions.length) {
      setQuizFinished(true);
    }
  };

  if (selectedVideo) {
    return (
      <div className={`p-8 max-w-5xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <button 
          onClick={() => {
            setSelectedVideo(null);
            setQuizStarted(false);
            setQuizQuestions([]);
            setUserAnswers([]);
            setQuizFinished(false);
          }}
          className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-colors mb-8 font-bold"
        >
          <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          {isRtl ? 'العودة للمكتبة' : 'Back to Library'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black mb-8 border-4 border-white">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black">{selectedVideo.level}</span>
                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black">{selectedVideo.duration}</span>
              </div>
              <h2 className="text-2xl font-black text-[#002147] mb-2">{isRtl ? selectedVideo.titleAr : selectedVideo.titleEn}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                {isRtl 
                  ? 'شاهد الفيديو بعناية ثم قم بحل الاختبار الذكي لتقييم مدى استيعابك للمهارات اللغوية المطروحة.' 
                  : 'Watch the video carefully and then take the AI quiz to assess your understanding of the linguistic skills presented.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            {!quizStarted ? (
              <div className="bg-[#002147] rounded-[2.5rem] p-8 text-white h-full flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <BrainCircuit size={48} className="text-blue-400 mb-6" />
                <h3 className="text-xl font-black mb-4">{t.aiQuiz}</h3>
                <p className="text-blue-200 text-xs mb-8 font-medium">
                  {isRtl ? 'سنولد لك اختباراً خاصاً يعتمد على محتوى هذا الفيديو فورياً.' : 'We will generate a custom quiz based on this video content instantly.'}
                </p>
                <button 
                  onClick={() => generateQuiz(selectedVideo)}
                  disabled={quizLoading}
                  className="w-full bg-[#C49E3A] hover:bg-white hover:text-[#002147] text-white px-6 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                >
                  {quizLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Sparkles size={18} />}
                  {quizLoading ? t.loadingAIQuestions : (isRtl ? 'توليد الاختبار الآن' : 'Generate Quiz Now')}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm h-full overflow-y-auto">
                {quizFinished ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <Trophy size={32} />
                    </div>
                    <h4 className="text-2xl font-black text-[#002147] mb-2">{isRtl ? 'أحسنت صنعاً!' : 'Well Done!'}</h4>
                    <p className="text-sm text-slate-500 mb-8 font-medium">{isRtl ? 'لقد أتممت الاختبار الذكي بنجاح.' : 'You have successfully completed the AI quiz.'}</p>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isRtl ? 'الإجابات الصحيحة' : 'Correct Answers'}</span>
                        <span className="text-xl font-black text-[#002147]">
                          {userAnswers.filter((a, i) => a === quizQuestions[i].correctIndex).length} / {quizQuestions.length}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500" 
                          style={{ width: `${(userAnswers.filter((a, i) => a === quizQuestions[i].correctIndex).length / quizQuestions.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-lg font-black text-[#002147]">{t.aiQuiz}</h3>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{userAnswers.length + 1} / {quizQuestions.length}</span>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={userAnswers.length}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className="space-y-6"
                      >
                        <p className="font-bold text-[#002147] leading-relaxed">{quizQuestions[userAnswers.length].question}</p>
                        <div className="space-y-3">
                          {quizQuestions[userAnswers.length].options.map((option: string, idx: number) => (
                            <button 
                              key={idx}
                              onClick={() => handleAnswer(idx)}
                              className="w-full text-right p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all text-sm font-medium text-slate-600 flex items-center justify-between gap-3 group"
                            >
                              <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black group-hover:border-blue-400 group-hover:text-blue-600 transition-all">{idx + 1}</span>
                              <span className="flex-1">{option}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="mb-12">
        <h2 className="text-3xl font-black text-[#002147]">{t.videoLibrary}</h2>
        <p className="text-slate-400 mt-1 font-medium">{isRtl ? 'تعلم الإنجليزية عبر محتوى الفيديو التفاعلي والذكاء الاصطناعي' : 'Learn English through interactive video content and AI'}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {VIDEOS.map((video, vIdx) => (
          <motion.div 
            key={`video-card-${video.id || vIdx}`}
            whileHover={enabled ? { y: -10 } : {}}
            className={`bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm group cursor-pointer relative ${!enabled ? 'grayscale opacity-70 cursor-not-allowed' : ''}`}
            onClick={() => handleSelectVideo(video)}
          >
            {!enabled && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#002147]/20 backdrop-blur-[2px]">
                <div className="bg-white px-6 py-2 rounded-full shadow-2xl border-2 border-[#002147] transform -rotate-12">
                   <span className="text-sm font-black text-[#002147] uppercase tracking-tighter">
                     {isRtl ? 'قريباً' : 'Coming Soon'}
                   </span>
                </div>
              </div>
            )}
            {deducting && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-[#002147] border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            <div className="aspect-[4/3] relative overflow-hidden">
              <img src={video.thumbnail} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform">
                   <Play fill="currentColor" size={32} />
                 </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black">{video.duration}</span>
                <span className="bg-[#C49E3A] text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">{video.level}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-black text-[#002147] mb-4 line-clamp-1">{isRtl ? video.titleAr : video.titleEn}</h3>
              <button className="w-full bg-[#002147] text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-[#C49E3A] transition-all shadow-lg shadow-blue-100">
                {t.watchNow}
                <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="mt-16 p-8 bg-[#002147] rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="relative flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-400 rounded-3xl flex items-center justify-center text-4xl shadow-2xl rotate-3">
              🎬
            </div>
            <div>
              <h4 className="text-2xl font-black">{isRtl ? 'محتوى عالمي متجدد' : 'New Global Content'}</h4>
              <p className="text-blue-200 text-sm font-medium">{isRtl ? 'نقوم بإضافة دروس فيديو جديدة أسبوعياً بناءً على مستواك.' : 'We add new video lessons weekly based on your level.'}</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-8 py-5 rounded-3xl border border-white/20 relative group">
             <div className="flex items-center gap-4">
                <Sparkles className="text-[#C49E3A]" />
                <div className="text-right">
                  <span className="block text-2xl font-black leading-none">{VIDEOS.length * 15}</span>
                  <span className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">{isRtl ? 'دقيقة تعليمية' : 'Learning Minutes'}</span>
                </div>
             </div>
          </div>
      </footer>
    </div>
  );
};
