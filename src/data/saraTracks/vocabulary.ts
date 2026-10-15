/** Vocabulary — Level 1: 30 topics × 10 everyday words (hand-written), easiest topics first. */
export interface SaraVocabWord { en: string; ar: string; emoji: string; example: string }
export interface SaraVocabLesson { id: string; order: number; levelId: 'a' | 'b' | 'c' | 'd'; titleAr: string; titleEn: string; icon: string; words: SaraVocabWord[] }
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
/** Level 2 (harder, B1): 30 more topics, no word repeated from level 1. */
const RAW2: R[] = [
[
"الشخصية",
"Personality",
"🧠",
[
[
"generous",
"كريم",
"🎁",
"My grandfather is very generous with his time."
],
[
"honest",
"صادق",
"🤞",
"An honest friend tells you the truth."
],
[
"lazy",
"كسول",
"🛋️",
"Don't be lazy; finish your homework."
],
[
"patient",
"صبور",
"⏳",
"A good teacher is patient with students."
],
[
"shy",
"خجول",
"🙈",
"She is shy when she meets new people."
],
[
"confident",
"واثق",
"💪",
"He felt confident before the exam."
],
[
"polite",
"مؤدب",
"🙇",
"It's polite to say thank you."
],
[
"selfish",
"أناني",
"🙅",
"Sharing is better than being selfish."
],
[
"brave",
"شجاع",
"🦁",
"The brave firefighter saved the child."
],
[
"reliable",
"يعتمد عليه",
"🧱",
"I need a reliable person for this job."
]
]
],
[
"البيئة",
"The Environment",
"🌍",
[
[
"pollution",
"تلوث",
"🏭",
"Air pollution is bad for our health."
],
[
"recycle",
"يعيد التدوير",
"♻️",
"We recycle plastic and paper at home."
],
[
"waste",
"نفايات / هدر",
"🗑️",
"Don't waste water."
],
[
"energy",
"طاقة",
"⚡",
"Solar energy is clean."
],
[
"climate",
"مناخ",
"🌡️",
"The climate is getting hotter."
],
[
"plastic",
"بلاستيك",
"🧴",
"Plastic bags harm sea animals."
],
[
"protect",
"يحمي",
"🛡️",
"We must protect the forests."
],
[
"nature",
"طبيعة",
"🍃",
"I love spending time in nature."
],
[
"solar",
"شمسي",
"🔆",
"They installed solar panels on the roof."
],
[
"environment",
"بيئة",
"🌱",
"Planting trees helps the environment."
]
]
],
[
"الجامعة",
"University",
"🎓",
[
[
"degree",
"شهادة جامعية",
"📜",
"She has a degree in medicine."
],
[
"lecture",
"محاضرة",
"🧑‍🏫",
"The lecture starts at nine."
],
[
"graduate",
"يتخرج",
"🎓",
"He will graduate next year."
],
[
"scholarship",
"منحة دراسية",
"🏅",
"She got a scholarship to study abroad."
],
[
"subject",
"مادة دراسية",
"📚",
"My favourite subject is chemistry."
],
[
"semester",
"فصل دراسي",
"🗓️",
"This semester has five courses."
],
[
"research",
"بحث",
"🔬",
"They are doing research on cancer."
],
[
"library",
"مكتبة",
"🏛️",
"I study in the library every evening."
],
[
"assignment",
"تكليف / واجب",
"📝",
"The assignment is due on Sunday."
],
[
"professor",
"أستاذ جامعي",
"👨‍🏫",
"Our professor explains things clearly."
]
]
],
[
"المال",
"Money & Finance",
"💰",
[
[
"save",
"يوفّر",
"🐷",
"I save some money every month."
],
[
"spend",
"يصرف",
"💸",
"How much do you spend on food?"
],
[
"borrow",
"يستلف",
"🤲",
"Can I borrow fifty riyals?"
],
[
"lend",
"يسلّف",
"🫴",
"I can lend you my car tomorrow."
],
[
"budget",
"ميزانية",
"📒",
"We have a small budget for the trip."
],
[
"loan",
"قرض",
"🏦",
"He took a loan to buy a house."
],
[
"afford",
"يقدر على تكلفة",
"🧮",
"I can't afford a new car now."
],
[
"invest",
"يستثمر",
"📈",
"She invests in local companies."
],
[
"profit",
"ربح",
"💹",
"The shop made a good profit this year."
],
[
"debt",
"دَين",
"⛓️",
"He paid all his debt."
]
]
],
[
"الإعلام والأخبار",
"Media & News",
"📰",
[
[
"news",
"أخبار",
"📰",
"Did you hear the news?"
],
[
"article",
"مقال",
"🗞️",
"I read an interesting article today."
],
[
"journalist",
"صحفي",
"🎙️",
"The journalist asked the minister a question."
],
[
"headline",
"عنوان رئيسي",
"🔠",
"The headline was about the match."
],
[
"channel",
"قناة",
"📺",
"Which channel is the match on?"
],
[
"advertisement",
"إعلان",
"📢",
"There are too many advertisements on TV."
],
[
"interview",
"مقابلة",
"🎤",
"I watched an interview with the coach."
],
[
"podcast",
"بودكاست",
"🎧",
"I listen to a podcast on my way to work."
],
[
"audience",
"جمهور",
"👥",
"The audience loved the show."
],
[
"broadcast",
"يبث",
"📡",
"The match will be broadcast live."
]
]
],
[
"القانون",
"Crime & Law",
"⚖️",
[
[
"law",
"قانون",
"⚖️",
"Everyone must respect the law."
],
[
"thief",
"حرامي",
"🦹",
"The police caught the thief."
],
[
"steal",
"يسرق",
"👜",
"Someone stole my phone."
],
[
"judge",
"قاضي",
"👨‍⚖️",
"The judge listened to both sides."
],
[
"court",
"محكمة",
"🏛️",
"The case is in court next week."
],
[
"witness",
"شاهد",
"👀",
"Was there a witness to the accident?"
],
[
"fine",
"غرامة",
"🧾",
"I got a fine for speeding."
],
[
"arrest",
"يقبض على",
"🚓",
"The police arrested two men."
],
[
"prison",
"سجن",
"🔒",
"He spent two years in prison."
],
[
"lawyer",
"محامي",
"💼",
"You should talk to a lawyer."
]
]
],
[
"اللياقة",
"Fitness",
"🏃",
[
[
"exercise",
"يتمرن / تمرين",
"🤸",
"I exercise three times a week."
],
[
"muscle",
"عضلة",
"💪",
"Swimming builds strong muscles."
],
[
"diet",
"نظام غذائي",
"🥗",
"She is on a healthy diet."
],
[
"weight",
"وزن",
"⚖️",
"He lost five kilos of weight."
],
[
"stretch",
"يتمدد / تمارين إطالة",
"🧘",
"Stretch before you run."
],
[
"calorie",
"سعرة حرارية",
"🔥",
"This drink has a lot of calories."
],
[
"fit",
"لائق بدنيًا",
"🏋️",
"Walking keeps you fit."
],
[
"sweat",
"يعرق",
"💦",
"I sweat a lot in the summer."
],
[
"heart rate",
"نبض القلب",
"❤️",
"Check your heart rate after running."
],
[
"injury",
"إصابة",
"🩹",
"He has a knee injury."
]
]
],
[
"أفعال الطبخ",
"Cooking Verbs",
"🔪",
[
[
"boil",
"يغلي",
"♨️",
"Boil the water first."
],
[
"fry",
"يقلي",
"🍳",
"Fry the onions until golden."
],
[
"bake",
"يخبز في الفرن",
"🥧",
"My mother bakes bread on Fridays."
],
[
"grill",
"يشوي",
"🔥",
"We grill meat in the garden."
],
[
"chop",
"يقطّع",
"🔪",
"Chop the tomatoes into small pieces."
],
[
"stir",
"يحرّك",
"🥄",
"Stir the soup slowly."
],
[
"mix",
"يخلط",
"🥣",
"Mix the flour with the eggs."
],
[
"peel",
"يقشّر",
"🥔",
"Peel the potatoes."
],
[
"pour",
"يصب",
"🫗",
"Pour the milk into the cup."
],
[
"taste",
"يتذوق",
"👅",
"Taste it and add more salt."
]
]
],
[
"السكن",
"Housing",
"🏘️",
[
[
"rent",
"إيجار / يستأجر",
"🔑",
"The rent is three thousand a month."
],
[
"landlord",
"صاحب العقار",
"🧔",
"The landlord fixed the door."
],
[
"neighbour",
"جار",
"🏡",
"Our neighbour is very friendly."
],
[
"apartment",
"شقة",
"🏢",
"They live in a small apartment."
],
[
"furniture",
"أثاث",
"🛋️",
"We bought new furniture."
],
[
"roof",
"سطح",
"🏠",
"The cat is on the roof."
],
[
"floor",
"أرضية / طابق",
"🪜",
"My office is on the third floor."
],
[
"garage",
"كراج",
"🚗",
"The car is in the garage."
],
[
"repair",
"يصلّح",
"🛠️",
"They will repair the air conditioner."
],
[
"move",
"ينتقل",
"📦",
"We will move to a new house next month."
]
]
],
[
"العلاقات",
"Relationships",
"💞",
[
[
"relative",
"قريب (من العائلة)",
"👪",
"All my relatives came to the wedding."
],
[
"married",
"متزوج",
"💍",
"My brother got married last year."
],
[
"engaged",
"مخطوب",
"💌",
"She is engaged to her cousin."
],
[
"divorce",
"طلاق",
"💔",
"Divorce is hard for children."
],
[
"trust",
"يثق / ثقة",
"🤝",
"I trust my best friend."
],
[
"argue",
"يتجادل",
"🗯️",
"They argue about small things."
],
[
"support",
"يدعم",
"🫂",
"My family always supports me."
],
[
"respect",
"يحترم",
"🙏",
"We respect our elders."
],
[
"apologise",
"يعتذر",
"😔",
"He apologised for being late."
],
[
"forgive",
"يسامح",
"🕊️",
"Please forgive me."
]
]
],
[
"مهارات العمل",
"Work Skills",
"🧩",
[
[
"skill",
"مهارة",
"🛠️",
"Communication is an important skill."
],
[
"experience",
"خبرة",
"📈",
"Do you have any experience?"
],
[
"responsible",
"مسؤول",
"🧑‍💼",
"She is responsible for the team."
],
[
"organise",
"ينظّم",
"🗂️",
"He organised the meeting."
],
[
"solve",
"يحل",
"🧩",
"We need to solve this problem."
],
[
"improve",
"يحسّن",
"⬆️",
"I want to improve my English."
],
[
"achieve",
"يحقق",
"🏆",
"She achieved her goals."
],
[
"efficient",
"كفؤ / فعّال",
"⚙️",
"The new system is more efficient."
],
[
"creative",
"مبدع",
"🎨",
"We need a creative idea."
],
[
"promotion",
"ترقية",
"🎖️",
"He got a promotion last month."
]
]
],
[
"العلوم",
"Science",
"🔬",
[
[
"experiment",
"تجربة علمية",
"🧪",
"We did an experiment in class."
],
[
"scientist",
"عالم",
"👩‍🔬",
"The scientist discovered a new medicine."
],
[
"planet",
"كوكب",
"🪐",
"Mars is a red planet."
],
[
"gravity",
"جاذبية",
"🍎",
"Gravity pulls things down."
],
[
"oxygen",
"أكسجين",
"🫧",
"We need oxygen to breathe."
],
[
"discover",
"يكتشف",
"🔍",
"Who discovered penicillin?"
],
[
"theory",
"نظرية",
"📐",
"Einstein's theory changed physics."
],
[
"laboratory",
"مختبر",
"🧫",
"She works in a laboratory."
],
[
"measure",
"يقيس",
"📏",
"Measure the length of the table."
],
[
"result",
"نتيجة",
"📊",
"The results were surprising."
]
]
],
[
"الحكومة والمجتمع",
"Government & Society",
"🏛️",
[
[
"government",
"حكومة",
"🏛️",
"The government built new schools."
],
[
"citizen",
"مواطن",
"🧑",
"Every citizen has rights."
],
[
"vote",
"يصوّت",
"🗳️",
"Students voted for the class leader."
],
[
"minister",
"وزير",
"🎩",
"The minister opened the new hospital."
],
[
"population",
"عدد السكان",
"👥",
"The population of Riyadh is growing."
],
[
"tax",
"ضريبة",
"🧾",
"There is a tax on this product."
],
[
"rights",
"حقوق",
"📜",
"Children have the right to education."
],
[
"volunteer",
"متطوع",
"🙋",
"She volunteers at the hospital."
],
[
"community",
"مجتمع",
"🏘️",
"Our community helps poor families."
],
[
"charity",
"جمعية خيرية / صدقة",
"💝",
"He gives money to charity."
]
]
],
[
"الفنون",
"Arts",
"🎭",
[
[
"painting",
"لوحة",
"🖼️",
"This painting is very old."
],
[
"artist",
"فنان",
"🧑‍🎨",
"The artist painted the desert."
],
[
"museum",
"متحف",
"🏛️",
"We visited the national museum."
],
[
"poem",
"قصيدة",
"📜",
"He wrote a poem about his mother."
],
[
"novel",
"رواية",
"📖",
"I am reading a long novel."
],
[
"exhibition",
"معرض",
"🖌️",
"There's an art exhibition this week."
],
[
"theatre",
"مسرح",
"🎭",
"We watched a play at the theatre."
],
[
"design",
"تصميم",
"📐",
"I like the design of this building."
],
[
"calligraphy",
"خط عربي / فن الخط",
"✒️",
"Arabic calligraphy is beautiful."
],
[
"photography",
"تصوير",
"📸",
"Photography is my hobby."
]
]
],
[
"التسوق الإلكتروني",
"Online Shopping",
"🛍️",
[
[
"order",
"يطلب / طلب",
"📦",
"I ordered a new phone online."
],
[
"delivery",
"توصيل",
"🚚",
"Delivery takes two days."
],
[
"cart",
"سلة المشتريات",
"🛒",
"Add it to your cart."
],
[
"discount code",
"كود خصم",
"🏷️",
"Use this discount code to save money."
],
[
"review",
"تقييم / مراجعة",
"⭐",
"Read the reviews before you buy."
],
[
"refund",
"استرداد المبلغ",
"💳",
"I asked for a refund."
],
[
"out of stock",
"نفد من المخزون",
"🚫",
"This size is out of stock."
],
[
"track",
"يتتبع",
"📍",
"You can track your order."
],
[
"account",
"حساب",
"👤",
"Log in to your account."
],
[
"checkout",
"إتمام الشراء",
"✅",
"Go to checkout and pay."
]
]
],
[
"الطب والجسم",
"Medicine",
"🩺",
[
[
"symptom",
"عَرَض",
"🤒",
"What are your symptoms?"
],
[
"allergy",
"حساسية",
"🤧",
"I have an allergy to nuts."
],
[
"injection",
"إبرة",
"💉",
"The nurse gave me an injection."
],
[
"surgery",
"عملية جراحية",
"🏥",
"He needs surgery on his knee."
],
[
"blood",
"دم",
"🩸",
"They took a blood test."
],
[
"bone",
"عظمة",
"🦴",
"She broke a bone in her arm."
],
[
"prescription",
"وصفة طبية",
"📋",
"The doctor wrote a prescription."
],
[
"recover",
"يتعافى",
"🌤️",
"I hope you recover soon."
],
[
"pulse",
"نبض",
"💓",
"The nurse checked my pulse."
],
[
"infection",
"عدوى / التهاب",
"🦠",
"He has an ear infection."
]
]
],
[
"عبارات الوقت",
"Time Expressions",
"🕰️",
[
[
"recently",
"مؤخرًا",
"🆕",
"I recently started a new job."
],
[
"already",
"بالفعل / سابقًا",
"✔️",
"I have already eaten."
],
[
"yet",
"بعد (في النفي والسؤال)",
"⏳",
"Have you finished yet?"
],
[
"lately",
"في الآونة الأخيرة",
"📆",
"I've been very busy lately."
],
[
"nowadays",
"هالأيام",
"📱",
"Nowadays everyone has a phone."
],
[
"eventually",
"في النهاية",
"🏁",
"He eventually found his keys."
],
[
"immediately",
"فورًا",
"⚡",
"Call me immediately."
],
[
"meanwhile",
"في هذه الأثناء",
"🔀",
"Meanwhile, Sara was cooking."
],
[
"afterwards",
"بعدين",
"➡️",
"We had dinner and afterwards we walked."
],
[
"occasionally",
"أحيانًا",
"🌗",
"I occasionally eat fast food."
]
]
],
[
"صفات الرأي",
"Opinion Adjectives",
"💬",
[
[
"amazing",
"مدهش",
"🤩",
"The view was amazing."
],
[
"awful",
"سيء جدًا",
"🤢",
"The food was awful."
],
[
"boring",
"ممل",
"😴",
"The film was boring."
],
[
"interesting",
"مثير للاهتمام",
"🤔",
"That's an interesting idea."
],
[
"useful",
"مفيد",
"🧰",
"This app is very useful."
],
[
"useless",
"بلا فائدة",
"🗑️",
"This old charger is useless."
],
[
"delicious",
"لذيذ",
"😋",
"The kabsa was delicious."
],
[
"terrible",
"فظيع",
"😖",
"The traffic was terrible today."
],
[
"fantastic",
"رائع",
"🌟",
"You did a fantastic job."
],
[
"ordinary",
"عادي",
"😐",
"It was an ordinary day."
]
]
],
[
"أفعال مركبة شائعة",
"Common Phrasal Verbs",
"🔗",
[
[
"give up",
"يستسلم / يترك",
"🏳️",
"Don't give up!"
],
[
"look for",
"يدوّر على",
"🔎",
"I'm looking for my keys."
],
[
"find out",
"يكتشف / يعرف",
"💡",
"I found out the truth."
],
[
"turn on",
"يشغّل",
"🔛",
"Turn on the lights, please."
],
[
"turn off",
"يطفّي",
"📴",
"Turn off your phone in class."
],
[
"pick up",
"يلتقط / يجيب أحد",
"🚗",
"I'll pick you up at seven."
],
[
"put on",
"يلبس",
"🧥",
"Put on your jacket."
],
[
"take off",
"يخلع / تقلع الطائرة",
"🛫",
"The plane takes off at noon."
],
[
"look after",
"يعتني بـ",
"🍼",
"She looks after her little brother."
],
[
"get up",
"يقوم من النوم",
"🛏️",
"I get up at six every day."
]
]
],
[
"التواصل",
"Communication",
"🗣️",
[
[
"explain",
"يشرح",
"🧑‍🏫",
"Can you explain this word?"
],
[
"discuss",
"يناقش",
"💬",
"Let's discuss the plan."
],
[
"mention",
"يذكر",
"☝️",
"He didn't mention the price."
],
[
"suggest",
"يقترح",
"💡",
"I suggest we leave early."
],
[
"complain",
"يشتكي",
"😤",
"She complained about the noise."
],
[
"agree",
"يوافق",
"👍",
"I agree with you."
],
[
"disagree",
"يختلف في الرأي",
"👎",
"I disagree with this idea."
],
[
"reply",
"يرد",
"↩️",
"Please reply to my email."
],
[
"whisper",
"يهمس",
"🤫",
"He whispered the answer."
],
[
"shout",
"يصرخ",
"📣",
"Don't shout, the baby is sleeping."
]
]
],
[
"المشاكل والحلول",
"Problems & Solutions",
"🧯",
[
[
"problem",
"مشكلة",
"❗",
"We have a small problem."
],
[
"solution",
"حل",
"✅",
"I found a solution."
],
[
"mistake",
"غلطة",
"❌",
"Everyone makes mistakes."
],
[
"reason",
"سبب",
"❓",
"What is the reason for the delay?"
],
[
"choice",
"اختيار",
"🔀",
"You have two choices."
],
[
"decide",
"يقرر",
"🤔",
"I can't decide which one to buy."
],
[
"avoid",
"يتجنب",
"🚧",
"Avoid driving at rush hour."
],
[
"prevent",
"يمنع / يقي",
"🛡️",
"Washing hands prevents illness."
],
[
"fix",
"يصلح",
"🔧",
"Can you fix my bike?"
],
[
"risk",
"مخاطرة",
"⚠️",
"It's a big risk."
]
]
],
[
"الخطط والمستقبل",
"Plans & the Future",
"🔮",
[
[
"plan",
"خطة / يخطط",
"🗺️",
"What are your plans for the summer?"
],
[
"ambition",
"طموح",
"🌠",
"Her ambition is to become a pilot."
],
[
"hope",
"يأمل",
"🙏",
"I hope to visit Japan one day."
],
[
"intend",
"ينوي",
"🧭",
"I intend to study abroad."
],
[
"prepare",
"يستعد / يجهز",
"🎒",
"We are preparing for the exam."
],
[
"expect",
"يتوقع",
"🔭",
"I expect the results next week."
],
[
"dream",
"حلم",
"💭",
"It's my dream to travel the world."
],
[
"future",
"مستقبل",
"🚀",
"The future is bright."
],
[
"career",
"مسيرة مهنية",
"👔",
"She has a great career in banking."
],
[
"succeed",
"ينجح",
"🥇",
"If you work hard, you will succeed."
]
]
],
[
"المواصلات المتقدمة",
"Getting Around",
"🚦",
[
[
"traffic",
"زحمة / حركة المرور",
"🚦",
"The traffic is heavy in the morning."
],
[
"crossroads",
"تقاطع",
"✖️",
"Turn right at the crossroads."
],
[
"parking",
"موقف سيارات",
"🅿️",
"Is there parking near the mall?"
],
[
"passenger",
"راكب",
"🧳",
"The passenger lost his bag."
],
[
"journey",
"رحلة / مشوار",
"🛣️",
"The journey takes four hours."
],
[
"delay",
"تأخير",
"⏰",
"There is a delay on the train."
],
[
"platform",
"رصيف المحطة",
"🚉",
"The train leaves from platform two."
],
[
"seatbelt",
"حزام الأمان",
"🦺",
"Always wear your seatbelt."
],
[
"speed",
"سرعة",
"🏎️",
"Slow down! You're over the speed limit."
],
[
"license",
"رخصة",
"🪪",
"I got my driving license last year."
]
]
],
[
"المناخ والكوارث",
"Weather & Disasters",
"🌪️",
[
[
"flood",
"فيضان / سيل",
"🌊",
"The flood closed the roads."
],
[
"earthquake",
"زلزال",
"🌋",
"The earthquake damaged many buildings."
],
[
"dust storm",
"عاصفة غبار",
"🌫️",
"Stay inside during a dust storm."
],
[
"temperature",
"درجة الحرارة",
"🌡️",
"The temperature is forty-five degrees."
],
[
"humid",
"رطب",
"💧",
"Jeddah is very humid in summer."
],
[
"forecast",
"توقعات الطقس",
"📺",
"The forecast says rain tomorrow."
],
[
"lightning",
"برق",
"⚡",
"Lightning lit up the sky."
],
[
"thunder",
"رعد",
"🌩️",
"The thunder was very loud."
],
[
"drought",
"جفاف",
"🏜️",
"The drought killed the crops."
],
[
"fog",
"ضباب",
"🌁",
"Drive slowly in the fog."
]
]
],
[
"الرياضات المتقدمة",
"More Sports",
"🏆",
[
[
"championship",
"بطولة",
"🏆",
"They won the championship."
],
[
"referee",
"حكم",
"🧑‍⚖️",
"The referee gave a red card."
],
[
"score",
"يسجل / نتيجة",
"🔢",
"What's the score?"
],
[
"fan",
"مشجع",
"📣",
"The fans were singing."
],
[
"stadium",
"ملعب",
"🏟️",
"The stadium was full."
],
[
"athlete",
"رياضي",
"🏃",
"He is a professional athlete."
],
[
"compete",
"ينافس",
"🤺",
"Ten countries compete in the race."
],
[
"medal",
"ميدالية",
"🥇",
"She won a gold medal."
],
[
"tournament",
"دورة رياضية",
"🎾",
"The tournament starts in May."
],
[
"opponent",
"خصم",
"🆚",
"Our opponent was very strong."
]
]
],
[
"الأماكن العامة",
"Public Places",
"🏛️",
[
[
"embassy",
"سفارة",
"🏳️",
"I need to visit the embassy."
],
[
"post office",
"مكتب البريد",
"📮",
"The post office closes at four."
],
[
"police station",
"مركز الشرطة",
"🚔",
"Report it at the police station."
],
[
"fire station",
"مركز الإطفاء",
"🚒",
"The fire station is near the school."
],
[
"gas station",
"محطة بنزين",
"⛽",
"Stop at the next gas station."
],
[
"clinic",
"عيادة",
"🏥",
"The clinic opens at eight."
],
[
"stadium entrance",
"بوابة الملعب",
"🚪",
"Meet me at the stadium entrance."
],
[
"town hall",
"البلدية",
"🏛️",
"You can get the permit at the town hall."
],
[
"university campus",
"الحرم الجامعي",
"🏫",
"The university campus is huge."
],
[
"playground",
"ملعب أطفال",
"🛝",
"The children are at the playground."
]
]
],
[
"المشاعر المتقدمة",
"More Feelings",
"🎭",
[
[
"anxious",
"قلقان",
"😟",
"I feel anxious before exams."
],
[
"relieved",
"مرتاح (بعد قلق)",
"😮‍💨",
"I was relieved when he called."
],
[
"disappointed",
"خايب ظنه",
"😞",
"She was disappointed with her score."
],
[
"grateful",
"ممتن",
"🙏",
"I am grateful for your help."
],
[
"jealous",
"غيران",
"😒",
"He is jealous of his brother's car."
],
[
"embarrassed",
"محرج",
"😳",
"I was embarrassed when I fell."
],
[
"curious",
"فضولي",
"🧐",
"Children are curious about everything."
],
[
"lonely",
"وحيد",
"🥀",
"He feels lonely in the new city."
],
[
"confused",
"ملخبط / محتار",
"😵",
"I'm confused about the rules."
],
[
"satisfied",
"راضٍ",
"😌",
"Are you satisfied with the service?"
]
]
],
[
"الإنترنت والأمان",
"Internet & Safety",
"🔐",
[
[
"website",
"موقع إلكتروني",
"🌐",
"Visit our website for more information."
],
[
"online",
"على الإنترنت",
"📶",
"I study online."
],
[
"upload",
"يرفع (ملف)",
"⬆️",
"Upload your photo here."
],
[
"link",
"رابط",
"🔗",
"Send me the link."
],
[
"privacy",
"خصوصية",
"🕶️",
"Protect your privacy online."
],
[
"hacker",
"مخترق",
"🕵️",
"A hacker stole their data."
],
[
"update",
"تحديث / يحدّث",
"🔄",
"Update the app to the new version."
],
[
"search",
"يبحث",
"🔍",
"Search for it on Google."
],
[
"delete",
"يحذف",
"🗑️",
"Delete the old messages."
],
[
"log in",
"يسجل دخول",
"🔓",
"Log in with your email."
]
]
],
[
"المظهر",
"Appearance",
"🪞",
[
[
"tall",
"طويل القامة",
"🦒",
"My brother is very tall."
],
[
"slim",
"نحيف",
"🧍",
"She is slim and fit."
],
[
"curly",
"مجعّد",
"➰",
"He has curly hair."
],
[
"beard",
"لحية",
"🧔",
"My father has a grey beard."
],
[
"handsome",
"وسيم",
"😎",
"The groom looks handsome."
],
[
"pretty",
"جميلة",
"🌺",
"What a pretty dress!"
],
[
"wrinkle",
"تجعيدة",
"👵",
"My grandmother has wrinkles on her face."
],
[
"bald",
"أصلع",
"👨‍🦲",
"My uncle is bald."
],
[
"smile",
"ابتسامة / يبتسم",
"😁",
"She has a lovely smile."
],
[
"look like",
"يشبه",
"👯",
"You look like your mother."
]
]
],
[
"المستندات الرسمية",
"Official Documents",
"🗂️",
[
[
"form",
"استمارة",
"📄",
"Fill in this form, please."
],
[
"signature",
"توقيع",
"✍️",
"Put your signature here."
],
[
"contract",
"عقد",
"📑",
"Read the contract before you sign."
],
[
"certificate",
"شهادة",
"🏅",
"I received my certificate today."
],
[
"permit",
"تصريح",
"🪪",
"You need a permit to work here."
],
[
"copy",
"نسخة",
"📠",
"Bring a copy of your ID."
],
[
"apply",
"يقدّم طلب",
"📨",
"I applied for a new passport."
],
[
"expire",
"تنتهي صلاحيته",
"⌛",
"My visa expires next month."
],
[
"renew",
"يجدد",
"🔄",
"I need to renew my license."
],
[
"appointment letter",
"خطاب تعيين",
"✉️",
"The company sent me an appointment letter."
]
]
]
];
/** Level 3 (B2→C1): 30 more topics, hand-written, no repeats of levels 1–2. */
const RAW3: R[] = [
[
"النقاش والرأي",
"Debate and Opinion",
"🗣️",
[
[
"contend",
"يؤكد / يرى بقوة",
"🗣️",
"Critics contend that the plan is too expensive."
],
[
"claim",
"يدّعي / ادعاء",
"📢",
"The company claims its product is the best."
],
[
"evidence",
"دليل",
"🔎",
"There is no evidence to support that idea."
],
[
"convince",
"يقنع",
"🤝",
"She convinced me to join the club."
],
[
"point of view",
"وجهة نظر",
"👁️",
"I understand your point of view."
],
[
"agree with",
"يتفق مع",
"👍",
"I completely agree with you."
],
[
"dispute",
"يعترض على / نزاع",
"⚔️",
"Nobody disputes the importance of education."
],
[
"reasonable",
"معقول",
"⚖️",
"That sounds like a reasonable solution."
],
[
"controversial",
"مثير للجدل",
"🔥",
"It is a controversial topic in the media."
],
[
"on the other hand",
"من ناحية أخرى",
"🔄",
"It is cheap; on the other hand, it is slow."
]
]
],
[
"سوق العمل",
"The Job Market",
"💼",
[
[
"unemployment",
"بطالة",
"📉",
"Unemployment fell last year."
],
[
"applicant",
"متقدم لوظيفة",
"🧑‍💼",
"There were fifty applicants for the job."
],
[
"qualification",
"مؤهل",
"📜",
"What qualifications do you need for this role?"
],
[
"redundancy",
"تسريح من العمل",
"📤",
"The factory announced fifty redundancies."
],
[
"resign",
"يستقيل",
"🚪",
"She decided to resign and start her own business."
],
[
"workforce",
"القوى العاملة",
"👷",
"Women are a growing part of the workforce."
],
[
"internship",
"تدريب عملي",
"🧑‍🎓",
"I did a summer internship at a bank."
],
[
"probation period",
"فترة التجربة",
"⏳",
"New staff have a three-month probation period."
],
[
"negotiate",
"يتفاوض",
"🤝",
"You should negotiate your salary."
],
[
"freelance",
"عمل حر",
"💻",
"He works freelance as a designer."
]
]
],
[
"الصحة النفسية",
"Mental Health",
"🧘",
[
[
"anxiety",
"قلق",
"😟",
"Exams can cause anxiety for many students."
],
[
"stress",
"ضغط نفسي",
"😣",
"Exercise helps reduce stress."
],
[
"cope with",
"يتعامل مع / يتحمل",
"🛟",
"She learned to cope with pressure at work."
],
[
"overwhelmed",
"مُثقَل / مغمور",
"🌊",
"I feel overwhelmed by all this work."
],
[
"well-being",
"الرفاهية والعافية",
"🌿",
"Sleep is important for your well-being."
],
[
"therapy",
"علاج نفسي",
"🛋️",
"Therapy helped him a lot."
],
[
"burnout",
"إنهاك وظيفي",
"🔋",
"Working without breaks can lead to burnout."
],
[
"resilient",
"صامد / مرن",
"🌱",
"Children are often more resilient than we think."
],
[
"isolation",
"عزلة",
"🏝️",
"Isolation is bad for mental health."
],
[
"stigma",
"وصمة",
"🏷️",
"We must remove the stigma around mental illness."
]
]
],
[
"الاقتصاد",
"The Economy",
"📊",
[
[
"inflation",
"تضخم",
"🎈",
"Inflation makes everyday things more expensive."
],
[
"growth",
"نمو",
"📈",
"The country saw strong economic growth."
],
[
"investment",
"استثمار",
"💰",
"Foreign investment created new jobs."
],
[
"fiscal",
"مالي (حكومي)",
"🧾",
"The fiscal year starts in January."
],
[
"deficit",
"عجز",
"➖",
"The budget deficit grew this year."
],
[
"income",
"دخل",
"💵",
"Their monthly income is quite low."
],
[
"recession",
"ركود اقتصادي",
"🌧️",
"Many businesses closed during the recession."
],
[
"export",
"يصدّر / صادرات",
"🚢",
"Saudi Arabia exports oil to many countries."
],
[
"import",
"يستورد / واردات",
"📦",
"We import most of our electronics."
],
[
"consumer",
"مستهلك",
"🛍️",
"Consumers are spending less this year."
]
]
],
[
"العلوم والأبحاث",
"Science and Research",
"🔬",
[
[
"hypothesis",
"فرضية",
"💡",
"The scientists tested their hypothesis."
],
[
"peer review",
"مراجعة الأقران",
"👥",
"The study passed peer review before publication."
],
[
"discovery",
"اكتشاف",
"🧭",
"It was an important medical discovery."
],
[
"data",
"بيانات",
"📊",
"The data shows a clear pattern."
],
[
"analyse",
"يحلل",
"🧮",
"We need to analyse the results carefully."
],
[
"conclusion",
"استنتاج",
"✅",
"What conclusion did you reach?"
],
[
"variable",
"متغيّر",
"🔀",
"Temperature is the main variable in this study."
],
[
"sample",
"عيّنة",
"🧪",
"They took a blood sample."
],
[
"accurate",
"دقيق",
"🎯",
"The measurements must be accurate."
],
[
"breakthrough",
"إنجاز كبير / اختراق",
"🚀",
"This is a breakthrough in cancer research."
]
]
],
[
"الإعلام والأخبار",
"Media and News",
"📰",
[
[
"press release",
"بيان صحفي",
"📃",
"The ministry issued a press release this morning."
],
[
"correspondent",
"مراسل",
"🎙️",
"Our correspondent in Cairo sent this report."
],
[
"misinformation",
"معلومات مضللة",
"🌫️",
"Misinformation spreads faster than corrections."
],
[
"source",
"مصدر",
"🔗",
"Always check the source of the news."
],
[
"fake news",
"أخبار كاذبة",
"🚫",
"Fake news spreads quickly online."
],
[
"bias",
"تحيّز",
"↔️",
"This report shows a clear bias."
],
[
"coverage",
"تغطية إعلامية",
"🎥",
"The coverage of the event was excellent."
],
[
"editor",
"محرر",
"✏️",
"The editor changed the title of my article."
],
[
"publish",
"ينشر",
"🖨️",
"The magazine will publish her story next week."
],
[
"circulation",
"عدد النسخ الموزّعة",
"🔁",
"The newspaper's circulation has fallen."
]
]
],
[
"القانون والعدالة",
"Law and Justice",
"⚖️",
[
[
"legislation",
"تشريعات",
"📜",
"New legislation protects online shoppers."
],
[
"verdict",
"حكم قضائي",
"🔨",
"The jury reached a verdict after two days."
],
[
"defendant",
"المدّعى عليه",
"🧍",
"The defendant denied all the charges."
],
[
"prosecute",
"يقاضي / يلاحق قضائياً",
"📂",
"Shoplifters will be prosecuted."
],
[
"guilty",
"مذنب",
"⛓️",
"He was found guilty of theft."
],
[
"innocent",
"بريء",
"🕊️",
"She says she is innocent."
],
[
"testimony",
"شهادة (أمام المحكمة)",
"🗣️",
"Her testimony changed the case."
],
[
"penalty",
"عقوبة",
"⚠️",
"The penalty for late payment is 5%."
],
[
"liability",
"مسؤولية قانونية",
"📌",
"The company accepted liability for the damage."
],
[
"regulation",
"لائحة / تنظيم",
"📋",
"New regulations protect consumers."
]
]
],
[
"الحكومة والمجتمع",
"Government and Society",
"🏛️",
[
[
"bureaucracy",
"البيروقراطية",
"🗂️",
"Bureaucracy slows down new projects."
],
[
"policy",
"سياسة / خطة رسمية",
"📄",
"The new policy supports small businesses."
],
[
"legislature",
"السلطة التشريعية",
"🏛️",
"The legislature approved the new law."
],
[
"public services",
"الخدمات العامة",
"🚑",
"Public services include health and education."
],
[
"referendum",
"استفتاء",
"🗳️",
"The country held a referendum on the issue."
],
[
"reform",
"إصلاح",
"🔧",
"The education reform changed the exams."
],
[
"inequality",
"عدم المساواة",
"📏",
"Income inequality is a global problem."
],
[
"demographic",
"فئة سكانية / ديموغرافي",
"📊",
"Young people are the largest demographic here."
],
[
"infrastructure",
"البنية التحتية",
"🌉",
"The city is investing in infrastructure."
],
[
"welfare",
"الرعاية الاجتماعية",
"🤲",
"Welfare programmes help poor families."
]
]
],
[
"التقنية الحديثة",
"Modern Technology",
"🤖",
[
[
"artificial intelligence",
"الذكاء الاصطناعي",
"🤖",
"Artificial intelligence is changing many jobs."
],
[
"device",
"جهاز",
"📱",
"Turn off your devices during the exam."
],
[
"software",
"برمجيات",
"💾",
"The company develops medical software."
],
[
"encryption",
"تشفير",
"🔐",
"Encryption keeps your messages private."
],
[
"surveillance",
"مراقبة",
"📹",
"Many people worry about online surveillance."
],
[
"automation",
"الأتمتة",
"⚙️",
"Automation has replaced some factory jobs."
],
[
"innovation",
"ابتكار",
"💡",
"The city is a centre of innovation."
],
[
"cybersecurity",
"الأمن السيبراني",
"🛡️",
"Banks spend a lot on cybersecurity."
],
[
"user-friendly",
"سهل الاستخدام",
"👌",
"The new app is very user-friendly."
],
[
"outdated",
"قديم / متجاوز",
"📼",
"This computer is outdated."
]
]
],
[
"البيئة والمناخ",
"Climate Change",
"🌡️",
[
[
"emissions",
"انبعاثات",
"🏭",
"Cars produce harmful emissions."
],
[
"global warming",
"الاحتباس الحراري",
"🔥",
"Global warming is melting the ice."
],
[
"renewable",
"متجدد",
"🌬️",
"Wind is a renewable source of energy."
],
[
"sustainable",
"مستدام",
"♻️",
"We need sustainable ways to grow food."
],
[
"deforestation",
"إزالة الغابات",
"🪓",
"Deforestation destroys animal habitats."
],
[
"habitat",
"موطن طبيعي",
"🦜",
"Pollution is destroying the bird's habitat."
],
[
"carbon footprint",
"البصمة الكربونية",
"👣",
"Flying increases your carbon footprint."
],
[
"conservation",
"الحفاظ على البيئة",
"🦒",
"Conservation projects protect wild animals."
],
[
"extinct",
"منقرض",
"🦣",
"Many species are now extinct."
],
[
"reduce",
"يقلّل",
"⬇️",
"We should reduce the amount of plastic we use."
]
]
],
[
"التعليم العالي",
"Higher Education",
"🏫",
[
[
"tuition fees",
"الرسوم الدراسية",
"💳",
"Tuition fees are high in some countries."
],
[
"dissertation",
"رسالة / أطروحة",
"📘",
"She is writing her master's dissertation."
],
[
"seminar",
"حلقة نقاش",
"🗨️",
"We discuss the readings in the weekly seminar."
],
[
"postgraduate",
"دراسات عليا",
"🎓",
"He is a postgraduate student in law."
],
[
"academic",
"أكاديمي",
"🏛️",
"Academic writing needs a formal style."
],
[
"plagiarism",
"سرقة أدبية",
"🚫",
"Plagiarism can get you expelled."
],
[
"enrol",
"يسجّل / يلتحق",
"🖊️",
"I enrolled in an online course."
],
[
"tutor",
"مدرّس خاص / مشرف",
"🧑‍🏫",
"My tutor helped me with my essay."
],
[
"attendance",
"الحضور",
"✅",
"Attendance is required for all lectures."
],
[
"campus",
"الحرم الجامعي",
"🌳",
"The library is in the middle of the campus."
]
]
],
[
"الصحة العامة",
"Public Health",
"🏥",
[
[
"vaccine",
"لقاح",
"💉",
"The vaccine protects children from disease."
],
[
"epidemic",
"وباء",
"🦠",
"The epidemic spread across the region."
],
[
"prevention",
"وقاية",
"🛡️",
"Prevention is better than cure."
],
[
"contagious",
"معدٍ",
"🤧",
"The flu is highly contagious."
],
[
"obesity",
"السمنة",
"⚖️",
"Obesity is increasing among children."
],
[
"diagnosis",
"تشخيص",
"🩺",
"The doctor made a quick diagnosis."
],
[
"treatment",
"علاج",
"💊",
"The treatment takes three months."
],
[
"chronic",
"مزمن",
"⏳",
"Diabetes is a chronic illness."
],
[
"hygiene",
"النظافة الصحية",
"🧼",
"Good hygiene stops infections."
],
[
"life expectancy",
"متوسط العمر المتوقع",
"📆",
"Life expectancy has risen in many countries."
]
]
],
[
"السفر المتقدم",
"Travel Problems",
"🧳",
[
[
"layover",
"توقف بين رحلتين",
"🛬",
"We had a six-hour layover in Istanbul."
],
[
"cancel",
"يلغي",
"❌",
"They cancelled the flight because of the storm."
],
[
"connecting flight",
"رحلة ربط",
"🔗",
"I missed my connecting flight in Dubai."
],
[
"lost luggage",
"أمتعة مفقودة",
"🧳",
"I went to the desk to report lost luggage."
],
[
"boarding pass",
"بطاقة صعود الطائرة",
"🎫",
"Please show your boarding pass at the gate."
],
[
"compensation",
"تعويض",
"🎁",
"Passengers received compensation for the delay."
],
[
"visa",
"تأشيرة",
"🛂",
"You need a visa to visit that country."
],
[
"itinerary",
"خط سير الرحلة",
"🗺️",
"Please send me the full itinerary."
],
[
"accommodation",
"سكن / إقامة",
"🏨",
"The price includes accommodation and meals."
],
[
"jet lag",
"إرهاق السفر",
"😴",
"I had terrible jet lag after the trip."
]
]
],
[
"العلاقات والمشاعر",
"Relationships and Feelings",
"💞",
[
[
"resent",
"يستاء من",
"😤",
"He resented being treated like a child."
],
[
"empathy",
"التعاطف",
"💗",
"Good nurses show empathy to patients."
],
[
"nostalgic",
"حنين للماضي",
"📻",
"Old songs make me feel nostalgic."
],
[
"frustrated",
"محبط",
"😩",
"I'm frustrated with the slow internet."
],
[
"reconcile",
"يتصالح",
"🤝",
"The two brothers finally reconciled."
],
[
"commitment",
"التزام",
"💍",
"Marriage is a lifelong commitment."
],
[
"compromise",
"حل وسط / يتنازل",
"⚖️",
"They reached a compromise after a long talk."
],
[
"get along with",
"يتوافق مع",
"😊",
"I get along with my colleagues."
],
[
"argument",
"خلاف / شجار",
"💢",
"They had an argument about money."
],
[
"reunion",
"لمّ شمل",
"🫂",
"We had a family reunion last summer."
]
]
],
[
"الأعمال والشركات",
"Business",
"🏢",
[
[
"company",
"شركة",
"🏢",
"He started a small company in Jeddah."
],
[
"revenue",
"إيرادات",
"💵",
"The company's revenue doubled."
],
[
"loss",
"خسارة",
"📉",
"The company reported a loss."
],
[
"merger",
"اندماج شركات",
"🔗",
"The merger created the largest bank in the region."
],
[
"competitor",
"منافس",
"🏁",
"Our main competitor lowered its prices."
],
[
"launch",
"يطلق (منتجاً)",
"🚀",
"They will launch the new phone in May."
],
[
"brand",
"علامة تجارية",
"🏷️",
"It is a famous fashion brand."
],
[
"strategy",
"استراتيجية",
"♟️",
"We need a new marketing strategy."
],
[
"supplier",
"مورّد",
"🚚",
"Our supplier delivers every Monday."
],
[
"startup",
"شركة ناشئة",
"🌱",
"She works for a tech startup."
]
]
],
[
"التمويل الشخصي",
"Personal Finance",
"💳",
[
[
"savings",
"مدخرات",
"🐖",
"I keep my savings in a separate account."
],
[
"mortgage",
"قرض عقاري",
"🏠",
"They pay their mortgage every month."
],
[
"interest",
"فائدة (مالية)",
"％",
"The interest on this card is very high."
],
[
"overdraft",
"سحب على المكشوف",
"🏦",
"I went into my overdraft last month."
],
[
"expenses",
"مصاريف",
"🧾",
"Rent is my biggest monthly expense."
],
[
"bill",
"فاتورة",
"📄",
"Did you pay the electricity bill?"
],
[
"installment",
"قسط",
"📆",
"I pay for the phone in monthly installments."
],
[
"transfer",
"تحويل",
"🔁",
"I made a bank transfer to my brother."
],
[
"credit score",
"التصنيف الائتماني",
"📈",
"A good credit score helps you get a loan."
],
[
"withdraw",
"يسحب (مالاً)",
"🏧",
"I need to withdraw some cash."
]
]
],
[
"المدن والتخطيط",
"Cities and Urban Life",
"🏙️",
[
[
"urban",
"حضري",
"🏙️",
"Urban areas are often crowded."
],
[
"rural",
"ريفي",
"🌾",
"Life in rural areas is quieter."
],
[
"traffic jam",
"زحمة مرور",
"🚗",
"We were stuck in a traffic jam for an hour."
],
[
"public transport",
"النقل العام",
"🚇",
"The metro has improved public transport."
],
[
"pedestrian",
"مشاة",
"🚶",
"This street is for pedestrians only."
],
[
"suburb",
"ضاحية",
"🏡",
"They moved to a quiet suburb."
],
[
"skyscraper",
"ناطحة سحاب",
"🏢",
"The city is full of skyscrapers."
],
[
"housing",
"الإسكان",
"🏘️",
"Housing is expensive in big cities."
],
[
"noise",
"ضجيج",
"🔊",
"The noise from the street keeps me awake."
],
[
"neighbourhood",
"حيّ",
"🗺️",
"It's a friendly neighbourhood."
]
]
],
[
"الثقافة والتراث",
"Culture and Heritage",
"🏺",
[
[
"heritage",
"تراث",
"🏺",
"AlUla is part of Saudi heritage."
],
[
"tradition",
"تقليد",
"🪔",
"It is a tradition to serve coffee to guests."
],
[
"custom",
"عادة",
"🤲",
"Shaking hands is a common custom."
],
[
"ancient",
"قديم جداً / أثري",
"🏛️",
"They visited an ancient city."
],
[
"artefact",
"قطعة أثرية",
"⚱️",
"The museum displays artefacts from AlUla."
],
[
"festival",
"مهرجان",
"🎉",
"The festival attracts thousands of visitors."
],
[
"generation",
"جيل",
"👴",
"Stories pass from one generation to the next."
],
[
"identity",
"هوية",
"🪪",
"Language is part of our identity."
],
[
"craft",
"حرفة يدوية",
"🧵",
"Weaving is a traditional craft."
],
[
"preserve",
"يحافظ على",
"🛡️",
"We must preserve old buildings."
]
]
],
[
"الرياضة واللياقة",
"Sport and Fitness",
"🏋️",
[
[
"endurance",
"قدرة التحمل الطويل",
"🚴",
"Marathon runners need great endurance."
],
[
"qualify",
"يتأهل",
"✅",
"The team qualified for the World Cup."
],
[
"sponsorship",
"رعاية",
"💼",
"The club signed a new sponsorship deal."
],
[
"sprain",
"التواء",
"🦶",
"I sprained my ankle playing football."
],
[
"stamina",
"قدرة على التحمل",
"🔋",
"Running every day builds stamina."
],
[
"penalty kick",
"ركلة جزاء",
"⚽",
"He scored from a penalty kick."
],
[
"rival",
"غريم / منافس",
"🥊",
"Al Hilal and Al Nassr are big rivals."
],
[
"league table",
"جدول الترتيب",
"📋",
"We are top of the league table."
],
[
"spectator",
"متفرج",
"👀",
"Thousands of spectators filled the stadium."
],
[
"warm up",
"يقوم بالإحماء",
"🔥",
"Always warm up before you exercise."
]
]
],
[
"الطعام والتغذية",
"Nutrition",
"🥗",
[
[
"nutrient",
"عنصر غذائي",
"🥦",
"Vegetables are full of nutrients."
],
[
"protein",
"بروتين",
"🍗",
"Eggs are a good source of protein."
],
[
"balanced diet",
"نظام غذائي متوازن",
"⚖️",
"A balanced diet keeps you healthy."
],
[
"processed food",
"طعام مصنّع",
"🍟",
"Try to avoid processed food."
],
[
"ingredient",
"مكوّن",
"🧂",
"What are the ingredients of this dish?"
],
[
"portion",
"حصة / كمية",
"🍽️",
"The portions in this restaurant are huge."
],
[
"metabolism",
"الأيض",
"🔥",
"Exercise speeds up your metabolism."
],
[
"vegetarian",
"نباتي",
"🥕",
"My sister is vegetarian."
],
[
"intolerance",
"عدم تحمل (طعام)",
"🥛",
"She has a lactose intolerance."
],
[
"organic",
"عضوي",
"🌿",
"Organic vegetables are more expensive."
]
]
],
[
"الجريمة والأمان",
"Crime and Safety",
"🚨",
[
[
"crime",
"جريمة",
"🚨",
"Crime has decreased in the city."
],
[
"theft",
"سرقة",
"👜",
"Report any theft to the police."
],
[
"suspect",
"مشتبه به",
"🕵️",
"The police arrested a suspect."
],
[
"security camera",
"كاميرا مراقبة",
"📹",
"The security camera recorded everything."
],
[
"victim",
"ضحية",
"🩹",
"The victim was taken to hospital."
],
[
"burglary",
"سطو على منزل",
"🏚️",
"There was a burglary on our street."
],
[
"deter",
"يردع",
"🚫",
"Cameras deter thieves."
],
[
"fraud",
"احتيال",
"🎭",
"He lost money to online fraud."
],
[
"emergency",
"حالة طارئة",
"🆘",
"In an emergency, call 911."
],
[
"safety",
"السلامة",
"🦺",
"Safety comes first on the building site."
]
]
],
[
"الفن والإبداع",
"Art and Creativity",
"🎨",
[
[
"abstract",
"تجريدي",
"🌀",
"I don't understand abstract art."
],
[
"gallery",
"معرض / صالة عرض",
"🖼️",
"The gallery is free on Fridays."
],
[
"sculpture",
"منحوتة",
"🗿",
"There is a huge sculpture in the square."
],
[
"masterpiece",
"تحفة فنية",
"🌟",
"This painting is a masterpiece."
],
[
"inspire",
"يُلهم",
"✨",
"Nature inspires many artists."
],
[
"talent",
"موهبة",
"🎁",
"He has a real talent for music."
],
[
"perform",
"يؤدي / يعزف",
"🎭",
"The band will perform tonight."
],
[
"imagination",
"خيال",
"💭",
"Children have a great imagination."
],
[
"original",
"أصلي / مبتكر",
"🆕",
"Her ideas are very original."
],
[
"critic",
"ناقد",
"🧐",
"The critic loved the new film."
]
]
],
[
"الإدارة والقيادة",
"Leadership and Management",
"🧭",
[
[
"leader",
"قائد",
"🧭",
"A good leader listens to the team."
],
[
"manage",
"يدير",
"📋",
"She manages a team of ten people."
],
[
"delegate",
"يفوّض",
"📤",
"Managers should delegate some tasks."
],
[
"responsibility",
"مسؤولية",
"🎒",
"It is my responsibility to finish this."
],
[
"decision",
"قرار",
"✔️",
"We need to make a decision today."
],
[
"vision",
"رؤية",
"🔭",
"Vision 2030 has changed many sectors."
],
[
"feedback",
"ملاحظات / تغذية راجعة",
"💬",
"Thanks for your helpful feedback."
],
[
"motivate",
"يحفّز",
"🔥",
"A good coach knows how to motivate players."
],
[
"priority",
"أولوية",
"🥇",
"Safety is our top priority."
],
[
"accountable",
"مسؤول ومحاسَب",
"🧾",
"Leaders must be accountable for their decisions."
]
]
],
[
"الاتصال المهني",
"Professional Communication",
"📧",
[
[
"attach",
"يُرفق",
"📎",
"I have attached the file to this email."
],
[
"regarding",
"بخصوص",
"📌",
"I am writing regarding your order."
],
[
"confirm",
"يؤكد",
"✅",
"Please confirm the meeting time."
],
[
"schedule",
"جدول / يجدول",
"🗓️",
"Let's schedule a call for next week."
],
[
"follow up",
"يتابع",
"🔁",
"I will follow up with the client tomorrow."
],
[
"agenda",
"جدول أعمال",
"📝",
"What's on the agenda for the meeting?"
],
[
"summary",
"ملخص",
"📄",
"Please send a summary of the discussion."
],
[
"proposal",
"مقترح / عرض",
"📑",
"We sent them a proposal last week."
],
[
"inquiry",
"استفسار",
"❓",
"Thank you for your inquiry."
],
[
"on behalf of",
"نيابة عن",
"🧑‍💼",
"I am calling on behalf of my manager."
]
]
],
[
"الطاقة والموارد",
"Energy and Resources",
"⛽",
[
[
"fuel",
"وقود",
"⛽",
"The price of fuel went up."
],
[
"electricity",
"كهرباء",
"💡",
"The air conditioner uses a lot of electricity."
],
[
"resource",
"مورد",
"🪨",
"Water is a precious resource."
],
[
"consumption",
"استهلاك",
"📊",
"Energy consumption is high in summer."
],
[
"solar panel",
"لوح شمسي",
"🔆",
"Solar panels cover the roof."
],
[
"shortage",
"نقص",
"⚠️",
"There is a shortage of water in the region."
],
[
"generate",
"يولّد",
"⚡",
"Wind turbines generate electricity."
],
[
"efficient use",
"الاستخدام الكفء",
"♻️",
"Efficient use of water saves money."
],
[
"fossil fuels",
"الوقود الأحفوري",
"🛢️",
"Fossil fuels release carbon dioxide."
],
[
"mining",
"تعدين",
"⛏️",
"Mining is a major industry in the north."
]
]
],
[
"التسويق والإعلان",
"Marketing and Advertising",
"📣",
[
[
"endorse",
"يروّج لـ / يؤيد",
"👍",
"A famous player endorses this brand."
],
[
"campaign",
"حملة",
"📢",
"The campaign was a big success."
],
[
"target audience",
"الجمهور المستهدف",
"🎯",
"Teenagers are our target audience."
],
[
"promote",
"يروّج",
"📣",
"Influencers promote products online."
],
[
"discount",
"خصم",
"🏷️",
"There is a 20% discount this week."
],
[
"slogan",
"شعار إعلاني",
"💬",
"The company has a catchy slogan."
],
[
"influencer",
"مؤثر",
"🤳",
"The influencer has two million followers."
],
[
"survey",
"استبيان",
"📋",
"We did a survey of our customers."
],
[
"market research",
"أبحاث السوق",
"🔍",
"Market research shows people want cheaper options."
],
[
"reputation",
"سمعة",
"⭐",
"The hotel has an excellent reputation."
]
]
],
[
"الأسرة والمجتمع الحديث",
"Modern Family Life",
"👨‍👩‍👧",
[
[
"upbringing",
"التربية والنشأة",
"🧸",
"He had a strict upbringing."
],
[
"raise",
"يربّي",
"🌱",
"They raised four children."
],
[
"sibling",
"أخ أو أخت",
"👫",
"I have three siblings."
],
[
"elderly",
"كبار السن",
"👵",
"We should take care of the elderly."
],
[
"household",
"الأسرة / أهل البيت",
"🏠",
"Household chores are shared in our family."
],
[
"custody",
"حضانة",
"👶",
"The mother got custody of the children."
],
[
"role model",
"قدوة",
"🌟",
"My father is my role model."
],
[
"independent",
"مستقل",
"🦅",
"She became independent at a young age."
],
[
"extended family",
"العائلة الممتدة",
"👪",
"We live near our extended family."
],
[
"childhood",
"الطفولة",
"🪁",
"I had a happy childhood."
]
]
],
[
"الكوارث والطوارئ",
"Disasters and Emergencies",
"🌪️",
[
[
"tsunami",
"تسونامي",
"🌊",
"The earthquake caused a tsunami."
],
[
"aftermath",
"العواقب / ما بعد الكارثة",
"🏚️",
"In the aftermath of the flood, roads were closed."
],
[
"evacuate",
"يُخلي",
"🏃",
"People had to evacuate their homes."
],
[
"rescue",
"ينقذ / إنقاذ",
"🚁",
"Rescue teams worked all night."
],
[
"shelter",
"مأوى",
"⛺",
"Families stayed in a shelter."
],
[
"damage",
"ضرر",
"🏚️",
"The fire caused serious damage."
],
[
"survive",
"ينجو",
"💪",
"Everyone survived the accident."
],
[
"warning",
"تحذير",
"⚠️",
"The government issued a storm warning."
],
[
"aid",
"مساعدات",
"📦",
"Aid arrived from many countries."
],
[
"casualties",
"ضحايا / إصابات",
"🚑",
"There were no casualties in the fire."
]
]
],
[
"التفكير والتعلم",
"Thinking and Learning",
"🧠",
[
[
"memorise",
"يحفظ عن ظهر قلب",
"🧠",
"I memorised all the new words."
],
[
"concentrate",
"يركّز",
"🎯",
"I can't concentrate with this noise."
],
[
"retain",
"يحتفظ بـ / يتذكر",
"🧲",
"Short reviews help you retain new words."
],
[
"comprehend",
"يستوعب",
"📖",
"He couldn't comprehend the instructions."
],
[
"misconception",
"مفهوم خاطئ",
"❎",
"It's a misconception that bats are blind."
],
[
"practise",
"يتمرّن",
"🔁",
"Practise speaking every day."
],
[
"reflect on",
"يتأمل في",
"🪞",
"Take time to reflect on what you learned."
],
[
"knowledge",
"معرفة",
"📚",
"Knowledge is power."
],
[
"deduce",
"يستنتج",
"🕵️",
"From the clues, she deduced the answer."
],
[
"critical thinking",
"التفكير النقدي",
"🤔",
"Critical thinking helps you judge information."
]
]
],
[
"السكن والإيجار",
"Renting and Housing",
"🔑",
[
[
"property",
"عقار",
"🏠",
"Property prices rose sharply in Riyadh."
],
[
"tenant",
"مستأجر",
"🧳",
"The tenant must pay before the fifth."
],
[
"lease",
"عقد إيجار",
"📝",
"We signed a one-year lease."
],
[
"deposit",
"تأمين / عربون",
"💰",
"You get the deposit back when you leave."
],
[
"furnished",
"مفروش",
"🛋️",
"The flat is fully furnished."
],
[
"utilities",
"الخدمات (ماء وكهرباء)",
"🚰",
"The rent includes utilities."
],
[
"maintenance",
"صيانة",
"🔧",
"Call maintenance if the AC breaks."
],
[
"evict",
"يطرد (من السكن)",
"🚪",
"They can't evict you without notice."
],
[
"spacious",
"واسع",
"📐",
"The living room is very spacious."
],
[
"renovate",
"يجدّد",
"🛠️",
"They renovated the old house."
]
]
]
];
export const VOCAB_LESSONS: SaraVocabLesson[] = [...RAW, ...RAW2, ...RAW3].map(([titleAr, titleEn, icon, ws], i) => ({
  id: `vocab-${'abcd'[Math.floor(i / 30)]}-${String((i % 30) + 1).padStart(2, '0')}`, order: i + 1, levelId: 'abcd'[Math.floor(i / 30)] as 'a' | 'b' | 'c' | 'd', titleAr, titleEn, icon,
  words: ws.map(([en, ar, emoji, example]) => ({ en, ar, emoji, example }))
}));
export const VOCAB_TRACK_ID = 'vocabulary';
