
import React, { useState } from 'react';
import { MessageCircle, Bell, Send, Heart, AlertTriangle, CheckCircle, Save, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { generateWhatsAppLink, NOTIFICATION_TEMPLATES } from '../lib/whatsapp';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

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
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-[#002147] flex items-center gap-3">
          <MessageCircle className="text-emerald-500" />
          {t.reminders}
        </h3>
        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
          WhatsApp Direct
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {/* Phone Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { type: 'parent', label: t.parentPhoneNumber, value: parentPhone, icon: Users },
            { type: 'student', label: t.studentPhoneNumber, value: studentPhone, icon: GraduationCap }
          ].map((item) => (
            <div key={item.type} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group min-h-[100px] flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">{item.label}</span>
              {editingType === item.type ? (
                <div className="flex flex-col gap-2">
                  <input 
                    type="text" 
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    placeholder={t.phoneNumberPlaceholder}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={savePhone} 
                      className="flex-1 bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={14} />
                      {isRtl ? 'حفظ رقم الواتساب' : 'Save WhatsApp Number'}
                    </button>
                    <button 
                      onClick={() => {
                        setEditingType(null);
                        setTempPhone('');
                      }} 
                      className="px-4 py-2 bg-slate-100 text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0 border border-slate-100">
                      <Phone size={14} />
                    </div>
                    <span className="font-bold text-[#002147] truncate">{item.value || '---'}</span>
                  </div>
                  <button 
                    onClick={() => startEditing(item.type as any)}
                    className="text-xs text-blue-600 font-black hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all shrink-0"
                  >
                    {item.value ? (isRtl ? 'تعديل' : 'Edit') : (isRtl ? 'إضافة' : 'Add')}
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
            <button 
              key={action.type}
              onClick={() => handleSend(action.type as any)}
              className={`w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl ${action.hoverClass} transition-all group shadow-sm flex-1 min-w-0`}
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
          ))}
        </div>
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
