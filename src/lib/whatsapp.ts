
export const generateWhatsAppLink = (phone: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  // Remove non-numeric characters from phone
  const cleanPhone = (phone || '').replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

export const NOTIFICATION_TEMPLATES = {
  ar: {
    lesson_reminder: (studentName: string, time: string) => 
      `مرحباً! نذكركم بموعد درس الطالب ${studentName} اليوم في تمام الساعة ${time}. نتمنى لكم درساً ممتعاً!`,
    booking_confirmed: (studentName: string, lessonTitle: string) =>
      `تم تأكيد حجز درس "${lessonTitle}" للطالب ${studentName}. بالتوفيق!`,
    absence_alert: (studentName: string) =>
      `عزيزي ولي الأمر، نلاحظ عدم دخول الطالب ${studentName} للدرس المقرر الان. يرجى المتابعة.`,
    encouragement: (parentName: string, studentName: string) =>
      `بطلنا ${studentName}! أنا فخور جداً بتقدمك في دروس اللغة. استمر في التألق! - (من: ${parentName})`
  },
  en: {
    lesson_reminder: (studentName: string, time: string) => 
      `Hello! Reminder for ${studentName}'s lesson today at ${time}. Have a great session!`,
    booking_confirmed: (studentName: string, lessonTitle: string) =>
      `Booking confirmed for "${lessonTitle}" for student ${studentName}. Good luck!`,
    absence_alert: (studentName: string) =>
      `Dear Parent, we noticed ${studentName} hasn't joined the scheduled lesson yet. Please check in.`,
    encouragement: (parentName: string, studentName: string) =>
      `Great job ${studentName}! I'm so proud of your progress. Keep shining! - Love, ${parentName}`
  }
};
