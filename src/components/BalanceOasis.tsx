import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';
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
import { CommunicationExercise, COMMUNICATION_EXERCISES, COMMUNICATION_EXERCISES_UNIT2 } from './communication_exercises';
import { LeadershipExercise, LEADERSHIP_EXERCISES } from './leadership_exercises';
import { TeamworkExercise, TEAMWORK_EXERCISES } from './teamwork_exercises';
import { FinancialExercise, FINANCIAL_EXERCISES } from './financial_exercises';
import { ConfidenceExercise, CONFIDENCE_EXERCISES } from './confidence_exercises';
import { CriticalExercise, CRITICAL_EXERCISES } from './critical_exercises';
import { InnovExercise, INNOV_EXERCISES } from './innov_exercises';
import { ArtExercise, ART_EXERCISES } from './art_exercises';
import { LifeExercise, LIFE_EXERCISES } from './life_exercises';

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
  skill_focus: string;
  activity_type: string;
  steps_ar: string[];
  steps_en: string[];
  outcome_ar: string;
  emoji: string;
  expression_ar?: string;
  duration_minutes?: number;
}

export const WRITING_EXERCISES: WritingExercise[] = [
  {
    "id": "story_001",
    "title_ar": "بطل من ورق",
    "title_en": "A Paper Hero",
    "description_ar": "اصنع بطلاً خارقاً من خيالك. ارسمه، اكتب اسمه، قدراته الخارقة، نقطة ضعفه، ورسالته التي يحمي بها العالم.",
    "skill_focus": "ابتكار شخصية رئيسية",
    "activity_type": "رسم وكتابة",
    "steps_ar": [
      "ارسم بطلك على ورقة بيضاء. أعطه شكلاً مميزاً.",
      "اكتب اسمه البطولي بالإنجليزية.",
      "اكتب 3 قدرات يمتلكها وقدرة ضعف واحدة.",
      "اكتب جمله الشهيرة: 'أنا هنا من أجل...'."
    ],
    "steps_en": [
      "Draw your hero on a white paper. Give them a unique look.",
      "Write their heroic name in English.",
      "Write 3 powers they have and one weakness.",
      "Write their catchphrase: 'I am here to...'."
    ],
    "outcome_ar": "فهم أن لكل بطل قصة ودافع، وبناء شخصية متكاملة.",
    "emoji": "🦸‍♂️",
    "expression_ar": "ابتكار شخصية رئيسية",
    "duration_minutes": 15
  },
  {
    "id": "story_002",
    "title_ar": "الشرير الذي نتعاطف معه",
    "title_en": "The Villain We Sympathize With",
    "description_ar": "اصنع 'شريراً' لكن اكتب قصته من وجهة نظره. لماذا أصبح شريراً؟ ما ألمه؟ ما الذي يتمناه حقاً؟",
    "skill_focus": "كتابة منظور الشخصية",
    "activity_type": "كتابة تأملية",
    "steps_ar": [
      "ارسم شخصية شريرة وأعطها اسماً.",
      "اكتب يومياتها: 'مرحباً، اسمي... أصبحت هكذا لأن...'.",
      "اكتب شيئاً واحداً يحلم به هذا الشرير غير تدمير العالم.",
      "اسأل: 'هل يمكن إصلاحه؟ كيف؟'."
    ],
    "steps_en": [
      "Draw a villain and give them a name.",
      "Write their diary: 'Hello, my name is... I became like this because...'.",
      "Write one thing this villain dreams of, besides destroying the world.",
      "Ask: 'Can they be fixed? How?'."
    ],
    "outcome_ar": "فهم أن لكل إنسان قصة، حتى من نراهم 'أشراراً' في البداية.",
    "emoji": "🦹‍♂️",
    "expression_ar": "كتابة منظور الشخصية",
    "duration_minutes": 15
  },
  {
    "id": "story_003",
    "title_ar": "حكاية الـ 6 كلمات",
    "title_en": "The 6-Word Tale",
    "description_ar": "اكتب قصة كاملة من 6 كلمات فقط. مثال: 'وصل، رأى، أحب، خسر، تعلم، عاد.' تحدى نفسك أن تروي مشاعر كاملة في 6 كلمات.",
    "skill_focus": "الإيجاز والتكثيف",
    "activity_type": "تحدي كتابي",
    "steps_ar": [
      "فكر في قصة كبيرة تعرفها (حب، مغامرة، فشل ثم نجاح).",
      "اختصر كل مرحلة من مراحلها في كلمة واحدة.",
      "اجمع 6 كلمات متتالية تروي القصة كاملة.",
      "اقرأها بصوت عالٍ ولاحظ أثر الكلمات القليلة."
    ],
    "steps_en": [
      "Think of a big story you know (love, adventure, failure then success).",
      "Condense each stage into one word.",
      "Collect 6 consecutive words that tell the whole story.",
      "Read it aloud and notice the impact of few words."
    ],
    "outcome_ar": "اكتشاف أن القوة ليست في كثرة الكلمات بل في عمقها.",
    "emoji": "📝",
    "expression_ar": "الإيجاز والتكثيف",
    "duration_minutes": 15
  },
  {
    "id": "story_004",
    "title_ar": "خريطة عالمي",
    "title_en": "Map of My World",
    "description_ar": "ارسم خريطة لعالم خيالي من ابتكارك. عليها جبال، أنهار، مدن مخفية. اكتب أسماء الأماكن بالإنجليزية واشرح لماذا هي مميزة.",
    "skill_focus": "بناء عالم قصصي",
    "activity_type": "رسم خرائط",
    "steps_ar": [
      "أحضر ورقة كبيرة وألواناً.",
      "ارسم قارة خيالية وشكلها بحدود غير تقليدية.",
      "ضع 5 أماكن رئيسية (غابة مسحورة، مدينة ذهبية...).",
      "اكتب اسم كل مكان بالإنجليزية وجملة تصفه."
    ],
    "steps_en": [
      "Get a large paper and colors.",
      "Draw an imaginary continent with unconventional borders.",
      "Place 5 main locations (enchanted forest, golden city...).",
      "Write each place's name in English and one descriptive sentence."
    ],
    "outcome_ar": "فهم أن القصص العظيمة تولد من عوالم غنية بالتفاصيل.",
    "emoji": "🗺️",
    "expression_ar": "بناء عالم قصصي",
    "duration_minutes": 15
  },
  {
    "id": "story_005",
    "title_ar": "قصة من صورة",
    "title_en": "A Story from a Picture",
    "description_ar": "ابحث عن صورة غامضة في المجلات أو الإنترنت. اكتب قصة كاملة عنها: ماذا حدث قبل الصورة؟ ماذا حدث بعدها؟ من كان خلف الكاميرا؟",
    "skill_focus": "الاستدعاء القصصي",
    "activity_type": "كتابة من محفز بصري",
    "steps_ar": [
      "اختر صورة واحدة فقط تشد انتباهك.",
      "تأملها 5 دقائق. اسأل: 'ماذا حدث قبل ثوانٍ من هذه اللحظة؟'.",
      "اكتب فقرة عن 'ما قبل' وفقرة عن 'ما بعد' الصورة.",
      "أعط القصة عنواناً مشوقاً."
    ],
    "steps_en": [
      "Choose only one photo that catches your attention.",
      "Observe it for 5 minutes. Ask: 'What happened seconds before this moment?'.",
      "Write a paragraph about 'before' and a paragraph about 'after' the photo.",
      "Give the story an intriguing title."
    ],
    "outcome_ar": "إطلاق الخيال من نقطة بصرية ثابتة إلى سرد متحرك.",
    "emoji": "🖼️",
    "expression_ar": "الاستدعاء القصصي",
    "duration_minutes": 15
  },
  {
    "id": "story_006",
    "title_ar": "رسالة من شخصيتي",
    "title_en": "A Letter from My Character",
    "description_ar": "تخيل أن الشخصية التي اخترعتها ترسل لك رسالة. ماذا ستقول لك؟ اكتب الرسالة بخط يد الشخصية (غير خطك).",
    "skill_focus": "التوحد مع الشخصية",
    "activity_type": "كتابة بضمير المتكلم",
    "steps_ar": [
      "اختر شخصيتك المفضلة التي صنعتها.",
      "تخيل أنها تكتب لك رسالة. كيف ستبدأ؟ 'صديقي/مخترعي العزيز...'.",
      "اكتب الرسالة كلها بصوت الشخصية (ليس صوتك أنت).",
      "في النهاية، اطوِ الرسالة كأنها وصلتك فعلاً."
    ],
    "steps_en": [
      "Choose your favorite character you've created.",
      "Imagine they are writing you a letter. How would they start? 'Dear friend/creator...'.",
      "Write the whole letter in the character's voice (not yours).",
      "Finally, fold the letter as if it really arrived."
    ],
    "outcome_ar": "فهم أن الشخصية تصبح حية عندما يكون لها صوتها الخاص.",
    "emoji": "✉️",
    "expression_ar": "التوحد مع الشخصية",
    "duration_minutes": 15
  },
  {
    "id": "story_007",
    "title_ar": "كوميكس المشاعر",
    "title_en": "Emotion Comics",
    "description_ar": "ارسم شريطاً مصوراً من 4 مربعات. في كل مربع، شخصيتك تعبر عن شعور مختلف: فرح، حزن، غضب، مفاجأة. استخدم فقاعات الكلام بالإنجليزية.",
    "skill_focus": "التعبير البصري عن المشاعر",
    "activity_type": "رسم قصص مصورة",
    "steps_ar": [
      "ارسم 4 مربعات متسلسلة.",
      "ارسم نفس الشخصية في كل مربع لكن بتعبير وجه مختلف.",
      "في فقاعة فوقها، اكتب ما تقوله بالإنجليزية.",
      "لون الخلفية بلون يعبر عن الشعور (أصفر للفرح، أزرق للحزن)."
    ],
    "steps_en": [
      "Draw 4 sequential squares.",
      "Draw the same character in each square but with a different facial expression.",
      "In a bubble above, write what they say in English.",
      "Color the background with a feeling color (yellow for joy, blue for sadness)."
    ],
    "outcome_ar": "تعلم أن الوجه والجسد يحكيان القصة قبل الكلمات.",
    "emoji": "🗯️",
    "expression_ar": "التعبير البصري عن المشاعر",
    "duration_minutes": 15
  },
  {
    "id": "story_008",
    "title_ar": "النهاية المفتوحة",
    "title_en": "The Open Ending",
    "description_ar": "اقرأ بداية قصة قصيرة جداً، ثم اكتب أنت النهاية. لكن لا تغلقها تماماً. اترك سؤالاً واحداً عالقاً في ذهن القارئ.",
    "skill_focus": "كتابة نهايات مبدعة",
    "activity_type": "إكمال قصة",
    "steps_ar": [
      "استخدم البداية: 'وجدت باباً في الحديقة لم أره من قبل. فتحته و...'.",
      "اكتب 5 جمل تنهي بها القصة.",
      "تأكد أن الجملة الأخيرة تترك سؤالاً مفتوحاً.",
      "اقرأها لشخص واسأله: 'ماذا تتوقع أن يحدث بعد ذلك؟'."
    ],
    "steps_en": [
      "Use the beginning: 'I found a door in the garden I'd never seen before. I opened it and...'.",
      "Write 5 sentences to finish the story.",
      "Make sure the last sentence leaves an open question.",
      "Read it to someone and ask: 'What do you think happens next?'."
    ],
    "outcome_ar": "فهم أن القصص العظيمة تبقى في الذهن لأنها لا تنتهي تماماً.",
    "emoji": "🚪",
    "expression_ar": "كتابة نهايات مبدعة",
    "duration_minutes": 15
  },
  {
    "id": "story_009",
    "title_ar": "جواز سفر الشخصية",
    "title_en": "Character Passport",
    "description_ar": "صمم 'جواز سفر' لشخصيتك. اكتب بياناتها: اسمها، مكان ميلادها، عمرها، طعامها المفضل، أعز أصدقائها، أكبر مخاوفها.",
    "skill_focus": "بناء ملف شخصي للشخصية",
    "activity_type": "تصميم وثيقة",
    "steps_ar": [
      "ارسم جواز سفر صغيراً من ورق مقوى.",
      "في صفحة البيانات: الاسم، الجنسية (مكان خيالي)، تاريخ الميلاد.",
      "في صفحة 'معلومات خاصة': الطعام المفضل، الأغنية المفضلة، الصديق المقرب.",
      "في الصفحة الأخيرة: ختم 'مملكة الخيال'."
    ],
    "steps_en": [
      "Draw a small passport from cardboard.",
      "On the data page: name, nationality (imaginary place), birthdate.",
      "On the 'Special Info' page: favorite food, song, best friend.",
      "On the last page: a 'Kingdom of Imagination' stamp."
    ],
    "outcome_ar": "جعل الشخصية 'رسمية' وحقيقية بتفاصيل حياتها اليومية.",
    "emoji": "🛂",
    "expression_ar": "بناء ملف شخصي للشخصية",
    "duration_minutes": 15
  },
  {
    "id": "story_010",
    "title_ar": "حوار الصراع",
    "title_en": "Conflict Dialogue",
    "description_ar": "اكتب حواراً بين شخصيتين تختلفان بشدة حول موضوع واحد. لا تكتب راوياً، فقط حوارهما. دع القارئ يفهم القصة من الحوار فقط.",
    "skill_focus": "كتابة الحوار القصصي",
    "activity_type": "كتابة سيناريو",
    "steps_ar": [
      "اختر صراعاً بسيطاً (أخ وأخته على جهاز التحكم، صديقان يختلفان على لعبة).",
      "اكتب 6 جمل حوارية فقط بينهما. لا تشرح شيئاً خارج الأقواس.",
      "اجعل لكل شخصية طريقة كلام مختلفة (واحدة سريعة، واحدة هادئة).",
      "اقرأ الحوار بصوت عالٍ بصوتين مختلفين."
    ],
    "steps_en": [
      "Choose a simple conflict (siblings over the remote, friends disagreeing on a game).",
      "Write only 6 dialogue lines between them. Explain nothing outside quotes.",
      "Give each character a different speech style (one fast, one calm).",
      "Read the dialogue aloud in two different voices."
    ],
    "outcome_ar": "اكتشاف أن الحوار وحده قادر على حمل قصة كاملة.",
    "emoji": "🗣️",
    "expression_ar": "كتابة الحوار القصصي",
    "duration_minutes": 15
  },
  {
    "id": "story_011",
    "title_ar": "حكاية جدتي، بقلمي",
    "title_en": "Grandma's Tale, by Me",
    "description_ar": "اسأل أحد كبار العائلة عن قصة من طفولته. اكتبها بأسلوبك أنت. أضف خيالك على الحقيقة. امزج الواقع بالخيال.",
    "skill_focus": "المزج بين الواقع والخيال",
    "activity_type": "كتابة من مصدر شفهي",
    "steps_ar": [
      "اجلس مع جد/جدة واسأل: 'احكِ لي عن أجمل موقف في طفولتك'.",
      "سجل القصة أو اكتب ملاحظات سريعة.",
      "أعد كتابة القصة لكن أضف شيئاً خيالياً (تنين مر من القرية، مثلاً).",
      "اقرأ القصة الجديدة لجدك واسأله رأيه."
    ],
    "steps_en": [
      "Sit with a grandparent and ask: 'Tell me about the best moment of your childhood'.",
      "Record the story or take quick notes.",
      "Rewrite the story but add something imaginary (a dragon passed through the village).",
      "Read the new story to your grandparent and ask their opinion."
    ],
    "outcome_ar": "ربط الأجيال عبر القصص وفهم أن الحقيقة نواة لكل خيال.",
    "emoji": "👵",
    "expression_ar": "المزج بين الواقع والخيال",
    "duration_minutes": 15
  },
  {
    "id": "story_012",
    "title_ar": "مذكرات شيء",
    "title_en": "Diary of an Object",
    "description_ar": "تخيل أن شيء في غرفتك (قلم، كوب، وسادة) يكتب مذكراته اليومية. اكتب صفحة واحدة من يومياته. ماذا رأى؟ بماذا شعر؟",
    "skill_focus": "الكتابة من منظور غير بشري",
    "activity_type": "كتابة إبداعية",
    "steps_ar": [
      "اختر شيئاً واحداً من محيطك.",
      "تخيل يومه: 'عزيزي المذكرات، اليوم حمَلَني صاحبي وكتب بي...'.",
      "اكتب مشاعره: هل يشعر بالتقدير أم الإهمال؟",
      "أنهِ الصفحة بأمنية لهذا الشيء."
    ],
    "steps_en": [
      "Choose one object from your surroundings.",
      "Imagine its day: 'Dear diary, today my owner held me and wrote with me...'.",
      "Write its feelings: Does it feel appreciated or neglected?",
      "End the page with a wish for this object."
    ],
    "outcome_ar": "تنمية التعاطف مع كل شيء وتعلم رؤية العالم من عيون مختلفة.",
    "emoji": "🛋️",
    "expression_ar": "الكتابة من منظور غير بشري",
    "duration_minutes": 15
  },
  {
    "id": "story_013",
    "title_ar": "قصة بلا كلمات",
    "title_en": "A Story Without Words",
    "description_ar": "ارسم قصة كاملة في صفحة واحدة دون أي كتابة. فقط صور متسلسلة. أعطها لآخر واطلب منه أن 'يقرأها' لك.",
    "skill_focus": "السرد البصري",
    "activity_type": "رسم قصصي",
    "steps_ar": [
      "قسم الصفحة لـ 6 مربعات.",
      "ارسم قصة بسيطة (طفل يفقد لعبته ثم يجدها) في المربعات دون أي كلمات.",
      "استخدم تعابير الوجوه والألوان للتعبير عن المشاعر.",
      "أعط القصة لأحد واطلب منه أن يحكي لك ما فهمه."
    ],
    "steps_en": [
      "Divide the page into 6 boxes.",
      "Draw a simple story (child loses toy then finds it) in the boxes without any words.",
      "Use facial expressions and colors to express feelings.",
      "Give the story to someone and ask them to tell you what they understood."
    ],
    "outcome_ar": "اكتشاف أن الصورة الواحدة تساوي ألف كلمة، وأن القصص أقدم من الكتابة.",
    "emoji": "🎨",
    "expression_ar": "السرد البصري",
    "duration_minutes": 15
  },
  {
    "id": "story_014",
    "title_ar": "ماذا لو كنتُ...",
    "title_en": "What If I Were...",
    "description_ar": "اختر شيئاً لا تشبهه في الواقع (نملة، سحابة، قطرة مطر). اكتب قصة حياتك لو كنت هذا الشيء. صف العالم من منظورك الجديد.",
    "skill_focus": "الكتابة التخيلية",
    "activity_type": "كتابة تأملية",
    "steps_ar": [
      "اختر شيئاً بعيداً عنك تماماً.",
      "ابدأ: 'اليوم استيقظت وأنا [النملة]. العالم من هنا...'.",
      "صف مشهداً واحداً بتفاصيل دقيقة من منظور هذا الشيء.",
      "اختم برسالة من هذا الشيء للبشر."
    ],
    "steps_en": [
      "Choose something completely unlike you.",
      "Start: 'Today I woke up as [the ant]. The world from here...'.",
      "Describe one scene in detailed perspective of this thing.",
      "End with a message from this thing to humans."
    ],
    "outcome_ar": "توسيع حدود الخيال والخروج من الذات لفهم الكون.",
    "emoji": "🐜",
    "expression_ar": "الكتابة التخيلية",
    "duration_minutes": 15
  },
  {
    "id": "story_015",
    "title_ar": "إعادة تدوير الحكايات",
    "title_en": "Recycling Tales",
    "description_ar": "خذ قصة قديمة تعرفها (سندريلا، ليلى والذئب). اقلبها: ماذا لو كانت سندريلا تحب تنظيف المداخن؟ ماذا لو كان الذئب نباتياً؟",
    "skill_focus": "التفكير العكسي والإبداع",
    "activity_type": "تحوير القصص",
    "steps_ar": [
      "اختر قصة مشهورة.",
      "غير عنصراً واحداً جوهرياً فيها (البطل جبان، الشرير طيب...).",
      "اكتب القصة الجديدة كما لو كانت الأصلية.",
      "اسأل: 'ما الرسالة الجديدة التي تقدمها قصتي؟'."
    ],
    "steps_en": [
      "Choose a famous story.",
      "Change one fundamental element (the hero is a coward, the villain is kind...).",
      "Write the new story as if it were the original.",
      "Ask: 'What new message does my story offer?'."
    ],
    "outcome_ar": "فهم أن كل قصة قابلة لإعادة الاختراع، وأن الإبداع لا سقف له.",
    "emoji": "🔄",
    "expression_ar": "التفكير العكسي والإبداع",
    "duration_minutes": 15
  },
  {
    "id": "story_016",
    "title_ar": "معرض الشخصيات",
    "title_en": "Character Gallery",
    "description_ar": "ارسم 5 شخصيات مختلفة على أوراق منفصلة. علقها على حائط. اكتب تحت كل منها: 'اسمها'، 'حلمها'، 'خوفها'. ادعُ أسرتك للتجول في 'المعرض'.",
    "skill_focus": "عرض الإبداع",
    "activity_type": "معرض فني منزلي",
    "steps_ar": [
      "ارسم 5 شخصيات متنوعة (بطل، شرير، حكيم، طفل، مخلوق غريب).",
      "اكتب بطاقة تعريف صغيرة لكل شخصية.",
      "علقهم على حائط الممر أو الغرفة.",
      "تجول مع أسرتك واشرح لهم 'من هم'."
    ],
    "steps_en": [
      "Draw 5 diverse characters (hero, villain, sage, child, strange creature).",
      "Write a small ID card for each character.",
      "Hang them on the hallway or room wall.",
      "Walk with your family and explain 'who they are'."
    ],
    "outcome_ar": "الفخر بالإنتاج الإبداعي ومشاركته مع الأحبة.",
    "emoji": "🖼️",
    "expression_ar": "عرض الإبداع",
    "duration_minutes": 15
  },
  {
    "id": "story_017",
    "title_ar": "الصراع الداخلي",
    "title_en": "The Inner Conflict",
    "description_ar": "اكتب قصة لا تدور حول معركة خارجية، بل معركة داخل بطلها: هل يخبر الحقيقة أم يكذب؟ هل يساعد أم يخاف؟ القرار هو ذروة القصة.",
    "skill_focus": "العمق النفسي في القصة",
    "activity_type": "كتابة دراما نفسية",
    "steps_ar": [
      "فكر في موقف أخلاقي صعب.",
      "اكتب قصة قصيرة حيث البطل يقف بين خيارين.",
      "صوّر أفكاره الداخلية: 'قال لنفسه...'.",
      "اجعل القارئ يشعر بمعاناة الاختيار قبل أن يصل للحل."
    ],
    "steps_en": [
      "Think of a difficult moral situation.",
      "Write a short story where the hero stands between two choices.",
      "Portray their inner thoughts: 'He said to himself...'.",
      "Make the reader feel the struggle of choice before reaching the solution."
    ],
    "outcome_ar": "فهم أن أقوى القصص هي التي تدور داخل النفس البشرية.",
    "emoji": "🧠",
    "expression_ar": "العمق النفسي في القصة",
    "duration_minutes": 15
  },
  {
    "id": "story_018",
    "title_ar": "قصة عائلية مشتركة",
    "title_en": "A Shared Family Story",
    "description_ar": "اكتبوا قصة معاً. شخص يبدأ بجملة، والثاني يضيف جملة، والثالث يضيف ثالثة... حتى تكتمل القصة في 10 جمل. لا تخططوا مسبقاً.",
    "skill_focus": "الإبداع الجماعي",
    "activity_type": "لعبة كتابة عائلية",
    "steps_ar": [
      "اجلسوا في دائرة. أحضروا ورقة واحدة.",
      "الشخص الأول يكتب جملة افتتاحية مشوقة.",
      "يطوي الورقة بحيث لا يرى التالي إلا آخر جملة.",
      "بعد 10 أدوار، افتحوا الورقة واقرأوا 'القصة المجنونة' التي ظهرت."
    ],
    "steps_en": [
      "Sit in a circle. Bring one paper.",
      "The first person writes an exciting opening sentence.",
      "Fold the paper so the next only sees the last sentence.",
      "After 10 turns, open the paper and read the 'crazy story' that emerged."
    ],
    "outcome_ar": "الاستمتاع بعدم اليقين وتقبل أفكار الآخرين في العمل الإبداعي.",
    "emoji": "👪",
    "expression_ar": "الإبداع الجماعي",
    "duration_minutes": 15
  },
  {
    "id": "story_019",
    "title_ar": "غلاف كتابي المستقبلي",
    "title_en": "My Future Book Cover",
    "description_ar": "صمم غلاف كتابك الذي ستنشره يوماً ما. ارسم الغلاف الأمامي والخلفي. اكتب عنوان الكتاب، اسمك، وتلخيصاً صغيراً في الخلف.",
    "skill_focus": "تحفيز الطموح الكتابي",
    "activity_type": "تصميم غلاف",
    "steps_ar": [
      "أحضر ورقة كبيرة واطوِها كغلاف كتاب.",
      "في الأمام: ارسم صورة معبرة واكتب العنوان بالإنجليزية.",
      "في الخلف: اكتب 3 جمل تشويقية عن القصة دون حرق النهاية.",
      "ضع الغلاف على مكتبك كحلم تراه يومياً."
    ],
    "steps_en": [
      "Get a big paper and fold it like a book cover.",
      "On the front: draw an expressive image and write the title in English.",
      "On the back: write 3 intriguing sentences about the story without spoilers.",
      "Place the cover on your desk as a daily dream to see."
    ],
    "outcome_ar": "تحويل الحلم بالكتابة إلى شيء مرئي وملموس يذكر به يومياً.",
    "emoji": "📘",
    "expression_ar": "تحفيز الطموح الكتابي",
    "duration_minutes": 15
  },
  {
    "id": "story_020",
    "title_ar": "رسالة إلى شخصيتي بعد 10 سنوات",
    "title_en": "A Letter to My Character in 10 Years",
    "description_ar": "تخيل أن شخصيتك المفضلة كبرت 10 سنوات. اكتب لها رسالة. ماذا أصبحت؟ هل حققت أحلامها؟ هل ما زالت تتذكرك أنت كمخترع لها؟",
    "skill_focus": "تأمل النمو والتغير",
    "activity_type": "كتابة استشرافية",
    "steps_ar": [
      "اختر شخصيتك المفضلة.",
      "تخيلها بعد 10 سنوات. أين تعيش؟ ماذا تفعل؟",
      "اكتب رسالة تسألها عن حياتها الآن.",
      "في النهاية، اشكرها على كل ما علمتك إياه."
    ],
    "steps_en": [
      "Choose your favorite character.",
      "Imagine them 10 years later. Where do they live? What do they do?",
      "Write a letter asking about their life now.",
      "At the end, thank them for everything they taught you."
    ],
    "outcome_ar": "فهم أن الشخصيات تنمو معنا، وقد تكون مرآة لأحلامنا المستقبلية.",
    "emoji": "⏳",
    "expression_ar": "تأمل النمو والتغير",
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
  studentName?: string;
}

export const BalanceOasis: React.FC<BalanceOasisProps> = ({ 
  isRtl = true, 
  onLessonCompleted, 
  completedLessonIds = new Set(),
  studentName = ''
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'calm' | 'move' | 'writing' | 'emotion' | 'communication' | 'leadership' | 'teamwork' | 'money' | 'confidence' | 'critical' | 'innov' | 'art' | 'life'>('calm');

  const [customStudentName, setCustomStudentName] = useState<string>(studentName);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Single Exercise Export States
  interface SharedExportExercise {
    id: string;
    title: string;
    category: string;
    categoryEn: string;
    content: string;
    steps?: string[];
    benefitLabel?: string;
    benefit?: string;
    emoji?: string;
  }
  const [exerciseToExport, setExerciseToExport] = useState<SharedExportExercise | null>(null);
  const [exportingExerciseId, setExportingExerciseId] = useState<string | null>(null);

  useEffect(() => {
    if (studentName) {
      setCustomStudentName(studentName);
    }
  }, [studentName]);

  // Active critical reflective writing states
  const [selectedWritingEx, setSelectedWritingEx] = useState<WritingExercise | null>(null);
  const [writingDraft, setWritingDraft] = useState<string>('');
  const [isWritingSpeechActive, setIsWritingSpeechActive] = useState<boolean>(false);
  const [writingStepsChecked, setWritingStepsChecked] = useState<boolean[]>([]);
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
      setWritingStepsChecked(new Array(selectedWritingEx.steps_ar.length).fill(false));
    } else {
      setWritingDraft('');
      setWritingStepsChecked([]);
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
  const [commActiveUnit, setCommActiveUnit] = useState<1 | 2>(1);
  const [unitToExport, setUnitToExport] = useState<{ unitNumber: 1 | 2; title: string; exercises: CommunicationExercise[] } | null>(null);
  const [isExportingUnit, setIsExportingUnit] = useState<boolean>(false);
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

  // Active leadership and time management states
  const [selectedLeaderEx, setSelectedLeaderEx] = useState<LeadershipExercise | null>(null);
  const [leaderStepsChecked, setLeaderStepsChecked] = useState<boolean[]>([]);
  const [completedLeaderIds, setCompletedLeaderIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_leader_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (selectedLeaderEx) {
      setLeaderStepsChecked(new Array(selectedLeaderEx.steps_ar.length).fill(false));
    } else {
      setLeaderStepsChecked([]);
    }
    stopSpeech();
  }, [selectedLeaderEx]);

  // Active cooperation, teamwork & joint projects states
  const [selectedTeamEx, setSelectedTeamEx] = useState<TeamworkExercise | null>(null);
  const [teamStepsChecked, setTeamStepsChecked] = useState<boolean[]>([]);
  const [completedTeamIds, setCompletedTeamIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_team_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (selectedTeamEx) {
      setTeamStepsChecked(new Array(selectedTeamEx.steps_ar.length).fill(false));
    } else {
      setTeamStepsChecked([]);
    }
    stopSpeech();
  }, [selectedTeamEx]);

  // Active early financial literacy states
  const [selectedMoneyEx, setSelectedMoneyEx] = useState<FinancialExercise | null>(null);
  const [moneyStepsChecked, setMoneyStepsChecked] = useState<boolean[]>([]);
  const [completedMoneyIds, setCompletedMoneyIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_money_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (selectedMoneyEx) {
      setMoneyStepsChecked(new Array(selectedMoneyEx.steps_ar.length).fill(false));
    } else {
      setMoneyStepsChecked([]);
    }
    stopSpeech();
  }, [selectedMoneyEx]);

  // Active self confidence & public speaking states
  const [selectedConfidenceEx, setSelectedConfidenceEx] = useState<ConfidenceExercise | null>(null);
  const [confidenceStepsChecked, setConfidenceStepsChecked] = useState<boolean[]>([]);
  const [completedConfidenceIds, setCompletedConfidenceIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_confidence_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (selectedConfidenceEx) {
      setConfidenceStepsChecked(new Array(selectedConfidenceEx.steps_ar.length).fill(false));
    } else {
      setConfidenceStepsChecked([]);
    }
    stopSpeech();
  }, [selectedConfidenceEx]);

  // Active critical thinking & problem solving states
  const [selectedCriticalEx, setSelectedCriticalEx] = useState<CriticalExercise | null>(null);
  const [criticalStepsChecked, setCriticalStepsChecked] = useState<boolean[]>([]);
  const [completedCriticalIds, setCompletedCriticalIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_critical_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (selectedCriticalEx) {
      setCriticalStepsChecked(new Array(selectedCriticalEx.steps_ar.length).fill(false));
    } else {
      setCriticalStepsChecked([]);
    }
    stopSpeech();
  }, [selectedCriticalEx]);

  // Active innovators & entrepreneurship ("مبتكرون بالفطرة") states
  const [selectedInnovEx, setSelectedInnovEx] = useState<InnovExercise | null>(null);
  const [innovStepsChecked, setInnovStepsChecked] = useState<boolean[]>([]);
  const [completedInnovIds, setCompletedInnovIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_innov_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (selectedInnovEx) {
      setInnovStepsChecked(new Array(selectedInnovEx.steps_ar.length).fill(false));
    } else {
      setInnovStepsChecked([]);
    }
    stopSpeech();
  }, [selectedInnovEx]);

  // Active literature & art ("نوافذ الفن والجمال" / "الأدب والفن") states
  const [selectedArtEx, setSelectedArtEx] = useState<ArtExercise | null>(null);
  const [artStepsChecked, setArtStepsChecked] = useState<boolean[]>([]);
  const [completedArtIds, setCompletedArtIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_art_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (selectedArtEx) {
      setArtStepsChecked(new Array(selectedArtEx.steps_ar.length).fill(false));
    } else {
      setArtStepsChecked([]);
    }
    stopSpeech();
  }, [selectedArtEx]);

  // Active life skills & emergency actions ("بطل الحياة والسلامة") states
  const [selectedLifeEx, setSelectedLifeEx] = useState<LifeExercise | null>(null);
  const [lifeStepsChecked, setLifeStepsChecked] = useState<boolean[]>([]);
  const [completedLifeIds, setCompletedLifeIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('balance_oasis_life_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (selectedLifeEx) {
      setLifeStepsChecked(new Array(selectedLifeEx.steps_ar.length).fill(false));
    } else {
      setLifeStepsChecked([]);
    }
    stopSpeech();
  }, [selectedLifeEx]);

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
    type: 'calm' | 'move' | 'writing' | 'emotion' | 'communication' | 'leadership' | 'teamwork' | 'money' | 'confidence' | 'critical' | 'innov' | 'art' | 'life';
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

  const AR_LEADER_RESPONSES = [
    "يا لك من قائد عظيم! التحكم بالوقت وتنظيم الأولويات وإدارة المهام بذكاء يبني شخصية قوية ومنتجة ومؤثرة في مجتمعك. فخورون بوعيك القيادي الفائق! 👑⏱️",
    "تطبيق استثنائي لمهارات القيادة الشخصية وإدارة الذات! التغلب على الكسل والمماطلة ووضع أهداف واضحة يجعلك من المنجزين الكبار. واصل القيادة والتميز! 🌅🧗",
    "قائد المستقبل الرائع! التزامك بالخطوات العملية والمبادرات العائلية يبني ثقتك بنفسك ويزيد من مرونتك وقدرتك على مواجهة الصعاب بكل فخر وقدرة! 🏆🧠"
  ];

  const EN_LEADER_RESPONSES = [
    "What an amazing leader! Taking control of your time, prioritizing tasks, and managing goals builds a strong, highly productive, and influential character. We are incredibly proud of your leadership! 👑⏱️",
    "Exceptional application of self-leadership and time management! Overcoming procrastination and setting transparent targets makes you an elite high-achiever. Keep leading and shining! 🌅🧗",
    "Great future commander! Sticking to your tactical plans and taking family initiatives reinforces your self-confidence and grows your resilience to face all challenges with courage! 🏆🧠"
  ];

  const AR_TEAMWORK_RESPONSES = [
    "عمل جماعي مذهل! العمل كفريق، ومشاركة الأدوار، والمساعدة المتبادلة هي سر بناء المجتمعات الكبرى والنجاح المشترك. أنتم رائعون ومبادرون متميزون! 🤝🍳🏡",
    "تطبيق مثالي بروح الفريق الواحد وعقلية التعاون! توزيع المسؤوليات بالتساوي واحترام جهود بعضكم البعض يبني ترابطاً عائلياً قوياً وثقة عالية. مستمرون في الإبداع! 🌱🏛️🎨",
    "رائع جداً! تحويل المهام المنزلية والخدمية إلى مشاريع تشاركية مرحة ينمي ذكاءكم الاجتماعي ويصنع ذكريات لا تُنسى. فخورون جداً بتعاونكم وإنجازكم! 🧹📦🎶"
  ];

  const EN_TEAMWORK_RESPONSES = [
    "Amazing teamwork! Working together, sharing roles, and helping one another is the secret to building great communities and shared success. You are outstanding collaborators! 🤝🍳🏡",
    "Perfect application of team spirit and cooperative mindsets! Distributing responsibilities and respecting each other's efforts builds unbreakable family bonds and high confidence! 🌱🏛️🎨",
    "Fantastic! Transforming household tasks and shared duties into fun joint projects nurtures your social intelligence and shapes lasting memories. Incredibly proud! 🧹📦🎶"
  ];

  const AR_FINANCE_RESPONSES = [
    "رائع جداً! فهمك للثقافة المالية في سن مبكرة يضعك على الطريق الصحيح لتكون مميزاً وذكياً في إدارة أموالك وتخطيطك للمستقبل. 💰📈🏆",
    "أحسنت! إدراك الفرق بين الرغبات والاحتياجات والادخار بوعي هو أساس النجاح المالي. فخور جداً بقراراتك المالية المسؤولة! 🎯📉⚖️",
    "ممتاز! لقد اجتزت التحدي المالي بنجاح. تذكر دائماً أن الاستثمار في نفسك وفي تطوير مهاراتك هو أفضل استثمار للمستقبل. 🚀🌟💸"
  ];

  const EN_FINANCE_RESPONSES = [
    "Fantastic! Understanding money at a young age puts you on the right path to financial success and smart decision making! Keep planning your future! 💰📈🏆",
    "Great job! Distinguishing between needs and wants and saving on purpose is the foundation of smart finance. Super proud of your responsible decisions! 🎯📉⚖️",
    "Excellent! You successfully completed your financial challenge. Remember, investing in your own skills is the best investment you can make! 🚀🌟💸"
  ];

  const AR_CONFIDENCE_RESPONSES = [
    "يا لك من متحدث بارع وواثق! وقوفك بثبات وتعبيراتك الواضحة وإلقاؤك الرائع يثبت للجميع أنك بطل حقيقي وصوتك يستحق الاستماع إليه. 🗣️👑🌟",
    "أحسنت جداً! كسر حاجز القلق والتحدث أمام جمهور أو مرآة بشجاعة هو خطوة عملاقة نحو التميز ولغة الجسد المؤثرة. فخور بك للغاية! 🎤🎭🦸",
    "مذهل! لقد أتممت تمرين الثقة والتحدث بطلبة واقتدار. استمر في التدرب وصوتك الشجاع يوماً ما سيلهم الملايين! 🚀📈🏆"
  ];

  const AR_CRITICAL_RESPONSES = [
    "يا لك من مفكر ذكي ونبيه! قدرتك على تحليل الادعاءات وفحص الأدلة وكشف الفروق بين الرغبات والحقائق أو الشائعات تثبت عمق ذكائك ووعيك الفكري المتين! 🧐🔍⚖️",
    "تطبيق متميز لمدارك التفكير النقدي وحل المشكلات! تقسيم التحديات لجزئيات صغيرة يبسط تعقد الحياة ويجعل عقلك المشرق مستعداً دائماً لتخطي العوائق الذكية! 🧠🧩💡",
    "بطل المنطق والتجرد الأخلاقي الفائق! اتخاذك للقرارات المنطقية والفرق بين العاطفة والإثبات هو ميزان نجاح الحوارات والنقاشات الراقية في مستقبلك! ⚖️🚀🏆"
  ];

  const EN_CONFIDENCE_RESPONSES = [
    "What a brilliant and confident speaker you are! Standing tall, projecting clearly, and expressing your thoughts proves you are a true champion! 🗣️👑🌟",
    "Great job! Conquering anxiety and speaking bravely in front of others or a mirror is a giant step toward speaking mastery and powerful body language! 🎤🎭🦸",
    "Spectacular! You completed your confidence and public speaking challenge. Keep practicing, and your brave voice will motivate millions one day! 🚀📈🏆"
  ];

  const EN_CRITICAL_RESPONSES = [
    "What a brilliant and critical thinker you are! Your ability to analyze claims, check proofs, and filter facts from opinions proves your outstanding logical power! 🧐🔍⚖️",
    "Spectacular problem-solving skills! Chunking down massive hurdles into actionable baby steps simplifies life's complexities and primes your vibrant mind for clever triumphs! 🧠🧩💡",
    "Champion of logic and objective ethics! Making proof-based decisions and distinguishing emotion from empirical fact is the ultimate crown of supreme intellect! ⚖️🚀🏆"
  ];

  const AR_INNOV_RESPONSES = [
    "يا لك من رائد أعمال ومبتكر عبقري بالفطرة! قدرتك على التعاطف مع احتياجات الناس وابتكار الحلول الذكية والتخطيط بخطوات ثابتة تدل على قائد أعمال عظيم في المستقبل! 🎨👁️🤝",
    "تطبيق متميز لمدارك الابتكار والريادة! تحويل الفكرة من مجرد خيال إلى رسم ونموذج أولي واختبارها مع الجمهور هو سر نجاح أكبر المشاريع العالمية! 💡📈🏆",
    "رائع جداً! فهمك للتسعير والاسم التجاري وسماع ردود الفعل بروح مرنة يصنع منك مبادراً ناجحاً قادراً على ترك بصمة حقيقية في مجتمعك! 🏷️💼🎪"
  ];

  const EN_INNOV_RESPONSES = [
    "What a brilliant natural innovator and entrepreneur you are! Your ability to empathize with people's needs, design smart solutions, and plan with confidence shows you are a future business leader! 🎨👁️🤝",
    "Spectacular application of innovation and micro-business skills! Transforming ideas from pure imagination to paper prototypes and validation is the secret of the world's greatest endeavors! 💡📈🏆",
    "Outstanding! Understanding cost, pricing, branding, and gathering constructive feedback with a growth mindset shapes you into a resilient, impactful initiator! 🏷️💼🎪"
  ];

  const AR_ART_RESPONSES = [
    "يا لك من فنان متذوق وأديب بارع! قدرتك على التعبير الجمالي ووصف المشاعر ونحت الأحاسيس وتأمل مواطن الجمال تبرز روحك الفنية الراقية وموهبتك الاستثنائية! 🎨✍️✨",
    "تطبيق رائع لأدوات الفن والأدب! رسم القصص وتأدية الحوارات وكتابة الاستعارات البليغة يثري مخيلتك ويعطيك صوتاً فريداً ولغة نابضة بالجمال والتأثير! 🎭📖🖼️",
    "بطل التعبير والجمال الساحر! دمجك وعيشك لهوية الفنان وتقديم أعمالك في معرض يعزز ثقتك بقدرتك على تلوين العالم بأفكارك وتصاميمك الراقية! 🎨🏛️🕊️"
  ];

  const EN_ART_RESPONSES = [
    "What a wonderful artist and brilliant writer you are! Your ability to express beauty, describe feelings, sculpt emotions, and reflect on aesthetic nuances shows a deeply creative soul! 🎨✍️✨",
    "A gorgeous application of literary and creative arts! Recreating stories, writing vivid metaphors, and performing voice roles ignites your imagination and crafts a powerful, unique voice! 🎭📖🖼️",
    "Champion of creativity and beautiful self-expression! Embracing your identity as an artist and presenting your creations to others shows awesome confidence of a master designer! 🎨🏛️🕊️"
  ];

  const AR_LIFE_RESPONSES = [
    "يا لك من بطل حقيقي في الحياة ومنظم بارع! تنظيم مساحتك الخاصة ومعرفة أرقام وحقائب الطوارئ وتحدي نفسك بالاعتماد الكامل يبني شخصيتك القوية والمستقلة! 🏠🚨🩹",
    "تطبيق مذهل لمهارات الإنقاذ والسلامة والاعتماد على النفس! طي ملابسك بنفسك، التعامل السليم مع الجروح الخفيفة والحروق، وإدارة ميزانيتك هي خصال القادة الأقوياء والمستقلين! 💰🧥🛟",
    "فخور جداً بإنجازك الرائع لهذا التحدي العملي! استحقاقك لشهادة بطل الحياة يثبت أنك فرد يبني مجتمعه بثقة، أمان، ونبض مفعم بالمسؤولية! 🎓🔧🛠️"
  ];

  const EN_LIFE_RESPONSES = [
    "What a true life hero and master organizer you are! Tidying your space, mastering emergency numbers, and taking direct responsibility builds an independent, reliable personality! 🏠🚨🩹",
    "A legendary application of rescue safety and self-reliance skills! Folding clothes, managing emergencies safely, and budgeting your allowance are the true markers of a strong future leader! 💰🧥🛟",
    "Incredibly proud of your wonderful practical achievement! Earning your Life Hero certificate proves you are safe, capable of helping yourself and others, and full of responsibility! 🎓🔧🛠️"
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
    } else if (completionSession?.type === 'leadership') {
      if (isRtl) {
        const rand = Math.floor(Math.random() * AR_LEADER_RESPONSES.length);
        textToSpeak = AR_LEADER_RESPONSES[rand];
      } else {
        const rand = Math.floor(Math.random() * EN_LEADER_RESPONSES.length);
        textToSpeak = EN_LEADER_RESPONSES[rand];
      }
    } else if (completionSession?.type === 'teamwork') {
      if (isRtl) {
        const rand = Math.floor(Math.random() * AR_TEAMWORK_RESPONSES.length);
        textToSpeak = AR_TEAMWORK_RESPONSES[rand];
      } else {
        const rand = Math.floor(Math.random() * EN_TEAMWORK_RESPONSES.length);
        textToSpeak = EN_TEAMWORK_RESPONSES[rand];
      }
    } else if (completionSession?.type === 'money') {
      if (isRtl) {
        const rand = Math.floor(Math.random() * AR_FINANCE_RESPONSES.length);
        textToSpeak = AR_FINANCE_RESPONSES[rand];
      } else {
        const rand = Math.floor(Math.random() * EN_FINANCE_RESPONSES.length);
        textToSpeak = EN_FINANCE_RESPONSES[rand];
      }
    } else if (completionSession?.type === 'confidence') {
      if (isRtl) {
        const rand = Math.floor(Math.random() * AR_CONFIDENCE_RESPONSES.length);
        textToSpeak = AR_CONFIDENCE_RESPONSES[rand];
      } else {
        const rand = Math.floor(Math.random() * EN_CONFIDENCE_RESPONSES.length);
        textToSpeak = EN_CONFIDENCE_RESPONSES[rand];
      }
    } else if (completionSession?.type === 'critical') {
      if (isRtl) {
        const rand = Math.floor(Math.random() * AR_CRITICAL_RESPONSES.length);
        textToSpeak = AR_CRITICAL_RESPONSES[rand];
      } else {
        const rand = Math.floor(Math.random() * EN_CRITICAL_RESPONSES.length);
        textToSpeak = EN_CRITICAL_RESPONSES[rand];
      }
    } else if (completionSession?.type === 'innov') {
      if (isRtl) {
        const rand = Math.floor(Math.random() * AR_INNOV_RESPONSES.length);
        textToSpeak = AR_INNOV_RESPONSES[rand];
      } else {
        const rand = Math.floor(Math.random() * EN_INNOV_RESPONSES.length);
        textToSpeak = EN_INNOV_RESPONSES[rand];
      }
    } else if (completionSession?.type === 'art') {
      if (isRtl) {
        const rand = Math.floor(Math.random() * AR_ART_RESPONSES.length);
        textToSpeak = AR_ART_RESPONSES[rand];
      } else {
        const rand = Math.floor(Math.random() * EN_ART_RESPONSES.length);
        textToSpeak = EN_ART_RESPONSES[rand];
      }
    } else if (completionSession?.type === 'life') {
      if (isRtl) {
        const rand = Math.floor(Math.random() * AR_LIFE_RESPONSES.length);
        textToSpeak = AR_LIFE_RESPONSES[rand];
      } else {
        const rand = Math.floor(Math.random() * EN_LIFE_RESPONSES.length);
        textToSpeak = EN_LIFE_RESPONSES[rand];
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

  const stopSpeech = () => {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn(e);
    }
    setSpeechPlaybackActive(false);
    setMoveSpeechActive(false);
    setIsWritingSpeechActive(false);
    setIsSpeakingEncouragement(false);
  };

  const handleStartSession = (ex: FocusExercise) => {
    setSelectedEx(ex);
    setTimeLeft(meditationTime);
    setIsPlaying(true);

    // Play serene soft introductory notes
    setTimeout(() => {
      playSereneFreq(432, 0.8, 'sine');
      setTimeout(() => playSereneFreq(528, 0.8, 'triangle'), 150);
    }, 150);
  };

  const handleStopSession = () => {
    setIsPlaying(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    stopSpeech();
  };

  const handleSessionComplete = () => {
    setIsPlaying(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    // Play victory frequency triple chime
    playSereneFreq(528, 1.5, 'sine');
    setTimeout(() => playSereneFreq(659, 1.2, 'sine'), 200);
    setTimeout(() => playSereneFreq(784, 1.5, 'sine'), 400);

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
    stopSpeech();
    const textToRead = isRtl ? selectedEx.script_ar : selectedEx.script_en;
    const utter = new SpeechSynthesisUtterance(textToRead);
    utter.lang = isRtl ? 'ar-SA' : 'en-US';
    utter.onend = () => setSpeechPlaybackActive(false);
    utter.onerror = () => setSpeechPlaybackActive(false);
    currentUtteranceRef.current = utter;
    setSpeechPlaybackActive(true);
    window.speechSynthesis.speak(utter);
  };

  const speakMoveTranscript = () => {
    if (!selectedMoveEx) return;
    stopSpeech();
    const textToRead = (isRtl ? selectedMoveEx.command_ar : selectedMoveEx.command_en) + '. ' + selectedMoveEx.description_ar;
    const utter = new SpeechSynthesisUtterance(textToRead);
    utter.lang = isRtl ? 'ar-SA' : 'en-US';
    utter.onend = () => setMoveSpeechActive(false);
    utter.onerror = () => setMoveSpeechActive(false);
    currentUtteranceRef.current = utter;
    setMoveSpeechActive(true);
    window.speechSynthesis.speak(utter);
  };

  const completedCount = localCompletedIds.size;
  const completedMoveCount = completedMoveIds.size;
  const completedWritingCount = completedWritingIds.size;
  const completedEmotionCount = completedEmotionIds.size;
  const completedCommCount = completedCommIds.size;
  const completedLeaderCount = completedLeaderIds.size;
  const completedTeamCount = completedTeamIds.size;
  const completedMoneyCount = completedMoneyIds.size;
  const completedConfidenceCount = completedConfidenceIds.size;
  const completedCriticalCount = completedCriticalIds.size;
  const completedInnovCount = completedInnovIds.size;
  const completedArtCount = completedArtIds.size;
  const completedLifeCount = completedLifeIds.size;
  const totalCompleted = completedCount + completedMoveCount + completedWritingCount + completedEmotionCount + completedCommCount + completedLeaderCount + completedTeamCount + completedMoneyCount + completedConfidenceCount + completedCriticalCount + completedInnovCount + completedArtCount + completedLifeCount;
  const totalAvailable = EXERCISES.length + MOVEMENT_EXERCISES.length + WRITING_EXERCISES.length + EMOTION_EXERCISES.length + COMMUNICATION_EXERCISES.length + COMMUNICATION_EXERCISES_UNIT2.length + LEADERSHIP_EXERCISES.length + TEAMWORK_EXERCISES.length + FINANCIAL_EXERCISES.length + CONFIDENCE_EXERCISES.length + CRITICAL_EXERCISES.length + INNOV_EXERCISES.length + ART_EXERCISES.length + LIFE_EXERCISES.length;
  const progressPercent = totalAvailable > 0 ? Math.round((totalCompleted / totalAvailable) * 100) : 0;

  // Compile lists of all completed exercises for the certificate download
  const completedCalmList = EXERCISES.filter(ex => localCompletedIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedMoveList = MOVEMENT_EXERCISES.filter(ex => completedMoveIds.has(ex.id)).map(ex => isRtl ? ex.command_ar : ex.command_en);
  const completedWritingList = WRITING_EXERCISES.filter(ex => completedWritingIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedEmotionList = EMOTION_EXERCISES.filter(ex => completedEmotionIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedCommList = [...COMMUNICATION_EXERCISES, ...COMMUNICATION_EXERCISES_UNIT2].filter(ex => completedCommIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedLeaderList = LEADERSHIP_EXERCISES.filter(ex => completedLeaderIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedTeamList = TEAMWORK_EXERCISES.filter(ex => completedTeamIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedMoneyList = FINANCIAL_EXERCISES.filter(ex => completedMoneyIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedConfidenceList = CONFIDENCE_EXERCISES.filter(ex => completedConfidenceIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedCriticalList = CRITICAL_EXERCISES.filter(ex => completedCriticalIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedInnovList = INNOV_EXERCISES.filter(ex => completedInnovIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedArtList = ART_EXERCISES.filter(ex => completedArtIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);
  const completedLifeList = LIFE_EXERCISES.filter(ex => completedLifeIds.has(ex.id)).map(ex => isRtl ? ex.title_ar : ex.title_en);

  const allCompletedTitles = [
    ...completedCalmList,
    ...completedMoveList,
    ...completedWritingList,
    ...completedEmotionList,
    ...completedCommList,
    ...completedLeaderList,
    ...completedTeamList,
    ...completedMoneyList,
    ...completedConfidenceList,
    ...completedCriticalList,
    ...completedInnovList,
    ...completedArtList,
    ...completedLifeList
  ];

  const handleExportOasisCard = async () => {
    setIsExporting(true);
    setTimeout(async () => {
      const element = document.getElementById('balance-oasis-capture-card');
      if (element) {
        try {
          const originalStyle = element.getAttribute('style') || '';
          element.setAttribute('style', 'width: 700px; min-height: 620px; position: fixed; top: 0px; left: 0px; z-index: -9999; opacity: 0.99; pointer-events: none;');

          const options = {
            cacheBust: true,
            pixelRatio: 2.5,
            backgroundColor: '#030712',
            styleSheetsFilter: (styleSheet: CSSStyleSheet) => {
              try {
                const rules = styleSheet.cssRules;
                return true;
              } catch (e) {
                return false;
              }
            }
          };

          // Call toPng twice: first call caches font/styling assets, second call outputs high-quality image
          await toPng(element, options);
          const dataUrl = await toPng(element, options);

          // Restore original hidden style
          element.setAttribute('style', originalStyle);

          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `Oasis-Achievements-${customStudentName || 'Hero'}-${new Date().getTime()}.png`;
          link.click();
        } catch (error) {
          console.error("Error generating Balance Oasis report card image:", error);
          alert(isRtl ? 'حدث خطأ أثناء تصدير بطاقة الإنجاز كصورة عالية الدقة' : 'Error exporting achievement card image');
        }
      }
      setIsExporting(false);
    }, 400);
  };

  const handleExportSingleExercise = (ex: any, type: 'calm' | 'move' | 'writing' | 'emotion' | 'communication' | 'leadership' | 'teamwork' | 'money' | 'confidence' | 'critical' | 'innov' | 'art' | 'life') => {
    let title = '';
    let category = '';
    let categoryEn = '';
    let content = '';
    let steps: string[] = [];
    let benefitLabel = isRtl ? 'الفائدة والأثر والنفسي المكتسب:' : 'Developmental Benefit Focus:';
    let benefit = '';
    let emoji = '🧘';

    if (type === 'calm') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'واحة السكينة والتركيز الدراسي';
      categoryEn = 'Calm & Intellectual focus Oasis';
      content = isRtl ? ex.script_ar : ex.script_en;
      benefit = isRtl ? 'يساعد على خفض درجات التوتر النفسي والذهني وتهدئة النبض وتثبيت الانتباه وبث طاقة الدرس.' : 'Helps minimize intellectual cognitive stress, slow down heart rates, and foster overall learning patience.';
      emoji = '🧘';
    } else if (type === 'move') {
      title = isRtl ? ex.command_ar : ex.command_en;
      category = 'التدفق والتنشيط الحركي الذكي';
      categoryEn = 'Kinetic Flow & Energy breaks';
      content = isRtl ? ex.description_ar : ex.command_en;
      if (ex.say_while_moving) {
        steps.push(isRtl ? `قل أثناء الحركة: "${ex.say_while_moving}"` : `Say while moving: "${ex.say_while_moving}"`);
      }
      benefit = isRtl ? ex.benefit_ar : 'Reduces muscle fatigue and refreshes screen-tired vision.';
      emoji = '🏃';
    } else if (type === 'writing') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'التفكير التأملي والتحليل اللإبداعي كتابةً';
      categoryEn = 'Reflective Writing & Critical Creativity';
      content = isRtl ? ex.description_ar : ex.title_en;
      if (ex.steps_ar) {
        steps = Array.isArray(ex.steps_ar) ? ex.steps_ar : [ex.steps_ar];
      }
      if (ex.skill_focus) {
        benefitLabel = isRtl ? 'مهارات التعبير المستهدفة:' : 'Creative Skill Focus:';
        benefit = isRtl ? ex.skill_focus : 'Fosters creative and personal synthesis skills.';
      }
      emoji = ex.emoji || '✍️';
    } else if (type === 'emotion') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'الذكاء الوجداني والوعي الذاتي';
      categoryEn = 'Social Emotional Intellect';
      content = isRtl ? ex.description_ar : ex.title_en;
      if (ex.exercise_steps_ar) {
        steps = Array.isArray(ex.exercise_steps_ar) ? ex.exercise_steps_ar : [ex.exercise_steps_ar];
      }
      if (ex.core_purpose_ar) {
        benefitLabel = isRtl ? 'الهدف النفسي الذاتي:' : 'Core Emotional Purpose:';
        benefit = ex.core_purpose_ar;
      }
      emoji = ex.emoji || '🧠';
    } else if (type === 'communication') {
      const isUnit2 = ex.id && (ex.id.includes('u2') || commActiveUnit === 2);
      title = isRtl ? ex.title_ar : ex.title_en;
      category = isUnit2
        ? 'الذكاء الاجتماعي والتواصل الربيعي (الوحدة الثانية)'
        : 'البلاغة والتواصل الاجتماعي الفعال (الوحدة الأولى)';
      categoryEn = isUnit2
        ? 'Spring Social Intelligence (Unit 2)'
        : 'Dynamic Eloquent Communication (Unit 1)';
      content = isRtl ? ex.description_ar : ex.title_en;
      if (isRtl ? ex.steps_ar : ex.steps_en) {
        const stepsList = isRtl ? ex.steps_ar : ex.steps_en;
        steps = Array.isArray(stepsList) ? stepsList : [stepsList];
      } else if (ex.step_by_step_ar) {
        steps = Array.isArray(ex.step_by_step_ar) ? ex.step_by_step_ar : [ex.step_by_step_ar];
      }
      if (ex.outcome_ar || ex.skill_focus) {
        benefitLabel = isRtl ? 'المهارة الدبلوماسية والأثر الاجتماعي المكتسب:' : 'Target Social Skill & Outcome:';
        benefit = isRtl
          ? `${ex.skill_focus ? ex.skill_focus + ' - ' : ''}${ex.outcome_ar || ''}`
          : `${ex.skill_focus ? ex.skill_focus + ' - ' : ''}${ex.outcome_ar || ''}`;
      } else if (ex.social_skill_ar) {
        benefitLabel = isRtl ? 'المهارة الدبلوماسية المكتسبة:' : 'Target Social Skill:';
        benefit = ex.social_skill_ar;
      }
      emoji = ex.emoji || (isUnit2 ? '🌸' : '💬');
    } else if (type === 'leadership') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'روح المبادرة والقيادة الريادية';
      categoryEn = 'Pioneering Leadership & Bravery';
      content = ex.mission_brief_ar || (isRtl ? ex.title_ar : ex.title_en);
      if (ex.action_challenge_ar) {
        steps.push(isRtl ? `تحدي المهمة القيادية: ${ex.action_challenge_ar}` : `Action Challenge: ${ex.action_challenge_ar}`);
      }
      if (ex.leadership_lens_ar) {
        benefitLabel = isRtl ? 'المنظور القيادي والشخصي المطور:' : 'Leadership Perspective:';
        benefit = ex.leadership_lens_ar;
      }
      emoji = ex.emoji || '👑';
    } else if (type === 'teamwork') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'التعاون التشاركي والتلاحم الأسري';
      categoryEn = 'Cooperative Team Cohesion';
      content = ex.coop_activity_ar || (isRtl ? ex.title_ar : ex.title_en);
      if (ex.connection_prompt_ar) {
        steps.push(isRtl ? `حوار التلاحم الفكري الأسري: "${ex.connection_prompt_ar}"` : `Connection Query: "${ex.connection_prompt_ar}"`);
      }
      if (ex.cohesion_focus_ar) {
        benefitLabel = isRtl ? 'البعد التشاركي المعزز للمهارات:' : 'Cohesion Goal:';
        benefit = ex.cohesion_focus_ar;
      }
      emoji = ex.emoji || '🤝';
    } else if (type === 'money') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'الثقافة المالية المبكرة';
      categoryEn = 'Early Financial Literacy';
      content = ex.description_ar;
      if (ex.steps_ar) {
        steps = Array.isArray(ex.steps_ar) ? ex.steps_ar : [ex.steps_ar];
      }
      benefitLabel = isRtl ? 'المهارة والوعي والأثر المالي المكتسب:' : 'Financial Target & Practical Outcome:';
      benefit = isRtl ? `${ex.skill_focus} - ${ex.outcome_ar}` : `${ex.skill_focus} - ${ex.outcome_ar}`;
      emoji = ex.emoji || '💰';
    } else if (type === 'confidence') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'الثقة بالنفس والتحدث أمام الجمهور';
      categoryEn = 'Self-Confidence & Public Speaking';
      content = ex.description_ar;
      if (ex.steps_ar) {
        steps = Array.isArray(ex.steps_ar) ? ex.steps_ar : [ex.steps_ar];
      }
      benefitLabel = isRtl ? 'الركن المستهدف والأثر السلوكي المعزز للثقة:' : 'Confidence Target & Behavioral Outcome:';
      benefit = isRtl ? `${ex.skill_focus} - ${ex.outcome_ar}` : `${ex.skill_focus} - ${ex.outcome_ar}`;
      emoji = ex.emoji || '🎙️';
    } else if (type === 'critical') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'التفكير النقدي وحل المشكلات';
      categoryEn = 'Critical Thinking & Problem Solving';
      content = ex.description_ar;
      if (ex.steps_ar) {
        steps = Array.isArray(ex.steps_ar) ? ex.steps_ar : [ex.steps_ar];
      }
      benefitLabel = isRtl ? 'الأثر السلوكي وهدف التفكير النقدي:' : 'Critical Thinking Target & Outcome:';
      benefit = isRtl ? `${ex.skill_focus} - ${ex.outcome_ar}` : `${ex.skill_focus} - ${ex.outcome_ar}`;
      emoji = ex.emoji || '🧐';
    } else if (type === 'innov') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'مبتكرون بالفطرة والمبادرات الإبداعية';
      categoryEn = 'Natural Innovators & Micro-Enterprise';
      content = ex.description_ar;
      if (ex.steps_ar) {
        steps = Array.isArray(ex.steps_ar) ? ex.steps_ar : [ex.steps_ar];
      }
      benefitLabel = isRtl ? 'الأثر السلوكي وتطوير عقلية ريادة الأعمال:' : 'Entrepreneurial Mindset & Target Benefit:';
      benefit = isRtl ? `${ex.skill_focus} - ${ex.outcome_ar}` : `${ex.skill_focus} - ${ex.outcome_ar}`;
      emoji = ex.emoji || '💡';
    } else if (type === 'art') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'نوافذ الفن والجمال والأدب';
      categoryEn = 'Literary & Creative Arts (Windows of Beauty)';
      content = ex.description_ar;
      if (ex.steps_ar) {
        steps = Array.isArray(ex.steps_ar) ? ex.steps_ar : [ex.steps_ar];
      }
      benefitLabel = isRtl ? 'الأثر السلوكي وتطوير التعبير الجمالي والأدبي:' : 'Aesthetic Expression & Creative Literature Benefit:';
      benefit = isRtl ? `${ex.skill_focus} - ${ex.outcome_ar}` : `${ex.skill_focus} - ${ex.outcome_ar}`;
      emoji = ex.emoji || '🎨';
    } else if (type === 'life') {
      title = isRtl ? ex.title_ar : ex.title_en;
      category = 'بطل الحياة والسلامة والاعتماد الذاتي';
      categoryEn = 'Life Skills, Emergency Actions & Independence';
      content = ex.description_ar;
      if (ex.steps_ar) {
        steps = Array.isArray(ex.steps_ar) ? ex.steps_ar : [ex.steps_ar];
      }
      benefitLabel = isRtl ? 'الأثر والاعتماد وتطوير السلوك المستقل والآمن:' : 'Independence, Safety & Life Skills Benefit:';
      benefit = isRtl ? `${ex.skill_focus} - ${ex.outcome_ar}` : `${ex.skill_focus} - ${ex.outcome_ar}`;
      emoji = ex.emoji || '💪';
    }

    setExerciseToExport({
      id: ex.id,
      title,
      category,
      categoryEn,
      content,
      steps,
      benefitLabel,
      benefit,
      emoji
    });
    setExportingExerciseId(ex.id);

    setTimeout(async () => {
      const element = document.getElementById('single-exercise-capture-card');
      if (element) {
        try {
          const originalStyle = element.getAttribute('style') || '';
          element.setAttribute('style', 'width: 700px; min-height: 620px; position: fixed; top: 0px; left: 0px; z-index: -9999; opacity: 0.99; pointer-events: none;');

          const options = {
            cacheBust: true,
            pixelRatio: 2.5,
            backgroundColor: '#020617',
            styleSheetsFilter: (styleSheet: CSSStyleSheet) => {
              try {
                const rules = styleSheet.cssRules;
                return true;
              } catch (e) {
                return false;
              }
            }
          };

          // Call toPng twice: first call caches font/styling assets, second call outputs high-quality image
          await toPng(element, options);
          const dataUrl = await toPng(element, options);

          // Restore original hidden style
          element.setAttribute('style', originalStyle);

          const link = document.createElement('a');
          link.href = dataUrl;
          const cleanTitle = title.replace(/[\s\/:]/g, '-');
          link.download = `Oasis-Exercise-${cleanTitle}-${new Date().getTime()}.png`;
          link.click();
        } catch (error) {
          console.error("Error creating exercise card:", error);
          alert(isRtl ? 'حدث خطأ أثناء تصدير بطاقة التمرين كصورة عالية الدقة' : 'Error generating certified exercise card image');
        }
      }
      setExportingExerciseId(null);
    }, 450);
  };

  const handleExportUnitSummary = (unitNum: 1 | 2) => {
    const exercises = unitNum === 1 ? COMMUNICATION_EXERCISES : COMMUNICATION_EXERCISES_UNIT2;
    const title = unitNum === 1
      ? (isRtl ? 'الوحدة الأولى: الإنصات الفعال والترابط الاجتماعي (20 تمرين)' : 'Unit 1: Active Listening & Social Connection (20 Exercises)')
      : (isRtl ? 'الوحدة الثانية: الذكاء الاجتماعي الربيعي والتواصل الداعم (20 تمرين)' : 'Unit 2: Spring Social Intelligence & Supportive Communication (20 Exercises)');

    setUnitToExport({ unitNumber: unitNum, title, exercises });
    setIsExportingUnit(true);

    setTimeout(async () => {
      const element = document.getElementById('unit-summary-capture-card');
      if (element) {
        try {
          const originalStyle = element.getAttribute('style') || '';
          element.setAttribute('style', 'width: 1000px; position: fixed; top: 0px; left: 0px; z-index: -9999; opacity: 0.99; pointer-events: none;');

          const options = {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: '#0b1736',
            styleSheetsFilter: (styleSheet: CSSStyleSheet) => true
          };

          await toPng(element, options);
          const dataUrl = await toPng(element, options);

          element.setAttribute('style', originalStyle);

          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `Oasis-Communication-Unit-${unitNum}-Steps-Poster-${new Date().getTime()}.png`;
          link.click();
        } catch (error) {
          console.error("Error generating unit summary poster image:", error);
          alert(isRtl ? 'حدث خطأ أثناء تصدير بوستر خطوات الوحدة كصورة' : 'Error exporting unit summary poster image');
        }
      }
      setIsExportingUnit(false);
    }, 450);
  };

  return (
    <div className="w-full text-right space-y-8" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 1. Header Banner */}
      <div className="relative bg-gradient-to-r from-teal-900/40 via-[#162a4d]/90 to-teal-900/40 border border-teal-500/20 rounded-[2.5rem] p-8 md:p-10 overflow-hidden text-right shadow-2xl">
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

          {/* Progress Widget & Customizable Export Dashboard */}
          <div className="bg-[#12244a] border border-white/10 rounded-2xl p-5 w-full md:w-72 space-y-3 shrink-0">
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

            <div className="border-t border-white/5 pt-2.5 space-y-2">
              <label className="block text-[10px] text-slate-400 font-bold text-right">
                {isRtl ? 'اسم البطل على بطاقة الإنجاز:' : 'Hero Name on Certificate:'}
              </label>
              <input
                type="text"
                value={customStudentName}
                onChange={(e) => setCustomStudentName(e.target.value)}
                placeholder={isRtl ? 'اكتب اسمك هنا لتخصيص الصورة' : 'Type name here to customize'}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 text-right transition-all block"
              />
              
              <button
                disabled={isExporting}
                onClick={handleExportOasisCard}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:opacity-50 text-slate-950 font-black py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer mt-1"
              >
                {isExporting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin text-slate-950" />
                    <span>{isRtl ? 'جاري التصدير...' : 'Exporting...'}</span>
                  </>
                ) : (
                  <>
                    <Download size={13} strokeWidth={3} className="text-slate-950" />
                    <span>{isRtl ? 'تحميل بطاقة الإنجاز 📸' : 'Download report card 📸'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-Tab Selector */}
      {!isPlaying && !isMovePlaying && !completionSession && (
        <div className="grid grid-cols-2 lg:flex lg:flex-wrap bg-[#13284f] p-1 rounded-2xl border border-white/5 max-w-5xl mx-auto shadow-xl gap-1 justify-center">
          <button
            onClick={() => {
              setActiveSubTab('calm');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
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
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
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
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
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
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
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
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'communication'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-blue-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>💬</span>
            {isRtl ? 'التواصل الإيجابي والذكاء الاجتماعي' : 'Positive Communication'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('leadership');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'leadership'
                ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-slate-950 font-black shadow-lg shadow-rose-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>👑</span>
            {isRtl ? 'القيادة وإدارة الوقت' : 'Leadership & Time'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('teamwork');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'teamwork'
                ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-slate-950 font-black shadow-lg shadow-indigo-500/15'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>🤝</span>
            {isRtl ? 'التعاون والمشاريع الجماعية' : 'Cooperation & Teamwork'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('money');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'money'
                ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-slate-950 font-black shadow-lg shadow-orange-500/15'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>☀️💰</span>
            {isRtl ? 'الثقافة المالية المبكرة' : 'Early Finance'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('confidence');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'confidence'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-950 font-black shadow-lg shadow-orange-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>🎙️</span>
            {isRtl ? 'الثقة والخطابة' : 'Self-Confidence'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('critical');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'critical'
                ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-slate-950 font-black shadow-lg shadow-pink-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>🧐💡</span>
            {isRtl ? 'التفكير النقدي وحل المشكلات' : 'Critical Thinking'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('innov');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'innov'
                ? 'bg-gradient-to-r from-yellow-400 via-amber-400 to-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>💡✨</span>
            {isRtl ? 'مبتكرون بالفطرة' : 'Natural Innovators'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('art');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
              setSelectedArtEx(null);
              setSelectedLifeEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'art'
                ? 'bg-gradient-to-r from-pink-400 via-rose-400 to-indigo-400 text-slate-950 font-black shadow-lg shadow-pink-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>🎨✨</span>
            {isRtl ? 'الأدب والفنون والجمال' : 'Literature & Arts'}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('life');
              setSelectedWritingEx(null);
              setSelectedEmotionEx(null);
              setSelectedCommEx(null);
              setSelectedLeaderEx(null);
              setSelectedTeamEx(null);
              setSelectedMoneyEx(null);
              setSelectedConfidenceEx(null);
              setSelectedCriticalEx(null);
              setSelectedInnovEx(null);
              setSelectedArtEx(null);
              setSelectedLifeEx(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'life'
                ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black shadow-lg shadow-teal-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>🦸✨</span>
            {isRtl ? 'بطل الحياة والسلامة' : 'Life Skills & Safety'}
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
            className="bg-[#15274d] border border-teal-500/20 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
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
              <div className="w-full bg-[#162d57] border border-white/5 rounded-2xl p-6 space-y-6">
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
            className="bg-[#15274d] border border-teal-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center"
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

                  <span className="text-xs bg-[#1e345c] border border-white/5 px-3 py-1.5 rounded-xl text-slate-300 font-bold flex items-center gap-1.5 font-mono">
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
                <div className="flex gap-2 flex-wrap justify-center items-center">
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

                  {/* Export Exercise as High-Quality Image */}
                  <button
                    disabled={exportingExerciseId !== null}
                    onClick={() => handleExportSingleExercise(selectedEx, 'calm')}
                    className="bg-amber-500/10 border border-amber-500/20 hover:border-amber-500 hover:text-amber-300 text-[#C49E3A] px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                    title={isRtl ? "تصدير وحفظ بطاقة التمرين كصورة عالية الدقة 📸" : "Export Exercise Card as Image 📸"}
                  >
                    {exportingExerciseId === selectedEx.id ? (
                      <RefreshCw size={13} className="animate-spin text-amber-500" />
                    ) : (
                      <span>📸</span>
                    )}
                    {isRtl ? 'حفظ للتصدير كصورة' : 'Save as Image'}
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
            className="bg-[#13244a] border border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center"
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
                <div className="flex gap-2 flex-wrap justify-center items-center">
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

                  {/* Export Exercise as High-Quality Image */}
                  <button
                    disabled={exportingExerciseId !== null}
                    onClick={() => handleExportSingleExercise(selectedMoveEx, 'move')}
                    className="bg-amber-500/10 border border-amber-500/20 hover:border-amber-500 hover:text-amber-300 text-[#C49E3A] px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                    title={isRtl ? "تصدير وحفظ بطاقة التمرين كصورة عالية الدقة 📸" : "Export Exercise Card as Image 📸"}
                  >
                    {exportingExerciseId === selectedMoveEx.id ? (
                      <RefreshCw size={13} className="animate-spin text-amber-500" />
                    ) : (
                      <span>📸</span>
                    )}
                    {isRtl ? 'حفظ للتصدير كصورة' : 'Save as Image'}
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
            className="bg-[#13244a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6"
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
                        className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#13284f] flex flex-col justify-between group ${
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

                        {/* Play Session CTA and Export */}
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleStartSession(ex)}
                            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border ${
                              isCompleted 
                                ? 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300 border-emerald-500/10'
                                : 'bg-teal-500/5 group-hover:bg-teal-500 group-hover:text-slate-950 text-teal-400 border-teal-500/10 group-hover:border-teal-500'
                            }`}
                          >
                            <Play size={11} fill="currentColor" />
                            {isRtl ? 'البدء بتمرين الهدوء' : 'Begin Relaxation'}
                          </button>
                          
                          <button
                            disabled={exportingExerciseId !== null}
                            onClick={() => handleExportSingleExercise(ex, 'calm')}
                            className="bg-[#243d70] border border-white/5 hover:border-amber-500 hover:text-amber-300 text-slate-400 p-2.5 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                            title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                          >
                            {exportingExerciseId === ex.id ? (
                              <RefreshCw size={12} className="animate-spin text-amber-400" />
                            ) : (
                              <Download size={12} strokeWidth={3} />
                            )}
                          </button>
                        </div>
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
                        className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#13284f] flex flex-col justify-between group ${
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

                        {/* CTA button and Export */}
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleStartMoveSession(ex)}
                            className={`flex-1 py-2 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border ${
                              isCompleted 
                                ? 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300 border-emerald-500/10'
                                : 'bg-amber-500/5 group-hover:bg-amber-500 group-hover:text-slate-950 text-amber-400 border-amber-500/20 group-hover:border-amber-500'
                            }`}
                          >
                            <span>🏃</span>
                            {isRtl ? 'البدء بتحدي الحركة' : 'Start Active Break'}
                          </button>

                          <button
                            disabled={exportingExerciseId !== null}
                            onClick={() => handleExportSingleExercise(ex, 'move')}
                            className="bg-[#243d70] border border-white/5 hover:border-amber-500 hover:text-amber-300 text-slate-400 p-2 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                            title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                          >
                            {exportingExerciseId === ex.id ? (
                              <RefreshCw size={12} className="animate-spin text-amber-400" />
                            ) : (
                              <Download size={12} strokeWidth={3} />
                            )}
                          </button>
                        </div>
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
                      {isRtl ? 'العودة لقائمة تمارين الكتابة القصصية' : 'Back to Writing Prompts'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#1e345c] border border-white/5 px-3 py-1.5 rounded-xl text-[#c084fc] font-bold font-mono">
                        🎯 {isRtl ? selectedWritingEx.skill_focus : 'Focus Area'}
                      </span>
                      <span className="text-xs bg-[#1e345c] border border-white/5 px-3 py-1.5 rounded-xl text-emerald-400 font-bold font-mono">
                        ✨ {isRtl ? selectedWritingEx.activity_type : 'Type'}
                      </span>
                    </div>
                  </div>

                  {/* Core Editor Container Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Left Column: Notepad Textarea */}
                    <div className="lg:col-span-8 bg-[#142345] border border-purple-500/10 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <label className="block text-xs font-black text-purple-400 uppercase tracking-widest text-right">
                          {isRtl ? 'صندوق التعبير والإنتاج الوجداني والقصصي' : 'Creative Writing & Emotional Expression Panel'}
                        </label>
                        <p className="text-[11px] text-slate-400 text-right italic leading-relaxed">
                          {isRtl ? 'اكتب ما يجول بخاطرك وباشر إبداعك طبقاً لخطوات التمرين على اليسار. يتم الحفظ تلقائياً في المتصفح بكل أمان.' : 'Write your creative story or response following the challenge steps. Your work is safely auto-saved.'}
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
                        placeholder={isRtl 
                          ? `ابدأ بكتابة قصتك وإبداعك هنا متبعاً خطوات التحدي...` 
                          : `Start writing your story here, following the challenge steps...`}
                        className="w-full min-h-[250px] bg-[#101d36] border border-white/5 focus:border-purple-500/50 rounded-xl p-4 text-sm md:text-base text-slate-100 placeholder-slate-500 focus:outline-none transition leading-relaxed text-right"
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
                            const stepsText = (isRtl ? selectedWritingEx.steps_ar : selectedWritingEx.steps_en).join('. ');
                            const fullText = (isRtl ? `التمرين: ${selectedWritingEx.title_ar}. المهارة المستهدفة: ${selectedWritingEx.skill_focus}. التفاصيل: ${selectedWritingEx.description_ar}. خطوات التطبيق: ` : 'Exercise Description: ') + stepsText;
                            
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
                            : (isRtl ? 'قراءة التحدي والخطوات بصوت الذكاء 🎙️' : 'Read Prompt Out Loud')}
                        </button>

                        {/* Export Draft Text */}
                        <button
                          onClick={() => {
                            if (!selectedWritingEx) return;
                            const title = isRtl ? selectedWritingEx.title_ar : selectedWritingEx.title_en;
                            const desc = isRtl ? selectedWritingEx.description_ar : selectedWritingEx.title_en;
                            const val = writingDraft || '';
                            const fileContent = `=== ${title} ===\n\nChallenge: ${desc}\n\nMy Story:\n---------------\n${val}\n\nWritten on Balance Oasis Notebook of Creative Expression & Emotional Intelligence.`;
                            
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

                        {/* Export Exercise as High-Quality Image */}
                        <button
                          disabled={exportingExerciseId !== null}
                          onClick={() => handleExportSingleExercise(selectedWritingEx, 'writing')}
                          className="bg-amber-500/10 border border-amber-500/20 hover:border-amber-500 hover:text-amber-300 text-[#C49E3A] px-3 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                          title={isRtl ? "تصدير وحفظ بطاقة التمرين كصورة عالية الدقة 📸" : "Export Exercise Card as Image 📸"}
                        >
                          {exportingExerciseId === selectedWritingEx.id ? (
                            <RefreshCw size={13} className="animate-spin text-amber-500" />
                          ) : (
                            <span>📸</span>
                          )}
                          {isRtl ? 'حفظ للتصدير كصورة' : 'Save as Image'}
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

                    {/* Right Column: Prompt Guideline Board & Steps Checklist */}
                    <div className="lg:col-span-4 bg-[#13284f] border border-white/5 rounded-2xl p-5 flex flex-col justify-between text-right space-y-4">
                      <div className="space-y-4">
                        <div className="text-center pb-3 border-b border-white/5">
                          <span className="text-3xl">{selectedWritingEx.emoji || '✍️'}</span>
                          <h4 className="text-base font-black text-white mt-1">
                            {isRtl ? selectedWritingEx.title_ar : selectedWritingEx.title_en}
                          </h4>
                          <h5 className="text-[11px] text-slate-400 mt-0.5 font-mono">
                            {selectedWritingEx.title_en}
                          </h5>
                        </div>

                        <div className="space-y-3" dir="rtl">
                          <div>
                            <h6 className="text-[10px] font-black uppercase text-purple-400 tracking-wider">
                              {isRtl ? 'وصف التحدي الإبداعي وطرحه:' : 'Creative Task Description:'}
                            </h6>
                            <p className="text-xs text-slate-300 leading-relaxed mt-1">
                              {isRtl ? selectedWritingEx.description_ar : 'Engage with this deep self-awareness scenario.'}
                            </p>
                          </div>

                          {/* Steps Checklist */}
                          <div className="space-y-2 mt-2 pt-2 border-t border-white/5">
                            <h6 className="text-[10px] font-black uppercase text-purple-400 tracking-wider mb-2">
                              {isRtl ? 'خطوات التطبيق العملي للنشاط والقصة:' : 'Practical Steps Checklist:'}
                            </h6>
                            <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                              {(isRtl ? selectedWritingEx.steps_ar : selectedWritingEx.steps_en).map((step, sIdx) => {
                                const isChecked = writingStepsChecked[sIdx] || false;
                                return (
                                  <button
                                    key={sIdx}
                                    onClick={() => {
                                      const updated = [...writingStepsChecked];
                                      updated[sIdx] = !updated[sIdx];
                                      setWritingStepsChecked(updated);
                                    }}
                                    className={`w-full text-right p-2.5 rounded-xl border transition-all text-[11px] flex items-start gap-2.5 cursor-pointer select-none ${
                                      isChecked 
                                        ? 'bg-purple-500/10 border-purple-500/20 text-purple-200' 
                                        : 'bg-[#142345] border-white/5 text-slate-400 hover:border-purple-500/10'
                                    }`}
                                  >
                                    <span className={`mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                                      isChecked 
                                        ? 'bg-purple-500 border-purple-500 text-slate-950' 
                                        : 'border-slate-600 text-transparent'
                                    }`}>
                                      <Check size={9} strokeWidth={4} />
                                    </span>
                                    <p className="font-medium leading-relaxed text-right flex-1">{step}</p>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5">
                            <h6 className="text-[10px] font-black uppercase text-purple-400 tracking-wider">
                              {isRtl ? 'الأثر النفسي والتربوي المتوقع:' : 'Expected Outcome:'}
                            </h6>
                            <p className="text-xs text-slate-300 leading-relaxed mt-1">
                              🌟 {isRtl ? selectedWritingEx.outcome_ar : 'Deep creative thinking and self-discovery.'}
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
                          setSelectedEmotionEx(null);
                          setSelectedCommEx(null);
                          setSelectedLeaderEx(null);
                          setSelectedTeamEx(null);
                          setCompletionSession({
                            type: 'writing',
                            id: selectedWritingEx.id,
                            title: isRtl ? selectedWritingEx.title_ar : selectedWritingEx.title_en,
                            duration: 15 * 60 // average 15 minutes
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
                          className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#13284f] flex flex-col justify-between group ${
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

                          {/* Open Notepad CTA and Export */}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setSelectedWritingEx(ex)}
                              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isCompleted
                                  ? 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300 border-emerald-500/10'
                                  : 'bg-purple-500/5 group-hover:bg-purple-500 group-hover:text-slate-950 text-purple-400 border-purple-500/10 group-hover:border-purple-500'
                              }`}
                            >
                              <FileText size={11} />
                              {isRtl ? 'فتح التحدي ودفتر التعبير' : 'Open Creative Notepad'}
                            </button>

                            <button
                              disabled={exportingExerciseId !== null}
                              onClick={() => handleExportSingleExercise(ex, 'writing')}
                              className="bg-[#243d70] border border-white/5 hover:border-amber-500 hover:text-amber-300 text-slate-400 p-2.5 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                              title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                            >
                              {exportingExerciseId === ex.id ? (
                                <RefreshCw size={12} className="animate-spin text-amber-400" />
                              ) : (
                                <Download size={12} strokeWidth={3} />
                              )}
                            </button>
                          </div>
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
                      <span className="text-xs bg-[#1e345c] border border-white/5 px-3 py-1.5 rounded-xl text-slate-300 font-bold font-mono">
                        🎯 {isRtl ? selectedEmotionEx.feeling_focus : 'Focus Area'}
                      </span>
                      <span className="text-xs bg-[#1e345c] border border-white/5 px-3 py-1.5 rounded-xl text-[#059669] font-bold font-mono">
                        ✨ {isRtl ? selectedEmotionEx.activity_type : 'Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Step checklist */}
                    <div className="lg:col-span-8 bg-[#142345] border border-white/5 rounded-3xl p-6 space-y-6 shadow-2xl">
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
                                    : 'bg-[#1d315c] border-white/5 text-slate-300 hover:border-emerald-500/20'
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
                      <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
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

                        <button
                          disabled={exportingExerciseId !== null}
                          onClick={() => handleExportSingleExercise(selectedEmotionEx, 'emotion')}
                          className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 hover:border-amber-500 hover:text-amber-300 text-[#C49E3A] rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer active:scale-95"
                          title={isRtl ? "تصدير وحفظ بطاقة التمرين كصورة عالية الدقة 📸" : "Export Exercise Card as Image 📸"}
                        >
                          {exportingExerciseId === selectedEmotionEx.id ? (
                            <RefreshCw size={13} className="animate-spin text-amber-500" />
                          ) : (
                            <span>📸</span>
                          )}
                          {isRtl ? 'حفظ وتصدير التمرين كصورة' : 'Save as Image'}
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Outcomes & Completion */}
                    <div className="lg:col-span-4 bg-[#13284f] border border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-6 text-right">
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
                                    : 'bg-[#13284f]/50 border-white/5 text-slate-400 hover:border-white/10'
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
                            className="w-full bg-[#142345] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500 text-right"
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
                      <div className="lg:col-span-5 bg-[#142345] p-5 rounded-2xl border border-white/5 space-y-4 max-h-[340px] overflow-y-auto">
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
                                <div key={log.id} className="p-3 bg-[#1a2d54] rounded-xl border border-white/5 flex items-center justify-between text-xs gap-3">
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
                            className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#13284f] flex flex-col justify-between group ${
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

                            {/* CTA button and Export */}
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => setSelectedEmotionEx(ex)}
                                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                  isCompleted
                                    ? 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300 border-emerald-500/10'
                                    : 'bg-emerald-500/5 group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-400 border-emerald-500/10 group-hover:border-emerald-500'
                                }`}
                              >
                                <span>⚡</span>
                                {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                              </button>

                              <button
                                disabled={exportingExerciseId !== null}
                                onClick={() => handleExportSingleExercise(ex, 'emotion')}
                                className="bg-[#243d70] border border-white/5 hover:border-amber-500 hover:text-amber-300 text-slate-400 p-2.5 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                                title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                              >
                                {exportingExerciseId === ex.id ? (
                                  <RefreshCw size={12} className="animate-spin text-amber-400" />
                                ) : (
                                  <Download size={12} strokeWidth={3} />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )
            ) : activeSubTab === 'communication' ? (
              // Active SubTab === 'communication' - Positive Communication & Social Intelligence Exercises (Unit 1 & Unit 2)
              <div className="space-y-6">
                {/* Unit Switcher Header Banner */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 p-3 rounded-2xl border border-white/10 shadow-xl" dir="rtl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => {
                        setCommActiveUnit(1);
                        setSelectedCommEx(null);
                        stopSpeech();
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 flex items-center gap-2 cursor-pointer select-none ${
                        commActiveUnit === 1
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className="text-sm">💬</span>
                      {isRtl ? 'الوحدة الأولى: الإنصات والترابط (20 تمرين)' : 'Unit 1: Listening & Connection'}
                    </button>

                    <button
                      onClick={() => {
                        setCommActiveUnit(2);
                        setSelectedCommEx(null);
                        stopSpeech();
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 flex items-center gap-2 cursor-pointer select-none ${
                        commActiveUnit === 2
                          ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                          : 'text-amber-300/90 hover:text-amber-200 hover:bg-amber-500/10 border border-amber-500/30'
                      }`}
                    >
                      <span className="text-sm">🌸☀️</span>
                      {isRtl ? 'الوحدة الثانية: الذكاء الاجتماعي الربيعي (20 تمرين)' : 'Unit 2: Spring Social Intelligence'}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      disabled={isExportingUnit}
                      onClick={() => handleExportUnitSummary(commActiveUnit)}
                      className="px-3.5 py-2 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-teal-500/20 border border-amber-400/40 hover:border-amber-400 text-amber-200 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md"
                      title={isRtl ? `تصدير كامل بوستر خطوات تمارين الوحدة ${commActiveUnit === 1 ? 'الأولى' : 'الثانية'} كصورة عالية الدقة 📸` : 'Export unit steps poster as image 📸'}
                    >
                      {isExportingUnit ? (
                        <RefreshCw size={13} className="animate-spin text-amber-400" />
                      ) : (
                        <Download size={13} strokeWidth={3} className="text-amber-400" />
                      )}
                      <span>
                        {isRtl
                          ? `تصدير بوستر خطوات الوحدة ${commActiveUnit === 1 ? '1' : '2'} كصورة 📸`
                          : `Export Unit ${commActiveUnit} Steps Poster 📸`}
                      </span>
                    </button>

                    <span className={`text-[11px] font-extrabold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-mono ${
                      commActiveUnit === 2
                        ? 'bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-emerald-500/10 border-amber-500/30 text-amber-300'
                        : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                    }`}>
                      <span>{commActiveUnit === 2 ? '🌸' : '💬'}</span>
                      {commActiveUnit === 2
                        ? (isRtl ? 'ثيم ربيعي صيفي مشرق ☀️' : 'Vibrant Spring/Summer Colors ☀️')
                        : (isRtl ? 'ثيم التواصل الهادئ 💙' : 'Calm Blue Communication 💙')}
                    </span>
                  </div>
                </div>

                {selectedCommEx ? (
                  <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                    {/* Step-by-Step interactive checklist container */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
                      <button
                        onClick={() => {
                          setSelectedCommEx(null);
                          stopSpeech();
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          commActiveUnit === 2
                            ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                        }`}
                      >
                        <ChevronRight size={14} />
                        {isRtl 
                          ? (commActiveUnit === 2 ? 'العودة لقائمة تمارين الوحدة الثانية (الربيعية)' : 'العودة لقائمة تمارين التواصل الاجتماعي') 
                          : 'Back to Exercises'}
                      </button>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs border px-3 py-1.5 rounded-xl font-bold font-mono ${
                          commActiveUnit === 2
                            ? 'bg-[#291e38] border-amber-500/20 text-amber-200'
                            : 'bg-[#1e345c] border-white/5 text-slate-300'
                        }`}>
                          🎯 {isRtl ? selectedCommEx.skill_focus : 'Focus Area'}
                        </span>
                        <span className={`text-xs border px-3 py-1.5 rounded-xl font-bold font-mono ${
                          commActiveUnit === 2
                            ? 'bg-[#291e38] border-rose-500/30 text-rose-300'
                            : 'bg-[#1e345c] border-white/5 text-[#3b82f6]'
                        }`}>
                          ✨ {isRtl ? selectedCommEx.activity_type : 'Type'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left Column: Step checklist */}
                      <div className={`lg:col-span-8 border rounded-3xl p-6 space-y-6 shadow-2xl ${
                        commActiveUnit === 2
                          ? 'bg-gradient-to-b from-[#251a36] via-[#1a2138] to-[#152a36] border-amber-500/20'
                          : 'bg-[#142345] border-white/5'
                      }`}>
                        <div className="space-y-2">
                          <span className="text-3xl">{selectedCommEx.emoji || (commActiveUnit === 2 ? '🌸' : '💬')}</span>
                          <h3 className="text-xl font-black text-white flex items-center gap-2">
                            {isRtl ? selectedCommEx.title_ar : selectedCommEx.title_en}
                            {commActiveUnit === 2 && (
                              <span className="text-xs bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full">
                                {isRtl ? 'ربيعي 🌸' : 'Spring'}
                              </span>
                            )}
                          </h3>
                          <p className="text-slate-300 text-xs leading-relaxed">
                            {isRtl ? selectedCommEx.description_ar : selectedCommEx.title_en}
                          </p>
                        </div>

                        {/* Step-by-step interactive tasks */}
                        <div className="space-y-4">
                          <h4 className={`text-xs font-black uppercase tracking-widest border-b pb-2 ${
                            commActiveUnit === 2 
                              ? 'text-amber-300 border-amber-500/20' 
                              : 'text-blue-400 border-white/5'
                          }`}>
                            {isRtl ? 'خطوات التطبيق والتمرين العملي:' : 'Practical Exercise Checklist:'}
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
                                      ? commActiveUnit === 2
                                        ? 'bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-emerald-500/20 border-amber-400/50 text-amber-100 shadow-inner'
                                        : 'bg-blue-500/10 border-blue-500/30 text-blue-100 shadow-inner' 
                                      : commActiveUnit === 2
                                        ? 'bg-[#1e1f3a] border-amber-500/10 text-slate-300 hover:border-amber-400/30'
                                        : 'bg-[#1d315c] border-white/5 text-slate-300 hover:border-blue-500/20'
                                  }`}
                                >
                                  <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                    isChecked 
                                      ? commActiveUnit === 2
                                        ? 'bg-gradient-to-r from-amber-400 to-rose-400 border-amber-400 text-slate-950 font-black'
                                        : 'bg-blue-500 border-blue-500 text-slate-950' 
                                      : 'border-slate-500 text-transparent'
                                  }`}>
                                    <Check size={12} strokeWidth={4} />
                                  </span>
                                  <div className="space-y-1">
                                    <span className={`text-xs font-black font-mono ${
                                      commActiveUnit === 2 ? 'text-amber-400/70' : 'text-slate-500'
                                    }`}>
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
                        <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
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

                          <button
                            disabled={exportingExerciseId !== null}
                            onClick={() => handleExportSingleExercise(selectedCommEx, 'communication')}
                            className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 hover:border-amber-500 hover:text-amber-300 text-[#C49E3A] rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer active:scale-95"
                            title={isRtl ? "تصدير وحفظ بطاقة التمرين كصورة عالية الدقة 📸" : "Export Exercise Card as Image 📸"}
                          >
                            {exportingExerciseId === selectedCommEx.id ? (
                              <RefreshCw size={13} className="animate-spin text-amber-500" />
                            ) : (
                              <span>📸</span>
                            )}
                            {isRtl ? 'حفظ وتصدير التمرين كصورة' : 'Save as Image'}
                          </button>
                        </div>

                      </div>

                      {/* Right Column: Outcomes & Completion */}
                      <div className={`lg:col-span-4 border rounded-3xl p-6 flex flex-col justify-between space-y-6 text-right ${
                        commActiveUnit === 2
                          ? 'bg-gradient-to-b from-[#2a1a36] via-[#1c223a] to-[#162738] border-amber-500/20'
                          : 'bg-[#13284f] border-white/5'
                      }`}>
                        <div className="space-y-5">
                          <div className="text-center pb-4 border-b border-white/5">
                            <span className="text-3xl">{selectedCommEx.emoji || (commActiveUnit === 2 ? '🌸' : '💬')}</span>
                            <h4 className="text-base font-black text-white mt-1">
                              {isRtl ? 'الأثر المتوقع والمخرج الاجتماعي:' : 'Social Outcome & Depth:'}
                            </h4>
                          </div>

                          <div className={`border rounded-2xl p-4 text-xs leading-relaxed ${
                            commActiveUnit === 2
                              ? 'bg-gradient-to-r from-amber-950/40 via-rose-950/40 to-emerald-950/40 border-amber-500/30 text-amber-200'
                              : 'bg-blue-950/20 border-blue-500/20 text-blue-200'
                          }`} dir="rtl">
                            <p className="font-extrabold mb-1">
                              {commActiveUnit === 2 ? '🌸' : '🤝'} {isRtl ? 'الأثر والترابط العائلي:' : 'Social Impact:'}
                            </p>
                            <p>{isRtl ? (selectedCommEx.outcome_ar || 'يبني جسر تفاهم حقيقي وتواصل ربيعي إيجابي ينعش القلوب.') : 'Builds a true bridge of understanding and positive social connections.'}</p>
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

                            // Trigger the completion voice record encouraging session
                            setSelectedEx(null);
                            setSelectedMoveEx(null);
                            setSelectedWritingEx(null);
                            setSelectedEmotionEx(null);
                            setSelectedLeaderEx(null);
                            setCompletionSession({
                              type: 'communication',
                              id: selectedCommEx.id,
                              title: isRtl ? selectedCommEx.title_ar : selectedCommEx.title_en,
                              duration: 10 * 60
                            });

                            setSelectedCommEx(null);
                            stopSpeech();
                          }}
                          className={`w-full font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 ${
                            commActiveUnit === 2
                              ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-400 hover:from-amber-300 hover:via-rose-400 hover:to-emerald-300 text-slate-950 shadow-amber-500/20'
                              : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-slate-950 shadow-blue-500/10'
                          }`}
                        >
                          <span>✓</span>
                          {isRtl ? 'تسجيل إنجاز تمرين التواصل والولوج للتعزيز 🎙' : 'Mark Completed & Open Encouragement 🎙'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // SelectedCommEx === null -> Grid list of exercises for Unit 1 or Unit 2!
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-2 text-right" dir="rtl">
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-white flex items-center gap-2">
                          <span className={commActiveUnit === 2 ? 'text-amber-400' : 'text-blue-400'}>
                            {commActiveUnit === 2 ? '🌸☀️' : '💬'}
                          </span>
                          {commActiveUnit === 2 
                            ? (isRtl ? 'منهج الذكاء الاجتماعي والتواصل الإيجابي (الوحدة الثانية - ألوان صيفية ربيعية):' : 'Social Intelligence & Positive Communication (Unit 2 - Spring/Summer Colors):')
                            : (isRtl ? 'منهج التواصل الإيجابي والذكاء الاجتماعي (الوحدة الأولى):' : 'Positive Communication & Social Intelligence (Unit 1):')}
                        </h3>
                        <p className="text-slate-400 text-xs">
                          {commActiveUnit === 2
                            ? (isRtl ? '20 تمرين عملي بألوان صيفية ربيعية مبهجة: الدبلوماسية الحوارية، فراسة الجسد، احتواء الغضب، والامتنان العائلي:' : '20 interactive routines in vibrant spring/summer colors: dialogue diplomacy, body language, anger containment, family gratitude:')
                            : (isRtl ? 'تفاصيل المنهج بالكامل: 20 تمرين عملي لـ الإنصات الفعال، احتواء الخلافات، والترابط الأسري السلمي:' : 'Complete curriculum: 20 active interactive routines to foster active listening, peaceful conflict management, and deep social bond:')}
                        </p>
                      </div>

                      <div className={`text-xs border px-3 py-1.5 rounded-xl font-bold font-mono ${
                        commActiveUnit === 2
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                      }`}>
                        {isRtl 
                          ? `أنجزت ${(commActiveUnit === 1 ? COMMUNICATION_EXERCISES : COMMUNICATION_EXERCISES_UNIT2).filter(ex => completedCommIds.has(ex.id)).length} من 20` 
                          : `${(commActiveUnit === 1 ? COMMUNICATION_EXERCISES : COMMUNICATION_EXERCISES_UNIT2).filter(ex => completedCommIds.has(ex.id)).length} / 20 Completed`}
                      </div>
                    </div>

                    {/* Grid list container */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" dir="rtl">
                      {(commActiveUnit === 1 ? COMMUNICATION_EXERCISES : COMMUNICATION_EXERCISES_UNIT2).map((ex, idx) => {
                        const isCompleted = completedCommIds.has(ex.id);

                        return (
                          <div
                            key={ex.id}
                            className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 flex flex-col justify-between group ${
                              commActiveUnit === 2
                                ? isCompleted
                                  ? 'bg-gradient-to-br from-[#271b36] via-[#1d2238] to-[#152a38] border-amber-400/40 shadow-md shadow-amber-500/10'
                                  : 'bg-gradient-to-br from-[#1e1b33] via-[#172036] to-[#132534] border-amber-500/20 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10'
                                : isCompleted
                                  ? 'bg-[#13284f] border-blue-500/30'
                                  : 'bg-[#13284f] border-white/5 hover:border-blue-500/30'
                            }`}
                          >
                            {/* Badge */}
                            <div className="flex justify-between items-center">
                              <span className={`text-[10px] font-mono tracking-wider font-extrabold uppercase ${
                                commActiveUnit === 2 ? 'text-amber-400/70' : 'text-slate-500'
                              }`}>
                                {isRtl 
                                  ? (commActiveUnit === 2 ? `تمرين ربيعي ${idx + 1}` : `تمرين تواصل ${idx + 1}`) 
                                  : `Exercise ${idx + 1}`}
                              </span>

                              {isCompleted ? (
                                <span className={`p-0.5 rounded-full border ${
                                  commActiveUnit === 2
                                    ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                }`} title={isRtl ? "مكتمل" : "Completed"}>
                                  <Check size={10} strokeWidth={3} />
                                </span>
                              ) : (
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  commActiveUnit === 2 ? 'bg-amber-400/60' : 'bg-blue-500/50'
                                }`} />
                              )}
                            </div>

                            {/* Meta info */}
                            <div className="space-y-1.5 text-right font-sans">
                              <div className="flex items-center gap-2 justify-end">
                                <h4 className={`text-sm font-black text-white transition line-clamp-1 ${
                                  commActiveUnit === 2 ? 'group-hover:text-amber-300' : 'group-hover:text-blue-300'
                                }`}>
                                  {isRtl ? ex.title_ar : ex.title_en}
                                </h4>
                                <span className="text-lg">{ex.emoji || (commActiveUnit === 2 ? '🌸' : '💬')}</span>
                              </div>
                              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                                {isRtl ? ex.description_ar : ex.title_en}
                              </p>
                            </div>

                            {/* CTA button and Export */}
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => setSelectedCommEx(ex)}
                                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                  commActiveUnit === 2
                                    ? isCompleted
                                      ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/20'
                                      : 'bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-emerald-500/10 group-hover:from-amber-400 group-hover:via-rose-500 group-hover:to-emerald-400 group-hover:text-slate-950 text-amber-300 border-amber-500/30'
                                    : isCompleted
                                      ? 'bg-blue-500/5 hover:bg-blue-500/10 text-blue-300 border-blue-500/10'
                                      : 'bg-blue-500/5 group-hover:bg-blue-500 group-hover:text-slate-950 text-blue-400 border-blue-500/10 group-hover:border-blue-500'
                                }`}
                              >
                                <span>{commActiveUnit === 2 ? '🌸' : '⚡'}</span>
                                {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                              </button>

                              <button
                                disabled={exportingExerciseId !== null}
                                onClick={() => handleExportSingleExercise(ex, 'communication')}
                                className={`p-2.5 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0 border ${
                                  commActiveUnit === 2
                                    ? 'bg-[#291b38] border-amber-500/20 hover:border-amber-400 hover:text-amber-300 text-slate-300'
                                    : 'bg-[#243d70] border-white/5 hover:border-amber-500 hover:text-amber-300 text-slate-400'
                                }`}
                                title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                              >
                                {exportingExerciseId === ex.id ? (
                                  <RefreshCw size={12} className="animate-spin text-amber-400" />
                                ) : (
                                  <Download size={12} strokeWidth={3} />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : activeSubTab === 'leadership' ? (
              // Active SubTab === 'leadership' - Leadership & Time Management Exercises
              selectedLeaderEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Step-by-Step interactive checklist container */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedLeaderEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة تمارين القيادة بالكامل' : 'Back to Exercises'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#1e345c] border border-white/5 px-3 py-1.5 rounded-xl text-slate-300 font-bold font-mono">
                        🎯 {isRtl ? selectedLeaderEx.skill_focus : 'Focus Area'}
                      </span>
                      <span className="text-xs bg-[#1e345c] border border-white/5 px-3 py-1.5 rounded-xl text-[#f43f5e] font-bold font-mono">
                        👑 {isRtl ? selectedLeaderEx.activity_type : 'Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Step checklist */}
                    <div className="lg:col-span-8 bg-[#142345] border border-white/5 rounded-3xl p-6 space-y-6 shadow-2xl">
                      <div className="space-y-2">
                        <span className="text-3xl">{selectedLeaderEx.emoji}</span>
                        <h3 className="text-xl font-black text-white">
                          {isRtl ? selectedLeaderEx.title_ar : selectedLeaderEx.title_en}
                        </h3>
                        <p className="text-slate-400 text-xs">
                          {isRtl ? selectedLeaderEx.description_ar : selectedLeaderEx.title_en}
                        </p>
                      </div>

                      {/* Step-by-step interactive tasks */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest border-b border-white/5 pb-2">
                          {isRtl ? 'خطوات التطبيق والتمرين العملي عائلياً والقيادي:' : 'Practical Leadership Steps:'}
                        </h4>

                        <div className="space-y-3">
                          {(isRtl ? selectedLeaderEx.steps_ar : selectedLeaderEx.steps_en).map((step, sIdx) => {
                            const isChecked = leaderStepsChecked[sIdx] || false;

                            return (
                              <button
                                key={sIdx}
                                onClick={() => {
                                  const updated = [...leaderStepsChecked];
                                  updated[sIdx] = !updated[sIdx];
                                  setLeaderStepsChecked(updated);
                                }}
                                className={`w-full text-right p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer select-none ${
                                  isChecked 
                                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-100 shadow-inner' 
                                    : 'bg-[#1d315c] border-white/5 text-slate-300 hover:border-rose-500/20'
                                }`}
                              >
                                <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                  isChecked 
                                    ? 'bg-rose-500 border-rose-500 text-slate-950' 
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
                      <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
                        <button
                          onClick={() => {
                            if (speechPlaybackActive) {
                              stopSpeech();
                            } else {
                              stopSpeech();
                              const textToRead = (isRtl ? selectedLeaderEx.steps_ar : selectedLeaderEx.steps_en).join('. ');
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

                        <button
                          disabled={exportingExerciseId !== null}
                          onClick={() => handleExportSingleExercise(selectedLeaderEx, 'leadership')}
                          className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 hover:border-amber-500 hover:text-amber-300 text-[#C49E3A] rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer active:scale-95"
                          title={isRtl ? "تصدير وحفظ بطاقة التمرين كصورة عالية الدقة 📸" : "Export Exercise Card as Image 📸"}
                        >
                          {exportingExerciseId === selectedLeaderEx.id ? (
                            <RefreshCw size={13} className="animate-spin text-amber-500" />
                          ) : (
                            <span>📸</span>
                          )}
                          {isRtl ? 'حفظ وتصدير التمرين كصورة' : 'Save as Image'}
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Outcomes & Completion */}
                    <div className="lg:col-span-4 bg-[#13284f] border border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-6 text-right">
                      <div className="space-y-5">
                        <div className="text-center pb-4 border-b border-white/5">
                          <span className="text-3xl">{selectedLeaderEx.emoji}</span>
                          <h4 className="text-base font-black text-white mt-1">
                            {isRtl ? 'الأثر المتوقع والمخرج القيادي:' : 'Expected Leadership Outcome:'}
                          </h4>
                        </div>

                        <div className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-4 text-rose-200 text-xs leading-relaxed" dir="rtl">
                          <p className="font-extrabold mb-1">👑 {isRtl ? 'مهارات القيادة الشخصية:' : 'Self Leadership:'}</p>
                          <p>{selectedLeaderEx.outcome_ar || (isRtl ? 'تعليم القيادة وبناء الشخصية المنظمة والمبادر الفعال.' : 'Cultivate order, self-initiation, and personal leadership.')}</p>
                        </div>

                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {isRtl
                            ? 'بمجرد تطبيق الخطوات المعروضة والتعليم عليها كخطوات منجزة، اضغط على زر تسجيل إنجاز تمرين القيادة وتلقي مكامل الحكاية.'
                            : 'Once you practice and check off each leadership task, proceed to register completion and receive AI spoken feedback.'}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const updated = new Set(completedLeaderIds);
                          updated.add(selectedLeaderEx.id);
                          setCompletedLeaderIds(updated);
                          localStorage.setItem('balance_oasis_leader_completed', JSON.stringify(Array.from(updated)));

                          // Trigger the beautiful completion voice record encouraging session!
                          setSelectedEx(null);
                          setSelectedMoveEx(null);
                          setSelectedWritingEx(null);
                          setSelectedEmotionEx(null);
                          setSelectedCommEx(null);
                          setCompletionSession({
                            type: 'leadership',
                            id: selectedLeaderEx.id,
                            title: isRtl ? selectedLeaderEx.title_ar : selectedLeaderEx.title_en,
                            duration: 10 * 60 // average 10 minutes
                          });

                          setSelectedLeaderEx(null);
                          stopSpeech();
                        }}
                        className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-rose-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <span>✓</span>
                        {isRtl ? 'تسجيل إنجاز تمرين القيادة وإطلاق التحفيز 🎙' : 'Mark Completed & Open Encouragement 🎙'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // SelectedLeaderEx === null -> Grid list of 20 leadership and time management exercises!
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-2 text-right">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white flex items-center gap-2 justify-end">
                        <span className="text-rose-400">👑</span>
                        {isRtl ? 'منهج القيادة وإدارة الوقت للنشء (الوحدة الأولى):' : 'Leadership & Time Management Curriculum (Unit 1):'}
                      </h3>
                      <p className="text-slate-400 text-xs">
                        {isRtl ? 'الوحدة كاملة: 20 تمرين عملي لـ الوعي التام للأهداف، كفاءة تنظيم الوقت، والمبادرة الإيجابية عائلياً:' : 'Complete 20 integrated interactive routines to foster self-organization, timer challenges, and active household stewardship:'}
                      </p>
                    </div>

                    <div className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1.5 rounded-xl font-bold font-mono">
                      {isRtl ? `أنجزت ${completedLeaderIds.size} من 20` : `${completedLeaderIds.size} / 20 Completed`}
                    </div>
                  </div>

                  {/* Grid list container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" dir="rtl">
                    {LEADERSHIP_EXERCISES.map((ex, idx) => {
                      const isCompleted = completedLeaderIds.has(ex.id);

                      return (
                        <div
                          key={ex.id}
                          className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#13284f] flex flex-col justify-between group ${
                            isCompleted
                              ? 'border-rose-500/30'
                              : 'border-white/5 hover:border-rose-500/30'
                          }`}
                        >
                          {/* Badge */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">
                              {isRtl ? `تمرين قيادي ${idx + 1}` : `Leadership Exercise ${idx + 1}`}
                            </span>

                            {isCompleted ? (
                              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title={isRtl ? "مكتمل" : "Completed"}>
                                <Check size={10} strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                            )}
                          </div>

                          {/* Meta info */}
                          <div className="space-y-1.5 text-right font-sans">
                            <div className="flex items-center gap-2 justify-end">
                              <h4 className="text-sm font-black text-white group-hover:text-rose-300 transition line-clamp-1">
                                {isRtl ? ex.title_ar : ex.title_en}
                              </h4>
                              <span className="text-lg">{ex.emoji}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {isRtl ? ex.description_ar : ex.title_en}
                            </p>
                          </div>

                          {/* CTA button */}
                          {/* CTA button and Export */}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setSelectedLeaderEx(ex)}
                              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isCompleted
                                  ? 'bg-rose-500/5 hover:bg-rose-500/10 text-rose-300 border-rose-500/10'
                                  : 'bg-rose-500/5 group-hover:bg-rose-500 group-hover:text-slate-950 text-rose-400 border-rose-500/10 group-hover:border-rose-500'
                              }`}
                            >
                              <span>⚡</span>
                              {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                            </button>

                            <button
                              disabled={exportingExerciseId !== null}
                              onClick={() => handleExportSingleExercise(ex, 'leadership')}
                              className="bg-[#243d70] border border-white/5 hover:border-amber-500 hover:text-amber-300 text-slate-400 p-2.5 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                              title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                            >
                              {exportingExerciseId === ex.id ? (
                                <RefreshCw size={12} className="animate-spin text-amber-400" />
                              ) : (
                                <Download size={12} strokeWidth={3} />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ) : activeSubTab === 'teamwork' ? (
              // Active SubTab === 'teamwork' - Cooperation & Teamwork Exercises
              selectedTeamEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Step-by-Step interactive checklist container */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedTeamEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة تمارين التعاون بالكامل' : 'Back to Exercises'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#1e345c] border border-white/5 px-3 py-1.5 rounded-xl text-slate-300 font-bold font-mono">
                        🎯 {isRtl ? selectedTeamEx.skill_focus : 'Focus Area'}
                      </span>
                      <span className="text-xs bg-[#1e345c] border border-white/5 px-3 py-1.5 rounded-xl text-[#6366f1] font-bold font-mono">
                        🤝 {isRtl ? selectedTeamEx.activity_type : 'Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Step checklist */}
                    <div className="lg:col-span-8 bg-[#142345] border border-white/5 rounded-3xl p-6 space-y-6 shadow-2xl">
                      <div className="space-y-2">
                        <span className="text-3xl">{selectedTeamEx.emoji}</span>
                        <h3 className="text-xl font-black text-white">
                          {isRtl ? selectedTeamEx.title_ar : selectedTeamEx.title_en}
                        </h3>
                        <p className="text-slate-400 text-xs">
                          {isRtl ? selectedTeamEx.description_ar : selectedTeamEx.title_en}
                        </p>
                      </div>

                      {/* Step-by-step interactive tasks */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2">
                          {isRtl ? 'خطوات التطبيق والتمرين الميداني عائلياً والتعاوني:' : 'Practical Cooperation Steps:'}
                        </h4>

                        <div className="space-y-3">
                          {(isRtl ? selectedTeamEx.steps_ar : selectedTeamEx.steps_en).map((step, sIdx) => {
                            const isChecked = teamStepsChecked[sIdx] || false;

                            return (
                              <button
                                key={sIdx}
                                onClick={() => {
                                  const updated = [...teamStepsChecked];
                                  updated[sIdx] = !updated[sIdx];
                                  setTeamStepsChecked(updated);
                                }}
                                className={`w-full text-right p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer select-none ${
                                  isChecked 
                                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-100 shadow-inner' 
                                    : 'bg-[#1d315c] border-white/5 text-slate-300 hover:border-indigo-500/20'
                                }`}
                              >
                                <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                  isChecked 
                                    ? 'bg-indigo-500 border-indigo-500 text-slate-950' 
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
                      <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
                        <button
                          onClick={() => {
                            if (speechPlaybackActive) {
                              stopSpeech();
                            } else {
                              stopSpeech();
                              const textToRead = (isRtl ? selectedTeamEx.steps_ar : selectedTeamEx.steps_en).join('. ');
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

                        <button
                          disabled={exportingExerciseId !== null}
                          onClick={() => handleExportSingleExercise(selectedTeamEx, 'teamwork')}
                          className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 hover:border-amber-500 hover:text-amber-300 text-[#C49E3A] rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer active:scale-95"
                          title={isRtl ? "تصدير وحفظ بطاقة التمرين كصورة عالية الدقة 📸" : "Export Exercise Card as Image 📸"}
                        >
                          {exportingExerciseId === selectedTeamEx.id ? (
                            <RefreshCw size={13} className="animate-spin text-amber-500" />
                          ) : (
                            <span>📸</span>
                          )}
                          {isRtl ? 'حفظ وتصدير التمرين كصورة' : 'Save as Image'}
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Outcomes & Completion */}
                    <div className="lg:col-span-4 bg-[#13284f] border border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-6 text-right">
                      <div className="space-y-5">
                        <div className="text-center pb-4 border-b border-white/5">
                          <span className="text-3xl">{selectedTeamEx.emoji}</span>
                          <h4 className="text-base font-black text-white mt-1">
                            {isRtl ? 'الأثر المتوقع والمخرج التعاوني:' : 'Expected Cooperative Outcome:'}
                          </h4>
                        </div>

                        <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-4 text-indigo-200 text-xs leading-relaxed" dir="rtl">
                          <p className="font-extrabold mb-1">🤝 {isRtl ? 'الروح الجماعية والتعاون:' : 'Teamwork & Synergy:'}</p>
                          <p>{selectedTeamEx.outcome_ar || (isRtl ? 'بناء قيم التعاون المشترك بين الإخوة وأفراد الأسرة.' : 'Strengthening brotherly ties and core cooperative values.')}</p>
                        </div>

                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {isRtl
                            ? 'بمجرد تطبيق الخطوات المعروضة والتعليم عليها كخطوات منجزة، اضغط على زر تسجيل إنجاز تمرين التعاون وتلقي حافز الذكاء الاصطناعي.'
                            : 'Once you practice and check off each task, proceed to register completion and receive AI spoken feedback.'}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const updated = new Set(completedTeamIds);
                          updated.add(selectedTeamEx.id);
                          setCompletedTeamIds(updated);
                          localStorage.setItem('balance_oasis_team_completed', JSON.stringify(Array.from(updated)));

                          // Trigger the beautiful completion voice record encouraging session!
                          setSelectedEx(null);
                          setSelectedMoveEx(null);
                          setSelectedWritingEx(null);
                          setSelectedEmotionEx(null);
                          setSelectedCommEx(null);
                          setSelectedLeaderEx(null);
                          setCompletionSession({
                            type: 'teamwork',
                            id: selectedTeamEx.id,
                            title: isRtl ? selectedTeamEx.title_ar : selectedTeamEx.title_en,
                            duration: 15 * 60 // average 15 minutes
                          });

                          setSelectedTeamEx(null);
                          stopSpeech();
                        }}
                        className="w-full bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-indigo-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <span>✓</span>
                        {isRtl ? 'تسجيل إنجاز تمرين التعاون وإطلاق التحفيز 🎙' : 'Mark Completed & Open Encouragement 🎙'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // SelectedTeamEx === null -> Grid list of 24 teamwork and cooperation exercises!
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-2 text-right">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white flex items-center gap-2 justify-end">
                        <span className="text-indigo-400">🤝</span>
                        {isRtl ? 'منهج التعاون المشاريع الجماعية للنشء (الوحدة الأولى):' : 'Cooperation & Joint Projects Curriculum (Unit 1):'}
                      </h3>
                      <p className="text-slate-400 text-xs">
                        {isRtl ? 'الوحدة كاملة: 20 تمرين عملي لـ الوعي التام للغير، كفاءة مشاركة الأدوار، والتعاطف والتواصل الإنساني:' : 'Complete 20 integrated interactive routines to foster other-awareness, dynamic role sharing, empathy, and positive human communication:'}
                      </p>
                    </div>

                    <div className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-xl font-bold font-mono">
                      {isRtl ? `أنجزت ${completedTeamIds.size} من 20` : `${completedTeamIds.size} / 20 Completed`}
                    </div>
                  </div>

                  {/* Grid list container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" dir="rtl">
                    {TEAMWORK_EXERCISES.map((ex, idx) => {
                      const isCompleted = completedTeamIds.has(ex.id);

                      return (
                        <div
                          key={ex.id}
                          className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#13284f] flex flex-col justify-between group ${
                            isCompleted
                              ? 'border-indigo-500/30'
                              : 'border-white/5 hover:border-indigo-500/30'
                          }`}
                        >
                          {/* Badge */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">
                              {isRtl ? `تمرين تعاوني ${idx + 1}` : `Teamwork Exercise ${idx + 1}`}
                            </span>

                            {isCompleted ? (
                              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title={isRtl ? "مكتمل" : "Completed"}>
                                <Check size={10} strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                            )}
                          </div>

                          {/* Meta info */}
                          <div className="space-y-1.5 text-right font-sans">
                            <div className="flex items-center gap-2 justify-end">
                              <h4 className="text-sm font-black text-white group-hover:text-indigo-300 transition line-clamp-1">
                                {isRtl ? ex.title_ar : ex.title_en}
                              </h4>
                              <span className="text-lg">{ex.emoji}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {isRtl ? ex.description_ar : ex.title_en}
                            </p>
                          </div>

                          {/* CTA button */}
                          {/* CTA button and Export */}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setSelectedTeamEx(ex)}
                              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isCompleted
                                  ? 'bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-300 border-indigo-500/10'
                                  : 'bg-indigo-500/5 group-hover:bg-indigo-500 group-hover:text-slate-950 text-indigo-400 border-indigo-500/10 group-hover:border-indigo-500'
                              }`}
                            >
                              <span>⚡</span>
                              {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                            </button>

                            <button
                              disabled={exportingExerciseId !== null}
                              onClick={() => handleExportSingleExercise(ex, 'teamwork')}
                              className="bg-[#243d70] border border-white/5 hover:border-amber-500 hover:text-amber-300 text-slate-400 p-2.5 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                              title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                            >
                              {exportingExerciseId === ex.id ? (
                                <RefreshCw size={12} className="animate-spin text-amber-400" />
                              ) : (
                                <Download size={12} strokeWidth={3} />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ) : activeSubTab === 'money' ? (
              // Active SubTab === 'money' - Early Financial Literacy
              selectedMoneyEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Step-by-Step interactive checklist container */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#f59e0b]/10 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedMoneyEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة الثقافة المالية' : 'Back to Finance'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#1e1503] border border-[#f59e0b]/20 px-3 py-1.5 rounded-xl text-amber-300 font-bold font-mono">
                        🎯 {isRtl ? selectedMoneyEx.skill_focus : 'Focus Skill'}
                      </span>
                      <span className="text-xs bg-[#1e1503] border border-[#f59e0b]/20 px-3 py-1.5 rounded-xl text-amber-300 font-bold font-mono">
                        ⚙️ {isRtl ? selectedMoneyEx.activity_type : 'Activity Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Steps Checklist */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-3xl">{selectedMoneyEx.emoji}</span>
                          <div>
                            <h3 className="text-xl font-black text-white">
                              {isRtl ? selectedMoneyEx.title_ar : selectedMoneyEx.title_en}
                            </h3>
                            <p className="text-slate-400 text-xs mt-1">
                              {selectedMoneyEx.description_ar}
                            </p>
                          </div>
                        </div>

                        {/* Interactive Steps list checklist */}
                        <div className="space-y-3">
                          <label className="text-xs text-amber-400 font-extrabold flex justify-end gap-1.5 mb-2.5">
                            <span>📝</span>
                            {isRtl ? 'الخطوات والتحديات التشاركية المطلوبة:' : 'Interactive Steps & Challenges Required:'}
                          </label>

                          {(isRtl ? selectedMoneyEx.steps_ar : selectedMoneyEx.steps_en).map((step, sIdx) => {
                            const isChecked = moneyStepsChecked[sIdx];
                            return (
                              <div
                                key={sIdx}
                                onClick={() => {
                                  const updated = [...moneyStepsChecked];
                                  updated[sIdx] = !updated[sIdx];
                                  setMoneyStepsChecked(updated);
                                }}
                                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                                  isChecked
                                    ? 'bg-[#f59e0b]/5 border-[#f59e0b]/30 text-slate-300'
                                    : 'bg-white/[0.01] border-white/5 hover:border-amber-500/20 text-slate-400'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                    isChecked
                                      ? 'bg-amber-500 border-amber-500 text-slate-950'
                                      : 'border-white/20 group-hover:border-amber-400'
                                  }`}>
                                    {isChecked && <Check size={12} strokeWidth={4} />}
                                  </span>
                                </div>
                                <span className="text-xs leading-relaxed text-right flex-1 pr-3">
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Speech buttons for Steps */}
                        <div className="flex flex-col sm:flex-row justify-between items-center bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl gap-3">
                          <button
                            onClick={() => {
                              if (speechPlaybackActive) {
                                stopSpeech();
                              } else {
                                stopSpeech();
                                const textToRead = (isRtl ? selectedMoneyEx.steps_ar : selectedMoneyEx.steps_en).join('. ');
                                const utter = new SpeechSynthesisUtterance(textToRead);
                                utter.lang = isRtl ? 'ar-SA' : 'en-US';
                                utter.onend = () => setSpeechPlaybackActive(false);
                                utter.onerror = () => setSpeechPlaybackActive(false);
                                currentUtteranceRef.current = utter;
                                setSpeechPlaybackActive(true);
                                window.speechSynthesis.speak(utter);
                              }
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                              speechPlaybackActive
                                ? 'bg-amber-500 text-slate-950 shadow-lg'
                                : 'bg-white/5 hover:bg-white/10 text-slate-200'
                            }`}
                          >
                            <span>📢</span>
                            {speechPlaybackActive
                              ? (isRtl ? 'إيقاف القراءة الصوتية' : 'Stop Reading')
                              : (isRtl ? 'الاستماع لخطوات التمرين' : 'Listen to Steps')}
                          </button>

                          <button
                            onClick={() => handleExportSingleExercise(selectedMoneyEx, 'money')}
                            className="bg-[#243d70] border border-white/5 hover:border-amber-500 hover:text-amber-300 text-slate-400 px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                          >
                            {exportingExerciseId === selectedMoneyEx.id ? (
                              <RefreshCw size={13} className="animate-spin text-amber-400" />
                            ) : (
                              <Download size={13} strokeWidth={3} />
                            )}
                            <span>{isRtl ? 'تصدير بطاقة هذا التمرين كصورة 📸' : 'Export Card as Image 📸'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right column: Target outcomes inside card */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-[#1e1503] via-[#050b14] to-[#040915] border border-[#f59e0b]/15 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden">
                        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />
                        <span className="text-3xl">{selectedMoneyEx.emoji}</span>
                        <div className="space-y-1">
                          <h4 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                            {isRtl ? 'الأثر السلوكي المستقبلي والمهاري المالي:' : 'Practical Target & Future Financial Goal:'}
                          </h4>
                          <p className="text-xs text-slate-300 font-bold leading-relaxed">
                            {selectedMoneyEx.outcome_ar || (isRtl ? 'بناء قيم التخطيط المالي وتنمية مهارات الادخار في سن مبكرة.' : 'Fostering financial logic and budgeting values in early childhood.')}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const updated = new Set(completedMoneyIds);
                          updated.add(selectedMoneyEx.id);
                          setCompletedMoneyIds(updated);
                          localStorage.setItem('balance_oasis_money_completed', JSON.stringify(Array.from(updated)));

                          // Trigger the beautiful completion voice record encouraging session!
                          setSelectedEx(null);
                          setSelectedMoveEx(null);
                          setSelectedWritingEx(null);
                          setSelectedEmotionEx(null);
                          setSelectedCommEx(null);
                          setSelectedLeaderEx(null);
                          setSelectedTeamEx(null);
                          setCompletionSession({
                            type: 'money',
                            id: selectedMoneyEx.id,
                            title: isRtl ? selectedMoneyEx.title_ar : selectedMoneyEx.title_en,
                            duration: 15 * 60 // average 15 minutes of interactive discussion
                          });

                          setSelectedMoneyEx(null);
                          stopSpeech();
                        }}
                        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-orange-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <span>✓</span>
                        {isRtl ? 'تسجيل إنجاز تمرين الثقافة المالية وإطلاق التحفيز 🎙' : 'Mark Completed & Open Encouragement 🎙'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // selectedMoneyEx === null -> Grid list of 20 Early Financial Literacy exercises
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-amber-500/10 pb-4 gap-2 text-right">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white flex items-center gap-2 justify-end">
                        <span className="text-amber-400">☀️💰</span>
                        {isRtl ? 'منهج الثقافة المالية المبكرة للنشء (ألوان صيفية مبهجة):' : 'Early Financial Literacy Summer Edition:'}
                      </h3>
                      <p className="text-amber-400/80 text-xs">
                        {isRtl ? 'تجمع بين المتعة والفوائد المالية العملية لتنمية مهارات التخطيط، والادخار المبكر بأسلوب تفاعلي رائع:' : 'A cheerful interactive financial literacy curriculum to master budgeting, saving, and smart choices with summer heat:'}
                      </p>
                    </div>

                    <div className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-xl font-bold font-mono">
                      {isRtl ? `أنجزت ${completedMoneyIds.size} من 20` : `${completedMoneyIds.size} / 20 Completed`}
                    </div>
                  </div>

                  {/* Grid list container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" dir="rtl">
                    {FINANCIAL_EXERCISES.map((ex, idx) => {
                      const isCompleted = completedMoneyIds.has(ex.id);

                      return (
                        <div
                          key={ex.id}
                          className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#13284f] flex flex-col justify-between group ${
                            isCompleted
                              ? 'border-amber-500/30 shadow-lg shadow-amber-500/5'
                              : 'border-white/5 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5'
                          }`}
                        >
                          {/* Badge */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-amber-400/65 font-mono tracking-wider font-extrabold uppercase">
                              {isRtl ? `تمرين مالي صيفي ${idx + 1}` : `Summer Finance ${idx + 1}`}
                            </span>

                            {isCompleted ? (
                              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title={isRtl ? "مكتمل" : "Completed"}>
                                <Check size={10} strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                            )}
                          </div>

                          {/* Meta info */}
                          <div className="space-y-1.5 text-right font-sans">
                            <div className="flex items-center gap-2 justify-end">
                              <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition line-clamp-1">
                                {isRtl ? ex.title_ar : ex.title_en}
                              </h4>
                              <span className="text-lg">{ex.emoji}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {isRtl ? ex.description_ar : ex.title_en}
                            </p>
                          </div>

                          {/* CTA buttons */}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setSelectedMoneyEx(ex)}
                              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isCompleted
                                  ? 'bg-amber-500/5 hover:bg-amber-500/10 text-amber-300 border-amber-500/10'
                                  : 'bg-amber-500/5 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-500 group-hover:text-slate-950 text-amber-400 border-amber-500/10 group-hover:border-amber-400'
                              }`}
                            >
                              <span>⚡</span>
                              {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                            </button>

                            <button
                              disabled={exportingExerciseId !== null}
                              onClick={() => handleExportSingleExercise(ex, 'money')}
                              className="bg-[#243d70] border border-white/5 hover:border-amber-500 hover:text-amber-300 text-slate-400 p-2.5 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                              title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                            >
                              {exportingExerciseId === ex.id ? (
                                <RefreshCw size={12} className="animate-spin text-amber-400" />
                              ) : (
                                <Download size={12} strokeWidth={3} />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ) : activeSubTab === 'confidence' ? (
              // Active SubTab === 'confidence' - Self-Confidence & Public Speaking
              selectedConfidenceEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Step-by-Step interactive checklist container */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-orange-500/10 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedConfidenceEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة بناء الثقة' : 'Back to Confidence'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#1e1003] border border-orange-500/20 px-3 py-1.5 rounded-xl text-orange-300 font-bold font-mono">
                        🎯 {isRtl ? selectedConfidenceEx.skill_focus : 'Focus Skill'}
                      </span>
                      <span className="text-xs bg-[#1e1003] border border-orange-500/20 px-3 py-1.5 rounded-xl text-orange-300 font-bold font-mono">
                        ⚙️ {isRtl ? selectedConfidenceEx.activity_type : 'Activity Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Steps Checklist */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-3xl">{selectedConfidenceEx.emoji}</span>
                          <div>
                            <h3 className="text-xl font-black text-white">
                              {isRtl ? selectedConfidenceEx.title_ar : selectedConfidenceEx.title_en}
                            </h3>
                            <p className="text-slate-400 text-xs mt-1">
                              {selectedConfidenceEx.description_ar}
                            </p>
                          </div>
                        </div>

                        {/* Interactive Steps list checklist */}
                        <div className="space-y-3">
                          <label className="text-xs text-orange-400 font-extrabold flex justify-end gap-1.5 mb-2.5">
                            <span>📝</span>
                            {isRtl ? 'خطوات التحدي المطلوبة:' : 'Required Challenge Steps:'}
                          </label>

                          {(isRtl ? selectedConfidenceEx.steps_ar : selectedConfidenceEx.steps_en).map((step, sIdx) => {
                            const isChecked = confidenceStepsChecked[sIdx];
                            return (
                              <div
                                key={sIdx}
                                onClick={() => {
                                  const updated = [...confidenceStepsChecked];
                                  updated[sIdx] = !updated[sIdx];
                                  setConfidenceStepsChecked(updated);
                                }}
                                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                                  isChecked
                                    ? 'bg-orange-500/5 border-orange-500/30 text-slate-300'
                                    : 'bg-white/[0.01] border-white/5 hover:border-orange-500/20 text-slate-400'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                    isChecked
                                      ? 'bg-orange-500 border-orange-500 text-slate-950'
                                      : 'border-white/20 group-hover:border-orange-400'
                                  }`}>
                                    {isChecked && <Check size={12} strokeWidth={4} />}
                                  </span>
                                </div>
                                <span className="text-xs leading-relaxed text-right flex-1 pr-3">
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Speech buttons for Steps */}
                        <div className="flex flex-col sm:flex-row justify-between items-center bg-orange-500/5 border border-orange-500/10 p-4 rounded-2xl gap-3">
                          <button
                            onClick={() => {
                              if (speechPlaybackActive) {
                                stopSpeech();
                              } else {
                                stopSpeech();
                                const textToRead = (isRtl ? selectedConfidenceEx.steps_ar : selectedConfidenceEx.steps_en).join('. ');
                                const utter = new SpeechSynthesisUtterance(textToRead);
                                utter.lang = isRtl ? 'ar-SA' : 'en-US';
                                utter.onend = () => setSpeechPlaybackActive(false);
                                utter.onerror = () => setSpeechPlaybackActive(false);
                                currentUtteranceRef.current = utter;
                                setSpeechPlaybackActive(true);
                                window.speechSynthesis.speak(utter);
                              }
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                              speechPlaybackActive
                                ? 'bg-orange-500 text-slate-950 shadow-lg'
                                : 'bg-white/5 hover:bg-white/10 text-slate-200'
                            }`}
                          >
                            <span>📢</span>
                            {speechPlaybackActive
                              ? (isRtl ? 'إيقاف القراءة الصوتية' : 'Stop Reading')
                              : (isRtl ? 'الاستماع لخطوات التمرين' : 'Listen to Steps')}
                          </button>

                          <button
                            onClick={() => handleExportSingleExercise(selectedConfidenceEx, 'confidence')}
                            className="bg-[#243d70] border border-white/5 hover:border-orange-500 hover:text-orange-300 text-slate-400 px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                          >
                            {exportingExerciseId === selectedConfidenceEx.id ? (
                              <RefreshCw size={13} className="animate-spin text-orange-400" />
                            ) : (
                              <Download size={13} strokeWidth={3} />
                            )}
                            <span>{isRtl ? 'تصدير بطاقة هذا التمرين كصورة 📸' : 'Export Card as Image 📸'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right column: Target outcomes inside card */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-[#1e1003] via-[#050b14] to-[#040915] border border-orange-500/15 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden">
                        <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-500/5 rounded-full blur-[40px] pointer-events-none" />
                        <span className="text-3xl">{selectedConfidenceEx.emoji}</span>
                        <div className="space-y-1">
                          <h4 className="text-xs uppercase font-extrabold text-orange-400 tracking-wider">
                            {isRtl ? 'الأثر السلوكي وتنمية الثقة والتعبير:' : 'Practical Target & Future Confidence:'}
                          </h4>
                          <p className="text-xs text-slate-300 font-bold leading-relaxed">
                            {selectedConfidenceEx.outcome_ar || (isRtl ? 'بناء الوعي بالذات وتخطي التوتر.' : 'Fostering expressive qualities and confidence.')}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const updated = new Set(completedConfidenceIds);
                          updated.add(selectedConfidenceEx.id);
                          setCompletedConfidenceIds(updated);
                          localStorage.setItem('balance_oasis_confidence_completed', JSON.stringify(Array.from(updated)));

                          // Trigger the beautiful completion voice record encouraging session!
                          setSelectedEx(null);
                          setSelectedMoveEx(null);
                          setSelectedWritingEx(null);
                          setSelectedEmotionEx(null);
                          setSelectedCommEx(null);
                          setSelectedLeaderEx(null);
                          setSelectedTeamEx(null);
                          setSelectedMoneyEx(null);
                          setCompletionSession({
                            type: 'confidence',
                            id: selectedConfidenceEx.id,
                            title: isRtl ? selectedConfidenceEx.title_ar : selectedConfidenceEx.title_en,
                            duration: 15 * 60 // average 15 minutes of interactive discussion
                          });

                          setSelectedConfidenceEx(null);
                          stopSpeech();
                        }}
                        className="w-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-orange-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <span>✓</span>
                        {isRtl ? 'تسجيل إنجاز تمرين الثقة وإطلاق التحفيز 🎙' : 'Mark Completed & Open Encouragement 🎙'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // selectedConfidenceEx === null -> Grid list of 20 elements
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-orange-500/10 pb-4 gap-2 text-right">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white flex items-center gap-2 justify-end">
                        <span className="text-orange-400">🎙️🗣️</span>
                        {isRtl ? 'منهج بناء الثقة بالنفس والارتجال والخطابة للنشء:' : 'Self-Confidence & Public Speaking Curriculum:'}
                      </h3>
                      <p className="text-orange-400/85 text-xs">
                        {isRtl ? 'سلسلة تمارين عملية لبناء حضور متميز، وتطوير لغة الجسد وصاحبة طلاقة الصوت:' : 'Active challenges to form a magnetic presence, expand vocabulary, and speak masterfully before others:'}
                      </p>
                    </div>

                    <div className="text-xs bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1.5 rounded-xl font-bold font-mono">
                      {isRtl ? `أنجزت ${completedConfidenceIds.size} من 20` : `${completedConfidenceIds.size} / 20 Completed`}
                    </div>
                  </div>

                  {/* Grid list container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" dir="rtl">
                    {CONFIDENCE_EXERCISES.map((ex, idx) => {
                      const isCompleted = completedConfidenceIds.has(ex.id);

                      return (
                        <div
                          key={ex.id}
                          className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#13284f] flex flex-col justify-between group ${
                            isCompleted
                              ? 'border-orange-500/30 shadow-lg shadow-orange-500/5'
                              : 'border-white/5 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5'
                          }`}
                        >
                          {/* Badge */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-orange-400/65 font-mono tracking-wider font-extrabold uppercase">
                              {isRtl ? `تمرين خطابة وثقة ${idx + 1}` : `Speaking & Confidence ${idx + 1}`}
                            </span>

                            {isCompleted ? (
                              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title={isRtl ? "مكتمل" : "Completed"}>
                                <Check size={10} strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                            )}
                          </div>

                          {/* Meta info */}
                          <div className="space-y-1.5 text-right font-sans">
                            <div className="flex items-center gap-2 justify-end">
                              <h4 className="text-sm font-black text-white group-hover:text-orange-300 transition line-clamp-1">
                                {isRtl ? ex.title_ar : ex.title_en}
                              </h4>
                              <span className="text-lg">{ex.emoji}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {isRtl ? ex.description_ar : ex.title_en}
                            </p>
                          </div>

                          {/* CTA buttons */}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setSelectedConfidenceEx(ex)}
                              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isCompleted
                                  ? 'bg-orange-500/5 hover:bg-orange-500/10 text-orange-300 border-orange-500/10'
                                  : 'bg-orange-500/5 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-amber-500 group-hover:text-slate-950 text-orange-400 border-orange-500/10 group-hover:border-orange-400'
                              }`}
                            >
                              <span>⚡</span>
                              {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                            </button>

                            <button
                              disabled={exportingExerciseId !== null}
                              onClick={() => handleExportSingleExercise(ex, 'confidence')}
                              className="bg-[#243d70] border border-white/5 hover:border-orange-500 hover:text-orange-300 text-slate-400 p-2.5 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                              title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                            >
                              {exportingExerciseId === ex.id ? (
                                <RefreshCw size={12} className="animate-spin text-orange-400" />
                              ) : (
                                <Download size={12} strokeWidth={3} />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ) : activeSubTab === 'critical' ? (
              // Active SubTab === 'critical' - Critical Thinking & Problem Solving
              selectedCriticalEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Step-by-Step interactive checklist container */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-rose-500/10 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedCriticalEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة التفكير النقدي' : 'Back to Critical Thinking'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#1a0e13] border border-rose-500/20 px-3 py-1.5 rounded-xl text-rose-300 font-bold font-mono">
                        🎯 {isRtl ? selectedCriticalEx.skill_focus : 'Focus Skill'}
                      </span>
                      <span className="text-xs bg-[#1a0e13] border border-rose-500/20 px-3 py-1.5 rounded-xl text-rose-300 font-bold font-mono">
                        ⚙️ {isRtl ? selectedCriticalEx.activity_type : 'Activity Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Steps Checklist */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-3xl">{selectedCriticalEx.emoji}</span>
                          <div>
                            <h3 className="text-xl font-black text-white">
                              {isRtl ? selectedCriticalEx.title_ar : selectedCriticalEx.title_en}
                            </h3>
                            <p className="text-slate-400 text-xs mt-1">
                              {selectedCriticalEx.description_ar}
                            </p>
                          </div>
                        </div>

                        {/* Interactive Steps list checklist */}
                        <div className="space-y-3">
                          <label className="text-xs text-rose-400 font-extrabold flex justify-end gap-1.5 mb-2.5">
                            <span>📝</span>
                            {isRtl ? 'خطوات التحدي المطلوبة:' : 'Required Challenge Steps:'}
                          </label>

                          {(isRtl ? selectedCriticalEx.steps_ar : selectedCriticalEx.steps_en).map((step, sIdx) => {
                            const isChecked = criticalStepsChecked[sIdx];
                            return (
                              <div
                                key={sIdx}
                                onClick={() => {
                                  const updated = [...criticalStepsChecked];
                                  updated[sIdx] = !updated[sIdx];
                                  setCriticalStepsChecked(updated);
                                }}
                                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                                  isChecked
                                    ? 'bg-rose-500/5 border-rose-500/30 text-slate-300'
                                    : 'bg-white/[0.01] border-white/5 hover:border-rose-500/20 text-slate-400'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                    isChecked
                                      ? 'bg-rose-500 border-rose-500 text-slate-950'
                                      : 'border-white/20 group-hover:border-rose-400'
                                  }`}>
                                    {isChecked && <Check size={12} strokeWidth={4} />}
                                  </span>
                                </div>
                                <span className="text-xs leading-relaxed text-right flex-1 pr-3">
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Speech buttons for Steps */}
                        <div className="flex flex-col sm:flex-row justify-between items-center bg-rose-500/5 border border-rose-500/10 p-4 rounded-2xl gap-3">
                          <button
                            onClick={() => {
                              if (speechPlaybackActive) {
                                stopSpeech();
                              } else {
                                stopSpeech();
                                const textToRead = (isRtl ? selectedCriticalEx.steps_ar : selectedCriticalEx.steps_en).join('. ');
                                const utter = new SpeechSynthesisUtterance(textToRead);
                                utter.lang = isRtl ? 'ar-SA' : 'en-US';
                                utter.onend = () => setSpeechPlaybackActive(false);
                                utter.onerror = () => setSpeechPlaybackActive(false);
                                currentUtteranceRef.current = utter;
                                setSpeechPlaybackActive(true);
                                window.speechSynthesis.speak(utter);
                              }
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                              speechPlaybackActive
                                ? 'bg-rose-500 text-slate-950 shadow-lg'
                                : 'bg-white/5 hover:bg-white/10 text-slate-200'
                            }`}
                          >
                            <span>📢</span>
                            {speechPlaybackActive
                              ? (isRtl ? 'إيقاف القراءة الصوتية' : 'Stop Reading')
                              : (isRtl ? 'الاستماع لخطوات التمرين' : 'Listen to Steps')}
                          </button>

                          <button
                            onClick={() => handleExportSingleExercise(selectedCriticalEx, 'critical')}
                            className="bg-[#243d70] border border-white/5 hover:border-rose-500 hover:text-rose-300 text-slate-400 px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                          >
                            {exportingExerciseId === selectedCriticalEx.id ? (
                              <RefreshCw size={13} className="animate-spin text-rose-400" />
                            ) : (
                              <Download size={13} strokeWidth={3} />
                            )}
                            <span>{isRtl ? 'تصدير بطاقة هذا التمرين كصورة 📸' : 'Export Card as Image 📸'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right column: Target outcomes inside card */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-[#1a0e13] via-[#050b14] to-[#040915] border border-rose-500/15 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden">
                        <div className="absolute -top-12 -left-12 w-32 h-32 bg-rose-500/5 rounded-full blur-[40px] pointer-events-none" />
                        <span className="text-3xl">{selectedCriticalEx.emoji}</span>
                        <div className="space-y-1">
                          <h4 className="text-xs uppercase font-extrabold text-rose-400 tracking-wider">
                            {isRtl ? 'الأثر السلوكي وتنمية الفكر التحليلي والتفكير النقدي:' : 'Practical Target & Critical Thinking outcome:'}
                          </h4>
                          <p className="text-xs text-slate-300 font-bold leading-relaxed">
                            {selectedCriticalEx.outcome_ar || (isRtl ? 'بناء الوعي بالذات وتخطي التوتر.' : 'Fostering analytical thinking and logic.')}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const updated = new Set(completedCriticalIds);
                          updated.add(selectedCriticalEx.id);
                          setCompletedCriticalIds(updated);
                          localStorage.setItem('balance_oasis_critical_completed', JSON.stringify(Array.from(updated)));

                          // Trigger completion presentation voice session
                          setSelectedEx(null);
                          setSelectedMoveEx(null);
                          setSelectedWritingEx(null);
                          setSelectedEmotionEx(null);
                          setSelectedCommEx(null);
                          setSelectedLeaderEx(null);
                          setSelectedTeamEx(null);
                          setSelectedMoneyEx(null);
                          setSelectedConfidenceEx(null);
                          setCompletionSession({
                            type: 'critical',
                            id: selectedCriticalEx.id,
                            title: isRtl ? selectedCriticalEx.title_ar : selectedCriticalEx.title_en,
                            duration: 15 * 60
                          });

                          setSelectedCriticalEx(null);
                          stopSpeech();
                        }}
                        className="w-full bg-gradient-to-r from-orange-400 to-rose-500 hover:from-orange-500 hover:to-rose-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-rose-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <span>✓</span>
                        {isRtl ? 'تسجيل إنجاز تمرين التفكير وإطلاق التحفيز 🎙' : 'Mark Completed & Open Encouragement 🎙'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // selectedCriticalEx === null -> Grid list of 20 elements
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-rose-500/10 pb-4 gap-2 text-right">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white flex items-center gap-2 justify-end">
                        <span className="text-rose-400">🧐💡</span>
                        {isRtl ? 'منهج التفكير النقدي وحل المشكلات للنشء:' : 'Critical Thinking & Problem Solving Curriculum:'}
                      </h3>
                      <p className="text-rose-400/85 text-xs">
                        {isRtl ? 'سلسلة تمارين و ألغاز عملية لتطوير التفكير المنطقي المتسلسل، التفكير خارج الصندوق، وتقسيم التحديات:' : 'Active challenges and puzzles to cultivate step-by-step logic, outside-the-box reasoning, and structured debate:'}
                      </p>
                    </div>

                    <div className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1.5 rounded-xl font-bold font-mono">
                      {isRtl ? `أنجزت ${completedCriticalIds.size} من 20` : `${completedCriticalIds.size} / 20 Completed`}
                    </div>
                  </div>

                  {/* Grid list container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" dir="rtl">
                    {CRITICAL_EXERCISES.map((ex, idx) => {
                      const isCompleted = completedCriticalIds.has(ex.id);

                      return (
                        <div
                          key={ex.id}
                          className={`relative rounded-2xl border transition-all duration-300 p-5 space-y-3 bg-[#13284f] flex flex-col justify-between group ${
                            isCompleted
                              ? 'border-rose-500/30 shadow-lg shadow-rose-500/5'
                              : 'border-white/5 hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/5'
                          }`}
                        >
                          {/* Badge */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-rose-400/65 font-mono tracking-wider font-extrabold uppercase">
                              {isRtl ? `تمرين تفكير نقدي ${idx + 21}`.replace('21', String(idx + 1)) : `Critical Exercise ${idx + 1}`}
                            </span>

                            {isCompleted ? (
                              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title={isRtl ? "مكتمل" : "Completed"}>
                                <Check size={10} strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                            )}
                          </div>

                          {/* Meta info */}
                          <div className="space-y-1.5 text-right font-sans">
                            <div className="flex items-center gap-2 justify-end">
                              <h4 className="text-sm font-black text-white group-hover:text-rose-300 transition line-clamp-1">
                                {isRtl ? ex.title_ar : ex.title_en}
                              </h4>
                              <span className="text-lg">{ex.emoji}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {isRtl ? ex.description_ar : ex.title_en}
                            </p>
                          </div>

                          {/* CTA buttons */}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setSelectedCriticalEx(ex)}
                              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isCompleted
                                  ? 'bg-rose-500/5 hover:bg-rose-500/10 text-rose-300 border-rose-500/10'
                                  : 'bg-rose-500/5 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-rose-500 group-hover:text-slate-950 text-rose-400 border-rose-500/10 group-hover:border-rose-400'
                              }`}
                            >
                              <span>⚡</span>
                              {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                            </button>

                            <button
                              disabled={exportingExerciseId !== null}
                              onClick={() => handleExportSingleExercise(ex, 'critical')}
                              className="bg-[#243d70] border border-white/5 hover:border-rose-500 hover:text-rose-300 text-slate-400 p-2.5 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                              title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                            >
                              {exportingExerciseId === ex.id ? (
                                <RefreshCw size={12} className="animate-spin text-rose-400" />
                              ) : (
                                <Download size={12} strokeWidth={3} />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ) : activeSubTab === 'innov' ? (
              // Active SubTab === 'innov' - Natural Innovators & Entrepreneurship
              selectedInnovEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Step-by-Step interactive checklist container */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-emerald-500/10 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedInnovEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة مبتكرون بالفطرة' : 'Back to Natural Innovators'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#0b1710] border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-300 font-bold font-mono">
                        🎯 {isRtl ? selectedInnovEx.skill_focus : 'Focus Skill'}
                      </span>
                      <span className="text-xs bg-[#0b1710] border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-300 font-bold font-mono">
                        ⚙️ {isRtl ? selectedInnovEx.activity_type : 'Activity Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Steps Checklist */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-3xl">{selectedInnovEx.emoji}</span>
                          <div>
                            <h3 className="text-lg font-black text-white">
                              {isRtl ? selectedInnovEx.title_ar : selectedInnovEx.title_en}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                              {isRtl ? 'تطبيق عملي خطوة بخطوة لبناء العقلية الريادية والابتكار السريع' : 'Step-by-step practical challenge for building innovators spirit'}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-slate-300 leading-relaxed bg-[#0b1710]/40 border border-emerald-500/5 p-4 rounded-xl">
                          {selectedInnovEx.description_ar}
                        </p>

                        <div className="space-y-3.5">
                          <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest text-right mb-1">
                            {isRtl ? 'خطوات التحدي العملي والتطبيق:' : 'Action Steps & Implementation:'}
                          </h4>

                          {selectedInnovEx.steps_ar.map((step, sIdx) => {
                            const isChecked = !!innovStepsChecked[sIdx];
                            return (
                              <label
                                key={sIdx}
                                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                                  isChecked
                                    ? 'bg-emerald-550/5 border-emerald-500/25 text-slate-300'
                                    : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    const next = [...innovStepsChecked];
                                    next[sIdx] = !next[sIdx];
                                    setInnovStepsChecked(next);
                                  }}
                                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-0 focus:ring-offset-0 transition-all shrink-0 cursor-pointer"
                                />
                                <span className="text-xs font-medium leading-relaxed text-right flex-1">
                                  {step}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Interactive Reflection / Finish Checkbox */}
                        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                          <button
                            onClick={() => {
                              // Play a positive chime 
                              playSereneFreq(659.25, 0.25); // Mi
                              setTimeout(() => playSereneFreq(880, 0.45), 200);   // La

                              // Mark it completed!
                              const nextCompleted = new Set(completedInnovIds);
                              nextCompleted.add(selectedInnovEx.id);
                              setCompletedInnovIds(nextCompleted);
                              localStorage.setItem('balance_oasis_innov_completed', JSON.stringify(Array.from(nextCompleted)));

                              // Trigger completion sessions representation details!
                              setCompletionSession({
                                type: 'innov',
                                id: selectedInnovEx.id,
                                title: isRtl ? selectedInnovEx.title_ar : selectedInnovEx.title_en,
                                duration: 180 // Arbitrary 3 mins value
                              });

                              // Cleanly play the vocal reward
                              setTimeout(() => {
                                triggerAiEncouragement();
                              }, 1100);
                            }}
                            disabled={innovStepsChecked.some(c => !c)}
                            className="bg-gradient-to-r from-yellow-400 via-amber-400 to-emerald-400 disabled:opacity-40 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-slate-950 font-black px-6 py-3 rounded-xl text-xs tracking-wide shadow-xl active:scale-95 transition-all w-full cursor-pointer"
                          >
                            {innovStepsChecked.some(c => !c)
                              ? (isRtl ? '⚠️ أكمل جميع الخطوات للإنهاء والتسجيل' : '⚠️ Complete all checklist steps to finish')
                              : (isRtl ? '🎉 إنهاء التمرين وتسجيل الإنجاز في الواحة' : '🎉 Finish exercise and log achievement')}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Outcomes & Quick audio description of benefits */}
                    <div className="space-y-4">
                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 space-y-4 text-right">
                        <h4 className="text-xs font-black text-slate-300 uppercase tracking-wide">
                          {isRtl ? 'الأثر والمكتسب المعرفي:' : 'Developmental Outcome:'}
                        </h4>
                        <div className="bg-emerald-500/5 border border-emerald-550/10 p-4 rounded-xl text-xs text-emerald-300 leading-relaxed font-bold">
                          💡 {selectedInnovEx.outcome_ar}
                        </div>
                      </div>

                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-right">
                          {isRtl ? 'البطاقة الريادية الملخصة:' : 'Micro-Business Printable Card:'}
                        </h4>

                        <button
                          disabled={exportingExerciseId !== null}
                          onClick={() => handleExportSingleExercise(selectedInnovEx, 'innov')}
                          className="w-full bg-[#243d70] border border-white/5 hover:border-emerald-500 hover:text-emerald-300 text-slate-400 px-4 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                          {exportingExerciseId === selectedInnovEx.id ? (
                            <>
                              <RefreshCw size={13} className="animate-spin text-emerald-400" />
                              <span>{isRtl ? 'جاري تصدير البطاقة الريادية...' : 'Exporting...'}</span>
                            </>
                          ) : (
                            <>
                              <Download size={13} strokeWidth={3} />
                              <span>{isRtl ? 'تصدير بطاقة المشروع كصورة للنشر 📸' : 'Export card as Image 📸'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in text-right">
                  <div className="text-right">
                    <h2 className="text-xl font-black text-white flex items-center gap-2 justify-end">
                      <span>💡✨</span>
                      {isRtl ? 'مبتكرون بالفطرة والمشاريع الإبداعية' : 'Natural Innovators & Creative Initiatives'}
                    </h2>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-2xl ml-auto">
                      {isRtl 
                        ? 'انطلق في رحلة المبتكرين لتعلم مهارات التعاطف مع متطلبات الآخرين، وتوليد الأفكار الإبداعية الجريئة، وبناء نماذج أولية عملية وتطوير العقلية التسعيرية، وصناعة الهوية البصرية والتسويق للمستقبل.' 
                        : 'Learn core micro-entrepreneurship and design systems: empathy mapping, prototyping, cost calculator, visual identity, and investor pitching.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {INNOV_EXERCISES.map((ex, idx) => {
                      const isCompleted = completedInnovIds.has(ex.id);
                      return (
                        <div
                          key={ex.id}
                          className={`group bg-[#15274c]/90 border p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                            isCompleted
                              ? 'border-emerald-500/20 bg-emerald-[#0b1710]/80 hover:border-emerald-500/40'
                              : 'border-white/5 hover:border-emerald-500/25 hover:bg-[#1d2f59]/80 shadow-lg'
                          }`}
                        >
                          {/* Top row icons & badges */}
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-2xl">{ex.emoji}</span>
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-[9px] bg-slate-900 border border-white/5 py-0.5 px-2 rounded-md font-bold text-slate-400 font-mono">
                                #{idx + 1}
                              </span>
                              {isCompleted && (
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-0.5 px-2 rounded-md font-bold">
                                  ✓ {isRtl ? 'مكتمل' : 'Completed'}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1 text-right flex-1 mb-4">
                            <h3 className="text-xs font-black text-slate-100 group-hover:text-emerald-300 transition-colors">
                              {isRtl ? ex.title_ar : ex.title_en}
                            </h3>
                            <div className="flex justify-end gap-1.5 flex-wrap my-1">
                              <span className="text-[9px] bg-slate-950 border border-white/5 px-2 py-0.5 rounded-md text-emerald-400 font-bold font-mono">
                                🎯 {isRtl ? ex.skill_focus : 'Focus Skill'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {ex.description_ar}
                            </p>
                          </div>

                          {/* CTA buttons */}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setSelectedInnovEx(ex)}
                              className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isCompleted
                                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/25'
                                  : 'bg-emerald-500/5 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:via-amber-400 group-hover:to-emerald-400 group-hover:text-slate-950 text-emerald-400 border-emerald-500/10 group-hover:border-emerald-400'
                              }`}
                            >
                              <span>⚡</span>
                              {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                            </button>

                            <button
                              disabled={exportingExerciseId !== null}
                              onClick={() => handleExportSingleExercise(ex, 'innov')}
                              className="bg-[#243d70] border border-white/5 hover:border-emerald-500 hover:text-emerald-300 text-slate-400 p-2 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                              title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                            >
                              {exportingExerciseId === ex.id ? (
                                <RefreshCw size={12} className="animate-spin text-emerald-400" />
                              ) : (
                                <Download size={12} strokeWidth={3} />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ) : activeSubTab === 'art' ? (
              // Active SubTab === 'art' - Literary & Creative Arts
              selectedArtEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Step-by-Step interactive checklist container */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-pink-500/10 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedArtEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة الفنون والجمال' : 'Back to Arts & Literature'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#170b10] border border-pink-500/20 px-3 py-1.5 rounded-xl text-pink-300 font-bold font-mono">
                        🎯 {isRtl ? selectedArtEx.skill_focus : 'Focus Skill'}
                      </span>
                      <span className="text-xs bg-[#170b10] border border-pink-500/20 px-3 py-1.5 rounded-xl text-pink-300 font-bold font-mono">
                        ⚙️ {isRtl ? selectedArtEx.activity_type : 'Activity Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Steps Checklist */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-3xl">{selectedArtEx.emoji}</span>
                          <div>
                            <h3 className="text-lg font-black text-white">
                              {isRtl ? selectedArtEx.title_ar : selectedArtEx.title_en}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                              {isRtl ? 'تطبيق عملي خطوة بخطوة لتنمية الذوق الجمالي ومهارات التعبير الأدبي' : 'Step-by-step practical challenge to develop aesthetic taste and literary expression'}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-slate-300 leading-relaxed bg-[#170b10]/40 border border-pink-500/5 p-4 rounded-xl">
                          {selectedArtEx.description_ar}
                        </p>

                        <div className="space-y-3.5">
                          <h4 className="text-xs font-black text-pink-400 uppercase tracking-widest text-right mb-1">
                            {isRtl ? 'خطوات التحدي العملي والتطبيق:' : 'Action Steps & Implementation:'}
                          </h4>

                          {selectedArtEx.steps_ar.map((step, sIdx) => {
                            const isChecked = !!artStepsChecked[sIdx];
                            return (
                              <label
                                key={sIdx}
                                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                                  isChecked
                                    ? 'bg-pink-550/5 border-pink-500/25 text-slate-300'
                                    : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    const next = [...artStepsChecked];
                                    next[sIdx] = !next[sIdx];
                                    setArtStepsChecked(next);
                                  }}
                                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-pink-500 focus:ring-0 focus:ring-offset-0 transition-all shrink-0 cursor-pointer"
                                />
                                <span className="text-xs font-medium leading-relaxed text-right flex-1">
                                  {step}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Interactive Reflection / Finish Checkbox */}
                        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                          <button
                            onClick={() => {
                              // Play positive chime
                              playSereneFreq(659.25, 0.25); // Mi
                              setTimeout(() => playSereneFreq(880, 0.45), 200);   // La

                              // Mark it completed!
                              const nextCompleted = new Set(completedArtIds);
                              nextCompleted.add(selectedArtEx.id);
                              setCompletedArtIds(nextCompleted);
                              localStorage.setItem('balance_oasis_art_completed', JSON.stringify(Array.from(nextCompleted)));

                              // Trigger completion sessions representation details!
                              setCompletionSession({
                                type: 'art',
                                id: selectedArtEx.id,
                                title: isRtl ? selectedArtEx.title_ar : selectedArtEx.title_en,
                                duration: 180 // Arbitrary 3 mins value
                              });

                              // Cleanly play the vocal reward
                              setTimeout(() => {
                                triggerAiEncouragement();
                              }, 1100);
                            }}
                            disabled={artStepsChecked.some(c => !c)}
                            className="bg-gradient-to-r from-pink-400 via-rose-400 to-indigo-400 disabled:opacity-40 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-slate-950 font-black px-6 py-3 rounded-xl text-xs tracking-wide shadow-xl active:scale-95 transition-all w-full cursor-pointer"
                          >
                            {artStepsChecked.some(c => !c)
                              ? (isRtl ? '⚠️ أكمل جميع الخطوات للإنهاء والتسجيل' : '⚠️ Complete all checklist steps to finish')
                              : (isRtl ? '🎉 إنهاء التمرين وتسجيل الإنجاز في الواحة' : '🎉 Finish exercise and log achievement')}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Outcomes & Quick audio description of benefits */}
                    <div className="space-y-4">
                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 space-y-4 text-right">
                        <h4 className="text-xs font-black text-slate-300 uppercase tracking-wide">
                          {isRtl ? 'الأثر والمكتسب الفني والأدبي:' : 'Developmental Outcome:'}
                        </h4>
                        <div className="bg-pink-500/5 border border-pink-550/10 p-4 rounded-xl text-xs text-pink-300 leading-relaxed font-bold">
                          🎨 {selectedArtEx.outcome_ar}
                        </div>
                      </div>

                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-right">
                          {isRtl ? 'البطاقة الفنية الملخصة:' : 'Micro-Art Printable Card:'}
                        </h4>

                        <button
                          disabled={exportingExerciseId !== null}
                          onClick={() => handleExportSingleExercise(selectedArtEx, 'art')}
                          className="w-full bg-[#243d70] border border-white/5 hover:border-pink-500 hover:text-pink-300 text-slate-400 px-4 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                          {exportingExerciseId === selectedArtEx.id ? (
                            <>
                              <RefreshCw size={13} className="animate-spin text-pink-400" />
                              <span>{isRtl ? 'جاري تصدير البطاقة الفنية...' : 'Exporting...'}</span>
                            </>
                          ) : (
                            <>
                              <Download size={13} strokeWidth={3} />
                              <span>{isRtl ? 'تصدير بطاقة الأدب والفن كصورة للنشر 📸' : 'Export card as Image 📸'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in text-right">
                  <div className="text-right">
                    <h2 className="text-xl font-black text-white flex items-center gap-2 justify-end">
                      <span>🎨✨</span>
                      {isRtl ? 'الأدب والفنون والجمال (نوافذ الجمال)' : 'Literary & Creative Arts (Windows of Beauty)'}
                    </h2>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-2xl ml-auto">
                      {isRtl 
                        ? 'انطلق من نوافذ الجمال والأدب لتعلم تقدير اللوحات الفنية الشامخة، نسج الاستعارات البيانية، تجسيد العبر والمسرح الإبداعي، ونحت المشاعر وترتيل القصائد الشعرية المصنوعة من نبض الطبيعة وتوثيق رحلتك كفنان.' 
                        : 'Explore aesthetic appreciation and creative literature: paintings interpretation, poetry, metaphors development, character lettering, sculpting emotions, and collaborative theatre.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ART_EXERCISES.map((ex, idx) => {
                      const isCompleted = completedArtIds.has(ex.id);
                      return (
                        <div
                          key={ex.id}
                          className={`group bg-[#15274c]/90 border p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                            isCompleted
                              ? 'border-pink-500/20 bg-pink-[#170b10]/85 hover:border-pink-500/40'
                              : 'border-white/5 hover:border-pink-500/25 hover:bg-[#201530]/80 shadow-lg'
                          }`}
                        >
                          {/* Top row icons & badges */}
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-2xl">{ex.emoji}</span>
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-[9px] bg-slate-900 border border-white/5 py-0.5 px-2 rounded-md font-bold text-slate-400 font-mono">
                                #{idx + 1}
                              </span>
                              {isCompleted && (
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-0.5 px-2 rounded-md font-bold">
                                  ✓ {isRtl ? 'مكتمل' : 'Completed'}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1 text-right flex-1 mb-4">
                            <h3 className="text-xs font-black text-slate-100 group-hover:text-pink-300 transition-colors">
                              {isRtl ? ex.title_ar : ex.title_en}
                            </h3>
                            <div className="flex justify-end gap-1.5 flex-wrap my-1">
                              <span className="text-[9px] bg-slate-950 border border-white/5 px-2 py-0.5 rounded-md text-pink-400 font-bold font-mono">
                                🎯 {isRtl ? ex.skill_focus : 'Focus Skill'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {ex.description_ar}
                            </p>
                          </div>

                          {/* CTA buttons */}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setSelectedArtEx(ex)}
                              className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isCompleted
                                  ? 'bg-pink-550/10 hover:bg-pink-550/20 text-pink-300 border-pink-500/25'
                                  : 'bg-pink-500/5 group-hover:bg-gradient-to-r group-hover:from-pink-450 group-hover:via-rose-400 group-hover:to-indigo-400 group-hover:text-slate-950 text-pink-400 border-pink-500/10 group-hover:border-pink-400'
                              }`}
                            >
                              <span>⚡</span>
                              {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                            </button>

                            <button
                              disabled={exportingExerciseId !== null}
                              onClick={() => handleExportSingleExercise(ex, 'art')}
                              className="bg-[#243d70] border border-white/5 hover:border-pink-500 hover:text-pink-300 text-slate-400 p-2 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                              title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                            >
                              {exportingExerciseId === ex.id ? (
                                <RefreshCw size={12} className="animate-spin text-pink-400" />
                              ) : (
                                <Download size={12} strokeWidth={3} />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ) : activeSubTab === 'life' ? (
              // Active SubTab === 'life' - Life Skills & Safety
              selectedLifeEx ? (
                <div className="space-y-6 animate-fade-in text-right" dir="rtl">
                  {/* Step-by-Step interactive checklist container */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-emerald-500/10 pb-4 gap-4">
                    <button
                      onClick={() => {
                        setSelectedLifeEx(null);
                        stopSpeech();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight size={14} />
                      {isRtl ? 'العودة لقائمة السلامة وبطل الحياة' : 'Back to Life Skills & Safety'}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#0b1710] border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-300 font-bold font-mono">
                        🎯 {isRtl ? selectedLifeEx.skill_focus : 'Focus Skill'}
                      </span>
                      <span className="text-xs bg-[#0b1710] border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-300 font-bold font-mono">
                        ⚙️ {isRtl ? selectedLifeEx.activity_type : 'Activity Type'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Steps Checklist */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-3xl">{selectedLifeEx.emoji}</span>
                          <div>
                            <h3 className="text-lg font-black text-white">
                              {isRtl ? selectedLifeEx.title_ar : selectedLifeEx.title_en}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                              {isRtl ? 'تطبيق عملي خطوة بخطوة لبناء المهارات الحياتية الطارئة والاعتماد الذاتي الآمن' : 'Step-by-step practical challenge to build life safety and independence skills'}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-slate-300 leading-relaxed bg-[#0b1710]/40 border border-emerald-500/5 p-4 rounded-xl">
                          {selectedLifeEx.description_ar}
                        </p>

                        <div className="space-y-3.5">
                          <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest text-right mb-1">
                            {isRtl ? 'خطوات التحدي العملي والتطبيق:' : 'Action Steps & Implementation:'}
                          </h4>

                          {selectedLifeEx.steps_ar.map((step, sIdx) => {
                            const isChecked = !!lifeStepsChecked[sIdx];
                            return (
                              <label
                                key={sIdx}
                                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                                  isChecked
                                    ? 'bg-emerald-550/5 border-emerald-500/25 text-slate-300'
                                    : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    const next = [...lifeStepsChecked];
                                    next[sIdx] = !next[sIdx];
                                    setLifeStepsChecked(next);
                                  }}
                                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-emerald-400 focus:ring-0 focus:ring-offset-0 transition-all shrink-0 cursor-pointer"
                                />
                                <span className="text-xs font-medium leading-relaxed text-right flex-1">
                                  {step}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Interactive Reflection / Finish Checkbox */}
                        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                          <button
                            onClick={() => {
                              // Play positive chime
                              playSereneFreq(523.25, 0.25); // Do
                              setTimeout(() => playSereneFreq(659.25, 0.45), 200);   // Mi

                              // Mark it completed!
                              const nextCompleted = new Set(completedLifeIds);
                              nextCompleted.add(selectedLifeEx.id);
                              setCompletedLifeIds(nextCompleted);
                              localStorage.setItem('balance_oasis_life_completed', JSON.stringify(Array.from(nextCompleted)));

                              // Trigger completion sessions representation details!
                              setCompletionSession({
                                type: 'life',
                                id: selectedLifeEx.id,
                                title: isRtl ? selectedLifeEx.title_ar : selectedLifeEx.title_en,
                                duration: 180 // Arbitrary 3 mins value
                              });

                              // Cleanly play the vocal reward
                              setTimeout(() => {
                                triggerAiEncouragement();
                              }, 1100);
                            }}
                            disabled={lifeStepsChecked.some(c => !c)}
                            className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 disabled:opacity-40 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-slate-950 font-black px-6 py-3 rounded-xl text-xs tracking-wide shadow-xl active:scale-95 transition-all w-full cursor-pointer"
                          >
                            {lifeStepsChecked.some(c => !c)
                              ? (isRtl ? '⚠️ أكمل جميع الخطوات للإنهاء والتسجيل' : '⚠️ Complete all checklist steps to finish')
                              : (isRtl ? '🎉 إنهاء التمرين وتسجيل الإنجاز في الواحة' : '🎉 Finish exercise and log achievement')}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Outcomes & Quick audio description of benefits */}
                    <div className="space-y-4">
                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 space-y-4 text-right">
                        <h4 className="text-xs font-black text-slate-300 uppercase tracking-wide">
                          {isRtl ? 'الأثر والوعي المعزز بأسس السلامة والاعتماد:' : 'Developmental Outcome:'}
                        </h4>
                        <div className="bg-emerald-500/5 border border-emerald-550/10 p-4 rounded-xl text-xs text-emerald-300 leading-relaxed font-bold">
                          🦸 {selectedLifeEx.outcome_ar}
                        </div>
                      </div>

                      <div className="bg-[#13284f]/60 border border-white/5 rounded-2xl p-6 space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-right">
                          {isRtl ? 'البطاقة الفنية الملخصة للبطولة الشخصية:' : 'Micro-Life Printable Card:'}
                        </h4>

                        <button
                          disabled={exportingExerciseId !== null}
                          onClick={() => handleExportSingleExercise(selectedLifeEx, 'life')}
                          className="w-full bg-[#243d70] border border-white/5 hover:border-emerald-500 hover:text-emerald-300 text-slate-400 px-4 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                          {exportingExerciseId === selectedLifeEx.id ? (
                            <>
                              <RefreshCw size={13} className="animate-spin text-emerald-400" />
                              <span>{isRtl ? 'جاري تصدير بطاقة بطل الحياة...' : 'Exporting...'}</span>
                            </>
                          ) : (
                            <>
                              <Download size={13} strokeWidth={3} />
                              <span>{isRtl ? 'تصدير بطاقة الحياة والاعتماد كصورة للنشر 📸' : 'Export card as Image 📸'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in text-right">
                  <div className="text-right">
                    <h2 className="text-xl font-black text-white flex items-center gap-2 justify-end">
                      <span>🦸✨</span>
                      {isRtl ? 'بطل الحياة والسلامة والاعتماد الذاتي' : 'Life Skills, Emergency Actions & Independence Challenges'}
                    </h2>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-2xl ml-auto">
                      {isRtl 
                        ? 'تنمية عادات الاستقلال الشخصي وبناء المسؤولية المستدامة: ترتيب مساحاتك الخاصة، ممارسات الإسعاف الأولية البسيطة والإنقاذ، التعامل الشجاع مع حالات الطوارئ المعرفية وصناعة مظهر وميزانية مستقلة.'
                        : 'Develop crucial self-reliance, domestic maintenance, emergency responsiveness lists, budget discipline and domestic life competence challenges.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {LIFE_EXERCISES.map((ex, idx) => {
                      const isCompleted = completedLifeIds.has(ex.id);
                      return (
                        <div
                          key={ex.id}
                          className={`group bg-[#15274c]/90 border p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                            isCompleted
                              ? 'border-emerald-500/20 bg-[#0b1710]/85 hover:border-emerald-500/40'
                              : 'border-white/5 hover:border-emerald-500/25 hover:bg-[#1d2f56]/80 shadow-lg'
                          }`}
                        >
                          {/* Top row icons & badges */}
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-2xl">{ex.emoji}</span>
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-[9px] bg-slate-900 border border-white/5 py-0.5 px-2 rounded-md font-bold text-slate-400 font-mono">
                                #{idx + 1}
                              </span>
                              {isCompleted && (
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-0.5 px-2 rounded-md font-bold">
                                  ✓ {isRtl ? 'مكتمل' : 'Completed'}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1 text-right flex-1 mb-4">
                            <h3 className="text-xs font-black text-slate-100 group-hover:text-emerald-300 transition-colors block">
                              {isRtl ? ex.title_ar : ex.title_en}
                            </h3>
                            <div className="flex justify-end gap-1.5 flex-wrap my-1 font-sans">
                              <span className="text-[9px] bg-slate-950 border border-white/5 px-2 py-0.5 rounded-md text-emerald-400 font-bold font-mono">
                                🎯 {isRtl ? ex.skill_focus : 'Focus Skill'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {ex.description_ar}
                            </p>
                          </div>

                          {/* CTA buttons */}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setSelectedLifeEx(ex)}
                              className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isCompleted
                                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/25'
                                  : 'bg-emerald-500/5 group-hover:bg-gradient-to-r group-hover:from-emerald-450 group-hover:via-teal-450 group-hover:to-cyan-400 group-hover:text-slate-950 text-emerald-400 border-emerald-500/10 group-hover:border-emerald-400'
                              }`}
                            >
                              <span>⚡</span>
                              {isRtl ? 'البدء بتطبيق خطوات التمرين' : 'Open Exercise Details'}
                            </button>

                            <button
                              disabled={exportingExerciseId !== null}
                              onClick={() => handleExportSingleExercise(ex, 'life')}
                              className="bg-[#243d70] border border-white/5 hover:border-emerald-500 hover:text-emerald-300 text-slate-400 p-2 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                              title={isRtl ? 'تصدير كصورة للنشر 📸' : 'Export as Image 📸'}
                            >
                              {exportingExerciseId === ex.id ? (
                                <RefreshCw size={12} className="animate-spin text-emerald-400" />
                              ) : (
                                <Download size={12} strokeWidth={3} />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Deep Educational Value Guideline */}
      <div className="bg-[#16274d] border border-white/5 rounded-2xl p-6 text-right space-y-3">
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

      {/* Hidden high-fidelity certificate for exporting */}
      <div 
        id="balance-oasis-capture-card" 
        style={{ width: '700px', minHeight: '620px', position: 'absolute', top: '-10000px', left: '-10000px' }} 
        className="bg-[#142345] text-white p-12 pr-12 pl-12 rounded-[2.5rem] border-4 border-[#C49E3A] relative font-sans text-right"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#051025] to-slate-950 opacity-95 rounded-[2.3rem] -z-10" />
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-24 h-24 rounded-full border border-amber-500/10 -z-5" />
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border border-teal-500/10 -z-5" />

        <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-8">
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-left">Academic Companion</h4>
            <span className="text-base font-black text-white tracking-widest block text-left">BASIM AL KHALIL DIGITAL ACADEMY</span>
          </div>
          <div className="text-right font-mono text-[9px] text-[#C49E3A] uppercase font-bold leading-tight">
            <div>Authentic Learning Record</div>
            <div>Balance & Mindfulness Oasis</div>
            <div>Date: {new Date().toLocaleDateString('ar-EG')}</div>
          </div>
        </div>

        {/* Logo/Badge */}
        <div className="flex flex-col items-center justify-center text-center my-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#C49E3A] to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-3 border-2 border-white/20">
            <span className="text-2xl">🏆</span>
          </div>
          <h2 className="text-[#C49E3A] text-2xl font-black tracking-tight leading-none">
            {isRtl ? 'شهادة التوازن والسلام الداخلي' : 'Mindfulness & Balance Certificate'}
          </h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
            {isRtl ? 'مكافآت وإنجازات واحة الطالب الذكية' : 'Student Oasis Rewards & Smart Achievements'}
          </p>
        </div>

        <div className="my-8 text-center space-y-4">
          <p className="text-xs text-slate-300 font-medium">
            {isRtl ? 'تمنح هذه الشهادة المعتمدة لـلبـطل المتميز:' : 'This certificate is awarded to the distinguished student:'}
          </p>
          <div className="inline-block border-b-2 border-dashed border-[#C49E3A] pb-1 px-8">
            <h1 className="text-3xl font-black text-white tracking-tight">{customStudentName || (isRtl ? 'بطل الأكاديمية' : 'Academy Hero')}</h1>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
            {isRtl 
              ? `الذي أتم بنجاح ومثابرة تمارين واحة التوازن والسكينة بمعدل إنجاز كلي بلغ (${progressPercent}%)، مبرهناً على جدارته في تنظيم طاقته النفسية، ممارسة الاستماع الواعي والتواصل الإيجابي، والتحضير الفعال للدراسة.` 
              : `who successfully completed the Balance Oasis courses and mindfulness breaks with an completion score of (${progressPercent}%), showing exceptional growth, active emotional regulation, and deep communication skills.`}
          </p>
        </div>

        {/* Grid of completed titles / milestones */}
        <div className="bg-slate-900/65 border border-white/5 rounded-2xl p-5 my-6">
          <h3 className="text-[10px] uppercase text-[#C49E3A] font-black tracking-widest mb-3 text-right">
            {isRtl ? '📋 نماذج التمارين التي أنجزها البطل:' : '📋 Experices Successfully Completed:'}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-right">
            {allCompletedTitles.length > 0 ? (
              allCompletedTitles.slice(0, 6).map((title, index) => (
                <div key={index} className="flex items-center gap-2 justify-end text-[10px] text-slate-300 font-bold">
                  <span>{title}</span>
                  <span className="text-emerald-400">✓</span>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-slate-500 text-[10px] font-bold py-2">
                {isRtl ? 'تفضل بإكمال أي تمرين لتحديث قائمة الإنجازات!' : 'Complete any exercise to list it here!'}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-8 text-xs text-slate-400 font-bold">
          <div className="text-left font-mono text-[9px]">
            <div>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
            <div>VERIFIED ACADEMIC RECORD</div>
          </div>
          <div className="text-right">
            <p className="text-[#C49E3A] font-black">{isRtl ? 'مستشار التطوير النفسي والأكاديمي' : 'Academic & Developmental Supervisor'}</p>
            <p className="text-[10px] text-slate-500">Basim Al Khalil Digital Academy - AI Studio Platform</p>
          </div>
        </div>
      </div>

      {/* Hidden high-fidelity template for exporting individual exercises */}
      {exerciseToExport && (
        <div 
          id="single-exercise-capture-card" 
          style={{ width: '700px', minHeight: '620px', position: 'absolute', top: '-10000px', left: '-10000px' }} 
          className="bg-[#112145] text-white p-12 pr-12 pl-12 rounded-[2rem] border border-slate-800/80 relative font-tajawal text-right shadow-2xl"
        >
          {/* Elegant background gradients - strictly dark mode tech-theme to match Bright Companion */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#091530] via-[#020617] to-[#020617] rounded-[1.9rem] -z-10" />
          
          {/* Subtle architectural abstract decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -z-5" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-5" />

          {/* Premium Academy Branding Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-5 mb-6" dir="rtl">
            <div className="text-right font-tajawal">
              <span className="text-sm font-black text-[#C49E3A] tracking-wide block mb-0.5">أكاديمية باسم آل خليل الرقمية</span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans">Basim Al Khalil Digital Academy</p>
            </div>
            <div className="text-left font-sans">
              <span className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-300 rounded-full text-[10px] font-extrabold uppercase tracking-widest block font-sans">
                {isRtl ? 'واحة التوازن واليقظة الذاتية' : 'Mindfulness & Balance Oasis'}
              </span>
              <span className="text-[9px] text-slate-500 block font-sans text-left mt-1">Date: {new Date().toLocaleDateString('ar-EG')}</span>
            </div>
          </div>

          {/* Category Tag & Icon */}
          <div className="flex flex-col items-center justify-center text-center my-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-slate-700/50 flex items-center justify-center shadow-lg mb-3">
              <span className="text-2xl">{exerciseToExport.emoji || '🧘'}</span>
            </div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest font-sans px-3 py-0.5 bg-amber-400/5 border border-amber-400/10 rounded-full font-tajawal">
              {exerciseToExport.category}
            </span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1 tracking-wider uppercase">{exerciseToExport.categoryEn}</span>
          </div>

          {/* Main Exercise Title */}
          <div className="my-5 text-center px-4" dir="rtl">
            <h1 className="text-2xl font-black text-white leading-tight tracking-tight font-tajawal">
              {exerciseToExport.title}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-amber-400 mx-auto rounded-full mt-3.5" />
          </div>

          {/* Exercise Script Description Container */}
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 my-5 text-right space-y-4" dir="rtl">
            <div className="text-sm text-slate-200 leading-relaxed font-semibold font-tajawal pr-1">
              {exerciseToExport.content}
            </div>

            {/* Steps & Challenges if present */}
            {exerciseToExport.steps && exerciseToExport.steps.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/5 text-right">
                <span className="text-[11px] text-teal-400 font-extrabold tracking-wide block mb-1">
                  {isRtl ? '📝 خطوات وتطبيقات التحدي بالتفصيل:' : '📝 Step-by-Step Action Guidelines:'}
                </span>
                {exerciseToExport.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-2.5 justify-start text-right">
                    <span className="text-amber-400 text-sm leading-none mt-0.5 font-bold">✦</span>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed font-tajawal">
                      {st}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Core Benefit Block */}
          {exerciseToExport.benefit && (
            <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4 my-4 text-right" dir="rtl">
              <span className="text-[10px] text-amber-300 font-black tracking-widest block mb-1.5 uppercase font-tajawal">
                {exerciseToExport.benefitLabel || (isRtl ? '📌 الأثر السلوكي والفوائد المكتسبة:' : '📌 Target Behavioral Benefit:')}
              </span>
              <p className="text-xs text-slate-300 font-medium leading-relaxed font-tajawal pr-1">
                {exerciseToExport.benefit}
              </p>
            </div>
          )}

          {/* Footnote Branding Instead of Certificates */}
          <div className="flex justify-between items-center border-t border-white/10 pt-5 mt-6 text-xs text-slate-400 font-bold" dir="rtl">
            <div className="text-right font-tajawal">
              <p className="text-white font-black text-xs leading-none">مبادرات السكينة واليقظة العائلية الذكية</p>
              <p className="text-[10px] text-slate-500 font-medium mt-1">تنمية المهارات الوجدانية وبناء القدرات الذاتية للطفل</p>
            </div>
            <div className="text-left font-mono text-[9px] text-slate-500">
              <div className="text-left">Oasis-ID: {exerciseToExport.id.substring(0, 8).toUpperCase()}</div>
              <div>ACCREDITED LEARNING ACTION RECORD</div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden template for exporting full unit poster summary image */}
      {unitToExport && (
        <div
          id="unit-summary-capture-card"
          style={{ width: '1000px', position: 'absolute', top: '-10000px', left: '-10000px' }}
          className="bg-[#0b1736] text-white p-10 rounded-[2rem] border border-slate-700/80 font-tajawal text-right shadow-2xl space-y-6"
          dir="rtl"
        >
          {/* Academy Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-5">
            <div className="text-right">
              <span className="text-base font-black text-[#C49E3A] block">أكاديمية باسم آل خليل الرقمية</span>
              <p className="text-xs font-bold text-slate-400 font-sans">Basim Al Khalil Digital Academy</p>
            </div>
            <div className="text-left font-sans">
              <span className="px-3.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-full text-xs font-extrabold uppercase block font-sans">
                {unitToExport.title}
              </span>
              <span className="text-[10px] text-slate-400 block font-sans text-left mt-1">20 تمارين عملية متكاملة</span>
            </div>
          </div>

          {/* Poster Header */}
          <div className="text-center space-y-2 py-2">
            <h2 className="text-2xl font-black text-white">
              دليل خطوات التمارين العملية - {unitToExport.title}
            </h2>
            <p className="text-xs text-slate-300">
              منهج التواصل الإيجابي والذكاء الاجتماعي - واحة التوازن واليقظة الذاتية
            </p>
          </div>

          {/* 20 Exercises Steps Grid */}
          <div className="grid grid-cols-2 gap-4">
            {unitToExport.exercises.map((ex, idx) => (
              <div key={ex.id} className="bg-[#122347] border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>{ex.emoji || '💬'}</span>
                    <span>{idx + 1}. {isRtl ? ex.title_ar : ex.title_en}</span>
                  </span>
                  <span className="text-[9px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/20 font-bold">
                    {ex.skill_focus}
                  </span>
                </div>
                <div className="space-y-1 text-right">
                  {(isRtl ? ex.steps_ar : ex.steps_en).map((step, sIdx) => (
                    <p key={sIdx} className="text-[11px] text-slate-200 leading-relaxed flex items-start gap-1.5">
                      <span className="text-amber-400 text-xs font-bold shrink-0">•</span>
                      <span>{step}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center border-t border-white/10 pt-4 text-xs text-slate-400 font-bold">
            <p>واحة التوازن - جميع الحقوق محفوظة لأكاديمية باسم آل خليل الرقمية</p>
            <p className="text-[#C49E3A]">Basim Al Khalil Digital Academy</p>
          </div>
        </div>
      )}

    </div>
  );
};
