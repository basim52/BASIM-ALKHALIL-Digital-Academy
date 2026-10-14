/** Everyday English — Level 1: 30 real-life scenarios (hand-written). Sara plays the staff/other person (A); the student is B. */
export interface SaraDailyLine { sp: 'A' | 'B'; en: string; ar: string }
export interface SaraDailyLesson { id: string; order: number; titleAr: string; titleEn: string; icon: string; introAr: string; phrases: { en: string; ar: string }[]; dialogue: SaraDailyLine[] }
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
export const DAILY_LESSONS: SaraDailyLesson[] = RAW.map(([titleAr, titleEn, icon, introAr, ph, dl], i) => ({
  id: `daily-a-${String(i + 1).padStart(2, '0')}`, order: i + 1, titleAr, titleEn, icon, introAr,
  phrases: ph.map(([en, ar]) => ({ en, ar })), dialogue: dl.map(([sp, en, ar]) => ({ sp, en, ar }))
}));
export const DAILY_TRACK_ID = 'daily';
