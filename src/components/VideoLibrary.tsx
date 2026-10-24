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
import { db, auth, storage } from '../lib/firebase';
import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
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
import {
  SectionShell,
  GoldCard,
  LessonTile,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  ProgressPill,
  TutorFace,
} from './ui/academy';

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
    titleEn: 'Airport & Travel Essentials',
    titleAr: 'المطار ومحادثات السفر الأساسية',
    level: 'B1',
    duration: '7:40',
    thumbnail: 'https://img.youtube.com/vi/h2O3vHhREfA/hqdefault.jpg'
  },
  {
    id: 'default-5',
    youtubeId: 'h2O3vHhREfA',
    titleEn: 'Advanced Business English',
    titleAr: 'إنجليزية الأعمال المتقدمة',
    level: 'B2',
    duration: '12:30',
    thumbnail: 'https://img.youtube.com/vi/h2O3vHhREfA/hqdefault.jpg'
  }
];

export const getTranslatedBadge = (badge: string, isRtl: boolean) => {
  if (!badge) return isRtl ? 'درس مرئي 🎬' : 'Video Lesson 🎬';
  if (isRtl) {
    if (badge.includes('Interactive AI') || badge.includes('AI') || badge.includes('ذكاء')) return 'ذكاء اصطناعي تفاعلي 🤖';
    if (badge.includes('Oxford') || badge.includes('أوكسفورد')) return 'أوكسفورد واقعي 🇬🇧';
    if (badge.includes('Vocabulary') || badge.includes('مفردات')) return 'مفردات متقدمة 📚';
    if (badge.includes('Travel') || badge.includes('سياحة') || badge.includes('سفر')) return 'سياحة وسفر ✈️';
    if (badge.includes('Business') || badge.includes('بيزنس') || badge.includes('مهني')) return 'بيزنس واحتراف 💼';
    if (badge.includes('Grammar') || badge.includes('قواعد')) return 'قواعد تفاعلية ⚡';
    if (badge.includes('Kids') || badge.includes('أطفال')) return 'أطفال ومرح 🎈';
    if (badge.includes('Conversation') || badge.includes('محادثة')) return 'محادثة حية 💬';
    if (badge.includes('Health') || badge.includes('Doctor') || badge.includes('صحة')) return 'صحة وحياة 🏥';
    if (badge.includes('Hotel') || badge.includes('فنادق')) return 'سياحة وفنادق 🏨';
    if (badge.includes('Food') || badge.includes('مطاعم')) return 'مطاعم وطعام 🍕';
    return badge;
  } else {
    if (badge.includes('ذكاء')) return 'Interactive AI 🤖';
    if (badge.includes('أوكسفورد')) return 'Oxford Real-world 🇬🇧';
    if (badge.includes('مفردات')) return 'Advanced Vocab 📚';
    if (badge.includes('سياحة') || badge.includes('سفر')) return 'Travel & Tourism ✈️';
    if (badge.includes('بيزنس') || badge.includes('مهني')) return 'Business & Career 💼';
    if (badge.includes('قواعد')) return 'Interactive Grammar ⚡';
    if (badge.includes('أطفال')) return 'Kids & Fun 🎈';
    if (badge.includes('محادثة')) return 'Live Conversation 💬';
    if (badge.includes('صحة')) return 'Health & Life 🏥';
    if (badge.includes('فنادق')) return 'Hotels & Tourism 🏨';
    if (badge.includes('مطاعم') || badge.includes('طعام')) return 'Dining & Food 🍕';
    return badge;
  }
};

// Helper to extract clean youtube ID
function extractYoutubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const cleaned = urlOrId.trim();
  if (cleaned.length === 11 && !cleaned.includes('/') && !cleaned.includes('.')) {
    return cleaned;
  }
  if (!/^(https?:\/\/)?((www|m|music)\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\//i.test(cleaned)) return '';
  const regExp = /(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|live\/|watch\?v=|\&v=)([A-Za-z0-9_-]{11})/;
  const match = cleaned.match(regExp);
  return match ? match[2] : '';
}

const MAX_VIDEO_BYTES = 500 * 1024 * 1024;
const VIDEO_THUMB = 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23001a38%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8E%AC%3C/text%3E%3C/svg%3E';

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
  const t = Object.assign((ar: string, en: string) => (lang === 'ar' ? ar : en), translations[lang]);
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
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
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
              // Legacy server-disk uploads no longer exist
              statusMap[v.id] = false;
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
            setHasVideoPlayError(true);
          }
        } catch (err) {
          console.warn("Failed to load local video cache:", String(err));
          setHasVideoPlayError(true);
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
      setErrorText(t('تعذر إنشاء اختبار الفيديو من الخادم حالياً، يُرجى المحاولة بعد قليل.', 'Unable to generate video quiz from server, please try again later.'));
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
        setErrorText(t('الرجاء اختيار ملف فيديو صالح فقط!', 'Please select a valid video file only!'));
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
        let storagePath = '';

        if (directSourceMode === 'link') {
          if (!directLinkUrl.trim()) {
            setErrorText(t('الرجاء إدخال رابط الفيديو المباشر الأول.', 'Please enter the direct video URL first.'));
            setActionLoading(false);
            return;
          }
          finalDirectUrl = directLinkUrl.trim();
          finalFileName = directLinkUrl.split('/').pop()?.split('?')[0] || 'Cloud Hosted Video';
          finalFileSize = 'Persistent Web Link';
        } else {
          if (!videoFile) {
            setErrorText(t('الرجاء اختيار ملف فيديو للتحميل المباشر.', 'Please select a video file to proceed with direct upload.'));
            setActionLoading(false);
            return;
          }
          const okType = /^video\/(mp4|webm|quicktime|ogg)$/.test(videoFile.type);
          if (!okType) {
            setErrorText(t('نوع الملف غير مدعوم. استخدم MP4 أو WebM أو MOV.', 'Unsupported file type. Use MP4, WebM or MOV.'));
            setActionLoading(false);
            return;
          }
          if (videoFile.size > MAX_VIDEO_BYTES) {
            setErrorText(t('حجم الفيديو أكبر من 500 ميجابايت.', 'Video is larger than 500 MB.'));
            setActionLoading(false);
            return;
          }
          const uid = auth.currentUser?.uid;
          if (!uid) {
            setErrorText(t('سجّل الدخول أولاً لرفع الفيديو.', 'Please sign in to upload.'));
            setActionLoading(false);
            return;
          }
          const sizeMB = (videoFile.size / (1024 * 1024)).toFixed(1);
          finalFileName = videoFile.name;
          finalFileSize = `${sizeMB} MB`;
          const safeName = videoFile.name.replace(/[^A-Za-z0-9._-]/g, '_').slice(-80);
          const objectRef = storageRef(storage, `videos/${uid}/${Date.now()}_${safeName}`);
          setUploadProgress(0);
          const task = uploadBytesResumable(objectRef, videoFile, { contentType: videoFile.type });
          await new Promise<void>((resolve, reject) => {
            task.on('state_changed', (snap) => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)), reject, () => resolve());
          });
          finalDirectUrl = await getDownloadURL(objectRef);
          storagePath = objectRef.fullPath;
        }

        await addDoc(collection(db, 'videos'), {
          directUrl: finalDirectUrl,
          ...(storagePath ? { storagePath } : {}),
          fileName: finalFileName,
          fileSize: finalFileSize,
          titleEn: inputTitleEn.trim() || finalFileName,
          titleAr: inputTitleAr.trim() || finalFileName,
          level: inputLevel,
          duration: 'Direct HD',
          thumbnail: VIDEO_THUMB,
          createdAt: serverTimestamp()
        });

        setSuccessText(t('🎉 تم إضافة الفيديو المباشر بنجاح وتأمينه للتشغيل الفوري!', '🎉 Direct HD video added and secured successfully!'));
      } else {
        // YouTube alternative
        const youtubeId = extractYoutubeId(inputUrl);
        if (!youtubeId) {
          setErrorText(t('الرجاء إدخال رابط يوتيوب صالح.', 'Please enter a valid YouTube link.'));
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

        setSuccessText(t('🎉 تم إضافة رابط يوتيوب بنجاح!', '🎉 YouTube video link added successfully!'));
      }

      // Reset state
      setInputUrl('');
      setDirectLinkUrl('');
      setInputTitleEn('');
      setInputTitleAr('');
      setInputLevel('A1');
      setVideoFile(null);
      setUploadProgress(null);

      setTimeout(() => {
        setShowAddForm(false);
        setSuccessText('');
      }, 2000);

    } catch (err: any) {
      console.warn(String(err));
      const code = String(err?.code || '');
      setErrorText(code.includes('unauthorized')
        ? t('لا تملك صلاحية الرفع. تأكد من نشر قواعد التخزين.', 'Upload not permitted. Check storage rules.')
        : t('تعذّر حفظ الفيديو. حاول مرة أخرى.', 'Could not save the video. Please try again.'));
      setUploadProgress(null);
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
            setErrorText(t('هذا الفيديو القديم غير متاح للتنزيل. أعد رفعه.', 'This legacy video is unavailable. Please re-upload it.'));
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
    if (!window.confirm(t('هل تريد بالتأكيد حذف درس الفيديو هذا بشكل نهائي؟', 'Are you sure you want to permanently delete this video lesson?'))) {
      return;
    }

    try {
      if (vidId.startsWith('default-')) {
        const updated = [...deletedDefaultIds, vidId];
        setDeletedDefaultIds(updated);
        localStorage.setItem('deleted_default_videos', JSON.stringify(updated));
      } else {
        const target = dbVideos.find((v: any) => v.id === vidId) as any;
        await deleteDoc(doc(db, 'videos', vidId));
        await deleteVideoFile(vidId).catch(() => {});
        if (target?.storagePath) {
          await deleteObject(storageRef(storage, target.storagePath)).catch(err => console.warn('Storage delete failed:', String(err)));
        }
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
      <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={`pb-28 ${isRtl ? 'font-arabic' : 'font-sans'} overflow-x-hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <GhostButton 
            onClick={() => {
              setSelectedVideo(null);
              setQuizStarted(false);
              setQuizQuestions([]);
              setUserAnswers([]);
              setQuizFinished(false);
              setSelectedOptionIdx(null);
              setHasChecked(false);
            }}
          >
            <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
            {t('العودة للمكتبة', 'Back to Library')}
          </GhostButton>

          <PrimaryButton
            onClick={(e) => handleDownloadVideo(selectedVideo, e)}
            disabled={downloadingId === selectedVideo.id}
          >
            {downloadingId === selectedVideo.id ? (
              <div className="w-4 h-4 border-2 border-[#E6C36A] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download size={15} />
            )}
            <span>{t('تحميل الفيديو / الملف', 'Download Video / Guide')}</span>
          </PrimaryButton>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {/* Player in a navy card with a gold frame */}
          <div className="rounded-2xl bg-[#002147] p-2.5 sm:p-3 border-2 border-[#C49E3A] shadow-sm">
            <div className="aspect-video rounded-xl overflow-hidden bg-[#001a38] border border-[#C49E3A]/40 relative">
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
                    <div className="w-full h-full bg-[#001a38] flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-2 border-[#C49E3A] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {hasVideoPlayError && (
                    <div className="absolute inset-0 bg-[#001a38]/95 flex flex-col items-center justify-center p-4 sm:p-6 text-center text-white z-25 font-sans">
                      <div className="w-10 h-10 bg-red-600/20 text-red-400 rounded-xl flex items-center justify-center mb-2 border border-red-500/40">
                        <AlertCircle size={20} />
                      </div>
                      <h5 className="text-xs sm:text-sm font-black mb-1 px-2 text-[#E6C36A]">
                        {t('عذراً، تعذر تشغيل ملف الفيديو المباشر في المتصفح', 'Direct video stream cannot be loaded')}
                      </h5>
                      <p className="text-[11px] text-white/80 font-bold mb-3 max-w-md px-2 leading-relaxed">
                        {isRtl 
                          ? `نظراً لإمكانية إعادة تشغيل خادم التطبيق السحابي المؤقت أو القيود المفروضة على IndexedDB بالمتصفح، قد لا يكون الملف متاحاً. يرجى إعادة اختيار ملف الفيديو [ ${selectedVideo.fileName || 'ملف الدرس'} ] من جهازك لرفعه للجميع واسترجاع البث فوراً!`
                          : `Due to ephemeral cloud server restarts or browser sandbox storage limits, the video file might be off. Re-select [ ${selectedVideo.fileName || 'the lesson file'} ] to link it and stream instantly!`}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 justify-center">
                        <label className="px-3.5 py-2 bg-[#C49E3A] text-[#002147] rounded-xl text-xs font-black cursor-pointer select-none inline-flex items-center gap-1.5 active:scale-95 transition-transform">
                          <FileVideo size={14} />
                          {t('اختر ملف الفيديو لإصلاحه 📁', 'Choose Local File to Restore 📁')}
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
                          className="px-3.5 py-2 bg-[#002147] border border-[#C49E3A] rounded-xl text-xs font-black text-[#E6C36A] active:scale-95 transition-transform"
                        >
                          {t('تخطي وإعادة المحاولة 🔄', 'Ignore & Retry 🔄')}
                        </button>
                      </div>
                    </div>
                  )}

                  {savingRequiredFile && (
                    <div className="absolute inset-0 bg-[#001a38]/90 flex flex-col items-center justify-center space-y-2 z-30">
                      <div className="w-8 h-8 border-2 border-[#C49E3A] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-black text-[#E6C36A]">{t('جاري تحسين وتهيئة الفيديو وحفظه فورا...', 'Buffering & caching locally...')}</span>
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
          </div>

          <GoldCard>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <ProgressPill>{selectedVideo.level}</ProgressPill>
              <ProgressPill>
                {isDirect ? t('تحميل فيديو مباشر 📁', 'Direct Video HD 📁') : 'YouTube HD'}
              </ProgressPill>
              {selectedVideo.fileSize && (
                <ProgressPill>{selectedVideo.fileSize}</ProgressPill>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#002147] mb-2 leading-tight">
              {isRtl ? selectedVideo.titleAr : selectedVideo.titleEn}
            </h2>
            {isDirect && !activePlayUrl && (
              <div className="p-3.5 bg-[#fdfaf3] border border-[#C49E3A] text-[#002147] rounded-xl text-xs font-bold flex items-center gap-2.5 mt-3">
                <AlertCircle size={18} className="shrink-0 text-[#C49E3A]" />
                <span>
                  {t(
                    'يتطلب تشغيل هذا الملف اختيار ملف الفيديو المباشر من جهازك لمرة واحدة فقط ليقوم المتصفح بحفظه واستدعاءه تلقائياً دائماً.',
                    'Playing this file requires selecting the direct video file from your device once so your browser can recall and load it automatically.'
                  )}
                </span>
              </div>
            )}
            <p className="text-[#002147]/75 text-xs sm:text-sm leading-relaxed font-bold mt-2">
              {t(
                'شاهد الفيديو واستمتع بالتعلم وتطوير مهارات الإستماع والتحدث بطلاقة وثقة.',
                'Watch the video and enjoy learning to develop premium listening, pronunciation, and speaking skills.'
              )}
            </p>
          </GoldCard>
        </div>
      </SectionShell>
    );
  }

  // Filter produced video lessons
  const filteredProducedLessons = producedLessons.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesLevel = selectedLevelFilter === 'all' || lesson.level === selectedLevelFilter;
    return matchesCategory && matchesLevel;
  });

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={`pb-28 ${isRtl ? 'font-arabic' : 'font-sans'} overflow-x-hidden`}>
      
      {/* Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <p className="text-[#002147]/75 font-bold text-xs">
          {t(
            'دروس مرئية ناطقة بالصوت والصورة وحركة الشخصيات، مع إمكانية إنتاج فيديوهات جديدة وتحميل الفيديوهات والملخصات',
            'Interactive narrated video lessons with audio, animation, AI production, and instant video downloading'
          )}
        </p>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* AI VIDEO GENERATOR BUTTON */}
          <PrimaryButton onClick={() => setShowAiStudioModal(true)}>
            <Wand2 size={15} />
            <span>{t('إنتاج فيديو بالذكاء الاصطناعي 🪄', 'AI Video Producer Studio 🪄')}</span>
          </PrimaryButton>

          {/* SIMULATION SWITCH */}
          {!isAdminUser && (
            <GhostButton 
              active={forceAdminMode}
              onClick={() => setForceAdminMode(!forceAdminMode)}
            >
              <Sparkle size={12} />
              <span>{forceAdminMode ? t('وضع المدير نشط', 'Admin Mode') : t('محاكاة وضع المدير', 'Simulate Admin')}</span>
            </GhostButton>
          )}

          {isEffectiveAdmin && (
            <GhostButton 
              active={showAddForm}
              onClick={() => {
                setShowAddForm(!showAddForm);
                setErrorText('');
                setSuccessText('');
              }}
            >
              <Plus size={15} />
              <span>{t('إضافة فيديو يدوي', 'Upload Manual Video')}</span>
            </GhostButton>
          )}
        </div>
      </div>

      {/* TOP TABS SELECTOR (Produced Audiovisual vs Direct Uploads) */}
      <GoldCard className="p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-full min-w-0 overflow-hidden">
        <button
          onClick={() => setLibraryTab('produced')}
          className={`w-full sm:flex-1 min-w-0 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 border ${
            libraryTab === 'produced'
              ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
              : 'bg-white text-[#002147] border-[#C49E3A]/40 hover:bg-[#fdfaf3]'
          }`}
        >
          <Film size={16} className="shrink-0" />
          <span className="truncate">{t('الدروس المرئية المنتجة (بالصوت والصورة) 🎬', 'Produced Audiovisual Video Lessons 🎬')}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black shrink-0 ${
            libraryTab === 'produced' ? 'bg-[#C49E3A] text-[#002147]' : 'bg-[#fdfaf3] text-[#002147] border border-[#C49E3A]/40'
          }`}>
            {producedLessons.length}
          </span>
        </button>

        <button
          onClick={() => setLibraryTab('uploads')}
          className={`w-full sm:flex-1 min-w-0 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 border ${
            libraryTab === 'uploads'
              ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
              : 'bg-white text-[#002147] border-[#C49E3A]/40 hover:bg-[#fdfaf3]'
          }`}
        >
          <HardDriveDownload size={16} className="shrink-0" />
          <span className="truncate">{t('مكتبة التحميل المباشر واليوتيوب 📁', 'Direct Uploads & YouTube Library 📁')}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black shrink-0 ${
            libraryTab === 'uploads' ? 'bg-[#C49E3A] text-[#002147]' : 'bg-[#fdfaf3] text-[#002147] border border-[#C49E3A]/40'
          }`}>
            {allVideos.length}
          </span>
        </button>
      </GoldCard>

      {/* ================= PRODUCED AUDIOVISUAL LESSONS TAB ================= */}
      {libraryTab === 'produced' && (
        <div className="space-y-4 min-w-0">
          {/* Filters Bar */}
          <GoldCard className="p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 min-w-0 max-w-full">
            {/* Category Filter: pills with gold border (navy when active) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full min-w-0 max-w-full">
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
                  className={`px-3 py-1.5 rounded-xl font-black whitespace-nowrap transition-transform active:scale-95 shrink-0 border ${
                    selectedCategory === cat.id
                      ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
                      : 'bg-white text-[#002147] border-[#C49E3A] hover:bg-[#fdfaf3]'
                  }`}
                >
                  {isRtl ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-1 shrink-0 bg-[#fdfaf3] border border-[#C49E3A]/40 p-1 rounded-xl overflow-x-auto max-w-full no-scrollbar">
              <span className="text-[10px] font-black text-[#002147]/70 px-2 uppercase shrink-0">{t('المستوى:', 'Level:')}</span>
              {['all', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
                <button
                  key={`lvl-${lvl}`}
                  onClick={() => setSelectedLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-transform active:scale-95 shrink-0 border ${
                    selectedLevelFilter === lvl
                      ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
                      : 'bg-transparent border-transparent text-[#002147]/70 hover:text-[#002147]'
                  }`}
                >
                  {lvl === 'all' ? t('الكل', 'All') : lvl}
                </button>
              ))}
            </div>
          </GoldCard>

          {/* Grid of Produced Video Lessons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0">
            {filteredProducedLessons.map((lesson) => (
              <GoldCard
                key={lesson.id}
                className="p-0 overflow-hidden flex flex-col justify-between group min-w-0"
              >
                <div>
                  {/* Thumbnail / Header Stage */}
                  <div className="aspect-video relative overflow-hidden bg-[#001a38] flex items-center justify-center border-b border-[#C49E3A]/30">
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.titleEn}
                      className="w-full h-full object-cover opacity-85"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = VIDEO_THUMB;
                      }}
                    />
                    <div className="absolute inset-0 bg-[#001a38]/35" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-[#002147]/90 text-[#E6C36A] px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 border border-[#C49E3A]/60">
                      <span>{getTranslatedBadge(lesson.badge, isRtl)}</span>
                    </div>

                    {/* Level & Duration */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                      <span className="bg-[#002147] text-[#E6C36A] border border-[#C49E3A] px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-sm">
                        {lesson.level}
                      </span>
                      <span className="bg-[#001a38]/90 text-white border border-[#C49E3A]/40 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                        {lesson.duration}
                      </span>
                    </div>

                    {/* Gold Play Badge Overlay */}
                    <button
                      onClick={() => setSelectedProducedLesson(lesson)}
                      className="absolute inset-0 flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <div className="w-13 h-13 bg-[#C49E3A] text-[#002147] rounded-full flex items-center justify-center shadow-md border-2 border-[#E6C36A]">
                        <Play size={22} fill="currentColor" className="ml-0.5" />
                      </div>
                    </button>
                  </div>

                  {/* Content Details */}
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <div>
                      <h3 className="text-base font-black text-[#002147] line-clamp-1">
                        {isRtl ? lesson.titleAr : lesson.titleEn}
                      </h3>
                      <p className="text-xs text-[#002147]/65 font-bold line-clamp-1 mt-0.5">
                        {isRtl ? lesson.titleEn : lesson.titleAr}
                      </p>
                    </div>

                    <p className="text-xs text-[#002147]/80 font-medium line-clamp-2 leading-relaxed">
                      {isRtl ? lesson.summaryAr : lesson.summaryEn}
                    </p>

                    <div className="flex items-center gap-3 pt-2 text-[11px] text-[#002147]/75 font-bold border-t border-[#C49E3A]/20">
                      <span className="flex items-center gap-1">
                        <Film size={13} className="text-[#C49E3A]" />
                        {lesson.scenes.length} {t('مشاهد مصورة', 'Scenes')}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={13} className="text-[#C49E3A]" />
                        {lesson.vocabulary.length} {t('مفردات أساسية', 'Vocab')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
                  <PrimaryButton
                    onClick={() => setSelectedProducedLesson(lesson)}
                    className="flex-1"
                  >
                    <Play size={14} fill="currentColor" />
                    <span className="truncate">{t('مشاهدة الدرس بالصوت والصورة', 'Play Audiovisual Lesson')}</span>
                  </PrimaryButton>

                  <GhostButton
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
                    title={t('تحميل ملخص الدرس والمفردات', 'Download Lesson Package')}
                    className="p-2.5 shrink-0"
                  >
                    <Download size={16} />
                  </GhostButton>
                </div>
              </GoldCard>
            ))}
          </div>
        </div>
      )}

      {/* ================= DIRECT UPLOADS & YOUTUBE TAB ================= */}
      {libraryTab === 'uploads' && (
        <div className="space-y-6">
          {/* DYNAMIC UPLOAD FORM (Direct Video Support) */}
          <AnimatePresence>
            {isEffectiveAdmin && showAddForm && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <GoldCard>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-[#C49E3A]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#002147] text-[#E6C36A] border border-[#C49E3A] rounded-xl flex items-center justify-center shrink-0">
                        <Video size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-[#002147] uppercase tracking-wider">{t('تحميل مباشر للفيديوهات عالية الجودة', 'HD Direct Video Upload Engine')}</h3>
                        <p className="text-[10px] text-[#002147]/70 font-bold">{t('سعة استيعابية كاملة لتحميل أي فيديو .mp4 بدقة عالية جداً!', 'Zero-compression playback for local highly precise media files')}</p>
                      </div>
                    </div>

                    {/* TABS for Upload Source */}
                    <div className="flex items-center bg-[#fdfaf3] border border-[#C49E3A]/40 p-1 rounded-xl">
                      <button 
                        type="button"
                        onClick={() => { setUploadTab('direct'); setErrorText(''); }}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                          uploadTab === 'direct' ? 'bg-[#002147] text-[#E6C36A] shadow-sm' : 'text-[#002147]/70 hover:text-[#002147]'
                        }`}
                      >
                        {t('فيديو مباشر (لا يحتاج رابط)', 'Direct Video File')}
                      </button>
                      <button 
                        type="button"
                        onClick={() => { setUploadTab('youtube'); setErrorText(''); }}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                          uploadTab === 'youtube' ? 'bg-[#002147] text-[#E6C36A] shadow-sm' : 'text-[#002147]/70 hover:text-[#002147]'
                        }`}
                      >
                        YouTube Link
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleAddVideo} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-4">
                        {uploadTab === 'direct' ? (
                          <div className="space-y-3">
                            <label className="block text-[10px] font-black text-[#002147]/70 uppercase tracking-wider">
                              {t('مصدر ملف الفيديو لتجنب الحذف الفجائي', 'Video File Source (Prevents Ephemeral Erasing)')}
                            </label>
                            <div className="grid grid-cols-2 gap-2 bg-[#fdfaf3] border border-[#C49E3A]/40 p-1 rounded-xl">
                              <button
                                type="button"
                                onClick={() => { setDirectSourceMode('link'); setErrorText(''); }}
                                className={`py-1.5 rounded-lg text-[10px] font-black transition-all ${
                                  directSourceMode === 'link' ? 'bg-[#002147] text-[#E6C36A] shadow-sm' : 'text-[#002147]/70 hover:text-[#002147]'
                                }`}
                              >
                                {t('رابط ملف مباشر دائم (مستحسن ⚡)', 'Persistent Direct URL (Recommended ⚡)')}
                              </button>
                              <button
                                type="button"
                                onClick={() => { setDirectSourceMode('file'); setErrorText(''); }}
                                className={`py-1.5 rounded-lg text-[10px] font-black transition-all ${
                                  directSourceMode === 'file' ? 'bg-[#002147] text-[#E6C36A] shadow-sm' : 'text-[#002147]/70 hover:text-[#002147]'
                                }`}
                              >
                                {t('رفع ملف فيديو (خادم مؤقت 📁)', 'Upload Video File (Ephemeral 📁)')}
                              </button>
                            </div>

                            {directSourceMode === 'link' ? (
                              <div>
                                <label className="block text-[10px] font-black text-[#002147]/70 uppercase tracking-wider mb-1.5">
                                  {t('رابط الفيديو المباشر المستضاف (تشغيل فوري دائم للجميع)', 'Persistent Cloud Hosting Direct Link (Permanent Stream)')}
                                </label>
                                <input
                                  type="text"
                                  required={directSourceMode === 'link'}
                                  value={directLinkUrl}
                                  onChange={(e) => {
                                    setDirectLinkUrl(e.target.value);
                                    setErrorText('');
                                  }}
                                  placeholder={t('https://example.com/videos/lesson1.mp4 (رابط Dropbox أو Drive أو استضافة خارجية)', 'e.g., dropbox direct link, static server url, etc')}
                                  className="w-full text-xs font-semibold bg-[#fdfaf3] border border-[#C49E3A]/40 focus:ring-2 focus:ring-[#C49E3A] outline-none rounded-xl p-3 text-[#002147]"
                                />
                                <p className="text-[10px] text-[#002147]/70 font-bold mt-2 leading-relaxed">
                                  {t(
                                    '⚠️ ملاحظة هامة: نظراً لطبيعة الخادم السحابي المؤقت، يُنصح بشدة بوضع الفيديوهات على Dropbox أو Google Drive ووضع الرابط المباشر هنا لضمان تشغيله بشكل دائم وثابت للطلاب دون الخوف من المسح المستقبلي.',
                                    '⚠️ Highly recommended: Cloud links ensure steady, zero-touch perpetual views since the ephemeral server resets will not erase external files.'
                                  )}
                                </p>
                              </div>
                            ) : (
                              <div>
                                <label className="block text-[10px] font-black text-[#002147]/70 uppercase tracking-wider mb-1.5">
                                  {t('اختر ملف الفيديو عالي الدقة (MP4, MOV, WEBM) 📂', 'Select HD Video File (MP4, MOV, WEBM) 📂')}
                                </label>
                                <div className="relative border-2 border-dashed border-[#C49E3A]/50 rounded-xl p-5 bg-[#fdfaf3] text-center hover:border-[#C49E3A] transition-colors cursor-pointer group">
                                  <input 
                                    type="file" 
                                    accept="video/*" 
                                    required={directSourceMode === 'file'}
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                  />
                                  <UploadCloud size={28} className="mx-auto text-[#C49E3A] mb-2" />
                                  <p className="text-xs font-black text-[#002147]">
                                    {videoFile ? videoFile.name : t('اسحب ملف الفيديو هنا أو اضغط للتصفح', 'Drag video file here or browse files')}
                                  </p>
                                  <p className="text-[10px] text-[#002147]/65 mt-1 font-bold">
                                    {videoFile ? `${(videoFile.size / (1024*1024)).toFixed(1)} MB` : t('ملفات يتم حفظها محلياً ومؤقتاً', 'No size boundaries - Local & Ephemeral Server Storage')}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <label className="block text-[10px] font-black text-[#002147]/70 uppercase tracking-wider mb-1.5">{t('رابط يوتيوب أو رمز الفيديو', 'YouTube Link or Video ID')}</label>
                            <input 
                              type="text" 
                              required
                              value={inputUrl}
                              onChange={(e) => {
                                setInputUrl(e.target.value);
                                setErrorText('');
                              }}
                              placeholder={t('مثال: https://www.youtube.com/watch?v=j7u280G6W3E', 'e.g., https://www.youtube.com/watch?v=j7u280G6W3E')}
                              className="w-full text-xs font-medium bg-[#fdfaf3] border border-[#C49E3A]/40 focus:ring-2 focus:ring-[#C49E3A] outline-none rounded-xl p-3 text-[#002147]"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-black text-[#002147]/70 uppercase tracking-wider mb-1.5">{t('العنوان بالإنجليزية', 'Title (English)')}</label>
                            <input 
                              type="text" 
                              required
                              value={inputTitleEn}
                              onChange={(e) => setInputTitleEn(e.target.value)}
                              placeholder="e.g. Conversation Mastery"
                              className="w-full text-xs font-bold bg-[#fdfaf3] border border-[#C49E3A]/40 focus:ring-2 focus:ring-[#C49E3A] outline-none rounded-xl p-3 text-[#002147]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-[#002147]/70 uppercase tracking-wider mb-1.5">{t('العنوان بالعربية', 'Title (Arabic)')}</label>
                            <input 
                              type="text" 
                              required
                              value={inputTitleAr}
                              onChange={(e) => setInputTitleAr(e.target.value)}
                              placeholder="مثال: إتقان المحادثات الحيوية"
                              className="w-full text-xs font-bold bg-[#fdfaf3] border border-[#C49E3A]/40 focus:ring-2 focus:ring-[#C49E3A] outline-none rounded-xl p-3 text-[#002147]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-[#002147]/70 uppercase tracking-wider mb-1.5">{t('المستوى التعليمي المستهدف', 'Target Educational Level')}</label>
                          <div className="grid grid-cols-6 gap-1 bg-[#fdfaf3] border border-[#C49E3A]/40 p-1.5 rounded-xl">
                            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                              <button
                                type="button"
                                key={lvl}
                                onClick={() => setInputLevel(lvl)}
                                className={`py-1 font-extrabold text-[10px] rounded-lg border transition-all ${
                                  inputLevel === lvl 
                                    ? 'bg-[#002147] border-[#C49E3A] text-[#E6C36A] shadow-sm' 
                                    : 'bg-white border-[#C49E3A]/30 text-[#002147]/70 hover:text-[#002147]'
                                }`}
                              >
                                {lvl}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Thumbnail / Video Preview Area */}
                      <div className="flex flex-col justify-center items-center bg-[#fdfaf3] border-2 border-dashed border-[#C49E3A]/40 rounded-2xl p-5 relative min-h-[160px]">
                        {uploadTab === 'direct' && videoFileUrl ? (
                          <div className="w-full text-center space-y-2">
                            <div className="aspect-video relative rounded-xl overflow-hidden border border-[#C49E3A] bg-[#001a38]">
                              <video 
                                src={videoFileUrl}
                                className="w-full h-full object-contain"
                                controls
                              />
                            </div>
                            <p className="text-[10px] text-[#002147]/75 font-bold truncate">
                              {t('جاهز للمشاهدة المباشرة بوضوح فائق 🚀', 'HD direct playback buffer ready 🚀')}
                            </p>
                          </div>
                        ) : uploadTab === 'youtube' && previewId ? (
                          <div className="w-full max-w-[280px] text-center space-y-2">
                            <div className="aspect-video relative rounded-xl overflow-hidden border border-[#C49E3A] bg-[#001a38]">
                              <img 
                                src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`} 
                                alt="" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-[10px] text-[#002147]/75 font-bold truncate">
                              Detected ID: {previewId}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center text-[#C49E3A] space-y-2">
                            <FileVideo size={40} strokeWidth={1.5} className="mx-auto" />
                            <div className="text-[10px] text-[#002147]/70 font-bold max-w-[200px] leading-relaxed">
                              {t('اختر ملف فيديو أو يوتيوب لمعاينة البث والوضوح فائق الدقة تلقائياً ❤️', 'Select video resources to activate smart direct cover previews instantly ❤️')}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info response statuses */}
                    {errorText && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-300 text-red-700 rounded-xl text-xs font-bold">
                        <AlertCircle size={16} />
                        <span>{errorText}</span>
                      </div>
                    )}

                    {successText && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-300 text-green-800 rounded-xl text-xs font-black">
                         <CheckCircle2 size={16} />
                         <span>{successText}</span>
                      </div>
                    )}

                    {/* Form Footer Buttons */}
                    <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#C49E3A]/30">
                      <GhostButton 
                        type="button"
                        onClick={() => {
                          setShowAddForm(false);
                          setVideoFile(null);
                          setErrorText('');
                        }}
                      >
                        {t('إلغاء الأمر', 'Cancel')}
                      </GhostButton>
                      <PrimaryButton 
                        type="submit"
                        disabled={actionLoading}
                      >
                        {actionLoading ? (
                          uploadProgress !== null ? (
                            <span>{isRtl ? `جارٍ الرفع ${uploadProgress}%` : `Uploading ${uploadProgress}%`}</span>
                          ) : (
                            <div className="w-4 h-4 border-2 border-[#E6C36A] border-t-transparent rounded-full animate-spin mx-auto" />
                          )
                        ) : (
                          t('تحميل ونشر الدرس 🚀', 'Upload & Publish Lesson 🚀')
                        )}
                      </PrimaryButton>
                    </div>
                  </form>
                </GoldCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DYNAMIC VIDEOS GRID SECTION */}
          {dbLoading ? (
            <GoldCard className="py-16 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-3 border-[#C49E3A] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#002147]/70 font-black text-xs uppercase">{t('جاري الفرز والتحميل من السحابة...', 'Analyzing and fetching videos...')}</span>
            </GoldCard>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allVideos.map((video, vIdx) => {
                const isDirectFile = !!video.directUrl;
                return (
                  <GoldCard 
                    key={`video-card-${video.id || vIdx}`}
                    className={`p-0 overflow-hidden cursor-pointer relative group flex flex-col justify-between ${
                      !(enabled || isEffectiveAdmin) ? 'grayscale opacity-70 cursor-not-allowed' : ''
                    }`}
                    onClick={() => handleSelectVideo(video)}
                  >
                    {/* Trash Deletion Button for Admins */}
                    {isEffectiveAdmin && (
                      <button 
                        onClick={(e) => handleDeleteVideo(video.id, e)}
                        className="absolute top-3 right-3 z-30 w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center border border-red-800 hover:bg-red-700 active:scale-95 transition-transform shadow-sm cursor-pointer"
                        title={t('حذف الدرس', 'Delete Lesson')}
                      >
                        <Trash2 size={14} strokeWidth={2.5} />
                      </button>
                    )}

                    {/* Direct File or Youtube Source badge */}
                    <span className="absolute top-3 left-3 z-30 bg-[#002147] text-[#E6C36A] border border-[#C49E3A] px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">
                      {isDirectFile ? t('مباشر 📁', 'Direct file 📁') : t('يوتيوب 📺', 'YouTube 📺')}
                    </span>

                    <div className="aspect-[4/3] relative overflow-hidden bg-[#001a38] flex items-center justify-center border-b border-[#C49E3A]/30">
                      <ImageIcon size={40} className="absolute text-[#E6C36A]/20" />
                      <img 
                        src={video.thumbnail} 
                        alt="" 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover relative z-10" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.opacity = '0.3';
                        }}
                      />
                      {/* Gold Play Badge Overlay */}
                      <div className="absolute inset-0 bg-[#001a38]/25 flex items-center justify-center z-20">
                         <div className="w-11 h-11 bg-[#C49E3A] text-[#002147] border-2 border-[#E6C36A] rounded-full flex items-center justify-center shadow-md group-active:scale-95 transition-transform">
                           <Play fill="currentColor" size={18} className="ml-0.5" />
                         </div>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center z-20">
                        <span className="bg-[#001a38]/90 text-white border border-[#C49E3A]/40 px-2.5 py-0.5 rounded-full text-[9px] font-black">{video.duration}</span>
                        <span className="bg-[#002147] border border-[#C49E3A] text-[#E6C36A] px-2.5 py-0.5 rounded-full text-[9px] font-black shadow-sm">{video.level}</span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-black text-sm text-[#002147] line-clamp-2 mb-2 leading-snug">
                          {isRtl ? video.titleAr : video.titleEn}
                        </h3>
                        {isDirectFile && (
                          <div className="mb-2.5 flex items-center gap-1.5 text-[10px] font-black">
                            {localVideoStatusMap[video.id] ? (
                              <ProgressPill className="py-0.5 px-2 text-[10px]">
                                {t('⚡ جاهز للتشغيل', '⚡ Cached')}
                              </ProgressPill>
                            ) : (
                              <ProgressPill className="py-0.5 px-2 text-[10px]">
                                {t('📁 ملف مباشر', '📁 Direct file')}
                              </ProgressPill>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <PrimaryButton className="flex-1 py-2 text-xs">
                          <span>{t.watchNow}</span>
                          <ChevronRight size={12} className={isRtl ? 'rotate-180' : ''} />
                        </PrimaryButton>

                        <GhostButton
                          onClick={(e) => handleDownloadVideo(video, e)}
                          title={t('تحميل الفيديو', 'Download Video')}
                          disabled={downloadingId === video.id}
                          className="p-2 shrink-0"
                        >
                          {downloadingId === video.id ? (
                            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Download size={14} />
                          )}
                        </GhostButton>
                      </div>
                    </div>
                  </GoldCard>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* FOOTER INFO BANNER */}
      <GoldCard className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#002147] text-[#E6C36A] rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0 border-2 border-[#C49E3A]">
              🎬
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-[#002147]">{t('مسارات تعلم تفاعلية متكاملة بالصوت والصورة', 'Unlimited Immersive Audiovisual Curriculums')}</h4>
              <p className="text-[#002147]/70 text-xs font-bold mt-1 max-w-lg leading-relaxed">
                {t(
                  'تم ترقية الأكاديمية بالكامل لدعم إنتاج دروس فيديو تعليمية ناطقة بالصوت وحركات الشخصيات مع تصدير الفيديو والملخصات وتحميل الملفات المباشرة دون قيود.',
                  'Fully upgraded with AI-powered audiovisual character-narrated video production, offline study guides, and instant video download workflows.'
                )}
              </p>
            </div>
          </div>
          <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 px-4 py-3 rounded-xl shrink-0">
             <div className="flex items-center gap-3">
                <Sparkle className="text-[#C49E3A]" size={18} />
                <div>
                  <span className="block text-lg font-black text-[#002147] leading-none">
                    {libraryTab === 'produced' ? producedLessons.length : allVideos.length}
                  </span>
                  <span className="text-[10px] text-[#002147]/70 font-black uppercase tracking-wider block mt-0.5">
                    {libraryTab === 'produced' ? t('دروس منتجة ناطقة', 'Produced Lessons') : t('فيديوهات بالمكتبة', 'Library Videos')}
                  </span>
                </div>
             </div>
          </div>
      </GoldCard>

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
    </SectionShell>
  );
};

