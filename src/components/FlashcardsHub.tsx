import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderOpen, 
  Sparkles, 
  Volume2, 
  RotateCw, 
  CheckCircle, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Bookmark, 
  Flame, 
  Award, 
  RefreshCcw,
  BookOpen,
  ArrowRight,
  BookmarkCheck,
  Zap,
  Trash2,
  Plus
} from 'lucide-react';
import { UserProfile } from '../types';

interface FlashcardsHubProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (xp: number) => void;
}

interface Flashcard {
  id: string;
  word: string;
  phonetic: string;
  definition_en: string;
  definition_ar: string;
  example_en: string;
  example_ar: string;
  category: 'oxford' | 'grammar' | 'idioms' | 'kids';
}

const FLASHCARDS_DATA: Flashcard[] = [
  // Oxford Academics (25 cards)
  {
    id: 'fc_ox_001',
    word: 'Acquire',
    phonetic: '/əˈkwaɪər/',
    definition_en: 'To gain or obtain possession of something, especially knowledge or a skill.',
    definition_ar: 'الاستحواذ أو الحصول على شيء ما ومثاله اكتساب معرفة أو مهارة جديدة.',
    example_en: 'With daily practice, children acquire language naturally.',
    example_ar: 'مع الممارسة اليومية، يكتسب الأطفال اللغة بشكل طبيعي.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_002',
    word: 'Formulate',
    phonetic: '/ˈfɔːrmjuleɪt/',
    definition_en: 'To create, design, or prepare something systemic (like a plan, statement, or idea).',
    definition_ar: 'صياغة أو إعداد خطة، فكرة أو بيان بشكل دقيق ومنظم.',
    example_en: 'We need to formulate a smart schedule to study all chapters.',
    example_ar: 'نحتاج إلى صياغة جدول دراسي ذكي لمطالعة جميع الفصول.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_003',
    word: 'Evaluation',
    phonetic: '/ɪˌvæljuˈeɪʃn/',
    definition_en: 'The making of a judgment about the amount, value, or quality of something.',
    definition_ar: 'إجراء تقييم أو إصدار حكم مدروس حول قيمة أو كمية أو جودة شيء ما.',
    example_en: 'Our smart pronunciation lab offers instant speech evaluation.',
    example_ar: 'يقدم معمل نطق الكلمات لدينا تقييماً فورياً وصائباً للفظ.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_004',
    word: 'Sufficient',
    phonetic: '/səˈfɪʃnt/',
    definition_en: 'Enough; adequate to meet the needs of a situation or proposed end.',
    definition_ar: 'كافٍ؛ ملائم ومناسب تماماً لتلبية متطلبات ظرف ما أو هدف محدد.',
    example_en: 'Ten minutes of structured loud reading is sufficient to improve fluency.',
    example_ar: 'عشر دقائق من القراءة بصوت عالٍ ومنظم كافية لتحسين الطلاقة.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_005',
    word: 'Hypothesis',
    phonetic: '/haɪˈpɑːθəsɪs/',
    definition_en: 'A proposed explanation based on limited evidence as a starting point for investigation.',
    definition_ar: 'افتراض علمي أو تفسير مقترح كخطوة أولى لبدء البحث والتقصي العلمي.',
    example_en: 'The scientist formulated a simple hypothesis about speech habits.',
    example_ar: 'صاغ العالِم فرضية بسيطة حول عادات النطق والكلام.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_006',
    word: 'Analyze',
    phonetic: '/ˈænəlaɪz/',
    definition_en: 'To examine something methodically and in detail to explain and interpret it.',
    definition_ar: 'تحليل؛ فحص الشيء وسبر أغواره ميكانيكياً لبسط مضامينه بشكل منطقي وعميق.',
    example_en: 'Students learn to analyze historical sources critically during the course.',
    example_ar: 'يتعلم الطلاب كيف يحللون المصادر التاريخية بوعي ناهض ومطوّر في الحلقات الدراسية.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_007',
    word: 'Concept',
    phonetic: '/ˈkɑːnsept/',
    definition_en: 'An abstract idea or general notion that represents a class of things.',
    definition_ar: 'مفهوم؛ فكرة فكرية مجردة تعبر عن نمط أو فئة من الروابط والأشياء.',
    example_en: 'Understanding this concept is key to solving the physics equation.',
    example_ar: 'فهم هذا المفهوم المعرفي هو مفتاحك الأهم لفك وحل طلاسم معادلة الفيزياء.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_008',
    word: 'Context',
    phonetic: '/ˈkɑːntekst/',
    definition_en: 'The circumstances or setting that surround an event, statement, or idea.',
    definition_ar: 'سياق؛ رزمة الظروف المحيطة باللفظ أو الحادثة والتي تكشف عن المعنى الحقيقي لها.',
    example_en: 'Dynamic vocabulary is best understood when placed inside a clear context.',
    example_ar: 'تُستوعب الكلمات وتُحفظ بأفضل أساليبها عندما تقرن بسياق تطبيقي فوري.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_009',
    word: 'Establish',
    phonetic: '/ɪˈstæblɪʃ/',
    definition_en: 'To set up or build an organization, system, or set of rules on a firm basis.',
    definition_ar: 'تأسيس / ترسيخ؛ بدء إشهار جمعية أو صياغة ضوابط راسخة البنيان.',
    example_en: 'The academy wants to establish new modern guidelines for kids.',
    example_ar: 'ترمي الأكاديمية لتأسيس ووضع حجر الأساس لمعايير عصرية حديثة تدعم تفوق الصغار.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_010',
    word: 'Source',
    phonetic: '/sɔːrs/',
    definition_en: 'A place, person, or thing from which something comes or can be obtained.',
    definition_ar: 'مصدر؛ المنبع الموثوق أو الأصل الذي تنبثق وتستخرج منه العلوم والفوائد.',
    example_en: 'Interactive reading is a fantastic source of interesting idioms.',
    example_ar: 'تمثل القراءة التفاعلية مصدراً باهراً وملهماً لالتقاط أجمل التعبيرات الشعبية.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_011',
    word: 'Structure',
    phonetic: '/ˈstrʌktʃər/',
    definition_en: 'The arrangement of and relations between the parts or elements of something complex.',
    definition_ar: 'بنية / هيكلية؛ النمط الذي تنتظم به أجزاء وعناصر المركب المترابط المتكامل.',
    example_en: 'Today, we will study the basic structure of the present perfect.',
    example_ar: 'اليوم، سنعكف على دراسة البنية والهيكلة الأساسية لزمن المضارع التام.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_012',
    word: 'Theory',
    phonetic: '/ˈθiːəri/',
    definition_en: 'An organized system of ideas intended to explain something based on general principles.',
    definition_ar: 'نظرية؛ مجموعة متكاملة متوازنة من الأطروحات الفكرية الرامية لتفسير ظواهر كونية.',
    example_en: 'Albert Einstein is famous for his groundbreaking theory of relativity.',
    example_ar: 'غدا ألبرت أينشتاين علماً شهيراً بفضل نظريته العظيمة في رصد النسبية الفلكية.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_013',
    word: 'Significant',
    phonetic: '/sɪɡˈnɪfɪkənt/',
    definition_en: 'Sufficiently great, notable, or important to be worthy of close attention.',
    definition_ar: 'ذو بال وأهمية بالغة؛ عظيم ومؤثر في مسار الأمور لدرجة تدعو للالتفات.',
    example_en: 'Listening practice plays a significant role in mastering English fluency.',
    example_ar: 'إن تكرار تمارين الاستماع البناءة تلعب دوراً بالغ الأهمية في حيازة طلاقة المحادثة.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_014',
    word: 'Identify',
    phonetic: '/aɪˈdentɪfaɪ/',
    definition_en: 'To establish or indicate exactly who or what someone or something is.',
    definition_ar: 'تحديد الهوية / التمييز؛ الاستدلال بدقة تامة على ماهية الشخص أو المفرد السري.',
    example_en: 'Can you identify the subject in this complex sentence?',
    example_ar: 'هل بوسعك تحديد الفاعل الحقيقي وموضعه داخل هذه الجملة النحوية الطويلة؟',
    category: 'oxford'
  },
  {
    id: 'fc_ox_015',
    word: 'Interpret',
    phonetic: '/ɪnˈtɜːrprət/',
    definition_en: 'To explain the meaning of foreign words, information, or actions.',
    definition_ar: 'تفسير وتأويل؛ شرح مدلولات ومعاني الجمل الأجنبية أو الرموز المبهمة.',
    example_en: 'We need a professional guide to interpret the ancient symbols.',
    example_ar: 'نحتاج مرشداً بليغاً وموثوقاً ليفسر لنا مغزى هذه الرموز الحجرية الخالدة.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_016',
    word: 'Method',
    phonetic: '/ˈmeθəd/',
    definition_en: 'A systematic and organized procedure for accomplishing or approaching a goal.',
    definition_ar: 'منهجية / أسلوب؛ خطة واضحة ومسار موجه مرتب خطوة بخطوة لبلوغ المقصد.',
    example_en: 'Our interactive method makes vocabulary learning active and deeply memorable.',
    example_ar: 'طريقتنا التعليمية التفاعلية تجعل حفظ الكلمات حيوياً، ممتعاً، وراسخاً بالنفس.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_017',
    word: 'Principle',
    phonetic: '/ˈpɪnsəpl/',
    definition_en: 'A fundamental truth or proposition that serves as the foundation for beliefs.',
    definition_ar: 'مبدأ؛ منطلق فكري عريق يمثل عماد التوجه والمنهج والاعتقاد والعمل السليم.',
    example_en: 'Active vocal review is a central principle of smart spaced repetition.',
    example_ar: 'المراجعة النشطة بصوت عالٍ هي المبدأ الأساسي لنظام التكرار المتباعد الذكي.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_018',
    word: 'Section',
    phonetic: '/ˈsekʃn/',
    definition_en: 'A distinct, separate part, group, or division of an object or book.',
    definition_ar: 'قسم / بند؛ غصن مقتطع أو باب قائم بذاته يندرج تحت مرجع كلي.',
    example_en: 'Turn to the grammar section inside the interactive student dashboard.',
    example_ar: 'يرجى الانتقال فوراً إلى بوابة وقسم القواعد النحوية على لوحة تشغيل الطالب الرائعة.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_019',
    word: 'Varied',
    phonetic: '/ˈverid/',
    definition_en: 'Incorporating a number of different, colourful types or diverse elements.',
    definition_ar: 'متنوع ومتشعب؛ تجسيد تشكيلة غنية ومختلفة لإثراء التجربة ومنع الملل.',
    example_en: 'The lab hosts a varied database of academic recordings.',
    example_ar: 'تحتضن ردهات التطبيق قاعدة بيانات متنوعة، شاملة، ومبسطة من التسجيلات الصوتية.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_020',
    word: 'Indicate',
    phonetic: '/ˈɪndɪkeɪt/',
    definition_en: 'To point out, show, or direct attention to something clearly.',
    definition_ar: 'يشير إلى / يدل؛ الإيضاح الفوري للسامع بقرائن وعلامات جلية لا لبس فيها.',
    example_en: 'Dark clouds on the horizon indicate that it might rain very soon.',
    example_ar: 'السحب والغيوم المتراكمة في الأفق تشير صراحة إلى قرب هطول المطر الوفير.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_021',
    word: 'Derive',
    phonetic: '/dɪˈraɪv/',
    definition_en: 'To obtain, extract, or trace something original from a specified source.',
    definition_ar: 'مشتق / مستخلص؛ إرجاع الكلمة أو الحكمة لمنبت أصلها واستنباط المعنى.',
    example_en: 'Many English vocabulary words derive from ancient Latin and Greek rules.',
    example_ar: 'ترجع فروع كبرى من الكلمات الإنجليزية في اشتقاقاتها لقواعد لاتينية ويونانية تليدة.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_022',
    word: 'Distribute',
    phonetic: '/dɪˈstrɪbjuːt/',
    definition_en: 'To hand out, share, or scatter units of something among recipients.',
    definition_ar: 'توزيع؛ تقسيم الحصص والبطاقات على الأفراد لضمان مشاركة متساوية.',
    example_en: 'The digital mentor will distribute spelling medals to active kids.',
    example_ar: 'سيقوم المعلم التفاعلي بتوزيع أوسمة التهجئة الذهبية على الأطفال المثابرين بانتظام.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_023',
    word: 'Economic',
    phonetic: '/ˌiːkəˈnɑːmɪk/',
    definition_en: 'Relating to the core trade, industry, financial systems, and wealth.',
    definition_ar: 'اقتصادي؛ ما يعنى بشؤون تداول الأموال، الإنتاج الحرفي، والتجارة والنمو المادي.',
    example_en: 'Learning international languages boosts your global economic opportunities.',
    example_ar: 'إن غرس مهارة الحديث بلغات معتمدة يرتقي بفرصك وظروفك الاقتصادية المستقبلية.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_024',
    word: 'Estimate',
    phonetic: '/ˈestɪmeɪt/',
    definition_en: 'To roughly calculate or appraise the value, scale, or quantity of an object.',
    definition_ar: 'تقدير تقريبي؛ بناء تصور أولي حول الرقم أو التكلفة دون جزم رياضي نهائي.',
    example_en: 'Experts estimate that reading daily increases active vocabulary by 30 percent.',
    example_ar: 'يقدر الباحثون أن المطالعة الصباحية المنظمة تثري معجم الفرد اللفظي بنسبة ثلاثين بالمائة.',
    category: 'oxford'
  },
  {
    id: 'fc_ox_025',
    word: 'Finance',
    phonetic: '/ˈfaɪnæns/',
    definition_en: 'The science and art of managing large amounts of funds or investments.',
    definition_ar: 'مالية؛ دراسة وتنظيم ومباشرة التدفقات النقدية والمشاريع التمويلية الاستثمارية.',
    example_en: 'She decided to study global finance and trade in London.',
    example_ar: 'تأهب ذهنها وقررت دراسة عالم المال والأعمال الدولية في جامعات لندن العريقة.',
    category: 'oxford'
  },

  // Grammar Essentials (25 cards)
  {
    id: 'fc_gr_001',
    word: 'Preposition',
    phonetic: '/ˌprepəˈzɪʃn/',
    definition_en: 'A word governing, and usually preceding, a noun or pronoun (like on, at, in).',
    definition_ar: 'حرف الجر؛ وهو كلمة تسبق عادة الاسم أو الضمير وتحدد موضعاً أو زمناً (مثل في، على).',
    example_en: 'Place a book "on" the table and look "at" it.',
    example_ar: 'ضع خطة "على" الطاولة وانظر "إليها".',
    category: 'grammar'
  },
  {
    id: 'fc_gr_002',
    word: 'Auxiliary Verb',
    phonetic: '/ɔːɡˈzɪliəri vɜːrb/',
    definition_en: 'A helping verb used in forming tenses, moods, or voices of other verbs (like do, be, have).',
    definition_ar: 'فعل مساعد؛ يُستعمل لتركيب أزمنة الجمل، النفي، أو صياغة الأسئلة السليمة.',
    example_en: '"Do" you practice speaking English daily?',
    example_ar: 'هل (فعل مساعد للأسئلة) تمارس التحدث بالإنجليزية يومياً؟',
    category: 'grammar'
  },
  {
    id: 'fc_gr_003',
    word: 'Adverb of Manner',
    phonetic: '/ˈædvɜːrb əv ˈmænər/',
    definition_en: 'A word that describes how an action is performed (usually ending in -ly, like slowly, quickly).',
    definition_ar: 'حال الطريقة والسرعة؛ كلمة توضح كيفية حدوث الفعل وغالباً تنتهي بـ ly مثل (بسرعة).',
    example_en: 'She speaks English fluently with our AI companion.',
    example_ar: 'تتحدث الإنجليزية بطلاقة مع رفيق المحادثة الذكي الخاص بنا.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_004',
    word: 'Adjective',
    phonetic: '/ˈædʒɪktɪv/',
    definition_en: 'A word that describes or modifies the features, shape, or state of a noun.',
    definition_ar: 'صفة / نعت؛ اللفظ الذي يلحق بالاسم ليصف ملامحه وأحواله بدقة تزيد الجملة جمالاً وبهاءً.',
    example_en: 'Basim read an "interesting" story from our elite digital library today.',
    example_ar: 'تصفح باسم قصة "شيقة" ومسلية من مكتبتنا الرقمية الفاخرة هذا الصباح.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_005',
    word: 'Pronoun',
    phonetic: '/ˈproʊnaʊn/',
    definition_en: 'A tiny, elegant word that safely takes the place of a noun to avoid boring repetition.',
    definition_ar: 'ضمير؛ رمز خفيف يحل مطرح الاسم الصريح لمنع التكرار المفرط (مثل: هو، هي، نحن).',
    example_en: 'Instead of saying "Sarah runs fast," we can gracefully say "She runs fast."',
    example_ar: 'عوضاً عن التكرار وقول "سارة تجري بنشاط"، يمكننا القول بخفة وبلاغة: "هي تجري بنشاط".',
    category: 'grammar'
  },
  {
    id: 'fc_gr_006',
    word: 'Conjunction',
    phonetic: '/kənˈdʒʌŋkʃn/',
    definition_en: 'A connector word used to join individual words, rich phrases, or complete clauses together.',
    definition_ar: 'حرف عطف / أداة ربط؛ صلة وصل فكرية تسهم في ربط ثنايا الجمل المترابطة (مثل: و، لكن، بل).',
    example_en: 'Speak continuously "but" listen with maximum care and attention.',
    example_ar: 'تحدث بصلابة وطلاقة "لكن" أنصت بوعي جبار لكلمات الآخرين ومخارج حروفهم.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_007',
    word: 'Interjection',
    phonetic: '/ˌɪntərˈdʒekʃn/',
    definition_en: 'An abrupt and sudden exclamation that expresses strong spontaneous emotions.',
    definition_ar: 'صيغة تعجب / صرخة فرح؛ عبارة عابرة حية تجسد الانبهار أو الحزن المفاجئ (مثل: واو، تباً).',
    example_en: '"Wow!" That academic pronunciation score is truly magnificent.',
    example_ar: '"واو!" تلك نتيجة النطق وقراءتك الجريئة فاقت كل التصورات بروعتها ودقتها.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_008',
    word: 'Noun',
    phonetic: '/naʊn/',
    definition_en: 'A core vocabulary class designating a person, magical place, solid thing, or abstract idea.',
    definition_ar: 'اسم؛ الكلمة التي تمثل جوهر المسميات سواء كانت تعبر عن بشر، حجر، مدر، أو غابات.',
    example_en: 'The brave little "detective" discovered a secret map hidden inside the library.',
    example_ar: 'عثر "المحقق" الصغير المقدام على خريطة سرية أثرية مخبوءة في ثنايا رفوف المكتبة.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_009',
    word: 'Transitive Verb',
    phonetic: '/ˈtrænsətɪv vɜːrb/',
    definition_en: 'A dynamic action verb that requires a direct object to complete its meaning.',
    definition_ar: 'فعل متعدٍ؛ الفعل الحركي النشط الذي يتجاوز فاعله ويجتذب مفعولاً به لتكتمل فائدته.',
    example_en: 'The creative children "built" a beautiful spaceship model.',
    example_ar: 'قام الصغار المبتكرون "ببناء" نموذج مجسم مذهل لمركبة فضاء مروحية أنيقة.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_010',
    word: 'Intransitive Verb',
    phonetic: '/ɪnˈtrænsətɪv vɜːrb/',
    definition_en: 'An action verb which does not take a direct object to fulfill its grammar sense.',
    definition_ar: 'فعل لازم؛ الفعل الوقور الذي يكتفي بفاعله لتمام جملته ولا يحتاج مفعولاً يقع عليه.',
    example_en: 'The majestic purple butterflies "flew" happily all over the garden.',
    example_ar: '"حلقت" الفراشات البنفسجية المهيبة بنشاط ومرح فوق باقات زهور البستان الندية.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_011',
    word: 'Present Perfect',
    phonetic: '/ˈpreznt ˈpɜːrfɪkt/',
    definition_en: 'A tense showing an action completed in the past that holds extreme relevance to the present.',
    definition_ar: 'المضارع التام؛ زمن يربط بين ماضٍ انقضى وحاضر نعيشه تظهر نتائجه جلية الآن.',
    example_en: 'I "have traveled" to London twice to attend global academic forums.',
    example_ar: 'لقد "سافرت" طوعاً لعاصمة بريطانيا لندن مرتين للمشاركة في ملتقيات لغوية دولية.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_012',
    word: 'Past Continuous',
    phonetic: '/pæst kənˈtɪnjuəs/',
    definition_en: 'A tense describing continuous actions that were happening at a specific point in the past.',
    definition_ar: 'الماضي المستمر؛ صيغة تحكي عن فعل كان قيد التفاعل والاستمرار في زمن سابق ومحدد.',
    example_en: 'They "were practicing" phonetics when the bell rang for the class.',
    example_ar: 'كانوا "يمارسون" تدريبات مخارج الحروف الشاقة والترتيل عندما قرع جرس الحصة.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_013',
    word: 'Future Simple',
    phonetic: '/ˈfjuːtʃər ˈsɪmpl/',
    definition_en: 'A tense used to project and express events that will occur at a later stage.',
    definition_ar: 'المستقبل البسيط؛ صيغة للتنبؤ والحديث العازم عن مخططات ووقائع ستحدث لاحقاً.',
    example_en: 'Tomorrow, we "will unlock" the final gold chest in the educational game.',
    example_ar: 'غداً بمشيئة الله، "سنفتح" صندوق الذهب الأخير في المرحلة الختامية من اللعبة الترفيهية.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_014',
    word: 'Active Voice',
    phonetic: '/ˈæktɪv vɔɪs/',
    definition_en: 'A sentence structure where the subject clearly is the performer of the predicate.',
    definition_ar: 'المبني للمعلوم؛ صياغة صريحة تتصدر فيها الجملة بالفاعل النشط الذي يتولى قيام الفعل.',
    example_en: 'The smart magician performed an incredible card trick.',
    example_ar: 'أدى الساحر الذكي خفة يد مذهلة وغير مسبوقة بالبطاقات على منصة المسرح.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_015',
    word: 'Passive Voice',
    phonetic: '/ˈpæsɪv vɔɪs/',
    definition_en: 'A sentence construction where the action or the object of the verb is highlighted output.',
    definition_ar: 'المبني للمجهول؛ أسلوب يُسلط فيه الضوء على الفعل والحدث مع التغاضي عن ذكر فاعله.',
    example_en: 'The glowing key "was hidden" inside the ancient stone treasure box.',
    example_ar: '"أُخفي" المفتاح المتوهج بعناية وتكتم شديدين داخل الصندوق الحجري التليد.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_016',
    word: 'Direct Object',
    phonetic: '/dəˈrekt ˈɑːbdʒekt/',
    definition_en: 'The noun or phrase which stands on the receiving end of a transitive verb.',
    definition_ar: 'المفعول به المباشر؛ الكلمة أو الاسم الذي وقع عليه تأثر وتصرف الفعل المتعدي بشكل صريح.',
    example_en: 'The little explorer launched the "submarine" into the lake.',
    example_ar: 'أنزل المستكشف الصغير "الغواصة" الفولاذية إلى قاع البحيرة العميقة المجهولة.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_017',
    word: 'Indirect Object',
    phonetic: '/ˌndəˈrekt ˈɑːbdʒekt/',
    definition_en: 'The person or entity that benefits from or receives the direct object of the verb.',
    definition_ar: 'المفعول به غير المباشر؛ المنتفع أو المتلقي الغائي من إجراء الفاعل والمفعول به الأول.',
    example_en: 'Give "the child" a colorful book to encourage spelling practice.',
    example_ar: 'امنح "الطفل" كتاباً مصوراً ملوناً لحثه على مواصلة التهجئة يومياً بنشاط وحب.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_018',
    word: 'Relative Clause',
    phonetic: '/ˈrelətɪv klɔːz/',
    definition_en: 'A descriptive clause starting with who, which, or that, used to expand noun definitions.',
    definition_ar: 'صلة الموصول؛ شبه جملة استقصائية يقودها اسم موصول لتبيان صفات الموصوف بدقة.',
    example_en: 'This is the smart hub "that" evaluates your English fluency.',
    example_ar: 'هذا هو الميدان التفاعلي المستنير "الذي" يزين نطقك ويقوم طلاقتك الإنجليزية المشرقة.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_019',
    word: 'Gerund',
    phonetic: '/ˈdʒerənd/',
    definition_en: 'A verb in its -ing form functioning completely as a noun in the phrase.',
    definition_ar: 'المصدر النحوي الصريح؛ اسم متأصل يصاغ بضم حروف ing لنهاية تصريف الفعل.',
    example_en: '"Reading" vocabulary lists out loud strengthens mental pathways.',
    example_ar: 'إن "القراءة" الجاهرة لجدول الكلمات تنمي وتدعم مسارات الذاكرة والربط العقلي.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_020',
    word: 'Infinitive',
    phonetic: '/ɪnˈfɪnətɪv/',
    definition_en: 'The pure, original form of a verb usually coupled with the tiny particle "to" before it.',
    definition_ar: 'مصدر الفعل الرئيسي؛ الهيكل الأساسي الخام المجرد من أسلوب الزمن مسبوقاً بـ (أن).',
    example_en: 'We all want "to speak" like a confident English native orator.',
    example_ar: 'نتطلع قاطبة كطلاب "للتحدث" بثقة مفرطة وفصاحة تجاري كبار الخطباء اللغويين.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_021',
    word: 'Subject-Verb Agreement',
    phonetic: '/ˈsʌbdʒɪkt vɜːrb əˈɡriːmənt/',
    definition_en: 'A rule stating that the verb must harmonize in number (singular/plural) with the main subject.',
    definition_ar: 'وفاق الفاعل والفعل؛ ركن نحوي يوجب ملاءمة حركة وشكل الفعل لصيغة فاعله إفراداً وجمعاً.',
    example_en: 'One butterfly "flies", but three butterflies "fly" high over the sunflower.',
    example_ar: 'فراشة واحدة "تطير"، بينما ثلاث فراشات "تحلق" عالياً فوق زهرة دوار الشمس الصفراء.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_022',
    word: 'Comparative Adjective',
    phonetic: '/kəmˈpærətɪv ˈædʒɪktɪv/',
    definition_en: 'A specific adjective suffix or pattern used to point out differences between two entities.',
    definition_ar: 'صفات المقارنة والمفاضلة الثنائية؛ تراكيب للمقارنة بين بؤرتين وميزتين (مثل: أسرع، أذكى).',
    example_en: 'This interactive voice lab is "easier" than learning from heavy textbooks.',
    example_ar: 'هذا التطبيق الرقمي المرن "أسهل" وأشد سلاسة في التعليم من الكتب المدرسية السميكة.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_023',
    word: 'Superlative Adjective',
    phonetic: '/suːˈpɜːrlətɪv ˈædʒɪktɪv/',
    definition_en: 'An adjective form denoting the absolute highest or lowest degree of a trait.',
    definition_ar: 'صيغة التفضيل المطلق؛ النعت الذي يضع صاحب السمة في قمة القائمة على نظرائه (مثل: الأفضل، الأجمل).',
    example_en: 'Basim is the "best" scholar inside this English academy class.',
    example_ar: 'يعتر باسم بحق الطالب "الأفضل" والأنشط في فصول الأكاديمية قاطبة.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_024',
    word: 'Modal Verb',
    phonetic: '/ˈmoʊdl vɜːrb/',
    definition_en: 'An auxiliary verb that gives contextual colors of ability, permission, or absolute necessity.',
    definition_ar: 'فعل ناقص / احتمال وجوبي؛ أفعال إضافية تعبر عن القدرة والتكافؤ (مثل: يجب، ينبغي، يمكن).',
    example_en: 'You "must" practice aloud daily if you truly desire fluency.',
    example_ar: '"يجب" عليك الصدح والجهر بالمحادثة دورياً إن كنت تأمل حقاً بلوغ شواطئ الفصاحة.',
    category: 'grammar'
  },
  {
    id: 'fc_gr_025',
    word: 'Definite Article',
    phonetic: '/ˈdefɪnət ˈɑːrtɪkl/',
    definition_en: 'The highly specific grammatical word "the", used to refer to concrete, known topics.',
    definition_ar: 'أداة التعريف (الـ)؛ الحرف التعريفي السحري الذي يفرد الاسم بنية التحديد القاطع.',
    example_en: 'Did you see "the" lighthouse on our interactive global map?',
    example_ar: 'هل عاينت "الـ" منارة الشامخة الرائعة المتألقة في خريطتنا الجغرافية العالمية التفاعلية؟',
    category: 'grammar'
  },

  // Idioms & Everyday (25 cards)
  {
    id: 'fc_id_001',
    word: 'Piece of cake',
    phonetic: '/piːs əv keɪk/',
    definition_en: 'Something that is very easy to do.',
    definition_ar: 'تعبير مجازي يعني أن الشيء سهل للغاية وميسر كأكل قطعة حلوى.',
    example_en: 'The placement test was a piece of cake because I prepared well.',
    example_ar: 'كان اختبار تحديد المستوى سهلاً للغاية لأنني استعددت جيداً.',
    category: 'idioms'
  },
  {
    id: 'fc_id_002',
    word: 'Break a leg',
    phonetic: '/breɪk ə leɡ/',
    definition_en: 'A pleasant phrase used to wish someone good luck, especially before a performance.',
    definition_ar: 'تعبير مجازي شهير لتمني الحظ الموفق والتوفيق والنجاح لشخص مقبل على اختبار.',
    example_en: 'You are going to take the speaking challenge? Break a leg!',
    example_ar: 'هل أنت مقبل على تحدي المحادثة التفاعلي؟ أتمنى لك كل التوفيق والنجاح!',
    category: 'idioms'
  },
  {
    id: 'fc_id_003',
    word: 'Hit the books',
    phonetic: '/hɪt ðə bʊks/',
    definition_en: 'To study very hard, especially when preparing for tests.',
    definition_ar: 'تعبير يعني المذاكرة والاجتهاد بقوة تامة والالتزام بجدول المراجعة بنشاط.',
    example_en: 'Exam week is starting, so it is time to hit the books!',
    example_ar: 'أسبوع المراجعة بدأ، لذا حان وقت الانكباب على الكتب والاجتهاد بقوة!',
    category: 'idioms'
  },
  {
    id: 'fc_id_004',
    word: 'Under the weather',
    phonetic: '/ˈʌndər ðə ˈweðər/',
    definition_en: 'Feeling mildly unwell, slightly tired, or catching a simple seasonal cold.',
    definition_ar: 'توعك عابر؛ الشعور بنقص مؤقت في النشاط وتراجع الصحة جراء إجهاد بسيط.',
    example_en: 'I felt a bit under the weather yesterday, so I slept early for some rest.',
    example_ar: 'أمسكت متعباً وبدا التوعك طفيفاً عليّ، فآثرت النوم والخلود للراحة الفورية.',
    category: 'idioms'
  },
  {
    id: 'fc_id_005',
    word: 'Spill the beans',
    phonetic: '/spɪl ðə biːnz/',
    definition_en: 'To accidentally reveal sensitive information or disrupt a private surprise party.',
    definition_ar: 'إفشاء وعاء الأسرار؛ كشف تفاصيل مكنونة ومستورة على حين غرة وإبطال عنصر المفاجأة.',
    example_en: 'Please do not spill the beans about the unexpected party on Saturday!',
    example_ar: 'أتوسل إليك، احرص على ألا تبوح بالأمر وتفسد مفاجأتنا الرائعة لحفل عطلة يوم السبت!',
    category: 'idioms'
  },
  {
    id: 'fc_id_006',
    word: 'Bite the bullet',
    phonetic: '/baɪt ðə ˈbʊlɪt/',
    definition_en: 'To bravely face an inevitable, highly challenging, or painful situation with courage.',
    definition_ar: 'عض الرصاصة / تجرع الصبر الباسل؛ حشد الإرادة لمواجهة مهمة قاسية بقلب ثابت لا يهاب الصعاب.',
    example_en: 'She decided to bite the bullet and take the recording task immediately.',
    example_ar: 'حزمت شؤونها ووطنت نفسها عازمة على مباشرة تحدي الإلقاء والتسجيل الصوتي الشاق دون تردد.',
    category: 'idioms'
  },
  {
    id: 'fc_id_007',
    word: 'Burning midnight oil',
    phonetic: '/ˈbɜːrnɪŋ ˈmɪdnaɪt ɔɪl/',
    definition_en: 'Working, writing, or studying late into the night, exhausting the oil lamp.',
    definition_ar: 'سهر دؤوب / حرق زيت القناديل؛ بذل الساعات الطوال والجهد الجبار في المطالعة الدقيقة ليلاً.',
    example_en: 'He is burning the midnight oil to build the smart application.',
    example_ar: 'إنه يسهر ويواصل جده الليل بالنهار، منقباً ودارساً لبناء التطبيق البرمجي التفاعلي الرائد.',
    category: 'idioms'
  },
  {
    id: 'fc_id_008',
    word: 'Call it a day',
    phonetic: '/kɔːl ɪt ə deɪ/',
    definition_en: 'To comfortably freeze work on an active project and halt labor until the morning.',
    definition_ar: 'الاكتفاء بالجهد؛ إنهاء جدول العمل الشاق لهذا النهار والانعطاف للاستراحة والسكينة.',
    example_en: 'We solved thirty spelling quests! Let us call it a day now and rest.',
    example_ar: 'لقد هزمنا وحللنا ثلاثين لغز تهجئة لغوية مذهل! دعونا نعلن نهاية جولة اليوم للراحة ونكتفي.',
    category: 'idioms'
  },
  {
    id: 'fc_id_009',
    word: 'Cold shoulder',
    phonetic: '/koʊld ˈʃoʊldər/',
    definition_en: 'An intentional, unfriendly display of coldness or complete rejection and silence.',
    definition_ar: 'الكتف البارد / الصدود الجافي؛ تجاهل متعمد وإعراض بارز ببرود بداعي التحفظ أو العتاب.',
    example_en: 'She gave her partner the cold shoulder after a small academic argument.',
    example_ar: 'قوبل بصدود جاف وإعراض بارد وهادئ منها إثر تباين بسيط في وجهات النظر ببحث الصف.',
    category: 'idioms'
  },
  {
    id: 'fc_id_010',
    word: 'Cutting corners',
    phonetic: '/ˈkʌtɪŋ ˈkɔːrnərz/',
    definition_en: 'Doing a piece of work in a cheap, hurried or negligent way to save resources or time.',
    definition_ar: 'سلوك منحنيات الاختصار البخس؛ التخلي عن جودة التفاصيل طلباً للسرعة أو توفير الدبابات.',
    example_en: 'Never cut corners when parsing academic text, check every complex preposition.',
    example_ar: 'إياك وسرعة التملص من جودة التحليل، بل تقصَّ كل حرف جر وبنود قواعد اللسان بخشوع وعناية.',
    category: 'idioms'
  },
  {
    id: 'fc_id_011',
    word: 'Cry over spilled milk',
    phonetic: '/kraɪ ˈoʊvər spɪld mɪlk/',
    definition_en: 'To feel deep futile regret over past events that can never be reversed.',
    definition_ar: 'الحسرة العبثية على المفقود المكسور؛ البكاء على لبن انسكب وتوزع بالرمال دون جدوى.',
    example_en: 'Don not cry over spilled milk, just learn from the errors and retry.',
    example_ar: 'دعك من حبال الأسف والتحسر الخايب، بل تزود بيقظة الدروس وكرر مغامرتك بنهج مستنير.',
    category: 'idioms'
  },
  {
    id: 'fc_id_012',
    word: 'Once in blue moon',
    phonetic: '/wʌns ɪn ə bluː muːn/',
    definition_en: 'An event that occurs extremely rarely or under exceptional circumstances.',
    definition_ar: 'نادر الحدوث؛ واقعة متفرقة نائية الفترات كظهور القمر الأزرق البديع في كبد السماء.',
    example_en: 'We only see him once in a blue moon since he moved to New York.',
    example_ar: 'أضحينا لا نراه إلا في فترات متباعدة وشديدة الندرة منذ قرار هجرته وجولاته بنواحي نيويورك.',
    category: 'idioms'
  },
  {
    id: 'fc_id_013',
    word: 'Through thick & thin',
    phonetic: '/θruː θɪk ænd θɪn/',
    definition_en: 'In spite of all diverse difficulties, sweet hurdles, and varied seasons of luck.',
    definition_ar: 'على أية حال وعبر منعطفات الدهر؛ الوقوف متضامناً متكافلاً في اليسر والعسر وبسط السراء والضراء.',
    example_en: 'True lifetime friends stand together through thick and thin without doubts.',
    example_ar: 'يلتحم الرفاق الصادقون صفاً حامياً واحداً خلف رفاقهم في أحلك الضيق وأزهى مرابع السعة.',
    category: 'idioms'
  },
  {
    id: 'fc_id_014',
    word: 'Face the music',
    phonetic: '/feɪs ðə ˈmjuːzɪk/',
    definition_en: 'To boldly accept and endure the critical consequences of one is prior errors.',
    definition_ar: 'الجهر بتحمل العاقبة؛ الوقوف برزانة وروح مسؤولة لتلقي العقوبة أو النقد اللاذع عن هفواتك.',
    example_en: 'After breaking the classroom window, the kids had to face the music.',
    example_ar: 'بعد كسرهم الواجهة الزجاجية لقاعة الصف، اضطر الصبيان للاعتراف والاعتذار للمعلم فوراً.',
    category: 'idioms'
  },
  {
    id: 'fc_id_015',
    word: 'Fit as a fiddle',
    phonetic: '/fɪt æz ə ˈfɪdl/',
    definition_en: 'Representing absolute high physical fitness, robust core health, and bright energy.',
    definition_ar: 'قوي كالوتر السليم؛ التمتع بلياقة باهرة، نشاط متقد، وخلو كامل من الأسقام.',
    example_en: 'Grandpa jogs every morning in the fresh forest air and is fit as a fiddle.',
    example_ar: 'يهرول جدي الشهم مطلع كل يوم في نسيم غدير الغابة متمتعاً بصوت جهوري وصحة فولاذية.',
    category: 'idioms'
  },
  {
    id: 'fc_id_016',
    word: 'Let cat out of bag',
    phonetic: '/let ðə kæt aʊt əv ðə æɡ/',
    definition_en: 'To make an accidental, highly premature disclosure of a well-guarded secret.',
    definition_ar: 'إطلاق القطة من الحقيبة؛ كشف الغطاء والمفاجأة قبل دقات الساعة المتفق عليها بغفلة وسذاجة.',
    example_en: 'My little sister let the cat out of the bag regarding my graduation gift.',
    example_ar: 'فلتت منها الكلمات دون تقدير، وأخبرتني شقيقتي الصغرى عن كنه هدية تخرجي المكنونة مراراً.',
    category: 'idioms'
  },
  {
    id: 'fc_id_017',
    word: 'Miss the boat',
    phonetic: '/hɪs ðə boʊt/',
    definition_en: 'To lose a wonderful, highly golden chance by being slow, undecided, or inactive.',
    definition_ar: 'الخسارة لتأخر الموعد؛ ضياع فرصة العمر المواتية نتيجة الوهن والإهمال وبطء المبادرة.',
    example_en: 'Apply for the scholarship today, or you will miss the boat!',
    example_ar: 'تقدم لخوض غمار سباق المنحة اليوم بلا تسويف، لئلا تجد القارب ملوحاً والفرصة انقضت.',
    category: 'idioms'
  },
  {
    id: 'fc_id_018',
    word: 'No pain, no gain',
    phonetic: '/noʊ peɪn noʊ ɡeɪn/',
    definition_en: 'A classic idiom emphasizing that suffering or hard work is key to progress.',
    definition_ar: 'لا حصاد إلا بعرق ومعاناة؛ ضرورة تحمل غبار الدرب وصروف الأيام لنيل لذة التاج والنصر.',
    example_en: 'Keep repeating the tough complex pronunciation patterns! Remember, no pain, no gain!',
    example_ar: 'واصل الصراع والصراخ مع الكلمات وجز الجمل الصعبة! تذكر، لن يورق الورد بغير غرس الجهد!',
    category: 'idioms'
  },
  {
    id: 'fc_id_019',
    word: 'On cloud nine',
    phonetic: '/ɑːn klaʊd naɪn/',
    definition_en: 'Experiencing maximum state of bliss, pride, victory, and extreme satisfaction.',
    definition_ar: 'التحليق بالسحابة التاسعة؛ غبطة غامرة تكاد تختطف الروح طرباً وسروراً بالانجاز الفذ.',
    example_en: 'When she was awarded the speech diamond, she was on cloud nine.',
    example_ar: 'عندما توجت بدرع الطلاقة الماسي في المهرجان السنوي للغات، طار عقلها من السعادة الطاغية.',
    category: 'idioms'
  },
  {
    id: 'fc_id_020',
    word: 'Pull someone leg',
    phonetic: '/pʊl leɡ/',
    definition_en: 'To tease, prank, or mislead someone in a lighthearted, deeply humorous manner.',
    definition_ar: 'مداعبة / جر الخيط الفكاهي؛ ممازحة الصديق بادعاء كاذب طريف لاستحثاث ضحك متبادل.',
    example_en: 'Are you serious? No, I am just pulling your leg about losing the key!',
    example_ar: 'أحقاً حدث هذا؟ كلا بالطبع، إنما لاعب عقلك وبصيرة مزاحك مداعباً بشأن ضياع المفاتيح!',
    category: 'idioms'
  },
  {
    id: 'fc_id_021',
    word: 'See eye to eye',
    phonetic: '/siː aɪ tuː aɪ/',
    definition_en: 'To reach a complete, flawless consensus or share the exact same intellectual views.',
    definition_ar: 'اتفاق كلي متطابق؛ ائتلاف الرأي وتواصل الأرواح بانسجام تام دون خصام في الجدل.',
    example_en: 'The broad board members see eye to eye on opening the new virtual branch.',
    example_ar: 'اتحدت مساعي ورؤى أعضاء مجلس الإدارة بالاتفاق الكامل لتأسيس وتشييد الفرع التفاعلي الجديد.',
    category: 'idioms'
  },
  {
    id: 'fc_id_022',
    word: 'With grain of salt',
    phonetic: '/wɪð ɡreɪn əv sɔːlt/',
    definition_en: 'To listen to statements while displaying healthy skepticism or critical filter.',
    definition_ar: 'الاستماع بوعي نقدي متحفظ؛ عدم التسليم التام بالإشاعات والمسبقات دون فحص وتمحيص علمي.',
    example_en: 'He takes the internet tech rumors with a heavy grain of salt.',
    example_ar: 'إنه يلتقط أخبار وشائعات الشركات التقنية الرائجة في المواقع بوجل وبكثير من التحفظ العقلي.',
    category: 'idioms'
  },
  {
    id: 'fc_id_023',
    word: 'Think out the box',
    phonetic: '/θɪŋk aʊtˈsaɪd ðə bɑːks/',
    definition_en: 'To approach abstract issues using creative, highly unconventional thinking paths.',
    definition_ar: 'تفكير متمرد على النمطية؛ الإبداع المتفجر للخروج بحروف وإبداعات أبهى من سياج المألوف.',
    example_en: 'To solve the mystery of the missing key, you must think outside the box.',
    example_ar: 'لكي تحل هذا اللغز الأحجية الغامض بأقصر السبل، احثث ذهنك للتفكير بنظرة غير اعتيادية.',
    category: 'idioms'
  },
  {
    id: 'fc_id_024',
    word: 'An arm and a leg',
    phonetic: '/ən ɑːrm ænd ə leɡ/',
    definition_en: 'Extremely high of price, costing massive sums of funds or resources to buy.',
    definition_ar: 'ثمنه عضد ورجل؛ كناية بليغة عن المبالغ المهولة التي تكلفها المقتنيات النادرة والنفيسة.',
    example_en: 'Buying the professional astronomer telescope cost him an arm and a leg.',
    example_ar: 'لفظه ثقيل، إذ كلفه جلب هذا التلسكوب الكوني الدقيق المطور مبالغ ضخمة كادت تبخر رصيده.',
    category: 'idioms'
  },
  {
    id: 'fc_id_025',
    word: 'Bless in disguise',
    phonetic: '/ˈblesɪŋ ɪn dɪsˈɡaɪz/',
    definition_en: 'Something that initially seemed highly unfortunate but ultimately proved beneficial.',
    definition_ar: 'ربَّ ضارة نافعة؛ حادثة تبدو لك في الوهلة الأولى محنة مدمرة، وهي تنطوي على وافر نعم الغيب.',
    example_en: 'Missing that train was a blessing in disguise because he met his future mentor.',
    example_ar: 'ضياع موعد القطار البارحة كان بحق خيرة صائبة، إذ أتاح له بالصدفة لقاء معلمه الأكاديمي الملهم.',
    category: 'idioms'
  },

  // Kids Essentials (25 cards)
  {
    id: 'fc_kd_001',
    word: 'Astronaut',
    phonetic: '/ˈæstrənɔːt/',
    definition_en: 'A brave person trained to travel and work in outer space.',
    definition_ar: 'رائد فضاء؛ شخص مغامر وشجاع تم ترويضه للطيران ومباشرة المهام خارج كوكب الأرض.',
    example_en: 'The young astronaut looked at the bright stars in the night.',
    example_ar: 'نظر رائد الفضاء الصغير إلى النجوم البراقة في السماء الحالك سوادها.',
    category: 'kids'
  },
  {
    id: 'fc_kd_002',
    word: 'Magician',
    phonetic: '/məˈdʒɪʃn/',
    definition_en: 'A magical performer who entertains people with incredible illusions and tricks.',
    definition_ar: 'الساحر الترفيهي؛ فنان يقدم ألعاب خفة وحيلاً خيالية تثير دهشة المتابعين.',
    example_en: 'The magician pulled a cute rabbit out of the purple hat.',
    example_ar: 'أخرج الساحر المغامر أرنباً لطيفاً من قبعته البنفسجية الرائعة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_003',
    word: 'Rainbow',
    phonetic: '/ˈreɪnboʊ/',
    definition_en: 'A gorgeous, colourful arch of light that displays in the sky when rain meets sunshine.',
    definition_ar: 'قوس قزح؛ زينة بهية من ألوان الطيف المزهرة المقوسة ترسم في الأعالي عند تسلل الشمس وسط المطر.',
    example_en: 'Look! A beautiful rainbow appeared in the blue sky after the storm.',
    example_ar: 'انظر بجلال! لقد انبثق قوس قزح أخاذ بألوانه العجب في كبد السماء الزرقاء عقب انقشاع العاصفة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_004',
    word: 'Butterfly',
    phonetic: '/ˈbʌtərflaɪ/',
    definition_en: 'An elegant insect with large, brilliantly coloured, patterned wings that feeds on flowers.',
    definition_ar: 'فراشة؛ زهرة طائرة وادعة ذات ألوان متدرجة بديعة ترفرف بجناحيها بخفة حول البساتين والخمائل.',
    example_en: 'The colourful butterfly landed softly on the yellow sunflower.',
    example_ar: 'حطت الفراشة الغنية بألوانها كلوحة فنان برقة فائقة ووداعة فوق رأس زهرة عباد الشمس الصفراء.',
    category: 'kids'
  },
  {
    id: 'fc_kd_005',
    word: 'Dinosaur',
    phonetic: '/ˈdaɪnəsɔːr/',
    definition_en: 'A giant, fossil-famed reptile that ruled our planet millions of legendary years ago.',
    definition_ar: 'ديناصور؛ مخلوق فخم جبار مهيب البنية ساد القارات والبراري قديماً ثم صار تاريخاً غابراً.',
    example_en: 'The science museum displays a massive skeleton of a friendly dinosaur.',
    example_ar: 'يعرض متحف العلوم مزاراً شهيراً يضم مجسماً وهيكلاً عظمياً هائلاً لبقايا ديناصور أليف.',
    category: 'kids'
  },
  {
    id: 'fc_kd_006',
    word: 'Octopus',
    phonetic: '/ˈɑːktəpʊs/',
    definition_en: 'A highly intelligent, soft-bodied sea creature equipped with eight powerful arms.',
    definition_ar: 'أخطبوط؛ كائن بحري ذكي حذر للغاية يعيش في القيعان ويجول بمساعدة أذرعه الثمانية الفعالة.',
    example_en: 'The clever octopus dynamically hid inside the purple coral reef.',
    example_ar: 'توارى الأخطبوط الماكر بحركة مائجة رشيقة تحت شقوق الشعب المرجانية الملونة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_007',
    word: 'Squirrel',
    phonetic: '/ˈskwɜːrəl/',
    definition_en: 'A nimble, adorable rodent with a large bushy tail that climbs trees to search for tasty nuts.',
    definition_ar: 'سنجاب؛ كائن حيوي سريع الحركة فكاهي الهيئة يعشق تسلق الفروع وحفر مخازن سرية لثمار الجوز والبلّوط.',
    example_en: 'The brown squirrel climbed the oak tree with a hazelnut in its mouth.',
    example_ar: 'ارتقى السنجاب النميري شجرة البلوط العتيقة محتضناً في فمه بندقة صغيرة يحفظها بعيون يقظة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_008',
    word: 'Treasure',
    phonetic: '/ˈtreʒər/',
    definition_en: 'A rich cache of glittering gold coins, gemstones, and ancient royal jewels.',
    definition_ar: 'كنز؛ ذخيرة ثمينة مكدسة بالسبائك النفيسة والجواهر القديمة مخبوءة في جزائر نائية أو سراديب مغلقة.',
    example_en: 'The active young adventurers found a wooden chest filled with gold treasure.',
    example_ar: 'عثر المستكشفون الصغار على صندوق أثري مبني من جذوع الأرز يضج بداعي الذهب والكنوز المتلألئة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_009',
    word: 'Firefighter',
    phonetic: '/ˈfaɪərfaɪtər/',
    definition_en: 'A brave and dedicated officer who extinguishes blazing fires and rescues lives in hazards.',
    definition_ar: 'رجل الإطفاء؛ بطل منقذ يسارع لمقارعة النيران والمخاطر متقنعاً بالخوزة الحمراء حماية للمواطنين.',
    example_en: 'The courageous firefighter saved a beautiful cat from the smoke.',
    example_ar: 'أبلى رجل الإطفاء الشجاع بلاء حسناً مقتحماً طيات الدخان الكثيف لانتشال قطة مكروبة ومذعورة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_010',
    word: 'Detective',
    phonetic: '/dɪˈtektɪv/',
    definition_en: 'A clever investigator who analyzes clues, footprints, and fingerprints to solve puzzles.',
    definition_ar: 'محقق؛ باحث عبقري يستنبط الحقائق من الخيوط الضئيلة والمتاهات لفك ألغاز القضايا والسرقات.',
    example_en: 'The smart detective solved the mystery of the missing key in ten minutes.',
    example_ar: 'تكلل ذكاء المحقق الصبر بجلاء اللبس وكشف لغز اختفاء المفتاح المفقود في دقائق معدودات.',
    category: 'kids'
  },
  {
    id: 'fc_kd_011',
    word: 'Lighthouse',
    phonetic: '/ˈlaɪthaʊs/',
    definition_en: 'A towering stone coast beacon that beams strong light to guide sailing ships in storms.',
    definition_ar: 'منارة؛ برج شاهق يتربع الهضاب البحرية يبعث بخرطوم ضوء باهر ليدل السفن الحائرة ليلاً لموانئ النجاة.',
    example_en: 'The tall lighthouse guided the fishing boat back safely to the harbor.',
    example_ar: 'وجهت أشعة بريق المنارة الوضاء قارب صيادي السمك العائد من لجج البحر الغاضبة برفق للميناء.',
    category: 'kids'
  },
  {
    id: 'fc_kd_012',
    word: 'Sandbox',
    phonetic: '/ˈsændbɑːks/',
    definition_en: 'A shallow wooden enclosure in parks filled with soft clean sand for toddlers to play.',
    definition_ar: 'صندوق الرمال؛ باحة ومساحة صغيرة عذبة ترصف فيها حبات الرمال النقية ليصنع الأطفال منها قلاعاً وحفراً.',
    example_en: 'The happy kids built a massive medieval fort inside the park sandbox.',
    example_ar: 'اجتمعت سواعد الصغار السعداء يضحكون بقصد تشييد حصن رملي حربي مهيب بوسط صندوق الرمل بالمتنزه.',
    category: 'kids'
  },
  {
    id: 'fc_kd_013',
    word: 'Submarine',
    phonetic: '/ˌsʌbməˈriːn/',
    definition_en: 'A robust steel underwater vessel designed to plunge and explore marine life closely.',
    definition_ar: 'غواصة؛ مركبة بحرية حديدية مدهشة بمضخات عملاقة تتدفق بالأعماق لرصد أسرار البحار والمخلوقات.',
    example_en: 'The explorers saw colourful coral reefs through the submarine cabin windows.',
    example_ar: 'تبهر العين رؤية الأسماك البراقة والشعب الوارفة من وراء زجاج نوافذ كابينة الغواصة المتسللة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_014',
    word: 'Telescope',
    phonetic: '/ˈtelɪskoʊp/',
    definition_en: 'An optical lens cylinder device used to view constellations, moons, and faraway planets.',
    definition_ar: 'مرقاب / تلسكوب؛ مجهر مقرب متقدم يمتص دقة الضوء ويقرب الكواكب الشاهقة للأبصار.',
    example_en: 'Look through this amazing telescope to count the silver craters on the moon.',
    example_ar: 'صوّب بصرك عبر عدسة هذا التلسكوب المهيب لتحصي التعرجات وفجوات الفضة المدهشة على وجه القمر.',
    category: 'kids'
  },
  {
    id: 'fc_kd_015',
    word: 'Spaceship',
    phonetic: '/ˈspeɪsˌʃɪp/',
    definition_en: 'A futuristic speed rocket designed to pilot humans and research into outer space orbit.',
    definition_ar: 'سفينة فضاء؛ قاذفة أو مركبة معدنية متطورة للغاية تعبر تخوم الغلاف الجوي لترسو بين كواكب المجرة.',
    example_en: 'The majestic spaceship sailed gracefully past Mars into the galactic void.',
    example_ar: 'اندفعت سفينة الفضاء المهيبة في مسار منسق مخترقة محيط كوكب المريخ إلى المجهول المجري الفسيح.',
    category: 'kids'
  },
  {
    id: 'fc_kd_016',
    word: 'Mermaid',
    phonetic: '/ˈmɜːrmeɪd/',
    definition_en: 'A legendary magical sea maiden with a human upper body and a beautiful scaled fish tail.',
    definition_ar: 'حورية البحر؛ فتاة خيالية فاتنة بنصف علوي آدمي وأسفل سمكي تجول بين الدلافين والقيعان الدافئة.',
    example_en: 'The kind mermaid swam alongside the giant glowing sea turtles.',
    example_ar: 'تألقت حورية البحر الشقراء تسبح في حبور متبادل تارة مع أسماك القرش الأليفة وتارة مع السلاحف.',
    category: 'kids'
  },
  {
    id: 'fc_kd_017',
    word: 'Dragon',
    phonetic: '/ˈdræɡən/',
    definition_en: 'A legendary giant winged creature capable of breathing hot fire and protecting gold castles.',
    definition_ar: 'تنين؛ دابة أسطورية مجنحة قوية تنفث لهباً متقداً من جوفها وتحرس سر الحجارة وبحور السحر.',
    example_en: 'The brave little prince befriended the lonely green dragon.',
    example_ar: 'مد الأمير الصغير يده الوديعة ليعقد أواصر زمالة دافئة مع التنين الأخضر الوحيد الذي يسكن الكهوف.',
    category: 'kids'
  },
  {
    id: 'fc_kd_018',
    word: 'Wizard',
    phonetic: '/ˈwɪzərd/',
    definition_en: 'A wise old man with custom spellcasting staff and star-embroidered robes in fairytales.',
    definition_ar: 'ساحر صالح / حكيم؛ شيخ مجرب في حكايا الأقدمين يمتلك تمتمات وعصا مدهشة تساند الفرسان.',
    example_en: 'The wise wizard crafted a sparkling potion of ultimate joy.',
    example_ar: 'عكف الساحر العتيق في معمله ليصوغ ويحضر ترياقاً وشراباً في غاية العجب ينثر الهناء والسعادة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_019',
    word: 'Castle',
    phonetic: '/ˈkæsl/',
    definition_en: 'A grand stone fortress protected by towers and walls, built as a royal monarch residence.',
    definition_ar: 'قلعة العرش؛ معقل وبناء شاهق مصون بأبراج مراقبة وخنادق ماء يعيش فيه الملوك والأبطال.',
    example_en: 'The visual artist painted a stone castle resting peacefully upon the green hill.',
    example_ar: 'رسم المصمم التفاعلي لوحة مبهرة تجسد حصن القلعة الحجري الأنيق الراسي على كتف التلة الخضراء.',
    category: 'kids'
  },
  {
    id: 'fc_kd_020',
    word: 'Jungle',
    phonetic: '/ˈdʒʌŋɡl/',
    definition_en: 'A dense, wild tropical forest teeming with wildlife, creepers, and giant green leaves.',
    definition_ar: 'أدغال استوائية؛ غابات خضراء دافئة تحتكر شجيرات متشابكة وأنهاراً عذبة وتضج بزئير السباع والقرود.',
    example_en: 'Naughty monkeys swung actively from branch to branch inside the lush jungle.',
    example_ar: 'تفوقت القردة الخفيفة بلعبها وتأرجحها النشط من غصن إلى غصن في ربوع الأدغال الكثيفة الماطرة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_021',
    word: 'Helicopter',
    phonetic: '/ˈhelɪkɑːptər/',
    definition_en: 'An aircraft which flies using overhead rotor bladed wings to lift and hover in the air.',
    definition_ar: 'طائرة مروحية؛ مركبة طائرة ذكية ترتفع عمودياً بفضل دَوران سريع لشاشات مروحتها الجبارة.',
    example_en: 'The rescue helicopter safely landed on the high mountain snow.',
    example_ar: 'حطت مروحية الإغاثة الشجاعة بمثالية بالغة فوق هامة وبساط ثلج جبل إفرست الشاهق.',
    category: 'kids'
  },
  {
    id: 'fc_kd_022',
    word: 'Explorer',
    phonetic: '/ɪkˈsplɔːrər/',
    definition_en: 'A brave adventurer who travels into uncharted territories in search of historical clues.',
    definition_ar: 'مستكشف؛ رحالة مغامر محب للسير في الطرق غير المعبدة بغية كشف الأسرار وسبر جغرافيا الطبيعة.',
    example_en: 'The curious explorer tracked ancient footprints across the canyon.',
    example_ar: 'اقتفى المستكشف الجريء الآثار الجيولوجية العميقة لخطوات مجهولة بقلب الوادي الصخري السحيق.',
    category: 'kids'
  },
  {
    id: 'fc_kd_023',
    word: 'Dolphin',
    phonetic: '/ˈdɑːlfɪn/',
    definition_en: 'A friendly and playful aquatic mammal famous for its intelligence and circular water leaps.',
    definition_ar: 'دولفين؛ كائن مائي ودود ذكي يرافق بحارة الصيادين ليعزف معهم حركات وبهلوانيات رائقة بالهواء.',
    example_en: 'A joyful dolphin leaped high from the water to greet our small boat.',
    example_ar: 'دلت علامات البهجة على قفزة الدولفين الرائعة بالهواء استجابة وضيافة وتحية لأطفال المركب.',
    category: 'kids'
  },
  {
    id: 'fc_kd_024',
    word: 'Kangaroo',
    phonetic: '/ˌkæŋɡəˈruː/',
    definition_en: 'An Australian marsupial mammal with powerful hind legs for high-speed hopping bounds.',
    definition_ar: 'كنغر؛ حيوان أسترالي فخم شهير يقفز ببراعة بفضل رجليه الخلفيتين ويمتلك جيباً دافئاً لصغاره.',
    example_en: 'The caring mother kangaroo carried her pouch baby with maximum tenderness.',
    example_ar: 'حفظت أم الكنغر الحنون رضيعها الضئيل الغض داخل جيب بطنها دافئاً يحميه من لفح الريح والوحوش.',
    category: 'kids'
  },
  {
    id: 'fc_kd_025',
    word: 'Playground',
    phonetic: '/ˈpleɪɡraʊnd/',
    definition_en: 'An outdoor arena equipped with swings, high slides, and structures for kids physical recreation.',
    definition_ar: 'ساحة الملعب؛ واحة غناء فسيحة بالمنتزه تضم مراجيح وزحاليق ومغامرات تشمر لها رغبات الأطفال.',
    example_en: 'Laughter filled the playground as children raced joyfully towards the swings.',
    example_ar: 'ضجت باحة الألعاب بضحكات الطفولة الزاهية وهم يتسابقون في مودة للظفر ببلبلة المرجوحة الوارفة.',
    category: 'kids'
  },
  // 📚 100 MORE WORDS, EXPRESSIONS, RULES, AND TERMS FOR CHILDREN
  {
    id: 'fc_kd_026',
    word: 'Kitten',
    phonetic: '/ˈkɪtn/',
    definition_en: 'A young domestic cat that is small, furry, and very playful.',
    definition_ar: 'قطة صغيرة؛ هرة غضة الفرو ناعمة الملمس تلعب بخيوط الصوف الملونة في المنزل.',
    example_en: 'The sleepy kitten curled up into a soft ball on my warm lap.',
    example_ar: 'تأرجحت الهرة النعسانة حتى التفت ككرة صوف دافئة على حجر ركبتي.',
    category: 'kids'
  },
  {
    id: 'fc_kd_027',
    word: 'Puppy',
    phonetic: '/ˈpʌpi/',
    definition_en: 'A young dog that loves to wag its tail and run fast.',
    definition_ar: 'جرو صغير؛ كلب غض لطيف يهز ذيله من الفرح ويتعلق بمدربيه بحي حماسي.',
    example_en: 'The playful puppy barked joyfully when it saw the yellow ball bounce.',
    example_ar: 'أطلق الجرو اللعوب نباحاً طفولياً بهيجاً عندما رأى الكرة الصفراء ترتد بمرح.',
    category: 'kids'
  },
  {
    id: 'fc_kd_028',
    word: 'Squirrel',
    phonetic: '/ˈskwɜːrəl/',
    definition_en: 'A small forest rodent with a bushy tail that climbs trees to search for acorns.',
    definition_ar: 'سنجاب؛ حيوان غابي رشيق بذيل كثيف ريشي يتسلق الصنوبر ليدخر حبات البلوط الطازجة.',
    example_en: 'The nimble squirrel hid a brown acorn inside a hollow oak trunk.',
    example_ar: 'خبأ السنجاب السريع حبة بلوط بنية بداخل تجويف جذع شجرة البلوط العتيقة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_029',
    word: 'Butterfly',
    phonetic: '/ˈbʌtərflaɪ/',
    definition_en: 'An insect with grand colourful scaled wings that flutters around blooming fields.',
    definition_ar: 'فراشة؛ حشرة رقيقة بأجنحة حريرية زاهية الألوان تحلق حول الزهور الفواحة بالبساتين.',
    example_en: 'A beautiful blue butterfly landed gently on the yellow sunflower leaf.',
    example_ar: 'حطت فراشة زرقاء بديعة بهدوء فوق ورقة زهرة عباد الشمس الصفراء البهية.',
    category: 'kids'
  },
  {
    id: 'fc_kd_030',
    word: 'Penguin',
    phonetic: '/ˈpeŋɡwɪn/',
    definition_en: 'A flightless black-and-white sea bird that waddles on ice and swims incredibly fast.',
    definition_ar: 'بطريق؛ طائر بحري لا يطير يرتدي كسوة باللونين الأبيض والأسود ويمشي الهوينى متأرجحاً على الجليد.',
    example_en: 'A cute penguin slid down the icy snowy slide into the blue ocean.',
    example_ar: 'انزلق بطريق ظريف فوق المنحدر الثلجي قاصداً الانغماس في مياه المحيط العميقة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_031',
    word: 'Rainbow',
    phonetic: '/ˈreɪnboʊ/',
    definition_en: 'An arch of beautiful spectrum colours that appears in the sky when sun rays pierce rain clouds.',
    definition_ar: 'قوس قزح؛ طيف وخطوط ضوئية ملونة خلابة تبتسم في السماء عقب هطول المطر مع طلوع الشمس.',
    example_en: 'We pointed happily at the perfect rainbow shining bright in the afternoon sky.',
    example_ar: 'أشرنا بأصابعنا المندهشة فرحاً بقوس المطر الفاتن وهو يشرق وسط غيوم العصر.',
    category: 'kids'
  },
  {
    id: 'fc_kd_032',
    word: 'Giggle',
    phonetic: '/ˈɡɪɡl/',
    definition_en: 'To laugh in a quiet, light, and silly way because something is funny.',
    definition_ar: 'قهقهة خفيفة أو ضحكة طفولية مكتومة تعبر عن سرور غامر أمام موقف مضحك.',
    example_en: 'The children started to giggle when the clown made a silly mistake.',
    example_ar: 'انخرط الأطفال في ضحكات وقهقهات رقيقة عندما تظاهر المهرج بالوقوع أرضاً.',
    category: 'kids'
  },
  {
    id: 'fc_kd_033',
    word: 'Dandelion',
    phonetic: '/ˈdændɪlaɪən/',
    definition_en: 'A bright yellow wild flower with fluffy white seeds that fly in the wind when blown.',
    definition_ar: 'قاصد؛ زهرة الهندباء البرية الصفراء التي تتحول لكرات ريشية بيضاء نطير بذورها مع النسمات.',
    example_en: 'Make a sweet wish before you blow the white dandelion seeds away!',
    example_ar: 'تمنّ أمنية دافئة قبل أن تنفخ بلطف بذور زهرة الهندباء الناعمة في الفضاء العريض!',
    category: 'kids'
  },
  {
    id: 'fc_kd_034',
    word: 'Acorn',
    phonetic: '/ˈeɪkɔːrn/',
    definition_en: 'The shiny oval nut of the oak tree, which is a favourite food for forest squirrels.',
    definition_ar: 'ثمرة البلوط؛ بندقة بيضوية صلبة ولامعة تسقط من غصن السنديان الأخضر وتقضمها السناجب.',
    example_en: 'An acorn fell with a little soft thud onto the grassy meadow floor.',
    example_ar: 'سقطت ثمرة بلوط صغيرة مسببة غنوة دافئة مكتومة فوق مرج الحشائش الخضراء.',
    category: 'kids'
  },
  {
    id: 'fc_kd_035',
    word: 'Polite',
    phonetic: '/pəˈlaɪt/',
    definition_en: 'Having or showing good academic manners and kind respect towards others.',
    definition_ar: 'مهذب / مؤدب؛ من يتحلى بجميل الخصال وأدبيات الأخلاق ويقول الكلمات اللطيفة دائماً.',
    example_en: "A polite child always remembers to say 'Please' and 'Thank you' warmly.",
    example_ar: "الطفل المهذب لا يغفل قط عن قول 'من فضلك' و'شكراً لك' بأدب وود قاطع.",
    category: 'kids'
  },
  {
    id: 'fc_kd_036',
    word: 'Creative',
    phonetic: '/kriˈeɪtɪv/',
    definition_en: 'Having or showing imagination and unique thoughts to paint and build new toys.',
    definition_ar: 'مبدع؛ ذو خيال خصب وأفكار فريدة مذهلة ينسج بها لوحات فنية أو يصمم مركبات مدهشة.',
    example_en: 'Lina is super creative; she made a cardboard robot with glowing eyes.',
    example_ar: 'لينا طفلة خلاقة فائقة الإبداع؛ فقد صنعت رجلاً آلياً من الكرتون المستعمل بعيون مضيئة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_037',
    word: 'Helper',
    phonetic: '/ˈhelpər/',
    definition_en: 'A classmate or child who aids others to finish actions, clean, and study.',
    definition_ar: 'مساعد؛ شخص يمد يد العون والمحبة لإخوانه لتنظيف الغرفة أو طي الملابس أو مراجعة الحروف.',
    example_en: 'Basim is a wonderful classroom helper; he neatly organized all books.',
    example_ar: 'باسم هو مساعد صفي غاية في اللطف والأمانة؛ فقد رتب جميع كتيبات الرفوف بشكل رائع.',
    category: 'kids'
  },
  {
    id: 'fc_kd_038',
    word: 'Adjective',
    phonetic: '/ˈædʒɪktɪv/',
    definition_en: 'A dynamic descriptive grammar word that tells us more about a noun.',
    definition_ar: 'الصفة (قاعدة لغوية)؛ كلمة لغوية تعبر وتصف طبيعة أو لون أو شكل الاسم ومثال ذلك "كبير" أو "سريع".',
    example_en: "In the sentence 'The blue sky is high', 'blue' and 'high' are adjectives.",
    example_ar: "في جملة 'السماء الزرقاء عالية'، تعد الكلمات 'الزرقاء' و'عالية' صفات لغوية واضحة.",
    category: 'kids'
  },
  {
    id: 'fc_kd_039',
    word: 'Action Verb',
    phonetic: '/ˈækʃn vɜːrb/',
    definition_en: 'A grammar word that expresses physical movement or mental energy like run, think, sing.',
    definition_ar: 'فعل الحركة (قاعدة وجمل)؛ اللفظ اللغوي الدال على النشاط والعمل كالركض والكتابة والغناء.',
    example_en: "Verbs bring life to your letters; see how 'jump' adds action to the card.",
    example_ar: "تبث الأفعال الروح في التعبير؛ انظر كيف يضفي الفعل 'يقفز' حركة محسوسة على القصة.",
    category: 'kids'
  },
  {
    id: 'fc_kd_040',
    word: 'Singular',
    phonetic: '/ˈsɪŋɡjələr/',
    definition_en: 'Grammar form representing only one person, place, thing, or abstract idea.',
    definition_ar: 'المفرد (قواعد لغة)؛ صيغة صرفية تدل على ذات واحدة أو كائن واحد كقلم أو هرة واحدة.',
    example_en: "The word 'book' is singular, representing one reading accessory.",
    example_ar: "كلمة 'كتاب' هي صيغة مفردة، تدل بوضوح على غرض قرائي فردي واحد.",
    category: 'kids'
  },
  {
    id: 'fc_kd_041',
    word: 'Plural',
    phonetic: '/ˈplʊrəl/',
    definition_en: 'Grammar word state representing more than one person, animal, or object.',
    definition_ar: 'الجمع (قواعد لغة)؛ الصيغة الصرفية الدالة على أكثر من اثنين من الأشياء كالكتب والأقلام الملونة.',
    example_en: "We change 'apple' to the plural form 'apples' by adding the letter 's'.",
    example_ar: "نحوّل الاسم 'تفاحة' إلى صيغة الجمع 'تفاحات' ببساطة من خلال إلحاق حرف 's'.",
    category: 'kids'
  },
  {
    id: 'fc_kd_042',
    word: 'Preposition',
    phonetic: '/ˌprepəˈzɪʃn/',
    definition_en: 'A linking grammar word showing location or direction like in, on, under, behind.',
    definition_ar: 'حرف الجر والظرف؛ كلمات ربط تعبر عن موقيعات الأشياء ومثالها فوق وتحت وبداخل.',
    example_en: "The phrase 'under the table' uses 'under' as an informative preposition.",
    example_ar: "تستخدم العبارة 'تحت الطاولة' كلمة 'تحت' كحرف جر مكاني غاية في الدقة دال على الموضع.",
    category: 'kids'
  },
  {
    id: 'fc_kd_043',
    word: 'Piece Of Cake',
    phonetic: '/piːs əv keɪk/',
    definition_en: 'An idiom expression meaning something that is incredibly easy to complete.',
    definition_ar: 'سهل للغاية؛ تعبير اصطلاحي شهير يعني أن المهمة أو الاختبار في غاية البساطة واليسر.',
    example_en: 'Do not be afraid of the daily dictionary quiz; it is a piece of cake!',
    example_ar: 'لا تخشَ الاختبار القصير لقاموس الكلمات اليومي؛ فهو في متناول اليد وسهل للغاية كالماء الجاري!',
    category: 'kids'
  },
  {
    id: 'fc_kd_044',
    word: 'Easy Peasy',
    phonetic: '/ˈiːzi ˈpiːzi/',
    definition_en: 'A cheerful kid expression indicating absolute comfort and no study difficulty.',
    definition_ar: 'بسيط جداً؛ تعبير دارج مبهج للأطفال يعلن الخفة والصفرية في العقبات والتعقيد.',
    example_en: 'Writing my name in English letters is easy peasy lemon squeezy!',
    example_ar: 'كتابة اسمي الثنائي بالأحرف الإنجليزية الجميلة هي لعبة ممتعة وأمر بغاية البساطة والوضوح!',
    category: 'kids'
  },
  {
    id: 'fc_kd_045',
    word: 'Spill The Beans',
    phonetic: '/spɪl ðə biːnz/',
    definition_en: 'To reveal a secret plan or surprise party details ahead of proper time.',
    definition_ar: 'يفشي السر؛ تعبير اصطلاحي طريف يعني البوح بخبر مخبأ أو تفاصيل حفلة مفاجئة مسبقاً بدعابة.',
    example_en: 'Do not spill the beans about our dad birthday cake surprise party!',
    example_ar: 'إياك وفضح سر الكعكة أو إفشاء تفاصيل حفلة عيد ميلاد والدنا المفاجئة لوخيان الموعد!',
    category: 'kids'
  },
  {
    id: 'fc_kd_046',
    word: 'Break A Leg',
    phonetic: '/breɪk ə leɡ/',
    definition_en: 'An encouraging theater and speech idiom wishing good fortune and high grades.',
    definition_ar: 'حظاً سعيداً وتفوقاً؛ عبارة تمني التوفيق والتميز للشخص الذي يوشك على اعتلاء مسرح الإلقاء.',
    example_en: 'You practiced the English poem beautifully; go out there and break a leg!',
    example_ar: 'لقد تدربت ولخصت أبيات الأنشودة الإنجليزية بإبداع؛ تقدم الآن ونتمنى لك غزارة التفوق والتميز!',
    category: 'kids'
  },
  {
    id: 'fc_kd_047',
    word: 'On Cloud Nine',
    phonetic: '/ɑːn klaʊd naɪn/',
    definition_en: 'An idiom state of being intensely happy, thrilled, and full of bubbly energy.',
    definition_ar: 'عالي الهناء والسعادة؛ غارق في بحور السرور والابتهاج لدرجة خيالية كمن يحلق فوق السحاب.',
    example_en: 'When she won the spelling champion cup, she was on cloud nine.',
    example_ar: 'عندما توجت بكأس تفوق فرسان الهجاء الإنجليزي بالدورة، طارت من شدة الفرح والسعادة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_048',
    word: 'Koala',
    phonetic: '/koʊˈɑːlə/',
    definition_en: 'A soft grey plant-eating Australian tree mammal that feeds on green eucalyptus leaves.',
    definition_ar: 'كوالا؛ حيوان أسترالي دافئ الفراء بطيء ومحبب للنفس يتعلق بالأشجار ويمتص أوراق الكافور العذبة.',
    example_en: 'The adorable koala hugged the tree trunk and took a long peaceful nap.',
    example_ar: 'احتصن حيوان الكوالا الظريف جذع شجرة الكينا العالية مستغرقاً في غفوة طويلة هادئة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_049',
    word: 'Seashell',
    phonetic: '/ˈsiːʃel/',
    definition_en: 'The protective spiral calcium cover left by marine mollusks on warm coast lines.',
    definition_ar: 'صَدَفة بحرية؛ محارة جيرية دائرية خلابة متموجة الأطراف تسكن شواطئ البحر الدافئة.',
    example_en: 'Hold this pink seashell near your ear to hear the ocean wave melody!',
    example_ar: 'ضع هذه الصدفة البحرية الوردية المزركشة قرب أذنك الكثيرة الإصغاء لتستمع لنغمات الموج العميق!',
    category: 'kids'
  },
  {
    id: 'fc_kd_050',
    word: 'Ladybug',
    phonetic: '/ˈleɪdibʌɡ/',
    definition_en: 'A tiny dome beetle with shiny red wings decorated with elegant black dots.',
    definition_ar: 'دعسوقة مبرقشة؛ خنفساء صغيرة ومفيدة جداً للحدائق بأجنحة قرمذية فاقعة تزينها كرات سوداء دقيقة.',
    example_en: 'A ladybug walked across the green lawn blade like a walking crimson gem.',
    example_ar: 'مشت الدعسوقة مبرقشة الأجنحة فوق عود العشب الأخضر كجوهرة حمراء تمشي في دعة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_051',
    word: 'Cupcake',
    phonetic: '/ˈkʌpkeɪk/',
    definition_en: 'A sweet small oven muffin cake topped with rich vanilla frosting and rainbow sugar sprinkles.',
    definition_ar: 'كعكة الكوب؛ حلوى مخبوزة صغيرة فخمة تغطيها طبقة هشة من الكريمة الملونة وحبات السكر البراقة.',
    example_en: 'We baked a special sweet blueberry cupcake with sparkling unicorn decorations.',
    example_ar: 'خبزنا رفقة والدي كعكة كوب فراولة شهية وزيناها بحبات حلوى قوس قزح اللطيفة لتسعد الصغار.',
    category: 'kids'
  },
  {
    id: 'fc_kd_052',
    word: 'Astronaut',
    phonetic: '/ˈæstrənɔːt/',
    definition_en: 'A highly trained galactic pilot who wears a specialized white pressurized suit to explore space stars.',
    definition_ar: 'رائد فضاء؛ ملّاح مدرّب بأحدث الأساليب العلمية يعتلي المركبات السريعة ويوجه مساحات الكشف الكوني.',
    example_en: 'The brave astronaut walked slowly on the dust of the moon, taking historic photos.',
    example_ar: 'خطا رائد الفضاء الشجاع ببطء فوق بساط غبار القمر الملهم ملوحاً بيده وصانعاً تاريخاً فريداً.',
    category: 'kids'
  },
  {
    id: 'fc_kd_053',
    word: 'Umbrella',
    phonetic: '/ʌmˈbrelə/',
    definition_en: 'A folding dome fabric canopy on a metal frame used to shield people from rain showers or sun.',
    definition_ar: 'مظلة مطرية؛ أداة قابلة للطي تحميك من انهمار حبات الغيث أو لفحات القيظ والشمس الزاحفة.',
    example_en: 'Open your colorful yellow umbrella; warm spring rain drops are starting to tap!',
    example_ar: 'انشر وافتح مظلتك الصفراء المخططة بالبريد اللطيف؛ هاهي قطرات رذاذ مطر الربيع تبدأ بالتربيت!',
    category: 'kids'
  },
  {
    id: 'fc_kd_054',
    word: 'Crayon',
    phonetic: '/ˈkreɪən/',
    definition_en: 'A cylinder stick of pigmented wax used to draw, sketch, and paint in notebooks.',
    definition_ar: 'قلم شمعي ملون؛ أداة تلوين شمعية ناعمة يخطط بها الأطفال رغباتهم وأحلامهم على الورق المصقول.',
    example_en: 'Use this blue wax crayon to sketch the beautiful calm waves of our sea scenery.',
    example_ar: 'امسك بهذا القلم الشمعي الأزرق البكر لترسم بها تموج الموج في لوحتك الطبيعية الكثيرة الدقة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_055',
    word: 'Curious',
    phonetic: '/ˈkjʊriəs/',
    definition_en: 'Eager to investigate, learn, and ask many intelligent questions about nature and space.',
    definition_ar: 'فضولي محب للمعرفة؛ طفل شغوف يسبر الظواهر ويطرح رزمة أسئلة ثاقبة ليتعلم آلية عمل الأشياء.',
    example_en: 'A curious child develops a strong intellect by constantly reading colorful encyclopedia books.',
    example_ar: 'يبني الطفل الفضول والباحث عمقاً فكرياً متقداً من خلال مواظبة مطالعة معارف وسير العباقرة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_056',
    word: 'Honest',
    phonetic: '/ˈɑːnɪst/',
    definition_en: 'Always speaking the genuine truth, behaving fairly, and never taking credit for another classwork.',
    definition_ar: 'صادق / أمين؛ من يعف لسانه عن الكذب ويحترم الحقيقة ويعترف بالأخطاء بفروسية وأدب.',
    example_en: 'Being honest builds a solid field of lifetime trust between you and your teachers.',
    example_ar: 'يبني الصدق حقل ثقة صلب ورصين يدوم للأبد بينك وبين معلميك وأصدقائك بساحة الطفولة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_057',
    word: 'Grateful',
    phonetic: '/ˈɡreɪtfl/',
    definition_en: 'Feeling and expressing bubbly appreciation for food, friends, siblings, and kindness.',
    definition_ar: 'ممتن / شاكر؛ صاحب نفس تفيض بالود والشكر لنعم الخالق وعطف الوالدين ومواقف الإخوة.',
    example_en: 'I feel warm and grateful for the Delicious lunch my mom prepared with love.',
    example_ar: 'أشعر بدفء وامتنان جارف لصحن المعكرونة اللذيذة الذي أعدته أمي بنكهات الحب الحانية.',
    category: 'kids'
  },
  {
    id: 'fc_kd_058',
    word: 'Whisper',
    phonetic: '/ˈwɪspər/',
    definition_en: 'To speak using incredibly soft breathy sounds so only a close friend can listen.',
    definition_ar: 'يهمس؛ التكلم بأخف نغمة ونبرة صوتية لا تكاد تبين للحفاظ على السكينة أو تبادل الأسرار بلطف.',
    example_en: 'My friend shared a secret whisper about the upcoming magic show surprise.',
    example_ar: 'نثر زميلي همسة خفيفة بيقين حول خدع العرض السحري والبهلواني في المساء ليفاجئني.',
    category: 'kids'
  },
  {
    id: 'fc_kd_059',
    word: 'Splendid',
    phonetic: '/ˈsplendɪd/',
    definition_en: 'Magnificent, beautiful, excellent, or leaving an impression of bright wonder.',
    definition_ar: 'رائع / باهر؛ بديع الصنع ويترك انطباعاً زاهياً من الدهشة والجمال البصري الأخاذ.',
    example_en: 'Our smart pronunciation lab is a splendid place to build true foreign fluency!',
    example_ar: 'معمل نطق الكلمات الفطن لدينا هو بقعة فريدة وباهرة تلهم طفلك الطلاقة والتميز الحاد الحاسم!',
    category: 'kids'
  },
  {
    id: 'fc_kd_060',
    word: 'Sunflower',
    phonetic: '/ˈsʌnˌflaʊər/',
    definition_en: 'A giant tall garden flower with massive yellow petals that follow the orbit of the sun.',
    definition_ar: 'زهرة دوار الشمس؛ نبات شامخ يربو بالبساتين ببتلات صفراء نارية تتبع دوران النور الدافئ.',
    example_en: 'A single sunflower can grow taller than a grown man in just one bright summer.',
    example_ar: 'بوسع زهرة دوار شمس واحدة أن تجاري قامة رجل ناضج طولاً بقلب قيظ صيفي وارف المياه.',
    category: 'kids'
  },
  {
    id: 'fc_kd_061',
    word: 'Gallop',
    phonetic: '/ˈɡæləp/',
    definition_en: 'The fastest style of pace of a horse, where all four hooves fly off the grassy floor.',
    definition_ar: 'عدو الفرس الحماسي؛ قفز وجري الخيل السريع بنغم حافر متسارع يعبر البراري والهضاب المترعة.',
    example_en: 'We heard the exciting gallop of the white royal horse coming across the emerald valley.',
    example_ar: 'تناهى لأسماعنا صوت وقع حوافر وركض الفرس الأبيض الفخم وهو يطوي البساتين والبراري الخضراء.',
    category: 'kids'
  },
  {
    id: 'fc_kd_062',
    word: 'Snuggle',
    phonetic: '/ˈsnʌɡl/',
    definition_en: 'To settle down warmly and cuddle into a cozy soft space, especially for sound sleep.',
    definition_ar: 'يتودد / يلتف بدفء؛ الانغماس والتحلق داخل لحاف دافئ أو مع دمية ناعمة للاستغراق بنوم عميق.',
    example_en: 'Nour loves to snuggle with her teddy bear while reading bedtime fairytales.',
    example_ar: 'تعشق نور الالتفاف بدفء والالتصاق بدميتها الدب القطيفة وهي تصغي لقصص ما قبل النوم الشائقة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_063',
    word: 'Dragonfly',
    phonetic: '/ˈdræɡənflaɪ/',
    definition_en: 'An insect with double transparent wings and a long colorful body, hovering near freshwater streams.',
    definition_ar: 'يعسوب / سنجاب الماء؛ حشرة دقيقة بأربعة أجنحة كرتونية زجاجية شفافة تحوم بأناقة فوق غدران الماء العذب.',
    example_en: 'The emerald dragonfly flew backward and forward over the still forest pond.',
    example_ar: 'حلقت يعسوبة الزمرد جيئة وذهاباً بخطوات دائرية بالغة الرشاقة فوق مرآة البحيرة الغابية الهادئة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_064',
    word: 'Popcorn',
    phonetic: '/ˈpɑːpkɔːrn/',
    definition_en: 'Corn kernels that burst open into puffy white edible clouds when exposed to dry pan heat.',
    definition_ar: 'فشار؛ حبات الذرة الصفراء القاسية التي تتشقق لتنتج زهوراً بيضاء هشة متبلة ممتعة للتناول أثناء الأفلام.',
    example_en: 'The exciting popcorn kernals started popping inside the pot with a noisy series of pops!',
    example_ar: 'رافق المرح تساقط وطقطقة حبات الفشار بقلب الإناء ككرات ثلج بيضاء تتطاير في دعة!',
    category: 'kids'
  },
  {
    id: 'fc_kd_065',
    word: 'Sticker',
    phonetic: '/ˈstɪkər/',
    definition_en: 'A self-adhesive colorful label with pictures, awarded for completing smart academic daily milestones.',
    definition_ar: 'ملصق تفاعلي بطل؛ بطاقة تلوين لاصقة تحمل رسوماً تعبيرية وصور مبهجة يجمعها الأطفال في دفاتر التميز.',
    example_en: 'The helpful teacher placed a smiling golden star sticker on Basim English composition card.',
    example_ar: 'أرفقت المعلمة الموجهة ملصق قطة ذهبية ذكية مبتسمة على زاوية دفتر باسم لتدفعه للتفوق المستمر.',
    category: 'kids'
  },
  {
    id: 'fc_kd_066',
    word: 'Jellyfish',
    phonetic: '/ˈdʒelifiʃ/',
    definition_en: 'A transparent sea creature with gelatinous umbrella body and long dangling tentacles.',
    definition_ar: 'قنديل البحر؛ كائن مائي هلامي شفاف يسبح كالمظلة العائمة دافعاً تموجات الماء بمرونة.',
    example_en: 'The pink jellyfish glowed like an underwater lightbulb in the twilight deep sea.',
    example_ar: 'شع وتوهج قنديل البحر الوردي في ظلمات القاع كمصباح مائي صغير يسري بين المرجان.',
    category: 'kids'
  },
  {
    id: 'fc_kd_067',
    word: 'TreasureMap',
    phonetic: '/ˈtreʒər mæp/',
    definition_en: 'A classical parchment scroll drawing pointing out hidden caves and gold coordinates in sandbox games.',
    definition_ar: 'خريطة الكنز؛ لفافة ورقية صفراء أثرية ترسم مسيرة البحث عن المغارات وتحث الصغار على المغامرة الحرة.',
    example_en: 'We drew a secret treasure map with a bright red X pointing to our sandbox hideout.',
    example_ar: "رسمنا بريشة الألوان خريطة كنز عذبة ووضعنا حرف 'X' أحمر عريض دالاً على مكان المخبأ الرملي.",
    category: 'kids'
  },
  {
    id: 'fc_kd_068',
    word: 'Snowflake',
    phonetic: '/ˈsnoʊfleɪk/',
    definition_en: 'A single unique frozen ice crystal that descends softly from gray winter clouds.',
    definition_ar: 'ندفة الثلج البارد؛ بلورة مائية متجمدة فريدة الزخرفة هندسياً تسقط برقة من سماء الشتاء الطرية.',
    example_en: 'Each tiny snowflake displays highly complex geometric symmetry when observed under lenses.',
    example_ar: 'تستعرض كل ندفة ثلج متناهية الصغر تماثلاً هندسياً هندسياً فائق التعقيد يذهل من يرصده بالعدسات.',
    category: 'kids'
  },
  {
    id: 'fc_kd_069',
    word: 'Goldfish',
    phonetic: '/ˈɡoʊldfɪʃ/',
    definition_en: 'A small orange fresh-water domestic fish that swims actively in glass bowls.',
    definition_ar: 'سمكة ذهبية؛ سمكة برتقالية براقة صغيرة تعيش بسلام وتبعث البهجة بتموجاتها الراقصة بحوض الماء الزجاجي.',
    example_en: 'The sparkling goldfish puffed round water bubbles to ask for food at sunrise.',
    example_ar: 'أطلقت السمكة الذهبية اللامعة فقاعات مائية مستديرة تسترعي بها اهتمام الأطفال ليلقوا لها الفتات.',
    category: 'kids'
  },
  {
    id: 'fc_kd_070',
    word: 'Grateful heart',
    phonetic: '/ˈɡreɪtfl hɑːrt/',
    definition_en: 'A mental habit of appreciating others, bringing peace and strong confidence to kids.',
    definition_ar: 'قلب ممتن وشاكر؛ سمة وجدانية تنمي حب الخير والرضا بقسم الخالق وتجلب طمأنينة النفس.',
    example_en: 'A grateful heart is a happy garden where seeds of love grow fast.',
    example_ar: 'القلب المفعم بالرضا والامتنان هو واحة غناء تنبت فيها أواصر التراحم والأخلاق بسرعة مذهلة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_071',
    word: 'Cooperation',
    phonetic: '/koʊˌɑːpəˈreɪʃn/',
    definition_en: 'Working together in harmony with classmates to achieve an epic project outcome.',
    definition_ar: 'التعاون والمؤازرة؛ العمل صفا بصف مع الزملاء بروح الفريق لتحقيق عمل فرعي أو بناء مجسم مبهر.',
    example_en: 'Thanks to active cooperation, we built a beautiful cardboard castle in one hour.',
    example_ar: 'بفضل التعاضد والتعاون الإيجابي المثمر، صممنا مجسم حصن كرتوني شامخ في ظرف ساعة واحدة فقط.',
    category: 'kids'
  },
  {
    id: 'fc_kd_072',
    word: 'Patience',
    phonetic: '/ˈpeɪʃns/',
    definition_en: 'The capacity to accept delay or stay calm when facing a complex science assignment.',
    definition_ar: 'الصبر والجلد؛ فضيلة حبس النفس في طمأنينة وعدم الاستسلام والضجر عند مواجهة التحديات المعرفية.',
    example_en: 'Learning correct English accents requires patience and warm constant listening sessions.',
    example_ar: 'يتطلب ترسيخ النطق واللكنة الإنجليزية السليمة صبراً وشهوراً من ممارسة الاستماع الممنهج.',
    category: 'kids'
  },
  {
    id: 'fc_kd_073',
    word: 'Brave',
    phonetic: '/breɪv/',
    definition_en: 'Ready to face pain or difficult English pronouncing challenges without displaying fear.',
    definition_ar: 'شجاع / جريء؛ مقدام ومبادر يبسط صوته دون خجل من الوقوع بالخطأ ويعالج العثرات بفروسية.',
    example_en: 'Be brave and speak English out loud in front of the kids!',
    example_ar: 'كن شجاعاً مقداماً وانطق بالإنجليزية بصوت قوي مرتفع وواثق أمام رفاقك لتثبت فصاحتك!',
    category: 'kids'
  },
  {
    id: 'fc_kd_074',
    word: 'Kindness',
    phonetic: '/ˈkaɪndnəs/',
    definition_en: 'The premium trait of being warm, helpful, polite, and caring for young animals.',
    definition_ar: 'الرفق واللطف؛ أرقى مراتب السمات الإنسانية ومظهره عون الضعيف وإطعام الطير والابتسامة الصافية.',
    example_en: 'Your simple act of kindness with the lost kitten warmed our family hearts.',
    example_ar: 'عطفك ولطفك ومداواة الهرة الضالة المرتجفة جلب فيضاً من السكينة والسرور لقلب عائلتنا.',
    category: 'kids'
  },
  {
    id: 'fc_kd_075',
    word: 'Eco-Hero',
    phonetic: '/ˈiːkoʊ ˈhɪroʊ/',
    definition_en: 'A green child champion who cares for plants, waters trees, and protects the earth.',
    definition_ar: 'بطل البيئة الصغير؛ طفل حريص على ري شتلات الحديقة والمحافظة على النقاء الخضري للأرض ومواردها.',
    example_en: 'An eco-hero never leaves plastic cups on the playground fields.',
    example_ar: 'لا يدع بطل البيئة الأخضر زجاجات أو أكواباً بلاستيكية مبعثرة بمساحات المتنزه الصفي.',
    category: 'kids'
  },
  {
    id: 'fc_kd_076',
    word: 'Plural Noun',
    phonetic: '/ˈplʊrəl naʊn/',
    definition_en: 'A grammar word structure naming multiple entities, often designated with ending letters S or ES.',
    definition_ar: 'اسم الجمع (قواعد ميسرة)؛ لفظ لغوي يطلق على ثلاثة فأكثر من الغلال كالأزهار والأقمار والقطط.',
    example_en: 'We identify plural nouns by looking for key indicators like ending characters.',
    example_ar: "نحن نستكشف جموع الأسماء بسهولة من خلال البحث عن نهايات الإعراب أو اللاحقة 's' الصرفية.",
    category: 'kids'
  },
  {
    id: 'fc_kd_077',
    word: 'Adverb',
    phonetic: '/ˈædvɜːrb/',
    definition_en: 'A helper grammar item that clarifies how an action is done, e.g., quickly, softly, gracefully.',
    definition_ar: 'الحال / الظرف؛ كلمة لغوية توضح هيئة حدوث الفعل وسرعته، كقولنا "بسرعة"، "برقة"، "بأناقة".',
    example_en: "In the sentence 'The dolphin swam swiftly', 'swiftly' behaves as an adverb.",
    example_ar: "في عبارة 'سبح الدولفين بسرعة وخفة'، تعمل الكلمة 'بسرعة' كحال متمم لظرف حركة السباحة.",
    category: 'kids'
  },
  {
    id: 'fc_kd_078',
    word: 'Conjunction',
    phonetic: '/kənˈdʒʌŋkʃn/',
    definition_en: 'A connective grammar word linking English ideas smoothly, such as and, but, because.',
    definition_ar: 'حرف عطف وربط؛ كلمة ميكانيكية تربط ثنايا المعنى والجمل، كقولك "و"، "لكن"، "لأن".',
    example_en: "We use the conjunction 'because' to explain the solid reasons behind academic events.",
    example_ar: "نوظف حرف العطف المعبر 'لأن' لصياغة وبسط المسوغات العلمية الكامنة وراء الظواهر.",
    category: 'kids'
  },
  {
    id: 'fc_kd_079',
    word: 'Noun',
    phonetic: '/naʊn/',
    definition_en: 'A core grammar word denoting a specific person, animal, place, or object.',
    definition_ar: 'الاسم (أساس التركيب)؛ الكلمة اللغوية المصاغة للدلالة على الذات، الإنسان، الموضع أو الجماد.',
    example_en: 'Every castle, child, and dolphin you see in your play cards is a grammatical noun.',
    example_ar: 'كل قلعة، طفل، أو دولفين ترصده داخل بطاقات التعلم في اللعبة هو اسم إعرابي صريح.',
    category: 'kids'
  },
  {
    id: 'fc_kd_080',
    word: 'Pronoun',
    phonetic: '/ˈproʊnaʊn/',
    definition_en: 'An elegant placeholder grammar word replacing a full noun like He, She, It, They.',
    definition_ar: 'الضمير (قواعد لغة)؛ لفظ لغوي ناب عن الاسم تلافياً للتكرار ومثاله "هو"، "هي"، "هما"، "هم".',
    example_en: "Instead of repeating 'Basim', the clever student used the pronoun 'He' beautifully.",
    example_ar: "عوضاً عن تكرار اسم 'باسم' بمقاطيع السطور، طَعّم الطالب الفطن الضمير 'هو' باقتدار فصيح.",
    category: 'kids'
  },
  {
    id: 'fc_kd_081',
    word: 'Firefly',
    phonetic: '/ˈfaɪərflaɪ/',
    definition_en: 'A tiny wild beetle insect that emits beautiful cold light pulses during warm summer nights.',
    definition_ar: 'يراعة مضيئة؛ حشرة دقيقة تطلق بريقاً ضوئياً بارداً يسلب الأبصار بوسط دياجي ليالي الغابات الصيفية.',
    example_en: 'Thousands of tiny fireflies lit up the dark forest path like living hanging lamps.',
    example_ar: 'تضافرت وتلألأت آلاف اليراعات في عتمة المتنزه كأنها قناديل سماوية تسبح بين الغصون.',
    category: 'kids'
  },
  {
    id: 'fc_kd_082',
    word: 'Pinecone',
    phonetic: '/ˈpaɪnkoʊn/',
    definition_en: 'The woody oval seed container of pine trees, beautiful for constructing custom dolls.',
    definition_ar: 'كوز الصنوبر؛ وعاء البذور الخشبي البيضاوي الخشن المتساقط من أهداب الصنوبر البهي.',
    example_en: 'We collected dry brown pinecones to decorate the warm winter fireplace shelf.',
    example_ar: 'جمعنا معاً مع كوز الصنوبر طيات جافة لتزيين رف الموقد بوسط ردهة منزلنا المستدفئ.',
    category: 'kids'
  },
  {
    id: 'fc_kd_083',
    word: 'Dolphin Leap',
    phonetic: '/ˈdɑːlfɪn liːp/',
    definition_en: 'A full water emerge and high acrobatic leap made by dolphins to express excitement.',
    definition_ar: 'وثبة الدولفين؛ طفرة وحركة مائية خلابة يقوم بها الكائن البحري المحبوب معلناً حماسه للأطفال.',
    example_en: 'A majestic dolphin leap brought immediate cheers and applause from everyone on the sand.',
    example_ar: 'أثارت وثبة الدولفين الأكروباتية البديعة تصفيقاً حاراً وهتافات ملأتها البهجة من الصغار بمحاذاة الشط.',
    category: 'kids'
  },
  {
    id: 'fc_kd_084',
    word: 'Breeze',
    phonetic: '/briːz/',
    definition_en: 'A soft, light, cool wind that rustles forest leaves gently without causing dust.',
    definition_ar: 'نسمة عليلة؛ رياح دافئة خفيفة رطبة تداعب شتلات الورود وورق الشجر في دعة ولطف.',
    example_en: 'A cool evening breeze rustled the soft leaves of the tall oak tree.',
    example_ar: 'هبت نسمة مساء عليلة داعبت بروعتها وحنوها وريقات شجرة البلوط الهادئة المورقة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_085',
    word: 'Curiosity',
    phonetic: '/ˌkjʊriˈɑːsəti/',
    definition_en: 'The grand driver of learning that inspires kids to read encyclopedia chapters daily.',
    definition_ar: 'شغف الاستكشاف؛ المحرك المعرفي الأعظم للطفولة الذي يعبد دروب الفهم الحثيث لطلاسم العالم.',
    example_en: 'Curiosity led the smart astronaut to design space rockets in his drawing book.',
    example_ar: 'دفع شغف المعرفة طفلنا الذكي لرسم قاطرات فضائية وتلسكوبات معقدة على كراسة التفنن.',
    category: 'kids'
  },
  {
    id: 'fc_kd_086',
    word: 'Honesty',
    phonetic: '/ˈɑːnəsti/',
    definition_en: 'The beautiful ethical foundation of telling the absolute truth under all class situations.',
    definition_ar: 'مبدأ الصدق والنزاهة؛ الأساس الخُلُقي الأسمى الذي يحث الفارس الصغير على مجابهة الخطأ وقول الحق.',
    example_en: 'Honesty is the cleverest policy; it keeps your mind clear and your heart safe.',
    example_ar: 'الصدق هو المسار الأذكى على الحقيقة؛ فهو ينقي ضميرك ويجعل رفاقك يحبون رفقتك بصدق وثقة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_087',
    word: 'Sunflower Seeds',
    phonetic: '/ˈsʌnˌflaʊər siːdz/',
    definition_en: 'The striped nutritious seeds housed inside sunflower heads, rich in vitamins.',
    definition_ar: 'بذور لب دوار الشمس؛ حبوب منسقة مقلمة مغذية تنبت بوسط السرة الدائرية للزهرة الكبيرة.',
    example_en: 'Birds swooped down carefully to pick several dropped sunflower seeds from the garden soil.',
    example_ar: 'انخفضت الطيور اللطيفة في حذر لتلتقط بضع حبات دوار شمس متساقطة فوق ثرى البستان الرطب.',
    category: 'kids'
  },
  {
    id: 'fc_kd_088',
    word: 'Forest Trail',
    phonetic: '/ˈfɔːrɪst treɪl/',
    definition_en: 'A custom path cleared through trees, designed for safe hiking and bird spotting.',
    definition_ar: 'ممر الغابة الصغير؛ درب طبيعي مسور بظلال السنديان يخطه السائرون للمشي وتتبع الطيور النادرة.',
    example_en: 'We followed the clear forest trail to locate the glowing amber waterfall.',
    example_ar: 'سلكنا الممر الغابي الرائق المعبد قاصدين العثور على مسطح الشلال الناري المنسكب من الصخور.',
    category: 'kids'
  },
  {
    id: 'fc_kd_089',
    word: 'Lively',
    phonetic: '/ˈlaɪvli/',
    definition_en: 'Full of health, joy, and bright positive physical energy during academic plays.',
    definition_ar: 'مفعم بالحيوية والنشاط؛ طاقة بدنية وابتسامة عريضة يحوزها الطفل أثناء اللعب والنشاط الجماعي.',
    example_en: 'The lively music made all the kindergarten children bounce gracefully together.',
    example_ar: 'بثت الأنشودة الرنانة طاقة بهيجة وحيوية غامرة دفعت الصغار للتأرجح والوثب في فرح غامر.',
    category: 'kids'
  },
  {
    id: 'fc_kd_090',
    word: 'Magical',
    phonetic: '/ˈmædʒɪkl/',
    definition_en: 'Beautiful, extraordinary, and capturing a sense of bright childhood wonder.',
    definition_ar: 'ساحر وجاذب؛ فائق النقاء ويبث في مخيلة الطفل روعة الاستبصار والخيال المبتكر الخلاب.',
    example_en: 'Seeing fireflies decorate the meadow at dark was a truly magical experience.',
    example_ar: 'رصد لمعان اليراعات وهي تبتسم وسط المرج ليلاً كان بحق تجربة تفاعلية ساحرة تسلب الأفئدة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_091',
    word: 'Politeness',
    phonetic: '/pəˈlaɪtnəs/',
    definition_en: 'The mental state of expressing kindly greetings, and showing deep empathy to elders.',
    definition_ar: 'الأدب والتهذيب؛ سمة السلوك اللطيف والرد الوديع على الأقران وترك الأسبقية للضيوف بمحبة.',
    example_en: 'Your natural politeness makes everyone feel extremely comfortable in our academy room.',
    example_ar: 'رهافة أدبك وتهذيبك العفوي يغرس روح الود والألفة بقلب كل زميل يزور ركننا الصفي.',
    category: 'kids'
  },
  {
    id: 'fc_kd_092',
    word: 'Noodle',
    phonetic: '/ˈnuːdl/',
    definition_en: 'A string strip of cooked wheat flour dough, extremely fun for kids to spin on forks.',
    definition_ar: 'شعرية / نودلز؛ خيوط عجين القمح اللذيذة المطهية بمرق الخضار والتي يحب الصغار لفها بالشوكة.',
    example_en: 'The child spun the long white noodle on his fork with focused laughter.',
    example_ar: 'لف الصغير خيط المعكرونة الطويل حول شوكته بمهارة وتركيز رافقته ضحكة بريئة عريضة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_093',
    word: 'Jellybean',
    phonetic: '/ˈdʒelibiːn/',
    definition_en: 'A small sweet bean-shaped candy with gelatinous core and a colorful sugar envelope.',
    definition_ar: 'حلوى الجيلي الهلامية؛ حبات سكر صغيرة على هيئة فاصولياء ملونة طراوة قلبها تذوب بالفم سريعاً.',
    example_en: 'Nour sorted her colorful jellybeans by spectrum hue before taking the first bite.',
    example_ar: 'نسقت ورتبت نور حبات حلوى الجيلي طبقاً لألوان الطيف بوسط كفها قبل الشروع في تذوقها.',
    category: 'kids'
  },
  {
    id: 'fc_kd_094',
    word: 'Gingerbread',
    phonetic: '/ˈdʒɪndərbred/',
    definition_en: 'A warm spiced ginger cake or biscuit sweetened with honey, made into lovely shapes.',
    definition_ar: 'خبز الزنجبيل اللذيذ؛ بسكويت مقرمش مدعم بالعسل والزنجبيل الفواح يخبز على شكل نجوم ورجال آليين.',
    example_en: 'We built a sweet miniature cabin using brown crisp gingerbread plates.',
    example_ar: 'شيدنا مع رفقاء الصف نموذج كوخ ريفي صغير باستخدام بسكويت خبز الزنجبيل العسلي المقرمش.',
    category: 'kids'
  },
  {
    id: 'fc_kd_095',
    word: 'Acme',
    phonetic: '/ˈækmi/',
    definition_en: 'The highest possible point of excellence, achievement, or perfect fluency development.',
    definition_ar: 'الذروة / القمة؛ أعلى مراتب النجاح والأوج الثقافي الحاسم الذي يسعى إليه طلاب معهدنا.',
    example_en: 'Correctly using 100 flashcards will help kids reach the acme of foreign pronunciation.',
    example_ar: 'حفظ وتطبيق مئة بطاقة ذكية يعزز تمكن طفلك قاطرة العبور لصدارة وقمة مخارج اللفظ الفصيح.',
    category: 'kids'
  },
  {
    id: 'fc_kd_096',
    word: 'Clap',
    phonetic: '/klæp/',
    definition_en: 'To strike the palms of your hands together to express high academic applause and motivation.',
    definition_ar: 'التصفيق بحرارة؛ ضرب كف بكف بحماسة لتشجيع الصغار ودفعهم للفخر بذكائهم ومهاراتهم المكتسبة.',
    example_en: "Let's clap for Nour; she got all English grammar questions correct!",
    example_ar: 'دعونا نصفق بحرارة لزميلتنا نور؛ لقد أحرزت العلامة الكاملة بأسئلة اختبار كبث القواعد!',
    category: 'kids'
  },
  {
    id: 'fc_kd_097',
    word: 'Interactive',
    phonetic: '/ˌɪntərˈæktɪv/',
    definition_en: 'Allowing direct dialogue, play, or response between children and our computer screen.',
    definition_ar: 'تفاعلي؛ وسيلة مرنة تتيح للصغار النقر وسماع النطق وتسجيل نبراتهم والمقارنة مباشرة في دقة سريعة.',
    example_en: 'An interactive flashcard facilitates fluent language study by active play!',
    example_ar: 'البطاقة الذكية التفاعلية تيسر استيعاب الكلمات وحفر الإيقاع اللغوي بدماغ الطفل عبر التجريب الحركي الفوري.',
    category: 'kids'
  },
  {
    id: 'fc_kd_098',
    word: 'Sticker Book',
    phonetic: '/ˈstɪkər bʊk/',
    definition_en: 'A special visual binder book where students stick awarded stamps of animals.',
    definition_ar: 'دفتر الملصقات؛ ألبوم رائع مبهج يجمع فيه الأطفال ملصقات الأبطال والطيور التي كسبوها بتميزهم.',
    example_en: 'My sticker book is almost full of shiny neon dinosaurs and flying spaceships!',
    example_ar: 'أوشك ألبوم الملصقات الخاص بي على الامتلاء بصور الديناصورات المشعة وسفن الفضاء الحماسية!',
    category: 'kids'
  },
  {
    id: 'fc_kd_099',
    word: 'Spiritual Oasis',
    phonetic: '/ˈspɪrɪtʃuəl oʊˈeɪsɪs/',
    definition_en: 'A quiet mindful place or room environment to read, unwind, and develop positive traits.',
    definition_ar: 'واحة الطمأنينة والهدوء؛ زاوية صفية هادئة مخصصة للقراءة والمطالعة الفردية وسماع الفوائد في تؤدة.',
    example_en: 'Create a tiny spiritual oasis under the window to read beautiful English stories comfortably.',
    example_ar: 'صمّم مع والديك واحة طمأنينة صغيرة بجوار النافذة لتطالع فيها روائع القصص الإنجليزية بهدوء.',
    category: 'kids'
  },
  {
    id: 'fc_kd_100',
    word: 'Cooperative Play',
    phonetic: '/koʊˈɑːpərətɪv pleɪ/',
    definition_en: 'Working towards a common puzzle task or structure game in unity and sharing.',
    definition_ar: 'اللعب الجماعي التعاوني؛ مشاركة الأهداف والقطع والضحكات لحل لغز أو رص مكعبات البناء الضخمة مودة.',
    example_en: 'Cooperative play coordinates empathy and makes child socialization easy peasy!',
    example_ar: 'يغرس اللعب التعاوني التآزر والصفاء بقلب طفلك وينمي لباقته الاجتماعية في سلام تلقائي مدهش!',
    category: 'kids'
  },
  {
    id: 'fc_kd_101',
    word: 'Sweet Peach',
    phonetic: '/swiːt piːtʃ/',
    definition_en: 'A velvety orange circular summer fruit, famous for its sweet organic scent.',
    definition_ar: 'خوخ حلو طازج؛ ثمرة صيفية دائرية مخملية القشرة عذبة المذاق تفرز عطراً منعشاً محبباً للكل.',
    example_en: 'That juicy sweet peach left a delightful honey taste in my mouth.',
    example_ar: 'أبقت قاطمة الخوخ الحلو الطازجة مذاق شربات العسل الفريد بوسط فم طفلنا اللطيف.',
    category: 'kids'
  },
  {
    id: 'fc_kd_102',
    word: 'Hoppy Hop',
    phonetic: '/ˈhɑːpi hɑːp/',
    definition_en: 'The joyful little jump of high-flying birds and young bunnies on grass paths.',
    definition_ar: 'قفزة وثابة سعيدة؛ الوثبة والقفزة الخفيفة المبهجة التي تميز العصافير أو صغار الأرانب البرية.',
    example_en: 'The white bunny made a little hoppy hop before sniffing the sweet red strawberries.',
    example_ar: 'وثب الأرنب الأبيض قفزة مبهجة صغيرة، قبل أن يستشعر عطر حبات الفراولة الحمراء الطازجة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_103',
    word: 'Shining Star',
    phonetic: '/ˈʃaɪnɪŋ stɑːr/',
    definition_en: 'A celestial diamond beacon and a kid label designed for highly diligent students.',
    definition_ar: 'النجمة المتألقة؛ جرم سماوي يضيء السماء، ولقب فخر صفي يطوق به صدر البطل المتفوق.',
    example_en: 'You are our shining star in pronunciation, Basim!',
    example_ar: 'أنت بحق نجمنا المتألق في الإلقاء ونطق الحروف الإنجليزية السليمة يا باسم البطل!',
    category: 'kids'
  },
  {
    id: 'fc_kd_104',
    word: 'Warm Blanket',
    phonetic: '/wɔːrm ˈblæŋkɪt/',
    definition_en: 'A soft quilted fabric sheet used to tuck children warmly in their cozy beds.',
    definition_ar: 'لحاف دافئ؛ غطاء وثيق وثقيل الفراء يلتف به الصغار في ليالي البرد لينعموا بنوم رغيد وبنيان سليم.',
    example_en: 'Wrap this warm blanket around you as you listen to mama’s cute story.',
    example_ar: 'التف تحت كنف هذا اللحاف الوارف والدافئ دعةً وإصغاءً لقرقرة قصة والدتي المسلية.',
    category: 'kids'
  },
  {
    id: 'fc_kd_105',
    word: 'Teddy Bear',
    phonetic: '/ˈtedi ber/',
    definition_en: 'A soft cotton-stuffed animal toy that kids hug like a friendly companion.',
    definition_ar: 'دبدوب قطيفة؛ لعبة صغيرة قطنية ناعمة للغاية يحتضنها الطفل كرفيق نوم لطيف صامت يبعث الألفة.',
    example_en: 'My brown teddy bear always sits patiently on the top of my bedtime pillow.',
    example_ar: 'يتربع دبدوبي البني الوديع الهادئ في صبر متناه بوسط وسادة النوم الحريرية بانتظام.',
    category: 'kids'
  },
  {
    id: 'fc_kd_106',
    word: 'Grateful Mind',
    phonetic: '/ˈɡreɪtfl maɪnd/',
    definition_en: 'The constructive thought process of noting good traits and blessings of nature.',
    definition_ar: 'عقلية الامتنان والرضا؛ آلية تفكير ناضجة تعتاد رصد مكارم ومعاني اللطف في تصرفات الأهل والأصحاب.',
    example_en: 'Developing a grateful mind keeps kids joyful and extremely resilient during challenges.',
    example_ar: 'تعد وتصقل عقلية الشاكرين نفوس الأطفال رقة وترسخ قدرتهم الفذة على مواجهة مصاعب العلوم بيسر.',
    category: 'kids'
  },
  {
    id: 'fc_kd_107',
    word: 'Playful Kitten',
    phonetic: '/ˈpleɪfl ˈkɪtn/',
    definition_en: 'A hyper-energetic young cat trying to chase shadows or light points across carpets.',
    definition_ar: 'هرة مفرطة اللعب؛ قطة غضة عاتية الحركة تلاحق النعكاسات وتخلق مواقف غاية بالسحر والمرح بالصالة.',
    example_en: 'The playful kitten jumped joyfully when we rolled the sparkling green ribbon.',
    example_ar: 'قفزت الهرة اللعوب فرحة متوثبة في الهواء عندما دحرجنا أمامها لفة شريط بريليانت حريري أخضر.',
    category: 'kids'
  },
  {
    id: 'fc_kd_108',
    word: 'Sweet Strawberry',
    phonetic: '/swiːt ˈstrɔːberi/',
    definition_en: 'A bright scarlet heart-shaped garden berry topped with a tiny green leafy crown.',
    definition_ar: 'فراولة حمراء جمرية؛ فاكهة رطبة على شكل قلب يزين رأسها تاج من الأوراق الخضراء النضرة.',
    example_en: 'We picked a giant sweet strawberry and offered it with joy to our supportive grandma.',
    example_ar: 'قطفنا حبة فراولة ناضجة ضخمة الحجم وقدمناها كعربون حب وبسمة لجدتنا الغالية المساندة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_109',
    word: 'Watermelon Slice',
    phonetic: '/ˈwɔːtərmelən slaɪs/',
    definition_en: 'A wedge of sweet red watery summer melon, perfect for children to cool after tag games.',
    definition_ar: 'شريحة بطيخ أحمر عذب؛ هلال سكري بارد من البطيخ يروي طاقة الصغار ويربّت على عطشهم عقب المطارحة.',
    example_en: 'A tasty watermelon slice dripping with sweet red juice is the best treat of August!',
    example_ar: 'شريحة البطيخ الأحمر الباردة المعسولة هي الجائزة والفاكهة الأهم لتلطيف قيظ أغسطس على الأطفال!',
    category: 'kids'
  },
  {
    id: 'fc_kd_110',
    word: 'Curious Puppy',
    phonetic: '/ˈkjʊriəs ˈpʌpi/',
    definition_en: 'An explorer baby dog that sniffs shoes, inspects beetles, and wags its tail.',
    definition_ar: 'جرو فضولي مستكشف؛ كلب رضيع يبعث اللطف ويدس أنفه بين الأعشاب والمنحنيات مستطلعاً رفاقه.',
    example_en: 'The curious puppy tilt its head and barked softly at the iron ladybug statue.',
    example_ar: 'أمال الجرو الفضولي رأسه جانباً ونبح برفق طفولي مستغرباً ثبات تمثال الدعسوقة الحديدي الصدئ.',
    category: 'kids'
  },
  {
    id: 'fc_kd_111',
    word: 'Snowy Snowman',
    phonetic: '/ˈsnoʊi ˈsnoʊmæn/',
    definition_en: 'A child-built snow figure featuring coal eyes, a carrot nose, and a cozy winter wool scarf.',
    definition_ar: 'رجل الجليد الكرتوني؛ دمية ثلجية يصنعها الأطفال تزهو بأنف من الجزر الطبيعي ووشاح صوف عتيق.',
    example_en: 'Our snowy snowman stood proudly in the garden fields as children sang cozy winter songs.',
    example_ar: 'وقف رجل الجليد شامخاً وسطه حديقتنا المتجمدة بينما كانت أناشيد الارتجال الصدّاح تعلو الأرجاء.',
    category: 'kids'
  },
  {
    id: 'fc_kd_112',
    word: 'Helper Bee',
    phonetic: '/ˈhelpər biː/',
    definition_en: 'A term used in preschool classes for diligent students who assist clean and coordinate.',
    definition_ar: 'النحلة المساعدة العاطرة؛ لقب ووسام رمزي لفرسان الروضة والصف الذين يساهمون بدفع النظام الصفي وإسناد الزملاء.',
    example_en: 'You were a superb helper bee today during our spelling block construction playtime!',
    example_ar: 'لقد حزت بحق لقب نحلة الصف المساعد المعطاءة اليوم يا باسم خلال حصة مكعبات وصنع الحروف المتناسقة!',
    category: 'kids'
  },
  {
    id: 'fc_kd_113',
    word: 'Friendly Giant',
    phonetic: '/ˈfrendli ˈdʒaɪənt/',
    definition_en: 'A benevolent towering character in fairy tales who aids little travelers safely cross canyons.',
    definition_ar: 'العملاق الودود الصالح؛ شخصية أسطورية ضخمة مساندة تسود الأخلاق طياتها وتعين فرسان الحكاية الصغار.',
    example_en: 'The friendly giant carefully lifted the children across the roaring rapid river stream.',
    example_ar: 'حمل العملاق الودود الصغار برفق وتؤدة عابراً بهم بين كفيه فوق لجج مياه السيل الهادر.',
    category: 'kids'
  },
  {
    id: 'fc_kd_114',
    word: 'Creative Artist',
    phonetic: '/kriˈeɪtɪv ˈɑːrtɪst/',
    definition_en: 'A young child who explores colors, sketches nature designs, and details beautiful landscapes.',
    definition_ar: 'الرسام والمبدع الصاعد؛ طفل يقضي ساعاته يسبر كراسات التلوين وينسق لوحات بهية للأشجار الشاهدة.',
    example_en: 'The creative artist won a red ribbon for her watercolor painting of a giant sunflower.',
    example_ar: 'نال الرسام المبدع الواعد شارة ووشاحاً قرمزياً لإخراج لوحته البديعة لزهرة عباد شمس عملاقة بمائية الألوان.',
    category: 'kids'
  },
  {
    id: 'fc_kd_115',
    word: 'Pebble Sparkle',
    phonetic: '/ˈpebl ˈspɑːrkl/',
    definition_en: 'The shiny polished stone reflecting crystal river water on a sunny picnic day.',
    definition_ar: 'بريق حجر النهر النظيف؛ الحصاة الدائرية الملساء التي تعكس غطاء وبريق ماء الشلال النقي تحت أشعة العصر.',
    example_en: 'We found a flat pebble sparkle that looked like a sleeping diamond near the pool.',
    example_ar: 'عثر الصغار على حصاة نهرية ناعمة تبرق بريقاً نادراً يضاهي بريق وفخامة جوهرة نائمة قرب الغدير.',
    category: 'kids'
  },
  {
    id: 'fc_kd_116',
    word: 'Dolphin Smile',
    phonetic: '/ˈdɑːlfɪn smaɪl/',
    definition_en: 'The curved facial contour of dolphins, representing natural peace, friendliness, and water fun.',
    definition_ar: 'ابتسامة الدولفين الهانئة؛ الشكل الهانئ الطبيعي لوجه الدلافين الذي ينم عن السكينة ومرافقة السفن بمودة.',
    example_en: 'The dolphin smile is a great sight that cures fear of open turquoise ocean waters.',
    example_ar: 'تعد رؤية الملامح الهانئة وابتسامة الدولفين دواءً فذاً يبدد خشية الأطفال من الإبحار بوسط ماء اليم الساحر.',
    category: 'kids'
  },
  {
    id: 'fc_kd_117',
    word: 'Butterfly Flower',
    phonetic: '/ˈbʌtərflaɪ ˈflaʊər/',
    definition_en: 'A brightly colored garden blossom that attracts butteries with sweet organic nectar.',
    definition_ar: 'زهرة الفراش الذكية؛ نوارة برية زاهية الأطراف تجذب الفراشات الحرائر لرشف قطرات الشربات الحلو والرحيق.',
    example_en: 'This unique violet plant is called a butterfly flower because of its beautiful design.',
    example_ar: 'يطلق المزارع الذكي على هذه النبتة البنفسجية اسم زهرة الفراش نظراً لاحتكارها معاني التناسق والرحيق.',
    category: 'kids'
  },
  {
    id: 'fc_kd_118',
    word: 'Pinecone Owl',
    phonetic: '/ˈpaɪnkoʊn aʊl/',
    definition_en: 'A child craft toy representing an owl built using pinecones, glue, and colorful felt wings.',
    definition_ar: 'بومة كوز الصنوبر؛ لعبة يدوية يصنعها رفاق الروضة مستعينين بأوراق من الجوخ واللاصق وقشر الصنوبر.',
    example_en: 'Lina made a cute pair of pinecone owls to place on the teacher’s wood table.',
    example_ar: 'إلتفت أصابع لينا لتصنع زوجاً ظريفاً من بومات قشر الصنوبر كهدية فخر صبتها فوق طاولة معلمتها.',
    category: 'kids'
  },
  {
    id: 'fc_kd_119',
    word: 'Eco-Hero Badge',
    phonetic: '/ˈiːkoʊ ˈhɪroʊ bædʒ/',
    definition_en: 'A green visual emblem given to children who diligently recycle and plant seedlings.',
    definition_ar: 'وسام حامي البيئة الأخضر؛ شارة تميز وبطولة تمنح للطفل الحريص على نظافة وري حدائق وربع المعهد.',
    example_en: 'Basim wore his shiny eco-hero badge proudly on his school backpack strap.',
    example_ar: 'علق باسم البطل الحريص بزهو وسام بطل البيئة الأخضر اللامع على مقبض حقيبة كتبه الدراسية.',
    category: 'kids'
  },
  {
    id: 'fc_kd_120',
    word: 'Noodle Swirl',
    phonetic: '/ˈnuːdl swɜːrl/',
    definition_en: 'The fun movement of twisting long noodle strings using small child forks.',
    definition_ar: 'دوامة شعرية النودلز؛ لعبة تدوير المعكرونة الملتوية الرائعة بالشوكة التي يسعد الصغار بتعلمها.',
    example_en: 'With a quick flick of his wrist, the kid created a perfect noodle swirl.',
    example_ar: 'بلمسة خاطفة مستديرة من معصمه الصغير، نسج البطل دوامة متقنة دائرية لشعيرية النودلز فوق الصحن.',
    category: 'kids'
  },
  {
    id: 'fc_kd_121',
    word: 'Giggle Monster',
    phonetic: '/ˈɡɪɡl ˈmɑːnstər/',
    definition_en: 'A playful kid term for someone who cannot stop laughing and spreading cute joy.',
    definition_ar: 'وحش الضحك والقهقهة اللطيف؛ لقب فكاهي تضامن زملاء الصف لإطلاقه على الرفيق الذي لا يكف عن الضحك بهجاً.',
    example_en: 'The tickle games turned Noor into a helpless happy giggle monster!',
    example_ar: 'حولت مداعبة والدتي والقرص اللطيف طفلتنا نور لوحش دغدغة لطيف عجز كلياً عن لجم ضحكاته العذبة!',
    category: 'kids'
  },
  {
    id: 'fc_kd_122',
    word: 'Warm Cuddle',
    phonetic: '/wɔːrm ˈkʌdl/',
    definition_en: 'A tight loving hug from a parent, full of tenderness and security before sleep.',
    definition_ar: 'حضن دافئ غامر؛ ضمة حانية من قبل الوالد تجرد الصغير من كل وحشة وتهمس له بآيات الأمن والسلام دافئة.',
    example_en: 'A warm cuddle from Father made all bad dreams vanish into thin air.',
    example_ar: 'بددت ضمة وحضن والدنا الحاني الوماد كل الكوابيس المظلمة من مخيلة الطفلة ليذوب قلقها في دعة.',
    category: 'kids'
  },
  {
    id: 'fc_kd_123',
    word: 'Ladybug Dots',
    phonetic: '/ˈleɪdibʌɡ dɑːts/',
    definition_en: 'The black circular patterns on the Ladybug shell, used by children to practice basic math counting.',
    definition_ar: 'كرات ونقاط الدعسوقة؛ بقع دائرية سوداء تكتسي درع الخنفساء الحمراء يستعين بها الرضع لتعلم الحساب.',
    example_en: "Let's count the seven shiny ladybug dots using this magnifying lens study!",
    example_ar: 'دعونا نعد سوياً حبات ونقاط الدعسوقة السبعة الجميلة مستعينين بعدسة التكبير اليدوية بخرجة البستان!',
    category: 'kids'
  },
  {
    id: 'fc_kd_124',
    word: 'Spaceship Captain',
    phonetic: '/ˈspeɪsˌʃɪp ˈkæptɪn/',
    definition_en: 'A roleplay space career choice for children dreaming of navigating galaxies.',
    definition_ar: 'قائد سفينة الفضاء الأسطورية؛ حلم وتجريب تمثيلي يلهمه المعهد للأطفال ليتخيلوا قيادة مراكب في الفضاء العريض.',
    example_en: 'The creative boy dressed as a spaceship captain and steered his custom cardboard rocket.',
    example_ar: 'ارتدى المغامر الصغير كسوة ربان مركبة فضاء وبسط يديه ليوجه مجسم طائرته الكرتونية منطلقاً للنجوم.',
    category: 'kids'
  },
  {
    id: 'fc_kd_125',
    word: 'Sandbox Castle',
    phonetic: '/ˈsændbɑːks ˈkæsl/',
    definition_en: 'A beautiful fortress shaped using buckets, moist sand, and decorated with river shells.',
    definition_ar: 'قلعة الرمال المائية؛ بساط تشييد فني يستعين فيه الولد برمال مبللة بالقواسم والأصداف ليرص بروج الحصن.',
    example_en: 'Our massive sandbox castle stood undefeated until the tide gently reached the shore.',
    example_ar: 'ظلت قلعتنا الرملية الرائعة بوسط صندوق الألعاب صامدة حتى بللتها موجات الشط برفق مع حلول المغيب.',
    category: 'kids'
  }
];

export const FlashcardsHub: React.FC<FlashcardsHubProps> = ({
  lang,
  userProfile,
  onBack,
  onXPAdded
}) => {
  const isRtl = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState<'oxford' | 'grammar' | 'idioms' | 'kids'>('oxford');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [streakCount, setStreakCount] = useState(5); // Simulated visual streak
  const [xpAwardedCount, setXpAwardedCount] = useState(0);
  
  // Custom TTS adjustments
  const [speechRate, setSpeechRate] = useState<number>(0.8);
  const [autoRead, setAutoRead] = useState<boolean>(true);
  const [currentlySpeaking, setCurrentlySpeaking] = useState<string | null>(null);

  // Custom User-created cards stored in localStorage to dynamic expansion
  const [customCards, setCustomCards] = useState<Flashcard[]>(() => {
    try {
      const saved = localStorage.getItem('custom_flashcards_basim');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Dynamic state for custom word creator form fields
  const [newWord, setNewWord] = useState('');
  const [newPhonetic, setNewPhonetic] = useState('');
  const [newDefEn, setNewDefEn] = useState('');
  const [newDefAr, setNewDefAr] = useState('');
  const [newExEn, setNewExEn] = useState('');
  const [newExAr, setNewExAr] = useState('');
  const [addSuccessMsg, setAddSuccessMsg] = useState('');

  // Active development panel tab
  const [developmentTab, setDevelopmentTab] = useState<'quiz' | 'review_list' | 'add'>('quiz');

  // Unified list combining static 100 base words with user-created words
  const allCards = [...FLASHCARDS_DATA, ...customCards];

  // Filter flashcards based on category
  const filteredCards = allCards.filter(card => card.category === activeCategory);
  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  // Interaction Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{
    card: Flashcard;
    type: 'word-to-ar' | 'desc-to-word';
    options: string[];
    correctAnswer: string;
  } | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<'correct' | 'incorrect' | null>(null);

  // Generate interactive random quiz specific to active category
  const triggerNewQuiz = (cardsPool = filteredCards) => {
    if (cardsPool.length < 3) {
      setQuizQuestion(null);
      return;
    }
    const randIdx = Math.floor(Math.random() * cardsPool.length);
    const targetCard = cardsPool[randIdx];
    
    // Pick other options as distractors
    const fillers = cardsPool.filter(c => c.id !== targetCard.id);
    const shuffledFillers = [...fillers].sort(() => 0.5 - Math.random());
    const pickedDistractors = shuffledFillers.slice(0, 2);

    const isWordToAr = Math.random() > 0.5;

    if (isWordToAr) {
      const correctAnswer = targetCard.definition_ar;
      const options = [correctAnswer, ...pickedDistractors.map(d => d.definition_ar)].sort(() => 0.5 - Math.random());
      setQuizQuestion({
        card: targetCard,
        type: 'word-to-ar',
        options,
        correctAnswer
      });
    } else {
      const correctAnswer = targetCard.word;
      const options = [correctAnswer, ...pickedDistractors.map(d => d.word)].sort(() => 0.5 - Math.random());
      setQuizQuestion({
        card: targetCard,
        type: 'desc-to-word',
        options,
        correctAnswer
      });
    }
    setQuizAnswer(null);
    setQuizStatus(null);
  };

  // Regenerate Quiz on category or customCard changes
  useEffect(() => {
    triggerNewQuiz(filteredCards);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [activeCategory, customCards.length]);

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const toggleMastered = (cardId: string) => {
    if (masteredIds.includes(cardId)) {
      setMasteredIds(prev => prev.filter(id => id !== cardId));
    } else {
      setMasteredIds(prev => [...prev, cardId]);
      // Remove from review list if it was there
      setReviewIds(prev => prev.filter(id => id !== cardId));
      
      // Award XP
      if (onXPAdded) {
        onXPAdded(10);
        setXpAwardedCount(prev => prev + 10);
      }
    }
  };

  const toggleReview = (cardId: string) => {
    if (reviewIds.includes(cardId)) {
      setReviewIds(prev => prev.filter(id => id !== cardId));
    } else {
      setReviewIds(prev => [...prev, cardId]);
      setMasteredIds(prev => prev.filter(id => id !== cardId));
    }
  };

  const speakText = (text: string, forceLang?: 'en-US' | 'ar-SA') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (forceLang) {
        utterance.lang = forceLang;
      } else {
        const isEnglish = /[a-zA-Z]/.test(text);
        utterance.lang = isEnglish ? 'en-US' : 'ar-SA';
      }
      utterance.rate = utterance.lang.startsWith('ar') ? 1.0 : speechRate;
      
      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find(v => v.lang.startsWith(utterance.lang.split('-')[0]));
      if (targetVoice) utterance.voice = targetVoice;
      
      utterance.onstart = () => setCurrentlySpeaking(text);
      utterance.onend = () => setCurrentlySpeaking(null);
      utterance.onerror = () => setCurrentlySpeaking(null);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Auto-read on change or flip
  useEffect(() => {
    if (autoRead && currentCard) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (!isFlipped) {
        const t = setTimeout(() => {
          speakText(currentCard.word, 'en-US');
        }, 350);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          speakText(`${currentCard.word}. ${currentCard.definition_en}`, 'en-US');
        }, 350);
        return () => clearTimeout(t);
      }
    }
  }, [currentIndex, isFlipped, autoRead]);

  // Cleanup synthesis on leave
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const progressPercentage = Math.round((masteredIds.length / FLASHCARDS_DATA.length) * 100);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 relative">
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#002147]/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 pt-6 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className={`flex justify-between items-center mb-6 pb-4 border-b border-slate-100 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 transition-all cursor-pointer shadow-sm"
            >
              <ArrowRight size={18} className={isRtl ? '' : 'rotate-180'} />
            </button>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h1 className="text-xl md:text-2xl font-black text-[#002147] font-sans">
                {isRtl ? '📖 قصر الكلمات والبطاقات الذكية' : '📖 Smart Vocabulary Flashcards Hub'}
              </h1>
              <p className="text-xs text-slate-500 font-bold">
                {isRtl ? 'قاطرة التكرار المتباعد والتذكر البصري الفطن' : 'Acoustics, memory triggers & spaced-repetition'}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 text-amber-700 border border-amber-200 rounded-2xl px-3 py-1.5 flex items-center gap-1 shadow-sm font-black text-xs">
              <Flame size={15} className="text-amber-500 fill-amber-500 animate-pulse" />
              <span>{streakCount} {isRtl ? 'أيام متتالية' : 'Days Streak'}</span>
            </div>

            <div className="bg-[#002147]/5 text-[#002147] border border-[#002147]/10 rounded-2xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm font-black text-xs font-mono">
              <Zap size={14} className="text-[#C49E3A] fill-[#C49E3A]" />
              <span>+{xpAwardedCount} XP</span>
            </div>
          </div>
        </div>

        {/* Global Stats Overview */}
        <div className="bg-white border border-slate-100 p-5 rounded-3xl mb-6 shadow-sm">
          <div className={`flex flex-col md:flex-row gap-4 justify-between items-center mb-3 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h3 className="text-sm font-black text-[#002147]">
                {isRtl ? '📈 معدل إتقان مستودع الكلمات' : '📈 Spaced Repetition Mastery'}
              </h3>
              <p className="text-xs text-slate-400 font-bold mt-0.5">
                {isRtl 
                  ? `لقد أتقنت بنجاح ${masteredIds.length} كلمة من أصل ${FLASHCARDS_DATA.length}` 
                  : `You mastered ${masteredIds.length} of ${FLASHCARDS_DATA.length} total words in the academy repository`}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-black text-[#002147] font-mono">{progressPercentage}%</span>
            </div>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#002147] to-[#C49E3A] h-full rounded-full"
            />
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {[
            { id: 'oxford', label: isRtl ? '🎓 مصطلحات أكسفورد' : '🎓 Oxford Academic', color: 'border-blue-200 text-blue-800' },
            { id: 'grammar', label: isRtl ? '📝 القواعد الأساسية' : '📝 Grammar Essentials', color: 'border-emerald-200 text-emerald-800' },
            { id: 'idioms', label: isRtl ? '💡 التعبيرات الشائعة' : '💡 Idioms & Phrases', color: 'border-amber-200 text-amber-800' },
            { id: 'kids', label: isRtl ? '🎈 مصطلحات الصغار' : '🎈 Kids Essentials', color: 'border-rose-200 text-rose-805' }
          ].map(cat => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-4 py-2.5 rounded-2xl text-[13px] font-black tracking-wide border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-[#002147] text-white border-[#002147] shadow-md shadow-[#002147]/10' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Voice & Learning Control Center */}
        <div className="bg-white border border-slate-200/70 p-4 rounded-3xl mb-6 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <h4 className="font-extrabold text-[#002147] text-[13px]">
                {isRtl ? '⚙️ إعدادات النطق والمساعد الصوتي' : '⚙️ Speech & Sound Configuration'}
              </h4>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                {isRtl ? 'تحكم في سرعة الإلقاء والتشغيل التلقائي الذكي عند قلب البطاقة!' : 'Adjust reading rate and toggle auto-play on cards'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-end w-full sm:w-auto">
            {/* Auto Read Toggle */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100/80 rounded-2xl px-3 py-1.5 shadow-sm">
              <span className="font-black text-slate-500 text-[10px] uppercase">
                {isRtl ? '🔊 تلاوة تلقائية:' : '🔊 Auto-Play:'}
              </span>
              <button
                onClick={() => {
                  setAutoRead(!autoRead);
                  if (!autoRead && currentCard) {
                    speakText(currentCard.word, 'en-US');
                  } else {
                    if ('speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                  }
                }}
                className={`w-11 h-6 rounded-full p-0.5 transition-all outline-none duration-300 relative cursor-pointer ${
                  autoRead ? 'bg-[#002147]' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
                    autoRead ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Speech Speed Selection */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-100/80 rounded-2xl p-1 shadow-sm">
              <span className="font-black text-slate-400 text-[9px] uppercase px-1.5">
                {isRtl ? 'السرعة:' : 'Speed:'}
              </span>
              {[
                { value: 0.5, label: isRtl ? '🐢 بطيء' : '🐢 Slow' },
                { value: 0.8, label: isRtl ? '👤 عادي' : '👤 Normal' },
                { value: 1.1, label: isRtl ? '⚡ سريع' : '⚡ Fast' }
              ].map(speed => (
                <button
                  key={speed.value}
                  onClick={() => {
                    setSpeechRate(speed.value);
                    if (currentCard) {
                      speakText(currentCard.word, 'en-US');
                    }
                  }}
                  className={`px-2.5 py-1.5 rounded-xl font-black text-[9px] duration-250 cursor-pointer ${
                    speechRate === speed.value
                      ? 'bg-[#C49E3A] text-white shadow-sm'
                      : 'text-slate-500 hover:text-[#002147] bg-transparent'
                  }`}
                >
                  {speed.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Core Flashcard Area */}
        {filteredCards.length > 0 ? (
          <div className="space-y-6">
            <div className="relative h-[480px] sm:h-[420px] w-full [perspective:1000px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}_${currentIndex}_${isFlipped}`}
                  initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`w-full h-full rounded-3xl p-6 md:p-8 border cursor-pointer select-none relative shadow-xl overflow-hidden flex flex-col justify-between transition-colors ${
                    isFlipped 
                      ? 'bg-gradient-to-br from-[#002147] to-[#123055] text-white border-[#002147]' 
                      : 'bg-white border-slate-200 text-[#002147] hover:border-[#002147]/25'
                  }`}
                >
                  {/* Decorative background logo */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
                    <BookOpen size={160} />
                  </div>

                  {/* Header part of Card */}
                  <div className="flex justify-between items-center relative z-10 w-full">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full border ${
                        isFlipped 
                          ? 'bg-white/10 text-[#C49E3A] border-white/10' 
                          : 'bg-[#002147]/5 text-[#002147] border-slate-200'
                      }`}>
                        {isFlipped ? (isRtl ? 'خلفية البطاقة (التحليل)' : 'REVERSE SIDE') : (isRtl ? 'واجهة البطاقة (الكلمة)' : 'FRONT SIDE')}
                      </span>

                      {/* Mastery Indicators Overlay */}
                      {masteredIds.includes(currentCard.id) && (
                        <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-sm">
                          {isRtl ? '✓ متقنة' : '✓ Mastered'}
                        </span>
                      )}
                      {reviewIds.includes(currentCard.id) && (
                        <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-sm animate-pulse">
                          {isRtl ? '★ مراجعة' : '★ Review'}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(currentCard.word, 'en-US');
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border shrink-0 ${
                          isFlipped 
                            ? 'bg-white/10 border-white/10 hover:bg-white/20 text-white' 
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-[#002147]'
                        } ${currentlySpeaking === currentCard.word ? 'ring-2 ring-[#C49E3A] scale-105' : ''}`}
                        title="Pronounce word"
                      >
                        <Volume2 size={16} className={currentlySpeaking === currentCard.word ? 'animate-bounce text-[#C49E3A]' : ''} />
                      </button>
                    </div>
                  </div>

                  {/* Main Content inside Card */}
                  <div className="text-center py-4 relative z-10 flex-1 flex flex-col justify-center items-center">
                    {!isFlipped ? (
                      <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black font-sans tracking-tight leading-none text-[#002147]">
                          {currentCard.word}
                        </h2>
                        
                        <div>
                          <p className="text-sm font-serif font-bold text-[#C49E3A] tracking-wider uppercase bg-[#C49E3A]/5 border border-[#C49E3A]/20 px-4 py-1.5 rounded-2xl inline-block shadow-inner">
                            {currentCard.phonetic}
                          </p>
                        </div>

                        {/* Interactive Equalizer when word is playing */}
                        {currentlySpeaking === currentCard.word && (
                          <div className="flex items-end justify-center gap-1.5 h-8 pt-2 animate-fade-in">
                            {[14, 28, 20, 26, 12, 22, 16, 25, 10].map((val, i) => (
                              <motion.div
                                key={i}
                                initial={{ height: 4 }}
                                animate={{ height: [4, val, 4] }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 0.5 + (i * 0.08),
                                  ease: "easeInOut"
                                }}
                                className="w-1 bg-[#C49E3A] rounded-full"
                              />
                            ))}
                          </div>
                        )}

                        {/* Interactive Example Sentence directly on the Front Side */}
                        <div 
                          onClick={(e) => e.stopPropagation()} 
                          className={`p-3.5 rounded-2xl border transition-all text-left w-full max-w-md ${
                            currentlySpeaking === currentCard.example_en 
                              ? 'bg-[#C49E3A]/10 border-[#C49E3A]' 
                              : 'bg-slate-50 hover:bg-slate-100/70 border-slate-100'
                          }`}
                        >
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-[9px] font-black text-slate-400 tracking-wider block">
                              {isRtl ? '🔊 الجملة التطبيقية وقراءتها الميسرة:' : '🔊 CONTEXT SENTENCE & SPEAK PLAYER:'}
                            </span>
                            <div className="flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakText(currentCard.example_en, 'en-US');
                                }}
                                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all border shrink-0 ${
                                  currentlySpeaking === currentCard.example_en
                                    ? 'bg-[#C49E3A] border-[#C49E3A] text-white shadow-md animate-pulse'
                                    : 'bg-white hover:bg-slate-50 border-slate-200 text-[#002147]/70'
                                }`}
                                title={isRtl ? 'نطق الجملة بصوت منسجم' : 'Read English sentence aloud'}
                              >
                                <Volume2 size={12} className={currentlySpeaking === currentCard.example_en ? 'animate-bounce' : ''} />
                              </button>
                            </div>
                          </div>
                          
                          <p className="text-xs font-sans text-slate-700 font-bold leading-relaxed italic mt-1.5 select-text">
                            &ldquo; {currentCard.example_en} &rdquo;
                          </p>
                          
                          <p className="text-[11px] text-slate-500 font-bold mt-1 text-right border-t border-slate-200/50 pt-1">
                            {currentCard.example_ar}
                          </p>
                        </div>

                        <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase flex items-center gap-1.5 justify-center pt-2">
                          <RotateCw size={11} className="animate-spin-slow" />
                          <span>{isRtl ? 'انقر لقلب البطاقة وعرض الشرح والترجمة' : 'TAP TO FLIP & REVEAL MEANING'}</span>
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 w-full max-w-xl text-left">
                        {/* Interactive Definition Block */}
                        <div 
                          onClick={(e) => e.stopPropagation()} 
                          className={`p-4 rounded-2xl border transition-all ${
                            currentlySpeaking === currentCard.definition_en 
                              ? 'bg-white/[0.08] border-[#C49E3A]' 
                              : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 space-y-1">
                              <span className="text-[9px] font-black text-amber-300 uppercase tracking-widest block">
                                {isRtl ? '📝 الشرح والتعريف العلمي بالإنجليزية:' : '📝 ACADEMIC DEFINITION:'}
                              </span>
                              <p className="text-sm font-sans font-medium text-white/95 leading-relaxed">
                                {currentCard.definition_en}
                              </p>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakText(currentCard.definition_en, 'en-US');
                              }}
                              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                                currentlySpeaking === currentCard.definition_en
                                  ? 'bg-[#C49E3A] border-[#C49E3A] text-white animate-pulse shadow-md shadow-[#C49E3A]/20'
                                  : 'bg-white/5 hover:bg-white/15 border-white/10 text-white'
                              }`}
                              title="Speak definition"
                            >
                              <Volume2 size={14} className={currentlySpeaking === currentCard.definition_en ? 'animate-bounce' : ''} />
                            </button>
                          </div>

                          {/* Arabic Definition Sub-Row with speaker */}
                          <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-start gap-3">
                            <div className={`flex-1 ${isRtl ? 'text-right' : ''}`}>
                              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-0.5">
                                {isRtl ? '🔍 المعنى والترجمة بالعربية:' : '🔍 ARABIC MEANING:'}
                              </span>
                              <p className="text-xs font-bold text-amber-200 leading-relaxed font-sans">
                                {currentCard.definition_ar}
                              </p>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakText(currentCard.definition_ar, 'ar-SA');
                              }}
                              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                                currentlySpeaking === currentCard.definition_ar
                                  ? 'bg-[#C49E3A] border-[#C49E3A] text-white'
                                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                              }`}
                              title="نطق الشرح بالعربية"
                            >
                              <Volume2 size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Interactive Example Sentence Block */}
                        <div 
                          onClick={(e) => e.stopPropagation()} 
                          className={`p-4 rounded-2xl border transition-all ${
                            currentlySpeaking === currentCard.example_en 
                              ? 'bg-[#C49E3A]/10 border-[#C49E3A]' 
                              : 'bg-white/[0.02] border-white/10 hover:border-white/15'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 space-y-1">
                              <span className="text-[9px] font-black text-[#C49E3A] uppercase tracking-widest block">
                                {isRtl ? '💡 جملة تطبيقية مقترحة (Example):' : '💡 ENRICHED EXAMPLE:'}
                              </span>
                              <p className="text-sm font-sans text-white/90 leading-relaxed italic font-bold">
                                &ldquo; {currentCard.example_en} &rdquo;
                              </p>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakText(currentCard.example_en, 'en-US');
                              }}
                              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                                currentlySpeaking === currentCard.example_en
                                  ? 'bg-[#C49E3A] border-[#C49E3A] text-white animate-pulse shadow-md'
                                  : 'bg-white/5 hover:bg-white/15 border-white/10 text-white'
                              }`}
                              title="Speak example sentence"
                            >
                              <Volume2 size={14} className={currentlySpeaking === currentCard.example_en ? 'animate-bounce' : ''} />
                            </button>
                          </div>

                          {/* Arabic Translation Sub-Row with speaker */}
                          <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-start gap-3">
                            <div className={`flex-1 ${isRtl ? 'text-right' : ''}`}>
                              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-0.5">
                                {isRtl ? '🎯 ترجمة الجملة بالعربية:' : '🎯 ARABIC TRANSLATION:'}
                              </span>
                              <p className="text-xs font-bold text-slate-200 leading-relaxed">
                                &ldquo; {currentCard.example_ar} &rdquo;
                              </p>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakText(currentCard.example_ar, 'ar-SA');
                              }}
                              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                                currentlySpeaking === currentCard.example_ar
                                  ? 'bg-[#C49E3A] border-[#C49E3A] text-white'
                                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                              }`}
                              title="نطق الجملة بالعربية"
                            >
                              <Volume2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer part of Card */}
                  <div className="flex justify-between items-center relative z-10 w-full mt-auto pt-2 border-t border-slate-100/10">
                    <span className={`text-[10px] font-black font-mono tracking-wider ${isFlipped ? 'text-white/60' : 'text-slate-400'}`}>
                      Card {currentIndex + 1} of {filteredCards.length}
                    </span>

                    <span className={`text-[10px] font-black ${isFlipped ? 'text-amber-300' : 'text-[#002147]/60'}`}>
                      {isRtl ? 'أكاديمية باسم الفطنة 👑' : 'Basim Academy'}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Back/Next controls */}
            <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-3xl shadow-sm">
              <button
                onClick={handlePrev}
                className={`flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-black text-xs transition-colors cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
              >
                {isRtl ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
                <span>{isRtl ? 'البطاقة السابقة' : 'Previous Card'}</span>
              </button>

              {/* Central Action Toggles: Mastered or Review */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReview(currentCard.id);
                  }}
                  className={`px-3 py-1.5 text-[10px] font-bold border rounded-xl flex items-center gap-1 transition-all cursor-pointer ${
                    reviewIds.includes(currentCard.id)
                      ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-inner'
                      : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <Bookmark size={11} className={reviewIds.includes(currentCard.id) ? 'fill-rose-500 text-rose-500' : ''} />
                  <span>{isRtl ? 'مراجعة قريبة' : 'Needs Review'}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered(currentCard.id);
                  }}
                  className={`px-3.5 py-1.5 text-[10px] font-bold border rounded-xl flex items-center gap-1 transition-all cursor-pointer ${
                    masteredIds.includes(currentCard.id)
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-inner scale-105'
                      : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <BookmarkCheck size={11} className={masteredIds.includes(currentCard.id) ? 'fill-emerald-500 text-emerald-500' : ''} />
                  <span>{masteredIds.includes(currentCard.id) ? (isRtl ? 'تم إتقانها! ✓' : 'Mastered! ✓') : (isRtl ? 'حفظ وإتقان الكلمة' : 'Mark Mastered')}</span>
                </button>
              </div>

              <button
                onClick={handleNext}
                className={`flex items-center gap-1.5 px-4 py-2.5 bg-[#002147] hover:bg-[#002147]/95 text-white rounded-xl font-black text-xs transition-colors cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
              >
                <span>{isRtl ? 'البطاقة القادمة' : 'Next Card'}</span>
                {isRtl ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
              </button>
            </div>

            {/* Quick Tips or Info section */}
            <div className={`bg-gradient-to-br from-[#002147]/5 to-[#C49E3A]/5 border border-amber-100 rounded-3xl p-5 flex gap-3 items-start ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <Sparkles size={18} className="text-amber-500 mt-1 shrink-0 animate-pulse" />
              <div>
                <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                  {isRtl ? '💡 طريقة التكرار المتباعد الفعالة (Leitner System):' : '💡 Effective Spaced-Repetition Tip:'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1 font-sans">
                  {isRtl 
                    ? 'حدد الكلمات التي تشعر بالتردد بنطقها كـ "مراجعة قريبة" للمثابرة عليها لاحقاً. البطاقات التي أصبحت في خانة "تم إتقانها" ستحصل مقابلها على 10+ نقاط تفوق (XP) فطن!'
                    : 'Mark any difficult words as "Needs Review" so you can cycle through them faster. Mastering cards rewards you with +10 XP. Regular reviews keep them in your long-term memory!'}
                </p>
              </div>
            </div>

            {/* 🏆 لوحة البراعة والتنمية اللغوية للمستخدم والمطور باسم (Review, Add, Develop & Challenge) */}
            <div className="bg-white border-2 border-[#002147]/10 p-5 md:p-6 rounded-3xl mt-8 shadow-md">
              <div className={`flex flex-col sm:flex-row justify-between items-center pb-4 mb-5 border-b border-slate-100 gap-3 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <h3 className="text-base font-black text-[#002147] font-sans flex items-center gap-2">
                    <Award className="text-[#C49E3A]" size={18} />
                    <span>{isRtl ? '🏆 جناح مراجعة، إضافة وتطوير المفردات' : '🏆 Vocabulary Mastery & Custom Dev Hub'}</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold mt-0.5">
                    {isRtl ? 'راجع كلماتك الصعبة، أضف مفردات جديدة لفصلك، واختبر فطنتك اللغوية بذكاء!' : 'Review challenging words, append custom cards, and test your vocabulary skills!'}
                  </p>
                </div>

                {/* Sub-Tabs switcher */}
                <div className="flex gap-1.5 bg-slate-100/85 p-1 rounded-2xl">
                  {[
                    { id: 'quiz', label: isRtl ? '🧠 اختبار ذكي' : '🧠 Quiz' },
                    { id: 'review_list', label: isRtl ? '🔍 قائمة المراجعة' : '🔍 Review List' },
                    { id: 'add', label: isRtl ? '➕ إضافة كلمة' : '➕ Add Word' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setDevelopmentTab(tab.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-[11px] font-black cursor-pointer transition-all ${
                        developmentTab === tab.id
                          ? 'bg-[#002147] text-white shadow-sm'
                          : 'text-slate-500 hover:text-[#002147]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-Tabs Display content */}
              <AnimatePresence mode="wait">
                {/* 1. QUIZ CHALLENGE SUB-TAB */}
                {developmentTab === 'quiz' && (
                  <motion.div
                    key="quiz_tab"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-4"
                  >
                    {quizQuestion ? (
                      <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-2xl">
                        <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 tracking-wider">
                          {isRtl ? '🏆 تحدي الفهم الحالي' : '🏆 ACTIVE RETENTION CHALLENGE'}
                        </span>
                        
                        {quizQuestion.type === 'word-to-ar' ? (
                          <div className={`mt-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                            <p className="text-xs text-slate-400 font-bold">
                              {isRtl ? 'ما هو المعنى الصحيح للكلمة التالية باللغة العربية؟' : 'What is the correct Arabic meaning of the following word?'}
                            </p>
                            <h4 className="text-2xl font-black text-[#002147] mt-1 mb-4 select-all">
                              {quizQuestion.card.word} <span className="text-xs text-[#C49E3A] font-serif font-bold">{quizQuestion.card.phonetic}</span>
                            </h4>
                          </div>
                        ) : (
                          <div className={`mt-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                            <p className="text-xs text-slate-400 font-bold">
                              {isRtl ? 'أي الكلمات التالية توافق بشكل تام التفسير العلمي أدناه؟' : 'Which word perfectly defines the following academic concept?'}
                            </p>
                            <p className="text-sm font-sans font-medium text-slate-700 bg-white border border-slate-100 p-3 rounded-xl mt-1 mb-4 shadow-sm italic select-all">
                              &ldquo; {quizQuestion.card.definition_en} &rdquo;
                            </p>
                          </div>
                        )}

                        {/* Interactive choices */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {quizQuestion.options.map((option, idx) => {
                            const isSelected = quizAnswer === option;
                            const isCorrect = option === quizQuestion.correctAnswer;
                            
                            let btnStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-[#002147]';
                            if (quizAnswer) {
                              if (isCorrect) {
                                btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
                              } else if (isSelected) {
                                btnStyle = 'bg-rose-50 text-rose-800 border-rose-300';
                              } else {
                                btnStyle = 'bg-white border-slate-100 text-slate-400 opacity-60';
                              }
                            }
                            
                            return (
                              <button
                                key={idx}
                                disabled={!!quizAnswer}
                                onClick={() => {
                                  setQuizAnswer(option);
                                  if (option === quizQuestion.correctAnswer) {
                                    setQuizStatus('correct');
                                    speakText(isRtl ? 'رائع إجابة صحيحة' : 'Incredible! correct answer', 'en-US');
                                    if (onXPAdded) {
                                      onXPAdded(15);
                                      setXpAwardedCount(prev => prev + 15);
                                    }
                                  } else {
                                    setQuizStatus('incorrect');
                                    speakText(isRtl ? 'إجابة خاطئة حاول مجددا' : 'Wrong answer! try again', 'en-US');
                                  }
                                }}
                                className={`p-3 rounded-xl border text-xs font-black transition-all cursor-pointer ${btnStyle}`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>

                        {/* Status feedback block */}
                        {quizAnswer && (
                          <div className={`mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                            <span className={`text-xs font-black flex items-center gap-1.5 ${quizStatus === 'correct' ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {quizStatus === 'correct' ? (
                                <>
                                  <CheckCircle size={15} />
                                  <span>{isRtl ? '✓ كفو فطن! أحسنت صنعاً (+15 XP)' : '✓ Outstanding memory! (+15 XP)'}</span>
                                </>
                              ) : (
                                <>
                                  <HelpCircle size={15} />
                                  <span>{isRtl ? '✗ الإجابة الصحيحة كانت: ' + quizQuestion.correctAnswer : '✗ Incorrect. The right match was: ' + quizQuestion.correctAnswer}</span>
                                </>
                              )}
                            </span>

                            <button
                              onClick={() => triggerNewQuiz()}
                              className="px-3 py-1.5 bg-[#002147] hover:bg-[#002147]/90 text-white rounded-xl font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <RefreshCcw size={10} />
                              <span>{isRtl ? 'تحدي جديد' : 'New Challenge'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-slate-400 text-xs">
                        {isRtl ? 'يرجى إدخال كلمات إضافية للتمكن من توليد مسابقة تفاعلية مبهجة.' : 'Add more words to enable game dynamics.'}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2. CHALLENGING WORDS REVIEW SUB-TAB */}
                {developmentTab === 'review_list' && (
                  <motion.div
                    key="review_tab"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className={`text-xs font-black text-[#002147] mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {isRtl ? `📋 مسارات المراجعة النشطة للفئة الحالية (${filteredCards.filter(c => reviewIds.includes(c.id)).length} كلمات متبقية):` : `📋 Active category review items (${filteredCards.filter(c => reviewIds.includes(c.id)).length} pending):`}
                      </h4>
                    </div>

                    {filteredCards.filter(c => reviewIds.includes(c.id)).length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                        {filteredCards.filter(c => reviewIds.includes(c.id)).map(card => (
                          <div 
                            key={card.id} 
                            className={`p-3.5 bg-slate-50 border border-slate-100 hover:border-[#002147]/20 rounded-2xl flex justify-between items-center transition-all ${isRtl ? 'flex-row-reverse' : ''}`}
                          >
                            <div className={isRtl ? 'text-right' : 'text-left'}>
                              <p className="text-xs font-black text-[#002147]">{card.word}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{card.phonetic}</p>
                              <p className="text-[10px] text-amber-700 font-bold mt-1 max-w-xs">{card.definition_ar}</p>
                            </div>

                            <div className="flex gap-1.5 shrink-0">
                              <button
                                onClick={() => speakText(card.word, 'en-US')}
                                className="w-7 h-7 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg flex items-center justify-center shrink-0"
                                title="Listen pronunciation"
                              >
                                <Volume2 size={13} />
                              </button>
                              <button
                                onClick={() => toggleReview(card.id)}
                                className="w-7 h-7 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-lg flex items-center justify-center shrink-0"
                                title="إزالة من المراجعة"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                        <Bookmark className="text-slate-300 mx-auto mb-2 opacity-50" size={24} />
                        <p className="text-xs text-slate-500 font-bold">
                          {isRtl ? 'لا توجد كلمات حالية تحتاج مراجعة تحت هذه الفئة. عظيم!' : 'Splendid! You sorted everything for review in this channel.'}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {isRtl ? 'انقر على زر "مراجعة قريبة" أثناء تصفح البطاقة لإضافة الكلمات الصعبة هنا.' : 'Click "Needs Review" on any card view above to seed items in this sandbox!'}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 3. ADD CUSTOM FLASHCARD SUB-TAB */}
                {developmentTab === 'add' && (
                  <motion.div
                    key="add_tab"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newWord.trim() || !newDefEn.trim() || !newDefAr.trim()) return;

                        const added: Flashcard = {
                          id: `fc_custom_${Date.now()}`,
                          word: newWord.trim(),
                          phonetic: newPhonetic.trim() || '/ˈkʌstəm/',
                          definition_en: newDefEn.trim(),
                          definition_ar: newDefAr.trim(),
                          example_en: newExEn.trim() || 'This is a custom interactive sentence.',
                          example_ar: newExAr.trim() || 'هذه جملة تفاعلية مخصصة.',
                          category: activeCategory
                        };

                        const nextCustoms = [...customCards, added];
                        setCustomCards(nextCustoms);
                        localStorage.setItem('custom_flashcards_basim', JSON.stringify(nextCustoms));

                        setNewWord('');
                        setNewPhonetic('');
                        setNewDefEn('');
                        setNewDefAr('');
                        setNewExEn('');
                        setNewExAr('');

                        setAddSuccessMsg(isRtl ? '✨ تم إضافة بطاقتك الذكية بنجاح في هذا القسم!' : '✨ New custom card added successfully!');
                        setTimeout(() => setAddSuccessMsg(''), 4000);

                        if (onXPAdded) {
                          onXPAdded(15);
                          setXpAwardedCount(prev => prev + 15);
                        }
                      }}
                      className="space-y-4"
                    >
                      {addSuccessMsg && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black p-3 rounded-xl animate-bounce text-center">
                          {addSuccessMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Word Input */}
                        <div className={`space-y-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label className="text-[11px] font-black text-[#002147] block">
                            {isRtl ? '🔑 الكلمة الإنجليزية (English Word) *:' : '🔑 English Word *:'}
                          </label>
                          <input
                            type="text"
                            required
                            value={newWord}
                            onChange={(e) => setNewWord(e.target.value)}
                            placeholder="e.g., Illuminate"
                            className="w-full text-xs font-sans font-bold bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:border-[#002147] transition-all"
                          />
                        </div>

                        {/* Phonetic Spelt Input */}
                        <div className={`space-y-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label className="text-[11px] font-black text-slate-400 block">
                            {isRtl ? '🗣️ اللفظ الصوتي (Phonetic spelling) - اختياري:' : '🗣️ Phonetic Spelt - Optional:'}
                          </label>
                          <input
                            type="text"
                            value={newPhonetic}
                            onChange={(e) => setNewPhonetic(e.target.value)}
                            placeholder="e.g., /ɪˈluːmɪneɪt/"
                            className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:border-[#002147] transition-all"
                          />
                        </div>

                        {/* ENG Definition */}
                        <div className={`space-y-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label className="text-[11px] font-black text-[#002147] block">
                            {isRtl ? '📝 التعريف العلمي بالإنجليزي (ENG Definition) *:' : '📝 ENG Definition *:'}
                          </label>
                          <input
                            type="text"
                            required
                            value={newDefEn}
                            onChange={(e) => setNewDefEn(e.target.value)}
                            placeholder="To make something visible or bright with light..."
                            className="w-full text-xs font-sans font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:border-[#002147] transition-all"
                          />
                        </div>

                        {/* ARB Definition */}
                        <div className={`space-y-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label className="text-[11px] font-black text-[#002147] block">
                            {isRtl ? '🎨 المعنى والتفسير القيّم بالعربية *:' : '🎨 ARB Mean & Definition *:'}
                          </label>
                          <input
                            type="text"
                            required
                            value={newDefAr}
                            onChange={(e) => setNewDefAr(e.target.value)}
                            placeholder="مثال: يضيء وينير الكوانب بنور بهي ساحر الشدة..."
                            className="w-full text-xs font-sans font-bold bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:border-[#002147] transition-all text-right"
                          />
                        </div>

                        {/* ENG Example */}
                        <div className={`space-y-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label className="text-[11px] font-black text-slate-400 block">
                            {isRtl ? '💡 جملة إنجليزية تطبيقية (ENG Example sentence):' : '💡 English Example Sentence:'}
                          </label>
                          <input
                            type="text"
                            value={newExEn}
                            onChange={(e) => setNewExEn(e.target.value)}
                            placeholder="The moonlight was enough to illuminate the path..."
                            className="w-full text-xs font-sans bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:border-[#002147] transition-all"
                          />
                        </div>

                        {/* ARB Example */}
                        <div className={`space-y-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label className="text-[11px] font-black text-slate-400 block">
                            {isRtl ? '🎯 الجملة مترجمة للغة العربية (ARB Description):' : '🎯 Arabic Sentence translation:'}
                          </label>
                          <input
                            type="text"
                            value={newExAr}
                            onChange={(e) => setNewExAr(e.target.value)}
                            placeholder="مثال: كان ضوء القمر منسرباً وكافياً ليرشد خطى السالكين بالليل الوديع..."
                            className="w-full text-xs font-sans bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:border-[#002147] transition-all text-right"
                          />
                        </div>
                      </div>

                      <div className={`pt-2 flex ${isRtl ? 'justify-start' : 'justify-end'}`}>
                        <button
                          type="submit"
                          className="px-5 py-3 cursor-pointer bg-[#002147] hover:bg-slate-900 border border-[#002147] text-white rounded-xl font-black text-xs transition-colors flex items-center gap-1.5"
                        >
                          <Plus size={14} />
                          <span>{isRtl ? 'إرسال وحفظ البطاقة فوراً (+15 XP)' : 'Submit & Save custom card (+15 XP)'}</span>
                        </button>
                      </div>
                    </form>

                    {/* Show created custom cards of active Category so user can track/delete them */}
                    {customCards.filter(c => c.category === activeCategory).length > 0 && (
                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <h5 className={`text-[10px] font-black text-slate-400 tracking-wider mb-2 uppercase ${isRtl ? 'text-right' : 'text-left'}`}>
                          {isRtl ? '🛠️ الكلمات المخصصة المضافة من قبلك في هذا القسم حالياً:' : '🛠️ Your custom added words in this category:'}
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {customCards.filter(c => c.category === activeCategory).map(card => (
                            <div 
                              key={card.id} 
                              className={`p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-[11px] ${isRtl ? 'flex-row-reverse' : ''}`}
                            >
                              <span className="font-extrabold text-[#002147] truncate gap-1 flex items-center">
                                <span>🏷️</span>
                                <span>{card.word}</span>
                              </span>

                              <button
                                type="button"
                                onClick={() => {
                                  const updated = customCards.filter(c => c.id !== card.id);
                                  setCustomCards(updated);
                                  localStorage.setItem('custom_flashcards_basim', JSON.stringify(updated));
                                  if (reviewIds.includes(card.id)) {
                                    setReviewIds(prev => prev.filter(x => x !== card.id));
                                  }
                                  if (masteredIds.includes(card.id)) {
                                    setMasteredIds(prev => prev.filter(x => x !== card.id));
                                  }
                                }}
                                className="p-1 hover:bg-rose-50 text-rose-600 rounded-lg cursor-pointer border border-transparent hover:border-rose-100"
                                title="حذف الكلمة"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8 space-y-4 shadow-sm">
            <HelpCircle size={48} className="text-slate-300 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-[#002147]">{isRtl ? 'لا توجد كلمات في هذا القسم' : 'No words captured'}</h3>
            <p className="text-xs text-slate-500">{isRtl ? 'يرجى مراجعة اختيار الفئة المحددة.' : 'Please select another category above.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};
