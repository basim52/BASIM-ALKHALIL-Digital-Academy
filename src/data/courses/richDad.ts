import { BookCourse } from './types';

export const richDadCourse: BookCourse = {
  id: 'rich_dad',
  titleAr: 'الأب الغني والأب الفقير والوعي المالي',
  titleEn: 'Rich Dad Poor Dad & Financial Intelligence',
  authorAr: 'روبرت تي. كيوساكي',
  authorEn: 'Robert T. Kiyosaki',
  coverImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=400&q=80',
  descriptionAr: 'الدليل الأشهر لكسر أغلال سباق الفئران، وتفكيك الفروقات الفنية بين الأصول والالتزامات، وبناء آلة التدفق المالي المستقلة.',
  descriptionEn: 'The world-famous guide to breaking the Rat Race, understanding the difference between assets and liabilities, and building persistent cash flow streams.',
  isLocked: false,
  chapters: [
    {
      id: 'rd_ch1',
      chapterNum: 1,
      titleAr: 'الفصل الأول: فخ سباق الفئران وقانون التدفق المالي',
      titleEn: 'Chapter 1: The Rat Race Fallacy & Cash Flow Law',
      descriptionAr: 'فهم الصراع الذهني بين الوظيفة الآمنة والاستثمار الجريء، وتعريف فخ سباق الفئران.',
      descriptionEn: 'Deconstructing the emotional conflict of a secure paycheck vs. bold investing, and defining the Rat Race cycle.',
      lessons: [
        {
          id: 'rd_ch1_l1',
          idNum: 1,
          titleAr: '1. قصة الأبوين: صراع النماذج الفكرية والخيارات المالية',
          titleEn: '1. The Tale of Two Fathers: Paradigm Clashes Over Money',
          duration: '4m',
          type: 'intro',
          contentAr: `يمثل الأب الفقير (أكاديمي مرموق ذو راتب ممتاز ولكنه يعيش في ديون مزمنة) نموذج الأمان الوظيفي التقليدي. ويمثل الأب الغني (رائد أعمال جريء لم يكمل تعليمه العالي ولكنه يمتلك إدراكاً عميقاً لقوانين المال) نموذج الحرية المالية. الصراع ليس بالذكاء الأكاديمي، بل بالمنظور الذي يرى به كل جانب كيفية توجيه المال وصك الثروة.`,
          contentEn: `The Poor Dad (highly educated, with a stable high-paying salary but perpetual debt) represents the traditional job-security track. The Rich Dad (a bold entrepreneur with deep financial insights) represents financial liberty. The variance lies not in IQ, but in paradigms driving monetary habits.`
        },
        {
          id: 'rd_ch1_l2',
          idNum: 2,
          titleAr: '2. فخ سباق الفئران: الحلقة اللانهائية من العمل وتراكم الديون',
          titleEn: '2. The Rat Race Paradox: The Cycle of Fear, Paycheck, and Debt',
          duration: '3m',
          type: 'core',
          contentAr: `يدفع الخوف والحرص الناس للبحث عن وظيفة آمنة، ثم بمجرد زيادة الدخل، تندلع الرغبات الاستهلاكية لترهق كاهلهم بالقروض والديون والالتزامات كرحى تدور بلا طحن. هذا التكرار المنهك هو **"سباق الفئران"**، والتجرد والتحرر منه يبدأ برفع الحسابات الذكية والذكاء المالي وليس بمجرد المطالبة برواتب أعلى.`,
          contentEn: `Fear of missing bills drives people to trade labor for a safe check. Greed then immediately prompts lifestyle inflation, buying high-interest liabilities. This vicious loop is the **Rat Race**. Escaping it demands expanding your financial acuity.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو المحرك والدافع الأساسي الذي يبقي الأغلبية حبيسة فخ 'سباق الفئران'؟",
          questionEn: "What are the primary somatic drivers locking most individuals inside the 'Rat Race'?",
          optionsAr: [
            "قلة فرص العمل بالأسواق وانخفاض أوزان الأجور.",
            "مزيج الخوف من غياب المال والغرور العاطفي الاستهلاكي المبتز بمجرد رفع الرواتب.",
            "غياب الدعم القانوني من اللجان العمالية بالدولة."
          ],
          optionsEn: [
            "Market unemployment and standard low-wage rates across sectors.",
            "A mix of fear (of missing bills) and greed (to spend on lifestyle upgrades) upon receiving a paycheck.",
            "Lack of regulatory advocacy by localized labor commissions."
          ],
          correctIndex: 1,
          explanationAr: "يتلاعب الخوف والرغبة بقرارات الناس غير الواعية، مما يدفعهم لرفع مصاريفهم الاستهلاكية بالتوازي مع زيادة مرتباتهم.",
          explanationEn: "Fear and desire dominate emotional decisions, leading to immediate lifestyle inflation to consume non-productive assets."
        }
      ]
    },
    {
      id: 'rd_ch2',
      chapterNum: 2,
      titleAr: 'الفصل الثاني: التعريف الفاصل للأصول والالتزامات',
      titleEn: 'Chapter 2: The Core Boundary - Assets vs. Liabilities',
      descriptionAr: 'قراءة وفهم الفروقات الجوهرية التي تفصل الأصول المدرة للدخل عن الالتزامات البديدة.',
      descriptionEn: 'The ultimate financial literacy rule: distinguishing true cash generators from money pits.',
      lessons: [
        {
          id: 'rd_ch2_l1',
          idNum: 1,
          titleAr: '1. شفرة الميزانية البسيطة للأبوين: أين يذهب مالك؟',
          titleEn: '1. Cash Flows Decoded: The Real Vector of Personal Budgets',
          duration: '4m',
          type: 'intro',
          contentAr: `الوعي المالي لا يرتبط بكمّ الأموال التي تكسبها، بل بكمّ الأموال التي تحتفظ بها وتوظفها. القاعدة الكيوساكية الأولى: **الأصول (Assets)** تضع المال في جيبك باستمرار، بينما **الالتزامات (Liabilities)** تسحب المال من جيبك بجهالة وتشتتك مهنياً.`,
          contentEn: `Financial literacy is not about how much resources you generate, but how much you retain. Rule 1: **Assets** put money in your pocket; **Liabilities** pull money out through payments.`
        },
        {
          id: 'rd_ch2_l2',
          idNum: 2,
          titleAr: '2. وهم منزلك كأصل مالي: تفكيك الخدعة الكبرى للبنوك',
          titleEn: '2. The Home Ownership Fallacy: Is Your House an Asset?',
          duration: '3m',
          type: 'core',
          contentAr: `ترى الأغلبية أن سكنهم الأساسي هو أصلهم الأول. لكن الحقيقة المحاسبية تكشف أن مسكنك يسحب أقساطاً وضرائب وصيانة دورية لسنوات طويلة دون توريد سيولة نقدية لحسابك، فهو التزام! منزلك قد يكون مصدراً للدفء والراحة العائلية ولكن يجب تصنيفه بجلاء كالتزام لتصليح بوصلتك الاستثمارية قبل الصعاب.`,
          contentEn: `Traditional paradigms maintain that your personal residence is your primary asset. In reality, it drains cash through mortgages, property taxes, and maintenance, serving as a liability until it's sold at a true gain.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يتم تعريف 'الأصل' (Asset) المحاسبي الحقيقي وفقاً لفلسفة الأب الغني؟",
          questionEn: "How is an authentic 'Asset' defined in the Rich Dad paradigm?",
          optionsAr: [
            "أي ملكية عقارية أو سيارة تسجل باسمك ولو كانت تتطلب نفقات وصيانة دورية.",
            "أي استثمار أو أداة مالية تضع المال بشكل متكرر ومستمر داخل جيبك وحسابك.",
            "الشهادات الجامعية وشهادات الخبرة المهنية فقط."
          ],
          optionsEn: [
            "Any real estate property or vehicle listed under your name, regardless of daily maintenance charges.",
            "Any investment or vehicle that consistently channels cash into your pockets.",
            "University degrees and corporate certificates only."
          ],
          correctIndex: 1,
          explanationAr: "المقياس الوحيد للأصل هو تدفق الكاش الفعلي لداخلك لحسابك، والالتزام هو ما يسحب السيولة النقدية لخارج ملكيتك بانتظام.",
          explanationEn: "Cash flow direction is the ultimate filter. If it generates ongoing inward cash, it's an asset. If it drains cash, it is a liability."
        }
      ]
    },
    {
      id: 'rd_ch3',
      chapterNum: 3,
      titleAr: 'الفصل الثالث: اعتنِ بعملك الخاص (فلسفة صك وتوسيع الدروع المالية)',
      titleEn: 'Chapter 3: Mind Your Own Business & Corporate Tax Protection',
      descriptionAr: 'قوة الانتقال من موظف يكدح لغيره إلى حائز أصول مبربرة يحمي ثروته باسم الشركات الرصينة.',
      descriptionEn: 'The shift from working to enrich others, to building an independent corporate entity for your assets.',
      lessons: [
        {
          id: 'rd_ch3_l1',
          idNum: 1,
          titleAr: '1. التفرقة الحاسمة بين وظيفتك الحالية وعملك الخاص',
          titleEn: '1. Profession vs. Business: Building Your Asset Pool on the Side',
          duration: '4m',
          type: 'intro',
          contentAr: `يقضي الكثير حياتهم في بناء وامتلاك أعمال الآخرين ومساعدة البنوك والشركات على تحقيق الملايين. "اعتنِ بعملك الخاص" تعني استخدام وظيفتك الآمنة لتمويل وعاء أصولك الفعلي (الأسهم، الصكوك، العقارات المدرة، والملكية الفكرية البرمجية) لتصمد بوقار في ميزان الحياة المالي.`,
          contentEn: `Most professionals spend their lives enriching others (employers, banks, governments). Minding your own business means utilizing your primary job to feed your asset column (stocks, rental real estate, IP, or software algorithms).`
        },
        {
          id: 'rd_ch3_l2',
          idNum: 2,
          titleAr: '2. اللعبة القانونية للأثرياء: كيف تحمي الشركات أصولك من الضرائب؟',
          titleEn: '2. The Legal Tax Shield: How Corporations Legally Protect Assets',
          duration: '3m',
          type: 'core',
          contentAr: `يدفع الموظفون الضرائب قبل استلام رواتبهم، بينما الشركات تكسب، وتنفق كل نفقاتها المشروعة المبررة (مثل السفريات والمعدات والمكاتب الصديقة بالشركة)، ثم تدفع الضرائب على المتبقي البسيط فقط! استخدام الشركات هو حجر الزاوية لحصانة الثروة لدى المستثمرين المحترفين بالأسواق بذكاء مستقر.`,
          contentEn: `W-2 employees are taxed first, then spend what stays. Corporations earn, spend all allowable expenses on operations (travel, gear, office), and only pay taxes on the net remainder. This is the cornerstone of corporate protection.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يستعمل الأثرياء قوة الشركات (Corporations) لحماية أرباحهم بشكل قانوني؟",
          questionEn: "How do sophisticated investors utilize Corporations for asset protection and tax advantages?",
          optionsAr: [
            "بالتهرب الضريبي العشوائي وتزوير السجلات والمقاييس المالية بالدائرة.",
            "من خلال توظيف النفقات والمصاريف التشغيلية المشروعة قبل حساب واحتساب الوعاء الضريبي المتبقي للشركة.",
            "عبر بيع أسهم الشركة بشكل سري بعيداً عن أعين القوانين الحكومية."
          ],
          optionsEn: [
            "By committing tax evasion and fabricating financial balance sheets illegitimately.",
            "By writing off allowable business and travel expenditures first, shielding their tax liabilities on net profits.",
            "By illicitly selling stocks outside regulatory observation entirely."
          ],
          correctIndex: 1,
          explanationAr: "تمنح القوانين الشركات ميزات استقطاع النفقات التشغيلية قبل فرض فؤاد الضرائب، مما يعفيك من الهدر المالي غير المبرر.",
          explanationEn: "Corporate tax codes permit writing off operational costs pre-tax, protecting immense resource compared to direct wage earning."
        }
      ]
    },
    {
      id: 'rd_ch4',
      chapterNum: 4,
      titleAr: 'الفصل الرابع: الأجنحة الأربعة للذكاء المالي (Financial IQ)',
      titleEn: 'Chapter 4: The Four Pillars of Financial IQ',
      descriptionAr: 'ترقية جدارتك المالية عبر التمكن من المحاسبة والاستثمار وفهم الأسواق والقانون.',
      descriptionEn: 'Upgrading your financial stamina by mastering accountancy, investing, market analysis, and tax law.',
      lessons: [
        {
          id: 'rd_ch4_l1',
          idNum: 1,
          titleAr: '1. المحاسبة وفلسفة لغة الأرقام بالأنشطة والمقاييس',
          titleEn: '1. Accounting & Investment Strategy: Deciphering the Financial Scorecard',
          duration: '4m',
          type: 'intro',
          contentAr: `بدون القدرة على قراءة البيانات المالية ومقارنة الدوابير بوعاء الأصول، تصبح أعمى في ساحة الاستثمار والأعمال. المحاسبة تمنحك تحديد قوة أو ضعف أي مشروع، وتحديد الفرص والصفقات بوقار، وتسييس المخاطر قبل الدخول أو تقديم عقود الشركات بنجاح مستقر.`,
          contentEn: `Accounting is the raw language of money. If you cannot read balance sheets and cash flows, you are flying blind in commerce. Strategic investing is the science of money making money, selecting formulas that outmatch inflation.`
        },
        {
          id: 'rd_ch4_l2',
          idNum: 2,
          titleAr: '2. فهم الأسواق والامتثال القانوني: أسلوب قنص الفرص بضمانة',
          titleEn: '2. Market Analysis & The Law: Bridging Opportunity with Regulatory Safety',
          duration: '3m',
          type: 'core',
          contentAr: `يتألف الذكاء المالي من أربع ركائز: المحاسبة (الذكاء التقني للقراءة)، الاستثمار (هندسة توليد الكاش)، فهم الأسواق (الطلب والترددات النفسية)، والقانون والضرائب (المظلة الواقية من العقاب والهدر). توازنهما يحمى حركتك ويبارك صعودك الاستثماري.`,
          contentEn: `Financial IQ merges four dynamics: Accounting (financial reading), Investing (money generation), Understanding Markets (supply/demand psychology), and Law (maintaining systemic compliance to secure assets).`
        }
      ],
      quiz: [
        {
          questionAr: "ما هي الأجنحة الأربعة التي تشكل الهيكل الكامل للذكاء المالي (Financial IQ)؟",
          questionEn: "What are the four core pillars constituting high Financial IQ?",
          optionsAr: [
            "الاقتصاد الدولي، والعلوم البرمجية، وتجارة التجزئة، وإدارة الموارد البشرية.",
            "المحاسبة الفنية، واستراتيجيات الاستثمار، وإدراك آليات السوق وقوانينه، والعلوم الضريبية والقانونية.",
            "العلاقات العامة الدائرية، والخطابة، والمظهر الاستهلاكي المبرز بفخامة."
          ],
          optionsEn: [
            "Macroeconomics, computer science, product wholesale, and HR management.",
            "Accounting, Investment strategy, Market dynamics and psychology, and Tax and corporate Law.",
            "Public relations, professional speaking, and high-end consumer display."
          ],
          correctIndex: 1,
          explanationAr: "تكامل وتناسق هذه الأركان الأربعة يمنح المستثمر بصيرة فولاذية وحصانة كاملة ضد تذبذب الأسواق وحيل الخصوم.",
          explanationEn: "Coherence across these four disciplines yields exceptional wealth creation while ensuring uncompromised legal safety."
        }
      ]
    },
    {
      id: 'rd_ch5',
      chapterNum: 5,
      titleAr: 'الفصل الخامس: صك الأصول وابتكار التدفق النقدي الفريد',
      titleEn: 'Chapter 5: Inventing Money & Designing Creative Off-Market Deals',
      descriptionAr: 'منهجية صك العروض واصطياد الثروة من الفرص غير المرئية للعوام بنقاء واكتفاء تام.',
      descriptionEn: 'The mindset of creating money, leveraging unique insights to capture value that regular eyes fail to notice.',
      lessons: [
        {
          id: 'rd_ch5_l1',
          idNum: 1,
          titleAr: '1. قوة صك المال: كيف يصنع المستثمر المحترف خياراته الاستثمارية الذكية؟',
          titleEn: '1. Mind as the Supreme Asset: Creating Wealth from Structured Insights',
          duration: '4m',
          type: 'intro',
          contentAr: `الفقراء يشتكون من قلة السيولة المادية؛ أما الأثرياء فيدركون أن **العقل البشري هو أعظم أصل ملموس يمتلكونه**. عندما تدرب عقلك بانتظام على فك شفرات ومشاكل العقارات والصفقات، تصبح صانعاً حقيقياً وموجهاً للاستثمار، وتأتي إليك الأموال وصكود القيمة متأثرة بجمال تنظيمك.`,
          contentEn: `While most blame a lack of cash, elite investors realize that their mind is the primary asset. By training your mind on structuring options, solving deal blockers, and negotiating, you invent capital from intellectual leverage.`
        },
        {
          id: 'rd_ch5_l2',
          idNum: 2,
          titleAr: '2. صفقات خارج المنبر العام: التواجد في الخبايا وصناعة الصدارة المشتركة',
          titleEn: '2. Off-Market Arbitrage: Discovering and Structuring hidden Value',
          duration: '3m',
          type: 'core',
          contentAr: `يبحث العاديون عن الصفقات الجاهزة عبر وسطاء البيع العموميين؛ المستثمرون الفطنون يصنعون الصفقات بتجميع قطع الأحجية المتفرقة (عقار مهمل، تملص ضريبي معقد، تعديل للملكية). صياغة القيمة في الخبايا تعفيك من المنافسة الركيكة وتمنح شركائك مكاسب باذخة بالشركات.`,
          contentEn: `Average buyers wait for realtors to announce standard listings. Clever investors construct options by assembling puzzle units (unstable tax titles, minor zoning adjustments, structural improvements), avoiding generic bidding.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الاختلاف الجوهري للمستثمر الذكي في ابتكار الفرص المالية وتوفير الحلول؟",
          questionEn: "What is the key separator of a progressive investor when creating value?",
          optionsAr: [
            "الانتظار في الطوابير العامة وشراء الأصول بأسعار مرتفعة مسايرة للجميع خوفاً من المجهول.",
            "البحث الدؤوب عن صفقات مبددة خلف الكواليس وتجميع أركان القيمة بقرارات مبتكرة تفوق بساطتها تقديرات السماسرة الدراجين بالمنطقة.",
            "الاقتراض السطحي لشراء سيارات فارهة والتباهي بها بالعمل."
          ],
          optionsEn: [
            "Waiting in popular consumer queues to acquire standard items at inflated pricing, following peer habits.",
            "Deep structural troubleshooting behind the scenes, combining fragmented opportunities to yield outstanding value.",
            "Taking out personal consumer loans to flaunt high-end items in social environments."
          ],
          correctIndex: 1,
          explanationAr: "قنص الصفقات وتنمية الأصول في ظلال الأسواق يمنحك هوامش ربحية وتدفق مستمر يحميك من فخ الركود والكساد العام.",
          explanationEn: "Devising customized off-market structures provides vast profit margins, ensuring constant cash flow during broad market corrections."
        }
      ]
    },
    {
      id: 'rd_ch6',
      chapterNum: 6,
      titleAr: 'الفصل السادس: مصفوفة التدفق المالي الرباعية (نموذج ESBI)',
      titleEn: 'Chapter 6: The CASHFLOW Quadrant (The ESBI Transformation)',
      descriptionAr: 'قراءة وتحليل النماذج المالية الأربعة لإنتاج وتوليد الدخل وبوابة العبور نحو الجانب الأيمن للمنظومة الكونية المنجزة.',
      descriptionEn: 'Anatomy of the four income-generating quadrants (Employee, Self-employed, Business owner, Investor) and navigating the shift.',
      lessons: [
        {
          id: 'rd_ch6_l1',
          idNum: 1,
          titleAr: '1. الربعان الأيسران (E & S): فخ الأمان الفردي واستنزاف الطاقة الشخصية',
          titleEn: '1. Employees (E) vs. Self-Employed (S): Trading Temporal Assets for Linear Wage',
          duration: '4m',
          type: 'intro',
          contentAr: `يقسم نموذج كاشفلو الأفراد لأربعة جوانب. الربع الأيسر يحتوي على: **E (الموظف - Employee)** المقيد بساعات عمله مقابل شح رواتبه، و**S (صاحب العمل المستقل - Self-employed)** مثل الأطباء أو المبرمجين الذين تحولوا لأسرى داخل مكاتبهم إذ يتبدد دخلهم تماماً بمجرد توقفهم عن العمل الجسدي اليومي.`,
          contentEn: `The CASHFLOW Quadrant deconstructs active and passive revenues. Left Quadrant contains: Employees (E) who sell temporal blocks for wage, and Self-Employed (S) who 'own a job' and cease earning the moment they pause daily actions.`
        },
        {
          id: 'rd_ch6_l2',
          idNum: 2,
          titleAr: '2. الربعان الأيمنان (B & I): سياسة الأنظمة وتوظيف المال للخدمة الحرة الشهمة',
          titleEn: '2. Business Owners (B) vs. Investors (I): Unleashing Leverage through Systems',
          duration: '3m',
          type: 'core',
          contentAr: `الجانب الأيمن يحتوي على: **B (رائد الأعمال ذو النظام - Business owner)** الحاضن لأنظمة تفويض إدارية وذكية تعمل لصالحه ولو غاب لسنة كاملة، و**I (المستثمر المحترف - Investor)** الذي يرسل المال للعمل بوقار فجر كل يوم ليعود بحصاد الكاش دون جهد مباشر منه.`,
          contentEn: `The Right Quadrant hosts Business Owners (B) who direct systems staffed by experts, and Investors (I) who put their capital to work in productive assets, reaping returns automatically while maintaining absolute sovereignty.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الفارق الجوهري الفارق بين فئة (S - المستقل) وفئة (B - رائد الأعمال ذو النظام)؟",
          questionEn: "What is the primary indicator separating the Self-employed (S) class from Business Owners (B)?",
          optionsAr: [
            "حجم الممتلكات الاستهلاكية المظهرية للأب الغني.",
            "فئة (S) تمتلك وظيفتها وتتطلب حضورها المستمر لكسب المال، بينما فئة (B) تؤسس نظاماً تشغيلياً يعمل بكفاءة كاملة حتى في غيابها الشخصي للراحة.",
            "معدلات التضخم وزيادة ودائع البنوك السويسرية."
          ],
          optionsEn: [
            "The volume of visible luxury and consumer items owned by the individual builder.",
            "The Self-employed (S) 'own their job' and must show up physically to keep earning, while Business Owners (B) build and delegating systems.",
            "Broad economic inflation rates and Swiss bank transaction parameters."
          ],
          correctIndex: 1,
          explanationAr: "تأسيس الأنظمة وتفويض الطاقات يحرر يدك ومستوى تفكيرك لتنتقل إلى ربع المستثمر (I) الكوني بوقار ونقاء باهر.",
          explanationEn: "Building robust systems shields your cash stream from your physical absence, preparing you to transition smoothly to the Investor (I) quad."
        }
      ]
    },
    {
      id: 'rd_ch7',
      chapterNum: 7,
      titleAr: 'الفصل السابع: ليكن عملك لغرض التعلم مدى الحياة لا للتكسب المالي الضيق',
      titleEn: 'Chapter 7: Work to Learn, Don\'t Work for Money',
      descriptionAr: 'قوة تطوير المهارات العريضة (البيع والتفاوض والقيادة) على حساب التخصص الأكاديمي المكتنف.',
      descriptionEn: 'Prioritizing broad skillset acquisition (sales, marketing, leadership) over narrow academic hyper-specialization.',
      lessons: [
        {
          id: 'rd_ch7_l1',
          idNum: 1,
          titleAr: '1. فخ التخصص الضيق: لماذا يسقط العباقرة المعرفيون في فترات الديون اللعينة؟',
          titleEn: '1. The Specialization Trap: Why Exceptional Specialists Fail financially',
          duration: '4m',
          type: 'intro',
          contentAr: `يقنع المجتمع الدراسي المتابعين بفائدة التخصص المفرط والدراسة المتناهية لجزئية صغيرة كطريق وحيد للترقية. النتيجة الحقيقية هي مطور برمجيات حاذق للغاية ولكنه يفشل في ترويج وتسويق معارفه فيظل فقيراً. الأب الغني ينصح بأن تتعلم "القليل عن كل شيء" لتصيغ القيادة الفاعلة في صروح الأسواق بنبل وقار.`,
          contentEn: `Traditional schools suggest studying more and more about less and less to unlock success. This creates brilliant programmers who cannot sell their ideas, staying poor. To build a commercial empire, study broadly to manage experts.`
        },
        {
          id: 'rd_ch7_l2',
          idNum: 2,
          titleAr: '2. مهارات النبوغ الثلاثة الاستراتيجية: إدارة التدفق والبشر والأوقات بالكامل',
          titleEn: '2. The Master Management Trio: Managing Cash, Systems, and People',
          duration: '3m',
          type: 'core',
          contentAr: `يتطلب نجاحك بالشركات والأعمال إتقان ثلاثة تخصصات إدارية استثنائية: إدارة التدفق النقدي وصيانته، إدارة الأنظمة والقواعد التشغيلية، وقبل كل شيء إدارة البشر وبناء رصيد التعاطف اللائق لشحذ الطاقات بكفاءة.`,
          contentEn: `Business creation is driven by three essential systems management: managing cash flow, managing overall organizational systems, and managing and leading people back to active productivity.`
        }
      ],
      quiz: [
        {
          questionAr: "لماذا ينصح الأب الغني بتعلم مهارات 'التسويق والمفاوضة والبيع' حتى للمهندسين والمطورين؟",
          questionEn: "Why does Rich Dad advocate mastering 'sales and marketing' even for engineers and designers?",
          optionsAr: [
            "لعدم وجود أي فائدة للعلوم الهندسية والبرمجية بالصناعات الحديثة بالأسواق.",
            "لأن القدرة على بيع وتسويق أفكارك وإدراك دوافع العملاء هي المهارة الذهبية المانعة للركود والمنشئة للثروة وصيانة الاستثمار من الهلاك.",
            "ليتمكنوا من نيل رضا مسؤوليهم بالوظيفة التقليدية."
          ],
          optionsEn: [
            "Because technical engineering and software skills possess zero objective weight in the modern economy.",
            "Because the ability to communicate, negotiate, and pitch your code is the actual differentiator for your wealth creation.",
            "To secure unneeded appraisal ratings in their standard linear employment."
          ],
          correctIndex: 1,
          explanationAr: "تواصلك الفعال مع الجمهور وصك العروض الإعلانية هو الممر الإجباري لتنصيب برمجياتك وصناعيتك وحفظ استقلال عقودك بالكامل.",
          explanationEn: "Excellent promotion bridges professional craftsmanship with active monetisation, keeping your independent career alive."
        }
      ]
    },
    {
      id: 'rd_ch8',
      chapterNum: 8,
      titleAr: 'الفصل الثامن: قوى الاقتراض والرافعة المالية (الديون الجيدة مقابل الديون السيئة)',
      titleEn: 'Chapter 8: The Leverage Paradigm: Good Debt vs. Bad Debt',
      descriptionAr: 'قراءة وفهم قواعد التوظيف الذكي لقروض البنوك لتوليد الكاش بدلاً من تغذية عادات الاستهلاك.',
      descriptionEn: 'Anatomy of leverage: harnessing bank capital to acquire cash producers vs. consumer financing trap.',
      lessons: [
        {
          id: 'rd_ch8_l1',
          idNum: 1,
          titleAr: '1. الديون كصاعق متفجر: كيف يستعمل الأثرياء أموال البنوك للتوسع؟',
          titleEn: '1. Debt Arbitrage: Using Other People\'s Money (OPM) Safely',
          duration: '4m',
          type: 'intro',
          contentAr: `يخشى عامة الناس الديون ويصنفون القروض كشر مطلق؛ بينما الأثرياء يتعاملون مع الديون كأقوى رافعة لتوسيع الاستثمار. الرافعة المالية تكمن في استخدام "أموال الآخرين - OPM" لشراء عقارات أو مشاريع تدر سيولة شهرية تسدد بها فوائد الدين وتمنحك كاش متبقي ممتاز لحسابك مجاناً.`,
          contentEn: `Typical wisdom holds that all loans are bad and risky. Proponents of leverage classify debt into types. Leveraging OPM (Other People's Money) lets you deploy bank capital to acquire major cash flow generators, keeping your own capital fluid.`
        },
        {
          id: 'rd_ch8_l2',
          idNum: 2,
          titleAr: '2. الديون السيئة: شراك التمويل للمستلزمات التفاخرية السطحية',
          titleEn: '2. The Consumer Financing Trap: Bad Debt in Personal Finance',
          duration: '3m',
          type: 'core',
          contentAr: `الدين المذموم والسيء هو ما تقترضه لشراء كماليات استهلاكية كسيارات فارهة أو إجازات بذخ أو مستلزمات تنسحب قيمتها فور الشراء لتدخل في سجن الديون وتدفع الرسوم للبنوك لسنوات وتفقد رزانة السكينة المعيشية بالدائرة.`,
          contentEn: `Bad debt is capital you borrow to finance depreciating consumer items. These actions bind you to lifelong monthly checks, keeping you a slave to financial institutions for shallow displays.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو المعيار الرياضي الذي يفرق بين الدين الجيد (Good Debt) والدين السيء (Bad Debt)؟",
          questionEn: "What dynamic separates Good Debt from Bad Debt in investment architectures?",
          optionsAr: [
            "توقيت الحصول على القروض البنكية ومقاس سمعة موظف البنك المانح.",
            "الدين الجيد هو القرض الموجه لشراء أصول تغطي سيولتها فوائد القرض وترسل فائض الكاش لجيبك؛ والدين السيء يلتهم دخلك لدفع الالتزامات.",
            "سعر العملة وتوقعات معدلات سوق الغاز الدولي بالمنظومة."
          ],
          optionsEn: [
            "The time of loan acquisition or the localized rating of the bank officer.",
            "Good Debt goes to self-funding assets where cash generation far outpaces interest; Bad Debt is spent on liabilities that eat your salary.",
            "Broad economic calculations relating to global gas or metal markets."
          ],
          correctIndex: 1,
          explanationAr: "توجيه القروض لشراء الدروع المالية المنتجة يصنع ثروتك بلا ميزانية ذاتية، بينما استهلاكها يحبسك طوال العمر في سباق الفئران المنهك.",
          explanationEn: "Leveraging debt to secure solid income streams lets you scale wealth via bank margins, preserving your personal net assets."
        }
      ]
    },
    {
      id: 'rd_ch9',
      chapterNum: 9,
      titleAr: 'الفصل التاسع: قهر العقبات الخمسة الحيوية بحصانة الصمود المالي',
      titleEn: 'Chapter 9: Conquering the Five Obstacles to Wealth',
      descriptionAr: 'تحليل وتطهير العقلية من حواجز الخوف، والشكوك، والكسل الكامن، والمعتقدات السيئة والغرور الزائف.',
      descriptionEn: 'Anatomy of failure: breaking through fear, cynicism, laziness, destructive financial habits, and intellectual arrogance.',
      lessons: [
        {
          id: 'rd_ch9_l1',
          idNum: 1,
          titleAr: '1. حاجز الخوف والشكوك: سيكولوجيا الصمود بوجه الخسارات الحتمية',
          titleEn: '1. Navigating Fear and Cynicism: Escaping the Cynic\'s Echo Chamber',
          duration: '4m',
          type: 'intro',
          contentAr: `يخاف الكثير من الخسارة المادية لدرجة تحبسهم عن أي مغامرة استثمارية. الحقيقة أن الفشل والتعثر بالصفقة هو رفيق الإتقان والتميز المحتم. الشكوك والنميمة الاجتماعية تطلق مبررات وهمية كاذبة لإطفاء شغفك التنموي: "الأسواق ستنهار"، "العقارات ستكسر". صمت التواضع المعرفي يحميك من التردد المنهك بالدائرة.`,
          contentEn: `Fear of loss keeps people completely paralyzed. Realize that all elite wealth-builders failed at some point—it is how they handled it that matters. Cynics criticize, while achievers analyze, filtering out negative public noise.`
        },
        {
          id: 'rd_ch9_l2',
          idNum: 2,
          titleAr: '2. الكسل الذهني المستتر والغرور القاتل: التغلب على فخ الفبركة المعرفية بالشركات',
          titleEn: '2. Subtle Laziness & Arrogance: Confronting Your Hidden Financial Blindspots',
          duration: '3m',
          type: 'core',
          contentAr: `ينشأ الكسل الذهني في العصر الرقمي بالتظاهر الدائم بالانشغال بالتدوين وعقد الاجتماعات لإخفاء التفرب من الخطوات الحتمية والمثيرة للمجهول بالأسواق. والغرور القاتل يظهر كقناع تفاخري زائف يدعي المعرفة الكاملة ليخفي نقص حاد بالذكاء المالي؛ مما يرمي صاحبها في مهاوي الخسائر الجائرة.`,
          contentEn: `Subtle laziness is pretending to be incredibly occupied to avoid hard financial decisions. Arrogance is pride plus ignorance, assuming that because you understand academic subjects, you don't need to study market codes.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يفيدنا صمت التواضع المعرفي وتطهير النفس من الغرور في حماية المحافظ الاستثمارية؟",
          questionEn: "How does intellectual humility protect our investment portfolio?",
          optionsAr: [
            "يجعلنا نثق في كل سمسار خارجي مسيساً دون مراجعة تفصيلية للأرقام بالدائرة.",
            "يزيل حواجز الادعاء الزائفة ويجبرنا على دراسة أصول المحاسبة واستشارة الخبراء وقبول تصحيح الخطأ بنشاط وقار بالعمل.",
            "يدفعنا لشراء كماليات استهلاكية هدمة بأسعار منخفضة."
          ],
          optionsEn: [
            "It prompts us to trust every general realtor without performing due diligence.",
            "It bypasses the illusion of knowledge, pushing us to study raw accounting, gather seasoned inputs, and adapt rapidly.",
            "It drives us to consume useless items simply because they are discounted."
          ],
          correctIndex: 1,
          explanationAr: "الاعتراف الجسور بنقاط ضعف عقلية الفرد يمهد لك كسب العلوم وصيانة مصالحك وعقود صفقاتك بتقدير وافٍ.",
          explanationEn: "Ditching financial arrogance opens your mind to spot real development gaps, securing healthy structural progress."
        }
      ]
    },
    {
      id: 'rd_ch10',
      chapterNum: 10,
      titleAr: 'الفصل العاشر: الخطوات العشر لإطلاق آلتك الاستثمارية الكونية الطاهرة للثروة',
      titleEn: 'Chapter 10: Ten Actionable Steps to Awaken Your Financial Genius',
      descriptionAr: 'خريطة الطريق التنفيذية لتسييس محرك أصولك وصناعة رصيف الوفرة والحرية للغد بكرامة صلبة.',
      descriptionEn: 'The operational blueprint to launch your wealth machine, establishing persistent dignity and choice for your future.',
      lessons: [
        {
          id: 'rd_ch10_l1',
          idNum: 1,
          titleAr: '1. الركائز الخمسة الأولى: قوة الروح، والمناعة الاجتماعية، ودستور الدفع لنفسك أولاً',
          titleEn: '1. The Mind and Social Anchors: Paying Yourself First as a Discipline of Grit',
          duration: '4m',
          type: 'intro',
          contentAr: `لتصحو وتستيقظ قوتك وصدارتك المالية، التزم بدستور كيوساكي الاستراتيجي: اعثر على سبب روحي ونبيل يتجاوز طاقة الألعاب العادية، اختر أصدقاءك وانتقِ صفوتك بوعي وعفّة لتتجنب ضوضاء المشتتين، وادفع لنفسك دائماً أولاً! باقتطاع مبالغ الاستثمار قبل تصفية وسداد فواتير الآخرين؛ لتجبر دماغك بشجاعة على ابتكار وتنشيط الكاش لتعدية أي أزمة.`,
          contentEn: `To activate your financial genius, secure your anchors: Find a powerful, deeply spiritual reason for wealth; select friendships that support abundance rather than scarcity; and pay yourself first by allocating investment capital before bills.`
        },
        {
          id: 'rd_ch10_l2',
          idNum: 2,
          titleAr: '2. الركائز الخمس الختامية: تكريس القيمة لتمكين شركائك واسترداد السكينة الكاملة',
          titleEn: '2. The Leverage of Giving: Empowering Advisors and Embracing Generosity',
          duration: '3m',
          type: 'core',
          contentAr: `ادفع بسخاء ونبل للوسطاء والخبراء والمستشارين الماليين بالشركات؛ فالعقود المبررة تكفل لك حراساً مخلصين لأصولك بالأسواق. وتبرع بمحبّة وسعة صدر للفقراء والمجتمع من ربع الوفرة الحرة؛ فقانون الكون البديهي يضاعف طاقات العطاء ويثبت السكينة الحية والوقار بمسيرة عمرك بالكامل.`,
          contentEn: `Pay your brokers and financial advisors generously, as their professional vigilance saves immense resources. Cultivate charity to support community works, locking in personal security and tranquil power.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الأثر العميق لتطبيق قاعدة 'ادفع لنفسك أولاً' (Pay Yourself First) في تهذيب الانضباط المالي؟",
          questionEn: "What is the strategic impact of applying the 'Pay Yourself First' rule in financial behavior?",
          optionsAr: [
            "تجنب تسليط الضرائب والهروب من دفع التزامات البنوك بالكامل.",
            "تجبر عقلك بشحنة ضغط إدارية شجاعة على ابتكار وحيازة ثروات ومشاريع جديدة وسد الفواتير دون إتلاف لمحرك أصولك الصاعدة.",
            "الوقوع اللانهائي في سباق الفئران المنهك والاستسلام للشح."
          ],
          optionsEn: [
            "Bypassing tax liabilities and avoiding bank loan obligations altogether.",
            "It applies self-regulation to force your mind to invent and expand cash generators to cover bills, without starving your asset column.",
            "Sinking indefinitely into the Rat Race and submitting to overall scarcity."
          ],
          correctIndex: 1,
          explanationAr: "اقتطاع مبالغ تمويل وعاء الأصول أولاً يحمي مستقبلك من هجمات الاستهلاك ويعبأ قواك المعرفية لابتكار التدفقات والخيارات بكرامة صلبة.",
          explanationEn: "Prioritizing your asset allocation builds structural resilience, pushing you to create solutions instead of consuming your future legacy."
        }
      ]
    }
  ]
};
