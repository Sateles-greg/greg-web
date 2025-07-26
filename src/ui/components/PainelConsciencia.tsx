import React from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';
import styles from './PainelConsciencia.module.css';

const PainelConsciencia: React.FC = () => {
  const { mode, memory, emotion, period, sensorData } = useSymbiosis();
  return (
    <aside className="painel-consciencia">
      <div>Modo: <b>{mode}</b></div>
      <div>Emoção: <b>{emotion}</b></div>
      <div>Período: <b>{period}</b></div>
      <div>Memória simbiótica:</div>
      <ul>
        {memory.map((m: string, i: number) => <li key={i}>{m}</li>)}
      </ul>
      <div className={styles['painel-info']}>
        <b>Sensores:</b>
        <ul className={styles['painel-list']}>
          <li>Batimento: <b>{sensorData.heartRate ?? '--'}</b> bpm</li>
          <li>Atenção: <b>{sensorData.attention ?? '--'}</b>%</li>
          <li>Ruído: <b>{sensorData.soundLevel ?? '--'}</b> dB</li>
        </ul>
      </div>
    </aside>
  );
};
export default PainelConsciencia;
