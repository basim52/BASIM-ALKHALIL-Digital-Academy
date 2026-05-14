
import React from 'react';
import { translations, Language } from '../lib/translations';

interface ShareableNotificationProps {
  lang: Language;
  studentName: string;
  message: string;
  type: string;
  id?: string;
}

export const ShareableNotification = ({ lang, studentName, message, type, id = "shareable-card" }: ShareableNotificationProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  return (
    <div 
      id={id}
      className={`w-[600px] p-12 rounded-[3rem] border-[12px] shadow-2xl relative overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}
      style={{ 
        direction: isRtl ? 'rtl' : 'ltr',
        backgroundColor: '#ffffff',
        borderColor: '#ecfdf5'
      }}
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" style={{ backgroundColor: '#ecfdf5' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" style={{ backgroundColor: '#eff6ff' }} />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12 relative z-10 border-b-2 pb-8" style={{ borderBottomColor: '#d1fae5' }}>
        <div>
          <h1 className="text-3xl font-black tracking-tight m-0" style={{ color: '#002147' }}>
            {t.academyName}
          </h1>
          <p className="font-bold uppercase tracking-[0.2em] text-xs mt-1" style={{ color: '#10b981' }}>
            {t.academySubName}
          </p>
        </div>
        <div className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl" style={{ backgroundColor: '#002147', boxShadow: '0 20px 25px -5px rgba(0, 33, 71, 0.2)' }}>
          <span className="text-white text-2xl font-black italic">B</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mb-12">
        <div className="inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border" style={{ backgroundColor: '#d1fae5', color: '#047857', borderColor: '#a7f3d0' }}>
          {type === 'encouragement' ? (isRtl ? 'رسالة تشجيعية' : 'Encouragement') : (isRtl ? 'تنبيه أكاديمي' : 'Academic Alert')}
        </div>
        
        <h2 className="text-4xl font-black leading-tight mb-8" style={{ color: '#1e293b' }}>
          {studentName}
        </h2>
        
        <div className="p-8 rounded-[2rem] border relative" style={{ backgroundColor: '#f8fafc', borderColor: '#f1f5f9' }}>
           <svg className="absolute top-4 left-4 w-12 h-12 -scale-x-1" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#f1f5f9' }}>
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 12.1046 13.1216 13 12.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V5C10.017 4.44772 10.4647 4 11.017 4H19.017C20.6738 4 22.017 5.34315 22.017 7V15C22.017 16.6569 20.6738 18 19.017 18H16.017C15.4647 18 15.017 18.4477 15.017 19V21H14.017ZM4.017 21L4.017 18C4.017 16.8954 4.9124 16 6.017 16H9.017C9.56931 16 10.017 15.5523 10.017 15V9C10.017 8.44772 9.56931 8 9.017 8H5.017C4.46474 8 4.017 8.44772 4.017 9V11C4.017 12.1046 3.1216 13 2.017 13H1.017C0.464741 13 0.0170068 12.5523 0.0170068 12V5C0.0170068 4.44772 0.464741 4 1.017 4H9.017C10.6738 4 12.017 5.34315 12.017 7V15C12.017 16.6569 10.6738 18 9.017 18H6.017C5.46474 18 5.017 18.4477 5.017 19V21H4.017Z" />
          </svg>
          <p className="text-2xl font-bold leading-relaxed relative z-10" style={{ color: '#334155' }}>
            {message}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: '#10b981' }} />
          <span className="text-[10px] font-black uppercase tracking-widest leading-none" style={{ color: '#94a3b8' }}>
            Verification: {new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#10b981' }}>
            {isRtl ? 'نحو لغة أفضل' : 'Towards Better Language'}
          </span>
          <div className="text-xl font-black" style={{ color: '#002147' }}>BKD ACADEMY</div>
        </div>
      </div>
    </div>
  );
};
