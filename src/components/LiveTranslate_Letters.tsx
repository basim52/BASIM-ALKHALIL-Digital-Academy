import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Sparkles, Check, AlertCircle, RefreshCw, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';

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

  return (
    <div className="space-y-8">
      {/* Intro section */}
      <div className="bg-gradient-to-br from-[#002147] to-[#0d3463] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 opacity-5 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400 opacity-5 rounded-full blur-3xl translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-black text-amber-300">
              <Sparkles size={12} />
              <span>{isRtl ? 'حروف اللغة والأنغام الفونيمية الكلاسيكية' : 'Phoneme Harmony & Alphabet'}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black tracking-tight leading-snug">
              {isRtl ? 'مستودع الحروف والأصوات الحية 🔠' : 'Interactive Alphabets & Phonetics 🔠'}
            </h3>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium max-w-xl">
              {isRtl 
                ? 'استكشف الحروف الحية للغات العالمية ومخارج اللسان الفونيتيكية. استمع بوضوح تام، واكتشف النبر القياسي لتعزيز طلاقة نطقك وخروج الصوت السليم.' 
                : 'Click any letter to trigger localized speech, explore phonetic IPA charts, and master precise mouth positions developed by expert linguists.'}
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl text-center min-w-[130px]">
            <span className="text-[28px] animate-bounce">🎓</span>
            <span className="text-white text-xs font-bold mt-1 block">
              {isRtl ? 'علم الفونيمات' : 'Phonetic Science'}
            </span>
            <span className="text-amber-400 text-[10px] font-mono mt-0.5">
              {isRtl ? 'تفاعل فوري مبارز' : 'Standard IPA guide'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: letter matrix (8 columns on large, interactive grid) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-xs font-black text-[#002147] tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-[#002147] rounded"></span>
              {isRtl ? 'مصفوفة الحروف والنطق الصوتي:' : 'Letter Matrix & Phonetics:'}
            </h4>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
              {letters.length} {isRtl ? 'عناصر صوتية رئيسية' : 'Key sounds'}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {letters.map((letItem) => {
              const isSelected = selectedLetter?.char === letItem.char;
              return (
                <button
                  key={letItem.char}
                  type="button"
                  onClick={() => {
                    setSelectedLetter(letItem);
                    speakText(letItem.char, targetLang);
                    onPlayChime('message');
                  }}
                  className={`p-4 rounded-2xl border text-right transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[115px] group cursor-pointer ${
                    isSelected 
                      ? 'bg-amber-accent/15 border-[#C49E3A] ring-2 ring-[#C49E3A]/20 shadow-md transform scale-[1.02]' 
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  {/* Subtle decorative circle */}
                  <div className={`absolute top-0 right-0 w-12 h-12 rounded-full -mr-3 -mt-3 transition-opacity ${
                    isSelected ? 'bg-[#C49E3A]/10' : 'bg-slate-50 group-hover:bg-slate-100/80'
                  }`}></div>

                  <div className="flex items-center justify-between relative z-10 w-full mb-2">
                    <span className="font-mono text-slate-400 text-[10px] font-black tracking-widest uppercase">
                      {letItem.ipa}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(letItem.exampleWord, targetLang);
                      }}
                      className="p-1 rounded-lg bg-slate-100 hover:bg-amber-accent/20 hover:text-amber-800 transition text-slate-500"
                      title="Play example"
                    >
                      <Volume2 size={11} />
                    </button>
                  </div>

                  <div className="relative z-10 flex flex-col">
                    <span className={`text-2xl font-black font-sans leading-none tracking-tight ${
                      isSelected ? 'text-[#002147]' : 'text-slate-800 group-hover:text-[#002147]'
                    }`}>
                      {letItem.char}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold truncate mt-1">
                      {letItem.exampleWord} ({letItem.exampleMeaning})
                    </span>
                  </div>
                </button>
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-right space-y-4 relative overflow-hidden"
              >
                {/* Active Accent Border */}
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#C49E3A]"></div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="px-2.5 py-1 bg-amber-50 text-[#C49E3A] border border-[#C49E3A]/10 rounded-full text-[9px] font-extrabold uppercase font-mono tracking-wider">
                    {selectedLetter.ipa} - {isRtl ? 'الرمز الفونيتيكي' : 'IPA Symbol'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => speakText(selectedLetter.char, targetLang)}
                      className="px-3 py-1.5 bg-[#002147] hover:bg-[#0d3463] text-white rounded-xl text-[10px] font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Volume2 size={12} />
                      <span>{isRtl ? 'اسمع الحرف 🎙️' : 'Hear Letter 🎙️'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs text-slate-400 font-bold block">{isRtl ? 'الكلمة والمثال:' : 'Word & Translation:'}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-black text-[#002147] font-sans">
                        {selectedLetter.exampleWord}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
                        {selectedLetter.exampleMeaning}
                      </span>
                    </div>
                  </div>
                  <span className="text-4xl lg:text-5xl font-black text-rose-500 tracking-tight font-sans">
                    {selectedLetter.char}
                  </span>
                </div>

                {/* Arabic tips developed by academy */}
                <div className="bg-[#002147]/5 border border-[#002147]/10 p-4 rounded-2xl space-y-2">
                  <h5 className="text-[11px] font-extrabold text-[#002147] flex items-center justify-end gap-1.5">
                    <span>💡 {isRtl ? 'كيف ينطق للعرب بامتياز؟' : 'Pronunciation Secrets for Arabs'}</span>
                  </h5>
                  <p className="text-[12px] text-slate-700 leading-relaxed font-bold">
                    {selectedLetter.arabicTip}
                  </p>
                </div>

                {/* Professional explanation */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-extrabold block">{isRtl ? 'شرح المخرج والأثر اللفظي:' : 'Articulation Details:'}</span>
                  <p className="text-[11.5px] text-slate-600 leading-normal font-medium">
                    {selectedLetter.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => speakText(`${selectedLetter.char}. for example. ${selectedLetter.exampleWord}`, targetLang)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200/80 transition text-[#002147] rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Volume2 size={13} />
                  <span>{isRtl ? 'تشغيل اللفظ الكامل للمصطلح' : 'Vocalize Example Sentence'}</span>
                </button>
              </motion.div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl p-8 text-center text-slate-400 text-xs font-black py-16">
                <span className="text-3xl block mb-2">👈</span>
                {isRtl 
                  ? 'من فضلك انقر فوق أي حرف من مصفوفة الأصوات الحية لتشغيل اللفظ ومشاهدة تفاصيل الشرح وتعديل حركات اللسان.' 
                  : 'Please pick any phoneme or letter from the live list to trigger high-fidelity audio synthesis.'}
              </div>
            )}
          </AnimatePresence>

          {/* Gamified Letter Sound Quiz */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 text-white shadow-md relative overflow-hidden border border-slate-700 text-right space-y-4">
            <div className="absolute top-0 left-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <span className="flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 border border-amber-300/10 rounded-full font-black">
                <Award size={11} />
                <span>Score: {quizScore} pts</span>
              </span>
              <h5 className="text-xs font-black text-slate-300 flex items-center gap-1">
                <span>🎯 {isRtl ? 'مسابقة النطق والسمع ومخارج الضاد' : 'Phonetic Sound Challenge'}</span>
              </h5>
            </div>

            {currentQuiz ? (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-slate-300 leading-normal bg-white/5 p-3 rounded-xl border border-white/5">
                  {currentQuiz.question}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {currentQuiz.options.map((option) => {
                    const isSelected = currentQuiz.userAnswer === option;
                    const isCorrect = option === currentQuiz.correctChar;
                    const hasAnswered = currentQuiz.userAnswer !== null;

                    let btnStyle = "bg-white/10 hover:bg-white/15 border-slate-700 text-white";
                    if (hasAnswered) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300 ring-1 ring-rose-500/30";
                      } else {
                        btnStyle = "bg-white/5 border-slate-800 text-slate-400 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={hasAnswered}
                        onClick={() => handleAnswerOption(option)}
                        className={`py-2 px-3 rounded-xl border text-center font-sans text-sm font-black transition-all ${btnStyle} ${!hasAnswered ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {currentQuiz.userAnswer && (
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={startNewQuiz}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-lg text-[10px] transition flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw size={11} />
                      <span>{isRtl ? 'التالي 🚀' : 'Next 🚀'}</span>
                    </button>
                    <div className="text-[10px] text-slate-300 font-bold flex items-center gap-1">
                      {currentQuiz.userAnswer === currentQuiz.correctChar ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check size={12} />
                          {isRtl ? 'إجابة ممتازة فصيحة! (+15 نقطة)' : 'Perfect Pronunciation!'}
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {isRtl ? `الحرف الصحيح هو ${currentQuiz.correctChar}` : `Correct letter is ${currentQuiz.correctChar}`}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-4 text-center space-y-3">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isRtl 
                    ? 'اختبر سمعك ودقتك اللغوية في التمييز السريع بين أصوات الحروف ومخارج الفونيمات العالمية بالذكاء الاصطناعي.'
                    : 'Analyze custom challenges and match standard audio with their visual representations.'}
                </p>
                <button
                  type="button"
                  onClick={startNewQuiz}
                  className="px-4 py-2 bg-[#C49E3A] hover:bg-[#b08c2f] text-[#002147] font-black rounded-xl text-xs transition active:scale-95 cursor-pointer flex items-center gap-1.5 mx-auto"
                >
                  <BookOpen size={13} />
                  <span>{isRtl ? 'ابدأ مسابقة السمع المخارج' : 'Launch Hearing Test'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
