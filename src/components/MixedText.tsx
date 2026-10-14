import React from 'react';
/** Arabic text with English phrases inside: each Latin run is isolated so punctuation/word order stays correct in RTL. */
export const MixedText: React.FC<{ text: string }> = ({ text }) => (
  <>{text.split(/([A-Za-z][A-Za-z0-9'’.,?!:\- ]*[A-Za-z0-9?!.])/).map((part, i) => (i % 2 ? <bdi key={i} dir="ltr">{part}</bdi> : <React.Fragment key={i}>{part}</React.Fragment>))}</>
);
export default MixedText;
