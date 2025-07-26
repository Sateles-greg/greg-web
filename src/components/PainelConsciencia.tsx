import React from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';

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
      <div style={{marginTop: '1rem', fontSize: '0.95em'}}>
        <b>Sensores:</b>
        <ul style={{margin: 0, paddingLeft: '1.2em'}}>
          <li>Batimento: <b>{sensorData.heartRate ?? '--'}</b> bpm</li>
          <li>Atenção: <b>{sensorData.attention ?? '--'}</b>%</li>
          <li>Ruído: <b>{sensorData.soundLevel ?? '--'}</b> dB</li>
        </ul>
      </div>
    </aside>
  );
};
export default PainelConsciencia;
