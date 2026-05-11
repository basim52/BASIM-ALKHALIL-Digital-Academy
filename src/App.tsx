/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Mic2, 
  BarChart3, 
  Users, 
  Settings, 
  LayoutDashboard, 
  GraduationCap,
  MessageSquare,
  Trophy,
  Calendar,
  ChevronRight,
  Play,
  CheckCircle2,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogIn,
  LogOut,
  Sparkles,
  Plus,
  Trash2,
  Clock,
  Send,
  Hash,
  PenTool
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole, CurriculumCategory, proficiencyLevel, UserProfile, ScheduleItem, ParentNote, LearningModule, Lesson } from './types';
import { MASTER_CURRICULUM } from './data/masterCurriculum';
import { AIConversation } from './components/AIConversation';
import { PlacementTest } from './components/PlacementTest';
import { auth, googleProvider, db, handleFirestoreError, OperationType, testConnection } from './lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, addDoc, serverTimestamp, collection, query, where, onSnapshot, deleteDoc, orderBy, getDocs } from 'firebase/firestore';
import { translations, Language } from './lib/translations';
import { GoogleGenAI } from "@google/genai";
import { StudentStats } from './components/StudentStats';
import { Leaderboard } from './components/Leaderboard';
import { PeerChat } from './components/PeerChat';
import { generateLessonContent, generateCurriculumUnits } from './services/curriculumGenerator';
import { InteractiveLesson } from './components/InteractiveLesson';
import { WhatsAppNotifications } from './components/WhatsAppNotifications';
import { ReadingLesson } from './components/ReadingLesson';
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

type AppView = 'dashboard' | 'ai-chat' | 'placement-test' | 'curriculum' | 'lesson' | 'progress' | 'leaderboard' | 'chat';

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
          <span className="text-[10px] font-bold text-[#002147]">GEMINI AI POWERED</span>
        </div>
      </motion.div>
    </div>
  );
};

const ScheduleManager = ({ studentId, lang, canEdit = false }: { studentId: string, lang: Language, canEdit?: boolean }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [newItem, setNewItem] = useState({ day: 'Monday', time: '10:00', subject: '' });

  useEffect(() => {
    const q = query(collection(db, 'schedules'), where('studentId', '==', studentId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: ScheduleItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ScheduleItem);
      });
      setSchedule(items.sort((a, b) => a.day.localeCompare(b.day)));
    });
    return () => unsubscribe();
  }, [studentId]);

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

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-3">
          <Calendar className="text-[#C49E3A] w-5 h-5 md:w-6 md:h-6" />
          {t.schedule}
        </h3>
        {canEdit && (
          <button onClick={addItem} className="bg-[#002147] text-white p-2 rounded-xl hover:bg-[#C49E3A] transition-all">
            <Plus size={20} />
          </button>
        )}
      </div>

      {canEdit && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 p-4 bg-slate-50 rounded-[1.5rem]">
          <select 
            value={newItem.day} 
            onChange={(e) => setNewItem({...newItem, day: e.target.value})}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2"
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
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
            {Object.values(CurriculumCategory).map(cat => (
              <option key={cat} value={cat}>{t[`curr_${cat}` as keyof typeof t] as string}</option>
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
                  <h4 className="font-bold text-[#002147] text-sm md:text-base">{item.subject}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.day} • {item.time}</p>
                </div>
              </div>
              {canEdit && (
                <button onClick={() => removeItem(item.id)} className="text-red-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              )}
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

  useEffect(() => {
    const q = query(collection(db, 'parentNotes'), where('studentId', '==', studentId), where('parentId', '==', profile.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: ParentNote[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ParentNote);
      });
      setNotes(items.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
    });
    return () => unsubscribe();
  }, [studentId, profile.uid]);

  const sendNote = async () => {
    if (!newNote.trim()) return;
    setSending(true);
    
    try {
      const sDoc = await getDoc(doc(db, 'students', studentId));
      const studentData = sDoc.data();
      
      const prompt = `
        You are the Academic Director at Basim Alkhalil Digital Academy.
        A parent left a note/question about their child (Student ID: ${studentId}).
        Student Level: ${studentData?.level || 'B1'}.
        Student Points: ${studentData?.points || 0}.
        
        Parent's note: "${newNote}"
        
        Provide a professional, reassuring, and academic response in ${lang === 'ar' ? 'Arabic' : 'English'}.
        Address the parent as a partner in their child's education.
      `;
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const aiResponse = response.text || (lang === 'ar' ? "سأقوم بمراجعة هذا الأمر شخصياً." : "I will look into this personally.");

      // 3. Save to Firestore
      const noteId = Math.random().toString(36).substr(2, 9);
      await setDoc(doc(db, 'parentNotes', noteId), {
        parentId: profile.uid,
        studentId,
        text: newNote,
        aiResponse,
        createdAt: serverTimestamp()
      });
      
      setNewNote('');
    } catch (error) {
      console.error("Error sending note:", error);
    }
    setSending(false);
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col">
      <h3 className="text-xl md:text-2xl font-black text-[#002147] mb-6 md:mb-8 flex items-center gap-3">
        <MessageSquare className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
        {t.notes}
      </h3>
      
      <div className="flex-1 space-y-6 overflow-y-auto mb-6 md:mb-8 pr-2 max-h-[400px]">
        {notes.map((note) => (
          <div key={note.id} className="space-y-4">
            <div className={`p-4 rounded-2xl ${isRtl ? 'bg-slate-50 border-r-4 border-[#002147]' : 'bg-slate-50 border-l-4 border-[#002147] shadow-sm'}`}>
              <p className="text-sm font-bold text-[#002147]">{note.text}</p>
            </div>
            {note.aiResponse && (
              <div className={`p-4 rounded-2xl bg-blue-50/50 border border-blue-100 ${isRtl ? 'mr-8' : 'ml-8'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{t.aiResponse}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">{note.aiResponse}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="relative">
          <textarea 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder={t.parentNotePlaceholder}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:outline-none focus:border-blue-600 h-24 transition-all"
          />
          <button 
            onClick={sendNote}
            disabled={sending}
            className="absolute bottom-3 left-3 bg-[#002147] text-white p-3 rounded-xl hover:bg-[#C49E3A] transition-all disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// StudentDashboard internal component
const StudentHome = ({ lang, profile, onStartConversation, onOpenCurriculum }: { lang: Language, profile: UserProfile, onStartConversation: () => void, onOpenCurriculum: () => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

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
                {lang === 'ar' ? 'استمر بمسار المناهج الرقمية الخاص بك' : 'Continue your digital curriculum path'}
              </p>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">{isRtl ? 'كود الطالب:' : 'STUDENT CODE:'}</span>
                <code className="text-xs font-mono font-bold text-[#002147] select-all">{profile.uid}</code>
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
                navigator.clipboard.writeText(profile.uid);
                alert(lang === 'ar' ? 'تم نسخ كود الطالب!' : 'Student code copied!');
              }}
              className="p-3 hover:bg-slate-50 rounded-2xl transition-all" 
              title="ID"
            >
              <Settings size={20} className="text-slate-400" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          {/* Journey Section */}
          <section className="lg:col-span-2 bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10 gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
              <h3 className="text-2xl font-black text-[#002147] flex items-center gap-3">
                <BookOpen className="text-blue-600" />
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
              {MASTER_CURRICULUM[CurriculumCategory.READING][(profile as any).level || proficiencyLevel.A1].slice(0, 3).map((unit, i) => (
                <div key={unit.id} className={`p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 transition-all ${i === 0 ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100'}`}>
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
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-[#002147] text-white rounded-[2.5rem] p-10 relative overflow-hidden group shadow-xl shadow-blue-900/10 border-b-8 border-[#C49E3A]"
            >
                  <div className="relative z-10">
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

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-[#002147] mb-6 flex items-center gap-3">
                <Calendar className="text-[#C49E3A]" />
                {lang === 'ar' ? 'المهام والواجبات' : 'Tasks and Assignments'}
              </h3>
              <div className={`space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-4 p-4 bg-red-50/50 rounded-2xl border border-red-100 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                    <AlertCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-red-800 text-sm">{lang === 'ar' ? 'اختبار الوحدة 4' : 'Unit 4 Test'}</p>
                    <p className="text-red-600/80 text-[10px] uppercase font-bold tracking-wider">{lang === 'ar' ? 'ينتهي خلال 4 ساعات' : 'Expires in 4 hours'}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{lang === 'ar' ? 'كتابة مقال: My City' : 'Writing Essay: My City'}</p>
                    <p className="text-emerald-600 text-[10px] font-bold">{lang === 'ar' ? 'تم التسليم والتقييم' : 'Submitted and Graded'}</p>
                  </div>
                </div>
              </div>
            </div>

            <ScheduleManager studentId={profile.uid} lang={lang} canEdit={true} />
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
          {roles.map((role) => (
            <motion.button
              key={role.id}
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

const ParentDashboard = ({ lang, profile }: { lang: Language, profile: UserProfile }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [linking, setLinking] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      // For this demo, we check if the parent already has linked children
      // In a real app, this would be an array in the user's profile
      const userDoc = await getDoc(doc(db, 'users', profile.uid));
      const userData = userDoc.data() as any;
      
      if (userData?.linkedStudentId) {
        try {
          const sDoc = await getDoc(doc(db, 'users', userData.linkedStudentId));
          const sMeta = await getDoc(doc(db, 'students', userData.linkedStudentId));
          if (sDoc.exists() && sMeta.exists()) {
            setStudentData({ 
              ...sDoc.data(), 
              ...sMeta.data(), 
              phoneNumber: userData.phoneNumber, 
              studentPhoneNumber: userData.studentPhoneNumber 
            });
          }
        } catch (err) {
          console.error("Error fetching student:", err);
        }
      }
      setLoading(false);
    };
    fetchStudentData();
  }, [profile.uid]);

  const handleLink = async () => {
    if (!studentId.trim()) return;
    setLinking(true);
    setError('');
    try {
      const sDoc = await getDoc(doc(db, 'users', studentId));
      if (sDoc.exists() && sDoc.data().role === UserRole.STUDENT) {
        await setDoc(doc(db, 'users', profile.uid), { linkedStudentId: studentId }, { merge: true });
        const pDoc = await getDoc(doc(db, 'users', profile.uid));
        const pData = pDoc.data();
        const sMeta = await getDoc(doc(db, 'students', studentId));
        setStudentData({ 
          ...sDoc.data(), 
          ...sMeta.data(), 
          phoneNumber: pData?.phoneNumber, 
          studentPhoneNumber: pData?.studentPhoneNumber 
        });
      } else {
        setError(t.invalidStudentId);
      }
    } catch (err) {
      setError(t.invalidStudentId);
    }
    setLinking(false);
  };

  const handleUpdatePhone = async (type: 'parent' | 'student', phone: string) => {
    try {
      const field = type === 'parent' ? 'phoneNumber' : 'studentPhoneNumber';
      await setDoc(doc(db, 'users', profile.uid), { [field]: phone }, { merge: true });
      setStudentData((prev: any) => ({ ...prev, [field]: phone }));
    } catch (err) {
      console.error("Error updating phone:", err);
    }
  };

  if (loading) return (
    <div className="p-20 text-center">
      <div className="w-12 h-12 bg-[#002147] rounded-2xl animate-spin mx-auto mb-4" />
      <p className="text-slate-400">{t.loadingText}</p>
    </div>
  );

  if (!studentData) {
    return (
      <div className={`p-8 max-w-2xl mx-auto w-full ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 text-center"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Users size={40} />
          </div>
          <h2 className="text-3xl font-black text-[#002147] mb-4">{t.linkStudent}</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">{t.enterStudentId}</p>
          
          <div className="space-y-4">
            <input 
              type="text" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
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
              {isRtl ? 'لا تمتلك كود الطالب؟ اطلب من الطالب نسخ الكود من أسفل صفحة بروفايله.' : 'Don\'t have the student code? Ask the student to copy their UID from their profile page.'}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className={`mb-8 md:mb-12 border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002147]">{t.parentPortal}</h2>
          <p className="text-slate-400 italic mt-2 text-sm md:text-base">{t.trackProgress}</p>
        </div>
        <div className={`flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 ${!isRtl ? 'flex-row-reverse' : ''} w-full md:w-auto`}>
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h4 className="text-sm font-bold text-[#002147]">{studentData.displayName}</h4>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t.registeredStudent}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 overflow-hidden flex items-center justify-center text-2xl border border-blue-100 shadow-inner">
            <img src={studentData.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentData.displayName}`} alt="student" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        {[
          { label: t.attendance, value: '98%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: t.gradeAverage, value: studentData.level || 'A-', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: t.completedAssignments, value: '12/15', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: t.speakingHours, value: studentData.points > 0 ? (studentData.points / 10).toFixed(1) : '1.2', icon: Mic2, color: 'text-[#C49E3A]', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : ''} relative overflow-hidden group`}>
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-[#002147]">{stat.value}</p>
            </div>
            <div className={`absolute top-0 bottom-0 ${isRtl ? 'left-0' : 'right-0'} w-1 ${stat.color.replace('text', 'bg')}`} />
          </div>
        ))}
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
            {[45, 60, 55, 75, 85, 92].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-slate-50 rounded-t-xl relative group h-full flex items-end">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="w-full bg-[#002147] rounded-t-xl group-hover:bg-[#C49E3A] transition-all relative"
                  >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/30 rounded-full" />
                  </motion.div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#002147] text-white text-[10px] py-1.5 px-3 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-all shadow-lg whitespace-nowrap">%{h} Success</div>
                </div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">{lang === 'ar' ? 'شهر' : 'MONTH'} {i+1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col">
          <h3 className={`text-xl font-bold text-[#002147] mb-10 ${lang === 'ar' ? 'text-right' : 'text-left'} flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
             <LayoutDashboard className="text-[#C49E3A]" />
             <span className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? `نشاط ${studentData.displayName} الأخير` : `Recent activity of ${studentData.displayName}`}</span>
          </h3>
          <div className={`space-y-8 ${lang === 'ar' ? 'text-right' : 'text-left'} flex-1`}>
            {[
              { textAr: 'أكمل اختبار تحديد المستوى وحصل على نتيجة ' + (studentData.level || 'B1'), textEn: 'Completed placement test and reached result ' + (studentData.level || 'B1'), timeAr: 'منذ ساعتين', timeEn: '2 hours ago', icon: CheckCircle2, iconColor: 'text-emerald-500' },
              { textAr: 'تحدث مع "شريك المحادثة" لمدة 15 دقيقة (موضوع: الهوايات)', textEn: 'Talked with AI Partner for 15 minutes (Topic: Hobbies)', timeAr: 'صباح اليوم', timeEn: 'This morning', icon: Mic2, iconColor: 'text-blue-500' },
              { textAr: 'تم تصحيح واجب "مقال الرحلات" - الدرجة 9/10', textEn: 'Graded Essay "Trips" - Score 9/10', timeAr: 'أمس', timeEn: 'Yesterday', icon: BookOpen, iconColor: 'text-[#C49E3A]' },
            ].map((activity, i) => (
              <div key={i} className={`flex gap-5 ${lang === 'ar' ? 'flex-row-reverse' : ''} group`}>
                <div className={`mt-1 ${activity.iconColor} shrink-0 p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <activity.icon size={22} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-[#002147] font-bold leading-relaxed">{lang === 'ar' ? activity.textAr : activity.textEn}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === 'ar' ? activity.timeAr : activity.timeEn}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="w-full mt-10 p-4 border border-dashed border-slate-200 rounded-xl text-[10px] font-mono text-slate-400 break-all select-all text-center"
            title="Student Code"
          >
            {studentData.uid}
          </button>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div className="lg:col-span-1">
          <WhatsAppNotifications 
            lang={lang}
            studentId={studentData.uid}
            studentName={studentData.displayName}
            parentPhone={studentData.phoneNumber}
            studentPhone={studentData.studentPhoneNumber}
            onUpdatePhone={handleUpdatePhone}
          />
        </div>
        <div className="lg:col-span-1">
          <ScheduleManager studentId={studentData.uid} lang={lang} canEdit={true} />
        </div>
      </div>
      
      <div className="mb-10">
        <AIParentNotes profile={profile} studentId={studentData.uid} lang={lang} />
      </div>
    </div>
  );
};

const CurriculumBrowser = ({ lang, onSelectLesson, onBack, studentId, profile, seedCurriculum }: { lang: Language, onSelectLesson: (lesson: Lesson, category: CurriculumCategory, level: proficiencyLevel) => void, onBack: () => void, studentId: string, profile: UserProfile, seedCurriculum: () => void }) => {
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

  const addToSchedule = async (unitId: string, unitTitle: string) => {
    setBookingStatus(prev => ({ ...prev, [unitId]: 'booking' }));
    try {
      await addDoc(collection(db, 'schedules'), {
        studentId,
        day: 'Monday', // Default to Monday, student can move it in manager
        time: '16:00',
        subject: selectedCategory || 'General',
        isCustom: true,
        unitTitle: unitTitle,
        createdAt: serverTimestamp()
      });
      
      setBookingStatus(prev => ({ ...prev, [unitId]: 'success' }));
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, [unitId]: 'idle' }));
      }, 3000);
    } catch (err) {
      console.error("Booking error:", err);
      setBookingStatus(prev => ({ ...prev, [unitId]: 'idle' }));
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
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedCategory(cat.id)}
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
                {levels.map((lvl) => (
                  <button
                    key={lvl}
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
                      key={unit.id}
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
                          onClick={() => addToSchedule(unit.id, isRtl ? unit.titleAr : unit.title)}
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
    </div>
  );
};


const LessonPlayer = ({ lang, lesson, onBack, onComplete, category, level }: { lang: Language, lesson: Lesson, onBack: () => void, onComplete: () => void, category?: CurriculumCategory, level?: proficiencyLevel }) => {
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
        onFinish={(score) => onComplete()} 
      />
    );
  }

  return (
    <InteractiveLesson 
      lesson={fullLesson} 
      isRtl={isRtl} 
      onFinish={(score) => onComplete()} 
    />
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [view, setView] = useState<AppView>('dashboard');
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('ar');
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loadingCurriculum, setLoadingCurriculum] = useState(false);

  const t = translations[lang];
  const isRtl = lang === 'ar';

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
        try {
          // Special case for the master admin: ensure they have admin profile even if fetch fails
          if (user.email === 'basim5252@gmail.com') {
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
                await setDoc(doc(db, 'users', user.uid), adminProfile);
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
              setUserProfile(userDoc.data() as UserProfile);
            } else {
              // RoleSelector will handle new non-admin users
            }
          }
        } catch (error) {
          console.error("Auth profile fetch error:", error);
          // Only show fatal error if not the master admin (who has fallback)
          if (user.email !== 'basim5252@gmail.com') {
            handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
          }
        }
      } else {
        setUserProfile(null);
        setView('dashboard');
      }
      setLoading(false);
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
    try {
      await setDoc(doc(db, 'users', currentUser.uid), profile);
      setUserProfile(profile);
      if (role === UserRole.STUDENT) {
        // Prepare initial student metadata
        await setDoc(doc(db, 'students', currentUser.uid), {
          level: proficiencyLevel.A1,
          points: 0,
          learningPath: [],
          currentModuleId: 'mod_1'
        });
        setView('placement-test');
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
    }
  };

  const handleLogout = () => signOut(auth);

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

  const handleLessonComplete = async () => {
    if (!userProfile || !activeLesson) return;
    
    // Increment XP and points
    const xpToAdd = 50; 
    const updatedPoints = (userProfile as any).points + xpToAdd;
    
    try {
      await setDoc(doc(db, 'users', userProfile.uid), { 
        points: updatedPoints 
      }, { merge: true });
      
      setUserProfile({ ...userProfile, points: updatedPoints } as UserProfile);
      setView('curriculum');
      alert(`${t.xpEarned}: +${xpToAdd}`);
    } catch (err) {
      console.error("Error updating points:", err);
    }
  };

  const renderContent = () => {
    if (view === 'placement-test') {
      return (
        <PlacementTest lang={lang} onComplete={async (level) => {
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

    // Shared Views for Students and Admins
    if (view === 'curriculum') {
      return <CurriculumBrowser 
        lang={lang} 
        onSelectLesson={(lesson, category, level) => { 
          setActiveLesson({ ...lesson }); 
          // We could keep track of selectedCategory/Level in App if needed
          setView('lesson'); 
        }}
        onBack={() => setView('dashboard')}
        studentId={userProfile.uid}
        profile={userProfile}
        seedCurriculum={seedCurriculum}
      />;
    }

    if (view === 'lesson' && activeLesson) {
      // Determine category from ID prefix if possible
      const cat = activeLesson.id?.startsWith('r_') ? CurriculumCategory.READING : 
                  activeLesson.id?.startsWith('g_') ? CurriculumCategory.GRAMMAR : 
                  CurriculumCategory.GRAMMAR;
      
      return <LessonPlayer 
        lang={lang} 
        lesson={activeLesson} 
        onBack={() => setView('curriculum')}
        onComplete={handleLessonComplete}
        category={cat}
        level={activeLesson.proficiencyLevel}
      />;
    }

    if (view === 'progress') {
      return <StudentStats lang={lang} />;
    }
    
    if (view === 'leaderboard') {
      return <Leaderboard lang={lang} />;
    }

    if (view === 'chat') {
      return <PeerChat lang={lang} profile={userProfile} />;
    }

    // Role-specific Default Dashboards
    switch (userProfile.role) {
      case UserRole.STUDENT:
        return <StudentHome lang={lang} onStartConversation={() => setView('ai-chat')} profile={userProfile} onOpenCurriculum={() => setView('curriculum')} />;
      case UserRole.PARENT:
      case UserRole.ADMIN:
        return <ParentDashboard lang={lang} profile={userProfile} />;
      default:
        return <div className="p-20 text-center text-slate-400">{t.loadingText}</div>;
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
              <aside className={`hidden md:flex ${isRtl ? 'right-0 border-l-4' : 'left-0 border-r-4'} w-20 lg:w-64 bg-[#002147] text-white flex-col p-6 fixed h-full z-40 transition-all border-[#C49E3A]`}>
                <div className="flex items-center gap-4 px-2 mb-12 overflow-hidden">
                  <div className="w-12 h-12 bg-white rounded-2xl flex shrink-0 items-center justify-center text-[#002147] shadow-xl font-black text-2xl">
                    B
                  </div>
                  <h1 className={`font-black text-xl tracking-tight hidden lg:block leading-tight ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.academyName}<br/><span className="text-[#C49E3A] text-xs font-bold">{t.academySubName}</span>
                    {userProfile?.role === UserRole.ADMIN && (
                      <span className="block mt-1 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full w-fit uppercase font-black tracking-widest">Master Admin</span>
                    )}
                  </h1>
                </div>
                
                <nav className="flex-1 space-y-3">
                  {[
                    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
                    { id: 'curriculum', label: t.curriculum, icon: BookOpen },
                    { id: 'ai-chat', label: t.aiPartner, icon: Mic2 },
                    { id: 'progress', label: t.performance, icon: BarChart3 },
                    { id: 'leaderboard', label: t.leaderboard, icon: Trophy },
                    { id: 'chat', label: t.chat, icon: MessageSquare },
                  ].map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setView(item.id as AppView)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative overflow-hidden ${
                        view === item.id 
                        ? 'bg-[#C49E3A] text-[#002147] font-black shadow-lg' : 'hover:bg-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      <item.icon size={22} className="shrink-0 group-hover:scale-110 transition-transform" />
                      <span className={`text-xs font-bold hidden lg:block uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'} w-full`}>{item.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="pt-8 border-t border-white/10 space-y-3">
                  <button 
                    onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all group"
                  >
                    <Settings size={22} className="shrink-0" />
                    <span className={`text-xs font-bold hidden lg:block uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'} w-full`}>{t.languageToggle}</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-red-500/10 text-red-100 transition-all group"
                  >
                    <LogOut size={22} className="shrink-0" />
                    <span className={`text-xs font-bold hidden lg:block uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'} w-full`}>{t.logout}</span>
                  </button>
                </div>
              </aside>

              {/* Mobile Bottom Navigation */}
              <nav className="md:hidden fixed bottom-6 left-4 right-4 bg-[#002147] text-white rounded-[2.5rem] px-2 py-3 flex justify-around items-center z-50 shadow-2xl border-b-4 border-[#C49E3A]">
                {[
                  { id: 'dashboard', icon: LayoutDashboard },
                  { id: 'curriculum', icon: BookOpen },
                  { id: 'ai-chat', icon: Mic2 },
                  { id: 'leaderboard', icon: Trophy },
                  { id: 'progress', icon: BarChart3 },
                  { id: 'logout', icon: LogOut, action: handleLogout },
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => {
                      if (item.action) item.action();
                      else setView(item.id as AppView);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all relative ${
                      view === item.id 
                      ? 'text-[#C49E3A] scale-110' : 'text-white/40'
                    }`}
                  >
                    <item.icon size={22} strokeWidth={view === item.id ? 3 : 2} />
                    {view === item.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute -bottom-1 w-1 h-1 bg-[#C49E3A] rounded-full"
                      />
                    )}
                  </button>
                ))}
              </nav>
            </>
          )}

          {/* Main Content Area */}
          <main className={`flex-1 transition-all ${view !== 'placement-test' ? (isRtl ? 'md:mr-20 lg:mr-64 mb-24 md:mb-0 pt-20 md:pt-0' : 'md:ml-20 lg:ml-64 mb-24 md:mb-0 pt-20 md:pt-0') : ''}`}>
            {renderContent()}
          </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
