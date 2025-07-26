import React from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';
import styles from './SimbioHeader.module.css';

const SimbioHeader: React.FC = () => {
  const { mode, setMode } = useSymbiosis();
  return (
    <header className={styles.simbioHeader}>
      <h2 className={styles.simbioTitle}>Modos Simbióticos</h2>
      <div className={styles.modes}>
        {['foco','expansao','reparo','sombra','guardiao'].map(m => (
          <button
            key={m}
            className={mode === m ? styles.active : ''}
            onClick={() => setMode(m as any)}
            aria-pressed={mode === m ? true : false}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
    </header>
  );
};
export default SimbioHeader;
