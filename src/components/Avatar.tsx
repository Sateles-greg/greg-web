import React from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';
import './Avatar.css';

const Avatar: React.FC = () => {
  const { mode } = useSymbiosis();
  return (
    <div className={`avatar avatar--${mode}`}> {/* Avatar simbiótico reativo */}
      <span role="img" aria-label="avatar">
        {mode === 'foco' && '🧿'}
        {mode === 'expansao' && '🌈'}
        {mode === 'reparo' && '💤'}
        {mode === 'sombra' && '🌑'}
        {mode === 'guardiao' && '🛡️'}
      </span>
    </div>
  );
};
export default Avatar;
