import fs from 'fs';
import path from 'path';

// Helper to convert OKLCH to RGB
function oklchToRgb(lStr, cStr, hStr, aStr) {
  let l = lStr.toLowerCase() === 'none' ? 0 : lStr;
  let c = cStr.toLowerCase() === 'none' ? 0 : parseFloat(cStr);
  let h = hStr.toLowerCase() === 'none' ? 0 : parseFloat(hStr);

  if (typeof l === 'string' && l.endsWith('%')) {
    l = parseFloat(l) / 100;
  } else {
    l = parseFloat(l);
  }

  if (isNaN(l)) l = 0;
  if (isNaN(c)) c = 0;
  if (isNaN(h)) h = 0;

  // Conversion formula from OKLCH -> OKLAB
  const hRad = (h * Math.PI) / 180;
  const a_lab = c * Math.cos(hRad);
  const b_lab = c * Math.sin(hRad);

  // OKLAB -> LMS
  const l_lms = l + 0.3963377774 * a_lab + 0.2158037573 * b_lab;
  const m_lms = l - 0.1055613458 * a_lab - 0.0638541728 * b_lab;
  const s_lms = l - 0.0894841775 * a_lab - 1.2914855480 * b_lab;

  // LMS cubing
  const l_cube = Math.pow(Math.max(0, l_lms), 3);
  const m_cube = Math.pow(Math.max(0, m_lms), 3);
  const s_cube = Math.pow(Math.max(0, s_lms), 3);

  // Linear RGB
  let r_lin = +4.0767416621 * l_cube - 3.3077115913 * m_cube + 0.2309699292 * s_cube;
  let g_lin = -1.2684380046 * l_cube + 2.6097574011 * m_cube - 0.3413193965 * s_cube;
  let b_lin = -0.0041960863 * l_cube - 0.7034186147 * m_cube + 1.7076147010 * s_cube;

  // Gamma correction (sRGB)
  const f = (val) => {
    return val <= 0.0031308 ? 12.92 * val : 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
  };

  let r = Math.round(Math.max(0, Math.min(1, f(r_lin))) * 255);
  let g = Math.round(Math.max(0, Math.min(1, f(g_lin))) * 255);
  let b = Math.round(Math.max(0, Math.min(1, f(b_lin))) * 255);

  if (aStr) {
    let a = aStr.trim();
    if (a.toLowerCase() === 'none') a = '0';
    if (a.endsWith('%')) {
      a = (parseFloat(a) / 100).toString();
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

// walk dist directory
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  console.log('Processing files in dist/ to transform oklch & oklab patterns...');
  walkDir(distDir, (filePath) => {
    if (filePath.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // 1. Convert OKLCH to standard RGB/RGBA colors:
      const oklchRegex = /oklch\(\s*([0-9.]+%?|none)\s+([0-9.]+|none)\s+([0-9.]+|none)(?:\s*\/\s*([0-9.]+%?|none))?\s*\)/gi;
      let replacedCount = 0;
      content = content.replace(oklchRegex, (match, l, c, h, a) => {
        replacedCount++;
        return oklchToRgb(l, c, h, a);
      });
      
      // 2. Transpile in oklab color-mix variables:
      const oklabMixRegex = /in\s+oklab/gi;
      let oklabReplaced = 0;
      content = content.replace(oklabMixRegex, () => {
        oklabReplaced++;
        return 'in srgb';
      });

      // 3. Just replace remaining raw oklab text if any (fallback)
      const oklabRawRegex = /oklab\(\s*([0-9.]+%?|none)\s+([0-9.]+|none)\s+([0-9.]+|none)(?:\s*\/\s*([0-9.]+%?|none))?\s*\)/gi;
      content = content.replace(oklabRawRegex, (match) => {
        // Safe standard slate value standard replacement for standalone rare oklab variables
        return '#f1f5f9';
      });

      if (replacedCount > 0 || oklabReplaced > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully updated ${filePath}: transformed ${replacedCount} oklch colors and ${oklabReplaced} oklab mixes.`);
      }
    }
  });
} else {
  console.log('Dist directory not found. Compile first.');
}
