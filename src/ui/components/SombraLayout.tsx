import React from 'react';
import ModoBaseLayout from './ModoBaseLayout';
import styles from './modolayout.module.css';

export default function SombraLayout({ children }: { children?: React.ReactNode }) {
  return (
    <ModoBaseLayout corPrimaria="#111827" simbolo="🕳️" nomeModo="Sombra" descricao="Interface visual para exploração das emoções profundas e sombras.">
      <div className={styles.container}>
        <div className={styles.bgPulseSombra} />
        <div className={styles.content}>
          <h2 className={styles.heading}>🕳️ Modo Sombra</h2>
          <p className={styles.text}>Explore emoções profundas e encontre equilíbrio.</p>
          {children}
          <button className={styles.button}>Alternar Modo</button>
        </div>
      </div>
    </ModoBaseLayout>
  );
}
