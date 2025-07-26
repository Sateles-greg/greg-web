import React from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';
import styles from './HistoricoEmocional.module.css';

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
    <section className={styles['historico-section']}>
      <h3>Histórico Emocional</h3>
      <div className={styles['historico-emojis']}>
        {historico.map((e, i) => <span key={i}>{EMOJI[e]}</span>)}
      </div>
      <div className={styles['historico-desc']}>
        Estado atual: <b>{emotion}</b> {EMOJI[emotion]}
      </div>
    </section>
  );
};
export default HistoricoEmocional;
