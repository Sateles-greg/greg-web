import React, { useState } from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';
import { identidadeEfemera } from '../distributed/meshNetworkService';
import { gerarChavePQC, distribuirQKD } from '../distributed/quantumCryptoService';
import { statusResiliencia } from '../distributed/selfHealingService';
import styles from './AdminPanel.module.css';

const AdminPanel: React.FC = () => {
  const { memory, sensorData, emotion, mode, runPlugin } = useSymbiosis();
  const [feedback, setFeedback] = useState<string[]>([]);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  // Sugestão inteligente baseada em padrões de uso
  React.useEffect(() => {
    if (memory.length > 5) {
      const last = memory[memory.length - 1].toLowerCase();
      if (last.includes('cansado') || last.includes('reparo')) {
        setSuggestion('Você costuma usar o modo Reparo à noite. Deseja automatizar isso?');
      } else if (last.includes('feliz') || last.includes('expansao')) {
        setSuggestion('Percebi que o modo Expansão te anima. Quer ativar frases motivacionais automáticas?');
      } else {
        setSuggestion(null);
      }
    }
  }, [memory]);

  function handleFeedback(resp: string) {
    setFeedback(fb => [...fb, resp]);
    setSuggestion(null);
  }
  const [show, setShow] = useState(false);

  // Atalho: Ctrl+Shift+A para abrir
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') setShow(s => !s);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!show) return null;
  return (
    <aside className={styles.adminPanel}>
      <div className={styles.adminStatus}>
        <b>Consciência Distribuída:</b> {statusResiliencia()}<br/>
        <b>ID Efêmera:</b> {identidadeEfemera()}<br/>
        <b>Chave PQC:</b> {gerarChavePQC()}<br/>
        <b>QKD:</b> {distribuirQKD()}
      </div>
      <h4>Admin Panel</h4>
      <div><b>Modo:</b> {mode}</div>
      <div><b>Emoção:</b> {emotion}</div>
      <div><b>Memória:</b> <ul>{memory.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
      <div><b>Sensores:</b> {JSON.stringify(sensorData)}</div>
      {suggestion && (
        <div className={styles.adminSuggestion}>
          <b>Sugestão:</b> {suggestion}
          <div className={styles.adminSuggestionBtns}>
            <button onClick={() => handleFeedback('Aprovado')} className={styles.adminBtn}>Aprovar</button>
            <button onClick={() => handleFeedback('Rejeitado')} className={styles.adminBtn}>Rejeitar</button>
          </div>
        </div>
      )}
      {feedback.length > 0 && (
        <div className={styles.adminFeedback}>
          <b>Feedback recente:</b>
          <ul>{feedback.slice(-3).map((f, i) => <li key={i}>{f}</li>)}</ul>
        </div>
      )}
      <div>
        <button onClick={() => runPlugin('motivacional')} className={styles.adminPluginBtn}>Rodar Plugin Motivacional</button>
      </div>
      <small className={styles.adminShortcut}>Atalho: Ctrl+Shift+A</small>
    </aside>
  );
};
export default AdminPanel;
