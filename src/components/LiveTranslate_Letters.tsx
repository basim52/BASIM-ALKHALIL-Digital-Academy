import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Sparkles, Check, AlertCircle, RefreshCw, BookOpen } from 'lucide-react';
import { GoldCard, LessonTile, PrimaryButton, GhostButton, AnswerOption, ProgressPill } from './ui/academy';

interface LiveTranslateLettersProps {
  isRtl: boolean;
  targetLang: string;
  onPlayChime: (type: 'open' | 'message' | 'close' | 'think' | 'success') => void;
  speakText: (text: string, langCode: string) => void;
}

interface LetterData {
  char: string;
  ipa: string;
  exampleWord: string;
  exampleMeaning: string;
  arabicTip: string;
  description: string;
}

// Letter definitions for live languages
const LANGUAGE_ALPHABETS: Record<string, LetterData[]> = {
  en: [
    { char: "A", ipa: "/eɪ/", exampleWord: "Apple", exampleMeaning: "تفاحة", arabicTip: "ينطق كالألف الممدودة المرقّقة في العربية.", description: "حرف متحرك أساسي يختلف نطقه بحسب الكلمة (قصير أو طويل)." },
    { char: "C", ipa: "/siː/", exampleWord: "Cat / City", exampleMeaning: "قطة / مدينة", arabicTip: "ينطق 'س' إذا تلاه (e, i, y)، وغير ذلك ينطق 'ك'.", description: "حرف ينطق بكيفيتين منفصلتين تماماً." },
    { char: "G", ipa: "/dʒiː/", exampleWord: "Garden / Gym", exampleMeaning: "حديقة / صالة رياضة", arabicTip: "ينطق كالجيم المصرية المغلقة أو الجيم الشامية المعطشة.", description: "حرف ساكن ذو نغمتين صوتيتين." },
    { char: "H", ipa: "/eɪtʃ/", exampleWord: "House", exampleMeaning: "منزل", arabicTip: "ينطق دائماً مثل حرف 'الهاء' في العربية.", description: "لا ينطق أحياناً عندما يقع في بداية بعض الكلمات الفرنسية الأصل كـ 'Hour'." },
    { char: "J", ipa: "/dʒeɪ/", exampleWord: "Joy", exampleMeaning: "فرح", arabicTip: "ينطق كالجيم المعطشة الفصيحة بدقة مع دمج حرف دال خفيف قبله.", description: "حرف ساكن قوي ينطق بتردد صوتي عميق." },
    { char: "P", ipa: "/piː/", exampleWord: "Pen", exampleMeaning: "قلم حبر", arabicTip: "حرف تفجيري يخرج بهواء نقي من الشفتين وليس كـ 'ب' العربية.", description: "يجب حبس الهواء ثم إطلاقه فجأة لإحداث الصوت الصحيح." },
    { char: "R", ipa: "/ɑːr/", exampleWord: "Rain", exampleMeaning: "مطر", arabicTip: "ينطق بضم الشفتين قليلاً ودون تكرار اللسان (لا تكرره كباء الراء العربية).", description: "اللسان يرتفع نحو سقف الحلق دون ملامسته مباشرة." },
    { char: "TH", ipa: "/θ/ or /ð/", exampleWord: "Think / This", exampleMeaning: "يفكر / هذا", arabicTip: "ينطق مثل حرف 'الثاء' أو حرف 'الذال' بإخراج طرف اللسان.", description: "تركيبة ثنائية هامة جداً للفظ السليم وتعتمد على سياق الكلمة." },
    { char: "V", ipa: "/viː/", exampleWord: "Voice", exampleMeaning: "صوت", arabicTip: "ينطق بإطباق الأسنان العلوية على الشفة السفلية (كالفاء المجهورة).", description: "صوت اهتزازي رنان يفرق تماماً عن حرف الـ 'F'." }
  ],
  es: [
    { char: "A", ipa: "/a/", exampleWord: "Amigo", exampleMeaning: "صديق", arabicTip: "ينطق كالألف الصريحة المفخخة قليلاً مثل 'آ' في العربية.", description: "صوت عريض ومفتوح ومستقر دوماً." },
    { char: "CH", ipa: "/tʃ/", exampleWord: "Chico", exampleMeaning: "ولد / صغير", arabicTip: "ينطق كالمزيج بين التاء والشين (تش) مثل الدارجة الشامية.", description: "كان يعتبر حرفاً منفرداً في الأبجدية الإسبانية الكلاسيكية." },
    { char: "H", ipa: "silent", exampleWord: "Hola", exampleMeaning: "مرحباً", arabicTip: "صامت تماماً ولا ينطق مطلقاً في أي كلمة علمية أو يومية.", description: "حرف يكتب للضبط التاريخي للكلمة دون أي نطق صوتي." },
    { char: "J", ipa: "/x/", exampleWord: "Jardín", exampleMeaning: "حديقة", arabicTip: "ينطق بقوة كحرف 'الخاء' الفصيح تماماً مثل العربية.", description: "صوت حلقي احتكاكي يضفي الخصوصية على اللفظ الإسباني." },
    { char: "LL", ipa: "/ʝ/ or /ʎ/", exampleWord: "Lluvia", exampleMeaning: "مطر", arabicTip: "ينطق كحرف 'الياء' المشددة أو كالجيم الشامية الناعمة.", description: "حرف مكرر يتغير لفظه الدارج بين دول أمريكا اللاتينية وإسبانيا." },
    { char: "Ñ", ipa: "/ɲ/", exampleWord: "Niño", exampleMeaning: "طفل", arabicTip: "ينطق مثل دمج النون مع الياء (نيـ) كلفظة 'نيو' السريعة.", description: "رمز اللغة الإسبانية وعلامتها المميزة والفريدة." },
    { char: "R", ipa: "/ɾ/ or /r/", exampleWord: "Rojo / Perro", exampleMeaning: "أحمر / كلب", arabicTip: "راء مرتعشة تهتز في طرف اللسان بقوة وتكرار مميز.", description: "الراء المفردة خفيفة، والمزدوجة (RR) أو في بداية الكلمة تكون مشددة ومرتعشة." },
    { char: "Z", ipa: "/θ/ or /s/", exampleWord: "Zapato", exampleMeaning: "حذاء", arabicTip: "في إسبانيا ينطق 'ثاء' صريحة، وفي أمريكا اللاتينية ينطق 'سين'.", description: "تغير اللهجات الإسبانية الشهير يتركز بوضوح في هذا الحرف." }
  ],
  fr: [
    { char: "Ç", ipa: "/s/", exampleWord: "Garçon", exampleMeaning: "ولد", arabicTip: "السيديللا (الذيل الصغير تحت C) تجعله ينطق 'سين' دائماً حتى لو تلاه حرف صلب.", description: "يوضع تحت حرف C للحفاظ على نعومة نطق الصوت كـ S." },
    { char: "E / É", ipa: "/ə/ or /e/", exampleWord: "École", exampleMeaning: "مدرسة", arabicTip: "العلامات الفوقية (اللكنات) تغير مخرج الصوت بين الفتح الخفيف والضم.", description: "الحركات الفرنسية لتحديد المقاطع ونسب لفظ الحروف المتحركة." },
    { char: "H", ipa: "silent", exampleWord: "Homme", exampleMeaning: "رجل", arabicTip: "صامت كلياً ولكنه ينقسم إلى 'H صامتة' تسمح بالوصل اللغوي وأخرى 'H منطوقة بالمنع' تمنعه.", description: "حرف صامت تاريخي يحدد كيفية الوصل مع الكلمة التالية." },
    { char: "J", ipa: "/ʒ/", exampleWord: "Jour", exampleMeaning: "يوم", arabicTip: "ينطق كالجيم الشامية الناعمة جداً (بدون دال تفجير قبله).", description: "صوت احتكاكي ناعم يمنح الفرنسية موسيقاها المشهورة." },
    { char: "OI", ipa: "/wa/", exampleWord: "Roi", exampleMeaning: "ملك", arabicTip: "ينطق مثل مقطع 'وا' بدمج الواو المفتوحة مع الألف سريعة النطق.", description: "إحدى أشهر الثنائيات الصوتية المركبة بالفرنسية." },
    { char: "OU", ipa: "/u/", exampleWord: "Oui / Rouge", exampleMeaning: "نعم / أحمر", arabicTip: "ينطق كواو المد العربية المضمومة شفاهياً بإحكام شديد.", description: "ثنائي صوتي يمثل الحركة الضمية العميقة." },
    { char: "R", ipa: "/ʁ/", exampleWord: "Paris", exampleMeaning: "باريس", arabicTip: "ينطق كحرف 'الغين' العربية الناعمة من أقصى الحلق دون جرح للحنجرة.", description: "علامة النطق السليم الأكثر شهرة وسحراً في اللغة الفرنسية." }
  ],
  de: [
    { char: "Ä", ipa: "/ɛː/", exampleWord: "Äpfel", exampleMeaning: "تفاح (جمع)", arabicTip: "الأوملاوت تجعله ينطق كألف مائلة للكسر 'إيه' عريضة.", description: "حرف أوملاوت صوتي يغير صياغة الجمع والتصريف اللغوي." },
    { char: "Ö", ipa: "/øː/", exampleWord: "Öl", exampleMeaning: "زيت", arabicTip: "انطق حرف 'إي' مع جعل شفتيك مضمومتين بشكل كروي من الخارج.", description: "صوت متحرك وسيط يحتاج تركيزاً لضبط المخارج بدقة." },
    { char: "Ü", ipa: "/yː/", exampleWord: "Übung", exampleMeaning: "تمرين", arabicTip: "انطق حرف 'يا' مع جعل شفتيك مضمومتين تماماً للداخل.", description: "صوت متحرك ألماني شهير يضفي وزناً صوتياً فخيماً للكلمات." },
    { char: "ß", ipa: "/s/", exampleWord: "Straße", exampleMeaning: "شارع", arabicTip: "ينطق كحرف 'السين' المشدد تماماً، ولا يقع في بداية الكلمات أبداً.", description: "رمز الإس-تست (Eszett) الفريد للغة الألمانية للحروف الساكنة." },
    { char: "CH", ipa: "/ç/ or /x/", exampleWord: "Ich / Buch", exampleMeaning: "أنا / كتاب", arabicTip: "بعد الحروف اللينة ينطق كـ 'ش' فلسطينية ناعمة، وبعد الحروف الصلبة ينطق 'خ'.", description: "قاعـدة نطق هامة تعتمد على ما يسبق الثنائي الساكن مباشرة." },
    { char: "J", ipa: "/j/", exampleWord: "Ja", exampleMeaning: "نعم", arabicTip: "ينطق دائماً كحرف 'الياء' المفتوحة في اللغة العربية وليس كالجيم.", description: "حرف ساكن يتطابق وظيفياً وصوتياً مع النطق اليدوي للياء." },
    { char: "V", ipa: "/f/", exampleWord: "Vater", exampleMeaning: "أب", arabicTip: "ينطق بقوة كحرف 'الفاء' العربية الصريحة في الغالبية العظمى.", description: "الحرف الذي يتنكر بصوت الفاء في معظم الكلمات الألمانية الأصل." },
    { char: "W", ipa: "/v/", exampleWord: "Wasser", exampleMeaning: "ماء", arabicTip: "ينطق دائماً وأبداً كحرف الـ 'V' الإنجليزي (فاء مجهورة بالاهتزاز).", description: "يختلف جذرياً عن نطق الواو الإنجليزية، فهو احتكاكي رنان." }
  ],
  tr: [
    { char: "Ç", ipa: "/tʃ/", exampleWord: "Çay", exampleMeaning: "شاي", arabicTip: "ينطق 'تش' بجمعه بين التاء والشين مثل الإنجليزية الصريحة.", description: "حرف سهل ذو نبرة سريعة في الكلمات اليومية." },
    { char: "Ğ", ipa: "silent or lengthening", exampleWord: "Ağaç", exampleMeaning: "شجرة", arabicTip: "يسمى 'غين خفيفة' ولكنه في الغالب صامت يقوم بتمديد الصوت المتحرك الذي قبله.", description: "لا يأتي أبداً في بداية الكلمة بل يقع بين الحروف لضبط الإيقاع." },
    { char: "I", ipa: "/ɯ/", exampleWord: "Ilık", exampleMeaning: "دافئ", arabicTip: "حرف بدون نقطة ينطق بضم اللسان للخلف دون استخدام الشفتين (صوت غليظ قريب من الكسرة الثقيلة).", description: "يمثل تحدياً طفيفاً ويميز الكلمات التركية الأصلية بقوة." },
    { char: "İ", ipa: "/i/", exampleWord: "İyi", exampleMeaning: "جيد / بخير", arabicTip: "حرف كبير بنقطة، ينطق دائماً كياء المد الخفيفة أو الكسرة الناعمة.", description: "يقابل الحرف الخالي من النقطة ويكتب منقطاً بالحالين (كبيراً وصغيراً)." },
    { char: "Ş", ipa: "/ʃ/", exampleWord: "Şeker", exampleMeaning: "سكر", arabicTip: "ينطق كحرف 'الشين' العربي الفصيح تماماً دون أي تعقيد.", description: "أحد أسهل الحروف التركية وأكثرها استخداماً في المعجم المشترك." }
  ],
  ja: [
    { char: "あ (A)", ipa: "/a/", exampleWord: "Ame (雨)", exampleMeaning: "مطر", arabicTip: "ألف مفتوحة رشيقة تلفظ على الفور.", description: "أول حروف الهيراغانا والأساس للنطق الياباني الصافي." },
    { char: "し (Shi)", ipa: "/ɕi/", exampleWord: "Shiro (白)", exampleMeaning: "أبيض", arabicTip: "شين مكسورة ناعمة تخرج برقة من مقدمة الفم.", description: "ينتمي لعائلة حرف S ولكنه يتحول صوتياً ليصبح شائساً." },
    { char: "つ (Tsu)", ipa: "/tsɯ/", exampleWord: "Tsunami (津波)", exampleMeaning: "تسونامي / موجة عاتية", arabicTip: "مزيج سريع وصامت بين التاء والسين معاً (تسـ) دفعة واحدة.", description: "مقطع صوتي مميز جداً يتطلب إغلاق الأسنان للحظة قبل اللفظ." },
    { char: "ん (N)", ipa: "/ɴ/", exampleWord: "Nihon (日本)", exampleMeaning: "اليابان", arabicTip: "غنة أنفية واضحة تشبه نون التنوين الساكنة بالعربية في أواخر الكلمات.", description: "الحرف الساكن الوحيد بالهيراغانا الذي يلفظ مفرداً دون تلو متحرك." },
    { char: "R-Line (ら)", ipa: "/ɺ/", exampleWord: "Ringo (林檎)", exampleMeaning: "تفاح", arabicTip: "صوت وسيط ذكي ومدهش يقع تماماً بين الراء واللام ودال خفيفة.", description: "لا تنطقه راء تكرارية ولا لامًا صلبة؛ بل دع لسانك يضرب سقف حلقك ضربة واحدة." }
  ]
};

export function LiveTranslate_Letters({ isRtl, targetLang, onPlayChime, speakText }: LiveTranslateLettersProps) {
  const letters = LANGUAGE_ALPHABETS[targetLang] || LANGUAGE_ALPHABETS['en'];
  const [selectedLetter, setSelectedLetter] = useState<LetterData | null>(null);

  // Challenge game inside letters
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState<{
    question: string;
    correctChar: string;
    options: string[];
    userAnswer: string | null;
  } | null>(null);

  const startNewQuiz = () => {
    if (letters.length < 3) return;
    onPlayChime('think');
    
    // Choose a random letter to be the correct answer
    const randomIndex = Math.floor(Math.random() * letters.length);
    const correctLetter = letters[randomIndex];

    // Get 3 random unique options including correct letter
    const optionsSet = new Set<string>();
    optionsSet.add(correctLetter.char);
    
    while (optionsSet.size < Math.min(letters.length, 4)) {
      const optIdx = Math.floor(Math.random() * letters.length);
      optionsSet.add(letters[optIdx].char);
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    // Dynamic question in Arabic or English
    const questionsPool = [
      `أي حرف ينتمي للرمز الصوتي واللفظي: ${correctLetter.ipa}؟`,
      `أي حرف يستخدم لنطق الكلمة النموذجية: "${correctLetter.exampleWord}" (${correctLetter.exampleMeaning})؟`,
      `ما هو الحرف الذي يتميز بوصفه: "${correctLetter.arabicTip.substring(0, 40)}..."؟`
    ];
    const question = questionsPool[Math.floor(Math.random() * questionsPool.length)];

    setCurrentQuiz({
      question,
      correctChar: correctLetter.char,
      options,
      userAnswer: null
    });
  };

  const handleAnswerOption = (option: string) => {
    if (!currentQuiz || currentQuiz.userAnswer) return;

    const isCorrect = option === currentQuiz.correctChar;
    setCurrentQuiz({
      ...currentQuiz,
      userAnswer: option
    });

    if (isCorrect) {
      setQuizScore(prev => prev + 15);
      onPlayChime('success');
    } else {
      onPlayChime('close');
    }
  };

  const t = (ar: string, en: string) => (isRtl ? ar : en);

  return (
    <div className="space-y-6">
      {/* Intro section */}
      <GoldCard className="p-5 sm:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 text-right">
            <ProgressPill>
              <Sparkles size={12} />
              <span>{t('حروف اللغة والأنغام الفونيمية الكلاسيكية', 'Phoneme Harmony & Alphabet')}</span>
            </ProgressPill>
            <h3 className="text-lg sm:text-xl font-black text-[#002147] tracking-tight leading-snug">
              {t('مستودع الحروف والأصوات الحية 🔠', 'Interactive Alphabets & Phonetics 🔠')}
            </h3>
            <p className="text-xs sm:text-sm text-[#002147]/75 leading-relaxed font-medium max-w-xl">
              {t(
                'استكشف الحروف الحية للغات العالمية ومخارج اللسان الفونيتيكية. استمع بوضوح تام، واكتشف النبر القياسي لتعزيز طلاقة نطقك وخروج الصوت السليم.',
                'Click any letter to trigger localized speech, explore phonetic IPA charts, and master precise mouth positions developed by expert linguists.'
              )}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl text-center min-w-[120px] shrink-0">
            <span className="text-2xl">🎓</span>
            <span className="text-[#002147] text-xs font-black mt-1 block">
              {t('علم الفونيمات', 'Phonetic Science')}
            </span>
            <span className="text-[#C49E3A] text-[10px] font-mono font-bold mt-0.5">
              {t('تفاعل فوري مبارز', 'Standard IPA guide')}
            </span>
          </div>
        </div>
      </GoldCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: letter matrix (3 columns on mobile) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-xs font-black text-[#002147] tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-[#002147] rounded"></span>
              {t('مصفوفة الحروف والنطق الصوتي:', 'Letter Matrix & Phonetics:')}
            </h4>
            <ProgressPill>
              {letters.length} {t('عناصر صوتية رئيسية', 'Key sounds')}
            </ProgressPill>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {letters.map((letItem, idx) => {
              const isSelected = selectedLetter?.char === letItem.char;
              return (
                <div
                  key={letItem.char}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedLetter(letItem);
                    speakText(letItem.char, targetLang);
                    onPlayChime('message');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedLetter(letItem);
                      speakText(letItem.char, targetLang);
                      onPlayChime('message');
                    }
                  }}
                  className={`w-full flex items-center justify-between gap-1.5 px-2 py-2 sm:px-2.5 sm:py-2.5 rounded-2xl border text-start transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer ${
                    isSelected
                      ? 'bg-[#fdfaf3] border-[#C49E3A] ring-2 ring-[#C49E3A]/40 shadow-sm'
                      : 'bg-white border-[#C49E3A]/40 hover:border-[#C49E3A] shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                    <span className="w-6 h-6 rounded-full bg-[#002147] text-[#E6C36A] text-[11px] font-black flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs sm:text-sm font-black text-[#002147] truncate">
                        {letItem.char}
                      </span>
                      <span dir="ltr" className="block text-[10px] sm:text-[11px] font-bold text-[#002147]/65 truncate">
                        {letItem.ipa} • {letItem.exampleWord}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(letItem.exampleWord, targetLang);
                    }}
                    className="w-6 h-6 rounded-lg bg-[#C49E3A]/20 hover:bg-[#C49E3A] text-[#002147] flex items-center justify-center transition-colors shrink-0"
                    title={`Play ${letItem.exampleWord}`}
                    aria-label={`Play ${letItem.exampleWord}`}
                  >
                    <Volume2 size={12} className="text-[#002147]" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: active letter detail Card & gamification */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main detail card */}
          <AnimatePresence mode="wait">
            {selectedLetter ? (
              <motion.div
                key={selectedLetter.char}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GoldCard className="p-5 sm:p-6 text-right space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C49E3A]/20 pb-3">
                    <ProgressPill>
                      {selectedLetter.ipa} - {t('الرمز الفونيتيكي', 'IPA Symbol')}
                    </ProgressPill>
                    <PrimaryButton
                      onClick={() => speakText(selectedLetter.char, targetLang)}
                      className="!px-3 !py-1.5 !min-h-[36px] !text-xs"
                    >
                      <Volume2 size={13} />
                      <span>{t('اسمع الحرف 🎙️', 'Hear Letter 🎙️')}</span>
                    </PrimaryButton>
                  </div>

                  <div className="flex items-baseline justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <span className="text-xs text-[#002147]/70 font-bold block">{t('الكلمة والمثال:', 'Word & Translation:')}</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-base font-black text-[#002147] font-sans">
                          {selectedLetter.exampleWord}
                        </span>
                        <span className="text-xs text-[#002147] font-bold bg-[#fdfaf3] border border-[#C49E3A]/40 px-2 py-0.5 rounded-lg">
                          {selectedLetter.exampleMeaning}
                        </span>
                      </div>
                    </div>
                    <span className="text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-sans shrink-0">
                      {selectedLetter.char}
                    </span>
                  </div>

                  {/* Arabic tips developed by academy */}
                  <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-4 rounded-2xl space-y-2">
                    <h5 className="text-[11px] font-black text-[#002147] flex items-center justify-end gap-1.5">
                      <span>💡 {t('كيف ينطق للعرب بامتياز؟', 'Pronunciation Secrets for Arabs')}</span>
                    </h5>
                    <p className="text-xs text-[#002147] leading-relaxed font-bold">
                      {selectedLetter.arabicTip}
                    </p>
                  </div>

                  {/* Professional explanation */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#002147]/70 font-black block">{t('شرح المخرج والأثر اللفظي:', 'Articulation Details:')}</span>
                    <p className="text-xs text-[#002147]/80 leading-normal font-medium">
                      {selectedLetter.description}
                    </p>
                  </div>

                  <GhostButton
                    onClick={() => speakText(`${selectedLetter.char}. for example. ${selectedLetter.exampleWord}`, targetLang)}
                    className="w-full"
                  >
                    <Volume2 size={14} />
                    <span>{t('تشغيل اللفظ الكامل للمصطلح', 'Vocalize Example Sentence')}</span>
                  </GhostButton>
                </GoldCard>
              </motion.div>
            ) : (
              <GoldCard className="p-8 text-center py-12">
                <span className="text-3xl block mb-2">👈</span>
                <p className="text-xs font-black text-[#002147]/75">
                  {t(
                    'من فضلك انقر فوق أي حرف من مصفوفة الأصوات الحية لتشغيل اللفظ ومشاهدة تفاصيل الشرح وتعديل حركات اللسان.',
                    'Please pick any phoneme or letter from the live list to trigger high-fidelity audio synthesis.'
                  )}
                </p>
              </GoldCard>
            )}
          </AnimatePresence>

          {/* Gamified Letter Sound Quiz */}
          <GoldCard className="p-5 text-right space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#C49E3A]/20">
              <ProgressPill>
                <Award size={11} />
                <span>Score: {quizScore} pts</span>
              </ProgressPill>
              <h5 className="text-xs font-black text-[#002147] flex items-center gap-1">
                <span>🎯 {t('مسابقة النطق والسمع ومخارج الضاد', 'Phonetic Sound Challenge')}</span>
              </h5>
            </div>

            {currentQuiz ? (
              <div className="space-y-4">
                <div className="text-xs font-bold text-[#002147] leading-normal bg-[#fdfaf3] p-3.5 rounded-2xl border border-[#C49E3A]/40">
                  {currentQuiz.question}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {currentQuiz.options.map((option) => {
                    const isSelected = currentQuiz.userAnswer === option;
                    const isCorrect = option === currentQuiz.correctChar;
                    const hasAnswered = currentQuiz.userAnswer !== null;

                    const optionState = !hasAnswered
                      ? 'normal'
                      : isCorrect
                      ? 'correct'
                      : isSelected
                      ? 'wrong'
                      : 'normal';

                    return (
                      <AnswerOption
                        key={option}
                        label={option}
                        state={optionState}
                        selected={isSelected}
                        disabled={hasAnswered}
                        onClick={() => handleAnswerOption(option)}
                      />
                    );
                  })}
                </div>

                {currentQuiz.userAnswer && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <PrimaryButton
                      onClick={startNewQuiz}
                      className="!px-3.5 !py-1.5 !min-h-[36px] !text-xs"
                    >
                      <RefreshCw size={12} />
                      <span>{t('التالي 🚀', 'Next 🚀')}</span>
                    </PrimaryButton>
                    <div className="text-[11px] font-black flex items-center gap-1 text-[#002147]">
                      {currentQuiz.userAnswer === currentQuiz.correctChar ? (
                        <span className="flex items-center gap-1">
                          <Check size={12} className="text-[#C49E3A]" />
                          {t('إجابة ممتازة فصيحة! (+15 نقطة)', 'Perfect Pronunciation!')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <AlertCircle size={12} className="text-[#C49E3A]" />
                          {t(`الحرف الصحيح هو ${currentQuiz.correctChar}`, `Correct letter is ${currentQuiz.correctChar}`)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-4 text-center space-y-3">
                <p className="text-xs text-[#002147]/75 leading-relaxed font-medium">
                  {t(
                    'اختبر سمعك ودقتك اللغوية في التمييز السريع بين أصوات الحروف ومخارج الفونيمات العالمية بالذكاء الاصطناعي.',
                    'Analyze custom challenges and match standard audio with their visual representations.'
                  )}
                </p>
                <PrimaryButton
                  onClick={startNewQuiz}
                  className="mx-auto"
                >
                  <BookOpen size={14} />
                  <span>{t('ابدأ مسابقة السمع المخارج', 'Launch Hearing Test')}</span>
                </PrimaryButton>
              </div>
            )}
          </GoldCard>
        </div>
      </div>
    </div>
  );
}

