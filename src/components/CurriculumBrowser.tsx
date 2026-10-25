import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Hash, 
  MessageSquare, 
  PenTool, 
  Sparkles, 
  Baby, 
  Play, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  X,
  RotateCcw
} from 'lucide-react';
import { 
  UserRole, 
  CurriculumCategory, 
  proficiencyLevel, 
  UserProfile, 
  Lesson, 
  AppView 
} from '../types';
import { Language, translations } from '../lib/translations';
import { generateCurriculumUnits, generateLessonContent } from '../services/curriculumGenerator';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  SectionShell,
  GoldCard,
  LessonTile,
  PrimaryButton,
  GhostButton,
  ProgressPill,
  TutorFace
} from './ui/academy';

interface BookingDialogProps {
  lang: Language;
  unit: { id: string; title: string };
  onClose: () => void;
  onConfirm: (day: string, time: string) => void;
}

export const BookingDialog: React.FC<BookingDialogProps> = ({
  lang,
  unit,
  onClose,
  onConfirm
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedTime, setSelectedTime] = useState('16:00');

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const TIMES = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002147]/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-md"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <GoldCard className="p-6">
          <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-[#C49E3A]/25">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#002147] mb-1">
                {t.selectDayTime}
              </h3>
              <ProgressPill className="text-[11px]">
                {unit.title}
              </ProgressPill>
            </div>
            <GhostButton onClick={onClose} className="p-2">
              <X size={16} />
              <span>{isRtl ? 'إغلاق' : 'Close'}</span>
            </GhostButton>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs font-black text-[#002147] mb-2 block">
                {t.day}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {DAYS.map((day) => (
                  <GhostButton
                    key={day}
                    active={selectedDay === day}
                    onClick={() => setSelectedDay(day)}
                    className="py-1.5 px-2 text-[11px]"
                  >
                    <span>{t.days[day as keyof typeof t.days] || day}</span>
                  </GhostButton>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-[#002147] mb-2 block">
                {t.time}
              </label>
              <div className="grid grid-cols-4 gap-1.5 max-h-36 overflow-y-auto p-1 border border-[#C49E3A]/20 rounded-xl bg-[#fdfaf3]">
                {TIMES.map((time) => (
                  <GhostButton
                    key={time}
                    active={selectedTime === time}
                    onClick={() => setSelectedTime(time)}
                    className="py-1.5 px-2 text-[11px] font-mono"
                  >
                    <span>{time}</span>
                  </GhostButton>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <GhostButton onClick={onClose} className="flex-1">
              <span>{isRtl ? 'إلغاء' : 'Cancel'}</span>
            </GhostButton>
            <PrimaryButton
              onClick={() => onConfirm(selectedDay, selectedTime)}
              className="flex-1"
            >
              <Calendar size={16} />
              <span>{t.bookNow}</span>
            </PrimaryButton>
          </div>
        </GoldCard>
      </motion.div>
    </div>
  );
};

export interface CurriculumBrowserProps {
  lang: Language;
  onSelectLesson: (lesson: Lesson, category: CurriculumCategory, level: proficiencyLevel) => void;
  onBack: () => void;
  studentId: string;
  profile: UserProfile;
  seedCurriculum: () => void;
  onNavigate?: (view: AppView) => void;
}

export const CurriculumBrowser: React.FC<CurriculumBrowserProps> = ({
  lang,
  onSelectLesson,
  onBack,
  studentId,
  profile,
  seedCurriculum,
  onNavigate
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const tr = (ar: string, en: string) => isRtl ? ar : en;

  const [selectedCategory, setSelectedCategory] = useState<CurriculumCategory | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<proficiencyLevel | null>(null);
  const [units, setUnits] = useState<{ id: string; title: string; titleAr: string; description: string; descriptionAr: string }[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [generatingLesson, setGeneratingLesson] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);

  const [bookingStatus, setBookingStatus] = useState<Record<string, 'idle' | 'booking' | 'success'>>({});
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingContext, setBookingContext] = useState<{ id: string; title: string } | null>(null);

  const categories = [
    { id: CurriculumCategory.READING, label: t.curr_reading, icon: BookOpen },
    { id: CurriculumCategory.GRAMMAR, label: t.curr_grammar, icon: Hash },
    { id: CurriculumCategory.CONVERSATION, label: t.curr_conversation, icon: MessageSquare },
    { id: CurriculumCategory.WRITING, label: t.curr_writing, icon: PenTool },
    { id: CurriculumCategory.EXPRESSION, label: t.curr_expression, icon: Sparkles },
    { id: CurriculumCategory.EARLY_CHILDHOOD, label: t.earlyChildhood, icon: Baby },
  ];

  const levels = Object.values(proficiencyLevel);

  useEffect(() => {
    if (selectedCategory && selectedLevel) {
      fetchUnits();
    }
  }, [selectedCategory, selectedLevel]);

  const fetchUnits = async () => {
    if (!selectedCategory || !selectedLevel) return;
    setLoadingUnits(true);
    setError(null);
    try {
      const data = await generateCurriculumUnits(selectedCategory, selectedLevel);
      setUnits(data || []);
    } catch (err) {
      console.error(err);
      setError(
        <div className="flex flex-col items-center gap-3">
          <p>{tr('حدث خطأ أثناء تحميل الوحدات الدراسية.', 'Error loading curriculum units.')}</p>
          <PrimaryButton onClick={fetchUnits}>
            <RotateCcw size={16} />
            <span>{tr('إعادة المحاولة', 'Retry')}</span>
          </PrimaryButton>
        </div>
      );
    } finally {
      setLoadingUnits(false);
    }
  };

  const handleStartLesson = async (topic: string) => {
    if (!selectedCategory || !selectedLevel) return;
    setGeneratingLesson(true);
    setError(null);
    try {
      const lessonData = await generateLessonContent(selectedCategory, selectedLevel, topic, lang);
      if (!lessonData || !lessonData.title) {
        throw new Error('Invalid lesson data received from AI');
      }

      const fullLesson: Lesson = {
        id: `gen_${Date.now()}`,
        order: 1,
        ...lessonData
      } as Lesson;
      onSelectLesson(fullLesson, selectedCategory, selectedLevel);
    } catch (err) {
      console.error('Lesson generation failed:', err);
      setError(
        <div className="flex flex-col items-center gap-3">
          <p>{tr('حدث خطأ أثناء تصميم الدرس. يرجى المحاولة مرة أخرى.', 'Error generating lesson. Please try again.')}</p>
          <PrimaryButton onClick={() => handleStartLesson(topic)}>
            <RotateCcw size={16} />
            <span>{tr('إعادة المحاولة', 'Retry Now')}</span>
          </PrimaryButton>
        </div>
      );
    } finally {
      setGeneratingLesson(false);
    }
  };

  const addToSchedule = async (unitId: string, unitTitle: string, day: string, time: string) => {
    if (!studentId) return;
    setBookingStatus(prev => ({ ...prev, [unitId]: 'booking' }));
    try {
      await addDoc(collection(db, 'schedules'), {
        studentId,
        day,
        time,
        subject: selectedCategory || 'General',
        isCustom: true,
        unitTitle,
        createdAt: serverTimestamp()
      });

      setBookingStatus(prev => ({ ...prev, [unitId]: 'success' }));
      setShowBookingDialog(false);
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, [unitId]: 'idle' }));
      }, 3000);
    } catch (err) {
      console.error('Booking error:', err);
      setBookingStatus(prev => ({ ...prev, [unitId]: 'idle' }));
      handleFirestoreError(err, OperationType.WRITE, 'schedules');
    }
  };

  // Back button handler
  const handleNavBack = () => {
    if (selectedLevel) {
      setSelectedLevel(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      onBack();
    }
  };

  const getBackLabel = () => {
    if (selectedLevel) {
      return tr('تغيير المستوى', 'Change Level');
    }
    if (selectedCategory) {
      return tr('تغيير المسار', 'Change Category');
    }
    return tr('العودة للرئيسية', 'Back to Dashboard');
  };

  const currentCategoryObj = categories.find(c => c.id === selectedCategory);

  if (generatingLesson) {
    return (
      <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={`pb-20 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
        <GoldCard className="max-w-md mx-auto my-16 p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-4 border-[#002147]/20 border-t-[#C49E3A] animate-spin flex items-center justify-center mb-6">
            <TutorFace tutor="sara" size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#002147] mb-2">
            {t.loadingText}
          </h2>
          <p className="text-xs sm:text-sm text-[#002147]/70 font-bold leading-relaxed">
            {tr(
              'يقوم المعلم الذكي الآن بتصميم محتوى تعليمي مخصص لك بناءً على المعايير العالمية.',
              'Our AI Teacher is now designing exclusive educational content for you based on the latest academic standards.'
            )}
          </p>
        </GoldCard>
      </SectionShell>
    );
  }

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={`pb-20 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-[#C49E3A]/25">
        <div className="flex items-center gap-3">
          <TutorFace tutor="sara" size="md" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
                {t.curriculum}
              </h1>
              {selectedCategory && (
                <ProgressPill>
                  {currentCategoryObj?.label || selectedCategory}
                </ProgressPill>
              )}
              {selectedLevel && (
                <ProgressPill>
                  {selectedLevel}
                </ProgressPill>
              )}
            </div>
            <p className="text-xs text-[#002147]/70 font-bold mt-0.5">
              {t.learningProgress}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end flex-wrap">
          {profile.role === UserRole.ADMIN && (
            <GhostButton onClick={seedCurriculum}>
              <Sparkles size={16} />
              <span>{lang === 'ar' ? 'مزامنة المنهج' : 'Sync Curriculum'}</span>
            </GhostButton>
          )}

          <GhostButton onClick={handleNavBack}>
            <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
            <span>{getBackLabel()}</span>
          </GhostButton>
        </div>
      </div>

      {/* Category selection view */}
      {!selectedCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <GoldCard
                key={cat.id}
                onClick={() => {
                  if (cat.id === CurriculumCategory.EARLY_CHILDHOOD && onNavigate) {
                    onNavigate('early-childhood');
                  } else {
                    setSelectedCategory(cat.id);
                  }
                }}
                className="p-6 cursor-pointer hover:border-[#C49E3A] hover:bg-[#fdfaf3] transition-all flex flex-col items-center text-center group active:scale-95"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#002147] text-[#E6C36A] border border-[#C49E3A] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon size={32} />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#002147] mb-2">
                  {cat.label}
                </h3>
                <ProgressPill className="text-[11px]">
                  {tr('استعرض المستويات', 'Explore Levels')}
                </ProgressPill>
              </GoldCard>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6 mt-2">
          {/* Level chooser */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ProgressPill>
                {t.chooseLevel}
              </ProgressPill>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {levels.map((lvl) => (
                <button
                  key={`level-${lvl}`}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`py-3 px-2 rounded-2xl border-2 font-black text-sm sm:text-base transition-transform active:scale-95 cursor-pointer flex flex-col items-center justify-center ${
                    selectedLevel === lvl
                      ? 'bg-[#002147] border-[#C49E3A] text-[#E6C36A] shadow-sm'
                      : 'bg-white border-[#C49E3A]/40 text-[#002147] hover:border-[#C49E3A] hover:bg-[#fdfaf3]'
                  }`}
                >
                  <span>{lvl}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Units list */}
          {selectedLevel && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#C49E3A]/20">
                <div className="flex items-center gap-2">
                  <ProgressPill>
                    {t.units} {units.length > 0 ? `(${units.length})` : ''}
                  </ProgressPill>
                </div>
                {loadingUnits && (
                  <span className="text-xs font-bold text-[#002147]/60 animate-pulse">
                    {t.loadingText}
                  </span>
                )}
              </div>

              {error && (
                <GoldCard className="p-4 bg-red-50/70 border-red-300 text-red-900 text-xs sm:text-sm font-bold flex items-center gap-3">
                  <AlertCircle size={20} className="shrink-0" />
                  <div className="flex-1">{error}</div>
                </GoldCard>
              )}

              {loadingUnits ? (
                <GoldCard className="p-8 text-center">
                  <p className="text-xs sm:text-sm font-bold text-[#002147]/70 animate-pulse">
                    {t.loadingText}
                  </p>
                </GoldCard>
              ) : units.length === 0 && !error ? (
                <GoldCard className="p-8 text-center">
                  <p className="text-xs sm:text-sm font-bold text-[#002147]/70">
                    {tr('لا توجد وحدات دراسية متاحة حالياً.', 'No units available for this level yet.')}
                  </p>
                </GoldCard>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {units.map((unit, i) => {
                    const unitTitle = isRtl ? unit.titleAr : unit.title;
                    const unitSubtitle = isRtl ? unit.descriptionAr : unit.description;
                    const isBooked = bookingStatus[unit.id] === 'success';
                    const isBooking = bookingStatus[unit.id] === 'booking';

                    return (
                      <GoldCard key={unit.id || `unit-${i}`} className="p-4 flex flex-col justify-between gap-3">
                        <LessonTile
                          order={i + 1}
                          title={unitTitle}
                          subtitle={unitSubtitle}
                          level={selectedLevel}
                          active={false}
                          onClick={() => handleStartLesson(unitTitle)}
                        />

                        <div className="flex flex-col sm:flex-row gap-2 pt-1 border-t border-[#C49E3A]/20">
                          <PrimaryButton
                            onClick={() => handleStartLesson(unitTitle)}
                            className="flex-1"
                          >
                            <Play size={15} />
                            <span>{tr('بدء الدرس', 'Start Lesson')}</span>
                          </PrimaryButton>

                          <GhostButton
                            onClick={() => {
                              setBookingContext({ id: unit.id, title: unitTitle });
                              setShowBookingDialog(true);
                            }}
                            disabled={isBooking || isBooked}
                            className="flex-1 sm:flex-initial"
                          >
                            {isBooked ? (
                              <>
                                <CheckCircle size={15} className="text-emerald-600" />
                                <span>{tr('تم الحجز', 'Booked')}</span>
                              </>
                            ) : (
                              <>
                                <Calendar size={15} />
                                <span>{tr('إضافة للجدول', 'Add to Schedule')}</span>
                              </>
                            )}
                          </GhostButton>
                        </div>
                      </GoldCard>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Booking Dialog Modal */}
      <AnimatePresence>
        {showBookingDialog && bookingContext && (
          <BookingDialog
            lang={lang}
            unit={bookingContext}
            onClose={() => setShowBookingDialog(false)}
            onConfirm={(day, time) => addToSchedule(bookingContext.id, bookingContext.title, day, time)}
          />
        )}
      </AnimatePresence>
    </SectionShell>
  );
};

export default CurriculumBrowser;
