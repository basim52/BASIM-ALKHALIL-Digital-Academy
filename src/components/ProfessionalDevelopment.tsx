import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  UploadCloud, 
  CheckCircle2, 
  Award, 
  Lock, 
  Trophy, 
  PlayCircle, 
  Lightbulb, 
  ArrowRight, 
  GraduationCap, 
  Quote,
  Check,
  X,
  RefreshCw,
  Clock,
  Book,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfessionalDevelopmentProps {
  lang: 'en' | 'ar';
  onBack: () => void;
  userProfile?: any;
}

interface MicroLesson {
  id: string;
  idNum: number;
  titleEn: string;
  titleAr: string;
  duration: string;
  type: 'intro' | 'core' | 'review' | 'tips';
  contentAr: string;
  contentEn: string;
}

interface Chapter {
  id: string;
  chapterNum: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  lessons: MicroLesson[];
  quiz: {
    questionAr: string;
    questionEn: string;
    optionsAr: string[];
    optionsEn: string[];
    correctIndex: number;
    explanationAr: string;
    explanationEn: string;
  }[];
}

interface BookCourse {
  id: string;
  titleEn: string;
  titleAr: string;
  authorEn: string;
  authorAr: string;
  coverImage: string;
  descriptionEn: string;
  descriptionAr: string;
  chapters: Chapter[];
  isLocked?: boolean;
}

const PRELOADED_COURSES: BookCourse[] = [
  {
    id: 'subtle_art',
    titleAr: 'فن اللامبالاة لعيش حياة تخالف المألوف',
    titleEn: 'The Subtle Art of Not Giving a F*ck',
    authorAr: 'مارك مانسون',
    authorEn: 'Mark Manson',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    descriptionAr: 'عن تجريد الحياة العصرية والقبول اللامشروط للمصاعب واختيار القيم القيّمة الكبرى.',
    descriptionEn: 'A counterintuitive guide to living a good life, focusing on choosing what really matters.',
    isLocked: false,
    chapters: [
      {
        id: 'sa_ch1',
        chapterNum: 1,
        titleAr: 'الفصل الأول: كيف تكسر حلقة الجحيم المفرط؟',
        titleEn: 'Chapter 1: Breaking the Loop of Overcaring',
        descriptionAr: 'استراتيجية التوقف عن السعي خلف الإيجابية المزيفة وقبول الواقع الشجاع.',
        descriptionEn: 'Why accepting negative experiences is itself a positive experience.',
        lessons: [
          {
            id: 'sa_ch1_l1',
            idNum: 1,
            titleAr: '1. بوابة الإدراك: لماذا الرغبة الدائمة بالنجاح هي فخ؟',
            titleEn: '1. Orientation: The Illusion of Constant Success',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك يا صديقي الذكي في هذا المسار التدريبي المركّز والمستخلص من واحد من أكثر الكتب تأثيراً في عصرنا. 

**لماذا هذا المفهوم مهم؟** 
أنت تعيش اليوم في ثقافة استهلاكية تدفعك باستمرار عبر وسائل التواصل الاجتماعي لتفترض أنه يجب أن تكون ثرياً، جميلاً، سعيداً، ومثيراً طوال الوقت. لكن الحقيقة مختلفة جداً. 

**ماذا ستستفيد من هذا الدرس**
الرغبة الدائمة في تجارب أفضل وأكثر إيجابية هي بذاتها تجربة سلبية للأسف! ومفتاح العيش الرغيد هو الاكتراث بالقيم الأعمق والأصح وتجاهل السطحيات التافهة من حولنا.`,
            contentEn: `Welcome, friend, to this action-oriented micro-course. 

**Why is this concept important?**
In today's digital era, society constantly micro-targets you with messages saying you must always be richer, happier, and better. But this constant pursuit actually underlines what you lack.

**What is your takeaway?**
The desire for more positive experiences is itself a negative experience. Accepting your raw, human limitations is the first step toward genuine freedom.`
          },
          {
            id: 'sa_ch1_l2',
            idNum: 2,
            titleAr: '2. حكاية بوكوفسكي الشجاع: الدرس الحقيقي للنجاح الروحي',
            titleEn: '2. The Bukowski Paradigm: The Failed Writer Who Didn\'t Try',
            duration: '3m',
            type: 'core',
            contentAr: `تأمل قصة تشارلز بوكوفسكي. كان شخصاً فاشلاً، سكيراً، ومرفوضاً من كل دور النشر لعقود. ومع ذلك، عندما حقق النجاح في النهاية، نقش على قبره كلمتين فقط: **"لا تحاول" (Don\'t Try)**.

**ماذا يعني ذلك لك؟**
لم يكن بوكوفسكي يحاول تزييف واقعه أو ادعاء العبقرية. لقد كان متصالحاً مع حقيقة كونه بسيطاً وفاشلاً، وهذا التصالح بالذات هو ما منحه قوته وصدقه الكتابي المطلق. 
النجاح لا يأتي من القلق من الفشل واللهاث خلف الكمال، بل من التصالح مع الفشل والبدء بشجاعة من النقطة الحالية دون مواربة.`,
            contentEn: `Let\'s analyze the story of Charles Bukowski. He spent decades rejected, poor, and struggling. Yet when he finally succeeded, his gravestone read only two words: **"Don\'t Try."**

**What does this mean for you?**
Bukowski never pretended to be anything but a flawed human being. His genius lay in his absolute comfort with his own limitations. True progression starts when you stop trying to disguise your vulnerabilities and act with absolute authenticity.`
          },
          {
            id: 'sa_ch1_l3',
            idNum: 3,
            titleAr: '3. حلقة الجحيم التكرارية: كيف نقع ضحية مشاعر القلق المفرط؟',
            titleEn: '3. Feedback Loop from Hell: Feeling Anxious About Being Anxious',
            duration: '4m',
            type: 'core',
            contentAr: `هل حدث لك يوماً أن شعرت بالقلق تجاه أمر معين، ثم بمجرد وعيك بقلقك، بدأت تقلق لأنك قلق؟ هذا ما نسمية **"حلقة الجحيم التكرارية"**.

هو اضطراب عصبي وعقلي ينشأ لأننا نرفض قبول مشاعرنا السلبية الطبيعية كالغضب والمخاوف والحزن. صرنا نرى هذه المشاعر كدليل عار أو مشكلة تستدعي العلاج والمواربة، مما يعيد إنتاج مشاعر سلبية مضاعفة. 

**كيف تلغي هذه الحلقة؟**
القبول الفوري للبؤس العرضي دون لوم النفس هو السحر الفعلي. عندما ترى خوفك أو حزنك كأمر بديهي يمر به الجميع، فإن حظوة تلك الحلقة اللعينة تزول كلياً!`,
            contentEn: `Have you ever felt stressed, and then started getting stressed about the fact that you are stressed? This is the definition of the **"Feedback Loop from Hell."**

It occurs because contemporary culture programs us to believe that negative emotions like sorrow, hesitation, or nervousness are moral failures or diseases to be immediately cured or hidden.

**How do you disarm this loop?**
Instant acceptance of ordinary human discomfort is key. By recognizing that feeling down or worried is normal, you strip the loop of its compounding destructive energy.`
          },
          {
            id: 'sa_ch1_l4',
            idNum: 4,
            titleAr: '4. محطة التثبيت: مراجعة سريعة لربط جزيئات اللامبالاة الذكية',
            titleEn: '4. Review Node: Synthesizing the Subtle Art Foundations',
            duration: '3m',
            type: 'review',
            contentAr: `لقد قطعت شوطاً رائعاً في فهم الأساس الهيكلي للتوقف عن الجري خلف سراب الإيجابية المطلقة! دعنا نلخص أهم المحطات المعرفية التي مررنا بها:

1. **اللامبالاة لا تعني البلادة:** بل تعني الاهتمام بالأشياء الأساسية والقيم الكبرى دون التفات للمزعجات والمنغصات الهامشية.
2. **قبول المعاناة إيجابي:** المحاولة الدؤوبة لتجنب الألم ليست سوى شكل من أشكال الألم بذاته.
3. **التصالح مع الهشاشة البشرية:** تذكر حكمة بوكوفسكي وحلقتها التكرارية، ترحيبك بالبؤس الطبيعي ينتهي بزواله التدريجي وتقدمك الفعلي.`,
            contentEn: `You have made wonderful progress deconstructing the first chapter! Let us synthesize the core learnings:

1. **Not Giving a F*ck is Not Indifference:** It means being entirely comfortable with being unique, standing up for your supreme values, and discarding superficial distractions.
2. **Avoiding Pain is Still Pain:** Every escape mechanism has its bills. Genuine resilience begins when you face human reality as is.
3. **The Power of Vulnerability:** Accept that experiencing hardship is a common, normal baseline of the human adventure.`
          },
          {
            id: 'sa_ch1_l5',
            idNum: 5,
            titleAr: '5. دليل النصائح والتوجيهات الذهبية قبل بوابة العبور',
            titleEn: '5. Standard Tips: Practical Guidelines Before the Gatekeeper Quiz',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه النصائح العملية والتطبيقات الذاتية السريعة التي يمكنك البدء بها اليوم قبل العبور للفصل القادم:

- **حدد طاولة أولوياتك:** اسأل نفسك باستمرار: هل هذا الشيء الهامشي (مثل مشاجرة في الطريق أو تعليق سخيف) يستحق فعلاً هدر طاقتي الذهنية الثمين اليوم؟
- **مارس الاستيقاظ المعرفي:** عند شعورك بالغضب أو القلق، قل لنفسك فوراً: "أنا قلق الآن وهذا طبيعي جداً وسيمر"، دون الدخول في دوامة تبرير القلق أو لوم الذات.
- أنت جاهز تماماً الآن لمواجهة **اختبار الفهم (Gatekeeping Quiz)** لنشاطر النقاط ونفتح الفصل التالي من المسار!`,
            contentEn: `Here are core actionable guidelines to deploy in your routine immediately before sitting for the gatekeeping verification:

- **Set Your Care Budget:** Ask yourself during minor crises: Does this trivial argument actually deserve a share of my precious mental budget today?
- **Cognitive Detachment:** When experiencing frustration, name it objectively: "I am feeling frustrated, which is natural and temporary." Do not blame yourself for being human.
- You are now ready to tackle the **Gatekeeping Quiz** to unlock Chapter 2 and accumulate your score!`
          }
        ],
        quiz: [
          {
            questionAr: "تشارلز بوكوفسكي نقش على قبره عبارة 'لا تحاول'. ما المغزى العميق وراء هذه النصيحة؟",
            questionEn: "Charles Bukowski’s gravestone read 'Don\'t Try'. What is the deep intention behind this?",
            optionsAr: [
              "أنه ينبغي التخلي عن الطموح والجلوس بلا عمل طوال الحياة.",
              "أنه يجب قبول واقعك الحقيقي ونقاط ضعفك بدلاً من محاولة تزييفها بهوس.",
              "أنه كان يكره العمل الروائي والترجمة في حياته العادية."
            ],
            optionsEn: [
              "That people should abandon goals and sit idle their entire lives.",
              "That you should fully accept your raw reality and vulnerabilities instead of obsessively trying to stage fake perfection.",
              "That he hated writing or translating during his career."
            ],
            correctIndex: 1,
            explanationAr: "توضح النصيحة أن قبول الحقيقة البسيطة لواقعك يحررك من فخ القلق وهوس المثالية ويدفعك للكتابة والعمل بصدق مطلق دون زيف.",
            explanationEn: "Accepting your natural struggles and limitations relieves you of the performance anxiety of showing fake perfection, allowing you to function with immense honesty."
          },
          {
            questionAr: "ما الذي يؤدي في الحقيقة إلى تغذية ونمو 'حلقة الجحيم التكرارية' في عقولنا؟",
            questionEn: "What actually feeds and compounds the 'Feedback Loop from Hell' in our minds?",
            optionsAr: [
              "الرفض القاطع للمشاعر السلبية والشعور بالذنب حيال غضبنا أو حزننا الطبيعي.",
              "الاستماع المستمر للموسيقى الكلاسيكية الهادئة.",
              "ممارسة الأنشطة الرياضية بانتظام في الصباح."
            ],
            optionsEn: [
              "Obsession with rejecting negative thoughts and feeling guilty for being angry or sad.",
              "Listening to peaceful classical music consistently.",
              "Participating in standard physical training regimes."
            ],
            correctIndex: 0,
            explanationAr: "عندما ترفض قبول بؤسك أو حزنك الطبيعي كإنسان، تبدأ في لوم نفسك ومقاومته داخلياً، مما يولد حلقة متصاعدة من القلق والتوتر.",
            explanationEn: "When you reject natural negative feelings, you begin judging yourself for feeling them, which adds a secondary layer of guilt that compounds the initial stress."
          },
          {
            questionAr: "وفقاً لاستراتيجيات اللامبالاة، ما هو السلوك الصحيح لإدارة المشاكل البسيطة اليومية؟",
            questionEn: "According to Manson\'s Subtle Art, what is the correct choice to handle trivial daily struggles?",
            optionsAr: [
              "الاهتمام بكل صغيرة وكبيرة وإبداء منتهى الغضب للجميع.",
              "صياغة جدول أولويات دقيق واهتمام انتقائي فقط بما يتوافق مع قيمك الكبرى والسامية.",
              "تجاهل الواقع كلياً والهروب في عالم من الأوهام والخيالات البسيطة."
            ],
            optionsEn: [
              "Giving continuous attention to every small issue and unleashing anger to maintain pride.",
              "Defining a concrete value budget and giving selective care strictly to matters that align with your highest priorities.",
              "Pretending nothing exists and escaping into complete, passive isolation."
            ],
            correctIndex: 1,
            explanationAr: "إدارة اللامبالاة بذكاء تتطلب توزيع طاقتك النفسية بحكمة بالغة لتقصرها على قضاياك الكبرى والمحببة، وتجاهل سفاسف الأمور.",
            explanationEn: "Intelligent caring requires setting a strict focus budget, distributing your mental energy toward your highest values, and shrugging off trivial annoyances."
          }
        ]
      },
      {
        id: 'sa_ch2',
        chapterNum: 2,
        titleAr: 'الفصل الثاني: وهم القصر السعيد وتحدي الباندا المفيد',
        titleEn: 'Chapter 2: The Illusion of Constant Happiness & The Superhero of Truth',
        descriptionAr: 'كشف الأوهام المتعلقة بالسعادة الدائمة وقبول فكرة أن الحياة قائمة على حل المشاكل.',
        descriptionEn: 'Why suffering is a biological constant, and why happiness comes from solving difficulties.',
        lessons: [
          {
            id: 'sa_ch2_l1',
            idNum: 1,
            titleAr: '1. حكاية بوذا الخالدة: البؤس السعيد في أرجاء القصر والبراري',
            titleEn: '1. The Buddha Legacy: The Trap of Luxury and Self-Mortification',
            duration: '4m',
            type: 'intro',
            contentAr: `نعرف جميعاً سيرة الأمير بوذا (سيدهارتا غوتاما) الذي عاش في قصر فاخر مهيأ خصيصاً ليخلو من أي حزن أو مرض أو شيخوخة. لكن الفضول دفعه للخروج ورؤية معاناة البشر بالخارج.

قرر الأمير أن يهرب مقتنعاً بأن الثراء تافه، وعاش لسنوات طويلاً في الغابات والكهوف فقيراً، يتسول طعامه متقشفاً وجائعاً.

**الخلاصة الإنسانية البارعة:**
اكتشف الأمير في النهاية أن كلا الطريقين كان زائفاً! لا الرفاهية المفرطة أزالت عنه القلق والأسئلة الأبدية، ولا الحرمان الشديد منحه التوازن والهدوء. المعاناة حقيقة ورياضة بيولوجية ملازمة لكل البشر، وهي جزء ثابت لا مفر منه من نسيج حياتنا.`,
            contentEn: `Let\'s inspect the myth of Prince Siddhartha (the Buddha). He was raised in absolute luxury, shielded from disease, aging, and sadness. Driven by curiosity, he sneaked out and saw the harsh reality of ordinary human lives.

Siddhartha fled his kingdom, believing riches were empty, and spent years in forests starving and meditating as an ascetic.

**The Ultimate Realization:**
He discovered that both extremes were illusions. Neither luxurious shielding nor extreme self-mortification resolved human suffering. Suffering is a biological constant of the human construct; you cannot outrun it.`
          },
          {
            id: 'sa_ch2_l2',
            idNum: 2,
            titleAr: '2. المشاكل كقواعد بناء: نحن لا نتذوق السعادة إلا بحلها',
            titleEn: '2. Suffering is a Biological Metric: Happiness Comes from Action',
            duration: '3m',
            type: 'core',
            contentAr: `الحياة حافلة بالمشاكل التي لا تنتهي أبداً. حل مشكلة ما في العمل أو المنزل ينتج تلقائياً مشاكل جديدة أخرى يجب التعامل معها. 

**انتبه لهذا القانون الذهبي:**
السعادة الحقيقية لا تكمن في الجحود أو غياب العقبات والتهرب منها، بل تكمن في **نشاطك الفصيح بحل هذه العقبات**. السعادة فعل، حركة، وعمل مستمر يتغذى على القبول والتطور وتجاوز الحواجز يوماً بعد آخر.`,
            contentEn: `Problems do not terminate; they merely evolve. Solving a problem in one sphere of live immediately spawns another to handle.

**Note this fundamental reality:**
Happiness does not reside in the absolute absence of obstacles; it flourishes in the **very action of resolving them**. Happiness is a dynamic state of motion, feeding on focus, determination, and persistence.`
          },
          {
            id: 'sa_ch2_l3',
            idNum: 3,
            titleAr: '3. تحدي السؤل الجوهري: ما هو حجم الألم الذي تود دفعه وثمنه؟',
            titleEn: '3. The Ultimate Strategic Question: What Pain Do You Choose to Carry?',
            duration: '4m',
            type: 'core',
            contentAr: `يسرد الكثير من الناس قائمة تفضيلاتهم: "أريد عيشاً هنيئاً، أريد المال الوفير، عائلة مثالية ووظيفة مرموقة". 

لكن السؤال الاستراتيجي الشجاع الذي يغير خارطة طريقك هو: **"ما هو نوع الألم والعذاب والجهد الذي تود بذله بكل سرور لتصل لتلك الغاية؟"**

إن رغبتك بالنجاح الرياضي تتطلب بالتأكيد التزاماً تاماً ببذل عرق ووجع العضلات فجر كل يوم داخل صالات التمرين، ورغبتك بالتفوق المعرفي والأكاديمي تتطلب مشقة الدراسة والسهر الطويل. ثمار حياتك تصاغ بتوافقك مع أثمان تلك المشقة!`,
            contentEn: `Almost everyone wants a premium income, a flawless physique, and comfortable prestige. 

But the truly path-defining question you must ask is: **"What struggles and pain are you actively willing to bear to clear the tab for that success?"**

A stellar fitness level requires waking up at dawn to execute exhausting training. Academic preeminence requires long nights of rigorous study. Your outcomes are shaped by the pricing you are prepared to cover.`
          },
          {
            id: 'sa_ch2_l4',
            idNum: 4,
            titleAr: '4. محطة التثبيت: مراجعة الفصل وتماسك المعرفة التطويرية',
            titleEn: '4. Review Node: Synthesizing Suffering and Solutions',
            duration: '3m',
            type: 'review',
            contentAr: `نصل هنا معاً لتثبيت الأركان المعرفية المذهلة للفصل الثاني:

1. **المعاناة ضرورة بيولوجية:** تُعلمنا أجسادنا وعقولنا بالأخطار وتدفعنا لاتخاذ مواقف صحيحة لتغيير مجرى تفكيرنا وسلوكنا.
2. **عجلة السعادة التفاعلية:** السعادة لا تأتي بمجرد الحصول على جائزة أو التواجد في قصر واقٍ، بل تولد وتنبت عبر حل المشاكل بنشاط.
3. **لذة العمل وصياغة الألم:** تحديد واختيار أصل الجهد الذي تود دفعه بكل شجاعة هو المؤشر الحقيقي لقيمة أهدافك الحياتية.`,
            contentEn: `Let\'s synthesize the fundamental components of this chapter as we prepare for validation:

1. **Suffering works as a biological feedback tool:** Pain tells our physical and mental systems about boundaries, driving necessary, adaptive behavioral upgrades.
2. **The Happiness Engine:** True happiness is never static or a collection of trophies. It is born from active, conscious problem-solving.
3. **The Struggle Arbitrage:** Choosing what type of exhausting effort you are eager to embrace is the ultimate determiner of your success.`
          },
          {
            id: 'sa_ch2_l5',
            idNum: 5,
            titleAr: '5. دليل نصائح وتصفيات الباندا خائب الأمل الحكيم',
            titleEn: '5. Practical Tips: Wisdom from Disappointing Panda',
            duration: '3m',
            type: 'tips',
            contentAr: `يقدم مارك مانسون بطلًا خارقاً خيالياً يرتدي قناع الباندا ويدق أبواب العائلات ليخبرهم بحقائق قاسية ولكنها مفيدة جداً (على سبيل المثال: طريقتك بالإنفاق متهورة، أو هذا الشخص لا يحبك فعلاً). 

**دروس الباندا اللطيفة المقترحة:**
- **كن صديقاً للحقيقة:** درب ذهنك على سماع الحقائق البسيطة الصادمة التي تحتاجها للتطور وتعديل مجرى السلوك، بدلاً من إسكات ضميرك بالمسكنات الإيجابية المزيفة.
- **توقف عن الندب البيولوجي:** واجه مشكلاتك بموضوعية وهدوء وهندسة مبسطة، وتذكر أن المشاكل فرصة حرة لتذوق لذة الإنجاز واكتساب مهارات عملية ناضجة.
- أنت الآن بأتم الجاهزية للعبور عبر **بوابة Verify Node** لنشاطر النتائج ونمضي بخطتك بثبات!`,
            contentEn: `Manson invents a funny superhero called "Disappointing Panda" whose superpower is visiting homes only to tell people inconvenient, uncomfortable truths they desperately need to hear.

**Core takeaways from Panda’s handbook:**
- **Embrace Uncomfortable Truths:** Train your perspective to welcome constructive feedback and cold data, rather than sedating your awareness with protective denial.
- **Accept the Challenge:** Shift your relationship with difficulties. Welcome obstacles as training weights for expanding your real skills.
- Take a deep breath and start the **Gatekeeping Quiz** to complete Chapter 2!`
          }
        ],
        quiz: [
          {
            questionAr: "ما هو الاستخلاص الأساسي لمحور الفائدة الذي ناقشناه في البداية؟",
            questionEn: "What did prince Gautama (the Buddha) discover after spending years in extreme self-privation?",
            optionsAr: [
              "أن البؤس المطلق هو الطريق السليم الوحيد لتحقيق الاستنارة العقلية.",
              "أن كلا الطريقين (الرفاهية المطلقة والتقشف المفرط) كانا أوهاماً، وأن المعاناة حقيقة بيولوجية متأصلة.",
              "أن العيش في الغابة أفضل بكثير لأنه نال هدوءاً واسترخاءً دائماً."
            ],
            optionsEn: [
              "That raw poverty and suffering is the exclusive path to mental clarity.",
              "That both extremes—limitless material comfort and severe physical starving—were illusions, and that suffering is an inescapable part of human condition.",
              "That staying in nature was superior because he gained endless relaxation."
            ],
            correctIndex: 1,
            explanationAr: "أدرك بوذا أن المعاناة جزء ملازم للوعي البشري مهما تغيرت ظروف الرخاء أو الحرمان، وبالتالي يتعين علينا قبولها والتعامل معها بنضج.",
            explanationEn: "Siddhartha realized that discomfort and worry are built-in features of human consciousness regardless of material factors, so mature acceptance is the only path."
          },
          {
            questionAr: "أين تكمن الينبوع الفعلي الفطري لمشاعر السعادة وفقاً لتعريف علم هندسة المحتوى بالكتاب؟",
            questionEn: "Where does the authentic source of happiness lie according to the core deconstruction?",
            optionsAr: [
              "في نشاطك وعملك المستمر لحل الصعاب والمشاكل المتجددة في واقعك.",
              "في الحصول على سيارة فارهة جداً والعيش طوال الوقت بسفر فاخر.",
              "في التظاهر بعدم وجود أي عوائق ونفي الصعوبات كلياً."
            ],
            optionsEn: [
              "In the active, dynamic process of solving evolving problems in your life.",
              "In owning high-end sportscars and leading a constant vacation lifestyle.",
              "In completely denying that any problems or difficulties exist."
            ],
            correctIndex: 0,
            explanationAr: "السعادة ليست تذكاراً ثابتاً بل هي عملية تفعيل وحلول مستمرة تمنح الإنسان شعوراً عميقاً بالهدف والتطور والتحسن.",
            explanationEn: "Happiness is a dynamic active state rather than a static goal. Solving actual challenges provides humans with profound meaning and direction."
          },
          {
            questionAr: "كيف يؤثر السؤال: 'ما هو تعبك الذي تود دفعه؟' على أهدافك وقراراتك الحياتية؟",
            questionEn: "How does the question 'What pain are you willing to bear?' revolutionize your life choices?",
            optionsAr: [
              "يجعلك شخصاً حزيناً ومكتئباً يرفض المبادرة خوفاً من التعب.",
              "يختصر عليك الأوهام ويربط طموحاتك بالواقع وبمدى استعدادك لدفع ثمن هذا الطموح فعلياً.",
              "يدفعك لتغيير أصدقائك بانتظام وتجنب العمل الطويل."
            ],
            optionsEn: [
              "It turns you into a depressed individual who avoids taking risks because of raw effort.",
              "It strips away comforting illusions and connects your dreams directly to reality and your concrete readiness to clear the tolls.",
              "It prompts you to change your peers regularly and escape long tasks."
            ],
            correctIndex: 1,
            explanationAr: "أن تطمح لشيء يعني بالضرورة أن تكون مستعداً لبذل الجهد والتعب المرتبط بتحقيقه، وهذا هو الثمن الحقيقي لنجاح العمل الحركي المعاصر.",
            explanationEn: "Dreaming of success requires being prepared to put in the corresponding gritty effort. It establishes a fully realistic framework for action."
          }
        ]
      },
      {
        id: 'sa_ch3',
        chapterNum: 3,
        titleAr: 'الفصل الثالث: وهم الاستثنائية (أنت لست مميزاً)',
        titleEn: 'Chapter 3: You Are Not Special (The Fallacy of Exceptionalism)',
        descriptionAr: 'تفكيك ثقافة تقدير الذات المنتفخة وقبول فكرة أن معظم حياتنا تقع في حيز عادي ومبسط.',
        descriptionEn: 'Deconstructing hyper-inflated self-esteem and embracing the beauty of being ordinary.',
        lessons: [
          {
            id: 'sa_ch3_l1',
            idNum: 1,
            titleAr: '1. بطل الرواية المزيف: فخ الشعور بالاستحقاق المفرط',
            titleEn: '1. The Entitlement Trap: Feeling Deserved without Performing',
            duration: '4m',
            type: 'intro',
            contentAr: `في طفرة التنمية في أواخر القرن الماضي، نشأت فكرة خاطئة مبادؤها: "يجب أن يشعر الجميع بأنهم استثنائيون ومختلفون ليكونوا سعداء". 
            
لقد أنتج هذا جيلاً كاملاً يعتقد في قرارة نفسه بأنه يستحق النجاح الساحق والامتيازات دون بذل عمل شاق حقيقي.

**ما هو فخ الاستحقاق اللاشعوري؟**
هو عندما تعتقد بأن مشاكلك فريدة من نوعها وبالتالي تستحق معاملة خاصة من العالم، وهو ما يسلبك العزيمة والتحسين الفعلي ويرميك في عزلة الشكوى العقيمة.`,
            contentEn: `In the self-esteem craze of the late 20th century, a dangerous doctrine was born: "Everyone is special and born to rule."

This created a generation believing they are inherently entitled to grand benefits and continuous applause without having to put in the gritty effort.

**What is Entitlement?**
The subconscious conviction that your problems are more profound than anyone else's, which justifies special treatment. This delusion saps your drive for actual self-improvement.`
          },
          {
            id: 'sa_ch3_l2',
            idNum: 2,
            titleAr: '2. منحنى بيل والتوزيع الطبيعي: الحياة تقع في المنتصف دائماً',
            titleEn: '2. The Bell Curve of Reality: Most of life is beautifully mediocre',
            duration: '3m',
            type: 'core',
            contentAr: `تأمل التوزيع الطبيعي أو منحنى بيل (Bell Curve) لإحصائيات البشر:
            
بينما يوجد قلة بارعة في قمة الهرم وأخرى تعاني في أسفله، تقع الأغلبية الساحقة من تجاربنا وحياتنا اليومية في **الوسط العادي البسيط**.

**سحر قبول العادية:**
أن تقبل فكرة أنك لست عبقرياً دائماً أو بطلاً سينمائياً ليس معناه الاستسلام للكسل؛ بل هو تحرير مطلق لضغط التوقعات غير الواقعية البائسة والبدء الفعلي بالتحسن التدريجي والهادئ كإنسان حقيقي.`,
            contentEn: `Let's look at the Bell Curve of human capability. While there are extreme outliers at the top and bottom, the vast bulk of our hours and achievements fall into the warm, standard middle.

**The power of being ordinary:**
Accepting that you are not constantly brilliant or destined for cinematic fame is not lazy submission; it is a liberating detachment from extreme pressure. It permits you to grow step-by-step without shame.`
          },
          {
            id: 'sa_ch3_l3',
            idNum: 3,
            titleAr: '3. مهارات البساطة: تقدير الإنجازات الصغيرة وتجنب صخب الشهرة',
            titleEn: '3. Standard Tips: Celebrating Small Accomplishments',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه الارشادات العملية من الفصل الثالث:
            
- **تمتع بالأنشطة العادية:** قدر لذة شرب كوب قهوة دافئ، تنمية مهارة بسيطة، أو قضاء وقت مع العائلة، دون الهلع من عدم تصدرك قائمة الأكثر ثراءً.
- **قيم دوافعك اللاشعورية:** اسأل نفسك باستمرار: هل أقوم بهذا العمل لأنني أحبه حقاً وأطمح لتفعيل قيم كبرى، أم لمجرد الحصول على مديح فارغ وإشباع غروري؟`,
            contentEn: `Pragmatic tools to ground your perspective today:
            
- **Value mundane behaviors:** Reclaim the simple pleasures—enjoying a nice coffee, reading a classic book, or speaking to a loved one—without feeling guilty for not trending on social media.
- **Audit your intent:** Ask yourself: Am I building this project out of genuine care and values, or am I merely chasing applause and validation to feed a fragile ego?`
          }
        ],
        quiz: [
          {
            questionAr: "ما هو الخلل البنيوي الرئيسي الذي تسببه عقيدة الاستحقاق المفرط؟",
            questionEn: "What is the primary vulnerability caused by the entitlement trap?",
            optionsAr: [
              "تجعل الفرد محفزاً للعمل المتواصل فجر كل يوم.",
              "تسلب الفرد الحافز وتحبسه في دوامة لوم الآخرين والمطالبة بمعاملة تفضيلية بلا عمل.",
              "تؤدي لانخفاض مؤشرات التضخم بالأسواق الاستثمارية."
            ],
            optionsEn: [
              "It keeps people highly motivated to wake up at dawn and execute tasks.",
              "It drains the drive to improve, trapping the individual in complaints and expecting special treatment without paying the dues.",
              "It directly decreases overall inflation across consumer markets."
            ],
            correctIndex: 1,
            explanationAr: "الشعور المزيف بالاستحقاق يمنع صاحبه من رؤية أخطائه الحقيقية وبالتالي يجمد مسار نموه واستقلاله.",
            explanationEn: "Entitlement prevents you from addressing your actual development gaps, blocking both active learning and career progression."
          },
          {
            questionAr: "كيف يفيدنا قبول حقيقة أن معظم مفاصل حياتنا تقع في حيز التوزيع العادي؟",
            questionEn: "How does accepting that most of life resides in the mediocre middle help us?",
            optionsAr: [
              "يجعلنا نشعر بالإحباط الشديد ونفقد كافة الطموحات الحيوية.",
              "يحررنا من صخب التوقعات الزائفة والإرهاق النفسي لنبني مهاراتنا بصدق وتقدم حقيقي.",
              "يسهم في زيادة ديون البنوك وسرعة استهلاك الممتلكات الشخصية."
            ],
            optionsEn: [
              "It triggers intense depression and causes immediate abandonment of career targets.",
              "It liberates us from the anxiety of forced perfection, letting us develop our actual skills with clean focus.",
              "It drives up retail debt and accelerates the wearing out of private items."
            ],
            correctIndex: 1,
            explanationAr: "التحرر من هوس الاستثنائية هو نقطة الانطلاق الفعلي لبناء التميز الحقيقي بسلام روحي ورزانة عقلية.",
            explanationEn: "Detoxifying from the desperate craving to be unique allows you to focus quiet, real energy on incremental skill growth."
          }
        ]
      },
      {
        id: 'sa_ch4',
        chapterNum: 4,
        titleAr: 'الفصل الرابع: دافع الألم (قيمة المعاناة والمقاييس السامقة)',
        titleEn: 'Chapter 4: The Value of Suffering & Choosing Better Metrics',
        descriptionAr: 'اختيار القيم النبيلة وتأسيس معايير تفوقك الشخصية بدلاً من المقاييس السطحية المدمرة للذات.',
        descriptionEn: 'How to structure your values, adopting healthy standards of success instead of toxic external metrics.',
        lessons: [
          {
            id: 'sa_ch4_l1',
            idNum: 1,
            titleAr: '1. لغز المقياس الزائف: هل تقيس حياتك بالسيارة أم بالقيمة؟',
            titleEn: '1. Metric Deconstruction: How Do You Score Your Life?',
            duration: '4m',
            type: 'intro',
            contentAr: `المشكلة ليست دائماً في حدوث المصاعب، بل تكمن في **المقياس** الذي تستخدمه لتقييم نجاحك وسعادتك.

تأمل سيرة الموسيقار "ديف مستاين" الذي طُرد من فرقة ميتاليكا قبل شهرة الفرقة الشهيرة. أسس مستاين فرقة جديدة وباع ملايين الأقراص؛ لكنه ظل يقارن نفسه بميتاليكا ويشعر بالفشل والخيبة طوال حياته لأن مقياس نجاحه المعتمد كان "أن أكون أكثر مبيعاً من ميتاليكا".

**طبيعة المقاييس المدمرة:**
عندما تربط سعادتك بأرقام حسابات الآخرين أو مظاهرهم، فإنك تبيد استقرارك الروحي والمهني بالكامل.`,
            contentEn: `Problems are inevitable, but the **metrics** you utilize to evaluate those problems determine your mental well-being.

Consider David Mustaine, who was kicked out of Metallica right before they became global legends. Mustaine founded Megadeth, sold millions of albums, yet felt like a certified failure because his metric was: "Be more successful than Metallica."

**The trap of exterior metrics:**
When your metrics are external and beyond your direct control, you guarantee constant anxiety and chronic dissatisfaction.`
          },
          {
            id: 'sa_ch4_l2',
            idNum: 2,
            titleAr: '2. مقاييس خائبة ومقاييس بطلة: تفصيل القيم البنائية والهدامة',
            titleEn: '2. Toxic vs. Healthy Metrics: Structuring Inward Values',
            duration: '3m',
            type: 'core',
            contentAr: `يقسم مانسون المقاييس والقيم الحياتية إلى قسمين حاسمين:
            
1. **المقاييس السيئة (الهدامة):** قيم خارجية، غير خاضعة لسيطرتك، سطحية وغير نافعة (مثل المظاهر التفاخرية، السعي للذة اللحظية، الرغبة بالسيطرة وشعبية الوشاة).
2. **المقاييس الحسنة (البنائية):** قيم داخلية، خاضعة لسيطرتك بالكامل، وتخدم تحسن المجتمع (مثل الصدق المطلق، الابتكار، صيانة النفس، مساعدة الآخرين، التسامح والتواضع).

العادات المالية والمهنية الصامدة تتغذى دائماً وتنمو في كنف المقاييس الداخلية الرصينة التي تحميك من طقس الظروف المتقلّب.`,
            contentEn: `Manson distinguishes between supportive and self-defeating standards:

1. **Poor Metrics (Toxic):** External, socially-driven, fragile, and beyond your immediate influence (e.g., constant praise, flashy lifestyles, dominance over others).
2. **Good Metrics (Pragmatic):** Internal, controllable, values-driven, and supportive of growth (e.g., radical honesty, learning from struggles, creative service).

Long-range financial and occupational health derives exclusively from adopting these inward metrics.`
          },
          {
            id: 'sa_ch4_l3',
            idNum: 3,
            titleAr: '3. تحديث البوصلة: كيفية صياغة وتحديث مقاييس نجاحك اليومية',
            titleEn: '3. Standard Tips: Recalibrating Your Standards of Living',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه الممارسات الذاتية لتطوير مقاييسك:
            
- **هندسة التخلي:** اكتب ثلاثة أشياء صاخبة كدت تهدر طاقتك من أجلها بالأمس، وأعلن صراحة تنازلك الفطن عنها لتفسح المجال لقضية حركية كبرى.
- **تأكيد السيادة الداخلية:** في المرة القادمة التي تراودك فيها خيبة عدم حصولك على مديح، استبدل المقياس فوراً بمبدأ: "هل قمت بعملي اليوم بأعلى كفاءة وأمانة ممكنة؟"، فذاك وحده ملك يديك.`,
            contentEn: `Actionable habits to upgrade your metrics starting now:
            
- **The Decoupling list:** Document three stressful occurrences from yesterday that are beyond your control, and consciously decline to worry about them.
- **Inward validation shift:** When you feel left out or unappreciated, refocus on your core standard: "Did I execute my duties today with immaculate integrity and focus?"`
          }
        ],
        quiz: [
          {
            questionAr: "لماذا شعر ديف مستاين بالخيبة على الرغم من نجاحه الموسيقي والمالي الهائل؟",
            questionEn: "Why did David Mustaine feel like a failure despite Megadeth’s massive success?",
            optionsAr: [
              "لأنه لم يتمكن من كسب أي أموال من حفلاته وعاش فقيراً.",
              "لأنه اعتمد مقياس نجاح خارجي تدميري يرتكز على ضرورة التفوق على فرقة ميتاليكا.",
              "بسبب خلافاته المستمرة مع عائلته وأصدقائه الأكاديميين."
            ],
            optionsEn: [
              "Because Megadeth never generated any income and he lived in poverty.",
              "Because he chose a toxic, external metric focused on outperforming Metallica, ignoring his own success.",
              "Due to persistent friction with his academic family members."
            ],
            correctIndex: 1,
            explanationAr: "تغيير وتثبيت مقياس التقييم المعرفي والذاتي يغير نبرة مشاعرك بالكامل تجاه الإنجازات المحسوسة.",
            explanationEn: "Your metrics dictate your perception. Selecting uncontrollable external comparisons produces chronic unhappiness."
          }
        ]
      },
      {
        id: 'sa_ch5',
        chapterNum: 5,
        titleAr: 'الفصل الخامس: السيادة والمسؤولية المطلقة ومكتسب النهاية',
        titleEn: 'Chapter 5: Raw Responsibility & Embracing Death',
        descriptionAr: 'تولي المسؤولية الكاملة عن استجابتك وتوجيه العقل نحو الصدق الكوني ومواجهة حقيقة النهاية.',
        descriptionEn: 'Taking absolute ownership of your choices and finding clarity through mortality reflection.',
        lessons: [
          {
            id: 'sa_ch5_l1',
            idNum: 1,
            titleAr: '1. قانون ملكية المشاكل: الفارق بين الخطأ والمسؤولية',
            titleEn: '1. Fault vs. Responsibility: Taking Command of Your Life',
            duration: '4m',
            type: 'intro',
            contentAr: `قد لا تكون مخطئاً في حدوث المأساة أو تعرضك للخسارة، ولكنك **مسؤول مسؤولية تامة وكاملة** عن كيفية استجابتك وتعاملك معها.

**الفصل الحاسق بين المفاهيم:**
- **الخطأ (Fault):** يرتبط بالماضي وبالفعل الذي أدى لحدوث الأزمة (مثلاً شخص تسبب بحادث لسيارتك).
- **المسؤولية (Responsibility):** ترتبط باللحظة الحالية وبالقرارات والخطوات التي ستتخذها لتجاوز الموقف وتعديل مسارك المالي والمهني.

عندما تتوقف عن لعب دور الضحية وتبسط سيطرة المسؤولية، تملك زمام المبادرة والقدرة الفطرية على التطوير المستقل.`,
            contentEn: `You may not be at fault for the tragedy that touches your path, but you are **entirely responsible** for how you choose to process and react to it.

**The critical boundary:**
- **Fault:** Belongs to the past and names who caused the issue (e.g., someone breaking your equipment).
- **Responsibility:** Belongs to the present moment and defines your actions to resolve the damage and steer your career.

When you step out of victimhood and claim ownership, you unlock your real power to progress.`
          },
          {
            id: 'sa_ch5_l2',
            idNum: 2,
            titleAr: '2. مفارقة الموت السكيني: تذكار الفناء كعدسة ذهبية لتنقية الزيف',
            titleEn: '2. The Mortality Mirror: Death as the Canvas of Vital Priorities',
            duration: '3m',
            type: 'core',
            contentAr: `يبسط مانسون الفصل الأخير بعبارة إيقاظ جليلة: **"الموت هو المقياس الوحيد الذي تعود به كل المقاييس والهموم التافهة لمكانها العادي البسيط"**.

عند مواجهة وعيك بحقيقة فنائنا المضمون عاجلاً أم آجلاً، تذوب تلقائياً صور القلق المفرط وخوف الاستعراض التفاخر، ويسيل تيار الأفكار لينقى ويرسو فقط على رصيف القيم الحقيقية والعطاء البديع الذي تود تركه خلفك للأجيال والوطن.`,
            contentEn: `Manson grounds the finale with an unshakeable wake-up call: **"Mortality is the single prism that exposes the profound triviality of our phantom worries."**

In the cold light of your guaranteed physical end, superficial status anxieties and ego disputes instantly evaporate. What remains are the core values, pure growth, and the beautiful academic legacy you aim to leave behind.`
          },
          {
            id: 'sa_ch5_l3',
            idNum: 3,
            titleAr: '3. تثبيت السيادة المعرفية: تمرين المسؤولية ومراجعة الدستور',
            titleEn: '3. Standard Tips: Embedding Radical Ownership Daily',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه التطبيقات لامتلاك السيادة الختامية:
            
- **تحويل الشكوى إلى خطة عمل:** اكتب شكوى واحدة تكررها يومياً، وتحمل فوراً مسؤولية إيجاد حل مستقل ومباشر لها دون انتظار الآخرين.
- **تقييم الفناء (Memento Mori):** تأمل لمدة دقيقتين كل صباح حقيقة أن أوقاتنا معدودة ومحدودة للغاية، لتركز جهدك وعلمك بالكامل في صلب الأصول السامقة والتحسين الفطن.`,
            contentEn: `Actionable steps to embed extreme ownership into your days:
            
- **Victimhood Detox:** Select one recurring complaint in your schedule, and outline three direct steps you will take to resolve it yourself without waiting for others.
- **The Finite Scope Check (Memento Mori):** Realize every morning that your schedule is limited. This clarity suppresses distraction and drives you to focus strictly on real educational assets.`
          }
        ],
        quiz: [
          {
            questionAr: "ما هو الفارق الجوهري الفاصل بين الخطأ والمسؤولية في معالجة العقبات؟",
            questionEn: "What represents the absolute boundary between Fault and Responsibility?",
            optionsAr: [
              "الخطأ يمثله الضرائب والمسؤولية يمثلها صك البنوك المالية.",
              "الخطأ يبحث فيمن تسبب بالأزمة بالماضي، بينما المسؤولية تبسط سيادتها لتحدد رد فعلك وإجراءك الحركي الحالي لتجاوزها.",
              "الخطأ اختيار فردي بينما المسؤولية عقد حكومي موجه."
            ],
            optionsEn: [
              "Fault is defined by corporate tax codes, while responsibility refers to banking bonds.",
              "Fault points to who triggered the issue in the past, while Responsibility dictates your present actions and logical steps to move beyond it.",
              "Fault is a personal choice while responsibility represents a state contract."
            ],
            correctIndex: 1,
            explanationAr: "توطيد المسؤولية المطلقة يمنحك المفاتيح الحركية لإدارة أعمالك والاستثمار في نفسك بدلاً من تبديد عمرك في لوم البيئة.",
            explanationEn: "Claiming complete responsibility equips you with the autonomy and persistence required to shape your financial and personal path."
          }
        ]
      }
    ]
  },
  {
    id: '7_habits',
    titleAr: 'العادات السبع للناس الأكثر فعالية',
    titleEn: 'The 7 Habits of Highly Effective People',
    authorAr: 'ستيفن كوفي',
    authorEn: 'Stephen Covey',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    descriptionAr: 'منظومة تنموية شاملة تستند إلى المبادئ الكونية والاستقلال والتعاضد الحياتي الفطن.',
    descriptionEn: 'A masterwork on building personal and interpersonal effectiveness through core principles.',
    isLocked: false,
    chapters: [
      {
        id: '7h_ch1',
        chapterNum: 1,
        titleAr: 'الفصل الأول: النصر الشخصي - من التبعية إلى الاستقلال الحقيقي',
        titleEn: 'Chapter 1: Private Victory - From Dependence to Independence',
        descriptionAr: 'إتقان العادات الثلاث الأولى (المبادرة، الرؤية، الفاعلية) لتحقيق السيطرة التامة على الذات.',
        descriptionEn: 'Mastering the first three habits (Proactivity, Vision, Priority) to attain absolute self-mastery.',
        lessons: [
          {
            id: '7h_ch1_l1',
            idNum: 1,
            titleAr: '1. كن مبادراً: صياغة الاستجابة في دائرة التأثير الفطن',
            titleEn: '1. Be Proactive: Shaping Responses in your Circle of Influence',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك يا صديقي المتميز في كتاب ستيفن كوفي البديع. العادة الأولى هي **مبدأ المبادرة** وحرية الاختيار. 

**لماذا هذا المفهوم مهم؟**
البشر نوعان: مبادرون يدركون أن السلوك نابع من قرار واعٍ، وجريئون أمام الظروف؛ وانفعاليون يتأرجحون مع الطقس والموازين الخارجية ويلومون عقبات بيئتهم بصفة دائمة.

**ماذا ستستفيد من هذا الدرس**
أنت تمتلك فجوة زمنية بين **المثير والاستجابة**، داخل تلك الفجوة تكمن حريتك وقدرتك على صياغة ردود أفعالك. المبادرة تعني تحريك طاقتك داخل **دائرة التأثير** (الأشياء التي تملك تغييراً فعلياً لها) عوضاً عن تشتيتها في دائرة الهموم التي لا تملك نفعاً تجاهها.`,
            contentEn: `Welcome, student, to Stephen Covey's classic. The first habit is **the Principle of Proactivity**.

**Why is this concept important?**
Effective individuals recognize that their behavior is a product of their own conscious decisions based on values, rather than a product of their conditions, circumstances, or feelings.

**What is your takeaway?**
Between the **stimulus and response**, there is a gap. Within that gap lies our supreme freedom to choose our response. Proactive people focus their efforts on their **Circle of Influence** rather than wasting energy on their Circle of Concern.`
          },
          {
            id: '7h_ch1_l2',
            idNum: 2,
            titleAr: '2. ابدأ والغاية في ذهنك: رصيد الرؤية وصياغة الرسالة الشخصية',
            titleEn: '2. Begin with the End in Mind: Personal Mission Statement',
            duration: '3m',
            type: 'core',
            contentAr: `البدء والغاية في ذهنك يتأسس على حقيقة أن الأشياء **تُبنى مرتين**: بناء ذهني أولاً (تصميم ورؤية)، وبناء مادي ثانياً (تنفيذ على أرض الواقع).

**ماذا يعني ذلك لك؟**
إذا لم تنشئ رؤية مستقلة خاصة بك، فإنك تمنح الآخرين والظروف سلطة تصميم مستقبلك بالنيابة عنك. 

**التطبيق العملي الفوري:**
صياغة **رسالة شخصية مستقلة** تصف مبادئك وقيمك الكبرى التي ترغب في العيش وفقها. هذه الرسالة ستعمل كبوصلة ملاحية ثابتة ترشد سفينتك وسط عواصف الحياة اليومية وتقلباتها المتكررة.`,
            contentEn: `Beginning with the end in mind is based on the reality that all things are **created twice**: a first mental creation (vision, design), and a second physical creation (execution in the real world).

**What does this mean for you?**
If you do not proactively define your personal vision, you slide into allowing other priorities, and your circumstances, to shape your destination.

**Core takeaway:**
Creating a **Personal Mission Statement** centered on principles is your ultimate steering compass. It acts as an anchor guiding your decisions and keeping your behaviors aligned with your deepest goals.`
          },
          {
            id: '7h_ch1_l3',
            idNum: 3,
            titleAr: '3. ابدأ بالأهم قبل المهم: مصفوفة الأولويات وإدارة الوقت الذاتية',
            titleEn: '3. Put First Things First: Living in Quadrant II of Priority',
            duration: '4m',
            type: 'core',
            contentAr: `العادة الثالثة هي التنزيل العملي والتنفيذي للعادة الأولى والثانية. هي بناء الانضِباط الذاتي لتنظم عملك اليومي بناءً على ترتيب الأهمية لا الطوارئ الزائفة.

ينبهنا كوفي إلى تصنيف أنشطتنا عبر **مصفوفة من أربعة مربعات**:
- المربع الأول: عاجل وهام (الأزمات والمشكلات الطارئة).
- المربع الثاني: **غير عاجل وهام** (التحضير الذاتي، التطوير، بناء العلاقات، التدريب والتخطيط).
- المربع الثالث: عاجل وغير هام (المقاطعات السخيفة، بعض الاجتماعات والصراعات الخارجية).
- المربع الرابع: غير عاجل وغير هام (سفاسف الأمور، تضيع الوقت والتسويف).

**كيف تتغلب على تشتتك؟**
الناجحون يقضون معظم أوقاتهم الإبداعية داخل **المربع الثاني** (الوقاية البناءة)، لأن الاستثمار المهني المبكر فيه يقلص تدريجياً حجم أزمات المربع الأول ويحميك تماماً من جحيم الاحتراق والضغوط اليومية الطارئة!`,
            contentEn: `The third habit is the physical execution of your values. It represents personal management—organizing and implementing activities based on priority rather than false urgency.

Covey classifies our daily behaviors into **four quadrants**:
- Quadrant I: Urgent & Important (Crises, fires, pressing problems).
- Quadrant II: **Not Urgent & Important** (Preparation, preventive training, planning, relationship building).
- Quadrant III: Urgent & Not Important (Trivial interruptions, popular meetings, minor duties).
- Quadrant IV: Not Urgent & Not Important (Time wasters, escape activities, idle surfing).

**How do you progress?**
Principled scholars reside mostly in **Quadrant II**. Preparing early reduces the frequency of urgent emergencies in Quadrant I and preserves your peace of mind.`
          },
          {
            id: '7h_ch1_l4',
            idNum: 4,
            titleAr: '4. محطة التثبيت: مراجعة العبور للنصر الشخصي الرائع',
            titleEn: '4. Review Node: Foundations of Private Victory',
            duration: '3m',
            type: 'review',
            contentAr: `لقد أنجزت عملاً خارقاً في تفكيك منظومة النجاح الشخصي الداخلي! دعنا نثبت أهم المحاور والمبادئ الكبرى:

1. **المبادرة التامة:** قراراتك وسلوكياتك هي نتاج اختيارك الواعي، ونشاطك منصب بذكاء داخل دائرة تأثيرك فقط.
2. **الابتكار الثنائي للأهداف:** كل إنجاز يصاغ في الوعي أولاً عبر صهر الرؤية وصياغة رسالة واضحة ترسم خطوط غايتك المستقبلية.
3. **عيش المربع الثاني:** تنظيم الوقت الموجه لتكريس الجهد في الأنشطة الهامة وغير العاجلة (الوقاية والتطوير الذاتي والتمكين المعرفي الشامل).`,
            contentEn: `You have completed the structural foundation of Private Victory! Let us synthesize the cornerstone concepts:

1. **Be Proactive:** Your reactions are conscious choices. Direct your energy inward into expanding your Circle of Influence.
2. **Vision First:** Design the schematic blueprint before launching physical works. Build a core Personal Mission Statement.
3. **Quadrant II Mastery:** Dedicate your prime blocks to Important but Not Urgent preventative actions.`
          },
          {
            id: '7h_ch1_l5',
            idNum: 5,
            titleAr: '5. دليل النصائح الذهبية للتحفيز وصياغة البوصلة الفردية',
            titleEn: '5. Practical Tips: Designing your Vision Compass',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث نصائح وتدريبات عملية لتنصيب العادات الثلاث الأولى في جدولك من اليوم:

- **اختبار الكلمات:** استبدل لغة التذمر والانفعال (ليس بيدي شيء، هذا طبعي) بلغة المبادرة والقرار الواعي (دعنا نبحث عن خيارات أخرى، أستطيع تعديل الخطة الفنية).
- **التخطيط الأسبوعي:** رتب غاياتك أسبوعياً لا يومياً لتمنح نفسك فرصة استباقية ممتازة لجدولة المربع الثاني من ركائز وتنميات وصحة وبناء مهاري متميز.
- **تمرين دائرة التأثير:** عند مواجهة أي مشكلة قادمة، حدد الأجزاء التي تملك مفتاح تعديلها مباشرة وابدأ بها فوراً، وتجاهل الباقي تماماً كضوضاء هامشية.
- تقدم الآن بثقة وباشر **Gatekeeper Exam** لنشاطر وتكسب الـ XP الممتاز!`,
            contentEn: `Here are three dynamic guidelines to deploy these habits inside your routine:

- **Check Your Semantics:** Replace passive descriptions ("I can't", "I have to") with proactive verbs ("Let's check alternatives", "I choose to").
- **Weekly Structuring:** Plan your block goals on a weekly axis to shield important Quadrant II items from daily interruptions.
- **Influence Triage:** In obstacles, separate components you control from those you don't. Work first on what you can change.
- Sit for the **Gatekeeper Exam** to confirm Chapter 1 completion and secure your points!`
          }
        ],
        quiz: [
          {
            questionAr: "تتأسس العادة الأولى 'كن مبادراً' على فجوة هامة ومثيرة. ما هي؟",
            questionEn: "Habit 1 ('Be Proactive') centers on a pivotal space in human awareness. What is it?",
            optionsAr: [
              "فجوة زمنية بسيطة بين الذكاء الصناعي والبشري.",
              "الفجوة بين المثير أو الحدث الخارجي والاستجابة الواعية التي يختارها الفرد.",
              "فترة الراحة اليومية للاسترخاء والتأمل الروحي."
            ],
            optionsEn: [
              "A minor structural delay between artificial and human intelligence.",
              "The cognitive gap between external stimulus and our selected responsive behavior.",
              "The basic physical break allocated for resting during intense shifts."
            ],
            correctIndex: 1,
            explanationAr: "بين المثير والاستجابة تكمن حريتنا المطلقة وقوتنا الذهنية كبشر لاختيار وتعديل تصرفاتنا استناداً للمبادئ العميقة والواعية.",
            explanationEn: "Between stimulus and response, humans possess the unique capability to select their behaviors, establishing ethical control over circumstances."
          },
          {
            questionAr: "ما المغزى من العادة الثانية 'ابدأ والغاية في ذهنك' ودستور الرسالة الشخصية؟",
            questionEn: "What is the primary objective of Habit 2 ('Begin with the End in Mind') and the Personal Mission Statement?",
            optionsAr: [
              "المحاكاة الذهنية للأهداف لكي لا نبدأ أي تنفيذ مادي قبل تصميم الرؤية ببوصلة مستقلة متفقة مع المبادئ.",
              "الحصول على أرباح تجارية سريعة من الاستثمار العقاري والمالي.",
              "تجنب المبادرة والانتظار حتى تسنح الفرصة سهلة دون جهد."
            ],
            optionsEn: [
              "Designing the mental blueprint first so physical efforts are shaped by a unified vision anchored on principles.",
              "Securing rapid financial returns from dynamic high-yield investments.",
              "Avoiding hard tasks and waiting passively for circumstances to fall in your favor."
            ],
            correctIndex: 0,
            explanationAr: "كل شيء يُشيد مرتين: بناء معنوي أولاً عبر الرؤية والرسالة، وبناء مادي ملموس يتطابق مع هذا التصميم الواعي الشجاع.",
            explanationEn: "All achievements are created twice: first through mental formulation, then through targeted physical execution according to that blueprint."
          },
          {
            questionAr: "وفقاً لمصفوفة كوفي، أين يقضي الناجحون وأصحاب الفعالية معظم أوقاتهم؟",
            questionEn: "According to Stephen Covey's matrix, where do highly effective people spend most of their time?",
            optionsAr: [
              "داخل المربع الأول لتوفير حلول فورية دائمة لكل المشاكل المفاجئة والأزمات الطارئة.",
              "داخل المربع الثاني (هام وغير عاجل) لجدولة التخطيط المستقبلي والوقاية والتطوير والتثقيف المعرفي الذاتي.",
              "داخل المربع الثالث للمقاطعة المستمرة وتلبية الطوارئ الهامشية."
            ],
            optionsEn: [
              "Staying in Quadrant I to supply immediate fire-fighting solutions to all constant emergencies.",
              "Residing in Quadrant II (Important but Not Urgent) to foster prevention, relationship-building, self-renewal, and planning.",
              "In Quadrant III handling urgent but non-valuable external distractions."
            ],
            correctIndex: 1,
            explanationAr: "المربع الثاني يستثمر في بناء مهارات متينة ووقاية استباقية ذكية تقلل تلقائياً من حجم الأزمات الطارئة مستقبلاً.",
            explanationEn: "Quadrant II focuses on prevention, strategy, and education. Investing here minimizes the frequency of future crises and burnout."
          }
        ]
      },
      {
        id: '7h_ch2',
        chapterNum: 2,
        titleAr: 'الفصل الثاني: النصر الجماعي - من الاستقلال الفردي إلى التعاضد الفطن والتعاون المشترك',
        titleEn: 'Chapter 2: Public Victory - Navigating Synergy and Mutual Interdependence',
        descriptionAr: 'قوة العادات التعاونية (المنفعة للجميع، الفهم المتعاطف، التكاتف السحري) لصناعة إنجازات جماعية مذهلة.',
        descriptionEn: 'Fostering collective success (Win-Win, Empathy, Synergy) to deliver unmatched organizational results.',
        lessons: [
          {
            id: '7h_ch2_l1',
            idNum: 1,
            titleAr: '1. تفكير المنفعة للجميع (ربح/ربح): فلسفة المصلحة المتبادلة والصدق التعاقدي',
            titleEn: '1. Think Win-Win: The Philosophy of Mutual Benefit and Abundance Mindset',
            duration: '4m',
            type: 'intro',
            contentAr: `التحول من الاستقلال الفردي إلى التعاون والتعاضد يتطلب عقلية مختلفة جداً: وهي عقلية **المنفعة المتبادلة (ربح/ربح)**.

**ما هو هذا المفهوم الجميل؟**
هو ليس تقنية بل معتقد عميق يفترض أن الحياة ساحة خصبة للمشاركة وليست حلبة مصارعة تنافسية. عقلية **الوفرة** تؤمن بأن هناك مكاناً كافياً لنجاح الجميع، على عكس عقلية الشح التي ترى نجاح الآخر سرقة لفرصتك الشخصية.

**ماذا ستستفيد من هذا الدرس**
تفاوض بنية البحث عن حلول ترضي الطرفين، وفي حال تعذر ذلك، تذكر الخيار الاسترايجي الذكي: **(ربح/ربح أو لا جلب / No Deal)**؛ وهو حماية رصيد المبادئ والانسحاب بلطف وتقدير متبادل.`,
            contentEn: `Transitioning from self-independence to team-interdependence requires an entirely different mindset: **Win-Win Thinking**.

**What is this noble framework?**
Win-Win is not a clever trick; it is a philosophy of human interaction. It comes from an **Abundance Mindset**—believing there is plenty of success to share for everybody, unlike a Scarcity Mindset which views others' gains as your losses.

**What is the core takeaway?**
Commit to resolutions that satisfy both parties. If a mutual win is impossible, embrace the mature back-up choice: **Win-Win or No Deal**. It preserves core principles and prevents compromise on values.`
          },
          {
            id: '7h_ch2_l2',
            idNum: 2,
            titleAr: '2. اسع أولاً لتبادل الفهم: الاستماع التعاطفي وتثبيت العلاقات الاجتماعية',
            titleEn: '2. Seek First to Understand: The Art of Empathic Listening',
            duration: '3m',
            type: 'core',
            contentAr: `العادة الخامسة هي أقوى مفتاح للتواصل البشري الشجاع والعميق. يرتكب الغالبية فخ الاستماع بهدف **الرد وتجهيز الحجج الفلسفية السهلة**، بدلاً من الاستماع بهدف **فهم وقبول وتقبل منظور الطرف الآخر**.

**دروس الاستماع الواعي التعاطفي:**
الاستماع التعاطفي يتطلب الغوص في عمق المشاعر والأفكار والدوافِع الكامنة خلف الكلمات، والنظر بعين وقلب من يصغي لمخاوف واحتياجات شريكه.

**الأثر الملموس في العلاقات:**
عندما يشعر الفرساء والأصدقاء بأنهم فُهموا بعمق واحترام متبادل، ينخفض دفاعهم النفسي فوراً، وتفتح أبواب التفاهم الصادق والعمل البناء بمرونة فائقة.`,
            contentEn: `The fifth habit represents the bedrock of highly effective communication. Most people evaluate conversations intending to **reply rather than to thoroughly understand**.

**Core empathic behaviors:**
Empathic listening requires stepping inside the speaker's frame of reference. You listen to understand emotion, intent, and deeper needs, not just literal words.

**The functional impact:**
When collaborators feel deeply heard and validated, their psychological defenses drop. Air is restored to the relationship, creating fertile ground for resolving clashes.`
          },
          {
            id: '7h_ch2_l3',
            idNum: 3,
            titleAr: '3. التعاضد والتكاتف (التآزر): صناعة المستحيل عبر دمج طاقات الاختلاف',
            titleEn: '3. Synergize: Creating Magic by Valuing and Integrating Differences',
            duration: '4m',
            type: 'core',
            contentAr: `التعاضد (التآزر) هو الغاية النهائية والثمرة اليانعة لكل العادات السابقة. الفلسفة الأساسية له بسيطة ولكنها خارقة: **"الكل أكبر بكثير من مجموع الأجزاء" (1 + 1 = 3 أو أكثر!)**.

**كيف نتآزر بذكاء؟**
التعاون والتآزر لا يعني الاتفاق والتطابق الأعمى في الآراء والمخرجات، بل يعني **احترام وقبول ودمج الخلافات** الفكرية والمهارية، وتسليط الضوء على مكامن قوة بعضنا لتعويض نقاط ضعف الآخر.

**صياغة الحل البديل الثالث:**
عند حدوث خلاف، اسع بكل ذكاء مع شريكك لابتكار **الحل الثالث**؛ وهو فكرة جديدة مبتكرة ترضي الجميع وتتفوق كلياً على وجهات النظر الفردية الضيقة المنفصلة!`,
            contentEn: `Synergy is the culmination and practical fruit of all the preceding habits. The foundational equation is: **The whole is greater than the sum of its separate parts (1 + 1 = 3 or more)**.

**How do you build team synergy?**
Synergy does not mean blind conformity. It means actively **valuing and leveraging differences**—mental, structural, and creative. You blend unique viewpoints to bypass individual blindspots.

**Designing the Third Alternative:**
Instead of fighting or settling for a bland compromise, collaborate to invent a **Third Alternative**—a fresh, superior path that achieves both goals perfectly.`
          },
          {
            id: '7h_ch2_l4',
            idNum: 4,
            titleAr: '4. محطة التثبيت: مراجعة معايير العبور للنصر الجماعي الجميل',
            titleEn: '4. Review Node: Synthesizing Public Victory Cornerstones',
            duration: '3m',
            type: 'review',
            contentAr: `لقد حصدت نجاحاً ذهنياً مذهلاً في صياغة النصر الجماعي والتعاون الفعّال. هيا معاً لنلخص أهم مبادئ الفصل الثاني:

1. **المنفعة الذكية (ربح/ربح):** الإيمان بمبدأ الوفرة، والحرص البالغ على نجاح الجميع أو فض الشراكة بتقدير (No Deal).
2. **الاستماع التعاطفي الصادق:** استثمر في فهم الآخرين بعمق أولاً، لتبادل الثقة وبناء رصيد هائل في البنك العاطفي للعلاقات.
3. **التآزر وتناغم الفروقات:** تسخير التباين الفكري والمهاري لإنتاج حلول إبداعية مبتكرة تفوق بكثير جهود الأفراد المنعزلين.`,
            contentEn: `You have made extraordinary progression mapping the Public Victory principles! Let us synthesize the ultimate cornerstones:

1. **Win-Win Thinking:** Foster an Abundance Mindset, seeking mutual benefit or maintaining programmatic clarity via "No Deal".
2. **Listen to Understand:** Listen to capture emotion and intent, building deep loyalty blocks.
3. **Synergy of Divergent Talents:** Leverage distinct skillsets to create inventive Third Alternatives.`
          },
          {
            id: '7h_ch2_l5',
            idNum: 5,
            titleAr: '5. تلميحات ودليل إرشادي لبناء رصيد بنك العلاقات العاطفي',
            titleEn: '5. Practical Tips: Replenishing your Emotional Bank Account',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث نصائح وتدريبات وتطبيقات عملية لبدء تفعيل النصر الجماعي في بيئتك المعاصرة اليوم:

- **رصيد البنك العاطفي:** تعامل مع علاقاتك كحساب بنكي افتراضي؛ قم بإيداعات متكررة (الوفاء بالوعود، الالتزام بالاحترام، الاعتذار بصدق، وضوح التوقعات)، وتجنب السحب (الملامسة السلبية، عدم الوفاء، الغيبة والتجاهل).
- **تدريب الأنفاس الأربعة:** قبل الإجابة أو الدفاع عن موقفك بالعمل، استمع بصمت وتفهم لدقيقة كاملة، والخص وجهة نظر الطرف الآخر بدقة لدرجة يقر بها شريكك بأنك فهمته تماماً.
- **ابتكار الحلول التآزرية:** عند نشؤ مأزق جماعي بالمنزل أو العمل، اسأل: "كيف نصوغ خياراً تآزرياً يسهم بإفادة مشتركة للجميع بدلاً من خسارة طرف لصالح الآخر؟"
- واجه الآن **Gatekeeper Exam** لنقهر التحدي ونفتح بوابة الفصل الأخير لتجديد طاقتك!`,
            contentEn: `Here are three pragmatic exercises to unlock Team Interdependence:

- **The Emotional Bank Account:** Treat bonds as emotional cash flows. Deposit respect, loyalty, clear expectations, and warm apologies. Avoid withdrawals like gossip or broken covenants.
- **The Listening Challenge:** In your next collision, completely suppress the urge to defend. Instead, repeat and clarify their exact case until they say, "Yes, you understand me."
- **Alternative Design:** Next time you clash on an issue, prompt: "What is an imaginative third path that lets both of us win without compromise?"
- Prove your growth and tackle the **Gatekeeping Quiz** to complete Chapter 2!`
          }
        ],
        quiz: [
          {
            questionAr: "ما الذي تجسده 'عقلية الوفرة' (Abundance Mindset) في فلسفة العائدة الرابعة؟",
            questionEn: "What does an 'Abundance Mindset' represent in the context of Win-Win framework?",
            optionsAr: [
              "الإيمان بأن السعادة والنجاح والفرص متوفرة بكثرة للجميع وتكفي لمشاركة الإنجاز دون منافسة شرسة.",
              "الرغبة في تكديس الأصول المادية بكثرة وتجنب التبرع والزكاة.",
              "التظاهر بقبول الخسارة الدائمة ليرضى الجميع ويتجنبوا الصراع."
            ],
            optionsEn: [
              "Believing there is plenty of success, happiness, and prestige available for everyone to share naturally without tribal competition.",
              "Desiring to accumulate material assets at all costs while refusing charity or volunteer actions.",
              "Pretending to always accept losing so that other people stay pacified."
            ],
            correctIndex: 0,
            explanationAr: "تؤمن عقلية الوفرة بأن الحياة تتسع لنهوض ونجاح الجميع معاً، بينما ترى عقلية الشح نجاح شريكك بمثابة خسارة محققة لك.",
            explanationEn: "Abundance thinking views life as an expanding arena where there's enough for all, whereas scarcity mindset treats validation as a limited pie."
          },
          {
            questionAr: "كيف يتم تطبيق العادة الخامسة 'اسع أولاً لتبدل الفهم' في التواصل المهني والشخصي؟",
            questionEn: "How is Habit 5 ('Seek First to Understand') practically applied in our personal interactions?",
            optionsAr: [
              "الاستماع بهدف الإجابة السريعة وإعطاء النصائح الفلسفية المعلبة دون وعي بمشاعر الطرف الآخر.",
              "ممارسة الاستماع التعاطفي لفهم مشغلات ومخاوف واحتياجات الفرساء بصدق قبل اقتراح أي حلول.",
              "تجنب الحوار من الأساس ومقاطعة كل النقاشات لتوفير الطاقة."
            ],
            optionsEn: [
              "Listening purely to construct faster verbal counter-arguments and supply instant advice.",
              "Deploying empathic listening to capture the speaker's emotional state and priorities prior to offering solutions.",
              "Avoiding dialogue altogether and choosing complete isolation."
            ],
            correctIndex: 1,
            explanationAr: "الاستماع التعاطفي يبني جسوراً متينة من الثقة ويخفض التوتر النفسي فوراً، مما يمهد بشكل خارق للوصول لحلول سريعة وتآزرية.",
            explanationEn: "Empathic listening creates a psychological air buffer, reducing defensiveness and unlocking paths to cooperative results."
          },
          {
            questionAr: "ما المغزى الجوهري الكامن وراء معادلة التآزر والتعاضد (Habit 6: Synergize)؟",
            questionEn: "What is the key functional concept underlying Habit 6 ('Synergize')?",
            optionsAr: [
              "دمج الاختلافات الفكرية لابتكار حلول بديلة ثالثة تتجاوز بكثير مجموع القدرات المنفردة للأشخاص.",
              "إقناع الفريق كلياً بأن يسيروا خلف رأي قائد واحد دون اعتراض أو مناقشة فنية.",
              "الوصول لتسوية متوسطة يتنازل فيها الجميع عن رغباتهم كلياً."
            ],
            optionsEn: [
              "Combining safe intellectual differences to design Third Alternatives that far exceed the individual capacities of collaborators.",
              "Convincing the team to blindly support the leader's specific stance without any technical debates.",
              "Reaching a moderate compromise where both parties have to give up their goals entirely."
            ],
            correctIndex: 0,
            explanationAr: "التآزر يعيد صياغة المعادلة لتصبح (1 + 1 = 3 أو أكثر)، عبر تسخير الفروقات الفردية وتصليب نقاط القوة لبناء نتائج خارقة وغير مألوفة.",
            explanationEn: "Synergy builds a system where 1 + 1 equals 3 or more by valuing mental, creative, and technical differences to create collective magic."
          }
        ]
      },
      {
        id: '7h_ch3',
        chapterNum: 3,
        titleAr: 'الفصل الثالث: تجديد الفعالية المستمرة - مبادئ التوازن وشحذ المنشار الكوني',
        titleEn: 'Chapter 3: Continuous Self-Renewal - The Art of Sharpening the Saw',
        descriptionAr: 'قوة العادة السابعة للاستمرار التنموي، وتنشيط الأبعاد الأربعة (الجسدي والذهني والروحي والاجتماعي) لتفادي الاحتراق.',
        descriptionEn: 'Deploying the seventh habit of lifelong growth, renewing your physical, mental, spiritual, and emotional systems.',
        lessons: [
          {
            id: '7h_ch3_l1',
            idNum: 1,
            titleAr: '1. شحذ المنشار الكوني: الأبعاد الأربعة للاستثمار الدائم في نفسك',
            titleEn: '1. Sharpening the Saw: The Fourth-Dimensional Paradigm of Renewal',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك في المحطة التنموية النهائية لمدرستنا الفخمة حول التحسن والتأهيل! العادة السابعة هي **شحذ المنشار** (Sharpen the Saw).

**حكاية الحطاب الحكيمة:**
تخيل حطاباً يقطع شجرة لساعات طويلة متواصلة بكل جهد وجنون، وهو يزداد تعباً وتتراجع فاعلية قطعه باستمرار. عندما يسأله أحد المارة: "لماذا لا تتوقف لخمسة دقائق لتشحذ منشارك الفولاذي؟"، يجيب بانفعال وتعب: "لا أملك وقتاً لأتوقف، أنا مشغول بقطع الشجرة!".

**ماذا نستفيد من هذه الحكاية؟**
شحذ المنشار يعني الاستمرار والتحسن الدائم والحفاظ على أداتك الوحيدة الثمينة للتغيير والانطلاق: **جسمك وعقلك وروحك وعواطفك**. عدم التوقف للشحذ يعني ضياع مجهودك تدريجياً والوقوع الحتمي في مصيدة الفشل والاحتراق اللعين.`,
            contentEn: `Welcome to the ultimate learning unit of our academic continuous development program! Habit 7 is **Sharpen the Saw**.

**The Legend of the Woodcutter:**
Imagine a woodcutter sweating profusely, sawing down a tree hour after hour. He is exhausted, and the blade is dull. When a walker suggests, "Why don\'t you stop for five minutes and sharpen the saw?" the woodcutter snaps back, "I don\'t have time to stop! I\'m too busy sawing!"

**What is the core lesson?**
Sharpening the saw means investing in your single most valuable resource—**yourself**. Ignoring self-renewal degrades your long-term capability and leads directly to systemic burnout and failure.`
          },
          {
            id: '7h_ch3_l2',
            idNum: 2,
            titleAr: '2. غرس الأبعاد الأربعة: كيف تشحن بطاريتك اليومية بتوازن فطن؟',
            titleEn: '2. The Four Pillars of Renewal: Physical, Mental, Spiritual, Emotional',
            duration: '3m',
            type: 'core',
            contentAr: `يتأسس شحذ المنشار على تجديد مستمر متوازن عبر **أربعة أبعاد أساسية للمعيشة**:

- **البُعد الجسدي:** التغذية السليمة، النوم الكافي المرمم للأعصاب، والانتظام بالتمارين الرياضية لبناء اللياقة العالية والمناعة.
- **البُعد الذهني:** القراءة الواعية، كسب المهارات الجديدة، الكتابة المنهجية، والحد من استهلاك المحتوى السطحي التافه لتنشيط الذاكرة المعرفية.
- **البُعد الروحي:** التأمل الروحي والعبادة والاتصال التام بالقيم والمبادئ السامية لاستعادة الهدوء الذاتي العميق.
- **البُعد الاجتماعي / العاطفي:** رعاية العلاقات الوثيقة، بناء الصداقات الإيجابية، ورصيد بنك العلاقات العاطفي لنيل الأمان الاجتماعي المتزن.

**قيمة التوازن:**
التركيز المفرط على بعد واحد وتجاهل البقية ينتج خللاً بنيوياً كبيراً بحياتك، بينما التحسن والتطوير المتكامل لهما مفعول سحري يضاعف رصيد إنتاجيتك بالكامل!`,
            contentEn: `Sharpening the saw requires keeping your systems balanced across **four absolute dimensions of humanity**:

- **The Physical Dimension:** Solid nutrition, restorative sleep cycle, and standard athletic activity to protect vitality.
- **The Mental Dimension:** Reading classics, educational skill-building, structured writing, and avoiding digital noise to keep cognitive pathways responsive.
- **The Spiritual Dimension:** Spiritual contemplation, core devotion, and reconnecting with values to stabilize internal tranquility.
- **The Emotional/Social Dimension:** Nurturing close relationships, contributing to community progress, and maintaining positive emotional banking accounts.

**Pillar Integration:**
Over-focusing on one pillar while starving another creates toxic vulnerabilities. Whole-human growth demands a balanced routine for sustained efficacy.`
          },
          {
            id: '7h_ch3_l3',
            idNum: 3,
            titleAr: '3. محطة التثبيت: مراجعة الدستور النهائي والمحورية الكونية للعادات السبع',
            titleEn: '3. Review Node: Synthesizing the 7 Habits Cycle',
            duration: '3m',
            type: 'review',
            contentAr: `مبارك عليك إتمام هذا المسار الأكاديمي الحرج لنموذج ستيفن كوفي البديع! دعنا نسلط الضوء على ركائز تجديد الفعالية وصور ترابط العادات:

- تذكر دائماً أن العادات الثلاث الأولى (المبادرة، الرؤية، الأهم أولاً) تحقق لك **النصر الشخصي الفردي** وتنقلك للاستقلال.
- العادات الثلاث التالية (المنفعة المتبادلة، الفهم بالاستماع، التآزر الإبداعي) تصيغ لك **النصر الجماعي** وتنقلك لتعايش القوي والمستمر.
- العادة السابعة (شحذ المنشار) هي محيط الحماية والمغذي الدائم لكل العادات الستة، والدافع للاستمرار في مسار التنمية والتحسين مدى الحياة!`,
            contentEn: `Congratulations on completing this academic blueprint! Let us map the entire loop of the 7 Habits model:

- The first three habits (Be Proactive, Vision, First Things First) deliver your **Private Victory**, shifting you from dependence to independence.
- The next three (Win-Win, Empathy, Joint Synergy) deliver your team\'s **Public Victory**, moving you towards highly cooperative interdependence.
- The seventh habit (Sharpen the Saw) is the preservation mechanism. It constantly recharges and upgrades the other six habits over your lifespan!`
          },
          {
            id: '7h_ch3_l4',
            idNum: 4,
            titleAr: '4. دليل ممارسات التجديد اليومية والموجة الابتكارية للفعالية القصوى',
            titleEn: '4. Practical Tips: Crafting Your Personal Renewal Routine',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك خطة العمل المباشرة لجدولة طقوس شحذ المنشار في جدولك الأسبوعي:

- **حدد ١٥ دقيقة للشحذ:** خصص جزء ثابت كل صباح للتركيز المعرفي الموجه (مثلا قراءة صفحتين من كتاب أو تدوين أهداف المربع الثاني).
- **التجديد المتناوب للياقة والروح:** التزم بالمشاركات والرياضة ببطء ومرونة فائقة كضرورة بيولوجية، وتذكر أن قطع العمل بخمسة دقائق ليس تقاعساً بل استراحة حكيمة لتعود بقوة مضاعفة.
- أنت الآن مستعد ومؤهل لخوض الاختبار النهائي الصارم لتوثيق وإصدار **شهادة الاعتماد الفورية للبرنامج ومطابقة المقاييس 🎓!**`,
            contentEn: `Here is your direct action roadmap to operationalize renewal inside your schedule:

- **Dedicating daily sharp blocks:** Allocate 15 quiet minutes every morning to strategic mental tasks (e.g., summary reviews, goal indexing, writing).
- **Conserving energy cycle:** Schedule rest and cardio breaks as an absolute necessity. Stopping to sharpen your blade is not procrastination; it is smart performance architecture.
- Take a deep breath. You are fully prepared to pass the final **Chapter 3 evaluation** and officially generate your prestigious **Academic Certificate of Achievement 🎓!**`
          }
        ],
        quiz: [
          {
            questionAr: "ما الذي تجسده قصة الحطاب الذي يرفض شحذ منشاره لقطع شجرة؟",
            questionEn: "What is the key takeaway of the woodcutter who refuses to sharpen his saw?",
            optionsAr: [
              "أهمية مواصلة العمل الدؤوب بلا انقطاع أو استراحة لكسب التحديات بسرعة.",
              "خطورة الانجراف في روتين العمل التنفيذي المنهك وبلا تفكير وتجاهل التجديد والتحسين وصيانة الذات.",
              "أن قطع الأشجار mهارة رياضية موروثة لا دخل لأدوات الفولاذ بها."
            ],
            optionsEn: [
              "The supreme importance of working non-stop without rest to clear challenges rapidly.",
              "The danger of getting caught up in mindless execution while ignoring self-maintenance, reflection, and strategic upgrades.",
              "That woodcutting is a legacy sport independent of physical tools."
            ],
            correctIndex: 1,
            explanationAr: "تجاهل الاستراحة وشحذ المنشار (الذات) يستهلك طاقتك الذهنية والجسدية بالكامل وينتهي بتناقص نتاج العمل تدريجياً لتقع ضحية الاحتراق والوهن.",
            explanationEn: "Neglecting self-renewal rapidly depletes your cognitive and biological capacity, ending in diminishing performance and eventual burnout."
          },
          {
            questionAr: "كيف يؤثر عدم التوازن وبناء بُعد واحد وإهمال الأبعاد الأخرى على فعاليتك الشاملة؟",
            questionEn: "How does over-indexing on one dimension of renewal while neglecting the others affect your progress?",
            optionsAr: [
              "لا يؤثر طالما أنك متميز جداً في البُعد المهني والمادي.",
              "ينتج عنه خلل بنيوي ووهن بيولوجي يعرقل تطورك الشامل وتوازن كفاءتك على المدى البعيد.",
              "يمنحك نشاطاً مضاعفاً ويخلصك من تعقيد العلاقات والمجاملات."
            ],
            optionsEn: [
              "It has zero impact as long as you are highly successful in your financial or career domain.",
              "It ends in structural weakness and cognitive vulnerabilities that hold back your full-potential progression over time.",
              "It accelerates your output by freeing you from other social obligations."
            ],
            correctIndex: 1,
            explanationAr: "تكامل وترصيع الأبعاد الأربعة (الجسد، الذهن، الروح، العواطف) يمنحك نمواً صحياً متوازناً وقوة مرنة لمجابهة مصاعب الحياة بكفاءة بالغة.",
            explanationEn: "Whole-human coherence yields stable development, supplying you with balanced psychological stamina to withstand modern corporate challenges."
          },
          {
            questionAr: "بأي عائلة من عادات ستيفن كوفي ترتبط العادة السابعة 'شحذ المنشار'؟",
            questionEn: "How is Habit 7 ('Sharpen the Saw') connected to the other 6 habits?",
            optionsAr: [
              "تعمل كحاضنة ومحرك وداعم لتغذية وتنشيط إنتاجية العادات الستة بالتمكين والتجديد الشامل مدى الحياة.",
              "هي مهارة ترفيهية اختيارية لا تعني صلب عمل العادات السابقة.",
              "تتعارض مع التآزر لأن البُعد الفردي هنا يتطلب عزلة مستقلة تامة عن الآخرين."
            ],
            optionsEn: [
              "It acts as the protective engine, constantly recharging, refining, and polishing the other six habits for lifelong mastery.",
              "It represents a separate leisure action unrelated to the other habits\' structural utility.",
              "It clashes with team synergy because personal renewal demands complete isolation from peers."
            ],
            correctIndex: 0,
            explanationAr: "تعتبر العادة السابعة هي الإطار الداعم والمغذي لكل تفوق مهني وشخصي، والضمان المطلق لتحقيق الرؤية والفاعلية الشاملة باستمرار.",
            explanationEn: "Habit 7 acts as the master-key feedback loop that protects, hydrates, and improves the other elements for continuous lifelong progression."
          }
        ]
      },
      {
        id: '7h_ch4',
        chapterNum: 4,
        titleAr: 'الفصل الرابع: بنك العلاقات الإيداعي والعاطفي ورصيد التعاون الثنائي',
        titleEn: 'Chapter 4: The Emotional Bank Account & Synergy Matrix',
        descriptionAr: 'منظومة الذكاء الاجتماعي وبناء رصيد الثقة مع الآخرين من خلال الإيداعات المتكررة.',
        descriptionEn: 'The social intelligence matrix, building deep trust using positive relational transactions.',
        lessons: [
          {
            id: '7h_ch4_l1',
            idNum: 1,
            titleAr: '1. رصيد المشاعر والتعامل: حساب الائتمان العاطفي الثنائي',
            titleEn: '1. Emotional Bank Account: Trust as a Transactional Reserve',
            duration: '4m',
            type: 'intro',
            contentAr: `رصيد بنك العلاقات العاطفي (Emotional Bank Account) هو مجاز يصف حجم الثقة الكامن داخل أي علاقة إنسانية في حياتك.

**كيف يعمل هذا الحساب البنكي؟**
تماماً كالحساب المالي في البنك، يمكنك إجراء نوعين من السلوكيات:
- **الإيداعات (Deposits):** تفكك التوتر وترفع مخزون الثقة (مثل الصدق المعرفي، الإيفاء بالوعود، الاعتذار بصدق، والإنصات العميق للآخر).
- **السحوبات (Withdrawals):** تبدد الثقة وتنكث حبل التعاون الفلسفي المشترك (مثل اللوم المستمر، الكذب، خلف الوعود، إفشاء السر، والتظاهر بالاهتمام).

عندما يكون رصيد حسابك عاطفياً وفيراً، يتخطى الطرفان سوء الفهم البسيط بسلام، أما إذا شح الرصيد وجف، تشتعل الأزمات من أتفه الأسباب.`,
            contentEn: `The Emotional Bank Account is a powerful metaphor describing the amount of trust built up in any key human relationship.

**How does this account cooperate?**
Just like a financial account, you make transactions:
- **Deposits (Trust Building):** Actions like radical honesty, keeping commitments, deep active listening, and sincere apology when wrong.
- **Withdrawals (Trust Draining):** Behaviors like constant blame, breaking promises, ignoring needs, and displaying hidden arrogance.

When the relational balance is high, communication is effortless. If the balance dry outs, minor disputes trigger explosive crises.`
          },
          {
            id: '7h_ch4_l2',
            idNum: 2,
            titleAr: '2. تفصيل الإيداعات الستة الكبرى: الدستور الذهبي لتثبيت العلاقات',
            titleEn: '2. The Six Major Deposits of Relational Trust',
            duration: '3m',
            type: 'core',
            contentAr: `يحدد ستيفن كوفي ستة إيداعات حاسمة ترفع رصيد الثقة وتضمن نجاحك الجماعي:
            
1. **فهم الآخر (Understanding):** مفتاح السحر لربط الرؤى، أن تبذل وقتاً لتفهم ما يهمه بحق.
2. **الالتفات للصغائر (Little Things):** الكلمات اللطيفة البسيطة، المصافحة الحارة، والاهتمام العفوي بالتفاصيل.
3. **الوفاء بالوعد (Promises):** الالتزام الحاسم بما أعلنت، فالخلف ينسف حساب كامل الثقة.
4. **توضيح التوقعات (Clarifying Expectations):** تحديد مهامك وأهداف الفريق بوضوح من البدء لتجنب الصراع اللاحق.
5. **إظهار الأمانة الشخصية (Personal Integrity):** الدفاع عن الغائبين والصدق التام يضمن ولاء الحاضرين.
6. **الاعتذار المخلص (Apologizing):** قول "أنا مخطئ" بشجاعة لترميم السحوبات العشوائية المتهورة.`,
            contentEn: `Covey outlines six essential deposits that solidify joint performance and secure team loyalty:

1. **Understand the Individual:** Spending conscious time to see issues from their precise perspective.
2. **Attend to Little Things:** Tiny acts of kindness, warm greetings, and recalling personal milestones.
3. **Keep Commitments:** Reliability is your cornerstone; a single broken oath destroys years of trust.
4. **Clarify Expectations:** Defining roles, limits, and team objectives upfront prevents toxic misunderstandings.
5. **Show Personal Integrity:** Defending those who are absent constructs immense trust with those present.
6. **Apologize Sincerely when Borrowing:** Admitting errors promptly to fix reckless emotional withdrawals.`
          },
          {
            id: '7h_ch4_l3',
            idNum: 3,
            titleAr: '3. دليل تسييس الثقة: ممارسات عملية لزيادة إيداعاتك اليومية بكفاءة',
            titleEn: '3. Standard Tips: DevelopingRelational Capital Daily',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه التطبيقات لزيادة ثروتك من رصيد العلاقات اليوم:
            
- **تطبيق الفهم الصامت:** في المرة القادمة التي تخوض فيها نقاشاً، انصت بنسبة ١٠٠٪ لمدة ثلاث دقائق متتالية دون التفكير بصد ردود دفاعية.
- **إيداع عشوائي مقصود:** اسعد زميلاً أو فرداً من عائلتك برسالة محبة بسيطة دون أي مصلحة مسبقة لتنمي الرصيد المشترك.`,
            contentEn: `Actionable habits to nurture relational resources starting today:
            
- **Active Listening Practice:** In your next business conversation, listen for three full minutes without designing your rebuttal. Focus on understanding.
- **The Relational Spark:** Send a warm, unsolicited thank-you note or text to a colleague or family member to cultivate your joint emotional reserve.`
          }
        ],
        quiz: [
          {
            questionAr: "ما الذي يقصده ستيفن كوفي برصيد بنك العلاقات العاطفي؟",
            questionEn: "What is Stephen Covey’s definition of the Emotional Bank Account?",
            optionsAr: [
              "تمثيله للقروض المالية التي تضمنها البنوك التجارية للأشخاص بفوائد عالية.",
              "مستوى الثقة والأمان المتراكم في أي علاقة إنسانية بناءً على سلوكياتك السابقة.",
              "عدد الأصدقاء الأكاديميين المتابعين لك على وسائل التواصل الاجتماعي."
            ],
            optionsEn: [
              "The credit limit guaranteed by retail banks to highly successful startups.",
              "The level of trust and emotional safety built up in any human connection based on your relational history.",
              "The pure count of academic followers you accumulated across virtual platforms."
            ],
            correctIndex: 1,
            explanationAr: "إثراء هذا الحساب بالصدق والوفاء يحمي العلاقات من سوء الفهم الجانبي ويقوي تماسك العمل الإداري.",
            explanationEn: "Sustaining a rich balance protects your alliances against temporary friction, boosting functional cooperation."
          }
        ]
      },
      {
        id: '7h_ch5',
        chapterNum: 5,
        titleAr: 'الفصل الخامس: العادة الثامنة (من الفعالية إلى العظمة ودستور الصدارة الكونية)',
        titleEn: 'Chapter 5: The 8th Habit - From Effectiveness to Greatness',
        descriptionAr: 'الانتقال بالفعالية الشخصية للتأثير الساحق وإيجاد صوتك الفريد، ومساعدة الآخرين على اكتشاف أصواتهم الخاصة.',
        descriptionEn: 'Shifting from basic effectiveness to ultimate greatness, finding your distinct voice, and guiding others to discover theirs.',
        lessons: [
          {
            id: '7h_ch5_l1',
            idNum: 1,
            titleAr: '1. حدود الفعالية ضد العظمة: مبررات ظهور العادة الثامنة',
            titleEn: '1. Beyond Effectiveness: The Call of the 8th Habit',
            duration: '4m',
            type: 'intro',
            contentAr: `أن تكون "فعالاً" كإنسان في القرن الحالي هو مجرد متطلب دخول للسباق؛ ولكن لتصنع فارقاً مهيباً وتترك أثراً خالداً، يجب أن تعبر لـ **العظمة (Greatness)**.

العادة الثامنة تتلخص في ركيزتين:
1. **أوجد صوتك الفريد (Find your Voice):** اكتشاف تقاطع مواهبك الكبرى مع شغفك الداخلي، واحتياجات العالم، ورنين ضميرك.
2. **ألهم الآخرين ليجدوا أصواتهم (Inspire others to find theirs):** صناعة بيئة قيادية تمكّن فريقك وأقرانك ليتألقوا ويختبروا قوتهم وسرهم الأكاديمي الصامد الحقيقي.`,
            contentEn: `Being merely "effective" is the baseline fee for accessing modern fields; to build an unshakeable legacy, you must step into **Greatness**.

The 8th Habit is defined by two absolute pillars:
- **Find Your Voice:** Locating the intersection of your unique talent, deep passion, conscience, and the pressing needs of the market.
- **Inspire Others to Find Theirs:** Providing a leadership space that enables your peers to shine and manifest their full capability.`
          },
          {
            id: '7h_ch5_l2',
            idNum: 2,
            titleAr: '2. شفرة الصوت الداخلي الأربعة: ترقية قواك العقلية والروحية للتفوق الساحق',
            titleEn: '2. The Four Parts of Human Voice: Talent, Passion, Need & Conscience',
            duration: '3m',
            type: 'core',
            contentAr: `صوتك الفريد ليس ترنماً فارغاً بل هو ناتج تضافر أربعة أبعاد جوهرية في بناء شخصيتك:
            
1. **الموهبة (Talent):** ما تتقن فعله وتتعلمه بسرعة مذهلة تفوق متوسط الأقران.
2. **الشغف (Passion):** الوقود الداخلي المالي والذهني الحماسي الذي يحركك بلا ملل.
3. **الحاجة (Need):** احتياج السوق أو البيئة أو منصتك والشركات لعلمك وتطبيقاتك.
4. **الضمير (Conscience):** صوت المبادئ الكونية والأخلاق الفصحى بقلبك التي ترشدك لخدمة مجتمعك ووطنك.

التطوير الأكاديمي الصامد يتأسس بحرص على نقطة التقاء هذه المنظومة البهية بداخل فكرك العريض.`,
            contentEn: `Your unique voice materializes at the precise fusion of four essential vectors of human intelligence:

- **Talent (Spiritual & Mind):** What you naturally excel at and develop with effortless speed.
- **Passion (Heart):** The internal flame that supplies continuous energy to execute tasks.
- **Need (Physical):** What the marketplace, institution, or academic field is ready to reward.
- **Conscience (Universal Integrity):** The quiet sense of absolute right and wrong that aligns you with service.

Academics and leaders construct their long-term victories upon this four-fold intersection.`
          },
          {
            id: '7h_ch5_l3',
            idNum: 3,
            titleAr: '3. ممارسات الصوت والعظمة: تفعيل القيادة وصياغة الرسومات الكونية',
            titleEn: '3. Standard Tips: Activating Your Voice Today',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه التطبيقات لتعانق العظمة اليوم:
            
- **رسم تقاطع الصوت:** ارسم دائرة تضافر الأبعاد الأربعة وصغ بياناً مختصراً لصوتك الحالي ورسالتك الباذخة للتميز.
- **تمكين الغير:** خصص مجهوداً موجهاً لتشجيع زميل خجول في العمل أو طالب ذكي؛ اذكر نقاط عبقريته التي يغفل عنها وألهمه ليقود العمل الشجاع.`,
            contentEn: `How to implement the 8th Habit into your routine:
            
- **Map Your Voice:** Sketch your personal intersection of Talent, Passion, Need, and Conscience. Write a short statement summarizing your unique zone of greatness.
- **Empower Someone Else:** Proactively highlight the unique talents of a junior colleague or student. Guide them to take lead on a key task.`
          }
        ],
        quiz: [
          {
            questionAr: "ما هو الجوهر الثنائي الكاسق للعادة الثامنة في فكر ستيفن كوفي؟",
            questionEn: "What are the two absolute pillars of Covey’s 8th Habit?",
            optionsAr: [
              "زيادة ساعات الاستراحة وتحسين نفقات وضرائب البنوك.",
              "أن تجد وتكتشف صوتك الفريد الذاتي، وتلهم الآخرين ليجدوا ويكتشفوا أصواتهم الفريدة الخاصة.",
              "العيش في عزلة تامة والامتناع عن مخاطبة الأقران بساحة التداول."
            ],
            optionsEn: [
              "Inreasing relaxation blocks and minimizing international banking fees.",
              "Finding your own unique voice, and inspiring others to discover and express theirs.",
              "Residing in complete isolation and refusing to speak with peers."
            ],
            correctIndex: 1,
            explanationAr: "العظمة الحقيقية والنهائية تكمن في مضاعفة التأثير ونشر العلم والقيادة التمكينية لتصنع فارقاً حياً في مجتمعك.",
            explanationEn: "True leadership and legacy lie in multiplying your impact, teaching others, and enabling cooperative success."
          }
        ]
      }
    ]
  },
  {
    id: 'rich_dad',
    titleAr: 'كتاب الأب الغني والأب الفقير للوعي المالي',
    titleEn: 'Rich Dad Poor Dad - Financial Independence',
    authorAr: 'روبرت كيوساكي',
    authorEn: 'Robert Kiyosaki',
    coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=400&q=80',
    descriptionAr: 'منظومة تفاعلية تفكك أسرار الوعي المالي الجريء، وتشرح مصفوفة بناء الأصول، والتحرر التام من فخ سباق الفئران.',
    descriptionEn: 'The global masterpiece on financial literacy, distinguishing assets from liabilities, and mastering cashflow.',
    isLocked: false,
    chapters: [
      {
        id: 'rd_ch1',
        chapterNum: 1,
        titleAr: 'الفصل الأول: فخ سباق الفئران وقانون التدفق المالي الفريد',
        titleEn: 'Chapter 1: The Rat Race & the Law of Cashflow',
        descriptionAr: 'كيف تكسر أغلال الروتين العقير لتجعل المال خادماً مطيعاً لك، وفهم الفرق بين الأصول الحقيقية والالتزامات.',
        descriptionEn: 'Breaking free from the daily grind, making money work for you, and learning the master difference between assets and liabilities.',
        lessons: [
          {
            id: 'rd_ch1_l1',
            idNum: 1,
            titleAr: '1. قصة الأبوين: الصراع الفكري بين الوظيفة الآمنة والاستثمار الجريء',
            titleEn: '1. Tale of Two Fathers: Security vs. Financial Growth',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك يا صديقي في المسار المالي الملحمي الرائد لكتاب روبرت كيوساكي الشهير: **الأب الغني والأب الفقير!**

**لماذا هذه التجربة بالغة الأهمية؟**
يحكي روبرت قصة طفولته بين أقرانه ومقارنته لنمطين من التوجيه:
- **أبوه الحقيقي (الأب الفقير):** رجل متعلم تعليماً أكاديمياً رفيعاً، يحمل شهادة دكتوراه، لكنه يعيش دائماً تحت وطأة الأوراق الحسابية والديون، متبنياً شعار: "ادرس بجد لتجد شركة ممتازة توظفك وتمنحك الأمان الوظيفي".
- **أب صديقه مايك (الأب الغني):** لم يكمل تعليمه الثانوي، لكنه صانع ثروة عظيم بالخبرة والممارسة، يتبنى شعار: "تعلم الوعي المالي المفتوح لتملك الشركات وتبسط سيطرتك الاستثمارية".

**ماذا ستستفيد من هذا الدرس الجوهري؟**
الدرس الأول يبدأ بـ **تغيير القناعات الذهنية والتحيزات الفطرية** تجاه المال. بدلاً من الخوف من المخاطر أو تبجيل الوظيفة وحيدة التدفق، ستتعلم كيف تشيد لنفسك عقلية شجاعة تطمح للحرية والإنبات المالي من بوابته الحقيقية.`,
            contentEn: `Welcome, scholar, to Robert Kiyosaki's financial masterpiece: **Rich Dad Poor Dad!**

**Why is this experience foundational?**
Robert details his childhood under two distinct mentors:
- **His Real Father (Poor Dad):** Highly educated PhD scholar, yet perpetually strained by bills and financial liabilities, holding the creed: "Study hard to find a safe corporate job."
- **His Best Friend's Father (Rich Dad):** High school dropout, yet an exceptional self-made wealth architect, holding the creed: "Master Financial IQ to build assets and run enterprises."

**What is your takeaway?**
Mental shift is your baseline. Instead of running from risk or elevating solitary job dependency, adopt a robust mindset focused on lifelong independence.`
          },
          {
            id: 'rd_ch1_l2',
            idNum: 2,
            titleAr: '2. درس الأثرياء: كسر أغلال فخ الوظيفة واستعباد الرواتب الكسولة',
            titleEn: '2. The Core Rule: Making Money Work for You',
            duration: '3m',
            type: 'core',
            contentAr: `في هذا الدرس نتناول العقيدة الأهم للأثرياء: **"الأثرياء لا يعملون من أجل كسب المال؛ بل يجعلون المال يعمل لصالحهم"**.

**ماذا يعني ذلك على أرض الواقع؟**
معظم البشر يعيشون في دائرة مغلقة مدمرة مدفوعة بعاطفتين مدمرتين: **الخوف والطمع**.
1. **الخوف:** يدفعهم للنهوض فجراً والركض خلف راتب شهري ضئيل لتسليم فواتير الكهرباء وتأجير العقار.
2. **الطمع (الرغبة):** يدفعهم لزيادة الإنفاق الاستهلاكي بمجرد زيادة الراتب، فيشترون كماليات وسيارات جديدة بالتقسيط الممتد.

يسمي كيوساكي هذه المتاهة الروتينية الخانقة بـ **سباق الفئران (Rat Race)**. الطريقة الوحيدة للخروج منها هي التصلب العقلي والتعرف الفني على كيفية استغلال الطاقة المالية لبناء استثمارات تدر أرباحاً ذاتية دون تدخل مباشر من وقتك اليومي.`,
            contentEn: `In this lesson, we dissect the premier wealthy axiom: **"The rich do not work for money; they compel money to work for them."**

**What is the practical setup?**
Most humans are imprisoned in a vicious cycle governed by two emotions: **Fear and Greed**.
- **Fear:** Pushes them to run for a safe payroll to cover short-term bills.
- **Greed (Desire):** Coaxes them to expand luxury spending as soon as their salary climbs, locking them into debt.

Kiyosaki terms this repetitive, dry workflow **The Rat Race**. Breakout demands learning to decouple your time from earnings by establishing active investments.`
          },
          {
            id: 'rd_ch1_l3',
            idNum: 3,
            titleAr: '3. قاعدة الأصول والالتزامات: شفرة الفروقات الفنية التي تغفلها البنوك',
            titleEn: '3. The Master Key: Asset vs. Liability',
            duration: '3m',
            type: 'core',
            contentAr: `يقف كارسون وكيوساكي معاً لتعريف القاعدة الذهبية الكبرى والأبرز للثراء: **"يجب أن تتعلم الفرق بين الأصول والالتزامات، وتشتري الأصول فقط"**.

**التبسيط العبقري للمفاهيم والمصطلحات:**
- **الأصل (Asset):** هو أي شيء يضع المال **في جيبك** بصفة مستمرة وتلقائية (كالأسهم، العقارات المؤجرة، الملكية الفكرية، وصكوك الأرباح الموزعة).
- **الالتزام (Liability):** هو أي شيء يسحب المال **من جيبك** باستمرار (كالسيارات الفخمة بالتقسيط، القروض الاستهلاكية، وبطاقات الائتمان الربوية).

**المغالطة الكبرى لمالكي المنازل:**
يعتبر كيوساكي أن منزلك الشخصي ليس أصلاً بل هو **التزام صريح!** لأنه يستنزف مالك في صيانة دورية، ضرائب ممتلكات، وأقساط بنكية تعود بالفائدة الكبرى للمقرضين بدلاً منك، طالما أنه لا يدر عليك تدفقاً نقدياً داخلاً بصفة دورية ناتجة عن الإيجار المباشر.`,
            contentEn: `In this Lesson, we deconstruct the core definition of assets and liabilities:

**The ultra-clean breakdown:**
- **Asset:** Anything that places cash **into your pocket** (rents, equities, royalties, stable businesses).
- **Liability:** Anything that extracts cash **out of your pocket** (luxuries, retail loans, credit card balances).

**The Great Home Fallacy:**
Kiyosaki notes that your private residential home is **not an asset—it is a liability**, as it repeatedly drains your cash through repairs, property taxes, and mortgage payments, adding zero rent returns.`
          },
          {
            id: 'rd_ch1_l4',
            idNum: 4,
            titleAr: '4. محطة العبور: مراجعة هيكلية التدفق المالي وقانون الأبوين المتباين',
            titleEn: '4. Review Node: Synthesizing the Cashflow Map',
            duration: '3m',
            type: 'review',
            contentAr: `لقد أنجزت قفزة معرفية فائقة في تأسيس ركائز الإدارة والتحرر المالي! دعنا نلخص أضلع العبور الذهبية:

1. **القناعات الحاكمة (الأبوين):** الوعي بأن الشهادات الأكاديمية العالية لا تكفي لصناعة الكفاءة المالية بل هي مجرد تدريب للوظيفة، بينما الوعي بالمال هو صانع المجد والكرنفالية والثراء.
2. **سباق الفئران (فخ الراتب):** تجنب قاطرة الخوف والطمع التي تستعبدك للوظيفة، والسير بهيكلية منهجية لكسر روتين التقيد الدائم بالدائرة الضيقة.
3. **الأصول ضد الالتزامات:** الادخار المركز والاستثمار المتأني في قنوات تضع الفوائد في جيبك، ومناهضة التسلح بالديون المزيفة لغرض الاستعراض البائس أمام الآخرين.`,
            contentEn: `You have finalized the primary coordinates for financial freedom! Let us synthesize the cornerstone concepts:

1. **Mindset Models (Two dads):** Academic certificates train you for labor, but financial intelligence generates real compounding asset assets.
2. **The Rat Race (The Payroll Trap):** Suppress the twin drivers of fear and greed to avoid lifelong dependency.
3. **Assets vs. Liabilities:** Aggregate real income generators like stocks, copyright licenses, and commercial units instead of buying lifestyle debt.`
          },
          {
            id: 'rd_ch1_l5',
            idNum: 5,
            titleAr: '5. دليل السلوك للتجرد من سباق الفئران واختبار معايير الذكاء المالي الخاص بك',
            titleEn: '5. Practical Tips: Overcoming the Rat Race Trap Today',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث نصائح إرشادية وتطبيقات عملية لتوطين المبادئ الثلاثة اليوم:

- **تدريب موازنة الجيب الشفافة:** اكتب ميزانيتك الشخصية فوراً بنموذج منعم بالحرص؛ واقسمها بوضوح تام لخانتي الأصول والالتزامات. أوقف فوراً أي اشتراكات أو التزامات جانبية تافهة تستنزف النقد دون عائد رصيد حقيقي.
- **تنمية بنك التأسيس الأول (أولاً):** خذ عهداً صارماً بأن تدفع لنفسك أولاً بمجرد حصولك على نقد (Pay Yourself First)، واستبعد من ١٠٪ إلى ٢٠٪ للاستثمار المأمون قبل دفع أي فواتير أخرى.
- **تفعيل الصناديق الاستثمارية الصغيرة:** استعمل تطبيقات الادخار التلقائي لشراء أصول مصغرة تنمو بانتظام كخطوات تمكينية أولية للعبور الآمن.
- تقدم الآن ونافس بكل اقتدار واجتز **الفصل الأول** لتقتنص نقاط الجدارة المعرفية الوفيرة!`,
            contentEn: `Here are three pragmatic techniques to cement internal financial sovereignty today:

- **The Asset Audit:** Document your finances in a simple sheet separating assets from liabilities. Instantly terminate minor recurring lifestyle flows that yield zero value.
- **Pay Yourself First:** Dedicate 10% to 20% of your earnings to investment coffers BEFORE paying corporate bills. Forces your system into resourcefulness.
- **Micro-Asset Accumulation:** Utilize digital automated fractional purchases to start training your asset-acquisition habits.
- Proceed to the **Chapter 1 Gatekeeping Quiz** to secure your persistent mastery and progression!`
          }
        ],
        quiz: [
          {
            questionAr: "ما الذي يقصده روبرت كيوساكي بمصطلح 'سباق الفئران' (Rat Race)؟",
            questionEn: "What is the core meaning of Kiyosaki's 'Rat Race' concept?",
            optionsAr: [
              "المنافسة الشرسة بين الرياضيين والعدائين بالمهرجانات العالمية.",
              "الحلقة المفرغة حيث يركض الموظف خلف الراتب مكرهاً، بدافع الخوف من الفواتير والطمع بالكماليات، فيهدر عمره بالتبعية الوظيفية.",
              "إستراتيجية تجارية تهدف لترقية كفاءة الموظفين ببيئة العمل المشتركة."
            ],
            optionsEn: [
              "The high-friction sports competition of athletes across international arenas.",
              "A vicious cycle of earning a payroll and expanding consumption, driven by fear of bills and greed for luxuries, keeping one trapped in job dependency.",
              "A corporate methodology utilized to expand team collaboration inside open-space environments."
            ],
            correctIndex: 1,
            explanationAr: "سباق الفئران هو العبودية اللطيفة لخانة الراتب مع زيادة النفقات بزيادة الدخل، والذي يزول فقط بالاستثمار الواعي لإنبات الأصول الدائمة.",
            explanationEn: "The Rat Race locks users into jobs. Breaking free demands allocating earnings to self-sustaining investment channels."
          },
          {
            questionAr: "وفقاً للكتاب، كيف يتم تصنيف المسكن الشخصي الحقيقي الخاص بك؟",
            questionEn: "How is your private residential home classified according to Rich Dad?",
            optionsAr: [
              "هو التزام واضح لأنه يستنزف مال صاحبه في ضرائب وصيانة وأقساط مستمرة دون أي تدفق نقد داخل لجيبه.",
              "هو دائمًا أصل عظيم بمجرد شراء الأثاث الداخلي الخاص به.",
              "هو أصل استثماري آمن تضمن البنوك تثبيته بسعر فائدة صفري مدى الحياة."
            ],
            optionsEn: [
              "It is a clear liability because it constantly drains funds for maintenance, utility fees, and interest with zero cash infusing back.",
              "It represents a massive primary asset as soon as you furnish the bedrooms inside it.",
              "It is a riskless investment guaranteed by retail banks to trade at absolute zero tax."
            ],
            correctIndex: 0,
            explanationAr: "المسكن الخاص لا يعطيك مالاً؛ بل يأخذ من نقدك المتداول، لذا فهو محاسبياً يندرج تحت الالتزامات حتى يدر عائداً استئجارياً نظيفاً يفوق كلفة صيانته.",
            explanationEn: "Your private home triggers recurring outflows. It registers as a liability unless it yields net tenant rentals exceeding operations."
          },
          {
            questionAr: "ما هو الفارق الجوهري الفاصل بين 'الأصل' (Asset) و 'الالتزام' (Liability)؟",
            questionEn: "What represents the absolute boundary between an Asset and a Liability?",
            optionsAr: [
              "الأول يحوز شكلاً جميلاً وباهراً بينما الثاني يتلف بسرعة بسبب الزمن.",
              "الأصل يضع المال في جيبك بشكل متكرر وتلقائي، بينما الالتزام يسحب المال باستمرار من جيبك.",
              "الأصل يمثله العمل الحكومي والالتزام يمثله الشغل الخاص المتقلب."
            ],
            optionsEn: [
              "The former has aesthetic styling while the latter degrades rapidly due to natural environment factors.",
              "The asset continuously places cash into your pocket, whereas the liability constantly takes cash out of your pocket.",
              "The asset is represented strictly by public contracts and the liability represents volatile startup tasks."
            ],
            correctIndex: 1,
            explanationAr: "جوهر اللعبة المالية يكمن في تغذية مربع الأصول (كالأسهم، الملكيات الفكرية، ممتلكات الإيجار) وتقليص الالتزامات لتفادي تدفق السقوط الدائم للديون.",
            explanationEn: "Understanding flow is the secret of financial sovereignty: buy income-generating assets, and starve luxury liabilities."
          }
        ]
      },
      {
        id: 'rd_ch2',
        chapterNum: 2,
        titleAr: 'الفصل الثاني: اعتنِ بعملك الخاص وأسرار الضرائب وقوة الشركات الحصينة',
        titleEn: 'Chapter 2: Managing Your Own Business, Taxes & Corporate Power',
        descriptionAr: 'منظومة حماية أصولك، الفرق بين الوظيفة والعمل الحقيقي، وبناء الدرع المؤسسي لمناهضة نزيف الضرائب المتكرر.',
        descriptionEn: 'Protecting your assets, distinction between job vs. business, and utilizing legal corporate vehicles to shield your wealth.',
        lessons: [
          {
            id: 'rd_ch2_l1',
            idNum: 1,
            titleAr: '1. اعتنِ بعملك الخاص: التفرقة الحاسمة بين وظيفتك الحالية ومشروعك المستقبلي',
            titleEn: '1. Mind Your Own Business: Job vs. Asset Column',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك في الفصل الثاني التمكيني للتنمية المالية الفذة! دعنا نغوص في الدرس الثالث الأثير لروبرت كيوساكي: **"اعتنِ بعملك الخاص (Mind Your Own Business)"**.

**ماذا يقصد بالعمل الخاص هنا؟**
هناك خلط فادح يقع فيه البشر: يظنون أن وظيفتهم هي عملهم الخاص. الموظف في البنك أو بشركة سيارات يبني ثروة مالك البنك، أو مالك الشركة طوال عمره، بينما مربع أصوله هو خالٍ تماماً ولا يحوز قنوات إيجاد مستقلة.

**الإستراتيجية الكيوساكية البديعة:**
حافظ على وظيفتك الحالية لتغطية نفقاتك المعيشية وسداد الالتزامات الأساسية، لكن ابدأ فوراً ببناء وتشييد **مربع أصولك الخاص** في أوقات فراغك. اشترِ أسهم شركات واعدة، أسس أصولاً فكرية، واجعل مربع الأصول هو مشروعك الفعلي الحقيقي والفريد الذي ينمو بصمت وارتفاع ساحق.`,
            contentEn: `Welcome to the second module focusing on tactical asset safety! Here, we deconstruct Robert's advice: **"Mind Your Own Business."**

**What is the core distinction?**
Most confuse their job with their business. A banker or auto assembly technician builds the bank owner's or automotive factory owner's wealth, leaving their own asset column dry and empty.

**The Golden Formula:**
Keep your day job to stabilize current living requirements, but aggressively initiate a parallel **asset column** in your silent hours. Direct those allocations toward equities, real estate, or IP licenses, rendering it your genuine business.`
          },
          {
            id: 'rd_ch2_l2',
            idNum: 2,
            titleAr: '2. تاريخ الضرائب وقوة الشركات: كيف يستعمل الأثرياء القانون لحماية ثرواتهم',
            titleEn: '2. Taxes & Corporations: The Secret Armor of the Rich',
            duration: '3m',
            type: 'core',
            contentAr: `يتطرق هذا الدرس لتاريخ فرض الضرائب وكيف تحولت إلى سلاح يبتلع نفقات العمال والطبقة الوسطى بينما يتملص منها الأثرياء باستعمال القانون: **قوة الشركات (Power of Corporations)**.

**المصيدة التاريخية للضرائب:**
تأسست الضرائب عبر إقناع الجماهير بفلسفة: "خذوا من الأثرياء لتطوير الخدمات العامة". لكن الفئات الأكثر ثراءً استعملوا ذكاءهم المالي لتأسيس هياكل قانونية وقائية هي **الشركة المغلقة (Corporation)**.

**سر التباين الضريبي الصارخ:**
- **الموظف والأب الفقير:** يحصل على الراتب ← تقتطع الحكومة الضرائب أولاً ← ينفق ما تبقى من فضلات ماله.
- **الشركة والأب الغني:** تحصل الشركة على العائد المالي ← تنفق وتستثمر الأرباح وتغطي التكاليف أولاً ← تدفع الضرائب على ما تبقى فقط من هوامش بسيطة!`,
            contentEn: `In this lesson, we study the history of taxation and why the employee gets heavily taxed while the wealthy utilize **The Power of Corporations**.

**The Historical Taxation Trap:**
Tax laws were popularized by telling progressives: "Let us tax the ultra-rich for public systems." However, the rich responded with superior legal instruments—specifically, **Corporations**.

**The stark legal contrast of money flow:**
- **The Employee (Poor Dad):** Earns salary → Governments tax first → Spends what microscopic funds remain.
- **The Corporation (Rich Dad):** Receives revenue → Reinvests and spends on absolute operational costs first → Pays minimal taxes strictly on leftover margins!`
          },
          {
            id: 'rd_ch2_l3',
            idNum: 3,
            titleAr: '3. أجنحة الذكاء المالي الرباعي (Financial IQ): ترقية كفاءتك المهنية والصناعية',
            titleEn: '3. The Four Quadrants of Financial IQ',
            duration: '3m',
            type: 'core',
            contentAr: `الذكاء المالي الحقيقي ليس صدفة؛ بل يتكون من تضافر وتآزر أربعة مساقات معرفية كبرى يجب عليك ترقيتها باستمرار:

1. **المحاسبة (Accounting):** القدرة على قراءة كشوف الأرباح والخسائر والميزانيات العمومية ومعرفة مكامن الخلل والصيانة بالشركات.
2. **الاستثمار (Investing):** علم توجيه وصياغة الأموال لتوليد نقد مضاعف بصبر ومخاطرة محسوبة وحصافة فنية.
3. **فهم الأسواق (Understanding Markets):** دراسة العرض والطلب والتحيزات السلوكية للجماهير، واقتناص الفرص قبل تعاظم السعر.
4. **القانون (Law):** الاستفادة الكاملة من المزايا الضريبية وحماية الأصول الفردية والمؤسسية من بطش المعتدين والمصادرات القانونية الجائرة.`,
            contentEn: `Sustained asset growth is not random; it requires the synergy of four core cognitive dimensions:

1. **Accounting:** The tactical proficiency to read and diagnose P&L reports, balance sheets, and cashflow directories.
2. **Investing:** The science of deploying capital to generate passive cash with calculated risks and high strategic leverage.
3. **Understanding Markets:** Comprehending regular supply-demand kinetics, and capturing value before mass hype takes over.
4. **Law:** Utilizing legal shields, corporate formats, and tax incentives to safeguard capital from litigation and decay.`
          },
          {
            id: 'rd_ch2_l4',
            idNum: 4,
            titleAr: '4. محطة العبور: تثبيت التمييز بين الوظيفة وهيكلية الحماية المؤسسية للشركات',
            titleEn: '4. Review Node: Synthesizing Corporate Power & IQ Mastery',
            duration: '3m',
            type: 'review',
            contentAr: `مبارك عليك اجتياز هذا المفرق الحركي الهام الحاضن لاستقرار أصولك! دعنا نلخص أهم أفكار الدرس:

1. **تنمية مربع الأصول الفوري:** لا تعتمد على الوظيفة كمصدر مجدك الوحيد بضمان أمان زائف؛ بل ابنِ ورش عمل هادئة لادخار الأصول الحقيقية بصمت مخلص.
2. **الامتياز القضائي والضريبي للشركات:** تسييس الشركة المغلقة لتكون كياناً قانونياً ينفق أولاً ويدفع الضرائب ثانياً بكل تآزر وثبات.
3. **مكعب الذكاء المالي:** الربط الحاسم للمحاسبة والاستثمار وفهم الأسواق والقانون لتصبح راداراً كاسحاً يستشعر الكنوز المالية.`,
            contentEn: `You have successfully conquered the complex blueprint of corporate leverage and financial IQ! Let us synthesize the cornerstone concepts:

1. **Direct Focus into Assets:** Retain your day job, but treat your personal asset column as your most vital development engine.
2. **Tax & Corporate Inversion:** Leverage limited liability structures to invest pre-tax earnings and defer tax obligations legally.
3. **Financial IQ Matrix:** Master the intersections of accounting, investment, market dynamics, and corporate law.`
          },
          {
            id: 'rd_ch2_l5',
            idNum: 5,
            titleAr: '5. تلميحات وصيغ تطبيقات عملية لاستكشاف دروع الضرائب وتأسيس الشركة الأولى',
            titleEn: '5. Practical Tips: Launching your Corporate Leverage Journey',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث نصائح عملانية فخمة وشهية لتجديد نشاطك المعرفي المالي اليوم:

- **تدريب الإقرار الجوهري:** ابدأ بالتفرقة بين ممتلكاتك الشرفية. تواصل مع محاسب قانوني ناصح واسأله: "ما هو الهيكل الأكثر أماناً لحماية أصلي المهني أو العقاري اليوم؟"
- **تطبيق الإنفاق الذكي وقاعدة أولاً:** ضع كافة نفقات عملك وتطوير مهاراتك والكتب من داخل موازنتك الاستثمارية كخصومات ضريبية لتوسيع مسار ادخاراتك الروتينية.
- **تأسيس معمل القراءة والميزانيات:** اقرأ ميزانيات الشركات العملاقة لفك رموز التلاعب بالأوراق لترقية حاسة الفهم والتحاليل الفنية لديك.
- تقدم الآن ونافس بكل شجاعة واجتز **الفصل الثاني** لتقتنص نقاط الجدارة والتميز لوعيك المالي المتقد!`,
            contentEn: `Here are three dynamic techniques to activate asset protection and corporate systems:

- **The Corporate Feasibility:** Consult a local certified accountant about the most efficient legal structure (LLC, S-Corp) to start housing your digital portfolios.
- **Pre-Tax Spending Optimization:** Structure qualified professional growth expenses, educational books, and devices so they register as pre-tax outlays.
- **Financial Statement Literacy:** Download and examine quarterly balance sheets of public blue-chip corporations to practice identifying structural assets.
- Sit for the **Chapter 2 Gatekeeping Exam** to confirm your mental clarity and access Chapter 3!`
          }
        ],
        quiz: [
          {
            questionAr: "بم ينصح روبرت كيوساكي الأفراد بخصوص التفرقة بين 'وظيفتك الحالية' و 'عملك الخاص'؟",
            questionEn: "How does Robert Kiyosaki differentiate a job from your own genuine business?",
            optionsAr: [
              "بتقليل المجهود بالوظيفة لغرض إهدار طاقة صاحب العمل تعويضاً عن قلة الراتب.",
              "بالمحافظة على الوظيفة نهاراً لتأمين المتطلبات والالتزامات الحيوية، مع بناء وتنمية مربع الأصول الخاص بك بمثابة عملك الخاص الدائم.",
              "بترك الوظيفة فوراً والجلوس بالمنزل انتظاراً لفرصة استثمارية خالية من أي ركود مالي."
            ],
            optionsEn: [
              "By exerting minimal effort at your job to consume the employer's energy in exchange for a low salary.",
              "By retaining your day job to cover immediate requirements while aggressively building and nurturing your personal asset column as your real business.",
              "By resigning instantly and waiting at home for zero-risk, high-payout investment options."
            ],
            correctIndex: 1,
            explanationAr: "الوظيفة هي التي تمنحك الأمان الروتيني المؤقت لدفع الفواتير، بينما عملك الخاص يتركز في بناء الأصول التي تدر وتدفق نقد لثروتك المستحقة.",
            explanationEn: "Your day job supplies temporary resources; your business focuses purely on purchasing real assets that accumulate equity."
          },
          {
            questionAr: "لماذا يستعمل الأثرياء قوة 'الشركات' (Corporations) في إدارة وتوجيه النفقات المتداولة؟",
            questionEn: "Why do wealthy entrepreneurs utilize 'Corporations' to manage their funds?",
            optionsAr: [
              "حتى تتسنى لهم سرقة أموال البنوك والتستر تحت أسماء كيانات خفية وغير ملموسة.",
              "لأن الشركة المغلقة تمنحهم ميزة قانونية كبرى: الحصول على الإيراد ← الإنفاق على الاستثمار والمصاريف أولاً ← دفع الضرائب على المتبقي فقط.",
              "للتخلي التام عن الأصدقاء والنجاة بالمال دون دفع أي رواتب للعمال."
            ],
            optionsEn: [
              "To perform illicit acts and hide identity behind shell entities to bypass international safety standards.",
              "Because corporations offer a powerful legal format: Receive revenue → Deduct investments and expenses first → Pay taxes strictly on leftovers.",
              "To abandon peers and keep capital entirely static without distributing payroll."
            ],
            correctIndex: 1,
            explanationAr: "الامتياز الضريبي الهائل للشركات يمنع اقتطاع الضرائب المباشرة من منبع الأرباح، مما يسمح بإعادة استثمار عوائد المال قبل تفتيتها بالضريبة.",
            explanationEn: "Corporations allow deduction of valid business outlays before calculating income tax, offering immense compounding leverage."
          },
          {
            questionAr: "ما هي الأضلع الأربعة الأساسية المكونة لهيكلية 'الذكاء المالي الشامل' (Financial IQ)؟",
            questionEn: "What are the four pillars of comprehensive Financial IQ defined by Robert Kiyosaki?",
            optionsAr: [
              "المحاسبة كالقراءة العقيمة، الاستثمار الرياضي، المبيعات اللفظية، والصبر الطويل الصامت.",
              "المحاسبة (تسييس Mيزانيات)، الاستثمار (توليد المال)، فهم مجريات الأسواق (العرض والطلب)، والقانون (الحصانة الضريبية والوقاية).",
              "تجنب الرياضيات، الاعتماد الكامل على كفاءة البنوك، الالتزام بالعمل المكتبي، وتجنب الضرائب بطرق خارجة عن المألوف."
            ],
            optionsEn: [
              "Passive bookkeeping, high-risk sports speculation, verbal marketing, and prolonged quiet patience.",
              "Accounting (financial literacy), Investing (money-making strategies), Understanding Markets (supply & demand dynamics), and Law (tax & legal shields).",
              "Avoiding mathematics entirely, relying blindly on commercial banks, strict office routine adherence, and dodging tax through illicit actions."
            ],
            correctIndex: 1,
            explanationAr: "الذكاء المالي هو مزيج متآزر ومترافق من الكفاءة الحسابية، والمعرفة الرياضية للاستثمار، والوعي السلوكي بالأسواق، والحصانة القانونية السامقة.",
            explanationEn: "Financial IQ is a cohesive integration of accounting mechanics, investing logic, market dynamics, and corporate law rules."
          }
        ]
      },
      {
        id: 'rd_ch3',
        chapterNum: 3,
        titleAr: 'الفصل الثالث: قهر عوائق الوهن ومصفوفة التدفق المالي الرباعية والتحرر الشامل',
        titleEn: 'Chapter 3: Overcoming Stagnation, the Cashflow Quadrant (ESBI) & Freedom',
        descriptionAr: 'هيكلة الصمود والمواجهة، تطهير معوقات حركة الاستثمار، وتحليل النموذج الرباعي ESBI لتنصيب مسار حريتك المالية المستدامة.',
        descriptionEn: 'Building intellectual stamina, neutralizing fear and laziness, analyzing the ESBI Quadrant, and designing your ultimate route to financial freedom.',
        lessons: [
          {
            id: 'rd_ch3_l1',
            idNum: 1,
            titleAr: '1. قهر معوقات الصمود الخمسة: الخوف والسخرية والكسل والعادات السيئة والكبر الخفي',
            titleEn: '1. Overcoming the 5 Obstacles: Defeating Fear and Laziness',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك يا صديقي بالمسار المعرفي والمحور الختامي الرائع لكتاب "الأب الغني والأب الفقير"! لنتنبه لأكبر خصوم التغيير المالي: **معوقات الصمود الخمسة**.

**ما هي هذه المعوقات الجاثمة؟**
الوعي المالي وقراءة الميزانيات لا ينفعان دون علاج صلب لهذه العثرات الخمسة:
1. **الخوف:** الخوف من خسارة المال مشلل للحركة؛ الترياق هو التظاهر بالثقة، والمباشرة باستثمارات صغيرة متأثرين بمنطق الأثرياء الذين يحولون الخسارة إلى دافع نصر رصين.
2. **السخرية (الشك):** التشكيك بأعمالك وتطوير أصولك من قبل أصدقائك؛ تذكر أن المشككين ممرضون لعقولهم ويهدمون فاعليتك بصخبهم.
3. **الكسل:** المتمثل في **التظاهر بالانشغال بالوظيفة** لتفادي اتخاذ قرارات مصيرية لعملك الخاص؛ ترياقه هو جرعة صغيرة من **الطموح الصادق وسؤال النفس: ما الذي يمكنني تحقيقه؟**
4. **العادات السيئة:** كدفع التكاليف واستنزاف المال قبل تغذية أصلك؛ كسر التشتت وابدأ بالدفع لنفسك أولاً.
5. **الكبرياء اللدود:** ادعاء الوعي التام والتغطية على غبائك المعرفي بنوع من التعالي؛ ترياقه البسيط هو الصدق والتواضع والتثقيف المستدام.`,
            contentEn: `Welcome, scholar, to the final masterclass chapter of Rich Dad's legacy! Let us study the five emotional and structural obstacles:

1. **Fear:** The anxiety of losing funds freezes action. Wealth creators treat failure as a lesson, not a death blow.
2. **Cynicism:** Disparaging peers and self-doubt. Ignore the constant skepticism of the crowd.
3. **Laziness:** Masked as **perpetual busywork** to avoid taking charge of your assets. Cure it with constructive ambition: "How can I afford it?"
4. **Bad Habits:** Depleting resource coffers. Substitute these with the discipline of paying your asset column first.
5. **Arrogance:** Concealing ignorance behind a mask of pride. Neutralize it by continuous study of Great Works.`
          },
          {
            id: 'rd_ch3_l2',
            idNum: 2,
            titleAr: '2. خطوات الوعي والانبثاق العشر لتشغيل وتدريب إدارتك المالية بنظام',
            titleEn: '2. Ten Steps to Financial IQ Activation',
            duration: '3m',
            type: 'core',
            contentAr: `بناء الصدارة وحيازة ثروتك الواعدة يحتاج لتحفيز عشرة بروتوكولات سلوكية يومية صاغها كيوساكي ليصنع شعلتك:

1. **صياغة رغبة عارمة تفوق روتين المعيشة (العاطفة المتقدة):** اكتب قائمة بـ "أشيائي التي لا أريدها" و "أشيائي التي أرغب بها بصدق" لتغذية إرادتك وعزيمتك.
2. **قوة الاختيار اليومي (استغلال الدقائق):** كيف تنفق دقائق وقتك المتداول؛ استثمرها في الثقافات المالية، ومطالعة مسارات المحترفين بدلاً من التسكع الرقمي الضحل ونقاش الأحقاد التافهة.
3. **انتقاء أصدقائك بحصافة بالغة (قانون التآزر الفكري):** لتتفاعل وتجالس عقولاً مبدعة تتحدث بلغة الأصول والاستثمار، مبتعداً عن قعيدي السبات والوهن والتشاؤم الهدام.
4. **شحذ المنشار والتعلم السريع المتواصل (تطوير الأدوات):** دراسة صيغ ونماذج استثمارية جديدة، والمحافظة على ذهنك متيقظاً يطلب المعارف بنشاط لا يفتر وعزيمة حديدية لا تلين.`,
            contentEn: `Sustaining your momentum relies on Robert's activation codes to wake your dormant genius:

1. **Find a Purpose Greater Than Reality:** Compose a clear matrix of what you aggressive refuse (poverty) and what you deeply desire (independence).
2. **Establish the Daily Sovereign Choice:** Dedicate your precious standard hours to studying diagnostic tools instead of shallow digital noise.
3. **Select Peers Wisely:** Align your social circle with creative, abundance-based minds that regularly talk about compounding pipelines.
4. **Sharpen the Blade:** Continually investigate modern investment models of growth to preserve extreme analytical awareness.`
          },
          {
            id: 'rd_ch3_l3',
            idNum: 3,
            titleAr: '3. ليكن عملك الفعلي لغرض التعلم مدى الحياة لا للتكسب الضيق',
            titleEn: '3. Work to Learn: Compounding Specialized Skills',
            duration: '3m',
            type: 'core',
            contentAr: `يقف روبرت كيوساكي بسترة القيادة ليعلن مبدأه التاريخي: **"اعمل لكي تتعلم، لا لكي تجمع المال فقط"**.

**ما تفتقده الأكاديميات الكسولة:**
توفر المدارس العامة والخاصة تدريباً تقنياً ضيقاً لتصبح موظفاً بارعاً يسلم رصيد عمره لشكر الآخرين، فيتعلم الطب والمهندسون إدارة مهنهم لكن يغيب عن وعيهم تماماً شفرة إدارة العمل وإجراء التحالفات الملتزمة بالثقة والمهارة الفنية.

**شفرة المهارات الكاشفة:**
لتبسط نفوذك المهني وترفع مخرجاتك، تحتاج لاكتساب وترصيع المهارات الثلاثة الأسمى:
1. **إدارة التدفق النقدي (Cashflow Management):** معرفة قنوات دخول وخروج النقد بكل حصافة وموازنة.
2. **إدارة وتوجيه الكيان والنظم (Systems):** كيفية قيادة الفريق وتفويض المهام وتسييس الهياكل لتتحرك الماكينة بنجاح آلي.
3. **إدارة وقيادة الجماهير والناس (People):** التواصل الباهر الذكي والقدرة على البيع والتسويق والتفاوض اللبق وبناء الوفاق التام.`,
            contentEn: `In this lesson, we study Robert's critical directive: **"Work to Learn, Not to Earn."**

**The systemic academic blindness:**
Universities train you to obtain highly specialized skills. Thus, physicians and engineers learn to operate tools but completely ignore how to run systems and organize joint ventures with deep integrity.

**The Three Management Capabilities:**
To ensure your workplace success and capture real market space, develop:
- **Cashflow Management:** Orchestrating inflows and outflows with total accuracy.
- **Systems Management:** Organizing structures and delegating operations so the engine runs automatically.
- **People Management:** Superior sales, soft communication, and leading peer collaboration.`
          },
          {
            id: 'rd_ch3_l4',
            idNum: 4,
            titleAr: '4. محطة العبور: نموذج مصفوفة التدفق المالي الرباعية (ESBI) ودستور التحرر المالي الشامل',
            titleEn: '4. Review Node: Synthesizing the Cashflow Quadrant (ESBI)',
            duration: '3m',
            type: 'review',
            contentAr: `مبارك مبروك! لقد تكللت مسيرتك التنموية بتمام استيعاب المسار الملحمي لكتاب "الأب الغني والأب الفقير"! لنتأمل خلاصة رحلتنا التحررية ومصفوفة التدفق المالي الرباعية الشهيرة (Cashflow Quadrant):

- **E (Employee - الموظف):** يبيع وقته من أجل راتب؛ هدفه الأمان المؤقت، وضرائبه في الأعلى حدة.
- **S (Self-Employed - صاحب المهنة الحرة):** هو الآلة الحقيقية بنطاق عمله (كالأطباء، المحامين)؛ إذا غاب غاب النقد والإنتاج.
- **B (Business Owner - صاحب المشروع):** يملك الهيكل والنماذج والوفاق الجماهيري؛ الناس تعمل لصالحه والنظام يتحرك تلقائياً بمهارة فائقة.
- **I (Investor - المستثمر):** المال يعمل لصالحه؛ يراقب ويزيد الأصول ويحصد الأرباح بكرنفالية شجاعة وعزيمة لا تفتر.

طريق الفتوحات الحقيقية تبدأ بعبورك السلس والشجاع من مربعي اليسار (E, S) نحو وفاق مربعي اليمين (B, I) مستعيناً بالذكاء المالي والصبر والصمود اليقين!`,
            contentEn: `Congratulations! You have finalized the complete "Rich Dad Poor Dad" masterclass path! Let us synthesize the ultimate Cashflow Quadrant (ESBI) blueprint:

- **E (Employee):** Trades precious time for a salary; values security above all, and carries the heaviest tax burden.
- **S (Self-Employed):** Owns a job but is himself the main component (doctors, private lawyers); if they stop, revenue halts.
- **B (Business Owner):** Owns complex corporate systems; leverages other people's efforts to move the business automatic.
- **I (Investor):** Compels money to work for them, compiling dividends and scaling up capital with complete peace.

Sovereignty belongs to crossing securely from the Left Side (E, S) to the Right Side (B, I) of the Cashflow Quadrant using superior financial intelligence!`
          },
          {
            id: 'rd_ch3_l5',
            idNum: 5,
            titleAr: '5. ممارسات المعيشة الفعالة وتكريس رصيد الإحراز المعرفي المالي الشامل مدى الحياة',
            titleEn: '5. Practical Tips: Cementing your Lifelong Abundance Blueprint',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث نصائح إرشادية وتدريبات عملية لتنشيط ركائز النجاح والفعالية الختامية اليوم:

- **تدريب الإقرار الرباعي (ESBI):** صنف علامتك وسلوكك اليومي بصدق تام: "ما هي نسبة التدفق القادم لجيبي من مربع المستثمر ومربع صاحب العمل؟" ضع خطة عشرية لترقية النسبة.
- **رصيف الصمود ضد السخرية:** عندما يتهكم الآخرون على سكتك الاستثمارية، تذكر عهد ورش العمل ومربع الأصول الهادئ الموثق في عقلك؛ واصمت شجاعاً وتكلم بالمخرجات الساطعة والأصول المتنامية.
- ترفق يا صديقي وثبت شراع علمك وجرب بقوة واجتز **التقييم الشامل الختامي** لإصدار وتثبيت **شهادة إتمام المسار ومطابقة المقاييس الكبرى للثقافة المالية 🎓!**`,
            contentEn: `Here are three pragmatic formulas to anchor your lifelong continuous financial upgrade path today:

- **The ESBI Diagnostic:** Review your current income structure and ask: "What percentage originates from the B and I quadrants?" Plan progressive steps to rebalance.
- **Skeptic Buffer:** When peer pressure calls your progressive plans foolish, quietly focus on refining your asset column and speak only through net outcomes.
- Take a deep, proud breath, and sit for the **Chapter 3 final evaluation** to officially generate your **Continuous Financial Achievement Certificate 🎓!**`
          }
        ],
        quiz: [
          {
            questionAr: "ما الذي تجسده مصفوفة التدفق المالي الرباعية (Cashflow Quadrant) التي صاغها كيوساكي؟",
            questionEn: "What is the primary taxonomy of the ESBI Cashflow Quadrant?",
            optionsAr: [
              "نموذج يوضح تقسيمات الطبقة الاجتماعية بناءً على التعليم الأكاديمي والشهادات.",
              "رؤية هندسية تحدد مصادر النقد لأربع فئات: الموظف (E)، المستقل (S)، صاحب المشروع (B)، والمستثمر (I)، وترشدك للانتقال لليمين.",
              "طريقة ميكانيكية لترتيب مبيعات السيارات بالمؤسسات الإنتاجية الفارهة."
            ],
            optionsEn: [
              "A social status model that classifies individuals solely based on academic titles and test scores.",
              "A clean schematic partitioning income paths into Employee (E), Self-Employed (S), Business Owner (B), and Investor (I), guiding your transit to the right.",
              "A mechanical cataloging method utilized to map logistics networks inside heavy industries."
            ],
            correctIndex: 1,
            explanationAr: "مصفوفة ESBI ترشدك للتحرر المالي عبر نقل سلوكك وادخاراتك من بيع الوقت (E, S) إلى تشغيل النظم والمال ليصنعا لك عائداً ذاتياً نامياً (B, I).",
            explanationEn: "The ESBI Quadrant helps you shift from trading hours for survival (E, S) to utilizing automated networks and capital (B, I)."
          },
          {
            questionAr: "بم ينصح الكتاب بخصوص تسييس شعار ليكون العمل للتعلم لا للمال؟",
            questionEn: "Why does Robert Kiyosaki claim individuals should 'Work to Learn, Not to Earn'?",
            optionsAr: [
              "لأن جمع المال نشاط ضار بالبيئة يتنافى مع مبادئ المسؤولية الفردية الكونية.",
              "لأن التكسب الضيق دون ادخار مهارات كبرى كإدارة التدفق وإدارات الناس يبقيك رهينة الصدمات عند غياب الرواتب الكسولة.",
              "حتى يتعود الموظف العمل بلا أجر لخدمة مصالح الشركات دون معارضة فنية."
            ],
            optionsEn: [
              "Because gathering funds is historically detrimental to ecological settings, clashing with cosmic values.",
              "Because laboring strictly for cash without mastering core capabilities like cashflow, systems, and people management leaves you vulnerable.",
              "So that employees get accustomed to executing duties for free to protect corporate profit margins from labor debates."
            ],
            correctIndex: 1,
            explanationAr: "العبرة في تداول وترصيع المهارات المتكاملة (كالتسويق، القيادة والمبيعات) لتكون مستعداً لقيادة وإطلاق مشروعك المالي الخاص بجودة وسهولة.",
            explanationEn: "Mastering cross-functional skills (sales, bookkeeping, leadership) builds the toolbox required to direct complex corporate vehicles."
          },
          {
            questionAr: "كيف يعالج كيوساكي عائق 'الكسل' (Laziness) الذي يمنع تطور الوعي المالي؟",
            questionEn: "How does Robert Kiyosaki diagnose and cure 'Laziness' in financial development?",
            optionsAr: [
              "عبر التظاهر الدائم بالانشغال بالوظيفة الروتينية للتهرب من القرارات الصعبة والتغلب على الهم بالسبات الطويل.",
              "عبر إيقاظ طموح صادق وسؤال النفس: 'كيف يمكنني شراء أو تحقيق ذلك؟' مما ينشط الدماغ لصناعة مسارات الوعي المبتكر.",
              "برفض المبادرة وقبول الفقر بمثابة مسار روحي زاهد لا يقبل الرفاه المعرفي."
            ],
            optionsEn: [
              "By masking it as intense workplace busywork, escaping hard strategic questions by remaining comfortably occupied.",
              "By igniting a tiny dose of healthy greed to trigger the mental query: 'How can I afford it?' which forces the brain to discover options.",
              "By rejecting initiative altogether and accepting extreme constraints as an honorable path unrelated to professional growth."
            ],
            correctIndex: 1,
            explanationAr: "الكسل الخفي هو الهروب من المبادرات والقرارات السامقة بذريعة الانشغال بالعمل المعتاد، وسؤاله العلاجي هو محرك الدماغ لصنع معجزة الثراء المفقودة.",
            explanationEn: "Passive procrastination often hides inside workplace routines. Asking active diagnostic questions ignites creativity."
          }
        ]
      },
      {
        id: 'rd_ch4',
        chapterNum: 4,
        titleAr: 'الفصل الرابع: قهر معوقات الصمود الخمسة وتطهير العقلية الاستثمارية',
        titleEn: 'Chapter 4: Conquering the Five Major Financial Obstacles',
        descriptionAr: 'تحليل وتذويب الخوف، الشكوك والتهكم، الكسل الخفي، العادات السلبية الكسولة، والغرور الذي يبيد الأصول المادية.',
        descriptionEn: 'Deconstructing fear, cynicism, hidden laziness, toxic spending habits, and active arrogance.',
        lessons: [
          {
            id: 'rd_ch4_l1',
            idNum: 1,
            titleAr: '1. حاجز الخوف والشكوك: كيف تتصرف عندما تعصف بك الخسائر؟',
            titleEn: '1. Overcoming Fear of Loss: Shifting Your Focus to Compound Assets',
            duration: '4m',
            type: 'intro',
            contentAr: `الخوف من خسارة المال شيء طبيعي جداً؛ حتى روبرت كيوساكي يؤكد أنه لم يلتقِ بمستثمر غني واحد لم يخسر مالاً قط خلال مسيرته.

**الفرق الفني الحاسم:**
- **الأغنياء:** لا يبيدهم الخوف من الخسارة بل يحفزهم ويتعلمون منه (مثل شعار تكساس: "افتخر بالهزائم وتذكر ألم الهزيمة كوقود للنصر القادم").
- **الفقراء (مالياً):** يشلّهم الخوف من الغباء أو الخسارة، فيتجنبون ركوب موجات الاستثمار والمبادرة ويبحثون حصراً عن سجون الأمان الوظيفي.

**How to conquer fear?**
ابدأ مبكراً واستعمل قوة الفائدة المركبة لبناء أصول مصغرة تنمو وتتعلم من خلال تداولاتها المتعددة بكفاءة.`,
            contentEn: `The fear of losing capital is natural. Every self-made high-net-worth individual has experienced losses.

**The distinguishing response:**
- **The Wealthy:** Learn from losses and let defeat serve as rocket fuel (e.g., the Texas adage "Remember the Alamo" -> honoring losses as inspiration to play harder).
- **The Safe-Players:** Are paralyzed by fear, which prompts them to avoid opportunities and cling permanently to static payroll structures.

**Defeating financial fear:**
Begin as early as possible. Let the power of compound interest work on micro-assets while you expand your tactical understanding.`
          },
          {
            id: 'rd_ch4_l2',
            idNum: 2,
            titleAr: '2. الكسل الذهني والغرور المدمر: كيفية التغلب على فخ تزييف الصدارة',
            titleEn: '2. Confronting Subtle Laziness and Arrogance',
            duration: '3m',
            type: 'core',
            contentAr: `الكسل لا يأتي دائماً بالجلوس كسولاً بلا عمل؛ بل يأتي غالباً **بالانشغال المفرط بالوظيفة اليومية الروتينية** للهرب من التفكير المالي الصعب والتخطيط لتأسيس مشروعك الخاص.

**تطهير الغرور:**
يحدد كيوساكي الغرور بمثابة: **"الجهل متنكراً برداء الكبر"**. فعندما يجهل شخص مفهوماً مالياً، يحاول إخفاء ضعفه بالسخرية أو الاستعراض المالي التافه.

لعلاج هذه الآفات، التزم بمطاردة الحقائق والتسلح بالتواضع المستمر والتعلم الأكاديمي الصامت لتنمي فكرك وأصولك بانتظام.`,
            contentEn: `Laziness frequently manifests as being completely "busy" with routine workplace tasks, utilizing extreme busywork as a subconscious escape from strategic thinking.

**Deconstructing Arrogance:**
Kiyosaki claims: **"Arrogance is ego plus ignorance."** When a professional is ignorant about a specific financial parameter, they try to mask and defend it with sarcasm or dismissive pride.

To cure these weaknesses, commit to lifelong study, embrace the quiet feedback of raw data, and seek structured education.`
          },
          {
            id: 'rd_ch4_l3',
            idNum: 3,
            titleAr: '3. مهارات المواجهة: صيغ عملية لتسجيل الفواتير وتقليص الديون',
            titleEn: '3. Standard Tips: Practical Tools for Financial Self-Defense',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك خطة العمل لمجابهة المعوقات واستعادة السيادة:
            
- **ادفع لنفسك أولاً (Pay Yourself First):** خصص نسبة محددة للاستثمار قبل تسديد أي التزام استهلاكي، فذاك يجبر عقلك على ابتكار طرق تزيد بها دخلك بمرونة بالغة.
- **استئصال السلبية والشكوك:** تجنب مجالس الشاكين المتهكمين في الصباح، وتسلح بالقوة والدروس الإحصائية المعتمدة والموجودة بداخل كتب الوعي المالي.`,
            contentEn: `Actionable steps to eliminate blocks and claim complete mastery starting today:
            
- **The Self-First Priority:** Dedicate a specific 10% fractional transfer to your investment accounts before you clear bills. It forces your logical resources to discover secondary income streams.
- **The Negativity Shield:** Avoid morning coffees with cynical, passive colleagues. Instead, read detailed statistical books and real financial case studies.`
          }
        ],
        quiz: [
          {
            questionAr: "كيف يتم تعريف 'الكسل الخفي' بقرارات وعقلية الاستثمار المعاصرة؟",
            questionEn: "What is Robert Kiyosaki’s diagnosis of hidden financial laziness?",
            optionsAr: [
              "النوم لفترات طويلة والجلوس بلا حركة طوال اليوم.",
              "الهروب من التفكير الاستراتيجي وتخطيط الأصول عبر شغل نفسك المفرط بالوظيفة الروتينية المعتادة.",
              "القيام بمطاردة المبيعات وتأسيس الشركات بشكل متواصل ومتسارع."
            ],
            optionsEn: [
              "Sleeping for excessive hours and sitting permanently immobile during weekends.",
              "Escaping critical financial thinking and asset planning by keeping oneself excessively busy with comfortable office routines.",
              "Executing continuous startup creation and building businesses rapidly."
            ],
            correctIndex: 1,
            explanationAr: "الكسل الخفي هو الهروب من المبادرات والقرارات السامقة بذريعة الانشغال بالعمل المعتاد، وسؤاله العلاجي هو محرك الدماغ لصنع معجزة الثراء المفقودة.",
            explanationEn: "Passive procrastination often hides inside workplace routines. Asking active diagnostic questions ignites creativity."
          }
        ]
      },
      {
        id: 'rd_ch5',
        chapterNum: 5,
        titleAr: 'الفصل الخامس: ذكاء ريادة الأعمال وصك الأصول وصنع المعجزات بمشروعك الخاص',
        titleEn: 'Chapter 5: Enterprise Intelligence & Structuring Your Wealth Systems',
        descriptionAr: 'منظومة تأسيس الشركات، قوانين التداول، والذكاء المالي الرباعي لتحويل المعارف المهنية لثروة مستديمة صامدة.',
        descriptionEn: 'The business creation blueprint, trading rules, and combining the four pieces of Financial IQ to scale assets.',
        lessons: [
          {
            id: 'rd_ch5_l1',
            idNum: 1,
            titleAr: '1. ذكاء ريادة الأعمال الرباعي: ترقية كفاءتك المهنية والصناعية',
            titleEn: '1. The Four Pieces of Financial IQ: Accounting, Strategy, Markets & Law',
            duration: '4m',
            type: 'intro',
            contentAr: `يتكون مفهوم الذكاء المالي الشامل (Financial IQ) من أربعة معارف علمية وتطويرية متكاملة إذا تضافرت معاً تحقق الثراء والصدارة الكبرى:

1. **المحاسبة (Accounting):** القدرة على قراءة البيانات المالية ودفاتر الموازنة، وتحديد خانة الأصول بيقين مبرهن.
2. **الاستثمار (Investing):** علم توجيه وصياغة خطط نمو النقد، وجعل المال يتوالد ذاتياً دون بذل مجهودك البدني المستمر.
3. **فهم الأسواق (Markets):** معرفة تفاصيل العرض والطلب المالي، والتناغم السلوكي الموجه للمستهلكين.
4. **القانون والضرائب (Law):** فهم الدرع القانوني للمؤسسات والشركات لتسييس اللوائح وحماية أرباحك الشرعية تماماً من النزيف.`,
            contentEn: `True Financial IQ represents the powerful integration of four distinct fields of expertise:

- **Accounting (Financial Literacy):** The vital skill of analyzing balance sheets, income flows, and distinguishing assets.
- **Investing (Strategy):** The science of deploying capital to generate passive dividends and compound wealth.
- **Understanding Markets:** Analyzing the forces of supply and demand, and grasping customer psychology and macro trends.
- **Law & Taxes:** Utilizing legal corporate envelopes and regulatory structures to protect your income from unnecessary tax drain.`
          },
          {
            id: 'rd_ch5_l2',
            idNum: 2,
            titleAr: '2. هندسة الشركات والتدفق النقدي: كيف يملك الأثرياء كل شيء ولا يملكون شيئاً؟',
            titleEn: '2. The Legal Fortress: Corporate Wealth Architecture',
            duration: '3m',
            type: 'core',
            contentAr: `يقف كارسون وكيوساكي معاً لتفكيك سر عظيم للأثرياء: **"الشركات هي أعظم درع حماية اخترعته البشرية"**.

- **الموظفون والمدراء:** يجنون المال ← يُخصم منهم الضرائب أولاً عشوائياً ← ينفقون ما تبقى من فتات الراتب.
- **الشركات المغلقة والمؤسسات:** تجني المال ← تنفق وتستثمر الأرباح بالماكينة المهنية وتقتطع نفقات الصيانة والأصول ← ثم تدفع الضرائب على ما تبقى فقط من الأرباح الموزعة.

هذا التحيز والاستغلال الذكي للقوانين واللوائح يمنحك سرعة فائقة جداً في الادخار وتكثيف رصيد أصولك بمرور السنين.`,
            contentEn: `Kiyosaki demystifies are crucial asset-protection structure: **"The Corporation is the most efficient wealth shield ever invented."**

- **Employees:** Earn money -> Are automatically taxed first -> Spend the remaining cash to survive.
- **Corporations:** Earn money -> Spend on valid operational expenses, assets, and development -> Pay tax only on the remainder.

Leveraging legal corporate vehicles accelerates your compound growth rate, expanding your asset column year over year.`
          },
          {
            id: 'rd_ch5_l3',
            idNum: 3,
            titleAr: '3. ممارسات ومكاسب ريادة الأعمال: تسييس الأنظمة وتأسيس الدرع الأول',
            titleEn: '3. Standard Tips: Initiating Your Business Structure Today',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه الارشادات لتبدأ رحلتك نحو الريادة والتحرر المالي الحقيقي اليوم:
            
- **تأسيس شركة مهنية مصغرة:** جرب تأسيس كيان قانوني خاص بك لتتعلم من خلال الممارسة قوانين المحاسبة والضرائب وقواعد تسييس اللوائح.
- **تنشيط الذكاء المحاسبي:** خصص ساعة أسبوعياً لقراءة تقارير موازنات شركات وبنوك معروفة في السوق؛ فالممارسة والاعتياد هما أصل الريادة والامتياز المالي الشامل.`,
            contentEn: `Practical roadmap to develop your corporate toolbox today:
            
- **Start a legal entity:** Establish a micro-business vehicle to learn bookkeeping, legal tax optimization, and operational laws in absolute safety.
- **Accounting Practice:** Dedicate 1 hours every weekend to review the balance sheets of listed companies. Practice turns complex spreadsheets into simple maps of success.`
          }
        ],
        quiz: [
          {
            questionAr: "كيف تختلف الدورة المالية للشركات والمؤسسات عن الدورة المالية للموظفين والأفراد؟",
            questionEn: "How does the core tax/financial loop of a Corporation differ from that of an Individual?",
            optionsAr: [
              "الشركات لا تدفع أي شكل من أشكال الضرائب أو الرسوم بالدولة.",
              "الموظف يدفع الضرائب أولاً من المنبع وينفق ما تبقى، بينما الشركة تنفق أولاً على أعمالها وأصولها ثم تدفع الضرائب على المتبقي.",
              "الشركة تدفع مبالغ مضاعفة بمجرد شراء الكراسات والملفات المكتبية."
            ],
            optionsEn: [
              "Corporations are entirely exempt from all forms of state taxes, tariffs, and bookkeeping fees.",
              "Individuals earn, pay taxes, and spend. Corporations earn, spend on operations and asset growth, and pay taxes only on what is left.",
              "Corporations are penalized with double tax rates as soon as they purchase standard printing items."
            ],
            correctIndex: 1,
            explanationAr: "تسييس واستخدام الدرع القانوني للمؤسسات يحمي عوائد أصولك ويضاعف سرعتك في تنمية المكن الاستماري والتمكين المالي.",
            explanationEn: "Using a corporate shell is crucial to protect your income from tax drain and accelerate capital compounding."
          }
        ]
      }
    ]
  },
  {
    id: 'you_can',
    titleAr: 'كتاب أنت تستطيع للتطبيقات التنموية والنجاح',
    titleEn: 'You Can - Principles of Supreme Achievement',
    authorAr: 'جورج ماثيو أدامز',
    authorEn: 'George Matthew Adams',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
    descriptionAr: 'منظومة حافزة لربط العزيمة الفردية، وتفعيل الرغبة الصلبة، وتنظيم بوصلة العمل والإيجابية اليومية والتعلم المستديم.',
    descriptionEn: 'A powerful collection of brief, inspiring talks on self-belief, individual initiative, and mental fortitude.',
    isLocked: false,
    chapters: [
      {
        id: 'yc_ch1',
        chapterNum: 1,
        titleAr: 'الفصل الأول: معتقد اليقين - المبادرة وقوة الإرادة والشغل المنظم',
        titleEn: 'Chapter 1: The Creed of Self-Belief - Private Focus & Will',
        descriptionAr: 'كيف تؤسس ثقة فولاذية بالذات، وتصنع إرادتك لتكون مديراً عاماً ومحورياً لحياتك بجدية ونظام.',
        descriptionEn: 'Erecting robust self-belief, taking control of your faculties as a General Manager, and organizing daily efforts.',
        lessons: [
          {
            id: 'yc_ch1_l1',
            idNum: 1,
            titleAr: '1. أنت تستطيع: تحرير المارد الكامن ورصيد الثقة الذاتية',
            titleEn: '1. You Can! Unlocking your Potential and Self-Belief',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك يا صديقي في مسار التمكين المعرفي الثالث لكتاب جورج ماثيو أدامز الملحمي: **أنت تستطيع!**

**لماذا هذا المفهوم مهم؟**
الاعتقاد الجوهري لـ "أنت تستطيع" هو أنك قادر تماماً على تشكيل وصنع أي شيء ينبت بذاره داخلك. النجاح يبدأ بقرار مخلص بأن البذور الإبداعية التي وضعها الخالق في داخلك مهيأة للنمو والارتفاع الساحق، طالما اقترنت بأهداف عالية وإرادة حديدية لا تلين. 

**ماذا ستستفيد من هذا الدرس**
تذكر أنك وحدك المسؤول عن تحديد القمة التي تصبو إليها. تجاهل السخرية والتهكمات الجانبية للذين يحيطون بك؛ لأن رصيدك الحقيقي يتراكم من الإيجابية اليومية والتركيز الشجاع على مساق عملك الخاص والفريد.`,
            contentEn: `Welcome, scholar, to George Matthew Adams' empowering classic: **You Can!**

**Why is this concept important?**
The foundational premise of "You Can" is that you can make of yourself anything the germ of which lives within you. Ultimate achievement starts with a decision that internal potentials are destined for growth when paired with high aims and iron will.

**What is your takeaway?**
You determine the exact height to which you shall climb. Disregard criticism, sneers, and secondary noise. Your value compounding relies entirely on your own positive momentum and undivided attention on your target.`
          },
          {
            id: 'yc_ch1_l2',
            idNum: 2,
            titleAr: '2. المدير العام: تولي المسؤولية والسيطرة الكاملة على قراراتك',
            titleEn: '2. The General Manager: Taking Full Responsibility of your Life',
            duration: '3m',
            type: 'core',
            contentAr: `يتطرق الكاتب في هذا الدرس البديع لـ **مبدأ القيادة الذاتية الفطنة**: "أنت المدير العام لكيانك الخاص". 

**ماذا يعني ذلك لك؟**
البشر لم يولدوا ومعهم كتيب تعليمات جاهز؛ بل وُهبوا القدرة على قيادة وإدارة أنفسهم بشكل مستمر ومفعم باليقين. إذا سمحت لمخاوفك وعواطفك وصداقاتك العشوائية الهابطة بأن تدير دفتك، فإنك تتنازل عن منصب "المدير العام" وتصبح أجيراً لدى ظروفك.

**التطبيق العملي الفوري:**
اعقد فوراً اجتماعاً داخلياً مع قواك العقلية ومواهبك وقيمك الكبرى. اتخذ قرارات حاسمة، وأغلق الأبواب بجرأة أمام التشتت، واجلس على رأس الطاولة لتوجيه وبناء نجاحك بنفسك وبكل احترام للذات.`,
            contentEn: `In this Lesson, we deconstruct **the Principle of Self-Management**: "You are your own General Manager."

**What does this represent?**
Humans were not born with a pre-written instructions manual; they were created to run themselves. If you allow random fears, anxieties, or environment dependencies to dictate your path, you abdicate your executive throne.

**Pragmatic takeaway:**
Call a sharp meeting of your intellectual faculties and core values. Sit at the head of the table, lock out distractions, make decisive values-aligned plans, and aggressively run your operations with high self-trust.`
          },
          {
            id: 'yc_ch1_l3',
            idNum: 3,
            titleAr: '3. بساطة المنهجية والنظام: تحويل الطاقة اليومية لقوة كاسحة',
            titleEn: '3. Power of System: Organizing Energy for High Output',
            duration: '3m',
            type: 'core',
            contentAr: `النظام والمنهجية هما قنوات العبور التي تتدفق من خلالها طاقتك بفعالية فائقة وبلا أدنى تشتيت. 

**قوة التنظيم البنائي:**
دون نظام، حتى المهام الأكثر ضخامة وقوة ستنهار أمام العشوائية والفوضى. التفكير المنظم وتخطيط الغايات في المساء قبل النوم يمنحك انطلاقة استباقية ممتازة لخوض يومك بلياقة عالية ونشاط وقاد.

**التطبيق العملي الفوري:**
الالتزام بـ "طقس المنهجية": تنظيم المهام اليومية، تبسيط المخرجات، وبناء المربع الثاني بصلابة ليتحول العمل من عبء ثقيل إلى متعة إنجاز فخمة ومتلاحقة.`,
            contentEn: `System and organization represent the pipelines through which your energy flows with absolute maximum efficiency.

**The power of systematic action:**
Without system, even the most stupendous tasks crumble into messy blocks. Planning your target outline the night before gives you an excellent tactical headstart, starting your day with sharp focus.

**Pragmatic takeaway:**
Form the habit of executing even minor daily duties through proper system. Convert erratic actions into deliberate, structured blocks to make work elegant and rewarding.`
          },
          {
            id: 'yc_ch1_l4',
            idNum: 4,
            titleAr: '4. محطة العبور: مراجعة ركائز معتقد الثقة والمسؤولية المنهجية',
            titleEn: '4. Review Node: Foundations of Private Trust and Control',
            duration: '3m',
            type: 'review',
            contentAr: `لقد قطعت شوطاً تنموياً خنفشارياً في تفكيك المبادئ الأولى للمعيشة الشجاعة! دعنا نلخص ركائز العبور الأساسية:

1. **اليقين بالذات (أنت تستطيع):** الإيمان برصيد إمكانياتك الكامنة، وتحديد سمت أهدافك العالية دون الاكتراث للتثبيط والضجيج الخارجي.
2. **القيادة الذاتية (المدير العام):** تولي زمام قيادة ذاتك بمسؤولية كاملة، واعتبار المبادئ الصادقة هي البوصلة الحاكمة لأعمالك.
3. **العيش المنهجي البسيط (النظام):** تحويل المهام اليومية لنقاط حركية منظمة لتقليص جهد الهدر ومضاعفة إنتاجيتك الواعية.`,
            contentEn: `You have completed the private baseline for self-belief and structured action! Let us synthesize the cornerstone concepts:

1. **Absolute Self-trust (You Can!):** Believe in your inner potential, targeting high aims and ignoring external skepticism.
2. **Take Executive Command (General Manager):** Assume total responsibility for your mind and actions, keeping principles as your core guide.
3. **Structured Daily Operations (System):** Design simple, repeatable frameworks to direct erratic motions into productive goals.`
          },
          {
            id: 'yc_ch1_l5',
            idNum: 5,
            titleAr: '5. دليل السلوك للتجرد من بذور الشك والتسويف والتردد',
            titleEn: '5. Practical Tips: Banishing Self-Doubt and Hesitation',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث نصائح إرشادية وتطبيقات عملية لتوطين المبادئ الثلاثة اليوم:

- **تدريب الإقرار الفردي:** اسأل نفسك يومياً: "لو كنت المدير العام الفعلي لحياتي اليوم، هل هذا السلوك يقود لتطوير أصولي المهنية أم تبديدها؟" تراجع فوراً وصحح اتجاهك.
- **خطة الأهم العشري (10 Items):** اكتب قبل النوم قائمة بأهم عشرة ممارسات تود إنجازها في الصباح الباكر، ونفذها بنظام وبلا أدنى تسويف.
- **الوضوح التام (الصراحة):** تواصل بصراحة وشفافية بالغة مع زملائك، وعزز رصيد ثقتك بقراراتك الشجاعة المتفقة مع مبادئك الأخلاقية.
- تقدم الآن ونافس بكل شموخ واجتز **الفصل الأول** لتقتنص نقاط الجدارة المعرفية!`,
            contentEn: `Here are three pragmatic techniques to cement internal self-belief:

- **The Executive Audit:** Ask yourself daily: "If I were the literal General Manager of my career today, does this behavior develop my assets or waste them?" Correct your course immediately.
- **The Top 10 Blueprint:** Each evening, outline the 10 most crucial, values-aligned tasks to accomplish the next morning, and execute them with system.
- **Extreme Openness (Frankness):** Communicate with deep clarity and transparency, maintaining absolute integrity in your covenants.
- Proceed to the **Chapter 1 Gatekeeping Quiz** to secure your continuous progression!`
          }
        ],
        quiz: [
          {
            questionAr: "ما الذي تعنيه فلسفة الكاتب في أنك 'المدير العام' (General Manager) لذاتك؟",
            questionEn: "What are the core implications of assuming the role of your own 'General Manager'?",
            optionsAr: [
              "الانتظار حتى تسنح الفرصة تلقائياً للتحكم في شؤون الآخرين التجارية.",
              "تولي المسؤولية التامة عن قيادة وإدارة عقلك ومواهبك وتوجيهها الواعي نحو الأهداف السامية دون لوم للظروف.",
              "تجنب القرارات الصعبة لإبعاد التوتر والضغط النفسي."
            ],
            optionsEn: [
              "Waiting passively for opportunities to manage other people's commercial projects.",
              "Assuming absolute personal responsibility for directing your own intellect, talents, and focus toward worthy ambitions.",
              "Avoiding difficult choices to prevent psychological tension."
            ],
            correctIndex: 1,
            explanationAr: "أنت المدير العام الحصري لطاقتك وقوتك، والتنازل عن هذا الدور يعني السماح للفوضى العشوائية والظروف الخارجية بصياغة مستقبلك بالنيابة عنك.",
            explanationEn: "You are the exclusive leader of your life. Abdicating this role means handing over your potential to external forces."
          },
          {
            questionAr: "كيف يعمل 'النظام' (System) على تعزيز فاعلية الإنسان وفقاً لأدامز؟",
            questionEn: "How does implementing 'System' enhance human effectiveness according to George Matthew Adams?",
            optionsAr: [
              "يعمل على هيكلة وتبسيط المخرجات والأعمال اليومية، مما يمنع الفوضى ويوجه الطاقة المضاعفة لتحقيق غاياتك بعبور سلس.",
              "يسهم في زيادة التعقيد والتأخير في تسليم الأعمال والمهام.",
              "هو ترف مهني هامشي يسلب الفرد حريته وعفويته بالتنفيذ."
            ],
            optionsEn: [
              "It structures, simplifies, and channels daily outputs, replacing chaos with streamlined energy pointing towards high goals.",
              "It introduces unnecessary complexity and administrative delays into basic task executions.",
              "It is an optional luxury that restricts individual freedom and spontaneous inspiration."
            ],
            correctIndex: 0,
            explanationAr: "دون تنظيم واعد ومنهجية واضحة، تفقد الأعمال الضخمة بوصلتها وتتبدد الطاقة، بينما النظام يحول Sلوكيات المعقدة لخطوات سهلة العبور.",
            explanationEn: "Without simple, purposeful system, energy degrades. Structured planning converts complicated duties into highly rewarding tracks."
          },
          {
            questionAr: "كيف تتأسس العادة الذهنية لبرنامج 'أنت تستطيع' (You Can) على أرض الواقع؟",
            questionEn: "How is the core mindset of 'You Can!' established in your daily operations?",
            optionsAr: [
              "عبر انتظار رضا الجميع، ومطابقة آراء المحيطين بك كلياً لتفادي النقد.",
              "عبر صياغة أهداف وغايات طموحة، وبناء إرادة صلبة ترتبط بالعمل الواعد مع تجاهل تثبيط وسخرية المرجفين.",
              "عبر تأجيل الأعمال الهامة للغد تفادياً للإرهاق ومحافظة على الطاقة."
            ],
            optionsEn: [
              "By seeking constant external validation and complying with everyone's opinions to prevent technical debates.",
              "By formulating high aims, building an iron will linked to daily task execution, and completely disregarding skeptic comments.",
              "By postponing major duties for tomorrow to protect immediate biological comfort."
            ],
            correctIndex: 1,
            explanationAr: "الإيمان بقدرتك وصهر ثقتك بمبادئك وأعمالك هو نقطة الانطلاق لتجاوز وتخطي تثبيط المتشككين وقهر عقبات الركود.",
            explanationEn: "Unshakable self-belief and commitment to your purpose form the armor needed to overcome local resistance and passive habits."
          }
        ]
      },
      {
        id: 'yc_ch2',
        chapterNum: 2,
        titleAr: 'الفصل الثاني: هدم الركود - تسييس العادات ومطاردة سموم القلق والحسد',
        titleEn: 'Chapter 2: Dissolving Ruts, Habits Modification, & Eradicating Friction',
        descriptionAr: 'كيف تكسر قوالب الركود، وتسيس ماكينة العادات الصامتة، وتطهر كيانك المعرفي من سموم القلق والغيرة المقيدة.',
        descriptionEn: 'Breaking out of ruts, optimizing the machinery of habit, and banishing worry and envy.',
        lessons: [
          {
            id: 'yc_ch2_l1',
            idNum: 1,
            titleAr: '1. تفادي الركود وكسر قالب التقليد الأعمى (الركود والتقليد)',
            titleEn: '1. Dissolving Ruts and Bypassing the Imitation Pattern',
            duration: '4m',
            type: 'intro',
            contentAr: `يتطرق أدامز في هذا الدرس لخصم لدود وخطير للفعالية والتطور: **الوقوع في قوالب الركود (Ruts)**.

**ما هي هذه المعضلة؟**
الركود هو حالة من السكون والبلادة العقلية حيث يستمر المرء في تكرار نفس السلوكيات الروتينية العقيمة بلا تفكير أو تحسين واعد. الأسوأ من ذلك هو الوقوع في **قالب الركود والتقليد الأعمى** (Imitation Rut)، حيث يتنازل عن أفكاره وإبداعه الأصيل لينسخ أعمال الآخرين، فيتحول إلى نسخة مكررة باهتة فاقدة للهوية والبريق.

**ماذا ستستفيد من هذا الدرس**
الناجحون قد يقعون في قوالب الركود أحياناً، ولكنهم سرعان ما يتنبهون ويثورون بوعي شجاع للخروج الفوري منها. حافظ على عينيك مفتوحتين وعقلك مستيقظاً، وانفض غبار العادية لتظل خالقاً ومبصراً لفرص الصدارة الفريدة.`,
            contentEn: `In this lesson, Adams dissects a dangerous obstacle to development: **The Trap of Ruts**.

**What is this vulnerability?**
A rut is a state of mental stagnation where an individual continuously repeats non-productive habits without intent or improvement. Worse is the **Imitation Rut**, where you abdicate your original creative path to copy others, becoming a blunt duplicate devoid of unique value.

**What is your takeaway?**
Effective minds hit ruts occasionally, but they proactively identify them and break out immediately. Keep your eyes open, your brain awake, and bypass passive duplication to protect your creative supremacy.`
          },
          {
            id: 'yc_ch2_l2',
            idNum: 2,
            titleAr: '2. ماكينة العادات الصامتة: منشئ الرفعة أو مدمر الطموح',
            titleEn: '2. The Silent Habit Engine: Creator of Efficacy or Devastator of Ambition',
            duration: '3m',
            type: 'core',
            contentAr: `العادات هي الماكينة الصامتة التي تبني أو تهدم مستقبلك المعرفي والمهني دون أن تشعر. 

**قانون تعاظم العادات المتكررة:**
القرارات البسيطة الخاطئة المتكررة يومياً تصيغ سكة السقوط والخسارة المحققة، بينما التحسينات اليومية البسيطة والادخارات الإيجابية الدائمة تبني تدريجياً ثروة هائلة من الكفاءة والصدارة المعرفية. العادة تتأسس بخط عريض يتراكم بالتكرار ليصبح مساراً راسخاً بالدماغ ومحركاً تلقائياً للأفعال الصادقة.

**قاعدة العادات الذهبية:**
لا تدع العادات السيئة (كالتسويف، تضييع الفواتير، الغيبة، تشتت الانتباه) تسيس عرش تفكيرك. قم بتعطيلها فوراً، وغرس عادات حميدة (كالقراءة، التنظيم، الامتنان) لتزاحمها وتستبدلها بالكلية بمرونة فائقة وصبر متقد.`,
            contentEn: `Habits represent the silent mechanics that shape your structural destination without you even noticing.

**The compounding law of daily actions:**
Minor negative deviations repeated consistently establish trails of decay and failure, whereas tiny daily improvements and mental savings compound into massive towers of intellectual proficiency. A habit starts as a thin thread, but regular repetition solidifies it into a permanent highway inside the brain.

**The Golden Covenant:**
Do not allow destructive habits (procrastination, idle gossip, digital distraction) to rule your executive throne. Break them immediately, and cultivate constructive patterns to conquer and replace them.`
          },
          {
            id: 'yc_ch2_l3',
            idNum: 3,
            titleAr: '3. تطهير النفس من سموم القلق والحسد والغيرة المقيدة',
            titleEn: '3. Banish Worry & Envy: Eradicating Emotional Friction',
            duration: '3m',
            type: 'core',
            contentAr: `القلق والحسد هما طاقة هدر نفسية مدمرة، تستهلك مخزون إرادتك، وتكبح تماماً حركتك وتمنع عنك التطور.

**سموم القلق والهم الفلسفي:**
كوفي وأدامز يتفقان على أن القلق سم زعاف يعض في أعصابك وقواك العقلية دون أن يملك تغييراً للنتائج. الترياق الحقيقي للقلق والهم هو **العمل الدؤوب الخلاق والابتسامة ومواجهة الصعاب** برضا ويقين تام.

**سموم الحسد والغيرة المرة (السرقة الذاتية):**
الغيرة والحسد لنجاح الآخرين هما بمثابة **سرقة صريحة لروحك وإمكانياتك** (Self-Robbery). عندما تنفق طاقتك الذهنية في مراقبة نجاحات زملائك ومحاولة تفسير حظهم، تبدد مخزون فاعليتك الذي كان حرياً به أن يصنع تميزك الخاص. عش بعقلية وفرة واشعر بالامتنان والبهجة لنجاح الآخرين ليتضاعف رصيد إنتاجك وسعادتك!`,
            contentEn: `Worry and envy represent destructive emotional waste. They consume your will-power resources and restrict your core focus.

**The toxicity of constant worry:**
Adams defines worry as plain poison that corrodes your mental health and stamina. The ultimate antidote to anxiety is **gritty creative action, optimistic smiles, and tackling challenges** with positive composure.

**The toxicity of envy (Self-Robbery):**
Envy of peers' success is a direct form of **Self-Robbery**. When you squander your intellectual focus monitoring others' achievements, you deplete your own development engine. Foster an abundance mindset, celebrate others' wins, and channel that positive energy into carving your own path!`
          },
          {
            id: 'yc_ch2_l4',
            idNum: 4,
            titleAr: '4. محطة العبور: تثبيت التحرر من الركود والتحصين من منغصات الهم',
            titleEn: '4. Review Node: Synthesizing Habit Mastery & Mental Freedom',
            duration: '3m',
            type: 'review',
            contentAr: `مبارك عليك اجتياز هذا المحور الانتقالي الحاسم لتمكين سلامك الداخلي وتوجيه بوصلتك! دعنا نلخص أهم أفكار الدرس:

1. **مكافحة الركود والتقليد:** تجنب حالة السبات والتبليد اليومي، وارفض أن تكون نسخة منسوخة من مسارات الآخرين.
2. **سيادة العادات البناءة:** العادات هي من صلب صناعة مستقبلك ومكاسبك؛ احرص على ترويضها لتكون مسارات خادمة لأهدافك.
3. **التجرد من الحسد والقلق:** تطهير عقيدتك وتفكيرك الفني من هدر الغيرة والهم عبر استبدالها بالامتنان وعقلية الوفرة والعمل الفوري الواعد.`,
            contentEn: `You have successfully conquered the complex framework of habit optimization and mental freedom! Let us synthesize the cornerstone concepts:

1. **Neutralizing Ruts:** Suppress programmatic routines and refuse to step into passive imitation paths.
2. **Habit Engine Optimization:** Cultivate positive daily actions, recognizing that small, repeatable threads eventually form unbreakable cables.
3. **Banish Emotional Waste:** Eradicate worry and envy. Replace them with work, optimism, and an Abundance Mindset.`
          },
          {
            id: 'yc_ch2_l5',
            idNum: 5,
            titleAr: '5. تلميحات وصيغ تطبيقات عملية لكسر قيود الخوف والوهن الكسول',
            titleEn: '5. Practical Tips: Overcoming Fear and Breaking Stagnation',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث نصائح وتدريبات عملية لتنشيط رصيد الفصل الثاني اليوم:

- **تدريب التنوع الإيجابي:** غير طريقتك وبسط بيئتك ونوع مهامك اليومية بانتظام لتتجنب الوقوع في رتابة السبات وركود التكرار.
- **تطبيق قطع العادات السلبي:** حدد عادة سلبية خطيرة (كالتأخير عن المواعيد، أو الانغماس بالهاتف صباحاً) وقرر تعطيلها فوراً لمدة أسبوع كامل واستبدالها بنشاط يبعث على البهجة والتثقيف.
- **تمرين حصانة الطاقة:** عند سماعك لنجاح باهر لزميل في العمل، بادر فوراً بتهنئته بطلب صادق من أعماق قلبك، ودون تلك التهنئة كإيداع إيجابي في بنكك العاطفي لتفعيل عقلية الوفرة اليومية.
- تقدم الآن بثقة واقرأ بقلب متفتح واجتز **اختبار المعايرة والاعتماد** للفصل الثاني بكل اقتدار!`,
            contentEn: `Here are three dynamic techniques to activate mental freedom and combat passive habits:

- **The Variety Challenge:** Add constructive modifications to your routines, changing formats and pacing to shield your mind from cognitive fatigue.
- **Habit Decoupling Track:** Isolate one negative behavior (like morning screen scrolling) and swap it with a 10-minute book review or physical rest.
- **The Celebrate Protocol:** Upon witnessing a peer's victory, proactively congratulate them. This builds trust deposits and forces your subconscious into Abundance Thinking.
- Sit for the **Chapter 2 Gatekeeping Exam** to confirm your mental clarity and open the road to continuous progress!`
          }
        ],
        quiz: [
          {
            questionAr: "ما الذي يقصد به الكاتب بتجنب قالب 'الركود والتقليد' (Imitation Rut)؟",
            questionEn: "What does Adams caution against regarding the concept of the 'Imitation Rut'?",
            optionsAr: [
              "الحفاظ على خصوصية الأعمال وعدم كشفها للمنافسين التجاريين.",
              "الوقوع في سبات التكرار العقيم مع نسخ أعمال ومسارات الآخرين والتهاون عن صياغة إبداعك وأصالتك الذاتية.",
              "الالتزام الكامل بالعمل الجماعي دون معارضة فنية."
            ],
            optionsEn: [
              "Keeping all current business achievements hidden from commercial rivals.",
              "Falling into mindless repetition while duplicating others' products, thus surrendering your own distinct identity and creative voice.",
              "Adhering to strict team directives without any creative debate to preserve safe operations."
            ],
            correctIndex: 1,
            explanationAr: "التقليد الأعمى يسرق أصالتك ويحرمك من إطلاق قدراتك الكامنة، والتحسن ينبع من صناعة إبداعك الأصيل كحطاب يشحذ سكين إرادته كل يوم.",
            explanationEn: "Duplicating others restricts your baseline. Real growth stems from original effort and refining your unique assets."
          },
          {
            questionAr: "كيف يتم استبدال العادات السلبية وفقاً للقواعد الاجتماعية والذهنية لأدامز؟",
            questionEn: "How should constructive habits replace negative ones according to the text?",
            optionsAr: [
              "عبر تجنب العمل من الأساس وتقليل الاحتكاك مع الزملاء لتجنب الأخطاء.",
              "عبر وعي دائم بالقرارات وتحديد خيوط الأفعال البسيطة المتكررة، وكسر السيئ منها فوراً وغرس عادات ممتعة معززة للأهداف والنظام.",
              "عبر انتظار الظروف الخارجية المناسبة لتعديل السلوك."
            ],
            optionsEn: [
              "By avoiding difficult duties altogether to prevent mistakes.",
              "By active awareness of small repeating actions, instantly breaking negative routines, and substituting them with progressive steps.",
              "By waiting passively for favorable external circumstances to modify behavior."
            ],
            correctIndex: 1,
            explanationAr: "العادات هي مسامير البناء لفاعلية الكيان؛ كسر الساقط منها وغرس الحسن يمحو بالتدريج أثر الهدر وقنوات الفوضى العشوائية الكسولة.",
            explanationEn: "Your behaviors are the structural nails of your potential. Removing errors and inserting progressive actions clears all procedural leakages."
          },
          {
            questionAr: "لماذا يمثل 'الحسد' و 'الغيرة' نوعاً صريحاً من السلب والسرقة الذاتية (Self-Robbery)؟",
            questionEn: "Why is 'Envy' defined as a form of literal Self-Robbery?",
            optionsAr: [
              "لأنه يستنزف طاقاتك في مراقبة وتحليل نجاحات الآخرين بدلاً من توجيهها لصناعة وصياغة تميزك الخاص وفرص صدارتك.",
              "لأنه يؤدي لسرقة مادية صريحة وعمليات قرصنة فكرية ملموسة.",
              "لأنه يعقد العلاقة التجارية مع الشركاء ويزيد الضرائب المالية."
            ],
            optionsEn: [
              "Because it consumes your cognitive bandwidth on monitoring peers instead of directing that focus on developing your own assets.",
              "Because it translates into literal fiscal theft or physical copyright piracy.",
              "Because it complicates commercial tax filings and business relationships."
            ],
            correctIndex: 0,
            explanationAr: "بدلاً من إضاعة الوقت الثمين والقدرة الشجاعة في الندم على حظ الآخرين، صب جهودك لادخار المهارات وصناعة سبل نصرك الفردي والجماعي بمتعة بائنة.",
            explanationEn: "Wasting raw intellectual bandwidth on measuring others' pie slices leaves your own targets unwatered and dry."
          }
        ]
      },
      {
        id: 'yc_ch3',
        chapterNum: 3,
        titleAr: 'الفصل الثالث: قوة العمل وعقد الإصرار والتعلم المستمر مدى الحياة',
        titleEn: 'Chapter 3: Private Grit, Absolute Action (Do!), & Lifelong Continuous Education',
        descriptionAr: 'قوة وفلسفة الإنجاز الفوري (افعل!)، وصنيعة الصلابة والعمود الفقري المتين، وشحذ أدوات المعرفة بالتعلم مدى الحياة.',
        descriptionEn: 'The supreme strategy of immediate execution, building structural backbone, and pursuing continuous education.',
        lessons: [
          {
            id: 'yc_ch3_l1',
            idNum: 1,
            titleAr: '1. فخ التسويف والبهجة الكبرى للعمل والإنجاز الفوري (افعل!)',
            titleEn: '1. Do! Bypassing Procrastination and the Joy of Immediate Action',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك يا صديقي في الفصل الملحمي الأخير من رحلتنا التمكينية لكتاب أدامز البليغ! لنغوص في لب الفعالية: **قوة العمل الفوري (افعل! / Do!)**.

**فكرة الكاتب الأثيرة:**
"الفاعل هو الحفار والمنمي والمهندس الباني؛ الفاعل هو صاحب التحريك وهو الفائز الصادق بالنهاية." الأفكار اللامعة والخطط الرائعة دون عمل تظل مجرد أحلام ميتة فوق الرفوف. التسويف وتأجيل العمل لغد طالما تملك إمكانيات ممارسته اليوم هو مقبرة التطور والتنمية الفردية. 

**التطبيق العملي الفوري:**
انطلق فوراً ونفذ المهمة الحالية الصعبة. لا تترد، ولا تنتظر الظروف الخارقة لتشرق؛ بل ابدأ بالثقاب البسيط وعقم التسويف بقوة الحركة والمباشرة والتمام بكل بهجة وكرنفالية.`,
            contentEn: `Welcome, scholar, to the final epic module of George Matthew Adams' masterpiece! Let us deconstruct the ultimate catalyst: **Immediate Action (Do!)**.

**The author's absolute stance:**
"The Doer is the builder, the digger, and the true winner." Brilliant schematic blueprints without execution remain cold, dead papers in folders. Postponing until tomorrow what can be accomplished today acts as the graveyard of lifelong growth.

**Pragmatic takeaway:**
Launch immediately into your most complex task. Do not delay, and do not wait for ideal conditions. Kindle your own fire, bypass hesitation, and establish absolute momentum right now.`
          },
          {
            id: 'yc_ch3_l2',
            idNum: 2,
            titleAr: '2. صنيعة العمود الفقري والصلابة ومواجهة عثرات الطريق شجاعاً',
            titleEn: '2. Building Backbone: Mental Durability to Stand Alone',
            duration: '3m',
            type: 'core',
            contentAr: `يتطرق الكاتب في هذا الدرس لمبدأ التصلب والوفاء للقيم الكبرى ويعرّفه بـ **قوة العمود الفقري (Backbone)**.

**تفوق الصلابة على الوعي الفردي الممتاز:**
العقل البهيج والذكاء الخارق والخيال الفسيح دون عمود فقري متين لا يملكون نفعاً حقيقياً في معارك المعيشة اليومية. العمود الفقري هو الإرادة الفولاذية والقدرة على **الوقوف والعمل مفرداً** بكل صلابة وثبات؛ متبنياً قراراتك الشجاعة ومتحصناً ضد الضغوط والانهيارات النفسية المانعة من الفوز والتطور.

**مفهوم الصلابة المهنية:**
الاستبقاء والالتزام بتمام الواجب وإنهاء المعارك المنهجية التي بدأتها حتى الختام بمهارة واقتدار، لدرجة تزيح عن مسارك كلياً غبار قوالب الرخاوة والركود والبلادة العقيمة.`,
            contentEn: `In this lesson, we study Adams' core concept of inner strength: **Backbone**.

**Why Backbone out-indices Intellect:**
A brilliant brain, dynamic dreams, and creative ideas without a sturdy Backbone serve no practical purpose on the corporate battlefield. Backbone is the iron willingness to **stand alone**, defending your decisions and executing them with quiet grit against all resistance.

**Pragmatic takeaway:**
Commit fully to finishing what you begin. Reject the culture of ragged edges and halfway completions. Stand tall, execute, and eliminate all traces of passivity from your record.`
          },
          {
            id: 'yc_ch3_l3',
            idNum: 3,
            titleAr: '3. ركائز الصدارة والمعرفة والتعلم المستمر مدى الحياة',
            titleEn: '3. Seek True Knowledge: Continuous Lifelong Learning',
            duration: '3m',
            type: 'core',
            contentAr: `التعلم الدائم هو المحرك الحقيقي لتوسيع رصيد مهاراتك وصيانة كيانك المعرفي من تبلد السنين والتقادم.

**علم القيادة وريادة الكيان:**
"الريادة والصدارة تؤول حصرياً لمن يبحث ويعرف بصدق." لا تمضِ في يومك دون أن تكتسب معلومة جديدة أو تتأمل معنى فلسفياً قيماً، أو تراجع رصيد معارفك لترقيتها تدريجياً. القراءة الواعية المنهجية هي مفتاح توسيع قنوات التآزر العقلي واليقين الحركي.

**التطبيق التمكيني الفوري:**
اجعل التعلم حبل وريدك اليومي؛ اقرأ العروض والروائع، طالع مذكرات الناجحين العظماء، التزم بشحذ عقلك لتظل منشاراً حاداً وصقراً واعداً مبهراً بوعيه وحصافة منطقه الرشيد.`,
            contentEn: `Active, continuous education represents the ultimate generator of skill compounding and shields your intellect from decay.

**To Learn is to Lead:**
"Leadership comes solely to those who proactively know." Do not allow a single day to pass without studying a complex meaning, reviewing an asset model, or updating your technical knowledge. Reading continues to represent your ultimate leverage.

**Pragmatic takeaway:**
Embed continuous education inside your morning blocks. Read historical digests, audit Great Works, and maintain a sharp blade of intellect to sustain dynamic influence.`
          },
          {
            id: 'yc_ch3_l4',
            idNum: 4,
            titleAr: '4. محطة العبور: تلخيص الفصول الختامية وميثاق التحسن والسيطرة الدائمة',
            titleEn: '4. Review Node: Synthesizing Extreme Action, Backbone & Learning',
            duration: '3m',
            type: 'review',
            contentAr: `مبارك مبروك! لقد أتممت ببراعة المساق المعرفي الثالث الفخم والملحمي لكتاب "أنت تستطيع"! دعنا نلخص ركائز الإنجاز الأخير:

1. **صخب العمل الفوري (افعل!):** نبذ التسويف والبهجة العارمة للتحرك لتمام الواجبات بكل فاعلية حركية فورية.
2. **العمود الفقري المتين (الصلابة):** بناء الصمود وتنمية مهارة الوقوف والعمل وحيداً بثبات ضد صخب المشتتات والانهزامية القعيدة.
3. **التحسين المعرفي المستمر (التعلم):** الوفاء لشحذ عقلك وعصر معلوماتك لترقية دفتك القيادية وإفادة مجتمعك ونفسك باستمرار.`,
            contentEn: `Congratulations! You have completed the final, masterclass chapter of "You Can"! Let us synthesize the ultimate private and team metrics:

1. **Immediate Execution (Do!):** Completely bypass procrastination, launching immediately with focus to finish outstanding tasks.
2. **Solid Backbone:** Cultivate robust mental durability, learning to stand alone and implement core choices without fear of skepticism.
3. **Lifelong Growth:** Commit to constant intellectual upgrades, study Great Works, and expand your diagnostic capabilities.`
          },
          {
            id: 'yc_ch3_l5',
            idNum: 5,
            titleAr: '5. ممارسات المعيشة الفعالة وتكريس رصيد الإحراز المعرفي الشامل',
            titleEn: '5. Practical Tips: Launching your Lifelong Mastery Cycle',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث نصائح إرشادية وتدريبات عملية لتنشيط ركائز النجاح والفعالية الختامية اليوم:

- **عهد إنهاء المسائل:** التزم تمام التزام بعدم ترك أي عمل تبدأ به ناقصاً أو بحواف مهترئة؛ بل أنهه بجودة متكاملة وبلا أدنى تنازل.
- **تطبيق الـ ٢٠ دقيقة للقراءة:** خصص فترات تداول ثابتة وهامة للقراءة والتنمية المعرفية الرصينة بجدولك اليومي لشحذ منطق عقلك وصيانة لمعانه.
- ترفق يا صديقي وثبت شراع علمك وجرب بقوة واجتز **التقييم الشامل الختامي** لإصدار وتثبيت **شهادة إتمام المسار ومطابقة المقاييس 🎓!**`,
            contentEn: `Here are three pragmatic formulas to anchor your lifelong continuous improvement path today:

- **The Completion Covenant:** Vow to banish ragged edges. Treat each task you start as an absolute contract that must be completed with flawless quality.
- **The 20-Minute Sharp Focus:** Secure 20 silent minutes inside your morning routine dedicated purely to studying technical digests or diagnostic books.
- Take a deep, proud breath, and sit for the **Chapter 3 final evaluation** to officially generate your **Continuous Achievement PDF Certificate 🎓!**`
          }
        ],
        quiz: [
          {
            questionAr: "ما الذي تجسده فلسفة 'العمود الفقري' (Backbone) مقارنة بذكاء العقل والخيال البهيج؟",
            questionEn: "What is the primary relationship between 'Backbone' and intellect according to Adams?",
            optionsAr: [
              "أن الذكاء والخيال كافيان تماماً لصناعة وصياغة الإنجاز دون الحاجة لقوة العزيمة الصلبة.",
              "أن العقل الخارق والخيال دون عمود فقري حديدي لا نفع لهما، لأن العمود الفقري هو الإرادة الشجاعة للوقوف منفرداً أمام الصعاب لإكمال المهام.",
              "أن العمود الفقري سمة جسدية رياضية لا تعني صلب عمل العادات الذهنية."
            ],
            optionsEn: [
              "That a brilliant intellect and creativity are completely sufficient on their own to secure success without willpower.",
              "That high intellect without a strong Backbone is sterile, because Backbone supplies the courage to stand alone and implement ideas.",
              "That backbone represents a physical athletic metric unrelated to the core mechanics of mental efficacy."
            ],
            correctIndex: 1,
            explanationAr: "الأفكار والخيال هما بذور التصميم، لكن العمود الفقري هو الجذع القوي الذي يحمل البناء ويواجه العواصف والصعاب ليحفظ الإنجاز ساطعاً.",
            explanationEn: "Imagination constructs the blueprint, but Backbone provides the moral courage to implement and stabilize those plans over your routine."
          },
          {
            questionAr: "كيف يؤثر تأجيل الأعمال وتأخير التنفيذ لغد (التسويف) على فاعلية الإنسان التمكينية؟",
            questionEn: "How does procrastination affect systemic human effectiveness over time?",
            optionsAr: [
              "يعمل على تركيز الطاقة وإعادة تجميع القوى الذهنية والجسدية بشكل أفضل للغد.",
              "يمثل فخاً قاتلاً يهدر طاقتك، ويستنزف إرادتك، ويعزز الفوضى العشوائية الكسولة ليكون مقبرة لرقيك المهني والتطويري.",
              "يسهم في زيادة سعادتك وتثبيت صداقتك ومواكبتك مع الظروف المفاجئة."
            ],
            optionsEn: [
              "It focuses energy and restructures your mental and biological power for better execution tomorrow.",
              "It acts as a fatal trap that leaks your potential, depletes your will-power, and expands passivity to destroy lifelong progression.",
              "It advances your workplace happiness and synchronizes your timing with unexpected emergencies."
            ],
            correctIndex: 1,
            explanationAr: "التنزيل العملي الفوري للأفكار (افعل!) هو المحرك الحقيقي للفعالية والصدارة، والتحسن ينبع بالكامل من صدم وإجهاز التسويف بقوة المسير.",
            explanationEn: "Immediate action represents the crown habit of doers. Delaying targets only breeds passivity and structural bottlenecks."
          },
          {
            questionAr: "بأي مبدأ أخلاقي وتنموي يرتبط 'التعلم المستمر مدى الحياة' في مدرسة أدامز لليقين؟",
            questionEn: "How is 'Continuous Lifelong Learning' linked to personal leadership in George Matthew Adams' model?",
            optionsAr: [
              "هو استثمار إجباري يمنع التسلية والترفيه ويقيد حركتك لتكون حبيس الكتب كلياً.",
              "هو الوقود الحقيقي لتوسيع قنوات القدرات المعرفية والمهنية الفنية، فالصدارة والريادة مآلها الدائم لمن يبحث ويقرأ ويعرف باستمرار.",
              "هو نشاط إضافي اختياري لا تأثير له على مواكبتك ومكاسبك المهنية الحركية المعاصرة."
            ],
            optionsEn: [
              "It represents a forced chore that restricts your lifestyle and imprisons your mind inside dry papers.",
              "It is the driving force of capacity expansion, since leading and structural influence belong exclusively to those who continuously learn.",
              "It is a secondary optional pursuit that has zero impact on your career status or modern commercial earnings."
            ],
            correctIndex: 1,
            explanationAr: "شحذ عقلك بانتظام بالمعرفة الراقية ومطالعة العروض وسير العباقرة يبقيك متيقظاً، ويمنح منطق حديثك الرشيد وفكرك الفني حصافة وعقولاً ممتازة.",
            explanationEn: "Upgrading your diagnostic resources via study keeps your mind alert and prepares your system for high-value leadership."
          }
        ]
      },
      {
        id: 'yc_ch4',
        chapterNum: 4,
        titleAr: 'الفصل الرابع: إدارة الوقت والتركيز المنظم (قوة التركيز الحاسم)',
        titleEn: 'Chapter 4: Time Leverage, Execution Systems & Ultimate Focus',
        descriptionAr: 'منظومة تفويض المهام وتسييس جدولك اليومي، تحرير النفس من تشتيت المزعجات، وتكريس الطاقة التنموية.',
        descriptionEn: 'The art of distraction elimination, prioritizing highly systemic execution, and deploying your focus budget.',
        lessons: [
          {
            id: 'yc_ch4_l1',
            idNum: 1,
            titleAr: '1. شرف اللحظة والجدولة: كيف تنظم نتاجك اليومي بذكاء؟',
            titleEn: '1. The Dignity of Time: Systemic Focus Over Multitasking Distraction',
            duration: '4m',
            type: 'intro',
            contentAr: `الوقت هو الأثر والعملة الوحيدة المتساوية بين جميع البشر بالتساوي طوال اليوم.

**الفرق بين الفئات:**
- **العاديون:** يتركون أوقاتهم نهباً للصدفة، فيسمحون للإشعارات التافهة والاجتماعات العقيمة بتوجيه مسار يومهم.
- **التطويريون:** يعطون وقتهم شرف القيادة والجدولة، فيبسطون سيطرتهم على الساعة الأولى من اليوم (الصباح الباكر) لبناء الصدارة والتحسن الذاتي.

**معجزة التركيز الأحادي:**
عندما تركز طاقتك بالكامل في مهمة واحدة حتى تنهيها تماماً بجودة متكاملة، فإنك تضاعف كفاءتك مئات المرات بسلام وراحة روائية مبدعة.`,
            contentEn: `Time is the single entirely equal resource distributed generously to every human being at dawn.

**The functional distinction:**
- **The Trivial-Focusers:** Relinquish their hours to whims, allowing digital buzzes and superficial meetings to direct their direction.
- **The Systemic-Achievers:** Commit to blocking their peak hours, dominating their mornings to expand cognitive capital and build value.

**The power of Single-Tasking:**
When you direct your undivided potential to a single target until it is meticulously finalized, your delivery speed scales up while preventing emotional exhaust.`
          },
          {
            id: 'yc_ch4_l2',
            idNum: 2,
            titleAr: '2. قواعد الاستبعاد: حماية طاقتك اليومية وهزيمة تشتت الانتباه',
            titleEn: '2. The Discipline of Exclusion: Banishing the Noise',
            duration: '3m',
            type: 'core',
            contentAr: `الإتقان والابتكار لا ينشآن من كثرة ما تفعله، بل من **سعة ما ترفض القيام به**.

**دستور الاستبعاد الذكي:**
عليك أن تقول "لا" شجاعة وصريحة لكل المقاطعات، العلاقات السامة، وتراكم الواجهات الكسولة في يومك. ضع حداً للواجبات الاجتماعية الزائفة التي تسلبك فترات ريادتك وبناء مهاراتك.

تسييس يومك بالحدود الفصحى الحاكمة يرفع من منسوب ثقة الأقران بدقتك وأمانتك الحركية والمهنية بمرور الشهور.`,
            contentEn: `Supreme efficiency is not born of doing everything; it flourishes through the **deliberate capacity to say No to the non-essential**.

**The exclusion paradigm:**
Boldly eliminate notifications, trivial talk, toxic gossip, and digital clutter. Draw clear boundaries against superficial social activities that consume your prime hours.

Drawing robust limits around your attention commands deep respect from peers and preserves your energetic capacity.`
          },
          {
            id: 'yc_ch4_l3',
            idNum: 3,
            titleAr: '3. ممارسات الصمت والتفريغ: تفرغ العقل لابتكار الحلول',
            titleEn: '3. Standard Tips: Crafting Your Daily Strategic Quarantine',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه التطبيقات لتوطيد قوتك وبسط قيادتك الزمنية اليوم:
            
- **تطبيق الساعة الذهبية المعزولة:** خصص ساعة كاملة لا غير في الصباح دون هاتف أو رقميات، واقضها في التخطيط، القراءة بوقار، أو الكتابة المنتظمة لرسالتك الشخصية.
- **قانون التفويض أو الحذف:** تأمل جدول أعمالك اليومي واحذف فوراً مهمتين جانبيتين تافهتين لا تخدمان أولوياتك الأكاديمية أو المادية الكبرى.`,
            contentEn: `Actionable steps to rule your attention starting today:
            
- **The Sanctuary Hour:** Spend your initial morning hour completely offline. Utilize this time to write down actions, read classic, or plan your goals.
- **The Omission Test:** Analyze your task list and immediately prune or delegate two secondary, time-consuming activities that yield zero real value.`
          }
        ],
        quiz: [
          {
            questionAr: "ما هو الشرط الفني الجوهري لحصد 'معجزة التركيز الأحادي' بيومك؟",
            questionEn: "What is the absolute requirement to trigger single-tasking excellence?",
            optionsAr: [
              "القيام بمهام متعددة معاً بهوس لتنجز كل الأشغال دفعة واحدة.",
              "حبس كامل طاقتك وتركيزك في مهمة واحدة محددة حتى تنهيها تماماً بجودة باذخة، مع إيقاف كافة الرقميات والمقاطعات.",
              "مراجعة حسابات البنوك وضرائب الشركات طوال النهار."
            ],
            optionsEn: [
              "Executing multiple complex assignments simultaneously to clear clutter rapidly.",
              "Anchoring your full potential on one target until it is meticulously finalized, blocking all digital interruptions.",
              "Checking banking updates and corporate taxes continuously."
            ],
            correctIndex: 1,
            explanationAr: "توجيه الجهد الأحادي يصون كفاءتك العقلية ويحميك من تبديد المجهود وتشتيت الانتباه وعثرات الأوراق الجانبية.",
            explanationEn: "Concentrated attention protects your cognitive resources, yielding high performance and solid results."
          }
        ]
      },
      {
        id: 'yc_ch5',
        chapterNum: 5,
        titleAr: 'الفصل الخامس: روح المثابرة والصمود الذهني (قوة مواصلة المسير حتى النهاية)',
        titleEn: 'Chapter 5: Unyielding Persistence & Constant Focus',
        descriptionAr: 'ركائز عدم الاستسلام، بناء التصلب العقلي الشجاع لمجابهة نبرات الفشل المؤقت والإصرار الصامد.',
        descriptionEn: 'The psychological mechanics of non-surrender, building unshakeable grit, and learning to convert feedback into triumph.',
        lessons: [
          {
            id: 'yc_ch5_l1',
            idNum: 1,
            titleAr: '1. شفرة الإصرار الصامد: لماذا ينسحب العاديون قبل النصر بخطوة؟',
            titleEn: '1. The Blueprint of Grit: Shifting from Temporary Defeat to Triumph',
            duration: '4m',
            type: 'intro',
            contentAr: `معظم الناس يملكون أفكاراً ممتازة في البداية، ويبدأون مشاريعهم بحماس جارف وصخب شديد. لكن عندما تظهر العقبة الأولى، أو يتأخر المردود المتوقع، ينسحبون بهدوء عائدين لمناطق راحتهم الكسولة.

**سر الصدارة الحركية الحقيقية:**
الفرق بين العظمة والتبعية ليس الذكاء الموروث؛ بل هو **روح المثابرة (Persistence)** والقدرة المطلقة على تلقي الضربات والنهوض مجدداً لمواصلة العمل بثقة ويقين مبرهن.

علم التنمية والتحسن يعلمنا أن كل هزيمة مؤقتة ليست سوى درس فني يحمل في طياته بذور النصر والتحول العقلي.`,
            contentEn: `Most individuals harbor excellent ideas and launch their projects with high enthusiasm. But at the first sign of friction or when returns are delayed, they quietly retreat to their comfortable zones.

**The secret of actual command:**
The chasm between excellence and mediocrity is not raw intelligence; it is **Persistence**—the absolute capacity to absorb setbacks, adapt, and proceed with unshakeable conviction.

Every failure is merely raw operational feedback. It contains the precise lessons needed to calibrate your strategy.`
          },
          {
            id: 'yc_ch5_l2',
            idNum: 2,
            titleAr: '2. بناء قماشة الصبر والتحمل: صيانة عقلك من وهن الشك الكسول',
            titleEn: '2. Fortitude Against Doubt: Securing Rational Focus',
            duration: '3m',
            type: 'core',
            contentAr: `الشك هو العدو الحقيقي الكامن للتطوير والأثر. عندما تتأخر المخرجات، يبدأ عقلك في إطلاق إشارات تثبيط وتخويف: "أنت لست مؤهلاً، المشروع متهور، توقف فوراً ووفر طاقتك".

**كيف تحصن قماش فكرك؟**
تسلح بيقين مبني على الإحصائيات والمعرفة الصامتة والعمل الشاق المنظم. المثابرة هي رياضة عقلية تتطلب ترويض الخوف وإجبار النفس على التحرك الفعال والمنتظم كل صباح، متجاهلاً أصوات المرجفين بالخارج.

الأصول المستديمة الصامدة تنبت كلياً في كنف رعاية هذا الصمود واليقين.`,
            contentEn: `Doubt is the ultimate silent assassin of creative potential. When outcomes are slow to manifest, your system whispers: "You are not qualified, this is risky, pull back immediately."

**Fortifying your resolve:**
Equip your view with robust statistical data, clean knowledge, and highly methodical labor. Endurance is a mental discipline. It requires calming your thoughts and taking action every single morning.

Unshakeable institutions are built exclusively in the nurturing climate of sustained, quiet persistence.`
          },
          {
            id: 'yc_ch5_l3',
            idNum: 3,
            titleAr: '3. ممارسات ومواثيق المثابرة: تمرين البكاء والانطلاق بنظام صامد',
            titleEn: '3. Standard Tips: Embedding Perseverance Patterns Daily',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه التطبيقات لتختبر وتصقل مثابرتك اليوم:
            
- **تطبيق عهد العشرين يوماً الصارم:** اختر مهارة أو أداة تطويرية صعبة، والزم نفسك بالتدرب الصامت والتعلم عليها يومياً لمدة عشرين يوماً متواصلة دون إطلاق أي لوم أو رغبة بالانسحاب.
- **كتابة السطر الواحد:** في أوقات الهم والضباب الإداري، اكتب سطراً واحداً يصف خطتك المباشرة للغد لتضمن إبقاء الماكينة وتدفق الفاعلية مستمراً.`,
            contentEn: `Actionable habits to nurture your willpower patterns today:
            
- **The 20-Day Crucible:** Select a single challenging skill. Promise to practice and study it daily for twenty consecutive days without allowing excuses or expecting instant applause.
- **The One-Line Directive:** During times of heavy cognitive noise, write down exactly one line defining your primary action for tomorrow. It keeps the wheel of progress turning.`
          }
        ],
        quiz: [
          {
            questionAr: "ما هو الفاصل الذهبي الحقيقي الفاصل بين العظمة والتبعية في عادات الفاعلية؟",
            questionEn: "What represents the absolute boundary between Greatness and mediocrity in Adams' view?",
            optionsAr: [
              "الحصول على دعم مالي مطلق وتعديل القروض بالبنوك العالمية.",
              "روح المثابرة ومواصلة العمل الشاق بصلابة متناهية وإصرار صامد أمام الهزائم المؤقتة.",
              "تجنب المبادرات المفتوحة واتباع التوجيهات الروتينية دون تفكير."
            ],
            optionsEn: [
              "Securing limitless corporate capital and restructuring interest rates.",
              "Persistence—the capacity to execute goals with immense grit and carry on despite setbacks.",
              "Avoiding startup initiatives and adhering to routine guidelines without independent thinking."
            ],
            correctIndex: 1,
            explanationAr: "المثابرة الحديدية الصامدة هي الرابط الفعلي والمحرك الذي يحول المعارف الهشة لنتائج عملية وقوى مادية سامقة تخدم الصدارة.",
            explanationEn: "Iron persistence turns theoretical concepts into palpable, self-sustaining results that secure your success."
          }
        ]
      }
    ]
  },
  {
    id: 'power_of_now',
    titleAr: 'كتاب قوة الآن: الدليل إلى التنوير الروحي',
    titleEn: 'The Power of Now - Spiritual Enlightenment',
    authorAr: 'إيكهارت تول',
    authorEn: 'Eckhart Tolle',
    coverImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=400&q=80',
    descriptionAr: 'منظومة روحية متكاملة تفكك سيطرة الأفكار التوترية وجسد ألم الماضي، لتقودك إلى عمق الحاضر وقوة السكون الإلهي.',
    descriptionEn: 'The world-famous guide to spiritual enlightenment, dissolving the illusion of time, and reclaiming the immense power of Present Presence.',
    isLocked: false,
    chapters: [
      {
        id: 'pn_ch1',
        chapterNum: 1,
        titleAr: 'الفصل الأول: أنت لست عقلك والعائق الأعظم للتنوير',
        titleEn: 'Chapter 1: You Are Not Your Mind & The Enemy of Awakening',
        descriptionAr: 'تحليل شفرة التماهي الفكري، تذويب تطفل الأفكار والعيش كالمراقب الواعي بعيداً عن ألاعيب الأنا المتكبرة.',
        descriptionEn: 'Deconstructing mental identification, dissolving the continuous chatter, and stepping into the watcher persona beyond the ego identity.',
        lessons: [
          {
            id: 'pn_ch1_l1',
            idNum: 1,
            titleAr: '1. وهم العقل الحاكم: كسر الارتباط الحصري بالهوية الفكرية والأفكار الصاخبة',
            titleEn: '1. Illusion of Mind: Breaking Free from the Thinking Machine',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك يا صديقي في المسار التنويري الرائد لكتاب إيكهارت تول الخالد: **قوة الآن!**

**لماذا هذه التجربة بالغة الروحانية؟**
يتحرك إيكهارت تول من تجربة شخصية خارقة كادت تقوده للانتحار مسببة له يدفاً من الانهيار النفسي الكامل، حتى أفاق فجأة مستيقظاً على وعي روحي شامل مفاده: "أنا لا أستطيع العيش مع نفسي بعد الآن، فهل أنا اثنان؟"
- **العقل المضطرب (الأنا):** الكيان المزيف الذي يعيش بنزاع دائم مع الواقع ويمطر عقلك بآلاف الأفكار المترددة.
- **الشاهد الحاضر (الوعي):** مركز الثقل الحقيقي والساكن داخلك الذي يتأمل الأمور برزانة وهدوء كلي.

**ماذا ستستفيد من هذا الدرس الجوهري؟**
السر الأول يبدأ بـ **مراقبة المفكر** بداخلنا دون إصدار أحكام. بدلاً من الاستسلام لقطار القلق، ستجلس كشاهد صامت يتنبه لمرور الأفكار كالسحب العابرة لتلامس البعد السادن اللانهائي في جوهرك الحقيقي.`,
            contentEn: `Welcome, seeker, to the transcendent masterclass of Eckhart Tolle's timeless guide: **The Power of Now!**

**Why is this spiritual path so vital?**
Eckhart Tolle writes from a profound personal awakening that rescued him from severe chronic depression, where he suddenly questioned the dialog within: "Am I one or am I two?"
- **The Chatterbox (Ego):** The artificial persona constantly rebelling against reality and saturating your skull with anxious noise.
- **The Silent Watcher (Consciousness):** Your authentic, non-judgmental anchor of presence that observes your thoughts from absolute stillness.

**What is your takeaway?**
Awakening starts with **observing the thinker**. Instead of sliding into panic, take your seat as the neutral observer, watching transient concerns pass like dry clouds.`
          },
          {
            id: 'pn_ch1_l2',
            idNum: 2,
            titleAr: '2. العائق الأعظم للتنوير: كيف يقيدنا العقل بروتين المخاوف وصراعات المستقبل',
            titleEn: '2. The Greatest Obstacle: Deconstructing the Egoic Trap',
            duration: '3m',
            type: 'core',
            contentAr: `في هذا الدرس الفريد، نتناول آلية العقل في الهرب المستمر من الواقع: **"إن العقل لا يستشعر الأمان طالما أن الحاضر ساكن؛ لذا يستعبدنا بالماضي والمستقبل"**.

**كيف يسجننا العقل الصاخب؟**
تحت شعار "تحليل المخاطر"، ينبش عقل الأنا دفاتر الماضي بحثاً عن الندم واللوم، ويسقطها مجدداً على المستقبل رعباً وفزعاً، لتدور في حلقة غامضة مهدِرة للنقد والوقت والذكاء.

**ترياق إيكهارت تول الحاسم:**
إن التنوير ليس وضع حال تظاهر خارق كالعجائب؛ بل هو ببساطة **استرجاع اتصالك بجوهر وجودك الساكن** في لحظة الحاضر النظيفة. اسحب تركيزك من الأهداف البعيدة وسلط وهج وعيك كاملاً على الدقيقة التي تلجها الآن.`,
            contentEn: `In this lesson, we analyze how the mind flees the absolute: **"The egoic mind cannot tolerate the stillness of the present; it demands the drama of past and future."**

**How does this thinking trap work?**
Under the pretense of "caution," the ego digs up past regrets and projects them as future anxiety, trapping you in a phantom cage.

**Eckhart's definitive cure:**
Enlightenment is not a magical superpower or a theatrical show; it is simply **reclaiming your union with Being** in the current moment. Pivot your energy from distant mental plans and flood your immediate location with total attention.`
          },
          {
            id: 'pn_ch1_l3',
            idNum: 3,
            titleAr: '3. العاطفة رد فعل الجسد: مواجهة المشاعر المكثفة وإحالتها لصمت الحضور الدائم',
            titleEn: '3. Emotion & the Body: Transmuting Energy into Stillness',
            duration: '3m',
            type: 'core',
            contentAr: `يتكامل وعينا الحركي الروحي بفهم القاعدة الثالثة الكبرى للتحرر: **"العاطفة هي تمثيل الجسد لردود فعل العقل المتوترة"**.

**العلاقة الجدلية بين الفكرة والمشاعر:**
حين يفرز العقل فكرة تهديد وهمية، يترجمها الجسد لانقباض عضلي وخوف بالصدر. تصبح المشاعر بمثابة مرآة مادية للأفكار غير الواعية.

**كيف نتعامل بذكاء مع تلاطم عواطفنا؟**
بدلاً من محو المشاعر أو الهرب منها التهويدي، قف وصوب انتباهك مباشرة ونظف قلبك، وتنفس بعمق مستشعراً طاقة العاطفة ذاتها بداخل جسدك دون وضع مسميات فكرية (غضب، حزن). هذا الحضور الدقيق يشير إلى **بوابة الاستسلام** ويمتص الشظايا التدميرية ويذيبها في وعاء الحصافة المعرفية الشاملة.`,
            contentEn: `Our spiritual integration deepens by generalizing Tolle's third guide for liberation: **"Emotion is the body's physical mirror of mental activity."**

**The feedback loop between thoughts and feelings:**
When the mind generates a threat scenario, the biology translates it into physical tension. Feelings become a corporeal reflection of unconscious thoughts.

**How do we interact with emotional turbulence?**
Do not suppress or escape. Direct your search inward, feel the raw sensory baseline of the emotion within (without labeling it as 'anger' or 'grief'), and anchor your breathing. This conscious touch acts as the gateway to acceptance, dissolving systemic anxiety.`
          },
          {
            id: 'pn_ch1_l4',
            idNum: 4,
            titleAr: '4. محطة العبور: مراجعة دفتك المعرفية وتوطيد الحضور الساكن وبطلان ألاعيب وهم الأنا',
            titleEn: '4. Review Node: Synthesizing Presence & De-identifying from the Ego',
            duration: '3m',
            type: 'review',
            contentAr: `تهانينا يا صديقي بتمام المحور الأول الفذ لتعزيز حصانتك الروحية! لنستجمع الآن أضلع التحرر الثلاثة الكبرى:

1. **مراقبة المفكر:** الوعي والاعتزاز بأنك لست الآلة المفكرة بل أنت الفضاء الشاهد الذي يعلو أصوات الأفكار المزعجة بوقار.
2. **سحق سباق الأنا للوراء والأمام:** مناهضة قاطرة الزمن النفسي والتعلق الزائف بالذكريات والخطط على حساب وعيش مفرزات الحاضر.
3. **مراقبة عواطف الجسد:** قراءة المجهود العواطفي والقبول اللامشروط للمشاعر دون الغرق بالدراما اللفظية السلبية الطاحنة.`,
            contentEn: `You have successfully unlocked the primary blueprints for deep inner sanctuary! Let us synthesize the cornerstone concepts:

1. **Observe the thinker:** Realize you are not the thinking voice; you are the spacious field of awareness behind the constant words.
2. **Refuse ego migrations:** Actively resist the mind's escape into yesterday and tomorrow, prioritizing current tasks.
3. **Welcome bodily emotions:** Audit physical sensations neutrally, bypassing verbal drama and maintaining calm.`
          },
          {
            id: 'pn_ch1_l5',
            idNum: 5,
            titleAr: '5. دليل التمارين الحياتية للحضور الفوي وقياس معايير وعيك وصمودك الروحي والعملي',
            titleEn: '5. Practical Tips: Awakening Intimate Presence in Your Routine',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث صيغ عملانية وتلميحات يومية لتفعيل الحضور الساكن والبهجة الحالية اليوم:

- **تطبيق فواصل التنفس الثلاثة:** ثلاث مرات بجدولك المزدحم، قف تماماً عن أي مجهود وركز وهج انتباهك على زفيرك وشهيقك ودخول النقاء بوعي دقيق لجسدك الداخلي.
- **تأمل غسيل الأيدي والوجبات:** حول أي نشاط روتيني (كالمشي، تناول الطعام، غسل الوجه) إلى تجربة تنويرية عبر الانغماس الكامل بلمس الأشياء وسماع صب المياه ومضغ التغذية بحس مرهف لا تشوبه أفكار معطلة.
- تقدم الآن وعزز صدارتك الروحية واجتز **التقييم الشامل للفصل الأول** لتقتنص نقاط الكفاءة المستحقة!`,
            contentEn: `Here are three pragmatic formulas to inject the stillness of presence into your daily operations starting now:

- **The Conscious Breath Stop:** Three times inside your daily routine, pause all logical tasks, focus your attention on your breath, and feel the silent energy of the inner body.
- **The Ritualization of Mundane Tasks:** Upgrade common actions (like eating or washing) into portals of enlightenment by immersing your senses fully in the touch, scent, and sound of the moment.
- Sit for the **Chapter 1 Evaluation** to secure your persistent mastery and advance further!`
          }
        ],
        quiz: [
          {
            questionAr: "كيف يمكنك بذكاء كسر سيطرة وهم الأنا والأفكار الصاخبة وفقاً للفصل الأول؟",
            questionEn: "How do you break the iron grip of the ego and mental chatter according to Chapter 1?",
            optionsAr: [
              "بالصراخ بصوت مرتفع لتسديد الضربات والشتائم للأفكار المزعجة حتى تغادر تماماً.",
              "بتقمص شخصية المراقب والشاهد الصامت للأفكار بوقار، دون محاربتها أو إصدار أحكام روتينية عليها.",
              "بزيادة شرب القهوة والتفكير بعمق بكافة صراعات الأصدقاء وتكبير الديون لتعجيز العقل."
            ],
            optionsEn: [
              "By shouting back at your passing thoughts to scare the inner dialogue away.",
              "By adopting the persona of the silent witness, observing passing concerns neutrally without fighting or labeling them.",
              "By stimulating panic through overthinking material struggles to paralyze structural mind-hacks."
            ],
            correctIndex: 1,
            explanationAr: "مراقبة المفكر بهدوء تسحب الوقود والنقد عن الأفكار التشتتية الحاكمة لتذيبها وتسلب نفوذ الأنا بكل هدوء وثبات.",
            explanationEn: "Neutral observation starves thoughts of identification energy, causing the ego's control mechanisms to gently collapse."
          },
          {
            questionAr: "ما هي الصلة الجوهرية والصيغة الحيوية المميزة لعواطف المشاعر بجسدك؟",
            questionEn: "What represents the fundamental relationship between emotions and your body?",
            optionsAr: [
              "المشاعر هي مجرد غدد هرمونية ليس للعقل أو القلق المتراكم أي صلة بصناعتها مطلقا.",
              "المشاعر هي تمثيل وانعكاس مادي مباشر لردود فعل العقل وأفكاره غير الواعية بداخل جسد الإنسان.",
              "المشاعر هي ذكاء خارق تضمنه المدارس بحرص للتخلص من العبء المادي والوظيفة."
            ],
            optionsEn: [
              "Emotions are simple standalone biological metrics completely unrelated to continuous cognitive worry.",
              "Emotions represent the body's direct physical mirror and reflection of mental activity and unconscious thoughts.",
              "Emotions are complex structures taught by modern schools to ease fiscal strain."
            ],
            correctIndex: 1,
            explanationAr: "العواطف تعكس الفكرة؛ فالفكرة المقلقة تخلق خوفاً ملموساً بعضلات الجسد، ومراقبتها كطاقة حسية دون تسميات فكرية تذيب الألم فوراً.",
            explanationEn: "Emotion mirrors thought; an anxious worry generates contraction. Neutral sensing resolves the underlying stress loop."
          },
          {
            questionAr: "ما هو جوهر مفهوم 'التنوير الروحي' الحقيقي عند إيكهارت تول؟",
            questionEn: "What is Eckhart Tolle's core definition of true 'Spiritual Enlightenment'?",
            optionsAr: [
              "هو حيازة إمكانيات خارقة كالمشي فوق الماء والقدرة على الطيران بالمهرجانات العالمية.",
              "هو ببساطة تذويب التشتت واسترجاع اتصالك بجوهر وجودك الساكن والأبدي في لحظة الحاضر النظيفة.",
              "هو اعتزال كامل الحياة البشرية وتجنب التفاعل مع الأسواق والعمل بصفة نهائية ومطلقة."
            ],
            optionsEn: [
              "It is acquiring supernatural abilities like flying across cities or defying physical laws under stage lights.",
              "It is simply dissolving the mental haze and reclaiming your union with your deep, eternal Being in the Present.",
              "It is abandoning human society altogether and avoiding work or communication permanently."
            ],
            correctIndex: 1,
            explanationAr: "التنوير هو استقراء السكون الداخلي وصيانة اتصالك بنبع الكينونة السائد خلف سحابة الأفكار التوترية الصاخبة.",
            explanationEn: "Enlightenment is the peaceful realization of your state of Being, untouched by the continuous storms of the thinking mind."
          }
        ]
      },
      {
        id: 'pn_ch2',
        chapterNum: 2,
        titleAr: 'الفصل الثاني: الوعي هو مخرج الألم ولا تخلق أظفار العذاب بالحاضر',
        titleEn: 'Chapter 2: Consciousness is the Way Out of Pain & Stopping suffering',
        descriptionAr: 'آليات إذابة جسد الألم الموروث، تطهير المعاناة النفسية الفورية، وقهر وهم الزمن السيكولوجي بمحاربة الهجرات الفكرية للماضي كلياً.',
        descriptionEn: 'Techniques of dissolving the inherited pain-body, terminating active suffering, and eliminating psychological time projections.',
        lessons: [
          {
            id: 'pn_ch2_l1',
            idNum: 1,
            titleAr: '1. مأساة المعاناة الفورية: التصلب العقلي والتحيز اللامشروط للحظة الآنية لمنع العذاب',
            titleEn: '1. Stop Creating Suffering Now: Complete Alignment with Reality',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك في المحور الثاني التأسيسي لتمام نضارتك وعلو وعيك! نتأمل اليوم الدرس الأبرز للتحرر: **"لا تخلق مزيداً من الألم في الحاضر"**.

**من أين تنشأ المعاملة المعيشية اليوم؟**
المعاناة النفسية تبدأ بفكرة رفض للموجود ومقاومة الواقع. حين يرفض عقلك الخسارة المادية، أو يتشنج من فواتير مباغتة، فإنه يبني دراما ممتلئة بالمعاناة توازي الكارثة ذاتها مئة مرة وتفتت نقدك وقواك الذهنية.

**الحل الكيوساكي والروحي الفذ:**
اقبل اللحظة كما هي أولاً (Accept current reality first). قبولك للحدث كشاهد صامد يعزل عن قلبك رد الفعل الغاصب، ويمنح تفكيرك الفني ونظامك القيادي برودة الأعصاب والمناعة اللازمة لاتخاذ قرارات كاسحة ونافذة بلا تنازل أو غرق بالنواح والندم البائس.`,
            contentEn: `Welcome to the second module focusing on tactical emotional immunity! Today, we deconstruct Eckhart's major directive: **"Create no more pain in the present."**

**Where does suffering come from?**
Passive suffering originates from resisting reality. When the mind rejects an unexpected change, it spins a drama of victimhood that multiplies the actual problem a hundredfold.

**The executive solution:**
Accept the current moment as it is first. Accepting the starting reality insulates your system from rage, giving your analytical mind the cool clarity needed to execute clean solutions.`
          },
          {
            id: 'pn_ch2_l2',
            idNum: 2,
            titleAr: '2. جسد الألم (Pain-Body): كيفية مواجهة الكيان المظلم الممتص لطاقاتك وإذابته بالوعي الساكن',
            titleEn: '2. The Pain-Body: Dissolving the Shadow Self with Pure Awareness',
            duration: '3m',
            type: 'core',
            contentAr: `يتكامل رصيدك المهاري بفهم هذا المفهوم الخارق: **جسد الألم (Pain-Body)**.

**ما هو جسد الألم بداخلنا؟**
هو تجمع وتراكم لكافة الآلام النفسية والكسور العاطفية التي مررنا بها بطفولتنا ولم نتخلص منها. يعيش هذا الظل الساكن كطفيلي يتغذى على طاقتنا، ويستيقظ فجأة ليثير عاصفة من الحزن الشديد أو الغضب المباغت رغبة منه في تغذية ذاته بمزيد من النكد والصراخ مع الآخرين.

**شفرة إذابة جسد الألم المارد:**
الحل ليس بمقاومته أو كتمه الهدام؛ بل بإنزال **وهج الملاحظة الواعية** عليه فور يقظته. حين تشعر بفيضان الغضب يغلي بداخلك، قف كحارس ناصح، وتنفس رصيناً، واستشعر طاقته بوعي سليم دون إعطائه وقوداً من الأفكار الصامتة المشتعلة بالندم. هذا يحرمه من فرصة السيطرة ويحوله تدريجياً لوعي ساكن ونظيف.`,
            contentEn: `Our structural emotional safety deepens by understanding Tolle's critical concept: **The Pain-Body**.

**What represents the Pain-Body within us?**
It is a cumulative field of unresolved emotional wounds and disappointments carried from the past. It dwells as a semi-autonomous parasite feeding on your energy pool, waking up periodically to trigger sudden melancholy or rage to feed on drama.

**Deactivating the phantom self:**
Do not suppress it. Flood it with **pure presence** the moment it stirs. When you feel a tide of anxiety rising, stand as the conscious witness, feel the localized energy, and starve the urge to overthink. This strips the pain-body of control.`
          },
          {
            id: 'pn_ch2_l3',
            idNum: 3,
            titleAr: '3. وهم الزمن السيكولوجي: تفكيك أغلال ماضيك الزائف لتوسيع مسار بناء الأصول والفاعلية',
            titleEn: '3. Breaking Psychological Time: Maximizing Output via the Present',
            duration: '3m',
            type: 'core',
            contentAr: `هناك تمييز فني حاسم بين نوعين من الزمن يجب عليك إدراكه لترقية بصيرتك الاستثمارية وتسييس مجهودك:

1. **الزمن العادي (Clock Time):** الزمن التنظيمي الفني لجدولة المواعيد والتداول وإنجاز الواجبات، وهو صحي وبناء لصناعة صدارتك المهنية والعملية اليومية بانتظام.
2. **الزمن النفسي (Psychological Time):** التماهي الكسول والتحيز الدائم للعيش بذكريات الندم بالماضي أو قلق طموحات المستقبل الخادعة، مما يسلب فاعلية تركيزك اليوم.

**التحرر الشامل:**
استعمل الزمن العادي بكل كفاءة لتوجيه عملك وتدريب مهاراتك اليوم، لكن اقطع فوراً قاطرة الزمن النفسي التي تسرق وهج لمعان عقلك وتهدر جهود التطوير بجدولك الشفاف مستعبدة إياك للأوهام الكاذبة.`,
            contentEn: `Eckhart defines a strategic boundary between two forms of time. Grasping this optimizes your performance and preserves your focus:

1. **Clock Time:** Practical temporal metrics used to schedule project delivery, draft balance sheets, and audit systems. Crucial for career efficiency.
2. **Psychological Time:** Unconscious migration into yesterday's regrets or tomorrow's fantasies, which drains constructive focus.

**Sovereign execution:**
Utilize clock time to govern your tasks, but instantly disconnect the flow of psychological time that robs your mind of operational clarity and halts progression.`
          },
          {
            id: 'pn_ch2_l4',
            idNum: 4,
            titleAr: '4. محطة العبور: تثبيت آليات موازنة المشاعر والتخلص السلس من كيد جسد الألم والزمن النفسي',
            titleEn: '4. Review Node: Integrating Pain-Body Dissolution & Clock Time Mastery',
            duration: '3m',
            type: 'review',
            contentAr: `مبارك عليك اجتياز هذا المفرق المعرفي الهام لتطهير قنوات حريتك ووعيك الروحي! نلخص أهم أضلع العبور الثابتة:

1. **قهر توليد المعاناة اليوم:** الوعي بأن الرفض والقاومة للواقع كعجلة غضب مفرغة يضاعفان حجم الخلل المالي أو الإداري مراراً دون عائد.
2. **تشتيت وقود جسد الألم:** تسليط مصباح الحضور الصامت عليه بمجرد الاستثارة لتعجيز سطوته وتذويبه في بحر الروتين الواعي.
3. **توطيد الزمن العادي:** جدولة أعمالك وتدريب مهاراتك المانحة للامتياز بانتظام، مع قطع تيار الأطماع والقلق الوهني للمستقبل الزائف.`,
            contentEn: `You have successfully mastered the complex mechanics of emotional immunity and temporal alignment! Let us synthesize the cornerstone concepts:

1. **Terminate suffering generation:** Realize that resisting current challenges strictly worsens the friction. Align with the situation to plan actions.
2. **Dissolve the Pain-Body:** Ignite the light of non-reactive observation to dissolve historical emotional traps.
3. **Optimize Clock Time:** Drive career execution step-by-step, while cutting psychological time that leaks your attention.`
          },
          {
            id: 'pn_ch2_l5',
            idNum: 5,
            titleAr: '5. تلميحات وصيغ وتطبيقات عملية لاختراق جسد الألم وتثبيت رصيف الحضور الدائم بذكاء',
            titleEn: '5. Practical Tips: Safeguarding Your Present State Today',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث نصائح عملانية فخمة وشهية لتجديد صفاء وقدرة موازنتك ووعيك المعيشي اليوم:

- **تدريب رادارية جسد الألم:** صنف مشاعرك فوراً عند نقاش حاد عائلي أو مهني: "هل ردي نابع من الحدث الحالي أم من تراكم آلام الماضي؟" استنشق الصمت وتأمل بوقار وافصل بحصافة.
- **تطبيق العودة لقماشة التنفس الستار:** عند استشعار قلق مالي أو مهني وهمي للمستقبل، اترك مكعب الأوراق لثوانٍ واغمر جسدك المادي بحضور دافئ واقهر ثنائية الخوف.
- تقدم الآن ونافس بكل جدارة واجتز **التقييم الشامل الختامي للفصل الثاني** لتستحوذ على أعلى نقاط الكفاءة بجدارة!`,
            contentEn: `Here are three dynamic techniques to cultivate emotional and situational sovereignty today:

- **The Trigger Diagnostic:** Notice your internal responses during workplace friction: "Am I responding to Chapter 1 reality, or is my pain-body speaking?" Breathe and distance yourself.
- **The Immediate Body Grab:** When future-based anxiety begins to distract you, stop your computer mouse, and focus all perception on the internal space of your limbs.
- Sit for the **Chapter 2 Exam** to prove your structural upgrade and unlock Chapter 3!`
          }
        ],
        quiz: [
          {
            questionAr: "ما هو تصنيف وتوصيف 'جسد الألم' (Pain-Body) بداخل موازنات طبائع البشر؟",
            questionEn: "What is Tolle's description of our internal 'Pain-Body'?",
            optionsAr: [
              "هو هيكلية جسدية رياضية تطور معدلات العضلات بمجرد حمل المتاعب والمقاييس والمال.",
              "هو حقل تجمع وتراكم لآلام وجراح الماضي يعيش كطفيل مظلم بداخلنا ويتغذى على دراما النكد والصراع.",
              "هو معمل وقائي تضمنه البنوك لصناعة حصانة مالية تحميك من نفوذ الخسارة الاستثمارية."
            ],
            optionsEn: [
              "It represents a physical muscular framework that expands capacity as you lift material burdens.",
              "It is an accumulated field of unresolved historical wounds, living inside as a semi-autonomous shadow that feeds on drama.",
              "It refers to a protective banking buffer aimed at securing currency reserves from inflation."
            ],
            correctIndex: 1,
            explanationAr: "إذابة جسد الألم تتأتى بالامتناع التام عن التماهي الفكري معه، والعودة الفورية للحظة الحاضر النظيفة كشاهد صامت يسحب وقود الندم.",
            explanationEn: "Neutral observation cuts the supply flow. By observing the pain-body without identifying, you dissolve its grip."
          },
          {
            questionAr: "ما هو الفاصل الذهبي والتحيز الحصيف الصانع للفروق بين 'الزمن العادي' و 'الزمن النفسي'؟",
            questionEn: "What is the strategic boundary between 'Clock Time' and 'Psychological Time'?",
            optionsAr: [
              "الزمن العادي هو الشغل المؤقت بينما السيكولوجي يسفر عن ترقية منصبك بالعمل الحكومي لتدريب مهاراتك.",
              "الزمن العادي فني لجدولة الأهداف والتدريب وصناعة الصدارة والريادة، بينما النفسي هجرات عشوائية عقيمة تحجزك بالندم والتوهم وقلق المستقبل.",
              "لا يوجد أي فرق بينهما فكلاهما مصادر وهمية تستخدمها الشركات الكبرى لغرض استعباد مجهود الموظف."
            ],
            optionsEn: [
              "Clock time refers to part-time tasks, while psychological time guarantees long-term public job promotions.",
              "Clock time is a practical tool to organize tasks, while psychological time is an exhausting migration into regrets of yesterday or worries of tomorrow.",
              "There is no distinction, as both represent arbitrary constructs utilized by conglomerates to exploit output."
            ],
            correctIndex: 1,
            explanationAr: "تسييس وقتك باستعمال الزمن العادي لخدمة الأهداف وتطوير الأصول، مع الاستئصال الصارم للزمن النفسي هو ذروة النجاح والذكاء المالي والعملي الواعد.",
            explanationEn: "Use Clock Time to drive functional tasks, and sever Psychological Time to protect your operational sanity."
          },
          {
            questionAr: "كيف يؤثر رفض ومقاومة مجريات الواقع الراهنة على الإنسان من منظور الفصل الثاني؟",
            questionEn: "How does resisting the reality of the present moment affect human efficiency?",
            optionsAr: [
              "يمنح رصيدك وقواك الاستثمارية دافعاً كبيراً للتفاوض وتسييس البنوك بذكاء.",
              "ينتج المعاناة النفسية المفرغة والدراما التشتتية التي تستهلك لمعان عقلك وتهدر طاقاتك ونقدك دون أي مردود صيانة حقيقي للواقع.",
              "يسهم في حماية ممتلكاتك الشرفية ويقلل نفقات وضرائب الشركات كلياً."
            ],
            optionsEn: [
              "It provides your financial operations with powerful leverage to negotiate better interest rates with local banks.",
              "It produces active psychological suffering and dramatic drama that drains mental focus and stops career productivity.",
              "It safeguards your private property and directly decreases corporate income tax."
            ],
            correctIndex: 1,
            explanationAr: "القبول اللامشروط للواقع الحالي أولاً يسكن ثورة الغضب السلبي بقلبك، ويمنح عقلك وهج الرزانة والنور لاتخاذ قرارات كاسحة تنمي أصولك.",
            explanationEn: "Accepting current challenges stabilizes your nervous system, granting you the quiet resolve to implement constructive answers."
          }
        ]
      },
      {
        id: 'pn_ch3',
        chapterNum: 3,
        titleAr: 'الفصل الثالث: التحرك بعمق في اللحظة الآنية وتذويب وهم المستقبل السيكولوجي',
        titleEn: 'Chapter 3: Moving Deeply into the Now & Transcending Future Projections',
        descriptionAr: 'منظومة الاستسلام الروحي الفعال كقوة إعجازية قاهرة، تذويب هوس القلق التخطيطي، والوصول الفني للبعد الكائن خلف ثنائيات العقل المتلاطمة.',
        descriptionEn: 'The masterclass of active surrender, dissolving compulsive planning anxiety, and accessing the spacious dimension beyond mental polarities.',
        lessons: [
          {
            id: 'pn_ch3_l1',
            idNum: 1,
            titleAr: '1. التجاوز الفذ للزمن: كيف ندخل الأبعاد العميقة للآن لتطهير قلق التخطيط للمستحيل',
            titleEn: '1. Transcending Time Projections: Accessing Inner Silence Today',
            duration: '4m',
            type: 'intro',
            contentAr: `مرحباً بك يا صديقي في الفصل الثالث التمكيني والملحمي الختامي لقوة السكون والوعي السامق! دعنا نغوص في شفرتها الكبرى: **"التحرك بعمق في اللحظة الآنية (Moving deeply into the Now)"**.

**مكمن ألاعيب المستقبل الروتينية:**
يقنعنا العقل دائماً بأن: "الحرية والسعادة المطلقة ستأتي في المستقبل حين تحوز وظيفة جديدة، أو تنهي أقساط العقار". يسمي إيكهارت هذا بـ **مستقبل زمن الأمان الزائف**.
- **المستقبل السيكولوجي:** وهم يستعبدك لتضحية بنقاوة يومك وصحة جسدك من أجل وهم وهمي لا تملكه أبداً.
- **الحاضر الأكتع (الآن):** هو ملكيتك وصك سيادتك الوحيد؛ فيه تخلق الوفاق وتؤسس التحالفات وتولد الأصول الواعدة بحيوية بالغة.

**الهدف الجوهري:**
تعلم كيف تسحب كامل طاقتك من سيناريوهات المستقبل لتقر استقرارك الكلي في مهام ساعتك الجارية بنية مخلصة وهمة عالية تصنع الفروق الساطعة.`,
            contentEn: `Welcome to the final, masterpiece chapter of presence and transcendental focus! Let us learn the primary guide: **"Moving deeply into the Now."**

**The structural future illusion:**
The mind perpetually whispers: "Freedom belongs to the future when you pay off your loans or start your enterprise." Tolle labels this **The Psychological Future Trap**.
- **The Psychological Future:** A projection that tricks you into sacrificing your current health for phantom configurations.
- **The Alive Present (Now):** Your single actual asset. In it you form strategic alliances and build wealth with absolute vigor.

**Your foundational task:**
Withdraw attention from speculative future scenarios. Anchor your entire potential inside your current hour with continuous accuracy and supreme resolve.`
          },
          {
            id: 'pn_ch3_l2',
            idNum: 2,
            titleAr: '2. الاستسلام الروحي الفعال (Surrender): القوة الإعجازية التي تسخر طاقات الكون لصالحك',
            titleEn: '2. Active Surrender: The Supreme Channel of Non-Resistance',
            duration: '3m',
            type: 'core',
            contentAr: `يتطرق هذا الدرس لمفهوم يجهله الكسالى ويساء فهمه كثيراً: **الاستسلام الروحي الفعال (Surrender)**.

**ما ليس من الاستسلام مطلقاً:**
الاستسلام ليس خنوعاً بائساً، أو رضىً كسولاً بوضع خانق أو خسارة متداولة؛ بل هو نقيض ذلك تماماً:
- **الخنوع الكسول:** البقاء بوضع مزرٍ ومعاملة مهينة وتوزيع طاقة الشكاوى اللفظية الهدامة.
- **الاستسلام الفعال (الحركي):** القبول الداخلي المطلق للشكل الحالي للمسألة بلا مقاومة عواطفية ← قطع دراما الرفض ← استخدام وهج التفكير القيادي النقي لاتخاذ فعل حركي كاسح يغير الوضع، أو المغادرة السليمة للكيان فوراً.

الاستسلام الفعال يعطيك قوة الكون الحاضرة الساكنة لتتحرك بكل رزانة وتتفوق دون إنهاك أعصابك في صراع موازين القوى التافهة.`,
            contentEn: `In this lesson, we study a profound concept frequently misunderstood by the passive: **Active Surrender**.

**What Surrender is absolutely NOT:**
Passivity, victimization, or lazy resignation to systemic abuse. It is the energetic polar opposite:
- **Lazy Resignation:** tolerating toxic workplaces while venting negative dialogue constantly.
- **Active Surrender:** Accepting the localized reality without internal friction -> halting emotional panic -> deploying your clean strategic resources to either change the setup with decisive action or walk away instantly.

Active Surrender connects you with the spacious field of Being, allowing you to execute targets with absolute momentum without burning raw biological energy.`
          },
          {
            id: 'pn_ch3_l3',
            idNum: 3,
            titleAr: '3. الوعي كشاهد ناصح: قهر جنون الأفكار المكررة وصيانة اتصالك بنبع الكينونة السائد',
            titleEn: '3. The Spacious Watcher: Accessing Unmanifested Being',
            duration: '3m',
            type: 'core',
            contentAr: `الذكاء والتحسن المستدام مآله الدائم لصيانة اتصالك بـ **نبع الكينونة السائد خلف الأشكال (Unmanifested Being)**.

**العيش كفضاء شاهد:**
حين تزدحم فصول التداول وتقارير المؤسسة، لا تجعل عقلك يتورط في الدراما السلوكية المضطربة للأقران؛ بل انسحب لثوانٍ واشهد سكون الفراغ بقلبك الداخلي.

**الأبعاد الثلاثية للذكاء الروحي الشامل:**
1. **الصمت (Silence):** الإنصات لعمق السكون السائد واستنشاق لمعان الفضاء كبوابة دخول للبعد الإلهي الرقيب.
2. **الفضاء (Space):** إدراك أن الفضاء الخالي بالكون ليس عدماً، بل هو الحاضن الحقيقي الوديع اللانهائي، تماماً كصمتك بداخل صخب العمل.
3. **الاستسلام (Surrender):** إخضاع رغبة الأنا المستمرة بالصراخ وإبراز الوجود الاستهلاكي لنقاء السكون المهيب المانح للسيطرة.`,
            contentEn: `Career intelligence and lifelong expansion depend on maintaining connection with the **Spacious Source behind all forms (The Unmanifested)**.

**Living as the witnessing space:**
When P&L stress and peer drama begin to crowd your workplace, do not merge with the tension. Step back mentally, anchor your system, and observe the wide space of stillness around your environment.

**The three keys of operational spiritual IQ:**
1. **Silence:** Tuning into the stillness between external sounds as a portal of focus.
2. **Space:** Realizing that empty space is actually the peaceful baseline that permits physical forms to exist.
3. **Surrender:** Subordinating the ego's thirst to boast or dominate, to align with quiet, unshakeable dignity.`
          },
          {
            id: 'pn_ch3_l4',
            idNum: 4,
            titleAr: '4. محطة العبور: تلخيص الفصول الختامية وميثاق السكون وحصاد التنوير والتحرر المالي والروحي',
            titleEn: '4. Review Node: Synthesizing Surrender, Presence & Lifelong Abundance',
            duration: '3m',
            type: 'review',
            contentAr: `مبارك مبروك! لقد تكللت مسيرتك التنموية بتمام استيعاب المسار الملحمي والروحي الفذ لكتاب "قوة الآن"! نجمع اليوم أضلع التحسن الروحي الختامي الكبرى:

1. **العيش في عمق الآن:** رفض زمن الأوهام السيكولوجية للمستقبل، وتوجيه النقد الذهني لتشغيل مربع أصولك الحالي بكل كفاءة وسرور.
2. **قوة الاستسلام الحركي:** القبول اللامشروط للحاضر لامتصاص العواصف وتسييس النظم وتحريك الماكينة الإدارية والمالية بدقة سامقة.
3. **الاتصال بنبع الكينونة:** تطهير لمعان عقلك وصيانة ثباتك القيادي مستعيناً بالصمت والفضاء والنزاهة الداخلية.`,
            contentEn: `You have successfully conquered the complex blueprint of Tolle's timeless teaching! Let us synthesize the ultimate private and team metrics:

1. **Live in the depths of Now:** Sever psychological future delusions, channeling your complete executive capacity to expand your current asset portfolios.
2. **Harness Active Surrender:** Welcome current reality neutrally to neutralize crisis friction and optimize organizational pipelines.
3. **Reclaim Union with Being:** Maintain clean awareness, drive operations with unshakeable calm, and enjoy perpetual peace.`
          },
          {
            id: 'pn_ch3_l5',
            idNum: 5,
            titleAr: '5. ممارسات المعيشة الفعالة وتكريس رصيد الإحراز المعرفي الروحي الشامل مدى الحياة',
            titleEn: '5. Practical Tips: Launching Your Lifelong Awareness Cycle Today',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك ثلاث نصائح إرشادية وتدريبات عملية لتنشيط نجاحك الساكن والبهجة الحالية بانتظام:

- **تدريب ميزانية التدفق الروحي:** قيم نسبة تدفق وعيك اليومي: "ما هي الساعات التي انقضت بتنازل وأحزان الماضي أو قلق المستقبل؟" عدل السكتة والمسار بعهد الفترات الساكنة.
- **تطبيق الاستسلام الحركي الفوري:** واجه أي تعثر مهني أو مالي: اقبل النتيجة فوراً بصمت ← اوقف اللوم الجانبي الضيق ← اتخذ عملاً واثقاً كاسحاً يغير الكيان تماماً.
- ترفق يا صديقي وثبت شراع علمك وجرب بقوة واجتز **التقييم الشامل الختامي** لإصدار وتثبيت **شهادة إتمام المسار ومطابقة المقاييس 🎓!**`,
            contentEn: `Here are three pragmatic formulas to anchor your lifelong continuous spiritual and career upgrade path today:

- **The Awareness Audit:** Document your internal state during the day: "How many hours did I waste on psychological regrets or future anxiety?" Re-anchor via quiet blocks.
- **Immediate Active Surrender:** Handle any career setback: Accept results peacefully first -> terminate blame -> deploy clean, targeted action to change the system.
- Take a deep, proud breath, and sit for the **Chapter 3 final evaluation** to officially generate your **Continuous Spiritual & Career Achievement Certificate 🎓!**`
          }
        ],
        quiz: [
          {
            questionAr: "ما هو التفسير والصيغة الحقيقية لمبدأ 'الاستسلام الروحي الفعال' (Surrender) عند إيكهارت تول؟",
            questionEn: "What is the authentic application of 'Active Surrender' according to Chapter 3?",
            optionsAr: [
              "هو الخنوع التام للظلم المالي وتوزيع طاقة الشكاوى ومجالسة الكسالى السلبيين.",
              "هو القبول القلبي المطلق للواقع الحالي كوجود دون مقاومة عواطفية واهية، ثم تحريك التفكير النقي لاتخاذ فعل حركي يغير الوضع بدقة.",
              "هو بيع كافة الممتلكات الشخصية والشركات المغلقة والجلوس منفرداً بلا عمل."
            ],
            optionsEn: [
              "It is submissive resignation to career stagnation while constantly venting complaints with passive peers.",
              "It is the absolute inner acceptance of the current situation as it is, followed by deploying clean strategic action to resolve the challenge.",
              "It refers to liquidating all corporate assets and residential properties to sit permanently idle."
            ],
            correctIndex: 1,
            explanationAr: "الاستسلام الفعال يعطيك قوة السلام والوعي الساكن بقلبك، مما يمنح حركتك ونشاطك دقة ساحقة وقدرة استثنائية على صناعة صدارتك الكونية.",
            explanationEn: "Surrender dissolves the friction first, giving your logical resources the unhampered power to execute clean answers."
          },
          {
            questionAr: "لماذا يحذر الكاتب بشدة من فخ 'المستقبل السيكولوجي' وموجات التوهم بالزمن؟",
            questionEn: "Why does the author warn against the trap of 'Psychological Future'?",
            optionsAr: [
              "لأن التخطيط العملي الفني الروتيني للمواعيد هو نشاط مدمر للبنوك ومحفز للضرائب.",
              "لأن العقل يوهمنا بأن السلام والامتياز قادم بجعلنا نضحي ببهجة وصحة حاضرنا من أجل غد وهمي لا نملكه، مما يسلب فاعليتك ويجمد أصولك.",
              "لأن المستقبل هو سمة خارقة تضمنها الشركات الكبرى لزيادة ثقة الموظف."
            ],
            optionsEn: [
              "Because standard clock time scheduling represents an administrative workflow that increases corporate taxes.",
              "Because it tricks you into sacrificing your current health and joy for a phantom tomorrow, robbing your system of real operational productivity.",
              "Because the future represent a mechanical guarantee provided by conglomerates to raise labor confidence."
            ],
            correctIndex: 1,
            explanationAr: "الحاضر (الآن) هو دفتك وكيانك الوحيد الذي يحوز صناعة الأصول، وسحب طاقتك من المستقبل وتركيزها باليوم هو قمة الامتياز والصدارة واليقين.",
            explanationEn: "The present moment is your single active asset. Directing your raw potential into the Now scales up your operational productivity."
          },
          {
            questionAr: "كيف تسهم ركائز 'الصمت' و 'الفضاء' بداخل مدرسة الحضور والذكاء الروحي الدائم؟",
            questionEn: "How do Silence and Space support spiritual and career intelligence in Tolle's model?",
            optionsAr: [
              "هما مصطلحات خالية المضمون لا نفع لها سوى تقييد العمل المكتبي وصرف انتباهك كلياً.",
              "تمهد بوابات ممتازة للدخول إلى بعد الكينونة السائد خلف الأشكال والأقنعة، لإخضاع قلق الأنا وتطهير الروتين واسترجاع لمعان وإبداع فكرك.",
              "تمنح ضرائب ونفقات الشركات المغلقة ثباتاً بنسبة صفر فائدة في البنوك العالمية."
            ],
            optionsEn: [
              "They are theoretical, content-free values that serve only to restrict office activity and divert clean attention.",
              "They represent powerful portals to access the stillness of Being, helping override egoic panic, clear daily stress, and unleash creative solutions.",
              "They guarantee corporate tax rates are lowered to absolute zero within central global banking nodes."
            ],
            correctIndex: 1,
            explanationAr: "استرجاع صلاتك بنبع الكينونة الساكن بالاستفادة من الصمت والفضاء الروحي يبسط سيطرتك المهنية ويجعل حركتك نافذة وقواك متآزرة بنشاط صامد.",
            explanationEn: "Sustaining connection with Stillness via silent intervals elevates your career resilience, giving you unshakeable calm."
          }
        ]
      },
      {
        id: 'pn_ch4',
        chapterNum: 4,
        titleAr: 'الفصل الرابع: تفكيك صخب الأنا والتسليم الواعي (الانعتاق والحرية المطلقة)',
        titleEn: 'Chapter 4: Surrendering Your Ego & The Grace of Non-Resistance',
        descriptionAr: 'قوة الاستسلام الواعي للحدث، تذويب ممانعة الأنا، وتلقي الأحداث بصمت الكينونة والحرية الروحية الراقية للعمل السليم.',
        descriptionEn: 'The profound power of conscious surrender, dissolving egoic resistance, and greeting life events with centered clarity.',
        lessons: [
          {
            id: 'pn_ch4_l1',
            idNum: 1,
            titleAr: '1. شفرة جلاء ممانعة النفس: الكيفية العميقة لسلام الروح الدائم',
            titleEn: '1. Dissolving Resistance: Shifting from Egoic Pain to Pure Freedom',
            duration: '4m',
            type: 'intro',
            contentAr: `ممانعة الواقع ومقاومة اللحظة الآنية هي المصدر والجذر الأول لكل ألم نفسي أو تشتيت إداري ومهني.

**التسليم الواعي (Surrender):**
ليس التسليم انسحاباً سلبياً أو تقبلاً للهزيمة والكسل؛ بل هو **التصالح الذكي الشجاع مع الواقع كما هو في اللحظة** أولاً، مما يمنحك الطاقة الكلية والوضوح المعرفي لتتصرف بفاعلية وقوة مذهلة لحل المشاكل دون تبديد طاقتك في الصراخ الغاضب.

**لماذا تقاوم الأنا الحدث؟**
لأن الأنا تعتقد بأن المقاومة والاعتراض العنيف يمكّنها من السيطرة والحماية؛ بينما الحقيقة أنها تجعلك في غاية الوهن النفسي وتطيل عمر الأزمة.`,
            contentEn: `Resisting the reality of the present moment is the ultimate source of all subjective pain and corporate friction.

**What is Conscious Surrender?**
It is not passive yielding or lazy submission; it is **unconditional acceptance of what is, right now**. This alignment supplies you with the maximum focus and clarity required to act decisively and solve crises.

**Why does the Ego resist?**
Your egoic system falsely believes that verbal resistance is a powerful armor; in reality, rejection weakens your resolve and prolongs the struggle.`
          },
          {
            id: 'pn_ch4_l2',
            idNum: 2,
            titleAr: '2. تفكيك الأنا المتهكمة: صيانة عقلك من فخاخ التباكي على الأمس والتوتر',
            titleEn: '2. Overriding Egoic Patterns: Dislodging Worry from Inside',
            duration: '3m',
            type: 'core',
            contentAr: `يتغذى كيان الأنا (Ego) بالكامل على الأمس والمستقبل، ويشعر بالتهديد العميق إذا تركز حضورك في الآن وساد الهدوء التام بذهنك.

**الممارسات الفعالة لتطهير الأنا:**
عندما تكتشف أنك محبوس في نقاش عقيم أو لوم مفرط، تنفس بعمق وكن الشاهد الهادئ على أفكارك وجسد الآلام بداخلك. رصدك ومراقبتك للأنا يسلبها تملكك وتثبيت سيادتها الزائفة، ليرتد تيار ذكائك ويفيض إبداعاً وحكمة من روح كينونتك الأصلية.

صيانة أفكارك وتحصين منطقها بالأمانة يعود بك مباشرة لرصيف السلام الصامد والصحوة الكونية الفصحى.`,
            contentEn: `Your ego feeds on the static past and the phantom future. It is threatened when your attention is focused strictly in the present moment.

**Overcoming Egoic Traps:**
When you catch yourself in circular arguments or excessive complaints, take a deep breath. Become the quiet witness of your thinking. Observing the ego strips it of its control over your behavior, allowing your original intelligence to flow with pristine clarity.

Guarding your thoughts from circular disputes anchors you directly on the solid shores of unshakeable calm.`
          },
          {
            id: 'pn_ch4_l3',
            idNum: 3,
            titleAr: '3. ممارسات التسليم اليومي: كيف تحول الأزمات إلى سلام مستمر صامد',
            titleEn: '3. Standard Tips: Embedding Surrender into Daily Labor',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه التطبيقات لامتلاك فضيلة التسليم الواعي اليوم:
            
- **تطبيق 'هذا ما هو عليه':** عند وقوع عقبة أو مشقة إستراتيجية اليوم، كرر مع نفسك بسلام: "هذا ما هو عليه، لا يمكنني تغيير الماضي. ماذا سأفعل الآن؟"، فتلك الكلمات توقف نزيف التوتر فوراً.
- **تأمل المراقبة الصامتة:** في اجتماع مشحون بالأصوات، اغمض عينيك لثانية، ركز على نبض قلبك الشهم، وانظر للتفكير كمسار عابر لا يملك سيادتك أو استقلالك الإنساني المميز.`,
            contentEn: `Practical steps to integrate conscious surrender today:
            
- **The Reality-Acceptor Check:** When facing an unexpected strategic hurdle, repeat internally: "This is what is. I decline to waste potential fighting the past. What is my logical action Now?"
- **The Quiet Observer:** During loud discussions, keep your posture relaxed. Observe the surrounding words as passing waves. Keep your system anchored to inward stillness.`
          }
        ],
        quiz: [
          {
            questionAr: "ما هو الجوهر العملي الحركي لمفهوم 'التسليم الواعي' لدى إيكهارت تول؟",
            questionEn: "What is the functional definition of Conscious Surrender in Tolle’s work?",
            optionsAr: [
              "التقاعس عن العمل والاستسلام التام للفقر مع قبول هزيمتك الإدارية والمهنية دون مبادرة.",
              "القبول اللامشروط والذكي للواقع الحالي كما هو بلا مقاومة تدميرية عشوائية، مما يوفر كامل تركيزك وصفاء عقلك لتتصرف بفاعلية وقوة لحل الأمر.",
              "الانسحاب من الأسواق العالمية والتوقف عن قراءة الموازنات والدفاتر المالية بالكلية."
            ],
            optionsEn: [
              "Passive inaction and giving up on career goals, accepting failure without any initiative.",
              "Unconditional, intelligent acceptance of the present moment as it is, which preserves your focus and clarity to act effectively and solve the issue.",
              "Withdrawing completely from global markets and refusing to read financial balance sheets."
            ],
            correctIndex: 1,
            explanationAr: "التسليم الواعي يمنحك السيادة والوضوح العقلي المطلق لتتصرف دون تشتيت، بينما الممانعة العقيمة تبدد طاقتك النفسية وتهدر فرص النجاح.",
            explanationEn: "Conscious surrender arms you with unshakeable calm to act with clarity, whereas emotional resistance drains your energy."
          }
        ]
      },
      {
        id: 'pn_ch5',
        chapterNum: 5,
        titleAr: 'الفصل الخامس: بوابات الجسد الداخلي والسكينة الكبرى (صيانة الحضور الدائم)',
        titleEn: 'Chapter 5: The Portal of the Inner Body & Unshakeable Stillness',
        descriptionAr: 'الاتصال الدائم بالطاقة الحيوية للجسد الداخلي، ترسيخ الحضور بساحة العمل، وتطهير النفس من ضغوط المستقبل الوهمي.',
        descriptionEn: 'Sustaining connection with the life force of your inner body, anchoring high presence at work, and cultivating deep serenity.',
        lessons: [
          {
            id: 'pn_ch5_l1',
            idNum: 1,
            titleAr: '1. لغز الجسد الداخلي الحي: بوابتك الدائمة نحو الكينونة الكبرى',
            titleEn: '1. Accessing the Inner Body: Your Anchor of Complete Presence',
            duration: '4m',
            type: 'intro',
            contentAr: `الجسد المادي الذي تراه في المرآة هو مجرد طلاء وقشرة خارجية؛ أما تحتها فيقع **الجسد الداخلي غير المرئي (Inner Body)**، وهو بوابة حية تتصل مباشرة بمحيط الكينونة الواسع الهادئ.

**فائدة الاتصال بالجسد الداخلي:**
عندما تشعر بالطاقة الكامنة بداخل أطرافك وجسدك أثناء حركتك اليومية، يهدأ عقلك تلقائياً ويتوقف تيار الأفكار الهائم المتوتر. تكتسب درع أمان نفسي متين يبقيك آمناً وصامداً أمام كل المنغصات والضغوط المهنية المعاصرة.

**الحضور المكثف هو السحر:**
هو ما يميز الأكاديمي الحقيقي والقائد الموثوق الذي يتألق فكره ويحوز هيبة الصدارة واليقين لمسيرة مملكته بسلام.`,
            contentEn: `The physical shell you observe in the mirror is merely an outer layer. Beneath lies the invisible **Inner Body**—a vibrant canvas of raw life force connecting you directly to Stillness.

**The functional impact:**
By tuning into the subtle energy inside your body as you move through your routine, your circular thoughts naturally subside. You build a psychological shield that protects your focus against external stresses.

**Intense Presence at work:**
This presence distinguishes authentic leaders. It infuses their decision-making with composure and unshakeable clarity.`
          },
          {
            id: 'pn_ch5_l2',
            idNum: 2,
            titleAr: '2. غمر الجسد بالوعي المطلق: كيف تفصل دماغك وصحتك عن الضغط والتوتر؟',
            titleEn: '2. Flooding the System with Pure Awareness: Anchoring Stillness',
            duration: '3m',
            type: 'core',
            contentAr: `يقسم تول وبكار كيف أن غمر أوجاع وتفاصيل الجسد بالوعي والسكينة هو العلاج الأول المتين لمجابهة نبرات الفشل المؤقت والتوتر:
            
- **تمرين الحضور الخامل:** قبل النوم أو في بداية يومك، وجه كامل وعيك وتفكيرك للشعور بحيوية يديك وقدميك وصدرك من الداخل؛ اشعر بتيار الحياة يسير بانتظام وبراعة باذخة.
- **تطهير الروح الدائم:** هذا الاتصال الصادق يجدد طاقة خلاياك الذهنية ومناعتك الجسدية، ويرشد دوافغك ويمنحك وقار الحكماء الحقيقيين لتدير فكرك وأعمالك وأصولك بامتياز.

الدرع الواقي للأصول والوفرة المعرفية يبنى في كنف هذا الحضور والوعي.`,
            contentEn: `Tolle clarifies that flooding your physical container with pure awareness is a vital defense against anxiety and strain:

- **The Awareness Scan:** Before sleep or as you start your work, direct your focus to the energy in your hands, feet, and core. Feel the current of life directly.
- **The Cellular Recharge:** This connection recharges your cognitive battery, sharpens your resilience, and equips you with quiet authority to direct your professional goals and assets.

Your psychological shield and focus are built upon this profound foundation.`
          },
          {
            id: 'pn_ch5_l3',
            idNum: 3,
            titleAr: '3. ممارسات واسترجاع الحضور الصامد: تطبيقات عملية للاتصال السري التام',
            titleEn: '3. Standard Tips: Sustaining Your Inner Connection Today',
            duration: '3m',
            type: 'tips',
            contentAr: `إليك هذه التطبيقات لتثبت في أعماق حضورك اليوم:
            
- **الأنفاس الثلاثة الواعية:** خذ ثلاثة أنفاس عميقة واعية مركزة بالكامل على هويتك وحركة بطنك وصدرك بانتظام كل ساعة، لتمنع تشتيت الانتباه وعقد الأوراق الخائبة الجانبية.
- **حبس الوعي بالجسم:** مارس أعمالك وكتاباتك اليومية مع الاحتفاظ بنسبة ١٠٪ من وعيك العميق متصلاً بالإحساس بحيوية وتدفق الكينونة بداخل جسمك وصدرك لتنعم بصفاء العارفين الكوني الصالح المبرهن.`,
            contentEn: `Practical daily rituals to secure your presence:
            
- **The Three-Breath Check:** Take three conscious, deep breaths every hour—focus strictly on the expansion and contraction of your core. This suppresses cognitive drift and clears peripheral noise.
- **The 10% Anchor Rule:** Execute your daily typing and coding assignments while keeping 10% of your energy anchored inside your physical form. This simple tether keeps you perfectly centered and alert.`
          }
        ],
        quiz: [
          {
            questionAr: "كيف يفيدنا تمرين الاتصال بالجسد الداخلي وسكينة الروح في تسييس ضغوط الوظيفة اليومية؟",
            questionEn: "How does connecting with the Inner Body support us in navigating workplace challenges?",
            optionsAr: [
              "يؤدي لتخدير الفرد وتعطيله عن أداء أعماله والهروب من دفع نفقات البنوك.",
              "يهدئ العصف الذهني المتوتر عشوائياً، يوفر درع أمان قوي جداً يطرد تشتيت الانتباه ويمنحك هدوءاً وثباتاً ممتازاً لاتخاذ أصوب القرارات بذكاء.",
              "يجعلك تعادي زملاءك الأكاديميين للحصول على تلميع تفاخري زائف لمظاهرك بالعمل."
            ],
            optionsEn: [
              "It drugs your drive, causing you to evade daily responsibilities and skip essential financial payments.",
              "It quietens hyper-reactive thoughts, creating a psychological shield that filters out distraction and secures composure for perfect decision-making.",
              "It prompts you to challenge academic peers to gather superficial praise or climb false social tiers at work."
            ],
            correctIndex: 1,
            explanationAr: "الاتصال بالجسد الحي الداخلي يربطك بمصدر الكينونة الساكنة التي تذوب تحتها كل هموم الشهرة والركض والتوهمات التافهة المعاصرة.",
            explanationEn: "Inner-body awareness anchors you to the stillness of Being, neutralizing status anxieties and chronic future-oriented worries."
          }
        ]
      }
    ]
  }
];

export const ProfessionalDevelopment = ({ lang, onBack, userProfile }: ProfessionalDevelopmentProps) => {
  const isRtl = lang === 'ar';
  
  // State variables for overall course browser and interactive reading canvas
  const [selectedBook, setSelectedBook] = useState<BookCourse | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [activeLesson, setActiveLesson] = useState<MicroLesson | null>(null);
  const [lessonIndex, setLessonIndex] = useState<number>(0);
  
  // Quiz evaluation state
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Firestore status tracking
  const [userResults, setUserResults] = useState<any[]>([]);
  const [unlockedChapters, setUnlockedChapters] = useState<Set<string>>(new Set(['sa_ch1', '7h_ch1', 'yc_ch1', 'rd_ch1', 'pn_ch1']));
  
  // PDF Text Converter states
  const [activeTab, setActiveTab] = useState<'browse' | 'converter'>('browse');
  const [rawText, setRawText] = useState<string>('');
  const [convertedCourse, setConvertedCourse] = useState<BookCourse | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [conversionStep, setConversionStep] = useState<string>('');

  // Reader & Scannability customization
  const [fontSize, setFontSize] = useState<'normal' | 'medium' | 'large' | 'xl'>('normal');
  const [scannableMode, setScannableMode] = useState<boolean>(true);
  const [studyViewMode, setStudyViewMode] = useState<'lesson' | 'mindmap'>('lesson');
  const [activeSeconds, setActiveSeconds] = useState<number>(0);

  // Certificate completion & customization states
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [certificateName, setCertificateName] = useState<string>('');
  const [certificateData, setCertificateData] = useState<{
    courseTitle: string;
    chapterTitle: string;
    score: number;
    total: number;
    dateStr: string;
    serial: string;
  } | null>(null);

  // Initialize certificate name from userProfile
  useEffect(() => {
    if (userProfile?.fullName) {
      setCertificateName(userProfile.fullName);
    } else if (userProfile?.displayName) {
      setCertificateName(userProfile.displayName);
    } else {
      setCertificateName(isRtl ? 'أحمد بن عبد الله الشمري' : 'Alex Johnson');
    }
  }, [userProfile, isRtl]);

  // Active learning chronometer
  useEffect(() => {
    let interval: any = null;
    if (activeLesson && !showQuiz) {
      setActiveSeconds(0);
      interval = setInterval(() => {
        setActiveSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setActiveSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeLesson?.id, showQuiz]);

  const formatSeconds = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const parseBoldText = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="text-[#b48e56] font-black">{part}</strong>;
      }
      return part;
    });
  };

  const renderScannableContent = (content: string) => {
    const lines = content.split('\n\n');
    return (
      <div className="space-y-4">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          // Check for bold points or chapter highlights
          if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
            const listContent = trimmed.replace(/^[\s-*]+/, '');
            return (
              <div key={idx} className="flex gap-2 items-start py-2 px-4 bg-[#b48e56]/5 border-l-2 border-[#b48e56] rounded-r-lg my-2">
                <span className="text-[#b48e56] font-extrabold mt-1">•</span>
                <span className="font-serif leading-relaxed text-[#1a1a1a]">
                  {parseBoldText(listContent)}
                </span>
              </div>
            );
          }

          if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
            const inner = trimmed.substring(2, trimmed.length - 2);
            return (
              <h4 key={idx} className="text-base md:text-lg font-extrabold text-[#b48e56] mt-4 mb-2 tracking-tight">
                {inner}
              </h4>
            );
          }

          // Speed reading mode: bold beginning words for rapid scanning (Foveal/Bionic Scanning)
          if (scannableMode) {
            const words = trimmed.split(' ');
            if (words.length > 4) {
              const boldCount = Math.min(Math.ceil(words.length * 0.35), 5);
              const boldPart = words.slice(0, boldCount).join(' ');
              const regularPart = words.slice(boldCount).join(' ');
              return (
                <p key={idx} className="leading-relaxed font-serif text-[#1e2229]">
                  <strong className="text-slate-900 font-extrabold font-sans inline">{boldPart} </strong>
                  <span className="opacity-90">{regularPart}</span>
                </p>
              );
            }
          }

          return (
            <p key={idx} className="leading-relaxed font-serif text-[#1e2229]">
              {parseBoldText(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  const renderTreeViewInfographic = () => {
    if (!activeChapter) return null;

    return (
      <div className="bg-white border border-[#e8e5df] p-6 md:p-10 rounded-3xl shadow-sm relative overflow-hidden text-right">
        {/* Decorative ambient background shape */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#b48e56]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />

        <div className="text-center mb-10 border-b border-[#f2ece2] pb-6">
          <span className="text-[10px] tracking-widest text-[#b48e56] uppercase font-bold py-1 px-3.5 bg-[#f5f1e8] rounded-full inline-block">
            {isRtl ? 'الهيكل التشجيري البصري' : 'Visual Mapping Hierarchy'}
          </span>
          <h3 className="text-2xl font-extrabold text-[#111] mt-2 mb-1">
            {isRtl ? 'مخطط التدرج الفطن وإعادة التركيب' : 'Deconstructed Content Roadmap'}
          </h3>
          <p className="text-slate-400 text-xs font-serif mt-1">
            {isRtl 
              ? 'اضغط على أي درس للتفاعل معه فوراً، ومتابعة عداد الوقت والكبسولة المعرفية.' 
              : 'Interact directly with any node to study its content, view parameters, or review details.'}
          </p>
        </div>

        {/* Tree Connection Path */}
        <div className="relative pr-4 md:pr-10 border-r-2 border-dashed border-[#b48e56]/30 mr-4 md:mr-12 space-y-8 py-4 text-right">
          
          {activeChapter.lessons.map((lesson, idx) => {
            const isActive = activeLesson?.id === lesson.id && !showQuiz;
            const iconStyle = isActive 
              ? 'bg-[#b48e56] text-white ring-4 ring-[#b48e56]/20' 
              : 'bg-[#faf8f5] text-[#b48e56] border-2 border-[#b48e56]/30 hover:border-[#b48e56]';
            
            const cleanContent = isRtl ? lesson.contentAr : lesson.contentEn;
            let capsuleText = "";
            if (isRtl) {
              if (cleanContent.includes('**ماذا ستستفيد من هذا الدرس**')) {
                capsuleText = cleanContent.split('**ماذا ستستفيد من هذا الدرس**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('**كيف تتغلب على هذا الوهم؟**')) {
                capsuleText = cleanContent.split('**كيف تتغلب على هذا الوهم؟**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('**كيف تلغي هذه الحلقة؟**')) {
                capsuleText = cleanContent.split('**كيف تلغي هذه الحلقة؟**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('**ماذا يعني ذلك لك؟**')) {
                capsuleText = cleanContent.split('**ماذا يعني ذلك لك**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('1. **')) {
                capsuleText = cleanContent.split('\n').filter(l => l.includes('**')).slice(1, 3).join(' ');
              }
              if (!capsuleText && cleanContent.split('\n')[2]) {
                capsuleText = cleanContent.split('\n')[2];
              }
            } else {
              if (cleanContent.includes('**What is your takeaway?**')) {
                capsuleText = cleanContent.split('**What is your takeaway?**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('**What does this mean for you?**')) {
                capsuleText = cleanContent.split('**What does this mean for you?**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('**How do you disarm this loop?**')) {
                capsuleText = cleanContent.split('**How do you disarm this loop?**')[1]?.split('\n')[2] || "";
              }
              if (!capsuleText && cleanContent.split('\n')[2]) {
                capsuleText = cleanContent.split('\n')[2];
              }
            }

            if (capsuleText.length > 220) {
              capsuleText = capsuleText.substring(0, 220) + "...";
            }
            if (!capsuleText) {
              capsuleText = isRtl ? 'تمتع بالمرونة والقراءة الذاتية الموجهة لهذا الجزء المنهجي.' : 'Self-guided developmental milestone for active consolidation.';
            }

            return (
              <div key={lesson.id} className="relative group text-right">
                {/* Connector Branch Node Circle */}
                <div className={`absolute -right-[27px] md:-right-[51px] top-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${iconStyle} shadow-sm z-10`}>
                  <span className="text-xs font-black">{idx + 1}</span>
                </div>

                {/* Lesson Info Bento Card */}
                <div 
                  onClick={() => {
                    setActiveLesson(lesson);
                    setLessonIndex(idx);
                    setShowQuiz(false);
                    setStudyViewMode('lesson');
                  }}
                  className={`bg-white border rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-md cursor-pointer text-right flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isActive ? 'border-[#b48e56] bg-[#b48e56]/[0.02] shadow-sm' : 'border-[#e8e5df] hover:border-slate-300'}`}
                >
                  <div className="flex-1 space-y-2 text-right">
                    <div className="flex items-center gap-2 flex-wrap justify-start">
                      <span className="text-[10px] tracking-wider text-[#b48e56] uppercase font-bold py-0.5 px-2.5 bg-[#f5f1e8] rounded-full inline-block leading-none">
                        {lesson.type === 'intro' ? (isRtl ? 'تمهيد' : 'Orientation') : 
                         lesson.type === 'review' ? (isRtl ? 'مراجعة' : 'Review Node') : 
                         lesson.type === 'tips' ? (isRtl ? 'دليل إرشادي' : 'Tips Node') : (isRtl ? 'جوهر المفهوم' : 'Core Concept')}
                      </span>
                      
                      <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                        <Clock size={12} />
                        <span>{isRtl ? `تستغرق ${lesson.duration}` : `${lesson.duration} Read`}</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-800 text-base md:text-lg transition-colors group-hover:text-[#b48e56]">
                      {isRtl ? lesson.titleAr : lesson.titleEn}
                    </h4>

                    {/* Capsule Box (الكبسولة المعرفية للتثبيت) */}
                    <div className="bg-[#faf9f6] border border-slate-100 rounded-xl p-3 text-slate-600 text-xs font-serif leading-relaxed italic border-r-4 border-r-[#b48e56] my-2 text-right">
                      <span className="font-bold font-sans text-[#b48e56] block not-italic mb-1 text-right">
                        {isRtl ? 'الكبسولة التثبيتية 💡' : 'Core Nugget 💡'}
                      </span>
                      {capsuleText}
                    </div>
                  </div>

                  <div className="text-xs font-black text-[#b48e56] flex items-center gap-1 shrink-0 self-end md:self-center">
                    <span>{isRtl ? 'افتح لقراءة مطولة' : 'Read Full Node'}</span>
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Gatekeeper Node on Tree */}
          <div className="relative group text-right">
            <div className="absolute -right-[27px] md:-right-[51px] top-6 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-sm z-10 ring-4 ring-amber-500/20">
              <Trophy size={16} />
            </div>

            <div 
              onClick={() => {
                setShowQuiz(true);
                setCurrentQuizIndex(0);
                setSelectedOptionIndex(null);
                setIsAnswered(false);
                setQuizScore(0);
                setQuizFinished(false);
              }}
              className="bg-amber-500/5 border border-amber-200 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-md cursor-pointer text-right flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-400"
            >
              <div className="flex-1 space-y-1 text-right">
                <span className="text-[10px] tracking-wider text-amber-600 uppercase font-black py-0.5 px-2.5 bg-amber-500/10 rounded-full inline-block leading-none">
                  {isRtl ? 'تقييم الجودة والتأهيل' : 'Gatekeeper Exam'}
                </span>
                <h4 className="font-bold text-slate-800 text-base md:text-lg">
                  {isRtl ? 'بوابة التحقق ونظام عبور الفصل' : 'Consolidated Chapter Gate Quiz'}
                </h4>
                <p className="text-slate-400 text-xs font-serif">
                  {isRtl 
                    ? 'اختبار حاسم مكون من أسئلة متدرجة لتقييم استيعابك للمفاهيم واكتساب الـ XP.' 
                    : 'Pass with score >= 70% to unlock subsequent units and lock in your score rewards.'}
                </p>
              </div>

              <div className="text-xs font-black text-amber-600 flex items-center gap-1 shrink-0 self-end md:self-center">
                <span>{isRtl ? 'باشر الاختبار الصارم' : 'Launch Examination'}</span>
                <ArrowRight size={14} className="rtl:rotate-180" />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const triggerCertificate = (courseTitle: string, chapterTitle: string, score: number, total: number) => {
    // Generate a unique serial format
    const hash = Math.floor(100000 + Math.random() * 900000);
    const dateNow = new Date();
    const dateFormatted = dateNow.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    setCertificateData({
      courseTitle,
      chapterTitle,
      score,
      total,
      dateStr: dateFormatted,
      serial: `BKDA-PD-${score >= total ? 'AMB' : 'ALN'}-${hash}`
    });
    setShowCertificate(true);
    
    // Confetti burst for celebrating academic excellence!
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const getBookOverallScores = (book: any) => {
    let score = 0;
    let total = 0;
    book.chapters.forEach((ch: any) => {
      const r = userResults.find((res: any) => res.lessonId === ch.id);
      if (r) {
        score += r.score || 0;
        total += r.total || 0;
      }
    });
    if (total === 0) total = book.chapters.length * 3; // safe fallback
    return { score, total };
  };

  const renderCertificateModal = () => {
    if (!showCertificate || !certificateData) return null;

    const percentage = Math.round((certificateData.score / certificateData.total) * 100);
    let gradeStr = isRtl ? 'ممتاز مرتفع' : 'Excellent with Distinction (Grade A)';
    if (percentage < 80) {
      gradeStr = isRtl ? 'جيد جداً مرتفع' : 'Very Good (Grade B+)';
    } else if (percentage < 90) {
      gradeStr = isRtl ? 'ممتاز' : 'Excellent (Grade A)';
    }

    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 font-sans print:p-0 print:absolute print:inset-0 print:bg-white print:z-50 leading-relaxed text-[#1e2229]">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl w-full max-w-4xl p-6 md:p-8 flex flex-col md:flex-row gap-6 relative shadow-2xl print:shadow-none print:p-0 print:w-full print:max-w-none print:rounded-none text-right"
          >
            {/* Left side parameters customizer panel */}
            <div className="w-full md:w-80 border-b md:border-b-0 md:border-l border-[#e8e5df] pb-6 md:pb-0 md:pl-6 space-y-5 print:hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-[#b48e56]/10 flex items-center justify-center text-[#b48e56]">
                    <Award size={18} />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg">
                    {isRtl ? 'محرر الشهادة الفخمة' : 'Certificate Customizer'}
                  </h3>
                </div>
                <p className="text-slate-500 text-xs font-serif leading-relaxed text-right">
                  {isRtl 
                    ? 'هنا يمكنك صياغة وتعديل المعايير والاسم الثنائي أو الثلاثي الذي سيظهر بالشهادة المعتمدة لطباعتها أو حفظها.'
                    : 'Personalize the certificate details, trainee name, and credentials prior to printing or saving.'}
                </p>

                {/* Input Trainee Name */}
                <div className="mt-5 space-y-1.5 text-right">
                  <label className="text-xs font-black text-slate-500 block">
                    {isRtl ? 'اسم المتدرب بالشهادة:' : 'Trainee Full Name:'}
                  </label>
                  <input 
                    type="text" 
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-[#b48e56] text-right"
                    placeholder={isRtl ? 'اسمك الثنائي أو الثلاثي الفاخر' : 'Your Professional Name'}
                  />
                  <p className="text-[10px] text-slate-400 font-serif">
                    {isRtl ? '* يتم تحديث محتوى الشهادة فورياً أثناء الكتابة.' : '* Live preview updates immediately on input change.'}
                  </p>
                </div>

                {/* Certificate Details list */}
                <div className="mt-6 border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-600 font-serif text-right">
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'الدورة المعتمدة:' : 'Approved Course:'}</span>
                    <span className="text-[#002147] font-sans font-black">{certificateData.courseTitle}</span>
                  </div>
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'المستوى ومعيار التقييم:' : 'Level & Standard:'}</span>
                    <span className="text-slate-800 font-semibold">{certificateData.chapterTitle}</span>
                  </div>
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'الدرجة المحصلة:' : 'Grade Score:'}</span>
                    <span className="text-emerald-600 font-sans font-black">{certificateData.score} / {certificateData.total} ({percentage}%)</span>
                  </div>
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'تاريخ الإصدار:' : 'Issue Date:'}</span>
                    <span className="text-slate-500 font-sans">{certificateData.dateStr}</span>
                  </div>
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'رقم التحقق:' : 'Serial Key:'}</span>
                    <span className="font-mono text-[10px] text-zinc-500 font-bold bg-zinc-100 py-0.5 px-1.5 rounded">{certificateData.serial}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-6">
                <button 
                  onClick={() => window.print()}
                  className="w-full py-3 px-4 bg-[#b48e56] hover:bg-[#a17e4b] text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <FileText size={15} />
                  <span>{isRtl ? 'طباعة وحفظ كـ PDF 🖨️' : 'Print / Save as PDF'}</span>
                </button>
                <button 
                  onClick={() => setShowCertificate(false)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black block text-center transition-all cursor-pointer"
                >
                  {isRtl ? 'عودة للمساق' : 'Close Certificate'}
                </button>
              </div>
            </div>

            {/* Right side Elegant printable certificate layout */}
            <div className="flex-1 bg-[#fdfbf7] border-4 border-double border-[#b48e56]/65 p-6 md:p-10 rounded-2xl relative overflow-hidden select-none flex flex-col justify-between aspect-[1.414/1] text-center shadow-inner print:border-none print:bg-white print:p-8 print:w-full">
              {/* Decorative classical background border corners */}
              <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-[#b48e56]/55 rounded-tr-md print:hidden" />
              <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-[#b48e56]/55 rounded-tl-md print:hidden" />
              <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-[#b48e56]/55 rounded-br-md print:hidden" />
              <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-[#b48e56]/55 rounded-tl-md print:hidden" />

              {/* Decorative Subtle Background Crest */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#b48e56]/[0.015] rounded-full flex items-center justify-center border border-dashed border-[#b48e56]/5 select-none pointer-events-none" />

              {/* Certificate Header Branding - Beautiful Blue Banner */}
              <div className="bg-[#002147] text-white -mx-6 md:-mx-10 -mt-6 md:-mt-10 px-6 md:px-10 py-5 mb-5 select-none relative z-10 flex justify-between items-center flex-row-reverse border-b-4 border-[#b48e56] rounded-t-xl">
                <div className="text-right">
                  <span className="font-extrabold text-white text-sm md:text-base leading-none block font-sans">
                    {isRtl ? 'أكاديمية باسم آل خليل الرقمية' : 'Basim Al Khalil Digital Academy'}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-amber-400 font-semibold mt-1 block">
                    {isRtl ? 'الهيئة العالمية للجودة وتدقيق معايير النخبة المهنية' : 'International Board of Quality & Professional Elite Standards'}
                  </span>
                </div>

                {/* Academy logo container */}
                <div className="w-12 h-12 rounded-full border-2 border-amber-400 flex items-center justify-center bg-white/10 shrink-0">
                  <GraduationCap className="text-amber-400" size={24} />
                </div>
              </div>

              {/* Main certificate wording */}
              <div className="my-auto space-y-4 md:space-y-6 relative z-10">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-[#002147] uppercase py-1 px-3.5 bg-blue-50 rounded-full inline-block mb-1 border border-[#002147]/15 font-sans">
                    {isRtl ? 'شهادة إكمال واعتماد المسار المهني الرقمي' : 'Certified Digital Professional Path Achievement'}
                  </span>
                  <h2 className="text-2xl md:text-3.5xl font-black text-[#002147] tracking-tight leading-snug font-sans">
                    {isRtl ? 'شهادة إتمام ومطابقة معايير جودة المعرفة' : 'Certificate of Completion & Intellectual Mastery'}
                  </h2>
                </div>

                <p className="text-xs md:text-sm text-slate-500 font-serif leading-relaxed max-w-xl mx-auto">
                  {isRtl 
                    ? 'تشهد الأكاديمية ومجلس جودة التدريب والبحث المعرفي المستمر بفخر واعتزاز بأن المتدرب/المتدربة:'
                    : 'This is to officially verify and certify that the distinguished scholar:'}
                </p>

                {/* Trainee Name dynamic input block */}
                <div className="py-2 mb-2">
                  <h1 className="text-2xl md:text-4xl font-extrabold text-[#111] bg-gradient-to-r from-slate-900 via-[#002147] to-[#002147] bg-clip-text text-transparent px-4 font-sans tracking-tight">
                    {certificateName || (isRtl ? 'اسم المتدرب المتميز' : 'Distinguished Trainee Name')}
                  </h1>
                  <div className="w-40 md:w-60 h-[1.5px] bg-[#002147]/40 mx-auto mt-2 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#002147] rotate-45" />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-500 font-serif leading-relaxed max-w-2xl mx-auto">
                  {isRtl ? (
                    <>
                      قد اجتاز بنجاح واكتملت له كافة المتطلبات المعرفية المحددة لـ:
                      <br />
                      <strong className="text-[#002147] text-base md:text-lg font-black px-2 inline-block my-1 font-sans">
                        إتمام دورة «{certificateData.courseTitle}»
                      </strong>
                      <br />
                      بتقدير عام <span className="font-extrabold text-emerald-600">{gradeStr}</span> ونسبة كفاءة بلغت {percentage}%.
                    </>
                  ) : (
                    <>
                      has successfully completed all micro-learning checkpoints and passed the rigorous assessment for:
                      <br />
                      <strong className="text-[#002147] text-base md:text-lg font-black px-2 inline-block my-1 font-sans">
                        Completion of the course: "{certificateData.courseTitle}"
                      </strong>
                      <br />
                      attaining a final grade of <span className="font-extrabold text-emerald-600">{gradeStr}</span> and representing full intellectual mastery.
                    </>
                  )}
                </p>
              </div>

              {/* Certificate Footer Stamp & Signatures */}
              <div className="border-t border-[#f3eee5] pt-4 mt-6 flex justify-between items-end text-right flex-row-reverse">
                {/* Signatures 1 */}
                <div className="text-right space-y-1 z-10">
                  <span className="text-[10px] text-slate-400 block font-serif font-semibold">{isRtl ? 'رئيس الأكاديمية والعميد:' : 'Academy President & Dean:'}</span>
                  <p className="font-serif italic text-slate-800 font-bold text-xs">{isRtl ? 'د. باسم آل خليل' : 'Dr. Basim Al Khalil'}</p>
                  <div className="w-24 h-5 border-b border-dashed border-slate-300 relative inline-block">
                    <span className="font-mono text-[9px] text-slate-300 absolute left-4 bottom-0 select-none">Basim@KhalilAcademy</span>
                  </div>
                </div>

                {/* Blue & Gold Seal stamp inside certificate */}
                <div className="flex flex-col items-center justify-center relative shrink-0 z-20">
                  <div className="absolute w-14 h-14 bg-blue-500/10 rounded-full opacity-10 filter blur-sm print:hidden" />
                  <div className="w-16 h-16 rounded-full border-4 border-double border-[#002147] bg-[#fcf9f2] flex flex-col items-center justify-center p-1.5 shadow-sm relative">
                    <div className="text-[7px] font-black uppercase text-[#002147] font-sans tracking-wide scale-95 select-none text-center leading-none">
                      {isRtl ? 'معتمد رقمياً' : 'BKDA VAL'}
                      <span className="block text-emerald-600 font-bold text-[6px] mt-0.5">{percentage}% OK</span>
                    </div>
                    <Trophy className="text-[#b48e56] mt-0.5" size={14} />
                  </div>
                  <span className="text-[8px] font-black text-[#002147] tracking-widest mt-1 uppercase font-mono block select-none">
                    {isRtl ? 'ختم الأكاديمية' : 'Academy Seal'}
                  </span>
                </div>

                {/* Academic credentials and metadata signatures */}
                <div className="text-right space-y-1 z-10">
                  <span className="text-[10px] text-slate-400 block font-serif font-semibold">{isRtl ? 'رئيس هيئة الاعتماد الفني:' : 'Chairman of Accreditation:'}</span>
                  <p className="font-serif italic text-slate-800 font-bold text-xs">{isRtl ? 'أ.د. عبد الهادي الصايغ' : 'Prof. Abdul-Hadi Al-Saigh'}</p>
                  <div className="w-24 h-5 border-b border-dashed border-slate-300 relative inline-block">
                    <span className="font-mono text-[9px] text-slate-300 absolute right-4 bottom-0 select-none font-sans">BKDA-APPROVED</span>
                  </div>
                </div>
              </div>

              {/* Serial Number & Security Bottomline */}
              <div className="pt-2 flex justify-between items-center text-[8px] font-mono font-bold text-slate-400 border-t border-slate-100 flex-row-reverse select-none">
                <span>ID: {certificateData.serial}</span>
                <span>{isRtl ? 'بوابة التحقق الفطنة ومكافحة التزوير الأكاديمي' : 'BKDA Cognitive Integrity Control Protocol'}</span>
                <span>{certificateData.dateStr}</span>
              </div>
            </div>

          </motion.div>
        </div>
      </AnimatePresence>
    );
  };

  // Local storage cache or fetch profile completed marks from database
  useEffect(() => {
    if (userProfile?.uid) {
      const fetchResults = async () => {
        try {
          const q = query(
            collection(db, 'lessonResults'),
            where('userId', '==', userProfile.uid)
          );
          const snap = await getDocs(q);
          const results: any[] = [];
          const unlocked = new Set<string>(['sa_ch1', '7h_ch1', 'yc_ch1', 'rd_ch1', 'pn_ch1']);
          snap.forEach(doc => {
            const data = doc.data();
            results.push(data);
            if (data.lessonId) {
              unlocked.add(data.lessonId);
              // Unlock subsequent chapters if previous is completed
              // Subtle Art
              if (data.lessonId === 'sa_ch1' && data.score >= 2) {
                unlocked.add('sa_ch2');
              }
              if (data.lessonId === 'sa_ch2' && data.score >= 2) {
                unlocked.add('sa_ch3');
              }
              if (data.lessonId === 'sa_ch3' && data.score >= 2) {
                unlocked.add('sa_ch4');
              }
              if (data.lessonId === 'sa_ch4' && data.score >= 2) {
                unlocked.add('sa_ch5');
              }
              // 7 Habits
              if (data.lessonId === '7h_ch1' && data.score >= 2) {
                unlocked.add('7h_ch2');
              }
              if (data.lessonId === '7h_ch2' && data.score >= 2) {
                unlocked.add('7h_ch3');
              }
              if (data.lessonId === '7h_ch3' && data.score >= 2) {
                unlocked.add('7h_ch4');
              }
              if (data.lessonId === '7h_ch4' && data.score >= 2) {
                unlocked.add('7h_ch5');
              }
              // You Can
              if (data.lessonId === 'yc_ch1' && data.score >= 2) {
                unlocked.add('yc_ch2');
              }
              if (data.lessonId === 'yc_ch2' && data.score >= 2) {
                unlocked.add('yc_ch3');
              }
              if (data.lessonId === 'yc_ch3' && data.score >= 2) {
                unlocked.add('yc_ch4');
              }
              if (data.lessonId === 'yc_ch4' && data.score >= 2) {
                unlocked.add('yc_ch5');
              }
              // Rich Dad
              if (data.lessonId === 'rd_ch1' && data.score >= 2) {
                unlocked.add('rd_ch2');
              }
              if (data.lessonId === 'rd_ch2' && data.score >= 2) {
                unlocked.add('rd_ch3');
              }
              if (data.lessonId === 'rd_ch3' && data.score >= 2) {
                unlocked.add('rd_ch4');
              }
              if (data.lessonId === 'rd_ch4' && data.score >= 2) {
                unlocked.add('rd_ch5');
              }
              // Power of Now
              if (data.lessonId === 'pn_ch1' && data.score >= 2) {
                unlocked.add('pn_ch2');
              }
              if (data.lessonId === 'pn_ch2' && data.score >= 2) {
                unlocked.add('pn_ch3');
              }
              if (data.lessonId === 'pn_ch3' && data.score >= 2) {
                unlocked.add('pn_ch4');
              }
              if (data.lessonId === 'pn_ch4' && data.score >= 2) {
                unlocked.add('pn_ch5');
              }
            }
          });
          setUserResults(results);
          setUnlockedChapters(unlocked);
        } catch (e) {
          console.error("Error fetching developmental progression:", e);
        }
      };
      fetchResults();
    }
  }, [userProfile, selectedBook, activeChapter]);

  const speakText = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isRtl ? 'ar-SA' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  const handleLessonNavigation = (index: number) => {
    if (!activeChapter) return;
    stopSpeaking();
    if (index >= 0 && index < activeChapter.lessons.length) {
      setLessonIndex(index);
      setActiveLesson(activeChapter.lessons[index]);
    } else if (index === activeChapter.lessons.length) {
      // Initiate Gatekeeping Quiz
      setShowQuiz(true);
      setCurrentQuizIndex(0);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
      setQuizScore(0);
      setQuizFinished(false);
    }
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (isAnswered || !activeChapter) return;
    setSelectedOptionIndex(optionIdx);
    setIsAnswered(true);
    const quizItem = activeChapter.quiz[currentQuizIndex];
    if (optionIdx === quizItem.correctIndex) {
      setQuizScore(prev => prev + 1);
      speakText(isRtl ? 'إجابة صحيحة، عمل رائع!' : 'Correct answer, fantastic job!');
    } else {
      speakText(isRtl ? 'إجابة خاطئة. تأمل التفسير المعرفي بالأسفل لتستدرك الفهم.' : 'Incorrect option. Review the logic breakdown below.');
    }
  };

  const handleNextQuiz = async () => {
    if (!activeChapter) return;
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    
    if (currentQuizIndex + 1 < activeChapter.quiz.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      // Quiz Finished!
      setQuizFinished(true);
      const totalQuestions = activeChapter.quiz.length;
      
      // Save result and award XP if user passed (scored at least 70%)
      const isPassed = quizScore >= Math.ceil(totalQuestions * 0.7);
      if (isPassed && userProfile?.uid) {
        try {
          // Add document to Firestore
          await addDoc(collection(db, 'lessonResults'), {
            userId: userProfile.uid,
            parentIds: userProfile.linkedParentIds || [],
            lessonId: activeChapter.id,
            courseId: 'professional-development',
            level: 'General',
            lessonTitle: isRtl ? activeChapter.titleAr : activeChapter.titleEn,
            score: quizScore,
            total: totalQuestions,
            timestamp: serverTimestamp()
          });

          // Instantly update userResults locally for direct reactive UI state
          setUserResults(prev => {
            const index = prev.findIndex(r => r.lessonId === activeChapter.id);
            if (index > -1) {
              const updated = [...prev];
              updated[index] = { ...updated[index], score: quizScore, total: totalQuestions };
              return updated;
            }
            return [...prev, {
              userId: userProfile.uid,
              lessonId: activeChapter.id,
              courseId: 'professional-development',
              lessonTitle: isRtl ? activeChapter.titleAr : activeChapter.titleEn,
              score: quizScore,
              total: totalQuestions
            }];
          });

          // Reward 150 Points/XP
          const extraPoints = 150;
          const userRef = doc(db, 'users', userProfile.uid);
          await updateDoc(userRef, {
            points: (userProfile.points || 0) + extraPoints
          });

          // Add to unlocked chapters set
          setUnlockedChapters(prev => {
            const updated = new Set(prev);
            updated.add(activeChapter.id);
            // Subtle Art
            if (activeChapter.id === 'sa_ch1') updated.add('sa_ch2');
            if (activeChapter.id === 'sa_ch2') updated.add('sa_ch3');
            if (activeChapter.id === 'sa_ch3') updated.add('sa_ch4');
            if (activeChapter.id === 'sa_ch4') updated.add('sa_ch5');
            // 7 Habits
            if (activeChapter.id === '7h_ch1') updated.add('7h_ch2');
            if (activeChapter.id === '7h_ch2') updated.add('7h_ch3');
            if (activeChapter.id === '7h_ch3') updated.add('7h_ch4');
            if (activeChapter.id === '7h_ch4') updated.add('7h_ch5');
            // You Can
            if (activeChapter.id === 'yc_ch1') updated.add('yc_ch2');
            if (activeChapter.id === 'yc_ch2') updated.add('yc_ch3');
            if (activeChapter.id === 'yc_ch3') updated.add('yc_ch4');
            if (activeChapter.id === 'yc_ch4') updated.add('yc_ch5');
            // Rich Dad
            if (activeChapter.id === 'rd_ch1') updated.add('rd_ch2');
            if (activeChapter.id === 'rd_ch2') updated.add('rd_ch3');
            if (activeChapter.id === 'rd_ch3') updated.add('rd_ch4');
            if (activeChapter.id === 'rd_ch4') updated.add('rd_ch5');
            // Power of Now
            if (activeChapter.id === 'pn_ch1') {
              updated.add('pn_ch2');
            }
            if (activeChapter.id === 'pn_ch2') updated.add('pn_ch3');
            if (activeChapter.id === 'pn_ch3') updated.add('pn_ch4');
            if (activeChapter.id === 'pn_ch4') updated.add('pn_ch5');
            return updated;
          });

          confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 }
          });
        } catch (e) {
          console.error("Error updating score in Firebase:", e);
        }
      }
    }
  };

  // Human Intelligent Parser for pasted book text / PDF content
  const runMicroDeconstruction = () => {
    if (!rawText.trim()) {
      alert(isRtl ? 'يرجى تقديم محتوى أو فصول لتطبيق التفكيك الهيكلي!' : 'Please feed raw text or book chapters to deconstruct!');
      return;
    }

    setIsConverting(true);
    setConversionStep(isRtl ? '1. تفكيك هيكلي فوري لمجمل الكتاب...' : '1. Core deconstruction in progress...');
    
    setTimeout(() => {
      setConversionStep(isRtl ? '2. أنسنة لغة الخطاب المباشر ومخاطبة العقل...' : '2. Conversational tone & humanization...');
      
      setTimeout(() => {
        setConversionStep(isRtl ? '3. دمج محطات التثبيت وبناء اختبار الفهم...' : '3. Injecting review node and gatekeeper validation...');
        
        setTimeout(() => {
          // Rule-based heuristic generation extracting concepts from user raw text
          const lines = rawText.split('\n').filter(l => l.trim().length > 10);
          const chunks = lines.slice(0, 4);
          const firstChunk = chunks[0] || 'Orientation details...';
          const secondChunk = chunks[1] || 'Core concepts details...';
          const thirdChunk = chunks[2] || 'Application details...';
          
          const fakeGenerated: BookCourse = {
            id: 'generated_course_' + Date.now(),
            titleAr: isRtl ? 'مسارك التدريبي المولد ذكياً' : 'Your Smartly Generated Course',
            titleEn: 'Your AI Generated Course',
            authorAr: isRtl ? 'الذكاء الهندسي المطور' : 'Development Engineering Engine',
            authorEn: 'Creative AI Copilot',
            coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
            descriptionAr: isRtl ? 'مسار تم إنتاجه تلقائياً من المستند الخاص بك لضمان الاستبصار السريع.' : 'Course instantly extracted and aligned with standard framework guidelines.',
            descriptionEn: 'Synthesized directly from your raw PDF data.',
            chapters: [
              {
                id: 'gen_ch1',
                chapterNum: 1,
                titleAr: isRtl ? 'الفصل الأول: البعد التطبيقي والمحاور المركزة' : 'Chapter 1: Deconstructed Principles',
                titleEn: 'Chapter 1: Core Extracted Principles',
                descriptionAr: isRtl ? 'تلخيص الأفكار المعرفية في جزيئات صغيرة سهلة الهضم.' : 'Extracted micro-concepts organized to save study time.',
                descriptionEn: 'Micro-concepts generated directly from your uploaded book file.',
                lessons: [
                  {
                    id: 'gen_ch1_l1',
                    idNum: 1,
                    titleAr: '1. التمهيد ومحور الأولوية الأبرز في النص',
                    titleEn: '1. Orientation: Highest Focus Priority',
                    duration: '3m',
                    type: 'intro',
                    contentAr: `مبادئ الإدراك السليم: 
لقد قمنا بتصفية المستند الخاص بنا واسترجاع النقاط الذهبية لتقديمها لك في لغة خطابية سهلة.

**مفهومنا الأساسي في هذا الفصل:**
\${firstChunk}

**أهمية هذا الدرس:** أسرع بوابة للتعلم هي تفكيك الفكرة الكلية إلى نقاط تنموية ممتعة، بدلاً من قراءة المذكرات الأكاديمية الطويلة والجافة.`,
                    contentEn: `Welcome to your customized micro-course. 
We extracted the ultimate golden nuggets from your source file to offer you direct, interactive knowledge fast.

**Core Thesis:**
\${firstChunk}

By dividing raw chapters into structured micro-concepts, we retain active mental clarity.`
                  },
                  {
                    id: 'gen_ch1_l2',
                    idNum: 2,
                    titleAr: '2. عمق المعرفة: التثبيت وصياغة الواقع الفعلي',
                    titleEn: '2. Actionable Core: The Deep Dive Application',
                    duration: '4m',
                    type: 'core',
                    contentAr: `يتناول هذا المقطع عمق السلسلة العملية المستخلصة من المستند:

\${secondChunk}

مما يبرز بوضوح أنه في شؤون الحياة والتعلم، يجب عليك ممارسة التطبيق الفعلي يومياً بدلاً من مجرد الحفظ النظري للأبجديات.`,
                    contentEn: `This segment targets the practical application of your custom uploaded material:

\${secondChunk}

It confirms that successful modern learners prioritize dynamic continuous action over static memorization.`
                  },
                  {
                    id: 'gen_ch1_l3',
                    idNum: 3,
                    titleAr: '3. محطة تثبيت ومراجعة سريعة لربط الأفكار الذكية',
                    titleEn: '3. Synthesis Node: Bringing It All Together',
                    duration: '3m',
                    type: 'review',
                    contentAr: `تهانينا على الوصول لمحطة التثبيت! دعنا نربط الفكر الشمولي لما تعلمناه:

1. **دائرة الفهم التفاعلي:** التركيز يتركز في النقاط الأقرب للتنفيذ والنشاط اليومي.
2. **أنسنة البيانات:** فهم المعايير وتطبيقها يضمن توفير ساعات من القراءة الهامشية.
3. **تطبيق الفكرة القادمة:**
\${thirdChunk}`,
                    contentEn: `Congratulations on reaching the Synthesis Node! Let us align the main takeaways:

1. **Strategic Action:** Real absorption is triggered when you relate abstract data to your regular routine.
2. **Human Translation:** Understanding context keeps your development fast.
3. **Primary focus going forward:**
\${thirdChunk}`
                  },
                  {
                    id: 'gen_ch1_l4',
                    idNum: 4,
                    titleAr: '4. دليل الإرشادات وتجهيز المفاهيم قبل اختبار العبور',
                    titleEn: '4. Standard tips node: Best Practices Before Verification',
                    duration: '2m',
                    type: 'tips',
                    contentAr: `إليك الدليل التطبيقي السريع استعداداً لبوابة اختبار العبور الفطن:

- **تدبر المحاور:** عرج بذهنك على العناصر السابقة التي حددناها بدقة.
- **التجربة الممتدة:** حاول صيانة هذه المفاهيم في نقاشاتك العادية مع زملائك اليوم.
- لنبدأ معاً **اختبار الفهم** لتوثيق تقدمك بنجاح!`,
                    contentEn: `Here are quick checklist components to review before jumping into standard verification:

- **Mental Mapping:** Take 30 seconds to visualize the synthesis points.
- **Micro Practice:** Explain this summary to a friend or co-worker today to reinforce it.
- Let usนั่ง the **Verification Quiz** to log your achievement.`
                  }
                ],
                quiz: [
                  {
                    questionAr: "ما هو الاستخلاص الأساسي لمحور الفائدة الذي ناقشناه في البداية؟",
                    questionEn: "What is the core focus area of the first deconstructed section?",
                    optionsAr: [
                      isRtl ? "أن دراسة جزيئات المعرفة الصغيرة تحقق تركيزاً فعالاً يغنيك عن المجلدات الجافة." : "That micro-learning pathways build active focus that saves time.",
                      isRtl ? "أنه يجب قراءة 1000 صفحة يومياً دون مراجعة أو اختبار فهم." : "That you must read 1000 pages continuous without verification.",
                      isRtl ? "أن التعلم يعتمد فقط على الحظ كلياً دون صياغة المبادئ." : "That learning relies strictly on random luck without rules."
                    ],
                    optionsEn: [
                      "That deconstructed micro-learning tracks yield immense retention compared to dry manuals.",
                      "That you should rush through thousands of pages without summarizing.",
                      "That progress comes from pure coincidence without rules."
                    ],
                    correctIndex: 0,
                    explanationAr: isRtl ? "تجزئة الفصل الطويل لنقاط تناقش فكرة واحدة يحفز خلايا الفهم العميقة." : "Aligning paragraphs into modular actions keeps cognitive loads balanced.",
                    explanationEn: "Filtering dense documents into simple action steps maintains memory efficiency."
                  },
                  {
                    questionAr: "كيف تضمن تخليد المعرفة واستبصارها في الواقع العملي؟",
                    questionEn: "How do you guarantee continuous integration of your knowledge?",
                    optionsAr: [
                      isRtl ? "عبر ممارستها وتطبيقها والربط الدائم للمفاهيم بالنشاط الفعلي." : "By practicing, executing, and relating guidelines directly to activities.",
                      isRtl ? "عن طريق تجنب الاختبارات وإهمال مراجعات الفصول." : "By skipping review nodes altogether.",
                      isRtl ? "ترك المنهج فور الانتهاء والبدء في دورة عشوائية أخرى." : "By leaving the screen instantly and ignoring the verification."
                    ],
                    optionsEn: [
                      "By practicing, converting definitions to habits, and doing regular application.",
                      "By avoiding quizzes or structural review steps.",
                      "By never revising or checking the progression."
                    ],
                    correctIndex: 0,
                    explanationAr: isRtl ? "ربط التطابق يخلد الفهم ويسرع عجلة التنمية الذاتية للذهن." : "Meaningful practical challenges activate deeper neuronal connections.",
                    explanationEn: "Translating words to dynamic habits solidifies learning and results."
                  }
                ]
              }
            ]
          };

          setConvertedCourse(fakeGenerated);
          setSelectedBook(fakeGenerated);
          setActiveChapter(fakeGenerated.chapters[0]);
          setActiveLesson(fakeGenerated.chapters[0].lessons[0]);
          setLessonIndex(0);
          setShowQuiz(false);
          setIsConverting(false);
          
          confetti({
            particleCount: 150,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1e2229] font-sans antialiased pb-20">
      {/* Dynamic Certificate Modal Container */}
      {renderCertificateModal()}
      
      {/* Decorative Warm Top Bar Accent */}
      <div className="h-1.5 bg-[#b48e56]" />

      {/* Navigation Header */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 border-b border-[#e1deda] flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-[#b48e56] transition-colors py-2 px-1 text-sm font-bold"
        >
          <ArrowLeft size={16} />
          <span>{isRtl ? 'العودة للوحة التحكم' : 'Back to Dashboard'}</span>
        </button>

        <div className="flex gap-1 bg-[#eae6df] p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'browse' ? 'bg-white text-[#b48e56] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            {isRtl ? 'تصفح المكتبة التنموية' : 'Browse Library'}
          </button>
          <button 
            onClick={() => setActiveTab('converter')}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'converter' ? 'bg-white text-[#b48e56] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            {isRtl ? 'مهندس المحتوى والملفات' : 'AI PDF Converter'}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        
        <AnimatePresence mode="wait">
          {activeTab === 'browse' && (
            <motion.div 
              key="browse-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              
              {/* If no book has been selected, browse the books list */}
              {!selectedBook ? (
                <div>
                  <div className="mb-10 text-center max-w-2xl mx-auto">
                    <span className="text-xs tracking-widest text-[#b48e56] uppercase font-bold py-1 px-3 bg-[#f2ede4] rounded-full mb-3 inline-block">
                      {isRtl ? 'أكاديمية المعرفة الفطنة والريادة' : 'Premium Micro-Learning Engine'}
                    </span>
                    <h1 className="text-4xl font-extrabold text-[#111] tracking-tight mb-4">
                      {isRtl ? 'قسم التطوير والإنتاج: دورات تطويرية مصغرة' : 'Developmental Micro-Courses'}
                    </h1>
                    <p className="text-slate-500 leading-relaxed font-serif text-lg">
                      {isRtl 
                        ? 'تطبيق آلية هندسة المحتوى لتفكيك أمهات الكتب والـ PDF وتحويلها إلى تدرجات معرفية فصيحة ومحطات تثبيت وذكاء لا يتعدى 5 دقائق.'
                        : 'Explore real-world masterpieces fully deconstructed into action-oriented micro-learning lanes, with gatekeeping verification and review blocks.'}
                    </p>
                  </div>

                  {/* Books grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {PRELOADED_COURSES.map(course => {
                      const isComplete = course.chapters.length > 0 && course.chapters.every(ch => userResults.some(r => r.lessonId === ch.id && r.score >= 2));
                      return (
                        <div 
                          key={course.id}
                          className={`bg-white border border-[#e8e5df] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${course.isLocked ? 'opacity-60 cursor-not-allowed bg-[#faf9f6]' : 'cursor-pointer'}`}
                          onClick={() => {
                            if (!course.isLocked) {
                              setSelectedBook(course);
                              setActiveChapter(null);
                              setActiveLesson(null);
                            }
                          }}
                        >
                          <div>
                            <div className="relative mb-5 rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-slate-100 flex items-center justify-center">
                              <img 
                                src={course.coverImage} 
                                alt={course.titleEn} 
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              {course.isLocked && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                                  <div className="flex flex-col items-center gap-1 bg-[#1e2229] py-2 px-4 rounded-xl border border-white/10">
                                    <Lock size={18} className="text-[#b48e56]" />
                                    <span className="text-[10px] font-black tracking-wider uppercase">{isRtl ? 'قريباً' : 'Locked'}</span>
                                  </div>
                                </div>
                              )}
                              {isComplete && (
                                <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1.5 rounded-full shadow-sm">
                                  <CheckCircle2 size={16} />
                                </div>
                              )}
                            </div>

                            <span className="text-[10px] text-[#b48e56] font-extrabold uppercase tracking-widest block mb-1">
                              {isRtl ? course.authorAr : course.authorEn}
                            </span>
                            <h3 className="text-xl font-bold text-[#1a1a1a] leading-tight mb-2">
                              {isRtl ? course.titleAr : course.titleEn}
                            </h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed font-serif">
                              {isRtl ? course.descriptionAr : course.descriptionEn}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase text-[#b48e56]">
                            <span>{course.isLocked ? (isRtl ? 'مغلق ومجدول' : 'Scheduled') : (isRtl ? 'ابدأ الآن' : 'Start Course')}</span>
                            <ArrowRight size={14} className="rtl:rotate-180" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (

                /* Interactive Book Portal */
                <div>
                  <button 
                    onClick={() => {
                      setSelectedBook(null);
                      setActiveChapter(null);
                      setActiveLesson(null);
                    }}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-xs font-bold mb-6"
                  >
                    <ArrowLeft size={14} />
                    <span>{isRtl ? 'العودة للمكتبة' : 'Back to Library'}</span>
                  </button>

                  <div className="bg-white border border-[#e8e5df] rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 mb-8">
                    <div className="w-full md:w-1/4 max-w-[200px] mx-auto md:mx-0">
                      <img 
                        src={selectedBook.coverImage} 
                        alt={selectedBook.titleEn} 
                        className="rounded-2xl shadow-md w-full object-cover aspect-[3/4]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-[#b48e56] font-black uppercase tracking-wider">
                          {isRtl ? selectedBook.authorAr : selectedBook.authorEn}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#111] mt-1 mb-4">
                          {isRtl ? selectedBook.titleAr : selectedBook.titleEn}
                        </h2>
                        <p className="text-slate-500 font-serif leading-relaxed text-sm">
                          {isRtl ? selectedBook.descriptionAr : selectedBook.descriptionEn}
                        </p>
                      </div>

                      {/* Info Cards */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100">
                        <div className="bg-[#faf9f5] border border-[#e9e6df] rounded-xl p-3 text-center">
                          <label className="text-[10px] uppercase font-black text-slate-400 block tracking-widest">{isRtl ? 'المواضيع والأقسام' : 'Chapters'}</label>
                          <span className="text-[#111] font-black text-base">{selectedBook.chapters.length} فصول مصغرة</span>
                        </div>
                        <div className="bg-[#faf9f5] border border-[#e9e6df] rounded-xl p-3 text-center">
                          <label className="text-[10px] uppercase font-black text-slate-400 block tracking-widest">{isRtl ? 'التقييم الفطن' : 'Gatekeeping'}</label>
                          <span className="text-[#111] font-black text-sm">{isRtl ? 'اختبار عبور متطلب' : 'Pass to progress'}</span>
                        </div>
                        <div className="bg-[#faf9f5] border border-[#e9e6df] rounded-xl p-3 text-center col-span-2 md:col-span-1">
                          <label className="text-[10px] uppercase font-black text-slate-400 block tracking-widest">{isRtl ? 'الجائزة التنموية' : 'Awards'}</label>
                          <span className="text-[#b48e56] font-black text-sm">+150 XP</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapters List */}
                  {!activeChapter ? (
                    <div>
                      {/* Comprehensive Course completion Certificate Banner */}
                      {selectedBook && selectedBook.chapters.every(ch => userResults.some(r => r.lessonId === ch.id)) && (
                        <div className="bg-gradient-to-r from-[#002147] to-[#112d4e] text-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-amber-400 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-right leading-relaxed">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.02] rounded-full pointer-events-none" />
                          
                          <div className="flex items-center gap-5 flex-row-reverse z-10 w-full md:w-auto">
                            <div className="w-16 h-16 rounded-2xl bg-amber-400/25 flex items-center justify-center text-amber-400 shrink-0">
                              <Trophy size={36} />
                            </div>
                            <div>
                              <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest block mb-1">
                                {isRtl ? 'تهانينا الحارة! إنجاز أكاديمي متميز' : 'Congratulations! Academic Excellence'}
                              </span>
                              <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                                {isRtl ? `استحقاق شهادة إتمام دورة «${selectedBook.titleAr}»` : `You earned the certification for completing "${selectedBook.titleEn}"`}
                              </h3>
                              <p className="text-slate-300 text-xs font-serif mt-1 max-w-xl">
                                {isRtl 
                                  ? 'لقد اجتزت بنجاح كافة اختبارات الفصول بتقدير ممتاز. شهادتك المعتمدة صادرة وموثقة مباشرة من أكاديمية باسم آل خليل الرقمية.' 
                                  : 'You have passed all chapter audits with high standing. Your credential is authenticated and ready.'}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const { score, total } = getBookOverallScores(selectedBook);
                              triggerCertificate(
                                isRtl ? selectedBook.titleAr : selectedBook.titleEn,
                                isRtl ? 'إكمال المسار الأكاديمي كاملاً' : 'Full Course Path Completed',
                                score,
                                total
                              );
                            }}
                            className="bg-amber-400 hover:bg-amber-500 text-[#002147] font-black px-6 py-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-lg w-full md:w-auto hover:scale-105 z-10"
                          >
                            <Award size={18} />
                            <span>{isRtl ? 'إصدار شهادة الإتمام الفورية 🎓' : 'Issue Dynamic Course Certificate 🎓'}</span>
                          </button>
                        </div>
                      )}

                      <h3 className="text-xl font-extrabold mb-4 text-[#111] pb-2 border-b border-[#ece8e1]">
                        {isRtl ? 'الفصول والمسارات المتاحة للتلخيص والمناقشة' : 'Available Pathways'}
                      </h3>
                      
                      <div className="space-y-4">
                        {selectedBook.chapters.map((chapter, idx) => {
                          const isUnlocked = unlockedChapters.has(chapter.id);
                          const matchingResult = userResults.find(r => r.lessonId === chapter.id);
                          
                          return (
                            <div 
                              key={chapter.id}
                              className={`bg-white border border-[#e8e5df] rounded-2xl p-5 shadow-sm transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isUnlocked ? 'hover:border-[#b48e56] cursor-pointer' : 'opacity-65 relative'}`}
                              onClick={() => {
                                if (isUnlocked) {
                                  setActiveChapter(chapter);
                                  setActiveLesson(chapter.lessons[0]);
                                  setLessonIndex(0);
                                  setShowQuiz(false);
                                } else {
                                  alert(isRtl ? 'هذا الفصل مغلق! يتعين عليك عبور الفصل السابق بنجاح لفتح هذا المسار.' : 'This chapter is locked! Complete the previous gatekeeper quiz (scored >= 70%) to progress.');
                                }
                              }}
                            >
                              <div className="flex-1 flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-[#b48e56]/10 flex items-center justify-center text-[#b48e56] shrink-0">
                                  {isUnlocked ? <BookOpen size={20} /> : <Lock size={20} />}
                                </div>
                                <div>
                                  <h4 className="font-bold text-[#111] text-lg">
                                    {isRtl ? chapter.titleAr : chapter.titleEn}
                                  </h4>
                                  <p className="text-slate-400 text-xs font-medium font-serif mt-1">
                                    {isRtl ? chapter.descriptionAr : chapter.descriptionEn}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 self-stretch md:self-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                                {matchingResult ? (
                                  <div className="flex items-center gap-2 flex-wrap justify-end">
                                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1.5 rounded-full text-xs font-black">
                                      <CheckCircle2 size={14} />
                                      <span>{isRtl ? `تم اجتياز مخرجات الفصل (${matchingResult.score}/${matchingResult.total})` : `Module Mastered (${matchingResult.score}/${matchingResult.total})`}</span>
                                    </div>
                                  </div>
                                ) : isUnlocked ? (
                                  <span className="text-xs font-black uppercase text-[#b48e56]">{isRtl ? 'ابدأ المسار' : 'Start Path'}</span>
                                ) : (
                                  <span className="text-xs font-bold text-slate-400">{isRtl ? 'متطلب الفصل السابق' : 'Prerequisite required'}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    
                    /* Active Study Arena */
                    <div className="space-y-6">
                      
                      {/* Course Arena Top Bar */}
                      <div className="flex justify-between items-center bg-white border border-[#e8e5df] py-4 px-6 rounded-2xl shadow-sm">
                        <button 
                          onClick={() => {
                            setActiveChapter(null);
                            setActiveLesson(null);
                            stopSpeaking();
                          }}
                          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-xs font-black"
                        >
                          <ArrowLeft size={14} />
                          <span>{isRtl ? 'العودة لقائمة فصول الكتاب' : 'Back to Chapters'}</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#b48e56] font-bold">
                            {isRtl ? `بوابة فصل ${activeChapter.chapterNum}` : `Chapter ${activeChapter.chapterNum}`}
                          </span>
                        </div>
                      </div>

                      {/* Learning Stage Progress Bar */}
                      <div className="bg-white border border-[#e8e5df] p-4 rounded-2xl flex flex-wrap gap-2 justify-between items-center shadow-sm">
                        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                          {activeChapter.lessons.map((lesson, idx) => {
                            const isCurrent = activeLesson?.id === lesson.id && !showQuiz;
                            return (
                              <button 
                                key={lesson.id}
                                onClick={() => {
                                  setShowQuiz(false);
                                  handleLessonNavigation(idx);
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all border ${isCurrent ? 'bg-[#b48e56] text-white border-[#b48e56]' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
                              >
                                {isRtl ? `درس ${idx + 1}` : `Lesson ${idx + 1}`}
                              </button>
                            );
                          })}
                          
                          <button 
                            onClick={() => handleLessonNavigation(activeChapter.lessons.length)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all border ${showQuiz ? 'bg-amber-500 text-white border-amber-500' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
                          >
                            {isRtl ? 'بوابة عبور الفصل 📑' : 'Gatekeeper Quiz 📑'}
                          </button>
                        </div>
                      </div>

                      {/* Interactive View Mode Selector */}
                      {!showQuiz && (
                        <div className="flex bg-[#eae6df] p-1 rounded-2xl border border-[#dedad3] justify-center items-center max-w-md mx-auto w-full gap-1">
                          <button 
                            onClick={() => setStudyViewMode('lesson')}
                            className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${studyViewMode === 'lesson' ? 'bg-[#b48e56] text-white shadow-sm' : 'text-slate-600 hover:text-[#b48e56]'}`}
                          >
                            <BookOpen size={14} />
                            <span>{isRtl ? '📖 الدرس التفاعلي وقراءة سريعة' : '📖 Interactive Lesson'}</span>
                          </button>
                          <button 
                            onClick={() => setStudyViewMode('mindmap')}
                            className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${studyViewMode === 'mindmap' ? 'bg-[#b48e56] text-white shadow-sm' : 'text-slate-600 hover:text-[#b48e56]'}`}
                          >
                            <FileText size={14} />
                            <span>{isRtl ? '📊 المخطط الهيكلي والإنفوجرافيك' : '📊 Visual Infographic'}</span>
                          </button>
                        </div>
                      )}

                      {/* Study Area Canvas */}
                      <AnimatePresence mode="wait">
                        {!showQuiz && activeLesson ? (
                          studyViewMode === 'mindmap' ? (
                            <motion.div
                              key="mindmap-canvas"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                            >
                              {renderTreeViewInfographic()}
                            </motion.div>
                          ) : (
                            <motion.div 
                              key={activeLesson.id}
                              initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: isRtl ? -15 : 15 }}
                              className="bg-white border border-[#e8e5df] p-6 md:p-10 rounded-3xl shadow-sm text-right relative"
                            >
                              <div className="flex justify-between items-start flex-wrap gap-4 mb-4 border-b border-[#f2ece2] pb-4">
                                <div>
                                  <span className="text-[10px] tracking-widest text-[#b48e56] uppercase font-bold py-0.5 px-3.5 bg-[#f5f1e8] rounded-full inline-block leading-loose">
                                    {activeLesson.type === 'intro' ? (isRtl ? 'تمهيد وتأسيس' : 'Orientation') : 
                                     activeLesson.type === 'review' ? (isRtl ? 'مراجعة وتثبيت' : 'Review Node') : 
                                     activeLesson.type === 'tips' ? (isRtl ? 'دليل إرشادي' : 'Tips Node') : (isRtl ? 'جوهر المفهوم' : 'Core Concept')}
                                  </span>

                                  <h3 className="text-2xl font-extrabold text-[#111] tracking-tight mt-3 mb-1 leading-tight text-right">
                                    {isRtl ? activeLesson.titleAr : activeLesson.titleEn}
                                  </h3>
                                </div>

                                {/* Active Chronometer Timer */}
                                <div className="flex items-center gap-2 text-[#b48e56] bg-[#b48e56]/5 py-1.5 px-3.5 rounded-xl border border-[#b48e56]/15 font-sans">
                                  <span className="relative flex h-20 w-2 shrink-0 items-center justify-center">
                                    <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                  </span>
                                  <span className="text-xs font-black font-mono">
                                    {isRtl ? `مدة القراءة: ${formatSeconds(activeSeconds)}` : `Reading: ${formatSeconds(activeSeconds)}`}
                                  </span>
                                </div>
                              </div>

                              {/* Interactive Reading Controls Row */}
                              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#faf9f6] border border-[#f2ece2] p-4 rounded-2xl mb-6 text-right">
                                <p className="text-xs text-slate-400 font-serif">
                                  {isRtl ? 'تخصيص العرض والتحكم الفطن للقراءة السريعة والأوديو:' : 'Customize font multiplier or bionic speed-reading scan:'}
                                </p>

                                <div className="flex items-center gap-3 flex-wrap">
                                  {/* Audio speaker */}
                                  <button 
                                    onClick={() => speakText(isRtl ? activeLesson.contentAr : activeLesson.contentEn)}
                                    className="bg-[#b48e56]/10 text-[#b48e56] hover:bg-[#b48e56]/20 transition-all px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                                  >
                                    <PlayCircle size={14} />
                                    <span>{isRtl ? 'استمع صوتياً' : 'Listen Now'}</span>
                                  </button>

                                  {/* Scannable mode indicator */}
                                  <button 
                                    onClick={() => setScannableMode(!scannableMode)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border flex items-center gap-1.5 ${scannableMode ? 'bg-[#b48e56] text-white border-[#b48e56]' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
                                  >
                                    <span>⚡ {isRtl ? 'وضع القراءة السلسة' : 'Foveal Scan'}</span>
                                  </button>

                                  {/* Font multiplier tabs */}
                                  <div className="flex gap-1 bg-slate-100 p-1 rounded-xl items-center border border-slate-300 font-sans">
                                    {(['normal', 'medium', 'large', 'xl'] as const).map((sz) => (
                                      <button 
                                        key={sz}
                                        onClick={() => setFontSize(sz)}
                                        className={`px-2 py-1 rounded-lg text-xs font-black uppercase transition-all ${fontSize === sz ? 'bg-white text-[#b48e56] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                                      >
                                        {sz === 'normal' ? 'S' : sz === 'medium' ? 'M' : sz === 'large' ? 'L' : 'XL'}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Lesson Content viewport */}
                              <div className={`${
                                fontSize === 'normal' ? 'text-base md:text-lg' : 
                                fontSize === 'medium' ? 'text-lg md:text-xl' : 
                                fontSize === 'large' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                              } text-slate-700 leading-relaxed font-serif whitespace-pre-line space-y-4 prose max-w-none text-right`}>
                                {renderScannableContent(isRtl ? activeLesson.contentAr : activeLesson.contentEn)}
                              </div>

                              {/* Lessons Navigators */}
                              <div className="mt-10 pt-6 border-t border-[#f2ece2] flex justify-between items-center gap-4">
                                <button 
                                  disabled={lessonIndex === 0}
                                  onClick={() => handleLessonNavigation(lessonIndex - 1)}
                                  className={`text-slate-500 hover:text-slate-800 flex items-center gap-2 text-xs font-bold py-2 ${lessonIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                >
                                  <ArrowLeft size={16} />
                                  <span>{isRtl ? 'الدرس السابق' : 'Previous'}</span>
                                </button>

                                <button 
                                  onClick={() => handleLessonNavigation(lessonIndex + 1)}
                                  className="bg-[#b48e56] hover:bg-[#a17e4b] text-white transition-all py-2.5 px-6 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                                >
                                  <span>
                                    {lessonIndex + 1 === activeChapter.lessons.length 
                                      ? (isRtl ? 'انتقل لاختبار البوابة' : 'Verify Chapter (Quiz)') 
                                      : (isRtl ? 'الدرس التالي' : 'Next Lesson')}
                                  </span>
                                  <ArrowRight size={14} className="rtl:rotate-180" />
                                </button>
                              </div>
                            </motion.div>
                          )
                        ) : (
                          
                          /* Gatekeeping Quiz Mode */
                          <motion.div 
                            key="quiz-canvas"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#1f2229] text-white border border-white/5 p-6 md:p-10 rounded-3xl shadow-lg relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 left-0 h-1.5 bg-amber-500" />
                            
                            {!quizFinished ? (
                              <div>
                                <div className="flex justify-between items-center mb-6">
                                  <span className="text-xs font-black tracking-widest uppercase text-amber-500 bg-amber-500/10 py-1 px-3.5 rounded-full inline-block">
                                    {isRtl ? 'بوابة التحقق ونظام الجودة' : 'Gatekeeper Quality Quiz'}
                                  </span>
                                  <span className="font-bold text-slate-400 text-xs">
                                    {isRtl 
                                      ? `السؤال ${currentQuizIndex + 1} من ${activeChapter.quiz.length}` 
                                      : `Question ${currentQuizIndex + 1} of ${activeChapter.quiz.length}`}
                                  </span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold leading-snug mb-8 font-serif">
                                  {isRtl ? activeChapter.quiz[currentQuizIndex].questionAr : activeChapter.quiz[currentQuizIndex].questionEn}
                                </h3>

                                <div className="space-y-3">
                                  {(isRtl ? activeChapter.quiz[currentQuizIndex].optionsAr : activeChapter.quiz[currentQuizIndex].optionsEn).map((option, idx) => {
                                    const isSelected = selectedOptionIndex === idx;
                                    const isCorrectOpt = idx === activeChapter.quiz[currentQuizIndex].correctIndex;
                                    
                                    let btnStyle = "border-white/10 hover:border-white/30 bg-white/5";
                                    if (isAnswered) {
                                      if (isSelected) {
                                        btnStyle = isCorrectOpt ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-rose-500/20 border-rose-500 text-rose-400";
                                      } else if (isCorrectOpt) {
                                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400";
                                      } else {
                                        btnStyle = "opacity-40 border-white/5 bg-transparent";
                                      }
                                    }

                                    return (
                                      <button 
                                        key={idx}
                                        disabled={isAnswered}
                                        onClick={() => handleQuizAnswer(idx)}
                                        className={`w-full text-right p-4 rounded-xl border transition-all flex justify-between items-center text-sm font-medium leading-relaxed font-serif ${btnStyle}`}
                                      >
                                        <span>{option}</span>
                                        {isAnswered && (
                                          <div className="shrink-0 ml-3">
                                            {isCorrectOpt ? <Check size={16} className="text-emerald-400" /> : isSelected ? <X size={16} className="text-rose-400" /> : null}
                                          </div>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Explanation Panel */}
                                <AnimatePresence>
                                  {isAnswered && (
                                    <motion.div 
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl text-xs leading-relaxed text-slate-300 font-serif"
                                    >
                                      <span className="font-bold text-[#b48e56] block mb-1">
                                        {isRtl ? 'التفسير المعرفي للفصل:' : 'Deconstructive Breakdown:'}
                                      </span>
                                      {isRtl ? activeChapter.quiz[currentQuizIndex].explanationAr : activeChapter.quiz[currentQuizIndex].explanationEn}
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                <div className="mt-8 flex justify-end">
                                  <button 
                                    disabled={!isAnswered}
                                    onClick={handleNextQuiz}
                                    className={`py-3 px-8 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm transition-all ${isAnswered ? 'bg-[#b48e56] hover:bg-[#a17e4b] text-white cursor-pointer' : 'bg-white/10 text-slate-500 cursor-not-allowed'}`}
                                  >
                                    <span>
                                      {currentQuizIndex + 1 === activeChapter.quiz.length 
                                        ? (isRtl ? 'إنهاء وحساب المعايير' : 'Finish Quiz') 
                                        : (isRtl ? 'السؤال التالي' : 'Next Question')}
                                    </span>
                                    <ArrowRight size={14} className="rtl:rotate-180" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              
                              /* Quiz Completed */
                              <div className="text-center py-6">
                                <Trophy size={60} className="text-amber-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-extrabold text-[#fff] tracking-tight mb-2">
                                  {isRtl ? 'تهانينا، أتممت بوابة التحقق!' : 'Verification Complete!'}
                                </h3>
                                
                                <p className="text-slate-300 leading-relaxed font-serif text-base max-w-md mx-auto mb-6">
                                  {quizScore >= Math.ceil(activeChapter.quiz.length * 0.7) 
                                    ? (isRtl 
                                        ? `لقد تفوقت بذكاء وحققت نتيجة عالية: ${quizScore} من ${activeChapter.quiz.length} أسئلة صحيحة! تم تسجيل تقدمك وإضافة 150 نقطة لحسابك.` 
                                        : `Outstanding! You verified with solid understanding: ${quizScore}/${activeChapter.quiz.length} correct. Progress logged and +150 Points awarded.`)
                                    : (isRtl 
                                        ? `لقد حققت نتيجة ${quizScore} من ${activeChapter.quiz.length}. تحتاج للحصول على نتيجة أعلى (70% فما فوق) لمطابثة معايير الجودة وعبور الفصل.` 
                                        : `You scored ${quizScore}/${activeChapter.quiz.length}. Study the tips node again and achieve >= 70% to unlock subsequent modules.`)}
                                </p>

                                <div className="flex gap-3 justify-center items-center flex-wrap">
                                  <button 
                                    onClick={() => {
                                      setShowQuiz(false);
                                      setActiveChapter(null);
                                      setActiveLesson(null);
                                    }}
                                    className="bg-white/10 hover:bg-white/15 text-white transition-all py-3 px-6 rounded-xl text-xs font-black block"
                                  >
                                    {isRtl ? 'عودة لقائمة الفصول' : 'Chapters List'}
                                  </button>
                                  
                                  {quizScore >= Math.ceil(activeChapter.quiz.length * 0.7) && (
                                    <>
                                      {selectedBook && selectedBook.chapters.every(ch => ch.id === activeChapter.id || userResults.some(r => r.lessonId === ch.id)) ? (
                                        <button 
                                          onClick={() => {
                                            const { score, total } = getBookOverallScores(selectedBook);
                                            triggerCertificate(
                                              isRtl ? selectedBook.titleAr : selectedBook.titleEn,
                                              isRtl ? 'إكمال المسار الأكاديمي كاملاً' : 'Full Course Path Completed',
                                              score,
                                              total
                                            );
                                          }}
                                          className="bg-gradient-to-r from-[#002147] to-[#112d4e] border-2 border-amber-400 hover:brightness-110 text-white font-black transition-all py-3 px-6 rounded-xl text-xs flex items-center gap-2 block shadow-lg shadow-amber-500/15 cursor-pointer"
                                        >
                                          <Trophy size={15} className="text-amber-400" />
                                          <span>{isRtl ? 'إصدار شهادة الدورة كاملة 🎓' : 'Issue Full Course Certificate 🎓'}</span>
                                        </button>
                                      ) : (
                                        <button 
                                          onClick={() => {
                                            setShowQuiz(false);
                                            setActiveChapter(null);
                                            setActiveLesson(null);
                                          }}
                                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-black transition-all py-3 px-6 rounded-xl text-xs flex items-center gap-2 block shadow-md cursor-pointer"
                                        >
                                          <CheckCircle2 size={15} />
                                          <span>{isRtl ? 'تم العبور بنجاح! تابع الفصول المتبقية 🚀' : 'Passed! Complete remaining modules 🚀'}</span>
                                        </button>
                                      )}
                                    </>
                                  )}

                                  {quizScore < Math.ceil(activeChapter.quiz.length * 0.7) && (
                                    <button 
                                      onClick={() => {
                                        setShowQuiz(true);
                                        setCurrentQuizIndex(0);
                                        setSelectedOptionIndex(null);
                                        setIsAnswered(false);
                                        setQuizScore(0);
                                        setQuizFinished(false);
                                      }}
                                      className="bg-[#b48e56] hover:bg-[#a17e4b] text-white transition-all py-3 px-6 rounded-xl text-xs font-black flex items-center gap-2 block cursor-pointer"
                                    >
                                      <RefreshCw size={14} />
                                      <span>{isRtl ? 'أعد المحاولة' : 'Retake Quiz'}</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}

                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  )}

                </div>
              )}

            </motion.div>
          )}

          {activeTab === 'converter' && (
            <motion.div 
              key="converter-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white border border-[#e8e5df] p-6 md:p-8 rounded-3xl shadow-sm text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#b48e56]/15 text-[#b48e56] flex items-center justify-center mx-auto mb-4">
                  <UploadCloud size={24} />
                </div>
                
                <h2 className="text-2xl font-extrabold text-[#111] mb-2 tracking-tight">
                  {isRtl ? 'تحويل الكتب والملفات (PDF) إلى مسارات تدريبية مصغرة' : 'AI E-Book & PDF Micro-Converter'}
                </h2>
                <p className="text-slate-400 font-serif leading-relaxed text-sm max-w-lg mx-auto mb-6">
                  {isRtl 
                    ? 'غذِّ النظام بأي فصل من كتاب، حقيبة تدريبية، أو ملف مكتوب، وشاهد خوارزميات صياغة الأنسنة والتفكيك وهي تنتج جزيئات معرفية ممتعة، ملخصات، واختبارات عبور في ثوانٍ.'
                    : 'Paste dense manual text, e-books, or course chapters. Our framework pipeline instantly chunk, humanizes tone, establishes reviews, and outputs gatekeepers.'}
                </p>

                {isConverting ? (
                  <div className="py-12 flex flex-col items-center justify-center">
                    <RefreshCw size={40} className="text-[#b48e56] animate-spin mb-4" />
                    <span className="text-xs font-black text-[#b48e56] tracking-wider uppercase inline-block">
                      {conversionStep}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <textarea 
                      rows={8}
                      placeholder={isRtl 
                        ? 'ألصق هنا النص أو المحتوى أو ملخص الفصل المقتضب من الـ PDF المراد تفكيكه وإعادة صياغته تنموياً...' 
                        : 'Paste your raw textbook data or chapter summaries here...'}
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 p-4 focus:ring-1 focus:ring-[#b48e56] bg-slate-50/50 text-sm font-serif leading-relaxed focus:outline-none"
                    />

                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => {
                          setRawText(`كانت أمنية الأمير بوذا الكامنة خلف جدران القصر هي اكتشاف الحقيقة، لكنه غاص في الحرمان الشديد قبل أن يستقر على الوسطية.
الحياة حافلة بالمشاكل المتجددة، فالمشاكل بمثابة تمارين لترقية تفكيرنا البيولوجي.
الاستخلاص الحقيقي للنجاح الروحي لا يبدأ من تهربك أو هوسك بالكمال، بل برحابة قبولك لهشاشتك وعاداتك كما هي.`);
                        }}
                        className="bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition-all font-bold text-xs py-2 px-4 rounded-xl"
                      >
                        {isRtl ? 'مثال توضيحي جاهز' : 'Use Demo Material'}
                      </button>
                      <button 
                        onClick={runMicroDeconstruction}
                        className="bg-[#b48e56] hover:bg-[#a17e4b] text-white transition-all font-black text-xs py-3 px-8 rounded-xl shadow-md flex items-center gap-1.5"
                      >
                        <Sparkles size={14} />
                        <span>{isRtl ? 'كود تفكيك ومعالجة الذكاء' : 'Deconstruct Now'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
};
