import React, { useEffect, useState } from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';
import styles from './SugestoesProativas.module.css';

const SUGESTOES = [
  'Que tal beber um copo d’água agora?',
  'Hora de respirar fundo e relaxar por 1 minuto.',
  'Lembre-se de se alongar um pouco.',
  'Se concentre em uma tarefa importante por 10 minutos.',
  'Faça uma pausa rápida para recarregar a mente.',
  'Parabéns por cuidar de você!'
];

const SugestoesProativas: React.FC = () => {
  const { emotion, period } = useSymbiosis();
  const [sugestao, setSugestao] = useState('');

  useEffect(() => {
    // Sugestão muda conforme emoção e período
    if (emotion === 'cansado' || period === 'madrugada') setSugestao(SUGESTOES[1]);
    else if (emotion === 'feliz') setSugestao(SUGESTOES[5]);
    else if (emotion === 'ansioso') setSugestao(SUGESTOES[3]);
    else setSugestao(SUGESTOES[Math.floor(Math.random() * SUGESTOES.length)]);
  }, [emotion, period]);

  return sugestao ? (
    <div className={styles['sugestao-box']}>
      <b>Sugestão do Greg:</b> {sugestao}
    </div>
  ) : null;
};
export default SugestoesProativas;
