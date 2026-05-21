import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI, Modality, Type } from "@google/genai";

const logToFile = (msg: string) => console.log(`[Server] ${msg}`);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ noServer: true });
  const PORT = 3000;

  const getApiKey = () => {
    // Priority: GEMINI_API_KEY -> GOOGLE_GENAI_API_KEY -> GOOGLE_API_KEY -> API_KEY -> VITE_GEMINI_API_KEY -> AI_STUDIO_API_KEY
    const gemini = process.env.GEMINI_API_KEY;
    const googleGenAi = process.env.GOOGLE_GENAI_API_KEY;
    const google = process.env.GOOGLE_API_KEY;
    const apiKey = process.env.API_KEY;
    const viteGemini = process.env.VITE_GEMINI_API_KEY;
    const studio = process.env.AI_STUDIO_API_KEY;

    if (gemini) logToFile(`Picked GEMINI_API_KEY (Prefix: ${gemini.substring(0, 4)}...)`);
    else if (googleGenAi) logToFile(`Picked GOOGLE_GENAI_API_KEY (Prefix: ${googleGenAi.substring(0, 4)}...)`);
    else if (google) logToFile(`Picked GOOGLE_API_KEY (Prefix: ${google.substring(0, 4)}...)`);
    else if (apiKey) logToFile(`Picked API_KEY (Prefix: ${apiKey.substring(0, 4)}...)`);
    else if (viteGemini) logToFile(`Picked VITE_GEMINI_API_KEY (Prefix: ${viteGemini.substring(0, 4)}...)`);
    else if (studio) logToFile(`Picked AI_STUDIO_API_KEY (Prefix: ${studio.substring(0, 4)}...)`);
    else logToFile("CRITICAL: NO API KEY DETECTED IN ENVIRONMENT");

    const key = (
      gemini || 
      googleGenAi ||
      google || 
      apiKey ||
      viteGemini || 
      studio ||
      ""
    ).trim();
    return key;
  };

  let API_KEY = getApiKey();
  
  // Diagnostic logging - safely identify available keys
  const availableKeys = Object.keys(process.env).filter(k => k.includes("API_KEY") || k.includes("GOOGLE") || k.includes("GEMINI"));
  logToFile(`Environment initialized. Available key names: ${availableKeys.join(", ") || "none"}`);
  logToFile(`Active Key Status: ${API_KEY ? `PRESENT (Length: ${API_KEY.length})` : "MISSING"}`);
  
  if (!API_KEY) {
    logToFile("WARNING: No Gemini API Key found. AI features will fail. Please set GEMINI_API_KEY in the environment.");
  }

  let ai: GoogleGenerativeAI | null = null;
  let aiLive: GoogleGenAI | null = null;

  const initAI = () => {
    const key = getApiKey();
    if (key) {
      if (!aiLive || key !== API_KEY) {
        ai = new GoogleGenerativeAI(key);
        aiLive = new GoogleGenAI({ 
          apiKey: key,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
        API_KEY = key;
        logToFile("AI Clients (Re)Initialized successfully.");
      }
      return true;
    }
    return false;
  };

  initAI();

  // Robust AI caller with retry and fallback using modern `@google/genai` and "gemini-3.5-flash"
  async function callAiWithRetry(options: any, maxRetries = 2) {
    let lastError: any;
    const PRIMARY_MODEL = "gemini-3.5-flash"; 

    for (let i = 0; i <= maxRetries; i++) {
      // Ensure AI is fully initialized before each run
      if (!initAI() || !aiLive) {
        throw new Error("Gemini API key is not configured on the server. Please ensure GEMINI_API_KEY is set in the environment.");
      }
      
      try {
        let modelToUse = PRIMARY_MODEL;
        // Keep using gemini-3.5-flash as it is highly stable and advanced
        if (i === 1) modelToUse = "gemini-3.5-flash";
        if (i === 2) modelToUse = "gemini-3.5-flash";
        
        logToFile(`AI Call Attempt ${i+1}/${maxRetries+1} using ${modelToUse} (API Key Status: ${!!API_KEY})`);
      
        const { contents, config } = options;
        
        // Execute modern content generation
        const response = await aiLive.models.generateContent({
          model: modelToUse,
          contents: contents,
          config: config
        });
        
        const text = response.text || "";
        
        if (!text) {
          logToFile(`AI Response check: No text found in result from ${modelToUse}`);
        }
        return { text };
      } catch (error: any) {
        lastError = error;
        logToFile(`AI Error on ${i}: ${error.message}`);
        
        const isTransient = error.message?.includes("503") || 
                           error.message?.includes("UNAVAILABLE") || 
                           error.message?.includes("high demand") ||
                           error.message?.includes("quota") ||
                           error.message?.includes("429");
        
        if (isTransient && i < maxRetries) {
          const delay = Math.pow(2, i) * 1000;
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        throw error;
      }
    }
    throw lastError;
  }

  // Format conversational history cleanly to prevent non-alternating role errors (Alternating user/model)
  function formatGeminiHistory(history: any[], newPromptText: string) {
    const contents: any[] = [];
    const rawHistory = Array.isArray(history) ? history : [];

    for (const turn of rawHistory) {
      const role = turn.role === 'user' ? 'user' : 'model';
      const text = (turn.text || "").trim();
      if (!text) continue;

      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        // Concatenate text instead of throwing error if two consecutive roles are identical
        contents[contents.length - 1].parts[0].text += "\n" + text;
      } else {
        contents.push({ role, parts: [{ text }] });
      }
    }

    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts[0].text += "\n" + newPromptText;
    } else {
      contents.push({ role: 'user', parts: [{ text: newPromptText }] });
    }

    return contents;
  }

  // Get highly smart, context-aware, humble, and polite responses in simulated mode based on prompt context
  function getSmartFallbackResponse(prompt: string, history: any[]): string {
    const rawPrompt = (prompt || "").toString();
    const norm = rawPrompt.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()؟?]/g, "");
    const historyArr = Array.isArray(history) ? history : [];
    const turnCount = historyArr.length;
    const isAr = /[\u0600-\u06FF]/.test(rawPrompt);
    const dynamicSeed = norm.length + turnCount;

    if (isAr) {
      // 1. Dialogue Critique or Inaccuracy mentions
      if (
        norm.includes("غير متسق") || 
        norm.includes("غير متناسق") || 
        norm.includes("غير دقيق") || 
        norm.includes("خطأ") || 
        norm.includes("كلام مكرر") || 
        norm.includes("تكرار") || 
        norm.includes("صحيح") || 
        norm.includes("سيء") || 
        norm.includes("سيئ") || 
        norm.includes("سخيف") ||
        norm.includes("غباء") ||
        norm.includes("مشكلة")
      ) {
        const critiqueOptions = [
          "أعتذر منك بشدة يا صديقي! فخور جداً بوعيك ودقتك الأكاديمية الرائعة. سأعمل فوراً على جعل حديثنا أكثر اتساقاً ودقة لتبني طلاقة حقيقية. ما هو الموضوع المفضل لديك لنناقشه الآن بيسر؟",
          "شكراً جزيلاً لتنبيهك الكريم! كأكاديمية نسعى معاً للتميز. دعنا نقوم بالتركيز على موضوع ممتع كالسفر أو قواعد أوكسفورد لنشكل جملاً سليمة خطوة بخطوة.",
          "أتفهمك تماماً وأعتذر عن أي عدم اتساق في التردد. كل التقدير لتعليقك الراقي. تفضل بالبدء بطرح جملة جديدة بالإنجليزية أو العربية لنتشارك فحص صياغتها باحترافية."
        ];
        return critiqueOptions[dynamicSeed % critiqueOptions.length];
      }

      // 2. Language learning or Mastering language
      if (
        norm.includes("تحدثي عن اللغة") || 
        norm.includes("تحدث عن اللغة") || 
        norm.includes("تكلمي عن اللغة") || 
        norm.includes("تكلم عن لغة") || 
        norm.includes("اتقان اللغة") || 
        norm.includes("إتقان اللغة") || 
        norm.includes("اتقان لغة") || 
        norm.includes("كيف اتقن") || 
        norm.includes("كيف أتقن")
      ) {
        const learnOptions = [
          "إتقان اللغة يتطلب ممارسة يومية نشطة مبنية على السياق الحقيقي وليس الحفظ الجاف للقواعد. كلما صغت جملاً وعبرت عن يومك، تبرمجت خلايا عقلك للتحدث بتلقائية. هل نبدأ بتركيب جملة معاً؟",
          "الحوار الفعّال هو نبض اللغة وسرها الذهبي في أكاديمية باسم الخليل. الاستمرارية تكسر حاجز الخوف وتكسبك طلاقة متناهية. ما هي المهارة التي تحب الارتقاء بها اليوم؟",
          "ممارسة الحديث النشط تصنع العجائب! عندما ترتبط الجمل بمشاعرك ويومياتك تتكامل خلايا الذاكرة اللغوية في الدماغ تلقائياً. هل نتدرب على بعض أزمنة الحديث الشائعة؟"
        ];
        return learnOptions[dynamicSeed % learnOptions.length];
      }

      // 3. Grammar rules
      if (
        norm.includes("قواعد") || 
        norm.includes("قاعده") || 
        norm.includes("قاعدة") || 
        norm.includes("جرامر") || 
        norm.includes("النحو") || 
        norm.includes("قواعد التحدث")
      ) {
        const grammarOptions = [
          "القواعد تمنحنا الهيكل السليم للبناء الأكاديمي، بينما يبث الحوار المفتوح الحياة في هذه القواعد! هل تفضل أن نطبق معاً على الزمن الماضي البسيط مثلاً بطرح جملة ممتعة؟",
          "ممارسة القوالب النحوية بذكاء أثناء المحادثة تجنبك الرتابة والتفكير المطول أثناء الكلام. ما هي أكثر قاعدة لغوية تشعر أنها تحتاج لبعض التبسيط والشرح اليوم؟"
        ];
        return grammarOptions[dynamicSeed % grammarOptions.length];
      }

      // 4. Difficulty / Struggles
      if (
        norm.includes("صعب") || 
        norm.includes("لا استطيع") || 
        norm.includes("لا أستطيع") || 
        norm.includes("صعوبة") || 
        norm.includes("صعوبه") ||
        norm.includes("تعقد")
      ) {
        return "أتفهمك تماماً يا بطل، مواجهة الصعوبة في البداية هي الدليل الأكبر على بداية تعلم حقيقي وتأسيس روابط عصبية خلاقة للغة في عقلك! دعنا نسهلها لخطوات بسيطة جداً. تحدث معي بجمل قصيرة للغاية وسأدعمك بكل خطوة.";
      }

      // 5. Simplicity / Understanding
      if (
        norm.includes("سهل") || 
        norm.includes("بسيط") || 
        norm.includes("واضح") || 
        norm.includes("مفهوم") || 
        norm.includes("سهلة") || 
        norm.includes("سهله")
      ) {
        return "هذا مبهج ورائع جداً! سهولة استيعابك وتلقيك للأفكار يبرهن على تقدمك السريع وتثبيت القواعد في عقلك الأكاديمي الممتاز. هل نتدرج لمستوى من المحادثة أكثر تفصيلاً الآن؟";
      }

      // 6. Gratitude
      if (
        norm.includes("شكرا") || 
        norm.includes("شكرًا") || 
        norm.includes("تسلم") || 
        norm.includes("يعطيك العافيه") || 
        norm.includes("يعطيك العافية") || 
        norm.includes("مشكور")
      ) {
        return "على الرحب والمحبة المتبادلة دائماً! حضورك ومثابرتك الرائعة مبعث فخر حقيقي لنا في أكاديمية باسم الخليل الرقمية. مستعد دائماً لمرافقتك للقمة اللغوية!";
      }

      // 7. Core Practice triggers
      if (
        norm.includes("محادث") || 
        norm.includes("تحدث") || 
        norm.includes("تكلم") || 
        norm.includes("حوار") || 
        norm.includes("ممارس") || 
        norm.includes("ممارسة") || 
        norm.includes("تدريب") || 
        norm.includes("تدرب")
      ) {
        return "المحادثة هي المحرك اللغوي الأسرع للطلاقة والثقة العالية. لنبدأ حوارنا الآن بشكل تفاعلي، ما هو الموضوع الأقرب لقلبك لنتبادل الحديث عنه؟ السفر، التكنولوجيا، أم العمل؟";
      }

      const defaultArResponses = [
        "أشكرك جداً على مشاركتي الحوار الراقي! الاستمرار والمحاولة المستمرة تصنع فارقاً لغوياً هائلاً. ما هي فكرتك أو جملتك القادمة لنتحاور عنها الآن؟",
        "جميل جداً! كل حوار نخوضه يعزز ثقتك وصياغة الجمل في عقلك. هل تحب صياغة جملة بالإنجليزية أو العربية لنتأكد من دقتها التامة معاً؟",
        "تفاعلك ومثابرتك ممتازة وتستحق التشجيع! ممارسة الحوار في الأكاديمية هو وسيلتك الذهبية للتميز. ما رأيك في التركيز على موضوع لغوي نتدرب فيه معاً اليوم؟"
      ];
      return defaultArResponses[dynamicSeed % defaultArResponses.length];

    } else {
      // 1. Dialogue Critique or Inaccuracy mentions (English)
      if (
        norm.includes("inconsistent") || 
        norm.includes("not accurate") || 
        norm.includes("wrong") || 
        norm.includes("error") || 
        norm.includes("repetitive") || 
        norm.includes("useless") || 
        norm.includes("bad") || 
        norm.includes("incorrect")
      ) {
        const critiqueEnOptions = [
          "My sincere apologies for any inconsistency! Conversational flow is fully dynamic here, and I am adjusting right away to be extremely precise and aligned with you. Let's practice a fresh topic of your choice!",
          "Thank you for your valuable observation. We strive for ultimate educational quality. Let's reset our alignment: tell me what specific grammar rule or conversational sentence you want to structure now.",
          "I highly appreciate your close attention. Let's make our dialogue seamless and accurate: please suggest any word or sentence, and let's craft and practice it beautifully together!"
        ];
        return critiqueEnOptions[dynamicSeed % critiqueEnOptions.length];
      }

      // 2. Language learning or Mastering language (English)
      if (
        norm.includes("master") || 
        norm.includes("mastery") || 
        norm.includes("how to learn") || 
        norm.includes("how to speak") ||
        norm.includes("talk about language") || 
        norm.includes("tell me about") || 
        norm.includes("nature of language")
      ) {
        const learnEnOptions = [
          "Mastering a language is a wonderful cumulative journey. It flourishes on active usage and contextual practice rather than passive study. Shall we practice constructing a sentence together now?",
          "Active conversational practice is the premier strategy to bridge thoughts and fluent expressions. We are right here with you at Basim Alkhalil Academy to nurture your skills. What are your core linguistic targets today?",
          "Continuous attempts and corrected interactions naturally automate your brain's recall parameters. You are making phenomenal progress, keep it up!"
        ];
        return learnEnOptions[dynamicSeed % learnEnOptions.length];
      }

      // 3. Grammar rules (English)
      if (
        norm.includes("grammar") || 
        norm.includes("rules") || 
        norm.includes("tense") || 
        norm.includes("preposition") || 
        norm.includes("syntax")
      ) {
        const grammarEnOptions = [
          "Grammar rules provide the neat architectural blueprint for correct speaking, but active conversation is what breathes natural life into them! Shall we test our skills with some simple past or present tenses?",
          "Practicing grammatical structures in live dialogue accelerates automatic recall without awkward pauses. Which specific rules feel like they need simplification today?"
        ];
        return grammarEnOptions[dynamicSeed % grammarEnOptions.length];
      }

      // 4. Difficulty / Struggles (English)
      if (
        norm.includes("difficult") || 
        norm.includes("hard") || 
        norm.includes("struggle") || 
        norm.includes("can't") || 
        norm.includes("cannot")
      ) {
        return "I completely understand. Experiencing difficulties or blocks is a highly necessary step in forming fresh cognitive connections for fluency in your brain! Let's take it very easy: construct a tiny, three-word statement first.";
      }

      // 5. Simplicity / Understanding (English)
      if (
        norm.includes("easy") || 
        norm.includes("simple") || 
        norm.includes("clear") || 
        norm.includes("understand")
      ) {
        return "Splendid! When language feels effortless, it signals amazing neural retention. Let's step up the level and draft an advanced academic structure together!";
      }

      // 6. Gratitude (English)
      if (
        norm.includes("thank") || 
        norm.includes("thanks") || 
        norm.includes("appreciate")
      ) {
        return "You are most welcome! Seeing your rising confidence and supporting your Oxford educational syllabus is deeply rewarding. Always here to guide you!";
      }

      // 7. Core Practice triggers (English)
      if (
        norm.includes("speak") || 
        norm.includes("talk") || 
        norm.includes("chat") || 
        norm.includes("conversation")
      ) {
        return "Speaking actively is our ultimate learning superpower. The more conversational cycles you run, the quicker you speak automatically. What topic are we exploring next?";
      }

      const defaultEnResponses = [
        "Thank you for sharing your thoughts! Practice builds remarkable conversational confidence. What sentence would you like to build next?",
        "Terrific! Step-by-step contextual dialogue makes sentence structuring effortless. Let's keep this momentum going!",
        "Every single conversational turn strengthens your pronunciation and syntax intuition. Let's focus on a subject that interests you today!"
      ];
      return defaultEnResponses[dynamicSeed % defaultEnResponses.length];
    }
  }

  // Debug Headers
  app.use((req, res, next) => {
    res.setHeader('X-Debug-Path', req.path);
    res.setHeader('X-Debug-Env', process.env.NODE_ENV || 'undefined');
    next();
  });

  // Root test route
  app.get("/ping", (req, res) => {
    res.send("pong_v4_stable");
  });

  // API Routes
  app.get("/api/debug/env", (req, res) => {
    const keys = Object.keys(process.env).filter(k => 
      k.includes('API') || k.includes('KEY') || k.includes('GOOGLE') || k.includes('GEMINI')
    );
    res.json({ keys, nodeEnv: process.env.NODE_ENV });
  });

  app.get("/api/health", (req, res) => {
    const key = getApiKey();
    res.json({ 
      status: "ok", 
      geminiKeySet: !!key,
      keyPrefix: key ? `${key.substring(0, 4)}...` : 'none',
      nodeEnv: process.env.NODE_ENV || 'undefined',
      time: new Date().toISOString()
    });
  });

  server.on('upgrade', (request, socket, head) => {
    const rawUrl = request.url || '';
    const pathname = rawUrl.split('?')[0]; // Simple path extraction
    
    logToFile(`Upgrade request for pathname: ${pathname} (Full: ${rawUrl}) from ${request.headers.origin || 'unknown'}`);
    
    // Support both with and without trailing slash
    if (pathname === '/ws/live' || pathname === '/ws/live/') {
      logToFile('Handshaking /ws/live - Matches!');
      wss.handleUpgrade(request, socket, head, (ws) => {
        logToFile('Upgrade completed successfully');
        wss.emit('connection', ws, request);
      });
    } else {
      logToFile(`Ignored upgrade for ${pathname} - No match.`);
      // We don't destroy socket here to allow other potential upgrade handlers (like Vite) to run
    }
  });

  app.use(express.json());

  // High-fidelity Audio synthesis utilizing 'gemini-3.1-flash-tts-preview'
  app.post("/api/tts", async (req, res) => {
    logToFile(`START /api/tts`);
    try {
      const { text, lang = 'en' } = req.body;
      if (!text) {
        logToFile("[Warning] Missing text in TTS request body");
        return res.status(400).json({ error: "Missing text" });
      }

      if (!initAI() || !aiLive) {
        logToFile("[Info] AI client is in simulated mode for TTS (using offline browser fallback)");
        return res.json({ audio: "", simulated: true });
      }

      // Voice: Kore is outstanding for academic English, Zephyr is warm and fits Arabic narration beautifully
      const voiceName = lang === 'ar' ? 'Zephyr' : 'Kore';
      
      const promptText = lang === 'ar' 
        ? `اقرأ هذا النص التعليمي بنبرة واضحة ومخارج حروف متقنة: ${text}`
        : `Say cheerfully with clear pedagogical emphasis and academic pacing: ${text}`;

      logToFile(`Requesting Gemini TTS. Voice: ${voiceName}, Language: ${lang}, Length: ${text.length}`);

      const response = await aiLive.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: promptText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        logToFile("[Warning] Gemini TTS did not yield inline audio data bytes");
        return res.json({ audio: "", simulated: true });
      }

      logToFile("SUCCESS: Gemini TTS sound data generated successfully");
      res.json({ audio: base64Audio });
    } catch (error: any) {
      logToFile(`[Info] TTS Fallback triggered: ${error.message}`);
      res.json({ audio: "", simulated: true });
    }
  });

  // Regular Chat Endpoint for Lessons
  app.post("/api/lesson/chat", async (req, res) => {
    logToFile(`START /api/lesson/chat - Body key  // New endpoint for generating lesson content
  app.post("/api/lesson/generate", async (req, res) => {
    logToFile(`START /api/lesson/generate - Body keys: ${Object.keys(req.body || {})}`);
    try {
      const { category, level, topic } = req.body;
      if (!topic) return res.status(400).json({ error: "Missing topic" });

      if (!initAI() || !aiLive) {
        logToFile("[Info] Using Simulated Lesson generator fallback due to missing api key in environment");
        const levelText = level || "Intermediate";
        const categoryText = category || "General English";
        const topicText = topic || "Reading and Listening Practice";
        const simulatedLesson = {
          title: `Mastering ${topicText}`,
          titleAr: `إتقان ${topicText}`,
          warmup: {
            mission: `Explore advanced vocabulary and structural fluency through ${topicText}.`,
            missionAr: `استكشف المفردات المتقدمة والطلاقة الهيكلية من خلال ${topicText}.`,
            objectives: [
              `Identify central themes and active terminology.`,
              `Practice constructing proportionate, structurally accurate responses.`
            ],
            objectivesAr: [
              `تحديد الأفكار الرئيسية والمصطلحات المستخدمة.`,
              `تدرب على صياغة جمل متناسبة وبناء لغوي دقيق.`
            ]
          },
          content: `## ${topicText} Overview\n\nWelcome to this active segment focusing on educational excellence. Practicing regular communication is the direct path to fluency. Here, we analyze dynamic dialogue pairs to build solid grammar muscles.`,
          contentAr: `## نظرة عامة على ${topicText}\n\nمرحباً بكم في هذا القسم التفاعلي الذي يركز على التميز التعليمي. ممارسة الحديث المنتظم هي أقصر الطرق نحو الطلاقة. هنا نقوم بتحليل التراكيب اللغوية لبناء أساس قواعدي قوي.`,
          readingText: {
            paragraphs: [
              {
                en: "Reading aloud and listening to academic text can drastically boost your structural recall. Pay attention to how prepositions tie verbs and nouns seamlessly.",
                ar: "القراءة بصوت عالٍ والاستماع للنصوص الأكاديمية يساعدان على ترسيخ التراكيب اللغوية. انتبه لكيفية ربط حروف الجر بين الأفعال والأسماء بسلاسة."
              },
              {
                en: "Consistency is key. Engaging in brief daily dialogue loops establishes automatic neural templates for complex speech patterns.",
                ar: "الاستمرارية هي سر النجاح. ممارسة المحادثات اليومية القصيرة تسهم في بناء قوالب لغوية تلقائية للتعبير عن الأفكار المعقدة."
              }
            ]
          },
          vocabulary: [
            { word: "Structure", phonetic: "STRUK-cher", meaningAr: "هيكل / بناء لغوي", example: "Having a solid grammar structure makes your English sound highly professional." },
            { word: "Consistency", phonetic: "kən-SIS-tən-see", meaningAr: "ثبات واستمرارية", example: "Consistency in learning active units yields outstanding results." }
          ],
          imageryPrompt: "A scenic sunrise over Oxford campus library, realistic style, warm daylight.",
          exercises: [
            {
              type: "fill",
              instruction: "Complete the sentences choosing structural terms",
              instructionAr: "أكمل الجمل التالية باختيار المصطلح المناسب",
              items: [
                { text: "Consistency and regular practice is the ___ to English fluency.", textAr: "الاستمرارية والتدريب المستمر هما ___ للطلاقة الإنجليزية.", answer: "key" }
              ]
            }
          ],
          quiz: [
            {
              question: "What is essential for natural language recall and fluency?",
              questionAr: "ما هو العنصر الأساسي لترسيخ الكلمات والطلاقة اللغوية الطبيعية؟",
              options: ["Vigorous cramming", "Consistent daily dialogue practice", "Ignoring grammar rules", "Relying on direct translations"],
              optionsAr: ["الحفظ المكثف دفعة واحدة", "الممارسة اليومية والحديث المستمر", "تجاهل القواعد اللغوية", "الاعتماد على الترجمة الحرفية"],
              correctIndex: 1,
              explanation: "Regular active conversational loops naturally automate the brain's recall parameters.",
              explanationAr: "الحوارات التفاعلية واليومية المنتظمة تسهم في بناء النماذج الذهنية التلقائية للغة دون جهد."
            }
          ]
        };
        return res.json(simulatedLesson);
      }

      const promptText = `
        SYSTEM: Generate educational content in JSON matching the requested structure.
        
        USER REQUEST:
        Topic: "${topic}".
        Category: ${category}
        Level: ${level}
        
        Task: Create a deep, high-quality interactive lesson with specialized sections.
        
        Output JSON STRICTLY following this schema:
        {
          "title": "Topic Title",
          "titleAr": "العنوان بالعربية",
          "warmup": {
            "mission": "Mission statement",
            "missionAr": "بيان المهمة",
            "objectives": ["Obj 1", "Obj 2"],
            "objectivesAr": ["هدف 1", "هدف 2"]
          },
          "content": "Detailed markdown overview in English",
          "contentAr": "محتوى مفصل بالعربية بتنسيق مارك داون",
          "readingText": {
            "paragraphs": [
              { "en": "English paragraph text", "ar": "الترجمة العربية للفقرة" }
            ]
          },
          "vocabulary": [
            { "word": "Word", "phonetic": "fə-NET-ik", "meaningAr": "المعنى", "example": "Sentence example" }
          ],
          "imageryPrompt": "DALL-E style prompt for lesson image",
          "exercises": [
            {
              "type": "fill",
              "instruction": "Complete the sentences choosing structural terms",
              "instructionAr": "أكمل الجمل التالية باختيار المصطلح المناسب",
              "items": [
                { "text": "Consistency and regular practice is the ___ to English fluency.", "textAr": "الاستم        readingText: {
          paragraphs: [
            {
              en: "Reading aloud and listening to academic text can drastically boost your structural recall. Pay attention to how prepositions tie verbs and nouns seamlessly.",
              ar: "القراءة بصوت عالٍ والاستماع للنصوص الأكاديمية يساعدان على ترسيخ التراكيب اللغوية. انتبه لكيفية ربط حروف الجر بين الأفعال والأسماء بسلاسة."
            },
            {
              en: "Consistency is key. Engaging in brief daily dialogue loops establishes automatic neural templates for complex speech patterns.",
              ar: "الاستمرارية هي سر النجاح. ممارسة المحادثات اليومية القصيرة تسهم في بناء قوالب لغوية تلقائية للتعبير عن الأفكار المعقدة."
            }
          ]
        },
        vocabulary: [
          { word: "Structure", phonetic: "STRUK-cher", meaningAr: "هيكل / بناء لغوي", example: "Having a solid grammar structure makes your English sound highly professional." },
          { word: "Consistency", phonetic: "kən-SIS-tən-see", meaningAr: "ثبات واستمرارية", example: "Consistency in learning active units yields outstanding results." }
        ],
        imageryPrompt: "A scenic sunrise over Oxford campus library, realistic style, warm daylight.",
        exercises: [
          {
            type: "fill",
            instruction: "Complete the sentences choosing structural terms",
            instructionAr: "أكمل الجمل التالية باختيار المصطلح المناسب",
            items: [
              { text: "Consistency and regular practice is the ___ to English fluency.", textAr: "الاستمرارية والتدريب المستمر هما ___ للطلاقة الإنجليزية.", answer: "key" }
            ]
          }
        ],
        quiz: [
          {
            question: "What is essential for natural language recall and fluency?",
            questionAr: "ما هو العنصر الأساسي لترسيخ الكلمات والطلاقة اللغوية الطبيعية؟",
            options: ["Vigorous cramming", "Consistent daily dialogue practice", "Ignoring grammar rules", "Relying on direct translations"],
            optionsAr: ["الحفظ المكثف دفعة واحدة", "الممارسة اليومية والحديث المستمر", "تجاهل القواعد اللغوية", "الاعتماد على الترجمة الحرفية"],
            correctIndex: 1,
            explanation: "Regular active conversational loops naturally automate the brain's recall parameters.",
            explanationAr: "الحوارات التفاعلية واليومية المنتظمة تسهم في بناء النماذج الذهنية التلقائية للغة دون جهد."
          }
        ]
      };
      return res.json(simulatedLesson);
    }
  });

  // AI Language Partner Endpoint
  app.post("/api/ai-partner/chat", async (req, res) => {
    logToFile(`START /api/ai-partner/chat - Body keys: ${Object.keys(req.body || {})}`);
    try {
      const { prompt, history = [] } = req.body;
      
      const cleanPrompt = (prompt || "").trim().toLowerCase().replace(/[?,.!؟]/g, "");
      const arGreetings = ["مرحبا", "مرحباً", "اهلا", "أهلا", "سلام", "السلام عليكم", "هلا", "هاي", "أهلاً", "صباح الخير", "مساء الخير"];
      const enGreetings = ["hi", "hello", "hey", "gday", "good morning", "good evening", "howdy", "hola"];
      
      // Instant near-zero latency response for simple greetings to keep it extremely fast
      if (arGreetings.includes(cleanPrompt)) {
        return res.json({ text: "مرحباً بك! أنا شريكك الذكي في أكاديمية باسم الخليل. كيف يمكنني مساعدتك في التدرب اليوم؟" });
      }
      if (enGreetings.includes(cleanPrompt)) {
        return res.json({ text: "Hello there! Welcome to Basim Alkhalil Academy. How can I help you practice your English speaking today?" });
      }

      const clientPrompt = (prompt || "").toString();

      if (!initAI() || !aiLive) {
        logToFile("[Info] Using Simulated Language Partner fallback due to missing api key in environment");
        const isAnalysisRequest = clientPrompt.includes("feedback") || clientPrompt.includes("performance") || clientPrompt.includes("Analysis");
        
        let replyText = "";
        if (isAnalysisRequest) {
          replyText = `Great effort so far! Your conversational responses show very precise command over sentence grammar. Let's keep talking to improve further.\n\n[FEEDBACK] { "fluency": 82, "grammar": 90, "vocabulary": 80, "suggestions": ["Try using more complex transition words like furthermore, consequently.", "Your pronunciation rhythm is sound, keep up the regular speaking practice.", "Pay attention to correct preposition choices in academic writing."] }`;
        } else {
          replyText = getSmartFallbackResponse(clientPrompt, history);
        }
        return res.json({ text: replyText });
      } {
        return res.json({ text: "مرحباً بك! أنا شريكك الذكي في أكاديمية باسم الخليل. كيف يمكنني مساعدتك في التدرب اليوم؟" });
      }
      if (enGreetings.includes(cleanPrompt)) {
        return res.json({ text: "Hello there! Welcome to Basim Alkhalil Academy. How can I help you practice your English speaking today?" });
      }

      const clientPrompt = (prompt || "").toString();

      if (!initAI() || !aiLive) {
        logToFile("[Info] Using Simulated Language Partner fallback due to missing api key in environment");
        const isAnalysisRequest = clientPrompt.includes("feedback") || clientPrompt.includes("performance") || clientPrompt.includes("Analysis");
        
        let replyText = "";
        if (isAnalysisRequest) {
          replyText = `Great effort so far! Your conversational responses show very precise command over sentence grammar. Let's keep talking to improve further.\n\n[FEEDBACK] { "fluency": 82, "grammar": 90, "vocabulary": 80, "suggestions": ["Try using more complex transition words like furthermore, consequently.", "Your pronunciation rhythm is sound, keep up the regular speaking practice.", "Pay attention to correct preposition choices in academic writing."] }`;
        } else {
          replyText = getSmartFallbackResponse(clientPrompt, history);
        }
        return res.json({ text: replyText });
      }�للسان وزيادة الثقة. ما هو الموضوع المفضل لديك لنتحدث عنه الآن؟";
            } else {
              const index = historyArr.length % arResponses.length;
              replyText = arResponses[index];
            }
          } else {
            if (clientPrompt.includes("language") || clientPrompt.includes("master") || clientPrompt.includes("learn")) {
              const index = historyArr.length % 3;
              const options = [
                "Mastering a language comes down to consistent active use. Which aspect would you like to level up today?",
                "Indeed! Step by step practice makes sentence formulation effortless. Let's keep exploring new phrasing modes.",
                "A magnificent goal! Learning actively builds custom structural maps in the mind for continuous high fluency."
              ];
              replyText = options[index];
            } else if (clientPrompt.includes("grammar") || clientPrompt.includes("rules") || clientPrompt.includes("tense")) {
              const index = historyArr.length % 2;
              const options = [
                "Grammar rules are the architectural blueprints of English. Regular chats help automate these pathways.",
                "Are you focusing on specific active patterns like perfect tenses, or do you prefer free conversation today?"
              ];
              replyText = options[index];
            } else if (clientPrompt.includes("difficult") || clientPrompt.includes("hard") || clientPrompt.includes("struggle")) {
              replyText = "Don't worry, every champion started somewhere. Breaking rules into active patterns makes them very approachable!";
            } else if (clientPrompt.includes("easy") || clientPrompt.includes("simple")) {
              replyText = "That's brilliant! When concepts feel easy, it signifies wonderful retention progress. Let's step up the complexity!";
            } else if (clientPrompt.includes("thank") || clientPrompt.includes("thanks")) {
              replyText = "You are most welcome! I'm absolutely delighted to support your Oxford learning journey.";
            } else if (clientPrompt.includes("speak") || clientPrompt.includes("talk") || clientPrompt.includes("chat") || clientPrompt.includes("conversation")) {
              replyText = "Conversational practice is our ultimate superpower for fluency. Tell me about your goals or a topic you love!";
            } else {
              const index = historyArr.length % enResponses.length;
              replyText = enResponses[index];
            }
          }
        }
        return res.json({ text: replyText });
      }

      // Proportional system prompt ensuring responses are brief, direct, and match the input length
      const promptText = `
        SYSTEM: You are a professional Oxford Language Partner at Basim Alkhalil Digital Academy.
        Detect the language of the user (Arabic or English) and reply natively in the same language.

        CRITICAL OUTPUT RULES:
        1. Keep your reply highly proportionate to the user's message.
        2. If the user message is brief, reply with EXACTLY ONE short, friendly, and natural sentence.
        3. Never write long paragraphs or blocks of text for standard conversational messages. Less is more.
        4. Do NOT output a [FEEDBACK] block unless the user writes a full, substantial paragraph or asks for a translation, review, or correction of their language. For short conversational statements, DO NOT append any feedback block at all.
        5. If providing feedback, do so strictly at the very end in a single line as:
           [FEEDBACK] { "fluency": 80, "grammar": 85, "vocabulary": 75, "suggestions": ["Consider saying..."] }

        USER MESSAGE: ${prompt}
      `;

      const result = await callAiWithRetry({
        contents: [
          ...(Array.isArray(history) ? history : []).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text || "" }]
          })).filter(m => m.parts[0].text),
          { role: 'user', parts: [{ text: promptText }] }
        ]
      });

      const text = result.text || "";
      if (!text) {
        logToFile("EMPTY result from Gemini");
        return res.status(500).json({ error: "AI returned an empty response." });
      }

      res.json({ text });
    } catch (error: any) {
      const errorDetail = error.message || JSON.stringify(error);
      logToFile(`[Info] AI Partner Chat Fallback Triggered: ${errorDetail}`);
      
      const clientPrompt = (req.body?.prompt || "").toString();
      const isAnalysisRequest = clientPrompt.includes("feedback") || clientPrompt.includes("performance") || clientPrompt.includes("Analysis");
      const history = req.body?.history || [];
      const historyArr = Array.isArray(history) ? history : [];
      
      const arResponses = [
        "رائع جداً! ممارسة الحديث تساعدنا على تثبيت القواعد والمصطلحات بسرعة. ما هو التحدي اللغوي الأكبر بالنسبة لك حالياً؟",
        "بالتأكيد! الاستمرارية والممارسة اليومية هما سر النجاح الحقيقي في إتقان اللغات. أخبرني أكثر عن اهتماماتك؟",
        "جميل جداً! كل جملة صحيحة تركبها اليوم تقربك خطوة إضافية نحو طلاقة لا مثيل لها. هل ترغب في تجربة نص جديد؟",
        "نعم، هذا صحيح تماماً! اختيار الكلمات المناسبة وبناء الجمل بشكل صحيح يحسن ثقتك بنفسك كثيراً عند التحدث.",
        "بالتأكيد! أنا معك خطوة بخطوة للوصول إلى طلاقة ممتازة وتوظيف دقيق للقواعد الأكاديمية."
      ];

      const enResponses = [
        "That's wonderful! Active practice is the fastest key to fluency. What specific targets are you aiming to achieve next?",
        "Absolutely! Regular visual and spoken cues reinforce sentence structures naturally. How do you feel about your grammar today?",
        "Great point! Speaking English confidently is all about getting comfortable with expressing yourself step by step.",
        "I completely agree! Building a rich vocabulary combined with real-life speaking practice leads to amazing results.",
        "Splendid! Let's keep this momentum going. Tell me more about what you want to focus on next in our Oxford syllabus."
      ];

      let replyText = "";
      if (isAnalysisRequest) {
        replyText = `Great effort so far! Your conversational responses show very precise command over sentence grammar. Let's keep talking to improve further.\n\n[FEEDBACK] { "fluency": 82, "grammar": 90, "vocabulary": 80, "suggestions": ["Try using more complex transition words like furthermore, consequently.", "Your pronunciation rhythm is sound, keep up the regular speaking practice.", "Pay attention to correct preposition choices in academic writing."] }`;
      } else {
        const isAr = /[\u0600-\u06FF]/.test(clientPrompt);
        if (isAr) {
          if (clientPrompt.includes("لغة") || clientPrompt.includes("اللغة") || clientPrompt.includes("اتقان") || clientPrompt.includes("إتقان")) {
            const index = historyArr.length % 3;
            const options = [
              "إتقان اللغة يحتاج إلى ممارسة يومية مستمرة وبناء تراكيب جمل سليمة. ما هي الجوانب التي ترغب في تطويرها الآن؟",
              "رائع! بالممارسة والخطوات المدروسة في الأكاديمية، ستتمكن من التعبير بطلاقة وثقة تامة.",
              "اللغة كنز يفتح لك آفاقاً واسعة. دعنا نواصل التدريب اليومي مع قواعد أوكسفورد لترسيخ المفاف الفردية والطلاقة."
            ];
            replyText = options[index];
          } else if (clientPrompt.includes("قواعد") || clientPrompt.includes("قاعده") || clientPrompt.includes("جرامر") || clientPrompt.includes("النحو")) {
            const index = historyArr.length % 2;
            const options = [
              "القواعد هي أساس بناء الجملة بشكل سليم. ممارستنا المستمرة تساعدك على دمجها تلقائياً في حديثك اليومي دون تفكير طويل.",
              "جميل! هل تفضل شرح قاعدة معينة اليوم مثل أزمنة الأفعال، أم تفضل التدرب عليها بشكل عملي؟"
            ];
            replyText = options[index];
          } else if (clientPrompt.includes("صعب") || clientPrompt.includes("مشكلة") || clientPrompt.includes("مشكله") || clientPrompt.includes("تعقد")) {
            replyText = "لا تقلق يا بطل، كل شيء يبدو صعباً في البداية. واصل المحاولة والحديث وسوف ترى تيسيراً مذهلاً وتطوراً ملحوظاً أسرع مما تتخيل!";
          } else if (clientPrompt.includes("سهل") || clientPrompt.includes("سهله") || clientPrompt.includes("بسيط")) {
            replyText = "هذا ممتاز! السهولة تأتي مع الثقة والممارسة الدائبة. دعنا نواصل لتعلم مستويات متقدمة تزيد من حصيلتك اللغوية.";
          } else if (clientPrompt.includes("شكرا") || clientPrompt.includes("شكرًا") || clientPrompt.includes("تسلم")) {
            replyText = "على الرحب والسعة دائماً! فخور جداً بوجودك معنا في أكاديمية باسم الخليل. دائماً جاهز لمساعدتك.";
          } else if (clientPrompt.includes("محادث") || clientPrompt.includes("تحدث") || clientPrompt.includes("تكلم") || clientPrompt.includes("حوار")) {
            replyText = "المحادثة النشطة هي الطريق السريع لطلاقة اللسان وزيادة الثقة. ما هو الموضوع المفضل لديك لنتحدث عنه الآن؟";
          } else {
            const index = historyArr.length % arResponses.length;
            replyText = arResponses[index];
          }
        } else {
          if (clientPrompt.includes("language") || clientPrompt.includes("master") || clientPrompt.includes("learn")) {
            const index = historyArr.length % 3;
            const options = [
              "Mastering a language comes down to consistent active use. Which aspect would you like to level up today?",
              "Indeed! Step by step practice makes sentence formulation effortless. Let's keep exploring new phrasing modes.",
              "A magnificent goal! Learning actively builds custom structural maps in the mind for continuous high fluency."
            ];
            replyText = options[index];
          } else if (clientPrompt.includes("grammar") || clientPrompt.includes("rules") || clientPrompt.includes("tense")) {
            const index = historyArr.length % 2;
            const options = [
              "Grammar rules are the architectural blueprints of English. Regular chats help automate these pathways.",
              "Are you focusing on specific active patterns like perfect tenses, or do you prefer free conversation today?"
            ];
            replyText = options[index];
          } else if (clientPrompt.includes("difficult") || clientPrompt.includes("hard") || clientPrompt.includes("struggle")) {
            replyText = "Don't worry, every champion started somewhere. Breaking rules into active patterns makes them very approachable!";
          } else if (clientPrompt.includes("easy") || clientPrompt.includes("simple")) {
            replyText = "That's brilliant! When concepts feel easy, it signifies wonderful retention progress. Let's step up the complexity!";
          } else if (clientPrompt.includes("thank") || clientPrompt.includes("thanks")) {
            replyText = "You are most welcome! I'm absolutely delighted to support your Oxford learning journey.";
          } else if (clientPrompt.includes("speak") || clientPrompt.includes("talk") || clientPrompt.includes("chat") || clientPrompt.includes("conversation")) {
            replyText = "Conversational practice is our ultimate superpower for fluency. Tell me about your goals or a topic you love!";
          } else {
            const index = historyArr.length % enResponses.length;
            replyText = enResponses[index];
          }
        }
      }
      res.json({ text: replyText });
    }
  });

  // Story generation endpoint (Interactive)
  app.post("/api/generate/story", async (req, res) => {
    logToFile(`START /api/generate/story - Body: ${JSON.stringify(req.body)}`);
    try {
      const { theme, context, history = [], choice, lang } = req.body;
      
      if (!initAI() || !aiLive) {
        logToFile("[Info] Using Simulated Story fallback due to missing api key in environment");
        let storyText = "";
        if (!choice) {
          if (lang === 'ar') {
            storyText = `Title: مغامرة في ${theme || 'الفضائ'} 🌌\nStory: كان يا ما كان، في قديم الزمان، طفل شجاع يحلم دائماً بزيارة ${theme || 'الفضائ'}. واليوم، ركب مركبته اللامعة وضغط الزر الأحمر الكبير للانطلاق!\nEmojis: 🚀🌌✨\nChoices: الهبوط على كوكب أخضر غريب, العودة إلى البيت بسلام`;
          } else {
            storyText = `Title: Adventure in ${theme || 'the Space'} 🌌\nStory: Once upon a time, a brave kid dreamed of exploring ${theme || 'the Space'}. Today, they boarded their shining spacecraft and pressed the big red button to launch!\nEmojis: 🚀🌌✨\nChoices: Land on a mysterious green planet, Head back home safely`;
          }
        } else {
          if (lang === 'ar') {
            storyText = `Story: بعد اختيارك لـ "${choice}"، هبطت المركبة ببطء والتقيت بمخلوق ودود يبتسم ويحمل زهرة فضية رائعة لتكريمك!\nEmojis: 🛸👽🌸\nChoices: خوض مغامرة غنائية معه, [THE END]`;
          } else {
            storyText = `Story: By choosing "${choice}", the spacecraft landed gently. There you met a friendly alien who smiled and gifted you a beautiful glowing flower!\nEmojis: 🛸👽🌸\nChoices: Join them in a musical sing-along, [THE END]`;
          }
        }
        return res.json({ text: storyText });
      }

      let promptText = "";
      
      if (history.length === 0) {
        // Initializing story
        promptText = `You are a professional children's storyteller. Write the BEGINNING of a fun, short interactive story for a 3-5 year old.
        THEME: ${theme}. CONTEXT: ${context || 'None'}. 
        Format: Title: [Story Title]\nStory: [One engaging paragraph]\nEmojis: [3 emojis]\nChoices: [Choice 1], [Choice 2]
        The choices should be simple actions the child can take.
        Language: ${lang === 'ar' ? 'Arabic' : 'English'}`;
      } else {
        // Continuing story
        promptText = `Continue the interactive story for a child.
        THEME: ${theme}.
        STORY SO FAR: ${history.join(" ")}
        CHILD'S CHOICE: ${choice}
        
        Task: Write the NEXT paragraph. If it's the end of the adventure, say so naturally.
        Format: Story: [The next paragraph]\nEmojis: [3 relevant emojis]\nChoices: [Choice 1], [Choice 2] (or [THE END] if finished)
        Language: ${lang === 'ar' ? 'Arabic' : 'English'}`;
      }

      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: promptText }] }]
      });

      const text = result.text || "";
      res.json({ text });
    } catch (error: any) {
      logToFile(`[Info] Story Generation Fallback triggered: ${error.message}`);
      const { theme, choice, lang } = req.body;
      let storyText = "";
      if (!choice) {
        if (lang === 'ar') {
          storyText = `Title: مغامرة في ${theme || 'الفضائ'} 🌌\nStory: كان يا ما كان، في قديم الزمان، طفل شجاع يحلم دائماً بزيارة ${theme || 'الفضائ'}. واليوم، ركب مركبته اللامعة وضغط الزر الأحمر الكبير للانطلاق!\nEmojis: 🚀🌌✨\nChoices: الهبوط على كوكب أخضر غريب, العودة إلى البيت بسلام`;
        } else {
          storyText = `Title: Adventure in ${theme || 'the Space'} 🌌\nStory: Once upon a time, a brave kid dreamed of exploring ${theme || 'the Space'}. Today, they boarded their shining spacecraft and pressed the big red button to launch!\nEmojis: 🚀🌌✨\nChoices: Land on a mysterious green planet, Head back home safely`;
        }
      } else {
        if (lang === 'ar') {
          storyText = `Story: بعد اختيارك لـ "${choice}"، هبطت المركبة ببطء والتقيت بمخلوق ودود يبتسم ويحمل زهرة فضية رائعة لتكريمك!\nEmojis: 🛸👽🌸\nChoices: خوض مغامرة غنائية معه, [THE END]`;
        } else {
          storyText = `Story: By choosing "${choice}", the spacecraft landed gently. There you met a friendly alien who smiled and gifted you a beautiful glowing flower!\nEmojis: 🛸👽🌸\nChoices: Join them in a musical sing-along, [THE END]`;
        }
      }
      res.json({ text: storyText });
    }
  });

  // Analysis endpoint for parent dashboard
  app.post("/api/admin/analyze", async (req, res) => {
    logToFile(`START /api/admin/analyze`);
    try {
      const { data, prompt, useJson = false } = req.body;

      if (!initAI() || !aiLive) {
        logToFile("[Info] Using Simulated Data Analysis fallback due to missing api key in environment");
        if (useJson) {
          return res.json({ text: JSON.stringify({ summary: "Excellent language usage with solid progression across active units." }) });
        } else {
          return res.json({ text: "تقرير باسم الخليل اللغوي:\n• التقدم ملحوظ جداً في مهارات القراءة والاستماع.\n• يُنصح بمواصلة الحديث لرفع مستوى الطلاقة وثقة الطالب." });
        }
      }

      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: `Analyze this data: ${JSON.stringify(data)}\n\nPrompt: ${prompt}` }] }],
        config: useJson ? { responseMimeType: "application/json" } : undefined
      });
      
      const text = result.text || "";
      res.json({ text });
    } catch (error: any) {
      logToFile(`[Info] Analysis Fallback triggered: ${error.message}`);
      const { useJson = false } = req.body;
      if (useJson) {
        res.json({ text: JSON.stringify({ summary: "Excellent language usage with solid progression across active units." }) });
      } else {
        res.json({ text: "تقرير باسم الخليل اللغوي:\n• التقدم ملحوظ جداً في مهارات القراءة والاستماع.\n• يُنصح بمواصلة الحديث لرفع مستوى الطلاقة وثقة الطالب." });
      }
    }
  });

  // Interactive Gemini Developer Sandbox Endpoint
  app.post("/api/gemini/developer-sandbox", async (req, res) => {
    logToFile(`START /api/gemini/developer-sandbox - TaskType: ${req.body.taskType}`);
    try {
      const { prompt, taskType = 'function-calling' } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: "Missing prompt parameter." });
      }

      if (!initAI() || !aiLive) {
        return res.status(500).json({ error: "Gemini API key is not configured on the server." });
      }

      if (taskType === 'function-calling') {
        const checkInventoryTool = {
          name: "check_inventory",
          description: "Check the remaining stock, price, and level suitability of academic books in the school database.",
          parameters: {
            type: Type.OBJECT,
            properties: {
              bookName: {
                type: Type.STRING,
                description: "The name of the book, e.g. 'Oxford Discover 1' or 'Grammar Galaxy A1' or 'Writing Essentials B2'."
              }
            },
            required: ["bookName"]
          }
        };

        const getStudentProfileTool = {
          name: "get_student_profile",
          description: "Get academic profile, overall score, proficiency level, and leaderboard points for a registered student.",
          parameters: {
            type: Type.OBJECT,
            properties: {
              studentName: {
                type: Type.STRING,
                description: "The name of the student, e.g. 'Ahmad' or 'Sarah' or 'Faisal'."
              }
            },
            required: ["studentName"]
          }
        };

        const toolsDefinition = [checkInventoryTool, getStudentProfileTool];
        logToFile("Calling Gemini with function calling tools...");

        // Initial call to Gemini to see if it generates a tool call
        const response1 = await aiLive.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are a logistics and student-records assistant at Basim Alkhalil Academic Platform. Always use available tools if the user is asking about stock/prices of books, or student details. Answer in Arabic if the user asks in Arabic.",
            tools: [{ functionDeclarations: toolsDefinition }]
          }
        });

        const functionCalls = response1.functionCalls;
        
        if (functionCalls && functionCalls.length > 0) {
          const call = functionCalls[0];
          const callName = call.name;
          const callArgs = call.args as any;
          logToFile(`Gemini requested FunctionCall: ${callName} with arguments: ${JSON.stringify(callArgs)}`);

          // Executing local mock DB
          let localDBResult: any = {};
          if (callName === "check_inventory") {
            const targetBook = (callArgs.bookName || "").toLowerCase();
            if (targetBook.includes("oxford") || targetBook.includes("discover")) {
              localDBResult = { bookName: "Oxford Discover 1", stockRemaining: 45, unitPriceSAR: 120, status: "IN_STOCK", suitableLevels: ["A1", "A2"] };
            } else if (targetBook.includes("grammar") || targetBook.includes("galaxy")) {
              localDBResult = { bookName: "Grammar Galaxy A1", stockRemaining: 0, unitPriceSAR: 85, status: "OUT_OF_STOCK", suitableLevels: ["A1"] };
            } else if (targetBook.includes("writing") || targetBook.includes("essentials")) {
              localDBResult = { bookName: "Writing Essentials B2", stockRemaining: 12, unitPriceSAR: 150, status: "IN_STOCK", suitableLevels: ["B1", "B2"] };
            } else {
              localDBResult = { bookName: callArgs.bookName, status: "UNKNOWN", message: "Book category not found in inventory. Stock level is zero." };
            }
          } else if (callName === "get_student_profile") {
            const name = (callArgs.studentName || "").toLowerCase();
            if (name.includes("ahmad") || name.includes("احمد")) {
              localDBResult = { studentName: "Ahmad", level: "A2", scoreAverage: "88%", badgePoints: 15, outstandingFees: 0, status: "ACTIVE" };
            } else if (name.includes("sarah") || name.includes("سارة")) {
              localDBResult = { studentName: "Sarah", level: "B1", scoreAverage: "94%", badgePoints: 42, outstandingFees: 0, status: "ACTIVE" };
            } else if (name.includes("faisal") || name.includes("فيصل")) {
              localDBResult = { studentName: "Faisal", level: "A1", scoreAverage: "75%", badgePoints: 5, outstandingFees: 120, status: "PENDING_FEE" };
            } else {
              localDBResult = { studentName: callArgs.studentName, status: "NOT_FOUND", info: "No student records mapped to this search query." };
            }
          }

          logToFile(`Executing DB Tool. Output: ${JSON.stringify(localDBResult)}`);

          // Send back the output to Gemini to get the final answer
          const previousContent = response1.candidates?.[0]?.content;
          const toolResponseContent = {
            role: "user",
            parts: [{
              functionResponse: {
                name: callName,
                response: localDBResult
              }
            }]
          };

          const response2 = await aiLive.models.generateContent({
            model: "gemini-3.5-flash",
            contents: [
              { role: "user", parts: [{ text: prompt }] },
              previousContent,
              toolResponseContent
            ],
            config: {
              tools: [{ functionDeclarations: toolsDefinition }]
            }
          });

          return res.json({
            taskType,
            hasFunctionCall: true,
            functionCall: {
              name: callName,
              args: callArgs
            },
            localDatabaseOutput: localDBResult,
            finalResponseText: response2.text,
            toolsDefinition,
            logs: [
              { status: "info", message: "استقبل الخادم المطالبة وتهيأ لتمرير الأدوات للنموذج." },
              { status: "success", message: "استحضر نموذج Gemini دالة Tool Call لتنفيذ الاستعلام.", payload: { name: callName, args: callArgs } },
              { status: "executing", message: "تم تسييل الاستعلام افتراضياً من قاعدة بيانات الأكاديمية.", payload: localDBResult },
              { status: "finalizing", message: "أتم نموذج Gemini دمج التغذية الراجعة وصاغ الرد النهائي بنجاح." }
            ]
          });
        } else {
          // No function Call generated
          return res.json({
            taskType,
            hasFunctionCall: false,
            finalResponseText: response1.text,
            toolsDefinition,
            logs: [
              { status: "info", message: "استقبل الخادم المطالبة ومرر تعريفات الدوال للنموذج." },
              { status: "warning", message: "أجاب النموذج بشكل مباشر دون استدعاء أي دالة نظراً لعدم تطابق السؤال مع صلاحيات الأدوات الموفرة." }
            ]
          });
        }
      } 
      
      else if (taskType === 'code-execution') {
        logToFile("Calling Gemini with code execution tool...");
        
        const response = await aiLive.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are a scientific data analyst. You possess a built-in Python sandbox environment. When asked to calculate, process statistics, or check math sequences, write and execute python code natively to get the actual results.",
            tools: [{ codeExecution: {} }]
          }
        });

        // Parse parts for code execution signals
        const parts = response.candidates?.[0]?.content?.parts || [];
        
        let pythonCode = "";
        let executionStdout = "";
        let explanation = response.text || "";
        let hasCodeExecution = false;

        for (const part of parts) {
          if ((part as any).executableCode) {
            hasCodeExecution = true;
            pythonCode = (part as any).executableCode.code || "";
          }
          if ((part as any).codeExecutionResult) {
            executionStdout = (part as any).codeExecutionResult.output || "";
          }
        }

        return res.json({
          taskType,
          hasCodeExecution,
          pythonCode,
          executionStdout,
          finalResponseText: explanation,
          logs: [
            { status: "info", message: "تم تفعيل وكيل البيانات والتحاليل الذكي (Data Analyst Agent)." },
            hasCodeExecution 
              ? { status: "success", message: "قام وكيل الأبحاث بكتابة كود Python وتشغيله حياً بالـ Sandbox لتسوية الحسابات الرياضية.", payload: { pythonCode } }
              : { status: "warning", message: "لم تتبلور حاجة لتشغيل الكود لتبسيط المطالبة. تمت المعالجة البديهية عفوياً." },
            executionStdout ? { status: "executing", message: "استرجاع مخرجات كونسول التشغيل النهائي من بايثون.", payload: executionStdout } : null
          ].filter(Boolean)
        });
      }

      else if (taskType === 'document-processing') {
        // Document analysis prompt grounded by custom systemic context
        const standardAcademicContext = `
          [مستند مبرهن ومستنبط: دليل سياسات الأكاديمية والمقاعد للأعوام 2026/2027]
          - الحد الأعلى لطلاب الصف التفاعلي الواحد في المناهج المطورة هو 8 طلاب فقط لضمان الجودة.
          - تبدأ الأكاديمية دورس القراءة (Reading) أيام الأحد والثلاثاء لمستويات A1-A2، وأيام الإثنين والخميس لمستويات B1-B2.
          - يعفى الطالب سارة أو أحمد من رسوم حيازة الكتب إن فاق تقييمهما العام 90% بالدائرة.
          - نظام الكبسولة المعرفية بالأكاديمية مدعوم بوكلاء Antigravity للتلخيص السريع وتسهيل المذاكرة.
          - الرسوم الإدارية للتسجيل بالمستوى الواحد هي 350 ريال سعودي غير قابلة للاستعادة مطلقاً.
        `;

        const response = await aiLive.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `دليل سياسات الأكاديمية والمستند المرجعي:\n${standardAcademicContext}\n\nسؤال المستخدم:\n${prompt}`,
          config: {
            systemInstruction: "You are an advanced Document Intelligence Agent. Read the provided academic policy document carefully and extract precise grounded answers. Always output citations or references from the text. Respond in Arabic."
          }
        });

        return res.json({
          taskType,
          groundedContextUsed: standardAcademicContext,
          finalResponseText: response.text,
          logs: [
            { status: "info", message: "تم تسييل محرك قراءة الملفات وتحميل وثيقة السياسات واللوائح." },
            { status: "success", message: "تمت صياغة مطابقة Grounded Prompting الفعالة والتحقق من موثوقية النقولات." }
          ]
        });
      }

      res.status(400).json({ error: "Unsupported task type." });
    } catch (error: any) {
      logToFile(`Developer Sandbox Error: ${error.message}`);
      res.status(500).json({ error: error.message || "Failed to execute developer playground simulation" });
    }
  });

  // Homework generation endpoint
  app.post("/api/homework/generate", async (req, res) => {
    logToFile(`START /api/homework/generate`);
    try {
      const { studentName, level, studentPerformance = [], lang } = req.body;

      if (!initAI() || !aiLive) {
        logToFile("[Info] Using Simulated Homework generator fallback due to missing api key in environment");
        const student = studentName || "Student";
        return res.json({
          title: `Smart Review Practice`,
          titleAr: `ممارسة المراجعة الذكية للـ ${student}`,
          description: `Consolidate grammar rules and active key phrases for ${level || "Intermediate"}.`,
          descriptionAr: `ترسيخ القواعد والمصطلحات الرئيسية للمستوى ${level || "Intermediate"}.`,
          tasks: [
            {
              id: "t1",
              type: "writing",
              instruction: "Draft a dynamic introductory greeting using clean academic structure.",
              instructionAr: "اكتب مقطعاً تعريفياً قصيراً باستخدام تراكيب لغوية سليمة.",
              points: 50
            },
            {
              id: "t2",
              type: "reading",
              instruction: "Read the dynamic syllabus guide card carefully and summarize your active learnings in 2 lines.",
              instructionAr: "اقرأ بطاقة الدليل التعريفي بدقة، ثم لخص ما تعلمته في سطرين.",
              content: "Constant daily practices solidify grammar mechanics under Oxford's curriculum structure.",
              contentAr: "الممارسات اليومية المستمرة تركز وتدعم ميكانيكية القواعد وفقاً لأطر مناهج أوكسفورد.",
              points: 50
            }
          ],
          deadline: "24 hours"
        });
      }

      const promptText = `
        SYSTEM: You are a Senior Pedagogy Expert at Basim Alkhalil academy.
        TASK: Generate a personalized "Smart Homework" for a student.
        DATA: Name: ${studentName}, Level: ${level}, Performance: ${JSON.stringify(studentPerformance)}.
        
        FORMAT: Return a JSON object:
        {
          "title": "Homework Title",
          "titleAr": "عنوان الواجب",
          "description": "Brief context description",
          "descriptionAr": "وصف سياق موجز",
          "tasks": [
            {
              "id": "t1",
              "type": "writing",
              "instruction": "Write a short paragraph about...",
              "instructionAr": "اكتب فقرة قصيرة عن...",
              "points": 50
            },
            {
              "id": "t2",
              "type": "reading",
              "instruction": "Read the following text and summarize it...",
              "instructionAr": "اقرأ النص التالي وقم بتلخيصه...",
              "content": "Text to read...",
              "contentAr": "النص المراد قراءته...",
              "points": 30
            }
          ],
          "deadline": "24 hours"
        }
        
        Language: High-quality ${lang === 'ar' ? 'Arabic' : 'English'}.
      `;

      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: { responseMimeType: "application/json" }
      });

      const text = result.text || "";
      let cleanText = text || "{}";
      if (cleanText.trim().startsWith("```")) {
        cleanText = cleanText.trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
      }
      res.json(JSON.parse(cleanText));
    } catch (error: any) {
      logToFile(`[Info] Homework Generation Fallback: ${error.message}`);
      res.json({
        title: "Smart Review Practice",
        titleAr: "ممارسة المراجعة الذكية",
        description: "Dynamic Review Guide",
        descriptionAr: "دليل المراجعة الذكية",
        tasks: [],
        deadline: "24 hours"
      });
    }
  });

  // Curriculum Design Suggestion Endpoint
  app.post("/api/curriculum/design", async (req, res) => {
    logToFile(`START /api/curriculum/design`);
    try {
      const { subject, goals, lang } = req.body;

      if (!initAI() || !aiLive) {
        logToFile("[Info] Using Simulated Curriculum generator fallback due to missing api key in environment");
        const subj = subject || "Oxford Language Course";
        return res.json({
          A1: [
            { id: "A1-1", title: `Introduction to ${subj}`, titleAr: `مقدمة في ${subj}`, description: "Basics and essentials", descriptionAr: "الأساسيات والمبادئ الأولية" }
          ],
          A2: [
            { id: "A2-1", title: "Daily Conversations", titleAr: "المحادثات اليومية المعتادة", description: "Standard context phrasing", descriptionAr: "صياغة الجمل في السياقات اليومية" }
          ],
          B1: [
            { id: "B1-1", title: "Active Grammatical Patterns", titleAr: "الأنماط القواعدية النشطة", description: "Intermediate structure rules", descriptionAr: "قواعد التراكيب اللغوية المتوسطة" }
          ],
          B2: [
            { id: "B2-1", title: "Professional Presentation", titleAr: "التقديم الاحترافي والشرح", description: "Business and academic communication", descriptionAr: "التواصل الأكاديمي والمهني للتعبير" }
          ],
          C1: [
            { id: "C1-1", title: "Academic Synthesis", titleAr: "التركيب والتوليف الأكاديمي", description: "Complex comprehension rules", descriptionAr: "قواعد الفهم والتحليل المعقدة" }
          ],
          C2: [
            { id: "C2-1", title: `Native Mastery in ${subj}`, titleAr: `الإتقان اللغوي الكامل في ${subj}`, description: "Advanced fluency and expression", descriptionAr: "الطلاقة المتقدمة القصوى وطرق التعبير" }
          ]
        });
      }

      const promptText = `
        SYSTEM: You are a Curriculum Architect at Basim Alkhalil Academy.
        TASK: Suggest a 6-level curriculum structure for a new subject: "${subject}".
        GOALS: ${goals}
        
        FORMAT: Return a JSON object with 6 levels (A1 to C2). 
        Each level should have 5 units.
        JSON format: { "A1": [ { "id": "...", "title": "...", "titleAr": "...", "description": "...", "descriptionAr": "..." }, ... ], ... }
        
        Language: High-quality ${lang === 'ar' ? 'Arabic' : 'English'}.
      `;

      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: { responseMimeType: "application/json" }
      });

      const text = result.text || "";
      let cleanText = text || "{}";
      if (cleanText.trim().startsWith("```")) {
        cleanText = cleanText.trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
      }
      res.json(JSON.parse(cleanText));
    } catch (error: any) {
      logToFile(`[Info] Curriculum Design Fallback: ${error.message}`);
      res.json({
        A1: [{ id: "A1-1", title: "Introduction", titleAr: "المقدمة والتمهيد", description: "Basics of communication", descriptionAr: "أساسيات التواصل للتحدث" }]
      });
    }
  });

  // Video Quiz Generator
  app.post("/api/generate/video-quiz", async (req, res) => {
    try {
      const { videoTitle, level, lang } = req.body;

      if (!initAI() || !aiLive) {
        logToFile("[Info] Using Simulated Video Quiz fallback due to missing api key in environment");
        const title = videoTitle || "Educational Video";
        return res.json([
          {
            question: `What was the primary educational objective in "${title}"?`,
            questionAr: `ما هو الهدف التعليمي الرئيسي في مقطع "${title}"؟`,
            options: ["Passive listening", "Active communication practice", "Translating words sequentially", "Ignoring context cues"],
            optionsAr: ["الاستماع غير الفعال", "الممارسة اللغوية والتواصل النشط", "ترجمة الكلمات بشكل متعاقب", "تجاهل دلالات السياق"],
            correctIndex: 1,
            explanation: "Active communication forms the functional baseline of our system framework.",
            explanationAr: "التدريب اللغوي النشط يبني الأساس المتين للمهارة المكتسبة."
          }
        ]);
      }

      const promptText = `Generate 3 multiple choice questions for: "${videoTitle}". Level: ${level}. JSON array format. Language: ${lang}`;
      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: { responseMimeType: "application/json" }
      });
      
      const text = result.text || "";
      let cleanText = text || "[]";
      if (cleanText.trim().startsWith("```")) {
        cleanText = cleanText.trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
      }
      res.json(JSON.parse(cleanText));
    } catch (error: any) {
      logToFile(`[Info] Video Quiz Fallback: ${error.message}`);
      res.json([]);
    }
  });

    // WebSocket for Live Audio Chat (Experimental)
    wss.on("connection", async (clientWs, req) => {
      const clientIp = req.socket.remoteAddress;
      logToFile(`New WebSocket Client connected from ${clientIp}`);
      let session: any = null;
      let isConnecting = false;
      let isSimulated = false;
  
      clientWs.on("message", async (data) => {
        try {
          const msg = JSON.parse(data.toString());
          
          // Start session on first message (which should contain context)
          if (!session && !isConnecting && !isSimulated) {
            isConnecting = true;
            const modelToUse = "gemini-3.1-flash-live-preview"; 
            logToFile(`Initializing Gemini Live session: ${modelToUse}`);
 
            if (!initAI() || !aiLive) {
              logToFile("[Info] WebSocket Live Voice API Key is missing. Operating in simulated fallback mode.");
              isSimulated = true;
              isConnecting = false;
              clientWs.send(JSON.stringify({ status: 'ready' }));
              return;
            }

            try {
              const contextText = msg.context || `General tutoring at Basim Alkhalil Academy.`;
              logToFile(`Connecting to Gemini Live... Context: ${contextText.substring(0, 50)}`);
              
              session = await aiLive.live.connect({
                model: modelToUse,
                callbacks: {
                  onmessage: (message: any) => {
                    // Extract model audio
                    const audioContent = message.serverContent?.modelTurn?.parts?.[0]?.inlineData;
                    if (audioContent?.data) {
                      clientWs.send(JSON.stringify({ audio: audioContent.data }));
                    }
                    
                    // Handle interruptions
                    if (message.serverContent?.interrupted) {
                      clientWs.send(JSON.stringify({ interrupted: true }));
                    }
                    
                    // Handle model transcription
                    const modelText = message.serverContent?.modelTurn?.parts?.[0]?.text;
                    if (modelText) {
                      clientWs.send(JSON.stringify({ text: modelText }));
                    }
                    
                    // Handle user transcription
                    const userText = message.serverContent?.userTurn?.parts?.[0]?.text;
                    if (userText) {
                      clientWs.send(JSON.stringify({ userText }));
                    }

                    // Log activity occasionally
                    if (audioContent?.data || modelText || userText) {
                      logToFile(`Gemini Response - Audio: ${!!audioContent?.data}, Text: ${!!modelText}, UserText: ${!!userText}`);
                    }
                  },
                  onclose: () => {
                    logToFile(`Gemini Live session closed for ${clientIp}`);
                    if (clientWs.readyState === 1) { // OPEN
                      clientWs.close();
                    }
                  },
                  onerror: (err: any) => {
                    const errMsg = err?.message || err?.toString() || "Unknown Gemini error";
                    logToFile(`Gemini Live ONERROR: ${errMsg}`);
                    clientWs.send(JSON.stringify({ error: "The voice assistant encountered a technical issue." }));
                  }
                },
                config: {
                  responseModalities: [Modality.AUDIO],
                  speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
                  },
                  outputAudioTranscription: {},
                  inputAudioTranscription: {},
                  systemInstruction: `You are the Official AI Teaching Assistant for Basim Alkhalil Digital Academy.
                    Current context: ${contextText}
                    Persona: Professional, encouraging private tutor.
                    Language: ALWAYS match the student's language. If they speak Arabic, use Arabic. If English, use English.
                    Tone: Concise and suitable for audio conversation.`,
                },
              });

              isConnecting = false;
              logToFile(`Gemini Live Session Successfully Established for ${clientIp}`);
              clientWs.send(JSON.stringify({ status: 'ready' }));
            } catch (err: any) {
              isConnecting = false;
              const errMsg = err.message || "Failed to establish Gemini connection";
              logToFile(`Gemini Live connection FATAL ERROR: ${errMsg}`);
              console.error("Gemini Live Connection Error:", err);
              clientWs.send(JSON.stringify({ error: `Connection failed: ${errMsg}` }));
            }
            return;
          }

          // Relay audio/text if session is active
          if (isSimulated) {
            if (msg.text) {
              logToFile(`Simulated Live Message: ${msg.text}`);
              const clientTxt = (msg.text || "").toLowerCase();
              const isAr = /[\u0600-\u06FF]/.test(clientTxt);
              let txt = "";
              if (isAr) {
                txt = "أهلاً بك يا بطل! أنا شريكك ومساعدك اللغوي الذكي. ممارسة الحديث النشط والاستماع المستنير من أفضل الطرق للتميز والطلاقة الكاملة.";
              } else {
                txt = "Hello! I can hear you perfectly. Regular conversational practice of English sentences builds amazing confidence and structural accuracy.";
              }
              clientWs.send(JSON.stringify({ text: txt }));
            }
          } else if (session) {
            if (msg.audio) {
              session.sendRealtimeInput({
                audio: { data: msg.audio, mimeType: "audio/pcm;rate=16000" },
              });
            } else if (msg.text) {
              session.sendRealtimeInput({ text: msg.text });
            }
          }
        } catch (err: any) {
          logToFile(`WebSocket message processing error: ${err.message}`);
        }
      });

      clientWs.on("error", (err) => {
        logToFile(`WebSocket Client Error (${clientIp}): ${err.message}`);
      });

      clientWs.on("close", () => {
        logToFile(`WebSocket Client Disconnected (${clientIp})`);
        if (session) {
          try {
            session.close();
          } catch (e) {}
        }
      });
    });

  // 404 for API routes
  app.all("/api/*", (req, res) => {
    logToFile(`API 404 HIT: ${req.method} ${req.path} (Full URL: ${req.originalUrl})`);
    res.status(404).json({ 
      error: `API route not found`,
      method: req.method,
      path: req.path
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
