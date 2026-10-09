import { SaraCurriculumLesson, SaraPillarId } from '../data/saraCurriculum/types';

export interface MethodStep {
  stepNumber: number;
  titleAr: string;
  titleEn: string;
  actionAr: string;
  actionEn: string;
  whyAr: string;
  whyEn: string;
  exampleSnippet: string;
  icon: string;
}

export interface PracticalBreakdown {
  breakdownTitleAr: string;
  breakdownTitleEn: string;
  overviewAr: string;
  overviewEn: string;
  steps: MethodStep[];
  goldenRuleAr: string;
  goldenRuleEn: string;
  liveModel: {
    contextAr: string;
    contextEn: string;
    annotatedModel: string;
    modelExplanationAr: string;
  };
}

/**
 * Returns a comprehensive, teacher-led pedagogical breakdown for any Sara exclusive lesson.
 * This transforms the lesson from passive flashcards into an active, step-by-step masterclass.
 */
export function getLessonPedagogicalBreakdown(lesson: SaraCurriculumLesson): PracticalBreakdown {
  const pId: SaraPillarId = lesson.pillarId;
  const mainEx = lesson.practicalExamples[0]?.en || 'Key sentence pattern';
  const secondEx = lesson.practicalExamples[1]?.en || lesson.practicalExamples[0]?.en || 'Supporting pattern';
  const formula = lesson.keyPattern.formula;
  const mistake = lesson.commonMistakes[0];

  // =========================================================================
  // 1. WRITING TRACK (الكتابة التعبيرية الحوارية والمهنية)
  // =========================================================================
  if (pId === 'writing') {
    const isEmail = lesson.titleEn.toLowerCase().includes('email') || lesson.titleAr.includes('إيميل') || lesson.id === 'scw_403';
    const isChat = lesson.titleEn.toLowerCase().includes('chat') || lesson.titleEn.toLowerCase().includes('slack') || lesson.titleAr.includes('شات') || lesson.titleAr.includes('واتساب');
    const isBio = lesson.titleEn.toLowerCase().includes('bio') || lesson.titleAr.includes('نبذة');
    const isReport = lesson.titleEn.toLowerCase().includes('report') || lesson.titleEn.toLowerCase().includes('status') || lesson.titleAr.includes('تقرير');
    const isProposal = lesson.titleEn.toLowerCase().includes('proposal') || lesson.titleAr.includes('مقترح');

    if (isEmail) {
      return {
        breakdownTitleAr: 'خارطة طريق كتابة إيميل مهني ذكي وحاسم (The 5-Step Executive Email)',
        breakdownTitleEn: '5-Step Blueprint: Writing Emails That Get Instant Action',
        overviewAr: 'الإيميل المهني الحقيقي لا يُكتب عشوائياً كالمحادثة العادية؛ مدراء الشركات والعملاء يقرؤون الإيميل في أقل من 20 ثانية. إن لم تكن رسالتك مبنية على هيكل تنفيذي واضح فلن يقرأها أحد.',
        overviewEn: 'Executive emails are scanned in under 20 seconds. Without a structured 5-part architecture, your message gets buried or ignored.',
        steps: [
          {
            stepNumber: 1,
            titleAr: 'الخطوة 1: سطر الموضوع المباشر (Subject Line)',
            titleEn: 'Step 1: The Urgent, Clear Subject Line',
            actionAr: 'اكتب موضوعاً يبدأ بالتصنيف والمشروع مباشرة وتجنب العناوين الغامضة مثل "Hello" أو "Question".',
            actionEn: 'Tag the project and specific outcome. Never write vague subjects like "Hello" or "Quick question".',
            whyAr: 'المتلقي يقرر فتح الإيميل أو تجاهله بناءً على أول 4 كلمات في العنوان.',
            whyEn: 'Recipients decide whether to open or archive within milliseconds of scanning the subject.',
            exampleSnippet: '[Action Required] Q3 Project Review - Deadline Friday 3 PM',
            icon: '🏷️'
          },
          {
            stepNumber: 2,
            titleAr: 'الخطوة 2: التحية الاحترافية الموجهة (Salutation)',
            titleEn: 'Step 2: Calibrated Salutation',
            actionAr: 'اختر التحية المناسبة: "Hi Sarah," لزملاء العمل، أو "Dear Dr. Adams," في المراسلات الرسمية الأولى.',
            actionEn: 'Match relationship level: "Hi [Name]," for team peers; "Dear [Title] [Last Name]," for formal initial outreach.',
            whyAr: 'تحدد نبرة الخطاب بين الودية والمهنية الصارمة.',
            whyEn: 'Sets the psychological tone and respect boundary immediately.',
            exampleSnippet: 'Hi Sarah, / Dear Mr. Davis,',
            icon: '👋'
          },
          {
            stepNumber: 3,
            titleAr: 'الخطوة 3: سبب المراسلة في الجملة الأولى (The Direct Hook & Context)',
            titleEn: 'Step 3: State Purpose in Sentence One',
            actionAr: 'ابدأ مباشرة بالسبب: "Following up on our meeting..." أو "I am writing to share..." دون مقدمات شخصية طويلة.',
            actionEn: 'Hook immediately with the context. State why you are writing before anything else.',
            whyAr: 'احترام وقت المتلقي يُظهر نضجاً مهنياً عالياً ويمنعه من التشتت.',
            whyEn: 'Busy professionals respect writers who reach the core reason without throat-clearing pleasantries.',
            exampleSnippet: 'Following up on our discussion yesterday regarding the client launch timeline:',
            icon: '🎯'
          },
          {
            stepNumber: 4,
            titleAr: 'الخطوة 4: صلب الطلب بنقاط واضحة (The Core Ask / Action Items)',
            titleEn: 'Step 4: Scannable Bullets & Explicit Request',
            actionAr: 'ضع المطلوب في نقاط موجزة (Bullet points) مسبوقة بفعل أمر أو سؤال محدد للغاية.',
            actionEn: 'Package core data or requests into 2-3 bold bullet points so the eye scans effortlessly.',
            whyAr: 'الفقرات النصية الطويلة تُقرأ بصعوبة؛ النقاط تجعل اتخاذ القرار فورياً.',
            whyEn: 'Walls of text trigger procrastination; bullet points trigger decisions.',
            exampleSnippet: '• Need your sign-off on Section 3.\n• Confirm budget approval for the vendor.',
            icon: '📋'
          },
          {
            stepNumber: 5,
            titleAr: 'الخطوة 5: الخاتمة والدعوة للإجراء وموعد الرد (Closing & Deadline)',
            titleEn: 'Step 5: Soft Deadline & Professional Sign-Off',
            actionAr: 'حدد موعداً مهذباً للرد: "Looking forward to your thoughts by Thursday 2 PM" ثم التوقيع المهني.',
            actionEn: 'Attach a polite timeframe: "Could you send notes by Thursday afternoon?" plus your professional sign-off.',
            whyAr: 'الطلبات بدون موعد محدد يتم تأجيلها دائماً إلى ما لا نهاية.',
            whyEn: 'An ask without a timeline is an ask that gets indefinitely postponed.',
            exampleSnippet: 'Best regards,\n[Your Name] | Lead Engineer',
            icon: '🚀'
          }
        ],
        goldenRuleAr: 'قاعدة الـ 100 كلمة: إذا تجاوز إيميلك 100 كلمة فقسّمه إلى نقاط، وضع الإجراء المطلوب بخط واضح.',
        goldenRuleEn: 'The 100-Word Rule: Keep routine business emails under 100 words with explicit bold asks.',
        liveModel: {
          contextAr: 'نموذج إيميل عمل كامل متكامل مطبق خطوة بخطوة:',
          contextEn: 'Complete Executive Email Applied Step-by-Step:',
          annotatedModel: `Subject: [Review] Mobile App Onboarding Flow - Feedback by Thursday\n\nHi Alex,\n\nFollowing up on our design sprint yesterday: attached is the finalized Figma prototype for the onboarding flow.\n\nCould you please:\n1. Confirm if the payment screen matches compliance guidelines.\n2. Give the green light to initiate backend integration.\n\nLooking forward to your notes by Thursday 4 PM so we stay on track for the sprint.\n\nBest regards,\nOmar | Product Lead`,
          modelExplanationAr: 'لاحظ كيف بدأ الإيميل بموضوع دقيق ⬅️ تحية محددة ⬅️ سبب فوري ⬅️ نقطتان واضحتان للطلب ⬅️ موعد نهائي مهذب للرد.'
        }
      };
    }

    if (isChat) {
      return {
        breakdownTitleAr: 'دليل المحادثات الفورية في فرق العمل (Slack & WhatsApp Business Protocol)',
        breakdownTitleEn: 'Fast Team Chat Protocol: The One-Message Discipline',
        overviewAr: 'في تطبيقات الدردشة المهنية مثل Slack وTeams وWhatsApp، يرتكب 80% من الموظفين خطأ إرسال "مرحباً" والانتظار. المعيار العالمي هو دمج التحية والسياق والطلب في فقرة واحدة متكاملة.',
        overviewEn: 'Never send a lonely "Hi" and leave colleagues hanging. Modern remote etiquette demands combining greeting, context, and the specific ask in a single packet.',
        steps: [
          {
            stepNumber: 1,
            titleAr: 'الخطوة 1: كسر عادة الـ "Hi" المنفردة (The One-Message Packet)',
            titleEn: 'Step 1: The Consolidated One-Message Rule',
            actionAr: 'اكتب: التحية + اسم الزميل + السؤال مباشرة في نفس الرسالة دون ضغط Enter مبكراً.',
            actionEn: 'Package: Friendly Greeting + Teammate Name + Exact Question into a single message bubble.',
            whyAr: 'إرسال "مرحباً" بمفردها يسبب قلقاً ومضيعة لوقت الزميل الذي ينتظر معرفة سبب تواصلك.',
            whyEn: 'A lone "Hi" causes notification fatigue and forces the receiver to pause work just to ask "what?".',
            exampleSnippet: 'Hey Sam! Quick check on the demo slides: where is the final link stored?',
            icon: '💬'
          },
          {
            stepNumber: 2,
            titleAr: 'الخطوة 2: تحديد درجة الاستعجال بوضوح (Urgency Tagging)',
            titleEn: 'Step 2: Signal Urgency Accurately',
            actionAr: 'استخدم إشارات واضحة: [Non-urgent] للأسئلة العادية، أو [Quick ask] للردود السريعة.',
            actionEn: 'Tag whether it needs immediate attention or can wait for deep work to finish.',
            whyAr: 'يحمي تركيز زملائك ويجعلهم يقدرون حرصك على وقتهم.',
            whyEn: 'Protects team focus and demonstrates respect for deep-work hours.',
            exampleSnippet: '[No rush] Whenever you have 2 mins today, could you peek at this copy?',
            icon: '⚡'
          },
          {
            stepNumber: 3,
            titleAr: 'الخطوة 3: الرد في الخيط المخصص (Thread Discipline)',
            titleEn: 'Step 3: Reply in Thread Only',
            actionAr: 'لا تنشر الرد في القناة الرئيسية العامة؛ اضغط Reply in Thread للمحافظة على نظافة القناة.',
            actionEn: 'Keep discussions inside the thread so public channels remain quiet and search-friendly.',
            whyAr: 'يمنع تشتيت مئات الموظفين في القناة العامة بنقاشات فرعية.',
            whyEn: 'Prevents noise pollution across public channels with dozens of participants.',
            exampleSnippet: 'Leaving my review comments in this thread below. 👇',
            icon: '🧵'
          },
          {
            stepNumber: 4,
            titleAr: 'الخطوة 4: استخدام ردود الأفعال السريعة (Emoji Acknowledgments)',
            titleEn: 'Step 4: Acknowledge with Action Reactions',
            actionAr: 'استخدم 👍 للموافقة، 👀 جاري الاطلاع، ✅ تم الإنجاز، بدلاً من كتابة رسائل نصية قصيرة.',
            actionEn: 'Use reactions (👍 ack, 👀 reviewing, ✅ done) to eliminate redundant "ok thanks" messages.',
            whyAr: 'يقلل الإشعارات المزعجة ويؤكد استلامك للعمل في لمح البصر.',
            whyEn: 'Reduces notification spam while giving instantaneous visual certainty.',
            exampleSnippet: '👀 (I am looking at this now) ➡️ ✅ (Task completed)',
            icon: '👍'
          }
        ],
        goldenRuleAr: 'لا تضغط إرسال حتى تحتوي رسالتك على السياق الكامل والرابط المطلوب للمراجعة.',
        goldenRuleEn: 'Always provide context and reference links inside the initial ping.',
        liveModel: {
          contextAr: 'سيناريو طلب مساعدة في سلاك مطبق باحترافية:',
          contextEn: 'Full Slack Communication Scenario Applied:',
          annotatedModel: `Hey Maya! Quick question regarding the client report: do we use Q2 or Q3 metrics for slide 5? Here is the deck: [link]. No rush, whenever you're out of your meeting. Thanks! 🙌`,
          modelExplanationAr: 'تحية ودية + اسم الزميلة + السؤال المحدد + الرابط المطلوب + طمأنتها بأنه غير مستعجل. رسالة نموذجية لا تضيع ثانية واحدة!'
        }
      };
    }

    if (isBio) {
      return {
        breakdownTitleAr: 'صناعة النبذة المهنية التعريفية المؤثرة (The 3-Sentence High-Impact Bio)',
        breakdownTitleEn: 'Crafting the 3-Sentence Professional Bio Blueprint',
        overviewAr: 'نبذتك في لينكد إن أو المؤتمرات ليست سيرة ذاتية مفصلة؛ إنها بطاقة جذب سريعة تلخص هويتك، إنجازك الأبرز، ورسالتك الإنسانية.',
        overviewEn: 'A bio is an elevator pitch in text. It must crystallize who you are, what problems you conquer, and your guiding passion in 3 lines.',
        steps: [
          {
            stepNumber: 1,
            titleAr: 'الخطوة 1: الهوية والمجال والمستفيد (Who You Are & Audience)',
            titleEn: 'Step 1: Identity & Target Value',
            actionAr: 'ابدأ بمجالك وما تقدمه للعالم: "I am a [Role] helping [Audience] achieve [Value]."',
            actionEn: 'Define your craft and target audience without cliché titles like "ninja" or "guru".',
            whyAr: 'يمنح القارئ فهماً فورياً لسبب متابعتك أو التواصل معك.',
            whyEn: 'Gives readers instant clarity on why they should care about your profile.',
            exampleSnippet: 'I am a software engineer dedicated to building scalable AI learning products.',
            icon: '👤'
          },
          {
            stepNumber: 2,
            titleAr: 'الخطوة 2: الإنجاز الملموس والأرقام (The Proof & Impact)',
            titleEn: 'Step 2: Tangible Results & Track Record',
            actionAr: 'اذكر رقماً أو نتيجة ملموسة: عدد المستخدمين، أو نسبة النمو، أو خبرتك العملية.',
            actionEn: 'Anchor your credibility with numbers, milestones, or recognizable project impact.',
            whyAr: 'الأرقام تقنع العقل وتبني المصداقية فوراً بعيداً عن المبالغات الفارغة.',
            whyEn: 'Metrics replace empty adjectives with irrefutable proof.',
            exampleSnippet: 'Over the past 5 years, I have architected platforms serving over 100,000 active students.',
            icon: '📈'
          },
          {
            stepNumber: 3,
            titleAr: 'الخطوة 3: الرسالة والشغف الإنساني (The Mission & Soul)',
            titleEn: 'Step 3: Human Touch & Core Mission',
            actionAr: 'اختم بما يحركك داخلياً: "Passionate about democratizing education through technology."',
            actionEn: 'Conclude with your driving purpose or human spark that makes people want to connect.',
            whyAr: 'الناس يتواصلون مع البشر ورسائلهم، وليس فقط مع الألقاب الوظيفية الجافة.',
            whyEn: 'People connect with purpose, humanity, and genuine curiosity.',
            exampleSnippet: 'Passionate about bridging languages and empowering curious minds worldwide.',
            icon: '🌟'
          }
        ],
        goldenRuleAr: 'ابتعد تماماً عن الكلمات المبتذلة: "Hardworking / Ninja / Guru" ودع النتائج تتحدث عنك.',
        goldenRuleEn: 'Banish buzzwords: replace fluff with specific skills and measurable outcomes.',
        liveModel: {
          contextAr: 'النبذة المكتملة الجاهزة للعرض:',
          contextEn: 'Full 3-Sentence Bio Model:',
          annotatedModel: `I am an educational technologist specializing in bilingual interactive learning systems. Over the last 6 years, I’ve designed software empowering more than 50,000 learners across the Middle East. Passionate about AI-assisted fluency and lifelong human growth.`,
          modelExplanationAr: 'سطر 1: الهوية والمجال ⬅️ سطر 2: الإنجاز والأرقام ⬅️ سطر 3: الشغف الإنساني والرسالة.'
        }
      };
    }

    // Default Writing Breakdown
    return {
      breakdownTitleAr: `منهجية الكتابة العملية والتطبيقية: ${lesson.titleAr}`,
      breakdownTitleEn: `Structured Writing Method: ${lesson.titleEn}`,
      overviewAr: `الكتابة باللغة الإنجليزية في هذا الدرس (${lesson.titleAr}) تحتاج لتفكيك منظم: كيف تصيغ الفكرة، كيف تربط الجمل بسلاسة، وكيف تتجنب الأخطاء التي تضعف مصداقيتك.`,
      overviewEn: `Mastering this writing lesson requires a clear 4-step pipeline: intent, formulation, stylistic polish, and reader impact.`,
      steps: [
        {
          stepNumber: 1,
          titleAr: 'الخطوة 1: تحديد القالب وصياغة الفكرة الرئيسية',
          titleEn: 'Step 1: Define Intent & Structure',
          actionAr: `حدد القالب المناسب: "${formula}". ابدأ بتحديد ما تريد إيصاله بدقة في أول جملة.`,
          actionEn: `Apply the core formula: "${formula}". Make your central statement unmissable.`,
          whyAr: 'الوضوح الأولي يمنع التشويش ويجعل القارئ يتابع باهتمام.',
          whyEn: 'Clarity at the onset prevents reader fatigue and ambiguity.',
          exampleSnippet: mainEx,
          icon: '📐'
        },
        {
          stepNumber: 2,
          titleAr: 'الخطوة 2: الدعم والتفصيل المنطقي للجمل',
          titleEn: 'Step 2: Supporting Detail & Cohesion',
          actionAr: `استخدم جملاً داعمة مرتبطة بسياق الموقف: مثل "${secondEx}".`,
          actionEn: `Back up your claim with clear context and supporting details.`,
          whyAr: 'الفكرة بدون إثبات تظل ناقصة وغير مقنعة.',
          whyEn: 'Claims without supporting details feel unconvincing.',
          exampleSnippet: secondEx,
          icon: '🔗'
        },
        {
          stepNumber: 3,
          titleAr: 'الخطوة 3: تنقيح النص من الفخاخ والأخطاء الشائعة',
          titleEn: 'Step 3: Eliminate Fatal Flaws',
          actionAr: `احذر الخطأ الشائع: تجنب "${mistake?.incorrect || 'الغموض والترجمة الحرفية'}" واعتمد البديل الصحيح "${mistake?.correct || 'الصياغة الإنجليزية الطبيعية'}".`,
          actionEn: `Audit against common pitfalls: replace literal translations with idiomatic English.`,
          whyAr: mistake?.whyAr || 'الأخطاء الشائعة تشوه المعنى وتترك انطباعاً سلبياً.',
          whyEn: 'Common mistakes erode clarity and undermine authority.',
          exampleSnippet: mistake ? `❌ ${mistake.incorrect} ➡️ ✅ ${mistake.correct}` : formula,
          icon: '🛡️'
        },
        {
          stepNumber: 4,
          titleAr: 'الخطوة 4: الخاتمة والدعوة للإجراء أو الرد',
          titleEn: 'Step 4: Decisive Wrap-Up',
          actionAr: 'اختم الجملة بطلب رد أو خطوة لاحقة محددة تنهي الرسالة بثقة واحترافية.',
          actionEn: 'Conclude with a clear next step or call to action.',
          whyAr: 'النص القوي هو الذي يعرف القارئ بعده ماذا يصنع بالضبط.',
          whyEn: 'Strong writing leaves no doubt about what happens next.',
          exampleSnippet: lesson.speakingChallenge.recommendedResponseEn,
          icon: '🎯'
        }
      ],
      goldenRuleAr: 'اكتب بوضوح واختصار، ودع كل كلمة تخدم هدف الرسالة الأساسي.',
      goldenRuleEn: 'Write with crisp economy: every word must earn its place on the page.',
      liveModel: {
        contextAr: 'النموذج التطبيقي العملي للدرس:',
        contextEn: 'Live Practical Model:',
        annotatedModel: `${mainEx}\n${secondEx}`,
        modelExplanationAr: `يطبق هذا النموذج القالب (${formula}) بصورة حية جاهزة للاستخدام الفوري.`
      }
    };
  }

  // =========================================================================
  // 2. CONVERSATION TRACK (المحادثة والطلاقة التفاعلية)
  // =========================================================================
  if (pId === 'conversation') {
    return {
      breakdownTitleAr: `دليل إدارة الحوار التفاعلي: ${lesson.titleAr}`,
      breakdownTitleEn: `Conversational Mastery Guide: ${lesson.titleEn}`,
      overviewAr: `المحادثة الحقيقية ليست حفظ جمل مسبقة، بل هي فن التفاعل: كيف تبدأ بذكاء، كيف تستمع وتلتقط الخيط، كيف تملأ فترات التفكير دون تردد، وكيف تنهي الحوار برقي.`,
      overviewEn: `Fluency is not reciting pre-memorized lines; it is dynamic interaction: opening with confidence, active listening, handling pauses naturally, and closing gracefully.`,
      steps: [
        {
          stepNumber: 1,
          titleAr: 'الخطوة 1: كسر الجليد والمبادرة بالكلام (The Confident Opener)',
          titleEn: 'Step 1: The Confident Opening Hook',
          actionAr: `ابدأ بجملة افتتاحية واضحة ومباشرة: "${mainEx}". لا تنتظر الطرف الآخر ليبدأ دائماً.`,
          actionEn: `Take initiative with an engaging opener: "${mainEx}". Set a welcoming conversational tone.`,
          whyAr: 'المبادرة تمنحك قيادة المحادثة وتكسر التوتر النفسي من اللحظة الأولى.',
          whyEn: 'Initiating breaks awkward tension and establishes you as a comfortable communicator.',
          exampleSnippet: mainEx,
          icon: '🎤'
        },
        {
          stepNumber: 2,
          titleAr: 'الخطوة 2: استخدام القالب التحدثي التلقائي (The Speech Formula)',
          titleEn: 'Step 2: Deploying the Core Speech Formula',
          actionAr: `وظف القالب: "${formula}". هذا القالب يريح عقلك من التفكير في القواعد أثناء الحديث.`,
          actionEn: `Use the automated template: "${formula}". Automating structure frees mental capacity.`,
          whyAr: 'المتحدثون الطليقون يستخدمون قوالب ذهنية جاهزة ولا يترجمون كلمة بكلمة في رؤوسهم.',
          whyEn: 'Fluent speakers rely on chunks and formulas rather than word-by-word mental translation.',
          exampleSnippet: formula,
          icon: '🧩'
        },
        {
          stepNumber: 3,
          titleAr: 'الخطوة 3: التغلب على الصمت وأدوات التفكير الطبيعية (Natural Fillers & Bridging)',
          titleEn: 'Step 3: Handling Pauses with Natural Fillers',
          actionAr: 'إذا احتجت لثوانٍ للتفكير، استخدم: "Well, honestly...", "To be fair...", بدلاً من الصمت التام أو "أاااه".',
          actionEn: 'Bridge cognitive pauses with native conversational anchors: "You know...", "In all honesty...".',
          whyAr: 'يحافظ على انسياب الكلام ويمنع مقاطعتك قبل إكمال فكرتك.',
          whyEn: 'Holds your conversational turn and prevents awkward conversational dead ends.',
          exampleSnippet: 'Well, to be honest, ' + secondEx,
          icon: '⏳'
        },
        {
          stepNumber: 4,
          titleAr: 'الخطوة 4: تمرير الكرة للطرف الآخر (Passing the Conversational Ball)',
          titleEn: 'Step 4: Returning the Conversational Serve',
          actionAr: 'اختم كلامك بسؤال ارتدادي: "What about you?", "Does that make sense?", "How do you see it?"',
          actionEn: 'End your speaking turn with a bounce-back question to keep dialogue reciprocal.',
          whyAr: 'المحادثة حوار متبادل مثل كرة المضرب وليست خطبة فردية مملة.',
          whyEn: 'Conversations are tennis rallies; always invite the other person back in.',
          exampleSnippet: '...What do you think about that?',
          icon: '🎾'
        }
      ],
      goldenRuleAr: 'لا تخف من الخطأ البسيط؛ الطلاقة تعني استمرار تدفق الحوار والتواصل وليس الكمال اللغوي المطلق.',
      goldenRuleEn: 'Fluency is connection over perfection. Keep the interaction flowing warmly.',
      liveModel: {
        contextAr: 'محاكاة حية لمحادثة متكاملة في هذا الموقف:',
        contextEn: 'Full Live Dialogue Simulation:',
        annotatedModel: `Speaker A: ${mainEx}\nSpeaker B: Absolutely! How would you prefer to proceed?\nSpeaker A: ${secondEx}. Sounds like a plan?`,
        modelExplanationAr: 'لاحظ كيف تبادل المتحدثان الأدوار بسلاسة باستخدام القالب دون توقف أو تردد.'
      }
    };
  }

  // =========================================================================
  // 3. READING & CONNECTED SPEECH (القراءة الصوتية ومخارج الحروف)
  // =========================================================================
  if (pId === 'reading') {
    return {
      breakdownTitleAr: `معمل النطق الصوتي والقراءة التعبيرية: ${lesson.titleAr}`,
      breakdownTitleEn: `Connected Speech & Pronunciation Lab: ${lesson.titleEn}`,
      overviewAr: `المتحدثون الأصليون لا يقرؤون الكلمات منفصلة كالروبوت؛ بل يصلون أواخر الكلمات بأوائلها (Linking)، ويخففون الأصوات غير المشددة (Schwa)، ويضغطون على كلمات المعنى الأساسية (Sentence Stress).`,
      overviewEn: `Native English flows via connected speech: linking final consonants to initial vowels, reducing unstressed vowels to the Schwa, and hitting key thought peaks.`,
      steps: [
        {
          stepNumber: 1,
          titleAr: 'الخطوة 1: تقطيع الجملة إلى وحدات فكرية (Thought Groups)',
          titleEn: 'Step 1: Chunking into Thought Groups',
          actionAr: 'قسّم الجملة إلى أجزاء ذات معنى وقف وقفة ميكروسكوبية بين كل جزء وآخر، ولا تقرأ بنفس واحد متصل.',
          actionEn: 'Slice the sentence into meaningful thought units. Pause micro-seconds between chunks.',
          whyAr: 'يمنحك السيطرة على النفس ويجعل صوتك مريحاً ومفهوماً بنسبة 100% للمستمع.',
          whyEn: 'Preserves vocal stamina and dramatically boosts listener comprehension.',
          exampleSnippet: mainEx.split(',')[0] || mainEx,
          icon: '✂️'
        },
        {
          stepNumber: 2,
          titleAr: 'الخطوة 2: تطبيق الربط الصوتي بين الكلمات (Connected Speech & Linking)',
          titleEn: 'Step 2: Smooth Consonant-Vowel Linking',
          actionAr: `طبق قاعدة الربط الصوتي: "${formula}". عندما تنتهي كلمة بحرف ساكن وتبدأ التالية بمتحرك، انطقهما كأنهما كلمة واحدة.`,
          actionEn: `Connect word boundaries smoothly: glide the final sound into the next vowel without stopping.`,
          whyAr: 'هذا هو السر الحقيقي وراء سرعة المتحدث الأصلي وخفة نطقه دون بذل مجهود عضلي كبير.',
          whyEn: 'This connected flow creates effortless natural rhythm without muscular strain.',
          exampleSnippet: formula,
          icon: '🔗'
        },
        {
          stepNumber: 3,
          titleAr: 'الخطوة 3: التشديد على كلمات المعنى وخفض الحشو (Stress & Rhythm)',
          titleEn: 'Step 3: Content Word Stress & Unstressed Reduction',
          actionAr: 'ارفع نبرتك وطوّل النطق في الكلمات الهامة (الأسماء والأفعال)، واخطف الكلمات الوظيفية (مثل of, to, a).',
          actionEn: 'Lengthen and emphasize content words; compress function words into rapid background beats.',
          whyAr: 'اللغة الإنجليزية تعتمد على إيقاع النبرات (Stress-timed) وليس على عدد الحروف المتساوية.',
          whyEn: 'English rhythm pulses on stressed beats, not equal syllable lengths.',
          exampleSnippet: 'STRESS the main verbs ➡️ Reduce little helper words',
          icon: '🎵'
        },
        {
          stepNumber: 4,
          titleAr: 'الخطوة 4: المحاكاة الصدمية مع سارة (Shadowing Drill)',
          titleEn: 'Step 4: Sara Audio Shadowing Drill',
          actionAr: 'استمع لسارة وهي تنطق الجملة، وكرر خلفها فوراً بنبرتها ونغمتها وسرعتها تماماً دون تأخير.',
          actionEn: 'Listen to Sara pronounce the line, then shadow her voice instantly mimicking pitch and speed.',
          whyAr: 'يدرب عضلات الفك واللسان على الانسيابية العصبية اللازمة للحديث السريع دون لكنة ثقيلة.',
          whyEn: 'Reprograms vocal tract neuromuscular memory for native-sounding ease.',
          exampleSnippet: lesson.speakingChallenge.recommendedResponseEn,
          icon: '🗣️'
        }
      ],
      goldenRuleAr: 'لا تنطق الحروف كأنك تقرأ لغة عربية فصحى مشكولة؛ الانسيابية والربط الصوتي هما جوهر الإنجليزية.',
      goldenRuleEn: 'Do not separate words mechanically. Connect syllables into an acoustic melody.',
      liveModel: {
        contextAr: 'النموذج الصوتي التطبيقي مع إشارات الربط:',
        contextEn: 'Acoustic Model with Connected Speech Bridges:',
        annotatedModel: `${mainEx}\n${secondEx}`,
        modelExplanationAr: `دقق في كيفية اتصال الكلمات معاً وتطبيق قالب: (${formula}).`
      }
    };
  }

  // =========================================================================
  // 4. SPOKEN GRAMMAR TRACK (القواعد التحدثية السريعة)
  // =========================================================================
  return {
    breakdownTitleAr: `التفكيك المنهجي للقاعدة التحدثية: ${lesson.titleAr}`,
    breakdownTitleEn: `Spoken Grammar Applied Breakdown: ${lesson.titleEn}`,
    overviewAr: `قواعد المحادثة تختلف تماماً عن قواعد الورقة والقلم في الامتحانات؛ نحن نتعلم هنا التركيب الذي يستخدمه المتحدث الأصلي في ثوانٍ معدودة للتعبير عن المعنى دون أي تعقيد.`,
    overviewEn: `Spoken grammar differs from textbook theory: we focus on high-velocity cognitive formulas used in live speech to communicate intent instantaneously.`,
    steps: [
      {
        stepNumber: 1,
        titleAr: 'الخطوة 1: الموقف الحياتي والهدف الذهني (When & Why to Use It)',
        titleEn: 'Step 1: The Situational Trigger',
        actionAr: `استخدم هذه الصيغة عندما تريد التعبير عن: "${lesson.speakingGoalAr}". لا تستخدمها لمجرد تطبيق القواعد بل لخدمة المعنى.`,
        actionEn: `Trigger this pattern whenever your communicative intent is: "${lesson.speakingGoalEn}".`,
        whyAr: 'ربط القاعدة بالموقف الحياتي يجعل عقلك يستدعيها تلقائياً عند الحاجة دون تردد.',
        whyEn: 'Anchoring grammar to situational triggers guarantees spontaneous instant recall.',
        exampleSnippet: lesson.descAr,
        icon: '💡'
      },
      {
        stepNumber: 2,
        titleAr: 'الخطوة 2: صيغة القالب السريع والتركيب (The Rapid Pattern Formula)',
        titleEn: 'Step 2: The Core Formula Mechanics',
        actionAr: `احفظ وركب الجملة بهذا الترتيب الثابت: "${formula}".`,
        actionEn: `Construct the phrase using the rigid spoken formula: "${formula}".`,
        whyAr: 'الالتزام بترتيب القالب يحميك من التردد أو التفكير في زمن الفعل أثناء الحديث.',
        whyEn: 'Fixed chunking removes grammatical friction while speaking under real-time pressure.',
        exampleSnippet: formula,
        icon: '⚙️'
      },
      {
        stepNumber: 3,
        titleAr: 'الخطوة 3: كشف الفخ الشائع والتصحيح (The Trap & Fix)',
        titleEn: 'Step 3: Neutralizing the Common Mistake',
        actionAr: `احذر الخطأ الشائع: لا تقل "${mistake?.incorrect || 'التركيب الحرفي الخاطئ'}"، بل قل فوراً: "${mistake?.correct || mainEx}".`,
        actionEn: `Eradicate the habitual pitfall: never say "${mistake?.incorrect || 'literal error'}", say "${mistake?.correct || mainEx}".`,
        whyAr: mistake?.whyAr || 'هذا الفخ يقع فيه 90% من المتعلمين بسبب الترجمة الحرفية من لغتهم الأم.',
        whyEn: 'Direct translation from native languages causes this specific breakdown.',
        exampleSnippet: mistake ? `❌ ${mistake.incorrect} ➡️ ✅ ${mistake.correct}` : mainEx,
        icon: '⚠️'
      },
      {
        stepNumber: 4,
        titleAr: 'الخطوة 4: التوليد الفوري لـ 3 جمل جديدة (Instant Sentence Generation)',
        titleEn: 'Step 4: Rapid Substitution Drill',
        actionAr: 'استبدل الكلمات الأخيرة بالقالب وطبق 3 جمل مختلفة من حياتك اليومية فوراً بصوتك.',
        actionEn: 'Swap variables into the formula and voice 3 original sentences about your day right now.',
        whyAr: 'التطبيق الشفهي المباشر هو ما ينقل القاعدة من الذاكرة المؤقتة إلى ذاكرة الطلاقة الدائمة.',
        whyEn: 'Immediate vocal production transforms intellectual knowledge into motor-muscle fluency.',
        exampleSnippet: lesson.speakingChallenge.recommendedResponseEn,
        icon: '🚀'
      }
    ],
    goldenRuleAr: 'لا تفكر في القواعد كمعادلات رياضية، بل كقوالب موسيقية تتردد على لسانك بتلقائية.',
    goldenRuleEn: 'Treat spoken grammar as rhythmic musical grooves, not abstract algebra.',
    liveModel: {
      contextAr: 'النموذج العملي الحي المشروح:',
      contextEn: 'Annotated Live Model in Context:',
      annotatedModel: `${mainEx}\n${secondEx}`,
      modelExplanationAr: `يطبق التركيب (${formula}) في سياق واقعي حي.`
    }
  };
}
