import fs from 'fs';

const filePath = 'src/components/ReadingCurriculumCompanion.tsx';
const content = fs.readFileSync(filePath, 'utf8');

const startMarker = 'C2: [\n    {\n      id: \'r_c2_1\',\n      titleEn: \'Philosophical Mastery\',\n      titleAr: \'الإتقان الفلسفي\',\n      descriptionEn: \'Deep immersion in ethical and existential treatises.\',\n      descriptionAr: \'انغماس عميق في الأطروحات الأخلاقية والوجودية.\',\n      color: \'bg-black\',\n      lightColor: \'bg-slate-100\',\n      prepQuestionEn: \'Is language the limit of our reality?\',\n      prepQuestionAr: \'هل اللغة هي حدود واقعنا؟\',\n      readingTextEn: \'The ontological implications of linguistic relativity remain a central debate in modern cognitive science.\',\n      readingTextAr: \'تظل الآثار الوجودية للنسبية اللغوية نقاشاً مركزياً في العلوم المعرفية الحديثة.\',\n      cards: [\n        { id: \'pm-1\', en: \'Existential\', ar: \'وجودي\', img: \'https://images.unsplash.com/photo-1519681393784-d120267923af?auto=format&fit=crop&w=400&q=80\' },\n        { id: \'pm-2\', en: \'Cognizant\', ar: \'مدرك / واعٍ\', img: \'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=400&q=80\' },\n        { id: \'pm-3\', en: \'Ontology\', ar: \'علم الوجود\', img: \'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=400&q=80\' },\n      ],\n      selfPacedLessons: [\n        { titleEn: \'Phenomenology of Reading\', titleAr: \'فينومينولوجيا القراءة\', duration: \'60m\', type: \'Expert\' },\n        { titleEn: \'Linguistic Archetypes\', titleAr: \'الأنماط اللغوية البدائية\', duration: \'50m\', type: \'Cognitive\' }\n      ]\n    }\n  ]\n};';

const endMarker = 'export const ReadingCurriculumCompanion = ({ lang, level = \'A1\', onBack, onStartLesson }: { lang: \'en\' | \'ar\', level?: ReadingLevel, onBack: () => void, onStartLesson: (unitId: string) => void }) => {';

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Start marker not found');
    process.exit(1);
}

const rest = content.substring(startIndex + startMarker.length);
const endIndex = rest.indexOf(endMarker);

if (endIndex === -1) {
    console.error('End marker not found');
    process.exit(1);
}

// Find the second occurrence of endMarker if it exists
const secondEndIndex = rest.indexOf(endMarker, endIndex + endMarker.length);

if (secondEndIndex !== -1) {
    // We want to delete everything between the end of startMarker and the last occurrence of endMarker
    const finalEndIndex = rest.lastIndexOf(endMarker);
    const newContent = content.substring(0, startIndex + startMarker.length) + '\n\n' + content.substring(startIndex + startMarker.length + finalEndIndex);
    fs.writeFileSync(filePath, newContent);
    console.log('File fixed successfully');
} else {
    // If only one endMarker, maybe we should just clean up the middle if it contains garbage
    console.error('Only one end marker found, might already be clean or severely broken');
    process.exit(1);
}
