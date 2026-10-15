/** Everyday English — Level 1: 30 real-life scenarios (hand-written). Sara plays the staff/other person (A); the student is B. */
export interface SaraDailyLine { sp: 'A' | 'B'; en: string; ar: string }
export interface SaraDailyLesson { id: string; order: number; levelId: 'a' | 'b' | 'c' | 'd'; titleAr: string; titleEn: string; icon: string; introAr: string; phrases: { en: string; ar: string }[]; dialogue: SaraDailyLine[] }
type R = [string, string, string, string, [string, string][], ['A' | 'B', string, string][]];
const RAW: R[] = [
[
"في المطار: تسجيل الدخول",
"At the Airport: Check-in",
"🛫",
"عند كاونتر الطيران يطلبون جوازك ويسألون عن الشنط. أهم العبارات: I'd like to check in للتسجيل، و window seat أو aisle seat لاختيار المقعد، و boarding pass بطاقة الصعود.",
[
[
"I'd like to check in, please.",
"أبي أسجّل دخول الرحلة لو سمحت."
],
[
"Can I have a window seat?",
"ممكن مقعد جنب الشباك؟"
],
[
"How many bags can I take?",
"كم شنطة أقدر آخذ؟"
],
[
"Here is your boarding pass.",
"تفضل بطاقة الصعود."
]
],
[
[
"A",
"Good morning. Passport, please.",
"صباح الخير. الجواز لو سمحت."
],
[
"B",
"Here you are. I'd like to check in, please.",
"تفضلي. أبي أسجّل دخول الرحلة."
],
[
"A",
"Window or aisle seat?",
"شباك ولا ممر؟"
],
[
"B",
"A window seat, please.",
"شباك لو سمحتي."
]
]
],
[
"في المطار: الجوازات والجمارك",
"Passport Control",
"🛂",
"موظف الجوازات يسأل عن سبب الزيارة ومدتها ومكان السكن. جاوب بجمل قصيرة وواضحة: I'm here on holiday، و for two weeks.",
[
[
"What is the purpose of your visit?",
"وش سبب زيارتك؟"
],
[
"I'm here on holiday.",
"أنا هنا للسياحة."
],
[
"How long are you staying?",
"كم مدة إقامتك؟"
],
[
"I'm staying at a hotel.",
"ساكن في فندق."
]
],
[
[
"A",
"What is the purpose of your visit?",
"وش سبب زيارتك؟"
],
[
"B",
"I'm here on holiday.",
"أنا هنا للسياحة."
],
[
"A",
"How long are you staying?",
"كم بتجلس؟"
],
[
"B",
"For two weeks.",
"أسبوعين."
]
]
],
[
"في الطائرة",
"On the Plane",
"💺",
"المضيفة تعرض الأكل والشرب وتطلب ربط الحزام. تقدر تطلب بأدب: Could I have some water? وتسأل: Can I change seats?",
[
[
"Could I have some water, please?",
"ممكن موية لو سمحتي؟"
],
[
"Chicken or fish?",
"دجاج ولا سمك؟"
],
[
"Please fasten your seatbelt.",
"اربط الحزام لو سمحت."
],
[
"Excuse me, is this seat free?",
"لو سمحت، هذا المقعد فاضي؟"
]
],
[
[
"A",
"Would you like chicken or fish?",
"تبي دجاج ولا سمك؟"
],
[
"B",
"Chicken, please.",
"دجاج لو سمحتي."
],
[
"A",
"Anything to drink?",
"تبي شي تشربه؟"
],
[
"B",
"Could I have some water, please?",
"ممكن موية لو سمحتي؟"
]
]
],
[
"استلام الشنط المفقودة",
"Lost Luggage",
"🧳",
"إذا ضاعت شنطتك روح لمكتب الأمتعة وقل: My bag didn't arrive. بيطلبون رقم الرحلة ووصف الشنطة: لونها وحجمها.",
[
[
"My bag didn't arrive.",
"شنطتي ما وصلت."
],
[
"What does it look like?",
"كيف شكلها؟"
],
[
"It's a big black suitcase.",
"شنطة سفر سوداء كبيرة."
],
[
"Here is my flight number.",
"هذا رقم رحلتي."
]
],
[
[
"A",
"How can I help you?",
"كيف أقدر أساعدك؟"
],
[
"B",
"My bag didn't arrive.",
"شنطتي ما وصلت."
],
[
"A",
"What does it look like?",
"كيف شكلها؟"
],
[
"B",
"It's a big black suitcase.",
"شنطة سفر سوداء كبيرة."
]
]
],
[
"في الفندق: تسجيل الوصول",
"Hotel Check-in",
"🏨",
"في الاستقبال قل: I have a reservation وبعدها اسمك. واسأل عن الفطور والواي فاي: What time is breakfast? و What's the Wi-Fi password?",
[
[
"I have a reservation.",
"عندي حجز."
],
[
"What time is breakfast?",
"متى الفطور؟"
],
[
"What's the Wi-Fi password?",
"وش رمز الواي فاي؟"
],
[
"Here is your room key.",
"تفضل مفتاح غرفتك."
]
],
[
[
"A",
"Good evening. How can I help?",
"مساء الخير. كيف أساعدك؟"
],
[
"B",
"I have a reservation. My name is Ahmed.",
"عندي حجز. اسمي أحمد."
],
[
"A",
"Room 305. Here is your key.",
"غرفة ٣٠٥. تفضل المفتاح."
],
[
"B",
"Thank you. What time is breakfast?",
"شكرًا. متى الفطور؟"
]
]
],
[
"في الفندق: مشكلة في الغرفة",
"Hotel Room Problem",
"🔧",
"إذا فيه مشكلة اتصل بالاستقبال وقل وش الخربان: The air conditioner isn't working. واطلب: Could you send someone? أو Can I change rooms?",
[
[
"The air conditioner isn't working.",
"المكيف خربان."
],
[
"Could you send someone, please?",
"ممكن ترسلون أحد؟"
],
[
"Can I change rooms?",
"أقدر أغيّر الغرفة؟"
],
[
"I need more towels.",
"أحتاج مناشف زيادة."
]
],
[
[
"A",
"Reception, how can I help?",
"الاستقبال، كيف أساعدك؟"
],
[
"B",
"The air conditioner isn't working.",
"المكيف ما يشتغل."
],
[
"A",
"I'm sorry. I'll send someone now.",
"آسفين. بنرسل أحد الحين."
],
[
"B",
"Thank you. I also need more towels.",
"شكرًا. وأحتاج مناشف زيادة بعد."
]
]
],
[
"في المطعم: الطلب",
"Restaurant: Ordering",
"🍽️",
"الجرسون يسأل: Are you ready to order? قل I'd like... بدل I want لأنها ألطف. واسأل: What do you recommend? يعني وش تنصحني؟",
[
[
"A table for two, please.",
"طاولة لشخصين لو سمحت."
],
[
"I'd like the grilled chicken.",
"أبي الدجاج المشوي."
],
[
"What do you recommend?",
"وش تنصحني؟"
],
[
"Can I see the menu?",
"ممكن أشوف المنيو؟"
]
],
[
[
"A",
"Are you ready to order?",
"جاهز تطلب؟"
],
[
"B",
"What do you recommend?",
"وش تنصحني؟"
],
[
"A",
"The grilled fish is very good.",
"السمك المشوي ممتاز."
],
[
"B",
"OK, I'd like the grilled fish, please.",
"طيب، أبي السمك المشوي لو سمحت."
]
]
],
[
"في المطعم: الحساب",
"Restaurant: The Bill",
"🧾",
"في آخر الوجبة قل: Could I have the bill, please? وإذا تبي تدفع بالبطاقة: Can I pay by card? وإذا الحساب غلط: I think there's a mistake.",
[
[
"Could I have the bill, please?",
"ممكن الحساب لو سمحت؟"
],
[
"Can I pay by card?",
"أقدر أدفع بالبطاقة؟"
],
[
"I think there's a mistake.",
"أظن فيه غلط."
],
[
"Keep the change.",
"خلّ الباقي لك."
]
],
[
[
"A",
"Would you like anything else?",
"تبي شي ثاني؟"
],
[
"B",
"No, thanks. Could I have the bill, please?",
"لا شكرًا. ممكن الحساب؟"
],
[
"A",
"Here you are. Cash or card?",
"تفضل. كاش ولا بطاقة؟"
],
[
"B",
"Can I pay by card?",
"أقدر أدفع بالبطاقة؟"
]
]
],
[
"في المقهى",
"At the Café",
"☕",
"في الكوفي تطلب الحجم والنوع: A large latte, please. ويسألونك: For here or to go? يعني هنا ولا سفري.",
[
[
"A large latte, please.",
"لاتيه كبير لو سمحت."
],
[
"For here or to go?",
"هنا ولا سفري؟"
],
[
"To go, please.",
"سفري لو سمحت."
],
[
"No sugar, please.",
"بدون سكر لو سمحت."
]
],
[
[
"A",
"Hi! What can I get you?",
"هلا! وش أجيب لك؟"
],
[
"B",
"A large latte, please. No sugar.",
"لاتيه كبير لو سمحت، بدون سكر."
],
[
"A",
"For here or to go?",
"هنا ولا سفري؟"
],
[
"B",
"To go, please.",
"سفري لو سمحت."
]
]
],
[
"عند الطبيب",
"At the Doctor",
"🩺",
"الطبيب يسأل: What's the problem? وصف الألم: I have a headache أو I have a fever، وقل من متى: since yesterday أو for three days.",
[
[
"I don't feel well.",
"ما أحس إني بخير."
],
[
"I have a fever.",
"عندي حرارة."
],
[
"It started yesterday.",
"بدأ أمس."
],
[
"Do I need medicine?",
"أحتاج دواء؟"
]
],
[
[
"A",
"What seems to be the problem?",
"وش المشكلة؟"
],
[
"B",
"I have a fever and a headache.",
"عندي حرارة وصداع."
],
[
"A",
"How long have you had it?",
"من متى؟"
],
[
"B",
"It started yesterday.",
"بدأ أمس."
]
]
],
[
"في الصيدلية",
"At the Pharmacy",
"💊",
"في الصيدلية اطلب الدواء أو قل الأعراض: Do you have something for a cough? واسأل عن الجرعة: How often should I take it?",
[
[
"Do you have something for a cough?",
"عندكم شي للكحة؟"
],
[
"How often should I take it?",
"كم مرة آخذه؟"
],
[
"Twice a day after meals.",
"مرتين باليوم بعد الأكل."
],
[
"Do I need a prescription?",
"أحتاج وصفة طبية؟"
]
],
[
[
"A",
"Can I help you?",
"أقدر أساعدك؟"
],
[
"B",
"Do you have something for a cough?",
"عندكم شي للكحة؟"
],
[
"A",
"Yes, try this syrup.",
"إيه، جرّب هذا الشراب."
],
[
"B",
"How often should I take it?",
"كم مرة آخذه؟"
]
]
],
[
"في الطوارئ",
"Emergencies",
"🚨",
"في الطوارئ تكلّم بسرعة ووضوح: Help! و Call an ambulance! وقل وين أنت: I'm on King Fahd Road. رقم الطوارئ في السعودية 911.",
[
[
"Help!",
"الحقوا!/ساعدوني!"
],
[
"Call an ambulance!",
"اتصلوا بالإسعاف!"
],
[
"There's been an accident.",
"صار حادث."
],
[
"Is anyone hurt?",
"فيه أحد متأذي؟"
]
],
[
[
"A",
"Emergency. What's happened?",
"الطوارئ. وش صار؟"
],
[
"B",
"There's been an accident.",
"صار حادث."
],
[
"A",
"Is anyone hurt?",
"فيه أحد متأذي؟"
],
[
"B",
"Yes, please send an ambulance.",
"إيه، أرسلوا إسعاف لو سمحتوا."
]
]
],
[
"التسوق: الملابس",
"Shopping for Clothes",
"👕",
"في محل الملابس اسأل عن المقاس: Do you have this in medium? وقبل لا تشتري: Can I try it on? يعني أقدر أقيسه؟",
[
[
"Can I try it on?",
"أقدر أقيسه؟"
],
[
"Do you have this in medium?",
"عندكم منه مقاس وسط؟"
],
[
"Where is the fitting room?",
"وين غرفة القياس؟"
],
[
"It's too small.",
"صغير مرة."
]
],
[
[
"A",
"Can I help you?",
"أساعدك بشي؟"
],
[
"B",
"Do you have this shirt in medium?",
"عندكم هالقميص مقاس وسط؟"
],
[
"A",
"Yes, here you are.",
"إيه، تفضل."
],
[
"B",
"Thanks. Can I try it on?",
"شكرًا. أقدر أقيسه؟"
]
]
],
[
"التسوق: السعر والإرجاع",
"Prices & Returns",
"🏷️",
"اسأل عن السعر: How much is this? وإذا تبي ترجّع شي: I'd like to return this. بيطلبون منك الفاتورة: receipt.",
[
[
"How much is this?",
"بكم هذا؟"
],
[
"Is there a discount?",
"فيه خصم؟"
],
[
"I'd like to return this.",
"أبي أرجّع هذا."
],
[
"Here is my receipt.",
"هذي فاتورتي."
]
],
[
[
"A",
"Hello. How can I help?",
"هلا. كيف أساعدك؟"
],
[
"B",
"I'd like to return this, please.",
"أبي أرجّع هذا لو سمحت."
],
[
"A",
"Do you have the receipt?",
"معك الفاتورة؟"
],
[
"B",
"Yes, here is my receipt.",
"إيه، هذي الفاتورة."
]
]
],
[
"في السوبرماركت",
"At the Supermarket",
"🛒",
"إذا ما لقيت شي اسأل: Where can I find the milk? والموظف يقول: In aisle 5 يعني في الممر الخامس. وعند الكاشير: Do you need a bag?",
[
[
"Where can I find the milk?",
"وين ألقى الحليب؟"
],
[
"It's in aisle five.",
"في الممر الخامس."
],
[
"Do you need a bag?",
"تحتاج كيس؟"
],
[
"That's all, thanks.",
"بس كذا، شكرًا."
]
],
[
[
"A",
"Excuse me, can I help you?",
"لو سمحت، أساعدك؟"
],
[
"B",
"Yes. Where can I find the milk?",
"إيه. وين ألقى الحليب؟"
],
[
"A",
"It's in aisle five.",
"في الممر الخامس."
],
[
"B",
"Thank you very much.",
"شكرًا جزيلًا."
]
]
],
[
"في التاكسي",
"In a Taxi",
"🚕",
"قل وين تبي تروح: To the airport, please. واسأل: How much will it cost? و How long will it take? وإذا تبي تنزل: Please stop here.",
[
[
"To the airport, please.",
"للمطار لو سمحت."
],
[
"How much will it cost?",
"كم بتكلف؟"
],
[
"How long will it take?",
"كم ياخذ وقت؟"
],
[
"Please stop here.",
"وقّف هنا لو سمحت."
]
],
[
[
"A",
"Where to?",
"وين؟"
],
[
"B",
"To the airport, please.",
"للمطار لو سمحت."
],
[
"A",
"OK. It takes about thirty minutes.",
"طيب. ياخذ حوالي نص ساعة."
],
[
"B",
"How much will it cost?",
"كم بتكلف؟"
]
]
],
[
"السؤال عن الطريق",
"Asking for Directions",
"🧭",
"اسأل بأدب: Excuse me, how do I get to the museum? وانتبه للاتجاهات: turn left، go straight، it's on your right.",
[
[
"How do I get to the museum?",
"كيف أوصل للمتحف؟"
],
[
"Go straight and turn left.",
"روح على طول ولف يسار."
],
[
"It's on your right.",
"على يمينك."
],
[
"Is it far from here?",
"بعيد من هنا؟"
]
],
[
[
"A",
"Can I help you?",
"أساعدك؟"
],
[
"B",
"Excuse me, how do I get to the museum?",
"لو سمحت، كيف أوصل للمتحف؟"
],
[
"A",
"Go straight and turn left. It's on your right.",
"روح على طول ولف يسار، بيكون على يمينك."
],
[
"B",
"Is it far from here?",
"بعيد من هنا؟"
]
]
],
[
"في البنك",
"At the Bank",
"🏦",
"في البنك قل وش تبي: I'd like to open an account أو I want to transfer money. بيطلبون هويتك: ID.",
[
[
"I'd like to open an account.",
"أبي أفتح حساب."
],
[
"I want to transfer money.",
"أبي أحوّل فلوس."
],
[
"Can I see your ID?",
"ممكن هويتك؟"
],
[
"My card isn't working.",
"بطاقتي ما تشتغل."
]
],
[
[
"A",
"Good morning. How can I help?",
"صباح الخير. كيف أساعدك؟"
],
[
"B",
"I'd like to open an account.",
"أبي أفتح حساب."
],
[
"A",
"Sure. Can I see your ID?",
"أكيد. ممكن هويتك؟"
],
[
"B",
"Here you are.",
"تفضلي."
]
]
],
[
"في المدرسة: أول يوم",
"First Day at School",
"🏫",
"في أول يوم عرّف بنفسك واسأل: Where is my classroom? وإذا ما فهمت قل للمعلم: Could you repeat that, please?",
[
[
"Where is my classroom?",
"وين فصلي؟"
],
[
"I'm new here.",
"أنا جديد هنا."
],
[
"Could you repeat that, please?",
"ممكن تعيد لو سمحت؟"
],
[
"May I go to the bathroom?",
"ممكن أروح الحمّام؟"
]
],
[
[
"A",
"Hi! Are you new here?",
"هلا! أنت جديد؟"
],
[
"B",
"Yes, I'm new here. Where is my classroom?",
"إيه، أنا جديد. وين فصلي؟"
],
[
"A",
"It's room 12, next to the library.",
"غرفة ١٢، جنب المكتبة."
],
[
"B",
"Thank you!",
"شكرًا!"
]
]
],
[
"مقابلة عمل: التعريف بنفسك",
"Job Interview: About You",
"💼",
"أول سؤال غالبًا: Tell me about yourself. جاوب عن دراستك وخبرتك باختصار: I studied... و I have two years of experience in...",
[
[
"Tell me about yourself.",
"كلمني عن نفسك."
],
[
"I studied computer science.",
"درست علوم حاسب."
],
[
"I have two years of experience.",
"عندي خبرة سنتين."
],
[
"I'm good at working in a team.",
"أنا شاطر في العمل الجماعي."
]
],
[
[
"A",
"Tell me about yourself.",
"كلمني عن نفسك."
],
[
"B",
"I studied computer science, and I have two years of experience.",
"درست علوم حاسب، وعندي خبرة سنتين."
],
[
"A",
"What are your strengths?",
"وش نقاط قوتك؟"
],
[
"B",
"I'm good at working in a team.",
"أنا شاطر في العمل الجماعي."
]
]
],
[
"مقابلة عمل: الأسئلة الأخيرة",
"Job Interview: Final Questions",
"🤝",
"في آخر المقابلة يسألونك: Do you have any questions? اسأل سؤال ذكي: What are the working hours? وودّعهم: Thank you for your time.",
[
[
"Do you have any questions?",
"عندك أسئلة؟"
],
[
"What are the working hours?",
"وش ساعات الدوام؟"
],
[
"When can you start?",
"متى تقدر تبدأ؟"
],
[
"Thank you for your time.",
"شكرًا على وقتك."
]
],
[
[
"A",
"Do you have any questions?",
"عندك أي أسئلة؟"
],
[
"B",
"Yes. What are the working hours?",
"إيه. وش ساعات الدوام؟"
],
[
"A",
"From eight to four. When can you start?",
"من ثمانية لأربعة. متى تقدر تبدأ؟"
],
[
"B",
"Next month. Thank you for your time.",
"الشهر الجاي. شكرًا على وقتك."
]
]
],
[
"مكالمة هاتفية: حجز موعد",
"Phone: Booking an Appointment",
"📞",
"في الجوال عرّف بنفسك: Hello, this is Sara. واطلب: I'd like to book an appointment. وإذا الوقت ما يناسب: Is Tuesday OK?",
[
[
"I'd like to book an appointment.",
"أبي أحجز موعد."
],
[
"Is Tuesday OK?",
"يناسب الثلاثاء؟"
],
[
"What time is good for you?",
"أي وقت يناسبك؟"
],
[
"See you then.",
"نشوفك وقتها."
]
],
[
[
"A",
"Hello, Smile Dental Clinic.",
"ألو، عيادة سمايل للأسنان."
],
[
"B",
"Hello. I'd like to book an appointment.",
"هلا. أبي أحجز موعد."
],
[
"A",
"Is Tuesday at ten OK?",
"يناسبك الثلاثاء الساعة عشر؟"
],
[
"B",
"Yes, that's fine. See you then.",
"إيه، تمام. نشوفكم وقتها."
]
]
],
[
"مكالمة هاتفية: ترك رسالة",
"Phone: Leaving a Message",
"☎️",
"إذا الشخص مو موجود قل: Can I leave a message? وعط اسمك ورقمك: Please ask him to call me back.",
[
[
"Can I speak to Mr. Khalid?",
"أقدر أكلم أستاذ خالد؟"
],
[
"He's not here right now.",
"مو موجود الحين."
],
[
"Can I leave a message?",
"أقدر أترك رسالة؟"
],
[
"Please ask him to call me back.",
"خلّه يتصل فيني لو سمحت."
]
],
[
[
"A",
"Good morning, ABC Company.",
"صباح الخير، شركة ABC."
],
[
"B",
"Can I speak to Mr. Khalid, please?",
"أقدر أكلم أستاذ خالد لو سمحتي؟"
],
[
"A",
"Sorry, he's not here right now.",
"آسفة، مو موجود الحين."
],
[
"B",
"Can I leave a message? Please ask him to call me back.",
"أقدر أترك رسالة؟ خلّيه يتصل فيني."
]
]
],
[
"تأجير سيارة",
"Renting a Car",
"🚗",
"في مكتب التأجير قل: I'd like to rent a car for three days. واسأل: Is insurance included? وبيطلبون رخصة القيادة: driving licence.",
[
[
"I'd like to rent a car.",
"أبي أستأجر سيارة."
],
[
"For three days.",
"لمدة ثلاث أيام."
],
[
"Is insurance included?",
"التأمين داخل؟"
],
[
"Here is my driving licence.",
"هذي رخصة القيادة."
]
],
[
[
"A",
"How can I help you?",
"كيف أساعدك؟"
],
[
"B",
"I'd like to rent a car for three days.",
"أبي أستأجر سيارة ثلاث أيام."
],
[
"A",
"Sure. Can I see your driving licence?",
"أكيد. ممكن رخصة القيادة؟"
],
[
"B",
"Here you are. Is insurance included?",
"تفضلي. التأمين داخل؟"
]
]
],
[
"عند الحلاق",
"At the Barber",
"💈",
"قل للحلاق وش تبي: Just a trim, please يعني تخفيف بس، أو Short on the sides. وإذا تبي تشوف: Can I see it?",
[
[
"Just a trim, please.",
"تخفيف بس لو سمحت."
],
[
"Short on the sides.",
"قصير على الجوانب."
],
[
"Not too short.",
"مو قصير مرة."
],
[
"How much is a haircut?",
"بكم الحلاقة؟"
]
],
[
[
"A",
"What would you like today?",
"وش تبي اليوم؟"
],
[
"B",
"Just a trim, please. Not too short.",
"تخفيف بس لو سمحت، مو قصير مرة."
],
[
"A",
"And the sides?",
"والجوانب؟"
],
[
"B",
"Short on the sides, please.",
"قصير على الجوانب لو سمحت."
]
]
],
[
"في الصالة الرياضية",
"At the Gym",
"🏋️",
"إذا تبي تشترك قل: I'd like to join the gym. واسأل: How much is a monthly membership? و Can someone show me how to use this?",
[
[
"I'd like to join the gym.",
"أبي أشترك في النادي."
],
[
"How much is a monthly membership?",
"بكم الاشتراك الشهري؟"
],
[
"Can you show me how to use this?",
"ممكن توريني كيف أستخدم هذا؟"
],
[
"What time do you close?",
"متى تسكرون؟"
]
],
[
[
"A",
"Hi! Can I help you?",
"هلا! أساعدك؟"
],
[
"B",
"I'd like to join the gym. How much is a monthly membership?",
"أبي أشترك. بكم الشهري؟"
],
[
"A",
"It's two hundred riyals.",
"بمئتين ريال."
],
[
"B",
"OK. What time do you close?",
"طيب. متى تسكرون؟"
]
]
],
[
"دعوة صديق",
"Inviting a Friend",
"🎉",
"للدعوة قل: Would you like to come to dinner on Friday? والرد بالقبول: I'd love to! أو الاعتذار بأدب: Sorry, I can't. I'm busy.",
[
[
"Would you like to come to dinner?",
"تحب تجي تتعشى عندنا؟"
],
[
"I'd love to!",
"يا ليت! بكل سرور."
],
[
"Sorry, I can't. I'm busy.",
"آسف، ما أقدر. مشغول."
],
[
"What time should I come?",
"متى أجي؟"
]
],
[
[
"A",
"Would you like to come to dinner on Friday?",
"تحب تجي تتعشى عندنا الجمعة؟"
],
[
"B",
"I'd love to! What time should I come?",
"بكل سرور! متى أجي؟"
],
[
"A",
"At eight o'clock.",
"الساعة ثمانية."
],
[
"B",
"Great. See you on Friday!",
"ممتاز. نشوفك الجمعة!"
]
]
],
[
"الشكوى بأدب",
"Making a Complaint",
"📢",
"اشتكِ بأدب وبهدوء: Excuse me, there's a problem with my order. واطلب الحل: Could you change it, please? أو I'd like a refund.",
[
[
"There's a problem with my order.",
"فيه مشكلة في طلبي."
],
[
"This isn't what I ordered.",
"هذا مو اللي طلبته."
],
[
"Could you change it, please?",
"ممكن تغيّره لو سمحت؟"
],
[
"I'd like a refund.",
"أبي أسترجع فلوسي."
]
],
[
[
"A",
"Is everything OK?",
"كل شي تمام؟"
],
[
"B",
"Excuse me, this isn't what I ordered.",
"لو سمحت، هذا مو اللي طلبته."
],
[
"A",
"I'm so sorry. What did you order?",
"آسفين مرة. وش طلبت؟"
],
[
"B",
"The chicken burger. Could you change it, please?",
"برجر دجاج. ممكن تغيّره لو سمحت؟"
]
]
],
[
"في محطة البنزين وورشة السيارة",
"At the Garage",
"⛽",
"في الورشة قل وش المشكلة: My car is making a strange noise. واسأل: How long will it take to fix? و How much will it cost?",
[
[
"Fill it up, please.",
"عبّها فل لو سمحت."
],
[
"My car is making a strange noise.",
"سيارتي تطلع صوت غريب."
],
[
"How long will it take to fix?",
"كم ياخذ وقت عشان تتصلح؟"
],
[
"I have a flat tyre.",
"عندي كفر مبنشر."
]
],
[
[
"A",
"What's the problem with your car?",
"وش مشكلة سيارتك؟"
],
[
"B",
"My car is making a strange noise.",
"سيارتي تطلع صوت غريب."
],
[
"A",
"Let me check it.",
"خلني أشيّك عليها."
],
[
"B",
"How long will it take to fix?",
"كم ياخذ وقت عشان تتصلح؟"
]
]
],
[
"استلام طلب توصيل",
"Food Delivery at the Door",
"🛵",
"مندوب التوصيل يتأكد من الاسم والطلب: Order for Ahmed? وإذا ناقص شي قل: Something is missing from my order. وفي الأخير: Thanks, have a good day.",
[
[
"Order for Ahmed?",
"طلب أحمد؟"
],
[
"Yes, that's me.",
"إيه، أنا."
],
[
"Something is missing from my order.",
"فيه شي ناقص من طلبي."
],
[
"Have a good day.",
"يومك سعيد."
]
],
[
[
"A",
"Hi, order for Ahmed?",
"هلا، طلب أحمد؟"
],
[
"B",
"Yes, that's me.",
"إيه، أنا."
],
[
"A",
"Here you are. Enjoy your meal.",
"تفضل. بالعافية."
],
[
"B",
"Thanks, have a good day.",
"شكرًا، يومك سعيد."
]
]
]
];
/** Level 2 (harder, B1): problems, work, formal calls, negotiation and social situations. */
const RAW2: R[] = [
[
"رحلة فاتتك",
"Missed Connection",
"⏱️",
"إذا فاتتك الرحلة الثانية روح لمكتب الطيران وقل: I missed my connecting flight. واسأل عن أقرب رحلة: When is the next available flight? وإذا تأخيرهم السبب اطلب فندق: Will you provide a hotel?",
[
[
"I missed my connecting flight.",
"فاتتني الرحلة الثانية."
],
[
"When is the next available flight?",
"متى أقرب رحلة متاحة؟"
],
[
"Will you provide a hotel?",
"بتوفرون فندق؟"
],
[
"Can I get a meal voucher?",
"أقدر آخذ قسيمة وجبة؟"
]
],
[
[
"A",
"How can I help you?",
"كيف أساعدك؟"
],
[
"B",
"I missed my connecting flight because the first one was late.",
"فاتتني الرحلة الثانية لأن الأولى تأخرت."
],
[
"A",
"The next available flight is tomorrow at 7 a.m.",
"أقرب رحلة بكرة الساعة ٧ الصبح."
],
[
"B",
"In that case, will you provide a hotel?",
"في هالحالة بتوفرون فندق؟"
]
]
],
[
"تغيير الحجز",
"Changing a Booking",
"🔁",
"لتغيير حجز قل: I'd like to change my booking. واسأل عن الرسوم: Is there a fee for changing the date? وإذا تبي تلغي: I'd like to cancel and get a refund.",
[
[
"I'd like to change my booking.",
"أبي أغيّر حجزي."
],
[
"Is there a fee for changing the date?",
"فيه رسوم لتغيير التاريخ؟"
],
[
"Could you move it to Friday?",
"ممكن تنقلونه للجمعة؟"
],
[
"I'd like to cancel and get a refund.",
"أبي ألغي وأسترجع المبلغ."
]
],
[
[
"A",
"Customer service, how can I help?",
"خدمة العملاء، كيف أساعدك؟"
],
[
"B",
"I'd like to change my booking to Friday.",
"أبي أغيّر حجزي ليوم الجمعة."
],
[
"A",
"Sure, but there is a fee of fifty riyals.",
"أكيد، بس فيه رسوم خمسين ريال."
],
[
"B",
"That's fine. Please go ahead.",
"ما فيه مشكلة، كمّل لو سمحت."
]
]
],
[
"الشكوى في الفندق",
"Hotel Complaint",
"😤",
"إذا الخدمة سيئة اشتكِ بأدب وبالتفصيل: I'm afraid the room hasn't been cleaned. واطلب حل واضح: I'd appreciate it if you could... و I'd like to speak to the manager.",
[
[
"I'm afraid the room hasn't been cleaned.",
"للأسف الغرفة ما تنظفت."
],
[
"The noise kept me awake all night.",
"الإزعاج خلاني صاحي طول الليل."
],
[
"I'd like to speak to the manager.",
"أبي أكلم المدير."
],
[
"I'd appreciate a discount.",
"أكون شاكر لو فيه خصم."
]
],
[
[
"A",
"Good morning. Is everything all right?",
"صباح الخير. كل شي تمام؟"
],
[
"B",
"I'm afraid not. The noise kept me awake all night.",
"للأسف لا. الإزعاج خلاني صاحي طول الليل."
],
[
"A",
"I'm very sorry. We can move you to a quieter room.",
"آسفين جدًا. نقدر ننقلك لغرفة أهدأ."
],
[
"B",
"Thank you. I'd also appreciate a discount.",
"شكرًا. وأكون شاكر لو فيه خصم."
]
]
],
[
"حجز مطعم لمناسبة",
"Booking for an Occasion",
"🎂",
"لحجز مناسبة حدد العدد والوقت والطلبات الخاصة: I'd like to book a table for ten on Thursday. و Could you prepare a birthday cake? و Do you have a private room?",
[
[
"I'd like to book a table for ten.",
"أبي أحجز طاولة لعشرة."
],
[
"Do you have a private room?",
"عندكم غرفة خاصة؟"
],
[
"Could you prepare a birthday cake?",
"ممكن تجهزون كيكة عيد ميلاد؟"
],
[
"Some guests are vegetarian.",
"بعض الضيوف نباتيين."
]
],
[
[
"A",
"Al Nakheel Restaurant, good evening.",
"مطعم النخيل، مساء الخير."
],
[
"B",
"I'd like to book a table for ten on Thursday at eight.",
"أبي أحجز طاولة لعشرة يوم الخميس الساعة ثمانية."
],
[
"A",
"Certainly. Is it a special occasion?",
"أكيد. فيه مناسبة خاصة؟"
],
[
"B",
"Yes, it's a birthday. Could you prepare a cake?",
"إيه، عيد ميلاد. ممكن تجهزون كيكة؟"
]
]
],
[
"حساسية الأكل",
"Food Allergies",
"🥜",
"إذا عندك حساسية قلها بوضوح قبل الطلب: I'm allergic to nuts. واسأل: Does this dish contain dairy? و Can you make it without...?",
[
[
"I'm allergic to nuts.",
"عندي حساسية من المكسرات."
],
[
"Does this dish contain dairy?",
"هالطبق فيه ألبان؟"
],
[
"Can you make it without sesame?",
"تقدرون تسوونه بدون سمسم؟"
],
[
"Is it gluten-free?",
"خالي من الجلوتين؟"
]
],
[
[
"A",
"Are you ready to order?",
"جاهز تطلب؟"
],
[
"B",
"Yes, but first, does this dish contain nuts? I'm allergic.",
"إيه، بس أول شي، هالطبق فيه مكسرات؟ عندي حساسية."
],
[
"A",
"It has a little peanut sauce, but we can leave it out.",
"فيه شوي صوص فول سوداني، بس نقدر نشيله."
],
[
"B",
"Great, please make it without the sauce.",
"ممتاز، سوّه بدون الصوص لو سمحت."
]
]
],
[
"عند طبيب الأسنان",
"At the Dentist",
"🦷",
"عند طبيب الأسنان وصف الألم: I have a toothache on the left side. و It hurts when I drink something cold. والطبيب ممكن يقول: You need a filling.",
[
[
"I have a toothache.",
"عندي ألم في ضرسي."
],
[
"It hurts when I drink something cold.",
"يوجعني لما أشرب شي بارد."
],
[
"Do I need a filling?",
"أحتاج حشوة؟"
],
[
"Will it hurt?",
"بيوجع؟"
]
],
[
[
"A",
"What brings you in today?",
"وش جابك اليوم؟"
],
[
"B",
"I have a toothache on the left side.",
"عندي ألم في الجهة اليسار."
],
[
"A",
"Does it hurt when you eat or drink?",
"يوجعك لما تاكل أو تشرب؟"
],
[
"B",
"Yes, especially when I drink something cold.",
"إيه، خصوصًا لما أشرب شي بارد."
]
]
],
[
"في الطوارئ بالمستشفى",
"At the ER",
"🏥",
"في الطوارئ قل المشكلة ومتى بدأت وشدتها: My son fell and hurt his arm. و The pain is getting worse. وإذا عنده أمراض: He has asthma.",
[
[
"My son fell and hurt his arm.",
"ولدي طاح وتعوّرت يده."
],
[
"The pain is getting worse.",
"الألم يزيد."
],
[
"He has asthma.",
"عنده ربو."
],
[
"How long is the wait?",
"كم الانتظار؟"
]
],
[
[
"A",
"What happened?",
"وش صار؟"
],
[
"B",
"My son fell off his bike and hurt his arm.",
"ولدي طاح من الدراجة وتعوّرت يده."
],
[
"A",
"Can he move his fingers?",
"يقدر يحرك أصابعه؟"
],
[
"B",
"A little, but the pain is getting worse.",
"شوي، بس الألم يزيد."
]
]
],
[
"تأمين السيارة والحوادث",
"Car Accident Report",
"🚗",
"بعد حادث بسيط اهدأ واطلب: Let's exchange insurance details. وصف الحادث: The other car hit me from behind. والتطبيق المعتمد في السعودية لتسجيل الحوادث البسيطة هو نجم.",
[
[
"Is anyone hurt?",
"فيه أحد متأذي؟"
],
[
"The other car hit me from behind.",
"السيارة الثانية صدمتني من ورا."
],
[
"Let's exchange insurance details.",
"خلنا نتبادل بيانات التأمين."
],
[
"I'll call the insurance company.",
"بتصل على شركة التأمين."
]
],
[
[
"A",
"Are you OK? Is anyone hurt?",
"أنت بخير؟ فيه أحد متأذي؟"
],
[
"B",
"I'm fine. The other car hit me from behind.",
"أنا بخير. السيارة الثانية صدمتني من ورا."
],
[
"A",
"Did you take photos of the damage?",
"صوّرت الأضرار؟"
],
[
"B",
"Yes. Now let's exchange insurance details.",
"إيه. الحين خلنا نتبادل بيانات التأمين."
]
]
],
[
"فتح حساب وبطاقة",
"Bank: Card Problem",
"💳",
"إذا انسحبت بطاقتك أو صار عليها خصم غريب قل: There's a transaction I don't recognise. واطلب: Please block my card. و I'd like a replacement card.",
[
[
"There's a transaction I don't recognise.",
"فيه عملية ما أعرفها."
],
[
"Please block my card.",
"أوقف بطاقتي لو سمحت."
],
[
"The ATM kept my card.",
"الصراف سحب بطاقتي."
],
[
"I'd like a replacement card.",
"أبي بطاقة بديلة."
]
],
[
[
"A",
"Thank you for calling the bank.",
"شكرًا لاتصالك بالبنك."
],
[
"B",
"There's a transaction on my card that I don't recognise.",
"فيه عملية على بطاقتي ما أعرفها."
],
[
"A",
"I see. Shall I block the card now?",
"فهمت. أوقف البطاقة الحين؟"
],
[
"B",
"Yes, please block it and send me a replacement card.",
"إيه، أوقفها وأرسلوا لي بطاقة بديلة."
]
]
],
[
"استئجار شقة",
"Renting an Apartment",
"🏢",
"لما تشوف شقة اسأل: Are the bills included in the rent? و How much is the deposit? و Is the contract for one year?",
[
[
"Are the bills included in the rent?",
"الفواتير داخلة في الإيجار؟"
],
[
"How much is the deposit?",
"كم التأمين؟"
],
[
"Is the contract for one year?",
"العقد لسنة؟"
],
[
"Can I see the apartment first?",
"أقدر أشوف الشقة أول؟"
]
],
[
[
"A",
"This apartment has two bedrooms and a big kitchen.",
"هالشقة فيها غرفتين نوم ومطبخ كبير."
],
[
"B",
"It's nice. Are the bills included in the rent?",
"حلوة. الفواتير داخلة في الإيجار؟"
],
[
"A",
"Water is included, but electricity isn't.",
"الموية داخلة بس الكهرباء لا."
],
[
"B",
"I see. And how much is the deposit?",
"فهمت. وكم التأمين؟"
]
]
],
[
"مشكلة مع الجيران",
"Talking to a Neighbour",
"🏘️",
"إذا عندك مشكلة مع الجار تكلّم بلطف: Sorry to bother you, but... واقترح حل: Would you mind keeping the noise down after eleven?",
[
[
"Sorry to bother you, but...",
"آسف على الإزعاج، بس..."
],
[
"Would you mind keeping the noise down?",
"عادي توطّون الصوت؟"
],
[
"Your car is blocking my garage.",
"سيارتك سادة الكراج حقي."
],
[
"Thanks for understanding.",
"شكرًا على تفهمك."
]
],
[
[
"A",
"Hi! Can I help you?",
"هلا! أقدر أساعدك؟"
],
[
"B",
"Sorry to bother you, but your car is blocking my garage.",
"آسف على الإزعاج، بس سيارتك سادة الكراج حقي."
],
[
"A",
"Oh, I'm so sorry! I'll move it right away.",
"أوه، آسف مرة! بحركها الحين."
],
[
"B",
"No problem. Thanks for understanding.",
"ما فيه مشكلة. شكرًا على تفهمك."
]
]
],
[
"اجتماع عمل",
"In a Meeting",
"📊",
"في الاجتماع شارك بأدب: I'd like to add something. وإذا ما وافقت: I see your point, but... ولتلخيص: So, to sum up...",
[
[
"I'd like to add something.",
"أبي أضيف شي."
],
[
"I see your point, but...",
"فاهم وجهة نظرك، بس..."
],
[
"Could you clarify that?",
"ممكن توضح هالنقطة؟"
],
[
"So, to sum up...",
"طيب، بالمختصر..."
]
],
[
[
"A",
"I think we should launch the app in June.",
"أظن لازم نطلق التطبيق في يونيو."
],
[
"B",
"I see your point, but we still need more testing.",
"فاهم وجهة نظرك، بس نحتاج اختبار أكثر."
],
[
"A",
"How much more time do you need?",
"كم وقت زيادة تحتاج؟"
],
[
"B",
"About two weeks. So, to sum up, let's aim for July.",
"حوالي أسبوعين. بالمختصر، خلنا نستهدف يوليو."
]
]
],
[
"طلب إجازة من المدير",
"Asking for Leave",
"🏖️",
"اطلب الإجازة بأدب وبسبب واضح: Would it be possible to take next week off? و I've finished my tasks. وقدّم حل: My colleague can cover for me.",
[
[
"Would it be possible to take next week off?",
"ممكن آخذ إجازة الأسبوع الجاي؟"
],
[
"It's for a family wedding.",
"عشان عرس في العائلة."
],
[
"My colleague can cover for me.",
"زميلي يقدر يغطي عني."
],
[
"I'll finish the report before I go.",
"بخلص التقرير قبل لا أطلع."
]
],
[
[
"A",
"You wanted to see me?",
"كنت تبي تشوفني؟"
],
[
"B",
"Yes. Would it be possible to take next week off? It's for a family wedding.",
"إيه. ممكن آخذ إجازة الأسبوع الجاي؟ عشان عرس في العائلة."
],
[
"A",
"What about the monthly report?",
"وش وضع التقرير الشهري؟"
],
[
"B",
"I'll finish it before I go, and my colleague can cover for me.",
"بخلصه قبل لا أطلع، وزميلي يغطي عني."
]
]
],
[
"التفاوض على الراتب",
"Negotiating Salary",
"🤝",
"في التفاوض كن مهذب وواثق: Based on my experience, I was expecting... واسأل عن المزايا: Does the package include housing allowance?",
[
[
"Based on my experience, I was expecting more.",
"بناءً على خبرتي، كنت أتوقع أكثر."
],
[
"Is the salary negotiable?",
"الراتب قابل للتفاوض؟"
],
[
"Does the package include housing allowance?",
"العرض يشمل بدل سكن؟"
],
[
"Could I have some time to think about it?",
"ممكن آخذ وقت أفكر؟"
]
],
[
[
"A",
"We'd like to offer you the job at eight thousand riyals.",
"نبي نعرض عليك الوظيفة بثمانية آلاف ريال."
],
[
"B",
"Thank you. Based on my experience, I was expecting a little more.",
"شكرًا. بناءً على خبرتي كنت أتوقع أكثر شوي."
],
[
"A",
"We could offer housing allowance as well.",
"نقدر نضيف بدل سكن بعد."
],
[
"B",
"That sounds good. Could I have a day to think about it?",
"كويس. ممكن يوم أفكر فيه؟"
]
]
],
[
"العرض التقديمي",
"Giving a Presentation",
"🎤",
"ابدأ العرض بترتيب: Today I'm going to talk about... وانتقل بين الأجزاء: Let's move on to... وفي النهاية: Are there any questions?",
[
[
"Today I'm going to talk about...",
"اليوم بتكلم عن..."
],
[
"Let's move on to the next point.",
"خلنا ننتقل للنقطة الجاية."
],
[
"As you can see on this slide...",
"مثل ما تشوفون في هالشريحة..."
],
[
"Are there any questions?",
"فيه أي أسئلة؟"
]
],
[
[
"A",
"You can start whenever you're ready.",
"تقدر تبدأ متى ما كنت جاهز."
],
[
"B",
"Thank you. Today I'm going to talk about our sales results.",
"شكرًا. اليوم بتكلم عن نتائج مبيعاتنا."
],
[
"A",
"Could you explain this chart?",
"ممكن تشرح هالرسم؟"
],
[
"B",
"Sure. As you can see on this slide, sales went up by ten percent.",
"أكيد. مثل ما تشوفون في الشريحة، المبيعات زادت عشرة بالمية."
]
]
],
[
"خدمة العملاء: الإنترنت",
"Internet Support Call",
"📶",
"لما تتصل بالدعم وصف المشكلة بدقة: My internet keeps disconnecting. وقل وش جربت: I've already restarted the router. واطلب: Can you send a technician?",
[
[
"My internet keeps disconnecting.",
"الإنترنت يفصل كل شوي."
],
[
"I've already restarted the router.",
"سويت إعادة تشغيل للراوتر."
],
[
"Can you send a technician?",
"تقدرون ترسلون فني؟"
],
[
"How long will it take to fix?",
"كم ياخذ وقت عشان ينصلح؟"
]
],
[
[
"A",
"Technical support, how can I help?",
"الدعم الفني، كيف أساعدك؟"
],
[
"B",
"My internet keeps disconnecting every few minutes.",
"الإنترنت يفصل كل كم دقيقة."
],
[
"A",
"Have you tried restarting the router?",
"جربت تعيد تشغيل الراوتر؟"
],
[
"B",
"Yes, I've already restarted it twice. Can you send a technician?",
"إيه، أعدته مرتين. تقدرون ترسلون فني؟"
]
]
],
[
"إرجاع طلب أونلاين",
"Returning an Online Order",
"📦",
"في المحادثة مع المتجر قل: The item arrived damaged. واطلب: I'd like to return it. واسأل: Who pays for the return shipping?",
[
[
"The item arrived damaged.",
"المنتج وصل خربان."
],
[
"I'd like to return it.",
"أبي أرجّعه."
],
[
"Who pays for the return shipping?",
"مين يدفع شحن الإرجاع؟"
],
[
"When will I get my refund?",
"متى يرجع لي المبلغ؟"
]
],
[
[
"A",
"Hello, how can we help with your order?",
"هلا، كيف نساعدك في طلبك؟"
],
[
"B",
"The headphones arrived damaged. I'd like to return them.",
"السماعات وصلت خربانة. أبي أرجّعها."
],
[
"A",
"Sorry about that. We'll send a courier to collect them.",
"نعتذر. بنرسل مندوب ياخذها."
],
[
"B",
"Thank you. When will I get my refund?",
"شكرًا. متى يرجع لي المبلغ؟"
]
]
],
[
"عند الشرطة",
"Reporting a Theft",
"🚔",
"إذا انسرق شي روح لمركز الشرطة وقل: I'd like to report a theft. ووصف: My wallet was stolen at the mall. وبيطلبون: Can you describe it?",
[
[
"I'd like to report a theft.",
"أبي أبلّغ عن سرقة."
],
[
"My wallet was stolen.",
"انسرقت محفظتي."
],
[
"It happened around six o'clock.",
"صار حوالي الساعة ست."
],
[
"Can I get a copy of the report?",
"أقدر آخذ نسخة من البلاغ؟"
]
],
[
[
"A",
"How can I help you?",
"كيف أساعدك؟"
],
[
"B",
"I'd like to report a theft. My wallet was stolen at the mall.",
"أبي أبلّغ عن سرقة. انسرقت محفظتي في المول."
],
[
"A",
"When did it happen?",
"متى صار هذا؟"
],
[
"B",
"It happened around six o'clock this evening.",
"صار حوالي الساعة ست المغرب."
]
]
],
[
"في السفارة: تأشيرة",
"Visa Interview",
"🛂",
"في مقابلة التأشيرة جاوب بثقة وبصدق: I'm going to study at... و I'll return after I graduate. وجهز أوراقك: Here are my bank statements.",
[
[
"I'm going to study engineering.",
"بدرس هندسة."
],
[
"My university has accepted me.",
"جامعتي قبلتني."
],
[
"I'll return after I graduate.",
"برجع بعد ما أتخرج."
],
[
"Here are my bank statements.",
"هذي كشوفات حسابي البنكي."
]
],
[
[
"A",
"Why do you want to visit the United Kingdom?",
"ليش تبي تزور بريطانيا؟"
],
[
"B",
"I'm going to study engineering. The university has accepted me.",
"بدرس هندسة. الجامعة قبلتني."
],
[
"A",
"What will you do after your studies?",
"وش بتسوي بعد دراستك؟"
],
[
"B",
"I'll return to Saudi Arabia and work here.",
"برجع للسعودية وأشتغل هنا."
]
]
],
[
"اجتماع أولياء الأمور",
"Parent-Teacher Meeting",
"👨‍👩‍👦",
"في اجتماع المدرسة اسأل عن مستوى ولدك: How is my son doing in class? واسأل: What can we do at home to help? وشكر المعلم: Thank you for your support.",
[
[
"How is my son doing in class?",
"كيف مستوى ولدي في الفصل؟"
],
[
"What can we do at home to help?",
"وش نقدر نسوي في البيت عشان نساعده؟"
],
[
"Is he getting along with others?",
"متفاهم مع زملائه؟"
],
[
"Thank you for your support.",
"شكرًا على دعمك."
]
],
[
[
"A",
"Thank you for coming. Omar is a hard worker.",
"شكرًا على حضورك. عمر مجتهد."
],
[
"B",
"That's great. How is he doing in math?",
"ممتاز. كيف مستواه في الرياضيات؟"
],
[
"A",
"He finds it a bit difficult.",
"يلقاها صعبة شوي."
],
[
"B",
"What can we do at home to help him?",
"وش نقدر نسوي في البيت عشان نساعده؟"
]
]
],
[
"التطوع",
"Volunteering",
"🙋",
"إذا تبي تتطوع اسأل: I'd like to volunteer. How can I help? وحدد وقتك: I'm available on weekends. واسأل عن الخبرة: Do I need any experience?",
[
[
"I'd like to volunteer.",
"أبي أتطوع."
],
[
"I'm available on weekends.",
"فاضي في نهاية الأسبوع."
],
[
"Do I need any experience?",
"أحتاج خبرة؟"
],
[
"What does the work involve?",
"وش يشمل الشغل؟"
]
],
[
[
"A",
"Welcome to the food bank. How can I help?",
"هلا في بنك الطعام. كيف أساعدك؟"
],
[
"B",
"I'd like to volunteer. I'm available on weekends.",
"أبي أتطوع. فاضي في نهاية الأسبوع."
],
[
"A",
"Great! We need help packing food boxes.",
"ممتاز! نحتاج مساعدة في تعبئة سلال الأكل."
],
[
"B",
"That sounds good. Do I need any experience?",
"حلو. أحتاج خبرة؟"
]
]
],
[
"تهنئة وتعزية",
"Congratulations & Condolences",
"💐",
"للتهنئة: Congratulations on your new job! و I'm so happy for you. وللتعزية بلطف: I'm so sorry for your loss. و If you need anything, I'm here.",
[
[
"Congratulations on your new job!",
"مبروك الوظيفة الجديدة!"
],
[
"I'm so happy for you.",
"فرحان لك مرة."
],
[
"I'm so sorry for your loss.",
"عظم الله أجرك."
],
[
"If you need anything, I'm here.",
"إذا احتجت أي شي أنا موجود."
]
],
[
[
"A",
"I got the job at the hospital!",
"توظفت في المستشفى!"
],
[
"B",
"Congratulations! I'm so happy for you.",
"مبروك! فرحان لك مرة."
],
[
"A",
"Thanks! I start next month.",
"شكرًا! أبدأ الشهر الجاي."
],
[
"B",
"That's wonderful. You really deserve it.",
"رائع. تستاهلها والله."
]
]
],
[
"الاعتذار عن موعد",
"Apologising for Being Late",
"🙇",
"إذا تأخرت اعتذر وبيّن السبب باختصار: I'm really sorry I'm late. The traffic was terrible. وإذا بتلغي: I'm afraid I can't make it today. Can we reschedule?",
[
[
"I'm really sorry I'm late.",
"آسف جدًا على التأخير."
],
[
"The traffic was terrible.",
"الزحمة كانت فظيعة."
],
[
"I'm afraid I can't make it today.",
"للأسف ما أقدر أجي اليوم."
],
[
"Can we reschedule?",
"نقدر نأجل الموعد؟"
]
],
[
[
"A",
"Hello? Are you still coming?",
"ألو؟ للحين جاي؟"
],
[
"B",
"I'm really sorry. I'm afraid I can't make it today.",
"آسف جدًا. للأسف ما أقدر أجي اليوم."
],
[
"A",
"Oh, that's a shame.",
"أوه، خسارة."
],
[
"B",
"Can we reschedule for Sunday?",
"نقدر نأجلها للأحد؟"
]
]
],
[
"الاستفسار في الجامعة",
"At the University Office",
"🎓",
"في مكتب القبول اسأل: I'd like some information about the master's program. و What are the admission requirements? و When is the deadline?",
[
[
"I'd like some information about the master's program.",
"أبي معلومات عن برنامج الماجستير."
],
[
"What are the admission requirements?",
"وش شروط القبول؟"
],
[
"When is the application deadline?",
"متى آخر موعد للتقديم؟"
],
[
"Do I need an IELTS score?",
"أحتاج درجة آيلتس؟"
]
],
[
[
"A",
"Admissions office. How can I help?",
"مكتب القبول. كيف أساعدك؟"
],
[
"B",
"I'd like some information about the master's program in business.",
"أبي معلومات عن ماجستير إدارة الأعمال."
],
[
"A",
"You need a bachelor's degree and an IELTS score of 6.5.",
"تحتاج بكالوريوس وآيلتس ٦٫٥."
],
[
"B",
"I see. When is the application deadline?",
"فهمت. متى آخر موعد للتقديم؟"
]
]
],
[
"شراء جوال",
"Buying a Phone",
"📱",
"في محل الجوالات قارن واسأل: What's the difference between these two models? و Does it come with a warranty? و Can I pay in instalments?",
[
[
"What's the difference between these two models?",
"وش الفرق بين هالموديلين؟"
],
[
"Does it come with a warranty?",
"معه ضمان؟"
],
[
"Can I pay in instalments?",
"أقدر أقسّط؟"
],
[
"How long does the battery last?",
"كم تدوم البطارية؟"
]
],
[
[
"A",
"Are you looking for anything special?",
"تدوّر شي معين؟"
],
[
"B",
"Yes. What's the difference between these two models?",
"إيه. وش الفرق بين هالموديلين؟"
],
[
"A",
"This one has a better camera and a bigger battery.",
"هذا كاميرته أحسن وبطاريته أكبر."
],
[
"B",
"Does it come with a warranty?",
"معه ضمان؟"
]
]
],
[
"الصيانة في البيت",
"Home Repair",
"🔧",
"لما تتصل بالصيانة وصف المشكلة: The kitchen sink is leaking. واسأل: When can you come? و How much will it cost roughly?",
[
[
"The kitchen sink is leaking.",
"مغسلة المطبخ تهرّب."
],
[
"The power went out in one room.",
"الكهرباء طافية في غرفة."
],
[
"When can you come?",
"متى تقدر تجي؟"
],
[
"How much will it cost roughly?",
"كم التكلفة تقريبًا؟"
]
],
[
[
"A",
"Maintenance service, hello.",
"خدمة الصيانة، هلا."
],
[
"B",
"Hello. The kitchen sink is leaking badly.",
"هلا. مغسلة المطبخ تهرّب بقوة."
],
[
"A",
"We can send a plumber this afternoon.",
"نقدر نرسل سبّاك العصر."
],
[
"B",
"Great. How much will it cost roughly?",
"ممتاز. كم التكلفة تقريبًا؟"
]
]
],
[
"الحديث الصغير",
"Small Talk",
"☕",
"الحديث الخفيف يفتح العلاقات: How was your weekend? و Have you been here before? وتجنب الأسئلة الشخصية جدًا مثل الراتب والعمر في أول لقاء.",
[
[
"How was your weekend?",
"كيف كانت إجازتك؟"
],
[
"Have you been here before?",
"جيت هنا قبل؟"
],
[
"What do you do for fun?",
"وش تسوي للمتعة؟"
],
[
"It was nice talking to you.",
"سعدت بالكلام معك."
]
],
[
[
"A",
"Hi! How was your weekend?",
"هلا! كيف كانت إجازة نهاية الأسبوع؟"
],
[
"B",
"It was great, thanks. I went camping with my family.",
"كانت حلوة، شكرًا. رحت كشتة مع العائلة."
],
[
"A",
"That sounds fun! Where did you go?",
"شكلها ممتعة! وين رحتوا؟"
],
[
"B",
"Near Al Ula. You should go sometime!",
"قريب من العلا. لازم تروح مرة!"
]
]
],
[
"الطلب من جار في السفر",
"Asking a Favour",
"🙏",
"لطلب خدمة بلطف: Could you do me a favour? و Would you mind watering my plants while I'm away? واشكر: I really appreciate it.",
[
[
"Could you do me a favour?",
"ممكن تخدمني خدمة؟"
],
[
"Would you mind watering my plants?",
"عادي تسقي نباتاتي؟"
],
[
"I'll be away for a week.",
"بغيب أسبوع."
],
[
"I really appreciate it.",
"أقدّر لك هالشي مرة."
]
],
[
[
"A",
"Hi, what's up?",
"هلا، وش الأخبار؟"
],
[
"B",
"Could you do me a favour? I'll be away for a week.",
"ممكن تخدمني خدمة؟ بغيب أسبوع."
],
[
"A",
"Sure, what do you need?",
"أكيد، وش تحتاج؟"
],
[
"B",
"Would you mind watering my plants? I really appreciate it.",
"عادي تسقي نباتاتي؟ أقدّر لك هالشي."
]
]
],
[
"تقديم شكوى رسمية",
"Formal Complaint by Phone",
"📞",
"في الشكوى الرسمية اذكر رقم الطلب والمشكلة وطلبك: I'm calling to complain about... و My reference number is... و I expect this to be resolved by...",
[
[
"I'm calling to complain about my last bill.",
"أتصل أشتكي من فاتورتي الأخيرة."
],
[
"My reference number is 4521.",
"رقمي المرجعي ٤٥٢١."
],
[
"I was charged twice.",
"انخصم مني مرتين."
],
[
"I expect this to be resolved this week.",
"أتوقع تنحل هالأسبوع."
]
],
[
[
"A",
"How may I help you today?",
"كيف أقدر أساعدك اليوم؟"
],
[
"B",
"I'm calling to complain about my last bill. I was charged twice.",
"أتصل أشتكي من فاتورتي الأخيرة. انخصم مني مرتين."
],
[
"A",
"I'm sorry. Do you have a reference number?",
"نعتذر. عندك رقم مرجعي؟"
],
[
"B",
"Yes, it's 4521. I expect this to be resolved this week.",
"إيه، ٤٥٢١. أتوقع تنحل هالأسبوع."
]
]
],
[
"في الحج والعمرة: مساعدة حاج",
"Helping a Visitor",
"🕋",
"إذا شفت زائر محتار ساعده: Are you lost? Can I help you? ووصّه: The gate is straight ahead. وقل: Stay with your group.",
[
[
"Are you lost? Can I help you?",
"ضايع؟ أقدر أساعدك؟"
],
[
"The gate is straight ahead.",
"البوابة على طول قدامك."
],
[
"Stay with your group.",
"خلك مع مجموعتك."
],
[
"Do you need water?",
"تحتاج موية؟"
]
],
[
[
"A",
"Excuse me, I can't find my group.",
"لو سمحت، ما ألقى مجموعتي."
],
[
"B",
"Don't worry. What's the name of your group?",
"لا تشيل هم. وش اسم مجموعتك؟"
],
[
"A",
"Al Huda group. We meet at gate eighty-five.",
"مجموعة الهدى. نتجمع عند بوابة ٨٥."
],
[
"B",
"Gate eighty-five is straight ahead. I'll walk with you.",
"بوابة ٨٥ على طول قدامك. بمشي معك."
]
]
]
];
/** Level 3 (B2→C1): 30 professional/tactful situations, hand-written. */
const RAW3: R[] = [
[
"رفض بلباقة",
"Saying No Politely",
"🙅",
"عشان ترفض بدون ما تجرح قل: I'm afraid I can't make it. وإذا تبي تعطي بديل: Maybe another time? ولو تبي تشكره على العرض: Thanks for thinking of me.",
[
[
"I'm afraid I can't make it.",
"للأسف ما أقدر أجي."
],
[
"Thanks for thinking of me.",
"شكراً إنك تذكرتني."
],
[
"I've got a lot on my plate this week.",
"عندي أشغال كثيرة هالأسبوع."
],
[
"Maybe another time?",
"يمكن مرة ثانية؟"
]
],
[
[
"A",
"We're having a barbecue on Friday. Can you come?",
"عندنا شوي يوم الجمعة، تقدر تجي؟"
],
[
"B",
"Thanks for thinking of me, but I'm afraid I can't make it.",
"شكراً إنك تذكرتني، بس للأسف ما أقدر أجي."
],
[
"A",
"Oh, that's a shame. Busy week?",
"أوه، خسارة. أسبوعك مزحوم؟"
],
[
"B",
"Yes, I've got a lot on my plate. Maybe another time?",
"إيه، عندي أشغال كثيرة. يمكن مرة ثانية؟"
]
]
],
[
"التعبير عن عدم الرضا بأدب",
"Expressing Disagreement Tactfully",
"🤔",
"في النقاش لا تقول You're wrong، قل: I see your point, but... أو: I'm not sure I agree. وإذا تبي تقترح: Have you considered...?",
[
[
"I see your point, but I see it differently.",
"فاهم وجهة نظرك، بس أنا أشوفها غير."
],
[
"I'm not sure I agree with that.",
"مو متأكد إني أتفق مع هذا."
],
[
"Have you considered another option?",
"فكرت في خيار ثاني؟"
],
[
"That's a fair point.",
"هذي نقطة منطقية."
]
],
[
[
"A",
"I think we should cancel the project completely.",
"أعتقد لازم نلغي المشروع كله."
],
[
"B",
"I see your point, but I'm not sure I agree.",
"فاهم وجهة نظرك، بس مو متأكد إني أتفق."
],
[
"A",
"Why not? It's costing too much.",
"ليش لا؟ يكلّف واجد."
],
[
"B",
"That's a fair point. Have you considered reducing the budget instead?",
"نقطة منطقية. فكرت نقلل الميزانية بدال كذا؟"
]
]
],
[
"طلب توضيح",
"Asking for Clarification",
"❓",
"إذا ما فهمت قل: Sorry, could you clarify what you mean? أو: Do you mean...? وعشان تتأكد: So, if I understand correctly...",
[
[
"Could you clarify what you mean?",
"ممكن توضح وش تقصد؟"
],
[
"Do you mean we start next week?",
"تقصد نبدأ الأسبوع الجاي؟"
],
[
"So, if I understand correctly, the price includes delivery.",
"يعني إذا فهمت صح، السعر يشمل التوصيل."
],
[
"Could you go over that again?",
"ممكن تعيد هذا مرة ثانية؟"
]
],
[
[
"A",
"The delivery date depends on the final approval.",
"موعد التسليم يعتمد على الموافقة النهائية."
],
[
"B",
"Sorry, could you clarify what you mean by final approval?",
"عفواً، ممكن توضح وش تقصد بالموافقة النهائية؟"
],
[
"A",
"The manager has to sign the contract first.",
"المدير لازم يوقع العقد أول."
],
[
"B",
"So, if I understand correctly, nothing moves until he signs?",
"يعني إذا فهمت صح، ما يتحرك شي لين يوقع؟"
]
]
],
[
"شكوى رسمية لمدير",
"Escalating a Complaint",
"📈",
"إذا ما انحلت مشكلتك اطلب المسؤول: I'd like to speak to a manager, please. واشرح بهدوء: I've called three times about this. واطلب حل واضح: What exactly will you do to fix it?",
[
[
"I'd like to speak to a manager, please.",
"أبي أكلم المدير لو سمحت."
],
[
"I've called three times about this issue.",
"اتصلت ثلاث مرات بخصوص هالمشكلة."
],
[
"What exactly will you do to fix it?",
"وش بالضبط بتسوون عشان تحلونها؟"
],
[
"I expect a reply by the end of the week.",
"أتوقع رد قبل نهاية الأسبوع."
]
],
[
[
"A",
"I'm sorry, the system still shows the old address.",
"آسف، النظام لسا يطلع العنوان القديم."
],
[
"B",
"I've called three times about this. I'd like to speak to a manager, please.",
"اتصلت ثلاث مرات بخصوص هذا. أبي أكلم المدير لو سمحت."
],
[
"A",
"I'm the manager. I apologise for the trouble.",
"أنا المدير. أعتذر عن الإزعاج."
],
[
"B",
"Thank you. What exactly will you do to fix it?",
"شكراً. وش بالضبط بتسوون عشان تحلونها؟"
]
]
],
[
"مقابلة عمل متقدمة",
"Interview: Strengths and Weaknesses",
"🎯",
"لما يسألونك عن نقطة ضعفك لا تقول ما عندي، قل: I sometimes take on too much. ثم وضح كيف تتحسن: I'm working on it by... وعن نقاط قوتك: I'm good at solving problems under pressure.",
[
[
"I'm good at solving problems under pressure.",
"أنا شاطر في حل المشاكل تحت الضغط."
],
[
"I sometimes take on too much.",
"أحياناً آخذ مهام أكثر من طاقتي."
],
[
"I'm working on it by planning my week.",
"أشتغل على هذا بتخطيط أسبوعي."
],
[
"For example, in my last job...",
"مثلاً، في شغلي السابق..."
]
],
[
[
"A",
"What would you say is your greatest weakness?",
"وش تعتبر أكبر نقطة ضعف عندك؟"
],
[
"B",
"I sometimes take on too much, but I'm working on it by planning my week.",
"أحياناً آخذ مهام فوق طاقتي، بس أشتغل على هذا بتخطيط أسبوعي."
],
[
"A",
"And your main strength?",
"وأهم نقطة قوة؟"
],
[
"B",
"I'm good at solving problems under pressure. For example, in my last job I fixed a system failure overnight.",
"أنا شاطر في حل المشاكل تحت الضغط. مثلاً في شغلي السابق صلحت عطل في النظام خلال ليلة."
]
]
],
[
"رفض عرض عمل",
"Turning Down a Job Offer",
"✉️",
"إذا جاك عرض ما يناسبك قل بأدب: Thank you for the offer, but I've decided to decline. واذكر سبب عام: It's not the right fit for me at the moment. وخل الباب مفتوح: I hope we can stay in touch.",
[
[
"Thank you for the offer.",
"شكراً على العرض."
],
[
"I've decided to decline.",
"قررت أعتذر عنه."
],
[
"It's not the right fit for me at the moment.",
"ما يناسبني في الوقت الحالي."
],
[
"I hope we can stay in touch.",
"أتمنى نظل على تواصل."
]
],
[
[
"A",
"So, have you made a decision about our offer?",
"طيب، قررت بخصوص عرضنا؟"
],
[
"B",
"Yes. Thank you for the offer, but I've decided to decline.",
"إيه. شكراً على العرض، بس قررت أعتذر."
],
[
"A",
"I'm sorry to hear that. May I ask why?",
"يؤسفني هذا. ممكن أعرف السبب؟"
],
[
"B",
"It's not the right fit for me at the moment, but I hope we can stay in touch.",
"ما يناسبني حالياً، بس أتمنى نظل على تواصل."
]
]
],
[
"إدارة اجتماع",
"Chairing a Meeting",
"🪑",
"إذا أنت تدير الاجتماع ابدأ: Let's get started. ونظم الكلام: Let's move on to the next item. ولما تختم: To sum up, we agreed that...",
[
[
"Let's get started.",
"خلونا نبدأ."
],
[
"Let's move on to the next item.",
"ننتقل للبند اللي بعده."
],
[
"Could we keep this brief?",
"ممكن نختصر؟"
],
[
"To sum up, we agreed on three things.",
"باختصار، اتفقنا على ثلاث نقاط."
]
],
[
[
"A",
"Thanks for coming, everyone. Let's get started.",
"شكراً لحضوركم. خلونا نبدأ."
],
[
"B",
"Before we start, can I add something to the agenda?",
"قبل نبدأ، أقدر أضيف شي لجدول الأعمال؟"
],
[
"A",
"Sure, but could we keep this brief? Let's move on to the budget first.",
"أكيد، بس خلنا نختصر. نبدأ بالميزانية أول."
],
[
"B",
"Fine. Then to sum up, we'll review costs on Monday.",
"تمام. باختصار، بنراجع التكاليف يوم الاثنين."
]
]
],
[
"مقاطعة بلباقة",
"Interrupting Politely",
"✋",
"إذا تبي تدخل في الكلام قل: Sorry to interrupt, but... وإذا أحد قاطعك: If I could just finish my point... وإذا تبي ترجع للموضوع: Going back to what you said...",
[
[
"Sorry to interrupt, but I have a quick question.",
"آسف على المقاطعة، بس عندي سؤال سريع."
],
[
"If I could just finish my point...",
"لو تسمح أكمل فكرتي..."
],
[
"Going back to what you said earlier...",
"بالرجوع للي قلته قبل..."
],
[
"Please, go ahead.",
"تفضل، كمّل."
]
],
[
[
"A",
"And the second reason the sales dropped is...",
"والسبب الثاني إن المبيعات نزلت هو..."
],
[
"B",
"Sorry to interrupt, but do you have the exact numbers?",
"آسف على المقاطعة، بس عندك الأرقام بالضبط؟"
],
[
"A",
"If I could just finish my point, I'll show them on the next slide.",
"لو تسمح أكمل فكرتي، بعرضها في الشريحة الجاية."
],
[
"B",
"Of course. Please, go ahead.",
"أكيد. تفضل، كمّل."
]
]
],
[
"تقديم ملاحظات لزميل",
"Giving Feedback to a Colleague",
"💬",
"عشان تنتقد بلطف ابدأ بالإيجابي: Overall, this is really good. ثم اقترح: One thing you could improve is... واختم بالدعم: Let me know if you need help.",
[
[
"Overall, this is really good work.",
"بشكل عام، هذا شغل ممتاز."
],
[
"One thing you could improve is the introduction.",
"شي واحد تقدر تحسنه هو المقدمة."
],
[
"It might be clearer if you add an example.",
"يمكن يكون أوضح لو تضيف مثال."
],
[
"Let me know if you need any help.",
"قل لي إذا تحتاج أي مساعدة."
]
],
[
[
"A",
"Did you get a chance to read my report?",
"لحقت تقرأ تقريري؟"
],
[
"B",
"Yes. Overall, this is really good work.",
"إيه. بشكل عام، شغل ممتاز."
],
[
"A",
"Thanks! Anything I should change?",
"شكراً! فيه شي لازم أغيره؟"
],
[
"B",
"One thing you could improve is the introduction. It might be clearer if you add an example.",
"شي واحد تقدر تحسنه هو المقدمة. يمكن يكون أوضح لو تضيف مثال."
]
]
],
[
"تلقي النقد",
"Receiving Criticism",
"🧏",
"إذا أحد انتقدك لا تدافع بسرعة، قل: Thanks for letting me know. واسأل: Could you give me an example? ووعد بالتحسن: I'll keep that in mind next time.",
[
[
"Thanks for letting me know.",
"شكراً إنك نبهتني."
],
[
"Could you give me an example?",
"ممكن تعطيني مثال؟"
],
[
"I'll keep that in mind next time.",
"بحط هذا في بالي المرة الجاية."
],
[
"I didn't realise that.",
"ما كنت منتبه لهذا."
]
],
[
[
"A",
"Your emails to clients are sometimes too short.",
"إيميلاتك للعملاء أحياناً قصيرة زيادة."
],
[
"B",
"Thanks for letting me know. Could you give me an example?",
"شكراً إنك نبهتني. ممكن تعطيني مثال؟"
],
[
"A",
"Yesterday you replied with just one word: \"Fine.\"",
"أمس رديت بكلمة وحدة: \"تمام.\""
],
[
"B",
"I didn't realise that. I'll keep that in mind next time.",
"ما كنت منتبه. بحط هذا في بالي المرة الجاية."
]
]
],
[
"الاعتذار عن خطأ في العمل",
"Owning a Mistake at Work",
"🙇",
"إذا غلطت اعترف بوضوح: That was my mistake. واشرح الحل: Here's what I've done to fix it. وطمّن: It won't happen again.",
[
[
"That was my mistake.",
"هذا كان غلطي."
],
[
"I take full responsibility.",
"أتحمل المسؤولية كاملة."
],
[
"Here's what I've done to fix it.",
"هذا اللي سويته عشان أصلحه."
],
[
"It won't happen again.",
"ما راح يتكرر."
]
],
[
[
"A",
"The client received the wrong invoice this morning.",
"العميل وصلته فاتورة غلط الصبح."
],
[
"B",
"That was my mistake. I take full responsibility.",
"هذا كان غلطي. أتحمل المسؤولية كاملة."
],
[
"A",
"What are we going to do now?",
"وش بنسوي الحين؟"
],
[
"B",
"I've already sent the correct one and apologised. It won't happen again.",
"أرسلت الصحيحة واعتذرت. ما راح يتكرر."
]
]
],
[
"التفاوض على سعر",
"Negotiating a Price",
"🤝",
"في التفاوض قل: Is there any flexibility on the price? واعرض: Would you accept...? وإذا تبي تقفل الاتفاق: If you can do that, we have a deal.",
[
[
"Is there any flexibility on the price?",
"فيه مرونة في السعر؟"
],
[
"Would you accept twelve thousand?",
"تقبل باثنعشر ألف؟"
],
[
"That's a bit beyond my budget.",
"هذا فوق ميزانيتي شوي."
],
[
"If you can do that, we have a deal.",
"إذا تقدر على هذا، اتفقنا."
]
],
[
[
"A",
"The car is fifteen thousand riyals.",
"السيارة بخمسطعش ألف ريال."
],
[
"B",
"That's a bit beyond my budget. Is there any flexibility on the price?",
"هذا فوق ميزانيتي شوي. فيه مرونة في السعر؟"
],
[
"A",
"I could go down to thirteen and a half.",
"أقدر أنزل لثلاثطعش ونص."
],
[
"B",
"Would you accept thirteen? If you can do that, we have a deal.",
"تقبل بثلاثطعش؟ إذا تقدر، اتفقنا."
]
]
],
[
"خلاف مع جار",
"Resolving a Dispute with a Neighbour",
"🏘️",
"لحل مشكلة مع جارك بهدوء قل: I was hoping we could talk about something. واشرح المشكلة بدون اتهام: The noise has been keeping us up. واقترح حل: Would it be possible to...?",
[
[
"I was hoping we could talk about something.",
"كنت أتمنى نتكلم في موضوع."
],
[
"The noise has been keeping us up at night.",
"الإزعاج قاعد يسهرنا بالليل."
],
[
"Would it be possible to keep it down after eleven?",
"ممكن تخففون الصوت بعد الساعة ١١؟"
],
[
"I really appreciate your understanding.",
"أقدّر تفهمك كثير."
]
],
[
[
"A",
"Hi! Is everything okay?",
"هلا! كل شي تمام؟"
],
[
"B",
"Yes, thanks. I was hoping we could talk about something. The noise has been keeping us up.",
"إيه شكراً. كنت أتمنى نتكلم في شي. الإزعاج قاعد يسهرنا."
],
[
"A",
"Oh, I'm sorry. The kids play late on weekends.",
"أوه آسف. العيال يلعبون لين متأخر في الويكند."
],
[
"B",
"I understand. Would it be possible to keep it down after eleven? I really appreciate it.",
"فاهم. ممكن تخففون الصوت بعد ١١؟ أقدّر هذا كثير."
]
]
],
[
"التأمين والمطالبة",
"Making an Insurance Claim",
"📋",
"عشان تقدم مطالبة تأمين قل: I'd like to make a claim. واشرح: My car was damaged in a parking lot. واسأل: What documents do you need from me?",
[
[
"I'd like to make a claim.",
"أبي أقدم مطالبة."
],
[
"My car was damaged in a parking lot.",
"سيارتي تضررت في موقف."
],
[
"What documents do you need from me?",
"وش الأوراق اللي تحتاجونها مني؟"
],
[
"How long does the process usually take?",
"العملية عادةً كم تاخذ؟"
]
],
[
[
"A",
"Good morning, claims department.",
"صباح الخير، قسم المطالبات."
],
[
"B",
"Hi, I'd like to make a claim. My car was damaged in a parking lot.",
"هلا، أبي أقدم مطالبة. سيارتي تضررت في موقف."
],
[
"A",
"I'm sorry to hear that. Do you have a police report?",
"يؤسفني. عندك تقرير من المرور؟"
],
[
"B",
"Yes. What other documents do you need, and how long does it usually take?",
"إيه. وش الأوراق الثانية اللي تحتاجونها، وكم تاخذ عادةً؟"
]
]
],
[
"مكالمة مع شركة الاتصالات",
"Disputing a Bill",
"🧾",
"إذا فاتورتك غلط قل: There seems to be a mistake on my bill. وحدد: I was charged twice for the same service. واطلب: Could you remove the charge?",
[
[
"There seems to be a mistake on my bill.",
"يبدو فيه غلط في فاتورتي."
],
[
"I was charged twice for the same service.",
"انخصم مني مرتين على نفس الخدمة."
],
[
"Could you remove the extra charge?",
"ممكن تشيلون المبلغ الزايد؟"
],
[
"Could you send me a corrected bill?",
"ممكن ترسلون لي فاتورة مصححة؟"
]
],
[
[
"A",
"How can I help you today?",
"كيف أقدر أساعدك اليوم؟"
],
[
"B",
"There seems to be a mistake on my bill. I was charged twice for the same service.",
"يبدو فيه غلط في فاتورتي. انخصم مني مرتين على نفس الخدمة."
],
[
"A",
"Let me check... Yes, I can see that. I'm sorry.",
"خلني أشوف... إيه، واضح. آسف."
],
[
"B",
"Could you remove the extra charge and send me a corrected bill?",
"ممكن تشيلون المبلغ الزايد وترسلون فاتورة مصححة؟"
]
]
],
[
"طلب توصية",
"Asking for a Reference",
"📄",
"عشان تطلب خطاب توصية قل: Would you be willing to write me a reference? وأعطه الوقت: The deadline is next month. واشكره: I'd really appreciate it.",
[
[
"Would you be willing to write me a reference?",
"تقبل تكتب لي خطاب توصية؟"
],
[
"I'm applying for a master's programme.",
"أنا متقدم لبرنامج ماجستير."
],
[
"The deadline is next month.",
"آخر موعد الشهر الجاي."
],
[
"I'd really appreciate it.",
"بكون ممتن لك كثير."
]
],
[
[
"A",
"Hello, Ahmed! How can I help?",
"هلا أحمد! كيف أقدر أساعدك؟"
],
[
"B",
"I'm applying for a master's programme. Would you be willing to write me a reference?",
"متقدم لبرنامج ماجستير. تقبل تكتب لي خطاب توصية؟"
],
[
"A",
"Of course. When do you need it?",
"أكيد. متى تحتاجه؟"
],
[
"B",
"The deadline is next month. I'd really appreciate it.",
"آخر موعد الشهر الجاي. بكون ممتن لك كثير."
]
]
],
[
"العودة للعمل بعد إجازة",
"Catching Up After Leave",
"🔙",
"لما ترجع من إجازة قل: Could you bring me up to speed? واسأل: Did I miss anything important? وعشان ترتب أولوياتك: What should I focus on first?",
[
[
"Could you bring me up to speed?",
"ممكن تحدثني باللي صار؟"
],
[
"Did I miss anything important?",
"فاتني شي مهم؟"
],
[
"What should I focus on first?",
"وش أركز عليه أول؟"
],
[
"I'll catch up on my emails this morning.",
"بخلص إيميلاتي الصبح."
]
],
[
[
"A",
"Welcome back! How was your holiday?",
"حياك! كيف كانت إجازتك؟"
],
[
"B",
"Great, thanks. Could you bring me up to speed? Did I miss anything important?",
"حلوة، شكراً. ممكن تحدثني؟ فاتني شي مهم؟"
],
[
"A",
"The client meeting moved to Tuesday, and we hired a new designer.",
"اجتماع العميل انتقل للثلاثاء، ووظفنا مصمم جديد."
],
[
"B",
"Okay. What should I focus on first?",
"تمام. وش أركز عليه أول؟"
]
]
],
[
"مناسبة رسمية",
"Networking at an Event",
"🍸",
"في الفعاليات المهنية ابدأ بـ: Hi, I don't think we've met. وعرف بنفسك: I work in marketing at... واختم: It was great talking to you. Here's my card.",
[
[
"Hi, I don't think we've met.",
"هلا، ما أظن تعارفنا."
],
[
"I work in marketing at a tech company.",
"أشتغل في التسويق بشركة تقنية."
],
[
"What brings you to this event?",
"وش جابك لهالفعالية؟"
],
[
"It was great talking to you.",
"سعدت بالحديث معك."
]
],
[
[
"A",
"Hi, I don't think we've met. I'm Faisal.",
"هلا، ما أظن تعارفنا. أنا فيصل."
],
[
"B",
"Nice to meet you. I'm Noura. I work in marketing at a tech company.",
"تشرفنا. أنا نورة. أشتغل بالتسويق في شركة تقنية."
],
[
"A",
"Interesting! What brings you to this event?",
"حلو! وش جابك للفعالية؟"
],
[
"B",
"I'm looking for new partners. It was great talking to you. Here's my card.",
"أدور شركاء جدد. سعدت بالحديث معك. هذي بطاقتي."
]
]
],
[
"التحدث عن الأخبار",
"Discussing the News",
"📰",
"عشان تفتح موضوع عن خبر قل: Did you hear about...? وتعطي رأيك: Personally, I think... وتسأل عن رأي غيرك: What's your take on it?",
[
[
"Did you hear about the new metro line?",
"سمعت عن خط المترو الجديد؟"
],
[
"Apparently, it opens next month.",
"على ما يبدو بيفتح الشهر الجاي."
],
[
"Personally, I think it's a great idea.",
"شخصياً، أشوفها فكرة ممتازة."
],
[
"What's your take on it?",
"وش رأيك أنت؟"
]
],
[
[
"A",
"Did you hear about the new metro line?",
"سمعت عن خط المترو الجديد؟"
],
[
"B",
"Yes! Apparently, it opens next month.",
"إيه! على ما يبدو بيفتح الشهر الجاي."
],
[
"A",
"Personally, I think it'll reduce traffic a lot. What's your take on it?",
"شخصياً أتوقع يخفف الزحمة واجد. وش رأيك؟"
],
[
"B",
"I hope so, but people may still prefer their cars.",
"أتمنى، بس يمكن الناس يفضلون سياراتهم."
]
]
],
[
"طلب تمديد موعد",
"Asking for an Extension",
"⏳",
"إذا تحتاج وقت إضافي قل: Would it be possible to get an extension? واذكر السبب: I've been unwell this week. واقترح موعد: Could I submit it by Sunday?",
[
[
"Would it be possible to get an extension?",
"ممكن أحصل على تمديد؟"
],
[
"I've been unwell this week.",
"كنت تعبان هالأسبوع."
],
[
"Could I submit it by Sunday?",
"ممكن أسلمه يوم الأحد؟"
],
[
"I've already finished most of it.",
"خلصت أغلبه."
]
],
[
[
"A",
"Hi, Sara. What can I do for you?",
"هلا سارة. وش أقدر أسوي لك؟"
],
[
"B",
"Would it be possible to get an extension on the essay? I've been unwell this week.",
"ممكن آخذ تمديد للمقالة؟ كنت تعبانة هالأسبوع."
],
[
"A",
"I'm sorry to hear that. How much have you done?",
"يؤسفني. كم خلصتي منها؟"
],
[
"B",
"I've already finished most of it. Could I submit it by Sunday?",
"خلصت أغلبها. ممكن أسلمها الأحد؟"
]
]
],
[
"الحديث مع الطبيب عن نتائج",
"Discussing Test Results",
"🩺",
"لما تراجع نتائج تحاليل اسأل: What do these results mean? وعن الخطة: What are my treatment options? وإذا ما فهمت: Could you explain that in simpler terms?",
[
[
"What do these results mean?",
"وش معنى هالنتائج؟"
],
[
"Is it anything serious?",
"هو شي خطير؟"
],
[
"What are my treatment options?",
"وش خيارات العلاج عندي؟"
],
[
"Could you explain that in simpler terms?",
"ممكن تشرح بطريقة أبسط؟"
]
],
[
[
"A",
"Your blood tests show your vitamin D is quite low.",
"تحاليل الدم تبين إن فيتامين د عندك منخفض."
],
[
"B",
"What do these results mean? Is it anything serious?",
"وش معنى هالنتائج؟ هو شي خطير؟"
],
[
"A",
"It's common. It can cause tiredness and weak bones.",
"منتشر. ممكن يسبب تعب وضعف عظام."
],
[
"B",
"Could you explain my treatment options in simpler terms?",
"ممكن تشرح خيارات العلاج بطريقة أبسط؟"
]
]
],
[
"حجز قاعة لفعالية",
"Organising an Event",
"🎪",
"لتنظيم فعالية قل: We're planning an event for about a hundred guests. واسأل: What's included in the package? وعن الحجز: Can we pay a deposit to hold the date?",
[
[
"We're planning an event for about a hundred guests.",
"نخطط لفعالية لحوالي مية ضيف."
],
[
"What's included in the package?",
"وش يشمل البكج؟"
],
[
"Can we pay a deposit to hold the date?",
"نقدر ندفع عربون عشان نثبت التاريخ؟"
],
[
"Is there parking for guests?",
"فيه مواقف للضيوف؟"
]
],
[
[
"A",
"How can I help you?",
"كيف أقدر أخدمك؟"
],
[
"B",
"We're planning an event for about a hundred guests. What's included in the package?",
"نخطط لفعالية لحوالي مية ضيف. وش يشمل البكج؟"
],
[
"A",
"The hall, catering, and sound system.",
"القاعة والضيافة ونظام الصوت."
],
[
"B",
"Sounds good. Can we pay a deposit to hold the date?",
"ممتاز. نقدر ندفع عربون نثبت فيه التاريخ؟"
]
]
],
[
"طلب زيادة راتب",
"Asking for a Raise",
"💹",
"عشان تطلب زيادة رتب كلامك: I'd like to discuss my salary. واذكر إنجازاتك: Over the past year, I've... واطلب بوضوح: I believe a raise would reflect my contribution.",
[
[
"I'd like to discuss my salary.",
"أبي أناقش راتبي."
],
[
"Over the past year, I've taken on more responsibilities.",
"خلال السنة اللي فاتت، تحملت مسؤوليات أكثر."
],
[
"I believe a raise would reflect my contribution.",
"أعتقد إن الزيادة تعكس مساهمتي."
],
[
"When could we review this?",
"متى نقدر نراجع هذا؟"
]
],
[
[
"A",
"You wanted to see me?",
"كنت تبي تشوفني؟"
],
[
"B",
"Yes. I'd like to discuss my salary. Over the past year, I've taken on more responsibilities.",
"إيه. أبي أناقش راتبي. السنة اللي فاتت تحملت مسؤوليات أكثر."
],
[
"A",
"That's true. You've done a great job.",
"صحيح. سويت شغل ممتاز."
],
[
"B",
"Thank you. I believe a raise would reflect my contribution. When could we review this?",
"شكراً. أعتقد الزيادة تعكس مساهمتي. متى نقدر نراجع هذا؟"
]
]
],
[
"تقديم استقالة",
"Resigning Professionally",
"🚪",
"عشان تستقيل باحترافية قل: I've decided to hand in my notice. واشكرهم: I'm grateful for everything I've learned here. واعرض المساعدة: I'm happy to help train my replacement.",
[
[
"I've decided to hand in my notice.",
"قررت أقدم استقالتي."
],
[
"My last day will be the end of the month.",
"آخر يوم لي نهاية الشهر."
],
[
"I'm grateful for everything I've learned here.",
"ممتن لكل شي تعلمته هنا."
],
[
"I'm happy to help train my replacement.",
"يسعدني أساعد في تدريب اللي بيجي مكاني."
]
],
[
[
"A",
"Is everything alright? You look serious.",
"كل شي تمام؟ شكلك جدي."
],
[
"B",
"I've decided to hand in my notice. My last day will be the end of the month.",
"قررت أقدم استقالتي. آخر يوم لي نهاية الشهر."
],
[
"A",
"We'll be sad to see you go.",
"بنزعل إنك بتمشي."
],
[
"B",
"I'm grateful for everything I've learned here, and I'm happy to help train my replacement.",
"ممتن لكل شي تعلمته هنا، ويسعدني أدرب اللي بيجي مكاني."
]
]
],
[
"التعزية والمواساة",
"Offering Support",
"🤲",
"إذا أحد يمر بوقت صعب قل: I'm so sorry to hear that. واعرض المساعدة: If there's anything I can do, just let me know. وطمّنه: Take all the time you need.",
[
[
"I'm so sorry to hear that.",
"يؤسفني كثير أسمع هذا."
],
[
"That must be really hard for you.",
"أكيد هذا صعب عليك."
],
[
"If there's anything I can do, just let me know.",
"إذا فيه أي شي أقدر أسويه، بس قل لي."
],
[
"Take all the time you need.",
"خذ وقتك كامل."
]
],
[
[
"A",
"I won't be at work this week. My father is in hospital.",
"ما راح أداوم هالأسبوع. أبوي في المستشفى."
],
[
"B",
"I'm so sorry to hear that. That must be really hard for you.",
"يؤسفني كثير. أكيد هذا صعب عليك."
],
[
"A",
"Thank you. I'm worried about my tasks, though.",
"شكراً. بس أنا قلقان على مهامي."
],
[
"B",
"Don't worry. Take all the time you need. If there's anything I can do, just let me know.",
"لا تشيل هم. خذ وقتك. إذا فيه أي شي أقدر أسويه قل لي."
]
]
],
[
"مناقشة خطة سفر جماعية",
"Planning a Group Trip",
"🗺️",
"لما تخططون رحلة مع ربع قل: What do you all think about...? وتقترح: How about we split the costs? وعشان تقفلون القرار: Shall we go ahead and book?",
[
[
"What do you all think about going to AlUla?",
"وش رأيكم نروح العلا؟"
],
[
"How about we split the costs?",
"وش رأيكم نقسم التكاليف؟"
],
[
"I'm easy, either works for me.",
"ما عندي مشكلة، أي خيار يناسبني."
],
[
"Shall we go ahead and book?",
"نمشي ونحجز؟"
]
],
[
[
"A",
"What do you all think about going to AlUla next month?",
"وش رأيكم نروح العلا الشهر الجاي؟"
],
[
"B",
"Great idea. How about we split the costs of the villa?",
"فكرة حلوة. وش رأيكم نقسم تكلفة الفيلا؟"
],
[
"A",
"Sure. Should we drive or fly?",
"أكيد. نسوق ولا نطير؟"
],
[
"B",
"I'm easy, either works for me. Shall we go ahead and book?",
"ما عندي مشكلة، أي واحد يناسبني. نمشي ونحجز؟"
]
]
],
[
"مقابلة في السفارة للدراسة",
"Student Visa Interview",
"🛂",
"في مقابلة تأشيرة دراسة كن واضح: I've been accepted at the University of Leeds. وعن التمويل: My studies are fully funded by a scholarship. وعن رجوعك: I plan to return home after graduating.",
[
[
"I've been accepted at the University of Leeds.",
"انقبلت في جامعة ليدز."
],
[
"I'll be studying engineering for two years.",
"بدرس هندسة لمدة سنتين."
],
[
"My studies are fully funded by a scholarship.",
"دراستي ممولة بالكامل من منحة."
],
[
"I plan to return home after graduating.",
"أخطط أرجع لبلدي بعد التخرج."
]
],
[
[
"A",
"Why do you want to go to the UK?",
"ليش تبي تروح بريطانيا؟"
],
[
"B",
"I've been accepted at the University of Leeds. I'll be studying engineering.",
"انقبلت في جامعة ليدز. بدرس هندسة."
],
[
"A",
"Who is paying for your studies?",
"مين بيدفع دراستك؟"
],
[
"B",
"My studies are fully funded by a scholarship, and I plan to return home after graduating.",
"دراستي ممولة بالكامل من منحة، وأخطط أرجع بعد التخرج."
]
]
],
[
"شرح مشكلة تقنية",
"Explaining a Technical Problem",
"🖥️",
"عشان تشرح مشكلة تقنية بدقة قل: Every time I open the app, it crashes. وحدد متى بدأت: It started after the last update. واذكر اللي جربته: I've already tried restarting it.",
[
[
"Every time I open the app, it crashes.",
"كل ما أفتح التطبيق يقفل."
],
[
"It started after the last update.",
"بدأت بعد آخر تحديث."
],
[
"I've already tried restarting my phone.",
"جربت أعيد تشغيل جوالي."
],
[
"Is there a known issue?",
"هل هي مشكلة معروفة؟"
]
],
[
[
"A",
"Technical support, how can I help?",
"الدعم الفني، كيف أساعدك؟"
],
[
"B",
"Every time I open the app, it crashes. It started after the last update.",
"كل ما أفتح التطبيق يقفل. بدأت بعد آخر تحديث."
],
[
"A",
"Have you tried restarting your phone?",
"جربت تعيد تشغيل جوالك؟"
],
[
"B",
"Yes, I've already tried that. Is there a known issue?",
"إيه، جربت. هل هي مشكلة معروفة؟"
]
]
],
[
"الحديث عن الخطط المستقبلية",
"Talking About Future Plans",
"🔭",
"عشان تتكلم عن طموحاتك قل: In five years, I'd like to... وعن خطتك: I'm planning to do a master's. وإذا مو متأكد: It depends on how things go.",
[
[
"In five years, I'd like to run my own business.",
"بعد خمس سنين أبي يكون عندي مشروعي."
],
[
"I'm planning to do a master's first.",
"أخطط آخذ ماجستير أول."
],
[
"It depends on how things go.",
"يعتمد على كيف تمشي الأمور."
],
[
"I'm hoping to work abroad for a while.",
"أتمنى أشتغل برا فترة."
]
],
[
[
"A",
"Where do you see yourself in five years?",
"وين تشوف نفسك بعد خمس سنين؟"
],
[
"B",
"In five years, I'd like to run my own business.",
"بعد خمس سنين أبي يكون عندي مشروعي."
],
[
"A",
"And what's your plan to get there?",
"وش خطتك عشان توصل؟"
],
[
"B",
"I'm planning to do a master's first, but it depends on how things go.",
"أخطط آخذ ماجستير أول، بس يعتمد على كيف تمشي الأمور."
]
]
],
[
"إقناع شخص",
"Persuading Someone",
"🧲",
"عشان تقنع أحد قدّم الفائدة: The main advantage is... وتعامل مع اعتراضه: I understand your concern, but... واختم: Why don't we give it a try?",
[
[
"The main advantage is that it saves time.",
"الميزة الأساسية إنه يوفر الوقت."
],
[
"I understand your concern, but it's worth it.",
"أفهم قلقك، بس يستاهل."
],
[
"In the long run, it'll cost less.",
"على المدى البعيد بيكلف أقل."
],
[
"Why don't we give it a try?",
"ليش ما نجربه؟"
]
],
[
[
"A",
"I don't think we need a new system. The old one works.",
"ما أظن نحتاج نظام جديد. القديم شغال."
],
[
"B",
"The main advantage is that it saves time on every order.",
"الميزة الأساسية إنه يوفر وقت في كل طلب."
],
[
"A",
"But it's expensive.",
"بس غالي."
],
[
"B",
"I understand your concern, but in the long run it'll cost less. Why don't we give it a try?",
"أفهم قلقك، بس على المدى البعيد بيكلف أقل. ليش ما نجربه؟"
]
]
]
];
/** Level 4 (C1→C2): diplomacy, leadership and nuanced social situations, hand-written. */
const RAW4: R[] = [
[
"إيصال خبر سيئ",
"Breaking Bad News",
"📉",
"عشان توصل خبر سيئ بلطف مهّد: I'm afraid I have some bad news. وكن واضح: Unfortunately, the project has been cancelled. واعرض الخطوة الجاية: Let's talk about what happens next.",
[
[
"I'm afraid I have some bad news.",
"للأسف عندي خبر مو حلو."
],
[
"Unfortunately, the project has been cancelled.",
"للأسف المشروع انلغى."
],
[
"I know this isn't what you were hoping for.",
"أعرف إن هذا مو اللي كنت تتمناه."
],
[
"Let's talk about what happens next.",
"خلنا نتكلم عن الخطوة الجاية."
]
],
[
[
"A",
"You wanted to see me?",
"كنت تبي تشوفني؟"
],
[
"B",
"Yes. I'm afraid I have some bad news. Unfortunately, the project has been cancelled.",
"إيه. للأسف عندي خبر مو حلو. المشروع انلغى."
],
[
"A",
"Oh no. We've worked on it for months.",
"لا! اشتغلنا عليه شهور."
],
[
"B",
"I know this isn't what you were hoping for. Let's talk about what happens next.",
"أعرف إن هذا مو اللي كنت تتمناه. خلنا نتكلم عن الخطوة الجاية."
]
]
],
[
"التلطيف والتحفظ",
"Hedging Your Statements",
"🌫️",
"في المواقف الرسمية خفف كلامك: It seems that... و: It might be worth... و: I'd tend to think... كذا تبين رأيك بدون ما تكون حاد.",
[
[
"It seems that the numbers are lower than expected.",
"يبدو إن الأرقام أقل من المتوقع."
],
[
"It might be worth checking again.",
"يمكن يستاهل نتأكد مرة ثانية."
],
[
"I'd tend to think the second option is safer.",
"أميل إن الخيار الثاني أأمن."
],
[
"To some extent, that's true.",
"إلى حد ما هذا صحيح."
]
],
[
[
"A",
"So the campaign failed?",
"يعني الحملة فشلت؟"
],
[
"B",
"Not exactly. It seems that the results were lower than expected.",
"مو بالضبط. يبدو إن النتائج كانت أقل من المتوقع."
],
[
"A",
"Should we stop it, then?",
"نوقفها إذن؟"
],
[
"B",
"I'd tend to think we should adjust it first. It might be worth testing a new message.",
"أميل إننا نعدّلها أول. يمكن يستاهل نجرب رسالة جديدة."
]
]
],
[
"الوساطة بين زميلين",
"Mediating a Conflict",
"🧑‍⚖️",
"إذا تتوسط بين اثنين قل: Let's hear both sides. ولخص بحياد: So, if I understand, you both want... واقترح: What would a fair solution look like?",
[
[
"Let's hear both sides.",
"خلنا نسمع الطرفين."
],
[
"I'd like each of you to speak without interruption.",
"أبي كل واحد يتكلم بدون مقاطعة."
],
[
"It sounds like you both want the same outcome.",
"يبين إنكم تبون نفس النتيجة."
],
[
"What would a fair solution look like?",
"كيف يكون الحل العادل في رأيكم؟"
]
],
[
[
"A",
"He keeps changing my designs without asking.",
"هو دايم يغير تصاميمي بدون ما يسأل."
],
[
"B",
"Let's hear both sides. I'd like each of you to speak without interruption.",
"خلنا نسمع الطرفين. أبي كل واحد يتكلم بدون مقاطعة."
],
[
"A",
"Fine. I just want to be consulted.",
"طيب. أنا بس أبي أُستشار."
],
[
"B",
"It sounds like you both want a good final product. What would a fair solution look like?",
"يبين إنكم تبون منتج نهائي ممتاز. كيف يكون الحل العادل؟"
]
]
],
[
"التعامل مع عميل غاضب",
"Handling an Angry Customer",
"😡",
"مع العميل الغاضب لا تدافع: I completely understand your frustration. واعتذر بصدق: I'm sorry this happened. والتزم بشي محدد: I'll personally make sure it's resolved by tomorrow.",
[
[
"I completely understand your frustration.",
"أفهم انزعاجك تماماً."
],
[
"I'm sorry this happened.",
"آسف إن هذا صار."
],
[
"Let me see what I can do right now.",
"خلني أشوف وش أقدر أسوي الحين."
],
[
"I'll personally make sure it's resolved by tomorrow.",
"بنفسي بتأكد إنها تنحل قبل بكرة."
]
],
[
[
"A",
"This is the third time my order has arrived broken!",
"هذي ثالث مرة طلبي يوصل مكسور!"
],
[
"B",
"I completely understand your frustration, and I'm sorry this happened.",
"أفهم انزعاجك تماماً، وآسف إن هذا صار."
],
[
"A",
"Sorry isn't enough. I want a solution.",
"الأسف ما يكفي. أبي حل."
],
[
"B",
"Of course. I'll send a replacement today, and I'll personally make sure it's resolved by tomorrow.",
"أكيد. برسل بديل اليوم، وبنفسي بتأكد إنها تنحل قبل بكرة."
]
]
],
[
"قيادة نقاش جماعي",
"Facilitating a Discussion",
"🎙️",
"عشان تدير نقاش وتشرك الكل قل: Let's hear from someone who hasn't spoken yet. وتلخص: So far we've agreed on... وترجع للموضوع: Let's get back to the main question.",
[
[
"Let's hear from someone who hasn't spoken yet.",
"خلنا نسمع من أحد ما تكلم للحين."
],
[
"That's an interesting point. Could you expand on it?",
"نقطة مثيرة. ممكن توسع فيها؟"
],
[
"So far, we've agreed on two things.",
"لين الحين اتفقنا على شيئين."
],
[
"Let's get back to the main question.",
"خلنا نرجع للسؤال الأساسي."
]
],
[
[
"A",
"And another thing about the parking...",
"وشي ثاني عن المواقف..."
],
[
"B",
"Let's get back to the main question. Nora, we haven't heard from you yet.",
"خلنا نرجع للسؤال الأساسي. نورة، ما سمعنا منك للحين."
],
[
"A",
"I think we should start the training online.",
"أشوف نبدأ التدريب أونلاين."
],
[
"B",
"That's an interesting point. Could you expand on it?",
"نقطة مثيرة. ممكن توسعين فيها؟"
]
]
],
[
"رفض طلب من المدير",
"Pushing Back on Your Manager",
"🛑",
"إذا مديرك طلب شي مستحيل قل بأدب: I want to make sure I do this well. وبيّن الواقع: With my current workload, I can't deliver both by Friday. واطلب قرار: Which should I prioritise?",
[
[
"I want to make sure I do this well.",
"أبي أتأكد إني أسويه صح."
],
[
"With my current workload, I can't deliver both by Friday.",
"مع ضغط شغلي الحالي ما أقدر أسلم الاثنين قبل الجمعة."
],
[
"Which one should I prioritise?",
"أي واحد أقدّمه؟"
],
[
"Could we push the deadline to Tuesday?",
"ممكن نأجل الموعد للثلاثاء؟"
]
],
[
[
"A",
"I need the report and the presentation by Friday.",
"أبي التقرير والعرض قبل الجمعة."
],
[
"B",
"I want to make sure I do this well. With my current workload, I can't deliver both by Friday.",
"أبي أتأكد إني أسويه صح. مع ضغط شغلي ما أقدر أسلم الاثنين قبل الجمعة."
],
[
"A",
"Hmm. They're both important.",
"همم. الاثنين مهمين."
],
[
"B",
"I understand. Which one should I prioritise? Or could we push the presentation to Tuesday?",
"فاهم. أي واحد أقدّمه؟ أو ممكن نأجل العرض للثلاثاء؟"
]
]
],
[
"مقابلة إعلامية",
"Being Interviewed by the Media",
"📺",
"في المقابلات الإعلامية خذ وقتك: That's a good question. وإذا ما تقدر تجاوب: I'm not in a position to comment on that. وارجع لرسالتك: What I can tell you is...",
[
[
"That's a good question.",
"سؤال جميل."
],
[
"I'm not in a position to comment on that.",
"ما أقدر أعلق على هذا."
],
[
"What I can tell you is that we're working hard.",
"اللي أقدر أقوله إننا نشتغل بجد."
],
[
"Our priority is the safety of our customers.",
"أولويتنا سلامة عملائنا."
]
],
[
[
"A",
"Is it true the company will close two branches?",
"صحيح إن الشركة بتقفل فرعين؟"
],
[
"B",
"I'm not in a position to comment on that yet.",
"ما أقدر أعلق على هذا للحين."
],
[
"A",
"But customers are worried.",
"بس العملاء قلقين."
],
[
"B",
"That's understandable. What I can tell you is that our priority is our customers.",
"مفهوم. اللي أقدر أقوله إن أولويتنا عملاؤنا."
]
]
],
[
"تقديم شكوى رسمية مكتوبة شفهياً",
"Formal Request to an Authority",
"🏛️",
"لما تتكلم مع جهة رسمية استخدم لغة رسمية: I'm writing to request... أو: I would be grateful if you could... واذكر المرفقات: I've enclosed copies of the documents.",
[
[
"I would be grateful if you could review my case.",
"أكون ممتن لو تراجعون حالتي."
],
[
"I've enclosed copies of the relevant documents.",
"أرفقت نسخ من المستندات المطلوبة."
],
[
"I look forward to hearing from you.",
"أتطلع لردكم."
],
[
"Could you let me know the expected timeframe?",
"ممكن تبلغوني بالمدة المتوقعة؟"
]
],
[
[
"A",
"Good morning. How can we help you?",
"صباح الخير. كيف نخدمك؟"
],
[
"B",
"Good morning. I would be grateful if you could review my permit application.",
"صباح النور. أكون ممتن لو تراجعون طلب التصريح حقي."
],
[
"A",
"Do you have the supporting documents?",
"عندك المستندات الداعمة؟"
],
[
"B",
"Yes, I've enclosed copies here. Could you let me know the expected timeframe?",
"إيه، أرفقت النسخ هنا. ممكن تبلغوني بالمدة المتوقعة؟"
]
]
],
[
"الحديث عن موضوع حساس",
"Discussing a Sensitive Topic",
"🫥",
"في المواضيع الحساسة خلك لطيف: I hope you don't mind me asking... واحترم الحدود: You don't have to answer if you'd rather not. وطمّن: Whatever you decide, I'm here.",
[
[
"I hope you don't mind me asking...",
"أتمنى ما تمانع إني أسأل..."
],
[
"You don't have to answer if you'd rather not.",
"مو لازم تجاوب إذا ما تبي."
],
[
"I've noticed you seem a bit down lately.",
"لاحظت إنك متضايق شوي الفترة الأخيرة."
],
[
"Whatever you decide, I'm here for you.",
"أياً كان قرارك، أنا موجود لك."
]
],
[
[
"A",
"You look tired these days.",
"شكلك تعبان هالأيام."
],
[
"B",
"I hope you don't mind me asking, but is everything okay at home?",
"أتمنى ما تمانع إني أسأل، بس كل شي تمام في البيت؟"
],
[
"A",
"It's complicated. I'd rather not talk about it now.",
"معقدة. ما أبي أتكلم عنها الحين."
],
[
"B",
"That's fine. You don't have to. Whatever you decide, I'm here for you.",
"عادي. مو لازم. أياً كان قرارك، أنا موجود لك."
]
]
],
[
"عرض فكرة على مستثمر",
"Pitching to an Investor",
"💡",
"في عرض فكرتك ابدأ بالمشكلة: Every year, millions of people struggle with... ثم الحل: Our app solves this by... واطلب بوضوح: We're looking for an investment of...",
[
[
"Every year, thousands of families struggle to find tutors.",
"كل سنة آلاف الأسر تعاني عشان تلقى مدرسين."
],
[
"Our app solves this by matching them in minutes.",
"تطبيقنا يحل هذا بربطهم خلال دقايق."
],
[
"We already have five thousand active users.",
"عندنا خمسة آلاف مستخدم نشط."
],
[
"We're looking for an investment of two million riyals.",
"ندور استثمار بمليونين ريال."
]
],
[
[
"A",
"So, what problem are you solving?",
"طيب، وش المشكلة اللي تحلونها؟"
],
[
"B",
"Every year, thousands of families struggle to find good tutors. Our app matches them in minutes.",
"كل سنة آلاف الأسر تعاني تلقى مدرسين. تطبيقنا يربطهم خلال دقايق."
],
[
"A",
"Do you have any traction?",
"عندكم انتشار فعلي؟"
],
[
"B",
"Yes, we already have five thousand active users, and we're looking for an investment of two million riyals.",
"إيه، عندنا خمسة آلاف مستخدم نشط، وندور استثمار بمليونين ريال."
]
]
],
[
"الرد على أسئلة صعبة بعد عرض",
"Handling Tough Questions",
"🔥",
"بعد العرض إذا جاك سؤال صعب: Thank you for raising that. وإذا ما تعرف: I don't have that figure with me, but I'll get back to you. وإذا السؤال خارج الموضوع: That's slightly beyond today's scope.",
[
[
"Thank you for raising that.",
"شكراً إنك طرحت هذا."
],
[
"I don't have that figure with me, but I'll get back to you.",
"ما عندي الرقم الحين، بس برجع لك فيه."
],
[
"That's slightly beyond the scope of today's talk.",
"هذا شوي خارج نطاق عرض اليوم."
],
[
"Does that answer your question?",
"هل هذا يجاوب سؤالك؟"
]
],
[
[
"A",
"What was the exact cost of the pilot project?",
"كم كانت التكلفة بالضبط للمشروع التجريبي؟"
],
[
"B",
"Thank you for raising that. I don't have that figure with me, but I'll get back to you today.",
"شكراً إنك طرحت هذا. ما عندي الرقم الحين، بس برجع لك فيه اليوم."
],
[
"A",
"And how will this affect other departments?",
"وكيف بيأثر على الأقسام الثانية؟"
],
[
"B",
"That's slightly beyond the scope of today's talk, but I'm happy to discuss it afterwards.",
"هذا شوي خارج نطاق العرض، بس يسعدني نناقشه بعدين."
]
]
],
[
"التهنئة الرسمية والخطب القصيرة",
"Giving a Short Speech",
"🥂",
"في كلمة قصيرة ابدأ: On behalf of the team, I'd like to... واذكر إنجاز: Over the past ten years, Ahmed has... واختم: Please join me in wishing him all the best.",
[
[
"On behalf of the team, I'd like to say a few words.",
"نيابة عن الفريق أحب أقول كلمتين."
],
[
"Over the past ten years, he has achieved so much.",
"خلال العشر سنين اللي فاتت حقق إنجازات كثيرة."
],
[
"We'll truly miss working with you.",
"بنفتقد الشغل معك فعلاً."
],
[
"Please join me in wishing him all the best.",
"شاركوني نتمنى له كل التوفيق."
]
],
[
[
"A",
"Could you say something at Ahmed's farewell?",
"ممكن تقول كلمة في توديع أحمد؟"
],
[
"B",
"Of course. On behalf of the team, I'd like to say a few words.",
"أكيد. نيابة عن الفريق أحب أقول كلمتين."
],
[
"A",
"Everyone's listening.",
"الكل يسمع."
],
[
"B",
"Over the past ten years, Ahmed has achieved so much. Please join me in wishing him all the best.",
"خلال العشر سنين حقق أحمد الكثير. شاركوني نتمنى له كل التوفيق."
]
]
],
[
"المجاملة في الحديث الراقي",
"Sophisticated Small Talk",
"🍽️",
"في العشاء الرسمي افتح مواضيع خفيفة: Have you been following the new art festival? واسأل بعمق: What drew you to this field? وأظهر الاهتمام: That must have been fascinating.",
[
[
"Have you been following the new art festival?",
"تتابع مهرجان الفنون الجديد؟"
],
[
"What drew you to this field?",
"وش اللي جذبك لهالمجال؟"
],
[
"That must have been fascinating.",
"أكيد كانت تجربة رائعة."
],
[
"I've never thought of it that way.",
"عمري ما فكرت فيها بهالطريقة."
]
],
[
[
"A",
"I worked as an archaeologist in AlUla for five years.",
"اشتغلت عالم آثار في العلا خمس سنين."
],
[
"B",
"That must have been fascinating. What drew you to this field?",
"أكيد كانت تجربة رائعة. وش اللي جذبك لهالمجال؟"
],
[
"A",
"I loved history as a child, and the desert hides so many stories.",
"كنت أحب التاريخ من صغري، والصحرا تخبي قصص كثيرة."
],
[
"B",
"I've never thought of it that way. The desert as a library!",
"عمري ما فكرت فيها كذا. الصحرا كأنها مكتبة!"
]
]
],
[
"مكالمة متابعة مع عميل",
"Following Up with a Client",
"📞",
"بعد إرسال عرض اتصل: I'm just following up on the proposal we sent. واسأل: Have you had a chance to look at it? وخل الضغط خفيف: No rush, I just wanted to check if you had any questions.",
[
[
"I'm just following up on the proposal we sent.",
"بس أتابع العرض اللي أرسلناه."
],
[
"Have you had a chance to look at it?",
"لحقت تطلع عليه؟"
],
[
"No rush. I just wanted to check if you had any questions.",
"ما فيه عجلة. بس حبيت أتأكد إذا عندك أسئلة."
],
[
"Would a short call next week be helpful?",
"تفيدك مكالمة قصيرة الأسبوع الجاي؟"
]
],
[
[
"A",
"Hello, this is Majed.",
"هلا، معك ماجد."
],
[
"B",
"Hi Majed, it's Sami. I'm just following up on the proposal we sent. Have you had a chance to look at it?",
"هلا ماجد، معك سامي. أتابع العرض اللي أرسلناه. لحقت تطلع عليه؟"
],
[
"A",
"Not fully yet. It's been a busy week.",
"مو كامل للحين. الأسبوع كان مزحوم."
],
[
"B",
"No rush. Would a short call next week be helpful?",
"ما فيه عجلة. تفيدك مكالمة قصيرة الأسبوع الجاي؟"
]
]
],
[
"الاعتذار الرسمي نيابة عن شركة",
"Apologising on Behalf of a Company",
"🏢",
"عشان تعتذر رسمياً: On behalf of the company, please accept our sincere apologies. واشرح: This was caused by... ووضح التعويض: As a gesture of goodwill, we'd like to offer...",
[
[
"On behalf of the company, please accept our sincere apologies.",
"نيابة عن الشركة، تقبل اعتذارنا الصادق."
],
[
"This was caused by a system error.",
"هذا صار بسبب خطأ في النظام."
],
[
"As a gesture of goodwill, we'd like to offer a full refund.",
"كبادرة حسن نية نبي نعرض استرداد كامل."
],
[
"We've taken steps to make sure it doesn't happen again.",
"اتخذنا خطوات عشان ما يتكرر."
]
],
[
[
"A",
"My booking disappeared and I lost my holiday!",
"حجزي اختفى وضاعت إجازتي!"
],
[
"B",
"On behalf of the company, please accept our sincere apologies. This was caused by a system error.",
"نيابة عن الشركة، تقبل اعتذارنا الصادق. صار بسبب خطأ في النظام."
],
[
"A",
"That doesn't give me my holiday back.",
"هذا ما يرجع لي إجازتي."
],
[
"B",
"I understand. As a gesture of goodwill, we'd like to offer a full refund and a free night.",
"أفهمك. كبادرة حسن نية نعرض استرداد كامل وليلة مجانية."
]
]
],
[
"المناقشة الأكاديمية",
"Taking Part in a Seminar",
"🎓",
"في حلقة النقاش الجامعية قل: Building on what Sara said... أو: I'd like to challenge that idea slightly. وادعم رأيك: The study we read suggests...",
[
[
"Building on what Sara said, I think...",
"بالبناء على كلام سارة، أعتقد..."
],
[
"I'd like to challenge that idea slightly.",
"أبي أعترض على هالفكرة شوي."
],
[
"The study we read suggests the opposite.",
"الدراسة اللي قريناها تقترح العكس."
],
[
"That depends on how we define success.",
"هذا يعتمد على كيف نعرّف النجاح."
]
],
[
[
"A",
"Clearly, social media makes teenagers less happy.",
"واضح إن السوشال ميديا تخلي المراهقين أقل سعادة."
],
[
"B",
"I'd like to challenge that idea slightly. The study we read suggests the effect is quite small.",
"أبي أعترض شوي. الدراسة اللي قريناها تقول التأثير بسيط."
],
[
"A",
"But many teenagers say they feel anxious.",
"بس مراهقين كثير يقولون يحسون بقلق."
],
[
"B",
"True. Building on that, it may depend on how much time they spend online.",
"صحيح. وبالبناء على هذا، يمكن يعتمد على كم يقضون أونلاين."
]
]
],
[
"التعامل مع الشائعات في العمل",
"Addressing Rumours",
"🗯️",
"إذا فيه شائعة في الشغل وضّح: I've heard some concerns, and I want to be transparent. وصحح: There are no plans to cut jobs. واطلب: If you hear anything, please come to me directly.",
[
[
"I've heard some concerns, and I want to be transparent.",
"سمعت بعض المخاوف وأبي أكون شفاف."
],
[
"There are currently no plans to cut jobs.",
"ما فيه حالياً أي خطط لتقليل الوظائف."
],
[
"If you hear anything, please come to me directly.",
"إذا سمعت شي تعال لي مباشرة."
],
[
"I'll update everyone as soon as I know more.",
"بحدّث الكل أول ما أعرف أكثر."
]
],
[
[
"A",
"People are saying the office will close.",
"الناس يقولون المكتب بيقفل."
],
[
"B",
"I've heard some concerns, and I want to be transparent. There are currently no plans to close it.",
"سمعت بعض المخاوف وأبي أكون شفاف. ما فيه حالياً أي خطط لقفله."
],
[
"A",
"So where did the rumour come from?",
"طيب من وين طلعت الشائعة؟"
],
[
"B",
"I'm not sure. If you hear anything, please come to me directly. I'll update everyone as soon as I know more.",
"مو متأكد. إذا سمعت شي تعال لي مباشرة. بحدث الكل أول ما أعرف."
]
]
],
[
"التحدث عن إنجاز بتواضع",
"Talking About Achievements Modestly",
"🏅",
"إذا أحد مدحك قل بتواضع: Thank you, but it was really a team effort. واذكر المساعدة: I couldn't have done it without... واعترف بالجهد: It took a lot of hard work.",
[
[
"Thank you, but it was really a team effort.",
"شكراً، بس كان جهد فريق."
],
[
"I couldn't have done it without my colleagues.",
"ما كنت بقدر بدون زملائي."
],
[
"It took a lot of hard work.",
"أخذ تعب كثير."
],
[
"I'm still learning.",
"لسا أتعلم."
]
],
[
[
"A",
"Congratulations on the award! You must be so proud.",
"مبروك الجائزة! أكيد فخور."
],
[
"B",
"Thank you, but it was really a team effort.",
"شكراً، بس كان جهد فريق."
],
[
"A",
"Still, you led the project.",
"ومع ذلك أنت قدت المشروع."
],
[
"B",
"True, it took a lot of hard work, but I couldn't have done it without my colleagues.",
"صحيح، أخذ تعب كثير، بس ما كنت بقدر بدون زملائي."
]
]
],
[
"طلب دعم مالي لمشروع خيري",
"Fundraising for a Cause",
"🤲",
"لما تجمع تبرعات قل: We're raising money for... ووضح الأثر: Every hundred riyals provides... وادعُ بلطف: Any contribution, however small, makes a difference.",
[
[
"We're raising money for a children's hospital.",
"نجمع تبرعات لمستشفى أطفال."
],
[
"Every hundred riyals provides a week of medicine.",
"كل مية ريال توفر دواء أسبوع."
],
[
"Any contribution, however small, makes a difference.",
"أي مساهمة مهما كانت صغيرة تفرق."
],
[
"You can donate online through our website.",
"تقدر تتبرع أونلاين من موقعنا."
]
],
[
[
"A",
"What's this event for?",
"هالفعالية لأي شي؟"
],
[
"B",
"We're raising money for a children's hospital. Every hundred riyals provides a week of medicine.",
"نجمع تبرعات لمستشفى أطفال. كل مية ريال توفر دواء أسبوع."
],
[
"A",
"I can't give much, I'm afraid.",
"للأسف ما أقدر أعطي كثير."
],
[
"B",
"Any contribution, however small, makes a difference. You can also donate online.",
"أي مساهمة مهما كانت صغيرة تفرق. وتقدر تتبرع أونلاين بعد."
]
]
],
[
"مناقشة عقد",
"Reviewing a Contract",
"📑",
"قبل توقيع عقد اسأل: Could you walk me through this clause? وإذا عندك تحفظ: I'm not comfortable with the penalty clause. واطلب: Could we amend this section?",
[
[
"Could you walk me through this clause?",
"ممكن تشرح لي هالبند؟"
],
[
"I'm not comfortable with the penalty clause.",
"مو مرتاح لبند الغرامة."
],
[
"Could we amend this section?",
"ممكن نعدّل هالقسم؟"
],
[
"I'd like my lawyer to review it first.",
"أبي محامي يراجعه أول."
]
],
[
[
"A",
"Here's the contract. Just sign at the bottom.",
"هذا العقد. بس وقّع تحت."
],
[
"B",
"Before I sign, could you walk me through clause seven?",
"قبل أوقع، ممكن تشرح لي البند السابع؟"
],
[
"A",
"It says you pay a penalty if you cancel early.",
"يقول تدفع غرامة إذا ألغيت بدري."
],
[
"B",
"I'm not comfortable with that. Could we amend this section? I'd also like my lawyer to review it.",
"مو مرتاح لهذا. ممكن نعدّل هالقسم؟ وأبي محامي يراجعه بعد."
]
]
],
[
"ترشيح شخص لوظيفة",
"Recommending Someone",
"👍",
"عشان ترشح أحد قل: I'd highly recommend Lama for the role. واذكر دليل: She consistently delivers excellent work. واختم: I'm confident she'd be a great asset.",
[
[
"I'd highly recommend Lama for the role.",
"أرشح لمى للوظيفة بقوة."
],
[
"She consistently delivers excellent work.",
"دايماً تقدم شغل ممتاز."
],
[
"She's great at handling difficult clients.",
"ممتازة في التعامل مع العملاء الصعبين."
],
[
"I'm confident she'd be a great asset.",
"واثق إنها بتكون إضافة قوية."
]
],
[
[
"A",
"We're hiring a team leader. Any suggestions?",
"نوظف قائد فريق. عندك اقتراح؟"
],
[
"B",
"I'd highly recommend Lama. She consistently delivers excellent work.",
"أرشح لمى بقوة. دايماً تقدم شغل ممتاز."
],
[
"A",
"Has she managed people before?",
"سبق أدارت ناس؟"
],
[
"B",
"She led a small team last year, and she's great with difficult clients. I'm confident she'd be a great asset.",
"قادت فريق صغير السنة اللي فاتت، وممتازة مع العملاء الصعبين. واثق إنها بتكون إضافة قوية."
]
]
],
[
"الحديث عن تجربة فشل",
"Discussing a Failure",
"🔁",
"لما تتكلم عن فشل بنضج قل: Looking back, I underestimated... ووضح الدرس: What I learned from it is... واختم: Now I always make sure to...",
[
[
"Looking back, I underestimated how long it would take.",
"بالنظر للماضي، استهنت بالوقت اللي بياخذه."
],
[
"What I learned from it is to plan for delays.",
"اللي تعلمته إني أخطط للتأخير."
],
[
"It was a tough lesson, but a valuable one.",
"كان درس قاسي بس قيّم."
],
[
"Now I always make sure to test early.",
"الحين دايماً أتأكد أجرب بدري."
]
],
[
[
"A",
"Have you ever had a project that failed?",
"عمرك كان عندك مشروع فشل؟"
],
[
"B",
"Yes. Looking back, I underestimated how long it would take.",
"إيه. بالنظر للماضي، استهنت بالوقت اللي بياخذه."
],
[
"A",
"What did you learn from it?",
"وش تعلمت منه؟"
],
[
"B",
"It was a tough lesson, but a valuable one. Now I always make sure to plan for delays.",
"كان درس قاسي بس قيّم. الحين دايماً أخطط للتأخير."
]
]
],
[
"التعبير عن الامتنان العميق",
"Expressing Deep Gratitude",
"💐",
"عشان تشكر أحد من قلب قل: I can't thank you enough. ووضح الأثر: Your support meant the world to me. واعرض الرد: If I can ever return the favour...",
[
[
"I can't thank you enough.",
"ما أقدر أوفيك حقك من الشكر."
],
[
"Your support meant the world to me.",
"دعمك كان يعني لي الكثير."
],
[
"I really don't know what I'd have done without you.",
"صدق ما أدري وش كنت بسوي بدونك."
],
[
"If I can ever return the favour, just say the word.",
"إذا أقدر أرد الجميل يوم، بس قل."
]
],
[
[
"A",
"I heard you got the scholarship!",
"سمعت إنك أخذت المنحة!"
],
[
"B",
"Yes! I can't thank you enough for your reference letter.",
"إيه! ما أقدر أوفيك حقك على خطاب التوصية."
],
[
"A",
"You deserved it. I just wrote the truth.",
"تستاهل. أنا بس كتبت الحقيقة."
],
[
"B",
"Your support meant the world to me. If I can ever return the favour, just say the word.",
"دعمك كان يعني لي الكثير. إذا أقدر أرد الجميل يوم، بس قل."
]
]
],
[
"طرح فكرة جديدة على الإدارة",
"Proposing a Change",
"🔧",
"عشان تقترح تغيير قل: I'd like to propose a small change to how we... ووضح الفائدة: This could save us around ten hours a week. واقترح تجربة: How about we pilot it for a month?",
[
[
"I'd like to propose a change to how we handle orders.",
"أبي أقترح تغيير في طريقة تعاملنا مع الطلبات."
],
[
"This could save us around ten hours a week.",
"ممكن يوفر علينا حوالي عشر ساعات بالأسبوع."
],
[
"How about we pilot it for a month?",
"وش رأيكم نجربه شهر؟"
],
[
"If it doesn't work, we can always go back.",
"إذا ما نفع نقدر نرجع."
]
],
[
[
"A",
"What did you want to discuss?",
"وش كنت تبي تناقش؟"
],
[
"B",
"I'd like to propose a change to how we handle orders. This could save us around ten hours a week.",
"أبي أقترح تغيير في طريقة الطلبات. ممكن يوفر علينا عشر ساعات بالأسبوع."
],
[
"A",
"Sounds good, but change is risky.",
"حلو، بس التغيير فيه مخاطرة."
],
[
"B",
"How about we pilot it for a month? If it doesn't work, we can always go back.",
"وش رأيك نجربه شهر؟ إذا ما نفع نقدر نرجع."
]
]
],
[
"المجادلة الودية بين أصدقاء",
"Friendly Debate",
"⚽",
"في نقاش ودي مع ربعك قل: Come on, you can't be serious! وبرأيك: Say what you like, but... وتنهي بلطف: Let's agree to disagree.",
[
[
"Come on, you can't be serious!",
"يا رجال، مستحيل تكون جاد!"
],
[
"Say what you like, but the numbers don't lie.",
"قل اللي تبي، بس الأرقام ما تكذب."
],
[
"Fair enough, you've got a point there.",
"معقول، عندك حق في هذي."
],
[
"Let's agree to disagree.",
"خلنا نتفق إننا مختلفين."
]
],
[
[
"A",
"Honestly, the old team was much better than this one.",
"بصراحة الفريق القديم كان أحسن بواجد من هذا."
],
[
"B",
"Come on, you can't be serious! We won the league this year.",
"يا رجال، مستحيل تكون جاد! فزنا بالدوري هالسنة."
],
[
"A",
"Fair enough, but the old team played better football.",
"معقول، بس الفريق القديم كان يلعب كورة أحلى."
],
[
"B",
"Say what you like, but the numbers don't lie. Let's agree to disagree.",
"قل اللي تبي، بس الأرقام ما تكذب. خلنا نتفق إننا مختلفين."
]
]
],
[
"التعامل مع موقف محرج",
"Recovering from an Awkward Moment",
"😅",
"إذا صار موقف محرج خففه: Well, that was embarrassing! واعتذر بخفة: Sorry, I got that completely wrong. وكمّل: Anyway, where were we?",
[
[
"Well, that was embarrassing!",
"ياخي هذا كان محرج!"
],
[
"Sorry, I got your name completely wrong.",
"آسف، غلطت في اسمك تماماً."
],
[
"I'm terrible with names.",
"أنا سيء جداً في الأسامي."
],
[
"Anyway, where were we?",
"المهم، وين وقفنا؟"
]
],
[
[
"A",
"Actually, my name is Hessa, not Hind.",
"ترى اسمي حصة مو هند."
],
[
"B",
"Oh, sorry! I got your name completely wrong. Well, that was embarrassing!",
"أوه آسفة! غلطت في اسمك تماماً. هذا كان محرج!"
],
[
"A",
"Don't worry, it happens all the time.",
"لا تشيلين هم، يصير دايم."
],
[
"B",
"I'm terrible with names. Anyway, where were we?",
"أنا سيئة في الأسامي. المهم، وين وقفنا؟"
]
]
],
[
"التحدث مع خبير",
"Consulting an Expert",
"🧑‍🔬",
"لما تستشير خبير قل: I'd value your opinion on something. واسأل بعمق: In your experience, what's the biggest risk? واطلب توصية: What would you do in my position?",
[
[
"I'd value your opinion on something.",
"يهمني رأيك في شي."
],
[
"In your experience, what's the biggest risk?",
"من خبرتك، وش أكبر مخاطرة؟"
],
[
"What would you do in my position?",
"لو كنت مكاني وش بتسوي؟"
],
[
"That's really helpful, thank you.",
"هذا مفيد جداً، شكراً."
]
],
[
[
"A",
"Of course. What's on your mind?",
"أكيد. وش في بالك؟"
],
[
"B",
"I'd value your opinion on opening a second café. In your experience, what's the biggest risk?",
"يهمني رأيك في فتح كوفي ثاني. من خبرتك، وش أكبر مخاطرة؟"
],
[
"A",
"Usually it's choosing the wrong location.",
"عادةً اختيار الموقع الغلط."
],
[
"B",
"That's really helpful. What would you do in my position?",
"مفيد جداً. لو كنت مكاني وش بتسوي؟"
]
]
],
[
"التخطيط المالي مع الشريك",
"Discussing Finances with a Partner",
"💑",
"لما تتكلم عن الفلوس مع شريكك قل: I think we need to talk about our budget. واقترح بهدوء: What if we set a monthly limit for eating out? وتفاهم: Let's look at it together.",
[
[
"I think we need to talk about our budget.",
"أعتقد لازم نتكلم عن ميزانيتنا."
],
[
"We're spending more than we're saving.",
"قاعدين نصرف أكثر مما ندخر."
],
[
"What if we set a monthly limit for eating out?",
"وش رأيك نحط حد شهري للأكل برا؟"
],
[
"Let's look at it together this weekend.",
"خلنا نشوفها سوا هالويكند."
]
],
[
[
"A",
"You look worried. What's up?",
"شكلك قلقان. وش فيك؟"
],
[
"B",
"I think we need to talk about our budget. We're spending more than we're saving.",
"أعتقد لازم نتكلم عن ميزانيتنا. نصرف أكثر مما ندخر."
],
[
"A",
"Really? Where's it all going?",
"صدق؟ وين تروح كلها؟"
],
[
"B",
"Mostly restaurants. What if we set a monthly limit? Let's look at it together this weekend.",
"أغلبها مطاعم. وش رأيك نحط حد شهري؟ خلنا نشوفها سوا هالويكند."
]
]
],
[
"التعليق على أداء موظف ضعيف",
"Addressing Poor Performance",
"📋",
"لما تتكلم مع موظف أداؤه ضعيف كن محدد: I've noticed that deadlines have been missed recently. واسأل: Is there anything affecting your work? واتفق على خطة: Let's agree on clear goals for the next month.",
[
[
"I've noticed that deadlines have been missed recently.",
"لاحظت إن فيه مواعيد فاتت مؤخراً."
],
[
"Is there anything affecting your work?",
"فيه شي يأثر على شغلك؟"
],
[
"I want to support you, but things need to improve.",
"أبي أدعمك، بس الأمور لازم تتحسن."
],
[
"Let's agree on clear goals for the next month.",
"خلنا نتفق على أهداف واضحة للشهر الجاي."
]
],
[
[
"A",
"You asked to see me?",
"طلبت تشوفني؟"
],
[
"B",
"Yes. I've noticed that some deadlines have been missed recently. Is there anything affecting your work?",
"إيه. لاحظت إن فيه مواعيد فاتت مؤخراً. فيه شي يأثر على شغلك؟"
],
[
"A",
"I've been struggling with the new system.",
"أعاني مع النظام الجديد."
],
[
"B",
"Thanks for telling me. I want to support you. Let's arrange training and agree on clear goals for next month.",
"شكراً إنك قلت. أبي أدعمك. خلنا نرتب تدريب ونتفق على أهداف واضحة للشهر الجاي."
]
]
],
[
"ختام مفاوضات",
"Closing a Deal",
"✍️",
"عشان تقفل اتفاق قل: I think we've found a solution that works for both of us. ولخص: Just to confirm, we've agreed on... واختم: I'll send the final contract by tomorrow.",
[
[
"I think we've found a solution that works for both of us.",
"أعتقد لقينا حل يناسب الطرفين."
],
[
"Just to confirm, we've agreed on a two-year contract.",
"بس للتأكيد، اتفقنا على عقد سنتين."
],
[
"I'll send the final contract by tomorrow.",
"برسل العقد النهائي قبل بكرة."
],
[
"It's been a pleasure doing business with you.",
"سعدنا بالتعامل معكم."
]
],
[
[
"A",
"So, ten percent discount if we sign for two years?",
"يعني خصم عشرة بالمية إذا وقعنا سنتين؟"
],
[
"B",
"Exactly. I think we've found a solution that works for both of us.",
"بالضبط. أعتقد لقينا حل يناسب الطرفين."
],
[
"A",
"Agreed. What's the next step?",
"اتفقنا. وش الخطوة الجاية؟"
],
[
"B",
"Just to confirm: two years, ten percent off. I'll send the final contract by tomorrow. It's been a pleasure.",
"بس للتأكيد: سنتين وخصم عشرة بالمية. برسل العقد النهائي قبل بكرة. سعدنا فيكم."
]
]
]
];
export const DAILY_LESSONS: SaraDailyLesson[] = [...RAW, ...RAW2, ...RAW3, ...RAW4].map(([titleAr, titleEn, icon, introAr, ph, dl], i) => ({
  id: `daily-${'abcd'[Math.floor(i / 30)]}-${String((i % 30) + 1).padStart(2, '0')}`, order: i + 1, levelId: 'abcd'[Math.floor(i / 30)] as 'a' | 'b' | 'c' | 'd', titleAr, titleEn, icon, introAr,
  phrases: ph.map(([en, ar]) => ({ en, ar })), dialogue: dl.map(([sp, en, ar]) => ({ sp, en, ar }))
}));
export const DAILY_TRACK_ID = 'daily';
