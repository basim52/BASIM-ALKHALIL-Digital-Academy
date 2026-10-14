/** Vocabulary — Level 1: 30 topics × 10 everyday words (hand-written), easiest topics first. */
export interface SaraVocabWord { en: string; ar: string; emoji: string; example: string }
export interface SaraVocabLesson { id: string; order: number; titleAr: string; titleEn: string; icon: string; words: SaraVocabWord[] }
type R = [string, string, string, [string, string, string, string][]];
const RAW: R[] = [
[
"التحيات والتعارف",
"Greetings",
"👋",
[
[
"hello",
"مرحبا",
"👋",
"Hello, my name is Ali."
],
[
"goodbye",
"مع السلامة",
"🙋",
"Goodbye, see you tomorrow."
],
[
"please",
"من فضلك",
"🙏",
"Can I have water, please?"
],
[
"thank you",
"شكرًا",
"💐",
"Thank you for your help."
],
[
"sorry",
"آسف",
"😔",
"Sorry, I am late."
],
[
"name",
"اسم",
"🏷️",
"What is your name?"
],
[
"friend",
"صديق",
"🤝",
"Sara is my friend."
],
[
"welcome",
"أهلًا وسهلًا",
"🚪",
"Welcome to our home."
],
[
"morning",
"صباح",
"🌅",
"Good morning, teacher."
],
[
"night",
"ليل",
"🌙",
"Good night, Mom."
]
]
],
[
"العائلة",
"Family",
"👨‍👩‍👧",
[
[
"father",
"أب",
"👨",
"My father is a doctor."
],
[
"mother",
"أم",
"👩",
"My mother cooks dinner."
],
[
"brother",
"أخ",
"👦",
"My brother is ten years old."
],
[
"sister",
"أخت",
"👧",
"My sister likes reading."
],
[
"son",
"ابن",
"👶",
"Their son goes to school."
],
[
"daughter",
"ابنة",
"👧",
"Her daughter is very smart."
],
[
"grandfather",
"جد",
"👴",
"My grandfather tells stories."
],
[
"grandmother",
"جدة",
"👵",
"My grandmother makes tea."
],
[
"uncle",
"عم أو خال",
"🧔",
"My uncle lives in Jeddah."
],
[
"family",
"عائلة",
"👨‍👩‍👧",
"I love my family."
]
]
],
[
"الأرقام والوقت",
"Numbers & Time",
"⏰",
[
[
"one",
"واحد",
"1️⃣",
"I have one brother."
],
[
"two",
"اثنان",
"2️⃣",
"She has two cats."
],
[
"ten",
"عشرة",
"🔟",
"I wake up at ten."
],
[
"hundred",
"مئة",
"💯",
"The book costs a hundred riyals."
],
[
"hour",
"ساعة (مدة)",
"⌛",
"The class is one hour."
],
[
"minute",
"دقيقة",
"⏱️",
"Wait a minute, please."
],
[
"day",
"يوم",
"📆",
"Today is a good day."
],
[
"week",
"أسبوع",
"🗓️",
"I go to the gym every week."
],
[
"month",
"شهر",
"📅",
"Ramadan is a holy month."
],
[
"year",
"سنة",
"🎆",
"I am twelve years old."
]
]
],
[
"أيام الأسبوع",
"Days of the Week",
"📅",
[
[
"Sunday",
"الأحد",
"1️⃣",
"School starts on Sunday."
],
[
"Monday",
"الاثنين",
"2️⃣",
"I have football on Monday."
],
[
"Tuesday",
"الثلاثاء",
"3️⃣",
"We have a test on Tuesday."
],
[
"Wednesday",
"الأربعاء",
"4️⃣",
"Wednesday is the middle of the week."
],
[
"Thursday",
"الخميس",
"5️⃣",
"The wedding is on Thursday night."
],
[
"Friday",
"الجمعة",
"🕌",
"We go to the mosque on Friday."
],
[
"Saturday",
"السبت",
"🛋️",
"I rest on Saturday."
],
[
"weekend",
"نهاية الأسبوع",
"🎈",
"What do you do at the weekend?"
],
[
"today",
"اليوم",
"📍",
"Today is Monday."
],
[
"tomorrow",
"بكرة",
"➡️",
"See you tomorrow."
]
]
],
[
"الألوان",
"Colours",
"🎨",
[
[
"red",
"أحمر",
"🟥",
"The apple is red."
],
[
"blue",
"أزرق",
"🟦",
"The sky is blue."
],
[
"green",
"أخضر",
"🟩",
"The grass is green."
],
[
"yellow",
"أصفر",
"🟨",
"The sun is yellow."
],
[
"black",
"أسود",
"⬛",
"My cat is black."
],
[
"white",
"أبيض",
"⬜",
"Milk is white."
],
[
"orange",
"برتقالي",
"🟧",
"I have an orange bag."
],
[
"brown",
"بني",
"🟫",
"The table is brown."
],
[
"pink",
"وردي",
"🌸",
"She likes pink flowers."
],
[
"grey",
"رمادي",
"🐘",
"The elephant is grey."
]
]
],
[
"الأكل",
"Food",
"🍽️",
[
[
"bread",
"خبز",
"🍞",
"I eat bread for breakfast."
],
[
"rice",
"رز",
"🍚",
"We eat rice with chicken."
],
[
"chicken",
"دجاج",
"🍗",
"The chicken is hot."
],
[
"fish",
"سمك",
"🐟",
"I like grilled fish."
],
[
"egg",
"بيضة",
"🥚",
"I want two eggs."
],
[
"cheese",
"جبن",
"🧀",
"This cheese is delicious."
],
[
"apple",
"تفاحة",
"🍎",
"An apple a day is good."
],
[
"banana",
"موزة",
"🍌",
"The monkey eats a banana."
],
[
"dates",
"تمر",
"🌴",
"We eat dates with coffee."
],
[
"soup",
"شوربة",
"🍲",
"The soup is very hot."
]
]
],
[
"المشروبات",
"Drinks",
"🥤",
[
[
"water",
"ماء",
"💧",
"Drink water every day."
],
[
"milk",
"حليب",
"🥛",
"Children need milk."
],
[
"juice",
"عصير",
"🧃",
"I want orange juice."
],
[
"tea",
"شاي",
"🍵",
"My grandmother drinks tea."
],
[
"coffee",
"قهوة",
"☕",
"Arabic coffee is famous."
],
[
"cup",
"كوب",
"🥤",
"Can I have a cup of tea?"
],
[
"glass",
"كأس",
"🥃",
"Give me a glass of water."
],
[
"bottle",
"قارورة",
"🍼",
"The bottle is empty."
],
[
"hot",
"حار",
"🔥",
"The coffee is hot."
],
[
"cold",
"بارد",
"🧊",
"I want cold water."
]
]
],
[
"البيت",
"Home",
"🏠",
[
[
"house",
"بيت",
"🏠",
"Our house is big."
],
[
"room",
"غرفة",
"🛏️",
"My room is clean."
],
[
"kitchen",
"مطبخ",
"🍳",
"Mom is in the kitchen."
],
[
"door",
"باب",
"🚪",
"Please close the door."
],
[
"window",
"نافذة",
"🪟",
"Open the window, please."
],
[
"bed",
"سرير",
"🛌",
"I go to bed at ten."
],
[
"chair",
"كرسي",
"🪑",
"Sit on the chair."
],
[
"table",
"طاولة",
"🍽️",
"The food is on the table."
],
[
"bathroom",
"حمّام",
"🛁",
"The bathroom is upstairs."
],
[
"key",
"مفتاح",
"🔑",
"I lost my key."
]
]
],
[
"المدرسة",
"School",
"🏫",
[
[
"school",
"مدرسة",
"🏫",
"I walk to school."
],
[
"teacher",
"معلم",
"👩‍🏫",
"Our teacher is kind."
],
[
"student",
"طالب",
"🧑‍🎓",
"He is a good student."
],
[
"book",
"كتاب",
"📕",
"Open your book, please."
],
[
"pen",
"قلم حبر",
"🖊️",
"Can I borrow your pen?"
],
[
"pencil",
"قلم رصاص",
"✏️",
"Write with a pencil."
],
[
"bag",
"حقيبة",
"🎒",
"My bag is heavy."
],
[
"class",
"صف",
"🧑‍🏫",
"The class starts at seven."
],
[
"homework",
"واجب",
"📝",
"I finished my homework."
],
[
"exam",
"اختبار",
"📋",
"The exam is tomorrow."
]
]
],
[
"الجسم",
"Body",
"🧍",
[
[
"head",
"رأس",
"🗣️",
"My head hurts."
],
[
"eye",
"عين",
"👁️",
"She has brown eyes."
],
[
"ear",
"أذن",
"👂",
"I hear with my ears."
],
[
"nose",
"أنف",
"👃",
"My nose is cold."
],
[
"mouth",
"فم",
"👄",
"Open your mouth."
],
[
"hand",
"يد",
"✋",
"Wash your hands."
],
[
"foot",
"قدم",
"🦶",
"My foot hurts."
],
[
"leg",
"رجل",
"🦵",
"He broke his leg."
],
[
"tooth",
"سن",
"🦷",
"Brush your teeth twice a day."
],
[
"hair",
"شعر",
"💇",
"Her hair is long."
]
]
],
[
"الملابس",
"Clothes",
"👕",
[
[
"shirt",
"قميص",
"👕",
"I wear a white shirt."
],
[
"trousers",
"بنطلون",
"👖",
"These trousers are new."
],
[
"dress",
"فستان",
"👗",
"She has a beautiful dress."
],
[
"shoes",
"حذاء",
"👟",
"My shoes are black."
],
[
"hat",
"قبعة",
"🧢",
"Wear a hat in the sun."
],
[
"jacket",
"جاكيت",
"🧥",
"Take your jacket, it is cold."
],
[
"socks",
"جوارب",
"🧦",
"I need clean socks."
],
[
"scarf",
"وشاح",
"🧣",
"My scarf is warm."
],
[
"glasses",
"نظارة",
"👓",
"I wear glasses to read."
],
[
"watch",
"ساعة يد",
"⌚",
"My watch is new."
]
]
],
[
"الطقس",
"Weather",
"🌤️",
[
[
"sun",
"شمس",
"☀️",
"The sun is hot today."
],
[
"rain",
"مطر",
"🌧️",
"I love the rain."
],
[
"wind",
"رياح",
"🌬️",
"The wind is strong."
],
[
"cloud",
"غيمة",
"☁️",
"There is a big cloud."
],
[
"storm",
"عاصفة",
"⛈️",
"A storm is coming."
],
[
"sand",
"رمل",
"🏜️",
"There is sand in my shoes."
],
[
"warm",
"دافئ",
"🌡️",
"The weather is warm."
],
[
"snow",
"ثلج",
"❄️",
"Snow is white and cold."
],
[
"weather",
"طقس",
"🌦️",
"How is the weather today?"
],
[
"season",
"فصل (من السنة)",
"🍂",
"Winter is my favourite season."
]
]
],
[
"الحيوانات",
"Animals",
"🐾",
[
[
"cat",
"قطة",
"🐱",
"The cat is sleeping."
],
[
"dog",
"كلب",
"🐶",
"The dog runs fast."
],
[
"camel",
"جمل",
"🐪",
"The camel lives in the desert."
],
[
"horse",
"حصان",
"🐴",
"Arabian horses are beautiful."
],
[
"bird",
"طائر",
"🐦",
"The bird is singing."
],
[
"lion",
"أسد",
"🦁",
"The lion is strong."
],
[
"sheep",
"خروف",
"🐑",
"The sheep eats grass."
],
[
"cow",
"بقرة",
"🐄",
"We get milk from cows."
],
[
"falcon",
"صقر",
"🦅",
"The falcon flies high."
],
[
"goat",
"ماعز",
"🐐",
"The goat eats leaves."
]
]
],
[
"المدينة",
"The City",
"🏙️",
[
[
"street",
"شارع",
"🛣️",
"Our street is quiet."
],
[
"mosque",
"مسجد",
"🕌",
"The mosque is near my house."
],
[
"hospital",
"مستشفى",
"🏥",
"He works at the hospital."
],
[
"park",
"حديقة عامة",
"🌳",
"Let's go to the park."
],
[
"mall",
"مول",
"🛍️",
"We shop at the mall."
],
[
"bank",
"بنك",
"🏦",
"The bank opens at nine."
],
[
"restaurant",
"مطعم",
"🍴",
"This restaurant is new."
],
[
"pharmacy",
"صيدلية",
"💊",
"The pharmacy is open."
],
[
"market",
"سوق",
"🧺",
"I buy fruit at the market."
],
[
"bridge",
"جسر",
"🌉",
"The bridge is very long."
]
]
],
[
"المواصلات",
"Transport",
"🚗",
[
[
"car",
"سيارة",
"🚗",
"My father has a new car."
],
[
"bus",
"حافلة",
"🚌",
"I take the bus to school."
],
[
"train",
"قطار",
"🚆",
"The train is fast."
],
[
"plane",
"طائرة",
"✈️",
"The plane lands at five."
],
[
"taxi",
"تاكسي",
"🚕",
"Let's take a taxi."
],
[
"bike",
"دراجة",
"🚲",
"I ride my bike."
],
[
"ship",
"سفينة",
"🚢",
"The ship is in the sea."
],
[
"ticket",
"تذكرة",
"🎫",
"I need a ticket."
],
[
"airport",
"مطار",
"🛫",
"We are at the airport."
],
[
"road",
"طريق",
"🛤️",
"The road is busy."
]
]
],
[
"الأفعال اليومية",
"Daily Actions",
"🔄",
[
[
"wake up",
"يصحى",
"⏰",
"I wake up at six."
],
[
"eat",
"يأكل",
"🍴",
"We eat lunch at two."
],
[
"drink",
"يشرب",
"🥤",
"Drink some water."
],
[
"sleep",
"ينام",
"😴",
"The baby sleeps a lot."
],
[
"read",
"يقرأ",
"📖",
"I read every night."
],
[
"write",
"يكتب",
"✍️",
"Write your name here."
],
[
"walk",
"يمشي",
"🚶",
"I walk in the park."
],
[
"run",
"يركض",
"🏃",
"He runs every morning."
],
[
"wash",
"يغسل",
"🧼",
"Wash your hands before eating."
],
[
"pray",
"يصلي",
"🤲",
"We pray five times a day."
]
]
],
[
"المشاعر",
"Feelings",
"😊",
[
[
"happy",
"سعيد",
"😊",
"I am happy today."
],
[
"sad",
"حزين",
"😢",
"Why are you sad?"
],
[
"angry",
"غاضب",
"😠",
"He is angry with me."
],
[
"tired",
"تعبان",
"😩",
"I am tired after work."
],
[
"hungry",
"جوعان",
"🍽️",
"I am hungry. Let's eat."
],
[
"thirsty",
"عطشان",
"🥵",
"I am thirsty. Give me water."
],
[
"scared",
"خائف",
"😨",
"The child is scared of the dark."
],
[
"excited",
"متحمس",
"🤩",
"I am excited about the trip."
],
[
"bored",
"ملول",
"🥱",
"I am bored at home."
],
[
"proud",
"فخور",
"🏅",
"My father is proud of me."
]
]
],
[
"الصفات",
"Describing Things",
"📏",
[
[
"big",
"كبير",
"🐘",
"The elephant is big."
],
[
"small",
"صغير",
"🐜",
"The ant is small."
],
[
"long",
"طويل",
"📏",
"The road is long."
],
[
"short",
"قصير",
"✂️",
"My hair is short."
],
[
"new",
"جديد",
"✨",
"I have a new phone."
],
[
"old",
"قديم",
"🏚️",
"This house is old."
],
[
"fast",
"سريع",
"⚡",
"The car is fast."
],
[
"slow",
"بطيء",
"🐢",
"The turtle is slow."
],
[
"easy",
"سهل",
"👌",
"The test was easy."
],
[
"difficult",
"صعب",
"🧗",
"Math is difficult for me."
]
]
],
[
"الوظائف",
"Jobs",
"💼",
[
[
"doctor",
"طبيب",
"👨‍⚕️",
"The doctor is very kind."
],
[
"nurse",
"ممرض",
"👩‍⚕️",
"The nurse helps the doctor."
],
[
"engineer",
"مهندس",
"👷",
"My uncle is an engineer."
],
[
"pilot",
"طيار",
"👨‍✈️",
"The pilot flies the plane."
],
[
"police officer",
"شرطي",
"👮",
"The police officer helps people."
],
[
"chef",
"طباخ",
"👨‍🍳",
"The chef cooks great food."
],
[
"farmer",
"مزارع",
"👨‍🌾",
"The farmer grows dates."
],
[
"driver",
"سائق",
"🚖",
"The driver is waiting."
],
[
"dentist",
"طبيب أسنان",
"🦷",
"I visit the dentist twice a year."
],
[
"job",
"وظيفة",
"💼",
"I like my job."
]
]
],
[
"التسوق",
"Shopping",
"🛒",
[
[
"buy",
"يشتري",
"🛒",
"I want to buy shoes."
],
[
"sell",
"يبيع",
"🏷️",
"They sell fresh fruit."
],
[
"price",
"سعر",
"💲",
"What is the price?"
],
[
"money",
"فلوس",
"💵",
"I don't have money."
],
[
"cheap",
"رخيص",
"🪙",
"This shirt is cheap."
],
[
"expensive",
"غالي",
"💎",
"The watch is expensive."
],
[
"pay",
"يدفع",
"💳",
"Can I pay by card?"
],
[
"size",
"مقاس",
"📐",
"What size are you?"
],
[
"receipt",
"فاتورة",
"🧾",
"Here is your receipt."
],
[
"customer",
"زبون",
"🧍",
"The customer is happy."
]
]
],
[
"الرياضة",
"Sports",
"⚽",
[
[
"football",
"كرة قدم",
"⚽",
"We play football on Friday."
],
[
"swim",
"يسبح",
"🏊",
"I can swim."
],
[
"team",
"فريق",
"👥",
"Our team won."
],
[
"player",
"لاعب",
"🏃",
"He is a great player."
],
[
"ball",
"كرة",
"🏐",
"Throw the ball."
],
[
"goal",
"هدف",
"🥅",
"What a goal!"
],
[
"win",
"يفوز",
"🏆",
"I hope we win."
],
[
"lose",
"يخسر",
"😞",
"We didn't lose the game."
],
[
"match",
"مباراة",
"🏟️",
"The match starts at nine."
],
[
"coach",
"مدرب",
"📣",
"The coach is proud of us."
]
]
],
[
"الصحة",
"Health",
"🩺",
[
[
"sick",
"مريض",
"🤒",
"I am sick today."
],
[
"medicine",
"دواء",
"💊",
"Take this medicine."
],
[
"fever",
"حرارة (حمى)",
"🌡️",
"She has a fever."
],
[
"headache",
"صداع",
"🤕",
"I have a headache."
],
[
"cough",
"كحة",
"😷",
"He has a bad cough."
],
[
"pain",
"ألم",
"💢",
"I have pain in my back."
],
[
"rest",
"يرتاح",
"🛋️",
"You need to rest."
],
[
"healthy",
"صحي",
"🥗",
"Eat healthy food."
],
[
"appointment",
"موعد",
"📅",
"I have an appointment at four."
],
[
"better",
"أحسن",
"👍",
"I feel better now."
]
]
],
[
"التقنية",
"Technology",
"💻",
[
[
"phone",
"جوال",
"📱",
"My phone is new."
],
[
"computer",
"كمبيوتر",
"💻",
"I use the computer for work."
],
[
"internet",
"إنترنت",
"🌐",
"The internet is slow."
],
[
"message",
"رسالة",
"💬",
"I sent you a message."
],
[
"charger",
"شاحن",
"🔌",
"Where is my charger?"
],
[
"password",
"كلمة السر",
"🔒",
"Don't share your password."
],
[
"screen",
"شاشة",
"🖥️",
"The screen is broken."
],
[
"download",
"ينزّل (تحميل)",
"⬇️",
"Download the app."
],
[
"camera",
"كاميرا",
"📷",
"The camera takes good photos."
],
[
"battery",
"بطارية",
"🔋",
"My battery is low."
]
]
],
[
"السفر",
"Travel",
"🧳",
[
[
"trip",
"رحلة",
"🗺️",
"We had a great trip."
],
[
"passport",
"جواز سفر",
"🛂",
"Show me your passport."
],
[
"hotel",
"فندق",
"🏨",
"The hotel is near the beach."
],
[
"suitcase",
"شنطة سفر",
"🧳",
"My suitcase is heavy."
],
[
"map",
"خريطة",
"🗺️",
"Look at the map."
],
[
"beach",
"شاطئ",
"🏖️",
"Let's go to the beach."
],
[
"visit",
"يزور",
"🏛️",
"I want to visit Makkah."
],
[
"country",
"دولة",
"🏳️",
"Which country are you from?"
],
[
"flight",
"رحلة طيران",
"🛫",
"My flight is at midnight."
],
[
"holiday",
"إجازة",
"🌴",
"Summer holiday is long."
]
]
],
[
"الطبيعة",
"Nature",
"🌿",
[
[
"tree",
"شجرة",
"🌳",
"The palm tree is tall."
],
[
"flower",
"زهرة",
"🌼",
"This flower smells nice."
],
[
"sea",
"بحر",
"🌊",
"The Red Sea is beautiful."
],
[
"mountain",
"جبل",
"⛰️",
"We climbed the mountain."
],
[
"desert",
"صحراء",
"🏜️",
"The desert is hot."
],
[
"river",
"نهر",
"🏞️",
"The river is long."
],
[
"sky",
"سماء",
"🌌",
"The sky is clear tonight."
],
[
"star",
"نجمة",
"⭐",
"I can see a star."
],
[
"moon",
"قمر",
"🌙",
"The moon is full."
],
[
"island",
"جزيرة",
"🏝️",
"They live on an island."
]
]
],
[
"المناسبات",
"Occasions",
"🎉",
[
[
"Eid",
"العيد",
"🌙",
"Eid Mubarak!"
],
[
"Ramadan",
"رمضان",
"🏮",
"We fast in Ramadan."
],
[
"gift",
"هدية",
"🎁",
"Thank you for the gift."
],
[
"party",
"حفلة",
"🎉",
"Come to my party."
],
[
"wedding",
"عرس",
"💍",
"The wedding is on Thursday."
],
[
"birthday",
"عيد ميلاد",
"🎂",
"Happy birthday!"
],
[
"guest",
"ضيف",
"🧕",
"We have guests tonight."
],
[
"invite",
"يعزم",
"💌",
"I invite you to dinner."
],
[
"celebrate",
"يحتفل",
"🥳",
"We celebrate National Day."
],
[
"lantern",
"فانوس",
"🏮",
"We hang a lantern in Ramadan."
]
]
],
[
"الأماكن والاتجاهات",
"Directions",
"🧭",
[
[
"left",
"يسار",
"⬅️",
"Turn left here."
],
[
"right",
"يمين",
"➡️",
"The bank is on the right."
],
[
"straight",
"على طول",
"⬆️",
"Go straight."
],
[
"near",
"قريب",
"📍",
"The shop is near."
],
[
"far",
"بعيد",
"🔭",
"The airport is far."
],
[
"behind",
"خلف",
"🔙",
"The car is behind the house."
],
[
"next to",
"جنب",
"↔️",
"Sit next to me."
],
[
"between",
"بين",
"🔀",
"The park is between the school and the mosque."
],
[
"corner",
"زاوية",
"📐",
"The shop is on the corner."
],
[
"opposite",
"مقابل",
"🔁",
"The bank is opposite the mall."
]
]
],
[
"الهوايات",
"Hobbies",
"🎯",
[
[
"draw",
"يرسم",
"🎨",
"I like to draw."
],
[
"cook",
"يطبخ",
"🧑‍🍳",
"My brother can cook."
],
[
"game",
"لعبة",
"🎮",
"This game is fun."
],
[
"music",
"موسيقى",
"🎵",
"She listens to music."
],
[
"photo",
"صورة",
"🖼️",
"Take a photo of us."
],
[
"story",
"قصة",
"📚",
"Tell me a story."
],
[
"garden",
"حديقة بيت",
"🪴",
"My mother loves her garden."
],
[
"fishing",
"صيد سمك",
"🎣",
"We go fishing on the weekend."
],
[
"camping",
"تخييم",
"⛺",
"Camping in the desert is fun."
],
[
"hobby",
"هواية",
"🎯",
"What is your hobby?"
]
]
],
[
"المطبخ",
"Kitchen",
"🍳",
[
[
"plate",
"صحن",
"🍽️",
"Put the food on the plate."
],
[
"spoon",
"ملعقة",
"🥄",
"I need a spoon."
],
[
"fork",
"شوكة",
"🍴",
"Eat with a fork."
],
[
"knife",
"سكين",
"🔪",
"Be careful with the knife."
],
[
"oven",
"فرن",
"♨️",
"The bread is in the oven."
],
[
"fridge",
"ثلاجة",
"🧊",
"The milk is in the fridge."
],
[
"pot",
"قدر",
"🍲",
"The soup is in the pot."
],
[
"salt",
"ملح",
"🧂",
"Add some salt."
],
[
"sugar",
"سكر",
"🍬",
"No sugar, please."
],
[
"recipe",
"وصفة",
"📜",
"This recipe is easy."
]
]
],
[
"العمل والمكتب",
"Work & Office",
"🏢",
[
[
"office",
"مكتب",
"🏢",
"I work in an office."
],
[
"meeting",
"اجتماع",
"👥",
"The meeting is at ten."
],
[
"manager",
"مدير",
"🧑‍💼",
"My manager is busy."
],
[
"email",
"إيميل",
"📧",
"Send me an email."
],
[
"report",
"تقرير",
"📊",
"I finished the report."
],
[
"salary",
"راتب",
"💰",
"The salary comes every month."
],
[
"colleague",
"زميل",
"🤝",
"My colleague helps me."
],
[
"busy",
"مشغول",
"⏳",
"I am busy today."
],
[
"deadline",
"موعد نهائي",
"⏰",
"The deadline is Sunday."
],
[
"break",
"استراحة",
"☕",
"Let's take a break."
]
]
]
];
export const VOCAB_LESSONS: SaraVocabLesson[] = RAW.map(([titleAr, titleEn, icon, ws], i) => ({
  id: `vocab-a-${String(i + 1).padStart(2, '0')}`, order: i + 1, titleAr, titleEn, icon,
  words: ws.map(([en, ar, emoji, example]) => ({ en, ar, emoji, example }))
}));
export const VOCAB_TRACK_ID = 'vocabulary';
