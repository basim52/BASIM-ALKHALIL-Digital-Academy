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
    isLocked: true,
    chapters: []
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
  const [unlockedChapters, setUnlockedChapters] = useState<Set<string>>(new Set(['sa_ch1']));
  
  // PDF Text Converter states
  const [activeTab, setActiveTab] = useState<'browse' | 'converter'>('browse');
  const [rawText, setRawText] = useState<string>('');
  const [convertedCourse, setConvertedCourse] = useState<BookCourse | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [conversionStep, setConversionStep] = useState<string>('');

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
          const unlocked = new Set<string>(['sa_ch1']);
          snap.forEach(doc => {
            const data = doc.data();
            results.push(data);
            if (data.lessonId) {
              unlocked.add(data.lessonId);
              // Unlock subsequent chapters if previous is completed
              if (data.lessonId === 'sa_ch1' && data.score >= 2) {
                unlocked.add('sa_ch2');
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
                                  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1.5 rounded-full text-xs font-black">
                                    <CheckCircle2 size={14} />
                                    <span>{isRtl ? `تمت البوابة (${matchingResult.score}/${matchingResult.total})` : `Completed (${matchingResult.score}/${matchingResult.total})`}</span>
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

                      {/* Study Area Canvas */}
                      <AnimatePresence mode="wait">
                        {!showQuiz && activeLesson ? (
                          <motion.div 
                            key={activeLesson.id}
                            initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isRtl ? -15 : 15 }}
                            className="bg-white border border-[#e8e5df] p-6 md:p-10 rounded-3xl shadow-sm text-left relative"
                          >
                            <span className="text-[10px] tracking-widest text-[#b48e56] uppercase font-bold py-0.5 px-3.5 bg-[#f5f1e8] rounded-full inline-block leading-loose">
                              {activeLesson.type === 'intro' ? (isRtl ? 'تمهيد وتأسيس' : 'Orientation') : 
                               activeLesson.type === 'review' ? (isRtl ? 'مراجعة وتثبيت' : 'Review Node') : 
                               activeLesson.type === 'tips' ? (isRtl ? 'دليل إرشادي' : 'Tips Node') : (isRtl ? 'جوهر المفهوم' : 'Core Concept')}
                            </span>

                            <h3 className="text-2xl font-extrabold text-[#111] tracking-tight mb-6 mt-3 leading-tight border-b border-[#f2ece2] pb-4">
                              {isRtl ? activeLesson.titleAr : activeLesson.titleEn}
                            </h3>

                            {/* Audio Speaker Integration */}
                            <div className="absolute top-6 right-6 flex gap-2">
                              <button 
                                onClick={() => speakText(isRtl ? activeLesson.contentAr : activeLesson.contentEn)}
                                className="bg-[#b48e56]/10 text-[#b48e56] hover:bg-[#b48e56]/20 transition-all px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 shadow-sm"
                              >
                                <PlayCircle size={14} />
                                <span>{isRtl ? 'استمع صوتياً' : 'Listen Now'}</span>
                              </button>
                            </div>

                            <div className="text-slate-700 font-serif leading-relaxed text-base md:text-lg whitespace-pre-line space-y-4 prose max-w-none">
                              {isRtl ? activeLesson.contentAr : activeLesson.contentEn}
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

                                <div className="flex gap-3 justify-center">
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
                                      className="bg-[#b48e56] hover:bg-[#a17e4b] text-white transition-all py-3 px-6 rounded-xl text-xs font-black flex items-center gap-2 block"
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
