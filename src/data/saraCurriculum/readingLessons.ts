import { SaraCurriculumLesson } from './types';

export const SARA_READING_PHONETICS_LESSONS: SaraCurriculumLesson[] = [
  // ==========================================
  // STARTER LEVEL (A1-A2) - Lessons 1 to 10
  // ==========================================
  {
    id: 'srp_301',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'سحر ربط الكلمات في الحديث السريع (Connected Speech & Linking)',
    titleEn: 'Connected Speech: Stop Sounding Like a Robot',
    descAr: 'تعلم كيف يدمج المتحدث الأصلي نهاية الكلمة ببداية الكلمة التالية ليصبح كلامه لحناً واحداً سلساً دون تقطيع.',
    descEn: 'Connect consonants to vowels seamlessly so your speech flows effortlessly.',
    speakingGoalAr: 'قراءة جملة مركبة من 10 كلمات بنَفَس واحد وربط صوتي كامل مع سارة.',
    speakingGoalEn: 'Read and voice a connected sentence in one breath with native linking.',
    keyPattern: {
      ruleAr: 'عندما تنتهي كلمة بحرف ساكن (Consonant) وتبدأ الكلمة التالية بحرف متحرك (Vowel)، يلتصقان صوتياً كأنهما كلمة واحدة.',
      ruleEn: 'Consonant-to-Vowel linking: pronounce "Hold on" as "Hol-don".',
      formula: '[Consonant ending] + [Vowel beginning] ➡️ One Unified Sound'
    },
    practicalExamples: [
      {
        en: "Hold on a second. ➡️ Sounds like: [Hol-do-na-second]",
        ar: 'انتظر ثانية واحدة.',
        spokenNoteAr: 'انتبه كيف ارتبط حرف d بـ o وحرف n بـ a.'
      },
      {
        en: "Check it out. ➡️ Sounds like: [Che-ki-tout]",
        ar: 'ألقِ نظرة على هذا.',
        spokenNoteAr: 'الـ k ارتبطت بـ it، والـ t ارتبطت بـ out.'
      },
      {
        en: "Pick it up at eight. ➡️ Sounds like: [Pi-ki-tu-pa-teight]",
        ar: 'التقطه في تمام الثامنة.',
        spokenNoteAr: 'سلسلة متصلة من أربع كلمات تُنطق كأنها كلمة واحدة مركبة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pausing between every single word: Hold... on... a... second.",
        correct: "Blend the sounds together smoothly: Hold-on-a-second.",
        whyAr: 'التقطيع المفرط يجعل النطق مجهداً ويبدو آلياً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ العبارة لسارة بصوتك عبر المايك مع تطبيق الربط الصوتي: "Turn it off and check it out"!',
      promptEn: 'Voice this aloud with linking: "Turn it off and check it out"!',
      saraQuestionAr: 'Can you read this phrase aloud for me with seamless linking: "Turn it off and check it out"?',
      saraQuestionEn: 'Can you read this phrase aloud for me with seamless linking: "Turn it off and check it out"?',
      recommendedResponseEn: "Turn it off and check it out!"
    },
    quiz: [
      {
        questionAr: 'كيف تُنطق عبارة "Pick it up" في الحديث المتصل والسريع؟',
        questionEn: 'How does "Pick it up" sound in native connected speech?',
        options: [
          "Pick... it... up (separated)",
          "Pi-ki-tup (seamlessly linked)",
          "Piku itu upu",
          "Pack at up"
        ],
        correctIndex: 1,
        explanationAr: 'في الربط الصوتي تلتحم السواكن بالمتحركات لتصبح: Pi-ki-tup.'
      }
    ],
    whiteboardNotes: {
      title: 'Connected Speech Magic',
      pointsAr: [
        'قاعدة الذهب: حرف ساكن + حرف متحرك = اندماج صوتي كامل',
        'Hold on ➡️ Hol-don',
        'Check it out ➡️ Che-ki-tout',
        'تحدث بفك مرتاح دون ضغط'
      ],
      pointsEn: [
        'Consonant + Vowel = Sonic Glide',
        'Hold on ➡️ Hol-don',
        'Check it out ➡️ Che-ki-tout',
        'Relax your jaw and let the words merge'
      ],
      chalkHighlight: 'Consonant ➕ Vowel ➡️ Sonic Glide'
    }
  },
  {
    id: 'srp_304',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'مخارج صوت الـ TH المهموس والمجهور (Voiced vs Voiceless TH)',
    titleEn: 'Taming the TH: Voiced (This/That) vs Voiceless (Think/Thanks)',
    descAr: 'كيف تخرج لسانك بين أسنانك بشكل صحيح وتفرق بين صوت الذال (This) وصوت الثاء (Think) دون أن تنطقها S أو Z.',
    descEn: 'Master the tongue-between-teeth mechanic for clear /θ/ and /ð/ sounds.',
    speakingGoalAr: 'نطق جملة تجمع بين الصوتين (This thing and that thought) بوضوح صوتي كامل.',
    speakingGoalEn: 'Distinguish and voice voiced /ð/ and voiceless /θ/ with correct tongue placement.',
    keyPattern: {
      ruleAr: 'في صوت الـ TH: ضع طرف لسانك بين أسنانك العلوية والسفلية. إذا اهتزت الحبال الصوتية فهو مجهور (This /ð/ مثل الذال)، وإذا خرج هواء فقط فهو مهموس (Think /θ/ مثل الثاء).',
      ruleEn: 'Tongue between teeth: Voiced /ð/ vibrates vocal cords (this, they, brother). Voiceless /θ/ is pure friction (think, thank, breath).',
      formula: 'Tongue between teeth + Vibration = /ð/ (This) | Pure Air = /θ/ (Think)'
    },
    practicalExamples: [
      {
        en: "I think that this theory is thoughtful. (/θ/ vs /ð/)",
        ar: 'أعتقد أن هذه النظرية مدروسة بعناية.',
        spokenNoteAr: 'think و theory و thoughtful فيها صوت الثاء /θ/، بينما that و this فيها صوت الذال /ð/.'
      },
      {
        en: "Thanks for helping my brother and mother.",
        ar: 'شكراً لمساعدة أخي وأمي.',
        spokenNoteAr: 'Thanks صوت ثاء، بينما brother و mother صوت ذال مجهور.'
      },
      {
        en: "Breathe in deeply, then take another breath.",
        ar: 'تنفس بعمق (فعل مجهور /ð/)، ثم خذ نفساً آخر (اسم مهموس /θ/).',
        spokenNoteAr: 'لاحظ الفرق الصوتي بين الفعل breathe والاسم breath.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing 'Think' as 'Sink' or 'Thank you' as 'Sank you'.",
        correct: "Place the tongue lightly between the teeth so air passes through: Think, Thank you.",
        whyAr: 'نطق TH كحرف S أو Z يغير معنى الكلمة بالكامل (Think = يفكر / Sink = يغرق).'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة عبر المايك هذا التدريب اللساني الشهير: "Thirty-three thousand feathers"!',
      promptEn: 'Voice this tongue-twister to Sara: "Thirty-three thousand feathers"!',
      saraQuestionAr: 'Let me test your TH tongue placement! Read: "Thirty-three thousand feathers" aloud!',
      saraQuestionEn: 'Let me test your TH tongue placement! Read: "Thirty-three thousand feathers" aloud!',
      recommendedResponseEn: "Thirty-three thousand feathers!"
    },
    quiz: [
      {
        questionAr: 'أي من الكلمات التالية تحتوي على صوت الـ TH المجهور (Voiced /ð/ مثل صوت الذال)؟',
        questionEn: 'Which word contains the VOICED /ð/ sound (like in "father")?',
        options: [
          "Theater",
          "Together",
          "Thought",
          "Thirsty"
        ],
        correctIndex: 1,
        explanationAr: 'كلمة "Together" يُنطق فيها صوت TH مجهوراً باهتزاز الحبال الصوتية /ð/ كحرف الذال.'
      }
    ],
    whiteboardNotes: {
      title: 'The TH Mechanics Guide',
      pointsAr: [
        'الموضع الفيزيائي: طرف اللسان يبرز برفق بين الأسنان',
        'صوت الثاء المهموس /θ/: Think, Thank, Three, Bath (هواء خالص)',
        'صوت الذال المجهور /ð/: This, That, Brother, Breathe (اهتزاز الحبال)',
        'تحذير: لا تبدلها بـ S أو Z!'
      ],
      pointsEn: [
        'Tongue placement: Tip of tongue slightly between upper and lower teeth',
        'Voiceless /θ/: Think, Thursday, Math (Air only)',
        'Voiced /ð/: This, These, Weather (Vocal cords hum)',
        'Never substitute S or Z!'
      ],
      chalkHighlight: 'Voiceless /θ/ (Think) 🆚 Voiced /ð/ (This)'
    }
  },
  {
    id: 'srp_305',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'سحر الحرف E الصامت وتغيير نطق الحروف المتحركة (The Magic Silent E)',
    titleEn: 'The Magic E: Short vs Long Vowels in Instant Reading',
    descAr: 'كيف يغير حرف E في نهاية الكلمة نطق الحرف المتحرك السابق من صوت قصير إلى اسمه الطويل الكامل.',
    descEn: 'Understand how the trailing silent E unlocks long vowel sounds instantly.',
    speakingGoalAr: 'قراءة أزواج الكلمات المتقابلة (Hop/Hope, Bit/Bite, Cap/Cape) بتمييز صوتي واضح.',
    speakingGoalEn: 'Read contrasting vowel pairs effortlessly recognizing the phonetic shift of silent E.',
    keyPattern: {
      ruleAr: 'قاعدة الـ Magic E: عندما تنتهي الكلمة بـ E صامتة، ينطق الحرف المتحرك السابق بصوته الأبجدي الطويل (A, E, I, O, U).',
      ruleEn: 'The Magic E rule: A trailing silent E forces the preceding vowel to say its long alphabet name.',
      formula: 'Vowel + Consonant + E ➡️ Long Vowel Sound'
    },
    practicalExamples: [
      {
        en: "Hop ➡️ Hope | Cap ➡️ Cape | Bit ➡️ Bite | Cut ➡️ Cute",
        ar: 'يقفز ⬅️ أمل | قبعة ⬅️ وشاح | لقمة ⬅️ عضة | يقطع ⬅️ لطيف',
        spokenNoteAr: 'لاحظ كيف تحول صوت الحرف القصير إلى اسم الحرف الطويل بمجرد إضافة حرف e.'
      },
      {
        en: "He made a plan to ride his bike on the plane.",
        ar: 'وضع خطة (plan) لركوب دراجته (bike) على متن الطائرة (plane).',
        spokenNoteAr: 'قارن بين plan (قصير) و plane (طويل).'
      },
      {
        en: "She took a kit and flew a kite.",
        ar: 'أخذت حقيبة أدوات (kit) وأطلقت طائرة ورقية (kite).',
        spokenNoteAr: 'الفرق بين صوت الكسرة القصيرة في kit وصوت الـ I الطويل في kite.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing the trailing E aloud: 'Bit-e' or 'Hop-e'.",
        correct: "The trailing E is 100% silent; its only job is stretching the previous vowel.",
        whyAr: 'حرف E في نهاية هذه الكلمات لا ينطق إطلاقاً، بل يعمل كمفتاح سحري لتطويل الحرف السابق.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة هذه الجملة بصوتك مع التمييز بين الكلمات المتقابلة: "He bit into the apple and took a huge bite!"',
      promptEn: 'Read aloud to Sara: "He bit into the apple and took a huge bite!"',
      saraQuestionAr: 'Let me hear your vowel length contrast: "He bit into the apple and took a huge bite!"',
      saraQuestionEn: 'Let me hear your vowel length contrast: "He bit into the apple and took a huge bite!"',
      recommendedResponseEn: "He bit into the apple and took a huge bite!"
    },
    quiz: [
      {
        questionAr: 'ما الكلمة التي يُنطق فيها الحرف المتحرك بصوته الطويل بفضل الـ Magic E؟',
        questionEn: 'Which word contains a long vowel sound triggered by silent E?',
        options: [
          "Hat",
          "Hate",
          "Hot",
          "Hut"
        ],
        correctIndex: 1,
        explanationAr: 'كلمة "Hate" تنتهي بـ e صامتة تجعل حرف a ينطق بصوته الطويل [ay].'
      }
    ],
    whiteboardNotes: {
      title: 'The Magic Silent E Rule',
      pointsAr: [
        'A قصير (Hat) ⬅️ A طويل (Hate)',
        'I قصير (Kit) ⬅️ I طويل (Kite)',
        'O قصير (Not) ⬅️ O طويل (Note)',
        'U قصير (Tub) ⬅️ U طويل (Tube)',
        'الـ E الأخيرة صامتة تماماً، ومهمتها تطويل السابق فقط!'
      ],
      pointsEn: [
        'Short a (Cap) ➡️ Long a (Cape)',
        'Short i (Fin) ➡️ Long i (Fine)',
        'Short o (Rob) ➡️ Long o (Robe)',
        'Short u (Cub) ➡️ Long u (Cube)',
        'Silent E never speaks; it only empowers!'
      ],
      chalkHighlight: 'Vowel + Consonant + E ➡️ Long Alphabet Vowel'
    }
  },
  {
    id: 'srp_306',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'الحروف الصامتة الأكثر شيوعاً في الإنجليزية (Silent Letters Mastery)',
    titleEn: 'Silent Letters: Words with Invisible Sounds (K, B, P, W, L, H)',
    descAr: 'كيف تتجنب نطق الحروف الصامتة الفخاخ مثل الكاف في Knife، والباء في Doubt، واللام في Half.',
    descEn: 'Stop pronouncing trap letters: Knife, Doubt, Island, Receipt, Half, Walk.',
    speakingGoalAr: 'قراءة فقرة تحتوي على 5 كلمات ذات حروف صامتة شائعة دون الوقوع في الفخ.',
    speakingGoalEn: 'Read words containing silent K, B, P, S, and L smoothly and correctly.',
    keyPattern: {
      ruleAr: 'في الإنجليزية، تطور النطق وبقيت الكتابة التاريخية: KN تنطق N، و MB تنطق M، و BT تنطق T، و PS تنطق S.',
      ruleEn: 'Silent letters patterns: Kn = /n/; Mb = /m/; Bt = /t/; Ps = /s/; L before F/K/M is often silent.',
      formula: 'Knife ➡️ [nife] | Doubt ➡️ [dowt] | Receipt ➡️ [re-seet]'
    },
    practicalExamples: [
      {
        en: "I know you doubt the receipt, but listen to my answer. (Silent k, b, p, t, w)",
        ar: 'أعلم أنك تشك في الإيصال، ولكن استمع إلى إجابتي.',
        spokenNoteAr: 'know (k صامت)، doubt (b صامت)، receipt (p صامت)، listen (t صامت)، answer (w صامت).'
      },
      {
        en: "He climbed the mountain despite the muscle ache.",
        ar: 'تسلق الجبل رغم آلام العضلات.',
        spokenNoteAr: 'climbed (b صامت)، muscle (c صامت)، ache تنطق [ayk].'
      },
      {
        en: "Would you like half of this salmon?",
        ar: 'هل تود نصف هذه السلمونة؟',
        spokenNoteAr: 'half (l صامت تماماً)، salmon تنطق [sam-un] دون نطق L.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing 'Doubt' as 'Dowbt' or 'Knife' as 'K-nife'.",
        correct: "Drop the silent letters completely: 'Dowt' and 'Nife'.",
        whyAr: 'نطق الحروف الصامتة خطأ شهير يربك المستمعين الأصليين فوراً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة بصوتك هذه الجملة المليئة بالحروف الصامتة: "I doubt he knows where the island is"!',
      promptEn: 'Read to Sara without tripping: "I doubt he knows where the island is"!',
      saraQuestionAr: 'Can you read this sentence without sounding any silent letters: "I doubt he knows where the island is"?',
      saraQuestionEn: 'Can you read this sentence without sounding any silent letters: "I doubt he knows where the island is"?',
      recommendedResponseEn: "I doubt he knows where the island is!"
    },
    quiz: [
      {
        questionAr: 'ما الحرف الصامت في كلمة "Receipt" (إيصال)؟',
        questionEn: 'Which letter is silent in the word "Receipt"?',
        options: [
          "The letter R",
          "The letter P",
          "The letter C",
          "The letter T"
        ],
        correctIndex: 1,
        explanationAr: 'في كلمة Receipt، حرف P صامت تماماً وتُنطق الكلمة: re-seet.'
      }
    ],
    whiteboardNotes: {
      title: 'Top Silent Letters Hall of Fame',
      pointsAr: [
        'Silent K: Knife, Know, Knee, Knight',
        'Silent B: Doubt, Debt, Subtle, Climb, Thumb',
        'Silent P: Receipt, Psychology, Receipt',
        'Silent S: Island, Aisle',
        'Silent L: Half, Calf, Salmon, Walk, Talk'
      ],
      pointsEn: [
        'Kn ➡️ /n/ (Knife, Knee)',
        'Mb / Bt ➡️ /m/ and /t/ (Climb, Doubt, Debt)',
        'Ps ➡️ /s/ (Psychology)',
        'Silent S ➡️ Island, Aisle',
        'Silent L ➡️ Half, Salmon, Walk'
      ],
      chalkHighlight: 'Kn = N | Bt = T | Mb = M | Ps = S'
    }
  },
  {
    id: 'srp_307',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'نبر الكلمات ثنائية المقاطع بين الاسم والفعل (Noun vs Verb Word Stress)',
    titleEn: 'Two-Syllable Stress: REcord (Noun) vs reCORD (Verb)',
    descAr: 'كيف تفرق في النطق بين الكلمات المتطابقة في الكتابة: إذا كانت اسماً نضغط على المقطع الأول، وإذا كانت فعلاً نضغط على الثاني.',
    descEn: 'Master the universal rule: Nouns stress the FIRST syllable; Verbs stress the SECOND.',
    speakingGoalAr: 'نطق جملة تحتوي على الكلمة كاسم وكفعل (He wants to reCORD a new REcord) بوضوح تام.',
    speakingGoalEn: 'Read heteronyms contrasting first-syllable noun stress with second-syllable verb stress.',
    keyPattern: {
      ruleAr: 'في معظم الكلمات الإنجليزية ثنائية المقاطع: الاسم يشدد على المقطع الأول (RE-cord)، بينما الفعل يشدد على المقطع الثاني (re-CORD).',
      ruleEn: 'The 2-Syllable Stress Shift: Noun = STRESS first syllable; Verb = STRESS second syllable.',
      formula: 'Noun: [STRESS]-unstressed | Verb: unstressed-[STRESS]'
    },
    practicalExamples: [
      {
        en: "They want to reCORD (verb) a world REcord (noun) today.",
        ar: 'يريدون تسجيل (فعل: reCORD) رقم قياسي عالمي (اسم: REcord) اليوم.',
        spokenNoteAr: 'لاحظ كيف تغير موضع النبر الصوتي بين الفعل والاسم.'
      },
      {
        en: "I bought a lovely PREsent (noun) to preSENT (verb) to my mentor.",
        ar: 'اشتريت هدية جميلة (PREsent) لأقدمها (preSENT) لمرشدي.',
        spokenNoteAr: 'PREsent كاسم تعني هدية، و preSENT كفعل تعني يقدم أو يعرض.'
      },
      {
        en: "We expect a massive PROgress (noun) once they proGRESS (verb) in testing.",
        ar: 'نتوقع تقدماً هائلاً بمجرد أن يتقدموا في الاختبارات.',
        spokenNoteAr: 'PROgress اسم، و proGRESS فعل.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Stressing the second syllable when saying the noun: 'I bought a pre-SENT'.",
        correct: "Stress the first syllable for nouns: 'I bought a PRE-sent'.",
        whyAr: 'الضغط على المقطع الخاطئ يشعر المتحدث الأصلي بأنك تستخدم فعلاً بدلاً من اسم.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة مع التمييز الواضح في النبر: "We will proTEST against this PROtest"!',
      promptEn: 'Read aloud emphasizing the stress contrast: "We will proTEST against this PROtest"!',
      saraQuestionAr: 'Can you pronounce this pair with correct syllable emphasis: "We will proTEST against this PROtest"?',
      saraQuestionEn: 'Can you pronounce this pair with correct syllable emphasis: "We will proTEST against this PROtest"?',
      recommendedResponseEn: "We will proTEST against this PROtest!"
    },
    quiz: [
      {
        questionAr: 'أين يقع النبر الصوتي (Stress) في كلمة "Project" عندما تستخدم كفعل بمعنى "يتوقع أو يعرض"؟',
        questionEn: 'Where is the primary stress in "Project" when used as a VERB?',
        options: [
          "On the first syllable: PRO-ject",
          "On the second syllable: pro-JECT",
          "Equally on both syllables",
          "No stress at all"
        ],
        correctIndex: 1,
        explanationAr: 'كقاعدة عامة، الأفعال ثنائية المقاطع يُضغط فيها على المقطع الثاني: pro-JECT.'
      }
    ],
    whiteboardNotes: {
      title: 'Noun vs Verb Stress Shift',
      pointsAr: [
        'الاسم (Noun): النبر على المقطع الأول ⬅️ REcord, PREsent, PROject, INcrease',
        'الفعل (Verb): النبر على المقطع الثاني ⬅️ reCORD, preSENT, proJECT, inCREASE',
        'السر: مدّ صوتك وارفع نبرتك في المقطع المشدد!'
      ],
      pointsEn: [
        'Nouns ➡️ Stress Syllable 1: REcord, OBject, CONtract',
        'Verbs ➡️ Stress Syllable 2: reCORD, obJECT, conTRACT',
        'A higher pitch and longer vowel mark the stressed syllable'
      ],
      chalkHighlight: 'Noun = FIRST Syllable 🆚 Verb = SECOND Syllable'
    }
  },
  {
    id: 'srp_308',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'قواعد نطق الـ -ED في أفعال الماضي الثلاثة (/t/, /d/, /ɪd/)',
    titleEn: 'Past Tense -ED Endings: Stop Adding Extra Syllables!',
    descAr: 'تخلص من الخطأ الأكثر شيوعاً: نطق ed كمقطع كامل في كل الكلمات، وتعلم الحالات الثلاث الدقيقة للنطق.',
    descEn: 'Master the 3 sounds of -ed: /t/, /d/, and /ɪd/ without adding awkward extra syllables.',
    speakingGoalAr: 'قراءة أفعال ماضية تمثل الأصوات الثلاثة (Watched, Played, Wanted) بنطق سليم 100%.',
    speakingGoalEn: 'Read -ed past verbs accurately without mistakenly pronouncing "watched" as "watch-ed".',
    keyPattern: {
      ruleAr: 'قاعدة الـ -ed: 1) بعد أصوات T و D تنطق /ɪd/ كمقطع إضافي (Wanted, Decided). 2) بعد الأصوات المهموسة تنطق /t/ (Watched, Walked). 3) بعد الأصوات المجهورة تنطق /d/ (Played, Loved).',
      ruleEn: '-ed rules: 1) After /t/ or /d/ ➡️ /ɪd/ (extra syllable). 2) After voiceless consonants ➡️ /t/. 3) After voiced sounds ➡️ /d/.',
      formula: 'T / D ending ➡️ /ɪd/ | Voiceless ending ➡️ /t/ | Voiced ending ➡️ /d/'
    },
    practicalExamples: [
      {
        en: "Wanted & Needed ➡️ Sounds like: [wan-tid] and [nee-did]",
        ar: 'أراد واحتاج (هنا فقط نضيف مقطعاً إضافياً لأن الفعل ينتهي بـ t أو d).',
        spokenNoteAr: 'الحالة الوحيدة التي يزداد فيها عدد مقاطع الكلمة هي بعد صوت t أو d.'
      },
      {
        en: "Watched & Walked ➡️ Sounds like: [watcht] and [walkt] (One single syllable!)",
        ar: 'شاهد ومشى (تنطق كصوت T خفيف ملتصق بالفعل دون مقطع إضافي).',
        spokenNoteAr: 'احذر أن تقول watch-ed؛ بل هي مقطع واحد watcht.'
      },
      {
        en: "Played & Called ➡️ Sounds like: [playd] and [calld]",
        ar: 'لعب واتصل (تنطق كصوت D ناعم).',
        spokenNoteAr: 'صوت d ناعم يختم الكلمة بانسيابية.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing 'Worked' as 'Work-ed' with two syllables.",
        correct: "Pronounce it as one punchy syllable: 'Workt'.",
        whyAr: 'إضافة مقطع إضافي في أفعال مثل worked و stopped و watched خطأ شائع جداً يثقل النطق.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة هذه الجملة عبر المايك مع مراعاة أصوات الـ -ed الثلاثة: "I watched the game, called my friend, and decided to sleep"!',
      promptEn: 'Read to Sara contrasting the 3 -ed sounds: "I watched the game, called my friend, and decided to sleep"!',
      saraQuestionAr: 'Let me hear your -ed precision: "I watched the game, called my friend, and decided to sleep"!',
      saraQuestionEn: 'Let me hear your -ed precision: "I watched the game, called my friend, and decided to sleep"!',
      recommendedResponseEn: "I watched the game, called my friend, and decided to sleep!"
    },
    quiz: [
      {
        questionAr: 'في أي من هذه الأفعال تُنطق الـ -ed كمقطع إضافي بصوت /ɪd/؟',
        questionEn: 'In which verb is -ed pronounced as an extra syllable /ɪd/?',
        options: [
          "Asked",
          "Started",
          "Helped",
          "Cooked"
        ],
        correctIndex: 1,
        explanationAr: 'فعل "Start" ينتهي بحرف T، ولذلك فإن نهايته الماضية "Started" تُنطق بصوت /ɪd/ بمقطع إضافي.'
      }
    ],
    whiteboardNotes: {
      title: 'The -ED Pronunciation Matrix',
      pointsAr: [
        '1. مقطع إضافي (/ɪd/): فقط بعد T و D (Wanted, Started, Needed)',
        '2. صوت /t/: بعد الأصوات غير المهتزة (Watched, Walked, Cooked, Kissed)',
        '3. صوت /d/: بعد الأصوات المهتزة (Played, Cleaned, Loved, Called)',
        'احذر: 90% من الأفعال لا تزيد مقطعاً عند إضافة ed!'
      ],
      pointsEn: [
        '1. /ɪd/ (Extra syllable): Only after T and D sounds (Wait ➡️ Waited)',
        '2. /t/ sound: After voiceless p, k, sh, ch, s, x (Look ➡️ Lookt)',
        '3. /d/ sound: After voiced vowels and consonants (Stay ➡️ Stayd)',
        'Never say "walk-ed"!'
      ],
      chalkHighlight: 'After T/D = /ɪd/ | Voiceless = /t/ | Voiced = /d/'
    }
  },
  {
    id: 'srp_309',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'أصوات الـ -S والـ -ES في الجمع والمضارع (/s/, /z/, /ɪz/)',
    titleEn: 'Plural & 3rd Person -S Endings: Cats (/s/), Dogs (/z/), Watches (/ɪz/)',
    descAr: 'كيف تفرق بين صوت السين والزاي والمقطع الإضافي في نهايات الجمع وتصريف الأفعال مع He و She.',
    descEn: 'Pronounce plural nouns and 3rd-person verbs with native phonetic accuracy.',
    speakingGoalAr: 'قراءة جملة تجمع الأصوات الثلاثة (The cat jumps, the dog runs, and he watches) بنطق دقيق.',
    speakingGoalEn: 'Differentiate between ending /s/, /z/, and /ɪz/ across varied consonants.',
    keyPattern: {
      ruleAr: '1) بعد أصوات الصفير (ch, sh, s, z, x) تنطق /ɪz/ كمقطع إضافي (Boxes, Watches). 2) بعد الأصوات المهموسة تنطق /s/ (Books, Cats). 3) بعد الأصوات المجهورة والمتحركة تنطق /z/ (Dogs, Plays).',
      ruleEn: '1) Sibilants (ch, sh, s, z, x, ge) ➡️ /ɪz/ (extra syllable). 2) Voiceless ➡️ /s/. 3) Voiced ➡️ /z/.',
      formula: 'Hissing sound ➡️ /ɪz/ | Voiceless ➡️ /s/ | Voiced/Vowel ➡️ /z/'
    },
    practicalExamples: [
      {
        en: "Cats & Books ➡️ Ends with crisp /s/ sound.",
        ar: 'قطط وكتب (تنتهي بصوت سين نقي /s/).',
        spokenNoteAr: 'صوت هواء خالص دون اهتزاز.'
      },
      {
        en: "Dogs & Cars ➡️ Ends with buzzing /z/ sound.",
        ar: 'كلاب وسيارات (تنتهي بصوت زاي /z/ مهتز).',
        spokenNoteAr: 'لاحظ أن معظم نهايات s في الإنجليزية تنطق z في الواقع!'
      },
      {
        en: "Watches & Boxes ➡️ Sounds like: [watch-iz] and [box-iz] (Adds a syllable).",
        ar: 'ساعات وصناديق (يضاف مقطع إضافي لتفادي توالي حرفي صفير).',
        spokenNoteAr: 'هنا فقط يضاف مقطع صوتي جديد.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing 'Dogs' with a sharp hiss /s/ instead of /z/.",
        correct: "Vibrate your vocal cords at the end: /dɔːɡz/.",
        whyAr: 'حرف g صوت مجهور، ولذلك يتحول الـ s بعده تلقائياً إلى z.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة مع التمييز بين الأصوات الثلاثة: "He teaches three classes and loves his cats"!',
      promptEn: 'Read aloud to Sara: "He teaches three classes and loves his cats"!',
      saraQuestionAr: 'Let me hear your final -s mastery: "He teaches three classes and loves his cats"!',
      saraQuestionEn: 'Let me hear your final -s mastery: "He teaches three classes and loves his cats"!',
      recommendedResponseEn: "He teaches three classes and loves his cats!"
    },
    quiz: [
      {
        questionAr: 'في أي من هذه الكلمات يُنطق حرف الـ s الأخير كصوت زاي مجهور (/z/)؟',
        questionEn: 'In which word is the final -s pronounced as a voiced /z/?',
        options: [
          "Cups",
          "Hats",
          "Birds",
          "Laughs"
        ],
        correctIndex: 2,
        explanationAr: 'كلمة "Birds" تنتهي بصوت d المجهور، ولذلك يُنطق حرف s بعدها كصوت /z/.'
      }
    ],
    whiteboardNotes: {
      title: 'The -S Pronunciation Compass',
      pointsAr: [
        '1. صوت /s/: بعد p, t, k, f (Cups, Cats, Books)',
        '2. صوت /z/: بعد الأصوات المجهورة والمتحركة (Dogs, Days, Cars, Friends)',
        '3. مقطع /ɪz/: بعد ch, sh, s, z, x (Watches, Wishes, Boxes)',
        'حقيقة ممتعة: أكثر من 70% من الـ S في الإنجليزية تنطق Z!'
      ],
      pointsEn: [
        '1. /s/ after voiceless stops: Cups, Hats, Books',
        '2. /z/ after voiced consonants & vowels: Dogs, Days, Birds',
        '3. /ɪz/ (Extra syllable) after hisses: Watches, Foxes, Buses',
        'Over 70% of English plurals actually sound like Z!'
      ],
      chalkHighlight: 'Voiceless = /s/ | Voiced = /z/ | Hisses (ch/sh/x) = /ɪz/'
    }
  },
  {
    id: 'srp_310',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'تحدي الكسرة القصيرة والياء الممدودة (Short /ɪ/ vs Long /iː/)',
    titleEn: 'Ship vs Sheep: Mastering the Short /ɪ/ and Long /iː/ Distinction',
    descAr: 'كيف تفرق في النطق بين أزواج الكلمات الحساسة (Ship/Sheep, Sit/Seat, Hit/Heat) لتفادي المواقف المحرجة.',
    descEn: 'Conquer the classic vowel trap: relaxed short /ɪ/ vs smiling long /iː/.',
    speakingGoalAr: 'قراءة أزواج الكلمات المتقابلة مع سارة بوضوح فيزيائي يفرق بين استرخاء الفك والابتسامة.',
    speakingGoalEn: 'Pronounce minimal pairs (Ship/Sheep, Live/Leave, Fit/Feet) with distinct vowel qualities.',
    keyPattern: {
      ruleAr: 'صوت /ɪ/ القصير: الفك مسترخٍ تماماً واللسان في المنتصف ككسرة خفيفة سريعة (Sit, Ship). صوت /iː/ الطويل: الشفتان مشدودتان كابتسامة عريضة ممتدة (Seat, Sheep).',
      ruleEn: 'Short /ɪ/ = relaxed jaw, neutral mouth. Long /iː/ = tense smiling lips, prolonged vocal resonance.',
      formula: 'Relaxed Jaw = /ɪ/ (Sit) 🆚 Smiling Stretch = /iː/ (Seat)'
    },
    practicalExamples: [
      {
        en: "Please sit in this comfortable seat. (/ɪ/ vs /iː/)",
        ar: 'من فضلك اجلس (sit كسرة سريعة) في هذا المقعد (seat ممدودة) المريح.',
        spokenNoteAr: 'لاحظ الفرق بين الفعل sit والاسم seat.'
      },
      {
        en: "We saw a giant ship full of white sheep.",
        ar: 'رأينا سفينة (ship) ضخمة مليئة بالخراف (sheep) البيضاء.',
        spokenNoteAr: 'ship قصيرة وخفيفة، بينما sheep ممدودة بابتسامة.'
      },
      {
        en: "Do you live here or are you about to leave?",
        ar: 'هل تعيش (live) هنا أم أنك على وشك المغادرة (leave)؟',
        spokenNoteAr: 'live كسرة سريعة، و leave ياء طويلة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing 'Sheet of paper' with a short /ɪ/ sound by mistake.",
        correct: "Stretch the /iː/ sound into a clear smile: 'Sheet' /ʃiːt/.",
        whyAr: 'نطق هذه الكلمة بالكسرة القصيرة عن طريق الخطأ ينتج كلمة بذيئة محرجة جداً!'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة مع التمييز الواضح بين القصير والممدود: "He decided to leave the place where he used to live"!',
      promptEn: 'Read aloud to Sara: "He decided to leave the place where he used to live"!',
      saraQuestionAr: 'Show me your vowel precision: "He decided to leave the place where he used to live"!',
      saraQuestionEn: 'Show me your vowel precision: "He decided to leave the place where he used to live"!',
      recommendedResponseEn: "He decided to leave the place where he used to live!"
    },
    quiz: [
      {
        questionAr: 'ما الكلمة التي تحتوي على صوت الياء الممدودة /iː/ (الابتسامة العريضة)؟',
        questionEn: 'Which word contains the long smiling /iː/ vowel sound?',
        options: [
          "Fill",
          "Feel",
          "Fit",
          "Hit"
        ],
        correctIndex: 1,
        explanationAr: 'كلمة "Feel" تحتوي على صوت /iː/ الممدود، بينما الكلمات الأخرى تحتوي على الكسرة القصيرة /ɪ/.'
      }
    ],
    whiteboardNotes: {
      title: 'Short /ɪ/ vs Long /iː/ Master Guide',
      pointsAr: [
        'صوت /ɪ/ القصير: الفك مرتخٍ، الصوت ينزل من الحلق سريعاً (Sit, Fit, Live, Ship)',
        'صوت /iː/ الطويل: الشفتان تبتسمان بالعرض، الصوت ممدود (Seat, Feet, Leave, Sheep)',
        'تمرين المرآة: في صوت Sheep يجب أن ترى ابتسامتك!'
      ],
      pointsEn: [
        'Short /ɪ/: Relaxed tongue, neutral lips (Sit, Hit, Ship)',
        'Long /iː/: Tense lips stretched horizontally into a smile (Seat, Heat, Sheep)',
        'Mirror test: You must see your teeth in /iː/!'
      ],
      chalkHighlight: 'Relaxed Jaw /ɪ/ (Sit) 🆚 Wide Smile /iː/ (Seat)'
    }
  },
  {
    id: 'srp_311_s',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'تحدي التفريق بين صوتي الـ P والـ B (Park vs Bark Distinction)',
    titleEn: 'Voiceless /p/ vs Voiced /b/: Conquering Park, Peach & Pet',
    descAr: 'كيف تفرق فيزيائياً بين نفخة الهواء في حرف P واهتزاز الحبال الصوتية في حرف B لتفادي تغيير معنى الكلمات.',
    descEn: 'Master the aspiration puff for voiceless /p/ versus vocal-cord vibration for voiced /b/.',
    speakingGoalAr: 'قراءة أزواج الكلمات المتقابلة (Park/Bark, Peach/Beach, Pay/Bay) مع اختبار الورقة بنجاح.',
    speakingGoalEn: 'Pronounce minimal pairs with proper puff aspiration distinguishing /p/ from /b/.',
    keyPattern: {
      ruleAr: 'صوت P مهموس بدون اهتزاز الحبال ولكن مع نفخة هواء قوية (Aspiration) تحرك ورقة أمام فمك. صوت B مجهور مع اهتزاز الحبال الصوتية ودون نفخة هواء.',
      ruleEn: 'Voiceless /p/ bursts with a puff of air (paper flutter test). Voiced /b/ vibrates vocal cords with zero air burst.',
      formula: 'Air Puff Burst = /p/ (Park) 🆚 Vocal Cord Hum = /b/ (Bark)'
    },
    practicalExamples: [
      {
        en: "We parked the car and heard a dog bark. (/p/ vs /b/)",
        ar: 'أوقفنا السيارة في الموقف (park) وسمعنا كلباً ينبح (bark).',
        spokenNoteAr: 'لاحظ كيف يغير صوت الحرف المعنى كلياً بين الموقف والنباح.'
      },
      {
        en: "Eat a sweet peach by the sunny beach.",
        ar: 'تناول دراقة حلوة (peach) بجوار الشاطئ المشمس (beach).',
        spokenNoteAr: 'peach فيها نفخة هواء قوية، و beach صوت باء ناعم.'
      },
      {
        en: "Please pull the blue bull out of the pen.",
        ar: 'من فضلك اسحب الثور الأزرق خارج الحظيرة.',
        spokenNoteAr: 'pull و pen مع نفخة هواء، بينما blue و bull مع اهتزاز مجهور.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing 'Park' as 'Bark' or 'Pepsi' as 'Bebsi'.",
        correct: "Release a burst of air with your lips: hold a tissue in front of your mouth to verify it moves.",
        whyAr: 'عدم وجود صوت P في اللغة العربية الفصحى يجعل اللسان يميل تلقائياً لنطق B؛ والحل هو اختبار الورقة.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة مع إخراج نفخة هواء واضحة في حرف الـ P: "Peter picked a piece of fresh peach"!',
      promptEn: 'Read aloud to Sara passing the P-aspiration test: "Peter picked a piece of fresh peach"!',
      saraQuestionAr: 'Let me hear your crisp P puff of air: "Peter picked a piece of fresh peach"!',
      saraQuestionEn: 'Let me hear your crisp P puff of air: "Peter picked a piece of fresh peach"!',
      recommendedResponseEn: "Peter picked a piece of fresh peach!"
    },
    quiz: [
      {
        questionAr: 'ما الاختبار الفيزيائي الشهير للتأكد من نطق صوت حرف P الإنجليزي بشكل صحيح؟',
        questionEn: 'What is the classic physical test for verifying correct /p/ aspiration?',
        options: [
          "Holding a tissue or paper in front of your lips to see it flutter from the air burst.",
          "Closing your eyes completely.",
          "Holding your breath for 30 seconds.",
          "Drinking cold water."
        ],
        correctIndex: 0,
        explanationAr: 'اختبار المنديل الورقي (Tissue paper test) يثبت خروج دفعة الهواء القوية المميزة لصوت حرف P.'
      }
    ],
    whiteboardNotes: {
      title: 'P vs B Phonetic Mechanics',
      pointsAr: [
        '1. صوت P: الشفتان تنطبقان ثم تنفرجان بدفعة هواء قوية (Park, Peach, Pen)',
        '2. صوت B: الحبال الصوتية تهتز عند انطباق الشفتين دون هواء (Bark, Beach, Ben)',
        '3. تمرين المنديل: ضع منديلاً أمام فمك؛ في P يجب أن يتحرك، وفي B يبقى ثابتاً!',
        'تخلص تماماً من نطق "بيبسي" بـ الباء'
      ],
      pointsEn: [
        '1. /p/: Voiceless bilabial plosive with strong air puff',
        '2. /b/: Voiced bilabial plosive with vocal cord hum',
        '3. The Paper Test: Tissue must flutter on /p/ and stay still on /b/',
        'Critical minimal pairs: Park/Bark, Pack/Back, Pear/Bear'
      ],
      chalkHighlight: 'Air Puff Burst /p/ (Park) 🆚 Voiced Hum /b/ (Bark)'
    }
  },
  {
    id: 'srp_312_s',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'مخارج الأصوات الشفوية الثلاثة (V vs F vs W Articulation)',
    titleEn: 'Lip Mechanics: Mastering V (Vine), F (Fine) & W (Wine)',
    descAr: 'كيف تضبط موضع أسنانك وشفتيك للتفريق التام بين صوت الفاء المهموس، وصوت الفاء المجهورة (V)، وصوت الواو المستديرة (W).',
    descEn: 'Master precise mouth geometry for /v/, /f/, and /w/ without cross-language confusion.',
    speakingGoalAr: 'قراءة جملة تجمع بين الكلمات الثلاث (Very fine white wine) بمخارج فيزيائية متقنة.',
    speakingGoalEn: 'Articulate contrasting /v/, /f/, and /w/ minimal triads with distinct lip mechanics.',
    keyPattern: {
      ruleAr: 'في F و V: الأسنان العلوية تلمس الشفة السفلية (F هواء خالص، و V مع اهتزاز الحبال). في W: الشفتان تستديران كدائرة للأمام دون ملامسة الأسنان للشفاه.',
      ruleEn: '/f/ & /v/: Upper teeth touch lower lip (/f/ voiceless, /v/ voiced). /w/: Lips round into a circle with zero teeth contact.',
      formula: 'Teeth + Lower Lip = F / V | Rounded Lips Circle = W'
    },
    practicalExamples: [
      {
        en: "This is a very fine wine from the green vine. (/v/, /f/, /w/)",
        ar: 'هذا نبيذ فاخر جداً من كرمة العنب الخضراء.',
        spokenNoteAr: 'very (أسنان مع اهتزاز)، fine (أسنان مع هواء)، wine (شفاه مستديرة كدائرة).'
      },
      {
        en: "West 🆚 Vest 🆚 Fest",
        ar: 'الغرب (واو مستديرة) ⬅️ سترة (V باهتزاز) ⬅️ مهرجان (F بهواء خالص).',
        spokenNoteAr: 'ثلاثية صوتية تميز موضع الشفتين والأسنان.'
      },
      {
        en: "We visited five wonderful villages.",
        ar: 'زرنا خمس قرى رائعة.',
        spokenNoteAr: 'تطبيق عملي لتناوب الشفاه المستديرة والأسنان.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing 'Very' with rounded lips as 'Wery', or pronouncing 'Water' as 'Vater'.",
        correct: "Rest your upper front teeth on your lower lip for V; round your lips for W.",
        whyAr: 'الخلط بين V و W يغير المعنى (Vest = سترة / West = غرب).'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة مع التمييز الحركي بين الشفاه والأسنان: "We viewed very wonderful waterfalls"!',
      promptEn: 'Read aloud to Sara mastering the V and W contrast: "We viewed very wonderful waterfalls"!',
      saraQuestionAr: 'Let me hear your V versus W mouth shape: "We viewed very wonderful waterfalls"!',
      saraQuestionEn: 'Let me hear your V versus W mouth shape: "We viewed very wonderful waterfalls"!',
      recommendedResponseEn: "We viewed very wonderful waterfalls!"
    },
    quiz: [
      {
        questionAr: 'ما الوضع الفيزيائي الصحيح للشفتين والأسنان عند نطق صوت حرف الـ W في كلمة "Water"؟',
        questionEn: 'What is the correct physical mouth position for the /w/ sound in "Water"?',
        options: [
          "Upper teeth touching lower lip.",
          "Lips rounded forward into an 'O' circle with zero teeth-to-lip contact.",
          "Biting your tongue.",
          "Opening mouth as wide as possible."
        ],
        correctIndex: 1,
        explanationAr: 'في صوت الـ W، تستدير الشفتان للأمام كدائرة دون أي ملامسة بين الأسنان والشفة السفلية.'
      }
    ],
    whiteboardNotes: {
      title: 'V, F & W Lip Geometry',
      pointsAr: [
        '1. صوت F: الأسنان العلوية على الشفة السفلية + هواء فقط (Fine, Fast)',
        '2. صوت V: نفس موضع الأسنان على الشفة السفلية + اهتزاز الحبال (Very, Vine, View)',
        '3. صوت W: استدارة الشفاه كحلقة للأمام دون ملامسة الأسنان (Wine, Water, West)',
        'تذكر: V = أسنان على الشفة | W = شفتان مستديرتان كالقبلة'
      ],
      pointsEn: [
        '1. /f/: Labiodental fricative (Upper teeth on lower lip, air only)',
        '2. /v/: Labiodental voiced fricative (Upper teeth on lower lip + vocal hum)',
        '3. /w/: Bilabial approximant (Lips puckered/rounded forward, no teeth)',
        'Vest (Teeth touch) 🆚 West (Lips round)'
      ],
      chalkHighlight: 'Teeth on Lip = V / F 🆚 Rounded Circle = W'
    }
  },

  // ==========================================
  // INTERMEDIATE LEVEL (B1-B2) - Lessons 11 to 20
  // ==========================================
  {
    id: 'srp_302',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'تحدي النبر والتنغيم الصوتي وتلوين النبرات (Sentence Stress & Music)',
    titleEn: 'Sentence Music: Stressing Words for Maximum Impact',
    descAr: 'الإنجليزي لغة إيقاعية موسيقية! كيف تغير معنى الجملة بالكامل وتجعل كلامك ساحراً ومؤثراً بمجرد تغيير الكلمة التي تضغط عليها بصوتك.',
    descEn: 'Master contrastive sentence stress and transform your spoken rhythm.',
    speakingGoalAr: 'قراءة نفس الجملة بثلاث مشاعر مختلفة لتغيير المعنى والرسالة.',
    speakingGoalEn: 'Read a single sentence with 3 different emotional emphasis patterns.',
    keyPattern: {
      ruleAr: 'في الإنجليزية نضغط بصوت أعلى وأطول على كلمات المحتوى (الأسماء والأفعال الرئيسية)، ونخفف الكلمات الوظيفية (حروف الجر والضمائر).',
      ruleEn: 'Content words (nouns, main verbs) get stress; function words (prepositions, articles) stay weak.',
      formula: 'STRESS the key word ➡️ Changes the whole message!'
    },
    practicalExamples: [
      {
        en: "I didn't say SHE stole the money. (Implies: Someone else said it, or someone else did it!)",
        ar: 'أنا لم أقل إنها هي التي سرقت المال. (النبر على SHE يوجه الشك لشخص آخر)',
        spokenNoteAr: 'جرب نطق الجملة بالضغط على SHE، ثم جرب الضغط على STEAL.'
      },
      {
        en: "This is NOT what we agreed on.",
        ar: 'هذا ليس إطلاقاً ما اتفقنا عليه.',
        spokenNoteAr: 'الضغط القوي على NOT يعطي حزماً ووضوحاً شديداً.'
      },
      {
        en: "We REALLY need to wrap this up.",
        ar: 'نحن حقاً وفعلاً بحاجة لإنهاء هذا الأمر الآن.',
        spokenNoteAr: 'كلمة REALLY المطولة تعبر عن الحاجة الملحة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing every single word with the exact same volume and pitch (Flat tone).",
        correct: "Raise your pitch and stretch the stressed keyword for contrast.",
        whyAr: 'الصوت الأحادي النبرة (Monotone) يُشعر المستمع بالملل ولا يوصل مشاعرك.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ هذه الجملة لسارة وركّز النبر على الكلمة المكتوبة بحروف كبيرة: "I really LOVE this concept"!',
      promptEn: 'Read aloud emphasizing LOVE with energy: "I really LOVE this concept"!',
      saraQuestionAr: 'Let me hear your sentence stress! Read: "I really LOVE this concept" with true excitement!',
      saraQuestionEn: 'Let me hear your sentence stress! Read: "I really LOVE this concept" with true excitement!',
      recommendedResponseEn: "I really LOVE this concept!"
    },
    quiz: [
      {
        questionAr: 'في جملة "I never said he lied"، إذا ضغطت بصوتك على كلمة "HE"، فما المعنى المقصود؟',
        questionEn: 'In "I never said HE lied", what does stressing HE imply?',
        options: [
          "Someone else lied, not him.",
          "I said it yesterday.",
          "He never spoke.",
          "Nobody lied at all."
        ],
        correctIndex: 0,
        explanationAr: 'النبر على الفاعل HE يعني: شخص آخر هو من كذب، وليس هو بالتحديد.'
      }
    ],
    whiteboardNotes: {
      title: 'The Music of Spoken English',
      pointsAr: [
        'الإنجليزية ليست لغة رتيبة، بل موسيقى وإيقاع',
        'الكلمات المشددة: ترفع نبرتك وتطيل صوتها قليلاً',
        'جرب جملة: "I never said SHE stole it"!'
      ],
      pointsEn: [
        'English is stress-timed, not syllable-timed',
        'Stressed words: Higher pitch + longer duration',
        'Monotone speech kills engagement'
      ],
      chalkHighlight: 'Pitch Up ➕ Hold Longer ➡️ Express True Meaning'
    }
  },
  {
    id: 'srp_313',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'حرف الـ T الأمريكي السريع (The American Flap T)',
    titleEn: 'The American Flap T: Water, Better & City Sounding Like Quick /d/',
    descAr: 'كيف ينطق الأمريكيون حرف T بين حرفين متحركين كنقرة لسان سريعة تشبه الراء العربية الخفيفة أو الدال السريعة.',
    descEn: 'Master the tap/flap T between vowels: Water ➡️ Wader, City ➡️ Cidy.',
    speakingGoalAr: 'قراءة جملة تحتوي على 4 كلمات بها Flap T بسلاسة أمريكية طبيعية.',
    speakingGoalEn: 'Produce the alveolar tap [ɾ] in mid-word and across-word environments.',
    keyPattern: {
      ruleAr: 'عندما تقع T أو TT بين حرفين متحركين (أو بعد R وقبل متحرك)، يضرب اللسان سقف الحلق ضربة خفيفة سريعة لتصبح Flap T (مثل Water ➡️ Wa-der).',
      ruleEn: 'The Flap T rule: T/TT between vowels turns into a rapid tap against the alveolar ridge.',
      formula: '[Vowel] + T/TT + [Vowel] ➡️ Rapid Tap [d/ɾ]'
    },
    practicalExamples: [
      {
        en: "Could you get me a bottle of water? ➡️ [boddle of wader]",
        ar: 'هل يمكنك أن تحضر لي زجاجة ماء؟',
        spokenNoteAr: 'لاحظ كيف تحولت كل من bottle و water إلى نقرة خفيفة سلسة.'
      },
      {
        en: "It's a little better in the city. ➡️ [liddle bedder in the cidy]",
        ar: 'الوضع أفضل قليلاً في المدينة.',
        spokenNoteAr: 'ثلاث كلمات متتالية تطبق قاعدة الـ Flap T دون توقف.'
      },
      {
        en: "Put it on the counter. ➡️ [Pu-dit on the counter]",
        ar: 'ضعه على الطاولة.',
        spokenNoteAr: 'تحدث الـ Flap T أيضاً بين الكلمات المتصلة: Put it ➡️ Pu-dit.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing a hard, explosive British T in casual American speech: 'Wa-T-er'.",
        correct: "Relax your tongue and tap the roof of your mouth once: 'Wader'.",
        whyAr: 'الـ Flap T تمنح كلامك الانسيابية الأمريكية الشهيرة وتزيل التكلف.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة بنطق الـ Flap T السلس: "I need a little bottle of cold water"!',
      promptEn: 'Voice this to Sara with native Flap T: "I need a little bottle of cold water"!',
      saraQuestionAr: 'Let me hear your American Flap T: "I need a little bottle of cold water"!',
      saraQuestionEn: 'Let me hear your American Flap T: "I need a little bottle of cold water"!',
      recommendedResponseEn: "I need a little bottle of cold water!"
    },
    quiz: [
      {
        questionAr: 'في أي من هذه الكلمات يُنطق حرف الـ T كـ Flap T سريعة في اللهجة الأمريكية؟',
        questionEn: 'In which word does the T transform into a Flap T in American English?',
        options: [
          "Time",
          "Better",
          "Stop",
          "Train"
        ],
        correctIndex: 1,
        explanationAr: 'في كلمة "Better" يقع حرفا TT بين صوتين متحركين، فيتحولان إلى Flap T سريعة [bedder].'
      }
    ],
    whiteboardNotes: {
      title: 'American Flap T Mechanics',
      pointsAr: [
        'الشرط: حرف T يقع بين حرفين متحركين',
        'الأمثلة: Water ➡️ Wader, Better ➡️ Bedder, Little ➡️ Liddle',
        'بين الكلمات: Get it ➡️ Ged-it, Put on ➡️ Pud-on',
        'الحركة: نقرة خفيفة جداً من طرف اللسان دون حبس الهواء'
      ],
      pointsEn: [
        'Condition: T between two vowels in an unstressed syllable',
        'Examples: City, Butter, Meeting, Pretty',
        'Across words: What about ➡️ Whad-about',
        'Motion: Rapid flick of the tongue against the gum ridge'
      ],
      chalkHighlight: 'Vowel + T + Vowel ➡️ Flap Tap [ɾ]'
    }
  },
  {
    id: 'srp_314',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'سر الصوت الأكثر تكراراً في الإنجليزية (The Schwa /ə/ Sound)',
    titleEn: 'The Schwa Sound /ə/: The Secret Weapon of English Fluency',
    descAr: 'صوت الشوا /ə/ يمثل ثلث أصوات الإنجليزية المنطوقة! تعلم كيف تسترخي فكك وتنطق المقاطع غير المشددة دون جهد.',
    descEn: 'Master the lazy vowel /ə/: Banana, About, Problem, Support.',
    speakingGoalAr: 'قراءة جملة وتحديد مواضع صوت الـ Schwa فيها مع تخفيفها صوتياً.',
    speakingGoalEn: 'Reduce unstressed vowels to the neutral /ə/ sound across multisyllabic words.',
    keyPattern: {
      ruleAr: 'في أي مقطع غير مشدد (Unstressed syllable)، يتحول الحرف المتحرك إلى صوت الشوا /ə/ وهو صوت كسلان سريع يخرج من وسط الفم بفك مسترخٍ تماماً.',
      ruleEn: 'Unstressed syllables collapse into the Schwa /ə/: short, lazy, neutral "uh" sound.',
      formula: 'Unstressed Vowel ➡️ Relax Jaw completely ➡️ Neutral "uh" /ə/'
    },
    practicalExamples: [
      {
        en: "Banana ➡️ Sounds like: [bə-NA-nə]",
        ar: 'موزة (المقطع الأول والأخير شوا خفيفة، والضغط على NA فقط).',
        spokenNoteAr: 'لاحظ: الحرف الأول a والحرف الأخير a ينطقان /ə/ كسلانة.'
      },
      {
        en: "About the photographer ➡️ [ə-BOUT thə fə-TOG-rə-fər]",
        ar: 'عن المصور الفوتوغرافي.',
        spokenNoteAr: 'كلمة photographer تحتوي على ثلاثة أصوات شوا مختلفة!'
      },
      {
        en: "Can you support the project? ➡️ [sə-PORT thə PRO-ject]",
        ar: 'هل يمكنك دعم المشروع؟',
        spokenNoteAr: 'support تبدأ بـ sə وليس su كاملة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing every single vowel clearly according to its spelling (e.g. Ba-na-na).",
        correct: "Relax and reduce unstressed vowels to Schwa: [bə-NA-nə].",
        whyAr: 'نطق كل الحروف بوضوح تام يجعل الإنجليزية ثقيلة ومتقطعة وغير طبيعية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة مع تخفيف أصوات الشوا بدقة: "A cup of coffee for the doctor"!',
      promptEn: 'Read to Sara applying Schwa reductions: "A cup of coffee for the doctor"!',
      saraQuestionAr: 'Let me hear your natural Schwa reductions: "A cup of coffee for the doctor"!',
      saraQuestionEn: 'Let me hear your natural Schwa reductions: "A cup of coffee for the doctor"!',
      recommendedResponseEn: "A cup of coffee for the doctor!"
    },
    quiz: [
      {
        questionAr: 'كم عدد أصوات الشوا /ə/ في النطق الصحيح لكلمة "Banana"؟',
        questionEn: 'How many Schwa /ə/ sounds are in the correct pronunciation of "Banana"?',
        options: [
          "Zero",
          "One",
          "Two (المقطع الأول والأخير)",
          "Three"
        ],
        correctIndex: 2,
        explanationAr: 'في كلمة Banana، المقطع الأول (ba) والمقطع الأخير (na) ينطقان كصوت شوا /ə/، والنبر يقع على الوسط (NA).'
      }
    ],
    whiteboardNotes: {
      title: 'The Schwa /ə/ Rulebook',
      pointsAr: [
        'الرمز الصوتي: /ə/ (مقلوبة)',
        'الصوت: "أُه" سريعة وكسولة جداً دون فتح الفم كثيراً',
        'المكان: المقاطع الضعيفة غير المشددة',
        'أمثلة: About ➡️ [ə-bout], Problem ➡️ [prob-ləm], Doctor ➡️ [doc-tər]'
      ],
      pointsEn: [
        'Symbol: /ə/ (The upside-down e)',
        'Acoustics: Ultra-short, neutral, relaxed "uh"',
        'Environment: Weak, unstressed syllables',
        'Dominates connected spoken English'
      ],
      chalkHighlight: 'Unstressed Syllables ➡️ The Lazy Schwa /ə/'
    }
  },
  {
    id: 'srp_315',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'التنغيم في الأسئلة: النبر الصاعد والهابط (Rising vs Falling Pitch)',
    titleEn: 'Question Intonation: Rising Pitch ↗ vs Falling Pitch ↘',
    descAr: 'كيف تنهي أسئلتك بنغمة موسيقية صحيحة: نغمة صاعدة لأسئلة نعم/لا، ونغمة هابطة لأسئلة أدوات الاستفهام.',
    descEn: 'Master pitch contours: Yes/No questions RISE ↗; Wh- questions FALL ↘.',
    speakingGoalAr: 'طرح سؤال Yes/No بنبرة صاعدة وسؤال Wh- بنبرة هابطة مع سارة.',
    speakingGoalEn: 'Modulate pitch accurately distinguishing rising terminal contour from falling intonation.',
    keyPattern: {
      ruleAr: 'قاعدة النغم الموسيقي: أسئلة Yes/No ترتفع فيها النغمة في النهاية ↗ (Are you ready? ↗). أسئلة Wh- (Where, When, Why) تنخفض نغمتها في النهاية ↘ (Where are you going? ↘).',
      ruleEn: 'Intonation rule: Yes/No questions use RISING intonation ↗; Wh- question words use FALLING intonation ↘.',
      formula: 'Yes/No Questions ➡️ RISE ↗ | Wh- Questions ➡️ FALL ↘'
    },
    practicalExamples: [
      {
        en: "Do you have a reservation? ↗ (Pitch rises at the end)",
        ar: 'هل لديك حجز؟ ↗ (نغمة صاعدة تسأل عن التأكيد).',
        spokenNoteAr: 'ارفع نبرتك في كلمة reservation لتبين أنه سؤال نعم أو لا.'
      },
      {
        en: "What time does the conference start? ↘ (Pitch drops at the end)",
        ar: 'في أي وقت يبدأ المؤتمر؟ ↘ (نغمة هابطة لأن السؤال بدأ بـ What).',
        spokenNoteAr: 'انخفض بالنبرة في نهاية start لتبدو واثقاً ومباشراً.'
      },
      {
        en: "Is that your coffee? ↗ No, it's mine! ↘",
        ar: 'هل هذا فنجان قهوتك؟ ↗ لا، إنه لي! ↘',
        spokenNoteAr: 'السؤال صاعد والجواب التأكيدي هابط.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Raising your voice at the end of every sentence, including normal statements (Up-talk).",
        correct: "Statements and Wh-questions fall at the end; only Yes/No questions rise.",
        whyAr: 'رفع الصوت في نهاية الجمل الخبرية يجعلك تبدو متردداً وغير واثق من معلوماتك.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اطرح على سارة سؤالين متتاليين: الأول بنبرة صاعدة (Yes/No) والثاني بنبرة هابطة (Wh-)!',
      promptEn: 'Ask Sara two questions contrasting rising ↗ and falling ↘ pitch contours!',
      saraQuestionAr: 'Show me your pitch control: Ask me if I like traveling, then ask me where I want to go!',
      saraQuestionEn: 'Show me your pitch control: Ask me if I like traveling, then ask me where I want to go!',
      recommendedResponseEn: "Do you enjoy traveling abroad? ↗ And where is your favorite destination? ↘"
    },
    quiz: [
      {
        questionAr: 'ما النغمة الموسيقية الصحيحة في نهاية سؤال: "Where did you buy this jacket?"',
        questionEn: 'What is the correct pitch contour at the end of "Where did you buy this jacket?"',
        options: [
          "Rising pitch ↗ (نغمة صاعدة)",
          "Falling pitch ↘ (نغمة هابطة)",
          "Monotone robotic flat pitch",
          "Whispering only"
        ],
        correctIndex: 1,
        explanationAr: 'أسئلة أدوات الاستفهام (Wh- questions) تنتهي دائماً بنغمة هابطة Falling pitch ↘.'
      }
    ],
    whiteboardNotes: {
      title: 'Intonation Pitch Contour Rules',
      pointsAr: [
        '1. أسئلة Yes/No: نغمة صاعدة ↗ في النهاية (Are you free? ↗)',
        '2. أسئلة Wh-: نغمة هابطة ↘ في النهاية (What are you doing? ↘)',
        '3. الجمل الخبرية: نغمة هابطة ↘ تدل على الحسم واليقين',
        'تجنب الـ Up-talk (رفع الصوت بلا سبب)'
      ],
      pointsEn: [
        '1. Yes/No questions ➡️ Rising terminal pitch ↗',
        '2. Wh- questions ➡️ Falling terminal pitch ↘',
        '3. Declarative statements ➡️ Firm downward closure ↘',
        'Beware of up-talk: do not make facts sound like questions!'
      ],
      chalkHighlight: 'Yes/No = RISE ↗ | Wh- Questions = FALL ↘'
    }
  },
  {
    id: 'srp_316',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'تحدي تجمعات الحروف الساكنة المتتالية (Consonant Clusters)',
    titleEn: 'Consonant Clusters: Conquering Strengths, Texts, Clothes & World',
    descAr: 'كيف تنطق 3 أو 4 حروف ساكنة متتالية دون إقحام حرف متحرك عربي في المنتصف (بدون أن تقول Es-street).',
    descEn: 'Articulate complex consonant clusters smoothly without inserting phantom vowels.',
    speakingGoalAr: 'نطق كلمات صعبة مثل Strengths و Texts و Clothes دون تعثر في تتابع السواكن.',
    speakingGoalEn: 'Produce multi-consonant clusters cleanly without epenthetic vowels.',
    keyPattern: {
      ruleAr: 'في الإنجليزية تجتمع السواكن دون متحرك بينها (str-, spl-, -ngths, -xts). تجنب إدخال كسرة أو همزة وصل قبلها أو بينها.',
      ruleEn: 'Never insert phantom vowels (like saying "es-street" instead of "street"). Transition tongue position directly.',
      formula: 'Direct consonant glide: /s/ ➡️ /t/ ➡️ /r/ (No vowels in between!)'
    },
    practicalExamples: [
      {
        en: "He described his core strengths and weaknesses. (Strengths ➡️ /streŋkθs/)",
        ar: 'وصف نقاط قوته ونقاط ضعفه الجوهرية.',
        spokenNoteAr: 'كلمة strengths تجمع بين ng و th و s في تتابع صوتي مذهل.'
      },
      {
        en: "She sent multiple texts to her friends. (Texts ➡️ /teksts/)",
        ar: 'أرسلت رسائل نصية متعددة لأصدقائها.',
        spokenNoteAr: 'texts تنتهي بـ k ثم t ثم s متتالية.'
      },
      {
        en: "He bought fresh clothes from across the world. (Clothes ➡️ /kloʊðz/)",
        ar: 'اشترى ملابس جديدة من شتى أنحاء العالم.',
        spokenNoteAr: 'clothes تنطق بسلاسة بصوت ذال وزاي /ðz/ دون نطق e أو s منفصلة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Adding an 'e' before words starting with S: 'Es-school', 'Es-street', 'Es-special'.",
        correct: "Start with a direct hiss of pure 'S': School, Street, Special.",
        whyAr: 'إضافة الألف أو الكسرة قبل حرف S خطأ ناتج عن اللغة الأم يجب التخلص منه تماماً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة هذا التحدي الصوتي دون إدخال أي حروف متحركة زائدة: "She asked for six text messages"!',
      promptEn: 'Voice this consonant challenge to Sara: "She asked for six text messages"!',
      saraQuestionAr: 'Can you read this cluster sequence cleanly: "She asked for six text messages"?',
      saraQuestionEn: 'Can you read this cluster sequence cleanly: "She asked for six text messages"?',
      recommendedResponseEn: "She asked for six text messages!"
    },
    quiz: [
      {
        questionAr: 'ما النطق الطبيعي الأكثر شيوعاً لكلمة "Clothes" (ملابس) في الحديث السريع؟',
        questionEn: 'How is the word "Clothes" most commonly pronounced in natural fast speech?',
        options: [
          "Cloth-ez (مقطعان)",
          "Close /kloʊz/ (مقطع واحد يشبه كلمة close)",
          "Colo-thes",
          "Clothe-sis"
        ],
        correctIndex: 1,
        explanationAr: 'في الإنجليزية المحكية والسريعة تُنطق كلمة "Clothes" كمقطع واحد يماثل نطق كلمة "close" تماماً.'
      }
    ],
    whiteboardNotes: {
      title: 'Consonant Cluster Discipline',
      pointsAr: [
        '1. في البداية: Street, Spring, Splash (ابدأ بهسيس الـ S مباشرة)',
        '2. في النهاية: Texts, Asked, World, Strengths',
        '3. الملابس: Clothes تنطق تماماً مثل "Close" /kloʊz/!',
        'تجنب: إضافة صوت همزة أو كسرة قبل الـ S (تجنب: Es-study)'
      ],
      pointsEn: [
        '1. Initial clusters: Street, Splash, Strategy (Direct S-glide)',
        '2. Final clusters: Texts, Strengths, Months',
        '3. Life-saver tip: "Clothes" rhymes perfectly with "Close"',
        'Banish epenthetic vowels ("es-start" ➡️ "start")'
      ],
      chalkHighlight: 'Direct Consonant Transition ➡️ Zero Phantom Vowels'
    }
  },
  {
    id: 'srp_317',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'الأصوات الدخيلة الرابطة بين المتحركات (Intrusive /w/ and /j/ Sounds)',
    titleEn: 'Vowel-to-Vowel Linking: The Secret Intrusive /w/ and /j/ Glides',
    descAr: 'كيف يدمج المتحدث الأصلي كلمتين تنتهي الأولى بمتحرك وتبدأ الثانية بمتحرك بإقحام صوت W أو Y خفيف جداً بينهما.',
    descEn: 'Connect vowel boundaries seamlessly by inserting subtle /w/ and /j/ sonic bridges.',
    speakingGoalAr: 'قراءة عبارتين بهما ربط متحركات (Go out ➡️ Go-w-out / I agree ➡️ I-y-agree) بسلاسة.',
    speakingGoalEn: 'Produce intrusive /w/ and /j/ glides naturally between boundary vowels.',
    keyPattern: {
      ruleAr: '1) إذا انتهت الكلمة بصوت ممدود أو مدور (o, u, ow) نربط بصوت /w/ خفيف: Go away ➡️ [Go-w-away]. 2) إذا انتهت بصوت ممدود أمامي (ee, ay, eye) نربط بصوت /j/ خفيف: I see it ➡️ [I see-y-it].',
      ruleEn: 'Round lips (o, u, aw) ➡️ insert /w/ glide. Spread lips (ee, ay, eye) ➡️ insert /j/ (y) glide.',
      formula: 'Round vowel + Vowel ➡️ /w/ glide | Spread vowel + Vowel ➡️ /j/ (y) glide'
    },
    practicalExamples: [
      {
        en: "Go away and do it. ➡️ Sounds like: [Go-w-away and do-w-it]",
        ar: 'اذهب بعيداً وقم بالأمر.',
        spokenNoteAr: 'لاحظ كيف تدفقت واو خفيفة جداً لمنع التوقف الصدمي بين الحروف المتحركة.'
      },
      {
        en: "I agree with the idea. ➡️ Sounds like: [I-y-agree with the-y-idea]",
        ar: 'أنا أتفق مع الفكرة.',
        spokenNoteAr: 'صوت ياء خفيف يربط I بـ agree ويربط the بـ idea.'
      },
      {
        en: "Two apples and three oranges. ➡️ [Two-w-apples and three-y-oranges]",
        ar: 'تفاحتان وثلاث برتقالات.',
        spokenNoteAr: 'تطبيق مباشر للقاعدتين معاً في جملة واحدة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Making an awkward, abrupt throat catch (Glottal Stop) between vowels: Go... [stop]... out.",
        correct: "Glide smoothly with a tiny /w/ or /y/ bridge: Go-w-out.",
        whyAr: 'الوقفة الحنجرية الحادة تقطع موسيقى الكلام وتجعله مجهداً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة مع ربط المتحركات بصوت الـ W والـ Y الخفيفين: "I want to see it now, so go ahead"!',
      promptEn: 'Read aloud applying intrusive glides: "I want to see it now, so go ahead"!',
      saraQuestionAr: 'Can you link the vowels smoothly: "I want to see it now, so go ahead"?',
      saraQuestionEn: 'Can you link the vowels smoothly: "I want to see it now, so go ahead"?',
      recommendedResponseEn: "I want to see it now, so go ahead!"
    },
    quiz: [
      {
        questionAr: 'ما الصوت الدخيل الخفيف الذي يربط صوتياً بين كلمتي "You are" في الكلام السريع؟',
        questionEn: 'Which subtle intrusive glide links "You are" in native connected speech?',
        options: [
          "Intrusive /w/ sound: [You-w-are]",
          "Intrusive /t/ sound",
          "Intrusive /k/ sound",
          "Silent pause"
        ],
        correctIndex: 0,
        explanationAr: 'بما أن كلمة "You" تنتهي بشفتين مدورتين (صوت oo)، فإن الربط يتم عبر صوت /w/ خفيف: [You-w-are].'
      }
    ],
    whiteboardNotes: {
      title: 'Vowel-to-Vowel Glide Rules',
      pointsAr: [
        '1. الشفاه المدورة (oo, oh, ow) ⬅️ تربط بـ /w/ خفيفة (Go-w-on, Two-w-hours)',
        '2. الشفاه المبتسمة (ee, ay, eye) ⬅️ تربط بـ /j/ (ياء خفيفة) (He-y-is, I-y-always)',
        '3. النتيجة: التخلص التام من تقطيع الكلام ووقفة الحنجرة المزعجة'
      ],
      pointsEn: [
        '1. Rounded vowels (u, o, ow) trigger /w/ bridge: Go-w-out, Do-w-it',
        '2. Spread vowels (i, e, ay) trigger /j/ (y) bridge: See-y-it, Say-y-it',
        '3. Eliminates choppy glottal stops'
      ],
      chalkHighlight: 'Round ➡️ /w/ Glide | Smiling ➡️ /j/ (Y) Glide'
    }
  },
  {
    id: 'srp_318',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'تقسيم النصوص إلى كتل فكرية وتوزيع التنفس (Thought Groups & Chunking)',
    titleEn: 'Thought Chunking: The Secret of Effortless Reading Aloud',
    descAr: 'كيف تقسم الجمل الطويلة إلى كتل معنوية مترابطة وتقف في الأماكن الصحيحة دون أن ينقطع نفسك في منتصف الجملة.',
    descEn: 'Break long paragraphs into natural rhythmic chunks and breathe like a professional voice actor.',
    speakingGoalAr: 'قراءة فقرة من 3 أسطر مقسمة إلى 4 كتل فكرية مع أخذ نَفَس هادئ عند الفواصل المعنوية.',
    speakingGoalEn: 'Read complex prose aloud respecting grammatical chunk boundaries and micro-pauses.',
    keyPattern: {
      ruleAr: 'في القراءة الجهرية، لا نقرأ كلمة بكلمة بل في "كتل فكرية" (Thought groups). نقف وقفة خفيفة بعد الفاعل المركب، وقبل حروف الجر، وعند الروابط.',
      ruleEn: 'Chunk text into cohesive thought units: [Subject clause] / [Verb phrase] / [Prepositional detail].',
      formula: '[Thought Group 1] ⏸️ [Thought Group 2] ⏸️ [Thought Group 3]'
    },
    practicalExamples: [
      {
        en: "[When we look at the data] ⏸️ [from the past three quarters,] ⏸️ [one thing becomes crystal clear.]",
        ar: '[عندما ننظر إلى البيانات] ⏸️ [من الفصول الثلاثة الماضية،] ⏸️ [يصبح أمر واحد واضحاً وضوح الشمس.]',
        spokenNoteAr: 'لاحظ كيف يعطي التقسيم لكل فكرة وزناً ويمنحك فرصة ذهبية للتنفس المريح.'
      },
      {
        en: "[Success in language learning] ⏸️ [doesn't come from memorizing rules,] ⏸️ [it comes from daily vocal practice.]",
        ar: '[النجاح في تعلم اللغات] ⏸️ [لا يأتي من حفظ القواعد،] ⏸️ [بل من الممارسة الصوتية اليومية.]',
        spokenNoteAr: 'كل كتلة فكرية تعبر عن معنى متكامل بذاته.'
      },
      {
        en: "[If you need any assistance,] ⏸️ [please reach out to our team] ⏸️ [before five o'clock.]",
        ar: '[إذا احتجت أي مساعدة،] ⏸️ [يرجى التواصل مع فريقنا] ⏸️ [قبل الساعة الخامسة.]',
        spokenNoteAr: 'إيقاع احترافي مريح للأذن والمستمع.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Running out of breath and stopping awkwardly in the middle of a phrase: 'When we look at the data from the... [gasp]... past three quarters'.",
        correct: "Pause intentionally at the end of each thought unit and take relaxed micro-breaths.",
        whyAr: 'التوقف في المكان الخطأ يشتت المعنى ويجعل القراءة مجهدة ومرتبكة.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ هذا النص لسارة مع الالتزام بالوقفات بين الكتل الفكرية الثلاث دون انقطاع نفس!',
      promptEn: 'Read to Sara chunking each unit cleanly: "[The secret to great storytelling] [is keeping the audience curious] [until the very end]"!',
      saraQuestionAr: 'Read this aloud using deliberate thought chunking: "[The secret to great storytelling] [is keeping the audience curious] [until the very end]"!',
      saraQuestionEn: 'Read this aloud using deliberate thought chunking: "[The secret to great storytelling] [is keeping the audience curious] [until the very end]"!',
      recommendedResponseEn: "The secret to great storytelling / is keeping the audience curious / until the very end."
    },
    quiz: [
      {
        questionAr: 'أين هو الموضع الأنسب لوضع وقفة تنفس خفيفة في هذه الجملة؟',
        questionEn: 'Where is the most natural boundary for a micro-pause in this sentence?',
        options: [
          "Between 'the' and 'secret'",
          "At the comma or boundary between the clause and the main verb",
          "After every single word",
          "Never breathe until the whole paragraph ends"
        ],
        correctIndex: 1,
        explanationAr: 'الموضع الطبيعي للوقفة التنفسية هو عند الحدود النحوية والمعنوية الفاصلة بين الكتل الفكرية.'
      }
    ],
    whiteboardNotes: {
      title: 'The Thought Group Framework',
      pointsAr: [
        '1. النص ليس كلمات منفصلة، بل كتل أفكار مترابطة',
        '2. أماكن الوقفات: الفواصل، حروف العطف (and/but)، قبل حروف الجر الطويلة',
        '3. النَفَس الهادئ: خذ شهيقاً خفيفاً غير مسموع عند الفاصل',
        'النتيجة: إلقاء ساحر كالمذيعين وقراء الأخبار'
      ],
      pointsEn: [
        '1. Speak in chunks, not individual isolated words',
        '2. Natural boundaries: Commas, conjunctions, prepositional phrases',
        '3. Silent micro-breaths prevent breath exhaustion',
        'Hallmark of broadcaster-level read speech'
      ],
      chalkHighlight: '[Concept Chunk 1] ⏸️ [Action Chunk 2] ⏸️ [Conclusion Chunk 3]'
    }
  },
  {
    id: 'srp_319',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'الفرق بين اللام الخفيفة واللام المعتمة (Light L vs Dark L)',
    titleEn: 'The Dark L [ɫ]: Mastering Milk, Feel, Ball & World',
    descAr: 'كيف تنطق حرف اللام العميق (Dark L) في نهاية الكلمات برفع مؤخرة اللسان نحو الحلق كالمتحدثين الأصليين.',
    descEn: 'Produce the guttural American dark L [ɫ] in word-final positions effortlessly.',
    speakingGoalAr: 'قراءة أزواج الكلمات المتقابلة (Light/Feel, Lemon/Milk) بتمييز صوتي واضح لموضع اللسان.',
    speakingGoalEn: 'Distinguish front alveolar light L from velarized dark L [ɫ].',
    keyPattern: {
      ruleAr: 'اللام الخفيفة (Light L) تأتي في بداية الكلمة (Light, Love) وطرف اللسان يلمس الأسنان العلوية. اللام المعتمة (Dark L [ɫ]) تأتي في نهاية الكلمة أو قبل ساكن (Feel, Milk, Ball) وترتفع فيها مؤخرة اللسان نحو الحلق.',
      ruleEn: 'Light L = tip of tongue touches gum ridge (Lemon). Dark L = back of tongue arches upward creating a deep resonance (Ball, Feel).',
      formula: 'Word start ➡️ Light L [l] | Word end / Pre-consonant ➡️ Dark L [ɫ]'
    },
    practicalExamples: [
      {
        en: "I feel like drinking a cold glass of milk. (Feel & Milk = Dark L)",
        ar: 'أشعر برغبة في شرب كوب حليب بارد.',
        spokenNoteAr: 'انتبه للصوت العميق الرخيم في feel و milk.'
      },
      {
        en: "Love & Light (Light L) 🆚 Real & Ball (Dark L)",
        ar: 'حب وضوء (لام خفيفة أمامية) ⬅️ حقيقي وكرة (لام معتمة عميقة).',
        spokenNoteAr: 'قارن بين النطقين ولاحظ حركة مؤخرة لسانك.'
      },
      {
        en: "The girl traveled all around the world.",
        ar: 'سافرت الفتاة في جميع أنحاء العالم.',
        spokenNoteAr: 'girl و world من أصعب الكلمات بسبب اجتماع الـ R والـ Dark L معاً.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Replacing the Dark L with an Arabic light Lam, making 'Milk' sound like 'Meelk'.",
        correct: "Arch the back of your tongue to produce that rich, resonant dark vowel-like sound.",
        whyAr: 'اللام العربية تشبه اللام الخفيفة فقط؛ إتقان الـ Dark L يمنحك هيبة اللهجة الأمريكية فوراً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة بنطق الـ Dark L العميق: "Tell all the people that the deal is real"!',
      promptEn: 'Read to Sara mastering the dark L resonance: "Tell all the people that the deal is real"!',
      saraQuestionAr: 'Let me hear your resonant Dark L: "Tell all the people that the deal is real"!',
      saraQuestionEn: 'Let me hear your resonant Dark L: "Tell all the people that the deal is real"!',
      recommendedResponseEn: "Tell all the people that the deal is real!"
    },
    quiz: [
      {
        questionAr: 'في أي من هذه الكلمات يُنطق حرف الـ L بصوت الـ Dark L المعتم العميق؟',
        questionEn: 'In which word is the L pronounced as a velarized DARK L [ɫ]?',
        options: [
          "Lemon",
          "Like",
          "Control",
          "Listen"
        ],
        correctIndex: 2,
        explanationAr: 'في كلمة "Control" يقع حرف L في نهاية الكلمة، فيُنطق بصوت الـ Dark L العميق [kən-TROʊɫ].'
      }
    ],
    whiteboardNotes: {
      title: 'The Dark L Architecture',
      pointsAr: [
        '1. اللام الخفيفة (Light L): بداية الكلمة (Look, Love, Light) - طرف اللسان أمامي',
        '2. اللام المعتمة (Dark L [ɫ]): نهاية الكلمة أو قبل ساكن (Feel, Ball, Cool, Milk, World)',
        '3. الميكانيكا: ترتفع مؤخرة اللسان نحو سقف الحلق لتعطي رنيناً عميقاً',
        'سر الطلاقة: الـ Dark L تميز المتحدث المتمكن من المبتدئ'
      ],
      pointsEn: [
        '1. Light L: Word-initial (Love, Lemon) - Alveolar contact only',
        '2. Dark L: Word-final or pre-consonant (Cool, Ball, Milk, World)',
        '3. Mechanic: Secondary velarization (back of tongue rises towards soft palate)',
        'Hallmark marker of native-sounding resonance'
      ],
      chalkHighlight: 'Light L (Word Start) 🆚 Deep Resonant Dark L [ɫ] (Word End)'
    }
  },
  {
    id: 'srp_320',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'إيقاع الإنجليزية المعتمد على النبر (Stress-Timed Rhythm Drills)',
    titleEn: 'Stress-Timed Rhythm: Mastering the Metronome Beat of English',
    descAr: 'الإنجليزية لغة لا تعد الحروف كالعربية بل تعد النبرات! كيف تستغرق الجملة المكونة من 10 كلمات نفس وقت الجملة المكونة من 4 كلمات بفضل ضغط الكلمات.',
    descEn: 'Master the isochronous rhythm of English: compressing weak words between stressed beats.',
    speakingGoalAr: 'قراءة جمل متصاعدة الطول بنفس الإيقاع الزمني والنبض المتساوي.',
    speakingGoalEn: 'Demonstrate stress-timed cadence maintaining equal intervals between stressed syllables.',
    keyPattern: {
      ruleAr: 'في اللغات المعتمدة على النبر (Stress-timed)، المسافة الزمنية بين الكلمات المشددة متساوية تقريباً؛ لذا تضغط الكلمات الوظيفية الصغيرة في أجزاء من الثانية.',
      ruleEn: 'English rhythm beats on stressed content words; unstressed syllables compress into the gaps.',
      formula: 'Beat 1 (STRESS) ➡️ [Compress weak words] ➡️ Beat 2 (STRESS) ➡️ Beat 3 (STRESS)'
    },
    practicalExamples: [
      {
        en: "CATS CHASE MICE. (3 beats, 3 words)",
        ar: 'القطط تطارد الفئران (3 نبضات زمنية متساوية).',
        spokenNoteAr: 'كل كلمة مشددة تأخذ ثانية واحدة.'
      },
      {
        en: "The CATS will CHASE the MICE. (3 beats, 6 words - takes the EXACT same time!)",
        ar: 'القطط ستطارد الفئران (6 كلمات لكنها تستغرق نفس الوقت تماماً!).',
        spokenNoteAr: 'لاحظ كيف ضغطنا the و will في كسر من الثانية ليبقى الإيقاع ثابتاً.'
      },
      {
        en: "The CATS might have been CHASING the MICE. (3 beats, 8 words - still the same tempo!)",
        ar: 'القطط ربما كانت تطارد الفئران (8 كلمات بنفس النبضات الثلاث!).',
        spokenNoteAr: 'سر الإنجليزية: الكلمات الوظيفية تنكمش وتختزل ليبقى النبض منتظماً كالبندول.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing every syllable for the exact same amount of time like a machine gun (Syllable-timed).",
        correct: "Compress the little words (the, of, to, have) so the main nouns and verbs hit on the musical beat.",
        whyAr: 'إعطاء كل كلمة زمناً متساوياً يجعل كلامك يبدو آلياً وغير موسيقي.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ هذه الجمل المتصاعدة مع سارة مع الحفاظ على نقرة إيقاع واحدة في الثانية على الكلمات الكبيرة!',
      promptEn: 'Read the 3 escalating sentences keeping the exact same metronome beat across content words!',
      saraQuestionAr: 'Keep the beat steady on the capital words: "BIRDS SING" ➡️ "The BIRDS can SING" ➡️ "The BIRDS could have been SINGING"!',
      saraQuestionEn: 'Keep the beat steady on the capital words: "BIRDS SING" ➡️ "The BIRDS can SING" ➡️ "The BIRDS could have been SINGING"!',
      recommendedResponseEn: "BIRDS SING! The BIRDS can SING! The BIRDS could have been SINGING!"
    },
    quiz: [
      {
        questionAr: 'ماذا يعني أن اللغة الإنجليزية لغة "Stress-timed"؟',
        questionEn: 'What does it mean that English is a "stress-timed" language?',
        options: [
          "It causes mental stress and headache.",
          "The rhythm is based on the interval between stressed syllables, compressing unstressed words.",
          "Every syllable takes the exact same number of milliseconds.",
          "Only nouns are allowed to be spoken."
        ],
        correctIndex: 1,
        explanationAr: 'كون الإنجليزية Stress-timed يعني أن الإيقاع يقاس بالمسافة بين النبرات الرئيسية، مما يجعل الكلمات الفرعية تنضغط صوتياً.'
      }
    ],
    whiteboardNotes: {
      title: 'The Metronome of English Speech',
      pointsAr: [
        '1. النبضات الرئيسية: الأسماء، الأفعال الأساسية، الصفات (Content words)',
        '2. الكلمات المنضغطة: حروف الجر، أدوات التعريف، الضمائر (Function words)',
        '3. القاعدة الذهبية: 8 كلمات تستغرق نفس وقت 3 كلمات إذا كان عدد النبرات واحداً!',
        'تدرّب على التصفيق مع كل نبرة مشددة'
      ],
      pointsEn: [
        '1. The Beats: Content words (Nouns, Main Verbs, Adjectives)',
        '2. The Compressors: Function words (Articles, Prepositions, Modals)',
        '3. Isochrony: Beat-to-beat intervals stay remarkably uniform',
        'Clap on the stressed syllables to internalize the cadence'
      ],
      chalkHighlight: 'STRESS ➡️ [Compress little words] ➡️ STRESS ➡️ STRESS'
    }
  },
  {
    id: 'srp_321_m',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قراءة القصص التعبيرية وتجسيد المشاعر (Expressive Story Reading & Drama)',
    titleEn: 'Vocal Acting: Conveying Suspense, Humor & Character in Story Reading',
    descAr: 'كيف تقرأ قصة أو نصاً بصوت ينبض بالحياة، وتغير نبرتك بين أصوات الشخصيات، ولحظات الترقب والمفاجأة.',
    descEn: 'Bring written dialogue alive using expressive character shifts, pacing, and dramatic tension.',
    speakingGoalAr: 'قراءة حوار قصصي لسارة يجسد شخصيتين بنبرتين متمايزتين مع وقفة تشويق.',
    speakingGoalEn: 'Read a dramatic dialogue excerpt modulating tempo, pitch, and character voices.',
    keyPattern: {
      ruleAr: 'في القراءة التعبيرية: أبطئ في لحظات الغموض والترقب، واسرع في لحظات الحركة والمطاردة، وغير نبرتك (عالية/عميقة) بين الشخصيات.',
      ruleEn: 'The Storyteller’s Palette: Slow tempo for suspense ➡️ Rapid tempo for action ➡️ Distinct pitch registers for characters.',
      formula: 'Slow Suspense Whisper ⏸️ ➡️ Explosive Action Pace ➡️ Warm Character Voice'
    },
    practicalExamples: [
      {
        en: '"Wait," whispered the detective, stepping into the dark room. "Did you hear that?"',
        ar: '"انتظر"، همس المحقق وهو يخطو داخل الغرفة المظلمة. "هل سمعت ذلك؟"',
        spokenNoteAr: 'همس هادئ وإيقاع بطيء يشد أنفاس المستمع.'
      },
      {
        en: '"Run!" she shouted, as the door slammed shut behind them!',
        ar: '"اهرب!" صرخت بصوت عالٍ بينما انغلق الباب بقوة خلفهم!',
        spokenNoteAr: 'انتقال فوري إلى وتيرة متسارعة ونبرة عالية.'
      },
      {
        en: 'The old merchant smiled gently and said: "Patience, my friend, is where true riches hide."',
        ar: 'ابتسم التاجر العجوز بلطف وقال: "الصبر يا صديقي هو حيث تختبئ الثروات الحقيقية."',
        spokenNoteAr: 'صوت رخيم عميق ودافئ يجسد حكمة الشيخ العجوز.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Reading character dialogue with the exact same dry narrator voice used for technical manuals.",
        correct: "Inhabit the character: feel their emotion, breathe their panic or warmth.",
        whyAr: 'القراءة الآلية تحرم القصة من روحها؛ التلوين الدرامي يأسر المستمعين.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة هذا المقطع القصصي مع إبراز الفرق بين همس الترقب وصرخة المفاجأة!',
      promptEn: 'Read this dramatic story snippet to Sara embodying the suspense and the sudden twist!',
      saraQuestionAr: 'Let me hear your storytelling drama: "He crept silently across the hall... and suddenly, the lights flashed on!"',
      saraQuestionEn: 'Let me hear your storytelling drama: "He crept silently across the hall... and suddenly, the lights flashed on!"',
      recommendedResponseEn: "He crept silently across the hall... and suddenly, the lights flashed on!"
    },
    quiz: [
      {
        questionAr: 'ما أفضل تكتيك صوتي لبناء حالة الترقب والتشويق (Suspense) عند قراءة قصة بصوت مسموع؟',
        questionEn: 'What is the most effective vocal technique for building suspense when reading stories aloud?',
        options: [
          "Speaking as fast as humanly possible.",
          "Slowing your tempo, dropping to an intimate whisper, and adding micro-pauses.",
          "Yelling constantly.",
          "Laughing uncontrollably."
        ],
        correctIndex: 1,
        explanationAr: 'إبطاء وتيرة القراءة وخفض الصوت إلى همس واضح مع وقفات صامتة محسوبة يبني أعلى درجات التشويق والترقب.'
      }
    ],
    whiteboardNotes: {
      title: 'The Storyteller’s Vocal Palette',
      pointsAr: [
        '1. الترقب والغموض: إبطاء السرعة + همس هادئ + وقفة صامتة',
        '2. الحركة والإثارة: تسريع الإيقاع + نبرة قوية متصاعدة',
        '3. الشخصيات: تغيير طبقة الصوت (صوت عميق للحكيم / صوت سريع للمتحمس)',
        'اجعل المستمع يرى القصة بأذنيه!'
      ],
      pointsEn: [
        '1. Suspense: Decelerate pace + intimate whisper + pregnant pause',
        '2. Action: Accelerate cadence + dynamic vocal energy',
        '3. Character differentiation: Modulate pitch registers',
        'Paint cinema with your voice'
      ],
      chalkHighlight: 'Slow Suspense Whisper ➡️ Explosive Action ➡️ Rich Character Pitch'
    }
  },

  // ==========================================
  // ADVANCED LEVEL (C1) - Lessons 21 to 30
  // ==========================================
  {
    id: 'srp_303',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'تقنية التظليل الصوتي المتقدمة (Shadowing Method Masterclass)',
    titleEn: 'Advanced Shadowing Technique for Native Accent & Rhythm',
    descAr: 'السر الأكبر لمتعددي اللغات: كيف تردد خلف صوت سارة بفارق نصف ثانية لتبرمج عضلات لسانك وفكك على الطلاقة التلقائية.',
    descEn: 'Train muscle memory and accent precision by mirroring audio in real-time.',
    speakingGoalAr: 'التظليل الصوتي وراء سارة في فقرة من 3 أسطر بالسرعة الطبيعية.',
    speakingGoalEn: 'Shadow a native audio clip within a 0.5-second delay with correct cadence.',
    keyPattern: {
      ruleAr: 'في تقنية Shadowing: لا تنتظر حتى تنتهي الجملة؛ بل ردد خلف المتحدث مباشرة وأنت تستمع، مقلداً نبرته وسرعته وتنفسه بدقة.',
      ruleEn: 'Listen and mimic simultaneously with micro-delay to build articulatory muscle memory.',
      formula: 'Listen ➡️ Echo instantaneously (0.5s) ➡️ Match melody & pauses'
    },
    practicalExamples: [
      {
        en: "Passionate speakers don't merely convey data; they paint pictures with their words.",
        ar: 'المتحدثون الشغوفون لا ينقلون مجرد بيانات؛ بل يرسمون لوحات بكلماتهم.',
        spokenNoteAr: 'لاحظ الوقفة الخفيفة بعد data، والانطلاق بعد they paint pictures.'
      },
      {
        en: "Once you embrace the fact that mistakes are proof of effort, fear evaporates.",
        ar: 'بمجرد أن تتقبل حقيقة أن الأخطاء دليل المحاولة، يتبخر الخوف فوراً.',
        spokenNoteAr: 'نبرة تصاعدية ملهمة ومحفزة تكسر حاجز الخوف.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Waiting until the whole sentence finishes before speaking.",
        correct: "Shadow almost simultaneously, like a shadow following a runner.",
        whyAr: 'التظليل هو تكرار متزامن يعود عقلك على المعالجة الفورية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'استمع لسارة وهي تقرأ الجملة، وظللها بصوتك فوراً خلفها: "Confidence comes from daily action, not endless thinking!"',
      promptEn: 'Shadow Sara right now: "Confidence comes from daily action, not endless thinking!"',
      saraQuestionAr: 'Listen to my pace and shadow right behind me: "Confidence comes from daily action, not endless thinking!" Ready?',
      saraQuestionEn: 'Listen to my pace and shadow right behind me: "Confidence comes from daily action, not endless thinking!" Ready?',
      recommendedResponseEn: "Confidence comes from daily action, not endless thinking!"
    },
    quiz: [
      {
        questionAr: 'ما الفائدة الجوهرية لتقنية التظليل الصوتي (Shadowing) مقارنة بالقراءة الصامتة؟',
        questionEn: 'What is the core benefit of the Shadowing Technique compared to silent reading?',
        options: [
          "It builds physical articulatory muscle memory and speech rhythm.",
          "It saves phone battery.",
          "It makes you memorize spelling rules.",
          "It requires no listening."
        ],
        correctIndex: 0,
        explanationAr: 'التظليل يبني الذاكرة العضلية للفك واللسان ويعودك على سرعة وتناغم النطق الفعلي.'
      }
    ],
    whiteboardNotes: {
      title: 'The Shadowing Protocol',
      pointsAr: [
        '1. استمع للنبرة الأولى',
        '2. ابدأ بالترديد فوراً بفاصل نصف ثانية فقط',
        '3. قلّد التنفس والوقفات والنبرة الصاعدة والهابطة',
        '4. الممارسة: 5 دقائق يومياً تصنع معجزات في طلاقتك!'
      ],
      pointsEn: [
        '1. Audio cues trigger speech reflexes',
        '2. Echo with a 0.5-second buffer',
        '3. Replicate pauses, cadence, and breath',
        '4. 5 minutes daily builds permanent fluency'
      ],
      chalkHighlight: 'Echo at 0.5s ➡️ Mimic breathing ➡️ Unlock automatic fluency'
    }
  },
  {
    id: 'srp_322',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'تلوين الصوت والرسائل الخفية (Pitch Glides & Subtext Modulation)',
    titleEn: 'Vocal Subtext: How Pitch Glides Convey Irony, Skepticism & Empathy',
    descAr: 'كيف تقول نفس الكلمة (مثل Really أو Sure) بست نبرات مختلفة لتوصل الشك، الانبهار، السخرية، أو التعاطف التام.',
    descEn: 'Master complex pitch gliding: inject sarcasm, awe, skepticism, or reassurance into simple words.',
    speakingGoalAr: 'نطق كلمة "Really?" بثلاث نبرات متمايزة: انبهار، تشكيك، وسخرية.',
    speakingGoalEn: 'Deploy pitch glides (fall-rise, rise-fall) to convey deliberate emotional subtext.',
    keyPattern: {
      ruleAr: 'النبرة الصاعدة الهابطة (Rise-Fall) تعبر عن الانبهار الصادق أو المفاجأة السارة. والنبرة الهابطة الصاعدة (Fall-Rise) تعبر عن الشك أو التحفظ (Well...).',
      ruleEn: 'Rise-Fall = enthusiastic awe or certainty; Fall-Rise = skepticism, warning, or implicit reservation.',
      formula: 'Rise-Fall (Awe) ∧ 🆚 Fall-Rise (Doubt) ∨'
    },
    practicalExamples: [
      {
        en: "Really? ↗↘ (Pitch rises then falls steeply ➡️ Conveys genuine astonishment).",
        ar: 'حقاً؟! (نبرة تصعد ثم تهبط بقوة تعبر عن الانبهار والدهشة العارمة).',
        spokenNoteAr: 'انبهار صادق وتصديق للخبر السار.'
      },
      {
        en: "Really? ↘↗ (Pitch falls then climbs cautiously ➡️ Conveys skeptical suspicion).",
        ar: 'أحقاً هذا؟! (نبرة تهبط ثم تصعد بحذر تعبر عن الشك وعدم الاقتناع).',
        spokenNoteAr: 'شك وتحفظ، وكأنك تقول: لست متأكداً من صحة هذا الادعاء!'
      },
      {
        en: "Oh, SURE you did. (Sarcastic drawl with exaggerated pitch dip).",
        ar: 'أوه، بالتأكيد قمت بذلك! (نبرة متهكمة ممتدة تعني العكس تماماً).',
        spokenNoteAr: 'السخرية الذكية (Sarcasm) تعتمد بالكامل على تمديد النبرة وهبوطها.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Relying purely on literal vocabulary to convey sarcasm or enthusiasm.",
        correct: "English listeners rely 80% on pitch gliding to detect humor, sarcasm, and true intent.",
        whyAr: 'الكلمات وحدها لا تكفي؛ نبرة الصوت وتلوين النغمة هما ما يحددان المعنى الباطن الحقيقي.'
      }
    ],
    speakingChallenge: {
      promptAr: 'قل كلمة "Sure" لسارة بنبرتين مختلفتين: الأولى بموافقة دافئة، والثانية بتحفظ وتشكك!',
      promptEn: 'Say "Sure" to Sara twice: first with warm agreement, then with cautious hesitation!',
      saraQuestionAr: 'Can we launch the entire campaign tomorrow without testing?',
      saraQuestionEn: 'Can we launch the entire campaign tomorrow without testing?',
      recommendedResponseEn: "Sure... [with a lingering fall-rise pitch glide indicating cautious doubt]"
    },
    quiz: [
      {
        questionAr: 'ما المعنى الذي توصله نبرة (Fall-Rise ↘↗) الهابطة ثم الصاعدة في كلمة "Well..."؟',
        questionEn: 'What emotional subtext does a Fall-Rise ↘↗ pitch contour convey on "Well..."?',
        options: [
          "Complete enthusiastic agreement",
          "Hesitation, doubt, or having an unstated reservation",
          "Furious anger",
          "Sleeping"
        ],
        correctIndex: 1,
        explanationAr: 'نبرة Fall-Rise الهابطة ثم الصاعدة تعبر عالمياً في الإنجليزية عن التحفظ، التردد، والشك.'
      }
    ],
    whiteboardNotes: {
      title: 'The Subtext Modulation Matrix',
      pointsAr: [
        '1. النبرة الصاعدة الهابطة (Rise-Fall ∧): انبهار، حماس، ويقين قاطع',
        '2. النبرة الهابطة الصاعدة (Fall-Rise ∨): شك، تحفظ، وتحذير مهذب',
        '3. النبرة الممتدة الهابطة: تهكم وسخرية ذكية (Sarcasm)',
        'قوة التواصل تكمن في ما وراء الكلمات!'
      ],
      pointsEn: [
        '1. Rise-Fall ∧ = Genuine awe, definitive certainty',
        '2. Fall-Rise ∨ = Reservation, skepticism ("Well... maybe")',
        '3. Elongated dip = Irony and sarcastic subtext',
        'Mastery of pitch equals emotional mastery of speech'
      ],
      chalkHighlight: 'Rise-Fall (Awe) ∧ 🆚 Fall-Rise (Doubt) ∨'
    }
  },
  {
    id: 'srp_323',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'إسقاط وحذف الأصوات في الحديث فائق السرعة (Elision & Sound Deletion)',
    titleEn: 'Elision in Fast Speech: Why Natives Drop /t/ and /d/ Without Noticing',
    descAr: 'كيف يحذف المتحدث الأصلي أصوات التاء والدال تلقائياً لتسهيل حركة اللسان: Next door تصبح Nex-door و Last night تصبح Las-night.',
    descEn: 'Master natural elision: dropping alveolar stops between consonants for speed.',
    speakingGoalAr: 'قراءة عبارات تحتوي على حذف طبيعي لـ T و D في سياق سريع دون تلعثم.',
    speakingGoalEn: 'Demonstrate natural consonant elision at word boundaries in fluent reading.',
    keyPattern: {
      ruleAr: 'قاعدة الحذف (Elision): عندما تقع T أو D في نهاية كلمة ومحاطة بأصوات ساكنة أخرى، تسقط تماماً لتوفير مجهود اللسان.',
      ruleEn: 'Elision rule: /t/ and /d/ naturally vanish when flanked by other consonants: Last night ➡️ [Las-night].',
      formula: '[Consonant] + T/D + [Consonant] ➡️ T/D Disappears!'
    },
    practicalExamples: [
      {
        en: "Last night we went next door. ➡️ [Las-night we went nex-door]",
        ar: 'الليلة الماضية ذهبنا إلى البيت المجاور.',
        spokenNoteAr: 'سقطت T من Last وسقطت T من next بسلاسة تامة.'
      },
      {
        en: "Hold on, you must be joking! ➡️ [You mus-be joking]",
        ar: 'انتظر، لا بد أنك تمزح!',
        spokenNoteAr: 'must be تُنطق [mus-be] في الحديث السريع.'
      },
      {
        en: "Stand there for a second. ➡️ [Stan-there for a second]",
        ar: 'قف هناك لثانية واحدة.',
        spokenNoteAr: 'سقطت D من Stand قبل th.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Forcing an explosive /t/ stop between consonants: 'Las-T... night'.",
        correct: "Let the /t/ drop naturally: 'Las-night'.",
        whyAr: 'الإصرار على نطق كل T و D بين السواكن يبطئ الحديث ويشعرك بالإرهاق.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة بنطق سريع ومترابط مع تطبيق الحذف: "The best time to start was last week"!',
      promptEn: 'Read aloud applying native elision: "The best time to start was last week"!',
      saraQuestionAr: 'Can you read this phrase with seamless natural elision: "The best time to start was last week"?',
      saraQuestionEn: 'Can you read this phrase with seamless natural elision: "The best time to start was last week"?',
      recommendedResponseEn: "The bes-time to start was las-week!"
    },
    quiz: [
      {
        questionAr: 'كيف تُنطق عبارة "Next week" في الحديث الإنجليزي السريع المتصل؟',
        questionEn: 'How does "Next week" naturally sound in rapid connected speech?',
        options: [
          "Nex-week (تسقط الـ T تماماً)",
          "Next-u-week",
          "Nexteee week",
          "Nek-sat week"
        ],
        correctIndex: 0,
        explanationAr: 'في الحديث السريع تسقط الـ T المحصورة بين السواكن لتصبح العبارة: Nex-week.'
      }
    ],
    whiteboardNotes: {
      title: 'The Elision Economy Principle',
      pointsAr: [
        'قاعدة الذهب: اللسان كسول ويبحث عن أقصر الطرق الفيزيائية',
        'Last night ➡️ Las-night',
        'Next door ➡️ Nex-door',
        'You must be ➡️ You mus-be',
        'تحدث باسترخاء دون تكلف نطق كل حرف'
      ],
      pointsEn: [
        'Economy of articulation: Tongue seeks minimum physical distance',
        'Last night ➡️ Las-night',
        'Next door ➡️ Nex-door',
        'Must go ➡️ Mus-go',
        'Relax and embrace effortless elision'
      ],
      chalkHighlight: 'Consonant + T/D + Consonant ➡️ T/D Drops!'
    }
  },
  {
    id: 'srp_324',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'انصهار الأصوات المتجاورة (Coalescent Assimilation: Did you & Won\'t you)',
    titleEn: 'Sound Morphing: How "Did you" Becomes "Did-ja" and "Won\'t you" Becomes "Won-cha"',
    descAr: 'كيف يندمج صوت D أو T مع حرف Y لينتج صوت /dʒ/ (جيم) أو /tʃ/ (تش) في المحادثات السريعة العفوية.',
    descEn: 'Master coalescent assimilation: D + Y ➡️ /dʒ/ and T + Y ➡️ /tʃ/.',
    speakingGoalAr: 'قراءة حوار يحتوي على Did you و What do you know بانصهار صوتي عفوي.',
    speakingGoalEn: 'Produce palatalized assimilations naturally in informal conversational reading.',
    keyPattern: {
      ruleAr: 'عندما تلتقي T مع Y (you/your)، تنصهران معاً لتشكلا صوت /tʃ/ (تش مثل Want you ➡️ Wan-cha). وعندما تلتقي D مع Y تنصهران لتشكلا صوت /dʒ/ (Did you ➡️ Did-ja).',
      ruleEn: 'T + /j/ ➡️ /tʃ/ (Don\'t you ➡️ Don-cha); D + /j/ ➡️ /dʒ/ (Would you ➡️ Wou-dja).',
      formula: 'T + You ➡️ /tʃ/ [cha] | D + You ➡️ /dʒ/ [ja]'
    },
    practicalExamples: [
      {
        en: "Did you see what I sent you? ➡️ Sounds like: [Did-ja see what I sen-cha?]",
        ar: 'هل رأيت ما أرسلته لك؟',
        spokenNoteAr: 'انصهار تام: did you أصبحت did-ja، و sent you أصبحت sen-cha.'
      },
      {
        en: "Don't you want to join us? ➡️ Sounds like: [Don-cha wanna join us?]",
        ar: 'ألا تريد الانضمام إلينا؟',
        spokenNoteAr: 'Don\'t you تحولت صوتياً إلى Don-cha.'
      },
      {
        en: "Would you mind helping out? ➡️ Sounds like: [Wou-dja mind helping out?]",
        ar: 'هل تمانع في تقديم المساعدة؟',
        spokenNoteAr: 'Would you تنطق بانسيابية تامة كـ Wou-dja.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Pronouncing 'Did... you' with a mechanical pause between the two words.",
        correct: "Allow the tongue to blend them into a natural 'Did-ja'.",
        whyAr: 'المتحدث الأصلي لا يقاوم هذا الانصهار؛ بل يتركه يحدث تلقائياً لتسريع الكلام.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة بانصهار صوتي كامل: "What did you do when she told you?"!',
      promptEn: 'Read aloud applying assimilation: "What did you do when she told you?"!',
      saraQuestionAr: 'Let me hear your sound morphing: "What did you do when she told you?"!',
      saraQuestionEn: 'Let me hear your sound morphing: "What did you do when she told you?"!',
      recommendedResponseEn: "What did-ja do when she tol-dja?"
    },
    quiz: [
      {
        questionAr: 'ما الصوت الناتج عن انصهار حرف T مع كلمة You في عبارة "Don\'t you"?',
        questionEn: 'What sound is produced when T merges with "You" in "Don\'t you"?',
        options: [
          "A /tʃ/ (تش) sound: [Don-cha]",
          "A /k/ sound",
          "A /b/ sound",
          "An /m/ sound"
        ],
        correctIndex: 0,
        explanationAr: 'التقاء صوت T مع Y ينتج صوت /tʃ/ (تش) الصوتي، فتصبح Don-cha.'
      }
    ],
    whiteboardNotes: {
      title: 'Assimilation Fusion Rules',
      pointsAr: [
        '1. D + You = /dʒ/ [ja] ⬅️ Did-ja, Would-ja, Coul-dja',
        '2. T + You = /tʃ/ [cha] ⬅️ Don-cha, Won-cha, Got-cha',
        '3. هذه ليست لغة شوارع، بل ظاهرة صوتية تحدث في كل حديث أمريكي عفوي!'
      ],
      pointsEn: [
        '1. D + /j/ ➡️ /dʒ/ (Did you ➡️ Did-ja / Would you ➡️ Wou-dja)',
        '2. T + /j/ ➡️ /tʃ/ (Don\'t you ➡️ Don-cha / Can\'t you ➡️ Can-cha)',
        '3. Standard phonological assimilation across all spoken dialects'
      ],
      chalkHighlight: 'D + You = /dʒ/ [Did-ja] | T + You = /tʃ/ [Don-cha]'
    }
  },
  {
    id: 'srp_325',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قاعدة الثلاثيات البلاغية وإيقاع الخطباء (The Rhetorical Tricolon & Rule of Three)',
    titleEn: 'Oratorical Rhythm: The Power of Three in Historic Speeches',
    descAr: 'كيف تقرأ الخطب والنصوص القيادية باستخدام نغمة الثلاثيات الإيقاعية (صعود ↗ صعود ↗ ثم هبوط حاسم ↘).',
    descEn: 'Master the iconic tricolon cadence used by Churchill, Martin Luther King, and Steve Jobs.',
    speakingGoalAr: 'إلقاء فقرة ثلاثية المعاني بإيقاع تصاعدي يختتم بهبوط حاسم وملهم.',
    speakingGoalEn: 'Deliver a rhetorical tricolon with matching crescendo and definitive cadence closure.',
    keyPattern: {
      ruleAr: 'قاعدة الثلاثيات (Tricolon): العنصر الأول بنبرة صاعدة خفيفة ↗، العنصر الثاني بنبرة أعلى ↗، والعنصر الثالث هو الذروة ويهبط بحسم وثقل ↘.',
      ruleEn: 'The Tricolon Cadence: Item 1 (rising ↗) ➡️ Item 2 (higher peak ↗) ➡️ Item 3 (commanding fall ↘).',
      formula: '[Item 1 ↗] ⏸️ [Item 2 ↗↗] ⏸️ [Item 3 ↘ (Decisive Culmination)]'
    },
    practicalExamples: [
      {
        en: "We will innovate with courage ↗, build with integrity ↗, and lead with empathy. ↘",
        ar: 'سنبتكر بشجاعة ↗، ونبني بنزاهة ↗، ونقود بتعاطف. ↘',
        spokenNoteAr: 'لاحظ كيف تبني النغمة في العنصرين الأولين قبل أن تهبط بقوة في العنصر الأخير.'
      },
      {
        en: "Government of the people ↗, by the people ↗, for the people. ↘ (Lincoln)",
        ar: 'حكومة الشعب ↗، ومن الشعب ↗، ولأجل الشعب. ↘',
        spokenNoteAr: 'أشهر ثلاثية بلاغية في التاريخ الأمريكي الحديث.'
      },
      {
        en: "Stay hungry ↗, stay foolish. ↘",
        ar: 'ابق جائعاً للمعرفة ↗، ابق حراً مجازفاً. ↘',
        spokenNoteAr: 'إيقاع ثنائي متوازن شهير من خطاب ستيف جوبز.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Reading all three items with the same flat, monotonic cadence.",
        correct: "Build dynamic energy across items 1 and 2, then land with authority on item 3.",
        whyAr: 'غياب التدرج الإيقاعي يفقد الخطاب قوته البلاغية ويشعر المستمع بالملل.'
      }
    ],
    speakingChallenge: {
      promptAr: 'ألقِ هذه الثلاثية البلاغية لسارة بنبرة خطيب مفوه: "We dream big ↗, we work hard ↗, and we deliver excellence. ↘"!',
      promptEn: 'Deliver this leadership tricolon to Sara: "We dream big ↗, we work hard ↗, and we deliver excellence. ↘"!',
      saraQuestionAr: 'Let me hear your stage oratory! Deliver: "We dream big, we work hard, and we deliver excellence!"',
      saraQuestionEn: 'Let me hear your stage oratory! Deliver: "We dream big, we work hard, and we deliver excellence!"',
      recommendedResponseEn: "We dream big, we work hard, and we deliver excellence!"
    },
    quiz: [
      {
        questionAr: 'ما النغمة الصحيحة للعنصر الثالث والأخير في قاعدة الثلاثيات البلاغية (Tricolon)؟',
        questionEn: 'What is the correct pitch motion on the third, culminating element of a tricolon?',
        options: [
          "Rising high question pitch",
          "Decisive, grounded falling pitch ↘",
          "Whispering and fading away",
          "Silent stop"
        ],
        correctIndex: 1,
        explanationAr: 'العنصر الثالث في الثلاثية يختتم بهبوط حاسم (Falling pitch ↘) يرسخ الفكرة في وجدان الجمهور.'
      }
    ],
    whiteboardNotes: {
      title: 'The Rhetorical Rule of Three',
      pointsAr: [
        '1. العنصر الأول: نبرة تمهيدية صاعدة ↗',
        '2. العنصر الثاني: نبرة تصاعدية أعلى تشد الانتباه ↗↗',
        '3. العنصر الثالث: الذروة والختام الحاسم بنبرة هابطة عميقة ↘',
        'سر الخطباء والزعماء عبر التاريخ!'
      ],
      pointsEn: [
        '1. Element 1: Stepping stone (Rising ↗)',
        '2. Element 2: Tension builder (Higher rise ↗↗)',
        '3. Element 3: Resolution & authority (Commanding drop ↘)',
        'The timeless bedrock of magnetic stage presence'
      ],
      chalkHighlight: 'Item 1 ↗ ➡️ Item 2 ↗↗ ➡️ Item 3 ↘ (Decisive Impact)'
    }
  },
  {
    id: 'srp_326',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'فن السرد الصوتي والبودكاست (Podcast & Audiobook Narration Masterclass)',
    titleEn: 'Audio Narration Mastery: Pacing, Breath Support & Cinematic Voice',
    descAr: 'كيف تقرأ النصوص والروايات بصوت إذاعي دافئ وتستخدم الميكروفون باحترافية كمعلقي الوثائقيات والبودكاست.',
    descEn: 'Narrate audiobooks and podcast scripts with warm chest resonance and intimate pacing.',
    speakingGoalAr: 'تسجيل فقرة سردية من 4 أسطر لسارة بصوت دافئ متزن وتنفس حجابي كامل.',
    speakingGoalEn: 'Read a narrative passage demonstrating diaphragmatic breath support and vocal warmth.',
    keyPattern: {
      ruleAr: 'قواعد السرد الصوتي: 1) التنفس من الحجاب الحاجز 2) التحدث بنبرة الصدر (Chest voice) الدافئة 3) ترك مسافة 15 سم من المايك 4) النطق الشفهي الواضح دون تشنج.',
      ruleEn: 'The Podcaster’s Voice: Diaphragmatic breathing ➡️ Chest resonance ➡️ Micro-pauses for imagery.',
      formula: 'Deep Diaphragm Breath ➡️ Chest Resonance ➡️ Warm, Conversational Pacing'
    },
    practicalExamples: [
      {
        en: "Deep in the northern valley, silence wasn't just the absence of sound; it was a living presence.",
        ar: 'في أعماق الوادي الشمالي، لم يكن الصمت مجرد غياب للصوت؛ بل كان كائناً حياً حاضراً.',
        spokenNoteAr: 'لاحظ كيف تضفي النبرة الهادئة عمقاً سينمائياً على المشهد.'
      },
      {
        en: "Welcome back to another episode of The Mindset Protocol. Today, we decode the psychology of focus.",
        ar: 'أهلاً بكم مجدداً في حلقة جديدة من بروتوكول العقلية. اليوم، نفكك شفرة سيكولوجية التركيز.',
        spokenNoteAr: 'افتتاحية بودكاست دافئة وواثقة تأسر المستمع في أول 5 ثوانٍ.'
      },
      {
        en: "She paused at the doorway, knowing that turning that brass handle would alter everything.",
        ar: 'توقفت عند عتبة الباب، وهي تدرك أن إدارة ذلك المقبض النحاسي ستغير كل شيء.',
        spokenNoteAr: 'تلوين الصوت بتشويق هادئ يجعلك ترى المشهد بعين خيالك.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Speaking from the throat or nose with shallow, audible gasps for air.",
        correct: "Breathe deeply through your belly and project sound from your lower chest cavity.",
        whyAr: 'الصوت الأنفي المرتفع يرهق المستمع؛ صوت الصدر العميق مريح ويبعث على الثقة الفورية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة افتتاحية البودكاست بصوت إذاعي دافئ وتنفس هادئ من الصدر!',
      promptEn: 'Narrate this podcast intro to Sara with warm chest resonance!',
      saraQuestionAr: 'Give me your best studio podcast intro: "Welcome to tonight’s story: A journey through the stars." Ready?',
      saraQuestionEn: 'Give me your best studio podcast intro: "Welcome to tonight’s story: A journey through the stars." Ready?',
      recommendedResponseEn: "Welcome to tonight's story: A journey through the stars."
    },
    quiz: [
      {
        questionAr: 'من أين يجب أن ينبع الصوت الدافئ الرخيم في تسجيلات البودكاست والتعليق الصوتي؟',
        questionEn: 'Where should your vocal resonance be centered for warm, authoritative audio narration?',
        options: [
          "The nasal cavity (الأنف)",
          "The upper throat (أعلى الحلق)",
          "The chest cavity and diaphragmatic support (تجويف الصدر والحجاب الحاجز)",
          "The teeth"
        ],
        correctIndex: 2,
        explanationAr: 'الصوت الإذاعي الدافئ ينبع من تجويف الصدر مع دعم تنفسي عميق من الحجاب الحاجز.'
      }
    ],
    whiteboardNotes: {
      title: 'Voiceover & Podcast Mastery',
      pointsAr: [
        '1. نبرة الصدر (Chest Voice): صوت دافئ رخيم يمنح راحة للمستمع',
        '2. التنفس الحجابي: هواء عميق يمنع انقطاع النَفَس المفاجئ',
        '3. المسافة من المايك: مسافة شبر (15-20 سم) بزاوية 45 درجة',
        '4. الابتسامة الصوتية: ابتسم برفق ليسمع الجمهور دفء صوتك'
      ],
      pointsEn: [
        '1. Chest Resonance: Low, grounded acoustic richness',
        '2. Diaphragmatic Breath: Silent, sustained power',
        '3. Mic Technique: 6 inches away at a 45-degree angle',
        '4. Vocal Smile: Subtly smiling adds audible warmth'
      ],
      chalkHighlight: 'Belly Breath ➡️ Chest Resonance ➡️ Warm Cinematic Delivery'
    }
  },
  {
    id: 'srp_327',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'المقارنة بين اللهجة البريطانية والأمريكية (RP vs General American)',
    titleEn: 'Accent Navigation: Received Pronunciation (UK) vs General American (US)',
    descAr: 'كيف تفرق بين اللهجتين بوعي صوتي كامل: حرف الـ R في نهاية الكلمات، وصوت الألف في Bath/Ask، وحرف T.',
    descEn: 'Master key phonetic divergences between British RP and General American.',
    speakingGoalAr: 'قراءة جملة واحدة باللهجة الأمريكية ثم إعادة قراءتها بالنبرة البريطانية.',
    speakingGoalEn: 'Contrast rhoticity (US) vs non-rhoticity (UK) across representative phonetic pairs.',
    keyPattern: {
      ruleAr: 'الفروق الصوتية الجوهرية: 1) اللهجة الأمريكية (Rhotic): تنطق كل R في الكلمة (Car, Water). 2) اللهجة البريطانية (Non-rhotic): تسقط الـ R في النهاية وتمد المتحرك (Caa, Wota). 3) صوت A في Bath: أمريكي /æ/ (باث)، بريطاني /ɑː/ (بااث عميقة).',
      ruleEn: 'US = Rhotic (pronounce all R\'s) + Flap T + flat /æ/ in "bath". UK = Non-rhotic (drop post-vocalic R) + crisp /t/ + broad /ɑː/ in "bath".',
      formula: 'Car: US [kɑːr] 🆚 UK [kɑː] | Water: US [wɑːdər] 🆚 UK [wɔːtə]'
    },
    practicalExamples: [
      {
        en: "Can I have a glass of water after the bath? (US: glass /glæs/, water /wader/, bath /bæθ/)",
        ar: 'هل يمكنني الحصول على كأس ماء بعد الاستحمام؟ (بالأمريكي: ألف مسطحة و Flap T).',
        spokenNoteAr: 'في الأمريكي: glass و bath تنطقان بنفس صوت cat.'
      },
      {
        en: "Can I have a glass of water after the bath? (UK: glass /glɑːs/, water /wɔːtə/, bath /bɑːθ/)",
        ar: 'هل يمكنني الحصول على كأس ماء بعد الاستحمام؟ (بالبريطاني: ألف عميقة و T حادة دون نطق r).',
        spokenNoteAr: 'في البريطاني: glass و bath تأخذان صوتاً عميقاً، والـ r في water تسقط تماماً.'
      },
      {
        en: "Better car in the park. (US: hard R's everywhere 🆚 UK: soft elongated vowels).",
        ar: 'سيارة أفضل في الحديقة العامة.',
        spokenNoteAr: 'لاحظ كيف تحدد الـ R هوية اللهجة في ثانية واحدة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Mixing accents randomly within the same sentence (e.g. British 'bath' with American 'water').",
        correct: "Choose one consistent phonetic dialect and stick to its conventions.",
        whyAr: 'الخلط العشوائي للأصوات يشتت المستمع؛ الاتساق الصوتي هو جوهر الاحترافية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اختر لهجة (أمريكية أو بريطانية) واقرأ الجملة لسارة بالتزام صوتي كامل: "The doctor parked his car near the park"!',
      promptEn: 'Read to Sara in your preferred dialect (US or UK) maintaining total consistency!',
      saraQuestionAr: 'Show me your dialect consistency: "The doctor parked his car near the park"!',
      saraQuestionEn: 'Show me your dialect consistency: "The doctor parked his car near the park"!',
      recommendedResponseEn: "The doctor parked his car near the park!"
    },
    quiz: [
      {
        questionAr: 'ماذا تعني خاصية "Non-rhotic" في اللهجة البريطانية القياسية (RP)؟',
        questionEn: 'What does "non-rhotic" mean in British Received Pronunciation?',
        options: [
          "It never uses vowels.",
          "Post-vocalic /r/ is dropped unless followed directly by a vowel.",
          "People shout every word.",
          "No consonants exist."
        ],
        correctIndex: 1,
        explanationAr: 'خاصية Non-rhotic تعني إسقاط نطق حرف R الواقع بعد حرف متحرك في نهاية الكلمة مثل (Car ➡️ Caa).'
      }
    ],
    whiteboardNotes: {
      title: 'US vs UK Phonetic Comparison',
      pointsAr: [
        '1. نطق الـ R: أمريكي (ينطق كل R بوضوح) 🆚 بريطاني (تسقط الـ R بعد المتحرك)',
        '2. حرف الـ T: أمريكي (Flap T سريعة كالدال) 🆚 بريطاني (T حادة واضحة)',
        '3. كلمات Bath/Ask/Fast: أمريكي (ألف مسطحة /æ/) 🆚 بريطاني (ألف عميقة /ɑː/)',
        'نصيحة سارة: اختر لهجة واحدة والتزم بها بثبات!'
      ],
      pointsEn: [
        '1. Rhoticity: US pronounces all R\'s 🆚 UK drops post-vocalic R',
        '2. The T: US Flap T [ɾ] 🆚 UK crisp aspirated [tʰ]',
        '3. Trap-Bath Split: US flat /æ/ 🆚 UK broad /ɑː/',
        'Consistency is the key to accent authenticity'
      ],
      chalkHighlight: 'US (Rhotic + Flap T) 🆚 UK (Non-Rhotic + Crisp T)'
    }
  },
  {
    id: 'srp_328',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'تخفيف الكلمات الوظيفية والصيغ الضعيفة (Weak Forms of Function Words)',
    titleEn: 'Weak Forms: Can vs Can\'t, To, For, At, From in Fast Speech',
    descAr: 'كيف تفرق بين Can المثبتة (تنطق كشوا ضعيفة kən) و Can\'t المنفية (تنطق قوية ومشددة)، ولماذا تختزل كلمات مثل To و For.',
    descEn: 'Master weak forms: "can" /kən/ vs "can\'t" /kænt/, "to" /tə/, "for" /fər/.',
    speakingGoalAr: 'قراءة جملة تثبت الفرق الصوتي الدقيق بين Can المثبتة و Can\'t المنفية دون أي التباس.',
    speakingGoalEn: 'Demonstrate weak form reduction in affirmative modals vs stressed negative contractions.',
    keyPattern: {
      ruleAr: 'في الإنجليزية: Can المثبتة تكون ضعيفة جداً وتنطق /kən/. أما Can\'t المنفية فتكون مشددة وقوية وتستغرق وقتاً أطول /kænt/.',
      ruleEn: 'Affirmative "can" is reduced to weak form /kən/ with a Schwa. Negative "can\'t" is stressed with a full vowel /kænt/.',
      formula: 'Affirmative: I can [kən] do it 🆚 Negative: I CAN\'T [kænt] do it'
    },
    practicalExamples: [
      {
        en: "I can meet you at three, but I can't stay long. (/kən/ vs /kænt/)",
        ar: 'أستطيع مقابلتك عند الثالثة (can ضعيفة kən)، لكن لا أستطيع البقاء طويلاً (can\'t مشددة وقوية).',
        spokenNoteAr: 'انتبه كيف تختلف مدة ونبرة can عن can\'t.'
      },
      {
        en: "This gift is for you, from Sarah. ➡️ Sounds like: [fər you, frəm Sarah]",
        ar: 'هذه الهدية لك، من سارة.',
        spokenNoteAr: 'for تتحول إلى fər، و from تتحول إلى frəm.'
      },
      {
        en: "We need to go to London. ➡️ Sounds like: [tə go tə London]",
        ar: 'نحن بحاجة للذهاب إلى لندن.',
        spokenNoteAr: 'to تتحول إلى صوت /tə/ خفيف وسريع جداً.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Stressing 'can' in positive sentences, making listeners think you said 'can't'.",
        correct: "Keep positive 'can' quick and weak (/kən/); only stress 'can't'.",
        whyAr: 'الضغط على can الإيجابية يربك المتحدث الأصلي ويجعله يظن أنك ترفض أو تنفي!'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقرأ لسارة مع التمييز الصوتي بين can الضعيفة و can\'t المشددة: "I can swim, but I can\'t fly"!',
      promptEn: 'Read aloud contrasting weak "can" with stressed "can\'t": "I can swim, but I can\'t fly"!',
      saraQuestionAr: 'Show me your weak form control: "I can swim, but I can\'t fly"!',
      saraQuestionEn: 'Show me your weak form control: "I can swim, but I can\'t fly"!',
      recommendedResponseEn: "I can swim, but I can't fly!"
    },
    quiz: [
      {
        questionAr: 'كيف يُنطق الفعل المساعد "Can" في الجملة المثبتة "I can help you" في الحديث السريع؟',
        questionEn: 'How is "can" pronounced in the positive sentence "I can help you"?',
        options: [
          "With a strong stressed vowel: /kæn/",
          "With a weak Schwa sound: /kən/",
          "It is completely silent",
          "Like 'cone'"
        ],
        correctIndex: 1,
        explanationAr: 'في الجمل المثبتة، يُنطق "can" بصيغته الضعيفة المخففة بصوت الشوا: /kən/.'
      }
    ],
    whiteboardNotes: {
      title: 'The Weak Forms Compendium',
      pointsAr: [
        '1. Can المثبتة: ضعيفة وسريعة ⬅️ /kən/ (I kən do it)',
        '2. Can\'t المنفية: مشددة وقوية ⬅️ /kænt/ (I CAN\'T do it)',
        '3. To تتحول إلى /tə/ (Ready tə go)',
        '4. For تتحول إلى /fər/ (Good fər you)',
        'تخفيف هذه الكلمات هو سر السرعة والطلاقة الأمريكية'
      ],
      pointsEn: [
        '1. Positive "can" = Weak /kən/ (never stressed)',
        '2. Negative "can\'t" = Strong /kænt/ (always stressed)',
        '3. "To" collapses to /tə/',
        '4. "For" collapses to /fər/',
        'Essential for listening comprehension and spoken speed'
      ],
      chalkHighlight: 'Positive: I [kən] do it 🆚 Negative: I CAN\'T [kænt]'
    }
  },
  {
    id: 'srp_329',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قراءة الشعر والنثر الأدبي الرفيع (Poetic Meter, Imagery & Emotional Resonance)',
    titleEn: 'Literary Resonance: Reading Poetry & Prose with Soul and Meter',
    descAr: 'كيف تقرأ قصائد ونصوص كبار الأدباء (مثل روبرت فروست ومايا أنجيلو) بإيقاع شاعري يجسد الوزن والمعنى.',
    descEn: 'Interpret classic verse and elevated literature with poetic pacing and imagery.',
    speakingGoalAr: 'إلقاء مقطع من قصيدة "The Road Not Taken" بتلوين صوتي شاعري ووقفات تأملية.',
    speakingGoalEn: 'Recite a stanza of literary verse honoring iambic rhythm and metaphorical pauses.',
    keyPattern: {
      ruleAr: 'في قراءة الشعر: لا تقف في نهاية كل سطر تلقائياً؛ بل اتبع علامات الترقيم (Enjambment). دع الإيقاع يتدفق كأمواج البحر مع تمديد الحروف المتحركة في الكلمات ذات العمق العاطفي.',
      ruleEn: 'Poetic reading honors enjambment: read across line breaks unless punctuation dictates a pause; stretch expressive vowels.',
      formula: 'Rhythmic Flow ➡️ Honor Enjambment ➡️ Resonate on Imagery Words'
    },
    practicalExamples: [
      {
        en: "Two roads diverged in a yellow wood, / And sorry I could not travel both...",
        ar: 'طريقان افترقا في غابة صفراء، / وأسفي أنني لم أستطع السير في كليهما...',
        spokenNoteAr: 'وقفة هادئة بعد wood تمنح المستمع فرصة لرؤية الغابة الخريفية.'
      },
      {
        en: "I took the one less traveled by, / And that has made all the difference.",
        ar: 'اخترت الطريق الأقل وطأً وسلوكاً، / وذلك هو ما صنع الفارق كله.',
        spokenNoteAr: 'نبرة ختامية حكيمة وهادئة تستقر في الوجدان.'
      },
      {
        en: "Hope is the thing with feathers / that perches in the soul... (Emily Dickinson)",
        ar: 'الأمل هو ذلك الكائن ذو الريش / الذي يحط في أعماق الروح...',
        spokenNoteAr: 'إلقاء رقيق وخفيف يجسد فكرة الريش والطيران.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Stopping mechanically at the end of every line in a poem even when there is no comma or period.",
        correct: "Read seamlessly through line breaks (enjambment) and only pause at true punctuation marks.",
        whyAr: 'الوقوف الآلي عند نهاية كل بيت شعري يقطع المعنى ويفسد الحبكة الشعرية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'ألقِ البيتين الأخيرين من قصيدة فروست لسارة بنبرة تأملية عميقة: "I took the one less traveled by, and that has made all the difference"!',
      promptEn: 'Recite Frost’s iconic lines to Sara with poetic depth and reflection!',
      saraQuestionAr: 'Let me hear your poetic soul: "I took the one less traveled by, and that has made all the difference"!',
      saraQuestionEn: 'Let me hear your poetic soul: "I took the one less traveled by, and that has made all the difference"!',
      recommendedResponseEn: "I took the one less traveled by, and that has made all the difference."
    },
    quiz: [
      {
        questionAr: 'ماذا يسمى استمرار الجملة الشعرية عبر نهاية السطر دون وقفة في علم العروض الإنجليزي؟',
        questionEn: 'What is the literary term for continuing a sentence across a line break without a pause?',
        options: [
          "Alliteration",
          "Enjambment (التضمين العروضي)",
          "Metaphor",
          "Hyperbole"
        ],
        correctIndex: 1,
        explanationAr: 'مصطلح "Enjambment" يصف تدفق المعنى والجملة الشعرية عبر نهاية السطر إلى السطر التالي دون توقف.'
      }
    ],
    whiteboardNotes: {
      title: 'The Poetry Recitation Compass',
      pointsAr: [
        '1. علامات الترقيم هي البوصلة: قف عند الفاصلة والنقطة، لا عند نهاية السطر الآلي',
        '2. الكلمات التصويرية (Imagery): امنح كلمات مثل "diverged" و "yellow wood" زمناً أطول',
        '3. الموسيقى الباطنية: دع الكلام ينساب دون تكلف مصطنع',
        'القراءة الأدبية تسمو بروحك اللغوية إلى أعلى الآفاق'
      ],
      pointsEn: [
        '1. Punctuation governs pauses, not line breaks (Enjambment)',
        '2. Linger on evocative sensory imagery (wood, frost, feathers)',
        '3. Let the natural rhythm pulse beneath the meaning',
        'Elevates vocabulary and stylistic sensitivity to C1+'
      ],
      chalkHighlight: 'Punctuation Governs ➡️ Enjambment Flows ➡️ Imagery Resonates'
    }
  },
  {
    id: 'srp_330',
    pillarId: 'reading',
    pillarNameAr: 'القراءة التعبيرية والنطق الصوتي',
    pillarNameEn: 'Expressive Reading & Pronunciation Lab',
    pillarIcon: '📖',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'إتقان الإلقاء والخطابة العالمية (Masterclass in Global Keynote Oratory)',
    titleEn: 'The TED-Style Keynote: Vocal Range, Dramatic Whispers & Stadium Resonance',
    descAr: 'كيف تقرأ وتلقي خطاباً ملهماً أمام الآلاف بأسلوب TED: التدرج من الهمس الحميمي إلى الهتاف القوي.',
    descEn: 'Command large auditorium stages with dynamic vocal dynamics, contrast, and thunderous resonance.',
    speakingGoalAr: 'إلقاء ختام خطاب TED في 60 ثانية لسارة متدرجاً من الهدوء الحميمي إلى الذروة الحماسية.',
    speakingGoalEn: 'Deliver a powerful 60-second speech excerpt demonstrating total vocal variety and stadium projection.',
    keyPattern: {
      ruleAr: 'قوس الإلقاء المسرحي: ابدأ بهمهمة حميمية قريبة من المايك ➡️ ارفع الإيقاع والصوت في صلب الفكرة ➡️ اختم بوقفة صامتة ونداء حاسم للعمل (Call to Action).',
      ruleEn: 'The Keynote Vocal Arc: Intimate conversational whisper ➡️ Dynamic crescendo ➡️ Power pause ➡️ Resonant rallying call.',
      formula: 'Intimate Story ➡️ Escalating Volume & Pace ➡️ 2-Second Silence ➡️ Resonant Final Declaration'
    },
    practicalExamples: [
      {
        en: "It starts with a whisper... [intimate, soft volume]... a quiet realization that the status quo is no longer acceptable.",
        ar: 'يبدأ الأمر بهمسة... [صوت منخفض وهادئ جداً]... إدراك صامت بأن الوضع الراهن لم يعد مقبولاً بعد الآن.',
        spokenNoteAr: 'شد انتباه الآلاف بالهمس؛ فالهمس يجبر القاعة بأكملها على حبس أنفاسها.'
      },
      {
        en: "And that whisper turns into a spark, and that spark ignites a revolution! [building crescendo]",
        ar: 'وتتحول تلك الهمسة إلى شرارة، وتلك الشرارة تشعل ثورة! [تصاعد صوتي وحماسي].',
        spokenNoteAr: 'ارتفاع تدريجي في النبرة والطاقة الصوتية.'
      },
      {
        en: "Because the future... [2-second pause]... belongs entirely to those who dare to build it today.",
        ar: 'لأن المستقبل... [وقفة صامتة لثانيتين]... ملك خالص لأولئك الذين يجرؤون على بنائه اليوم.',
        spokenNoteAr: 'ختام حاسم مهيب يستقر في ذاكرة الجمهور للأبد.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Shouting constantly at 100% volume for 15 minutes.",
        correct: "Great speakers contrast extreme quietness with sudden passionate peaks.",
        whyAr: 'الصراخ المستمر يصم الآذان؛ التباين الصوتي بين الهدوء والقوة هو ما يصنع السحر.'
      }
    ],
    speakingChallenge: {
      promptAr: 'أنت على مسرح TED العالمي! ألقِ ختام خطابك لسارة مع استخدام تباين الصوت والوقفة الحاسمة!',
      promptEn: 'You are on the TED stage! Deliver the closing declaration to Sara with full vocal range!',
      saraQuestionAr: 'The spotlight is on you! Deliver your final keynote declaration to the world audience!',
      saraQuestionEn: 'The spotlight is on you! Deliver your final keynote declaration to the world audience!',
      recommendedResponseEn: "Change doesn't wait for permission. [Pause] It begins with a single bold voice. Let that voice be yours!"
    },
    quiz: [
      {
        questionAr: 'ما التكتيك الصوتي الأكثر قدرة على شد انتباه جمهور مسرحي كامل في اللحظات الحساسة؟',
        questionEn: 'Which vocal technique most powerfully commands an entire auditorium’s undivided attention?',
        options: [
          "Lowering your volume to an intimate, clear whisper backed by a power pause.",
          "Screaming as loud as possible.",
          "Reading from your notes without looking up.",
          "Coughing into the microphone."
        ],
        correctIndex: 0,
        explanationAr: 'خفض الصوت إلى همس واضح يتبعه وقفة صامتة يُجبر آلاف المستمعين على التركيز والانصات التام.'
      }
    ],
    whiteboardNotes: {
      title: 'The Master Keynote Vocal Arc',
      pointsAr: [
        '1. الهمس الحميمي (Intimate Whisper): يكسر الجدار ويجذب انتباه الجمهور للسر',
        '2. التصاعد الصوتي (The Crescendo): يبني الطاقة والحماس خطوة بخطوة',
        '3. الوقفة الصامتة المهيبة (The Power Pause): تمنح الفكرة وقتاً لترسخ في القلوب',
        '4. الإعلان الحاسم (The Final Anthem): هبوط نبري حازم يختم الخطاب بخلود'
      ],
      pointsEn: [
        '1. Intimate Whisper: Draws the audience into a shared secret',
        '2. The Crescendo: Escalates tempo and vocal resonance',
        '3. The Power Pause: 2 seconds of pure silence builds immense anticipation',
        '4. The Final Declaration: Definitive, grounded, inspiring closure'
      ],
      chalkHighlight: 'Intimate Whisper ➡️ Building Crescendo ➡️ Power Pause ➡️ Resonant Anthem'
    }
  }
];
