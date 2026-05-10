import { Lesson } from "../../types";

export const shortEmailsA2: Lesson = {
  id: 'w_a2_4',
  title: 'Short Emails',
  titleAr: 'رسائل بريد إلكتروني قصيرة',
  slides: [
    { id: 's1', type: 'intro', content: 'Writing a basic email involves a greeting, main message, and a closing.', contentAr: 'تتضمن كتابة البريد الإلكتروني الأساسي تحية ورسالة رئيسية وخاتمة.' },
    { id: 's2', type: 'vocabulary', content: 'Dear (greeting), Regards (closing), Subject Line, Attachment.', contentAr: 'عزيزي، تحياتي، عنوان الموضوع، مرفق.' },
    { id: 's3', type: 'exercise', question: 'Which of these is a common informal greeting?', questionAr: 'أي من هذه تحية غير رسمية شائعة؟', options: ['Sincerely', 'Hi!', 'To whom it may concern', 'Yours faithfully'], correctIndex: 1 }
  ]
};
