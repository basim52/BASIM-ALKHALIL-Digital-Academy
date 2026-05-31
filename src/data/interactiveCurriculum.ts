export interface PronunciationLabItem {
  id: string;
  title_ar: string;
  sound_pair?: string[];
  silent_letters?: string[];
  topic?: string;
}

export interface RolePlayChallengeItem {
  id: string;
  title_ar: string;
  category: string;
}

export interface VisualDictionaryItem {
  id: string;
  category_ar: string;
  words_count: number;
}

export interface EnglishWithSongItem {
  id: string;
  title: string;
  artist?: string;
  level: string; // "أطفال" or "كبار"
}

export interface CartoonSeriesItem {
  id: string;
  title_ar: string;
}

export interface SpeakingPartnerPromptItem {
  id: string;
  persona: string;
}

export interface WeeklyChallengeItem {
  id: string;
  title_ar: string;
}

export interface AchievementTreeItem {
  id: string;
  title_ar: string;
}

export interface EscapeRoomPuzzleItem {
  id: string;
  title_ar: string;
}

export interface WhatsappTemplateItem {
  id: string;
  title_ar: string;
}

export interface FamilyGameItem {
  id: string;
  title_ar: string;
}

export interface StoryArtPromptItem {
  id: string;
  title_ar: string;
}

export interface CookingChallengeItem {
  id: string;
  title_en: string;
}

export const PRONUNCIATION_LAB_DATA: PronunciationLabItem[] = [
  { "id": "pron_001", "title_ar": "الفرق بين /p/ و /b/", "sound_pair": ["/p/","/b/"] },
  { "id": "pron_002", "title_ar": "الفرق بين /f/ و /v/", "sound_pair": ["/f/","/v/"] },
  { "id": "pron_003", "title_ar": "الفرق بين /θ/ (think) و /ð/ (this)", "sound_pair": ["/θ/","/ð/"] },
  { "id": "pron_004", "title_ar": "الفرق بين /s/ و /θ/ (sin vs thin)", "sound_pair": ["/s/","/θ/"] },
  { "id": "pron_005", "title_ar": "الفرق بين /z/ و /ð/ (zoo vs the)", "sound_pair": ["/z/","/ð/"] },
  { "id": "pron_006", "title_ar": "الفرق بين /tʃ/ (chicken) و /ʃ/ (ship)", "sound_pair": ["/tʃ/","/ʃ/"] },
  { "id": "pron_007", "title_ar": "الفرق بين /dʒ/ (job) و /ʒ/ (measure)", "sound_pair": ["/dʒ/","/ʒ/"] },
  { "id": "pron_008", "title_ar": "الفرق بين /l/ و /r/ (light vs right)", "sound_pair": ["/l/","/r/"] },
  { "id": "pron_009", "title_ar": "الفرق بين /æ/ (cat) و /e/ (bed)", "sound_pair": ["/æ/","/e/"] },
  { "id": "pron_010", "title_ar": "الفرق بين /ɪ/ (sit) و /iː/ (seat)", "sound_pair": ["/ɪ/","/iː/"] },
  { "id": "pron_011", "title_ar": "الفرق بين /ʊ/ (book) و /uː/ (boot)", "sound_pair": ["/ʊ/","/uː/"] },
  { "id": "pron_012", "title_ar": "الفرق بين /ɒ/ (hot) و /ɔː/ (horse)", "sound_pair": ["/ɒ/","/ɔː/"] },
  { "id": "pron_013", "title_ar": "الفرق بين /ʌ/ (cup) و /ɑː/ (car)", "sound_pair": ["/ʌ/","/ɑː/"] },
  { "id": "pron_014", "title_ar": "الفرق بين /eɪ/ (day) و /aɪ/ (my)", "sound_pair": ["/eɪ/","/aɪ/"] },
  { "id": "pron_015", "title_ar": "الفرق بين /aʊ/ (how) و /əʊ/ (go)", "sound_pair": ["/aʊ/","/əʊ/"] },
  { "id": "pron_016", "title_ar": "الحروف الصامتة k, w, g, b", "silent_letters": ["k","w","g","b"] },
  { "id": "pron_017", "title_ar": "نطق نهاية الكلمات -ed", "topic": "-ed endings" },
  { "id": "pron_018", "title_ar": "نطق نهاية الكلمات -s/-es", "topic": "-s/-es endings" },
  { "id": "pron_019", "title_ar": "النبرة في الكلمات (REcord vs reCORD)", "topic": "word stress" },
  { "id": "pron_020", "title_ar": "النبرة في الجمل", "topic": "sentence stress" }
];

export const ROLE_PLAY_CHALLENGES_DATA: RolePlayChallengeItem[] = [
  { "id": "role_001", "title_ar": "طلب الطعام الأساسي", "category": "مطعم" },
  { "id": "role_002", "title_ar": "السؤال عن مكونات طبق", "category": "مطعم" },
  { "id": "role_003", "title_ar": "الشكوى من طلب خاطئ", "category": "مطعم" },
  { "id": "role_004", "title_ar": "طلب الفاتورة", "category": "مطعم" },
  { "id": "role_005", "title_ar": "حجز تذكرة قطار", "category": "سفر" },
  { "id": "role_006", "title_ar": "السؤال عن بوابة الطائرة", "category": "سفر" },
  { "id": "role_007", "title_ar": "ركوب سيارة أجرة", "category": "سفر" },
  { "id": "role_008", "title_ar": "تسجيل الوصول في الفندق", "category": "سفر" },
  { "id": "role_009", "title_ar": "السؤال عن مقاس حذاء", "category": "تسوق" },
  { "id": "role_010", "title_ar": "طلب خصم على السعر", "category": "تسوق" },
  { "id": "role_011", "title_ar": "إرجاع قطعة ملابس", "category": "تسوق" },
  { "id": "role_012", "title_ar": "حدثني عن نفسك (مقابلة)", "category": "عمل" },
  { "id": "role_013", "title_ar": "طلب مساعدة من زميل", "category": "عمل" },
  { "id": "role_014", "title_ar": "الاعتذار عن التأخير للمدير", "category": "عمل" },
  { "id": "role_015", "title_ar": "ترتيب اجتماع عبر الإيميل", "category": "عمل" },
  { "id": "role_016", "title_ar": "السؤال عن الطريق", "category": "مواقف عامة" },
  { "id": "role_017", "title_ar": "شرح الأعراض في الصيدلية", "category": "مواقف عامة" },
  { "id": "role_018", "title_ar": "دعوة الجيران للعشاء", "category": "عائلة" },
  { "id": "role_019", "title_ar": "التحدث مع طفل صغير", "category": "عائلة" },
  { "id": "role_020", "title_ar": "الاتصال بالطوارئ", "category": "طارئة" }
];

export const VISUAL_DICTIONARY_DATA: VisualDictionaryItem[] = [
  { "id": "dict_001", "category_ar": "في المنزل", "words_count": 12 },
  { "id": "dict_002", "category_ar": "غرفة النوم والحمام", "words_count": 12 },
  { "id": "dict_003", "category_ar": "الملابس والإكسسوارات", "words_count": 12 },
  { "id": "dict_004", "category_ar": "الطعام والفواكه", "words_count": 12 },
  { "id": "dict_005", "category_ar": "الخضروات والمعلبات", "words_count": 12 },
  { "id": "dict_006", "category_ar": "المشروبات", "words_count": 12 },
  { "id": "dict_007", "category_ar": "الحيوانات الأليفة والمزرعة", "words_count": 12 },
  { "id": "dict_008", "category_ar": "حيوانات الغابة والبحر", "words_count": 12 },
  { "id": "dict_009", "category_ar": "الطيور والحشرات", "words_count": 12 },
  { "id": "dict_010", "category_ar": "وسائل النقل", "words_count": 12 },
  { "id": "dict_011", "category_ar": "الأدوات المدرسية", "words_count": 12 },
  { "id": "dict_012", "category_ar": "المهن والوظائف", "words_count": 12 },
  { "id": "dict_013", "category_ar": "الرياضات والألعاب", "words_count": 12 },
  { "id": "dict_014", "category_ar": "الطقس والفصول", "words_count": 12 },
  { "id": "dict_015", "category_ar": "جسم الإنسان", "words_count": 12 },
  { "id": "dict_016", "category_ar": "المشاعر والأحاسيس", "words_count": 12 },
  { "id": "dict_017", "category_ar": "الصفات والأضداد", "words_count": 12 },
  { "id": "dict_018", "category_ar": "الألوان والأشكال", "words_count": 12 },
  { "id": "dict_019", "category_ar": "العائلة والأقارب", "words_count": 12 },
  { "id": "dict_020", "category_ar": "الأماكن العامة", "words_count": 12 }
];

export const ENGLISH_WITH_SONGS_DATA: EnglishWithSongItem[] = [
  { "id": "song_001", "title": "Twinkle Twinkle Little Star", "level": "أطفال" },
  { "id": "song_002", "title": "Old MacDonald Had a Farm", "level": "أطفال" },
  { "id": "song_003", "title": "If You're Happy and You Know It", "level": "أطفال" },
  { "id": "song_004", "title": "Head, Shoulders, Knees and Toes", "level": "أطفال" },
  { "id": "song_005", "title": "The Wheels on the Bus", "level": "أطفال" },
  { "id": "song_006", "title": "Baby Shark", "level": "أطفال" },
  { "id": "song_007", "title": "Rain, Rain, Go Away", "level": "أطفال" },
  { "id": "song_008", "title": "Five Little Ducks", "level": "أطفال" },
  { "id": "song_009", "title": "Itsy Bitsy Spider", "level": "أطفال" },
  { "id": "song_010", "title": "BINGO", "level": "أطفال" },
  { "id": "song_011", "title": "Let It Be", "artist": "The Beatles", "level": "كبار" },
  { "id": "song_012", "title": "Imagine", "artist": "John Lennon", "level": "كبار" },
  { "id": "song_013", "title": "Count on Me", "artist": "Bruno Mars", "level": "كبار" },
  { "id": "song_014", "title": "Perfect", "artist": "Ed Sheeran", "level": "كبار" },
  { "id": "song_015", "title": "Yesterday", "artist": "The Beatles", "level": "كبار" },
  { "id": "song_016", "title": "Wonderful Tonight", "artist": "Eric Clapton", "level": "كبار" },
  { "id": "song_017", "title": "Lemon Tree", "artist": "Fool's Garden", "level": "كبار" },
  { "id": "song_018", "title": "I'm Yours", "artist": "Jason Mraz", "level": "كبار" },
  { "id": "song_019", "title": "Hallelujah", "artist": "Leonard Cohen", "level": "كبار" },
  { "id": "song_020", "title": "What a Wonderful World", "artist": "Louis Armstrong", "level": "كبار" }
];

export const CARTOON_SERIES_DATA: CartoonSeriesItem[] = [
  { "id": "cartoon_001", "title_ar": "نور تتعلم ركوب الأمواج" },
  { "id": "cartoon_002", "title_ar": "نور تزور مزرعة الرياح" },
  { "id": "cartoon_003", "title_ar": "نور تضيع في الغابة" },
  { "id": "cartoon_004", "title_ar": "نور تبني بيتاً على الشجرة" },
  { "id": "cartoon_005", "title_ar": "نور تخترع آلة زمن" },
  { "id": "cartoon_006", "title_ar": "نور في الفضاء" },
  { "id": "cartoon_007", "title_ar": "نور تنقذ حيواناً برياً" },
  { "id": "cartoon_008", "title_ar": "نور تشارك في ماراثون" },
  { "id": "cartoon_009", "title_ar": "نور تتعلم الطبخ الإيطالي" },
  { "id": "cartoon_010", "title_ar": "نور ترسم جدارية عملاقة" },
  { "id": "cartoon_011", "title_ar": "نور تتعلم اللغة العربية (تبادل ثقافي)" },
  { "id": "cartoon_012", "title_ar": "نور تحل لغز القرية المهجورة" },
  { "id": "cartoon_013", "title_ar": "نور تصبح طبيبة لمدة يوم" },
  { "id": "cartoon_014", "title_ar": "نور تزرع حديقة على السطح" },
  { "id": "cartoon_015", "title_ar": "نور تكتشف كهفاً بحرياً" },
  { "id": "cartoon_016", "title_ar": "نور تشارك في مسابقة روبوتات" },
  { "id": "cartoon_017", "title_ar": "نور تطير منطاداً هوائياً" },
  { "id": "cartoon_018", "title_ar": "نور تتعلم فن الأوريغامي" },
  { "id": "cartoon_019", "title_ar": "نور تنظم حفلة مفاجئة" },
  { "id": "cartoon_020", "title_ar": "نور تكتب كتاباً للأطفال" }
];

export const SPEAKING_PARTNER_PROMPTS_DATA: SpeakingPartnerPromptItem[] = [
  { "id": "partner_001", "persona": "نادل في مطعم إيطالي" },
  { "id": "partner_002", "persona": "موظف استقبال في فندق" },
  { "id": "partner_003", "persona": "سائق تاكسي في نيويورك" },
  { "id": "partner_004", "persona": "صديق في حفلة تعارف" },
  { "id": "partner_005", "persona": "بائع في متجر ملابس" },
  { "id": "partner_006", "persona": "طبيب يسأل عن الأعراض" },
  { "id": "partner_007", "persona": "شرطي يساعد في إيجاد الطريق" },
  { "id": "partner_008", "persona": "مرشد سياحي في لندن" },
  { "id": "partner_009", "persona": "معلمة تسأل عن الواجب" },
  { "id": "partner_010", "persona": "زميل في مشروع مدرسي" },
  { "id": "partner_011", "persona": "أم تناقش خطط العشاء" },
  { "id": "partner_012", "persona": "مدرب كرة قدم" },
  { "id": "partner_013", "persona": "مضيفة طيران" },
  { "id": "partner_014", "persona": "مزارع في مزرعته" },
  { "id": "partner_015", "persona": "أمين مكتبة" },
  { "id": "partner_016", "persona": "طفل صغير (للتدريب)" },
  { "id": "partner_017", "persona": "باحث عن كنز" },
  { "id": "partner_018", "persona": "كائن فضائي" },
  { "id": "partner_019", "persona": "شخصية من المستقبل" },
  { "id": "partner_020", "persona": "روبوت لديه مشاعر" }
];

export const WEEKLY_CHALLENGES_DATA: WeeklyChallengeItem[] = [
  { "id": "chall_001", "title_ar": "تحدث عن يومك في 60 ثانية" },
  { "id": "chall_002", "title_ar": "صف صورة مضحكة" },
  { "id": "chall_003", "title_ar": "اقرأ قصة قصيرة بصوت معبر" },
  { "id": "chall_004", "title_ar": "غنِّ أغنيتك المفضلة" },
  { "id": "chall_005", "title_ar": "ashrah wasfat tabkh" }, // translated literally
  { "id": "chall_006", "title_ar": "قدم نشرة الأخبار" },
  { "id": "chall_007", "title_ar": "توقع حالة الطقس" },
  { "id": "chall_008", "title_ar": "قم بدور بائع ومشتري" },
  { "id": "chall_009", "title_ar": "اسأل وأجب عن 5 أسئلة شخصية" },
  { "id": "chall_010", "title_ar": "صف حيواناً دون أن تذكر اسمه" },
  { "id": "chall_011", "title_ar": "احكِ نكتة بالإنجليزية" },
  { "id": "chall_012", "title_ar": "تحدث عن بطلك المفضل" },
  { "id": "chall_013", "title_ar": "اشرح لعبتك الإلكترونية" },
  { "id": "chall_014", "title_ar": "قم بجولة في منزلك وصفها" },
  { "id": "chall_015", "title_ar": "صف ملابسك اليوم" },
  { "id": "chall_016", "title_ar": "تحدث عن حلمك الليلة الماضية" },
  { "id": "chall_017", "title_ar": "امدح شخصاً من العائلة" },
  { "id": "chall_018", "title_ar": "اعتذر عن خطأ ارتكبته" },
  { "id": "chall_019", "title_ar": "شجع أحداً على فعل شيء" },
  { "id": "chall_020", "title_ar": "لخص قصة فيلم شاهدته" }
];

export const ACHIEVEMENT_TREE_DATA: AchievementTreeItem[] = [
  { "id": "ach_001", "title_ar": "مكمل أول درس" },
  { "id": "ach_002", "title_ar": "مكمل 5 دروس" },
  { "id": "ach_003", "title_ar": "مسجل أول تحدث" },
  { "id": "ach_004", "title_ar": "مسجل 10 تحدثيات" },
  { "id": "ach_005", "title_ar": "فائز بتحدي الأسبوع" },
  { "id": "ach_006", "title_ar": "متدرب يومي لمدة أسبوع" },
  { "id": "ach_007", "title_ar": "متدرب لمدة شهر كامل" },
  { "id": "ach_008", "title_ar": "ختم معمل النطق" },
  { "id": "ach_009", "title_ar": "ختم تحديات الحوار" },
  { "id": "ach_010", "title_ar": "قارئ القصص (10 قصص)" },
  { "id": "ach_011", "title_ar": "محترف الأغاني (5 أغاني)" },
  { "id": "ach_012", "title_ar": "طباخ إنجليزي" },
  { "id": "ach_013", "title_ar": "فنان القصص" },
  { "id": "ach_014", "title_ar": "المخترع (أكمل غرفة الهروب)" },
  { "id": "ach_015", "title_ar": "صديق الحيوانات (20 اسم)" },
  { "id": "ach_016", "title_ar": "مسافر العالم (15 دولة)" },
  { "id": "ach_017", "title_ar": "رياضي (10 رياضات)" },
  { "id": "ach_018", "title_ar": "محقق الألغاز" },
  { "id": "ach_019", "title_ar": "متطوع (ساعد شخصاً)" },
  { "id": "ach_020", "title_ar": "بطل الأسرة" }
];

export const ESCAPE_ROOM_PUZZLES_DATA: EscapeRoomPuzzleItem[] = [
  { "id": "puz_001", "title_ar": "فك شيفرة الألوان" },
  { "id": "puz_002", "title_ar": "حل أحجية الكلمات المتقاطعة" },
  { "id": "puz_003", "title_ar": "أعد ترتيب الجملة" },
  { "id": "puz_004", "title_ar": "املأ الفراغات لإكمال النص" },
  { "id": "puz_005", "title_ar": "استمع للكلمة واكتبها" },
  { "id": "puz_006", "title_ar": "اختر الصورة الصحيحة" },
  { "id": "puz_007", "title_ar": "أكمل المتسلسلة المنطقية" },
  { "id": "puz_008", "title_ar": "طابق السؤال بالإجابة" },
  { "id": "puz_009", "title_ar": "صحح الخطأ الإملائي" },
  { "id": "puz_010", "title_ar": "ابحث عن الكلمة المفقودة" },
  { "id": "puz_011", "title_ar": "حل معادلة بسيطة بالإنجليزية" },
  { "id": "puz_012", "title_ar": "ترجم الجملة لتحصل على الدليل" },
  { "id": "puz_013", "title_ar": "تعرف على الصوت" },
  { "id": "puz_014", "title_ar": "صنف الكلمات في مجموعات" },
  { "id": "puz_015", "title_ar": "أجب عن سؤال ثقافة عامة" },
  { "id": "puz_016", "title_ar": "أكمل الأغنية" },
  { "id": "puz_017", "title_ar": "فك تشفير كلمة السر (Anagram)" },
  { "id": "puz_018", "title_ar": "لعبة الـ Hangman" },
  { "id": "puz_019", "title_ar": "اختر المسار الصحيح" },
  { "id": "puz_020", "title_ar": "اللغز النهائي الجامع" }
];

export const WHATSAPP_TEMPLATES_DATA: WhatsappTemplateItem[] = [
  { "id": "wa_001", "title_ar": "رسالة تحفيزية صباحية مع كلمة اليوم" },
  { "id": "wa_002", "title_ar": "خطأ شائع وتصحيحه" },
  { "id": "wa_003", "title_ar": "سؤال: كيف تقول ... بالإنجليزية؟" },
  { "id": "wa_004", "title_ar": "مقطع صوتي قصير لنطق كلمة" },
  { "id": "wa_005", "title_ar": "صورة من القاموس المصور مع كلمة" },
  { "id": "wa_006", "title_ar": "تحدي اليوم (تحدث)" },
  { "id": "wa_007", "title_ar": "اقتباس إنجليزي مشهور" },
  { "id": "wa_008", "title_ar": "نكتة بالإنجليزية" },
  { "id": "wa_009", "title_ar": "لغز كلمات" },
  { "id": "wa_010", "title_ar": "رابط مباشر لدرس اليوم" },
  { "id": "wa_011", "title_ar": "تذكير بمراجعة القواعد" },
  { "id": "wa_012", "title_ar": "سؤال عن تقدم العائلة" },
  { "id": "wa_013", "title_ar": "دعوة للعبة الليلة" },
  { "id": "wa_014", "title_ar": "معلومة ثقافية عن بلد أجنبي" },
  { "id": "wa_015", "title_ar": "أغنية اليوم" },
  { "id": "wa_016", "title_ar": "قصة قصيرة جداً (3 جمل)" },
  { "id": "wa_017", "title_ar": "تمرين استماع" },
  { "id": "wa_018", "title_ar": "فيديو قصير تعليمي" },
  { "id": "wa_019", "title_ar": "رسالة تشجيع للطفل بصوت كرتوني" },
  { "id": "wa_020", "title_ar": "ملخص إنجازات الأسبوع" }
];

export const FAMILY_GAMES_DATA: FamilyGameItem[] = [
  { "id": "game_001", "title_ar": "بينجو الكلمات" },
  { "id": "game_002", "title_ar": "من سيربح المليون (قواعد ومفردات)" },
  { "id": "game_003", "title_ar": "الحزازير (20 لغز What am I?)" },
  { "id": "game_004", "title_ar": "لعبة الـ Taboo" },
  { "id": "game_005", "title_ar": "تطابق الصورة مع الكلمة" },
  { "id": "game_006", "title_ar": "لعبة الذاكرة (Memory Cards)" },
  { "id": "game_007", "title_ar": "سنيك آند لادرز (أسئلة)" },
  { "id": "game_008", "title_ar": "الدومينو (كلمة ومعناها)" },
  { "id": "game_009", "title_ar": "كلمات متقاطعة" },
  { "id": "game_010", "title_ar": "البحث عن الكنز (قائمة)" },
  { "id": "game_011", "title_ar": "تصنيف الكلمات (أسرع وقت)" },
  { "id": "game_012", "title_ar": "لعبة الـ Charades (تمثيل)" },
  { "id": "game_013", "title_ar": "Pictionary (رسم الكلمة)" },
  { "id": "game_014", "title_ar": "20 سؤالاً (تخمين الشخصية)" },
  { "id": "game_015", "title_ar": "ترتيب الجمل (Scrambled Sentences)" },
  { "id": "game_016", "title_ar": "لعبة الأضداد" },
  { "id": "game_017", "title_ar": "لعبة المرادفات" },
  { "id": "game_018", "title_ar": "لعبة أكمل القصة" },
  { "id": "game_019", "title_ar": "لعبة صح أم خطأ" },
  { "id": "game_020", "title_ar": "نرد المحادثة" }
];

export const STORY_ART_PROMPTS_DATA: StoryArtPromptItem[] = [
  { "id": "art_001", "title_ar": "ارسم نور تصل إلى المطار" },
  { "id": "art_002", "title_ar": "ارسم حيوانك المفضل من الحديقة" },
  { "id": "art_003", "title_ar": "ارسم طبق الفطور الإنجليزي" },
  { "id": "art_004", "title_ar": "ارسم قلعة رملية على الشاطئ" },
  { "id": "art_005", "title_ar": "ارسم قوس قزح واكتب ألوانه" },
  { "id": "art_006", "title_ar": "ارسم الروبوت الذي صنعته" },
  { "id": "art_007", "title_ar": "ارسم زياً تنكرياً للهالوين" },
  { "id": "art_008", "title_ar": "ارسم خريطة الكنز" },
  { "id": "art_009", "title_ar": "ارسم الحصان الذي ركبته" },
  { "id": "art_010", "title_ar": "ارسم كعكة عيد الميلاد" },
  { "id": "art_011", "title_ar": "ارسم السماء ليلاً والنجوم" },
  { "id": "art_012", "title_ar": "ارسم مزرعة الخضروات" },
  { "id": "art_013", "title_ar": "ارسم سيارة الإطفاء" },
  { "id": "art_014", "title_ar": "ارسم عائلة الفيلة في السفاري" },
  { "id": "art_015", "title_ar": "ارسم السمكة الذهبية" },
  { "id": "art_016", "title_ar": "ارسم الطائرة الورقية عالياً" },
  { "id": "art_017", "title_ar": "ارسم جدتك أو جدك" },
  { "id": "art_018", "title_ar": "ارسم نفسك وأنت تسبح" },
  { "id": "art_019", "title_ar": "ارسم مكتبة مليئة بالكتب" },
  { "id": "art_020", "title_ar": "ارسم فستاناً أو قميصاً صممته" }
];

export const COOKING_CHALLENGES_DATA: CookingChallengeItem[] = [
  { "id": "cook_001", "title_en": "Peanut Butter & Jam Sandwich" },
  { "id": "cook_002", "title_en": "Scrambled Eggs on Toast" },
  { "id": "cook_003", "title_en": "Fruit Salad" },
  { "id": "cook_004", "title_en": "Smoothie Bowl" },
  { "id": "cook_005", "title_en": "Cheese Omelette" },
  { "id": "cook_006", "title_en": "Pancakes" },
  { "id": "cook_007", "title_en": "English Breakfast (Mini)" },
  { "id": "cook_008", "title_en": "Tuna Sandwich" },
  { "id": "cook_009", "title_en": "Pasta with Tomato Sauce" },
  { "id": "cook_010", "title_en": "Chicken Nuggets" },
  { "id": "cook_011", "title_en": "Cucumber and Yogurt Salad" },
  { "id": "cook_012", "title_en": "Banana Milkshake" },
  { "id": "cook_013", "title_en": "Baked Potato with Cheese" },
  { "id": "cook_014", "title_en": "Rice Pudding" },
  { "id": "cook_015", "title_en": "Chocolate Chip Cookies" },
  { "id": "cook_016", "title_en": "Mini Pizzas" },
  { "id": "cook_017", "title_en": "Corn on the Cob" },
  { "id": "cook_018", "title_en": "Veggie Sticks with Dip" },
  { "id": "cook_019", "title_en": "Frozen Yogurt Bites" },
  { "id": "cook_020", "title_en": "Cucumber Sandwiches" }
];
