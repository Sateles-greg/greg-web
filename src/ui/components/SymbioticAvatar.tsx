// ...existing code...
import './SymbioticAvatar.css';

interface SymbioticAvatarProps {
  mode: string;
}

const SymbioticAvatar: React.FC<SymbioticAvatarProps> = ({ mode }) => {
  // SVGs animados e orgânicos para cada modo
  switch (mode) {
    case 'zen':
      return (
        <svg className="avatar-svg avatar-zen" width="180" height="180" viewBox="0 0 180 180">
          <defs>
            <radialGradient id="zenGradient" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#fffbe6" />
              <stop offset="100%" stopColor="#e6d3b3" />
            </radialGradient>
          </defs>
          <ellipse cx="90" cy="90" rx="60" ry="60" fill="url(#zenGradient)" />
          <ellipse cx="90" cy="120" rx="40" ry="18" fill="#e6d3b3" opacity="0.3" />
          <ellipse cx="90" cy="70" rx="18" ry="12" fill="#fffbe6" opacity="0.7" />
        </svg>
      );
    case 'estrategia':
      return (
        <svg className="avatar-svg avatar-estrategia" width="180" height="180" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="60" fill="#1e293b" />
          <rect x="60" y="60" width="60" height="60" rx="18" fill="#38bdf8" opacity="0.7" />
          <circle cx="90" cy="90" r="18" fill="#fff" />
        </svg>
      );
    case 'criativo':
      return (
        <svg className="avatar-svg avatar-criativo" width="180" height="180" viewBox="0 0 180 180">
          <ellipse cx="90" cy="90" rx="60" ry="60" fill="#a78bfa" />
          <ellipse cx="90" cy="90" rx="40" ry="18" fill="#f472b6" opacity="0.5" />
          <ellipse cx="120" cy="70" rx="12" ry="8" fill="#facc15" opacity="0.7" />
        </svg>
      );
    case 'emocional':
      return (
        <svg className="avatar-svg avatar-emocional" width="180" height="180" viewBox="0 0 180 180">
          <ellipse cx="90" cy="90" rx="60" ry="60" fill="#38bdf8" />
          <ellipse cx="90" cy="120" rx="40" ry="18" fill="#f472b6" opacity="0.3" />
          <ellipse cx="90" cy="70" rx="18" ry="12" fill="#fff" opacity="0.7" />
        </svg>
      );
    case 'noturno':
      return (
        <svg className="avatar-svg avatar-noturno" width="180" height="180" viewBox="0 0 180 180">
          <ellipse cx="90" cy="90" rx="60" ry="60" fill="#312e81" />
          <ellipse cx="90" cy="120" rx="40" ry="18" fill="#818cf8" opacity="0.3" />
          <ellipse cx="90" cy="70" rx="18" ry="12" fill="#fff" opacity="0.3" />
        </svg>
      );
    default:
      return (
        <svg className="avatar-svg avatar-default" width="180" height="180" viewBox="0 0 180 180">
          <ellipse cx="90" cy="90" rx="60" ry="60" fill="#64748b" />
        </svg>
      );
  }
};

export default SymbioticAvatar;
