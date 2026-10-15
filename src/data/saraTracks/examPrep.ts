/** IELTS / STEP practice — original, hand-written items (not taken from real exams). Raw scores only; no band/score prediction. */
export type ExamKind = 'IELTS' | 'STEP';
export interface ExamQuestion { type: 'tfng' | 'mcq'; q: string; options: string[]; correctIndex: number; whyAr: string }
export interface ExamSet { id: string; exam: ExamKind; kind: 'reading' | 'listening'; titleAr: string; titleEn: string; minutes: number;
  /** Reading: paragraph(s). Listening: lines "Speaker: text" spoken by Sara's cloud voice. */ text: string[]; questions: ExamQuestion[] }
export const EXAM_SETS: ExamSet[] = [
 {
  "id": "ielts-r-1",
  "exam": "IELTS",
  "kind": "reading",
  "titleAr": "القراءة: النحل الحضري",
  "titleEn": "Urban Beekeeping",
  "minutes": 8,
  "text": [
   "Rooftop beekeeping has become popular in many large cities. Supporters claim that urban hives help pollinate parks and gardens and produce honey with distinctive local flavours. However, recent research suggests that adding large numbers of honeybees may harm wild bee species, which compete with them for the same flowers. In some European cities, the number of hives has grown faster than the supply of flowering plants. Scientists therefore recommend that cities plant more native flowers before encouraging new hives. They also point out that wild bees, not honeybees, pollinate many native plants most effectively."
  ],
  "questions": [
   {
    "type": "tfng",
    "q": "Urban beekeeping is popular in some large cities.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 0,
    "whyAr": "النص يقول has become popular in many large cities."
   },
   {
    "type": "tfng",
    "q": "Honey from city hives is more expensive than country honey.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 2,
    "whyAr": "النص ما ذكر السعر أبداً."
   },
   {
    "type": "tfng",
    "q": "Scientists recommend reducing the number of flowers in cities.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 1,
    "whyAr": "العكس: يوصون بزراعة زهور أكثر."
   },
   {
    "type": "mcq",
    "q": "According to the passage, wild bees:",
    "options": [
     "compete with honeybees for flowers",
     "produce more honey",
     "live only in rooftops",
     "are not found in Europe"
    ],
    "correctIndex": 0,
    "whyAr": "wild bee species, which compete with them for the same flowers."
   }
  ]
 },
 {
  "id": "ielts-r-2",
  "exam": "IELTS",
  "kind": "reading",
  "titleAr": "القراءة: تاريخ الملح",
  "titleEn": "The History of Salt",
  "minutes": 8,
  "text": [
   "For most of human history, salt was far more valuable than it is today. Before refrigeration, it was the main way to preserve meat and fish, allowing communities to store food through winter and to trade over long distances. Some historians believe that the word \"salary\" comes from the Latin word for salt, although this is disputed. What is certain is that governments frequently taxed salt, because everyone needed it. In India in 1930, a protest march against the British salt tax became a turning point in the movement for independence."
  ],
  "questions": [
   {
    "type": "tfng",
    "q": "Salt was used to preserve food before refrigeration.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 0,
    "whyAr": "the main way to preserve meat and fish."
   },
   {
    "type": "tfng",
    "q": "All historians agree that \"salary\" comes from the word for salt.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 1,
    "whyAr": "النص يقول although this is disputed."
   },
   {
    "type": "tfng",
    "q": "Salt was the most heavily taxed product in India.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 2,
    "whyAr": "النص ذكر ضريبة الملح لكن ما قارنها بغيرها."
   },
   {
    "type": "mcq",
    "q": "Governments taxed salt because:",
    "options": [
     "it was rare",
     "it was dangerous",
     "it came from abroad",
     "everyone needed it"
    ],
    "correctIndex": 3,
    "whyAr": "because everyone needed it."
   }
  ]
 },
 {
  "id": "ielts-r-3",
  "exam": "IELTS",
  "kind": "reading",
  "titleAr": "القراءة: النوم والتعلم",
  "titleEn": "Sleep and Learning",
  "minutes": 8,
  "text": [
   "A growing body of research shows that sleep plays an active role in learning. In one study, two groups learned a list of word pairs in the evening. One group slept normally, while the other stayed awake. The next morning, the group that had slept recalled significantly more pairs. Brain scans suggest that during deep sleep, the hippocampus replays recent experiences, helping to transfer them into long-term storage. Researchers caution, however, that most studies have been conducted with young adults, and the effects on older people are less clear."
  ],
  "questions": [
   {
    "type": "tfng",
    "q": "Both groups in the study learned the words in the morning.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 1,
    "whyAr": "تعلموها in the evening."
   },
   {
    "type": "tfng",
    "q": "The group that slept remembered more word pairs.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 0,
    "whyAr": "recalled significantly more pairs."
   },
   {
    "type": "tfng",
    "q": "The study paid participants to take part.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 2,
    "whyAr": "ما فيه أي ذكر للدفع."
   },
   {
    "type": "mcq",
    "q": "What do researchers say is less clear?",
    "options": [
     "the effect on young adults",
     "how word pairs were chosen",
     "the effect on older people",
     "the role of the hippocampus"
    ],
    "correctIndex": 2,
    "whyAr": "the effects on older people are less clear."
   }
  ]
 },
 {
  "id": "ielts-r-4",
  "exam": "IELTS",
  "kind": "reading",
  "titleAr": "القراءة: المدن الإسفنجية",
  "titleEn": "Sponge Cities",
  "minutes": 8,
  "text": [
   "In recent years, several Chinese cities have adopted the \"sponge city\" approach to flooding. Instead of channelling rainwater quickly away through concrete drains, these cities aim to absorb and store it. Green roofs, wetlands and permeable pavements allow water to soak into the ground, where it can be reused during dry periods. The approach is cheaper to maintain than traditional systems, but it requires large amounts of space, which can be difficult to find in dense urban centres. Critics also note that extreme storms may still overwhelm even the best-designed systems."
  ],
  "questions": [
   {
    "type": "tfng",
    "q": "Sponge cities rely mainly on concrete drains.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 1,
    "whyAr": "Instead of channelling rainwater ... through concrete drains."
   },
   {
    "type": "tfng",
    "q": "Stored water can be reused when it is dry.",
    "options": [
     "TRUE",
     "FALSE",
     "NOT GIVEN"
    ],
    "correctIndex": 0,
    "whyAr": "reused during dry periods."
   },
   {
    "type": "mcq",
    "q": "One disadvantage of the approach is that it:",
    "options": [
     "wastes rainwater",
     "only works in China",
     "needs a lot of space",
     "is expensive to maintain"
    ],
    "correctIndex": 2,
    "whyAr": "requires large amounts of space."
   },
   {
    "type": "mcq",
    "q": "What do critics say about extreme storms?",
    "options": [
     "They are easy to predict",
     "They may still overwhelm the system",
     "They no longer occur",
     "They help the system"
    ],
    "correctIndex": 1,
    "whyAr": "extreme storms may still overwhelm."
   }
  ]
 },
 {
  "id": "step-r-1",
  "exam": "STEP",
  "kind": "reading",
  "titleAr": "القراءة: مكتبة الملك فهد",
  "titleEn": "A National Library",
  "minutes": 6,
  "text": [
   "The King Fahd National Library in Riyadh was established to collect and preserve everything published in Saudi Arabia. Authors and publishers are required to deposit copies of their books there, so the library holds a nearly complete record of the country's publishing. Its modern building, opened in 2013, is wrapped in a white fabric screen that reduces heat from the sun while allowing soft light inside. Besides books, the library keeps rare manuscripts, newspapers and photographs, and it offers researchers access to digital copies."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "The main purpose of the library is to:",
    "options": [
     "sell new books",
     "train authors",
     "print newspapers",
     "preserve what is published in the country"
    ],
    "correctIndex": 3,
    "whyAr": "to collect and preserve everything published."
   },
   {
    "type": "mcq",
    "q": "The fabric screen on the building:",
    "options": [
     "blocks all light",
     "was added in 1990",
     "reduces heat from the sun",
     "is used for advertising"
    ],
    "correctIndex": 2,
    "whyAr": "reduces heat from the sun."
   },
   {
    "type": "mcq",
    "q": "The word \"deposit\" in the passage is closest in meaning to:",
    "options": [
     "translate",
     "leave or hand in",
     "borrow",
     "destroy"
    ],
    "correctIndex": 1,
    "whyAr": "deposit copies = يسلمون نسخ."
   },
   {
    "type": "mcq",
    "q": "Which is NOT mentioned as kept in the library?",
    "options": [
     "paintings",
     "manuscripts",
     "newspapers",
     "photographs"
    ],
    "correctIndex": 0,
    "whyAr": "اللوحات ما انذكرت."
   }
  ]
 },
 {
  "id": "step-r-2",
  "exam": "STEP",
  "kind": "reading",
  "titleAr": "القراءة: الطب عن بعد",
  "titleEn": "Telemedicine",
  "minutes": 6,
  "text": [
   "Telemedicine allows patients to consult doctors through video calls instead of visiting a clinic. For people in remote villages, this can save hours of travel. It is also useful for follow-up appointments, when a doctor only needs to check progress. However, telemedicine has limits. A doctor cannot listen to a patient's chest or feel a swollen joint through a screen. For this reason, most experts see it as a complement to traditional care, not a replacement."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "Telemedicine is especially helpful for people who:",
    "options": [
     "dislike phones",
     "need surgery",
     "live in remote villages",
     "work in hospitals"
    ],
    "correctIndex": 2,
    "whyAr": "For people in remote villages."
   },
   {
    "type": "mcq",
    "q": "The passage says telemedicine cannot:",
    "options": [
     "use video",
     "allow a doctor to examine the body physically",
     "save travel time",
     "be used for follow-ups"
    ],
    "correctIndex": 1,
    "whyAr": "cannot listen to a patient's chest or feel a swollen joint."
   },
   {
    "type": "mcq",
    "q": "\"Complement\" in the last sentence means:",
    "options": [
     "something that adds to and supports",
     "a polite comment",
     "a full replacement",
     "a difficult problem"
    ],
    "correctIndex": 0,
    "whyAr": "complement = مكمّل."
   },
   {
    "type": "mcq",
    "q": "The writer's attitude towards telemedicine is:",
    "options": [
     "completely negative",
     "extremely enthusiastic",
     "uninterested",
     "balanced"
    ],
    "correctIndex": 3,
    "whyAr": "ذكر المزايا والحدود."
   }
  ]
 },
 {
  "id": "step-r-3",
  "exam": "STEP",
  "kind": "reading",
  "titleAr": "القراءة: الجمل",
  "titleEn": "The Camel",
  "minutes": 6,
  "text": [
   "Camels are remarkably well adapted to desert life. Contrary to a common belief, their humps do not store water; they store fat, which can be turned into energy when food is scarce. Camels can lose up to a quarter of their body weight through sweating without becoming seriously ill, and they can drink over one hundred litres of water in just a few minutes. Their thick eyelashes and the ability to close their nostrils protect them during sandstorms."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "A camel's hump stores:",
    "options": [
     "air",
     "fat",
     "water",
     "milk"
    ],
    "correctIndex": 1,
    "whyAr": "they store fat."
   },
   {
    "type": "mcq",
    "q": "The phrase \"contrary to a common belief\" shows that:",
    "options": [
     "many people think the hump stores water",
     "everyone knows the truth",
     "camels have no humps",
     "scientists disagree"
    ],
    "correctIndex": 0,
    "whyAr": "الاعتقاد الشائع إنها تخزن ماء."
   },
   {
    "type": "mcq",
    "q": "Camels can drink more than 100 litres:",
    "options": [
     "in a week",
     "only at night",
     "in a month",
     "in a few minutes"
    ],
    "correctIndex": 3,
    "whyAr": "in just a few minutes."
   },
   {
    "type": "mcq",
    "q": "What protects camels in sandstorms?",
    "options": [
     "their speed",
     "their colour",
     "eyelashes and closing nostrils",
     "their humps"
    ],
    "correctIndex": 2,
    "whyAr": "thick eyelashes ... close their nostrils."
   }
  ]
 },
 {
  "id": "step-r-4",
  "exam": "STEP",
  "kind": "reading",
  "titleAr": "القراءة: التطوع",
  "titleEn": "Volunteering",
  "minutes": 6,
  "text": [
   "Volunteering is often seen as something people do to help others, but research shows that volunteers benefit too. Regular volunteers report lower levels of stress and a stronger sense of purpose. For young people, volunteering can also build skills that employers value, such as teamwork and communication. Some universities now give credit for community service. Nevertheless, organisers warn that volunteers should not be used to replace paid workers, as this can reduce job opportunities."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "According to the passage, volunteers often feel:",
    "options": [
     "less stressed",
     "more tired",
     "bored",
     "lonely"
    ],
    "correctIndex": 0,
    "whyAr": "lower levels of stress."
   },
   {
    "type": "mcq",
    "q": "Which skill is mentioned as valued by employers?",
    "options": [
     "cooking",
     "driving",
     "drawing",
     "teamwork"
    ],
    "correctIndex": 3,
    "whyAr": "such as teamwork and communication."
   },
   {
    "type": "mcq",
    "q": "Organisers warn that volunteers:",
    "options": [
     "must be students",
     "need university credit",
     "should not replace paid workers",
     "should be paid more"
    ],
    "correctIndex": 2,
    "whyAr": "should not be used to replace paid workers."
   },
   {
    "type": "mcq",
    "q": "The best title for the passage is:",
    "options": [
     "Paid Work Only",
     "The Benefits of Volunteering",
     "How to Find a Job",
     "University Exams"
    ],
    "correctIndex": 1,
    "whyAr": "الفكرة الرئيسية فوائد التطوع."
   }
  ]
 },
 {
  "id": "ielts-l-1",
  "exam": "IELTS",
  "kind": "listening",
  "titleAr": "الاستماع: حجز دورة",
  "titleEn": "Booking a Course",
  "minutes": 5,
  "text": [
   "Woman: Good morning, City Language Centre. How can I help?",
   "Man: Hi, I'd like to enrol in the evening Spanish course.",
   "Woman: Certainly. The beginners' class runs on Mondays and Wednesdays from six thirty to eight.",
   "Man: And how much is it?",
   "Woman: It's two hundred and forty pounds for ten weeks, including the coursebook.",
   "Man: Great. My name is David Mortimer, that's M-O-R-T-I-M-E-R.",
   "Woman: Thank you. The course starts on the fourth of March."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "The class is on:",
    "options": [
     "Mondays and Wednesdays",
     "Tuesdays and Thursdays",
     "Saturdays only"
    ],
    "correctIndex": 0,
    "whyAr": "Mondays and Wednesdays."
   },
   {
    "type": "mcq",
    "q": "The class finishes at:",
    "options": [
     "6:30",
     "8:30",
     "8:00"
    ],
    "correctIndex": 2,
    "whyAr": "from six thirty to eight."
   },
   {
    "type": "mcq",
    "q": "The price includes:",
    "options": [
     "lunch",
     "the coursebook",
     "an exam fee"
    ],
    "correctIndex": 1,
    "whyAr": "including the coursebook."
   },
   {
    "type": "mcq",
    "q": "The man's surname is spelled:",
    "options": [
     "MORTIMER",
     "MORTIMOR",
     "MORTEMER"
    ],
    "correctIndex": 0,
    "whyAr": "M-O-R-T-I-M-E-R."
   },
   {
    "type": "mcq",
    "q": "The course starts on:",
    "options": [
     "14 March",
     "4 May",
     "4 March"
    ],
    "correctIndex": 2,
    "whyAr": "the fourth of March."
   }
  ]
 },
 {
  "id": "ielts-l-2",
  "exam": "IELTS",
  "kind": "listening",
  "titleAr": "الاستماع: جولة في حديقة",
  "titleEn": "Park Tour",
  "minutes": 5,
  "text": [
   "Guide: Welcome to Riverside Park. Let me give you a quick overview before we start.",
   "Guide: The visitor centre, where we are now, is next to the main gate. If you walk straight ahead, you'll reach the lake, which is home to over forty species of birds.",
   "Guide: To the left of the lake is the children's playground, and behind it, the café, which closes at five.",
   "Guide: Please don't feed the ducks bread; it's bad for them. You can buy proper duck food at the visitor centre for one pound."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "The visitor centre is located:",
    "options": [
     "behind the café",
     "by the lake",
     "next to the main gate"
    ],
    "correctIndex": 2,
    "whyAr": "next to the main gate."
   },
   {
    "type": "mcq",
    "q": "How many bird species live at the lake?",
    "options": [
     "over four hundred",
     "over forty",
     "fourteen"
    ],
    "correctIndex": 1,
    "whyAr": "over forty species."
   },
   {
    "type": "mcq",
    "q": "The café is:",
    "options": [
     "behind the playground",
     "next to the gate",
     "on the island"
    ],
    "correctIndex": 0,
    "whyAr": "behind it, the café."
   },
   {
    "type": "mcq",
    "q": "The café closes at:",
    "options": [
     "four",
     "seven",
     "five"
    ],
    "correctIndex": 2,
    "whyAr": "closes at five."
   },
   {
    "type": "mcq",
    "q": "Visitors should NOT feed ducks:",
    "options": [
     "seeds",
     "bread",
     "duck food"
    ],
    "correctIndex": 1,
    "whyAr": "don't feed the ducks bread."
   }
  ]
 },
 {
  "id": "ielts-l-3",
  "exam": "IELTS",
  "kind": "listening",
  "titleAr": "الاستماع: محاضرة عن الرياح",
  "titleEn": "Lecture: Wind Energy",
  "minutes": 5,
  "text": [
   "Lecturer: Today we'll look at wind energy. Modern turbines are much larger than earlier ones; some blades are now over one hundred metres long.",
   "Lecturer: The main advantage, of course, is that wind produces no emissions once the turbine is built.",
   "Lecturer: The main drawback is that output is variable: when the wind drops, so does electricity production.",
   "Lecturer: Offshore wind farms help, because winds at sea are stronger and more consistent, although building at sea costs considerably more.",
   "Lecturer: Next week, we'll compare this with solar power."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "Some modern blades are longer than:",
    "options": [
     "1,000 metres",
     "100 metres",
     "10 metres"
    ],
    "correctIndex": 1,
    "whyAr": "over one hundred metres long."
   },
   {
    "type": "mcq",
    "q": "The main drawback of wind is that it is:",
    "options": [
     "variable",
     "noisy",
     "expensive to run"
    ],
    "correctIndex": 0,
    "whyAr": "output is variable."
   },
   {
    "type": "mcq",
    "q": "Offshore winds are:",
    "options": [
     "weaker",
     "the same as on land",
     "stronger and more consistent"
    ],
    "correctIndex": 2,
    "whyAr": "stronger and more consistent."
   },
   {
    "type": "mcq",
    "q": "Building at sea is:",
    "options": [
     "faster",
     "more expensive",
     "cheaper"
    ],
    "correctIndex": 1,
    "whyAr": "costs considerably more."
   },
   {
    "type": "mcq",
    "q": "Next week's topic is:",
    "options": [
     "solar power",
     "nuclear power",
     "offshore wind"
    ],
    "correctIndex": 0,
    "whyAr": "compare this with solar power."
   }
  ]
 },
 {
  "id": "ielts-l-4",
  "exam": "IELTS",
  "kind": "listening",
  "titleAr": "الاستماع: نقاش طلاب",
  "titleEn": "Students' Project Discussion",
  "minutes": 5,
  "text": [
   "Sara: So, for our project on food waste, I think we should survey students in the canteen.",
   "Tom: Good idea, but a survey only tells us what people say. Why don't we also weigh the food left on plates?",
   "Sara: That's more reliable. We'd need permission from the canteen manager, though.",
   "Tom: I'll email her today. Could you design the questionnaire?",
   "Sara: Sure. Let's keep it to ten questions so people actually finish it."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "The project is about:",
    "options": [
     "food waste",
     "healthy eating",
     "canteen prices"
    ],
    "correctIndex": 0,
    "whyAr": "our project on food waste."
   },
   {
    "type": "mcq",
    "q": "Tom suggests:",
    "options": [
     "interviewing chefs",
     "cancelling the survey",
     "weighing leftover food"
    ],
    "correctIndex": 2,
    "whyAr": "weigh the food left on plates."
   },
   {
    "type": "mcq",
    "q": "They need permission from:",
    "options": [
     "the students",
     "the canteen manager",
     "their tutor"
    ],
    "correctIndex": 1,
    "whyAr": "permission from the canteen manager."
   },
   {
    "type": "mcq",
    "q": "Who will design the questionnaire?",
    "options": [
     "Sara",
     "Tom",
     "the manager"
    ],
    "correctIndex": 0,
    "whyAr": "Could you design the questionnaire? — Sure."
   },
   {
    "type": "mcq",
    "q": "The questionnaire will have:",
    "options": [
     "twenty questions",
     "five questions",
     "ten questions"
    ],
    "correctIndex": 2,
    "whyAr": "keep it to ten questions."
   }
  ]
 },
 {
  "id": "step-l-1",
  "exam": "STEP",
  "kind": "listening",
  "titleAr": "الاستماع: إعلان مدرسة",
  "titleEn": "School Announcement",
  "minutes": 4,
  "text": [
   "Principal: Good morning, students. Please note that tomorrow's science fair will begin at nine o'clock in the sports hall, not in the library as announced earlier.",
   "Principal: Parents are welcome from ten.",
   "Principal: Students presenting projects must arrive by eight thirty to set up.",
   "Principal: Finally, the school bus will leave one hour later than usual tomorrow afternoon."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "Where will the science fair be held?",
    "options": [
     "the library",
     "the classroom",
     "the sports hall"
    ],
    "correctIndex": 2,
    "whyAr": "in the sports hall, not in the library."
   },
   {
    "type": "mcq",
    "q": "Parents can come from:",
    "options": [
     "8:30",
     "10:00",
     "9:00"
    ],
    "correctIndex": 1,
    "whyAr": "Parents are welcome from ten."
   },
   {
    "type": "mcq",
    "q": "Presenters must arrive by:",
    "options": [
     "8:30",
     "9:00",
     "10:00"
    ],
    "correctIndex": 0,
    "whyAr": "arrive by eight thirty."
   },
   {
    "type": "mcq",
    "q": "The school bus will leave:",
    "options": [
     "an hour earlier",
     "at the usual time",
     "an hour later than usual"
    ],
    "correctIndex": 2,
    "whyAr": "one hour later than usual."
   }
  ]
 },
 {
  "id": "step-l-2",
  "exam": "STEP",
  "kind": "listening",
  "titleAr": "الاستماع: في الصيدلية",
  "titleEn": "At the Pharmacy",
  "minutes": 4,
  "text": [
   "Customer: Hello, I have a bad cough. Can you recommend something?",
   "Pharmacist: How long have you had it?",
   "Customer: About four days. It's worse at night.",
   "Pharmacist: This syrup should help. Take one spoon three times a day after meals. If it doesn't improve within a week, you should see a doctor."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "How long has the customer had the cough?",
    "options": [
     "two days",
     "four days",
     "a week"
    ],
    "correctIndex": 1,
    "whyAr": "About four days."
   },
   {
    "type": "mcq",
    "q": "The cough is worse:",
    "options": [
     "at night",
     "in the morning",
     "after meals"
    ],
    "correctIndex": 0,
    "whyAr": "It's worse at night."
   },
   {
    "type": "mcq",
    "q": "How often should he take the syrup?",
    "options": [
     "once a day",
     "twice a day",
     "three times a day"
    ],
    "correctIndex": 2,
    "whyAr": "three times a day."
   },
   {
    "type": "mcq",
    "q": "He should see a doctor if:",
    "options": [
     "he finishes the bottle",
     "it doesn't improve within a week",
     "he feels sleepy"
    ],
    "correctIndex": 1,
    "whyAr": "If it doesn't improve within a week."
   }
  ]
 },
 {
  "id": "step-l-3",
  "exam": "STEP",
  "kind": "listening",
  "titleAr": "الاستماع: مكالمة عمل",
  "titleEn": "A Work Phone Call",
  "minutes": 4,
  "text": [
   "Ahmed: Hi Laila, it's Ahmed. I'm calling about Thursday's meeting with the client.",
   "Laila: Is there a problem?",
   "Ahmed: They've asked to move it to Sunday morning because their manager is travelling.",
   "Laila: Sunday is fine for me. Should I still prepare the sales report?",
   "Ahmed: Yes, please, and could you also bring printed copies for five people?"
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "Why is the meeting moving?",
    "options": [
     "the client's manager is travelling",
     "Laila is sick",
     "the room is busy"
    ],
    "correctIndex": 0,
    "whyAr": "their manager is travelling."
   },
   {
    "type": "mcq",
    "q": "When is the new meeting?",
    "options": [
     "Thursday morning",
     "Sunday evening",
     "Sunday morning"
    ],
    "correctIndex": 2,
    "whyAr": "move it to Sunday morning."
   },
   {
    "type": "mcq",
    "q": "What should Laila prepare?",
    "options": [
     "lunch",
     "the sales report",
     "a presentation"
    ],
    "correctIndex": 1,
    "whyAr": "prepare the sales report — Yes."
   },
   {
    "type": "mcq",
    "q": "How many printed copies are needed?",
    "options": [
     "five",
     "four",
     "ten"
    ],
    "correctIndex": 0,
    "whyAr": "printed copies for five people."
   }
  ]
 },
 {
  "id": "step-l-4",
  "exam": "STEP",
  "kind": "listening",
  "titleAr": "الاستماع: محاضرة قصيرة",
  "titleEn": "Short Talk: Dates",
  "minutes": 4,
  "text": [
   "Speaker: The date palm has been grown in Arabia for thousands of years.",
   "Speaker: A single tree can produce more than one hundred kilograms of fruit a year.",
   "Speaker: Almost every part of the tree was traditionally used: the leaves for baskets and roofs, and the trunk for building.",
   "Speaker: Today, Saudi Arabia is among the world's largest producers of dates."
  ],
  "questions": [
   {
    "type": "mcq",
    "q": "A single tree can produce more than:",
    "options": [
     "10 kg a year",
     "1,000 kg a year",
     "100 kg a year"
    ],
    "correctIndex": 2,
    "whyAr": "more than one hundred kilograms."
   },
   {
    "type": "mcq",
    "q": "The leaves were used for:",
    "options": [
     "fuel only",
     "baskets and roofs",
     "medicine"
    ],
    "correctIndex": 1,
    "whyAr": "the leaves for baskets and roofs."
   },
   {
    "type": "mcq",
    "q": "The trunk was used for:",
    "options": [
     "building",
     "food",
     "making rope"
    ],
    "correctIndex": 0,
    "whyAr": "the trunk for building."
   },
   {
    "type": "mcq",
    "q": "The talk says Saudi Arabia is:",
    "options": [
     "the only producer",
     "a small producer",
     "among the largest producers"
    ],
    "correctIndex": 2,
    "whyAr": "among the world's largest producers."
   }
  ]
 }
];
export const EXAM_TRACK_ID = 'exam-prep';
