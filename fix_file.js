import fs from 'fs';

const filePath = 'src/components/BalanceOasis.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// We want to delete the segment starting from 'const completedCount = localCompletedIds.size;' around line 1459
// up to 'const completedCount = localCompletedIds.size;' around line 1767 (excluding this second one).
const firstCompletedIndex = content.indexOf('  const completedCount = localCompletedIds.size;');
if (firstCompletedIndex === -1) {
    console.error('Core calculations not found');
    process.exit(1);
}

// Find the second occurrence of '  const completedCount = localCompletedIds.size;'
const secondCompletedIndex = content.indexOf('  const completedCount = localCompletedIds.size;', firstCompletedIndex + 1);
if (secondCompletedIndex === -1) {
    console.error('Second occurrence of calculations not found. Maybe it is already cleaned up?');
    process.exit(1);
}

// Keep everything before firstCompletedIndex, and append everything starting from secondCompletedIndex.
const cleanedContent = content.substring(0, firstCompletedIndex) + content.substring(secondCompletedIndex);
fs.writeFileSync(filePath, cleanedContent);
console.log('Duplicate section removed successfully!');
