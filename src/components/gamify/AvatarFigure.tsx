import React from 'react';

/** The student's character (from "غرفتي") with optional hat and pet — emoji based, no photos. */
export function AvatarFigure({ character, hat, pet, size = 40 }: { character: string; hat?: string; pet?: string; size?: number }) {
  return (
    <span className="relative inline-flex items-end" style={{ width: size * 1.35, height: size * 1.3 }}>
      <span className="absolute left-1/2 -translate-x-1/2 leading-none" style={{ bottom: 0, fontSize: size }}>{character}</span>
      {hat && <span className="absolute left-1/2 -translate-x-1/2 leading-none" style={{ bottom: size * 0.78, fontSize: size * 0.56 }}>{hat}</span>}
      {pet && <span className="absolute leading-none" style={{ bottom: -2, insetInlineEnd: -size * 0.42, fontSize: size * 0.5 }}>{pet}</span>}
    </span>
  );
}
export default AvatarFigure;
