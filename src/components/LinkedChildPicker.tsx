import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../lib/firebase';
import { L } from '../lib/explainLang';
import { loadLinkedChildren, type LinkedChild } from '../lib/linkedChildren';

/** Child selector for parents (navy/gold). Hidden when the signed-in user has no linked children.
 *  When the current selection is the parent's own account and children exist, the first child is selected once. */
export const LinkedChildPicker: React.FC<{ value: string; onChange: (uid: string, name: string) => void; className?: string }> = ({ value, onChange, className = '' }) => {
  const me = auth.currentUser?.uid || '';
  const [kids, setKids] = useState<LinkedChild[]>([]);
  const auto = useRef(false);
  useEffect(() => { let alive = true; if (!me) return; void loadLinkedChildren(me).then(k => { if (!alive) return; setKids(k); if (!auto.current && k.length && (!value || value === me)) { auto.current = true; onChange(k[0].uid, k[0].displayName); } }); return () => { alive = false; }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);
  if (!me || !kids.length) return null;
  const opts = [...kids.map(k => ({ uid: k.uid, name: k.displayName })), { uid: me, name: L('ملفي أنا', 'My own profile') }];
  return (
    <div data-testid="linked-child-picker" className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <span className="text-[11px] font-black text-[#C49E3A]">{L('الطالب:', 'Student:')}</span>
      {opts.map(o => (
        <button key={o.uid} type="button" onClick={() => onChange(o.uid, o.uid === me ? '' : o.name)}
          className={`px-3 py-1 rounded-full text-[11.5px] font-black border ${value === o.uid ? 'bg-[#C49E3A] text-[#002147] border-[#C49E3A]' : 'bg-[#002147] text-white border-[#C49E3A]/40'}`}>
          <span className="max-w-[140px] truncate inline-block align-bottom">{o.name}</span>
        </button>
      ))}
    </div>
  );
};
export default LinkedChildPicker;
