
import { CurriculumCategory, proficiencyLevel } from "../types";

export interface CurriculumUnit {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

export const MASTER_CURRICULUM: Record<CurriculumCategory, Record<proficiencyLevel, CurriculumUnit[]>> = {
  [CurriculumCategory.READING]: {
    [proficiencyLevel.A1]: [
      { id: 'r_a1_1', title: 'Phonemic Awareness Foundations', titleAr: 'أسس الوعي الصوتي', description: 'Decoding 44 English phonemes with visual symbols.', descriptionAr: 'فك رموز 44 وحدة صوتية إنجليزية برموز مرئية.' },
      { id: 'r_a1_2', title: 'Academic Sight Words (Set 1)', titleAr: 'الكلمات البصرية الأكاديمية (1)', description: 'Mastering the first 100 high-frequency words.', descriptionAr: 'إتقان أول 100 كلمة من الكلمات الأكثر تكراراً.' },
      { id: 'r_a1_3', title: 'Environmental Print & Signs', titleAr: 'النصوص البيئية واللوحات', description: 'Reading names of common objects in the home.', descriptionAr: 'قراءة أسماء الأشياء الشائعة في المنزل.' },
      { id: 'r_a1_4', title: 'Family Constellations', titleAr: 'تشكيلات العائلة', description: 'Understanding kinship terms and simple relationships.', descriptionAr: 'فهم مصطلحات القرابة والعلاقات البسيطة.' },
      { id: 'r_a1_5', title: 'Daily Interaction Scripts', titleAr: 'نصوص التفاعل اليومية', description: 'Basic greetings and social etiquette in text.', descriptionAr: 'التحيات الأساسية وآداب التواصل الاجتماعي كتابةً.' },
    ],
    [proficiencyLevel.A2]: [
      { id: 'r_a2_1', title: 'Basic Sentence Architecture', titleAr: 'بنية الجملة الأساسية', description: 'Subject-Verb-Object patterns in simple narratives.', descriptionAr: 'أنماط المبتدأ والخبر والمفعول به في القصص البسيطة.' },
      { id: 'r_a2_2', title: 'Functional Workplace Literacy', titleAr: 'الثقافة الوظيفية في بيئة العمل', description: 'Reading memos, role titles, and emails.', descriptionAr: 'قراءة المذكرات والمسميات الوظيفية ورسائل البريد.' },
      { id: 'r_a2_3', title: 'Interrogative Text Patterns', titleAr: 'أنماط النصوص الاستفهامية', description: 'Analyzing Who, What, Where, and When structures.', descriptionAr: 'تحليل تراكيب من، وماذا، وأين، ومتى.' },
      { id: 'r_a2_4', title: 'Commerce & Transactions', titleAr: 'التجارة والمعاملات', description: 'Reading price tags, receipts, and product specs.', descriptionAr: 'قراءة بطاقات الأسعار والإيصالات ومواصفات المنتج.' },
      { id: 'r_a2_5', title: 'Narrative Sequences', titleAr: 'التسلسلات السردية', description: 'Following chronological order in short stories.', descriptionAr: 'متابعة الترتيب الزمني في القصص القصيرة.' },
    ],
    [proficiencyLevel.B1]: [
      { id: 'r_b1_1', title: 'Subtextual Inference', titleAr: 'الاستنتاج الضمني', description: 'Reading between the lines of professional texts.', descriptionAr: 'القراءة ما بين السطور في النصوص المهنية.' },
      { id: 'r_b1_2', title: 'Fact vs. Subjective Opinion', titleAr: 'الحقيقة مقابل الرأي الذاتي', description: 'Distinguishing data from perspective in reviews.', descriptionAr: 'التمييز بين البيانات والوجهات النظر في التقييمات.' },
      { id: 'r_b1_3', title: 'Authorial Intent & Purpose', titleAr: 'نية الكاتب والغرض منه', description: 'Analyzing why a text was written (Persuade/Inform).', descriptionAr: 'تحليل سبب كتابة النص (الإقناع/الإخبار).' },
      { id: 'r_b1_4', title: 'Cultural Heritage Narratives', titleAr: 'سرديات التراث الثقافي', description: 'Reading about global traditions and social norms.', descriptionAr: 'القراءة عن التقاليد العالمية والأعراف الاجتماعية.' },
      { id: 'r_b1_5', title: 'Media & Journalism Decoding', titleAr: 'فك رموز الإعلام والصحافة', description: 'Extracting key facts from current event articles.', descriptionAr: 'استخراج الحقائق الأساسية من مقالات الأحداث الجارية.' },
    ],
    [proficiencyLevel.B2]: [
      { id: 'r_b2_1', title: 'Rhetorical Text Structures', titleAr: 'بنى النصوص البلاغية', description: 'Identifying Cause/Effect and Compare/Contrast.', descriptionAr: 'تحديد السبب والأثر والمقارنة والتباين.' },
      { id: 'r_b2_2', title: 'Informational Report Audits', titleAr: 'تدقيق التقارير المعلوماتية', description: 'Extracting statistical data from formal reports.', descriptionAr: 'استخراج البيانات الإحصائية من التقارير الرسمية.' },
      { id: 'r_b2_3', title: 'Critical Perspective Evaluation', titleAr: 'تقييم المنظور النقدي', description: 'Evaluating multiple viewpoints on a single issue.', descriptionAr: 'تقييم وجهات نظر متعددة حول قضية واحدة.' },
      { id: 'r_b2_4', title: 'Environmental Discourse', titleAr: 'الخطاب البيئي', description: 'Analyzing scientific updates for global sustainability.', descriptionAr: 'تحليل التحديثات العلمية للاستدامة العالمية.' },
      { id: 'r_b2_5', title: 'Persuasion Techniques', titleAr: 'تقنيات الإقناع', description: 'Recognizing bias and emotive language.', descriptionAr: 'التعرف على التحيز واللغة العاطفية.' },
    ],
    [proficiencyLevel.C1]: [
      { id: 'r_c1_1', title: 'Nuance and Tone', titleAr: 'الفروق الدقيقة واللهجة', description: 'Detecting subtle emotional shifts in text.', descriptionAr: 'اكتشاف التحولات العاطفية الدقيقة في النص.' },
      { id: 'r_c1_2', title: 'Academic Synthesis', titleAr: 'التركيب الأكاديمي', description: 'Drawing conclusions from multiple scholarly sources.', descriptionAr: 'استخلاص النتائج من مصادر علمية متعددة.' },
      { id: 'r_c1_3', title: 'Complex Rhetorical Analysis', titleAr: 'التحليل البلاغي المعقد', description: 'Studying persuasion techniques in literature.', descriptionAr: 'دراسة تقنيات الإقناع في الأدب.' },
      { id: 'r_c1_4', title: 'Formal Legal English', titleAr: 'الإنجليزية القانونية الرسمية', description: 'Decoding complex contractual language.', descriptionAr: 'فك رموز اللغة التعاقدية المعقدة.' },
      { id: 'r_c1_5', title: 'Literary Criticism', titleAr: 'النقد الأدبي', description: 'Interpreting themes in classic literature.', descriptionAr: 'تفسير الموضوعات في الأدب الكلاسيكي.' },
    ],
    [proficiencyLevel.C2]: [
      { id: 'r_c2_1', title: 'Metaphysical Logic Reading', titleAr: 'قراءة المنطق الميتافيزيقي', description: 'Navigating highly abstract philosophical logic.', descriptionAr: 'التعامل مع المنطق الفلسفي شديد التجريد.' },
      { id: 'r_c2_2', title: 'Archaic Language Archives', titleAr: 'أرشيف اللغة القديمة', description: 'Engaging with Middle and Early Modern English.', descriptionAr: 'التعامل مع الإنجليزية الوسطى والحديثة المبكرة.' },
      { id: 'r_c2_3', title: 'Syntactic Mastery Audit', titleAr: 'تدقيق الإتقان النحوي', description: 'Decoding multi-layered complex syntactic patterns.', descriptionAr: 'فك رموز الأنماط النحوية المعقدة متعددة الطبقات.' },
      { id: 'r_c2_4', title: 'Strategic Sovereign Logic', titleAr: 'المنطق الاستراتيجي السيادي', description: 'Reading high-level Geopolitical & Economic audits.', descriptionAr: 'قراءة عمليات التدقيق الجيوسياسي والاقتصادي رفيعة المستوى.' },
      { id: 'r_c2_5', title: 'Abstract Symbolism Synthesis', titleAr: 'تركيب الرمزية التجريدية', description: 'Interpreting non-standard obscure poetic forms.', descriptionAr: 'تفسير الأشكال الشعرية الغامضة غير القياسية.' },
    ],
  },
  [CurriculumCategory.WRITING]: {
    [proficiencyLevel.A1]: [
      { id: 'w_a1_1', title: 'Letter Formation', titleAr: 'تكوين الحروف', description: 'Handwriting and typing basics', descriptionAr: 'أساسيات الكتابة اليدوية والرقمنة' },
      { id: 'w_a1_2', title: 'Sentence Construction', titleAr: 'بناء الجملة', description: 'Moving from words to full thoughts', descriptionAr: 'الانتقال من الكلمات إلى الأفكار الكاملة' },
      { id: 'w_a1_3', title: 'Basic Punctuation', titleAr: 'علامات الترقيم الأساسية', description: 'Commas, periods, and question marks', descriptionAr: 'الفاصلة والنقطة وعلامة الاستفهام' },
    ],
    [proficiencyLevel.A2]: [
      { id: 'w_a2_1', title: 'Descriptive Adjectives', titleAr: 'الصفات الوصفية', description: 'Using sensory words to describe objects', descriptionAr: 'استخدام الكلمات الحسية لوصف الأشياء' },
      { id: 'w_a2_2', title: 'Short Narrative Writing', titleAr: 'كتابة القصص القصيرة', description: 'Writing a beginning, middle, and end', descriptionAr: 'كتابة بداية ووسط ونهاية' },
      { id: 'w_a2_3', title: 'Daily Journaling', titleAr: 'التدوين اليومي', description: 'Expressing personal routines', descriptionAr: 'التعبير عن الروتين الشخصي' },
    ],
    [proficiencyLevel.B1]: [
      { id: 'w_b1_1', title: 'Paragraph Unity', titleAr: 'وحدة الفقرة', description: 'Focusing on single main ideas', descriptionAr: 'التركيز على فكرة رئيسية واحدة' },
      { id: 'w_b1_2', title: 'Persuasive Essays', titleAr: 'المقالات الإقناعية', description: 'Building arguments with evidence', descriptionAr: 'بناء الحجج بالأدلة' },
      { id: 'w_b1_3', title: 'Transition Words', titleAr: 'كلمات الربط', description: 'Improving flow and connectivity', descriptionAr: 'تحسين تدفق الأفكار والترابط' },
    ],
    [proficiencyLevel.B2]: [
      { id: 'w_b2_1', title: 'Creative Voice', titleAr: 'الصوت الإبداعي', description: 'Developing a unique writing style', descriptionAr: 'تطوير أسلوب كتابة فريد' },
      { id: 'w_b2_2', title: 'Summary Writing', titleAr: 'كتابة الملخصات', description: 'Condensing information effectively', descriptionAr: 'تكثيف المعلومات بفعالية' },
      { id: 'w_b2_3', title: 'Reviewing and Editing', titleAr: 'المراجعة والتحرير', description: 'Refining logic and vocabulary', descriptionAr: 'تحسين المنطق والمفردات' },
    ],
    [proficiencyLevel.C1]: [
      { id: 'w_c1_1', title: 'Academic Thesis Building', titleAr: 'بناء الأطروحة الأكاديمية', description: 'Crafting defensible intellectual claims', descriptionAr: 'صياغة ادعاءات فكرية قابلة للدفاع' },
      { id: 'w_c1_2', title: 'Complex Argumentation', titleAr: 'المحاججة المعقدة', description: 'Countering opposing viewpoints', descriptionAr: 'الرد على وجهات النظر المعارضة' },
      { id: 'w_c1_3', title: 'Professional Reporting', titleAr: 'التقارير المهنية', description: 'Writing business and technical audits', descriptionAr: 'كتابة التقارير التجارية والفنية' },
    ],
    [proficiencyLevel.C2]: [
      { id: 'w_c2_1', title: 'Style and Tone Synthesis', titleAr: 'دمج الأسلوب واللهجة', description: 'Adapting writing for specific audiences', descriptionAr: 'تكييف الكتابة لجمهور محدد' },
      { id: 'w_c2_2', title: 'Literature Analysis', titleAr: 'التحليل الأدبي', description: 'Writing deeply about themes and motifs', descriptionAr: 'الكتابة بعمق عن الموضوعات والرموز' },
      { id: 'w_c2_3', title: 'Advanced Research Papers', titleAr: 'أوراق البحث المتقدمة', description: 'Mastery of citations and formal logic', descriptionAr: 'إتقان الاستشهادات والمنطق الرسمي' },
    ],
  },
  [CurriculumCategory.CONVERSATION]: {
    [proficiencyLevel.A1]: [
      { id: 's_a1_1', title: 'Basic Greetings', titleAr: 'التحيات الأساسية', description: 'Introductions and daily interaction', descriptionAr: 'التعارف والتفاعل اليومي' },
      { id: 's_a1_2', title: 'Pronunciation Core', titleAr: 'أساسيات النطق', description: 'Vowel and consonant clarity', descriptionAr: 'وضوح الحروف الساكنة والمتحركة' },
      { id: 's_a1_3', title: 'Expressing Needs', titleAr: 'التعبير عن الاحتياجات', description: 'Asking for help and directions', descriptionAr: 'طلب المساعدة والاتجاهات' },
    ],
    [proficiencyLevel.A2]: [
      { id: 's_a2_1', title: 'Daily Routine Talk', titleAr: 'الحديث عن الروتين اليومي', description: 'Describing time and activities', descriptionAr: 'وصف الوقت والأنشطة' },
      { id: 's_a2_2', title: 'Simple Social Interaction', titleAr: 'التفاعل الاجتماعي البسيط', description: 'Talking about likes and dislikes', descriptionAr: 'الحديث عن ما تحب وما تكره' },
      { id: 's_a2_3', title: 'Roleplay Basics', titleAr: 'أساسيات لعب الأدوار', description: 'Practicing real-life scenarios', descriptionAr: 'ممارسة سيناريوهات من الحياة الواقعية' },
    ],
    [proficiencyLevel.B1]: [
      { id: 's_b1_1', title: 'Conversation Flow', titleAr: 'تدفق المحادثة', description: 'Keeping dialogue natural and steady', descriptionAr: 'الحفاظ على الحوار طبيعياً ومستقراً' },
      { id: 's_b1_2', title: 'Opinion Sharing', titleAr: 'تبادل الآراء', description: 'Debating common social topics', descriptionAr: 'مناقشة الموضوعات الاجتماعية الشائعة' },
      { id: 's_b1_3', title: 'Public Speaking Intro', titleAr: 'مقدمة في الخطابة', description: 'Presenting short organized ideas', descriptionAr: 'تقديم أفكار منظمة قصيرة' },
    ],
    [proficiencyLevel.B2]: [
      { id: 's_b2_1', title: 'Active Listening Skills', titleAr: 'مهارات الاستماع النشط', description: 'Responding accurately to spoken context', descriptionAr: 'الاستجابة بدقة للسياق المنطوق' },
      { id: 's_b2_2', title: 'Storytelling Aloud', titleAr: 'رواية القصص شفهياً', description: 'Using intonation and pacing', descriptionAr: 'استخدام نبرة الصوت والسرعة' },
      { id: 's_b2_3', title: 'Interview Preparation', titleAr: 'التحضير للمقابلات', description: 'Mock academic/job interview practice', descriptionAr: 'ممارسة المقابلات الأكاديمية والمهنية' },
    ],
    [proficiencyLevel.C1]: [
      { id: 's_c1_1', title: 'Advanced Debate', titleAr: 'المناظرة المتقدمة', description: 'Logical fallacies and rebuttal', descriptionAr: 'المغالطات المنطقية والرد عليها' },
      { id: 's_c1_2', title: 'Diplomatic Language', titleAr: 'اللغة الدبلوماسية', description: 'Negotiating and conflict resolution', descriptionAr: 'التفاوض وحل النزاعات' },
      { id: 's_c1_3', title: 'Nuance in Intonation', titleAr: 'الدقة في نبرة الصوت', description: 'Conveying subtle irony or emphasis', descriptionAr: 'إيصال السخرية أو التأكيد الدقيق' },
    ],
    [proficiencyLevel.C2]: [
      { id: 's_c2_1', title: 'Academic Presentations', titleAr: 'العروض التقديمية الأكاديمية', description: 'Sharing complex research orally', descriptionAr: 'مشاركة الأبحاث المعقدة شفهياً' },
      { id: 's_c2_2', title: 'Impromptu Speaking', titleAr: 'التحدث المرتجل', description: 'Thinking on your feet in English/Arabic', descriptionAr: 'سرعة البديهة في التحدث' },
      { id: 's_c2_3', title: 'Public Advocacy', titleAr: 'الدعوة العامة/الخطابة', description: 'Inspiring and moving large audiences', descriptionAr: 'إلهام وتحفيز الجماهير الكبيرة' },
    ],
  },
  [CurriculumCategory.GRAMMAR]: {
    [proficiencyLevel.A1]: [
      { id: 'g_a1_1', title: 'Parts of Speech Intro', titleAr: 'مقدمة في أقسام الكلام', description: 'Nouns, Verbs, Adjectives', descriptionAr: 'الأسماء، الأفعال، الصفات' },
      { id: 'g_a1_2', title: 'Present Simple Tense', titleAr: 'الزمن المضارع البسيط', description: 'Habits and general truths', descriptionAr: 'العادات والحقائق العامة' },
      { id: 'g_a1_3', title: 'Singular and Plural', titleAr: 'المفرد والجمع', description: 'Rules for counting objects', descriptionAr: 'قواعد عد الأشياء' },
      { id: 'g_a1_4', title: 'Articles (A, An, The)', titleAr: 'أدوات التعريف والتنكير', description: 'When and how to use articles', descriptionAr: 'متى وكيفية استخدام أدوات التعريف' },
      { id: 'g_a1_5', title: 'Basic Word Order', titleAr: 'الترتيب الأساسي للكلمات', description: 'Subject-Verb-Object basics', descriptionAr: 'أساسيات المبتدأ والخبر والمفعول به' },
    ],
    [proficiencyLevel.A2]: [
      { id: 'g_a2_1', title: 'Pronouns & Possession', titleAr: 'الضمائر والملكية', description: 'Who owns what', descriptionAr: 'من يملك ماذا' },
      { id: 'g_a2_2', title: 'Prepositions of Place', titleAr: 'حروف الجر المكانية', description: 'In, On, Under, Between', descriptionAr: 'في، على، تحت، بين' },
      { id: 'g_a2_3', title: 'Past Simple Basics', titleAr: 'أساسيات الماضي البسيط', description: 'Talking about yesterday', descriptionAr: 'الحديث عن الأمس' },
      { id: 'g_a2_4', title: 'Adjectives & Adverbs', titleAr: 'الصفات والظروف', description: 'Adding detail to nouns and verbs', descriptionAr: 'إضافة التفاصيل للأسماء والأفعال' },
      { id: 'g_a2_5', title: 'Present Continuous', titleAr: 'المضارع المستمر', description: 'Actions happening right now', descriptionAr: 'الأفعال التي تحدث في اللحظة الراهنة' },
    ],
    [proficiencyLevel.B1]: [
      { id: 'g_b1_1', title: 'Perfect Tenses', titleAr: 'الأزمنة التامة', description: 'Past, Present, and Future Perfect', descriptionAr: 'الماضي والحاضر والمستقبل التام' },
      { id: 'g_b1_2', title: 'Relative Clauses', titleAr: 'جمل الوصل', description: 'Who, Which, That in sentences', descriptionAr: 'من، الذي، التي في الجمل' },
      { id: 'g_b1_3', title: 'Passive Voice', titleAr: 'المبني للمجهول', description: 'Focusing on the action, not actor', descriptionAr: 'التركيز على الفعل لا الفاعل' },
    ],
    [proficiencyLevel.B2]: [
      { id: 'g_b2_1', title: 'Conditionals (Zero, 1, 2)', titleAr: 'الجمل الشرطية', description: 'If clauses and possibilities', descriptionAr: 'جمل الشرط والاحتمالات' },
      { id: 'g_b2_2', title: 'Reported Speech', titleAr: 'الكلام المنقول', description: 'Saying what others said', descriptionAr: 'نقل أقوال الآخرين' },
      { id: 'g_b2_3', title: 'Modals of Deduction', titleAr: 'أفعال الاستنتاج', description: 'Must, Might, Can\'t be', descriptionAr: 'أفعال الترجيح والاستنتاج' },
    ],
    [proficiencyLevel.C1]: [
      { id: 'g_c1_1', title: 'Mixed Conditionals', titleAr: 'الشرط المختلط', description: 'Hypothetical past and present', descriptionAr: 'الافتراضات الماضية والحاضرة' },
      { id: 'g_c1_2', title: 'Subjunctive Mood', titleAr: 'صيغة التمني/الالتزام', description: 'Formal recommendations and wishes', descriptionAr: 'التوصيات الرسمية والتمنيات' },
      { id: 'g_c1_3', title: 'Inversion for Emphasis', titleAr: 'قلب الجملة للتأكيد', description: 'Never have I seen... structure', descriptionAr: 'استخدام أسلوب التقديم والتأخير' },
    ],
    [proficiencyLevel.C2]: [
      { id: 'g_c2_1', title: 'Cleft Sentences', titleAr: 'الجمل المشقوقة', description: 'It was the logic that saved... patterns', descriptionAr: 'تركيز الجملة باستخدام تراكيب خاصة' },
      { id: 'g_c2_2', title: 'Complex Passive Patterns', titleAr: 'أنماط المبني للمجهول المعقدة', description: 'Being told, supposed to, etc.', descriptionAr: 'تراكيب مجهول متقدمة' },
      { id: 'g_c2_3', title: 'Grammatical Fine-Tuning', titleAr: 'الضبط النحوي الدقيق', description: 'Mastery of stylistic grammar', descriptionAr: 'إتقان النحو من منظور أسلوبي' },
    ],
  },
  [CurriculumCategory.EXPRESSION]: {
    [proficiencyLevel.A1]: [
      { id: 'e_a1_1', title: 'Basic Emotions', titleAr: 'المشاعر الأساسية', description: 'Expressing happy, sad, angry', descriptionAr: 'التعبير عن السعادة والحزن والغضب' },
      { id: 'e_a1_2', title: 'Personal Introductions', titleAr: 'التعريف الشخصي', description: 'Talking about family and home', descriptionAr: 'الحديث عن العائلة والمنزل' },
      { id: 'e_a1_3', title: 'Colors & Shapes', titleAr: 'الألوان والأشكال', description: 'Describing the world simply', descriptionAr: 'وصف العالم ببساطة' },
    ],
    [proficiencyLevel.A2]: [
      { id: 'e_a2_1', title: 'Hobbies & Interests', titleAr: 'الهوايات والاهتمامات', description: 'Talking about what you do for fun', descriptionAr: 'الحديث عما تفعله للمتعة' },
      { id: 'e_a2_2', title: 'Giving Directions', titleAr: 'إعطاء التوجيهات', description: 'Helping others find their way', descriptionAr: 'مساعدة الآخرين في العثور على طريقهم' },
      { id: 'e_a2_3', title: 'Describing People', titleAr: 'وصف الأشخاص', description: 'Talking about appearance and traits', descriptionAr: 'الحديث عن المظهر والسمات' },
    ],
    [proficiencyLevel.B1]: [
      { id: 'e_b1_1', title: 'Storytelling Basics', titleAr: 'أساسيات رواية القصص', description: 'Creating simple narrative arcs', descriptionAr: 'إنشاء مسارات سردية بسيطة' },
      { id: 'e_b1_2', title: 'Cultural Expressions', titleAr: 'التعبيرات الثقافية', description: 'Learning idioms and metaphors', descriptionAr: 'تعلم الاصطلاحات والاستعارات' },
      { id: 'e_b1_3', title: 'Future Plans', titleAr: 'خطط المستقبل', description: 'Discussing ambitions and dreams', descriptionAr: 'مناقشة الطموحات والأحلام' },
    ],
    [proficiencyLevel.B2]: [
      { id: 'e_b2_1', title: 'Abstract Discussion', titleAr: 'النقاش المجرد', description: 'Talking about freedom, justice, etc.', descriptionAr: 'الحديث عن الحرية والعدالة وغيرها' },
      { id: 'e_b2_2', title: 'Expressing Hypotheticals', titleAr: 'التعبير عن الافتراضات', description: 'Using "What if" scenarios', descriptionAr: 'استخدام سيناريوهات "ماذا لو"' },
      { id: 'e_b2_3', title: 'Nuanced Comparison', titleAr: 'المقارنة الدقيقة', description: 'Evaluating better/worse with nuance', descriptionAr: 'تقييم الأفضل والأسوأ بدقة' },
    ],
    [proficiencyLevel.C1]: [
      { id: 'e_c1_1', title: 'Philosophical Debate', titleAr: 'النقاش الفلسفي', description: 'Engaging with ethics and logic', descriptionAr: 'التعامل مع الأخلاق والمنطق' },
      { id: 'e_c1_2', title: 'Artistic Interpretation', titleAr: 'التفسير الفني', description: 'Expressing ideas about art/design', descriptionAr: 'التعبير عن أفكار حول الفن والتصميم' },
      { id: 'e_c1_3', title: 'Complex Emotional IQ', titleAr: 'الذكاء العاطفي المعقد', description: 'Navigating deep interpersonal topics', descriptionAr: 'التعامل مع موضوعات شخصية عميقة' },
    ],
    [proficiencyLevel.C2]: [
      { id: 'e_c2_1', title: 'Strategic Sovereignty', titleAr: 'السيادة الاستراتيجية', description: 'Expressing leadership and vision', descriptionAr: 'التعبير عن القيادة والرؤية' },
      { id: 'e_c2_2', title: 'Global Societal Audits', titleAr: 'التدقيق المجتمعي العالمي', description: 'Critiquing macro-economic issues', descriptionAr: 'نقد القضايا الاقتصادية الكلية' },
      { id: 'e_c2_3', title: 'Mastery of Expression', titleAr: 'إتقان التعبير', description: 'Synthesizing all forms of output', descriptionAr: 'دمج كافة أشكال التعبير' },
    ],
  },
};
