import { useState } from 'react';
// ...existing code...
import styles from './NeuralInterfacePanel.module.css';

export default function NeuralInterfacePanel() {
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };
  return (
    <div className={styles.neuralPanel}>
      <h2>Neural Interface (Simulada)</h2>
      <button onClick={() => showToast('Insight transmitido diretamente ao córtex!')}>Transmitir Insight</button>
      <button onClick={() => showToast('Sensação de calma induzida!')}>Induzir Calma</button>
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
