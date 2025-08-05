// ...existing code...
import './SymbioticBackground.css';

const SymbioticBackground: React.FC = () => (
  <div className="symbiotic-bg">
    <svg width="100%" height="100%" viewBox="0 0 1440 900" className="bg-svg">
      <defs>
        <radialGradient id="bg1" cx="60%" cy="40%" r="1">
          <stop offset="0%" stopColor="#fffbe6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#e6d3b3" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="bg2" cx="30%" cy="80%" r="1">
          <stop offset="0%" stopColor="#a7c7e7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e6d3b3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="900" cy="400" rx="600" ry="400" fill="url(#bg1)" />
      <ellipse cx="400" cy="800" rx="400" ry="200" fill="url(#bg2)" />
    </svg>
  </div>
);

export default SymbioticBackground;
