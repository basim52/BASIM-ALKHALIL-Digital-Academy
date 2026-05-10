import { Lesson } from "../../types";

export const personalInfoA1: Lesson = {
  id: 'w_a1_4',
  title: 'Personal Information',
  titleAr: 'المعلومات الشخصية',
  slides: [
    { id: 's1', type: 'intro', content: 'Learning how to write your name, address, and age is essential for many forms.', contentAr: 'تعلم كيفية كتابة اسمك وعنوانك وعمرك هو أمر ضروري للعديد من النماذج.' },
    { id: 's2', type: 'vocabulary', content: 'First Name, Surname (Last Name), Date of Birth, Nationality.', contentAr: 'الاسم الأول، اللقب، تاريخ الميلاد، الجنسية.' },
    { id: 's3', type: 'exercise', question: 'What does "DOB" stand for on a form?', questionAr: 'إلى ماذا يرمز "DOB" في النموذج؟', options: ['Date of Birth', 'Day of Blue', 'Department of Business', 'Drive on Bottom'], correctIndex: 0 }
  ]
};
