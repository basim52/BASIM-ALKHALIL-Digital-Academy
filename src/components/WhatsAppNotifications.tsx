
import React, { useState, useRef } from 'react';
import { MessageCircle, Bell, Send, Heart, AlertTriangle, CheckCircle, Save, Phone, PenTool, Image as ImageIcon, Download, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { generateWhatsAppLink, NOTIFICATION_TEMPLATES } from '../lib/whatsapp';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import { ShareableNotification } from './ShareableNotification';

interface WhatsAppNotificationsProps {
  lang: Language;
  studentId: string;
  studentName: string;
  parentPhone?: string;
  studentPhone?: string;
  onUpdatePhone: (type: 'parent' | 'student', phone: string) => void;
}

export const WhatsAppNotifications = ({ 
  lang, 
  studentId, 
  studentName, 
  parentPhone = '', 
  studentPhone = '',
  onUpdatePhone
}: WhatsAppNotificationsProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [editingType, setEditingType] = useState<'parent' | 'student' | null>(null);
  const [tempPhone, setTempPhone] = useState('');

  const handleSend = (type: 'lesson_reminder' | 'booking_confirmed' | 'absence_alert' | 'encouragement') => {
    let message = '';
    const phone = (type === 'encouragement' || type === 'absence_alert') ? parentPhone : studentPhone || parentPhone;
    
    if (!phone) {
      alert(isRtl ? 'يرجى إضافة رقم الهاتف أولاً' : 'Please add a phone number first');
      return;
    }

    switch (type) {
      case 'lesson_reminder':
        message = NOTIFICATION_TEMPLATES[lang].lesson_reminder(studentName, '10:00 AM');
        break;
      case 'booking_confirmed':
        message = NOTIFICATION_TEMPLATES[lang].booking_confirmed(studentName, 'Reading Curriculum - Level A1');
        break;
      case 'absence_alert':
        message = NOTIFICATION_TEMPLATES[lang].absence_alert(studentName);
        break;
      case 'encouragement':
        message = NOTIFICATION_TEMPLATES[lang].encouragement('Parent', studentName);
        break;
    }

    const link = generateWhatsAppLink(phone, message);
    window.open(link, '_blank');
  };

  const startEditing = (type: 'parent' | 'student') => {
    setEditingType(type);
    setTempPhone(type === 'parent' ? parentPhone : studentPhone);
  };

  const savePhone = () => {
    if (editingType) {
      onUpdatePhone(editingType, tempPhone);
      setEditingType(null);
      // Show short feedback
      setSavedFeedback(editingType);
      setTimeout(() => setSavedFeedback(null), 3000);
    }
  };

  const [savedFeedback, setSavedFeedback] = useState<'parent' | 'student' | null>(null);
  const [sharingImage, setSharingImage] = useState<string | null>(null);
  const [sharingData, setSharingData] = useState<{ studentName: string, message: string, type: string } | null>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  const handleShareImage = async (type: 'lesson_reminder' | 'booking_confirmed' | 'absence_alert' | 'encouragement') => {
    let message = '';
    switch (type) {
      case 'lesson_reminder':
        message = NOTIFICATION_TEMPLATES[lang].lesson_reminder(studentName, '10:00 AM');
        break;
      case 'booking_confirmed':
        message = NOTIFICATION_TEMPLATES[lang].booking_confirmed(studentName, 'Reading Curriculum - Level A1');
        break;
      case 'absence_alert':
        message = NOTIFICATION_TEMPLATES[lang].absence_alert(studentName);
        break;
      case 'encouragement':
        message = NOTIFICATION_TEMPLATES[lang].encouragement('Parent', studentName);
        break;
    }

    setSharingData({ studentName, message, type });
    
    // Small delay to ensure DOM is updated and fonts are loaded
    setTimeout(async () => {
      const element = document.getElementById('shareable-card');
      if (element) {
        try {
          const canvas = await html2canvas(element, {
            useCORS: true,
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
              const el = clonedDoc.getElementById('shareable-card');
              if (el) {
                el.style.display = 'block';
              }
              // Remove oklch from styles to prevent parser error
              const styles = clonedDoc.getElementsByTagName('style');
              for (let i = 0; i < styles.length; i++) {
                const style = styles[i];
                if (style.innerHTML.includes('oklch')) {
                  // Carefully replace oklch patterns or just remove the offending rules
                  // Simplest: remove style tags that use oklch if they are purely tailwind-generated
                  // but we need tailwind for layout in other parts? 
                  // No, I moved layout to inline styles in ShareableNotification.
                  style.innerHTML = style.innerHTML.replace(/oklch\([^)]+\)/g, '#cccccc');
                }
              }
            }
          });
          
          const dataUrl = canvas.toDataURL('image/png');
          
          // Try Web Share API if supported
          if (navigator.share && navigator.canShare) {
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], `BKD-Academy-${type}.png`, { type: 'image/png' });
            
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: isRtl ? 'رسالة من الأكاديمية' : 'Academy Message',
                text: message
              });
              setSharingData(null);
              return;
            }
          }

          // Fallback: Download
          const link = document.createElement('a');
          link.download = `BKD-Academy-${type}.png`;
          link.href = dataUrl;
          link.click();
          
          setSharingData(null);
          alert(isRtl ? 'تم تحميل الصورة بنجاح! يمكنك الآن مشاركتها عبر واتساب.' : 'Image downloaded! You can now share it on WhatsApp.');
        } catch (err) {
          console.error("Capture error:", err);
          setSharingData(null);
        }
      }
    }, 300);
  };

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-slate-200 shadow-xl flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10 relative z-10 gap-4">
        <h3 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MessageCircle size={24} />
          </div>
          {t.reminders}
        </h3>
        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          WhatsApp Cloud
        </div>
      </div>

      <div className="space-y-8 mb-10 relative z-10">
        {/* Phone Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { type: 'parent', label: t.parentPhoneNumber, value: parentPhone, icon: Users, color: 'emerald' },
            { type: 'student', label: t.studentPhoneNumber, value: studentPhone, icon: GraduationCap, color: 'blue' }
          ].map((item) => (
            <div key={item.type} className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col justify-center relative overflow-hidden ${editingType === item.type ? 'bg-white border-emerald-500 shadow-xl' : 'bg-slate-50 border-transparent shadow-sm hover:border-slate-200'}`}>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">{item.label}</span>
              
              {editingType === item.type ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      placeholder="+9665..."
                      className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-mono font-bold"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={savePhone} 
                      className="flex-1 bg-emerald-500 text-white px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Save size={16} />
                      {isRtl ? 'حفظ الآن' : 'Save Now'}
                    </button>
                    <button 
                      onClick={() => {
                        setEditingType(null);
                        setTempPhone('');
                      }} 
                      className="px-6 bg-slate-100 text-slate-400 rounded-2xl text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center group">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-all ${item.value ? 'bg-white text-emerald-500 border border-emerald-100' : 'bg-white text-slate-300 border border-slate-100'}`}>
                      {savedFeedback === item.type ? <CheckCircle className="animate-bounce" size={24} /> : <Phone size={20} />}
                    </div>
                    <div className="truncate">
                      <span className={`block font-mono text-lg font-black tracking-tight ${item.value ? 'text-[#002147]' : 'text-slate-300 italic'}`}>
                        {item.value || '--- --- ---'}
                      </span>
                      {savedFeedback === item.type && (
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest"
                        >
                          {isRtl ? 'تم الحفظ بنجاح ✓' : 'Saved Successfully ✓'}
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => startEditing(item.type as any)}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-[#002147] hover:text-white hover:border-[#002147] transition-all shadow-sm"
                  >
                    {item.value ? <PenTool size={16} /> : <Phone size={16} />}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
          {[
            { type: 'lesson_reminder', icon: Bell, label: t.remindLesson, desc: t.reminderSentText, color: 'emerald', hoverClass: 'hover:border-emerald-500', iconBg: 'bg-emerald-50', iconText: 'text-emerald-600', sendHover: 'group-hover:text-emerald-500' },
            { type: 'encouragement', icon: Heart, label: t.sendEncouragement, desc: t.encouragementSentText, color: 'pink', hoverClass: 'hover:border-pink-500', iconBg: 'bg-pink-50', iconText: 'text-pink-600', sendHover: 'group-hover:text-pink-500' },
            { type: 'absence_alert', icon: AlertTriangle, label: t.absenceAlert, desc: isRtl ? 'تنبيه غياب الطالب عن الحصة' : 'Alert for student absence', color: 'amber', hoverClass: 'hover:border-amber-500', iconBg: 'bg-amber-50', iconText: 'text-amber-600', sendHover: 'group-hover:text-amber-500' },
            { type: 'booking_confirmed', icon: CheckCircle, label: t.bookingAlert, desc: isRtl ? 'تأكيد حجز الحصة الجديدة' : 'Confirming new lesson booking', color: 'blue', hoverClass: 'hover:border-blue-500', iconBg: 'bg-blue-50', iconText: 'text-blue-600', sendHover: 'group-hover:text-blue-500' }
          ].map((action) => (
            <div key={action.type} className="flex gap-2">
              <button 
                onClick={() => handleSend(action.type as any)}
                className={`flex-1 flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl ${action.hoverClass} transition-all group shadow-sm min-w-0`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 ${action.iconBg} ${action.iconText} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
                    <action.icon size={20} />
                  </div>
                  <div className={`${isRtl ? 'text-right' : 'text-left'} truncate flex-1 min-w-0`}>
                    <p className="font-bold text-[#002147] text-sm truncate">{action.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{action.desc}</p>
                  </div>
                </div>
                <Send size={18} className={`text-slate-200 ${action.sendHover} transition-all ml-2 group-hover:translate-x-${isRtl ? '-1' : '1'} shrink-0`} />
              </button>
              
              <button 
                onClick={() => handleShareImage(action.type as any)}
                className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm shrink-0"
                title={isRtl ? 'مشاركة بصورة' : 'Share as image'}
              >
                <ImageIcon size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden Card for Capture */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {sharingData && (
          <ShareableNotification 
            lang={lang} 
            studentName={sharingData.studentName} 
            message={sharingData.message} 
            type={sharingData.type}
            id="shareable-card"
          />
        )}
      </div>

      <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-[10px] text-slate-500 leading-relaxed">
        {isRtl 
          ? '* نظام التنبيهات يقوم بتوليد رسائل مخصصة وفتح تطبيق واتساب للإرسال المباشر لضمان الخصوصية والفعالية.' 
          : '* The notification system generates custom messages and opens WhatsApp for direct sending to ensure privacy and effectiveness.'}
      </div>
    </div>
  );
};

import { GraduationCap, Users } from 'lucide-react';
