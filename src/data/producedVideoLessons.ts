export interface VideoSceneCharacter {
  name: string;
  role: string;
  avatar: string;
  position: 'left' | 'right' | 'center';
  color: string;
}

export interface VideoDialogueLine {
  speaker: string;
  textEn: string;
  textAr: string;
  phonetics?: string;
  grammarTip?: string;
  voiceGender?: 'female' | 'male';
}

export interface VisualKeypoint {
  textEn: string;
  textAr: string;
  iconType: 'star' | 'book' | 'sparkles' | 'check' | 'zap' | 'volume' | 'message';
  highlightWord?: string;
}

export interface VideoQuizCheckpoint {
  questionEn: string;
  questionAr: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
  explanationEn?: string;
}

export interface ProducedVideoScene {
  sceneNumber: number;
  titleEn: string;
  titleAr: string;
  setting: 'oxford_street' | 'classroom' | 'airport' | 'coffee_shop' | 'business_office' | 'nature_park' | 'tech_lab' | 'cozy_home' | 'library' | 'doctor_clinic';
  characters: VideoSceneCharacter[];
  narration: {
    en: string;
    ar: string;
    speaker: string;
  };
  dialogues: VideoDialogueLine[];
  visualKeypoints: VisualKeypoint[];
  quizCheckpoint?: VideoQuizCheckpoint;
}

export interface ProducedVideoLesson {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'conversation' | 'travel' | 'business' | 'grammar' | 'kids' | 'ai_tech' | 'phonics';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  duration: string;
  thumbnail: string;
  badge: string;
  summaryEn: string;
  summaryAr: string;
  scenes: ProducedVideoScene[];
  vocabulary: {
    word: string;
    meaningAr: string;
    pronunciation: string;
    exampleSentence: string;
  }[];
}

export const PRODUCED_VIDEO_LESSONS: ProducedVideoLesson[] = [
  {
    id: 'prod-vid-01',
    titleEn: 'Oxford Everyday Conversation Mastery',
    titleAr: 'إتقان المحادثة اليومية في شوارع أكسفورد',
    category: 'conversation',
    level: 'A1',
    duration: '4:15',
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
    badge: 'محادثة حية 🇬🇧',
    summaryEn: 'An engaging audiovisual lesson on introducing yourself, exchanging pleasantries, and ordering politely in a British English context.',
    summaryAr: 'درس مرئي بالصوت والصورة لتعليم التحيات اليومية، والتعريف بالنفس، والطلب المهذب في سياق بريطاني واقعي.',
    scenes: [
      {
        sceneNumber: 1,
        titleEn: 'Meeting at High Street Oxford',
        titleAr: 'اللقاء في شارع أكسفورد الرئيسي',
        setting: 'oxford_street',
        characters: [
          { name: 'Sarah', role: 'Oxford Instructor', avatar: '👩‍🏫', position: 'left', color: 'from-amber-500 to-amber-700' },
          { name: 'Zaid', role: 'Academy Student', avatar: '👨‍🎓', position: 'right', color: 'from-blue-500 to-blue-700' }
        ],
        narration: {
          en: 'Welcome to Oxford! In this scene, we learn how to greet someone warmly and introduce where we are from.',
          ar: 'مرحباً بكم في أكسفورد! في هذا المشهد نتعلم كيف نلقي التحية بحرارة ونعرف عن أنفسنا وبلدنا بثقة.',
          speaker: 'Sarah'
        },
        dialogues: [
          {
            speaker: 'Sarah',
            textEn: 'Good morning, Zaid! Welcome to Oxford. How was your journey here?',
            textAr: 'صباح الخير يا زيد! أهلاً بك في أكسفورد. كيف كانت رحلتك إلى هنا؟',
            phonetics: '/ɡʊd ˈmɔː.nɪŋ zaɪd ˈwel.kəm tuː ˈɒks.fəd/',
            grammarTip: "صيغة 'How was your journey' سؤال كلاسيكي مهذب للسؤال عن الرحلة.",
            voiceGender: 'female'
          },
          {
            speaker: 'Zaid',
            textEn: "Good morning, Sarah! It was wonderful, thank you. I'm truly excited to be here.",
            textAr: 'صباح الخير سارة! كانت رائعة شكراً لكِ. أنا متحمّس للغاية لوجودي هنا.',
            phonetics: '/ɪt wɒz ˈwʌn.də.fəl θæŋk juː aɪ æm ˈtruː.li ɪkˈsaɪ.tɪd/',
            grammarTip: "كلمة 'Truly excited' تعني متحمس بصدق وتمنح الجملة قوة تعبيرية.",
            voiceGender: 'male'
          },
          {
            speaker: 'Sarah',
            textEn: 'Splendid! Let us take a stroll and grab a warm cup of coffee while we chat.',
            textAr: 'رائع جداً! دعنا نتجول قليلاً ونحتسي فنجاناً دافئاً من القهوة أثناء تبادل الحديث.',
            phonetics: '/ˈsplen.dɪd let ʌs teɪk ə strəʊl ænd ɡræb ə kʌp ɒv ˈkɒf.i/',
            grammarTip: "'Take a stroll' تعبير اصطلاحي جميل يعني التنزه مشياً على الأقدام.",
            voiceGender: 'female'
          }
        ],
        visualKeypoints: [
          { textEn: 'Greeting with a bright smile', textAr: 'التحية بابتسامة مشرقة', iconType: 'sparkles', highlightWord: 'Good morning' },
          { textEn: 'Expressing genuine enthusiasm', textAr: 'التعبير عن الحماس الحقيقي', iconType: 'star', highlightWord: 'Truly excited' },
          { textEn: 'British idiom: Take a stroll', textAr: 'تعبير بريطاني: تنزه على الأقدام', iconType: 'book', highlightWord: 'Take a stroll' }
        ],
        quizCheckpoint: {
          questionEn: "What does the idiomatic phrase 'Take a stroll' mean in Oxford English?",
          questionAr: "ماذا يعني التعبير الاصطلاحي 'Take a stroll' في الإنجليزية؟",
          options: [
            "To take a relaxing, gentle walk outdoors",
            "To run very fast because you are late",
            "To buy an expensive umbrella",
            "To study in the library all night"
          ],
          correctIndex: 0,
          explanationAr: "تعبير 'Take a stroll' يعني المشي الهادئ والتمشي الممتع في الهواء الطلق."
        }
      },
      {
        sceneNumber: 2,
        titleEn: 'Ordering with Courtesy at the Cafe',
        titleAr: 'الطلب بلباقة وأدب في المقهى',
        setting: 'coffee_shop',
        characters: [
          { name: 'Barista Oliver', role: 'Cafe Host', avatar: '☕👨‍🍳', position: 'left', color: 'from-emerald-500 to-teal-700' },
          { name: 'Zaid', role: 'Customer', avatar: '👨‍🎓', position: 'right', color: 'from-blue-500 to-blue-700' }
        ],
        narration: {
          en: 'Notice how tone of voice and polite modals make English requests elegant and respectful.',
          ar: 'لاحظ كيف تضفي نبرة الصوت والأفعال المساعدة المهذبة رونقاً واحتراماً على طلباتك بالإنجليزية.',
          speaker: 'Sarah'
        },
        dialogues: [
          {
            speaker: 'Oliver',
            textEn: 'Hello there! What can I get fresh for you two today?',
            textAr: 'أهلاً وسهلاً! ماذا يمكنني أن أقدم لكما طازجاً اليوم؟',
            phonetics: '/həˈləʊ ðeər wɒt kæn aɪ ɡet freʃ fɔː juː tuː təˈdeɪ/',
            voiceGender: 'male'
          },
          {
            speaker: 'Zaid',
            textEn: 'Could I please have a flat white coffee and a blueberry muffin?',
            textAr: 'هل يمكنني من فضلك الحصول على قهوة فلات وايت وكعكة التوت البري؟',
            phonetics: '/kʊd aɪ pliːz hæv ə flæt waɪt ˈkɒf.i/',
            grammarTip: "'Could I please have...' هي قمة اللباقة في المحادثة الاجتماعية.",
            voiceGender: 'male'
          },
          {
            speaker: 'Oliver',
            textEn: 'Certainly! Would you like that to enjoy here, or take away?',
            textAr: 'بكل سرور! هل تفضل الاستمتاع بها هنا أم تأخذها سفري؟',
            phonetics: '/ˈsɜː.tən.li wʊd juː laɪk ðæt tuː ɪnˈdʒɔɪ hɪər ɔː teɪk əˈweɪ/',
            voiceGender: 'male'
          },
          {
            speaker: 'Zaid',
            textEn: 'To stay, please. Thank you very much for your kind help.',
            textAr: 'هنا في المقهى من فضلك. شكراً جزيلاً لك على مساعدتك اللطيفة.',
            phonetics: '/tuː steɪ pliːz θæŋk juː ˈver.i mʌtʃ fɔː jɔː kaɪnd help/',
            voiceGender: 'male'
          }
        ],
        visualKeypoints: [
          { textEn: 'Gold Standard: Could I please have...', textAr: 'الصيغة الذهبية: هل يمكنني من فضلك...', iconType: 'star', highlightWord: 'Could I please' },
          { textEn: 'Polite closing: Thank you very much', textAr: 'الختام المهذب: شكراً جزيلاً', iconType: 'check', highlightWord: 'Thank you' }
        ],
        quizCheckpoint: {
          questionEn: "Which sentence is the MOST polite way to order coffee in English?",
          questionAr: "أي الجمل التالية هي الأكثر تهذيباً ولباقة لطلب القهوة بالإنجليزية؟",
          options: [
            "Could I please have a medium latte?",
            "Give me coffee now!",
            "I want a coffee quickly.",
            "Bring coffee to my table."
          ],
          correctIndex: 0,
          explanationAr: "استخدام 'Could I please have' مع نبرة هادئة يمثل المعيار الأرقى للطلب في الثقافة الإنجليزية."
        }
      },
      {
        sceneNumber: 3,
        titleEn: 'Review & Pronunciation Clinic',
        titleAr: 'المراجعة وعيادة مخارج الحروف والنطق',
        setting: 'classroom',
        characters: [
          { name: 'Sarah', role: 'Oxford Instructor', avatar: '👩‍🏫', position: 'center', color: 'from-amber-500 to-amber-700' }
        ],
        narration: {
          en: 'Mastering pronunciation requires focusing on connected speech and rhythm. Let us review the key vocabulary!',
          ar: 'إتقان النطق يتطلب التركيز على الترابط الصوتي والنغمة الإيقاعية. دعونا نراجع أهم المفردات المكتسبة!',
          speaker: 'Sarah'
        },
        dialogues: [
          {
            speaker: 'Sarah',
            textEn: "Repeat after me: 'Could I please have...' Focus on softening the 'Could' and linking with 'I'.",
            textAr: "كرر ورائي: 'Could I please have...' ركز على نطق Could برقة وربطها بسلاسة مع I.",
            phonetics: '/kʊd aɪ pliːz hæv/',
            grammarTip: "الربط الصوتي (Linking) بين الكلمات هو سر الطلاقة الطبيعية.",
            voiceGender: 'female'
          }
        ],
        visualKeypoints: [
          { textEn: 'Connected Speech: Could + I -> /kʊdaɪ/', textAr: 'الوصل الصوتي: كود + آي -> كوداي', iconType: 'volume', highlightWord: 'Connected Speech' },
          { textEn: 'Daily repetition builds muscle memory', textAr: 'التكرار اليومي يبني الذاكرة العضلية للنطق', iconType: 'zap', highlightWord: 'Muscle Memory' }
        ],
        quizCheckpoint: {
          questionEn: "Why is connected speech (linking words) important for English learners?",
          questionAr: "لماذا يعد الوصل الصوتي بين الكلمات مهماً لمتعلمي اللغة الإنجليزية؟",
          options: [
            "It makes spoken English flow naturally like native speakers",
            "It is only used when singing songs",
            "It makes grammar rules unnecessary",
            "It allows you to skip all vowels"
          ],
          correctIndex: 0,
          explanationAr: "الوصل الصوتي يمنح الحديث انسيابية طبيعية وموسيقى لغوية تطابق المتحدثين الأصليين."
        }
      }
    ],
    vocabulary: [
      { word: 'Stroll', meaningAr: 'نزهة هادئة على الأقدام', pronunciation: '/strəʊl/', exampleSentence: 'We went for an evening stroll around the Oxford colleges.' },
      { word: 'Splendid', meaningAr: 'رائع جداً ومبهر', pronunciation: '/ˈsplen.dɪd/', exampleSentence: 'That is splendid news for our academy students.' },
      { word: 'Courtesy', meaningAr: 'اللباقة وحسن المعاملة', pronunciation: '/ˈkɜː.tə.si/', exampleSentence: 'Always treat strangers with warmth and courtesy.' },
      { word: 'Take away', meaningAr: 'طلب سفري للخارج', pronunciation: '/ˈteɪk.ə.weɪ/', exampleSentence: 'I grabbed a sandwich to take away on my break.' },
      { word: 'Enthusiasm', meaningAr: 'الشغف والحماس المتقد', pronunciation: '/ɪnˈθjuː.zi.æz.əm/', exampleSentence: 'His enthusiasm for learning English was truly contagious.' }
    ]
  },
  {
    id: 'prod-vid-02',
    titleEn: 'International Airport & Passport Control Dialogue',
    titleAr: 'محادثات المطار الدولي ومكتب الجوازات بثقة',
    category: 'travel',
    level: 'A2',
    duration: '5:10',
    thumbnail: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=800&auto=format&fit=crop',
    badge: 'سياحة وسفر ✈️',
    summaryEn: 'Step-by-step audio-visual simulation of checking in at Heathrow Airport, navigating customs, and answering passport officer questions.',
    summaryAr: 'محاكاة مرئية وصوتية تفاعلية لإنهاء إجراءات السفر في مطار هيثرو، وتجاوز التفتيش، والإجابة عن أسئلة ضابط الجوازات بكل ثقة.',
    scenes: [
      {
        sceneNumber: 1,
        titleEn: 'Check-in Desk & Luggage Drop',
        titleAr: 'منصة تسليم الحقائب وبطاقة الصعود',
        setting: 'airport',
        characters: [
          { name: 'Agent Emily', role: 'Airline Officer', avatar: '👩‍✈️', position: 'left', color: 'from-sky-500 to-indigo-700' },
          { name: 'Traveler Adam', role: 'Passenger', avatar: '🧳👨', position: 'right', color: 'from-amber-500 to-orange-700' }
        ],
        narration: {
          en: 'Arriving at the airport terminal. Here we present our ticket, choose our seating, and weigh our baggage.',
          ar: 'الوصول إلى صالة المطار. هنا نقدم التذكرة ونختار المقعد ونزن الحقائب بكلمات دقيقة.',
          speaker: 'Emily'
        },
        dialogues: [
          {
            speaker: 'Agent Emily',
            textEn: 'Good afternoon, sir. May I see your passport and flight booking confirmation, please?',
            textAr: 'مساء الخير سيدي. هل يمكنني رؤية جواز سفرك وتأكيد حجز الرحلة من فضلك؟',
            phonetics: '/meɪ aɪ siː jɔː ˈpɑːs.pɔːt ænd flaɪt ˈbʊk.ɪŋ/',
            grammarTip: "'May I see...' هي الصيغة الرسمية لطلب الوثائق.",
            voiceGender: 'female'
          },
          {
            speaker: 'Traveler Adam',
            textEn: 'Good afternoon! Here you are. I would prefer a window seat if one is available.',
            textAr: 'مساء الخير! تفضلي ها هي. أفضل مقعداً بجانب النافذة إذا كان متاحاً.',
            phonetics: '/hɪər juː ɑː aɪ wʊd prɪˈfɜːr ə ˈwɪn.dəʊ siːt/',
            grammarTip: "'I would prefer' أسلوب راقٍ للتعبير عن الرغبة في الاختيار.",
            voiceGender: 'male'
          },
          {
            speaker: 'Agent Emily',
            textEn: 'We certainly have a window seat in row 14! Please place your checked bag on the scale.',
            textAr: 'بالتأكيد لدينا مقعد بجوار النافذة في الصف 14! يرجى وضع حقيبة الشحن على الميزان.',
            phonetics: '/pliːz pleɪs jɔː tʃekt bæɡ ɒn ðə skeɪl/',
            voiceGender: 'female'
          }
        ],
        visualKeypoints: [
          { textEn: 'Luggage vocabulary: Scale, Row, Seat', textAr: 'مفردات الحقائب: الميزان، الصف، المقعد', iconType: 'book', highlightWord: 'Scale' },
          { textEn: 'Polite answer: Here you are', textAr: 'الرد المؤدب عند التسليم: تفضل ها هو', iconType: 'check', highlightWord: 'Here you are' }
        ],
        quizCheckpoint: {
          questionEn: "What is the correct English phrase when handing your passport to an airport agent?",
          questionAr: "ما هي العبارة الإنجليزية السليمة عند تسليم جواز سفرك لموظف المطار؟",
          options: [
            "Here you are. / Here it is.",
            "Take this paper!",
            "I don't have it.",
            "Where is my breakfast?"
          ],
          correctIndex: 0,
          explanationAr: "عبارة 'Here you are' أو 'Here it is' هي العبارة المهذبة القياسية عند تسليم شيء لشخص آخر."
        }
      },
      {
        sceneNumber: 2,
        titleEn: 'Border Security & Passport Interview',
        titleAr: 'مقابلة ضابط الجوازات والأمن الحدودي',
        setting: 'airport',
        characters: [
          { name: 'Officer Thomas', role: 'Immigration Inspector', avatar: '👮‍♂️', position: 'left', color: 'from-slate-700 to-slate-900' },
          { name: 'Traveler Adam', role: 'Visitor', avatar: '🧳👨', position: 'right', color: 'from-amber-500 to-orange-700' }
        ],
        narration: {
          en: 'When facing immigration, answer clearly, concisely, and with calm confidence.',
          ar: 'عند الوقوف أمام ضابط الجوازات، أجب بوضوح وإيجاز وثقة هادئة دون ارتباك.',
          speaker: 'Emily'
        },
        dialogues: [
          {
            speaker: 'Officer Thomas',
            textEn: 'What is the purpose of your visit to the United Kingdom?',
            textAr: 'ما هو الغرض من زيارتك للمملكة المتحدة؟',
            phonetics: '/wɒt ɪz ðə ˈpɜː.pəs ɒv jɔː ˈvɪz.ɪt/',
            grammarTip: "'Purpose of visit' سؤال أساسي يطرحه كل ضباط الجوازات عالمياً.",
            voiceGender: 'male'
          },
          {
            speaker: 'Traveler Adam',
            textEn: "I am here for tourism and academic language training for two weeks.",
            textAr: 'أنا هنا بغرض السياحة والتدريب الأكاديمي على اللغة لمدة أسبوعين.',
            phonetics: '/aɪ æm hɪər fɔː ˈtʊə.rɪ.zəm ænd ˌæk.əˈdem.ɪk ˈtreɪ.nɪŋ/',
            voiceGender: 'male'
          },
          {
            speaker: 'Officer Thomas',
            textEn: 'Where will you be staying during your visit?',
            textAr: 'أين ستكون إقامتك طوال مدة زيارتك؟',
            phonetics: '/weər wɪl juː biː ˈsteɪ.ɪŋ/',
            voiceGender: 'male'
          },
          {
            speaker: 'Traveler Adam',
            textEn: 'At the Grand Plaza Hotel in central London. Here is my hotel booking.',
            textAr: 'في فندق غراند بلازا بوسط لندن. وهذا إثبات حجز الفندق.',
            phonetics: '/æt ðə ɡrænd ˈplɑː.zə həʊˈtel hɪər ɪz maɪ ˈbʊk.ɪŋ/',
            voiceGender: 'male'
          }
        ],
        visualKeypoints: [
          { textEn: 'Purpose: Tourism / Business / Study', textAr: 'الغرض: سياحة / عمل / دراسة', iconType: 'star', highlightWord: 'Purpose' },
          { textEn: 'Have documentation ready', textAr: 'احتفظ بأوراق الحجز جاهزة', iconType: 'check', highlightWord: 'Booking' }
        ],
        quizCheckpoint: {
          questionEn: "If the immigration officer asks: 'How long do you plan to stay?', you should answer:",
          questionAr: "إذا سألك ضابط الجوازات: 'How long do you plan to stay؟'، يجب أن تجيب بـ:",
          options: [
            "For two weeks, returning on the 25th of this month.",
            "I love flying in airplanes very much.",
            "Yes, I have two bags.",
            "My favorite color is navy blue."
          ],
          correctIndex: 0,
          explanationAr: "تحديد المدة الزمنية وتاريخ العودة بدقة يثبت لضابط الجوازات مصداقية الرحلة ونظامها."
        }
      }
    ],
    vocabulary: [
      { word: 'Immigration', meaningAr: 'دائرة الهجرة والجوازات', pronunciation: '/ˌɪm.ɪˈɡreɪ.ʃən/', exampleSentence: 'We passed smoothly through airport immigration.' },
      { word: 'Baggage', meaningAr: 'أمتعة وحقائب السفر', pronunciation: '/ˈbæɡ.ɪdʒ/', exampleSentence: 'Make sure your baggage does not exceed the weight limit.' },
      { word: 'Boarding Pass', meaningAr: 'بطاقة الصعود إلى الطائرة', pronunciation: '/ˈbɔː.dɪŋ ˌpɑːs/', exampleSentence: 'Have your passport and boarding pass ready at gate 12.' },
      { word: 'Purpose', meaningAr: 'الهدف أو الغرض من الزيارة', pronunciation: '/ˈpɜː.pəs/', exampleSentence: 'The primary purpose of my trip is international study.' }
    ]
  },
  {
    id: 'prod-vid-03',
    titleEn: 'Job Interview & Executive Pitch Secrets',
    titleAr: 'أسرار المقابلات الوظيفية والعرض التنفيذي المهني',
    category: 'business',
    level: 'B2',
    duration: '5:45',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    badge: 'بيزنس واحتراف 💼',
    summaryEn: 'Mastering the STAR interview method, executive presence, and pitching career achievements with persuasive vocabulary.',
    summaryAr: 'إتقان منهجية STAR في المقابلات، والحضور التنفيذي القوي، واستعراض الإنجازات المهنية بمفردات إنجليزية مقنعة ومؤثرة.',
    scenes: [
      {
        sceneNumber: 1,
        titleEn: 'The Opening: Tell Me About Yourself',
        titleAr: 'الافتتاحية: حدثني عن مسيرتك المهنية',
        setting: 'business_office',
        characters: [
          { name: 'Director Victoria', role: 'Hiring Executive', avatar: '👩‍💼', position: 'left', color: 'from-purple-600 to-indigo-900' },
          { name: 'Candidate Sami', role: 'Senior Specialist', avatar: '👨‍💼', position: 'right', color: 'from-blue-600 to-slate-900' }
        ],
        narration: {
          en: 'The opening question sets the tone. Structure your pitch around Present, Past, and Future Value.',
          ar: 'السؤال الأول يحدد انطباع المقابلة. نظّم إجابتك وفق صيغة: الحاضر، الخبرات السابقة، والقيمة المستقبلية التي ستضيفها.',
          speaker: 'Victoria'
        },
        dialogues: [
          {
            speaker: 'Director Victoria',
            textEn: "Welcome Sami. Could you walk me through your professional background and core strengths?",
            textAr: "أهلاً بك يا سامي. هل يمكنك إطلاعي على خلفيتك المهنية وأبرز نقاط قوتك؟",
            phonetics: '/ˈwel.kəm ˈsɑː.mi kʊd juː wɔːk miː θruː jɔː prəˈfeʃ.ən.əl bæk.ɡraʊnd/',
            voiceGender: 'female'
          },
          {
            speaker: 'Candidate Sami',
            textEn: "Certainly! Over the past five years, I have specialized in digital transformation and leading cross-functional teams.",
            textAr: "بكل سرور! على مدار السنوات الخمس الماضية، تخصصت في التحول الرقمي وقيادة الفرق متعددة التخصصات.",
            phonetics: '/aɪ hæv ˈspeʃ.əl.aɪzd ɪn ˈdɪdʒ.ɪ.təl ˌtræns.fəˈmeɪ.ʃən/',
            grammarTip: "استخدام Present Perfect ('I have specialized') يربط الخبرة السابقة بالحاضر بنجاح.",
            voiceGender: 'male'
          },
          {
            speaker: 'Candidate Sami',
            textEn: "My greatest strength is synthesizing complex data into actionable business strategies that drive tangible growth.",
            textAr: "أعظم نقاط قوتي هي تحليل ودمج البيانات المعقدة وتحويلها إلى استراتيجيات عمل قابلة للتنفيذ تدفع عجلة النمو الملموس.",
            phonetics: '/maɪ ˈɡreɪ.tɪst streŋθ ɪz ˈsɪn.θə.saɪ.zɪŋ ˈkɒm.pleks ˈdeɪ.tə/',
            grammarTip: "'Tangible growth' مصطلح بيزنس رفيع يعني 'نمواً ملموساً وقابلاً للقياس'.",
            voiceGender: 'male'
          }
        ],
        visualKeypoints: [
          { textEn: 'Present -> Past -> Future Framework', textAr: 'هيكل الإجابة: الحاضر -> الماضي -> المستقبل', iconType: 'star', highlightWord: 'Framework' },
          { textEn: 'Action verbs: Synthesize, Drive, Lead', textAr: 'أفعال التأثير: يدمج، يدفع، يقود', iconType: 'zap', highlightWord: 'Action verbs' }
        ],
        quizCheckpoint: {
          questionEn: "What does 'Tangible Growth' mean in professional business discussions?",
          questionAr: "ماذا يعني مصطلح 'Tangible Growth' في سياق الأعمال والشركات؟",
          options: [
            "Measurable, clear, and real commercial progress",
            "Imaginary ideas that have zero results",
            "Growing taller in physical height",
            "Canceling all employee meetings"
          ],
          correctIndex: 0,
          explanationAr: "كلمة Tangible تعني الشيء الملموس والواقعي الذي يظهر في الأرقام والإحصاءات بوضوح."
        }
      }
    ],
    vocabulary: [
      { word: 'Cross-functional', meaningAr: 'متعدد التخصصات والمهام', pronunciation: '/ˌkrɒs.fʌŋk.ʃən.əl/', exampleSentence: 'He managed a cross-functional team of 15 engineers.' },
      { word: 'Synthesize', meaningAr: 'يحلل ويدمج الأفكار في نسق موحد', pronunciation: '/ˈsɪn.θə.saɪz/', exampleSentence: 'She can synthesize vast market trends into simple slides.' },
      { word: 'Tangible', meaningAr: 'ملموس وقابل للقياس العملي', pronunciation: '/ˈtæn.dʒə.bəl/', exampleSentence: 'The new campaign generated tangible sales results.' }
    ]
  },
  {
    id: 'prod-vid-04',
    titleEn: 'Grammar in Motion: Past Simple vs Present Perfect',
    titleAr: 'قواعد الإنجليزية بالحركة: الماضي البسيط والمضارع التام',
    category: 'grammar',
    level: 'B1',
    duration: '4:50',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
    badge: 'قواعد تفاعلية ⚡',
    summaryEn: 'A visual animated breakdown showing the exact timeline difference between finished past events and ongoing experiences.',
    summaryAr: 'شرح مرئي متحرك يوضح الفرق على الخط الزمني بين الأحداث المنتهية تماماً والخبرات الحياتية المتصلة بالحاضر.',
    scenes: [
      {
        sceneNumber: 1,
        titleEn: 'The Visual Timeline Distinction',
        titleAr: 'التمييز البصري على الخط الزمني',
        setting: 'classroom',
        characters: [
          { name: 'Prof. Lucas', role: 'Grammar Scientist', avatar: '👨‍🔬', position: 'center', color: 'from-emerald-600 to-teal-900' }
        ],
        narration: {
          en: 'Grammar is all about time and perspective. Look at our animated timeline to unlock the true rule!',
          ar: 'القواعد تدور دائماً حول مفهوم الزمن وزاوية النظر. انظر إلى الخط الزمني المتحرك لتستوعب القاعدة الذهبية فوراً!',
          speaker: 'Lucas'
        },
        dialogues: [
          {
            speaker: 'Prof. Lucas',
            textEn: "When we state a specific completed time in the past (like 'yesterday' or 'in 2020'), we ALWAYS use the Past Simple.",
            textAr: "عندما نحدد وقتاً منتهياً ومحدداً في الماضي (مثل yesterday أو in 2020)، نستخدم دائماً الماضي البسيط Past Simple.",
            phonetics: '/aɪ ˈvɪz.ɪ.tɪd ˈlʌn.dən lɑːst jɪər/',
            grammarTip: "مثال: I visited London last year. (محدد ومنتهٍ تماماً).",
            voiceGender: 'male'
          },
          {
            speaker: 'Prof. Lucas',
            textEn: "However, when the experience matters and time is open or connected to now, we use the Present Perfect: 'I have visited London three times.'",
            textAr: "أما عندما تكون التجربة الحياتية هي الأهم والوقت مفتوح حتى هذه اللحظة، نستخدم المضارع التام: I have visited London.",
            phonetics: '/aɪ hæv ˈvɪz.ɪ.tɪd ˈlʌn.dən θriː taɪmz/',
            grammarTip: "المضارع التام يركز على رصيد تجاربك الحياتية حتى اللحظة.",
            voiceGender: 'male'
          }
        ],
        visualKeypoints: [
          { textEn: 'Past Simple = Specific Past Time Point (X)', textAr: 'الماضي البسيط = نقطة زمنية محددة في الماضي (X)', iconType: 'zap', highlightWord: 'Past Simple' },
          { textEn: 'Present Perfect = Life Experience Bridge (~)', textAr: 'المضارع التام = جسر الخبرات الحياتية الممتد (~)', iconType: 'sparkles', highlightWord: 'Present Perfect' }
        ],
        quizCheckpoint: {
          questionEn: "Complete the sentence: 'I ________ a great movie yesterday night.'",
          questionAr: "أكمل الفراغ: 'I ________ a great movie yesterday night.'",
          options: [
            "watched (Past Simple because 'yesterday' is specified)",
            "have watched (Present Perfect)",
            "watching (Continuous)",
            "will watch (Future)"
          ],
          correctIndex: 0,
          explanationAr: "بسبب وجود كلمة 'yesterday night' المحددة بدقة، يتعين استخدام الماضي البسيط 'watched'."
        }
      }
    ],
    vocabulary: [
      { word: 'Completed', meaningAr: 'مكتمل ومنتهٍ تماماً', pronunciation: '/kəmˈpliː.tɪd/', exampleSentence: 'The project was completed last month.' },
      { word: 'Experience', meaningAr: 'خبرة أو تجربة حياتية', pronunciation: '/ɪkˈspɪə.ri.əns/', exampleSentence: 'Traveling gives you unforgettable life experiences.' },
      { word: 'Timeline', meaningAr: 'الخط الزمني لتتابع الأحداث', pronunciation: '/ˈtaɪm.laɪn/', exampleSentence: 'The visual timeline makes English tenses intuitive.' }
    ]
  },
  {
    id: 'prod-vid-05',
    titleEn: 'AI & Future Technology Terminology',
    titleAr: 'مصطلحات الذكاء الاصطناعي والتكنولوجيا الحديثة',
    category: 'ai_tech',
    level: 'B2',
    duration: '5:20',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    badge: 'ذكاء اصطناعي 🤖',
    summaryEn: 'Master cutting-edge technological vocabulary including prompt engineering, neural networks, automation, and machine learning.',
    summaryAr: 'إتقان المصطلحات التكنولوجية المستقبلية من هندسة الأوامر، والشبكات العصبية، والأتمتة الذكية، ونماذج التعلم الآلي.',
    scenes: [
      {
        sceneNumber: 1,
        titleEn: 'Inside the AI Innovations Lab',
        titleAr: 'داخل مختبر ابتكارات الذكاء الاصطناعي',
        setting: 'tech_lab',
        characters: [
          { name: 'Dr. Evelyn', role: 'AI Researcher', avatar: '🔬👩‍💻', position: 'left', color: 'from-cyan-600 to-blue-900' },
          { name: 'Engineer Tariq', role: 'Data Scientist', avatar: '🤖👨‍💻', position: 'right', color: 'from-emerald-600 to-slate-900' }
        ],
        narration: {
          en: 'Welcome to the future of education! Artificial intelligence is transforming how we communicate, work, and create.',
          ar: 'مرحباً بكم في مستقبل التعليم! الذكاء الاصطناعي يعيد صياغة أساليب التواصل والعمل والابتكار عالمياً.',
          speaker: 'Evelyn'
        },
        dialogues: [
          {
            speaker: 'Dr. Evelyn',
            textEn: "Effective prompt engineering relies on precision, context framing, and clear constraints.",
            textAr: "هندسة الأوامر الفعالة تعتمد على الدقة وتأطير السياق ووضع المحددات الواضحة للنموذج.",
            phonetics: '/ɪˈfek.tɪv prɒmpt ˌen.dʒɪˈnɪə.rɪŋ rɪˈlaɪz ɒn prɪˈsɪʒ.ən/',
            voiceGender: 'female'
          },
          {
            speaker: 'Engineer Tariq',
            textEn: "Exactly! When you provide high-fidelity inputs, the multimodal models synthesize phenomenal answers.",
            textAr: "بالضبط! عندما تزود النموذج بمدخلات عالية الدقة، تقوم النماذج متعددة الوسائط بتوليد إجابات باهرة.",
            phonetics: '/haɪ fɪˈdel.ə.ti ˈɪn.pʊts ˈsɪn.θə.saɪz fəˈnɒm.ɪ.nəl ˈɑːn.səz/',
            voiceGender: 'male'
          }
        ],
        visualKeypoints: [
          { textEn: 'Prompt Engineering: Crafting clear instructions', textAr: 'هندسة الأوامر: صياغة توجيهات دقيقة وذكية', iconType: 'zap', highlightWord: 'Prompt Engineering' },
          { textEn: 'Multimodal: Text + Voice + Vision integration', textAr: 'متعدد الوسائط: دمج النصوص والصوت والصورة', iconType: 'sparkles', highlightWord: 'Multimodal' }
        ],
        quizCheckpoint: {
          questionEn: "What does 'Multimodal AI' refer to in modern technology?",
          questionAr: "إلى ماذا يشير مصطلح 'Multimodal AI' في التكنولوجيا الحديثة؟",
          options: [
            "AI systems capable of processing text, audio, images, and video together",
            "Computers that only work without electricity",
            "A printer that only prints black ink",
            "An old mechanical calculator"
          ],
          correctIndex: 0,
          explanationAr: "الذكاء الاصطناعي متعدد الوسائط هو القادر على فهم وتوليد النصوص والأصوات والصور والفيديو بتناغم واحد."
        }
      }
    ],
    vocabulary: [
      { word: 'Prompt Engineering', meaningAr: 'هندسة وصياغة أوامر الذكاء الاصطناعي', pronunciation: '/prɒmpt ˌen.dʒɪˈnɪə.rɪŋ/', exampleSentence: 'Prompt engineering is a vital modern digital skill.' },
      { word: 'Multimodal', meaningAr: 'متعدد الوسائط (صوت، صورة، نص)', pronunciation: '/ˌmʌl.tiˈməʊ.dəl/', exampleSentence: 'Gemini is an advanced multimodal generative model.' },
      { word: 'Automation', meaningAr: 'الأتمتة والتشغيل الآلي الذكي', pronunciation: '/ˌɔː.təˈmeɪ.ʃən/', exampleSentence: 'Smart workflow automation saves hundreds of work hours.' }
    ]
  },
  {
    id: 'prod-vid-06',
    titleEn: 'Kids Magic Phonics & Animal Fun Adventure',
    titleAr: 'مغامرة الحروف والأصوات السحرية للأطفال',
    category: 'kids',
    level: 'A1',
    duration: '3:40',
    thumbnail: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop',
    badge: 'أطفال ومرح 🎈',
    summaryEn: 'Joyful animated phonics adventure for young learners to master vowel sounds, friendly animal names, and fun expressions.',
    summaryAr: 'مغامرة صوتية كرتونية مبهجة للأطفال الصغار لتعلم أصوات الحروف ومخارجها وأسماء الحيوانات اللطيفة بأناشيد وألوان جذابة.',
    scenes: [
      {
        sceneNumber: 1,
        titleEn: 'The Enchanted Safari Park',
        titleAr: 'حديقة الحيوانات السحرية والمرح',
        setting: 'nature_park',
        characters: [
          { name: 'Teacher Noor', role: 'Friendly Guide', avatar: '👧✨', position: 'left', color: 'from-pink-500 to-rose-700' },
          { name: 'Leo the Lion', role: 'Animal Friend', avatar: '🦁', position: 'right', color: 'from-amber-400 to-orange-600' }
        ],
        narration: {
          en: 'Welcome little stars! Let us sing and discover friendly animal sounds together in English!',
          ar: 'أهلاً بكم يا نجومنا الصغار! هيا نغني ونكتشف أصوات الحيوانات اللطيفة وأسماءها بالإنجليزية!',
          speaker: 'Noor'
        },
        dialogues: [
          {
            speaker: 'Teacher Noor',
            textEn: "Look at the golden lion! 'L' is for Lion, /l/ /l/ Lion!",
            textAr: "انظروا إلى الأسد الذهبي! حرف L للأسد، /ل/ /ل/ لايون!",
            phonetics: '/lʊk æt ðə ˈɡəʊl.dən ˈlaɪ.ən/',
            voiceGender: 'female'
          },
          {
            speaker: 'Leo the Lion',
            textEn: "Roar! I am a brave and happy lion. Nice to meet you all!",
            textAr: "زئير لطيف! أنا أسد شجاع وسعيد. سررت بلقائكم جميعاً!",
            phonetics: '/aɪ æm ə breɪv ænd ˈhæp.i ˈlaɪ.ən/',
            voiceGender: 'male'
          }
        ],
        visualKeypoints: [
          { textEn: 'Phonics Sound: /l/ as in Lion & Love', textAr: 'صوت الحرف: /ل/ كما في Lion و Love', iconType: 'star', highlightWord: 'Lion' },
          { textEn: 'Adjective: Brave & Happy', textAr: 'الصفة: شجاع وسعيد', iconType: 'sparkles', highlightWord: 'Brave' }
        ],
        quizCheckpoint: {
          questionEn: "What sound does the letter 'L' make in the word 'Lion'?",
          questionAr: "ما هو الصوت الذي يصدره حرف 'L' في كلمة 'Lion'؟",
          options: [
            "/l/ sound (like Light, Lemon, Lion)",
            "/b/ sound (like Ball)",
            "/z/ sound (like Zebra)",
            "/k/ sound (like Cat)"
          ],
          correctIndex: 0,
          explanationAr: "حرف L يصدر الصوت اللطيف /ل/ كما في Lion و Lemon."
        }
      }
    ],
    vocabulary: [
      { word: 'Lion', meaningAr: 'أسد', pronunciation: '/ˈlaɪ.ən/', exampleSentence: 'The lion is king of the jungle.' },
      { word: 'Brave', meaningAr: 'شجاع وبطل', pronunciation: '/breɪv/', exampleSentence: 'You are a brave and smart child!' },
      { word: 'Enchanted', meaningAr: 'ساحر ومبهر', pronunciation: '/ɪnˈtʃɑːn.tɪd/', exampleSentence: 'We visited the enchanted forest.' }
    ]
  }
];
