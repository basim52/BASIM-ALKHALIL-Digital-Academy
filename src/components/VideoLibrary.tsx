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
  AlertTriangle,
  Download,
  Film,
  Wand2,
  FileText,
  Layers,
  HardDriveDownload,
  BookOpen,
  Filter
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
import { PRODUCED_VIDEO_LESSONS, ProducedVideoLesson } from '../data/producedVideoLessons';
import { ProducedVideoPlayer } from './ProducedVideoPlayer';
import { AiVideoStudioModal } from './AiVideoStudioModal';

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
  const [selectedProducedLesson, setSelectedProducedLesson] = useState<ProducedVideoLesson | null>(null);
  const [libraryTab, setLibraryTab] = useState<'produced' | 'uploads'>('produced');
  const [producedLessons, setProducedLessons] = useState<ProducedVideoLesson[]>(PRODUCED_VIDEO_LESSONS);
  const [showAiStudioModal, setShowAiStudioModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

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

  // Direct video options (link vs local file)
  const [directSourceMode, setDirectSourceMode] = useState<'link' | 'file'>('link'); // Default to persistent external link format!
  const [directLinkUrl, setDirectLinkUrl] = useState('');
  const [hasVideoPlayError, setHasVideoPlayError] = useState<boolean>(false);

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
        console.warn("Failed to load custom videos:", String(err));
        setDbLoading(false);
      });
    } catch (e) {
      console.warn(String(e));
      setDbLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Function to scan IndexedDB & Express server to update availability maps
  const refreshLocalVideosMap = async () => {
    try {
      const dbAll = [
        ...dbVideos,
        ...DEFAULT_VIDEOS
      ];
      const statusMap: Record<string, boolean> = {};
      
      await Promise.all(dbAll.map(async (v) => {
        if (v.directUrl) {
          // A. If directUrl is an external cloud link, it's always ready!
          if (v.directUrl.startsWith('http://') || v.directUrl.startsWith('https://')) {
            statusMap[v.id] = true;
          } else {
            // 1. Check local IndexedDB first
            const blob = await getVideoFile(v.id);
            if (blob) {
              statusMap[v.id] = true;
            } else {
              // 2. Check Express server disk
              try {
                const res = await fetch(`/api/videos/check/${v.id}`);
                const data = await res.json();
                statusMap[v.id] = !!data.exists;
              } catch (err) {
                statusMap[v.id] = false;
              }
            }
          }
        }
      }));
      setLocalVideoStatusMap(statusMap);
    } catch (e) {
      console.warn("Error refreshing local video cache map:", String(e));
    }
  };

  // Keep local index of video availability fully synched
  useEffect(() => {
    refreshLocalVideosMap();
  }, [dbVideos, showAddForm]);

  // Load local IndexedDB video file or fallback to server stream when a video is selected
  useEffect(() => {
    let objectUrl = '';
    setHasVideoPlayError(false); // Reset error state whenever chosen video changes
    
    async function loadDirectVideo() {
      if (selectedVideo && selectedVideo.directUrl) {
        // A. If directUrl is an external web URL (Google Drive, Dropbox, public hosting), play it natively!
        if (selectedVideo.directUrl.startsWith('http://') || selectedVideo.directUrl.startsWith('https://')) {
          setActivePlayUrl(selectedVideo.directUrl);
          return;
        }

        try {
          // B. Try local cache in browser IndexedDB
          const fileBlob = await getVideoFile(selectedVideo.id);
          if (fileBlob) {
            objectUrl = URL.createObjectURL(fileBlob as Blob);
            setActivePlayUrl(objectUrl);
          } else {
            // C. Fallback to Express server chunk streaming endpoint
            setActivePlayUrl(`/api/videos/stream/${selectedVideo.id}`);
          }
        } catch (err) {
          console.warn("Failed to load local video cache:", String(err));
          setActivePlayUrl(`/api/videos/stream/${selectedVideo.id}`);
        }
      } else {
        setActivePlayUrl('');
      }
    }

    loadDirectVideo();

    return () => {
      if (objectUrl) {
        try {
          URL.revokeObjectURL(objectUrl);
        } catch (e) {
          console.warn("Error revoking URL:", String(e));
        }
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
      console.warn("Error generating quiz:", String(err));
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
        let finalDirectUrl = '';
        let finalFileName = '';
        let finalFileSize = 'Direct HD';

        if (directSourceMode === 'link') {
          if (!directLinkUrl.trim()) {
            setErrorText(isRtl ? 'الرجاء إدخال رابط الفيديو المباشر الأول.' : 'Please enter the direct video URL first.');
            setActionLoading(false);
            return;
          }
          finalDirectUrl = directLinkUrl.trim();
          finalFileName = directLinkUrl.split('/').pop()?.split('?')[0] || 'Cloud Hosted Video';
          finalFileSize = 'Persistent Web Link';
        } else {
          if (!videoFile) {
            setErrorText(isRtl ? 'الرجاء اختيار ملف فيديو للتحميل المباشر.' : 'Please select a video file to proceed with direct upload.');
            setActionLoading(false);
            return;
          }
          const sizeMB = (videoFile.size / (1024 * 1024)).toFixed(1);
          finalFileName = videoFile.name;
          finalFileSize = `${sizeMB} MB`;
          finalDirectUrl = `/api/videos/stream/${Date.now()}`;
        }

        // Add document to Firestore database
        const docRef = await addDoc(collection(db, 'videos'), {
          directUrl: finalDirectUrl,
          fileName: finalFileName,
          fileSize: finalFileSize,
          titleEn: inputTitleEn.trim() || finalFileName,
          titleAr: inputTitleAr.trim() || finalFileName,
          level: inputLevel,
          duration: 'Direct HD',
          thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop', // Beautiful placeholder
          createdAt: serverTimestamp()
        });

        // 1. Only do local storage and serverside storage if it's physical file mode
        if (directSourceMode === 'file' && videoFile) {
          try {
            // Save the file binary in local IndexedDB for instant zero-latency playback
            await storeVideoFile(docRef.id, videoFile);
          } catch (idbErr) {
            console.warn("IndexedDB cache failing (sandboxed check):", String(idbErr));
          }

          // Upload the file binary to Express server for persistent cross-client playback
          const fd = new FormData();
          fd.append('videoId', docRef.id);
          fd.append('video', videoFile);

          const uploadResponse = await fetch(`/api/videos/upload?videoId=${docRef.id}`, {
            method: 'POST',
            body: fd
          });

          if (!uploadResponse.ok) {
            throw new Error('Failed to upload video to server');
          }
        }

        setSuccessText(isRtl ? '🎉 تم إضافة الفيديو المباشر بنجاح وتأمينه للتشغيل الفوري!' : '🎉 Direct HD video added and secured successfully!');
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
      setDirectLinkUrl('');
      setInputTitleEn('');
      setInputTitleAr('');
      setInputLevel('A1');
      setVideoFile(null);

      setTimeout(() => {
        setShowAddForm(false);
        setSuccessText('');
      }, 2000);

    } catch (err: any) {
      console.warn(String(err));
      setErrorText(isRtl ? 'حدث خطأ أثناء حفظ الفديو.' : 'Error occurred while saving the video.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownloadVideo = async (video: VideoLesson, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingId(video.id);
    try {
      if (video.directUrl) {
        if (video.directUrl.startsWith('http://') || video.directUrl.startsWith('https://')) {
          const a = document.createElement('a');
          a.href = video.directUrl;
          a.target = '_blank';
          a.download = video.fileName || `${video.titleEn || 'lesson'}.mp4`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          const blob = await getVideoFile(video.id);
          if (blob) {
            const url = URL.createObjectURL(blob as Blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${video.fileName || video.titleEn || 'lesson'}.mp4`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          } else {
            const cleanName = encodeURIComponent(video.fileName || `${video.titleEn}.mp4`);
            window.location.href = `/api/videos/download/${video.id}?filename=${cleanName}`;
          }
        }
      } else if (video.youtubeId) {
        const notes = `====================================
ENGLISH ACADEMY - LESSON STUDY GUIDE
====================================
Title: ${video.titleEn}
Arabic: ${video.titleAr}
CEFR Level: ${video.level}
Duration: ${video.duration}
YouTube Reference: https://www.youtube.com/watch?v=${video.youtubeId}
====================================
Key Learning Objectives:
- Master pronunciation & natural intonation
- Memorize high-frequency vocabulary
- Real-life conversational fluency
====================================`;
        const blob = new Blob([notes], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${video.titleEn.replace(/\s+/g, '_')}_Study_Guide.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.warn("Download error:", err);
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  const handleDeleteVideo = async (vidId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(isRtl ? 'هل تريد بالتأكيد حذف درس الفيديو هذا بشكل نهائي؟' : 'Are you sure you want to permanently delete this video lesson?')) {
      return;
    }

    try {
      if (vidId.startsWith('default-')) {
        const updated = [...deletedDefaultIds, vidId];
        setDeletedDefaultIds(updated);
        localStorage.setItem('deleted_default_videos', JSON.stringify(updated));
      } else {
        await deleteDoc(doc(db, 'videos', vidId));
        await deleteVideoFile(vidId);
        await fetch(`/api/videos/delete/${vidId}`, { method: 'DELETE' }).catch(err => {
          console.warn("Error deleting physical video from server:", String(err));
        });
      }
    } catch (err) {
      console.warn("Error deleting video doc:", String(err));
    }
  };

  // Autodetect parsed youtube ID in real-time
  const previewId = extractYoutubeId(inputUrl);

  // If a produced audiovisual lesson is selected -> open the rich audiovisual player!
  if (selectedProducedLesson) {
    return (
      <ProducedVideoPlayer
        lesson={selectedProducedLesson}
        onBack={() => setSelectedProducedLesson(null)}
        isRtl={isRtl}
      />
    );
  }

  if (selectedVideo) {
    const isDirect = !!selectedVideo.directUrl;
    return (
      <div className={`p-5 md:p-8 max-w-4xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'} bg-[#F7F7F7]`} dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between mb-8">
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
            className="flex items-center gap-2 text-slate-400 hover:text-[#58cc02] transition-colors font-black text-sm uppercase tracking-wider bg-white px-5 py-2.5 rounded-full border border-slate-200/60 shadow-sm w-fit active:scale-95 duration-100"
          >
            <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
            {isRtl ? 'العودة للمكتبة' : 'Back to Library'}
          </button>

          <button
            onClick={(e) => handleDownloadVideo(selectedVideo, e)}
            disabled={downloadingId === selectedVideo.id}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-xl border border-slate-200 transition-all active:scale-95"
          >
            {downloadingId === selectedVideo.id ? (
              <div className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download size={15} />
            )}
            <span>{isRtl ? 'تحميل الفيديو / الملف' : 'Download Video / Guide'}</span>
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="aspect-video rounded-[2rem] overflow-hidden shadow-md bg-black mb-8 border-4 border-white relative">
            {isDirect ? (
              <div className="w-full h-full relative">
                {activePlayUrl ? (
                  <video 
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    src={activePlayUrl}
                    poster={selectedVideo.thumbnail}
                    onError={() => {
                      console.warn("HTML5 playback error handled safely");
                      setHasVideoPlayError(true);
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center">
                    <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {hasVideoPlayError && (
                  <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white z-25 animate-fade-in font-sans">
                    <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mb-3 border border-rose-500/20">
                      <AlertCircle size={24} />
                    </div>
                    <h5 className="text-[13px] font-black mb-1 px-4 leading-normal text-rose-400">
                      {isRtl ? 'عذراً، تعذر تشغيل ملف الفيديو المباشر في المتصفح' : 'Direct video stream cannot be loaded'}
                    </h5>
                    <p className="text-[10px] text-slate-400 font-bold mb-4 max-w-md px-4 leading-relaxed">
                      {isRtl 
                        ? `نظراً لإمكانية إعادة تشغيل خادم التطبيق السحابي المؤقت أو القيود المفروضة على IndexedDB بالمتصفح، قد لا يكون الملف متاحاً. يرجى إعادة اختيار ملف الفيديو [ ${selectedVideo.fileName || 'ملف الدرس'} ] من جهازك لرفعه للجميع واسترجاع البث فوراً!`
                        : `Due to ephemeral cloud server restarts or browser sandbox storage limits, the video file might be off. Re-select [ ${selectedVideo.fileName || 'the lesson file'} ] to link it and stream instantly!`}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <label className="px-4 py-2 bg-[#58cc02] border-b-4 border-[#3c8c01] rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-[#6be60c] transition-all cursor-pointer select-none inline-flex items-center gap-1 active:scale-95 duration-100 text-white leading-none">
                        <FileVideo size={12} />
                        {isRtl ? 'اختر ملف الفيديو لإصلاحه 📁' : 'Choose Local File to Restore 📁'}
                        <input 
                          type="file" 
                          accept="video/*" 
                          className="hidden" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setSavingRequiredFile(true);
                              try {
                                try {
                                  await storeVideoFile(selectedVideo.id, file);
                                } catch (idbErr) {
                                  console.warn("IndexedDB store fail within sandboxed iframe", String(idbErr));
                                }

                                const fd = new FormData();
                                fd.append('videoId', selectedVideo.id);
                                fd.append('video', file);

                                await fetch(`/api/videos/upload?videoId=${selectedVideo.id}`, {
                                  method: 'POST',
                                  body: fd
                                });

                                const url = URL.createObjectURL(file);
                                setHasVideoPlayError(false);
                                setActivePlayUrl(url);
                                await refreshLocalVideosMap();
                              } catch (err) {
                                console.warn("Failed to store and upload selected file:", String(err));
                              } finally {
                                setSavingRequiredFile(false);
                              }
                            }
                          }}
                        />
                      </label>
                      
                      <button 
                        onClick={() => {
                          setHasVideoPlayError(false);
                          const originalUrl = activePlayUrl;
                          setActivePlayUrl('');
                          setTimeout(() => setActivePlayUrl(originalUrl), 50);
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl text-[9px] font-black uppercase tracking-wider text-slate-300"
                      >
                        {isRtl ? 'تخطي وإعادة المحاولة 🔄' : 'Ignore & Retry 🔄'}
                      </button>
                    </div>
                  </div>
                )}

                {savingRequiredFile && (
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-30 animate-fade-in">
                    <div className="w-8 h-8 border-3 border-[#58cc02] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-300">{isRtl ? 'جاري تحسين وتهيئة الفيديو وحفظه فورا...' : 'Buffering & caching locally...'}</span>
                  </div>
                )}
              </div>
            ) : (
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

  // Filter produced video lessons
  const filteredProducedLessons = producedLessons.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesLevel = selectedLevelFilter === 'all' || lesson.level === selectedLevelFilter;
    return matchesCategory && matchesLevel;
  });

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'} bg-[#F7F7F7]`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* HEADER SECTION */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors mb-4 font-black text-xs uppercase tracking-wider bg-white px-4 py-2 rounded-full border border-slate-200/60 shadow-sm"
          >
            <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
            {isRtl ? 'العودة للرئيسية' : 'Back to Dashboard'}
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 leading-none">{t.videoLibrary}</h2>
            <div className="bg-gradient-to-r from-[#58cc02] to-[#1cb0f6] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse leading-none shadow-sm shrink-0">
              {isRtl ? 'إنتاج بالصوت والصورة 🎬🪄' : 'Audiovisual Production 🎬'}
            </div>
          </div>
          <p className="text-slate-400 mt-2 font-bold text-xs">
            {isRtl 
              ? 'دروس مرئية ناطقة بالصوت والصورة وحركة الشخصيات، مع إمكانية إنتاج فيديوهات جديدة وتحميل الفيديوهات والملخصات' 
              : 'Interactive narrated video lessons with audio, animation, AI production, and instant video downloading'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* AI VIDEO GENERATOR BUTTON */}
          <button
            onClick={() => setShowAiStudioModal(true)}
            className="px-5 py-3.5 bg-gradient-to-r from-[#58cc02] to-[#22c55e] hover:brightness-105 text-white font-black text-xs uppercase tracking-wider rounded-2xl border-b-4 border-[#3a8402] active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-[#58cc02]/25"
          >
            <Wand2 size={16} />
            <span>{isRtl ? 'إنتاج فيديو بالذكاء الاصطناعي 🪄' : 'AI Video Producer Studio 🪄'}</span>
          </button>

          {/* SIMULATION SWITCH */}
          {!isAdminUser && (
            <button 
              onClick={() => setForceAdminMode(!forceAdminMode)}
              className={`px-3 py-2 rounded-xl text-[10px] font-black border uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                forceAdminMode 
                  ? 'bg-amber-100 text-amber-700 border-amber-300' 
                  : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
            >
              <Sparkle size={12} className={forceAdminMode ? 'animate-spin-slow text-amber-600' : ''} />
              <span>{forceAdminMode ? (isRtl ? 'وضع المدير نشط' : 'Admin Mode') : (isRtl ? 'محاكاة وضع المدير' : 'Simulate Admin')}</span>
            </button>
          )}

          {isEffectiveAdmin && (
            <button 
              onClick={() => {
                setShowAddForm(!showAddForm);
                setErrorText('');
                setSuccessText('');
              }}
              className="px-4 py-3 duo-btn-white border-2 border-slate-200 flex items-center justify-center gap-2 text-xs uppercase font-black"
            >
              <Plus size={16} strokeWidth={3} />
              <span>{isRtl ? 'إضافة فيديو يدوي' : 'Upload Manual Video'}</span>
            </button>
          )}
        </div>
      </header>

      {/* TOP TABS SELECTOR (Produced Audiovisual vs Direct Uploads) */}
      <div className="flex flex-wrap items-center gap-3 mb-8 bg-white p-2 rounded-2xl border-2 border-slate-200 shadow-sm">
        <button
          onClick={() => setLibraryTab('produced')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            libraryTab === 'produced'
              ? 'bg-[#58cc02] text-white shadow-md shadow-[#58cc02]/20'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Film size={18} />
          <span>{isRtl ? 'الدروس المرئية المنتجة (بالصوت والصورة) 🎬' : 'Produced Audiovisual Video Lessons 🎬'}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
            libraryTab === 'produced' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            {producedLessons.length}
          </span>
        </button>

        <button
          onClick={() => setLibraryTab('uploads')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            libraryTab === 'uploads'
              ? 'bg-[#1cb0f6] text-white shadow-md shadow-[#1cb0f6]/20'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <HardDriveDownload size={18} />
          <span>{isRtl ? 'مكتبة التحميل المباشر واليوتيوب 📁' : 'Direct Uploads & YouTube Library 📁'}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
            libraryTab === 'uploads' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            {allVideos.length}
          </span>
        </button>
      </div>

      {/* ================= PRODUCED AUDIOVISUAL LESSONS TAB ================= */}
      {libraryTab === 'produced' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 text-xs">
              {[
                { id: 'all', labelAr: 'الكل 🌟', labelEn: 'All 🌟' },
                { id: 'conversation', labelAr: 'محادثات 💬', labelEn: 'Conversation 💬' },
                { id: 'travel', labelAr: 'سفر وسياحة ✈️', labelEn: 'Travel ✈️' },
                { id: 'business', labelAr: 'بيزنس ومهني 💼', labelEn: 'Business 💼' },
                { id: 'grammar', labelAr: 'قواعد ومفردات 📚', labelEn: 'Grammar 📚' },
                { id: 'kids', labelAr: 'أطفال ومرح 🎈', labelEn: 'Kids 🎈' },
                { id: 'tech', labelAr: 'ذكاء اصطناعي 🤖', labelEn: 'Tech & AI 🤖' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-black whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {isRtl ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-1 shrink-0 bg-slate-100 p-1 rounded-xl">
              <span className="text-[10px] font-black text-slate-400 px-2 uppercase">{isRtl ? 'المستوى:' : 'Level:'}</span>
              {['all', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
                <button
                  key={`lvl-${lvl}`}
                  onClick={() => setSelectedLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    selectedLevelFilter === lvl
                      ? 'bg-[#58cc02] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lvl === 'all' ? (isRtl ? 'الكل' : 'All') : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Produced Video Lessons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducedLessons.map((lesson) => (
              <motion.div
                key={lesson.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden border-2 border-b-[6px] border-slate-200 hover:border-[#58cc02] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Thumbnail / Header Stage */}
                  <div className="aspect-video relative overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 border border-white/20">
                      <Sparkles size={11} className="text-amber-400" />
                      <span>{lesson.badge}</span>
                    </div>

                    {/* Level & Duration */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <span className="bg-[#1cb0f6] text-white px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-sm">
                        {lesson.level}
                      </span>
                      <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] font-black">
                        {lesson.duration}
                      </span>
                    </div>

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setSelectedProducedLesson(lesson)}
                      className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                    >
                      <div className="w-14 h-14 bg-[#58cc02] text-white rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                        <Play size={24} fill="currentColor" className="ml-1" />
                      </div>
                    </button>
                  </div>

                  {/* Content Details */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-black text-slate-800 line-clamp-1 group-hover:text-[#58cc02] transition-colors">
                        {isRtl ? lesson.titleAr : lesson.titleEn}
                      </h3>
                      <p className="text-xs text-slate-400 font-bold line-clamp-1 mt-0.5">
                        {isRtl ? lesson.titleEn : lesson.titleAr}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                      {isRtl ? lesson.summaryAr : lesson.summaryEn}
                    </p>

                    <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400 font-bold border-t border-slate-100">
                      <span className="flex items-center gap-1 text-slate-600">
                        <Film size={13} className="text-[#58cc02]" />
                        {lesson.scenes.length} {isRtl ? 'مشاهد مصورة' : 'Scenes'}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <BookOpen size={13} className="text-[#1cb0f6]" />
                        {lesson.vocabulary.length} {isRtl ? 'مفردات أساسية' : 'Vocab'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProducedLesson(lesson)}
                    className="flex-1 py-3 bg-[#58cc02] hover:bg-[#64e404] text-white font-black text-xs uppercase tracking-wider rounded-xl border-b-3 border-[#3b8702] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Play size={14} fill="currentColor" />
                    <span>{isRtl ? 'مشاهدة الدرس بالصوت والصورة' : 'Play Audiovisual Lesson'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Download structured study sheet
                      const docContent = `=====================================================
${lesson.titleEn.toUpperCase()} (${lesson.titleAr})
Level: ${lesson.level} | Duration: ${lesson.duration}
Generated by English Academy AI Studio
=====================================================

SUMMARY:
${lesson.summaryEn}
${lesson.summaryAr}

KEY VOCABULARY:
${lesson.vocabulary.map((v, i) => `${i + 1}. ${v.word} [${v.pronunciation}] = ${v.meaningAr}\n   Example: "${v.exampleSentence}"`).join('\n\n')}

SCENES BREAKDOWN:
${lesson.scenes.map((s, i) => `--- Scene ${i + 1}: ${s.titleEn} (${s.titleAr}) ---
Characters: ${s.characters.map(c => `${c.name} (${c.role})`).join(', ')}
Dialogues:
${s.dialogues.map(d => `• ${d.speaker}: "${d.textEn}" [${d.phonetics || ''}] -> ${d.textAr}${d.grammarTip ? ` (Tip: ${d.grammarTip})` : ''}`).join('\n')}`).join('\n\n')}
`;
                      const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${lesson.titleEn.replace(/\s+/g, '_')}_Lesson_Package.txt`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    title={isRtl ? 'تحميل ملخص الدرس والمفردات' : 'Download Lesson Package'}
                    className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl border border-slate-200 transition-all active:scale-95 shrink-0"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ================= DIRECT UPLOADS & YOUTUBE TAB ================= */}
      {libraryTab === 'uploads' && (
        <div className="space-y-8">
          {/* DYNAMIC UPLOAD FORM (Direct Video Support) */}
          <AnimatePresence>
            {isEffectiveAdmin && showAddForm && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
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
                          <div className="space-y-4">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              {isRtl ? 'مصدر ملف الفيديو لتجنب الحذف الفجائي' : 'Video File Source (Prevents Ephemeral Erasing)'}
                            </label>
                            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                              <button
                                type="button"
                                onClick={() => { setDirectSourceMode('link'); setErrorText(''); }}
                                className={`py-1.5 rounded-lg text-[10px] font-black transition-all ${
                                  directSourceMode === 'link' ? 'bg-[#58cc02] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                              >
                                {isRtl ? 'رابط ملف مباشر دائم (مستحسن ⚡)' : 'Persistent Direct URL (Recommended ⚡)'}
                              </button>
                              <button
                                type="button"
                                onClick={() => { setDirectSourceMode('file'); setErrorText(''); }}
                                className={`py-1.5 rounded-lg text-[10px] font-black transition-all ${
                                  directSourceMode === 'file' ? 'bg-[#58cc02] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                              >
                                {isRtl ? 'رفع ملف فيديو (خادم مؤقت 📁)' : 'Upload Video File (Ephemeral 📁)'}
                              </button>
                            </div>

                            {directSourceMode === 'link' ? (
                              <div className="animate-fade-in">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                                  {isRtl ? 'رابط الفيديو المباشر المستضاف (تشغيل فوري دائم للجميع)' : 'Persistent Cloud Hosting Direct Link (Permanent Stream)'}
                                </label>
                                <input
                                  type="text"
                                  required={directSourceMode === 'link'}
                                  value={directLinkUrl}
                                  onChange={(e) => {
                                    setDirectLinkUrl(e.target.value);
                                    setErrorText('');
                                  }}
                                  placeholder={isRtl ? 'https://example.com/videos/lesson1.mp4 (رابط Dropbox أو Drive أو استضافة خارجية)' : 'e.g., dropbox direct link, static server url, etc'}
                                  className="w-full text-xs font-semibold border-2 border-slate-200 focus:border-[#58cc02] outline-none rounded-xl p-3.5 transition-colors placeholder-slate-300"
                                />
                                <p className="text-[9px] text-amber-600 font-bold mt-2 leading-relaxed">
                                  {isRtl 
                                    ? '⚠️ ملاحظة هامة: نظراً لطبيعة الخادم السحابي المؤقت، يُنصح بشدة بوضع الفيديوهات على Dropbox أو Google Drive ووضع الرابط المباشر هنا لضمان تشغيله بشكل دائم وثابت للطلاب دون الخوف من المسح المستقبلي.'
                                    : '⚠️ Highly recommended: Cloud links ensure steady, zero-touch perpetual views since the ephemeral server resets will not erase external files.'
                                  }
                                </p>
                              </div>
                            ) : (
                              <div className="animate-fade-in">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                                  {isRtl ? 'اختر ملف الفيديو عالي الدقة (MP4, MOV, WEBM) 📂' : 'Select HD Video File (MP4, MOV, WEBM) 📂'}
                                </label>
                                <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50 text-center hover:bg-slate-100/50 transition-colors cursor-pointer group">
                                  <input 
                                    type="file" 
                                    accept="video/*" 
                                    required={directSourceMode === 'file'}
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                  />
                                  <UploadCloud size={32} className="mx-auto text-slate-400 group-hover:text-[#58cc02] transition-colors mb-2" />
                                  <p className="text-xs font-black text-slate-700">
                                    {videoFile ? videoFile.name : (isRtl ? 'اسحب ملف الفيديو هنا أو اضغط للتصفح' : 'Drag video file here or browse files')}
                                  </p>
                                  <p className="text-[9px] text-slate-400 mt-1 font-bold">
                                    {videoFile ? `${(videoFile.size / (1024*1024)).toFixed(1)} MB` : (isRtl ? 'ملفات يتم حفظها محلياً ومؤقتاً' : 'No size boundaries - Local & Ephemeral Server Storage')}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allVideos.map((video, vIdx) => {
                const isDirectFile = !!video.directUrl;
                return (
                  <motion.div 
                    key={`video-card-${video.id || vIdx}`}
                    whileHover={enabled || isEffectiveAdmin ? { y: -6 } : {}}
                    className={`bg-white rounded-[2rem] overflow-hidden border-2 border-b-[6px] border-slate-200 hover:border-slate-300 transition-all cursor-pointer relative group flex flex-col justify-between ${
                      !(enabled || isEffectiveAdmin) ? 'grayscale opacity-70 cursor-not-allowed' : ''
                    }`}
                    onClick={() => handleSelectVideo(video)}
                  >
                    {/* Trash Deletion Button for Admins */}
                    {isEffectiveAdmin && (
                      <button 
                        onClick={(e) => handleDeleteVideo(video.id, e)}
                        className="absolute top-3 right-3 z-30 w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center border-b-2 border-red-700 hover:bg-red-600 active:scale-90 transition-all shadow-md cursor-pointer"
                        title={isRtl ? 'حذف الدرس' : 'Delete Lesson'}
                      >
                        <Trash2 size={14} strokeWidth={2.5} />
                      </button>
                    )}

                    {/* Direct File or Youtube Source badge */}
                    <span className={`absolute top-3 left-3 z-35 text-white px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm border-b-2 ${
                      isDirectFile ? 'bg-[#58cc02] border-[#439b02]' : 'bg-[#1cb0f6] border-[#139ddb]'
                    }`}>
                      {isDirectFile ? (isRtl ? 'مباشر 📁' : 'Direct file 📁') : 'YouTube'}
                    </span>

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
                         <div className="w-12 h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                           <Play fill="currentColor" size={20} />
                         </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-20">
                        <span className="bg-black/60 backdrop-blur-[2px] text-white px-2.5 py-0.5 rounded-full text-[9px] font-black">{video.duration}</span>
                        <span className="bg-[#1cb0f6] border-b-2 border-[#1292ce] text-white px-2.5 py-0.5 rounded-full text-[9px] font-black shadow-sm">{video.level}</span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-800 line-clamp-2 mb-2 leading-snug group-hover:text-[#58cc02] transition-colors">
                          {isRtl ? video.titleAr : video.titleEn}
                        </h3>
                        {isDirectFile && (
                          <div className="mb-3 flex items-center gap-1.5 text-[10px] font-black">
                            {localVideoStatusMap[video.id] ? (
                              <span className="text-[#58cc02] bg-green-50 px-2 py-0.5 rounded-lg border border-green-200 shadow-sm">
                                {isRtl ? '⚡ جاهز للتشغيل' : '⚡ Cached'}
                              </span>
                            ) : (
                              <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 shadow-sm">
                                {isRtl ? '📁 ملف مباشر' : '📁 Direct file'}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button className="flex-1 duo-btn-white py-2.5 text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 font-black">
                          {t.watchNow}
                          <ChevronRight size={12} className={isRtl ? 'rotate-180' : ''} />
                        </button>

                        <button
                          onClick={(e) => handleDownloadVideo(video, e)}
                          title={isRtl ? 'تحميل الفيديو' : 'Download Video'}
                          disabled={downloadingId === video.id}
                          className="p-2.5 bg-slate-100 hover:bg-[#58cc02] hover:text-white text-slate-600 rounded-xl transition-all border border-slate-200 shrink-0"
                        >
                          {downloadingId === video.id ? (
                            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Download size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* FOOTER INFO BANNER */}
      <footer className="mt-14 p-8 bg-white border-2 border-b-[6px] border-slate-200 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="relative flex items-center gap-5">
            <div className="w-16 h-16 bg-[#58cc02] rounded-[1.5rem] flex items-center justify-center text-3xl shadow-md rotate-3 shrink-0 border-b-4 border-[#46a302]">
              🦉
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-800">{isRtl ? 'مسارات تعلم تفاعلية متكاملة بالصوت والصورة' : 'Unlimited Immersive Audiovisual Curriculums'}</h4>
              <p className="text-slate-400 text-xs font-bold mt-1 max-w-lg leading-relaxed">
                {isRtl 
                  ? 'تم ترقية الأكاديمية بالكامل لدعم إنتاج دروس فيديو تعليمية ناطقة بالصوت وحركات الشخصيات مع تصدير الفيديو والملخصات وتحميل الملفات المباشرة دون قيود.' 
                  : 'Fully upgraded with AI-powered audiovisual character-narrated video production, offline study guides, and instant video download workflows.'}
              </p>
            </div>
          </div>
          <div className="bg-slate-50 border-2 border-slate-200 px-6 py-4 rounded-2xl relative shrink-0">
             <div className="flex items-center gap-4">
                <Sparkle className="text-[#ff9600] animate-spin-slow" />
                <div>
                  <span className="block text-xl font-black text-slate-800 leading-none">
                    {libraryTab === 'produced' ? producedLessons.length : allVideos.length}
                  </span>
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mt-1">
                    {libraryTab === 'produced' ? (isRtl ? 'دروس منتجة ناطقة' : 'Produced Lessons') : (isRtl ? 'فيديوهات بالمكتبة' : 'Library Videos')}
                  </span>
                </div>
             </div>
          </div>
      </footer>

      {/* AI VIDEO STUDIO MODAL */}
      <AiVideoStudioModal
        isOpen={showAiStudioModal}
        onClose={() => setShowAiStudioModal(false)}
        isRtl={isRtl}
        onLessonCreated={(newLesson) => {
          setProducedLessons((prev) => [newLesson, ...prev]);
          setLibraryTab('produced');
          setSelectedProducedLesson(newLesson);
        }}
      />
    </div>
  );
};
