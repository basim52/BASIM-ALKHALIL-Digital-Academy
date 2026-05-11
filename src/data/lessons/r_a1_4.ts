
import { Lesson, proficiencyLevel } from "../../types";

export const familyConstellationsLesson: Lesson = {
  id: 'r_a1_4',
  title: "Family Constellations",
  titleAr: "تشكيلات العائلة",
  warmup: {
    mission: "Identify primary family members and understand basic kinship vocabulary in English.",
    missionAr: "التعرف على أفراد الأسرة الأساسيين وفهم مفردات القرابة البسيطة باللغة الإنجليزية.",
    objectives: [
      "Memorize basic family keywords (Father, Mother, Brother, Sister).",
      "Understand the difference between Nuclear and Extended family.",
      "Read simple descriptions of family relationships."
    ],
    objectivesAr: [
      "حفظ الكلمات الأساسية عن العائلة (أب، أم، أخ، أخت).",
      "فهم الفرق بين العائلة الصغيرة والعائلة الممتدة.",
      "قراءة أوصاف بسيطة لعلاقات العائلة."
    ]
  },
  readingText: {
    paragraphs: [
      {
        en: 'A nuclear family is usually small. It has a father, a mother, and their children. In many homes, brothers and sisters play together and help each other. My father is a teacher and my mother is a doctor.',
        ar: 'العائلة الصغيرة عادة ما تكون صغيرة. تتكون من أب وأم وأطفالهم. في العديد من المنازل، يلعب الإخوة والأخوات معاً ويساعدون بعضهم البعض. والدي معلم وأمي طبيبة.'
      },
      {
        en: 'An extended family includes more relatives. Your grandfather and grandmother are your parents\' parents. You might also have uncles, aunts, and cousins. It is wonderful to have a big family!',
        ar: 'العائلة الممتدة تشمل أقارب أكثر. جدك وجدتك هما والدا والديك. قد يكون لديك أيضاً أعمام وعمات وأبناء عمومة. من الرائع أن يكون لديك عائلة كبيرة!'
      }
    ]
  },
  vocabulary: [
    {
      word: 'Relative',
      phonetic: 'ˈrelətɪv',
      meaningAr: 'قريب (من العائلة)',
      example: 'I have many relatives in Cairo.'
    },
    {
      word: 'Sibling',
      phonetic: 'ˈsɪblɪŋ',
      meaningAr: 'شقيق (أخ أو أخت)',
      example: 'Do you have any siblings?'
    }
  ],
  quiz: [
    {
      question: "Who is your mother's sister?",
      questionAr: "من هي أخت أمك؟",
      options: ["Uncle", "Aunt", "Cousin", "Brother"],
      optionsAr: ["الخال", "الخالة", "ابن الخال", "الأخ"],
      correctIndex: 1,
      explanation: "Your mother's sister is your Aunt.",
      explanationAr: "أخت أمك هي خالتك (Aunt)."
    },
    {
      question: "What does 'Nuclear Family' mean?",
      questionAr: "ماذا تعني 'Nuclear Family'؟",
      options: ["A very large family", "Parents and children only", "Friends who live together", "People at work"],
      optionsAr: ["عائلة كبيرة جداً", "الوالدان والأطفال فقط", "أصدقاء يعيشون معاً", "أشخاص في العمل"],
      correctIndex: 1,
      explanation: "A nuclear family consists of parents and their children.",
      explanationAr: "تتكون العائلة الصغيرة من الوالدين وأطفالهم فقط."
    }
  ]
};
