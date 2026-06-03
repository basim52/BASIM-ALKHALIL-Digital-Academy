import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Monkeypatch getComputedStyle to convert OKLCH and OKLAB colors into standard HSLA/RGBA colors 
// to prevent html2canvas / exporting utilities from crashing on modern CSS colors.
function convertOklabToRgba(m: string): string {
  try {
    const cleaned = m.replace(/\s*\/\s*/g, ' ').trim();
    const innerMatch = cleaned.match(/oklab\(([^)]+)\)/i);
    if (!innerMatch) return m;
    const parts = innerMatch[1].trim().split(/\s+/);
    if (parts.length < 3) return m;
    let lStr = parts[0];
    let aStr = parts[1];
    let bStr = parts[2];
    let alphaStr = parts[3] || '1';

    let L = lStr.endsWith('%') ? parseFloat(lStr) / 100 : parseFloat(lStr);
    let aVal = aStr.endsWith('%') ? parseFloat(aStr) / 100 : parseFloat(aStr);
    let bVal = bStr.endsWith('%') ? parseFloat(bStr) / 100 : parseFloat(bStr);
    let alpha = alphaStr.endsWith('%') ? parseFloat(alphaStr) / 100 : parseFloat(alphaStr);

    if (isNaN(L) || isNaN(aVal) || isNaN(bVal)) return m;

    // Oklab to LMS
    const l_ = L + 0.3963377774 * aVal + 0.2158037573 * bVal;
    const m_ = L - 0.1055613458 * aVal - 0.0638541728 * bVal;
    const s_ = L - 0.0894841775 * aVal - 1.2914855414 * bVal;

    const lVal = Math.pow(Math.max(0, l_), 3);
    const mVal = Math.pow(Math.max(0, m_), 3);
    const sVal = Math.pow(Math.max(0, s_), 3);

    // LMS to linear sRGB
    let rLinear = +4.0767416621 * lVal - 3.3077115913 * mVal + 0.2309699292 * sVal;
    let gLinear = -1.2684380046 * lVal + 2.6097574011 * mVal - 0.3413193965 * sVal;
    let bLinear = -0.0041960863 * lVal - 0.7034186147 * mVal + 1.7076147010 * sVal;

    // Linear sRGB to sRGB
    const fn = (c: number) => {
      c = Math.max(0, Math.min(1, c));
      return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    };

    const r = Math.round(fn(rLinear) * 255);
    const g = Math.round(fn(gLinear) * 255);
    const b = Math.round(fn(bLinear) * 255);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch (e) {
    return m;
  }
}

if (typeof window !== 'undefined') {
  const originalGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = function (elt, pseudoElt) {
    const style = originalGetComputedStyle(elt, pseudoElt);
    return new Proxy(style, {
      get(target, prop, receiver) {
        if (prop === 'getPropertyValue') {
          return function(propertyName: string) {
            let res = target.getPropertyValue(propertyName);
            if (typeof res === 'string') {
              if (res.includes('oklch')) {
                res = res.replace(/oklch\([^)]+\)/gi, (m) => {
                  try {
                    const cleaned = m.replace(/\s*\/\s*/g, ' ').trim();
                    const innerMatch = cleaned.match(/oklch\(([^)]+)\)/i);
                    if (!innerMatch) return m;
                    const parts = innerMatch[1].trim().split(/\s+/);
                    if (parts.length < 3) return m;
                    let lStr = parts[0];
                    let cStr = parts[1];
                    let hStr = parts[2];
                    let aStr = parts[3] || '1';
                    
                    let l = lStr.endsWith('%') ? parseFloat(lStr) : parseFloat(lStr) * 100;
                    let c = cStr.endsWith('%') ? parseFloat(cStr) / 100 : parseFloat(cStr);
                    let h = parseFloat(hStr);
                    let a = aStr.endsWith('%') ? parseFloat(aStr) / 100 : parseFloat(aStr);
                    
                    if (isNaN(l) || isNaN(c) || isNaN(h)) return m;
                    let s = Math.min(100, Math.max(0, (c / 0.4) * 100));
                    return `hsla(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%, ${a})`;
                  } catch (e) {
                    return m;
                  }
                });
              }
              if (res.includes('oklab')) {
                res = res.replace(/oklab\([^)]+\)/gi, convertOklabToRgba);
              }
            }
            return res;
          };
        }
        
        let val = Reflect.get(target, prop);
        if (typeof val === 'string') {
          if (val.includes('oklch')) {
            val = val.replace(/oklch\([^)]+\)/gi, (m) => {
              try {
                const cleaned = m.replace(/\s*\/\s*/g, ' ').trim();
                const innerMatch = cleaned.match(/oklch\(([^)]+)\)/i);
                if (!innerMatch) return m;
                const parts = innerMatch[1].trim().split(/\s+/);
                if (parts.length < 3) return m;
                let lStr = parts[0];
                let cStr = parts[1];
                let hStr = parts[2];
                let aStr = parts[3] || '1';
                
                let l = lStr.endsWith('%') ? parseFloat(lStr) : parseFloat(lStr) * 100;
                let c = cStr.endsWith('%') ? parseFloat(cStr) / 100 : parseFloat(cStr);
                let h = parseFloat(hStr);
                let a = aStr.endsWith('%') ? parseFloat(aStr) / 100 : parseFloat(aStr);
                
                if (isNaN(l) || isNaN(c) || isNaN(h)) return m;
                let s = Math.min(100, Math.max(0, (c / 0.4) * 100));
                return `hsla(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%, ${a})`;
              } catch (e) {
                return m;
              }
            });
          }
          if (val.includes('oklab')) {
            val = val.replace(/oklab\([^)]+\)/gi, convertOklabToRgba);
          }
        }
        if (typeof val === 'function') {
          return val.bind(target);
        }
        return val;
      }
    });
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
