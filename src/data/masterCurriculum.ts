
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
      { id: 'w_a1_1', title: 'Alphabet & Letter Formation', titleAr: 'تكوين الحروف', description: 'Mastery of English script and basic penmanship.', descriptionAr: 'إتقان الخط الإنجليزي والأساسيات.' },
      { id: 'w_a1_2', title: 'My First Sentences', titleAr: 'جميلي الأولى', description: 'Creating simple Subject-Verb sentences.', descriptionAr: 'إنشاء جمل بسيطة (مبتدأ وخبر).' },
      { id: 'w_a1_3', title: 'Basic Punctuation', titleAr: 'علامات الترقيم الأساسية', description: 'Using periods, commas, and question marks.', descriptionAr: 'استخدام النقطة والفاصلة وعلامة الاستفهام.' },
      { id: 'w_a1_4', title: 'Personal Information', titleAr: 'المعلومات الشخصية', description: 'Filling out forms and basic personal profiles.', descriptionAr: 'تعبئة النماذج والبيانات الشخصية الأساسية.' },
      { id: 'w_a1_5', title: 'Simple Lists & Notes', titleAr: 'القوائم والملاحظات', description: 'Writing shopping lists and short reminders.', descriptionAr: 'كتابة قوائم التسوق والملاحظات القصيرة.' },
    ],
    [proficiencyLevel.A2]: [
      { id: 'w_a2_1', title: 'Connective Writing', titleAr: 'الكتابة المترابطة', description: 'Using "and", "but", and "or" for flow.', descriptionAr: 'استخدام أدوات الربط (و، ولكن، أو).' },
      { id: 'w_a2_2', title: 'Describing My Day', titleAr: 'وصف يومي', description: 'Narrative writing about daily routines.', descriptionAr: 'الكتابة السردية عن الروتين اليومي.' },
      { id: 'w_a2_3', title: 'Social Media Posts', titleAr: 'منشورات التواصل الاجتماعي', description: 'Crafting short, engaging online updates.', descriptionAr: 'صياغة تحديثات قصيرة وجذابة عبر الإنترنت.' },
      { id: 'w_a2_4', title: 'Short Emails', titleAr: 'رسائل بريد إلكتروني قصيرة', description: 'Basic email structure and informal greetings.', descriptionAr: 'هيكل البريد الإلكتروني الأساسي والتحيات الودية.' },
      { id: 'w_a2_5', title: 'Describing Places', titleAr: 'وصف الأماكن', description: 'Writing about home and neighborhood.', descriptionAr: 'الكتابة عن المنزل والحي.' },
    ],
    [proficiencyLevel.B1]: [
      { id: 'w_b1_1', title: 'Paragraph Structure', titleAr: 'هيكل الفقرة', description: 'Topic sentences and supporting details.', descriptionAr: 'الجمل المفتاحية والتفاصيل الداعمة.' },
      { id: 'w_b1_2', title: 'Storytelling Basics', titleAr: 'أساسيات رواية القصص', description: 'Chronological order and narrative voice.', descriptionAr: 'الترتيب الزمني والصوت السردي.' },
      { id: 'w_b1_3', title: 'Persuasive Essentials', titleAr: 'أساسيات الإقناع', description: 'Writing short opinion pieces with reasons.', descriptionAr: 'كتابة مقالات رأي قصيرة مع الأسباب.' },
      { id: 'w_b1_4', title: 'Formal Emails', titleAr: 'رسائل بريد إلكتروني رسمية', description: 'Business inquiries and job applications.', descriptionAr: 'الاستفسارات التجارية وطلبات العمل.' },
      { id: 'w_b1_5', title: 'Comparing & Contrasting', titleAr: 'المقارنة والتباين', description: 'Writing about similarities and differences.', descriptionAr: 'الكتابة عن أوجه التشابه والاختلاف.' },
    ],
    [proficiencyLevel.B2]: [
      { id: 'w_b2_1', title: 'Essay Foundations', titleAr: 'أسس المقالة', description: 'Introduction, Body, and Conclusion arcs.', descriptionAr: 'مسارات المقدمة والعرض والخاتمة.' },
      { id: 'w_b2_2', title: 'Summarizing & Paraphrasing', titleAr: 'التلخيص وإعادة الصياغة', description: 'Condensing complex information accurately.', descriptionAr: 'تكثيف المعلومات المعقدة بدقة.' },
      { id: 'w_b2_3', title: 'Rhetorical Transitions', titleAr: 'الروابط البلاغية', description: 'Sophisticated words like "consequently" and "moreover".', descriptionAr: 'كلمات متطورة مثل (بالتالي، علاوة على ذلك).' },
      { id: 'w_b2_4', title: 'Creative Narrative', titleAr: 'السرد الإبداعي', description: 'Developing plot and character in writing.', descriptionAr: 'تطوير الحبكة والشخصية في الكتابة.' },
      { id: 'w_b2_5', title: 'Review Writing', titleAr: 'كتابة المراجعات', description: 'Critiquing films, books, or products.', descriptionAr: 'نقد الأفلام أو الكتب أو المنتجات.' },
    ],
    [proficiencyLevel.C1]: [
      { id: 'w_c1_1', title: 'Academic Thesis Design', titleAr: 'بناء الأطروحة الأكاديمية', description: 'Formulating defensible academic claims.', descriptionAr: 'صياغة ادعاءات متميزة قابلة للدفاع.' },
      { id: 'w_c1_2', title: 'Nuance & Style', titleAr: 'الدقة والأسلوب', description: 'Matching writing style to specific audiences.', descriptionAr: 'ملاءمة أسلوب الكتابة لجمهور محدد.' },
      { id: 'w_c1_3', title: 'Professional Proposals', titleAr: 'المقترحات المهنية', description: 'Writing persuasive business pitches.', descriptionAr: 'كتابة العروض الترويجية المقنعة للأعمال.' },
      { id: 'w_c1_4', title: 'Critical Analysis', titleAr: 'التحليل النقدي', description: 'Deconstructing texts and identifying bias.', descriptionAr: 'تفكيك النصوص وتحديد التحيز.' },
      { id: 'w_c1_5', title: 'Abstract Concepts', titleAr: 'المفاهيم المجردة', description: 'Writing logically about philosophy and ethics.', descriptionAr: 'الكتابة المنطقية عن الفلسفة والأخلاق.' },
    ],
    [proficiencyLevel.C2]: [
      { id: 'w_c2_1', title: 'Advanced Stylistic Mastery', titleAr: 'إتقان الأسلوب المتقدم', description: 'Using archaic and highly technical registers.', descriptionAr: 'استخدام التعبيرات المتخصصة والتقنية العالية.' },
      { id: 'w_c2_2', title: 'Sovereign Research Logic', titleAr: 'منطق البحث السيادي', description: 'Writing complex audits and white papers.', descriptionAr: 'كتابة عمليات التدقيق المعقدة والأوراق البيضاء.' },
      { id: 'w_c2_3', title: 'Linguistic Playfulness', titleAr: 'اللعب اللغوي', description: 'Using irony, metaphor, and subtext effectively.', descriptionAr: 'استخدام السخرية والاستعارة والنص الضمني بفعالية.' },
      { id: 'w_c2_4', title: 'Philosophical Discourse', titleAr: 'الخطاب الفلسفي', description: 'Constructing high-level dialectical arguments.', descriptionAr: 'بناء الحجج الجدلية عالية المستوى.' },
      { id: 'w_c2_5', title: 'Total Syntactic Precision', titleAr: 'الدقة النحوية المطلقة', description: 'Near-native elegance in complex structures.', descriptionAr: 'أناقة قريبة من المواطن الأصلي في الهياكل المعقدة.' },
    ],
  },
  [CurriculumCategory.CONVERSATION]: {
    [proficiencyLevel.A1]: [
      { id: 'c_a1_1', title: 'Greetings & Introductions', titleAr: 'التحيات والتعريف بالنفس', description: 'Mastering the basics of meeting new people.', descriptionAr: 'إتقان أساسيات لقاء أشخاص جدد.' },
      { id: 'c_a1_2', title: 'My Family & Home', titleAr: 'عائلتي ومنزلي', description: 'Describing family members and living spaces.', descriptionAr: 'وصف أفراد العائلة ومساحات المعيشة.' },
      { id: 'c_a1_3', title: 'Ordering Food', titleAr: 'طلب الطعام', description: 'Essential phrases for cafes and restaurants.', descriptionAr: 'عبارات أساسية للمقاهي والمطاعم.' },
      { id: 'c_a1_4', title: 'Shopping Essentials', titleAr: 'أساسيات التسوق', description: 'Asking for prices, sizes, and colors.', descriptionAr: 'السؤال عن الأسعار والمقاسات والألوان.' },
      { id: 'c_a1_5', title: 'Daily Routines', titleAr: 'الروتين اليومي', description: 'Talking about time and daily habits.', descriptionAr: 'الحديث عن الوقت والعادات اليومية.' },
    ],
    [proficiencyLevel.A2]: [
      { id: 'c_a2_1', title: 'Making Plans', titleAr: 'وضع الخطط', description: 'Invitations and social engagements.', descriptionAr: 'الدعوات والارتباطات الاجتماعية.' },
      { id: 'c_a2_2', title: 'Describing People', titleAr: 'وصف الأشخاص', description: 'Appearance and personality traits.', descriptionAr: 'المظهر والسمات الشخصية.' },
      { id: 'c_a2_3', title: 'Travel & Transport', titleAr: 'السفر والنقل', description: 'Navigating airports and city directions.', descriptionAr: 'التنقل في المطارات واتجاهات المدينة.' },
      { id: 'c_a2_4', title: 'Health & Fitness', titleAr: 'الصحة واللياقة', description: 'Talking about symptoms and lifestyle choices.', descriptionAr: 'الحديث عن الأعراض وخيارات نمط الحياة.' },
      { id: 'c_a2_5', title: 'Hobbies & Interests', titleAr: 'الهوايات والاهتمامات', description: 'Expressing passions and free-time activities.', descriptionAr: 'التعبير عن الشغف وأنشطة وقت الفراغ.' },
    ],
    [proficiencyLevel.B1]: [
      { id: 'c_b1_1', title: 'Giving Advice', titleAr: 'تقديم النصيحة', description: 'Professional and personal suggestions.', descriptionAr: 'اقتراحات مهنية وشخصية.' },
      { id: 'c_b1_2', title: 'Expressing Opinions', titleAr: 'التعبير عن الآراء', description: 'Agreeing and disagreeing respectfully.', descriptionAr: 'الموافقة والاختلاف باحترام.' },
      { id: 'c_b1_3', title: 'Job Interviews', titleAr: 'مقابلات العمل', description: 'Mastering the basic interview questions.', descriptionAr: 'إتقان أسئلة المقابلة الأساسية.' },
      { id: 'c_b1_4', title: 'Traveling Experiences', titleAr: 'تجارب السفر', description: 'Storytelling and narrating past events.', descriptionAr: 'رواية القصص وسرد الأحداث الماضية.' },
      { id: 'c_b1_5', title: 'Dreams & Ambitions', titleAr: 'الأحلام والطموحات', description: 'Discussing long-term goals and future plans.', descriptionAr: 'مناقشة الأهداف طويلة المدى وخطط المستقبل.' },
    ],
    [proficiencyLevel.B2]: [
      { id: 'c_b2_1', title: 'Debating Hot Topics', titleAr: 'مناقشة القضايا الساخنة', description: 'Constructing arguments and counter-arguments.', descriptionAr: 'بناء الحجج والحجج المضادة.' },
      { id: 'c_b2_2', title: 'Dealing with Problems', titleAr: 'التعامل مع المشاكل', description: 'Complaints and professional negotiation.', descriptionAr: 'الشكاوى والتفاوض المهني.' },
      { id: 'c_b2_3', title: 'Business Meetings', titleAr: 'اجتماعات العمل', description: 'Etiquette and professional meeting language.', descriptionAr: 'آداب العمل ولغة الاجتماعات المهنية.' },
      { id: 'c_b2_4', title: 'Media & News', titleAr: 'الإعلام والأخبار', description: 'Critical thinking in a digital news world.', descriptionAr: 'التفكير النقدي في عالم الأخبار الرقمي.' },
      { id: 'c_b2_5', title: 'Cultural Differences', titleAr: 'الاختلافات الثقافية', description: 'Navigating nuances in global communication.', descriptionAr: 'التعامل مع الفروق في التواصل العالمي.' },
    ],
    [proficiencyLevel.C1]: [
      { id: 'c_c1_1', title: 'Nuanced Discussions', titleAr: 'المناقشات الدقيقة', description: 'Mastering subtle shades of meaning.', descriptionAr: 'إتقان ظلال المعنى الدقيقة.' },
      { id: 'c_c1_2', title: 'Persuasive Speaking', titleAr: 'الخطابة المقنعة', description: 'Using rhetoric for high-impact communication.', descriptionAr: 'استخدام البلاغة للتواصل عالي التأثير.' },
      { id: 'c_c1_3', title: 'Professional Presentations', titleAr: 'العروض التقديمية المهنية', description: 'Leading and presenting complex data.', descriptionAr: 'قيادة وعرض البيانات المعقدة.' },
      { id: 'c_c1_4', title: 'Strategic Problem Solving', titleAr: 'حل المشكلات الاستراتيجي', description: 'Critical thinking and group consensus.', descriptionAr: 'التفكير النقدي وإجماع المجموعة.' },
      { id: 'c_c1_5', title: 'Abstract Concepts', titleAr: 'المفاهيم المجردة', description: 'Engaging with ethics and philosophy.', descriptionAr: 'التعامل مع الأخلاق والفلسفة.' },
    ],
    [proficiencyLevel.C2]: [
      { id: 'c_c2_1', title: 'Idiomatic Precision', titleAr: 'الدقة الاصطلاحية', description: 'Mastering near-native social dynamics.', descriptionAr: 'إتقان الديناميكيات الاجتماعية القريبة من المواطن الأصلي.' },
      { id: 'c_c2_2', title: 'Strategic Irony & Humour', titleAr: 'السخرية والفكاهة الاستراتيجية', description: 'Navigating wit and cultural nuances.', descriptionAr: 'التعامل مع الذكاء والفروق الثقافية.' },
      { id: 'c_c2_3', title: 'High-Level Negotiation', titleAr: 'التفاوض عالي المستوى', description: 'Diplomacy and strategic concessions.', descriptionAr: 'الدبلوماسية والتنازلات الاستراتيجية.' },
      { id: 'c_c2_4', title: 'Philosophical Inquiry', titleAr: 'الاستقصاء الفلسفي', description: 'Discussing the human condition.', descriptionAr: 'مناقشة الحالة الإنسانية.' },
      { id: 'c_c2_5', title: 'Linguistic Flexibility', titleAr: 'المرونة اللغوية', description: 'Mastering shift in register and tone.', descriptionAr: 'إتقان التحول في مستوى اللغة ونبرة الصوت.' },
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
      { id: 'g_a2_1', title: 'Past Simple Basics', titleAr: 'أساسيات الماضي البسيط', description: 'Talking about completed events in the past.', descriptionAr: 'الحديث عن أحداث مكتملة في الماضي.' },
      { id: 'g_a2_2', title: 'Future with Will/Going to', titleAr: 'المستقبل مع Will و Going to', description: 'Expressing intentions and predictions.', descriptionAr: 'التعبير عن النوايا والتوقعات.' },
      { id: 'g_a2_3', title: 'Comparatives & Superlatives', titleAr: 'صيغ المقارنة والتفضيل', description: 'Comparing people, places, and objects.', descriptionAr: 'مقارنة الأشخاص والأماكن والأشياء.' },
      { id: 'g_a2_4', title: 'Present Continuous', titleAr: 'المضارع المستمر', description: 'Actions happening right now.', descriptionAr: 'الأفعال التي تحدث الآن.' },
      { id: 'g_a2_5', title: 'Modals of Ability & Permission', titleAr: 'أفعال القدرة والاستئذان', description: 'Using Can, Could, and May.', descriptionAr: 'استخدام Can و Could و May.' },
    ],
    [proficiencyLevel.B1]: [
      { id: 'g_b1_1', title: 'Present Perfect Tense', titleAr: 'زمن المضارع التام', description: 'Connecting past actions with the present.', descriptionAr: 'ربط أحداث الماضي بالحاضر.' },
      { id: 'g_b1_2', title: 'Relative Clauses', titleAr: 'جمل الوصل', description: 'Adding detail with Who, Which, and That.', descriptionAr: 'إضافة تفاصيل باستخدام Who و Which و That.' },
      { id: 'g_b1_3', title: 'Passive Voice (Basic)', titleAr: 'المبني للمجهول (أساسي)', description: 'Focusing on the action and the object.', descriptionAr: 'التركيز على الفعل والمفعول به.' },
      { id: 'g_b1_4', title: 'First & Second Conditionals', titleAr: 'الجمل الشرطية (1 و 2)', description: 'Talking about real and hypothetical situations.', descriptionAr: 'الحديث عن مواقف حقيقية وافتراضية.' },
      { id: 'g_b1_5', title: 'Modals of Obligation', titleAr: 'أفعال الإلزام', description: 'Using Must, Have to, and Should.', descriptionAr: 'استخدام Must و Have to و Should.' },
    ],
    [proficiencyLevel.B2]: [
      { id: 'g_b2_1', title: 'Narrative Tenses', titleAr: 'أزمنة السرد', description: 'Using Past Continuous, Perfect, and Simple together.', descriptionAr: 'استخدام الماضي المستمر، التام، والبسيط معاً.' },
      { id: 'g_b2_2', title: 'Advanced Conditionals', titleAr: 'الجمل الشرطية المتقدمة', description: 'Third and Mixed conditionals.', descriptionAr: 'الجمل الشرطية الثالثة والمختلطة.' },
      { id: 'g_b2_3', title: 'Reported Speech', titleAr: 'الكلام المنقول', description: 'Reporting statements and questions.', descriptionAr: 'نقل الجمل والأسئلة.' },
      { id: 'g_b2_4', title: 'Advanced Passive', titleAr: 'المبني للمجهول المتقدم', description: 'Passive with reporting verbs and modals.', descriptionAr: 'المبني للمجهول مع أفعال القول والأفعال المساعدة.' },
      { id: 'g_b2_5', title: 'Future Continuous & Perfect', titleAr: 'المستقبل المستمر والتام', description: 'Expressing future states and finished actions.', descriptionAr: 'التعبير عن حالات مستقبلية وأفعال منتهية.' },
    ],
    [proficiencyLevel.C1]: [
      { id: 'g_c1_1', title: 'Inversion (Adverbials)', titleAr: 'القلب (الظروف)', description: 'Using negative adverbials for emphasis.', descriptionAr: 'استخدام الظروف النافية للتأكيد.' },
      { id: 'g_c1_2', title: 'Cleft Sentences', titleAr: 'الجمل المشقوقة', description: 'Focusing information using "It" and "What".', descriptionAr: 'تركيز المعلومات باستخدام It و What.' },
      { id: 'g_c1_3', title: 'Advanced Gerunds & Infinitives', titleAr: 'المصادر وأفعال المصدر المتقدمة', description: 'Nuanced usage after specific verbs.', descriptionAr: 'الاستخدام الدقيق بعد أفعال محددة.' },
      { id: 'g_c1_4', title: 'Participle Clauses', titleAr: 'جمل اسم الفاعل والمفعول', description: 'Reducing sentences for sophisticated style.', descriptionAr: 'اختزال الجمل لأسلوب راقٍ.' },
      { id: 'g_c1_5', title: 'The Subjunctive & Formal Usage', titleAr: 'صيغة التمني والاستخدام الرسمي', description: 'Formal recommendations and stylistic structures.', descriptionAr: 'التوصيات الرسمية والهياكل الأسلوبية.' },
    ],
    [proficiencyLevel.C2]: [
      { id: 'g_c2_1', title: 'Stylistic Inversion & Fronting', titleAr: 'القلب والتقديم الأسلوبي', description: 'Mastering advanced syntactic emphasis.', descriptionAr: 'إتقان التأكيد النحوي المتقدم.' },
      { id: 'g_c2_2', title: 'Complex Conditionals', titleAr: 'الجمل الشرطية المعقدة', description: 'Inverted conditionals and subtle possibilities.', descriptionAr: 'الشرط المقلوب والاحتمالات الدقيقة.' },
      { id: 'g_c2_3', title: 'Advanced Modal Nuances', titleAr: 'الفروق الدقيقة للأفعال الناقصة', description: 'Perfect modals and speculative deduction.', descriptionAr: 'الأفعال الناقصة التامة والاستنتاج التأملي.' },
      { id: 'g_c2_4', title: 'Nominalization & Academic Syntax', titleAr: 'التحويل الاسمي والبنية الأكاديمية', description: 'Converting verbs to nouns for formal style.', descriptionAr: 'تحويل الأفعال لأسماء لأسلوب رسمي.' },
      { id: 'g_c2_5', title: 'Linguistic Precision', titleAr: 'الدقة اللغوية وتحول النبرة', description: 'Mastering register shifts and absolute clarity.', descriptionAr: 'إتقان تحولات مستوى اللغة والوضوح المطلق.' },
    ],
  },
  [CurriculumCategory.EXPRESSION]: {
    [proficiencyLevel.A1]: [
      { id: 'e_a1_1', title: 'Basic Emotions', titleAr: 'المشاعر الأساسية', description: 'Expressing happy, sad, and angry feelings.', descriptionAr: 'التعبير عن السعادة والحزن والغضب.' },
      { id: 'e_a1_2', title: 'Family & Friends', titleAr: 'العائلة والأصدقاء', description: 'Talking about people close to you.', descriptionAr: 'الحديث عن الأشخاص المقربين منك.' },
      { id: 'e_a1_3', title: 'Colors & Simple Art', titleAr: 'الألوان والفن البسيط', description: 'Describing the visual world.', descriptionAr: 'وصف العالم المرئي.' },
      { id: 'e_a1_4', title: 'My Daily Routine', titleAr: 'روتيني اليومي', description: 'Sharing your typical day.', descriptionAr: 'مشاركة يومك المعتاد.' },
      { id: 'e_a1_5', title: 'Likes & Dislikes', titleAr: 'الإعجاب وعدم الإعجاب', description: 'Expressing logical preferences.', descriptionAr: 'التعبير عن التفضيلات المنطقية.' },
    ],
    [proficiencyLevel.A2]: [
      { id: 'e_a2_1', title: 'Hobbies & Interests', titleAr: 'الهوايات والاهتمامات', description: 'Talking about what you do for fun.', descriptionAr: 'الحديث عما تفعله للمتعة.' },
      { id: 'e_a2_2', title: 'Basic Storytelling', titleAr: 'أساسيات السرد', description: 'Narrating simple past events.', descriptionAr: 'سرد أحداث بسيطة من الماضي.' },
      { id: 'e_a2_3', title: 'Giving Directions', titleAr: 'إعطاء التوجيهات', description: 'Helping others find their way.', descriptionAr: 'مساعدة الآخرين في العثور على طريقهم.' },
      { id: 'e_a2_4', title: 'Describing People', titleAr: 'وصف الأشخاص', description: 'Appearance and personality traits.', descriptionAr: 'المظهر والسمات الشخصية.' },
      { id: 'e_a2_5', title: 'Future Intentions', titleAr: 'النوايا المستقبلية', description: 'Discussing plans and goals.', descriptionAr: 'مناقشة الخطط والأهداف.' },
    ],
    [proficiencyLevel.B1]: [
      { id: 'e_b1_1', title: 'Cultural Experiences', titleAr: 'التجارب الثقافية', description: 'Sharing traditions and celebrations.', descriptionAr: 'مشاركة التقاليد والاحتفالات.' },
      { id: 'e_b1_2', title: 'Expressing Opinions', titleAr: 'التعبير عن الآراء', description: 'Agreeing and disagreeing logically.', descriptionAr: 'الموافقة والاختلاف بشكل منطقي.' },
      { id: 'e_b1_3', title: 'Future Ambitions', titleAr: 'الطموحات المستقبلية', description: 'Discussing career and personal dreams.', descriptionAr: 'مناقشة الأحلام المهنية والشخصية.' },
      { id: 'e_b1_4', title: 'Providing Advice', titleAr: 'تقديم النصيحة', description: 'Helping others with suggestions.', descriptionAr: 'مساعدة الآخرين بالاقتراحات.' },
      { id: 'e_b1_5', title: 'Logic & Reasoning', titleAr: 'المنطق والاستنتاج', description: 'Explaining simple cause and effect.', descriptionAr: 'شرح السبب والنتيجة البسيطة.' },
    ],
    [proficiencyLevel.B2]: [
      { id: 'e_b2_1', title: 'Abstract Debate', titleAr: 'النقاش المجرد', description: 'Talking about freedom and justice.', descriptionAr: 'الحديث عن الحرية والعدالة.' },
      { id: 'e_b2_2', title: 'Hypothetical Scenarios', titleAr: 'السيناريوهات الافتراضية', description: 'Using "What if" questions.', descriptionAr: 'استخدام أسئلة "ماذا لو".' },
      { id: 'e_b2_3', title: 'Social Issues', titleAr: 'القضايا الاجتماعية', description: 'Evaluating contemporary societal challenges.', descriptionAr: 'تقييم التحديات المجتمعية المعاصرة.' },
      { id: 'e_b2_4', title: 'Media Interpretation', titleAr: 'التفسير الإعلامي', description: 'Analyzing news and media bias.', descriptionAr: 'تحليل الأخبار والتحيز الإعلامي.' },
      { id: 'e_b2_5', title: 'Environmental Advocacy', titleAr: 'الدعوة البيئية', description: 'Expressing views on global sustainability.', descriptionAr: 'التعبير عن وجهات النظر حول الاستدامة العالمية.' },
    ],
    [proficiencyLevel.C1]: [
      { id: 'e_c1_1', title: 'Philosophical Ethics', titleAr: 'الأخلاق الفلسفية', description: 'Engaging with morality and logic.', descriptionAr: 'التعامل مع الأخلاق والمنطق.' },
      { id: 'e_c1_2', title: 'Aesthetic Criticism', titleAr: 'النقد الجمالي', description: 'Expressing ideas about art and design.', descriptionAr: 'التعبير عن أفكار حول الفن والتصميم.' },
      { id: 'e_c1_3', title: 'Diplomatic Expression', titleAr: 'التعبير الدبلوماسي', description: 'Navigating professional conflict resolution.', descriptionAr: 'التعامل مع حل النزاعات المهنية.' },
      { id: 'e_c1_4', title: 'Strategic Thinking', titleAr: 'التفكير الاستراتيجي', description: 'Mastering high-level planning dialogue.', descriptionAr: 'إتقان حوار التخطيط رفيع المستوى.' },
      { id: 'e_c1_5', title: 'Complex Advocacy', titleAr: 'المرافعة المعقدة', description: 'Persuading on systemic social changes.', descriptionAr: 'الإقناع بالتغييرات الاجتماعية الجهازية.' },
    ],
    [proficiencyLevel.C2]: [
      { id: 'e_c2_1', title: 'Strategic Sovereignty', titleAr: 'السيادة الاستراتيجية', description: 'Expressing leadership and grand vision.', descriptionAr: 'التعبير عن القيادة والرؤية الكبرى.' },
      { id: 'e_c2_2', title: 'Macro-Economic Audits', titleAr: 'التدقيق الاقتصادي الكلي', description: 'Critiquing global financial systems.', descriptionAr: 'نقد الأنظمة المالية العالمية.' },
      { id: 'e_c2_3', title: 'Existential Inquiry', titleAr: 'الاستقصاء الوجودي', description: 'Analyzing the human condition.', descriptionAr: 'تحليل الحالة الإنسانية.' },
      { id: 'e_c2_4', title: 'Linguistic Fluidity', titleAr: 'السيولة اللغوية', description: 'Mastering subtle shifts in register.', descriptionAr: 'إتقان التحولات الدقيقة في مستوى اللغة.' },
      { id: 'e_c2_5', title: 'Total Aesthetic Synthesis', titleAr: 'التركيب الجمالي المطلق', description: 'Synthesizing all forms of output.', descriptionAr: 'دمج كافة أشكال التعبير.' },
    ],
  },
};
