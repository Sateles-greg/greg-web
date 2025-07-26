
import React from 'react';
import './Avatar.css';

type SymbiosisMode = 'expansao' | 'foco' | 'guardiao' | 'reparo' | 'sombra';

interface AvatarProps {
  mode?: SymbiosisMode;
}

const svgs: Record<SymbiosisMode, JSX.Element> = {
  foco: (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="#0ff" stroke="#0cf" strokeWidth="8" />
      <circle cx="60" cy="60" r="20" fill="#fff" stroke="#0cf" strokeWidth="4" />
      <circle cx="60" cy="60" r="8" fill="#0cf" />
    </svg>
  ),
  expansao: (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <defs>
        <radialGradient id="expansao" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#43cea2" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#expansao)" />
      <ellipse cx="60" cy="60" rx="30" ry="10" fill="#185a9d" opacity="0.3" />
    </svg>
  ),
  reparo: (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="#e0eafc" stroke="#cfdef3" strokeWidth="8" />
      <rect x="40" y="80" width="40" height="10" rx="5" fill="#cfdef3" />
    </svg>
  ),
  sombra: (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="#232526" stroke="#414345" strokeWidth="8" />
      <circle cx="60" cy="60" r="20" fill="#414345" />
    </svg>
  ),
  guardiao: (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="#ffd200" stroke="#f7971e" strokeWidth="8" />
      <polygon points="60,30 80,80 40,80" fill="#f7971e" />
    </svg>
  ),
};

const Avatar: React.FC<AvatarProps> = ({ mode = 'foco' }) => {
  return (
    <div className={`avatar avatar--${mode}`}>{svgs[mode]}</div>
  );
};

export default Avatar;
