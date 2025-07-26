import React, { useState } from 'react';
import styles from './NanoControlPanel.module.css';

export default function NanoControlPanel() {
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };
  return (
    <div className={styles.nanoPanel}>
      <h2>Nanotech & Quantum Control</h2>
      <button onClick={() => showToast('Nanobots: Reparos microscópicos simulados!')}>Reparar Material</button>
      <button onClick={() => showToast('Quântico: Reconfiguração molecular simulada!')}>Reconfigurar Matéria</button>
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
