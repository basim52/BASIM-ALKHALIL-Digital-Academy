import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, 
  Sparkles, 
  Play, 
  Volume2, 
  VolumeX, 
  Check, 
  Timer, 
  Heart, 
  Flame, 
  Cloud, 
  Award, 
  Moon, 
  Sun, 
  ChevronRight, 
  Compass, 
  Smile, 
  RefreshCw,
  FileText,
  Download,
  Printer,
  Trash2,
  ChevronLeft
} from 'lucide-react';
import { EmotionExercise, EMOTION_EXERCISES } from './emotion_exercises';
import { CommunicationExercise, COMMUNICATION_EXERCISES } from './communication_exercises';

interface FocusExercise {
  id: string;
  title_ar: string;
  title_en: string;
  script_ar: string;
  script_en: string;
}

const EXERCISES: FocusExercise[] = [
  {
    "id": "focus_001",
    "title_ar": "التنفس الأول",
    "title_en": "First Breath",
    "script_ar": "أغمض عينيك بلطف... خذ نفساً بطيئاً من أنفك... اشعر بالهواء يملأ صدرك... الآن أطلقه بهدوء من فمك... أنت هنا الآن... افتح عينيك وأنت مستعد للتعلم.",
    "script_en": "Close your eyes gently... Breathe in slowly through your nose... Feel the air fill your chest... Now let it out softly through your mouth... You are here now... Open your eyes, ready to learn."
  },
  {
    "id": "focus_002",
    "title_ar": "أنا شجرة",
    "title_en": "I Am a Tree",
    "script_ar": "تخيل أنك شجرة كبيرة وقوية... جذورك تمتد في الأرض تثبتك... تنفس بعمق... مع كل شهيق، تمتص القوة من الأرض... مع كل زفير، تطلق أوراقك بهدوء... أنت ثابت وآمن.",
    "script_en": "Imagine you are a big strong tree... Your roots go deep into the ground, holding you steady... Breathe deeply... With every in-breath, you draw strength from the earth... With every out-breath, your leaves rest quietly... You are stable and safe."
  },
  {
    "id": "focus_003",
    "title_ar": "عدّ النجوم",
    "title_en": "Counting Stars",
    "script_ar": "في سماء خيالك... هناك 5 نجوم ساطعة... تنفس ببطء وعدها معي... 1... نفس عميق... 2... أطلقه بهدوء... 3... أنت في أمان... 4... عقلك يصفو... 5... أنت جاهز للبدء.",
    "script_en": "In the sky of your imagination... there are 5 bright stars... Breathe slowly and count them with me... 1... deep breath... 2... let it out softly... 3... you are safe... 4... your mind clears... 5... you are ready to begin."
  },
  {
    "id": "focus_004",
    "title_ar": "موج البحر",
    "title_en": "Ocean Wave",
    "script_ar": "استمع إلى صوت الموج في خيالك... الشهيق يرتفع كموجة لطيفة... الزفير يتراجع كالماء على الشاطئ... تنفس مع إيقاع البحر... هدوء... صفاء... اترك كل الأفكار تطفو بعيداً.",
    "script_en": "Listen to the sound of waves in your mind... the in-breath rises like a gentle wave... the out-breath pulls back like water on the shore... Breathe with the rhythm of the sea... Calm... Clarity... Let all thoughts float away."
  },
  {
    "id": "focus_005",
    "title_ar": "يد على القلب",
    "title_en": "Hand on Heart",
    "script_ar": "ضع يدك على قلبك بلطف... اشعر بنبضه الهادئ... هذا هو إيقاع حياتك... تنفس 3 مرات... مع كل نفس، قل في داخلك: أنا بخير... أنا مركز... أنا جاهز.",
    "script_en": "Place your hand gently on your heart... Feel its calm beat... This is the rhythm of your life... Breathe 3 times... With each breath, say inside: I am okay... I am focused... I am ready."
  },
  {
    "id": "focus_006",
    "title_ar": "الريشة الطائرة",
    "title_en": "The Floating Feather",
    "script_ar": "تخيل أن كل فكرة في رأسك ريشة صغيرة... تنفس بعمق... وعند الزفير، دع الريش يطير بهدوء بعيداً... واحدة تلو الأخرى... حتى تصبح السماء الداخلية صافية وزرقاء.",
    "script_en": "Imagine that every thought in your head is a small feather... Breathe deeply... and as you breathe out, let the feathers float quietly away... one by one... until your inner sky is clear and blue."
  },
  {
    "id": "focus_007",
    "title_ar": "ضوء الشمعة",
    "title_en": "Candle Light",
    "script_ar": "تخيل شمعة مضيئة أمامك... ثابتة ودافئة... ركز كل انتباهك على نورها... إذا شرد ذهنك، أعده بلطف إلى الضوء... الضوء هو تركيزك... قوي وثابت.",
    "script_en": "Imagine a lit candle in front of you... steady and warm... Focus all your attention on its light... If your mind wanders, gently bring it back to the light... The light is your focus... strong and steady."
  },
  {
    "id": "focus_008",
    "title_ar": "الغيمة العابرة",
    "title_en": "The Passing Cloud",
    "script_ar": "أنت مستلقٍ على العشب تنظر للسماء... كل فكرة تظهر هي غيمة عابرة... لا تمسك بها... فقط شاهدها تمر... تنفس... ودع الغيوم تذهب... السماء خلفها دائماً زرقاء وواسعة.",
    "script_en": "You are lying on the grass looking at the sky... Every thought that appears is a passing cloud... Don't grab it... Just watch it pass... Breathe... and let the clouds go... The sky behind them is always blue and vast."
  },
  {
    "id": "focus_009",
    "title_ar": "أصابع التركيز",
    "title_en": "Focus Fingers",
    "script_ar": "افتح يدك... المس إبهامك بسبابتك وقل: أنا... المس إصبعك الأوسط وقل: مركز... المس البنصر وقل: في... المس الخنصر وقل: الآن... كرر مع اليد الأخرى... أنا مركز في الآن.",
    "script_en": "Open your hand... Touch your thumb to your index finger and say: I am... Touch your middle finger and say: focused... Touch your ring finger and say: in the... Touch your pinky and say: now... Repeat with the other hand... I am focused in the now."
  },
  {
    "id": "focus_010",
    "title_ar": "صوت الصمت",
    "title_en": "The Sound of Silence",
    "script_ar": "اجلس بهدوء تام... استمع... ما الصوت الذي تسمعه خلف كل الأصوات؟ هذا هو الصمت... إنه ليس فارغاً... إنه مليء بالسلام... تنفس في هذا الصمت... اشعر بالسكون يملؤك.",
    "script_en": "Sit in total silence... Listen... What is the sound you hear behind all sounds? That is silence... It is not empty... It is full of peace... Breathe in this silence... Feel stillness fill you."
  },
  {
    "id": "focus_011",
    "title_ar": "الاستماع للأصوات",
    "title_en": "Listening to Sounds",
    "script_ar": "أغمض عينيك... استمع فقط... حدد 3 أصوات من حولك... ربما همس الريح، أو دقات الساعة... لا تحكم عليها... فقط اسمع... الآن أعد تركيزك إلى تنفسك... أنت حاضر وواع.",
    "script_en": "Close your eyes... Just listen... Identify 3 sounds around you... maybe the whisper of the wind, or the ticking of a clock... Don't judge them... Just listen... Now bring your focus back to your breath... You are present and aware."
  },
  {
    "id": "focus_012",
    "title_ar": "مكاني الآمن",
    "title_en": "My Safe Place",
    "script_ar": "تخيل مكاناً تشعر فيه بالسعادة المطلقة... ربما شاطئ، حديقة، أو غرفتك... انظر للألوان... اشعر بالنسيم... استنشق الرائحة الجميلة... هذا المكان لك دائماً... يمكنك زيارته في أي وقت.",
    "script_en": "Imagine a place where you feel completely happy... maybe a beach, a garden, or your room... See the colors... Feel the breeze... Smell the beautiful scent... This place is always yours... You can visit it anytime."
  },
  {
    "id": "focus_013",
    "title_ar": "التنفس المربع",
    "title_en": "Square Breathing",
    "script_ar": "شهيق 4 عدات... احبس 4 عدات... زفير 4 عدات... انتظر 4 عدات... كرر... تخيل أنك ترسم مربعاً بأنفاسك... هذا النمط يهدئ عقلك وجسدك فوراً.",
    "script_en": "Inhale 4 counts... Hold 4 counts... Exhale 4 counts... Wait 4 counts... Repeat... Imagine you are drawing a square with your breath... This pattern calms your mind and body instantly."
  },
  {
    "id": "focus_014",
    "title_ar": "الامتنان الصباحي",
    "title_en": "Morning Gratitude",
    "script_ar": "قبل أن تبدأ التعلم... فكر في 3 أشياء أنت ممتن لها اليوم... ممكن أن تكون بسيطة: سرير دافئ، شمس مشرقة، عائلة تحبك... ابتسم وأنت تتذكرها... الامتنان يفتح العقل للتعلم.",
    "script_en": "Before you start learning... think of 3 things you are grateful for today... They can be simple: a warm bed, a bright sun, a family who loves you... Smile as you remember them... Gratitude opens the mind to learn."
  },
  {
    "id": "focus_015",
    "title_ar": "إرخاء العضلات",
    "title_en": "Muscle Relaxation",
    "script_ar": "ابدأ من قدميك... اشدهما بقوة 5 ثوان... ثم أرخهما تماماً... تحرك للأعلى: الساقين، البطن، اليدين، الكتفين، الوجه... في النهاية، كل جسمك مسترخٍ وجاهز لاستقبال المعلومات الجديدة.",
    "script_en": "Start with your feet... Squeeze them tight for 5 seconds... then completely relax them... Move up: legs, tummy, hands, shoulders, face... In the end, your whole body is relaxed and ready to receive new information."
  },
  {
    "id": "focus_016",
    "title_ar": "الدرع الواقي",
    "title_en": "The Protective Shield",
    "script_ar": "تخيل درعاً شفافاً من الضوء يحيط بك... هذا الدرع يسمح بدخول المعلومات المفيدة فقط... ويمنع أي تشتيت أو قلق من الوصول إليك... أنت داخل فقاعة تعلم آمنة ومركزة.",
    "script_en": "Imagine a transparent shield of light surrounding you... This shield only allows useful information to enter... and prevents any distraction or worry from reaching you... You are inside a safe and focused learning bubble."
  },
  {
    "id": "focus_017",
    "title_ar": "بطء الحركة",
    "title_en": "Slow Motion",
    "script_ar": "خذ 3 أنفاس... مع كل نفس، تخيل أن العالم من حولك يتباطأ... الأصوات تخفت... الحركة تهدأ... الوقت يصبح أبطأ... في هذا البطء، عقلك يعمل بوضوح ودقة أكبر... أنت تتعلم بسهولة.",
    "script_en": "Take 3 breaths... With each breath, imagine the world around you slowing down... Sounds get softer... Movement calms... Time becomes slower... In this slowness, your mind works with greater clarity and precision... You learn with ease."
  },
  {
    "id": "focus_018",
    "title_ar": "رحلة إلى الداخل",
    "title_en": "Journey Inside",
    "script_ar": "أغمض عينيك... انتبه إلى ما تشعر به الآن في جسدك... هل تشعر بالدفء؟ البرودة؟ الثقل؟ الخفة؟ لا تغيره... فقط لاحظه وتقبله... جسمك هو بيتك... تعرف عليه بلطف.",
    "script_en": "Close your eyes... Pay attention to what you feel right now in your body... Do you feel warmth? Coldness? Heaviness? Lightness? Don't change it... Just notice and accept it... Your body is your home... Get to know it gently."
  },
  {
    "id": "focus_019",
    "title_ar": "قبول المشاعر",
    "title_en": "Accepting Feelings",
    "script_ar": "إذا كان هناك قلق أو ملل... لا تحاربه... قل له: أراك... أنت موجود الآن... لكنني سأبدأ التعلم... المشاعر مثل الزوار... تأتي وترحل... أنت المضيف الهادئ... تنفس ودعها تكون.",
    "script_en": "If there is any worry or boredom... Don't fight it... Say to it: I see you... You are here now... But I will start learning... Feelings are like visitors... They come and go... You are the calm host... Breathe and let it be."
  },
  {
    "id": "focus_020",
    "title_ar": "أنا جاهز للتعلم",
    "title_en": "I Am Ready to Learn",
    "script_ar": "ضع يديك على ركبتيك... تنفس بعمق... قل لنفسك 3 مرات: أنا جاهز للتعلم... أنا فضولي... أنا قادر... افتح عينيك ببطء... ابتسم... وابدأ درسك بقوة وفرح.",
    "script_en": "Place your hands on your knees... Breathe deeply... Tell yourself 3 times: I am ready to learn... I am curious... I am capable... Open your eyes slowly... Smile... and start your lesson with strength and joy."
  }
];

export interface MovementExercise {
  id: string;
  command_en: string;
  command_ar: string;
  description_ar: string;
  say_while_moving: string;
  benefit_ar: string;
  duration_seconds: number;
}

export const MOVEMENT_EXERCISES: MovementExercise[] = [
  {
    "id": "move_001",
    "command_en": "Jump like a kangaroo!",
    "command_ar": "اقفز مثل الكنغر!",
    "description_ar": "قف 10 قفزات صغيرة متتالية في مكانك ويداك على خصرك.",
    "say_while_moving": "I am jumping! I have energy!",
    "benefit_ar": "ينشط الدورة الدموية ويمنح طاقة سريعة.",
    "duration_seconds": 15
  },
  {
    "id": "move_002",
    "command_en": "Stretch to the sky!",
    "command_ar": "امتد نحو السماء!",
    "description_ar": "ارفع ذراعيك عالياً وقف على أطراف أصابعك لمدة 5 ثوان.",
    "say_while_moving": "I am tall like a tree!",
    "benefit_ar": "يمد العمود الفقري ويحسن الوقفة.",
    "duration_seconds": 10
  },
  {
    "id": "move_003",
    "command_en": "Balance on one foot!",
    "command_ar": "توازن على قدم واحدة!",
    "description_ar": "قف على قدمك اليمنى 10 ثوان، ثم اليسرى 10 ثوان.",
    "say_while_moving": "I can balance! Right foot, left foot.",
    "benefit_ar": "يقوي عضلات الساقين ويحسن التركيز.",
    "duration_seconds": 20
  },
  {
    "id": "move_004",
    "command_en": "Shake your body!",
    "command_ar": "هز جسمك بالكامل!",
    "description_ar": "هز يديك ورجليك ورأسك بخفة لمدة 15 ثانية.",
    "say_while_moving": "Shake, shake, shake! I feel good!",
    "benefit_ar": "يحرر التوتر العضلي ويجدد النشاط.",
    "duration_seconds": 15
  },
  {
    "id": "move_005",
    "command_en": "March in place!",
    "command_ar": "سر في مكانك!",
    "description_ar": "ارفع ركبتيك عالياً بالتناوب كأنك جندي لمدة 20 ثانية.",
    "say_while_moving": "Left, right, left, right! I am marching!",
    "benefit_ar": "ينشط القلب والتنفس بلطف.",
    "duration_seconds": 20
  },
  {
    "id": "move_006",
    "command_en": "Touch your toes!",
    "command_ar": "المس أصابع قدميك!",
    "description_ar": "انحنِ للأمام بهدوء وحاول لمس أصابع قدميك. ابقَ 10 ثوان.",
    "say_while_moving": "I can touch my toes. I am flexible!",
    "benefit_ar": "يمدد عضلات الظهر والساقين الخلفية.",
    "duration_seconds": 10
  },
  {
    "id": "move_007",
    "command_en": "Fly like a bird!",
    "command_ar": "طر مثل الطائر!",
    "description_ar": "مدد ذراعيك جانباً وقم بحركات دائرية صغيرة 10 مرات.",
    "say_while_moving": "I am a bird. I am flying high!",
    "benefit_ar": "يقوي عضلات الكتفين ويحسن وضعية الجلوس.",
    "duration_seconds": 15
  },
  {
    "id": "move_008",
    "command_en": "Do a silly dance!",
    "command_ar": "ارقص رقصة مضحكة!",
    "description_ar": "تحرك بأي طريقة مضحكة تريحك لمدة 20 ثانية.",
    "say_while_moving": "I am dancing! I am happy!",
    "benefit_ar": "يفرغ طاقة إيجابية ويحسن المزاج.",
    "duration_seconds": 20
  },
  {
    "id": "move_009",
    "command_en": "Take 3 deep breaths!",
    "command_ar": "خذ 3 أنفاس عميقة!",
    "description_ar": "شهيق بطيء من الأنف 4 ثوان، زفير من الفم 6 ثوان. كرر 3 مرات.",
    "say_while_moving": "In... I am calm. Out... I am ready.",
    "benefit_ar": "يهدئ الجهاز العصبي ويحضر الذهن للدرس التالي.",
    "duration_seconds": 30
  },
  {
    "id": "move_010",
    "command_en": "Walk like a bear!",
    "command_ar": "امشِ مثل الدب!",
    "description_ar": "امشِ على يديك وقدميك (الزحف العالي) لـ 10 خطوات.",
    "say_while_moving": "I am a bear. I am strong!",
    "benefit_ar": "يقوي الجسم بالكامل وينسق الحركة.",
    "duration_seconds": 15
  },
  {
    "id": "move_011",
    "command_en": "Clap your hands!",
    "command_ar": "صفق بيديك!",
    "description_ar": "صفق 10 مرات بسرعة ثم 10 مرات ببطء.",
    "say_while_moving": "Clap, clap, clap! I am learning!",
    "benefit_ar": "ينشط الأعصاب في اليدين ويساعد على التركيز.",
    "duration_seconds": 15
  },
  {
    "id": "move_012",
    "command_en": "Roll your shoulders!",
    "command_ar": "حرك كتفيك!",
    "description_ar": "لف الكتفين للخلف 5 مرات وللأمام 5 مرات.",
    "say_while_moving": "Roll, roll, roll... I feel relaxed.",
    "benefit_ar": "يخفف من تصلب الرقبة والأكتاف بسبب الجلوس.",
    "duration_seconds": 10
  },
  {
    "id": "move_013",
    "command_en": "Pretend to swim!",
    "command_ar": "تظاهر أنك تسبح!",
    "description_ar": "حرك ذراعيك كأنك تسبح في الماء (الصدر أو الظهر).",
    "say_while_moving": "I am swimming in the ocean!",
    "benefit_ar": "يقوي عضلات الصدر والظهر والذراعين.",
    "duration_seconds": 15
  },
  {
    "id": "move_014",
    "command_en": "Cross your arms and legs!",
    "command_ar": "شبك ذراعيك ورجليك!",
    "description_ar": "قف أو اجلس، مد ذراعك اليمنى للمس كتفك الأيسر والعكس. ثم رجل فوق الأخرى.",
    "say_while_moving": "Cross! I am using my whole brain.",
    "benefit_ar": "ينشط الاتصال بين شقّي الدماغ مما يعزز التعلم.",
    "duration_seconds": 20
  },
  {
    "id": "move_015",
    "command_en": "Open and close your hands!",
    "command_ar": "افتح وأغلق يديك!",
    "description_ar": "اقبض كفيك بقوة وافتحهما بسرعة 15 مرة.",
    "say_while_moving": "Open, close. I am ready to write!",
    "benefit_ar": "يريح عضلات اليدين من الإمساك بالقلم أو الجهاز.",
    "duration_seconds": 10
  },
  {
    "id": "move_016",
    "command_en": "Look far, look near!",
    "command_ar": "انظر بعيداً، انظر قريباً!",
    "description_ar": "انظر من النافذة لشيء بعيد 10 ثوان، ثم لشيء قريب منك 10 ثوان.",
    "say_while_moving": "Far... Near... My eyes are strong.",
    "benefit_ar": "يريح عضلات العين ويقلل إجهاد الشاشة.",
    "duration_seconds": 20
  },
  {
    "id": "move_017",
    "command_en": "Be a tree!",
    "command_ar": "كن شجرة!",
    "description_ar": "قف ثابتاً، ارفع يداً واحدة كغصن واثبت 10 ثوان، ثم بدل.",
    "say_while_moving": "I am a tree. I am calm and strong.",
    "benefit_ar": "يدرب التوازن ويهدئ الذهن.",
    "duration_seconds": 20
  },
  {
    "id": "move_018",
    "command_en": "Stomp like an elephant!",
    "command_ar": "ادعس مثل الفيل!",
    "description_ar": "امشِ بخطوات ثقيلة بطيئة، رافعاً قدمك عالياً.",
    "say_while_moving": "Stomp, stomp! I am an elephant!",
    "benefit_ar": "يفرغ الطاقة الزائدة ويعيد الإحساس بالجسم.",
    "duration_seconds": 15
  },
  {
    "id": "move_019",
    "command_en": "Wiggle your fingers and toes!",
    "command_ar": "حرك أصابع يديك وقدميك!",
    "description_ar": "اجلس وحرك كل أصابعك بحرية لمدة 20 ثانية.",
    "say_while_moving": "Wiggle, wiggle! I am waking up my body.",
    "benefit_ar": "ينشط الدورة الدموية الطرفية ويقلل الخمول.",
    "duration_seconds": 20
  },
  {
    "id": "move_020",
    "command_en": "Hug yourself!",
    "command_ar": "عانق نفسك!",
    "description_ar": "لف ذراعيك حول كتفيك واضغط برفق. خذ نفساً عميقاً.",
    "say_while_moving": "I love myself. I am a learner.",
    "benefit_ar": "يمنح شعوراً بالأمان والراحة النفسية.",
    "duration_seconds": 15
  },
  {
    "id": "move_021",
    "command_en": "Walk on your tiptoes!",
    "command_ar": "امش على أطراف أصابعك!",
    "description_ar": "امش 10 خطوات على أطراف الأصابع، بهدوء كاللص.",
    "say_while_moving": "Tip, tip, tip... I am quiet like a mouse.",
    "benefit_ar": "يقوي عضلات الساقين والقدمين ويحسن التوازن الدقيق.",
    "duration_seconds": 15
  },
  {
    "id": "move_022",
    "command_en": "Make a funny face!",
    "command_ar": "اصنع وجهاً مضحكاً!",
    "description_ar": "حرك كل عضلات وجهك: افتح فمك، أغمض عيناً وافتح الأخرى.",
    "say_while_moving": "Funny face! I can make faces.",
    "benefit_ar": "يريح عضلات الوجه والفك من التوتر.",
    "duration_seconds": 10
  },
  {
    "id": "move_023",
    "command_en": "Bicycle your legs in the air!",
    "command_ar": "حرك رجليك كالدراجة في الهواء!",
    "description_ar": "استلق على ظهرك وحرك رجليك في الهواء كأنك تركب دراجة.",
    "say_while_moving": "I am cycling! I am full of energy!",
    "benefit_ar": "يقوي عضلات البطن والساقين.",
    "duration_seconds": 20
  },
  {
    "id": "move_024",
    "command_en": "Float like a balloon!",
    "command_ar": "اطفُ مثل البالون!",
    "description_ar": "قف بهدوء، خذ نفساً عميقاً وتخيل أنك تطفو. ارفع ذراعيك ببطء.",
    "say_while_moving": "I am floating... I am light like a balloon.",
    "benefit_ar": "يبطئ التنفس ويدخل في حالة من الاسترخاء العميق.",
    "duration_seconds": 15
  },
  {
    "id": "move_025",
    "command_en": "Catch the stars!",
    "command_ar": "امسك النجوم!",
    "description_ar": "اقفز عالياً ومد يديك كأنك تمسك نجوماً في السماء. 10 مرات.",
    "say_while_moving": "I catch a star! I reach high!",
    "benefit_ar": "يقوي الساقين ويحسن التنسيق بين العين واليد.",
    "duration_seconds": 15
  },
  {
    "id": "move_026",
    "command_en": "Row a boat!",
    "command_ar": "جدف القارب!",
    "description_ar": "اجلس على الأرض ومد رجليك، وتظاهر بأنك تجدف بقوة للخلف وللأمام.",
    "say_while_moving": "Row, row, row! I am on a river.",
    "benefit_ar": "يقوي عضلات الذراعين والظهر والكتفين.",
    "duration_seconds": 15
  },
  {
    "id": "move_027",
    "command_en": "Be a frog!",
    "command_ar": "كن ضفدعاً!",
    "description_ar": "انحنِ للأسفل وضع يديك على الأرض، واقفز للأعلى مثل الضفدع. 5 مرات.",
    "say_while_moving": "Ribbit, ribbit! I am a jumping frog!",
    "benefit_ar": "تمرين ممتاز لكامل الجسم ويفرغ طاقة كبيرة.",
    "duration_seconds": 10
  },
  {
    "id": "move_028",
    "command_en": "Sway like a palm tree!",
    "command_ar": "تمايل مثل النخلة!",
    "description_ar": "قف وارفع ذراعيك فوق رأسك، وتمايل بلطف يميناً ويساراً.",
    "say_while_moving": "Sway, sway... The wind is gentle.",
    "benefit_ar": "يمدد الجذع بالكامل ويريح أسفل الظهر.",
    "duration_seconds": 15
  },
  {
    "id": "move_029",
    "command_en": "Draw circles with your nose!",
    "command_ar": "ارسم دوائر بأنفك!",
    "description_ar": "تخيل أن أنفك قلم، وارسم 5 دوائر كبيرة في الهواء.",
    "say_while_moving": "Circle, circle. My neck is free.",
    "benefit_ar": "يحرر عضلات الرقبة من تيبس النظر للأسفل.",
    "duration_seconds": 10
  },
  {
    "id": "move_030",
    "command_en": "Freeze!",
    "command_ar": "تجمّد!",
    "description_ar": "تحرك بحرية 5 ثوان، ثم تجمد تماماً كالتمثال 5 ثوان. كرر 3 مرات.",
    "say_while_moving": "Freeze! I am a statue. Move! I am alive.",
    "benefit_ar": "يدرب التحكم الحركي والانتقال بين الحركة والسكون.",
    "duration_seconds": 30
  }
];

export interface WritingExercise {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  writing_prompt_ar: string;
  writing_prompt_en: string;
  expression_ar: string;
  duration_minutes: number;
}

export const WRITING_EXERCISES: WritingExercise[] = [
  {
    "id": "writing_001",
    "title_ar": "رسالة إلى نفسي بعد عام",
    "title_en": "A Letter to Myself in One Year",
    "description_ar": "اكتب رسالة لنفسك في المستقبل. ماذا تتمنى أن تكون قد تعلمت؟ ما هي أهدافك؟ احفظها واقرأها بعد عام.",
    "writing_prompt_ar": "عزيزي/عزيزتي [اسمك]، أتمنى أن تكون...",
    "writing_prompt_en": "Dear future [Your Name], I hope you are...",
    "expression_ar": "التعبير عن الأمل والطموح",
    "duration_minutes": 20
  },
  {
    "id": "writing_002",
    "title_ar": "أنا ممتن لـ...",
    "title_en": "I Am Grateful For...",
    "description_ar": "اكتب قائمة بـ 5 أشياء أنت ممتن لها اليوم. حاول أن تكون محدداً وتشرح سبب امتنانك وكيف تؤثر في حياتك اليومية وباقي تفاصيل نهارك.",
    "writing_prompt_ar": "أنا ممتن اليوم لـ [الشيء الأول] لأن...",
    "writing_prompt_en": "Today, I am grateful for [First thing] because...",
    "expression_ar": "التدرب على الامتنان والتقدير",
    "duration_minutes": 15
  },
  {
    "id": "writing_003",
    "title_ar": "خارطة مشاعري اليوم",
    "title_en": "My Emotions Map Today",
    "description_ar": "اختر 3 مشاعر تشعر بها الآن واصفاً إياها كأنها تضاريس طبيعية (مثل نبع جارٍ، جبل صامد، أو عاصفة عابرة تطهر الأرجاء).",
    "writing_prompt_ar": "أشعر اليوم بمزيج من المشاعر، أولها يشبه...",
    "writing_prompt_en": "Today I feel a mix of emotions, the first resembles...",
    "expression_ar": "الوعي الذاتي ووصف المشاعر",
    "duration_minutes": 15
  },
  {
    "id": "writing_004",
    "title_ar": "حوار مع مخاوفي",
    "title_en": "Dialogue with My Fears",
    "description_ar": "تخيل أن خوفك الأكبر هو شخص يجلس أمامك في مقعد وثيق. اكتب حواراً هادئاً وودياً معه لتفهم ما يحاول حمايتك منه في حقيقة أمره.",
    "writing_prompt_ar": "مرحباً يا خوفي، أعلم أنك جئت اليوم لـ...",
    "writing_prompt_en": "Hello my fear, I know you came today to...",
    "expression_ar": "فك شفرة القلق ومواجهة الذات",
    "duration_minutes": 25
  },
  {
    "id": "writing_005",
    "title_ar": "مذكرات الإنجازات الصغيرة",
    "title_en": "Journal of Small Wins",
    "description_ar": "دون 3 نجاحات صغيرة حققتها هذا الأسبوع، حتى لو كانت الاستيقاظ مبكراً أو مساعدة صديق برفق، واشرح أثرها الوجداني.",
    "writing_prompt_ar": "أفخر هذا الأسبوع بأني...",
    "writing_prompt_en": "This week, I am proud that I...",
    "expression_ar": "بناء الثقة بالنفس والتقدير",
    "duration_minutes": 10
  },
  {
    "id": "writing_006",
    "title_ar": "لو كنت مكانه",
    "title_en": "If I Were in Their Shoes",
    "description_ar": "اختر شخصاً اختلفت معه مؤخراً في الرأي. اكتب فقرة من وجهة نظره بالكامل تشرح دوافعه الحقيقية ومشاعره الدفينة.",
    "writing_prompt_ar": "لو نظرت للأمر من عينيه ومكانه، لشعرت بـ...",
    "writing_prompt_en": "If I looked at this through their eyes, I would feel...",
    "expression_ar": "تطوير التعاطف والذكاء الاجتماعي",
    "duration_minutes": 20
  },
  {
    "id": "writing_007",
    "title_ar": "رسالة مسامحة لنفسي",
    "title_en": "A Letter of Forgiveness to Myself",
    "description_ar": "فكر في خطأ قديم تلوم نفسك عليه على الدوام. اكتب رسالة تسامح فيها نفسك وتتقبل من خلالها أنك إنسان ينمو ويتعلم.",
    "writing_prompt_ar": "أنا أسامح نفسي اليوم بكل حب على...",
    "writing_prompt_en": "Today, I forgive myself with love for...",
    "expression_ar": "الشفقة بالذات والتسامح الداخلي",
    "duration_minutes": 15
  },
  {
    "id": "writing_008",
    "title_ar": "عاصفة العقل الخلاقة",
    "title_en": "Creative Mindstorm",
    "description_ar": "اغمض عينيك ثم اكتب كل الأفكار التي تخطر ببالك الآن دون توقف، حتى لو لم تكن مترابطة ومكتملة. استمر بالكتابة دون أي تصحيح قيادي.",
    "writing_prompt_ar": "تدور في عقلي الآن عاصفة من الأفكار، منها...",
    "writing_prompt_en": "Spinning in my mind right now is a storm of ideas, including...",
    "expression_ar": "تحرير العقل من التشتت والقيود",
    "duration_minutes": 10
  },
  {
    "id": "writing_009",
    "title_ar": "ماذا لو؟",
    "title_en": "What If?",
    "description_ar": "اكتب تصوراً لعالم خيالي مبهج تختفي منه كلمة 'مستحيل'. كيف ستبدو حياتك ومشاهد يومك وأحلامك؟",
    "writing_prompt_ar": "لو كان كل شيء ممكن في هذا الوجود، لبدأت يومي بـ...",
    "writing_prompt_en": "If everything were possible in this existence, I would start by...",
    "expression_ar": "تحفيز الخيال اللامحدود",
    "duration_minutes": 20
  },
  {
    "id": "writing_010",
    "title_ar": "رسالة تقدير غامضة لقائد ملهم",
    "title_en": "A Secret Appreciation to a Mentor",
    "description_ar": "اكتب رسالة شكر عميقة لشخص ألهمك أو غيّر مسار تفكيرك بحكمة وعمل (معلم، والد، أو صديق)، واشرح له بالتفصيل كيف أثّر بوجدانك.",
    "writing_prompt_ar": "أريد أن أشكرك بشدة بكلمات نابعة من القلب على اليوم الذي...",
    "writing_prompt_en": "I want to deeply thank you from my heart for the day that...",
    "expression_ar": "تثبيت الامتنان وتكريم العلاقات",
    "duration_minutes": 15
  },
  {
    "id": "writing_011",
    "title_ar": "وصف مشهد من نافذتي",
    "title_en": "Describing a Scene from My Window",
    "description_ar": "انظر من نافذتك أو تخيلها بوضوح. اكتب تفاصيل المشهد بدقة حسية بالغة: الألوان، حركة الناس المارة، شجو الطير، والأثر الوجداني للمشهد الصامت عليك.",
    "writing_prompt_ar": "من نافذتي اليوم، أرى الحياة تجري كأنها...",
    "writing_prompt_en": "From my window today, I see life moving as if...",
    "expression_ar": "اليقظة الذهنية والتركيز الحسي",
    "duration_minutes": 15
  },
  {
    "id": "writing_012",
    "title_ar": "قوتي الكامنة",
    "title_en": "My Inner Strength",
    "description_ar": "تذكر عاصفة وموقفاً صعباً مررت به وتغلبت عليه مسبقاً. ما هي الصفة أو القوة الكامنة بداخلك التي نصرتك ووجهتك لتجاوز ذلك بنجاح؟",
    "writing_prompt_ar": "القوة التي اكتشفتها في نفسي عندما واجهت ذلك الموقف هي...",
    "writing_prompt_en": "The strength I discovered in myself when I faced that obstacle was...",
    "expression_ar": "التفكير المرن واستدعاء القوة",
    "duration_minutes": 20
  },
  {
    "id": "writing_013",
    "title_ar": "يوميات فكرة طارئة",
    "title_en": "Diary of a Sudden Idea",
    "description_ar": "تخيل أن هناك فكرة صغيرة وذكية طرقت باب عقلك هذا المساء. عماذا تبحث هذه الفكرة؟ وما هو المشروع العظيم اللطيف الذي تريد بناؤه معك؟",
    "writing_prompt_ar": "الفكرة التي زارتني فجأة اليوم تهمس قائلة...",
    "writing_prompt_en": "The idea that suddenly visited me today whispers...",
    "expression_ar": "الابتكار وتحريك الأفكار الريادية",
    "duration_minutes": 15
  },
  {
    "id": "writing_014",
    "title_ar": "التغلب على التحديات",
    "title_en": "Overcoming Challenges",
    "description_ar": "اكتب عن تحدٍ كبير يواجهك الآن. قسمه إلى ثلاث خطوات صغيرة جداً قابلة للتنفيذ السريع والمباشر اليوم لتحويل القلق المتربص إلى عمل مثمر.",
    "writing_prompt_ar": "التحدي الذي أواجهه هو [التحدي]، وسأبدأ اليوم بـ...",
    "writing_prompt_en": "The challenge I face is [Challenge], and I will start today by...",
    "expression_ar": "مهارات حل المشكلات وتنظيم التفكير",
    "duration_minutes": 15
  },
  {
    "id": "writing_015",
    "title_ar": "رسالة حب لصفاتي المفضلة",
    "title_en": "A Love Letter to My Best Traits",
    "description_ar": "الكثير منا يمدح الآخرين وينسى نفسه. اكتب رسالة تقر فيها بأروع ثلاث صفات في شخصيتك وتفتخر بوجودها في خصالك الطيبة.",
    "writing_prompt_ar": "أنا أقدر بشدة في نفسي هذه الصفات لأنها تجعلني...",
    "writing_prompt_en": "I appreciate in myself these traits because they make me...",
    "expression_ar": "توثيق التقبل الإيجابي للذات",
    "duration_minutes": 15
  },
  {
    "id": "writing_016",
    "title_ar": "محادثة تخيلية مع شخصية حكيمة",
    "title_en": "Imaginary Chat with a Wise Mentor",
    "description_ar": "تخيل أنك تجلس مع شخص حكيم جداً (أو نسخة مسنة من نفسك في سن الثمانين). ما هي النصيحة التي سيسديها لك بخصوص قلقك الحالي؟",
    "writing_prompt_ar": "قال لي الحكيم بلطف وصوت دافئ ممتد...",
    "writing_prompt_en": "The wise mentor told me gently in a warm voice...",
    "expression_ar": "البصيرة وإيجاد الدعم العقلي",
    "duration_minutes": 20
  },
  {
    "id": "writing_017",
    "title_ar": "غرفتي السرية في عقلي",
    "title_en": "My Mind's Secret Safe Room",
    "description_ar": "صف مكاناً سرياً في مخبأ عقلك تصنعه لترضى وترتاح فيه عندما يصبح العالم صاخباً ومزعجاً. كيف يبدو أثاثه وإضاءته وهدوءه المصفى؟",
    "writing_prompt_ar": "غرفتي السرية في عقلي تقع خلف غيمة من السلام، وهناك أجد...",
    "writing_prompt_en": "My secret mind room lies behind a cloud of peace, and there I find...",
    "expression_ar": "التأمل الخلاق وتخفيف الضغوط",
    "duration_minutes": 15
  },
  {
    "id": "writing_018",
    "title_ar": "قبل أن ينام العالم",
    "title_en": "Before the World Falls Asleep",
    "description_ar": "اكتب عما تنوي تركه خلفك اليوم من جهد، تعب، أو مشاعر ثقيلة لتبدأ غداً بضمير مستريح ونفس منبسطة مطمئنة.",
    "writing_prompt_ar": "أستعد الليلة لأغمض عيني، وأترك خلفي كل...",
    "writing_prompt_en": "Tonight, I prepare to close my eyes, leaving behind all...",
    "expression_ar": "التصفية العاطفية والهدوء المسائي",
    "duration_minutes": 10
  },
  {
    "id": "writing_019",
    "title_ar": "تعريف شخصي للسعادة",
    "title_en": "My Definition of Happiness",
    "description_ar": "بالنسبة للكثيرين السعادة هي الشهرة أو تراكم المال. بالنسبة لك، ما هي السعادة المطلقة في تعريفها البسيط، الخالي من الزيف والملموس بالقلب؟",
    "writing_prompt_ar": "السعادة في نظري ليست لغزاً، بل هي لحظة بسيطة مثل...",
    "writing_prompt_en": "Happiness to me is not a puzzle, but a simple moment like...",
    "expression_ar": "إعادة ضبط القيم والأولويات",
    "duration_minutes": 15
  },
  {
    "id": "writing_020",
    "title_ar": "قصيدتي الأولى للسلام الداخلي",
    "title_en": "My First Poem for Inner Peace",
    "description_ar": "اكتب بضعة أسطر بنثر إيقاعي معبر يرقص مع حبك للحياة وثقتك التامة بأن الغد يحمل بين طياته السلام والمستقبل الوضاء والخير العميم.",
    "writing_prompt_ar": "سأمضي في طريقي والهدوء رفيقي، لأن قلبي...",
    "writing_prompt_en": "I will walk my path with calm as my companion, for my heart...",
    "expression_ar": "البلاغة الروحية والتأصيل التعبيري",
    "duration_minutes": 15
  }
];

export const getMovementIcon = (id: string) => {
  switch (id) {
    case 'move_001': case 'move_027': return '🐸';
    case 'move_002': case 'move_028': return '🌴';
    case 'move_003': case 'move_017': return '🧘';
    case 'move_004': case 'move_008': return '💃';
    case 'move_005': return '💂';
    case 'move_006': return '🤸';
    case 'move_007': return '🦅';
    case 'move_009': return '💨';
    case 'move_010': return '🐻';
    case 'move_011': return '👏';
    case 'move_012': return '🔄';
    case 'move_013': return '🏊';
    case 'move_014': return '🧩';
    case 'move_015': return '👐';
    case 'move_016': return '👁️';
    case 'move_018': return '🐘';
    case 'move_019': return '👣';
    case 'move_020': return '🤗';
    case 'move_021': return '🚊';
    case 'move_022': return '😜';
    case 'move_023': return '🚴';
    case 'move_024': return '🎈';
    case 'move_025': return '⭐';
    case 'move_026': return '🛶';
    case 'move_029': return '👃';
    case 'move_030': return '🥶';
    default: return '⚡';
  }
};

const getExerciseIcon = (id: string, size: number = 18) => {
  switch (id) {
    case 'focus_001':
      return <Smile size={size} className="text-teal-400" />;
    case 'focus_002':
      return <Smile size={size} className="text-emerald-400" />;
    case 'focus_003':
      return <Sparkles size={size} className="text-amber-400" />;
    case 'focus_004':
      return <Compass size={size} className="text-cyan-400" />;
    case 'focus_005':
      return <Heart size={size} className="text-rose-400" />;
    case 'focus_006':
      return <Wind size={size} className="text-sky-400" />;
    case 'focus_007':
      return <Flame size={size} className="text-orange-400" />;
    case 'focus_008':
      return <Cloud size={size} className="text-teal-300" />;
    case 'focus_009':
      return <Sparkles size={size} className="text-teal-400" />;
    case 'focus_010':
    case 'focus_011':
      return <Moon size={size} className="text-purple-400" />;
    case 'focus_012':
      return <Sun size={size} className="text-yellow-400" />;
    case 'focus_013':
      return <Compass size={size} className="text-blue-400" />;
    case 'focus_014':
      return <Award size={size} className="text-amber-500" />;
    case 'focus_015':
      return <Heart size={size} className="text-pink-400" />;
    case 'focus_016':
      return <Cloud size={size} className="text-indigo-400" />;
    case 'focus_017':
      return <Wind size={size} className="text-teal-200" />;
    case 'focus_018':
      return <Compass size={size} className="text-teal-500" />;
    case 'focus_019':
      return <Smile size={size} className="text-amber-300" />;
    case 'focus_020':
      return <Award size={size} className="text-emerald-500" />;
    default:
      return <Wind size={size} className="text-teal-400" />;
  }
};

interface BalanceOasisProps {
  isRtl?: boolean;
  onLessonCompleted?: (lessonId: string) => void;
  completedLessonIds?: Set<string>;
}

export const BalanceOasis: React.FC<BalanceOasisProps> = ({ 
  isRtl = true, 
  onLessonCompleted, 
  completedLessonIds = new Set() 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'calm' | 'move' | 'writing' | 'emotion' | 'communication'>('calm');

  // Active critical reflective writing states
  const [selectedWritingEx, setSelectedWritingEx] = useState<WritingExercise | null>(null);
  const [writingDraft, setWritingDraft] = useState<string>('');
  const [isWritingSpeechActive, setIsWritingSpeechActive] = useState<boolean>(false);
  const [completedWritingIds, setCompletedWritingIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_writing_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (selectedWritingEx) {
      const draft = localStorage.getItem(`balance_oasis_draft_${selectedWritingEx.id}`) || '';
      setWritingDraft(draft);
    } else {
      setWritingDraft('');
    }
    stopSpeech();
  }, [selectedWritingEx]);

  // Active emotional intelligence and tracking states
  const [selectedEmotionEx, setSelectedEmotionEx] = useState<EmotionExercise | null>(null);
  const [emotionStepsChecked, setEmotionStepsChecked] = useState<boolean[]>([]);
  const [completedEmotionIds, setCompletedEmotionIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_emotion_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Active communication and social intelligence states
  const [selectedCommEx, setSelectedCommEx] = useState<CommunicationExercise | null>(null);
  const [commStepsChecked, setCommStepsChecked] = useState<boolean[]>([]);
  const [completedCommIds, setCompletedCommIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_comm_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (selectedCommEx) {
      setCommStepsChecked(new Array(selectedCommEx.steps_ar.length).fill(false));
    } else {
      setCommStepsChecked([]);
    }
    stopSpeech();
  }, [selectedCommEx]);

  // Emotional thermometer tracking state
  const [currentSelectedFeeling, setCurrentSelectedFeeling] = useState<string>('serene');
  const [currentThermometerValue, setCurrentThermometerValue] = useState<number>(5);
  const [feelingReflectiveNote, setFeelingReflectiveNote] = useState<string>('');
  const [feelingLogs, setFeelingLogs] = useState<{
    id: string;
    timestamp: string;
    feeling: string;
    intensity: number;
    note: string;
  }[]>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_feeling_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (selectedEmotionEx) {
      setEmotionStepsChecked(new Array(selectedEmotionEx.steps_ar.length).fill(false));
    } else {
      setEmotionStepsChecked([]);
    }
    stopSpeech();
  }, [selectedEmotionEx]);

  const [selectedEx, setSelectedEx] = useState<FocusExercise | null>(null);
  const [meditationTime, setMeditationTime] = useState<number>(60); // 60s default
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [breathState, setBreathState] = useState<'inhale' | 'hold' | 'exhale' | 'wait'>('inhale');
  const [localCompletedIds, setLocalCompletedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Active movement states
  const [selectedMoveEx, setSelectedMoveEx] = useState<MovementExercise | null>(null);
  const [isMovePlaying, setIsMovePlaying] = useState<boolean>(false);
  const [moveTimeLeft, setMoveTimeLeft] = useState<number>(0);
  const [moveSpeechActive, setMoveSpeechActive] = useState<boolean>(false);
  const [completedMoveIds, setCompletedMoveIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_move_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechPlaybackActive, setSpeechPlaybackActive] = useState<boolean>(false);

  // Voice recording & AI smart encouragement states
  const [completionSession, setCompletionSession] = useState<{
    type: 'calm' | 'move' | 'writing' | 'emotion' | 'communication';
    id: string;
    title: string;
    duration: number;
  } | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedTranscript, setRecordedTranscript] = useState<string>('');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [aiEncouragementText, setAiEncouragementText] = useState<string>('');
  const [isSpeakingEncouragement, setIsSpeakingEncouragement] = useState<boolean>(false);
  
  // Audio context references and refs for recording
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<any | null>(null);
  const timerIntervalRef = useRef<any | null>(null);
  const moveTimerIntervalRef = useRef<any | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const speechRecognitionRef = useRef<any | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      try {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = isRtl ? 'ar-SA' : 'en-US';

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          
          const merged = finalTranscript || interimTranscript;
          if (merged) {
            setRecordedTranscript(merged);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition status/error:', e.error);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        speechRecognitionRef.current = recognition;
      } catch (err) {
        console.warn('SpeechRecognition initialization error:', err);
      }
    }
  }, [isRtl]);

  const startRecordingAudio = async () => {
    setRecordedTranscript('');
    setRecordedAudioUrl(null);
    setAiEncouragementText('');
    stopSpeech();

    // Start speech recognition
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.start();
      } catch (e) {
        console.warn('Speech Recognition restart issue:', e);
      }
    }

    // Start native media recorder
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        
        // Disable tracks to release user microphone
        stream.getTracks().forEach(track => track.stop());

        // Automatically form text-to-speech AI feedback
        triggerAiEncouragement();
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Microphone permission blocked or standard device unsupported. Simulating:', err);
      setIsRecording(true);
      
      // Sandbox fallback simulator to ensure it never breaks the browser tab
      setTimeout(() => {
        setRecordedTranscript(prev => prev || (isRtl ? 'أشعر بالهدوء والنشاط التام ومستعد للبرمجة بشغف!' : 'I feel focused, energized, and ready to learn AI coding!'));
      }, 3000);
    }
  };

  const stopRecordingAudio = () => {
    setIsRecording(false);
    
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    } else {
      triggerAiEncouragement();
    }
  };

  const AR_WRITING_RESPONSES = [
    "يا له من تعبير رائع وقلم صادق متميز! تدوين مشاعرك وأفكارك يمنحك بصيرة استثنائية وقدرة على فهم وجدانك بعمق. واصل هذه الرحلة الملهمة لتطوير ذكائك العاطفي والتألق دوماً! ✍️🌸",
    "كتابتك اليوم هي خطوة عظيمة نحو التصالح الذاتي والسلام الداخلي. لقد عبرت بصدق ووضوح؛ شجاعتك في تدوين أحاسيسك تدل على نضج وجداني استثنائي. دمت مبدعاً ومشرقاً! ✨🎨",
    "مدهش! إن استخدام الكلمات لتفريغ المشاهِر والأفكار هو أداة العظماء للتفكير والنمو الروحي. لقد خط قلمك اليوم حروفاً تملؤها الحكمة والوعي الوجداني. فخور جداً بجميل تعبيرك! 📝💖",
    "رائع جداً! ممارسة تدوين خواطرك الإبداعية يرتب ذهنك ويمنح قلبك السكينة المطلقة والصفاء اللازم للإنجاز. لقد أنجزت تمرين الكتابة ببراعة تامة، استمتع بسلامك الداخلي الآن! 🧘‍♂️🌱"
  ];

  const EN_WRITING_RESPONSES = [
    "What beautiful self-reflection and authentic expression! Putting your core emotions and thoughts into words builds deep emotional resilience and absolute mental clarity. Keep shining bright! ✍️🌟",
    "Your writing today is a powerful step towards mindfulness and inner peace. Your courage to document your hopes and navigate your worries shows amazing clarity. You are spectacular! ✨💖",
    "Incredible exploration! Reflective writing is the ultimate tool for thinking and emotional intelligence. You've crafted a beautiful space of emotional wisdom today. So proud of you! 📝🌈",
    "Outstanding work! Journaling and unleashing your creative voice brings deep focus, centering your mind perfectly for both high learning and deep comfort. Keep cultivating this beautiful habit! 🧘‍♀️🌱"
  ];

  const AR_CALM_RESPONSES = [
    "يا لك من مبدع حقيقي! هدوءك الفريد وتركيزك الرائع في هذا النفس هما حجر الأساس لتكون مبرمجاً متميزاً قادراً على صياغة أذكى الحلول التقنية. فخور بك للغاية! 🧘✨",
    "أحسنت الاسترخاء! تهيئة ذهنك هكذا تمنح الذاكرة قصيرة المدى المتسع الكافي لتنظيم العمليات البرمجية بصفاء تام وسرعة استيعاب مذهلة! 💡🌸",
    "حضور ذهني مذهل! صفاؤك وتوازنك هما سلاحك الأقوى لمواجهة شاشات الأكواد وحل المسائل البرمجية بكل يسر وسهولة. مبارك لك هذا الانتعاش العقلي! 🌟🧠",
    "نفس عميق وعقل يَقِظ! أنت تثبت لنفسك أن المبرمج الأنيق هو من يبدأ بتهدئة طاقته قبل التغلب على التحديات اللوجستية والبرمجية الشائكة. رائع جداً! ✊🌊"
  ];

  const AR_MOVE_RESPONSES = [
    "حركة رشيقة ونشاط متجدد! التخلص من تيبس الشاشة وتدفق الدورة الدموية هما من يوقظان خلايا الإبداع والتركيز بداخلك لكتابة أكواد مذهلة اليوم. كفو يا بطل! 🏃⚡",
    "مهارة حركية ممتازة! تمددك وتنشيط عضلاتك هو توازنك الحقيقي وصحتك الغالية التي تضمن لك إتقان أصعب الدروس البرمجية بكل همة وطاقة متجددة. فخورون بك! 💪🔥",
    "تحدي حركي رائع وبث رائع للحيوية! تذكر دائماً أن أعظم المبرمجين هم أصحاب الأجساد النشيطة والقلوب المنفتحة. استمر بهذا الشغف والمرح العائلي الفريد! 🎉❤️",
    "أحسنت التنشيط والتفاعل الذكي! لقد نبذت الخمول تماماً ونشطت دورتك الدموية لتكون مستعداً لاستيعاب دروس الذكاء الاصطناعي بكل سرور وارتياح! 🚀🌟"
  ];

  const AR_KEYWORD_MATCHES: Record<string, string> = {
    'تعب': "لقد رصدت بكلماتك اللطيفة بعض التعب والإرهاق. لا بأس يا صديقي، الفاصل الحركي والتنفس كفيلان بإعادة شحن بطاريتك الآن لتنطلق بابتسامة متجددة! 🔋✨",
    'صعب': "البرمجة والرياضيات قد تبدو شائكة في البداية، لكن بتركيزك اليوم وسكينتك الحالية، ستجد الحلول تتجلى في ذهنك بسهولة فائقة، خطوة بخطوة ستصل للقمة! 🏔️🧠",
    'سعيد': "سعادتك وطاقتك الإيجابية تبهج قلوبنا! شارك هذا اللطف اليوم مع عائلتك واستخدم هذا التدفق الحماسي في برمجة مشروع خلاق ورائع! ✨💻",
    'سهل': "رائع أن ترى العلم سهلاً وممتعاً! ثقتك بنفسك ومرونة تفكيرك هما البداية لابتكار تطبيقات مذهلة ومشاريع تخدم العالم بكفاءة. أحسنت! 🚀💡",
    'نشط': "نشاطك وطاقتك الوفيرة هما وقود الإبداع الحقيقي! استثمر هذه الحماسة العالية في كتابة أذكى السطور البرمجية والحلول الإبداعية الآن! ⚡🔥"
  };

  const EN_CALM_RESPONSES = [
    "Brilliant focus! Your tranquility and peaceful mind are the best foundations for coding excellence. Clearing your mind is the secret technique of genius programmers. Extremely proud of you! 🧘✨",
    "Well done! Pausing and centering yourself allows your working memory to organize logical concepts smoothly. You are fully ready for your next programming adventure! 🧠💡",
    "Amazing discipline! Choosing silence and deep breathing balances your focus. This mental clarity will make subsequent programming tasks feel like pure interactive play! 🌟🌊"
  ];

  const EN_MOVE_RESPONSES = [
    "Fantastic physical activation! Shaking off screen stiffness increases oxygenated flow to your brain, unlocking deep problem-solving skills and absolute creativity. You are a champ! 🏃⚡",
    "Superb motion play! Keeping your body active and coordinated keeps you healthy, smiling, and performing at your ultimate coding potential. Keep that bright energy glowing! 💪🔥",
    "Incredible dynamic break! Transitioning from screen learning to active body coordination flushes away fatigue, rendering your neural pathways highly receptive for complex AI skills! 🚀🌟"
  ];

  const AR_COMM_RESPONSES = [
    "يا لك من ممارس اجتماعي رائع! التواصل الصادق وبناء جسور الفهم مع الآخرين والإنصات بعمق هو أساس الوعي والذكاء الاجتماعي الراقي. استمر في نشر الإيجابية! 💬✨",
    "تطبيق متميز لمهارات التواصل الإيجابي! إن التعبير عن النفس بلطف والإنصات الفعال يبني علاقات أسرية واجتماعية متينة وقوية. فخورون بجهدك الراقي! 🤝🌟",
    "رائع جداً! قدرتك على ضبط الحديث وتحويل الخلافات إلى تفاهم بناء يبني وعياً عاطفياً وسلوكياً مميزاً وثقة فائقة بالذات. أحسنت صنعاً! 🗣️💖"
  ];

  const EN_COMM_RESPONSES = [
    "What a wonderful social practitioner! Sincere communication, deep listening, and building bridges of understanding build high-level social intelligence. Keep shining! 💬✨",
    "Outstanding application of positive communication! Expressing yourself with gentle clarity and active listening cultivates unbreakable family and social bonds. Proud of your amazing efforts! 🤝🌟",
    "Fantastic! Your ability to regulate conversations and turn disagreements into constructive understanding builds incredible emotional maturity and high confidence. Well done! 🗣️💖"
  ];

  const triggerAiEncouragement = () => {
    let textToSpeak = '';
    const textLower = (recordedTranscript || '').toLowerCase();

    if (completionSession?.type === 'writing') {
      if (isRtl) {
        const rand = Math.floor(Math.random() * AR_WRITING_RESPONSES.length);
        textToSpeak = AR_WRITING_RESPONSES[rand];
      } else {
        const rand = Math.floor(Math.random() * EN_WRITING_RESPONSES.length);
        textToSpeak = EN_WRITING_RESPONSES[rand];
      }
    } else if (completionSession?.type === 'calm') {
      if (isRtl) {
        const key = Object.keys(AR_KEYWORD_MATCHES).find(k => textLower.includes(k));
        if (key) {
          textToSpeak = AR_KEYWORD_MATCHES[key];
        } else {
          const rand = Math.floor(Math.random() * AR_CALM_RESPONSES.length);
          textToSpeak = AR_CALM_RESPONSES[rand];
        }
      } else {
        const rand = Math.floor(Math.random() * EN_CALM_RESPONSES.length);
        textToSpeak = EN_CALM_RESPONSES[rand];
      }
    } else if (completionSession?.type === 'communication') {
      if (isRtl) {
        const rand = Math.floor(Math.random() * AR_COMM_RESPONSES.length);
        textToSpeak = AR_COMM_RESPONSES[rand];
      } else {
        const rand = Math.floor(Math.random() * EN_COMM_RESPONSES.length);
        textToSpeak = EN_COMM_RESPONSES[rand];
      }
    } else {
      if (isRtl) {
        const key = Object.keys(AR_KEYWORD_MATCHES).find(k => textLower.includes(k));
        if (key) {
          textToSpeak = AR_KEYWORD_MATCHES[key];
        } else {
          const rand = Math.floor(Math.random() * AR_MOVE_RESPONSES.length);
          textToSpeak = AR_MOVE_RESPONSES[rand];
        }
      } else {
        const rand = Math.floor(Math.random() * EN_MOVE_RESPONSES.length);
        textToSpeak = EN_MOVE_RESPONSES[rand];
      }
    }

    setAiEncouragementText(textToSpeak);
    speakAiEncouragementLoud(textToSpeak);
  };

  const speakAiEncouragementLoud = (speechText: string) => {
    if (!speechText) return;
    try {
      window.speechSynthesis.cancel();
      const filteredText = speechText.replace(/[\u2600-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '');
      const utterance = new SpeechSynthesisUtterance(filteredText);
      utterance.lang = isRtl ? 'ar-SA' : 'en-US';
      utterance.rate = isRtl ? 0.94 : 0.98;
      utterance.pitch = 1.12;

      utterance.onstart = () => {
        setIsSpeakingEncouragement(true);
      };
      utterance.onend = () => {
        setIsSpeakingEncouragement(false);
      };
      utterance.onerror = () => {
        setIsSpeakingEncouragement(false);
      };

      currentUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("AI Encouragement speech system failure:", e);
    }
  };

  const closeCompletionSession = () => {
    setCompletionSession(null);
    setRecordedTranscript('');
    setRecordedAudioUrl(null);
    setAiEncouragementText('');
    setIsRecording(false);
    stopSpeech();
  };

  // Sync completion states
  useEffect(() => {
    if (completedLessonIds.size > 0) {
      const newCalm = new Set<string>();
      const newMove = new Set<string>();

      completedLessonIds.forEach(id => {
        if (id.startsWith('focus_')) {
          newCalm.add(id);
        } else if (id.startsWith('move_')) {
          newMove.add(id);
        }
      });

      if (newCalm.size > 0) {
        setLocalCompletedIds(prev => new Set([...Array.from(prev), ...Array.from(newCalm)]));
      }
      if (newMove.size > 0) {
        setCompletedMoveIds(prev => new Set([...Array.from(prev), ...Array.from(newMove)]));
      }
    }
  }, [completedLessonIds]);

  // Handle breathing sequence animations based on 4-second intervals
  useEffect(() => {
    if (!isPlaying) return;

    let subSecondCount = 0;
    const interval = setInterval(() => {
      subSecondCount = (subSecondCount + 1) % 16;
      if (subSecondCount < 4) {
        setBreathState('inhale');
      } else if (subSecondCount < 8) {
        setBreathState('hold');
      } else if (subSecondCount < 12) {
        setBreathState('exhale');
      } else {
        setBreathState('wait');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Synthesize soft ambient sound
  const playSereneFreq = (freq: number, duration: number, type: 'sine' | 'triangle' = 'sine') => {
    try {
      if (!soundEnabled) return;
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error("Audio Synthesis error", e);
    }
  };

  // Play serene background hum
  useEffect(() => {
    if (isPlaying && soundEnabled) {
      // Play healing 432Hz baseline immediately
      playSereneFreq(432, 5, 'triangle');

      // Synthesize periodic pure sine-wave pulses
      synthIntervalRef.current = setInterval(() => {
        playSereneFreq(432, 4, 'sine');
      }, 5000);
    } else {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
    }

    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    };
  }, [isPlaying, soundEnabled]);

  // Main session progress timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isPlaying, timeLeft]);

  // Movement countdown effect
  useEffect(() => {
    if (isMovePlaying && moveTimeLeft > 0) {
      moveTimerIntervalRef.current = setInterval(() => {
        setMoveTimeLeft((prev) => {
          if (prev <= 1) {
            handleMoveSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (moveTimerIntervalRef.current) {
        clearInterval(moveTimerIntervalRef.current);
        moveTimerIntervalRef.current = null;
      }
    }

    return () => {
      if (moveTimerIntervalRef.current) clearInterval(moveTimerIntervalRef.current);
    };
  }, [isMovePlaying, moveTimeLeft]);

  const handleStartMoveSession = (ex: MovementExercise) => {
    setSelectedMoveEx(ex);
    setMoveTimeLeft(ex.duration_seconds);
    setIsMovePlaying(true);
    setMoveSpeechActive(false);

    // Play happy higher-frequency chime
    setTimeout(() => {
      playSereneFreq(528, 0.8, 'sine');
      setTimeout(() => playSereneFreq(659, 0.8, 'triangle'), 150);
    }, 150);
  };

  const handleStopMoveSession = () => {
    setIsMovePlaying(false);
    if (moveTimerIntervalRef.current) clearInterval(moveTimerIntervalRef.current);
    stopSpeech();
  };

  const handleMoveSessionComplete = () => {
    setIsMovePlaying(false);
    if (moveTimerIntervalRef.current) clearInterval(moveTimerIntervalRef.current);

    // Play sweet victory triple chime
    playSereneFreq(528, 1.5, 'sine');
    setTimeout(() => playSereneFreq(659, 1.2, 'sine'), 200);
    setTimeout(() => playSereneFreq(784, 1.5, 'sine'), 400);

    const completedId = selectedMoveEx?.id;
    if (completedId) {
      const updated = new Set(completedMoveIds);
      updated.add(completedId);
      setCompletedMoveIds(updated);
      try {
        localStorage.setItem('balance_oasis_move_completed', JSON.stringify(Array.from(updated)));
      } catch (e) {
        console.error(e);
      }

      if (onLessonCompleted) {
        onLessonCompleted(completedId);
      }

      // Enter speech recorder & AI praise completion system view!
      if (selectedMoveEx) {
        setCompletionSession({
          type: 'move',
          id: selectedMoveEx.id,
          title: isRtl ? selectedMoveEx.command_ar : selectedMoveEx.command_en,
          duration: selectedMoveEx.duration_seconds
        });
      }
    }
  };

  const speakMoveTranscript = () => {
    if (!selectedMoveEx) return;
    try {
      window.speechSynthesis.cancel();
      // Speak the prompt energetic phrases
      const speechText = isRtl 
        ? `${selectedMoveEx.command_ar}. الطريقة والمهمة: ${selectedMoveEx.description_ar}. ردد بصوت عالٍ: ${selectedMoveEx.say_while_moving}`
        : `${selectedMoveEx.command_en}. Instuctions: ${selectedMoveEx.description_ar}. Say with pride: ${selectedMoveEx.say_while_moving}`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = isRtl ? 'ar-SA' : 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.1;

      utterance.onend = () => {
        setMoveSpeechActive(false);
      };

      currentUtteranceRef.current = utterance;
      setMoveSpeechActive(true);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech Synthesis issue", e);
    }
  };

  const handleStartSession = (ex: FocusExercise) => {
    setSelectedEx(ex);
    setTimeLeft(meditationTime);
    setIsPlaying(true);
    setBreathState('inhale');
    setSpeechPlaybackActive(false);

    // Play serene start bell
    setTimeout(() => {
      playSereneFreq(528, 3, 'sine'); // Solfeggio 528Hz Transformation frequency
    }, 200);
  };

  const handleStopSession = () => {
    setIsPlaying(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    stopSpeech();
  };

  const handleSessionComplete = () => {
    setIsPlaying(false);
    if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    
    // Play sweet chime
    playSereneFreq(528, 3, 'sine');
    setTimeout(() => playSereneFreq(659, 2, 'sine'), 400);

    const completedId = selectedEx?.id;
    if (completedId) {
      const updated = new Set(localCompletedIds);
      updated.add(completedId);
      setLocalCompletedIds(updated);
      try {
        localStorage.setItem('balance_oasis_completed', JSON.stringify(Array.from(updated)));
      } catch (e) {
        console.error(e);
      }

      // Bubble up completed lesson to parent state / DB
      if (onLessonCompleted) {
        onLessonCompleted(completedId);
      }

      // Enter speech recorder & AI praise completion system view!
      if (selectedEx) {
        setCompletionSession({
          type: 'calm',
          id: selectedEx.id,
          title: isRtl ? selectedEx.title_ar : selectedEx.title_en,
          duration: meditationTime
        });
      }
    }
  };

  const speakTranscript = () => {
    if (!selectedEx) return;
    try {
      window.speechSynthesis.cancel();
      const textToSpeak = isRtl ? selectedEx.script_ar : selectedEx.script_en;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Auto select matching language locale
      utterance.lang = isRtl ? 'ar-SA' : 'en-US';
      utterance.rate = 0.82; // Calm, meditative pace
      utterance.pitch = 1.05;

      utterance.onend = () => {
        setSpeechPlaybackActive(false);
      };

      currentUtteranceRef.current = utterance;
      setSpeechPlaybackActive(true);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech Synthesis is unsupported or locked", e);
    }
  };

  const stopSpeech = () => {
    try {
      window.speechSynthesis.cancel();
      setSpeechPlaybackActive(false);
      setMoveSpeechActive(false);
    } catch {}
  };

  // Safe sound trigger to avoid browser autoplay policy limits
  const enableSoundManually = () => {
    setSoundEnabled(true);
    playSereneFreq(432, 0.5, 'sine');
  };

  const completedCount = localCompletedIds.size;
  const completedMoveCount = completedMoveIds.size;
  const completedWritingCount = completedWritingIds.size;
  const completedEmotionCount = completedEmotionIds.size;
  const completedCommCount = completedCommIds.size;
  const totalCompleted = completedCount + completedMoveCount + completedWritingCount + completedEmotionCount + completedCommCount;
  const totalAvailable = EXERCISES.length + MOVEMENT_EXERCISES.length + WRITING_EXERCISES.length + EMOTION_EXERCISES.length + COMMUNICATION_EXERCISES.length;
  const progressPercent = totalAvailable > 0 ? Math.round((totalCompleted / totalAvailable) * 100) : 0;

  return (
    <div className="w-full text-right space-y-8" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 1. Header Banner */}
      <div className="relative bg-gradient-to-r from-teal-950/40 via-[#0a1628]/80 to-teal-950/40 border border-teal-500/20 rounded-[2.5rem] p-8 md:p-10 overflow-hidden text-right shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] opacity-40 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Compass size={12} className="text-teal-400" />
              {isRtl ? 'واحة التوازن والسكينة الأسرية' : 'Mindfulness & Oasis of Calm'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {isRtl ? 'بناء مساحات الهدوء والتركيز الفعال 🌊' : 'Spaces of Calm & Effective Focus 🌊'}
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {isRtl 
                ? 'مساحة مخصصة لتمكين الأطفال والآباء من جني ثمار التوازن الذهني والنشاط الجسدي الموجه قبل البدء في رحلة التعلم. اختر بين تمارين السكينة والتركيز الهدوء، أو ألعاب الحركة وتنبيه الجسد.' 
                : 'A dedicated sanctuary for students and families to find dynamic balance. Cultivate mindfulness with deep, steady focus sessions, or shake off screen stiffness with active coordinate movement breaks.'}
            </p>
          </div>

          {/* Progress Widget */}
          <div className="bg-[#050c18] border border-white/5 rounded-2xl p-5 w-full md:w-64 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold">{isRtl ? 'إجمالي الإنجاز بالواحة:' : 'Oasis Progress:'}</span>
              <span className="text-teal-400 font-black font-mono tracking-tight">{totalCompleted} / {totalAvailable}</span>
            </div>
            
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden block">
              <div 
                className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>{isRtl ? 'مؤشر التوازن الكلي' : 'Total Balance Index'}</span>
              <span className="text-emerald-300 font-bold">{progressPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-Tab Selector */}
      {!isPlaying && !isMovePlaying && !completionSession && (
        <div className="grid grid-cols-2 md:flex bg-[#050b14] p-1 rounded-2xl border border-white/5 max-w-4xl mx-auto shadow-xl gap-1">
          <button
            onClick={() => {
              setActiveSubTab('calm');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'calm'
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-slate-950 font-black shadow-lg shadow-teal-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>🧘</span>
            {isRtl ? 'التركيز والسكينة' : 'Focus & Serenity'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('move');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'move'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>⚡</span>
            {isRtl ? 'التنشيط والحركة' : 'Break & Movement'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('writing');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'writing'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-slate-950 font-black shadow-lg shadow-purple-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>✍️</span>
            {isRtl ? 'دفتر التفكير الصامت' : 'Reflective Notepad'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('emotion');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'emotion'
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-black shadow-lg shadow-emerald-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>💎</span>
            {isRtl ? 'الذكاء الوجداني' : 'Emotional Intelligence'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('communication');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 col-span-2 md:col-span-1 ${
              activeSubTab === 'communication'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-blue-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>💬</span>
            {isRtl ? 'التواصل الإيجابي والذكاء الاجتماعي' : 'Positive Communication'}
          </button>
        </div>
      )}

      {/* 3. Interactive Meditation Player / Active Session Screen */}
      <AnimatePresence mode="wait">
        {completionSession ? (
          <motion.div
            key="completion-celebration"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-[#040a15] border border-teal-500/20 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Sparkles */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <div className="absolute top-10 left-10 w-2 h-2 bg-teal-400 rounded-full animate-ping" />
              <div className="absolute bottom-20 right-10 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-8 flex flex-col items-center">
              {/* Top Celebration Badge */}
              <div className="text-center space-y-2">
                <span className="text-4xl">🏆</span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mt-2">
                  {isRtl ? 'تهانينا! لقد أنجزت التمرين بنجاح 🌟' : 'Superb! Exercise Completed Successfully 🌟'}
                </h3>
                <p className="text-slate-400 text-xs md:text-sm">
                  {isRtl 
                    ? `لقد أمضيت وقتاً رائعاً في تمرين: ${completionSession.title}`
                    : `You spent quality time on exercise: ${completionSession.title}`}
                </p>
              </div>

              {/* Main Recording Grid Container */}
              <div className="w-full bg-[#050c18] border border-white/5 rounded-2xl p-6 space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full inline-block">
                    🎙️ {isRtl ? 'واحة التسجيل الصوتي والتحفيظ اللفظي' : 'Voice Reflection & Speech Mantra'}
                  </span>
                  <h4 className="text-sm md:text-base font-black text-white">
                    {isRtl 
                      ? 'سجل كلامك أو شعورك الآن، وسيقوم الذكاء الاصطناعي بمكافأتك بكلمات دافئة!' 
                      : 'Record your words or feelings, and the AI will support you with kind spoken guidance!'}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
                    {isRtl 
                      ? 'اضغط على زر الميكروفون للتحدث وتسجيل تأملك أو كلمة التشجيع اليوم.' 
                      : 'Click the microphone button, allow browser mic, and speak your mind now.'}
                  </p>
                </div>

                {/* Recorder Control Button & Visualizer */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  <button
                    onClick={isRecording ? stopRecordingAudio : startRecordingAudio}
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
                      isRecording 
                        ? 'bg-rose-500 text-white border-4 border-rose-300 animate-pulse' 
                        : 'bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 hover:scale-105 hover:shadow-teal-500/10'
                    }`}
                  >
                    {isRecording ? (
                      <span className="text-3xl">⏹️</span>
                    ) : (
                      <span className="text-3xl">🎙️</span>
                    )}

                    {/* Infinite ripples around recording */}
                    {isRecording && (
                      <span className="absolute inset-0 rounded-full border border-rose-500 animate-ping opacity-75" />
                    )}
                  </button>

                  <span className="text-xs font-bold font-mono text-slate-300">
                    {isRecording 
                      ? (isRtl ? '🔴 جاري الاستماع ورصد صوتك...' : '🔴 Listening actively to your voice...') 
                      : (isRtl ? 'اضغط للبدء' : 'Press to Speak')}
                  </span>

                  {/* Equalizer Wave simulation using simple stagger motion wrappers */}
                  {isRecording && (
                    <div className="flex justify-center items-center gap-1.5 h-10 mt-2">
                      {[0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 0.4].map((delay, idx) => (
                        <motion.div
                          key={idx}
                          animate={{ height: [12, 38, 12] }}
                          transition={{ repeat: Infinity, duration: 1.1, delay: delay }}
                          className="w-1.5 bg-rose-400 rounded-full"
                          style={{ height: '16px' }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Display Transcript */}
                {recordedTranscript && (
                  <div className="bg-slate-950/80 border border-white/5 p-4 rounded-xl text-center space-y-2">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{isRtl ? 'كلامك المسجل:' : 'Your Recorded Speech:'}</p>
                    <p className="text-white text-sm italic font-medium">"{recordedTranscript}"</p>
                    
                    {recordedAudioUrl && (
                      <div className="flex justify-center pt-2">
                        <audio src={recordedAudioUrl} controls className="h-8 max-w-xs rounded-lg opacity-85" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* AI Intelligent Encouragement Card */}
              {aiEncouragementText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full bg-gradient-to-br from-teal-950/40 via-slate-950 to-[#03060c] border border-teal-500/30 rounded-2xl p-6 space-y-4 text-center shadow-lg"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl animate-bounce">🤖</span>
                    <h4 className="text-xs font-black text-teal-400 uppercase tracking-widest">{isRtl ? 'تشجيع الذكاء الاصطناعي اللطيف' : 'Soft AI Encouragement'}</h4>
                    {isSpeakingEncouragement && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </div>

                  <p className="text-white text-sm md:text-base leading-relaxed font-black tracking-wide bg-teal-950/15 border border-white/5 p-4 rounded-xl">
                    {aiEncouragementText}
                  </p>

                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => speakAiEncouragementLoud(aiEncouragementText)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
                        isSpeakingEncouragement 
                          ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      <span>🔊</span>
                      {isSpeakingEncouragement 
                        ? (isRtl ? 'المساعد يتحدث الآن...' : 'AI Speaking is live...') 
                        : (isRtl ? 'إعادة نطق التشجيع بصوت الذكاء 🎙️' : 'Speak / Re-play Encouragement 🎙️')}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Action Toolbar to exit back to Oasis */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={closeCompletionSession}
                  className="bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-teal-500/20 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  {isRtl ? 'العودة لساحة التمارين واستكمال التعلم 🎯' : 'Return to Oasis & Code 🎯'}
                </button>
              </div>
            </div>
          </motion.div>
        ) : isPlaying && selectedEx ? (
          <motion.div 
            key="calm-player"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-[#040a15] border border-teal-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center"
          >
            {/* Meditative floating background sparkles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-10 left-10 w-2 h-2 bg-teal-400 rounded-full animate-ping" />
              <div className="absolute bottom-20 right-10 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8 flex flex-col items-center">
              
              {/* Toolbar */}
              <div className="w-full flex justify-between items-center border-b border-white/5 pb-4">
                <button 
                  onClick={handleStopSession}
                  className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <ChevronRight size={14} className={isRtl ? "" : "rotate-180"} />
                  {isRtl ? 'العودة للواحة' : 'Exit Session'}
                </button>

                <div className="flex items-center gap-2">
                  {/* Sound Trigger */}
                  <button 
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`p-2 rounded-xl border transition ${
                      soundEnabled ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' : 'bg-white/5 border-white/5 text-slate-500'
                    }`}
                    title={isRtl ? 'صوت التردد الهادئ' : 'Ambient Tone hum'}
                  >
                    {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>

                  <span className="text-xs bg-[#0b1329] border border-white/5 px-3 py-1.5 rounded-xl text-slate-300 font-bold flex items-center gap-1.5 font-mono">
                    <Timer size={13} className="text-teal-400 animate-pulse" />
                    {timeLeft}s {isRtl ? 'متبقية' : 'left'}
                  </span>
                </div>
              </div>

              {/* Breathing Coach Visualization Circle */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                
                {/* Outermost breathing pulse backdrops */}
                <motion.div 
                  animate={{ 
                    scale: breathState === 'inhale' ? 1.4 : breathState === 'hold' ? 1.4 : breathState === 'exhale' ? 0.9 : 0.9,
                    opacity: breathState === 'inhale' ? 0.22 : breathState === 'hold' ? 0.35 : breathState === 'exhale' ? 0.08 : 0.04
                  }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                  className="absolute inset-0 bg-teal-500 rounded-full blur-2xl"
                />

                <motion.div 
                  animate={{ 
                    scale: breathState === 'inhale' ? 1.25 : breathState === 'hold' ? 1.25 : breathState === 'exhale' ? 0.95 : 0.95,
                  }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                  className="absolute w-52 h-52 bg-gradient-to-br from-teal-500/10 to-emerald-500/20 rounded-full border border-teal-500/20 flex items-center justify-center"
                />

                {/* Inner solid coaching token with label */}
                <motion.div 
                  animate={{ 
                    scale: breathState === 'inhale' ? 1.1 : breathState === 'hold' ? 1.1 : breathState === 'exhale' ? 0.85 : 0.85
                  }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                  className="w-36 h-36 rounded-full bg-slate-950 border-2 border-teal-400 flex flex-col items-center justify-center z-10 shadow-lg text-center p-3"
                >
                  {getExerciseIcon(selectedEx.id, 28)}
                  <span className="text-base font-black text-white tracking-widest uppercase animate-fade-in mt-1">
                    {breathState === 'inhale' && (isRtl ? 'شهــيق 🌊' : 'Inhale 🌊')}
                    {breathState === 'hold' && (isRtl ? 'احبـــس 🔐' : 'Hold 🔐')}
                    {breathState === 'exhale' && (isRtl ? 'زفــير 🍃' : 'Exhale 🍃')}
                    {breathState === 'wait' && (isRtl ? 'انتـظر ✨' : 'Wait ✨')}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">4 {isRtl ? 'ثوان' : 'seconds'}</span>
                </motion.div>
              </div>

              {/* Title & Exercise script */}
              <div className="space-y-4 max-w-xl text-center">
                <h3 className="text-2xl font-black text-white flex items-center justify-center gap-2">
                  {getExerciseIcon(selectedEx.id, 24)}
                  {isRtl ? selectedEx.title_ar : selectedEx.title_en}
                </h3>
                
                {/* Ambient display box for script */}
                <div className="bg-slate-950/80 border border-white/5 p-6 rounded-2xl text-slate-300 text-sm md:text-base leading-relaxed tracking-wide shadow-inner text-center">
                  <p className="animate-pulse">{isRtl ? selectedEx.script_ar : selectedEx.script_en}</p>
                </div>

                {/* Audio Reader & Assistive Guidance */}
                <div className="flex gap-2 justify-center items-center">
                  <button 
                    onClick={speechPlaybackActive ? stopSpeech : speakTranscript}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      speechPlaybackActive 
                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <span>🔊</span>
                    {speechPlaybackActive 
                      ? (isRtl ? 'إيقاف قارئ الصوت' : 'Stop Audio Voice') 
                      : (isRtl ? 'قراءة النص بصوت المساعد 🎙️' : 'Read Aloud with Coach 🎙️')}
                  </button>

                  <button 
                    onClick={handleSessionComplete}
                    className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition shadow-lg shadow-teal-500/20"
                  >
                    {isRtl ? 'أنهيت التركيز بنجاح! ✓' : 'Focus Complete! ✓'}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        ) : isMovePlaying && selectedMoveEx ? (
          <motion.div 
            key="movement-player"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-[#040812] border border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center"
          >
            {/* Ambient energetic sparks */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-10 left-10 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
              <div className="absolute bottom-20 right-10 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8 flex flex-col items-center">
              
              {/* Toolbar */}
              <div className="w-full flex justify-between items-center border-b border-white/5 pb-4">
                <button 
                  onClick={handleStopMoveSession}
                  className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <ChevronRight size={14} className={isRtl ? "" : "rotate-180"} />
                  {isRtl ? 'العودة للواحة' : 'Exit Session'}
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl text-amber-400 font-bold flex items-center gap-1.5 font-mono animate-pulse">
                    <Timer size={13} />
                    {moveTimeLeft}s {isRtl ? 'متبقية' : 'left'}
                  </span>
                </div>
              </div>

              {/* Rhythmic Spinning Circle representing movement */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                
                {/* Outermost ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute inset-2 border-2 border-dashed border-amber-500/20 rounded-full"
                />

                {/* Pulsing body shield */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.12, 1],
                    opacity: [0.15, 0.3, 0.15]
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute w-52 h-52 bg-amber-500/10 rounded-full blur-xl"
                />

                {/* Inner central content token */}
                <div className="w-40 h-40 rounded-full bg-slate-950 border-2 border-amber-400 flex flex-col items-center justify-center z-10 shadow-lg text-center p-4">
                  <span className="text-5xl mb-2">{getMovementIcon(selectedMoveEx.id)}</span>
                  <span className="text-2xl font-black font-mono text-white tracking-widest leading-none">{moveTimeLeft}s</span>
                  <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{isRtl ? 'ثوان نشطة' : 'Active secs'}</span>
                </div>
              </div>

              {/* Title & Challenge Description */}
              <div className="space-y-4 max-w-xl text-center">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                  ⚡ {isRtl ? 'تحدي الحركة الذكية والنشاط' : 'Active Movement Break'}
                </span>
                <h3 className="text-2xl font-black text-white">
                  {isRtl ? selectedMoveEx.command_ar : selectedMoveEx.command_en}
                </h3>
                
                {/* Description details */}
                <div className="bg-slate-950/80 border border-white/5 p-6 rounded-2xl text-slate-200 text-sm md:text-base leading-relaxed shadow-inner">
                  <p className="font-bold mb-2 text-amber-300">{isRtl ? 'التوجيهات:' : 'Instructions:'}</p>
                  <p className="mb-4">{selectedMoveEx.description_ar}</p>
                  
                  <div className="border-t border-white/5 pt-3 mt-3 flex flex-col gap-1 text-xs">
                    <p className="text-slate-400">
                      <span className="font-bold text-teal-400">🌟 {isRtl ? 'ردد بصوت عالٍ أثناء الحركة:' : 'Say out loud while moving:'}</span>{' '}
                      <span className="italic font-mono text-white">"{selectedMoveEx.say_while_moving}"</span>
                    </p>
                    <p className="text-slate-500 mt-1.5">
                      <span className="font-bold text-amber-400">❤️ {isRtl ? 'فائدة التمرين الصحية:' : 'Health benefit:'}</span>{' '}
                      {selectedMoveEx.benefit_ar}
                    </p>
                  </div>
                </div>

                {/* Playback Trigger & Complete Button */}
                <div className="flex gap-2 justify-center items-center">
                  <button 
                    onClick={moveSpeechActive ? stopSpeech : speakMoveTranscript}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      moveSpeechActive 
                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <span>🎙️</span>
                    {moveSpeechActive 
                      ? (isRtl ? 'إيقاف دليل الصوت' : 'Stop Audio Guide') 
                      : (isRtl ? 'قراءة التحدي بصوت المساعد 🎙️' : 'Read Out Challenge 🎙️')}
                  </button>

                  <button 
                    onClick={handleMoveSessionComplete}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition shadow-lg shadow-amber-500/20"
                  >
                    {isRtl ? 'أنجزت تمرين الحركة! ✓' : 'Completed Break! ✓'}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#040812] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6"
          >
            {activeSubTab === 'calm' ? (
              <div className="space-y-6">
                {/* Setting the duration before play */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <span className="text-teal-400">⏱️</span>
                      {isRtl ? 'ضبط زمن وحجم جلسة التأمل:' : 'Set Meditation Target Timer:'}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">
                      {isRtl ? 'اختر مدة الجلسة المفضلة للتنفس الواعي قبل البدء:' : 'Configure your relaxation target for the countdown timer:'}
                    </p>
                  </div>

                  {/* Time toggles */}
                  <div className="flex gap-2">
                    {[30, 60, 120, 300].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setMeditationTime(t);
                          setTimeLeft(t);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition font-mono ${
                          meditationTime === t 
                            ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20' 
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {t >= 60 ? `${t / 60}m` : `${t}s`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exercise Selection Grid - 20 items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {EXERCISES.map((ex, idx) => {
                    const isCompleted = localCompletedIds.has(ex.id);
                    const cardIcon = getExerciseIcon(ex.id, 18);

                    return (
                      <div
                        key={ex.id}
                        className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#050b14] flex flex-col justify-between group ${
                          isCompleted 
                            ? 'border-emerald-500/30' 
                            : 'border-white/5 hover:border-teal-500/30'
                        }`}
                      >
                        {/* Badge */}
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">
                            {isRtl ? `تمرين ${idx + 1}` : `Focus exercise ${idx + 1}`}
                          </span>

                          {isCompleted ? (
                            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title={isRtl ? "مكتمل" : "Practiced"}>
                              <Check size={10} strokeWidth={3} />
                            </span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500/50" />
                          )}
                        </div>

                        {/* Meta details */}
                        <div className="space-y-1.5 text-right">
                          <div className="flex items-center gap-2">
                            {cardIcon}
                            <h4 className="text-sm font-black text-white group-hover:text-teal-300 transition line-clamp-1">
                              {isRtl ? ex.title_ar : ex.title_en}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {isRtl ? ex.script_ar : ex.script_en}
                          </p>
                        </div>

                        {/* Play Session CTA */}
                        <button
                          onClick={() => handleStartSession(ex)}
                          className={`w-full mt-2 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border ${
                            isCompleted 
                              ? 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300 border-emerald-500/10'
                              : 'bg-teal-500/5 group-hover:bg-teal-500 group-hover:text-slate-950 text-teal-400 border-teal-500/10 group-hover:border-teal-500'
                          }`}
                        >
                          <Play size={11} fill="currentColor" />
                          {isRtl ? 'البدء بتمارين الهدوء' : 'Begin Relaxation'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : activeSubTab === 'move' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span className="text-amber-400">⚡</span>
                    {isRtl ? 'تنشيط وحركة ذكية للجسد والذهن:' : 'Active Mind & Body Movement Breaks:'}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 text-right">
                    {isRtl ? 'تحديات حركية مرحة من 10 إلى 30 ثانية لتنشيط الدوران الدموي والتخلص من تعب الشاشات وبث الحيوية المتجددة:' : 'Playful 10 to 30 second active constraints to relieve physical stiffness, improve coordination, and restart flow:'}
                  </p>
                </div>

                {/* Movement Exercise Grid - 30 items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {MOVEMENT_EXERCISES.map((ex, idx) => {
                    const isCompleted = completedMoveIds.has(ex.id);

                    return (
                      <div
                        key={ex.id}
                        className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#050b14] flex flex-col justify-between group ${
                          isCompleted 
                            ? 'border-emerald-500/30' 
                            : 'border-white/5 hover:border-amber-500/30'
                        }`}
                      >
                        {/* Badge */}
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">
                            {isRtl ? `مهمة ${idx + 1}` : `Activity ${idx + 1}`}
                          </span>

                          {isCompleted ? (
                            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title={isRtl ? "مكتمل" : "Completed"}>
                              <Check size={10} strokeWidth={3} />
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-300 font-black font-mono">⏱️ {ex.duration_seconds}s</span>
                          )}
                        </div>

                        {/* Details */}
                        <div className="space-y-1.5 text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{getMovementIcon(ex.id)}</span>
                            <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition line-clamp-1">
                              {isRtl ? ex.command_ar : ex.command_en}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {ex.description_ar}
                          </p>
                        </div>

                        {/* CTA button */}
                        <button
                          onClick={() => handleStartMoveSession(ex)}
                          className={`w-full mt-2 py-2 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border ${
                            isCompleted 
                              ? 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300 border-emerald-500/10'
                              : 'bg-amber-500/5 group-hover:bg-amber-500 group-hover:text-slate-950 text-amber-400 border-amber-500/20 group-hover:border-amber-500'
                          }`}
                        >
                          <span>🏃</span>
                          {isRtl ? 'البدء بتحدي الحركة' : 'Start Active Break'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : activeSubTab === 'writing' ? (
              // Active SubTab === 'writing' - Reflection Exercises
              selectedWritingEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Notepad Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedWritingEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة تمارين الكتابة' : 'Back to Writing Prompts'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#0b1329] border border-white/5 px-3 py-1.5 rounded-xl text-slate-300 font-bold font-mono">
                        ✍️ {isRtl ? selectedWritingEx.expression_ar : 'Reflective Path'}
                      </span>
                      <span className="text-xs bg-[#0b1329] border border-white/5 px-3 py-1.5 rounded-xl text-slate-300 font-bold font-mono">
                        ⏱️ {selectedWritingEx.duration_minutes}m
                      </span>
                    </div>
                  </div>

                  {/* Core Editor Container Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Left Column: Notepad Textarea */}
                    <div className="lg:col-span-8 bg-[#030712] border border-purple-500/10 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <label className="block text-xs font-black text-purple-400 uppercase tracking-widest text-right">
                          {isRtl ? 'دفتر الملاحظات والوجدان' : 'Personal Journal & Insights Notepad'}
                        </label>
                        <p className="text-[11px] text-slate-400 text-right italic leading-relaxed">
                          {isRtl ? 'اكتب ما يجول بخاطرك وباشر الإبداع. يتم الحفظ تلقائياً في المتصفح بكل أمان.' : 'Write what feels true to you. Your thoughts are auto-saved locally in your secure frame.'}
                        </p>
                      </div>

                      {/* Text Entry Field */}
                      <textarea
                        value={writingDraft}
                        onChange={(e) => {
                          setWritingDraft(e.target.value);
                          if (selectedWritingEx) {
                            localStorage.setItem(`balance_oasis_draft_${selectedWritingEx.id}`, e.target.value);
                          }
                        }}
                        placeholder={isRtl ? selectedWritingEx.writing_prompt_ar : selectedWritingEx.writing_prompt_en}
                        className="w-full min-h-[220px] bg-[#02050c] border border-white/5 focus:border-purple-500/50 rounded-xl p-4 text-sm md:text-base text-slate-100 placeholder-slate-500 focus:outline-none transition leading-relaxed text-right"
                        dir="rtl"
                      />

                      {/* Character / Word count counters */}
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                        <div className="flex gap-4">
                          <span>الرموز: <strong>{writingDraft.length}</strong></span>
                          <span>الكلمات: <strong>{writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0}</strong></span>
                        </div>
                        {writingDraft.length > 0 && (
                          <span className="text-emerald-400 font-extrabold">✓ {isRtl ? 'تم الحفظ تلقائياً' : 'Auto-saved'}</span>
                        )}
                      </div>

                      {/* Editor Tool Shelf */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                        <button
                          onClick={() => {
                            if (!selectedWritingEx) return;
                            const promptText = isRtl ? selectedWritingEx.writing_prompt_ar : selectedWritingEx.writing_prompt_en;
                            const fullText = (isRtl ? `التحدي: ${selectedWritingEx.description_ar}. البداية المقترحة: ` : 'Prompt Description: ') + promptText;
                            
                            try {
                              window.speechSynthesis.cancel();
                              if (isWritingSpeechActive) {
                                setIsWritingSpeechActive(false);
                                return;
                              }
                              
                              const utterance = new SpeechSynthesisUtterance(fullText);
                              utterance.lang = isRtl ? 'ar-SA' : 'en-US';
                              utterance.rate = 0.95;
                              utterance.onstart = () => setIsWritingSpeechActive(true);
                              utterance.onend = () => setIsWritingSpeechActive(false);
                              utterance.onerror = () => setIsWritingSpeechActive(false);
                              window.speechSynthesis.speak(utterance);
                            } catch (err) {
                              console.warn("TTS error:", err);
                              setIsWritingSpeechActive(false);
                            }
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                            isWritingSpeechActive
                              ? 'bg-purple-500/20 border border-purple-500/40 text-purple-400'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300'
                          }`}
                        >
                          <span>🔊</span>
                          {isWritingSpeechActive
                            ? (isRtl ? 'جاري القراءة بصوت المساعد...' : 'AI Voice reading...')
                            : (isRtl ? 'قراءة التحدي بصوت الذكاء 🎙️' : 'Read Prompt Out Loud')}
                        </button>

                        {/* Export Draft Text */}
                        <button
                          onClick={() => {
                            if (!selectedWritingEx) return;
                            const title = isRtl ? selectedWritingEx.title_ar : selectedWritingEx.title_en;
                            const desc = isRtl ? selectedWritingEx.description_ar : selectedWritingEx.title_en;
                            const val = writingDraft || (isRtl ? selectedWritingEx.writing_prompt_ar : selectedWritingEx.writing_prompt_en);
                            const fileContent = `=== ${title} ===\n\nChallenge: ${desc}\n\nMy Thoughts:\n---------------\n${val}\n\nWritten on Balance Oasis Notebook of Creative Expression & Emotional Intelligence.`;
                            
                            const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `${selectedWritingEx.id}_journal.txt`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          title={isRtl ? "تحميل النص كملف" : "Save as TXT file"}
                        >
                          <Download size={13} />
                          {isRtl ? 'تحميل النص' : 'Download TXT'}
                        </button>

                        {/* Print Note */}
                        <button
                          onClick={() => {
                            window.print();
                          }}
                          className="bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          title={isRtl ? "طباعة الورقة لتعليقها" : "Print Journal page"}
                        >
                          <Printer size={13} />
                          {isRtl ? 'طباعة الورقة' : 'Print Note'}
                        </button>

                        {/* Reset Note */}
                        <button
                          onClick={() => {
                            if (window.confirm(isRtl ? 'هل تريد مسح المسودة والبدء من جديد؟' : 'Are you sure you want to clear your current draft?')) {
                              setWritingDraft('');
                              localStorage.removeItem(`balance_oasis_draft_${selectedWritingEx.id}`);
                            }
                          }}
                          className="bg-rose-500/5 hover:bg-rose-500/20 text-rose-300 p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 mr-auto cursor-pointer"
                          title={isRtl ? "تصفير وحذف المسودة" : "Clear Draft"}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Prompt Guideline Board */}
                    <div className="lg:col-span-4 bg-[#050b14] border border-white/5 rounded-2xl p-5 flex flex-col justify-between text-right space-y-4">
                      <div className="space-y-4">
                        <div className="text-center pb-3 border-b border-white/5">
                          <span className="text-2xl">✍️</span>
                          <h4 className="text-base font-black text-white mt-1">
                            {isRtl ? selectedWritingEx.title_ar : selectedWritingEx.title_en}
                          </h4>
                          <h5 className="text-[11px] text-slate-400 mt-0.5 font-mono">
                            {selectedWritingEx.title_en}
                          </h5>
                        </div>

                        <div className="space-y-2.5" dir="rtl">
                          <div>
                            <h6 className="text-[10px] font-black uppercase text-purple-400 tracking-wider">
                              {isRtl ? 'التصنيف المنهجي والمغزى:' : 'Systemic Category & Theme:'}
                            </h6>
                            <p className="text-xs text-slate-300 mt-1">
                              🌿 {isRtl ? selectedWritingEx.expression_ar : 'Reflective growth & Emotional Insight'}
                            </p>
                          </div>

                          <div>
                            <h6 className="text-[10px] font-black uppercase text-purple-400 tracking-wider">
                              {isRtl ? 'وصف التحدي الإبداعي:' : 'Creative Task Description:'}
                            </h6>
                            <p className="text-xs text-slate-300 leading-relaxed mt-1">
                              {isRtl ? selectedWritingEx.description_ar : 'Engage with this deep self-awareness scenario.'}
                            </p>
                          </div>

                          <div>
                            <h6 className="text-[10px] font-black uppercase text-purple-400 tracking-wider">
                              {isRtl ? 'البداية الإلزامية المقترحة:' : 'Starting Prompt Invitation:'}
                            </h6>
                            <p className="text-xs text-slate-400 italic bg-purple-950/20 border border-purple-500/10 p-2.5 rounded-xl leading-relaxed mt-1">
                              "{isRtl ? selectedWritingEx.writing_prompt_ar : selectedWritingEx.writing_prompt_en}"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Mark Completed Button -> triggers voice recording view with celebration! */}
                      <button
                        onClick={() => {
                          const updated = new Set(completedWritingIds);
                          updated.add(selectedWritingEx.id);
                          setCompletedWritingIds(updated);
                          localStorage.setItem('balance_oasis_writing_completed', JSON.stringify(Array.from(updated)));

                          // Trigger the beautiful voice record encouraging session!
                          setSelectedEx(null);
                          setSelectedMoveEx(null);
                          setCompletionSession({
                            type: 'writing',
                            id: selectedWritingEx.id,
                            title: selectedWritingEx.title_ar,
                            duration: selectedWritingEx.duration_minutes * 60
                          });

                          setSelectedWritingEx(null);
                          stopSpeech();
                        }}
                        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-black py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <span>✓</span>
                        {isRtl ? 'تسجيل إنجاز تمرين الكتابة والولوج للتعزيز 🎙️' : 'Mark Completed & Get Encouraged 🎙️'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // SelectedWritingEx === null -> Grid list of 20 writing prompts catalog!
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-2 text-right" dir="rtl">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white flex items-center gap-2 justify-end">
                        <span className="text-purple-400">✍️</span>
                        {isRtl ? 'التعبير الإبداعي والذكاء العاطفي (الكتابة كأداة للتفكير):' : 'Creative Writing & Emotional Intelligence (Notepad as a Tool for Thinking):'}
                      </h3>
                      <p className="text-slate-400 text-xs">
                        {isRtl ? 'الوحدة الأولى كاملة: 20 تمرين كتابة للتفريغ والوعي الوجداني والتعزيز الذكي مع تسجيل كلامك واستقبل لطف الذكاء المسموع:' : 'Unit 1 Complete Catalog: 20 experiential interactive writing prompts to foster tranquility, gratitude, and deep self-awareness:'}
                      </p>
                    </div>

                    <div className="text-xs bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1.5 rounded-xl font-bold font-mono">
                      {isRtl ? `أنجزت ${completedWritingIds.size} من 20` : `${completedWritingIds.size} / 20 Completed`}
                    </div>
                  </div>

                  {/* 20 Exercises Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" dir="rtl">
                    {WRITING_EXERCISES.map((ex, idx) => {
                      const isCompleted = completedWritingIds.has(ex.id);
                      
                      return (
                        <div
                          key={ex.id}
                          className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#050b14] flex flex-col justify-between group ${
                            isCompleted
                              ? 'border-emerald-500/30'
                              : 'border-white/5 hover:border-purple-500/30'
                          }`}
                        >
                          {/* Badge */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">
                              {isRtl ? `تمرين كتابة ${idx + 1}` : `Writing Exercise ${idx + 1}`}
                            </span>

                            {isCompleted ? (
                              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title={isRtl ? "مكتمل" : "Completed"}>
                                <Check size={10} strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                            )}
                          </div>

                          {/* Meta details */}
                          <div className="space-y-1.5 text-right font-sans">
                            <div className="flex items-center gap-2 justify-end">
                              <h4 className="text-sm font-black text-white group-hover:text-purple-300 transition line-clamp-1">
                                {isRtl ? ex.title_ar : ex.title_en}
                              </h4>
                              <span className="text-lg">✍️</span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {isRtl ? ex.description_ar : ex.title_en}
                            </p>
                          </div>

                          {/* Open Notepad CTA */}
                          <button
                            onClick={() => setSelectedWritingEx(ex)}
                            className={`w-full mt-2 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                              isCompleted
                                ? 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300 border-emerald-500/10'
                                : 'bg-purple-500/5 group-hover:bg-purple-500 group-hover:text-slate-950 text-purple-400 border-purple-500/10 group-hover:border-purple-500'
                            }`}
                          >
                            <FileText size={11} />
                            {isRtl ? 'فتح التحدي ودفتر التعبير' : 'Open Creative Notepad'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ) : activeSubTab === 'emotion' ? (
              // Active SubTab === 'emotion' - Emotional Regulation Exercises
              selectedEmotionEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Step-by-Step interactive checklist container */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedEmotionEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة تمارين الوعي والذكاء الوجداني' : 'Back to Exercises'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#0b1329] border border-white/5 px-3 py-1.5 rounded-xl text-slate-300 font-bold font-mono">
                        🎯 {isRtl ? selectedEmotionEx.feeling_focus : 'Focus Area'}
                      </span>
                      <span className="text-xs bg-[#0b1329] border border-white/5 px-3 py-1.5 rounded-xl text-[#059669] font-bold font-mono">
                        ✨ {isRtl ? selectedEmotionEx.activity_type : 'Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Step checklist */}
                    <div className="lg:col-span-8 bg-[#030712] border border-white/5 rounded-3xl p-6 space-y-6 shadow-2xl">
                      <div className="space-y-2">
                        <span className="text-3xl">{selectedEmotionEx.emoji}</span>
                        <h3 className="text-xl font-black text-white">
                          {isRtl ? selectedEmotionEx.title_ar : selectedEmotionEx.title_en}
                        </h3>
                        <p className="text-slate-400 text-xs">
                          {isRtl ? selectedEmotionEx.description_ar : selectedEmotionEx.title_en}
                        </p>
                      </div>

                      {/* Step-by-step interactive tasks */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest border-b border-white/5 pb-2">
                          {isRtl ? 'خطوات التطبيق والتمرين العملي:' : 'Practical Exercise Checklist:'}
                        </h4>

                        <div className="space-y-3">
                          {(isRtl ? selectedEmotionEx.steps_ar : selectedEmotionEx.steps_en).map((step, sIdx) => {
                            const isChecked = emotionStepsChecked[sIdx] || false;

                            return (
                              <button
                                key={sIdx}
                                onClick={() => {
                                  const updated = [...emotionStepsChecked];
                                  updated[sIdx] = !updated[sIdx];
                                  setEmotionStepsChecked(updated);
                                }}
                                className={`w-full text-right p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer select-none ${
                                  isChecked 
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100 shadow-inner' 
                                    : 'bg-[#080f1a] border-white/5 text-slate-300 hover:border-emerald-500/20'
                                }`}
                              >
                                <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                  isChecked 
                                    ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                                    : 'border-slate-500 text-transparent'
                                }`}>
                                  <Check size={12} strokeWidth={4} />
                                </span>
                                <div className="space-y-1">
                                  <span className="text-xs font-black text-slate-500 font-mono">
                                    {isRtl ? `الخطوة ${sIdx + 1}` : `Step ${sIdx + 1}`}
                                  </span>
                                  <p className="text-xs md:text-sm font-medium leading-relaxed text-right">
                                    {step}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Toolshelf for Reading Steps Out Loud */}
                      <div className="flex border-t border-white/5 pt-4">
                        <button
                          onClick={() => {
                            if (speechPlaybackActive) {
                              stopSpeech();
                            } else {
                              stopSpeech();
                              const textToRead = (isRtl ? selectedEmotionEx.steps_ar : selectedEmotionEx.steps_en).join('. ');
                              const utter = new SpeechSynthesisUtterance(textToRead);
                              utter.lang = isRtl ? 'ar-SA' : 'en-US';
                              utter.onend = () => setSpeechPlaybackActive(false);
                              utter.onerror = () => setSpeechPlaybackActive(false);
                              currentUtteranceRef.current = utter;
                              setSpeechPlaybackActive(true);
                              window.speechSynthesis.speak(utter);
                            }
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            speechPlaybackActive
                              ? 'bg-amber-500 text-slate-900 font-black shadow-lg shadow-amber-500/20'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300'
                          }`}
                        >
                          <span>🔊</span>
                          {speechPlaybackActive 
                            ? (isRtl ? 'إيقاف قراءة الصوت' : 'Stop Reading')
                            : (isRtl ? 'تفقيط وقراءة خطوات التمرين بصوت مسموع' : 'Read Steps Aloud')
                          }
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Outcomes & Completion */}
                    <div className="lg:col-span-4 bg-[#050b14] border border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-6 text-right">
                      <div className="space-y-5">
                        <div className="text-center pb-4 border-b border-white/5">
                          <span className="text-3xl">💎</span>
                          <h4 className="text-base font-black text-white mt-1">
                            {isRtl ? 'الأثر المتوقع والمخرج الوجداني:' : 'Emotional Outcome & Depth:'}
                          </h4>
                        </div>

                        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4 text-emerald-200 text-xs leading-relaxed" dir="rtl">
                          <p className="font-extrabold mb-1">🌱 {isRtl ? 'الأثر الوجداني العاطفي:' : 'Emotional Impact:'}</p>
                          <p>{selectedEmotionEx.outcome_ar}</p>
                        </div>

                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {isRtl
                            ? 'بمجرد استوعبت التلميح وتتبعت الخطوات المعروضة والتعليم عليها بأنها مكتملة، يرجى التعبير عن شعورك بالتحفيز والتعزيز الذكي لإنهاء المهمة بنجاح وعرض فخرك.'
                            : 'Once you reflect and complete each task step, proceed to report completion and listen to automated supportive feedback.'}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const updated = new Set(completedEmotionIds);
                          updated.add(selectedEmotionEx.id);
                          setCompletedEmotionIds(updated);
                          localStorage.setItem('balance_oasis_emotion_completed', JSON.stringify(Array.from(updated)));

                          // Trigger the beautiful completion voice record encouraging session!
                          setSelectedEx(null);
                          setSelectedMoveEx(null);
                          setSelectedWritingEx(null);
                          setCompletionSession({
                            type: 'emotion',
                            id: selectedEmotionEx.id,
                            title: selectedEmotionEx.title_ar,
                            duration: 15 * 60 // average 15 minutes
                          });

                          setSelectedEmotionEx(null);
                          stopSpeech();
                        }}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-emerald-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <span>✓</span>
                        {isRtl ? 'تسجيل إنجاز تمرين الذكاء الوجداني والولوج للتعزيز 🎙' : 'Mark Completed & Open Encouragement 🎙'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // SelectedEmotionEx === null -> Grid list of 20 emotion exercises + Interactive Thermometer feeling tracker!
                <div className="space-y-8 text-right" dir="rtl">
                  
                  {/* 1. Real-time Emotional Thermometer & Mood Log Section */}
                  <div className="bg-gradient-to-br from-[#0c192e] to-[#050b14] border border-white/5 rounded-3xl p-6 shadow-2xl space-y-6">
                    <div className="border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2.5 justify-end">
                        <h3 className="text-lg font-black text-white">
                          {isRtl ? 'مقياس الترمومتر العاطفي وسجل المشاعر المطلب 🌡️' : 'Emotional Thermometer & Live Feeling Log 🌡️'}
                        </h3>
                        <span className="text-xl">🌡️</span>
                      </div>
                      <p className="text-slate-400 text-xs mt-1">
                        {isRtl 
                          ? 'قس "حرارة" شعورك الآن على مقياس من 0 إلى 10 وسجل مشاعرك لتتبع أنماط وعيك الوجداني طيلة اليوم:' 
                          : 'Monitor the thermal intensity of your mood from 0 to 10 and log current states for deep self-awareness:'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Interactive Log Entry */}
                      <div className="lg:col-span-7 space-y-5">
                        
                        {/* Selected Feeling Icon Grid */}
                        <div className="space-y-2">
                          <label className="text-xs font-black text-teal-400 uppercase tracking-wider block">
                            {isRtl ? 'بماذا تشعر الآن بالدرجة الأولى؟' : 'Primary Feeling Tag:'}
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {[
                              { id: 'angry', emoji: '😡', label_ar: 'غضب', label_en: 'Anger', color: 'from-rose-500/20 to-red-500/20 border-red-500/40 text-red-200' },
                              { id: 'anxious', emoji: '😰', label_ar: 'قلق/توتر', label_en: 'Anxiety', color: 'from-amber-500/20 to-orange-500/20 border-orange-500/40 text-orange-200' },
                              { id: 'sad', emoji: '😢', label_ar: 'حزن/تعب', label_en: 'Sadness', color: 'from-sky-500/20 to-blue-500/20 border-blue-500/40 text-blue-200' },
                              { id: 'fear', emoji: '😨', label_ar: 'خوف', label_en: 'Fear', color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/40 text-yellow-100' },
                              { id: 'serene', emoji: '🧘', label_ar: 'هدوء/سلام', label_en: 'Serenity', color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/40 text-teal-200' },
                              { id: 'joyful', emoji: '⭐', label_ar: 'فرح/إنجاز', label_en: 'Joy', color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-200' }
                            ].map((feel) => (
                              <button
                                key={feel.id}
                                onClick={() => setCurrentSelectedFeeling(feel.id)}
                                className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                                  currentSelectedFeeling === feel.id 
                                    ? `bg-gradient-to-b ${feel.color} border-2 scale-102` 
                                    : 'bg-[#050b14]/50 border-white/5 text-slate-400 hover:border-white/10'
                                }`}
                              >
                                <span className="text-xl">{feel.emoji}</span>
                                <span>{isRtl ? feel.label_ar : feel.label_en}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Intensity Slider with color gradient background indicator */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono text-slate-400">{currentThermometerValue} / 10</span>
                            <span className="font-black text-teal-400">
                              {isRtl ? 'درجة الحرارة العاطفية والتأثير الحركي:' : 'Emotional Temperature Level:'}
                            </span>
                          </div>
                          
                          <div className="relative">
                            <input
                              type="range"
                              min="0"
                              max="10"
                              value={currentThermometerValue}
                              onChange={(e) => setCurrentThermometerValue(Number(e.target.value))}
                              className="w-full h-2 rounded-lg bg-slate-800 accent-emerald-500 outline-none cursor-pointer"
                            />
                            {/* Color Bar Track Visual */}
                            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-bold">
                              <span>0 ({isRtl ? 'هادئ جداً ❄️' : 'Fully Calm'})</span>
                              <span>5 ({isRtl ? 'متوسط ⚡' : 'Moderate'})</span>
                              <span>10 ({isRtl ? 'عالي جداً/ناري 🔥' : 'Highly Intense'})</span>
                            </div>
                          </div>
                        </div>

                        {/* Reflection prompt */}
                        <div className="space-y-1.5 text-right">
                          <label className="text-xs font-black text-teal-400 uppercase tracking-wider block">
                            {isRtl ? 'صف باختصار سبب شعورك الحالي (اختياري للتفريغ):' : 'Brief Cause note (Optional for self-relief):'}
                          </label>
                          <input
                            type="text"
                            value={feelingReflectiveNote}
                            onChange={(e) => setFeelingReflectiveNote(e.target.value)}
                            placeholder={isRtl ? 'مثال: الفرح بإنجاز كود برمجي، أو التوتر من كثرة الشاشات...' : 'E.g., joy from completing a unit, or pressure from long study hours...'}
                            className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500 text-right"
                          />
                        </div>

                        {/* Trigger button */}
                        <button
                          onClick={() => {
                            const newLog = {
                              id: String(Date.now()),
                              timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                              feeling: currentSelectedFeeling,
                              intensity: currentThermometerValue,
                              note: feelingReflectiveNote.trim()
                            };
                            const updated = [newLog, ...feelingLogs].slice(0, 30); // keep last 30 logs
                            setFeelingLogs(updated);
                            localStorage.setItem('balance_oasis_feeling_logs', JSON.stringify(updated));
                            setFeelingReflectiveNote('');
                          }}
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow-lg transition duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>🌡️</span>
                          {isRtl ? 'تسجيل درجة الحرارة العاطفية في السجل' : 'Log Temperature Entry'}
                        </button>

                      </div>

                      {/* Log History */}
                      <div className="lg:col-span-5 bg-[#030712] p-5 rounded-2xl border border-white/5 space-y-4 max-h-[340px] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <button
                            onClick={() => {
                              if (window.confirm(isRtl ? 'هل تريد تشطير مسح جميع مشاعرك والبدء بصفحة بيضاء؟' : 'Delete all logged emotions?')) {
                                setFeelingLogs([]);
                                localStorage.removeItem('balance_oasis_feeling_logs');
                              }
                            }}
                            className="text-[10px] text-rose-400 hover:text-rose-300 font-bold cursor-pointer"
                          >
                            {isRtl ? 'مسح السجل' : 'Clear Log'}
                          </button>
                          <h4 className="text-xs font-black text-slate-300">
                            {isRtl ? 'سجل الوعي الوجداني اليومي:' : 'Daily Self-Awareness History:'}
                          </h4>
                        </div>

                        {feelingLogs.length === 0 ? (
                          <div className="h-44 flex flex-col items-center justify-center text-slate-600 text-xs text-center border-2 border-dashed border-white/5 rounded-xl p-4">
                            <span>📊</span>
                            <span className="mt-1">{isRtl ? 'لا توجد سجلات تتبع مضافة بعد اليوم' : 'No feeling tags recorded yet today.'}</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {feelingLogs.map((log) => {
                              // label mapping
                              const feelDetails = (() => {
                                switch (log.feeling) {
                                  case 'angry': return { emoji: '😡', bg: 'bg-rose-500/10 text-rose-300 border-rose-500/20', label: (isRtl ? 'غضب' : 'Anger') };
                                  case 'anxious': return { emoji: '😰', bg: 'bg-amber-500/10 text-amber-300 border-amber-500/20', label: (isRtl ? 'قلق' : 'Anxiety') };
                                  case 'sad': return { emoji: '😢', bg: 'bg-sky-500/10 text-sky-300 border-sky-500/20', label: (isRtl ? 'حزن' : 'Sadness') };
                                  case 'fear': return { emoji: '😨', bg: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20', label: (isRtl ? 'خوف' : 'Fear') };
                                  case 'serene': return { emoji: '🧘', bg: 'bg-teal-500/10 text-teal-300 border-teal-500/20', label: (isRtl ? 'هدوء' : 'Serene') };
                                  case 'joyful': return { emoji: '⭐', bg: 'bg-purple-500/10 text-purple-300 border-purple-500/20', label: (isRtl ? 'فرح' : 'Joy') };
                                  default: return { emoji: '💭', bg: 'bg-slate-500/10 text-slate-300 border-slate-500/20', label: 'شائع' };
                                }
                              })();

                              return (
                                <div key={log.id} className="p-3 bg-[#080e1b] rounded-xl border border-white/5 flex items-center justify-between text-xs gap-3">
                                  <span className="text-[10px] text-slate-500 font-mono shrink-0">{log.timestamp}</span>
                                  <div className="text-right flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 justify-end">
                                      <span className="text-slate-400 font-mono tracking-tighter">({log.intensity}/10)</span>
                                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-black ${feelDetails.bg}`}>
                                        {feelDetails.emoji} {feelDetails.label}
                                      </span>
                                    </div>
                                    {log.note && (
                                      <p className="text-[11px] text-slate-400 mt-1 truncate max-w-full italic">
                                        "{log.note}"
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* 2. Grid list of 20 emotional intelligence exercises */}
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-2 text-right">
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-white flex items-center gap-2 justify-end">
                          <span className="text-emerald-400">💎</span>
                          {isRtl ? 'منهج التعبير الإبداعي والذكاء الوجداني (الوحدة الأولى):' : 'Creative Writing & Emotional Intelligence (Unit 1):'}
                        </h3>
                        <p className="text-slate-400 text-xs">
                          {isRtl ? 'الوحدة كاملة: 20 تمرين عملي لـ الوعي التام بالمشاعر، كفاءة ضبط الغضب، وتقوية المرونة العائلية:' : 'Complete 20 integrated interactive routines to bolster focus, anger containment, and constructive play:'}
                        </p>
                      </div>

                      <div className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl font-bold font-mono">
                        {isRtl ? `أنجزت ${completedEmotionIds.size} من 20` : `${completedEmotionIds.size} / 20 Completed`}
                      </div>
                    </div>

                    {/* Grid list container */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" dir="rtl">
                      {EMOTION_EXERCISES.map((ex, idx) => {
                        const isCompleted = completedEmotionIds.has(ex.id);

                        return (
                          <div
                            key={ex.id}
                            className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#050b14] flex flex-col justify-between group ${
                              isCompleted
                                ? 'border-emerald-500/30'
                                : 'border-white/5 hover:border-emerald-500/30'
                            }`}
                          >
                            {/* Badge */}
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">
                                {isRtl ? `تمرين وجداني ${idx + 1}` : `Emotion Exercise ${idx + 1}`}
                              </span>

                              {isCompleted ? (
                                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title={isRtl ? "مكتمل" : "Completed"}>
                                  <Check size={10} strokeWidth={3} />
                                </span>
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                              )}
                            </div>

                            {/* Meta info */}
                            <div className="space-y-1.5 text-right font-sans">
                              <div className="flex items-center gap-2 justify-end">
                                <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition line-clamp-1">
                                  {isRtl ? ex.title_ar : ex.title_en}
                                </h4>
                                <span className="text-lg">{ex.emoji}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                {isRtl ? ex.description_ar : ex.title_en}
                              </p>
                            </div>

                            {/* CTA button */}
                            <button
                              onClick={() => setSelectedEmotionEx(ex)}
                              className={`w-full mt-2 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isCompleted
                                  ? 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300 border-emerald-500/10'
                                  : 'bg-emerald-500/5 group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-400 border-emerald-500/10 group-hover:border-emerald-500'
                              }`}
                            >
                              <span>⚡</span>
                              {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )
            ) : (
              // Active SubTab === 'communication' - Positive Communication & Social Intelligence Exercises
              selectedCommEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Step-by-Step interactive checklist container */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedCommEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة تمارين التواصل الاجتماعي' : 'Back to Exercises'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#0b1329] border border-white/5 px-3 py-1.5 rounded-xl text-slate-300 font-bold font-mono">
                        🎯 {isRtl ? selectedCommEx.skill_focus : 'Focus Area'}
                      </span>
                      <span className="text-xs bg-[#0b1329] border border-white/5 px-3 py-1.5 rounded-xl text-[#3b82f6] font-bold font-mono">
                        ✨ {isRtl ? selectedCommEx.activity_type : 'Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Step checklist */}
                    <div className="lg:col-span-8 bg-[#030712] border border-white/5 rounded-3xl p-6 space-y-6 shadow-2xl">
                      <div className="space-y-2">
                        <span className="text-3xl">💬</span>
                        <h3 className="text-xl font-black text-white">
                          {isRtl ? selectedCommEx.title_ar : selectedCommEx.title_en}
                        </h3>
                        <p className="text-slate-400 text-xs">
                          {isRtl ? selectedCommEx.description_ar : selectedCommEx.title_en}
                        </p>
                      </div>

                      {/* Step-by-step interactive tasks */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest border-b border-white/5 pb-2">
                          {isRtl ? 'خطوات التطبيق والتمرين العملي عائلياً:' : 'Practical Exercise Checklist:'}
                        </h4>

                        <div className="space-y-3">
                          {(isRtl ? selectedCommEx.steps_ar : selectedCommEx.steps_en).map((step, sIdx) => {
                            const isChecked = commStepsChecked[sIdx] || false;

                            return (
                              <button
                                key={sIdx}
                                onClick={() => {
                                  const updated = [...commStepsChecked];
                                  updated[sIdx] = !updated[sIdx];
                                  setCommStepsChecked(updated);
                                }}
                                className={`w-full text-right p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer select-none ${
                                  isChecked 
                                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-100 shadow-inner' 
                                    : 'bg-[#080f1a] border-white/5 text-slate-300 hover:border-blue-500/20'
                                }`}
                              >
                                <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                  isChecked 
                                    ? 'bg-blue-500 border-blue-500 text-slate-950' 
                                    : 'border-slate-500 text-transparent'
                                }`}>
                                  <Check size={12} strokeWidth={4} />
                                </span>
                                <div className="space-y-1">
                                  <span className="text-xs font-black text-slate-500 font-mono">
                                    {isRtl ? `الخطوة ${sIdx + 1}` : `Step ${sIdx + 1}`}
                                  </span>
                                  <p className="text-xs md:text-sm font-medium leading-relaxed text-right">
                                    {step}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Toolshelf for Reading Steps Out Loud */}
                      <div className="flex border-t border-white/5 pt-4">
                        <button
                          onClick={() => {
                            if (speechPlaybackActive) {
                              stopSpeech();
                            } else {
                              stopSpeech();
                              const textToRead = (isRtl ? selectedCommEx.steps_ar : selectedCommEx.steps_en).join('. ');
                              const utter = new SpeechSynthesisUtterance(textToRead);
                              utter.lang = isRtl ? 'ar-SA' : 'en-US';
                              utter.onend = () => setSpeechPlaybackActive(false);
                              utter.onerror = () => setSpeechPlaybackActive(false);
                              currentUtteranceRef.current = utter;
                              setSpeechPlaybackActive(true);
                              window.speechSynthesis.speak(utter);
                            }
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            speechPlaybackActive
                              ? 'bg-amber-500 text-slate-900 font-black shadow-lg shadow-amber-500/20'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300'
                          }`}
                        >
                          <span>🔊</span>
                          {speechPlaybackActive 
                            ? (isRtl ? 'إيقاف قراءة الصوت' : 'Stop Reading')
                            : (isRtl ? 'تفقيط وقراءة خطوات التمرين بصوت مسموع' : 'Read Steps Aloud')
                          }
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Outcomes & Completion */}
                    <div className="lg:col-span-4 bg-[#050b14] border border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-6 text-right">
                      <div className="space-y-5">
                        <div className="text-center pb-4 border-b border-white/5">
                          <span className="text-3xl">💬</span>
                          <h4 className="text-base font-black text-white mt-1">
                            {isRtl ? 'الأثر المتوقع والمخرج الاجتماعي:' : 'Social Outcome & Depth:'}
                          </h4>
                        </div>

                        <div className="bg-blue-950/20 border border-blue-500/20 rounded-2xl p-4 text-blue-200 text-xs leading-relaxed" dir="rtl">
                          <p className="font-extrabold mb-1">🤝 {isRtl ? 'الأثر والترابط العائلي:' : 'Social Impact:'}</p>
                          <p>{isRtl ? 'يبني جسر تفاهم حقيقي مع شريك السكن أو الأبناء ويؤسس لعادات تواصل إيجابية تصفي القلوب.' : 'Builds a true bridge of understanding with family members, grounding positive daily social connections.'}</p>
                        </div>

                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {isRtl
                            ? 'بمجرد تطبيق الخطوات المعروضة والتعليم عليها كخطوات منجزة، اضغط على زر التسجيل لتوثيق إنجاز التمرين وتلقي كلمات التشجيع والدعم.'
                            : 'Once you practice and check off each communication step, proceed to register completion and receive AI spoken feedback.'}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const updated = new Set(completedCommIds);
                          updated.add(selectedCommEx.id);
                          setCompletedCommIds(updated);
                          localStorage.setItem('balance_oasis_comm_completed', JSON.stringify(Array.from(updated)));

                          // Trigger the beautiful completion voice record encouraging session!
                          setSelectedEx(null);
                          setSelectedMoveEx(null);
                          setSelectedWritingEx(null);
                          setSelectedEmotionEx(null);
                          setCompletionSession({
                            type: 'communication',
                            id: selectedCommEx.id,
                            title: isRtl ? selectedCommEx.title_ar : selectedCommEx.title_en,
                            duration: 10 * 60 // average 10 minutes
                          });

                          setSelectedCommEx(null);
                          stopSpeech();
                        }}
                        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-blue-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <span>✓</span>
                        {isRtl ? 'تسجيل إنجاز تمرين التواصل والولوج للتعزيز 🎙' : 'Mark Completed & Open Encouragement 🎙'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // SelectedCommEx === null -> Grid list of 20 positive communication exercises!
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-2 text-right">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white flex items-center gap-2 justify-end">
                        <span className="text-blue-400">💬</span>
                        {isRtl ? 'منهج التواصل الإيجابي والذكاء الاجتماعي (الوحدة الأولى):' : 'Positive Communication & Social Intelligence (Unit 1):'}
                      </h3>
                      <p className="text-slate-400 text-xs">
                        {isRtl ? 'تفاصيل المنهج بالكامل: 20 تمرين عملي لـ الإنصات الفعال، احتواء الخلافات، والترابط الأسري السلمي:' : 'Complete curriculum: 20 active interactive routines to foster active listening, peaceful conflict management, and deep social bond:'}
                      </p>
                    </div>

                    <div className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-xl font-bold font-mono">
                      {isRtl ? `أنجزت ${completedCommIds.size} من 20` : `${completedCommIds.size} / 20 Completed`}
                    </div>
                  </div>

                  {/* Grid list container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" dir="rtl">
                    {COMMUNICATION_EXERCISES.map((ex, idx) => {
                      const isCompleted = completedCommIds.has(ex.id);

                      return (
                        <div
                          key={ex.id}
                          className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#050b14] flex flex-col justify-between group ${
                            isCompleted
                              ? 'border-blue-500/30'
                              : 'border-white/5 hover:border-blue-500/30'
                          }`}
                        >
                          {/* Badge */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">
                              {isRtl ? `تمرين تواصل ${idx + 1}` : `Communication Exercise ${idx + 1}`}
                            </span>

                            {isCompleted ? (
                              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title={isRtl ? "مكتمل" : "Completed"}>
                                <Check size={10} strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                            )}
                          </div>

                          {/* Meta info */}
                          <div className="space-y-1.5 text-right font-sans">
                            <div className="flex items-center gap-2 justify-end">
                              <h4 className="text-sm font-black text-white group-hover:text-blue-300 transition line-clamp-1">
                                {isRtl ? ex.title_ar : ex.title_en}
                              </h4>
                              <span className="text-lg">💬</span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {isRtl ? ex.description_ar : ex.title_en}
                            </p>
                          </div>

                          {/* CTA button */}
                          <button
                            onClick={() => setSelectedCommEx(ex)}
                            className={`w-full mt-2 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                              isCompleted
                                ? 'bg-blue-500/5 hover:bg-blue-500/10 text-blue-300 border-blue-500/10'
                                : 'bg-blue-500/5 group-hover:bg-blue-500 group-hover:text-slate-950 text-blue-400 border-blue-500/10 group-hover:border-blue-500'
                            }`}
                          >
                            <span>⚡</span>
                            {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Deep Educational Value Guideline */}
      <div className="bg-[#040915] border border-white/5 rounded-2xl p-6 text-right space-y-3">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider flex items-center gap-1.5">
          <span>🧠</span>
          {isRtl ? 'العلم خلف واحة السكينة والهدوء:' : 'Cognitive Science behind the Serenity Oasis:'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
          <div className="space-y-1 bg-white/[0.01] p-4 rounded-xl border border-white/5">
            <h5 className="font-extrabold text-white">{isRtl ? '1. تنظيم الجهاز العصبي وتنبيه الدوران' : '1. Nervous System Regulation'}</h5>
            <p>{isRtl ? 'يؤدي التنظيم وسرعات التنشيط الحركي لنبذ الخمول الطرفي والذهني وبث موجات عصبية تساعد على سرعة الفهم والترابط.' : 'Integrating steady breath paces and short playful active motor-movements filters out fatigue, stimulating rapid synaptic reception.'}</p>
          </div>
          <div className="space-y-1 bg-white/[0.01] p-4 rounded-xl border border-white/5">
            <h5 className="font-extrabold text-white">{isRtl ? '2. تهيئة الروابط وتخفيف التوتر' : '2. Synaptic Receptors Priming'}</h5>
            <p>{isRtl ? 'الفواصل النشطة تفرغ الضغط العقلي فتقدم لذاكرتك قصيرة المدى المتنفس اللازم لإعادة جدولة العمليات بكفاءة تامة.' : 'Active coordination exercises flush cortisol build-ups, supplying fresh oxygenated cognitive lanes for subsequent coding and study phases.'}</p>
          </div>
          <div className="space-y-1 bg-white/[0.01] p-4 rounded-xl border border-white/5">
            <h5 className="font-extrabold text-white">{isRtl ? '3. التفوق العائلي ومشاركة الأهل' : '3. Family Collaborative Flow'}</h5>
            <p>{isRtl ? 'مشاركة الأبناء والأسرة في تحدي الكنغر أو الطيران كالعصفور يخفف عبء الشاشات ويجعل جو الدراسة والتعلم ممتعاً للغاية.' : 'Sharing physical breaks within the household shifts technical learning from isolated screen static into high-energy, collaborative play.'}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
