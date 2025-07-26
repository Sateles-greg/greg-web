import React from 'react';
import ModoBaseLayout from './ModoBaseLayout';
import styles from './modolayout.module.css';

export default function GuardiaoLayout({ children }: { children?: React.ReactNode }) {
  return (
    <ModoBaseLayout corPrimaria="#f59e0b" simbolo="🛡️" nomeModo="Guardião" descricao="Interface visual para proteção ativa e vigilância simbiótica.">
      <div className={styles.container}>
        <div className={styles.bgPulseGuardiao} />
        <div className={styles.content}>
          <h2 className={styles.heading}>🛡️ Proteção Ativa</h2>
          <p className={styles.text}>Seu ambiente está seguro e monitorado.</p>
          {children}
          <button className={styles.button}>Alternar Modo</button>
        </div>
      </div>
    </ModoBaseLayout>
  );
}
