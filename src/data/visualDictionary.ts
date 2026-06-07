export interface DictionaryItem {
  word: string;
  meaning_ar: string;
  image_prompt: string;
  sentence: string;
  sentence_ar?: string;  // helpful Arabic translation of the sentence for kids
  audio_url?: string;
  emoji: string;         // clean vector-like emoji representation for the card
  category?: string;
}

export interface DictionaryCategory {
  id: string;
  name_ar: string;
  name_en: string;
  emoji: string;
  items: DictionaryItem[];
}

export const VISUAL_DICTIONARY: DictionaryCategory[] = [
  {
    id: 'house',
    name_ar: 'المنزل 🏠',
    name_en: 'The House 🏠',
    emoji: '🏠',
    items: [
      {
        word: 'table',
        meaning_ar: 'طاولة',
        image_prompt: 'A simple cartoon of a wooden table, white background',
        sentence: 'The book is on the table.',
        sentence_ar: 'الكتاب موجود على الطاولة.',
        emoji: '🪵'
      },
      {
        word: 'chair',
        meaning_ar: 'كرسي',
        image_prompt: 'A friendly cartoon illustration of a cozy wooden chair, isolated on a light background',
        sentence: 'He sits on a wooden chair.',
        sentence_ar: 'هو يجلس على كرسي خشبي.',
        emoji: '🪑'
      },
      {
        word: 'bed',
        meaning_ar: 'سرير',
        image_prompt: 'A colorful cartoon of a comfortable bed with soft blue pillows, white background',
        sentence: 'The child is sleeping in his bed.',
        sentence_ar: 'الطفل نائم في سريره.',
        emoji: '🛏️'
      },
      {
        word: 'door',
        meaning_ar: 'باب',
        image_prompt: 'A simple cartoon of an open brown wooden door, white background',
        sentence: 'Please close the door.',
        sentence_ar: 'من فضلك أغلق الباب.',
        emoji: '🚪'
      },
      {
        word: 'window',
        meaning_ar: 'نافذة',
        image_prompt: 'A simple cartoon of a glass window showing green hills outside, white background',
        sentence: 'Look out of the window to see the garden.',
        sentence_ar: 'انظر من النافذة لترى الحديقة.',
        emoji: '🪟'
      },
      {
        word: 'clock',
        meaning_ar: 'ساعة',
        image_prompt: 'A bright cartoon wall clock with red frame, white background',
        sentence: 'The clock shows eight o’clock.',
        sentence_ar: 'الساعة تشير إلى الثامنة تماماً.',
        emoji: '⏰'
      },
      {
        word: 'fridge',
        meaning_ar: 'ثلاجة',
        image_prompt: 'A cute cartoon of an open silver refrigerator showing healthy food inside, white background',
        sentence: 'There is milk and fresh fruit in the fridge.',
        sentence_ar: 'يوجد حليب وفواكه طازجة في الثلاجة.',
        emoji: '🧊'
      },
      {
        word: 'key',
        meaning_ar: 'مفتاح',
        image_prompt: 'A simple cartoon of a shiny golden key, white background',
        sentence: 'She opened the door with a silver key.',
        sentence_ar: 'فتحت الباب بمفتاح فضي.',
        emoji: '🔑'
      },
      {
        word: 'sofa',
        meaning_ar: 'أريكة',
        image_prompt: 'A comfy red cartoon sofa couch, white background',
        sentence: 'We all sat together on the big cozy sofa.',
        sentence_ar: 'جلسنا جميعاً معاً على الأريكة المريحة الكبيرة.',
        emoji: '🛋️'
      },
      {
        word: 'lamp',
        meaning_ar: 'مصباح',
        image_prompt: 'A glossy cartoon table lamp yellow light glowing, white background',
        sentence: 'Turn on the lamp to read the story.',
        sentence_ar: 'شغّل المصباح لقراءة القصة.',
        emoji: '💡'
      }
    ]
  },
  {
    id: 'animals',
    name_ar: 'الحيوانات 🦁',
    name_en: 'Animals 🦁',
    emoji: '🦁',
    items: [
      {
        word: 'lion',
        meaning_ar: 'أسد',
        image_prompt: 'A cute cartoon of a smiling baby lion with an orange mane, white background',
        sentence: 'The cartoon lion is the king of the forest.',
        sentence_ar: 'الأسد الكرتوني هو ملك الغابة.',
        emoji: '🦁'
      },
      {
        word: 'cat',
        meaning_ar: 'قطة',
        image_prompt: 'A cute cartoon gray cat playing with a wool ball, white background',
        sentence: 'The little cat is drinking warm milk.',
        sentence_ar: 'القطة الصغيرة تشرب الحليب الدافئ.',
        emoji: '🐱'
      },
      {
        word: 'dog',
        meaning_ar: 'كلب',
        image_prompt: 'A friendly cartoon puppy wagging its tail, white background',
        sentence: 'The happy dog ran to catch the red ball.',
        sentence_ar: 'ركض الكلب السعيد ليلتقط الكرة الحمراء.',
        emoji: '🐶'
      },
      {
        word: 'monkey',
        meaning_ar: 'قرد',
        image_prompt: 'A funny cartoon monkey swinging from a branch, white background',
        sentence: 'The brown monkey likes eating yellow bananas.',
        sentence_ar: 'القرد البني يحب أكل الموز الأصفر.',
        emoji: '🐵'
      },
      {
        word: 'elephant',
        meaning_ar: 'فيل',
        image_prompt: 'A cheerful blue cartoon elephant blowing water, white background',
        sentence: 'The big elephant has a very long trunk.',
        sentence_ar: 'الفيل الكبير لديه خرطوم طويل جداً.',
        emoji: '🐘'
      },
      {
        word: 'bird',
        meaning_ar: 'طائر',
        image_prompt: 'A cute little yellow bird singing on a branch, white background',
        sentence: 'The colorful bird stands on the green tree branch.',
        sentence_ar: 'يقف الطائر الملون على غصن الشجرة الأخضر.',
        emoji: '🐦'
      },
      {
        word: 'rabbit',
        meaning_ar: 'أرنب',
        image_prompt: 'A cute fluffy white rabbit munching on an orange carrot, white background',
        sentence: 'The white rabbit jumps so fast.',
        sentence_ar: 'الأرنب الأبيض يقفز بسرعة كبيرة.',
        emoji: '🐰'
      },
      {
        word: 'fish',
        meaning_ar: 'سمكة',
        image_prompt: 'A smiling cartoon orange goldfish swimming, white background',
        sentence: 'The little fish is swimming in the blue ocean.',
        sentence_ar: 'السمكة الصغيرة تسبح في المحيط الأزرق.',
        emoji: '🐟'
      },
      {
        word: 'bear',
        meaning_ar: 'دب',
        image_prompt: 'A cute brown teddy bear holding a honey jar, white background',
        sentence: 'The wild bear is sleeping inside the dark cave.',
        sentence_ar: 'الدب البري ينام داخل الكهف المظلم.',
        emoji: '🐻'
      },
      {
        word: 'giraffe',
        meaning_ar: 'زرافة',
        image_prompt: 'A tall friendly yellow cartoon giraffe reaching high leaves, white background',
        sentence: 'The beautiful giraffe eats leaves from very tall trees.',
        sentence_ar: 'الزرافة الجميلة تأكل الأوراق من الأشجار الطويلة جداً.',
        emoji: '🦒'
      }
    ]
  },
  {
    id: 'food',
    name_ar: 'الطعام والفواكه 🍎',
    name_en: 'Food & Fruits 🍎',
    emoji: '🍎',
    items: [
      {
        word: 'apple',
        meaning_ar: 'تفاحة',
        image_prompt: 'A glossy red cartoon apple with a green leaf, white background',
        sentence: 'The red apple is sweet and crunchy.',
        sentence_ar: 'التفاحة الحمراء حلوة ومقرمشة.',
        emoji: '🍎'
      },
      {
        word: 'banana',
        meaning_ar: 'موز',
        image_prompt: 'A yellow cartoon banana half peeled, white background',
        sentence: 'I eat a yellow banana every single morning.',
        sentence_ar: 'آكل حبة موز صفراء كل صباح.',
        emoji: '🍌'
      },
      {
        word: 'milk',
        meaning_ar: 'حليب',
        image_prompt: 'A fresh glass bottle of milk, cartoon style, white background',
        sentence: 'Hot milk is delicious and keeps our bones strong.',
        sentence_ar: 'الحليب الساخن لذيذ ويبقي عظامنا قوية.',
        emoji: '🥛'
      },
      {
        word: 'bread',
        meaning_ar: 'خبز',
        image_prompt: 'A freshly baked loaf of golden bread, cartoon, white background',
        sentence: 'My grandmother bakes hot brown bread at home.',
        sentence_ar: 'تخبز جدتي الخبز الأسمر الساخن في البيت.',
        emoji: '🍞'
      },
      {
        word: 'egg',
        meaning_ar: 'بيضة',
        image_prompt: 'A simple hard-boiled egg cut in half displaying the yellow yolk, cartoon, white background',
        sentence: 'We have a boiled egg with breakfast.',
        sentence_ar: 'تناولنا بيضة مسلوقة مع وجبة الفطور.',
        emoji: '🥚'
      },
      {
        word: 'cheese',
        meaning_ar: 'جبن',
        image_prompt: 'A triangle yellow wedge of Swiss cheese showing holes, cartoon, white background',
        sentence: 'The smart mouse is looking for a piece of yellow cheese.',
        sentence_ar: 'الفأر الذكي يبحث عن قطعة جبن صفراء.',
        emoji: '🧀'
      },
      {
        word: 'orange',
        meaning_ar: 'برتقالة',
        image_prompt: 'A fresh ripe orange with dimpled skin, cartoon, white background',
        sentence: 'Squeeze the fresh orange to make tasty juice.',
        sentence_ar: 'اعصر البرتقالة الطازجة لصنع عصير لذيذ.',
        emoji: '🍊'
      },
      {
        word: 'cake',
        meaning_ar: 'كعكة',
        image_prompt: 'A large birthday cake with lit colorful candles and strawberry icing, cartoon, white background',
        sentence: 'She blew the candles on her birthday cake.',
        sentence_ar: 'نفخت الشموع الموجودة على كعكة عيد ميلادها.',
        emoji: '🎂'
      },
      {
        word: 'honey',
        meaning_ar: 'عسل',
        image_prompt: 'A wooden honey dipper dripping sweet golden honey from a clay jar, cartoon, white background',
        sentence: 'Golden honey is sweet and cured by active bees.',
        sentence_ar: 'العسل الذهبي حلو وتصنعه النحلات النشيطة.',
        emoji: '🍯'
      },
      {
        word: 'water',
        meaning_ar: 'ماء',
        image_prompt: 'A clean transparent glass filled with sparkling pure water, cartoon, white background',
        sentence: 'Always drink pure water when you feel thirsty.',
        sentence_ar: 'اشرب دائماً الماء النقي عندما تشعر بالعطش.',
        emoji: '🥛'
      }
    ]
  },
  {
    id: 'school',
    name_ar: 'المدرسة والكتب 📚',
    name_en: 'School & Books 📚',
    emoji: '📚',
    items: [
      {
        word: 'book',
        meaning_ar: 'كتاب',
        image_prompt: 'An open colorful storybook with pictures, cartoon, white background',
        sentence: 'I read an adventure story book before sleeping.',
        sentence_ar: 'أنا أقرأ كتاب قصة مغامرات قبل النوم.',
        emoji: '📖'
      },
      {
        word: 'pen',
        meaning_ar: 'قلم',
        image_prompt: 'A shiny blue ink pen with cap off, cartoon, white background',
        sentence: 'The teacher writes on the notebook with a blue pen.',
        sentence_ar: 'يكتب المعلم على الدفتر بقلم أزرق.',
        emoji: '🖊️'
      },
      {
        word: 'bag',
        meaning_ar: 'حقيبة مدرستك',
        image_prompt: 'A bright school backpack full of school items, cartoon, white background',
        sentence: 'Put your drawing notebooks inside the green bag.',
        sentence_ar: 'ضع دفاتر الرسم الخاصة بك داخل الحقيبة الخضراء.',
        emoji: '🎒'
      },
      {
        word: 'ruler',
        meaning_ar: 'مسطرة',
        image_prompt: 'A simple yellow plastic ruler showing inches scale, cartoon, white background',
        sentence: 'Use the straight ruler to draw a neat line.',
        sentence_ar: 'استخدم المسطرة المستقيمة لرسم خط مرتب.',
        emoji: '📏'
      },
      {
        word: 'board',
        meaning_ar: 'سبورة الفصل',
        image_prompt: 'A green classroom writing board with chalk, cartoon, white background',
        sentence: 'The kids look at the board to learn the alphabet.',
        sentence_ar: 'ينظر الأطفال إلى السبورة لتعلم الحروف الأبجدية.',
        emoji: ' chalkboard '
      },
      {
        word: 'desk',
        meaning_ar: 'مكتب الدراسة',
        image_prompt: 'A wooden student desk holding stationery, cartoon, white background',
        sentence: 'We keep our colorful pencils on the clean study desk.',
        sentence_ar: 'نحتفظ بأقلامنا الملونة على مكتب الدراسة النظيف.',
        emoji: '✍️'
      },
      {
        word: 'pencil',
        meaning_ar: 'قلم رصاص',
        image_prompt: 'A sharpened yellow wooden pencil with pink eraser tip, cartoon, white background',
        sentence: 'I sketch a cute cat with my new graphite pencil.',
        sentence_ar: 'أنا أرسم قطة لطيفة بقلم الرصاص الجديد الخاص بي.',
        emoji: '✏️'
      },
      {
        word: 'eraser',
        meaning_ar: 'ممحاة',
        image_prompt: 'A pink and blue rubber eraser removing lines, cartoon, white background',
        sentence: 'You can rub the pencil mistakes with this soft eraser.',
        sentence_ar: 'يمكنك مسح أخطاء قلم الرصاص بهذه الممحاة الناعمة.',
        emoji: '🧽'
      },
      {
        word: 'paper',
        meaning_ar: 'ورقة',
        image_prompt: 'A clean white sheet of writing paper lined, cartoon, white background',
        sentence: 'Write your beautiful name on the clean sheet of paper.',
        sentence_ar: 'اكتب اسمك الجميل على ورقة نظيفة.',
        emoji: '📄'
      },
      {
        word: 'map',
        meaning_ar: 'خريطة العالم',
        image_prompt: 'An open colorful world exploration map, cartoon, white background',
        sentence: 'We find our country on the school map.',
        sentence_ar: 'نجد بلدنا على خريطة المدرسة.',
        emoji: '🗺️'
      }
    ]
  }
];
