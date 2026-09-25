/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ArrowRight, ArrowLeft, ShieldAlert, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';
import { auth, googleProvider } from './lib/firebase';
import firebaseConfig from '../firebase-applet-config.json';
import { translations, Language } from './lib/translations';
import { UserRole } from './types';
import { LandingPage } from './components/LandingPage';

// Code splitting: Load the heavy authenticated app only after sign-in
const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'));

interface LoginScreenProps {
  lang: Language;
  onToggleLang: () => void;
  onSimulateLogin: (email: string, role: UserRole) => void;
  onBackToLanding?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ 
  lang, 
  onToggleLang, 
  onSimulateLogin,
  onBackToLanding
}) => {
  const [authError, setAuthError] = useState<any>(null);
  const t = translations[lang];
  
  const handleLogin = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Login failed:", error);
      setAuthError(error);
    }
  };

  const isUnauthorizedDomain = authError && (
    authError.code === 'auth/unauthorized-domain' || 
    (authError.message && authError.message.includes('unauthorized-domain'))
  );

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'your-domain';

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
        {onBackToLanding ? (
          <button 
            onClick={onBackToLanding}
            className="bg-white px-4 py-2 rounded-xl shadow-md border border-slate-100 font-bold text-xs text-[#002147] hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
          >
            {lang === 'ar' ? <ArrowRight size={15} className="text-[#C49E3A]" /> : <ArrowLeft size={15} className="text-[#C49E3A]" />}
            <span>{lang === 'ar' ? 'الصفحة التعريفية' : 'Landing Page'}</span>
          </button>
        ) : <div />}
        <button 
          onClick={onToggleLang}
          className="bg-white px-4 py-2 rounded-xl shadow-md border border-slate-100 font-bold text-xs text-[#002147] hover:bg-slate-50 transition-all cursor-pointer"
        >
          {t.languageToggle}
        </button>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#002147 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 md:p-10 text-center border-t-8 border-[#C49E3A] z-10"
      >
        <div className="w-20 h-20 bg-[#002147] rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl border-4 border-slate-50 font-black text-3xl">
          B
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#002147] mb-2">{t.academyName}</h1>
        <p className={`text-slate-400 font-medium mb-8 text-sm ${lang === 'ar' ? 'text-right' : 'text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          {t.academyDescription}
        </p>
        
        <button 
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-4 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-[#002147] hover:border-[#002147] hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
        >
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.09C3.3 21.43 7.37 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.09z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.3 2.57 1.27 6.59l4.01 3.09c.95-2.83 3.6-4.93 6.72-4.93z"/>
          </svg>
          <span>{t.googleLogin}</span>
        </button>

        {authError && (
          <div className="mt-5 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-left text-xs text-rose-700" dir="ltr">
            <div className="font-extrabold flex items-center gap-2 text-rose-800 mb-1">
              <ShieldAlert size={14} className="shrink-0" />
              <span>Authentication Sign-In Failed</span>
            </div>
            <p className="font-mono text-[11px] leading-tight break-words">{authError.message || String(authError)}</p>
          </div>
        )}

        {isUnauthorizedDomain && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-50/80 border border-blue-200/50 rounded-2xl text-right" 
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className={`flex items-center gap-1.5 text-blue-800 mb-2 font-black text-xs justify-start ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              <Settings size={14} className="text-amber-500 animate-spin [animation-duration:10s]" />
              <span>
                {lang === 'ar' ? 'خطوة هامة لحل مشكلة الدخول 🛠️' : 'Authorize Current Domain 🛠️'}
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed mb-3">
              {lang === 'ar' 
                ? `النطاق الحالي (${currentHost}) غير مصرح به في إعدادات مشروع Firebase الخاص بك.` 
                : `The current app domain (${currentHost}) is not authorized inside your Firebase project.`}
            </p>
            <div className="bg-slate-900 text-slate-100 p-2 rounded-lg text-center font-mono text-[11px] select-all mb-3 border border-slate-700 leading-none">
              {currentHost}
            </div>
            <ul className="text-[10px] text-slate-500 space-y-1 list-disc list-inside mr-1 text-right mb-4 leading-relaxed font-semibold">
              {lang === 'ar' ? (
                <>
                  <li>اذهب إلى لوحة تحكم مشروع Firebase الخاص بك.</li>
                  <li>من القائمة الجانبية: Authentication ثم Settings.</li>
                  <li>ابحث عن Authorized Domains (النطاقات المعتمدة).</li>
                  <li>اضغط فوق Add Domain وألصق النطاق المعروض أعلاه ثم احفظ.</li>
                </>
              ) : (
                <>
                  <li>Go to your Firebase console project.</li>
                  <li>Navigate to Authentication &gt; Settings.</li>
                  <li>In the Authorized domains section, click Add Domain.</li>
                  <li>Paste the domain shown in the dark box above and save.</li>
                </>
              )}
            </ul>
            <a 
              href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/providers`}
              target="_blank" 
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 px-3 py-2 rounded-xl font-bold text-[10px] text-slate-600 transition-colors w-full justify-center shadow-xs"
            >
              <span>{lang === 'ar' ? 'انتقل إلى إعدادات الـ Firebase ↗' : 'Configure Firebase Settings ↗'}</span>
            </a>
          </motion.div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center opacity-60">
          <span className="text-[11px] font-bold text-[#002147] tracking-wider uppercase">
            {lang === 'ar' ? 'أكاديمية باسم الخليل' : 'Basim Al Khalil Digital Academy'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSimulateLogin = (email: string, role: UserRole) => {
    const mockUid = role === UserRole.ADMIN ? 'sim_admin_basim' : 'sim_student_user';
    const mockUser: any = {
      uid: mockUid,
      email: email,
      displayName: role === UserRole.ADMIN ? 'Basim Alkhalil' : 'Demo Student User',
      photoURL: role === UserRole.ADMIN 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' 
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      emailVerified: true
    };
    setCurrentUser(mockUser);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#002147] rounded-3xl animate-pulse mx-auto mb-4 border-2 border-[#C49E3A] flex items-center justify-center text-white font-black text-2xl">
            B
          </div>
          <p className="text-slate-500 font-medium whitespace-nowrap">
            {lang === 'ar' ? 'جارٍ التحميل...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    if (!showAuthScreen) {
      return (
        <LandingPage 
          lang={lang} 
          onToggleLang={() => setLang(l => l === 'ar' ? 'en' : 'ar')} 
          onGetStarted={() => setShowAuthScreen(true)} 
        />
      );
    }
    return (
      <LoginScreen 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'ar' ? 'en' : 'ar')} 
        onBackToLanding={() => setShowAuthScreen(false)}
        onSimulateLogin={handleSimulateLogin} 
      />
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#002147] rounded-3xl animate-pulse mx-auto mb-4 flex items-center justify-center text-white font-black text-2xl border-2 border-[#C49E3A] shadow-xl">
              B
            </div>
            <p className="text-slate-600 font-bold text-sm">
              {lang === 'ar' ? 'جارٍ تحميل الأكاديمية...' : 'Loading Academy...'}
            </p>
          </div>
        </div>
      }
    >
      <AuthenticatedApp 
        currentUser={currentUser} 
        initialLang={lang} 
        onSignOut={() => setCurrentUser(null)} 
      />
    </Suspense>
  );
}
