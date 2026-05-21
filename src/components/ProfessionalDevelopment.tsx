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
      }
    ]
  },
  {
    id: 'rich_dad',
    titleAr: 'الأب الغني والأب الفقير',
    titleEn: 'Rich Dad Poor Dad',
    authorAr: 'روبرت كيوساكي',
    authorEn: 'Robert Kiyosaki',
    coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=400&q=80',
    descriptionAr: 'مسار مصغر لتفكيك الثقافة المالية العائلية، وتكبير الأصول لتخالف عقلية الديون.',
    descriptionEn: 'The global standard on financial literacy, assets generation, and wealth habits.',
    isLocked: true,
    chapters: []
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
  const [unlockedChapters, setUnlockedChapters] = useState<Set<string>>(new Set(['sa_ch1', '7h_ch1']));
  
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
      serial: `AFAQ-PD-${score >= total ? 'AMB' : 'ALN'}-${hash}`
    });
    setShowCertificate(true);
    
    // Confetti burst for celebrating academic excellence!
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.5 }
    });
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
                    <span className="font-bold">{isRtl ? 'الكتاب والمسار:' : 'Course:'}</span>
                    <span className="text-[#b48e56] font-sans font-black">{certificateData.courseTitle}</span>
                  </div>
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'الفصل والوحدة:' : 'Chapter:'}</span>
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
              <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-[#b48e56]/50 rounded-tr-md print:hidden" />
              <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-[#b48e56]/50 rounded-tl-md print:hidden" />
              <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-[#b48e56]/50 rounded-br-md print:hidden" />
              <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-[#b48e56]/50 rounded-tl-md print:hidden" />

              {/* Decorative Subtle Background Crest */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#b48e56]/[0.015] rounded-full flex items-center justify-center border border-dashed border-[#b48e56]/5 select-none pointer-events-none" />

              {/* Certificate Header Branding */}
              <div className="flex justify-between items-center border-b border-[#f3eee5] pb-4 mb-4 select-none relative z-10 flex-row-reverse">
                <div className="text-right">
                  <span className="font-extrabold text-[#b48e56] text-sm md:text-base leading-none block font-sans">
                    {isRtl ? 'أكاديمية آفاق للتطوير والتمكين الأكاديمي' : 'AFAQ Continuous Development Academy'}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-slate-400 font-serif font-semibold mt-1 block">
                    {isRtl ? 'إدارة التطوير المستمر والبحث المنهجي والتحقق المعرفي' : 'Continuous Education & High Quality Standards Board'}
                  </span>
                </div>

                {/* Academy logo container */}
                <div className="w-12 h-12 rounded-full border-2 border-[#b48e56] flex items-center justify-center bg-[#b48e56]/5">
                  <GraduationCap className="text-[#b48e56]" size={24} />
                </div>
              </div>

              {/* Main certificate wording */}
              <div className="my-auto space-y-4 md:space-y-6 relative z-10">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-[#b48e56] uppercase py-1 px-3.5 bg-[#f5f1e8] rounded-full inline-block mb-1 border border-[#b48e56]/15 font-sans">
                    {isRtl ? 'شهادة إتمام معتمدة لبرنامج التطوير المهني' : 'Certified Lifelong Achievement Certificate'}
                  </span>
                  <h2 className="text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight leading-snug font-sans">
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
                  <h1 className="text-2xl md:text-4xl font-extrabold text-[#111] bg-gradient-to-r from-slate-900 via-[#b48e56] to-slate-900 bg-clip-text text-transparent px-4 font-sans tracking-tight">
                    {certificateName || (isRtl ? 'اسم المتدرب المتميز' : 'Distinguished Trainee Name')}
                  </h1>
                  <div className="w-40 md:w-60 h-[1.5px] bg-[#b48e56]/40 mx-auto mt-2 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#b48e56] rotate-45" />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-500 font-serif leading-relaxed max-w-2xl mx-auto">
                  {isRtl ? (
                    <>
                      قد اجتاز بنجاح الدورة التنموية المصغرة المصنفة والتقييم المعرفي المكثف لمستخلص:
                      <br />
                      <strong className="text-[#b48e56] text-sm md:text-base font-black px-1.5 inline-block my-1 font-sans">
                        «{certificateData.courseTitle} - {certificateData.chapterTitle}»
                      </strong>
                      <br />
                      بتقدير عام <span className="font-extrabold text-amber-600">{gradeStr}</span> ونسبة دقة بلغت {percentage}%.
                    </>
                  ) : (
                    <>
                      has successfully completed the developmental deconstruction and passed the rigorous chapter validation for:
                      <br />
                      <strong className="text-[#b48e56] text-sm md:text-base font-black px-1.5 inline-block my-1 font-sans">
                        "{certificateData.courseTitle} - {certificateData.chapterTitle}"
                      </strong>
                      <br />
                      attaining a final grade of <span className="font-extrabold text-amber-600">{gradeStr}</span> and representing thorough cognitive mastery.
                    </>
                  )}
                </p>
              </div>

              {/* Certificate Footer Stamp & Signatures */}
              <div className="border-t border-[#f3eee5] pt-4 mt-6 flex justify-between items-end text-right flex-row-reverse">
                {/* Signatures 1 */}
                <div className="text-right space-y-1 z-10">
                  <span className="text-[10px] text-slate-400 block font-serif font-semibold">{isRtl ? 'العميد الأكاديمي لشؤون التنمية:' : 'Academic Dean of Quality:'}</span>
                  <p className="font-serif italic text-slate-800 font-bold text-xs">{isRtl ? 'د. يوسف الأتاسي' : 'Dr. Joseph Atassi'}</p>
                  <div className="w-24 h-5 border-b border-dashed border-slate-300 relative inline-block">
                    <span className="font-mono text-[9px] text-slate-300 absolute left-4 bottom-0 select-none">Atassi@Afaq</span>
                  </div>
                </div>

                {/* Gold Seal stamp inside certificate */}
                <div className="flex flex-col items-center justify-center relative shrink-0 z-20">
                  <div className="absolute w-14 h-14 bg-amber-500 rounded-full opacity-10 filter blur-sm print:hidden" />
                  <div className="w-16 h-16 rounded-full border-4 border-double border-[#b48e56] bg-[#fcf9f2] flex flex-col items-center justify-center p-1.5 shadow-sm relative">
                    <div className="text-[8px] font-black uppercase text-[#b48e56] font-sans tracking-wide scale-90 select-none text-center leading-none">
                      {isRtl ? 'آفاق معتمد' : 'AFAQ VAL'}
                      <span className="block text-[#111] font-bold text-[6px]">{percentage}% OK</span>
                    </div>
                    <Trophy className="text-[#b48e56] mt-0.5" size={16} />
                  </div>
                  <span className="text-[8px] font-black text-[#b48e56] tracking-widest mt-1 uppercase font-mono block select-none">
                    {isRtl ? 'مستند معتمد' : 'Academy Seal'}
                  </span>
                </div>

                {/* Academic credentials and metadata signatures */}
                <div className="text-right space-y-1 z-10">
                  <span className="text-[10px] text-slate-400 block font-serif font-semibold">{isRtl ? 'رئيس هيئة الاعتماد الفني:' : 'Chairman of Accreditation:'}</span>
                  <p className="font-serif italic text-slate-800 font-bold text-xs">{isRtl ? 'أ.د. عبد الهادي الصايغ' : 'Prof. Abdul-Hadi Al-Saigh'}</p>
                  <div className="w-24 h-5 border-b border-dashed border-slate-300 relative inline-block">
                    <span className="font-mono text-[9px] text-slate-300 absolute right-4 bottom-0 select-none font-sans">SAIGH-APPROVED</span>
                  </div>
                </div>
              </div>

              {/* Serial Number & Security Bottomline */}
              <div className="pt-2 flex justify-between items-center text-[8px] font-mono font-bold text-slate-400 border-t border-slate-100 flex-row-reverse select-none">
                <span>ID: {certificateData.serial}</span>
                <span>{isRtl ? 'بوابة التحقق الفطنة ومكافحة التزوير الأكاديمي' : 'AFAQ Cognitive Integrity Control Protocol'}</span>
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
          const unlocked = new Set<string>(['sa_ch1', '7h_ch1']);
          snap.forEach(doc => {
            const data = doc.data();
            results.push(data);
            if (data.lessonId) {
              unlocked.add(data.lessonId);
              // Unlock subsequent chapters if previous is completed
              if (data.lessonId === 'sa_ch1' && data.score >= 2) {
                unlocked.add('sa_ch2');
              }
              if (data.lessonId === '7h_ch1' && data.score >= 2) {
                unlocked.add('7h_ch2');
              }
              if (data.lessonId === '7h_ch2' && data.score >= 2) {
                unlocked.add('7h_ch3');
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
            if (activeChapter.id === 'sa_ch1') updated.add('sa_ch2');
            if (activeChapter.id === '7h_ch1') updated.add('7h_ch2');
            if (activeChapter.id === '7h_ch2') updated.add('7h_ch3');
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
                      const isComplete = userResults.some(r => r.lessonId === 'sa_ch1' && r.score >= 2) && course.id === 'subtle_art';
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
                                      <span>{isRtl ? `تمت البوابة (${matchingResult.score}/${matchingResult.total})` : `Completed (${matchingResult.score}/${matchingResult.total})`}</span>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        triggerCertificate(
                                          isRtl ? selectedBook.titleAr : selectedBook.titleEn,
                                          isRtl ? chapter.titleAr : chapter.titleEn,
                                          matchingResult.score,
                                          matchingResult.total
                                        );
                                      }}
                                      className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded-full text-xs font-black transition-all shadow-sm border border-amber-400 cursor-pointer"
                                    >
                                      <Award size={13} />
                                      <span>{isRtl ? 'استعراض الشهادة 🏅' : 'Certificate 🏅'}</span>
                                    </button>
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
                                    <button 
                                      onClick={() => triggerCertificate(
                                        isRtl ? selectedBook.titleAr : selectedBook.titleEn,
                                        isRtl ? activeChapter.titleAr : activeChapter.titleEn,
                                        quizScore,
                                        activeChapter.quiz.length
                                      )}
                                      className="bg-gradient-to-r from-amber-500 to-[#b48e56] hover:brightness-110 text-slate-900 font-black transition-all py-3 px-6 rounded-xl text-xs flex items-center gap-2 block shadow-lg shadow-amber-500/15 cursor-pointer"
                                    >
                                      <Award size={15} />
                                      <span>{isRtl ? 'أصدر شهادة الإتمام الفورية 🎓' : 'Issue Dynamic Certificate 🎓'}</span>
                                    </button>
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
