import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Monkeypatch getComputedStyle to convert OKLCH colors into standard HSLA colors 
// to prevent html2canvas / exporting utilities from crashing on modern CSS colors.
if (typeof window !== 'undefined') {
  const originalGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = function (elt, pseudoElt) {
    const style = originalGetComputedStyle(elt, pseudoElt);
    return new Proxy(style, {
      get(target, prop, receiver) {
        if (prop === 'getPropertyValue') {
          return function(propertyName: string) {
            let res = target.getPropertyValue(propertyName);
            if (typeof res === 'string' && res.includes('oklch')) {
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
            return res;
          };
        }
        
        let val = Reflect.get(target, prop, receiver);
        if (typeof val === 'string' && val.includes('oklch')) {
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
