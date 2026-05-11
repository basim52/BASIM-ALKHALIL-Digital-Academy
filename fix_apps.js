const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = content.split('\n');

// Line 941 (1-indexed) is index 940
const brokenLineIndex = 940;
console.log('Original line 941:', lines[brokenLineIndex]);

const newLines = [
  "              ? 'يقوم المعلم الذكي الآن بتصميم محتوى تعليمي حصري لك بناءً على المعايير العالمية.'",
  "              : 'Our AI Teacher is now designing an exclusive educational content for you based on the latest academic standards.'}",
  "          </p>",
  "        </motion.div>",
  "      </div>",
  "    );",
  "  }",
  "",
  "  return ("
];

lines.splice(brokenLineIndex, 1, ...newLines);
fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('Repaired src/App.tsx');
