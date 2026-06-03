export interface AiTool {
  name: string;
  url: string;
  description: string;
  descriptionEn: string;
  category: string;
}

export const AI_TOOLS_DATA: AiTool[] = [
  // 1. Text & Writing (النصوص والكتابة)
  {
    name: "ChatGPT",
    url: "chatgpt.com",
    description: "المساعد الأشهر في العالم للنصوص والحوار، ممتاز في الإبداع وتوليد الأفكار.",
    descriptionEn: "The world's most popular tool for general chat, creative writing, and text drafting.",
    category: "writer"
  },
  {
    name: "Claude",
    url: "claude.ai",
    description: "نموذج فائق الذكاء من Anthropic، يتفوق في صياغة المحتوى الطويل والدقة العلمية.",
    descriptionEn: "Deep reasoning model from Anthropic, outstanding for long-form prose and analysis.",
    category: "writer"
  },
  {
    name: "Gemini",
    url: "gemini.google.com",
    description: "مساعد جوجل الفائق المتصل بالإنترنت ومدمج بخدمات جيميل ومستندات جوجل.",
    descriptionEn: "Google's flagship AI assistant, deeply integrated with Search and Workspace services.",
    category: "writer"
  },
  {
    name: "Perplexity",
    url: "perplexity.ai",
    description: "محرك بحث مدمج يكتب الإجابة مع توثيق المصادر وروابط المواقع الأصلية.",
    descriptionEn: "Conversational answer engine that searches the web in real-time and provides links.",
    category: "writer"
  },
  {
    name: "Jasper AI",
    url: "jasper.ai",
    description: "منصة متكاملة لكتابة المقالات الطويلة والإعلانات وتطوير تدوينات الشركات المتميزة.",
    descriptionEn: "Professional copywriting platform tailor-made for blogging, SEO, and enterprise copy.",
    category: "writer"
  },
  {
    name: "Copy.ai",
    url: "copy.ai",
    description: "مساعد كتابة قوي يُنتج إعلانات تسويقية واقتراحات سريعة لشبكات التواصل الاجتماعي.",
    descriptionEn: "AI writing assistant optimized for marketing copy, emails, and social media captions.",
    category: "writer"
  },
  {
    name: "Rytr",
    url: "rytr.me",
    description: "مساعد كتابة بسيط يدعم اللغة العربية بشكل فائق لتدوين العناوين والقصيرة.",
    descriptionEn: "Budget-friendly writer for quick taglines, emails, and compact text blocks.",
    category: "writer"
  },
  {
    name: "NovelAI",
    url: "novelai.net",
    description: "ذكاء اصطناعي متخصص في تأليف القصص الخيالية والروايات الأدبية بأسلوب مخصص.",
    descriptionEn: "AI author tool trained to simulate literature styles for creative fiction writers.",
    category: "writer"
  },
  {
    name: "Quillbot",
    url: "quillbot.com",
    description: "أداة ذكية متميزة لإعادة صياغة الجمل والفقرات وتطوير المفردات الإنتاجية.",
    descriptionEn: "Paraphrasing tool optimized to reword essays, strengthen sentences, and simplify text.",
    category: "writer"
  },
  {
    name: "Notion AI",
    url: "notion.so/product/ai",
    description: "مساعد نصوص مدمج داخل صفحات نوتشن للمساعدة في التحرير والتلخيص الفوري.",
    descriptionEn: "AI copilot embedded directly inside Notion workspaces to summarize and outline notes.",
    category: "writer"
  },

  // 2. Images & Art (الصور والفن)
  {
    name: "Midjourney",
    url: "midjourney.com",
    description: "الملك غير المتوج للصور الفنية ذات الجودة السينمائية والتفاصيل الخيالية الدقيقة.",
    descriptionEn: "The undisputed gold standard for cinematic digital art and highly detailed visual styles.",
    category: "image"
  },
  {
    name: "DALL-E 3",
    url: "openai.com/dall-e-3",
    description: "مطور الصور من OpenAI، يتميز بفهم فائق للأوامر المعقدة وكتابة الكلمات داخل الصور.",
    descriptionEn: "OpenAI's visual generator, best at following rich prompts and embedding exact text labels.",
    category: "image"
  },
  {
    name: "Stable Diffusion",
    url: "stability.ai",
    description: "محرك مفتوح المصدر يمنح المستخدم تحكماً نهائياً وتخصيصاً كاملاً في تفاصيل التصميم.",
    descriptionEn: "Open-source image model giving creative professionals ultimate localized control.",
    category: "image"
  },
  {
    name: "Leonardo AI",
    url: "leonardo.ai",
    description: "منصة متكاملة لتوليد الصور والشخصيات الروائية وتحتوي على العشرات من الأنماط المدمجة.",
    descriptionEn: "Feature-rich platform hosting dozens of fine-tuned models for assets and gaming characters.",
    category: "image"
  },
  {
    name: "Adobe Firefly",
    url: "firefly.adobe.com",
    description: "أداة أدوبي الرسمية لتوليد الصور والمستندة إلى مكتبة مرخصة تجارياً بالكامل وآمنة للأعمال.",
    descriptionEn: "Adobe's commercial-safe AI art visualizer, integrated into Photoshop and Illustrator.",
    category: "image"
  },
  {
    name: "Canva AI",
    url: "canva.com",
    description: "أدوات الذكاء الاصطناعي المدمجة بكانفا لتخليق الصور وتصميم عروض ليلية بسرعة مذهلة.",
    descriptionEn: "AI-powered designer plugins within Canva for instant asset generation and slides.",
    category: "image"
  },
  {
    name: "Bing Image Creator",
    url: "copilot.microsoft.com",
    description: "أداة مجانية وسريعة للغاية من ميكروسوفت لتوليد اللوحات والشخصيات مع دعم عربي رائع.",
    descriptionEn: "Free image creation assistant by Microsoft Copilot, powered by DALL-E, accessible to all.",
    category: "image"
  },
  {
    name: "Photoroom",
    url: "photoroom.com",
    description: "ممحاة ومعدل صور احترافي يزيل الخلفيات بالكامل للعطور والمنتجات ويعلق تصاميم جذابة.",
    descriptionEn: "Industry-leading background remover and product mock visualizer for online commerce.",
    category: "image"
  },
  {
    name: "Freepik AI",
    url: "freepik.com/ai",
    description: "محرك توليد رسومات متجهة وتصاميم فوتوغرافية من مكتبة فريبك الشهيرة للتصميم الأسري.",
    descriptionEn: "In-browser prompt generator producing production-ready vectors and layouts.",
    category: "image"
  },
  {
    name: "Craiyon",
    url: "craiyon.com",
    description: "مولد صور كرتونية وتبسيطية تاريخية مجيئاً من DALL-E Mini لتوليد أفكار مرحة بلا حدود.",
    descriptionEn: "Ad-supported, unlimited quick prototype drawer perfect for testing child-like ideas.",
    category: "image"
  },

  // 3. Video & Animation (الفيديو والتحريك)
  {
    name: "Runway Gen-3",
    url: "runwayml.com",
    description: "أحد أقوى مسارح الذكاء الاصطناعي السينمائي لابتكار فيديو عالي الدقة ومقاطع درامية تفاعلية.",
    descriptionEn: "State-of-the-art cinematic engine for professional camera movements and effects.",
    category: "video"
  },
  {
    name: "Luma Dream Machine",
    url: "lumalabs.ai/dream-machine",
    description: "أداة لتوليد فيديوهات فائقة الواقعية من نصوص أو صور مع الحفاظ على وجوه الشخصيات والفيزياء.",
    descriptionEn: "Realistic 5-second video generator prioritizing accurate physical motions and consistency.",
    category: "video"
  },
  {
    name: "Pika Labs",
    url: "pika.art",
    description: "مولد ومعدل مقاطع أنيميشن وفيديو كرتوني بطريقة مبهجة، مع خيارات تحريك عناصر معينة بالصورة.",
    descriptionEn: "Frictionless text-to-video animator best at stylized cartoon characters and controlled details.",
    category: "video"
  },
  {
    name: "HeyGen",
    url: "heygen.com",
    description: "منصة تخليق مذيعين رقميين يتكلمون أي لغة بملامح وجه حية وحركة شفاه متطابقة تماماً.",
    descriptionEn: "Eerily realistic presenter avatar engine that translates videos and lipsyncs seamlessly.",
    category: "video"
  },
  {
    name: "Synthesia",
    url: "synthesia.io",
    description: "الرائد المؤسساتي لتوليد المذيعين والشروحات التعليمية الطويلة لفرق التطوير والشركات المرموقة.",
    descriptionEn: "Enterprise learning platform to construct continuous video trainers with virtual hosts.",
    category: "video"
  },
  {
    name: "Sora",
    url: "openai.com/sora",
    description: "نموذج الفيديو الثوري من OpenAI القادر على تخليق عوالم كاملة متسقة ثلاثية الأبعاد.",
    descriptionEn: "OpenAI's groundbreaking scene simulator that compiles physics and cinema for up to 60s.",
    category: "video"
  },
  {
    name: "PixVerse",
    url: "pixverse.ai",
    description: "لتحويل الأفكار والصور العائلية إلى لقطات ومقاطع فيديو عالية النعومة مع موسيقى مدمجة.",
    descriptionEn: "Dynamic generator converting text and static drawings into lively video assets.",
    category: "video"
  },
  {
    name: "Kling AI",
    url: "klingai.com",
    description: "محرك قوي جداً يولد مشاهد سينمائية طويلة ومرنة للغاية في حركة الأطراف البشرية والسيارات.",
    descriptionEn: "Powerful engine delivering expansive video generations with fluid motion dynamics.",
    category: "video"
  },
  {
    name: "Kaiber AI",
    url: "kaiber.ai",
    description: "مولد فيديو يركب أنماط الرسوم الزيتية والخيال والفايبر ويثبتها في الفيديوهات الحية والموسيقى.",
    descriptionEn: "Creative platform that paints frames into deep, immersive cyberpunk and cartoon stories.",
    category: "video"
  },
  {
    name: "Viggle AI",
    url: "viggle.ai",
    description: "محرك رائع يتيح لك تركيب ملامح وحركات شخصية ثلاثية الأبعاد من صورة واحدة ثابتة لترقص وتتحرك.",
    descriptionEn: "Fun character animation engine that applies realistic body movements to a static person photo.",
    category: "video"
  },

  // 4. Audio & Music (الصوت والموسيقى)
  {
    name: "Suno",
    url: "suno.com",
    description: "أداة لتوليد الأناشيد العائلية البديعة والأناشيد والموسيقى بكلمات ومطربين من شتى اللهجات.",
    descriptionEn: "Popular music generator that writes vocals, instruments, and melodies based on simple prompts.",
    category: "audio"
  },
  {
    name: "Udio",
    url: "udio.com",
    description: "منصة توليد موسيقى فائقة اللمعان والنقاء الصوتي، رائعة في إنتاج الإيقاعات الفنية المتقدمة.",
    descriptionEn: "High-fidelity audio editor producing crisp instrumental backing and professional songs.",
    category: "audio"
  },
  {
    name: "ElevenLabs",
    url: "elevenlabs.io",
    description: "الرائد العالمي لمولدات الصوت وقارئ الكتب الرقمية الذي يطابق نبرة المشاعر الحقيقية.",
    descriptionEn: "World leader in emotional text-to-speech synthetic voicing and custom cloning.",
    category: "audio"
  },
  {
    name: "Murf.ai",
    url: "murf.ai",
    description: "أداة متخصصة لتسجيل التعليق الصوتي الاحترافي للعروض التوعوية والفيديوهات الأكاديمية.",
    descriptionEn: "Professional voiceover platform tailored for product tutorials, podcasts, and training.",
    category: "audio"
  },
  {
    name: "Voice.ai",
    url: "voice.ai",
    description: "مغير صوت خارق ومثالي للألعاب والمزاح العائلي يغير صوتك فورياً لأي مشهور أو كرتون في ثوانٍ.",
    descriptionEn: "Real-time AI voice changer featuring thousands of customized community avatars.",
    category: "audio"
  },
  {
    name: "Podcastle",
    url: "podcastle.ai",
    description: "استوديو مدمج لتسجيل وتحرير البودكاست الرقمي ورفع مستويات ونقاء الصوت بلمسة واحدة.",
    descriptionEn: "Web-based podcast studio specializing in micro-editing, transcription, and noise removal.",
    category: "audio"
  },
  {
    name: "Adobe Podcast",
    url: "podcast.adobe.com",
    description: "المعزز السحري للصوت المزعج، يحول أي تسجيل هاتف عادي بجودة ميكروفون استوديو مغلق مجاناً.",
    descriptionEn: "Magical audio enhancer converting noisy room micro recordings into studio quality.",
    category: "audio"
  },
  {
    name: "Resemble AI",
    url: "resemble.ai",
    description: "ذكاء معني بنمذجة وتوليف الأصوات المعقدة وترجمتها بمختلف نبرات العاطفة المخصصة.",
    descriptionEn: "Pro voice cloning platform focused on emotional range, safety checks, and translations.",
    category: "audio"
  },
  {
    name: "Soundraw",
    url: "soundraw.co",
    description: "أداة توليد مقاطع موسيقية تصويرية آمنة لحسابات اليوتيوب والوسائط الاجتماعية دون حقوق ملكية.",
    descriptionEn: "Royalty-free music generator allowing users to configure duration, speed, and energy.",
    category: "audio"
  },
  {
    name: "Voicify AI",
    url: "voicify.ai",
    description: "منصة تتيح لك تخليق أغاني كاملة بأصوات فنانينك أو شخصياتك الكرتونية المفضلة.",
    descriptionEn: "Create song covers using AI-powered musical voice model mappings.",
    category: "audio"
  },

  // 5. Productivity & Office (الإنتاجية والمكتب)
  {
    name: "Notion",
    url: "notion.so",
    description: "منصة التخطيط العائلي وإدارة المهام والواجبات المدمجة بأدوات الكفاح الذهني والتلخيص.",
    descriptionEn: "The ultimate organizer for task lists, family wikis, and structured homework projects.",
    category: "office"
  },
  {
    name: "Gamma App",
    url: "gamma.app",
    description: "بشكل سحري، اكتب فكرة واحدة وسيقوم غاما بتصميم عرض تقديمي كامل بالتصاميم والصور المرافقة.",
    descriptionEn: "Generates beautiful slides, documents, or websites in seconds from single-sentence prompts.",
    category: "office"
  },
  {
    name: "Beautiful.ai",
    url: "beautiful.ai",
    description: "تصميم بوربوينت وعروض مع ترتيب ذكي تلقائي لكل صورة وعنصر تضعه، دون تعب التعديلات اليدوية.",
    descriptionEn: "Smart template-based slide decks that auto-resize and balance as you add content.",
    category: "office"
  },
  {
    name: "Otter.ai",
    url: "otter.ai",
    description: "المستمع السحري للاجتماعات، يكتب كل كلمة تقال ويصنف المتحدثين ويلخص أهم نقاط الحوار المباشر.",
    descriptionEn: "AI meeting note taker that transcribes conversations and pulls action items automatically.",
    category: "office"
  },
  {
    name: "Goblin Tools",
    url: "goblin.tools",
    description: "رائع ودافئ للعقل! يفصّل أي مهمة عامة صعبة ومبهمة إلى عشرات الخطوات الفرعية الصالحة للإنجاز.",
    descriptionEn: "A series of tiny, warm widgets designed to break down overwhelming tasks into bite-sized subtasks.",
    category: "office"
  },
  {
    name: "Fathom AI",
    url: "fathom.video",
    description: "مساعد زووم وجوجل ميت المجاني لتسجيل الحصص واللقاءات وتلخيصها في خمس نقاط فورياً.",
    descriptionEn: "Free zoom recorder that generates concise structured summaries of classrooms and chats.",
    category: "office"
  },
  {
    name: "Taskade",
    url: "taskade.com",
    description: "منصة عائلية للمهام والملاحظات المترابطة مع وكلاء ذكاء اصطناعي تفاعليين لإنجاز العمل سوياً.",
    descriptionEn: "A nested productivity ecosystem where multi-agent structures run lists and boards.",
    category: "office"
  },
  {
    name: "Fireflies AI",
    url: "fireflies.ai",
    description: "المساعد المكتبي المتميز المتصل برقم الهاتف والاجتماعات للمتابعة والتصنيف الأرخص للاتصال.",
    descriptionEn: "Voice assistant that records, transcribes, and searches meetings for files and charts.",
    category: "office"
  },
  {
    name: "Loom AI",
    url: "loom.com",
    description: "مساعد لوم لتسمية، وتلخيص، واستخراج العناوين الدقيقة لمقاطع الفيديو التعليمية التي تسجلها.",
    descriptionEn: "Auto-labels, structures, and generates chapters from screen recordings instantly.",
    category: "office"
  },
  {
    name: "Tome",
    url: "tome.app",
    description: "منصة لابتكار وعرض القصص والصفحات المتكاملة بتناغم فريد بين الكلمة والصورة التوليدية السهلة.",
    descriptionEn: "Interactive visual storyteller that constructs interactive full-screen pitches.",
    category: "office"
  },

  // 6. Coding & Development (البرمجة والتطوير)
  {
    name: "Cursor",
    url: "cursor.sh",
    description: "محرر الأكواد الأبرز مدمجاً بذكاء لإنشاء أكواد وتعديل ملفات كاملة والتنبؤ بالخطوة البرمجية.",
    descriptionEn: "The premier AI-first IDE that chats with codebases, edits files, and auto-fills lines.",
    category: "code"
  },
  {
    name: "GitHub Copilot",
    url: "github.com/features/copilot",
    description: "الرفيق المبرمج والأساسي في محرر فيجوال ستوديو لتسريع كتابة الدوال واقتراح السطور البرمجية.",
    descriptionEn: "The original autocompletion companion speeding up loop structures and function logic.",
    category: "code"
  },
  {
    name: "V0 by Vercel",
    url: "v0.dev",
    description: "منصة توليد واجهات مواقع الويب كاملة بلغة ريأكت وتيلويند سي إس إس من مجرد سطر واحد.",
    descriptionEn: "Generates fully functional, accessible UI wrappers in React with tailwind code from mockups.",
    category: "code"
  },
  {
    name: "Lovable AI",
    url: "lovable.dev",
    description: "مترجم أحلام لتطبيقات الويب، يسمح لك ببناء تطبيق كامل تفاعلي بالحديث البسيط في دقائق.",
    descriptionEn: "Full-stack application builders that convert descriptive language into React deployable apps.",
    category: "code"
  },
  {
    name: "Bolt.new",
    url: "bolt.new",
    description: "محاكي تطوير متكامل يسمح بتركيب، تشغيل وتصحيح حزم الويب دون تثبيت أي برنامج على جهازك.",
    descriptionEn: "In-browser development sandbox that installs dependencies, edits, and runs full Node.js code.",
    category: "code"
  },
  {
    name: "Replit Agent",
    url: "replit.com/ai",
    description: "وكيل برمجي ذكي يتكلف ببناء قواعد البيانات والخلفيات ورفع المواقع للإنترنت بأمر واحد.",
    descriptionEn: "Autonomic developer assistant spinning up databases, routes, and hosting from scratch.",
    category: "code"
  },
  {
    name: "Claude Engineer",
    url: "github.com/Doriand9/claude-engineer",
    description: "وكيل مفتوح المصدر يدعم المطورين في قراءة شجرة الملفات وتفحص الفروع وإعداد الكود.",
    descriptionEn: "CLI-based agent designed to refactor directory architectures and debug dependencies.",
    category: "code"
  },
  {
    name: "Phind",
    url: "phind.com",
    description: "محرك بحث وإجابات متخصص للمبرمجين مع حلول مباشرة وسريعة للمشاكل الفنية والمكتبات.",
    descriptionEn: "Search engine developer companion optimized to bypass forums and code stack solutions.",
    category: "code"
  },
  {
    name: "Tabnine",
    url: "tabnine.com",
    description: "مكمل أسطر برمجي آمن ومتوافق بالكامل مع أعلى شروط الحماية والخصوصية العالية.",
    descriptionEn: "Privacy-centric autocompletion model running fully offline if requested.",
    category: "code"
  },
  {
    name: "Websim",
    url: "websim.ai",
    description: "أشبه بلعبة سحرية: اكتب عنواناً لأي موقع أو فكرة وسيدخل بكم ويفاعلها كأنها موقع إنترنت حقيقي كامل.",
    descriptionEn: "Sandbox browser simulator that builds and serves interactive hypothetical URLs instantly.",
    category: "code"
  },

  // 7. Education & Research (التعليم والبحث)
  {
    name: "NotebookLM",
    url: "notebooklm.google.com",
    description: "أداة رائعة ترفع لها عشرات المستندات والكتب، فتتحاور معك فيها لتبسيط العلم وتخلق بودكاست لمراجعته.",
    descriptionEn: "A Google research workspace that converts folders of uploaded files into audio panel discussions.",
    category: "edu"
  },
  {
    name: "Elicit",
    url: "elicit.com",
    description: "مساعد العلماء وطلبة الماجستير للبحث في ملايين الأوراق العلمية وتخليق ملخص دقيق للمراجع.",
    descriptionEn: "Automated literature review assistant finding connections across indexed academic papers.",
    category: "edu"
  },
  {
    name: "Consensus",
    url: "consensus.app",
    description: "محرك يجيب على أسئلتك الطبية والعلمية بناءً على إحصاءات وإصدارات التجارب المنشورة الحقيقية.",
    descriptionEn: "Evidence-based search engine that extracts consensus summaries from peer-reviewed articles.",
    category: "edu"
  },
  {
    name: "SciSpace",
    url: "typeset.io",
    description: "مفسر الأبحاث المعقدة، اشرح المعادلات المعقدة، وناقش الرسوم البيانية الموجودة في الدراسات بوضوح.",
    descriptionEn: "AI platform with integrated copilot to decipher complex equations, tables, and PDF theories.",
    category: "edu"
  },
  {
    name: "ChatPDF",
    url: "chatpdf.com",
    description: "تحاور مع أي كتيب أو مقرر دراسي طويل، واسأله عما تريد لتسهيل استخراج الإجابات للامتحان العائلي.",
    descriptionEn: "Instantly chat with textbook chapters to test yourself or abstract definitions quickly.",
    category: "edu"
  },
  {
    name: "Khanmigo",
    url: "khanacademy.org/khanmigo",
    description: "المعلم الخصوصي الذكي والآمن من أكاديمية خان، لا يحل الواجب لك بل يعلمك بطريقة سقراط للوصول للحل.",
    descriptionEn: "Socrates-method tutor developed by Khan Academy to teach kids mathematical logic step-by-step.",
    category: "edu"
  },
  {
    name: "TutorAI",
    url: "tutorai.me",
    description: "اكتب اسم أي موضوع وعلم في النفس أو التاريخ، وسيقوم ببناء منهج كامل ودروس ووحدات فحص مبوبة.",
    descriptionEn: "Course micro-constructor that converts single keywords into organized syllabus units.",
    category: "edu"
  },
  {
    name: "WolframAlpha AI",
    url: "wolframalpha.com",
    description: "الذكاء الحسابي الدقيق لحل غوامض الكيمياء والرياضيات العليا والتوابع الإحصائية بالخطوات التوضيحية.",
    descriptionEn: "The undisputed computational standard to resolve exact formulas and graphs without bias.",
    category: "edu"
  },
  {
    name: "Explain Like I'm 5",
    url: "eli5.gg",
    description: "مبسط العلوم العجيب، يشرح لك النظريات الفيزيائية وعلم الاقتصاد كأنه يكلم طفلاً لطيفاً.",
    descriptionEn: "Simplifier that breaks down cryptic topics (e.g., blockchain, quantum) into extremely cute analogies.",
    category: "edu"
  },
  {
    name: "Gamma Scholar",
    url: "scholar.google.com",
    description: "لبحث دقيق ومقارب ومستشهد للمقالات الأكاديمية والعمرانية المفتوحة والقديمة.",
    descriptionEn: "Academic discovery search companion optimized for student papers.",
    category: "edu"
  },

  // 8. Marketing & Business (التسويق والأعمال)
  {
    name: "AdCreative.ai",
    url: "adcreative.ai",
    description: "أداة ذكية لتوليد وتعمير بنرات إعلانية وتنسيقات جاهزة للبيع بنسب تحويل مرتفعة في لحظات.",
    descriptionEn: "Generates high-performing, sales-optimized dynamic ad creatives in minutes.",
    category: "business"
  },
  {
    name: "HubSpot AI",
    url: "hubspot.com/artificial-intelligence",
    description: "أدوات هبسبوت لتفتيش وإبراز رسائل المبيعات لخدمة الزبائن وإدارة جداول العلاقات العامة.",
    descriptionEn: "CRM companion tailored to write emails, draft customer cases, and automate CRM workflows.",
    category: "business"
  },
  {
    name: "Brandmark",
    url: "brandmark.io",
    description: "مصمم اللوغوهات، اكتب اسم علامتك التجارية ونشاطها وسيقوم بهندسة شعار وهوية متكاملة لبيتكم.",
    descriptionEn: "Dynamic logo-architect creating color boards, brand assets, and printable identity packets.",
    category: "business"
  },
  {
    name: "SEMrush Copilot",
    url: "semrush.com",
    description: "منصة تتبع موقعك وتساعد عائلتك على الوصول لأعلى ترتيب في جوجل ونقله لبقية رواد السيو.",
    descriptionEn: "SEO and site optimization advisor suggesting copy structure for the highest traffic results.",
    category: "business"
  },
  {
    name: "Namelix",
    url: "namelix.com",
    description: "مبتكر أسماء مشاريع عبقري، يكتب أسماء قصيرة وحديثة ممتازة لحملاتكم الأسرية باللغة المطلوبة.",
    descriptionEn: "AI name generator that converts core keywords into crisp, catchy business names.",
    category: "business"
  },
  {
    name: "Simplified AI",
    url: "simplified.com",
    description: "تصميم وكتابة وجدولة تدوينات في مكان واحد، رائع لخدمة أهداف بيع المنتجات العائلية المحبوبة.",
    descriptionEn: "All-in-one suite bridging design editors, copywriters, and global schedulers.",
    category: "business"
  },
  {
    name: "Lumen5",
    url: "lumen5.com",
    description: "حول أي منشور أو تدوينة مكتوبة إلى فيديو دعائي مروّق بالتوافق مع الصور والمقاطع المناسبة.",
    descriptionEn: "Converts text articles and blogs into engaging brand slides and video presentations.",
    category: "business"
  },
  {
    name: "Taplio",
    url: "taplio.com",
    description: "مساعد التدوين لمنصة لينكدإن يبسط عملية جدولة وبناء المنشورات الأكثر جاذبية للرواد.",
    descriptionEn: "LinkedIn optimization tool that suggests topics and tracks expert post histories.",
    category: "business"
  },
  {
    name: "Looka AI",
    url: "looka.com",
    description: "مولد هوية متكامل فوري وسهل الاستخدام، ممتاز للتجريب والتصاميم المكتبية الدلالية.",
    descriptionEn: "Digital brand creator that drafts custom business cards, invoices, and logos.",
    category: "business"
  },
  {
    name: "Vidiq AI",
    url: "vidiq.com",
    description: "أداة مساعدة اليوتيوبرز تقترح أفكاراً وتكتب عناوين محفزة لكسب مزيد من المتفرجين والمتابعين.",
    descriptionEn: "YouTube channel optimizer giving title tips, script ideas, and target tag rankings.",
    category: "business"
  },

  // 9. Deepfakes & Safety (التزييف العميق والأمان)
  {
    name: "Deepware Defender",
    url: "deepware.ai",
    description: "أداة متخصصة لفحص مقاطع الفيديو المشابهة والكشف عن ملامح وتعديلات التزييف العميق بالرأس والأعضاء.",
    descriptionEn: "Leading facial forensic scanner looking for micro pixel abnormalities in falsified videos.",
    category: "safety"
  },
  {
    name: "Reality Defender",
    url: "realitydefender.com",
    description: "منصة متميزة توفر كشفاً فائقاً لملفات الصوت والوجوه المزيفة ووسائط الاتصالات المشبوهة.",
    descriptionEn: "Advanced multi-modal security suite detecting fake vocals, documents, and video edits.",
    category: "safety"
  },
  {
    name: "Hive Moderation",
    url: "hivemoderation.com",
    description: "ماسح وفاحص ذكي للغاية يكتشف فورياً هل تم تخليق هذا النص أو الصورة بواسطة الذكاء الاصطناعي أم لا.",
    descriptionEn: "Enterprise image and text detector reporting exact confidence splits on what AI model generated it.",
    category: "safety"
  },
  {
    name: "McAfee Audio Detector",
    url: "mcafee.com/blogs/ai-deepfakes",
    description: "أداة ذكية من شركة مكافي الشهيرة لكشف بصمات الصوت المزيفة في المكالمات لكسر هجمات القرصنة.",
    descriptionEn: "Audio voice fingerprint analyzer trained to detect robotic pitches and cloned call warnings.",
    category: "safety"
  },
  {
    name: "Intel FakeCatcher",
    url: "intel.com",
    description: "أداة إنتل الرائدة لفحص حركة وتدفق الدم الدلالي في وجوه الأشخاص للفصل السريع بين الكائن والمولد.",
    descriptionEn: "Intel's software analyzing real-time blood-flow pixels to isolate organic human biological state.",
    category: "safety"
  },
  {
    name: "Sentinel Deepfake Detection",
    url: "thesentinel.ai",
    description: "أداة حماية معززة تستخدمها الهيئات والمنظمات لمنع النصب والتضليل الإبداعي.",
    descriptionEn: "Information integrity tool designed to flag synthetic manipulation files.",
    category: "safety"
  },
  {
    name: "Sieve AI Detection",
    url: "sieve.id",
    description: "واجهة فحص ومصادقة سريعة تتيح فحص جودة وصحة المقاطع الصوتية ومحاكاتها.",
    descriptionEn: "API suite hosting robust facial manipulation detection layers for modern safety teams.",
    category: "safety"
  },
  {
    name: "WeVerify Detector",
    url: "weverify.eu",
    description: "أداة الاتحاد الأوروبي الشهيرة للتحقق والمقارنة لكشف التزييف الإعلامي وتدقيق الأدلة السمعية والبصرية.",
    descriptionEn: "Verification tool built to debunk online disinformation and verify pixel modifications.",
    category: "safety"
  },
  {
    name: "Copyleaks Detector",
    url: "copyleaks.com/ai-content-detector",
    description: "الكاشف الأول للمقالات والنصوص المنسوخة والجاهزة بالكامل بواسطة نماذج اللغات الشهيرة.",
    descriptionEn: "The most trusted model assessing if texts are written by GPT-4 or Claude drafts.",
    category: "safety"
  },
  {
    name: "Illuminarty",
    url: "illuminarty.ai",
    description: "فاحص الفنون والصور الرقمية المبتذلة يحدد لك بالضبط أي نموذج توليد قام بصياغة هذا الرسم ونسبته المئوية.",
    descriptionEn: "Visual scanner mapping pixel distributions to index if a painting belongs to Midjourney.",
    category: "safety"
  }
];
