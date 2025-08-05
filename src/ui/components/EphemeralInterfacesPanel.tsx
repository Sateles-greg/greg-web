import React, { useState } from 'react';
// ...existing code...
import styles from './EphemeralInterfacesPanel.module.css';

const EphemeralInterfacesPanel: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  function criarInterface() {
    setLogs(l => [...l, 'Interface efêmera criada e destruída.']);
  }
  function ativarAvatar() {
    setLogs(l => [...l, 'Avatar descartável ativado e desativado.']);
  }
  return (
    <section className={styles.ephemeralSection}>
      <h2 className={styles.ephemeralTitle}>Interfaces Efêmeras & Avatares</h2>
      <button onClick={criarInterface} className={styles.ephemeralButton}>Criar Interface Efêmera</button>
      <button onClick={ativarAvatar} className={styles.ephemeralButton}>Ativar Avatar Descartável</button>
      <ul className={styles.ephemeralLogs}>
        {logs.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
    </section>
  );
};
export default EphemeralInterfacesPanel;
