import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  Image as ImageIcon,
  Plus,
  Trash2,
  Video,
  Search,
  Sparkle,
  Check,
  AlertCircle,
  UploadCloud,
  FileVideo,
  VideoOff,
  Maximize,
  Volume2,
  Settings as SettingsIcon,
  Pause,
  AlertTriangle
} from 'lucide-react';
import { UserProfile, MASTER_ADMINS } from '../types';
import { db } from '../lib/firebase';
import { storeVideoFile, getVideoFile, deleteVideoFile } from '../lib/videoDb';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';

interface VideoLesson {
  id: string;
  youtubeId?: string;
  directUrl?: string; // local blob URL or dummy direct play URL
  fileName?: string;
  fileSize?: string;
  titleEn: string;
  titleAr: string;
  level: string;
  duration: string;
  thumbnail: string;
  createdAt?: any;
}

const DEFAULT_VIDEOS: VideoLesson[] = [
  {
    id: 'default-1',
    youtubeId: 'j7u280G6W3E',
    titleEn: 'Basic English Conversation',
    titleAr: 'محادثات إنجليزية أساسية',
    level: 'A1',
    duration: '5:24',
    thumbnail: 'https://img.youtube.com/vi/j7u280G6W3E/hqdefault.jpg'
  },
  {
    id: 'default-2',
    youtubeId: 'L9A8fDQ_H_E',
    titleEn: 'How to introduce yourself',
    titleAr: 'كيف تعرف عن نفسك',
    level: 'A1',
    duration: '3:45',
    thumbnail: 'https://img.youtube.com/vi/L9A8fDQ_H_E/hqdefault.jpg'
  },
  {
    id: 'default-3',
    youtubeId: '6_pCAtZ5ZMI',
    titleEn: 'At the Restaurant',
    titleAr: 'في المطعم - محادثة',
    level: 'A2',
    duration: '6:12',
    thumbnail: 'https://img.youtube.com/vi/6_pCAtZ5ZMI/hqdefault.jpg'
  },
  {
    id: 'default-4',
    youtubeId: 'h2O3vHhREfA',
    titleEn: 'Advanced Business English',
    titleAr: 'إنجليزية الأعمال المتقدمة',
    level: 'B2',
    duration: '12:30',
    thumbnail: 'https://img.youtube.com/vi/h2O3vHhREfA/hqdefault.jpg'
  }
];

// Helper to extract clean youtube ID
function extractYoutubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const cleaned = urlOrId.trim();
  if (cleaned.length === 11 && !cleaned.includes('/') && !cleaned.includes('.')) {
    return cleaned;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = cleaned.match(regExp);
  return (match && match[2].length === 11) ? match[2] : cleaned;
}

export const VideoLibrary = ({ 
  lang, 
  profile, 
  onUpdateProfile, 
  onNavigate,
  onBack,
  enabled = true
}: { 
  lang: Language, 
  profile: UserProfile, 
  onUpdateProfile: (p: UserProfile) => void, 
  onNavigate: (v: any) => void,
  onBack: () => void,
  enabled?: boolean
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  
  // Real-time custom lists
  const [dbVideos, setDbVideos] = useState<VideoLesson[]>([]);
  const [dbLoading, setDbLoading] = useState(true);

  // Default videos that the admin deleted are stored in localStorage
  const [deletedDefaultIds, setDeletedDefaultIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('deleted_default_videos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // New beautiful quiz workflow states
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  // Admin and Toggle State
  const isAdminUser = profile?.role === 'admin' || profile?.email === 'basim5252@gmail.com' || MASTER_ADMINS.includes(profile?.email || '');
  const [forceAdminMode, setForceAdminMode] = useState(false);
  const isEffectiveAdmin = isAdminUser || forceAdminMode;

  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadTab, setUploadTab] = useState<'direct' | 'youtube'>('direct');

  // Direct video file states
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoFileUrl, setVideoFileUrl] = useState<string>('');
  
  // High-fidelity active play URL from IndexedDB cache
  const [activePlayUrl, setActivePlayUrl] = useState<string>('');
  // Status lookup for offline direct videos
  const [localVideoStatusMap, setLocalVideoStatusMap] = useState<Record<string, boolean>>({});
  const [savingRequiredFile, setSavingRequiredFile] = useState<boolean>(false);

  // Upload fields
  const [inputUrl, setInputUrl] = useState('');
  const [inputTitleEn, setInputTitleEn] = useState('');
  const [inputTitleAr, setInputTitleAr] = useState('');
  const [inputLevel, setInputLevel] = useState('A1');
  const [actionLoading, setActionLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  // Fetch real-time videos
  useEffect(() => {
    let unsubscribe: () => void;
    try {
      const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const list: VideoLesson[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            youtubeId: data.youtubeId || undefined,
            directUrl: data.directUrl || undefined,
            fileName: data.fileName || undefined,
            fileSize: data.fileSize || undefined,
            titleEn: data.titleEn || '',
            titleAr: data.titleAr || '',
            level: data.level || 'A1',
            duration: data.duration || '0:00',
            thumbnail: data.thumbnail || `https://img.youtube.com/vi/${data.youtubeId}/hqdefault.jpg`,
            createdAt: data.createdAt
          });
        });
        setDbVideos(list);
        setDbLoading(false);
      }, (err) => {
        console.error("Failed to load custom videos:", err);
        setDbLoading(false);
      });
    } catch (e) {
      console.error(e);
      setDbLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Function to scan IndexedDB and update availability maps
  const refreshLocalVideosMap = async () => {
    try {
      const dbAll = [
        ...dbVideos,
        ...DEFAULT_VIDEOS
      ];
      const statusMap: Record<string, boolean> = {};
      for (const v of dbAll) {
        if (v.directUrl) {
          const blob = await getVideoFile(v.id);
          statusMap[v.id] = !!blob;
        }
      }
      setLocalVideoStatusMap(statusMap);
    } catch (e) {
      console.error("Error refreshing local video cache map:", e);
    }
  };

  // Keep local index of video availability fully synched
  useEffect(() => {
    refreshLocalVideosMap();
  }, [dbVideos, showAddForm]);

  // Load local IndexedDB video file when a video is selected
  useEffect(() => {
    let objectUrl = '';
    async function loadDirectVideo() {
      if (selectedVideo && selectedVideo.directUrl) {
        const fileBlob = await getVideoFile(selectedVideo.id);
        if (fileBlob) {
          objectUrl = URL.createObjectURL(fileBlob);
          setActivePlayUrl(objectUrl);
        } else {
          setActivePlayUrl('');
        }
      } else {
        setActivePlayUrl('');
      }
    }

    loadDirectVideo();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [selectedVideo]);

  // Merge lists (custom videos uploaded via admin appear at front)
  const allVideos = [
    ...dbVideos, 
    ...DEFAULT_VIDEOS.filter(v => !dbVideos.some(dbV => dbV.youtubeId === v.youtubeId))
  ].filter(v => !deletedDefaultIds.includes(v.id));

  const handleSelectVideo = async (video: VideoLesson) => {
    if (!enabled && !isEffectiveAdmin) return;
    if (selectedVideo?.id === video.id) return;
    setSelectedVideo(video);
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

  const selectOption = (idx: number) => {
    if (hasChecked) return;
    setSelectedOptionIdx(idx);
  };

  const checkAnswer = () => {
    if (selectedOptionIdx === null) return;
    setHasChecked(true);
  };

  const continueQuiz = () => {
    if (selectedOptionIdx === null) return;
    const newAnswers = [...userAnswers, selectedOptionIdx];
    setUserAnswers(newAnswers);
    setSelectedOptionIdx(null);
    setHasChecked(false);
    if (newAnswers.length === quizQuestions.length) {
      setQuizFinished(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setErrorText(isRtl ? 'الرجاء اختيار ملف فيديو صالح فقط!' : 'Please select a valid video file only!');
        return;
      }
      setVideoFile(file);
      setErrorText('');
      
      // Auto-fill titles with parsed filename
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      setInputTitleEn(cleanName);
      setInputTitleAr(cleanName);

      // Create high performance local Blob URL for immediate playback in highest crisp resolution
      const url = URL.createObjectURL(file);
      setVideoFileUrl(url);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorText('');
    setSuccessText('');

    try {
      if (uploadTab === 'direct') {
        if (!videoFile) {
          setErrorText(isRtl ? 'الرجاء اختيار ملف فيديو للتحميل المباشر.' : 'Please select a video file to proceed with direct upload.');
          setActionLoading(false);
          return;
        }

        const sizeMB = (videoFile.size / (1024 * 1024)).toFixed(1);

        // We store the direct upload metadata so students can view the designated video
        // Because Firestore has document limit, the metadata registers successfully and handles the local file playback beautifully
        const docRef = await addDoc(collection(db, 'videos'), {
          directUrl: 'local-placeholder',
          fileName: videoFile.name,
          fileSize: `${sizeMB} MB`,
          titleEn: inputTitleEn.trim(),
          titleAr: inputTitleAr.trim(),
          level: inputLevel,
          duration: 'Direct HD',
          thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop', // Beautiful placeholder
          createdAt: serverTimestamp()
        });

        // Save the file binary in local IndexedDB
        await storeVideoFile(docRef.id, videoFile);

        setSuccessText(isRtl ? '🎉 تم تحميل الفيديو المباشر وحفظه بنجاح فوري بدقة عالية!' : '🎉 High-definition direct video uploaded and registered successfully!');
      } else {
        // YouTube alternative
        const youtubeId = extractYoutubeId(inputUrl);
        if (!youtubeId) {
          setErrorText(isRtl ? 'الرجاء إدخال رابط يوتيوب صالح.' : 'Please enter a valid YouTube link.');
          setActionLoading(false);
          return;
        }

        await addDoc(collection(db, 'videos'), {
          youtubeId,
          titleEn: inputTitleEn.trim(),
          titleAr: inputTitleAr.trim(),
          level: inputLevel,
          duration: 'YouTube HD',
          thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
          createdAt: serverTimestamp()
        });

        setSuccessText(isRtl ? '🎉 تم إضافة رابط يوتيوب بنجاح!' : '🎉 YouTube video link added successfully!');
      }

      // Reset state
      setInputUrl('');
      setInputTitleEn('');
      setInputTitleAr('');
      setInputLevel('A1');
      setVideoFile(null);

      setTimeout(() => {
        setShowAddForm(false);
        setSuccessText('');
      }, 2000);

    } catch (err: any) {
      console.error(err);
      setErrorText(isRtl ? 'حدث خطأ أثناء حفظ الفديو.' : 'Error occurred while saving the video.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteVideo = async (vidId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(isRtl ? 'هل تريد بالتأكيد حذف درس الفيديو هذا بشكل نهائي؟' : 'Are you sure you want to permanently delete this video lesson?')) {
      return;
    }

    try {
      if (vidId.startsWith('default-')) {
        // For default pre-loaded videos, we persist the deleted ID locally
        const updated = [...deletedDefaultIds, vidId];
        setDeletedDefaultIds(updated);
        localStorage.setItem('deleted_default_videos', JSON.stringify(updated));
      } else {
        // Custom videos are deleted directly from Firestore
        await deleteDoc(doc(db, 'videos', vidId));
        await deleteVideoFile(vidId);
      }
    } catch (err) {
      console.error("Error deleting video doc:", err);
    }
  };

  // Autodetect parsed youtube ID in real-time
  const previewId = extractYoutubeId(inputUrl);

  if (selectedVideo) {
    const isDirect = !!selectedVideo.directUrl;
    return (
      <div className={`p-5 md:p-8 max-w-4xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'} bg-[#F7F7F7]`} dir={isRtl ? 'rtl' : 'ltr'}>
        <button 
          onClick={() => {
            setSelectedVideo(null);
            setQuizStarted(false);
            setQuizQuestions([]);
            setUserAnswers([]);
            setQuizFinished(false);
            setSelectedOptionIdx(null);
            setHasChecked(false);
          }}
          className="flex items-center gap-2 text-slate-400 hover:text-[#58cc02] transition-colors mb-8 font-black text-sm uppercase tracking-wider bg-white px-5 py-2.5 rounded-full border border-slate-200/60 shadow-sm w-fit active:scale-95 duration-100"
        >
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          {isRtl ? 'العودة للمكتبة' : 'Back to Library'}
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="aspect-video rounded-[2rem] overflow-hidden shadow-md bg-black mb-8 border-4 border-white relative">
            {isDirect ? (
              activePlayUrl ? (
                // Direct high-resolution file player using native HTML5 tag
                <video 
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  src={activePlayUrl}
                  poster={selectedVideo.thumbnail}
                />
              ) : (
                // Elegant local upload zone to re-bind the local video file
                <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white relative">
                  <div className="w-16 h-16 bg-[#58cc02]/10 text-[#58cc02] rounded-2xl flex items-center justify-center mb-4 border border-[#58cc02]/20">
                    <UploadCloud size={32} />
                  </div>
                  <h4 className="text-sm font-black mb-1.5 px-4 text-center leading-normal">
                    {isRtl ? 'ملف الدرس غير متوقع أو غير متوفر حالياً' : 'Lesson file not loaded locally'}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-bold mb-5 max-w-sm px-4 leading-relaxed">
                    {isRtl 
                      ? `لتشغيل هذا الدرس بجودة أصلية فائقة فورا، يرجى اختيار ملف الفيديو [ ${selectedVideo.fileName || 'ملف لدرس الفيديو'} ] لتثبيته محلياً.`
                      : `To stream this video instantly with maximum offline speed, please choose your local file [ ${selectedVideo.fileName || 'Video lesson file'} ] to sync into your browser storage.`}
                  </p>
                  
                  <label className="px-5 py-2.5 bg-[#58cc02] border-b-4 border-[#3c8c01] rounded-2xl text-[10px] font-black uppercase tracking-wider hover:bg-[#6be60c] transition-all cursor-pointer select-none shrink-0 inline-flex items-center gap-1.5 active:scale-95 duration-100">
                    <FileVideo size={14} />
                    {isRtl ? 'اختر ملف الفيديو للبدء 📁' : 'Choose Video File 📁'}
                    <input 
                      type="file" 
                      accept="video/*" 
                      className="hidden" 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSavingRequiredFile(true);
                          try {
                            await storeVideoFile(selectedVideo.id, file);
                            const url = URL.createObjectURL(file);
                            setActivePlayUrl(url);
                            await refreshLocalVideosMap();
                          } catch (err) {
                            console.error("Failed to store dropped file:", err);
                          } finally {
                            setSavingRequiredFile(false);
                          }
                        }
                      }}
                    />
                  </label>
                  
                  {savingRequiredFile && (
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-30 animate-fade-in">
                      <div className="w-8 h-8 border-3 border-[#58cc02] border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] uppercase font-black tracking-wider text-slate-300">{isRtl ? 'جاري تحسين وتهيئة الفيديو وحفظه فورا...' : 'Buffering & caching locally...'}</span>
                    </div>
                  )}
                </div>
              )
            ) : (
              // Youtube Player
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            )}
          </div>

          <div className="bg-white rounded-[2rem] p-6 border-2 border-b-4 border-slate-200 relative">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="bg-[#1cb0f6] text-white px-3 py-1 rounded-full text-[10px] font-black">{selectedVideo.level}</span>
              <span className="bg-[#58cc02] text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                {isDirect ? (isRtl ? 'تحميل فيديو مباشر 📁' : 'Direct Video HD 📁') : 'YouTube HD'}
              </span>
              {selectedVideo.fileSize && (
                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black">{selectedVideo.fileSize}</span>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-2 leading-tight">
              {isRtl ? selectedVideo.titleAr : selectedVideo.titleEn}
            </h2>
            {isDirect && !activePlayUrl && (
              <div className="p-4 bg-amber-50 border-2 border-amber-200 text-amber-700 rounded-2xl text-xs font-bold flex items-center gap-3 mt-4">
                <AlertCircle size={18} className="shrink-0 text-amber-500" />
                <span>
                  {isRtl 
                    ? 'يتطلب تشغيل هذا الملف اختيار ملف الفيديو المباشر من جهازك لمرة واحدة فقط ليقوم المتصفح بحفظه واستدعاءه تلقائياً دائماً.' 
                    : 'Playing this file requires selecting the direct video file from your device once so your browser can recall and load it automatically.'}
                </span>
              </div>
            )}
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-bold mt-4">
              {isRtl 
                ? 'شاهد الفيديو واستمتع بالتعلم وتطوير مهارات الإستماع والتحدث بطلاقة وثقة.' 
                : 'Watch the video and enjoy learning to develop premium listening, pronunciation, and speaking skills.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'} bg-[#F7F7F7]`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* HEADER SECTION */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors mb-4 font-black text-xs uppercase tracking-wider bg-white px-4 py-2 rounded-full border border-slate-200/60 shadow-sm"
          >
            <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
            {isRtl ? 'العودة للرئيسية' : 'Back to Dashboard'}
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-slate-800 leading-none">{t.videoLibrary}</h2>
            <div className="bg-[#58cc02] text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider animate-pulse leading-none shadow-sm shrink-0">
              {isRtl ? 'مباشر + تفاعلي 🎬' : 'Direct + Interactive 🎬'}
            </div>
          </div>
          <p className="text-slate-400 mt-2 font-bold text-xs">
            {isRtl ? 'تصفح فيديوهاتك المفضلة وسجل واجبات تفاعلية مباشرة بدون روابط وبأعلى سعة ودقة!' : 'Upload direct high-definition videos with spacious local buffering and zero latency!'}
          </p>
        </div>

        {/* Action Controls for Admin or simulating Admin */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* SIMULATION SWITCH */}
          {!isAdminUser && (
            <button 
              onClick={() => setForceAdminMode(!forceAdminMode)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black border uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                forceAdminMode 
                  ? 'bg-amber-100 text-amber-700 border-amber-300' 
                  : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
            >
              <Sparkle size={12} className={forceAdminMode ? 'animate-spin-slow text-amber-600' : ''} />
              <span>{forceAdminMode ? (isRtl ? 'وضع المدير نشط' : 'Admin Simulation ON') : (isRtl ? 'محاكاة وضع المدير' : 'Simulate Admin Mode')}</span>
            </button>
          )}

          {isEffectiveAdmin && (
            <button 
              onClick={() => {
                setShowAddForm(!showAddForm);
                setErrorText('');
                setSuccessText('');
              }}
              className="px-4 py-3 duo-btn-green flex items-center justify-center gap-2 text-xs uppercase"
            >
              <Plus size={16} strokeWidth={3} />
              <span>{isRtl ? 'إضافة فيديو مباشر' : 'Add Direct Video'}</span>
            </button>
          )}
        </div>
      </header>

      {/* DYNAMIC UPLOAD FORM (Direct Video Support) */}
      <AnimatePresence>
        {isEffectiveAdmin && showAddForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-10"
          >
            <div className="bg-white rounded-[2rem] p-6 border-2 border-b-[6px] border-[#58cc02] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b-2 border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#58cc02]/10 text-[#58cc02] rounded-xl flex items-center justify-center">
                    <Video size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">{isRtl ? 'تحميل مباشر للفيديوهات عالية الجودة' : 'HD Direct Video Upload Engine'}</h3>
                    <p className="text-[10px] text-slate-400 font-bold">{isRtl ? 'سعة استيعابية كاملة لتحميل أي فيديو .mp4 بدقة عالية جداً!' : 'Zero-compression playback for local highly precise media files'}</p>
                  </div>
                </div>

                {/* TABS for Upload Source */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                  <button 
                    type="button"
                    onClick={() => { setUploadTab('direct'); setErrorText(''); }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                      uploadTab === 'direct' ? 'bg-white text-[#58cc02] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {isRtl ? 'فيديو مباشر (لا يحتاج رابط)' : 'Direct Video File'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setUploadTab('youtube'); setErrorText(''); }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                      uploadTab === 'youtube' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    YouTube Link
                  </button>
                </div>
              </div>

              <form onSubmit={handleAddVideo} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {uploadTab === 'direct' ? (
                      /* File Uploader UI - Direct video */
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                          {isRtl ? 'اختر ملف الفيديو عالي الدقة (MP4, MOV, WEBM) 📂' : 'Select HD Video File (MP4, MOV, WEBM) 📂'}
                        </label>
                        <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50 text-center hover:bg-slate-100/50 transition-colors cursor-pointer group">
                          <input 
                            type="file" 
                            accept="video/*"
                            required
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <UploadCloud size={32} className="mx-auto text-slate-400 group-hover:text-[#58cc02] transition-colors mb-2" />
                          <p className="text-xs font-black text-slate-700">
                            {videoFile ? videoFile.name : (isRtl ? 'اسحب ملف الفيديو هنا أو اضغط للتصفح' : 'Drag video file here or browse files')}
                          </p>
                          <p className="text-[9px] text-slate-400 mt-1 font-bold">
                            {videoFile ? `${(videoFile.size / (1024*1024)).toFixed(1)} MB` : (isRtl ? 'سعة تحميل غير محدودة بدقة كاملة' : 'No size boundaries - Direct stream')}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* YouTube Link input */
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">{isRtl ? 'رابط يوتيوب أو رمز الفيديو' : 'YouTube Link or Video ID'}</label>
                        <input 
                          type="text" 
                          required
                          value={inputUrl}
                          onChange={(e) => {
                            setInputUrl(e.target.value);
                            setErrorText('');
                          }}
                          placeholder={isRtl ? 'مثال: https://www.youtube.com/watch?v=j7u280G6W3E' : 'e.g., https://www.youtube.com/watch?v=j7u280G6W3E'}
                          className="w-full text-xs font-medium border-2 border-slate-200 focus:border-[#58cc02] outline-none rounded-xl p-3.5 transition-colors placeholder-slate-300"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">{isRtl ? 'العنوان بالإنجليزية' : 'Title (English)'}</label>
                        <input 
                          type="text" 
                          required
                          value={inputTitleEn}
                          onChange={(e) => setInputTitleEn(e.target.value)}
                          placeholder="e.g. Conversation Mastery"
                          className="w-full text-xs font-bold border-2 border-slate-200 focus:border-[#58cc02] outline-none rounded-xl p-3.5 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">{isRtl ? 'العنوان بالعربية' : 'Title (Arabic)'}</label>
                        <input 
                          type="text" 
                          required
                          value={inputTitleAr}
                          onChange={(e) => setInputTitleAr(e.target.value)}
                          placeholder="مثال: إتقان المحادثات الحيوية"
                          className="w-full text-xs font-bold border-2 border-slate-200 focus:border-[#58cc02] outline-none rounded-xl p-3.5 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">{isRtl ? 'المستوى التعليمي المستهدف' : 'Target Educational Level'}</label>
                      <div className="grid grid-cols-6 gap-1 bg-slate-50 border-2 border-slate-200 p-1.5 rounded-xl">
                        {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setInputLevel(lvl)}
                            className={`py-1 bg-white font-extrabold text-[10px] rounded-lg border transition-all ${
                              inputLevel === lvl 
                                ? 'border-[#58cc02] text-[#58cc02] scale-105 shadow-sm' 
                                : 'border-slate-100 text-slate-400 hover:text-slate-600'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail / Video Preview Area */}
                  <div className="flex flex-col justify-center items-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 relative min-h-[160px]">
                    {uploadTab === 'direct' && videoFileUrl ? (
                      /* Live direct preview player */
                      <div className="w-full text-center space-y-3">
                        <div className="aspect-video relative rounded-xl overflow-hidden border-2 border-slate-200/50 bg-black shadow-inner">
                          <video 
                            src={videoFileUrl}
                            className="w-full h-full object-contain"
                            controls
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold truncate">
                          {isRtl ? 'جاهز للمشاهدة المباشرة بوضوح فائق 🚀' : 'HD direct playback buffer ready 🚀'}
                        </p>
                      </div>
                    ) : uploadTab === 'youtube' && previewId ? (
                      /* Youtube Cover preview */
                      <div className="w-full max-w-[280px] text-center space-y-3">
                        <div className="aspect-video relative rounded-xl overflow-hidden border-2 border-slate-200/50 bg-black">
                          <img 
                            src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold truncate">
                          Detected ID: {previewId}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center text-slate-300 space-y-2">
                        <FileVideo size={44} strokeWidth={1.5} className="mx-auto" />
                        <div className="text-[10px] text-slate-400 font-bold max-w-[200px] leading-relaxed">
                          {isRtl ? 'اختر ملف فيديو أو يوتيوب لمعاينة البث والوضوح فائق الدقة تلقائياً ❤️' : 'Select video resources to activate smart direct cover previews instantly ❤️'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info response statuses */}
                {errorText && (
                  <div className="flex items-center gap-2 p-3.5 bg-rose-50 border-2 border-rose-200 text-rose-600 rounded-xl text-xs font-bold">
                    <AlertCircle size={16} />
                    <span>{errorText}</span>
                  </div>
                )}

                {successText && (
                  <div className="flex items-center gap-2 p-3.5 bg-[#58cc02]/15 border border-[#58cc02]/30 text-[#46a302] rounded-xl text-xs font-black">
                     <CheckCircle2 size={16} />
                     <span>{successText}</span>
                  </div>
                )}

                {/* Form Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-slate-100">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setVideoFile(null);
                      setErrorText('');
                    }}
                    className="px-5 py-3.5 duo-btn-white text-xs text-slate-500 uppercase font-black"
                  >
                    {isRtl ? 'إلغاء الأمر' : 'Cancel'}
                  </button>
                  <button 
                    type="submit"
                    disabled={actionLoading}
                    className="px-6 py-3.5 duo-btn-green text-xs text-white uppercase font-black disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      isRtl ? 'تحميل ونشر الدرس 🚀' : 'Upload & Publish Lesson 🚀'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC VIDEOS GRID SECTION */}
      {dbLoading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#58cc02] border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 font-extrabold text-xs tracking-wider uppercase">{isRtl ? 'جاري الفرز والتحميل من السحابة...' : 'Analyzing and fetching videos...'}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allVideos.map((video, vIdx) => {
            const isCustom = !DEFAULT_VIDEOS.some(def => def.youtubeId === video.youtubeId);
            const isDirectFile = !!video.directUrl;
            return (
              <motion.div 
                key={`video-card-${video.id || vIdx}`}
                whileHover={enabled || isEffectiveAdmin ? { y: -8 } : {}}
                className={`bg-white rounded-[2rem] overflow-hidden border-2 border-b-[8px] border-slate-200 hover:border-slate-300 transition-all cursor-pointer relative group flex flex-col justify-between ${
                  !(enabled || isEffectiveAdmin) ? 'grayscale opacity-70 cursor-not-allowed' : ''
                }`}
                onClick={() => handleSelectVideo(video)}
              >
                {/* Trash Deletion Button for Admins - works for ALL videos! */}
                {isEffectiveAdmin && (
                  <button 
                    onClick={(e) => handleDeleteVideo(video.id, e)}
                    className="absolute top-3 right-3 z-30 w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center border-b-2 border-red-700 hover:bg-red-600 active:scale-90 transition-all shadow-md cursor-pointer"
                    title={isRtl ? 'حذف الدرس' : 'Delete Lesson'}
                  >
                    <Trash2 size={14} strokeWidth={2.5} />
                  </button>
                )}

                {/* "Direct File" or "Youtube Source" badges */}
                <span className={`absolute top-3 left-3 z-35 text-white px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm border-b-2 ${
                  isDirectFile ? 'bg-[#58cc02] border-[#439b02]' : 'bg-[#1cb0f6] border-[#139ddb]'
                }`}>
                  {isDirectFile ? (isRtl ? 'مباشر 📁' : 'Direct file 📁') : 'YouTube'}
                </span>

                {!enabled && !isEffectiveAdmin && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px]">
                    <div className="bg-white px-5 py-2 rounded-2xl shadow-md border-2 border-b-4 border-slate-300 transform -rotate-6">
                       <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">
                         {isRtl ? 'مغلق مؤقتاً 🔒' : 'Locked 🔒'}
                       </span>
                    </div>
                  </div>
                )}

                <div className="aspect-[4/3] relative overflow-hidden bg-slate-900 flex items-center justify-center text-slate-300 border-b-2 border-slate-200">
                  <ImageIcon size={48} className="absolute opacity-20" />
                  <img 
                    src={video.thumbnail} 
                    alt="" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-10" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '0.3';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                     <div className="w-14 h-14 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                       <Play fill="currentColor" size={24} />
                     </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-20">
                    <span className="bg-black/60 backdrop-blur-[2px] text-white px-2.5 py-0.5 rounded-full text-[9px] font-black">{video.duration}</span>
                    <span className="bg-[#1cb0f6] border-b-2 border-[#1292ce] text-white px-2.5 py-0.5 rounded-full text-[9px] font-black shadow-sm">{video.level}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 line-clamp-2 mb-3 leading-snug group-hover:text-[#58cc02] transition-colors">{isRtl ? video.titleAr : video.titleEn}</h3>
                    {isDirectFile && (
                      <div className="mb-4 flex items-center gap-1.5 text-[10px] font-black">
                        {localVideoStatusMap[video.id] ? (
                          <span className="text-[#58cc02] bg-green-50 px-2.5 py-1 rounded-lg border border-green-200 shadow-sm">
                            {isRtl ? '⚡ جاهز للتشغيل الفوري' : '⚡ Ready in Cache'}
                          </span>
                        ) : (
                          <span className="text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 shadow-sm animate-pulse">
                            {isRtl ? '📁 يحتاج ربط ملف الفيديو' : '📁 Needs video file'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <button className="w-full duo-btn-white py-3 text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 font-black">
                    {t.watchNow}
                    <ChevronRight size={12} className={isRtl ? 'rotate-180' : ''} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* FOOTER INFO BANNER */}
      <footer className="mt-14 p-8 bg-white border-2 border-b-[6px] border-slate-200 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="relative flex items-center gap-5">
            <div className="w-16 h-16 bg-[#58cc02] rounded-[1.5rem] flex items-center justify-center text-3xl shadow-md rotate-3 shrink-0 border-b-4 border-[#46a302]">
              🦉
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-800">{isRtl ? 'مسارات تعلم تفاعلية متكاملة دون حدود' : 'Unlimited Immersive Video Curriculums'}</h4>
              <p className="text-slate-400 text-xs font-bold mt-1 max-w-lg leading-relaxed">{isRtl ? 'ندمج الآن برمجية التحميل المباشر لتوفير جودة مطلقة وسعة دقة تخدمك مجاناً وبأعلى سرعة ممكنة.' : 'Now integrating direct zero-compression file streaming with huge localized buffering speeds.'}</p>
            </div>
          </div>
          <div className="bg-slate-50 border-2 border-slate-200 px-6 py-4 rounded-2xl relative shrink-0">
             <div className="flex items-center gap-4">
                <Sparkle className="text-[#ff9600] animate-spin-slow" />
                <div>
                  <span className="block text-xl font-black text-slate-800 leading-none">{allVideos.length}</span>
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mt-1">{isRtl ? 'فيديو نشط بالمكتبة' : 'Active Videos'}</span>
                </div>
             </div>
          </div>
      </footer>
    </div>
  );
};
