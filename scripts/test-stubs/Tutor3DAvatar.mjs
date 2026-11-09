import React from 'react';
export function Tutor3DAvatar(props) {
  return React.createElement('div', { 'data-testid': 'tutor-avatar', 'data-agent': props.agentId, 'data-speaking': String(!!props.isSpeaking), 'data-mode': props.mode });
}
export default Tutor3DAvatar;
