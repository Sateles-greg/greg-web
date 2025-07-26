import React from 'react';
import ModoBaseLayout from './ModoBaseLayout';
import styles from './modolayout.module.css';

export default function ReparoLayout({ children }: { children?: React.ReactNode }) {
  return (
    <ModoBaseLayout corPrimaria="#7c3aed" simbolo="🩺" nomeModo="Reparo" descricao="Interface visual para regeneração simbólica e cura emocional.">
      <div className={styles.container}>
        <div className={styles.bgPulseReparo} />
        <div className={styles.content}>
          <h2 className={styles.heading}>🩺 Reparo Emocional</h2>
          <p className={styles.text}>Descanse, recupere e renove suas energias.</p>
          {children}
          <button className={styles.button}>Alternar Modo</button>
        </div>
      </div>
    </ModoBaseLayout>
  );
}
