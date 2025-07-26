import React from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';

const EMOJI: Record<string, string> = {
  feliz: '😃',
  cansado: '😴',
  ansioso: '😬',
  irritado: '😠',
  motivado: '🚀',
  neutro: '😐',
};

const HistoricoEmocional: React.FC = () => {
  const { memory, emotion } = useSymbiosis();
  // Simula histórico emocional a partir das últimas 10 respostas
  const historico = memory.slice(-10).map((msg) => {
    const match = Object.keys(EMOJI).find(e => msg.toLowerCase().includes(e));
    return match || 'neutro';
  });
  return (
    <section style={{marginTop: '1.5rem'}}>
      <h3>Histórico Emocional</h3>
      <div style={{display: 'flex', gap: '0.5rem', fontSize: '1.5rem'}}>
        {historico.map((e, i) => <span key={i}>{EMOJI[e]}</span>)}
      </div>
      <div style={{marginTop: '0.5rem', fontSize: '1.1rem'}}>
        Estado atual: <b>{emotion}</b> {EMOJI[emotion]}
      </div>
    </section>
  );
};
export default HistoricoEmocional;
