/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Mic2, 
  BarChart3, 
  Users, 
  Settings, 
  LayoutDashboard, 
  GraduationCap,
  Brain,
  MessageSquare,
  Trophy,
  Calendar,
  CalendarDays,
  ChevronRight,
  Play,
  CheckCircle2,
  CheckCircle,
  XCircle,
  X,
  AlertCircle,
  LogIn,
  LogOut,
  Sparkles,
  Plus,
  Trash2,
  Clock,
  Send,
  Hash,
  PenTool,
  ShieldAlert,
  Bell,
  Baby,
  Headset,
  ExternalLink,
  Smartphone,
  Download,
  Zap
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole, CurriculumCategory, proficiencyLevel, UserProfile, ScheduleItem, ParentNote, LearningModule, Lesson, AppView, StudentProfile, MASTER_ADMINS } from './types';
import { MASTER_CURRICULUM } from './data/masterCurriculum';
import { generateWhatsAppLink, NOTIFICATION_TEMPLATES } from './lib/whatsapp';
import { ShareableNotification } from './components/ShareableNotification';
import { AIConversation } from './components/AIConversation';
import { PlacementTest } from './components/PlacementTest';
import { auth, googleProvider, db, handleFirestoreError, OperationType, testConnection } from './lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, addDoc, serverTimestamp, collection, query, where, onSnapshot, deleteDoc, orderBy, getDocs, updateDoc, limit, writeBatch } from 'firebase/firestore';
import { translations, Language } from './lib/translations';
import { StudentStats } from './components/StudentStats';
import { Leaderboard } from './components/Leaderboard';
import { PeerChat } from './components/PeerChat';
import { generateLessonContent, generateCurriculumUnits } from './services/curriculumGenerator';
import { InteractiveLesson } from './components/InteractiveLesson';
import { WhatsAppNotifications } from './components/WhatsAppNotifications';
import { AdminDashboard } from './components/AdminDashboard';
import { VideoLibrary } from './components/VideoLibrary';
import { StoryLibrary } from './components/StoryLibrary';
import { ParentAIInsights } from './components/ParentAIInsights';
import { ProgressRoadmap } from './components/ProgressRoadmap';
import { ReadingLesson } from './components/ReadingLesson';
import { OxfordLesson } from './components/OxfordLesson';
import { EarlyChildhoodHome } from './components/EarlyChildhood/EarlyChildhoodHome';
import { StudyPlanner } from './components/Academic/StudyPlanner';
import { ResultsChart } from './components/Academic/ResultsChart';
import { SmartAnalytics } from './components/Academic/SmartAnalytics';
import { BiWeeklyTest } from './components/Academic/BiWeeklyTest';
import { OxfordDiscoverCompanion } from './components/OxfordDiscoverCompanion';
import { ReadingCurriculumCompanion, ReadingLevel, ALL_READING_UNITS } from './components/ReadingCurriculumCompanion';
import { GrammarCurriculumCompanion, GrammarLevel, ALL_GRAMMAR_UNITS } from './components/GrammarCurriculumCompanion';
import { ConversationCurriculumCompanion, ConversationLevel, ALL_CONVERSATION_UNITS } from './components/ConversationCurriculumCompanion';
import { WritingCurriculumCompanion, WritingLevel, ALL_WRITING_UNITS } from './components/WritingCurriculumCompanion';
import { ExpressionCurriculumCompanion, ExpressionLevel, ALL_EXPRESSION_UNITS } from './components/ExpressionCurriculumCompanion';
import { ModernCurriculumHome } from './components/ModernCurriculumHome';
import { ProfessionalDevelopment } from './components/ProfessionalDevelopment';
import { GeminiDeveloperHub } from './components/GeminiDeveloperHub';
import { AdultsDailyDose } from './components/AdultsDailyDose';
import { ADULTS_DAILY_DOSES } from './data/adultsDailyDose';
import { KidsStoryPlayer } from './components/KidsStoryPlayer';
import { KIDS_STORIES } from './data/kidsStories';
import { Layers, Image as OxfordIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { familyConstellationsLesson } from './data/lessons/r_a1_4';
import { everydayInteractionLesson } from './data/lessons/r_a1_5';
import { basicSentenceStructureA2 } from './data/lessons/r_a2_1';
import { workplaceCultureA2 } from './data/lessons/r_a2_2';
import { interrogativePatternsA2 } from './data/lessons/r_a2_3';
import { tradeTransactionsA2 } from './data/lessons/r_a2_4';
import { narrativeSequencesA2 } from './data/lessons/r_a2_5';
import { subtextualInferenceB1 } from './data/lessons/r_b1_1';
import { factVsOpinionB1 } from './data/lessons/r_b1_2';
import { authorialIntentB1 } from './data/lessons/r_b1_3';
import { culturalHeritageB1 } from './data/lessons/r_b1_4';
import { mediaJournalismB1 } from './data/lessons/r_b1_5';
import { rhetoricalStructuresB2 } from './data/lessons/r_b2_1';
import { reportAuditsB2 } from './data/lessons/r_b2_2';
import { criticalPerspectiveB2 } from './data/lessons/r_b2_3';
import { environmentalDiscourseB2 } from './data/lessons/r_b2_4';
import { persuasionTechniquesB2 } from './data/lessons/r_b2_5';
import { academicAbstractsC1 } from './data/lessons/r_c1_1';
import { legalContractualC1 } from './data/lessons/r_c1_2';
import { philosophyReadingC1 } from './data/lessons/r_c1_3';
import { socioPoliticalCritiqueC1 } from './data/lessons/r_c1_4';
import { technicalInnovationC1 } from './data/lessons/r_c1_5';
import { etymologicalExcavationC2 } from './data/lessons/r_c2_1';
import { linguisticNuanceC2 } from './data/lessons/r_c2_2';
import { crossDisciplinaryC2 } from './data/lessons/r_c2_3';
import { strategicDiscursiveC2 } from './data/lessons/r_c2_4';
import { archaicClassicalC2 } from './data/lessons/r_c2_5';
import { partsOfSpeechA1 } from './data/lessons/g_a1_1';
import { presentSimpleA1 } from './data/lessons/g_a1_2';
import { singularPluralA1 } from './data/lessons/g_a1_3';
import { articlesA1 } from './data/lessons/g_a1_4';
import { wordOrderA1 } from './data/lessons/g_a1_5';
import { presentPerfectB1 } from './data/lessons/g_b1_1';
import { relativeClausesB1 } from './data/lessons/g_b1_2';
import { passiveVoiceB1 } from './data/lessons/g_b1_3';
import { conditionalsB1 } from './data/lessons/g_b1_4';
import { modalsObligationB1 } from './data/lessons/g_b1_5';
import { narrativeTensesB2 } from './data/lessons/g_b2_1';
import { conditionalsB2 } from './data/lessons/g_b2_2';
import { reportedSpeechB2 } from './data/lessons/g_b2_3';
import { advancedPassiveB2 } from './data/lessons/g_b2_4';
import { futureAdvancedB2 } from './data/lessons/g_b2_5';
import { inversionC1 } from './data/lessons/g_c1_1';
import { cleftSentencesC1 } from './data/lessons/g_c1_2';
import { advancedGerundsC1 } from './data/lessons/g_c1_3';
import { participleClausesC1 } from './data/lessons/g_c1_4';
import { subjunctiveC1 } from './data/lessons/g_c1_5';
import { stylisticInversionC2 } from './data/lessons/g_c2_1';
import { complexConditionalsC2 } from './data/lessons/g_c2_2';
import { perfectModalsC2 } from './data/lessons/g_c2_3';
import { nominalizationC2 } from './data/lessons/g_c2_4';
import { registerShiftC2 } from './data/lessons/g_c2_5';
import { pastSimpleA2 } from './data/lessons/g_a2_1';
import { futureSimpleA2 } from './data/lessons/g_a2_2';
import { comparisonA2 } from './data/lessons/g_a2_3';
import { presentContinuousA2 } from './data/lessons/g_a2_4';
import { modalsA2 } from './data/lessons/g_a2_5';
import { greetingsA1 } from './data/lessons/c_a1_1';
import { familyHomeA1 } from './data/lessons/c_a1_2';
import { orderingFoodA1 } from './data/lessons/c_a1_3';
import { shoppingA1 } from './data/lessons/c_a1_4';
import { routinesA1 } from './data/lessons/c_a1_5';
import { makingPlansA2 } from './data/lessons/c_a2_1';
import { describingPeopleA2 } from './data/lessons/c_a2_2';
import { travelA2 } from './data/lessons/c_a2_3';
import { healthFitnessA2 } from './data/lessons/c_a2_4';
import { hobbiesA2 } from './data/lessons/c_a2_5';
import { givingAdviceB1 } from './data/lessons/c_b1_1';
import { expressingOpinionsB1 } from './data/lessons/c_b1_2';
import { jobInterviewsB1 } from './data/lessons/c_b1_3';
import { travelingExperiencesB1 } from './data/lessons/c_b1_4';
import { dreamsAmbitionsB1 } from './data/lessons/c_b1_5';
import { debatingTopicsB2 } from './data/lessons/c_b2_1';
import { dealingProblemsB2 } from './data/lessons/c_b2_2';
import { businessMeetingsB2 } from './data/lessons/c_b2_3';
import { mediaNewsB2 } from './data/lessons/c_b2_4';
import { culturalDifferencesB2 } from './data/lessons/c_b2_5';
import { nuancedDiscussionsC1 } from './data/lessons/c_c1_1';
import { persuasiveSpeakingC1 } from './data/lessons/c_c1_2';
import { professionalPresentationsC1 } from './data/lessons/c_c1_3';
import { problemSolvingC1 } from './data/lessons/c_c1_4';
import { abstractConceptsC1 } from './data/lessons/c_c1_5';
import { idiomaticPrecisionC2 } from './data/lessons/c_c2_1';
import { ironyHumourC2 } from './data/lessons/c_c2_2';
import { negotiationsC2 } from './data/lessons/c_c2_3';
import { philosophicalInquiryC2 } from './data/lessons/c_c2_4';
import { linguisticFlexibilityC2 } from './data/lessons/c_c2_5';
import { alphabetA1 } from './data/lessons/w_a1_1';
import { sentencesA1 } from './data/lessons/w_a1_2';
import { punctuationA1 } from './data/lessons/w_a1_3';
import { personalInfoA1 } from './data/lessons/w_a1_4';
import { listsNotesA1 } from './data/lessons/w_a1_5';
import { connectivesA2 } from './data/lessons/w_a2_1';
import { describingDayA2 } from './data/lessons/w_a2_2';
import { socialMediaA2 } from './data/lessons/w_a2_3';
import { shortEmailsA2 } from './data/lessons/w_a2_4';
import { describingPlacesA2 } from './data/lessons/w_a2_5';
import { paragraphStructureB1 } from './data/lessons/w_b1_1';
import { storytellingB1 } from './data/lessons/w_b1_2';
import { persuasiveB1 } from './data/lessons/w_b1_3';
import { formalEmailsB1 } from './data/lessons/w_b1_4';
import { comparativeWritingB1 } from './data/lessons/w_b1_5';
import { essayFoundationsB2 } from './data/lessons/w_b2_1';
import { summaryWritingB2 } from './data/lessons/w_b2_2';
import { transitionsB2 } from './data/lessons/w_b2_3';
import { creativeNarrativeB2 } from './data/lessons/w_b2_4';
import { reviewWritingB2 } from './data/lessons/w_b2_5';
import { thesisDesignC1 } from './data/lessons/w_c1_1';
import { nuanceStyleC1 } from './data/lessons/w_c1_2';
import { professionalProposalsC1 } from './data/lessons/w_c1_3';
import { criticalAnalysisC1 } from './data/lessons/w_c1_4';
import { abstractConceptsWritingC1 } from './data/lessons/w_c1_5';
import { stylisticMasteryC2 } from './data/lessons/w_c2_1';
import { researchLogicC2 } from './data/lessons/w_c2_2';
import { playfulnessC2 } from './data/lessons/w_c2_3';
import { philosophicalDiscourseC2 } from './data/lessons/w_c2_4';
import { syntacticPrecisionC2 } from './data/lessons/w_c2_5';

import { phonemicA1 } from './data/lessons/r_a1_1';
import { sightWordsA1 } from './data/lessons/r_a1_2';
import { environmentalPrintA1 } from './data/lessons/r_a1_3';

import { emotionsE1 } from './data/lessons/e_a1_1';
import { familyFriendsE1 } from './data/lessons/e_a1_2';
import { colorsArtE1 } from './data/lessons/e_a1_3';
import { routineE1 } from './data/lessons/e_a1_4';
import { likesDislikesE1 } from './data/lessons/e_a1_5';
import { hobbiesE2 } from './data/lessons/e_a2_1';
import { storytellingE2 } from './data/lessons/e_a2_2';
import { directionsE2 } from './data/lessons/e_a2_3';
import { describingPeopleE2 } from './data/lessons/e_a2_4';
import { futureIntentionsE2 } from './data/lessons/e_a2_5';
import { culturalExperiencesE1 } from './data/lessons/e_b1_1';
import { opinionsE1 } from './data/lessons/e_b1_2';
import { ambitionsE1 } from './data/lessons/e_b1_3';
import { adviceE1 } from './data/lessons/e_b1_4';
import { logicE1 } from './data/lessons/e_b1_5';
import { abstractDebateE1 } from './data/lessons/e_b2_1';
import { hypotheticalsE1 } from './data/lessons/e_b2_2';
import { socialIssuesE1 } from './data/lessons/e_b2_3';
import { mediaE1 } from './data/lessons/e_b2_4';
import { environmentE1 } from './data/lessons/e_b2_5';
import { ethicsE1 } from './data/lessons/e_c1_1';
import { aestheticsE1 } from './data/lessons/e_c1_2';
import { diplomacyE1 } from './data/lessons/e_c1_3';
import { strategicThinkingE1 } from './data/lessons/e_c1_4';
import { advocacyE1 } from './data/lessons/e_c1_5';
import { strategicSovereigntyE1 } from './data/lessons/e_c2_1';
import { macroeconomicAuditsE1 } from './data/lessons/e_c2_2';
import { existentialInquiryE1 } from './data/lessons/e_c2_3';
import { linguisticFluidityE1 } from './data/lessons/e_c2_4';
import { aestheticSynthesisE1 } from './data/lessons/e_c2_5';

// Removed local AppView declaration as it is now imported from ./types

// Auth View
const LoginScreen = ({ lang, onToggleLang }: { lang: Language, onToggleLang: () => void }) => {
  const t = translations[lang];
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={onToggleLang}
          className="bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 font-bold text-[#002147] hover:bg-slate-50 transition-all"
        >
          {t.languageToggle}
        </button>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#002147 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border-t-8 border-[#C49E3A] z-10"
      >
        <div className="w-24 h-24 bg-[#002147] rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl border-4 border-slate-50 font-black text-4xl">
          B
        </div>
        <h1 className="text-3xl font-bold text-[#002147] mb-2">{t.academyName}</h1>
        <p className={`text-slate-400 font-medium mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          {t.academyDescription}
        </p>
        
        <button 
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-4 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-[#002147] hover:border-[#002147] hover:bg-slate-50 transition-all shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/component/google_signin_buttons/google_favicon.svg" alt="google" className="w-6 h-6" />
          <span>{t.googleLogin}</span>
        </button>
        
        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-4 opacity-50 grayscale transition-all hover:grayscale-0">
          <span className="text-[10px] font-bold text-[#002147]">BASIM ALKHALIL DIGITAL ACADEMY</span>
          <div className="flex items-center gap-2 bg-[#002147] text-white px-3 py-1 rounded-full">
            <Sparkles size={10} className="animate-pulse text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C49E3A]">Gemini 3 Flash ACTIVE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BookingDialog = ({ lang, unit, onClose, onConfirm }: { lang: Language, unit: { id: string, title: string }, onClose: () => void, onConfirm: (day: string, time: string) => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedTime, setSelectedTime] = useState('16:00');

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#002147]/40 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-8 pb-0">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-black text-[#002147] mb-2">{t.selectDayTime}</h3>
              <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <BookOpen size={14} className="text-amber-500" />
                {unit.title}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">{t.day}</label>
              <div className="grid grid-cols-4 gap-2">
                {DAYS.map((day, dIdx) => (
                  <button
                    key={`schedule-day-select-${dIdx}`}
                    onClick={() => setSelectedDay(day)}
                    className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all border ${
                      selectedDay === day 
                        ? 'bg-[#002147] text-white border-[#002147]' 
                        : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {t.days[day as keyof typeof t.days]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">{t.time}</label>
              <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 custom-scrollbar">
                {TIMES.map((time, tIdx) => (
                  <button
                    key={`schedule-time-select-${tIdx}`}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all border ${
                      selectedTime === time 
                        ? 'bg-amber-accent text-white border-amber-accent shadow-lg shadow-amber-500/20' 
                        : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <button
            onClick={() => onConfirm(selectedDay, selectedTime)}
            className="w-full bg-[#002147] text-white py-4 rounded-2xl font-black text-sm hover:bg-[#C49E3A] shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <Calendar size={18} />
            {t.bookNow}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ScheduleManager = ({ studentId, studentName, lang, canEdit = false }: { studentId: string, studentName: string, lang: Language, canEdit?: boolean }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [newItem, setNewItem] = useState({ day: 'Monday', time: '10:00', subject: '' });
  const [isExporting, setIsExporting] = useState(false);
  const [itemToExport, setItemToExport] = useState<ScheduleItem | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'schedules'), where('studentId', '==', studentId));
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: ScheduleItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ScheduleItem);
      });
      setSchedule(items.sort((a, b) => {
        const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
        if (dayDiff !== 0) return dayDiff;
        return a.time.localeCompare(b.time);
      }));
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'schedules');
    });
    return () => unsubscribe();
  }, [studentId]);

  const handleExportImage = async () => {
    setIsExporting(true);
    
    // Tiny delay to ensure hidden card is rendered
    setTimeout(async () => {
      const element = document.getElementById('schedule-capture-card');
      if (element) {
        try {
          const canvas = await html2canvas(element, {
            useCORS: true,
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
              const el = clonedDoc.getElementById('schedule-capture-card');
              if (el) el.style.display = 'block';
              
              // Remove oklch to prevent parser errors in captured image
              const styles = clonedDoc.getElementsByTagName('style');
              for (let i = 0; i < styles.length; i++) {
                const style = styles[i];
                if (style.innerHTML.includes('oklch')) {
                  style.innerHTML = style.innerHTML.replace(/oklch\([^)]+\)/g, '#f1f5f9');
                }
              }
            }
          });
          
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `Schedule-${studentName}-${new Date().toLocaleDateString()}.png`;
          link.href = dataUrl;
          link.click();
        } catch (err) {
          console.error("Failed to capture schedule:", err);
        } finally {
          setIsExporting(false);
        }
      } else {
        setIsExporting(false);
      }
    }, 300);
  };

  const handleExportItemImage = (item: ScheduleItem) => {
    setItemToExport(item);
    setIsExporting(true);
    
    setTimeout(async () => {
      const element = document.getElementById('single-item-capture-card');
      if (element) {
        try {
          const canvas = await html2canvas(element, {
            useCORS: true,
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
              const el = clonedDoc.getElementById('single-item-capture-card');
              if (el) el.style.display = 'block';
              
              // Remove oklch to prevent parser errors in captured image
              const styles = clonedDoc.getElementsByTagName('style');
              for (let i = 0; i < styles.length; i++) {
                const style = styles[i];
                if (style.innerHTML.includes('oklch')) {
                  style.innerHTML = style.innerHTML.replace(/oklch\([^)]+\)/g, '#f1f5f9');
                }
              }
            }
          });
          
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `Lesson-${item.subject || item.unitTitle}-${item.time}.png`;
          link.href = dataUrl;
          link.click();
        } catch (err) {
          console.error("Failed to capture item:", err);
        } finally {
          setIsExporting(false);
          setItemToExport(null);
        }
      } else {
        setIsExporting(false);
        setItemToExport(null);
      }
    }, 300);
  };

  const addItem = async () => {
    if (!newItem.subject) return;
    const id = Math.random().toString(36).substr(2, 9);
    await setDoc(doc(db, 'schedules', id), {
      ...newItem,
      studentId,
      createdAt: serverTimestamp()
    });
    setNewItem({ ...newItem, subject: '' });
  };

  const removeItem = async (id: string) => {
    await deleteDoc(doc(db, 'schedules', id));
  };

  const handleWhatsAppShare = (item: ScheduleItem) => {
    const dayName = t.days[item.day as keyof typeof t.days];
    const message = isRtl 
      ? `مرحباً، أود تأكيد موعد الدرس للطالب ${studentName} يوم ${dayName} الساعة ${item.time}. المادة: ${item.subject || item.unitTitle || ''}`
      : `Hello, I'd like to confirm the lesson for ${studentName} on ${dayName} at ${item.time}. Subject: ${item.subject || item.unitTitle || ''}`;
    
    // We open WhatsApp with the message, let user pick the contact
    const link = generateWhatsAppLink('', message);
    window.open(link, '_blank');
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-3">
          <Calendar className="text-[#C49E3A] w-5 h-5 md:w-6 md:h-6" />
          {t.schedule}
        </h3>
        <div className="flex items-center gap-2">
          {schedule.length > 0 && (
            <button 
              onClick={handleExportImage}
              disabled={isExporting}
              className="bg-emerald-50 text-emerald-600 p-2 rounded-xl hover:bg-emerald-100 transition-all border border-emerald-100 flex items-center gap-2 group"
              title={isRtl ? "تصدير كصورة" : "Export as Image"}
            >
              <Download size={20} className={isExporting ? "animate-pulse" : ""} />
              <span className="hidden md:inline text-xs font-black uppercase tracking-wider">{isRtl ? "صورة" : "Image"}</span>
            </button>
          )}
          {canEdit && (
            <button onClick={addItem} className="bg-[#002147] text-white p-2 rounded-xl hover:bg-[#C49E3A] transition-all">
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Hidden Card for Capture */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <ShareableNotification 
          id="schedule-capture-card"
          lang={lang}
          studentName={studentName}
          type="schedule"
          schedule={schedule.map(item => ({
            day: t.days[item.day as keyof typeof t.days],
            time: item.time,
            subject: item.subject || item.unitTitle
          }))}
        />
      </div>

      {/* Hidden Card for Single Item Capture */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {itemToExport && (
          <ShareableNotification 
            id="single-item-capture-card"
            lang={lang}
            studentName={studentName}
            type="schedule"
            lessonName={itemToExport.subject || itemToExport.unitTitle}
            schedule={[{
              day: t.days[itemToExport.day as keyof typeof t.days],
              time: itemToExport.time
            }]}
          />
        )}
      </div>

      {canEdit && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 p-4 bg-slate-50 rounded-[1.5rem]">
          <select 
            value={newItem.day} 
            onChange={(e) => setNewItem({...newItem, day: e.target.value})}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2"
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d, dIdx) => (
              <option key={d || dIdx} value={d}>{t.days[d as keyof typeof t.days]}</option>
            ))}
          </select>
          <input 
            type="time" 
            value={newItem.time} 
            onChange={(e) => setNewItem({...newItem, time: e.target.value})}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2"
          />
          <select 
            value={newItem.subject} 
            onChange={(e) => setNewItem({...newItem, subject: e.target.value})}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2"
          >
            <option value="">{t.subject}</option>
            {Object.values(CurriculumCategory).map((cat, catIdx) => (
              <option key={`cat-option-${catIdx}`} value={cat}>{t[`curr_${cat}` as keyof typeof t] as string}</option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-3">
        {schedule.length === 0 ? (
          <p className="text-center text-slate-400 py-10 italic">{isRtl ? 'لا يوجد حصص مضافة حالياً' : 'No classes added yet'}</p>
        ) : (
          schedule.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#002147] shadow-sm">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[#002147] text-sm md:text-base">{item.subject || item.unitTitle}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.days[item.day as keyof typeof t.days]} • {item.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleExportItemImage(item)}
                  disabled={isExporting}
                  className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                  title={isRtl ? 'تحميل كصورة' : 'Download as Image'}
                >
                  <Download size={14} className={isExporting && itemToExport?.id === item.id ? "animate-pulse" : ""} />
                </button>
                <button 
                  onClick={() => handleWhatsAppShare(item)}
                  className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                  title={isRtl ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}
                >
                  <MessageSquare size={14} />
                </button>
                {canEdit && (
                  <button onClick={() => removeItem(item.id)} className="w-8 h-8 rounded-lg bg-slate-200/50 text-slate-400 hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const AIParentNotes = ({ profile, studentId, lang }: { profile: UserProfile, studentId: string, lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [notes, setNotes] = useState<ParentNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, 'parentNotes'), where('studentId', '==', studentId), where('parentId', '==', profile.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: ParentNote[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ParentNote);
      });
      setNotes(items.sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0)));
    });
    return () => unsubscribe();
  }, [studentId, profile.uid]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [notes]);

  const sendNote = async () => {
    if (!newNote.trim()) return;
    setSending(true);
    const textToSend = newNote;
    setNewNote('');
    
    try {
      const sDoc = await getDoc(doc(db, 'students', studentId));
      const studentData = sDoc.data();
      
      const resp = await fetch('/api/lesson/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          context: `Parent questioning about child (Student: ${studentId}, Level: ${studentData?.level || 'B1'}, Points: ${studentData?.points || 0}). Role: Academic Director at Academy.`
        })
      });
      
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        throw new Error(data.error || `Server error: ${resp.status}`);
      }
      const aiResponse = data.text || (lang === 'ar' ? "سأقوم بمراجعة هذا الأمر شخصياً." : "I will look into this personally.");

      const noteId = Math.random().toString(36).substr(2, 9);
      await setDoc(doc(db, 'parentNotes', noteId), {
        parentId: profile.uid,
        studentId,
        text: textToSend,
        aiResponse,
        createdAt: serverTimestamp()
      });
      
    } catch (error) {
      console.error("Error sending note:", error);
    }
    setSending(false);
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col h-[600px] overflow-hidden">
      <header className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black text-[#002147]">{t.notes}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{isRtl ? 'المعلم متصل' : 'Teacher Online'}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto bg-slate-50/30 scroll-smooth"
      >
        {notes.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-40">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare size={32} />
            </div>
            <p className="text-sm font-bold text-slate-500">{isRtl ? 'ابدأ المحادثة مع الإدارة التعليمية' : 'Start conversation with education management'}</p>
          </div>
        )}
        {notes.map((note) => (
          <React.Fragment key={note.id}>
            <div className={`flex ${isRtl ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-5 rounded-2xl shadow-sm ${
                isRtl 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-blue-600 text-white rounded-bl-none'
              }`}>
                <div className="flex items-center gap-2 mb-2 opacity-60">
                   <span className="text-[10px] font-black uppercase tracking-widest">{t.parent}</span>
                </div>
                <p className="text-sm leading-relaxed">{note.text}</p>
                <div className="text-[9px] mt-2 opacity-40 font-bold text-right">
                  {note.createdAt ? new Date(note.createdAt.toMillis()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : t.justNow}
                </div>
              </div>
            </div>

            {note.aiResponse && (
              <div className={`flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-5 rounded-2xl border border-slate-200 shadow-sm ${
                  isRtl 
                  ? 'bg-white text-[#002147] rounded-bl-none' 
                  : 'bg-white text-[#002147] rounded-br-none'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                      <Sparkles size={12} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#C49E3A]">{t.aiResponse}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 italic">
                    {note.aiResponse}
                  </p>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">{t.teacher}</span>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="p-6 md:p-8 bg-white border-t border-slate-100">
        <div className="flex gap-4 items-end">
          <div className="flex-1 relative">
            <textarea 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendNote();
                }
              }}
              placeholder={t.parentNotePlaceholder}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-6 py-4 text-sm focus:outline-none focus:border-blue-600 h-14 md:h-14 resize-none transition-all pr-12"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
              <PenTool size={16} />
            </div>
          </div>
          <button 
            onClick={sendNote}
            disabled={sending || !newNote.trim()}
            className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-[#002147] hover:scale-105 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 shrink-0"
          >
            {sending ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={24} className={isRtl ? 'rotate-180' : ''} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// StudentDashboard internal component
const StudentHome = ({ lang, profile, onStartConversation, onStartChat, onOpenCurriculum, onNavigate }: { lang: Language, profile: UserProfile, onStartConversation: () => void, onStartChat: () => void, onOpenCurriculum: () => void, onNavigate: (view: AppView) => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loadingRec, setLoadingRec] = useState(false);
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const [selectedHomework, setSelectedHomework] = useState<any | null>(null);
  const [currentPlan, setCurrentPlan] = useState<any>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        let q;
        if (profile.role === UserRole.ADMIN) {
          q = query(collection(db, 'studyPlans'), orderBy('createdAt', 'desc'), limit(1));
        } else {
          q = query(
            collection(db, 'studyPlans'),
            where('userId', '==', profile.uid),
            orderBy('createdAt', 'desc'),
            limit(1)
          );
        }
        const snap = await getDocs(q);
        if (!snap.empty) {
          const docPlan = snap.docs[0];
          const data = docPlan.data() as Record<string, any>;
          setCurrentPlan({ id: docPlan.id, ...data });
        }
      } catch (e) {
        console.error("Error fetching plan for dashboard:", e);
      }
    };
    fetchPlan();
  }, [profile.uid, profile.role]);

  const getTodayLesson = () => {
    if (!currentPlan || !currentPlan.planItems || currentPlan.planItems.length === 0) return { topic: 'N/A' };
    const today = new Date().toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' });
    return currentPlan.planItems.find((item: any) => item.dateLabel === today) || currentPlan.planItems[0];
  };

  const todayLesson = getTodayLesson();

  const handleDeletePlanDashboard = async () => {
    if (!currentPlan?.id) return;
    if (!window.confirm(isRtl ? 'هل أنت متأكد من حذف هذه الخطة؟' : 'Are you sure you want to delete this plan?')) return;
    try {
      await deleteDoc(doc(db, 'studyPlans', currentPlan.id));
      setCurrentPlan(null);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getRec = async () => {
      setLoadingRec(true);
      try {
        const resp = await fetch('/api/admin/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            data: { name: profile.displayName, level: (profile as any).level || 'A1', points: 1240 },
            prompt: `Give a 1-sentence encouraging study recommendation for this student at Basim Academy. Language: ${lang === 'ar' ? 'Arabic' : 'English'}.`
          })
        });
        const data = await resp.json();
        setRecommendation(data.text);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingRec(false);
      }
    };
    getRec();
  }, [profile.uid, lang]);

  useEffect(() => {
    const q = query(
      collection(db, 'homework'),
      where('studentId', '==', profile.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc, dIdx) => ({ id: doc.id || `doc-${dIdx}`, ...doc.data() as any }));
      setHomeworks(docs);
    });
    return () => unsubscribe();
  }, [profile.uid]);

  return (
    <div className={`flex-1 p-5 md:p-12 overflow-y-auto ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 md:mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-[#002147] mb-2 tracking-tight">
              {t.welcomeUser} {profile.displayName.split(' ')[0]}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-slate-400 font-medium text-sm md:text-lg">
                {lang === 'ar' ? 'أهلاً بك في أكاديمية باسم الخليل' : 'Welcome to Basim Alkhalil Academy'}
              </p>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg">
                <Sparkles size={14} className="text-[#C49E3A] animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-white/50 uppercase leading-none">Intelligence Engine</span>
                  <span className="text-[10px] font-black text-white tracking-tighter">GEMINI 3 FLASH PREVIEW</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">{isRtl ? 'كود الطالب:' : 'STUDENT CODE:'}</span>
                <code className="text-xs font-mono font-bold text-[#002147] select-all">
                  {profile.studentCode ? `AK${profile.studentCode}` : profile.uid}
                </code>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-3xl border border-slate-200 shadow-sm w-full md:w-auto overflow-hidden">
            <div className={`flex flex-1 md:flex-none items-center justify-center md:justify-start gap-3 px-6 py-3 bg-slate-50 rounded-2xl ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Trophy className="text-[#C49E3A] w-6 h-6" />
              <span className="font-black text-[#002147] text-xl shrink-0">1,240 <span className="text-[10px] text-slate-400 uppercase tracking-widest inline md:block ml-1 md:ml-0">{t.points}</span></span>
            </div>
            <button 
              onClick={() => {
                const codeToCopy = profile.studentCode ? `AK${profile.studentCode}` : profile.uid;
                navigator.clipboard.writeText(codeToCopy);
                alert(lang === 'ar' ? 'تم نسخ كود الطالب!' : 'Student code copied!');
              }}
              className="p-3 hover:bg-slate-50 rounded-2xl transition-all" 
              title="ID"
            >
              <Settings size={20} className="text-slate-400" />
            </button>
          </div>
        </header>

        {recommendation && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl text-white shadow-xl flex items-center gap-6"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
              <Sparkles className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">{isRtl ? 'توصية الذكاء الاصطناعي اليوم' : 'AI DAILY RECOMMENDATION'}</p>
              <p className="font-bold text-sm md:text-base leading-relaxed">"{recommendation}"</p>
            </div>
          </motion.div>
        )}

        {/* Adults Daily Dose Quick Panel Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-8 rounded-[2.5rem] border border-[#b48e56]/30 bg-gradient-to-br from-[#fdfbf7] to-[#f9f5eb] shadow-md shadow-[#b48e56]/5 relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:scale-110 transition-transform">
            <Zap size={100} className="text-[#b48e56]" />
          </div>
          <div className="flex items-center gap-5 relative z-10 w-full">
            <div className="w-14 h-14 bg-[#b48e56]/10 text-[#b48e56] rounded-2xl flex items-center justify-center shrink-0 border border-[#b48e56]/20 shadow-xs">
              <Zap size={24} className="animate-pulse" />
            </div>
            <div className={`${isRtl ? 'text-right' : 'text-left'} flex-1`}>
              <div className={`flex items-center gap-2 mb-1.5 flex-wrap ${isRtl ? 'justify-start' : 'justify-start'}`}>
                <span className="px-3 py-0.5 bg-[#b48e56] text-white text-[9px] font-black rounded-md uppercase tracking-wider">
                  {isRtl ? 'الجرعة اليومية للكبار' : 'ADULTS DAILY DOSE'}
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-black rounded-md border border-emerald-100">
                  {isRtl ? 'أنا متحمس مش أنا مثير!' : 'A2-B1 Level'}
                </span>
                <span className="w-1.5 h-1.5 bg-[#b48e56] rounded-full animate-ping" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-1">
                {isRtl ? 'الدرس النشط: أنا متحمس مش أنا مثير! (مقارنة بـ -ed و -ing)' : 'Active Lesson: I am excited vs I am exciting!'}
              </h3>
              <p className="text-slate-500 font-medium text-xs">
                {isRtl ? 'صحّح خطأ المقابلات الشائع واكتسب مهارة تفرقة تامة بخطوة تفاعلية مدتها خمس دقائق.' : 'Deconstruct common interactive grammar errors in under five gold minutes.'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('adults-daily-dose')}
            className="w-full md:w-auto bg-[#002147] hover:bg-[#b48e56] text-white text-xs font-black px-6 py-3.5 rounded-2xl shadow-md transition-all shrink-0 cursor-pointer text-center relative z-10 whitespace-nowrap"
          >
            {isRtl ? 'ابدأ الجرعة اليومية ⚡' : 'Start Daily Dose ⚡'}
          </button>
        </motion.div>

        {/* Kids Interactive Story Dashboard Quick Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-8 rounded-[2.5rem] border border-amber-500/30 bg-gradient-to-br from-[#fffcf5] to-[#fbf7eb] shadow-md shadow-amber-500/5 relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:scale-110 transition-transform">
            <BookOpen size={100} className="text-amber-500" />
          </div>
          <div className="flex items-center gap-5 relative z-10 w-full">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center shrink-0 border border-amber-500/20 shadow-xs">
              <BookOpen size={24} className="text-amber-500 animate-pulse" />
            </div>
            <div className={`${isRtl ? 'text-right' : 'text-left'} flex-1`}>
              <div className={`flex items-center gap-2 mb-1.5 flex-wrap ${isRtl ? 'justify-start' : 'justify-start'}`}>
                <span className="px-3 py-0.5 bg-amber-500 text-white text-[9px] font-black rounded-md uppercase tracking-wider">
                  {isRtl ? 'مغامرات الأطفال التفاعلية 👶' : 'KIDS INTERACTIVE STORY 👶'}
                </span>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-black rounded-md border border-amber-100">
                  {isRtl ? 'سلسلة مغامرات لندن' : 'London Adventures'}
                </span>
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-1">
                {isRtl ? 'القصة التفاعلية: نور تصل إلى لندن ✈️' : 'Interactive Story: Noor Arrives in London ✈️'}
              </h3>
              <p className="text-slate-500 font-medium text-xs">
                {isRtl ? 'رافق الطالب نور بمطار لندن هيثرو، وتتدرب على الحوار، القاموس الصغير، وتحدي تقليد الشخصيات بالصوت!' : 'Join Noor at Heathrow Airport! Features interactive bilingual play, dictionary quests, and phonic mic challenges!'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('kids-story-player')}
            className="w-full md:w-auto bg-amber-500 hover:bg-[#c49e3a] text-white text-xs font-black px-6 py-3.5 rounded-2xl shadow-md transition-all shrink-0 cursor-pointer text-center relative z-10 whitespace-nowrap"
          >
            {isRtl ? 'ابدأ مغامرتى الآن ✨' : 'Start Kids Adventure ✨'}
          </button>
        </motion.div>

        {currentPlan && todayLesson && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 p-8 bg-white rounded-[2.5rem] border-2 border-blue-600/10 shadow-xl shadow-blue-100/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
               <Brain size={120} />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-lg shadow-blue-200">
                  <CalendarDays size={36} />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{isRtl ? 'خطتك الدراسية الحالية' : 'Active Study Plan'}</span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-black text-[#002147] mb-1">
                    {isRtl ? `خطة ${currentPlan.studentName}` : `${currentPlan.studentName}'s Plan`}
                  </h3>
                  <p className="text-slate-400 font-bold text-sm">
                    {isRtl ? 'الدرس التالي (اليوم): ' : 'Next Lesson (Today): '} 
                    <span className="text-blue-600">{todayLesson.topic}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={handleDeletePlanDashboard}
                  className="hidden lg:flex items-center justify-center p-4 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-[1.5rem] transition-all border border-rose-100"
                  title={isRtl ? 'حذف الخطة' : 'Delete Plan'}
                >
                  <Trash2 size={24} />
                </button>
                <div className="hidden lg:flex flex-col items-center px-6 py-3 border-r border-slate-100 pr-10">
                   <span className="text-[10px] font-black text-slate-300 uppercase mb-1">{isRtl ? 'الوقت المفضل' : 'Preferred Time'}</span>
                   <span className="text-lg font-black text-[#002147]">{currentPlan.preferredTime}</span>
                </div>
                <button 
                  onClick={() => onNavigate('academic-planner')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-[#002147] text-white px-8 py-5 rounded-[2rem] font-black hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/10"
                >
                  {isRtl ? 'متابعة الخطة' : 'Follow Plan'}
                  <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          {/* Journey Section */}
          <section className="lg:col-span-2 bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10 gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
              <h3 className="text-2xl font-black text-[#002147] flex items-center gap-3">
                <LayoutDashboard size={24} className="text-blue-600" />
                {t.learningProgress}
              </h3>
              <button 
                onClick={onOpenCurriculum}
                className="text-blue-600 font-bold text-sm md:text-base hover:underline"
              >
                {lang === 'ar' ? 'عرض جميع المناهج' : 'Browse All Modules'}
              </button>
            </div>
            
            <div className="space-y-6">
                {MASTER_CURRICULUM[CurriculumCategory.READING][(profile as any).level || proficiencyLevel.A1].slice(0, 3).map((unit: any, i: number) => (
                <div key={`unit-reading-${i}-${unit.id || unit.title || ''}`} className={`p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 transition-all ${i === 0 ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-bold text-xl md:text-2xl shrink-0 ${
                      i === 0 ? 'bg-[#002147] text-white shadow-xl shadow-blue-200' : 'bg-slate-50 text-slate-300'
                    }`}>
                      {i + 1}
                    </div>
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <h4 className={`font-bold text-base md:text-lg ${i > 0 ? 'text-slate-400' : 'text-[#002147]'}`}>
                        {isRtl ? unit.titleAr : unit.title}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-500 font-medium line-clamp-1">
                        {isRtl ? unit.descriptionAr : unit.description}
                      </p>
                    </div>
                  </div>
                  {i === 0 && (
                    <button 
                      onClick={onOpenCurriculum}
                      className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl md:rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                    >
                      <Play size={16} fill="currentColor" />
                      {t.currentLesson}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-10">
            {/* Academic Hub Card */}
            <motion.div 
               whileHover={{ scale: 1.01 }}
               onClick={() => onNavigate('academic-planner')}
               className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group shadow-xl shadow-indigo-200 border-b-8 border-indigo-900 cursor-pointer"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                   <Brain className="text-white" />
                </div>
                <h3 className="text-2xl font-black mb-2">{t.academicHub}</h3>
                <p className="text-indigo-100 text-sm mb-6 leading-relaxed max-w-sm">
                  {isRtl ? 'نظم دراستك، تتبع نتائجك، واستخرج تقارير تحليلية ذكية مدعومة بالذكاء الاصطناعي.' : 'Organize your studies, track results, and generate smart AI-powered analytical reports.'}
                </p>
                <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-widest text-indigo-300">
                   <Sparkles size={14} className="animate-pulse" />
                   AI Academic Control Center
                </div>
              </div>
              <Brain size={160} className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-110 transition-transform hidden md:block" />
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-[#002147] text-white rounded-[2.5rem] p-10 relative overflow-hidden group shadow-xl shadow-blue-900/10 border-b-8 border-[#C49E3A]"
            >
                  <div className="relative z-10">
                {/* Connection Tester for Admin */}
                {MASTER_ADMINS.includes((profile?.email || auth.currentUser?.email || '').toLowerCase()) && (
                  <div className="absolute top-0 right-0 z-20">
                    <button 
                      onClick={async () => {
                        try {
                          const resp = await fetch('/api/health');
                          const data = await resp.json();
                          alert(`Connection OK: ${JSON.stringify(data)}`);
                        } catch (e: any) {
                          alert(`Connection FAILED: ${e.message}`);
                        }
                      }}
                      className="text-[8px] bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 whitespace-nowrap"
                    >
                      🧪 Test Conn
                    </button>
                  </div>
                )}
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                  <Mic2 className="text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.aiPartner}</h3>
                <p className={`text-blue-100 text-sm mb-8 ${lang === 'ar' ? 'text-right' : 'text-left'} leading-relaxed`}>
                  {lang === 'ar' ? 'تدرب على النطق الصحيح في مواقف يومية مع شريكك الآلي المدعوم بـ AI.' : 'Practice correct pronunciation in daily situations with your AI-powered partner.'}
                </p>
                <button 
                  onClick={onStartConversation}
                  className={`bg-white text-[#002147] px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#C49E3A] hover:text-white transition-all ${lang === 'ar' ? 'mr-auto' : 'ml-auto'} shadow-xl`}
                >
                  <Sparkles size={18} />
                  {lang === 'ar' ? 'ابدأ التجربة' : 'Start Trial'}
                </button>
              </div>
              <Mic2 size={160} className="absolute -bottom-10 -left-10 text-white/5 group-hover:scale-110 transition-transform hidden md:block" />
            </motion.div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative">
              <h3 className="font-bold text-[#002147] mb-6 flex items-center gap-3">
                <Calendar className="text-[#C49E3A]" />
                {lang === 'ar' ? 'المهام والواجبات الذكية' : 'Smart Tasks & Homework'}
              </h3>
              <div className={`space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                {homeworks.length === 0 ? (
                  <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-xs font-medium">
                      {isRtl ? 'لا يوجد واجبات حالياً' : 'No homework assigned yet'}
                    </p>
                  </div>
                ) : (
                  homeworks.map((hw, hIdx) => (
                    <motion.div 
                      key={hw.id || `hw-item-${hIdx}`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedHomework(hw)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                        hw.status === 'completed' 
                          ? 'bg-emerald-50/50 border-emerald-100' 
                          : 'bg-indigo-50/50 border-indigo-100'
                      } ${lang === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}
                    >
                      <div className={`p-2 rounded-xl ${
                        hw.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {hw.status === 'completed' ? <CheckCircle2 size={20} /> : <Sparkles size={20} />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm ${
                          hw.status === 'completed' ? 'text-emerald-800' : 'text-indigo-800'
                        }`}>{isRtl ? hw.titleAr : hw.title}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${
                          hw.status === 'completed' ? 'text-emerald-600/80' : 'text-indigo-600/80'
                        }`}>
                          {hw.status === 'completed' ? (isRtl ? 'تم الإنجاز' : 'COMPLETED') : (isRtl ? 'بانتظار الحل' : 'PENDING')}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Homework Detail Modal */}
              <AnimatePresence>
                {selectedHomework && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
                      dir={isRtl ? 'rtl' : 'ltr'}
                    >
                      <div className="bg-[#002147] p-8 text-white flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-black tracking-widest text-blue-300 uppercase mb-2">SMART HOMEWORK</p>
                          <h3 className="text-2xl font-black">{isRtl ? selectedHomework.titleAr : selectedHomework.title}</h3>
                        </div>
                        <button 
                          onClick={() => setSelectedHomework(null)}
                          className="p-2 hover:bg-white/10 rounded-xl transition-all"
                        >
                          <X size={24} />
                        </button>
                      </div>
                      
                      <div className="p-8 max-h-[60vh] overflow-y-auto space-y-8">
                        <div>
                          <p className="text-slate-600 font-medium leading-relaxed italic">
                            {isRtl ? selectedHomework.descriptionAr : selectedHomework.description}
                          </p>
                        </div>

                        <div className="space-y-4">
                          {selectedHomework.tasks?.map((task: any, idx: number) => (
                            <div key={`${task.id || 'task'}-${idx}`} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold shrink-0">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">
                                  {task.type} • {task.points} {t.points}
                                </span>
                                <p className="font-bold text-[#002147] mb-3">
                                  {isRtl ? task.instructionAr : task.instruction}
                                </p>
                                {task.content && (
                                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-sm text-slate-600 italic">
                                    {isRtl ? task.contentAr : task.content}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-3 text-slate-400">
                          <Clock size={16} />
                          <span className="text-xs font-bold">{isRtl ? 'الموعد النهائي: ' : 'Deadline: '} {selectedHomework.deadline}</span>
                        </div>
                        {selectedHomework.status !== 'completed' && (
                          <button 
                            onClick={async () => {
                              try {
                                await updateDoc(doc(db, 'homework', selectedHomework.id), { status: 'completed' });
                                setSelectedHomework({ ...selectedHomework, status: 'completed' });
                                alert(isRtl ? 'أحسنت! تم تسليم الواجب.' : 'Well done! Homework submitted.');
                              } catch (e) {
                                console.error(e);
                              }
                            }}
                            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all"
                          >
                            <CheckCircle2 size={18} />
                            {isRtl ? 'تسليم الواجب' : 'Submit Homework'}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <ScheduleManager studentId={profile.uid} studentName={profile.displayName || ''} lang={lang} canEdit={true} />
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-[#002147] mb-8 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={20} />
              {t.skillAnalysis}
            </h3>
            <div className="space-y-8">
              {[
                { label: 'Listening', value: 85, color: 'bg-blue-600' },
                { label: 'Speaking', value: 62, color: 'bg-orange-500' },
                { label: 'Reading', value: 78, color: 'bg-emerald-500' },
                { label: 'Writing', value: 45, color: 'bg-[#C49E3A]' },
              ].map((skill) => (
                <div key={skill.label}>
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="font-bold text-slate-700 uppercase tracking-widest text-[10px]">{skill.label}</span>
                    <span className="text-slate-900 font-bold">%{skill.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.value}%` }}
                      className={`h-full ${skill.color} rounded-full`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#002147] to-[#003366] rounded-3xl p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-bold text-xl mb-3">{lang === 'ar' ? 'دعم تعليمي مباشر' : 'Live Educational Support'}</h3>
              <p className="text-blue-200 text-sm mb-8 leading-relaxed">{lang === 'ar' ? 'تواصل مع معلمك الخاص مباشرة للحصول على توضيحات حول منهج أكسفورد.' : 'Connect directly with your private teacher for clarifications on the curriculum.'}</p>
              <button className="w-full bg-[#C49E3A] hover:bg-[#b08e33] py-4 rounded-2xl font-bold text-sm shadow-xl transition-all">{lang === 'ar' ? 'تواصل الآن' : 'Contact Now'}</button>
            </div>
            <Sparkles className="absolute -top-4 -right-4 text-white/5 w-32 h-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ParentDashboard and RoleSelector are the same...
// Excluding them here for brevity if they haven't changed much, but will implement fully below.

const RoleSelector = ({ onSelect, lang }: { onSelect: (role: UserRole) => void, lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const roles = [
    { 
      id: UserRole.STUDENT, 
      title: isRtl ? 'طالب' : 'Student', 
      icon: GraduationCap, 
      color: 'bg-blue-600', 
      description: isRtl ? 'ابدأ رحلتك التعليمية وتحدث مع شريكك الذكي' : 'Start your learning journey and talk to your smart partner'
    },
    { 
      id: UserRole.PARENT, 
      title: isRtl ? 'ولي أمر' : 'Parent', 
      icon: Users, 
      color: 'bg-[#C49E3A]', 
      description: isRtl ? 'تابع تقدم أطفالك ونتائج اختباراتهم' : "Follow your children's progress and test results"
    },
  ];

  return (
    <div className={`min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 ${isRtl ? 'font-arabic' : 'font-sans'} relative overflow-hidden`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 left-0 w-full h-8 bg-[#002147]" />
      <div className="absolute top-8 left-0 w-full h-1 bg-[#C49E3A]" />
      
      <div className="max-w-4xl w-full z-10">
        <div className="text-center mb-16">
          <div className="bg-[#002147] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-black">B</div>
          <h1 className="text-4xl font-bold text-[#002147] mb-4 tracking-tight">{t.academyName} {t.academySubName}</h1>
          <p className="text-slate-400 text-lg font-medium">{isRtl ? 'مرحباً بك في مستقبل تكنولوجيا التعليم (EdTech)' : 'Welcome to the future of EdTech'}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {roles.map((role, rIdx) => (
            <motion.button
              key={`role-select-${role.id}-${rIdx}`}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(role.id)}
              className={`bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 ${isRtl ? 'text-right' : 'text-left'} flex flex-col items-center md:items-start space-y-4 md:space-y-6 hover:shadow-2xl transition-all group`}
            >
              <div className={`${role.color} p-4 md:p-5 rounded-2xl md:rounded-3xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <role.icon size={innerWidth < 768 ? 28 : 36} />
              </div>
              <div className="space-y-2 md:space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-[#002147]">{role.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{role.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ParentDashboard = ({ lang, profile, onStudentSelect, onNavigate }: { lang: Language, profile: UserProfile, onStudentSelect?: (id: string) => void, onNavigate?: (view: AppView) => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [studentIdInput, setStudentIdInput] = useState('');
  const [linkedStudents, setLinkedStudents] = useState<any[]>([]);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [linking, setLinking] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [currentPlanResults, setCurrentPlanResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudentSpecificData = async () => {
      if (selectedStudentIndex === null || !linkedStudents[selectedStudentIndex]) return;
      
      const student = linkedStudents[selectedStudentIndex];
      const studentId = student.uid;
      
      try {
        // Fetch Study Plan
        const plansQ = query(
          collection(db, 'studyPlans'), 
          where('userId', '==', studentId),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        const snap = await getDocs(plansQ);
        if (!snap.empty) {
          const docPlan = snap.docs[0];
          setCurrentPlan({ id: docPlan.id, ...docPlan.data() });
        } else {
          setCurrentPlan(null);
        }

        // Fetch Results
        const resultsQ = query(
          collection(db, 'lessonResults'), 
          where('userId', '==', studentId),
          orderBy('timestamp', 'desc'),
          limit(20)
        );
        const resultsSnapshot = await getDocs(resultsQ);
        const results: any[] = [];
        resultsSnapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }));
        setCurrentPlanResults(results);
      } catch (e) {
        console.error("Error fetching student data for parent:", e);
      }
    };

    fetchStudentSpecificData();
  }, [selectedStudentIndex, linkedStudents]);

  const getTodayLesson = () => {
    if (!currentPlan || !currentPlan.planItems || currentPlan.planItems.length === 0) return { topic: 'N/A' };
    const today = new Date().toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' });
    return currentPlan.planItems.find((item: any) => item.dateLabel === today) || currentPlan.planItems[0];
  };

  const todayLesson = getTodayLesson();

  const handleDeletePlanDashboard = async () => {
    if (!currentPlan?.id) return;
    if (!window.confirm(isRtl ? 'هل أنت متأكد من حذف هذه الخطة؟' : 'Are you sure you want to delete this plan?')) return;
    try {
      await deleteDoc(doc(db, 'studyPlans', currentPlan.id));
      setCurrentPlan(null);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (selectedStudentIndex !== null && linkedStudents[selectedStudentIndex] && onStudentSelect) {
      onStudentSelect(linkedStudents[selectedStudentIndex].uid);
    }
  }, [selectedStudentIndex, linkedStudents, onStudentSelect]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      const userDoc = await getDoc(doc(db, 'users', profile.uid));
      const userData = userDoc.data() as any;
      
      const studentIds: string[] = [];
      if (userData?.linkedStudentIds && Array.isArray(userData.linkedStudentIds)) {
        studentIds.push(...userData.linkedStudentIds);
      } else if (userData?.linkedStudentId) {
        // Migration: convert single ID to array
        studentIds.push(userData.linkedStudentId);
      }

      if (studentIds.length > 0) {
        const students = await Promise.all(studentIds.map(async (id) => {
          try {
            const sDoc = await getDoc(doc(db, 'users', id));
            const sMeta = await getDoc(doc(db, 'students', id));
            if (sDoc.exists() && sMeta.exists()) {
              return { 
                uid: id,
                ...sDoc.data(), 
                ...sMeta.data(), 
                phoneNumber: userData.phoneNumber, 
                studentPhoneNumber: userData.studentPhoneNumber 
              };
            }
          } catch (err) {
            console.error(`Error fetching student ${id}:`, err);
          }
          return null;
        }));
        
        const validStudents = students.filter(s => s !== null);
        setLinkedStudents(validStudents);
        if (validStudents.length > 0) {
          setSelectedStudentIndex(0);
        }
      }
      setLoading(false);
    };
    fetchStudentsData();
  }, [profile.uid]);

  const handleLink = async () => {
    let inputId = studentIdInput.trim();
    if (!inputId) return;
    
    // Support "AK123456" format by stripping "AK"
    if (inputId.toUpperCase().startsWith('AK')) {
      inputId = inputId.substring(2);
    }
    
    setLinking(true);
    setError('');
    try {
      // First try by UID (legacy)
      let sDoc = await getDoc(doc(db, 'users', inputId));
      let studentId = inputId;

      // If not found by UID, try by studentCode
      if (!sDoc.exists() || sDoc.data()?.role !== UserRole.STUDENT) {
        const q = query(collection(db, 'users'), where('studentCode', '==', inputId), limit(1));
        const qSnap = await getDocs(q);
        if (!qSnap.empty) {
          sDoc = qSnap.docs[0];
          studentId = sDoc.id;
        } else {
          // One more try: maybe they entered the full UID but it wasn't found in the first check
          // (actually the first check covers it, so if we're here it's really not found)
          setError(t.invalidStudentId);
          setLinking(false);
          return;
        }
      }

      if (sDoc.exists() && sDoc.data().role === UserRole.STUDENT) {
        const userDoc = await getDoc(doc(db, 'users', profile.uid));
        const userData = userDoc.data() as any;
        const currentIds = userData?.linkedStudentIds || (userData?.linkedStudentId ? [userData.linkedStudentId] : []);
        
        if (currentIds.includes(studentId)) {
          setError(isRtl ? 'هذا الطالب مربوط بالفعل.' : 'This student is already linked.');
          setLinking(false);
          return;
        }

        const nextIds = [...currentIds, studentId];
        await setDoc(doc(db, 'users', profile.uid), { 
          linkedStudentIds: nextIds,
          linkedStudentId: nextIds[0] // Backward compatibility
        }, { merge: true });

        // Add parent to student's record for security rules optimization
        const sDocData = sDoc.data() || {};
        const sParentIds = sDocData.linkedParentIds || [];
        if (!sParentIds.includes(profile.uid)) {
          await updateDoc(doc(db, 'users', studentId), {
            linkedParentIds: [...sParentIds, profile.uid]
          });
        }
        
        const sMeta = await getDoc(doc(db, 'students', studentId));
        const newStudent = { 
          ...sDoc.data(), 
          ...sMeta.data(), 
          phoneNumber: userData?.phoneNumber, 
          studentPhoneNumber: userData?.studentPhoneNumber 
        };

        setLinkedStudents(prev => [...prev, newStudent]);
        setSelectedStudentIndex(linkedStudents.length);
        setStudentIdInput('');
        setShowAddStudent(false);
      } else {
        setError(t.invalidStudentId);
      }
    } catch (err) {
      console.error("Linking error:", err);
      setError(t.invalidStudentId);
    }
    setLinking(false);
  };

  const handleDelete = async (id: string, index: number) => {
    if (!confirm(t.confirmDeleteStudent)) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', profile.uid));
      const userData = userDoc.data() as any;
      const nextIds = (userData?.linkedStudentIds || []).filter((sid: string) => sid !== id);
      
      await setDoc(doc(db, 'users', profile.uid), { 
        linkedStudentIds: nextIds,
        linkedStudentId: nextIds.length > 0 ? nextIds[0] : null
      }, { merge: true });

      const nextStudents = linkedStudents.filter((_, i) => i !== index);
      setLinkedStudents(nextStudents);
      
      if (nextStudents.length === 0) {
        setSelectedStudentIndex(null);
      } else if (selectedStudentIndex === index) {
        setSelectedStudentIndex(0);
      } else if (selectedStudentIndex !== null && selectedStudentIndex > index) {
        setSelectedStudentIndex(selectedStudentIndex - 1);
      }
    } catch (err) {
      console.error("Error deleting student link:", err);
    }
  };

  const [generatingReport, setGeneratingReport] = useState(false);
  const [smartReport, setSmartReport] = useState<string | null>(null);
  const [exportingReport, setExportingReport] = useState(false);

  const generateReport = async () => {
    if (!currentStudent) return;
    setGeneratingReport(true);
    try {
      const promptLang = lang === 'ar' ? 'Arabic' : 'English';
      const resp = await fetch('/api/admin/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { 
            studentName: currentStudent.displayName, 
            level: currentStudent.level, 
            points: currentStudent.points,
            attendance: currentStudent.stats?.attendance || 0,
            avgScore: currentStudent.stats?.avgScore || 0
          },
          prompt: `As an education expert at "Basim Alkhalil Academy", analyze the student's performance and provide a detailed, encouraging, and highly professional academic report for the parent. Include specific strengths and clear areas for growth. The report MUST be written entirely in ${promptLang}. Always use a professional and optimistic tone. Use markdown formatting (bold, lists).`
        })
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        throw new Error(data.error || `Server error: ${resp.status}`);
      }
      setSmartReport(data.text || (lang === 'ar' ? "عذراً، تعذر توليد التقرير حالياً." : "Sorry, report generation failed."));
    } catch (err: any) {
      console.error("AI Report Error:", err);
      const msg = err.error || err.message || (typeof err === 'string' ? err : JSON.stringify(err));
      setError(`فشل في توليد التقرير: ${msg}`);
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleExportReportImage = async () => {
    if (!smartReport || !currentStudent) return;
    setExportingReport(true);
    try {
      const element = document.getElementById('report-share-card');
      if (!element) return;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('report-share-card');
          if (el) {
            el.style.display = 'block';
            el.style.position = 'relative';
          }
          // Remove oklch to prevent parser errors in captured image
          const styles = clonedDoc.getElementsByTagName('style');
          for (let i = 0; i < styles.length; i++) {
            const style = styles[i];
            if (style.innerHTML.includes('oklch')) {
              style.innerHTML = style.innerHTML.replace(/oklch\([^)]+\)/g, '#f1f5f9');
            }
          }
        }
      });
      
      const link = document.createElement('a');
      link.download = `BKD-Report-${currentStudent.displayName}-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setExportingReport(false);
    }
  };

  const handleUpdatePhone = async (type: 'parent' | 'student', phone: string) => {
    try {
      const field = type === 'parent' ? 'phoneNumber' : 'studentPhoneNumber';
      await setDoc(doc(db, 'users', profile.uid), { [field]: phone }, { merge: true });
      setLinkedStudents(prev => prev.map((s, i) => i === selectedStudentIndex ? { ...s, [field]: phone } : s));
    } catch (err) {
      console.error("Error updating phone:", err);
    }
  };

  const currentStudent = selectedStudentIndex !== null ? linkedStudents[selectedStudentIndex] : null;

  if (loading) return (
    <div className="p-20 text-center">
      <div className="w-12 h-12 bg-[#002147] rounded-2xl animate-spin mx-auto mb-4" />
      <p className="text-slate-400">{t.loadingText}</p>
    </div>
  );

  if (linkedStudents.length === 0 || showAddStudent) {
    return (
      <div className={`p-8 max-w-2xl mx-auto w-full ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 text-center"
        >
          {linkedStudents.length > 0 && (
            <button 
              onClick={() => setShowAddStudent(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-[#002147] transition-colors"
            >
              ×
            </button>
          )}
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Users size={40} />
          </div>
          <h2 className="text-3xl font-black text-[#002147] mb-4">{t.linkStudent}</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">{t.enterStudentId}</p>
          
          <div className="space-y-4">
            <input 
              type="text" 
              value={studentIdInput}
              onChange={(e) => setStudentIdInput(e.target.value)}
              placeholder={t.studentIdPlaceholder}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#002147] transition-all font-mono"
            />
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button 
              onClick={handleLink}
              disabled={linking}
              className="w-full bg-[#002147] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/20 hover:bg-[#C49E3A] transition-all disabled:opacity-50"
            >
              {linking ? t.loadingText : t.verifyAndLink}
            </button>
          </div>
          
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-xs text-slate-400 font-medium">
              {isRtl ? 'لا تمتلك كود الطالب؟ اطلب من الطالب نسخ الكود (6 أرقام مع AK) من أعلى صفحة بروفايله.' : 'Don\'t have the student code? Ask the student to copy their 6-digit code (with AK) from the top of their profile page.'}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentStudent) return null;

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {currentPlan && todayLesson && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-8 bg-white rounded-[2.5rem] border-2 border-blue-600/10 shadow-xl shadow-blue-100/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
             <Brain size={120} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-lg shadow-blue-200">
                <CalendarDays size={36} />
              </div>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{isRtl ? 'خطتك الدراسية الحالية' : 'Active Study Plan'}</span>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                <h3 className="text-2xl font-black text-[#002147] mb-1">
                  {isRtl ? `خطة ${currentPlan.studentName}` : `${currentPlan.studentName}'s Plan`}
                </h3>
                <p className="text-slate-400 font-bold text-sm">
                  {isRtl ? 'الدرس التالي (اليوم): ' : 'Next Lesson (Today): '} 
                  <span className="text-blue-600">{todayLesson.topic}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={handleDeletePlanDashboard}
                className="hidden lg:flex items-center justify-center p-4 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-[1.5rem] transition-all border border-rose-100"
                title={isRtl ? 'حذف الخطة' : 'Delete Plan'}
              >
                <Trash2 size={24} />
              </button>
              <div className="hidden lg:flex flex-col items-center px-6 py-3 border-r border-slate-100 pr-10">
                 <span className="text-[10px] font-black text-slate-300 uppercase mb-1">{isRtl ? 'الوقت المفضل' : 'Preferred Time'}</span>
                 <span className="text-lg font-black text-[#002147]">{currentPlan.preferredTime}</span>
              </div>
              <button 
                onClick={() => onNavigate && onNavigate('academic-planner')}
                className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-[#002147] text-white px-8 py-5 rounded-[2rem] font-black hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/10"
              >
                {isRtl ? 'متابعة الخطة' : 'Follow Plan'}
                <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <header className={`mb-8 md:mb-12 border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002147]">{t.parentPortal}</h2>
          <p className="text-slate-400 italic mt-2 text-sm md:text-base">{t.trackProgress}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <button 
            onClick={generateReport}
            disabled={generatingReport}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-3 hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
          >
            {generatingReport ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles size={20} />
            )}
            {isRtl ? 'طلب تقرير ذكي' : 'Get AI Smart Report'}
          </button>
          <div className="flex -space-x-2 rtl:space-x-reverse items-center overflow-x-auto pb-2 md:pb-0 scrollbar-hide py-1 px-1">
            {linkedStudents.map((student, idx) => (
              <div key={`parent-student-${student.uid || idx}`} className="relative group flex-shrink-0">
                <button
                  onClick={() => setSelectedStudentIndex(idx)}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl border-4 transition-all duration-300 overflow-hidden relative ${
                    selectedStudentIndex === idx 
                      ? 'border-[#C49E3A] scale-110 shadow-lg z-10' 
                      : 'border-white hover:border-slate-200 z-0 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={student.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.displayName}`} alt={student.displayName} className="w-full h-full object-cover" />
                </button>
                {selectedStudentIndex === idx && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(student.uid, idx);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-red-600"
                    title={t.deleteStudent}
                  >
                    <Trash2 size={12} />
                  </button>
                )}
                {/* Name Label on Hover */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#002147] text-white text-[10px] py-1 px-2 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                  {student.displayName}
                </span>
              </div>
            ))}
            <button 
              onClick={() => setShowAddStudent(true)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 border-dashed border-slate-300 text-slate-400 hover:text-blue-600 hover:border-blue-600 flex items-center justify-center transition-all flex-shrink-0 ml-4 group relative"
              title={t.addAnotherStudent}
            >
              <Plus size={24} />
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] py-1 px-2 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                {t.addAnotherStudent}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        {(() => {
          const totalAssignments = currentPlan?.plan?.length || 0;
          const completedAssignments = currentPlan?.plan?.filter((item: any) => 
            currentPlanResults.some(r => r.lessonId === item.unitId)
          ).length || 0;
          
          const totalEarned = currentPlanResults.reduce((acc, r) => acc + (r.score || 0), 0);
          const totalPossible = currentPlanResults.reduce((acc, r) => acc + (r.total || 0), 0);
          const avgScore = totalPossible > 0 ? (totalEarned / totalPossible) * 100 : 0;
          const scoreLabel = avgScore >= 90 ? 'A+' : avgScore >= 80 ? 'A' : avgScore >= 70 ? 'B' : avgScore > 0 ? 'C' : 'N/A';

          // Derived attendance (e.g. % of lessons completed vs total in plan)
          const attendanceVal = totalAssignments > 0 ? Math.min(100, Math.round((completedAssignments / totalAssignments) * 100)) : 0;

          return [
            { label: t.attendance, value: attendanceVal > 0 ? `${attendanceVal}%` : '---', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: t.gradeAverage, value: scoreLabel, icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: t.completedAssignments, value: `${completedAssignments}/${totalAssignments}`, icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: t.speakingHours, value: currentStudent.points > 0 ? (currentStudent.points / 10).toFixed(1) : '0.0', icon: Mic2, color: 'text-[#C49E3A]', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <div key={`stat-card-overview-${currentStudent.uid}-${i}`} className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : ''} relative overflow-hidden group`}>
              <div className={`${stat.bg} ${stat.color || ''} p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-[#002147]">{stat.value}</p>
              </div>
              <div className={`absolute top-0 bottom-0 ${isRtl ? 'left-0' : 'right-0'} w-1 ${(stat.color || '').replace('text', 'bg')}`} />
            </div>
          ));
        })()}
      </div>

      <div className="mb-10">
        <ProgressRoadmap 
          lang={lang} 
          currentLevel={currentStudent.level || 'A1'} 
          studentName={currentStudent.displayName}
        />
      </div>

      <div className="mb-10">
        <ParentAIInsights 
          lang={lang} 
          studentName={currentStudent.displayName} 
          studentLevel={currentStudent.level || 'A1'} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className={`flex justify-between items-center mb-10 ${lang === 'ar' ? 'flex-row-reverse' : ''} font-sans`}>
            <h3 className={`text-xl font-bold text-[#002147] flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              <BarChart3 className="text-blue-600 shrink-0" />
              <span className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'تحليل التطور الشهري' : 'Monthly Progress Analysis'}</span>
            </h3>
            <span className="text-[10px] font-bold text-blue-600 px-3 py-1 bg-blue-50 rounded-full tracking-widest uppercase">Performance Index</span>
          </div>
          <div className={`h-64 flex items-end gap-5 px-4 overflow-hidden ${lang === 'ar' ? 'flex-row-reverse' : ''}`} dir="ltr">
            {(() => {
              // Calculate real monthly progress from currentPlanResults
              const months = [5, 4, 3, 2, 1, 0]; // Last 6 months
              const monthlyStats = months.map(m => {
                const targetDate = new Date();
                targetDate.setMonth(targetDate.getMonth() - m);
                const monthName = targetDate.toLocaleString('en-US', { month: 'short' });
                const monthAr = targetDate.toLocaleString('ar-EG', { month: 'short' });
                
                const resultsInMonth = currentPlanResults.filter(r => {
                  if (!r.timestamp) return false;
                  const d = r.timestamp.toDate ? r.timestamp.toDate() : new Date(r.timestamp);
                  return d.getMonth() === targetDate.getMonth() && d.getFullYear() === targetDate.getFullYear();
                });
                
                const totalInMonth = resultsInMonth.reduce((acc, r) => acc + (r.score || 0), 0);
                const possibleInMonth = resultsInMonth.reduce((acc, r) => acc + (r.total || 0), 0);
                const avg = possibleInMonth > 0 ? Math.round((totalInMonth / possibleInMonth) * 100) : 0;
                
                return { name: lang === 'ar' ? monthAr : monthName, value: avg };
              });

              return monthlyStats.map((stat, i) => (
                <div key={`progress-bar-${i}`} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                  <div className="w-full bg-slate-50 rounded-t-xl relative group h-full flex items-end">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(5, stat.value)}%` }}
                      className={`w-full ${stat.value > 0 ? 'bg-[#002147]' : 'bg-slate-200'} rounded-t-xl group-hover:bg-[#C49E3A] transition-all relative`}
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/30 rounded-full" />
                    </motion.div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#002147] text-white text-[10px] py-1.5 px-3 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-all shadow-lg whitespace-nowrap">
                      {stat.value > 0 ? `%${stat.value} ${isRtl ? 'نجاح' : 'Success'}` : (isRtl ? 'لا بيانات' : 'No Data')}
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">{stat.name}</span>
                </div>
              ));
            })()}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col">
          <h3 className={`text-xl font-bold text-[#002147] mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'} flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
             <LayoutDashboard className="text-[#C49E3A]" />
             <span className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? `نشاط ${currentStudent.displayName} الأخير` : `Recent activity of ${currentStudent.displayName}`}</span>
          </h3>
          <div className={`space-y-8 ${lang === 'ar' ? 'text-right' : 'text-left'} flex-1`}>
            {currentPlanResults.length > 0 ? (
              currentPlanResults.slice(0, 5).map((activity) => {
                const activityDate = activity.timestamp?.toDate ? activity.timestamp.toDate() : new Date(activity.timestamp);
                const timeStr = activityDate.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' });
                
                return (
                  <div key={activity.id} className={`flex gap-5 ${lang === 'ar' ? 'flex-row-reverse' : ''} group`}>
                    <div className="mt-1 text-emerald-500 shrink-0 p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={22} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-[#002147] font-bold leading-relaxed">
                        {isRtl 
                          ? `أتم درس "${activity.lessonTitle}" بنتيجة ${activity.score}/${activity.total}` 
                          : `Completed "${activity.lessonTitle}" - Score ${activity.score}/${activity.total}`}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{timeStr}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-slate-400 italic text-sm">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                  <LayoutDashboard size={40} className="opacity-20" />
                </div>
                {isRtl ? 'لا يوجد نشاط مسجل مؤخراً' : 'No recent activity recorded'}
              </div>
            )}
          </div>
          <button 
            className="w-full mt-10 p-4 border border-dashed border-slate-200 rounded-xl text-[10px] font-mono text-slate-400 break-all select-all text-center"
            title="Student Code"
          >
            {currentStudent.uid}
          </button>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div className="lg:col-span-1">
          <WhatsAppNotifications 
            lang={lang}
            studentId={currentStudent.uid}
            studentName={currentStudent.displayName}
            parentPhone={currentStudent.phoneNumber}
            studentPhone={currentStudent.studentPhoneNumber}
            onUpdatePhone={handleUpdatePhone}
          />
        </div>
        <div className="lg:col-span-1">
          <ScheduleManager studentId={currentStudent.uid} studentName={currentStudent.displayName || ''} lang={lang} canEdit={true} />
        </div>
      </div>
      
      <div className="mb-10">
        <AIParentNotes profile={profile} studentId={currentStudent.uid} lang={lang} />
      </div>

      <div style={{ position: 'fixed', left: '-2000px', top: 0 }}>
        {smartReport && (
          <ShareableNotification
            id="report-share-card"
            lang={lang}
            studentName={currentStudent.displayName}
            type="report"
            reportMarkdown={smartReport}
          />
        )}
      </div>

      <AnimatePresence>
        {smartReport && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSmartReport(null)}
              className="absolute inset-0 bg-[#002147]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-3xl max-h-[85vh] rounded-[2.5rem] shadow-2xl relative z-10 flex flex-col overflow-hidden"
            >
              <header className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg md:text-xl text-[#002147]">
                      {isRtl ? 'التقرير الذكي للأداء' : 'AI Performance Report'}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {isRtl ? 'توليد بواسطة الذكاء الاصطناعي' : 'Generated by AI'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSmartReport(null)}
                  className="w-10 h-10 rounded-xl hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-6 md:p-12 prose prose-slate max-w-none custom-markdown-content font-arabic leading-relaxed prose-headings:text-[#002147] prose-headings:font-black prose-p:text-slate-600 prose-strong:text-[#C49E3A]">
                <ReactMarkdown>{smartReport}</ReactMarkdown>
              </div>

              <footer className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <button
                  onClick={handleExportReportImage}
                  disabled={exportingReport}
                  className="bg-[#002147] text-white px-6 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-[#003366] transition-all disabled:opacity-50"
                >
                  {exportingReport ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Download size={14} />}
                  {isRtl ? 'تحميل كصورة' : 'Download as Image'}
                </button>
                <p className="text-[10px] md:text-xs text-slate-400 font-medium max-w-sm">
                  {isRtl 
                    ? 'هذا التقرير تم إنشاؤه بناءً على البيانات المتوفرة حالياً، يرجى استخدامه كأداة استرشادية لتعزيز تجربة الطالب.' 
                    : 'This report is generated based on current data, please use it as a guidance tool to enhance student experience.'}
                </p>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CurriculumBrowser = ({ lang, onSelectLesson, onBack, studentId, profile, seedCurriculum, onNavigate }: { lang: Language, onSelectLesson: (lesson: Lesson, category: CurriculumCategory, level: proficiencyLevel) => void, onBack: () => void, studentId: string, profile: UserProfile, seedCurriculum: () => void, onNavigate?: (view: AppView) => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<CurriculumCategory | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<proficiencyLevel | null>(null);
  const [units, setUnits] = useState<{ id: string, title: string, titleAr: string, description: string, descriptionAr: string }[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [generatingLesson, setGeneratingLesson] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);

  const categories = [
    { id: CurriculumCategory.READING, label: t.curr_reading, icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
    { id: CurriculumCategory.GRAMMAR, label: t.curr_grammar, icon: Hash, color: 'bg-emerald-50 text-emerald-600' },
    { id: CurriculumCategory.CONVERSATION, label: t.curr_conversation, icon: MessageSquare, color: 'bg-purple-50 text-purple-600' },
    { id: CurriculumCategory.WRITING, label: t.curr_writing, icon: PenTool, color: 'bg-orange-50 text-orange-600' },
    { id: CurriculumCategory.EXPRESSION, label: t.curr_expression, icon: Sparkles, color: 'bg-pink-50 text-pink-600' },
    { id: CurriculumCategory.EARLY_CHILDHOOD, label: t.earlyChildhood, icon: Baby, color: 'bg-yellow-50 text-yellow-600' },
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
    try {
      const data = await generateCurriculumUnits(selectedCategory, selectedLevel);
      setUnits(data);
    } catch (err) {
      console.error(err);
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
        throw new Error("Invalid lesson data received from AI");
      }
      
      const fullLesson: Lesson = {
        id: `gen_${Date.now()}`,
        order: 1,
        ...lessonData
      } as Lesson;
      onSelectLesson(fullLesson, selectedCategory, selectedLevel);
    } catch (err) {
      console.error("Lesson generation failed:", err);
      setError(
        <div className="flex flex-col items-center gap-4">
          <p>{isRtl ? 'حدث خطأ أثناء تصميم الدرس. يرجى المحاولة مرة أخرى.' : 'Error generating lesson. Please try again.'}</p>
          <button 
            onClick={() => handleStartLesson(topic)}
            className="px-6 py-2 bg-amber-accent text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            {isRtl ? 'إعادة المحاولة' : 'Retry Now'}
          </button>
        </div>
      );
    } finally {
      setGeneratingLesson(false);
    }
  };

  const [bookingStatus, setBookingStatus] = useState<Record<string, 'idle' | 'booking' | 'success'>>({});
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingContext, setBookingContext] = useState<{ id: string, title: string } | null>(null);

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

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
        unitTitle: unitTitle,
        createdAt: serverTimestamp()
      });
      
      setBookingStatus(prev => ({ ...prev, [unitId]: 'success' }));
      setShowBookingDialog(false);
      alert(isRtl ? 'تمت إضافة الدرس إلى جدولك بنجاح!' : 'Lesson added to your schedule successfully!');
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, [unitId]: 'idle' }));
      }, 3000);
    } catch (err) {
      console.error("Booking error:", err);
      setBookingStatus(prev => ({ ...prev, [unitId]: 'idle' }));
      alert(isRtl ? 'حدث خطأ أثناء الحجز. يرجى المحاولة مرة أخرى.' : 'Error booking lesson. Please try again.');
      handleFirestoreError(err, OperationType.WRITE, 'schedules');
    }
  };

  if (generatingLesson) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-[#f8fafc]">
        <div className="relative mb-12">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-32 h-32 border-4 border-[#002147]/10 border-t-[#C49E3A] rounded-full"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sparkles className="text-[#C49E3A]" size={40} />
          </motion.div>
        </div>
        <h2 className="text-3xl font-black text-[#002147] mb-6 tracking-tight">{t.loadingText}</h2>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
            {isRtl 
              ? 'يقوم المعلم الذكي الآن بتصميم محتوى تعليمي حصري لك بناءً على المعايير العالمية.'
              : 'Our AI Teacher is now designing an exclusive educational content for you based on the latest academic standards.'}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-12 overflow-y-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between mb-8 md:mb-12 gap-6">
          <button 
            onClick={selectedLevel ? () => setSelectedLevel(null) : (selectedCategory ? () => setSelectedCategory(null) : onBack)} 
            className="w-full sm:w-auto p-4 md:p-3 bg-white rounded-2xl border border-slate-200 text-slate-400 hover:text-[#002147] transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95"
          >
            <ChevronRight className={isRtl ? '' : 'rotate-180'} size={20} />
            <span className="font-black text-[10px] md:text-xs uppercase tracking-widest">{selectedCategory ? t.backToCurriculum : t.goToDashboard}</span>
          </button>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
            {profile.role === UserRole.ADMIN && (
               <button 
                onClick={seedCurriculum}
                className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black text-xs hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                <Sparkles size={16} />
                {lang === 'ar' ? 'مزامنة المنهج' : 'Sync Curriculum'}
              </button>
            )}
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-[#002147] mb-1 md:mb-2">{t.curriculum}</h1>
              <p className="text-slate-400 font-medium text-xs md:text-sm">{t.learningProgress}</p>
            </div>
          </div>
        </div>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={`cat-card-${cat.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  if (cat.id === CurriculumCategory.EARLY_CHILDHOOD && onNavigate) {
                    onNavigate('early-childhood');
                  } else {
                    setSelectedCategory(cat.id);
                  }
                }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col items-center text-center active:bg-blue-50 active:scale-95 touch-manipulation"
              >
                <div className={`w-20 h-20 md:w-24 md:h-24 ${cat.color} rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                  <cat.icon size={innerWidth < 768 ? 32 : 48} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#002147] mb-2">{cat.label}</h3>
                <p className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">{lang === 'ar' ? 'استعرض المستويات' : 'EXPLORE LEVELS'}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            <section>
              <h2 className="text-xl md:text-2xl font-black text-[#002147] mb-6 md:mb-8 flex items-center gap-4">
                <span className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-xl md:rounded-2xl flex items-center justify-center text-xs md:text-sm">1</span>
                {t.chooseLevel}
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4">
                {levels.map((lvl, lIdx) => (
                  <button
                    key={`level-tab-${lvl}-${lIdx}`}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`py-4 md:py-6 rounded-2xl md:rounded-3xl border-2 font-black text-lg md:text-xl transition-all ${
                      selectedLevel === lvl 
                        ? 'bg-[#002147] border-[#002147] text-white shadow-xl scale-105' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </section>

            {selectedLevel && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl md:text-2xl font-black text-[#002147] mb-6 md:mb-8 flex items-center gap-4">
                  <span className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-xl md:rounded-2xl flex items-center justify-center text-xs md:text-sm">2</span>
                  {t.units}
                  {loadingUnits && <span className="text-xs md:text-sm font-medium text-slate-400 animate-pulse">({t.loadingText})</span>}
                </h2>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs md:text-sm font-bold border border-red-100 flex items-center gap-3">
                    <AlertCircle size={20} />
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {units.map((unit, i) => (
                    <div
                      key={unit.id || `unit-${i}`}
                      className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start sm:items-center justify-between mb-4 md:mb-6">
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center text-[#002147] font-black text-lg md:text-xl">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-black text-lg md:text-xl text-[#002147] mb-0.5 md:mb-1">{isRtl ? unit.titleAr : unit.title}</h4>
                            <p className="text-slate-400 text-[9px] md:text-xs font-bold uppercase tracking-widest">{isRtl ? unit.descriptionAr : unit.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <button
                          onClick={() => handleStartLesson(isRtl ? unit.titleAr : unit.title)}
                          className="flex-1 bg-emerald-50 text-emerald-600 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-3 hover:bg-emerald-600 hover:text-white transition-all group"
                        >
                          <Play size={18} fill="currentColor" />
                          {isRtl ? 'بدء الدرس' : 'Start Lesson'}
                        </button>

                        <button
                          onClick={() => {
                            setBookingContext({ id: unit.id, title: isRtl ? unit.titleAr : unit.title });
                            setShowBookingDialog(true);
                          }}
                          disabled={bookingStatus[unit.id] === 'booking' || bookingStatus[unit.id] === 'success'}
                          className={`w-full sm:w-auto px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
                            bookingStatus[unit.id] === 'success' 
                              ? 'bg-emerald-500 text-white' 
                              : bookingStatus[unit.id] === 'booking'
                              ? 'bg-slate-100 text-slate-300 animate-pulse'
                              : 'bg-slate-50 text-slate-400 hover:bg-[#002147] hover:text-white'
                          }`}
                          title={isRtl ? 'إضافة للجدول' : 'Add to Schedule'}
                        >
                          {bookingStatus[unit.id] === 'success' ? (
                            <>
                              <CheckCircle size={18} />
                              <span className="text-[10px] md:text-xs">{isRtl ? 'تم الحجز' : 'Booked'}</span>
                            </>
                          ) : (
                            <>
                              <Calendar size={18} />
                              <span className="sm:hidden">{isRtl ? 'إضافة للجدول' : 'Add to Schedule'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        )}
      </div>
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
    </div>
  );
};


const LessonPlayer = ({ lang, lesson, onBack, onComplete, category, level }: { lang: Language, lesson: Lesson, onBack: () => void, onComplete: (score?: number) => void, category?: CurriculumCategory, level?: proficiencyLevel }) => {
  const isRtl = lang === 'ar';
  const [fullLesson, setFullLesson] = useState<Lesson | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const loadOrGenerate = async () => {
      // 1. Check if it's a hardcoded/certified lesson
      const hardcodedLessons: Record<string, any> = {
        'r_a1_1': phonemicA1,
        'r_a1_2': sightWordsA1,
        'r_a1_3': environmentalPrintA1,
        'r_a1_4': familyConstellationsLesson,
        'r_a1_5': everydayInteractionLesson,
        'r_a2_1': basicSentenceStructureA2,
        'r_a2_2': workplaceCultureA2,
        'r_a2_3': interrogativePatternsA2,
        'r_a2_4': tradeTransactionsA2,
        'r_a2_5': narrativeSequencesA2,
        'r_b1_1': subtextualInferenceB1,
        'r_b1_2': factVsOpinionB1,
        'r_b1_3': authorialIntentB1,
        'r_b1_4': culturalHeritageB1,
        'r_b1_5': mediaJournalismB1,
        'r_b2_1': rhetoricalStructuresB2,
        'r_b2_2': reportAuditsB2,
        'r_b2_3': criticalPerspectiveB2,
        'r_b2_4': environmentalDiscourseB2,
        'r_b2_5': persuasionTechniquesB2,
        'r_c1_1': academicAbstractsC1,
        'r_c1_2': legalContractualC1,
        'r_c1_3': philosophyReadingC1,
        'r_c1_4': socioPoliticalCritiqueC1,
        'r_c1_5': technicalInnovationC1,
        'r_c2_1': etymologicalExcavationC2,
        'r_c2_2': linguisticNuanceC2,
        'r_c2_3': crossDisciplinaryC2,
        'r_c2_4': strategicDiscursiveC2,
        'r_c2_5': archaicClassicalC2,
        'g_a1_1': partsOfSpeechA1,
        'g_a1_2': presentSimpleA1,
        'g_a1_3': singularPluralA1,
        'g_a1_4': articlesA1,
        'g_a1_5': wordOrderA1,
        'g_a2_1': pastSimpleA2,
        'g_a2_2': futureSimpleA2,
        'g_a2_3': comparisonA2,
        'g_a2_4': presentContinuousA2,
        'g_a2_5': modalsA2,
        'g_b1_1': presentPerfectB1,
        'g_b1_2': relativeClausesB1,
        'g_b1_3': passiveVoiceB1,
        'g_b1_4': conditionalsB1,
        'g_b1_5': modalsObligationB1,
        'g_b2_1': narrativeTensesB2,
        'g_b2_2': conditionalsB2,
        'g_b2_3': reportedSpeechB2,
        'g_b2_4': advancedPassiveB2,
        'g_b2_5': futureAdvancedB2,
        'g_c1_1': inversionC1,
        'g_c1_2': cleftSentencesC1,
        'g_c1_3': advancedGerundsC1,
        'g_c1_4': participleClausesC1,
        'g_c1_5': subjunctiveC1,
        'g_c2_1': stylisticInversionC2,
        'g_c2_2': complexConditionalsC2,
        'g_c2_3': perfectModalsC2,
        'g_c2_4': nominalizationC2,
        'g_c2_5': registerShiftC2,
        'c_a1_1': greetingsA1,
        'c_a1_2': familyHomeA1,
        'c_a1_3': orderingFoodA1,
        'c_a1_4': shoppingA1,
        'c_a1_5': routinesA1,
        'c_a2_1': makingPlansA2,
        'c_a2_2': describingPeopleA2,
        'c_a2_3': travelA2,
        'c_a2_4': healthFitnessA2,
        'c_a2_5': hobbiesA2,
        'c_b1_1': givingAdviceB1,
        'c_b1_2': expressingOpinionsB1,
        'c_b1_3': jobInterviewsB1,
        'c_b1_4': travelingExperiencesB1,
        'c_b1_5': dreamsAmbitionsB1,
        'c_b2_1': debatingTopicsB2,
        'c_b2_2': dealingProblemsB2,
        'c_b2_3': businessMeetingsB2,
        'c_b2_4': mediaNewsB2,
        'c_b2_5': culturalDifferencesB2,
        'c_c1_1': nuancedDiscussionsC1,
        'c_c1_2': persuasiveSpeakingC1,
        'c_c1_3': professionalPresentationsC1,
        'c_c1_4': problemSolvingC1,
        'c_c1_5': abstractConceptsC1,
        'c_c2_1': idiomaticPrecisionC2,
        'c_c2_2': ironyHumourC2,
        'c_c2_3': negotiationsC2,
        'c_c2_4': philosophicalInquiryC2,
        'c_c2_5': linguisticFlexibilityC2,
        'w_a1_1': alphabetA1,
        'w_a1_2': sentencesA1,
        'w_a1_3': punctuationA1,
        'w_a1_4': personalInfoA1,
        'w_a1_5': listsNotesA1,
        'w_a2_1': connectivesA2,
        'w_a2_2': describingDayA2,
        'w_a2_3': socialMediaA2,
        'w_a2_4': shortEmailsA2,
        'w_a2_5': describingPlacesA2,
        'w_b1_1': paragraphStructureB1,
        'w_b1_2': storytellingB1,
        'w_b1_3': persuasiveB1,
        'w_b1_4': formalEmailsB1,
        'w_b1_5': comparativeWritingB1,
        'w_b2_1': essayFoundationsB2,
        'w_b2_2': summaryWritingB2,
        'w_b2_3': transitionsB2,
        'w_b2_4': creativeNarrativeB2,
        'w_b2_5': reviewWritingB2,
        'w_c1_1': thesisDesignC1,
        'w_c1_2': nuanceStyleC1,
        'w_c1_3': professionalProposalsC1,
        'w_c1_4': criticalAnalysisC1,
        'w_c1_5': abstractConceptsWritingC1,
        'w_c2_1': stylisticMasteryC2,
        'w_c2_2': researchLogicC2,
        'w_c2_3': playfulnessC2,
        'w_c2_4': philosophicalDiscourseC2,
        'w_c2_5': syntacticPrecisionC2,
        'e_a1_1': emotionsE1,
        'e_a1_2': familyFriendsE1,
        'e_a1_3': colorsArtE1,
        'e_a1_4': routineE1,
        'e_a1_5': likesDislikesE1,
        'e_a2_1': hobbiesE2,
        'e_a2_2': storytellingE2,
        'e_a2_3': directionsE2,
        'e_a2_4': describingPeopleE2,
        'e_a2_5': futureIntentionsE2,
        'e_b1_1': culturalExperiencesE1,
        'e_b1_2': opinionsE1,
        'e_b1_3': ambitionsE1,
        'e_b1_4': adviceE1,
        'e_b1_5': logicE1,
        'e_b2_1': abstractDebateE1,
        'e_b2_2': hypotheticalsE1,
        'e_b2_3': socialIssuesE1,
        'e_b2_4': mediaE1,
        'e_b2_5': environmentE1,
        'e_c1_1': ethicsE1,
        'e_c1_2': aestheticsE1,
        'e_c1_3': diplomacyE1,
        'e_c1_4': strategicThinkingE1,
        'e_c1_5': advocacyE1,
        'e_c2_1': strategicSovereigntyE1,
        'e_c2_2': macroeconomicAuditsE1,
        'e_c2_3': existentialInquiryE1,
        'e_c2_4': linguisticFluidityE1,
        'e_c2_5': aestheticSynthesisE1,
      };

      if (hardcodedLessons[lesson.id]) {
        setFullLesson({ ...lesson, ...hardcodedLessons[lesson.id] } as Lesson);
        return;
      }

      // 2. If lesson already has content, use it
      if (lesson.content && lesson.quiz && lesson.quiz.length > 0) {
        setFullLesson(lesson);
        return;
      }

      // Determine properties from lesson or fallback
      const getCategoryFromId = (id?: string) => {
        if (!id) return CurriculumCategory.READING;
        if (id.startsWith('r_')) return CurriculumCategory.READING;
        if (id.startsWith('g_')) return CurriculumCategory.GRAMMAR;
        if (id.startsWith('c_')) return CurriculumCategory.CONVERSATION;
        if (id.startsWith('w_')) return CurriculumCategory.WRITING;
        if (id.startsWith('e_')) return CurriculumCategory.EXPRESSION;
        return CurriculumCategory.READING;
      };

      const effectiveCategory = category || getCategoryFromId(lesson.id);
      const effectiveLevel = level || lesson.proficiencyLevel || proficiencyLevel.A1;

      // Otherwise generate
      setGenerating(true);
      try {
        const generated = await generateLessonContent(
          effectiveCategory,
          effectiveLevel,
          lesson.title,
          lang
        );
        setFullLesson({ ...lesson, ...generated } as Lesson);
      } catch (err) {
        console.error("Failed to generate lesson:", err);
      } finally {
        setGenerating(false);
      }
    };
    loadOrGenerate();
  }, [lesson]);

  if (generating) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 border-4 border-amber-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-2">
             <h2 className="text-2xl font-serif font-black text-ink">{isRtl ? 'جاري تحضير المحتوى العلمي...' : 'Synthesizing Academic Content...'}</h2>
             <p className="text-ink/40 font-bold uppercase tracking-widest text-[10px]">{isRtl ? 'بواسطة أكاديمية باسم الخليل الرقمية' : 'By Basim Alkhalil Digital Academy'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!fullLesson) return null;

  if (fullLesson.moduleId?.startsWith('mod_r') || fullLesson.id?.startsWith('r_') || fullLesson.id?.startsWith('e_')) {
    return (
      <ReadingLesson 
        lesson={fullLesson} 
        isRtl={isRtl} 
        category={fullLesson.id?.startsWith('e_') ? 'expression' : 'reading'}
        onFinish={(score) => onComplete(score)} 
        onBack={onBack}
      />
    );
  }

  return (
    <InteractiveLesson 
      lesson={fullLesson} 
      isRtl={isRtl} 
      onFinish={(score) => onComplete(score)} 
      onBack={onBack}
    />
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [view, setView] = useState<AppView>('dashboard');
  const [selectedReadingLevel, setSelectedReadingLevel] = useState<ReadingLevel>('A1');
  const [selectedGrammarLevel, setSelectedGrammarLevel] = useState<GrammarLevel>('A1');
  const [selectedConversationLevel, setSelectedConversationLevel] = useState<ConversationLevel>('A1');
  const [selectedWritingLevel, setSelectedWritingLevel] = useState<WritingLevel>('A1');
  const [selectedExpressionLevel, setSelectedExpressionLevel] = useState<ExpressionLevel>('A1');
  const [selectedTestLevel, setSelectedTestLevel] = useState<string>('A1');
  const [selectedTestUnitId, setSelectedTestUnitId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('ar');
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loadingCurriculum, setLoadingCurriculum] = useState(false);
  const [activeNotification, setActiveNotification] = useState<any>(null);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const [autoStartUnitId, setAutoStartUnitId] = useState<string | null>(null);

  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [videoLessonsEnabled, setVideoLessonsEnabled] = useState(true);
  const [globalPlan, setGlobalPlan] = useState<any>(null);

  const isAdmin = MASTER_ADMINS.includes((userProfile?.email || currentUser?.email || '').toLowerCase());

  useEffect(() => {
    if (!currentUser || !userProfile) return;

    const fetchPlan = async () => {
      try {
        let q;
        if (isAdmin) {
          q = query(collection(db, 'studyPlans'), orderBy('createdAt', 'desc'), limit(1));
        } else {
          q = query(
            collection(db, 'studyPlans'),
            where('userId', '==', currentUser.uid),
            orderBy('createdAt', 'desc'),
            limit(1)
          );
        }
        const snap = await getDocs(q);
        if (!snap.empty) {
          const docPlan = snap.docs[0];
          const data = docPlan.data() as Record<string, any>;
          setGlobalPlan({ id: docPlan.id, ...data });
        }
      } catch (e) {
        console.error("Error fetching global plan:", e);
      }
    };
    fetchPlan();
  }, [currentUser, userProfile?.uid, isAdmin]);

  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (reason?.message?.includes('unavailable') || reason?.code === 'unavailable' || reason?.message?.includes('Cloud Firestore backend')) {
        setRenderError(lang === 'ar' ? 
          'عذراً، يوجد خلل في الاتصال بقاعدة البيانات حالياً. جرب تحديث الصفحة أو تأكد من جودة الاتصال بالإنترنت.' : 
          'Database connection error. This could be due to a poor internet connection or a temporary server issue. Please refresh or check your signal.'
        );
      }
    };
    window.addEventListener('unhandledrejection', handleRejection);
    return () => window.removeEventListener('unhandledrejection', handleRejection);
  }, [lang]);

  useEffect(() => {
    // Global Settings Listener
    const settingsUnsubscribe = onSnapshot(doc(db, 'settings', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        setVideoLessonsEnabled(snapshot.data().videoLessonsEnabled !== false);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/global');
    });
    return () => settingsUnsubscribe();
  }, []);

  useEffect(() => {
    if (userProfile?.role === UserRole.STUDENT && !userProfile.studentCode && currentUser) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setDoc(doc(db, 'users', currentUser.uid), { studentCode: code }, { merge: true });
      setUserProfile({ ...userProfile, studentCode: code });
    }
  }, [userProfile, currentUser]);

  useEffect(() => {
    if (currentUser) {
      const updateLastSeen = async () => {
        try {
          await updateDoc(doc(db, 'users', currentUser.uid), {
            lastSeen: Date.now()
          });
        } catch (err) {
          console.error("Error updating lastSeen:", err);
        }
      };

      updateLastSeen();
      const interval = setInterval(updateLastSeen, 2 * 60 * 1000); // Every 2 mins
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  // Global Notifications Listener for Students
  useEffect(() => {
    if (userProfile?.role === UserRole.STUDENT) {
      const q = query(
        collection(db, 'notifications'), 
        orderBy('createdAt', 'desc'), 
        limit(1)
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const latest = snapshot.docs[0].data();
          // Only show if it's new (created in the last 30 seconds)
          const createdAt = latest.createdAt?.toMillis() || 0;
          if (Date.now() - createdAt < 30000) {
             setActiveNotification({ id: snapshot.docs[0].id, ...latest });
             // Auto hide after 10 seconds
             setTimeout(() => setActiveNotification(null), 10000);
          }
        }
      });
      return () => unsubscribe();
    }
  }, [userProfile]);

  useEffect(() => {
    testConnection();
    if (view === 'curriculum') {
      fetchCurriculum();
    }
  }, [view]);

  const fetchCurriculum = async (retries = 3) => {
    setLoadingCurriculum(true);
    try {
      const q = query(collection(db, 'modules'), orderBy('order'));
      const snapshot = await getDocs(q);
      const mods = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as LearningModule));
      setModules(mods);

      // If empty and admin, seed
      if (mods.length === 0 && userProfile?.role === UserRole.ADMIN) {
        await seedCurriculum();
      }
    } catch (err) {
      console.error("Error fetching curriculum:", err);
      if (retries > 0) {
        console.log(`Retrying fetchCurriculum... (${retries} retries left)`);
        setTimeout(() => fetchCurriculum(retries - 1), 2000);
      }
    }
    setLoadingCurriculum(false);
  };

  const seedCurriculum = async () => {
    const initialMods: LearningModule[] = [
      { 
        id: 'mod_r_a1', 
        category: CurriculumCategory.READING,
        title: 'Foundations of Reading', 
        titleAr: 'أسس القراءة', 
        description: 'Phonemic awareness and basic decoding skills.',
        descriptionAr: 'الوعي الصوتي ومهارات فك الرموز الأساسية.',
        level: proficiencyLevel.A1,
        order: 0
      },
      { 
        id: 'mod_1', 
        category: CurriculumCategory.CONVERSATION,
        title: 'Foundations of Modern Communication', 
        titleAr: 'أسس التواصل الحديث', 
        description: 'Master the basics of interaction in professional and social settings.',
        descriptionAr: 'اتقان أساسيات التفاعل في المنظومات المهنية والاجتماعية.',
        level: proficiencyLevel.A1,
        order: 1
      },
      { 
        id: 'mod_2', 
        category: CurriculumCategory.EXPRESSION,
        title: 'The Digital Narrative', 
        titleAr: 'السرد الرقمي', 
        description: 'Expressing complex ideas through structured storytelling.',
        descriptionAr: 'التعبير عن أفكار معقدة من خلال تقنيات السرد المنظم.',
        level: proficiencyLevel.B1,
        order: 2
      }
    ];

    for (const m of initialMods) {
      await setDoc(doc(db, 'modules', m.id), m);
    }
    
    // Import the reading lessons we defined
    // Since we are in App.tsx, we can't easily import them all if they are many
    // But we can define them here or use a helper
    const initialLessons: Lesson[] = [
      phonemicA1 as Lesson,
      sightWordsA1 as Lesson,
      environmentalPrintA1 as Lesson,
      familyConstellationsLesson as Lesson,
      everydayInteractionLesson as Lesson,
      {
        id: 'les_1',
        moduleId: 'mod_1',
        title: 'The Art of Greeting',
        titleAr: 'فن التحية والترحيب',
        order: 1,
        content: 'Greetings are the gateway to any relationship...',
        contentAr: 'التحيات هي بوابة أي علاقة...',
        quiz: [
          {
            question: "What is the gateway?",
            questionAr: "ما هي البوابة؟",
            options: ["Formal contracts", "Greetings"],
            optionsAr: ["العقود", "التحيات"],
            correctIndex: 1,
            explanation: "Greetings are the first bridge.",
            explanationAr: "التحيات هي الجسر الأول."
          }
        ]
      }
    ];

    for (const l of initialLessons) {
      if (l.id) {
        await setDoc(doc(db, 'lessons', l.id), l);
      }
    }
    fetchCurriculum();
    alert('Curriculum seeded successfully!');
  };

  const startLesson = async (lessonId: string | null) => {
    if (!lessonId) return;
    const lDoc = await getDoc(doc(db, 'lessons', lessonId));
    if (lDoc.exists()) {
      setActiveLesson({ id: lDoc.id, ...lDoc.data() } as Lesson);
      setView('lesson');
    }
  };

  const fetchLessons = async (moduleId: string) => {
    try {
      const q = query(collection(db, 'lessons'), where('moduleId', '==', moduleId), orderBy('order'));
      const snapshot = await getDocs(q);
      const fetchedLessons = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Lesson));
      setLessons(fetchedLessons);
      // Auto-start first lesson for demo
      if (fetchedLessons.length > 0) {
        startLesson(fetchedLessons[0].id);
      }
    } catch (err) {
      console.error("Error fetching lessons:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setActiveStudentId(user.uid); // Default to own UID
        try {
          // Special case for the master admin: ensure they have admin profile even if fetch fails
          const userEmail = (user.email || '').toLowerCase();
          
          if (MASTER_ADMINS.includes(userEmail)) {
            const adminProfile: UserProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || 'Master Admin',
              role: UserRole.ADMIN,
              avatarUrl: user.photoURL || undefined,
              createdAt: serverTimestamp(),
            };
            
            // Try to fetch existing profile to keep it updated, but don't let error block entry
            try {
              const userDoc = await getDoc(doc(db, 'users', user.uid));
              if (userDoc.exists()) {
                const profile = userDoc.data() as UserProfile;
                if (profile.role !== UserRole.ADMIN) {
                  await setDoc(doc(db, 'users', user.uid), { role: UserRole.ADMIN }, { merge: true });
                  setUserProfile({ ...profile, role: UserRole.ADMIN });
                } else {
                  setUserProfile(profile);
                }
              } else {
                await setDoc(doc(db, 'users', user.uid), adminProfile, { merge: true });
                setUserProfile(adminProfile);
              }
            } catch (e) {
              console.warn("Permission issue fetching admin profile, using local fallback", e);
              setUserProfile(adminProfile);
            }
          } else {
            // Normal user flow
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const profileData = userDoc.data() as UserProfile;
              // Automatically demote if they were admins but are no longer in MASTER_ADMINS
              if (profileData.role === UserRole.ADMIN) {
                await updateDoc(doc(db, 'users', user.uid), { role: UserRole.STUDENT });
                const demotedProfile = { ...profileData, role: UserRole.STUDENT };
                setUserProfile(demotedProfile);
                setActiveStudentId(demotedProfile.uid);
              } else {
                setUserProfile(profileData);
                if (profileData.role === UserRole.STUDENT) {
                  setActiveStudentId(profileData.uid);
                }
              }
            } else {
              // RoleSelector will handle new non-admin users
            }
          }
        } catch (error) {
          console.error("Auth profile fetch error:", error);
          // Only show fatal error if not the master admin (who has fallback)
          const userEmail = (user.email || '').toLowerCase();
          
          if (!MASTER_ADMINS.includes(userEmail)) {
            handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setUserProfile(null);
        setView('dashboard');
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRoleSelect = async (role: UserRole) => {
    if (!currentUser) return;
    const profile: UserProfile = {
      uid: currentUser.uid,
      email: currentUser.email || '',
      displayName: currentUser.displayName || 'User',
      role,
      avatarUrl: currentUser.photoURL || undefined,
      createdAt: serverTimestamp(),
    };

    if (role === UserRole.STUDENT) {
      // Generate a unique 6-digit student code
      profile.studentCode = Math.floor(100000 + Math.random() * 900000).toString();
    }

    try {
      await setDoc(doc(db, 'users', currentUser.uid), profile, { merge: true });
      setUserProfile(profile);
      if (role === UserRole.STUDENT) {
        setActiveStudentId(currentUser.uid);
        // Prepare initial student metadata
        await setDoc(doc(db, 'students', currentUser.uid), {
          level: proficiencyLevel.A1,
          points: 0,
          learningPath: [],
          currentModuleId: 'mod_1'
        }, { merge: true });
        setView('placement-test');
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleStartAiChat = async () => {
    if (!userProfile) return;
    setView('ai-chat');
  };

  if (renderError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center bg-slate-50">
        <div className="max-w-md bg-white p-8 rounded-3xl shadow-xl border border-rose-100">
          <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles size={32} />
          </div>
          <h2 className="text-2xl font-black text-[#002147] mb-4">Something went wrong</h2>
          <p className="text-slate-500 mb-8">{renderError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#002147] text-white px-8 py-4 rounded-2xl font-black"
          >
            Refresh App
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#002147] rounded-3xl animate-pulse mx-auto mb-4" />
          <p className="text-slate-500 font-medium whitespace-nowrap">{t.loadingText}</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return <LoginScreen lang={lang} onToggleLang={() => setLang(lang === 'ar' ? 'en' : 'ar')} />;

  if (!userProfile) return <RoleSelector lang={lang} onSelect={handleRoleSelect} />;

  const handleLessonComplete = async (score?: number) => {
    if (!userProfile || !activeLesson) return;
    
    // Increment XP and points
    const xpToAdd = 50; 
    const updatedPoints = (userProfile as any).points + xpToAdd;
    
    try {
      // Save Lesson Result
      if (score !== undefined) {
        let courseId = 'reading';
        if (activeLesson.id?.startsWith('r_')) courseId = 'reading';
        else if (activeLesson.id?.startsWith('g_')) courseId = 'grammar';
        else if (activeLesson.id?.startsWith('c_')) courseId = 'conversation';
        else if (activeLesson.id?.startsWith('w_')) courseId = 'writing';
        else if (activeLesson.id?.startsWith('e_')) courseId = 'expression';

        let level: string = activeLesson.proficiencyLevel || '';
        if (!level && activeLesson.id) {
          const parts = activeLesson.id.split('_');
          if (parts.length > 1) {
            level = parts[1].toUpperCase();
          }
        }
        if (!level) level = 'A1';

        await addDoc(collection(db, 'lessonResults'), {
          userId: userProfile.uid,
          parentIds: (userProfile as any).linkedParentIds || [],
          lessonId: activeLesson.id,
          courseId: courseId,
          level: level,
          lessonTitle: activeLesson.title || '',
          score: score,
          total: activeLesson.quiz?.length || 0,
          timestamp: serverTimestamp()
        });
      }

      setUserProfile({ ...userProfile, points: updatedPoints } as UserProfile);
      setView('curriculum');
      alert(`${t.xpEarned}: +${xpToAdd}`);
    } catch (err) {
      console.error("Error completing lesson:", err);
    }
  };

  const renderContent = () => {
    try {
      if (view === 'admin' && isAdmin) {
      return <AdminDashboard lang={lang} />;
    }
    if (view === 'video-library') {
      return (
        <VideoLibrary 
          lang={lang} 
          profile={userProfile} 
          onUpdateProfile={(p) => setUserProfile(p as StudentProfile)} 
          onNavigate={setView} 
          onBack={() => setView('dashboard')}
          enabled={videoLessonsEnabled || isAdmin}
        />
      );
    }
    if (view === 'early-childhood') {
      return <EarlyChildhoodHome lang={lang} profile={userProfile as StudentProfile} onBack={() => setView('dashboard')} />;
    }
    if (view === 'academic-planner') {
      return (
        <StudyPlanner 
          lang={lang} 
          userProfile={userProfile}
          onBack={() => setView('dashboard')} 
          onNavigateToResults={() => setView('academic-results')}
          onNavigateToLesson={(courseId, level, unitId) => {
            if (courseId === 'reading') {
              setSelectedReadingLevel(level as ReadingLevel);
              setAutoStartUnitId(unitId);
              setView('reading-curriculum');
            } else if (courseId === 'grammar') {
              setSelectedGrammarLevel(level as GrammarLevel);
              setAutoStartUnitId(unitId);
              setView('grammar-curriculum');
            } else if (courseId === 'writing') {
              setSelectedWritingLevel(level as WritingLevel);
              setAutoStartUnitId(unitId);
              setView('writing-curriculum');
            } else if (courseId === 'oxford') {
              setAutoStartUnitId(unitId);
              setView('oxford-discover');
            } else if (courseId === 'test') {
              setSelectedTestLevel(level);
              setSelectedTestUnitId(unitId);
              setView('bi-weekly-test');
            }
          }}
        />
      );
    }
    if (view === 'academic-results') {
      return (
        <ResultsChart 
          lang={lang} 
          onBack={() => setView('academic-planner')} 
          onNavigateToAnalytics={() => setView('academic-analytics')} 
          planItems={globalPlan?.planItems}
          studentName={globalPlan?.studentName || userProfile?.displayName}
          studentId={userProfile?.uid}
          isAdmin={isAdmin}
        />
      );
    }
    if (view === 'academic-analytics') {
      return (
        <SmartAnalytics 
          lang={lang} 
          onBack={() => setView('academic-results')} 
          planItems={globalPlan?.planItems}
          studentName={globalPlan?.studentName || userProfile?.displayName}
        />
      );
    }
    if (view === 'oxford-discover') {
      return (
        <OxfordDiscoverCompanion 
          lang={lang} 
          userProfile={userProfile}
          onBack={() => {
            setAutoStartUnitId(null);
            setView('dashboard');
          }} 
          initialUnitId={autoStartUnitId ? parseInt(autoStartUnitId) : null}
        />
      );
    }
    if (view === 'professional-development') {
      return (
        <ProfessionalDevelopment 
          lang={lang} 
          userProfile={userProfile}
          onBack={() => setView('dashboard')} 
        />
      );
    }
    if (view === 'adults-daily-dose') {
      return (
        <AdultsDailyDose 
          lang={lang}
          lesson={ADULTS_DAILY_DOSES[0]} 
          onBack={() => setView('dashboard')}
          onComplete={async (score) => {
            if (userProfile && currentUser) {
              const currentPoints = (userProfile as any).points || 0;
              const newPoints = currentPoints + 100;
              try {
                await updateDoc(doc(db, 'users', currentUser.uid), {
                  points: newPoints
                });
                await addDoc(collection(db, 'lessonResults'), {
                  userId: currentUser.uid,
                  parentIds: (userProfile as any).linkedParentIds || [],
                  lessonId: 'adults_daily_001',
                  courseId: 'adults_daily_dose',
                  level: 'A2-B1',
                  lessonTitle: 'I am excited vs I am exciting',
                  score: 10,
                  total: 10,
                  timestamp: serverTimestamp()
                });
                setUserProfile({
                  ...userProfile,
                  points: newPoints
                } as any);
              } catch (e) {
                console.error("Error updating points for Daily Dose:", e);
              }
            }
            setView('dashboard');
            alert(lang === 'ar' ? 'تهانينا الحارة! حصدت +100 من نقاط القوة الأكاديمية بنجاح.' : 'Congratulations! Earned +100 XP standard premium score successfully.');
          }}
        />
      );
    }
    if (view === 'kids-story-player') {
      return (
        <KidsStoryPlayer 
          lang={lang}
          story={KIDS_STORIES[0]}
          onBack={() => setView('dashboard')}
          onComplete={async (xpPoints) => {
            if (userProfile && currentUser) {
              const currentPoints = (userProfile as any).points || 0;
              const newPoints = currentPoints + xpPoints;
              try {
                await updateDoc(doc(db, 'users', currentUser.uid), {
                  points: newPoints
                });
                await addDoc(collection(db, 'lessonResults'), {
                  userId: currentUser.uid,
                  parentIds: (userProfile as any).linkedParentIds || [],
                  lessonId: KIDS_STORIES[0].lesson_id,
                  courseId: KIDS_STORIES[0].category,
                  level: KIDS_STORIES[0].level,
                  lessonTitle: KIDS_STORIES[0].title_en,
                  score: xpPoints,
                  total: xpPoints,
                  timestamp: serverTimestamp()
                });
                setUserProfile({
                  ...userProfile,
                  points: newPoints
                } as any);
              } catch (e) {
                console.error("Error updating points for Kids Story:", e);
              }
            }
            setView('dashboard');
            alert(lang === 'ar' ? 'رائع جداً! لقد نجحت في إكمال القصة التفاعلية وحصدت وسام البطولة ونقاط XP!' : 'Bravissimo! You completed the interactive adventure and obtained the Hero Trophy!');
          }}
        />
      );
    }
    if (view === 'gemini-developer-hub') {
      return (
        <GeminiDeveloperHub 
          lang={lang} 
          userProfile={userProfile}
          onBack={() => setView('dashboard')} 
        />
      );
    }
    if (view === 'modern-curriculum') {
      return (
        <ModernCurriculumHome 
          lang={lang} 
          onBack={() => setView('dashboard')} 
          onNavigate={(targetView, level) => {
            if (targetView === 'reading-curriculum') {
              if (level) setSelectedReadingLevel(level as ReadingLevel);
            } else if (targetView === 'grammar-curriculum') {
              if (level) setSelectedGrammarLevel(level as GrammarLevel);
            } else if (targetView === 'conversation-curriculum') {
              if (level) setSelectedConversationLevel(level as ConversationLevel);
            } else if (targetView === 'writing-curriculum') {
              if (level) setSelectedWritingLevel(level as WritingLevel);
            } else if (targetView === 'expression-curriculum') {
               if (level) setSelectedExpressionLevel(level as ExpressionLevel);
            }
            setView(targetView);
          }} 
        />
      );
    }
    if (view === 'reading-curriculum') {
      const units = ALL_READING_UNITS[selectedReadingLevel];
      return (
        <ReadingCurriculumCompanion 
          lang={lang} 
          level={selectedReadingLevel}
          initialUnitId={autoStartUnitId}
          onBack={() => {
            setAutoStartUnitId(null);
            setView('modern-curriculum');
          }} 
            onStartLesson={(unitId) => {
              setAutoStartUnitId(null);
              const unit = units.find(u => u.id === unitId);
              const lessonObj = {
                id: unitId,
                title: unit?.titleEn || 'New Lesson',
                titleAr: unit?.titleAr || 'درس جديد',
                content: unit?.readingTextEn,
                contentAr: unit?.readingTextAr,
                proficiencyLevel: selectedReadingLevel as any
              } as Lesson;
              setActiveLesson(lessonObj);
              setView('lesson');
            }}
        />
      );
    }
    if (view === 'grammar-curriculum') {
      const units = ALL_GRAMMAR_UNITS[selectedGrammarLevel];
      return (
        <GrammarCurriculumCompanion 
          lang={lang} 
          level={selectedGrammarLevel}
          initialUnitId={autoStartUnitId}
          onBack={() => {
            setAutoStartUnitId(null);
            setView('modern-curriculum');
          }} 
          onStartLesson={(unitId) => {
            setAutoStartUnitId(null);
            const unit = units.find(u => u.id === unitId);
            const lessonObj = {
              id: unitId,
              title: unit?.titleEn || 'New Lesson',
              titleAr: unit?.titleAr || 'درس جديد',
              content: unit?.explanationEn,
              contentAr: unit?.explanationAr,
              proficiencyLevel: selectedGrammarLevel as any
            } as Lesson;
            setActiveLesson(lessonObj);
            setView('lesson');
          }}
        />
      );
    }
    if (view === 'conversation-curriculum') {
      const units = ALL_CONVERSATION_UNITS[selectedConversationLevel];
      return (
        <ConversationCurriculumCompanion 
          lang={lang} 
          level={selectedConversationLevel}
          initialUnitId={autoStartUnitId}
          onBack={() => {
            setAutoStartUnitId(null);
            setView('modern-curriculum');
          }} 
          onStartLesson={(unitId) => {
            setAutoStartUnitId(null);
            const unit = units.find(u => u.id === unitId);
            const lessonObj = {
              id: unitId,
              title: unit?.titleEn || 'New Lesson',
              titleAr: unit?.titleAr || 'درس جديد',
              content: unit?.contextEn,
              contentAr: unit?.contextAr,
              proficiencyLevel: selectedConversationLevel as any
            } as Lesson;
            setActiveLesson(lessonObj);
            setView('lesson');
          }}
        />
      );
    }
    if (view === 'writing-curriculum') {
      const units = ALL_WRITING_UNITS[selectedWritingLevel];
      return (
        <WritingCurriculumCompanion 
          lang={lang} 
          level={selectedWritingLevel}
          initialUnitId={autoStartUnitId}
          onBack={() => {
            setAutoStartUnitId(null);
            setView('modern-curriculum');
          }} 
          onStartLesson={(unitId) => {
            setAutoStartUnitId(null);
            const unit = units.find(u => u.id === unitId);
            const lessonObj = {
              id: unitId,
              title: unit?.titleEn || 'New Lesson',
              titleAr: unit?.titleAr || 'درس جديد',
              content: unit?.conceptEn,
              contentAr: unit?.conceptAr,
              proficiencyLevel: selectedWritingLevel as any
            } as Lesson;
            setActiveLesson(lessonObj);
            setView('lesson');
          }}
        />
      );
    }
    if (view === 'expression-curriculum') {
      const units = ALL_EXPRESSION_UNITS[selectedExpressionLevel];
      return (
        <ExpressionCurriculumCompanion 
          lang={lang} 
          level={selectedExpressionLevel}
          onBack={() => setView('modern-curriculum')} 
          onStartLesson={(unitId) => {
            const unit = units.find(u => u.id === unitId);
            const lessonObj = {
              id: unitId,
              title: unit?.titleEn || 'New Lesson',
              titleAr: unit?.titleAr || 'درس جديد',
              content: unit?.philosophyEn,
              contentAr: unit?.philosophyAr,
              proficiencyLevel: selectedExpressionLevel as any
            } as Lesson;
            setActiveLesson(lessonObj);
            setView('lesson');
          }}
        />
      );
    }
    if (view === 'story-library') {
      return <StoryLibrary lang={lang} profile={userProfile} onUpdateProfile={(p) => setUserProfile(p as StudentProfile)} onNavigate={setView} onBack={() => setView('dashboard')} />;
    }

    if (view === 'placement-test') {
      return (
        <PlacementTest lang={lang} onBack={() => setView('dashboard')} onComplete={async (level) => {
          try {
            await setDoc(doc(db, 'students', currentUser.uid), { level }, { merge: true });
            setView('dashboard');
          } catch (error) {
            handleFirestoreError(error, OperationType.UPDATE, `students/${currentUser.uid}`);
          }
        }} />
      );
    }

    if (view === 'ai-chat') {
      return <AIConversation lang={lang} onBack={() => setView('dashboard')} />;
    }

    if (view === 'bi-weekly-test') {
      return (
        <BiWeeklyTest
          lang={lang}
          level={selectedTestLevel}
          unitId={selectedTestUnitId}
          testTitle={lang === 'ar' ? 'الاختبار الدوري الشامل' : 'Bi-Weekly Comprehensive Test'}
          userProfile={userProfile}
          onBack={() => setView('academic-planner')}
          onComplete={(score, total) => {
            if (userProfile) {
              const updatedPoints = (userProfile.points || 0) + 100;
              setUserProfile({ ...userProfile, points: updatedPoints } as UserProfile);
            }
            setView('academic-planner');
          }}
        />
      );
    }

    // Shared Views for Students and Admins
    if (view === 'curriculum') {
      return <CurriculumBrowser 
        lang={lang} 
        onSelectLesson={async (lesson, category, level) => { 
          if (!userProfile) return;
          
          if (category === CurriculumCategory.CONVERSATION) {
            handleStartAiChat();
            return;
          }

          setActiveLesson({ ...lesson }); 
          setView('lesson'); 
        }}
        onBack={() => setView('dashboard')}
        studentId={activeStudentId || userProfile.uid}
        profile={userProfile}
        seedCurriculum={seedCurriculum}
        onNavigate={setView}
      />;
    }

    if (view === 'lesson' && activeLesson) {
      // Oxford Lesson specific check
      if (activeLesson.id === 'oxford-1') {
        return <OxfordLesson 
          lang={lang} 
          onComplete={handleLessonComplete}
          onBack={() => setView('curriculum')}
        />;
      }

      // Determine category from ID prefix if possible
      const cat = activeLesson.id?.startsWith('r_') ? CurriculumCategory.READING : 
                  activeLesson.id?.startsWith('g_') ? CurriculumCategory.GRAMMAR : 
                  CurriculumCategory.GRAMMAR;
      
      return <LessonPlayer 
        lang={lang} 
        lesson={activeLesson} 
        onBack={() => {
          if (activeLesson.id?.startsWith('r_')) {
            setView('reading-curriculum');
          } else if (activeLesson.id?.startsWith('g_')) {
            setView('grammar-curriculum');
          } else if (activeLesson.id?.startsWith('c_')) {
            setView('conversation-curriculum');
          } else if (activeLesson.id?.startsWith('w_')) {
            setView('writing-curriculum');
          } else if (activeLesson.id?.startsWith('e_')) {
            setView('expression-curriculum');
          } else if (activeLesson.id?.startsWith('m_')) {
             setView('modern-curriculum');
          } else {
            setView('curriculum');
          }
        }}
        onComplete={handleLessonComplete}
        category={cat}
        level={activeLesson.proficiencyLevel}
      />;
    }

    if (view === 'progress') {
      return (
        <StudentStats 
          lang={lang} 
          userId={userProfile.uid} 
          points={userProfile.points} 
          level={userProfile.level}
        />
      );
    }
    
    if (view === 'leaderboard') {
      return (
        <Leaderboard 
          lang={lang} 
          isAdmin={MASTER_ADMINS.includes((userProfile?.email || currentUser?.email || '').toLowerCase())} 
        />
      );
    }

    if (view === 'chat') {
      return <PeerChat lang={lang} profile={userProfile} />;
    }

    // Role-specific Default Dashboards
    switch (userProfile.role) {
      case UserRole.STUDENT:
        return (
          <StudentHome 
            lang={lang} 
            onStartConversation={handleStartAiChat} 
            profile={userProfile} 
            onOpenCurriculum={() => setView('curriculum')} 
            onStartChat={() => setView('chat')}
            onNavigate={setView}
          />
        );
      case UserRole.PARENT:
      case UserRole.ADMIN:
        return <ParentDashboard lang={lang} profile={userProfile} onStudentSelect={setActiveStudentId} onNavigate={setView} />;
      default:
        return <div className="p-20 text-center text-slate-400">{t.loadingText}</div>;
    }
    } catch (e: any) {
      console.error("Render Error:", e);
      setRenderError(e.message || "Unknown error during rendering");
      return null;
    }
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 ${isRtl ? 'font-arabic' : ''}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key="academy-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex min-h-screen bg-[#f8fafc] ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}
        >
          {/* Navigation - Responsive Strategy */}
          {view !== 'placement-test' && (
            <>
              {/* Mobile Top Header */}
              <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-100 z-50 px-4 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#002147] rounded-lg flex items-center justify-center text-white font-black text-sm">B</div>
                  <div className="leading-tight">
                    <h2 className="text-xs font-black text-[#002147]">{t.academyName}</h2>
                    <p className="text-[8px] text-[#C49E3A] font-bold uppercase tracking-widest">{t.academySubName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                  className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-[#002147] font-black text-[10px]"
                >
                  {t.languageToggle}
                </button>
              </header>

              {/* Desktop/Tablet Sidebar */}
              <aside className={`hidden md:flex ${isRtl ? 'right-0 border-l-[3px]' : 'left-0 border-r-[3px]'} w-20 lg:w-56 bg-[#002147] text-white flex-col p-4 lg:p-5 fixed h-full z-40 transition-all border-[#C49E3A]`}>
                <div className="flex items-center gap-3 px-1 mb-10 overflow-hidden">
                  <div className="w-10 h-10 lg:w-11 lg:h-11 bg-white rounded-xl flex shrink-0 items-center justify-center text-[#002147] shadow-xl font-black text-xl lg:text-2xl">
                    B
                  </div>
                  <h1 className={`font-black text-sm lg:text-lg tracking-tight hidden lg:block leading-tight ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.academyName}<br/><span className="text-[#C49E3A] text-[10px] font-bold tracking-widest">{t.academySubName}</span>
                    {userProfile?.role === UserRole.ADMIN && (
                      <span className="block mt-1 text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full w-fit uppercase font-black tracking-widest">Admin</span>
                    )}
                  </h1>
                </div>
                
                <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
                  {[
                    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
                    { id: 'academic-planner', label: t.academicPlanner, icon: Sparkles },
                    { id: 'admin', label: t.adminCommandCenter, icon: ShieldAlert, show: isAdmin },
                    { id: 'video-library', label: t.videoLibrary, icon: Play, disabled: !videoLessonsEnabled && !isAdmin },
                    { id: 'oxford-discover', label: t.oxfordCompanion, icon: Layers },
                    { id: 'modern-curriculum', label: lang === 'ar' ? 'المناهج الدراسية المطورة' : 'Modernized Curriculums', icon: Sparkles },
                    { id: 'professional-development', label: lang === 'ar' ? 'دورات تطويرية' : 'Developmental Courses', icon: GraduationCap },
                    { id: 'early-childhood', label: t.earlyChildhood, icon: Baby },
                    { id: 'story-library', label: t.storyLibrary, icon: BookOpen },
                    { id: 'curriculum', label: t.curriculum, icon: BookOpen },
                    { id: 'ai-chat', label: t.aiPartner, icon: Mic2 },
                    { id: 'progress', label: t.performance, icon: BarChart3 },
                    { id: 'leaderboard', label: t.leaderboard, icon: Trophy },
                    { id: 'chat', label: t.chat, icon: MessageSquare },
                  ].filter(item => item.show !== false).map((item) => {
                    const isDisabled = (item as any).disabled;
                    return (
                      <button 
                        key={item.id}
                        disabled={isDisabled}
                        onClick={() => {
                        if (item.id === 'ai-chat') {
                          handleStartAiChat();
                        } else {
                          setView(item.id as AppView);
                        }
                      }}
                        className={`w-full flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 lg:py-3.5 rounded-xl lg:rounded-2xl transition-all group relative overflow-hidden ${
                          view === item.id 
                          ? 'bg-[#C49E3A] text-[#002147] font-black shadow-lg shadow-black/20 scale-[1.02]' : 'hover:bg-white/5 text-white/60 hover:text-white'
                        } ${isDisabled ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                      >
                        <item.icon size={innerWidth < 1024 ? 22 : 20} className="shrink-0 group-hover:scale-110 transition-transform" />
                        <span className={`text-[11px] lg:text-xs font-bold hidden lg:block uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'} w-full truncate`}>
                          {item.label}
                          {isDisabled && (
                            <span className={`block text-[7px] font-black tracking-widest ${isRtl ? 'mt-0.5' : 'mt-0.5'} opacity-60`}>
                              ({t.comingSoon})
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                <div className="pt-6 mt-6 border-t border-white/5 space-y-2">
                  <button 
                    onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                    className="w-full flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all group"
                  >
                    <Settings size={20} className="shrink-0" />
                    <span className={`text-[10px] lg:text-[11px] font-bold hidden lg:block uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'} w-full truncate`}>{t.languageToggle}</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-100/60 hover:text-red-100 transition-all group"
                  >
                    <LogOut size={20} className="shrink-0" />
                    <span className={`text-[10px] lg:text-[11px] font-bold hidden lg:block uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'} w-full truncate`}>{t.logout}</span>
                  </button>
                </div>
              </aside>

              {/* Mobile Bottom Navigation - Two Floors */}
              <nav className="md:hidden fixed bottom-2 left-3 right-3 bg-[#002147] text-white rounded-[2rem] p-2 flex flex-col gap-1 z-50 shadow-2xl border-b-4 border-[#C49E3A] overflow-hidden">
                {[
                  [
                    { id: 'dashboard', icon: LayoutDashboard },
                    { id: 'admin', icon: ShieldAlert, show: isAdmin },
                    { id: 'early-childhood', icon: Baby },
                    { id: 'academic-planner', icon: Sparkles },
                    { id: 'oxford-discover', icon: OxfordIcon },
                    { id: 'video-library', icon: Play, disabled: !videoLessonsEnabled && !isAdmin },
                    { id: 'story-library', icon: BookOpen },
                  ],
                  [
                    { id: 'curriculum', icon: BookOpen },
                    { id: 'ai-chat', icon: Mic2 },
                    { id: 'modern-curriculum', icon: Sparkles },
                    { id: 'professional-development', icon: GraduationCap },
                    { id: 'leaderboard', icon: Trophy },
                    { id: 'progress', icon: BarChart3 },
                    { id: 'logout', icon: LogOut, action: handleLogout },
                  ]
                ].map((row, rowIndex) => (
                  <div key={`mobile-nav-row-${rowIndex}`} className={`flex justify-around items-center w-full ${rowIndex === 1 ? 'border-t border-white/5 pt-1' : ''}`}>
                    {row.filter((item: any) => item.show !== false).map((item: any, itemIndex: number) => {
                      const isDisabled = item.disabled;
                      return (
                        <button 
                          key={`mobile-nav-item-${item.id}-${itemIndex}`}
                          disabled={isDisabled}
                          onClick={() => {
                            if (item.id === 'ai-chat') {
                              handleStartAiChat();
                            } else if (item.action) {
                              item.action();
                            } else {
                              setView(item.id as AppView);
                            }
                          }}
                          className={`flex flex-col items-center justify-center p-1 rounded-xl transition-all relative ${
                            view === item.id 
                            ? 'text-[#C49E3A] scale-110' : 'text-white/40'
                          } ${isDisabled ? 'opacity-30 grayscale cursor-not-allowed' : ''}`}
                        >
                          <item.icon size={18} strokeWidth={view === item.id ? 3 : 2} />
                          {view === item.id && (
                            <motion.div 
                              layoutId="activeTab"
                              className="absolute -bottom-0.5 w-1 h-1 bg-[#C49E3A] rounded-full"
                            />
                          )}
                          {isDisabled && (
                            <span className="absolute -top-1 -right-1 text-[5px] font-black bg-red-500 text-white px-1 rounded-full">{isRtl ? 'قريباً' : 'SOON'}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </>
          )}

          <main className={`flex-1 transition-all ${view !== 'placement-test' ? (isRtl ? 'md:mr-20 lg:mr-56 mb-32 md:mb-0 pt-20 md:pt-0' : 'md:ml-20 lg:ml-56 mb-32 md:mb-0 pt-20 md:pt-0') : ''}`}>
            {renderContent()}

            {/* Global Notification Toast */}
            <AnimatePresence>
              {activeNotification && (
                <motion.div 
                  initial={{ y: -100, opacity: 0, scale: 0.9 }}
                  animate={{ y: 80, opacity: 1, scale: 1 }}
                  exit={{ y: -100, opacity: 0, scale: 0.9 }}
                  className={`fixed top-0 left-4 right-4 md:left-auto md:right-12 md:max-w-md z-[100] bg-white rounded-[2.5rem] p-6 shadow-2xl border-4 border-[#002147] ${isRtl ? 'font-arabic' : 'font-sans'}`}
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center shrink-0 shadow-sm">
                      <Bell size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-[#002147] mb-1">{isRtl ? activeNotification.titleAr : activeNotification.titleEn}</h4>
                      <p className="text-xs text-slate-500 font-bold leading-relaxed">{isRtl ? activeNotification.messageAr : activeNotification.messageEn}</p>
                    </div>
                    <button 
                      onClick={() => setActiveNotification(null)}
                      className="text-slate-300 hover:text-slate-600 transition-colors"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
