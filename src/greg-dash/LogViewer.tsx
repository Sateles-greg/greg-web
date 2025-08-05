// import React from 'react';
import styles from './logviewer.module.css';

export default function LogViewer() {
  // Simulação de logs
  return (
    <div className={styles.log}>
      <h3 className={styles.heading}>Logs Recentes</h3>
      <pre>
        [22:00] Manutenção noturna executada
        [22:01] Cache simbiótico apagado
        [22:02] Checkpoint registrado
      </pre>
    </div>
  );
}
