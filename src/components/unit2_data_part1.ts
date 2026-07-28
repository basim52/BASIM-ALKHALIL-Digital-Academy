// Unit 2 Part 1: Focus (20), Movement (20), Writing (20), Emotion (20)

export interface FocusExercise {
  id: string;
  title_ar: string;
  title_en: string;
  script_ar: string;
  script_en: string;
}

export interface MovementExercise {
  id: string;
  command_en: string;
  command_ar: string;
  description_ar: string;
  say_while_moving: string;
  benefit_ar: string;
  duration_seconds: number;
}

export interface WritingExercise {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  skill_focus: string;
  activity_type: string;
  steps_ar: string[];
  steps_en: string[];
  outcome_ar: string;
  emoji: string;
  expression_ar?: string;
  duration_minutes?: number;
}

export interface GenericExercise {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  skill_focus: string;
  activity_type: string;
  steps_ar: string[];
  steps_en: string[];
  outcome_ar: string;
  emoji: string;
}

// 1. CALM & FOCUS UNIT 2 (20 Exercises)
export const EXERCISES_UNIT2: FocusExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "شهيق الصباح المشرق", en: "Bright Morning Inhale" },
    { ar: "تأمل ندى الورود", en: "Rose Dew Meditation" },
    { ar: "إيقاع التنفس الهرمي", en: "Pyramid Breath Rhythm" },
    { ar: "صوت النهر الجاري", en: "Running River Sound" },
    { ar: "تأمل الجبل الراسخ", en: "Steady Mountain Meditation" },
    { ar: "أنفاس الشجرة المثمرة", en: "Fruitful Tree Breath" },
    { ar: "سكينة النجمة المضيئة", en: "Luminous Star Serenity" },
    { ar: "تأمل الشراع الهادئ", en: "Calm Sail Meditation" },
    { ar: "تنفس زهرة اللوتس", en: "Lotus Flower Breathing" },
    { ar: "تأمل السماء الصافية", en: "Clear Sky Mindfulness" },
    { ar: "إيقاع الأمواج الذهبية", en: "Golden Waves Rhythm" },
    { ar: "تأمل الشمعة الدافئة", en: "Warm Candle Focus" },
    { ar: "تنفس الربيع المتجدد", en: "Renewed Spring Breath" },
    { ar: "تأمل الواحة الخضراء", en: "Green Oasis Meditation" },
    { ar: "إيقاع القلب المطمئن", en: "Tranquil Heart Beat" },
    { ar: "تأمل الفراشة الهادئة", en: "Gentle Butterfly Mind" },
    { ar: "تنفس الجسد والروح", en: "Body & Soul Breathing" },
    { ar: "تأمل الأفق البعيد", en: "Distant Horizon Meditation" },
    { ar: "سكينة الليل المضاء", en: "Lit Night Tranquility" },
    { ar: "تأمل قطرات المطر", en: "Raindrop Mindfulness" }
  ];

  const scripts = [
    { ar: "أغمض عينيك... تخيل أشعة شمس الربيع الذهبية تملأ المكان... تنفس ببطء من أنفك... خذ هذه الطاقة المشرقة إلى داخل صدرك... واخرج الهواء بهدوء طارداً كل تعب...", en: "Close your eyes... Imagine golden spring sunlight filling the space... Inhale slowly through your nose... Bring this bright energy inside... and exhale quietly." },
    { ar: "تخيل قطرة ندى نقية على بكتلة وردة... ركز انتباهك التام على هذه القطرة... هي هادئة، صافية، ومعكوس فيها الضوء... اجعل عقلك صافياً ومستقراً مثلها...", en: "Imagine a clear raindrop on a rose petal... Focus your mind entirely on this drop... Clear, calm, reflecting light... Let your mind become as quiet." },
    { ar: "استنشق في 3 عدات... احبس أنفاسك في 3 عدات... أخرج الهواء في 6 عدات بطيئة... اشعر كيف يستقر كل توتر ويتحول إلى طاقة ذهنية متجددة...", en: "Inhale for 3 counts... Hold for 3 counts... Exhale for 6 slow counts... Feel all tension settle and transform into renewed mental clarity." },
    { ar: "استمع في خيالك لخرير ماء صافٍ يتدفق في وادٍ أخضر... الأفكار كأوراق الشجر تطفو فوق الماء... شاهدها تمر ولا تتشبث بها... أنت ثابت كالصخرة على الشاطئ...", en: "Listen in your mind to a clear river flowing in a green valley... Thoughts are leaves floating on water... Watch them pass without holding on." },
    { ar: "قف أو اجلس بظهر مستقيم كالجبل... مهما هبت الرياح أو تغير الطقس، الجبل يظل ثابتاً وشموخاً... تنفس بعمق واشعر بالثبات والهدوء التام...", en: "Sit straight like a majestic mountain... No matter how the wind blows, the mountain stays still... Breathe deeply and feel unshakable calm." },
    { ar: "استنشق السلام كأنه نسيم ينشط أغصان شجرة مورقة... احبس النفس لحظة واشعر بالامتنان... اخرج الزفير ببطء تاركاً أوراق الشجر تحظى بالهدوء...", en: "Inhale peace like a breeze reviving a lush tree... Hold for a moment in gratitude... Exhale slowly letting every leaf find stillness." },
    { ar: "تخيل نقطة ضوء صغيرة في سماء الليل الصافية... كلما تنفست، تتوسع هذه النقطة لتملأ روحك بالسكينة والاطمئنان الكامل...", en: "Imagine a small point of light in the clear night sky... As you breathe, it expands filling your soul with total serenity." },
    { ar: "أنت الآن سفينة تبحر بسلام في بحر هادئ... تنفسك هو الريح اللطيفة التي تسير الشراع بسلاسة وبلا استعجال...", en: "You are a boat sailing peacefully on calm waters... Your breath is the gentle wind guiding the sail smoothly." },
    { ar: "تخيل زهرة لوتس تفتح بتلاتها مع كل شهيق... وتغلقها بهدوء وحماية مع كل زفير... اشعر بالأمان والسلام داخلك...", en: "Imagine a lotus flower opening its petals with every inhale... and closing them gently with every exhale... Feel safe and peaceful within." },
    { ar: "انظر إلى أفكارك كغيوم بيضاء خفيفة تسير في سماء زرقة واسعة... السماء لا تتأثر بالغيوم بل تظل واسعة دائماً... كن كالسماء...", en: "View your thoughts as light white clouds drifting across a vast blue sky... The sky remains unaffected... Be like the sky." },
    { ar: "تنفس مع إيقاع موجة دافئة تصل الشاطئ بهدوء... شهيق عندما تقترب الموجة... وزفير ببطء عندما تعود للبحر...", en: "Breathe with the rhythm of a warm ocean wave reaching the shore... Inhale as it approaches... Exhale as it rolls back." },
    { ar: "تأمل شعاع شمعة صغيرة ثابتة... الوهج الهادئ يبعث الطمأنينة في عقلك وقلبك... تثبيت الانتباه يمنحك القوة الذهنية...", en: "Focus on the steady glow of a small candle flame... Its calm warmth brings tranquility to your mind and heart." },
    { ar: "خذ شهيقاً ينعش كل خلية في جسدك برائحة الأزهار الندية... واخرج كل نفس قديم مجهد بقوة ولطف...", en: "Take an inhale that refreshes every cell with the scent of spring flowers... and release all tired air gently." },
    { ar: "تخيل أنك تجلس بفيء واحة خضراء... صوت أوراق النخل والماء الهادئ يعيد توازنك وتفكيرك الصافي...", en: "Imagine sitting in the shade of a lush green oasis... The rustle of palm leaves restores your balance." },
    { ar: "ضع يدك على صدرك... اشعر بنبضات قلبك المنتظمة... اطلب من عقلك أن يتبع هذا النبض ببطء وراحة...", en: "Place your hand on your chest... Feel your steady heartbeat... Let your mind follow this calm rhythm." },
    { ar: "تأمل فراشة خفيفة تنتقل بين الأزهار بسلام... حركتك ونفسك الآن خفيفان ومفعمان بالجمال والهدوء...", en: "Visualize a light butterfly drifting between flowers... Your breath is now light, soft, and full of beauty." },
    { ar: "ارخِ كتفيك وجبينك... شهيق عميق من أسفل البطن... زفير يزيل كل ثقل في جسدك ويمنحك خفة واستقراراً...", en: "Relax your shoulders and brow... Deep belly inhale... Exhale releasing all heaviness and finding lightness." },
    { ar: "انظر بذهنك إلى خط الأفق حيث تلتقي الأرض بالسماء... المدى واسع والأفق مفتوح أمامك بكل أمل...", en: "Look with your mind's eye toward the far horizon... Wide, open, and full of infinite hope." },
    { ar: "هدوء الليل يحيط بك... تنفس بطمأنينة واشعر بالامتنان ليومك ولفرص الغد المشرقة...", en: "The quiet of the night surrounds you... Breathe in peace and express gratitude for today and tomorrow." },
    { ar: "استمع لصوت قطرات مطر خفيفة تسقط على الأوراق... كل قطرة تغسل القلق وتزرع السكينة في روحك...", en: "Listen to the gentle sound of raindrops on leaves... Each drop washes away worry and plants tranquility." }
  ];

  return {
    id: `focus_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    script_ar: scripts[i].ar,
    script_en: scripts[i].en
  };
});

// 2. MOVEMENT UNIT 2 (20 Exercises)
export const MOVEMENT_EXERCISES_UNIT2: MovementExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const commands = [
    { ar: "توازن الشجرة المتقدم!", en: "Tree Balance Pose!" },
    { ar: "تمدد أجنحة النسر!", en: "Eagle Wing Stretch!" },
    { ar: "انكماش وانفتاح زهرة الربيع!", en: "Spring Flower Awakening!" },
    { ar: "قفزة الغزال المبهجة!", en: "Joyful Gazelle Leap!" },
    { ar: "توازن الجسر القوي!", en: "Strong Bridge Hold!" },
    { ar: "دوران طاحونة الهواء!", en: "Windmill Arm Rotations!" },
    { ar: "تمدد القوس والسهم!", en: "Archer Bow Stretch!" },
    { ar: "ثبات المحارب الشجاع!", en: "Brave Warrior Stance!" },
    { ar: "تموج الموجة الفضية!", en: "Silver Wave Flow!" },
    { ar: "خطوة الفهد السريع!", en: "Swift Panther Step!" },
    { ar: "توازن البجعة الأنيقة!", en: "Graceful Swan Balance!" },
    { ar: "تمدد الشمس الذهبية!", en: "Golden Sun Reach!" },
    { ar: "قفزة الشلال النشط!", en: "Waterfall Energy Jump!" },
    { ar: "تأرجح خيزران الربيع!", en: "Spring Bamboo Sway!" },
    { ar: "تمرين انسياب النهر!", en: "River Flow Mobility!" },
    { ar: "انطلاق الصاروخ المشرق!", en: "Bright Rocket Launch!" },
    { ar: "التفاتة البومة الحكيمة!", en: "Wise Owl Neck Rotation!" },
    { ar: "توازنات النجم المضيء!", en: "Shining Star Balance!" },
    { ar: "تمدد العمود الفقري الملكي!", en: "Royal Spine Elongation!" },
    { ar: "ختام الحركة والهدوء!", en: "Final Motion & Calm Stance!" }
  ];

  const benefits = [
    "يعزز التركيز الذهني والتوازن العصبي العضلي.",
    "يفتح القفص الصدري ويزيل تشنجات الكتفين والرقبة.",
    "ينشط الدورة الدموية في كامل الجسد ويضخ الأكسجين للمخ.",
    "يزيد المرونة واللياقة البدنية ويرفع مستوى هرمون السعادة.",
    "يقوي عضلات الظهر والجذع ويحسن القامة.",
    "ينشط المفاصل ويزيد تدفق الدم لليدين والذراعين.",
    "يعزز التركيز البصري ودقة التحكم العضلي.",
    "يبني الثقة بالنفس وقوة الساقين والاصطفاف الجسدي.",
    "ينشط المرونة الجانبية للعمود الفقري ويخفف التوتر.",
    "يرفع سرعة الاستجابة الحركية والتوافق الحركي.",
    "يساعد على تحسين التوازن الداخلي واستقرار القامة.",
    "يمدد عضلات الظهر والصدر وينشط الطاقة الصباحية.",
    "يحفز عضلة القلب ويرفع منسوب الحيوية والإنتاجية.",
    "يمنح الجسم مرونة واستلاخاء عضلات الجذع.",
    "يحسن حركة المفاصل والفقرات بسلاسة ولطف.",
    "يفرغ الطاقة الزائدة ويزيد قوة الدفع السفلية.",
    "يزيل التصلب في الرقبة الناتج عن استخدام الشاشات.",
    "يقوي التركيز والتناسق الحركي بين الجانبين.",
    "يحسن استقامة الظهر والتنفس العميق الصحي.",
    "يهدئ ضربات القلب ويهيئ الجسم للتركيز الصافي."
  ];

  return {
    id: `move_u2_${num}`,
    command_en: commands[i].en,
    command_ar: commands[i].ar,
    description_ar: `تمرين حركة ممتع ومصمم لـ ${commands[i].ar} مع المتابعة والتنفس المنتظم لمدة ${10 + (i % 3) * 5} ثانية.`,
    say_while_moving: i % 2 === 0 ? "I am strong, balanced, and full of vitality!" : "My body is energized and my mind is clear!",
    benefit_ar: benefits[i],
    duration_seconds: 15 + (i % 3) * 5
  };
});

// 3. WRITING UNIT 2 (20 Exercises)
export const WRITING_EXERCISES_UNIT2: WritingExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "رسالة إلى ذاتي في المستقبل", en: "Letter to My Future Self" },
    { ar: "شجرة الامتنان الربيعية", en: "Spring Gratitude Tree" },
    { ar: "دستور القوة الشخصية", en: "Personal Power Code" },
    { ar: "خريطة شغفي وهواياتي", en: "My Passion & Hobbies Map" },
    { ar: "يوميات المبتكر الصغير", en: "Young Innovator Diary" },
    { ar: "نصوص التعاطف والطيبة", en: "Empathy & Kindness Notes" },
    { ar: "قائمة التحديات والشجاعة", en: "Courage & Challenge List" },
    { ar: "تأملات اللحظة الحاضرة", en: "Present Moment Reflections" },
    { ar: "مذكرات بطل التغيير", en: "Hero of Change Journal" },
    { ar: "شجرة القرارات الحكيمة", en: "Wise Decisions Tree" },
    { ar: "رسالة شكر لمُعلمي", en: "Thank You Note to Teacher" },
    { ar: "رؤيتي للعام القادم", en: "My Vision for Next Year" },
    { ar: "رسام الكلمات والأفكار", en: "Words & Ideas Painter" },
    { ar: "قائمة القيم والأخلاق", en: "Values & Ethics Charter" },
    { ar: "حلول المشكلات اليومية", en: "Daily Problem Solutions" },
    { ar: "حكايات من الخيال العلمي", en: "Sci-Fi Imaginative Story" },
    { ar: "دفتر المشاعر والحلول", en: "Emotions & Solutions Notebook" },
    { ar: "رسالة اعتزاز بالأسرة", en: "Family Appreciation Letter" },
    { ar: "قائمة العادات الذهبية", en: "Golden Habits Checklist" },
    { ar: "حصاد الإنجازات اليومية", en: "Daily Achievements Harvest" }
  ];

  const emojis = ["✉️", "🌳", "📜", "🗺️", "📓", "🌸", "🦁", "🧘", "🦸", "🌳", "💌", "🌟", "🎨", "🛡️", "🧩", "🚀", "💎", "🏡", "⭐", "🏆"];

  return {
    id: `writing_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    description_ar: `تمرين تدوين تفاعلي يهدف لبناء ${titles[i].ar} وتعزيز قدرات التفكير والوعي الذاتي.`,
    skill_focus: i % 2 === 0 ? "التأمل والاستبصار الذاتي" : "الكتابة الإبداعية والتفكير المنظم",
    activity_type: "كتابة وتفكير",
    steps_ar: [
      `اقرأ فكرة التمرين بتمعن وبقلب مفتوح.`,
      `دون أفكارك الرئيسية في المفكرة أو على ورقة بخط واضح.`,
      `راجع ما كتبته بابتسامة وفخر بوعيك الذاتي.`,
      `شارك خلاصة ما كتبته مع أفراد أسرتك لتبادل الفائدة.`
    ],
    steps_en: [
      `Read the prompt thoughtfully.`,
      `Write down your main thoughts clearly.`,
      `Review what you wrote with pride and joy.`,
      `Share your key insights with your family.`
    ],
    outcome_ar: `توضيح الأهداف والتعبير السلس عن الأفكار والمشاعر بوعي واقتدار.`,
    emoji: emojis[i]
  };
});

// 4. EMOTION UNIT 2 (20 Exercises)
export const EMOTION_EXERCISES_UNIT2: GenericExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "بوصلة التعاطف والمشاعر", en: "Empathy & Compassion Compass" },
    { ar: "حاوية إعادة تدوير القلق", en: "Worry Recycling Bin" },
    { ar: "درع الهدوء عند الغضب", en: "Calm Shield in Anger" },
    { ar: "مقياس درجة الحرارة العاطفية", en: "Emotional Thermometer Check" },
    { ar: "مختبر تحويل الخوف إلى شجاعة", en: "Fear to Courage Lab" },
    { ar: "جلسة الاستماع بلا أحكام", en: "Non-Judgmental Listening Session" },
    { ar: "جسر التسامح والسلام الداخلي", en: "Forgiveness & Inner Peace Bridge" },
    { ar: "قاموس المشاعر الدقيقة", en: "Nuanced Emotions Dictionary" },
    { ar: "حديقة التفاؤل والبهجة", en: "Optimism & Joy Garden" },
    { ar: "محطة تفريغ التوتر العصبي", en: "Nervous Tension Decompress" },
    { ar: "تمرين احتواء مشاعر الصديق", en: "Supporting a Friend's Feelings" },
    { ar: "فن التعبير العاطفي اللطيف", en: "Gentle Emotional Expression" },
    { ar: "بوصلة الثقة وحب الذات", en: "Self-Love & Confidence Compass" },
    { ar: "مختبر التحكم بالدوافع", en: "Impulse Control Laboratory" },
    { ar: "تمرين العاطفة الواعية", en: "Mindful Compassion Practice" },
    { ar: "مرساة الأمان عند القلق", en: "Safety Anchor for Anxiety" },
    { ar: "نظارة التماس الأعذار للغير", en: "Seeking Excuses Lens" },
    { ar: "مذكرات المرونة الوجدانية", en: "Emotional Resilience Log" },
    { ar: "تمرين الامتنان العاطفي", en: "Emotional Gratitude Drill" },
    { ar: "مختبر السلام الوجداني الكامل", en: "Total Emotional Harmony Lab" }
  ];

  const emojis = ["💎", "♻️", "🛡️", "🌡️", "🦁", "🎧", "🕊️", "📖", "🌻", "⚓", "🤝", "💬", "💖", "🧠", "🌱", "⚓", "👓", "📓", "✨", "🧘"];

  return {
    id: `emotion_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    description_ar: `تمرين تطبيقي لـ ${titles[i].ar} لبناء نضج عاطفي ومرونة وجدانية ممتازة.`,
    skill_focus: "الذكاء الوجداني والتعاطف",
    activity_type: "محاكاة وتطبيق عاطفي",
    steps_ar: [
      "حدد الموقف العاطفي المراد التعامل معه بكل صدق.",
      "خذ تنفساً عميقاً ولاحظ الشعور دون التسرع بالرد.",
      "طبق الخطوة العملية الموصى بها لإدارة الشعور بتوازن.",
      "قيّم شعورك بعد التمرين واشعر بالارتياح والسكينة."
    ],
    steps_en: [
      "Identify the emotion honestly.",
      "Take a deep breath and observe without rushing to react.",
      "Apply the recommended step to manage the emotion.",
      "Assess how you feel and enjoy inner calm."
    ],
    outcome_ar: "زيادة الوعي بالذات وتطوير علاقات متوازنة ومستقرة مع الآخرين.",
    emoji: emojis[i]
  };
});
