import { useState, useEffect } from 'react';
// import { useSymbiosis } from '../contexts'; // Não utilizado
import styles from './SugestoesProativas.module.css';

const SUGESTOES = [
  'Que tal beber um copo d’água agora?',
  'Hora de respirar fundo e relaxar por 1 minuto.',
  'Lembre-se de se alongar um pouco.',
  'Se concentre em uma tarefa importante por 10 minutos.',
  'Faça uma pausa rápida para recarregar a mente.',
  'Parabéns por cuidar de você!'
];

const SugestoesProativas = () => {
  // const { emotion, period } = useSymbiosis(); // Removido: propriedades não disponíveis
  const [sugestao, setSugestao] = useState('');

  useEffect(() => {
    // Sugestão muda conforme emoção e período
    // Blocos removidos: emotion e period não disponíveis no contexto
    setSugestao(SUGESTOES[Math.floor(Math.random() * SUGESTOES.length)]);
  }, []);

  return sugestao ? (
    <div className={styles['sugestao-box']}>
      <b>Sugestão do Greg:</b> {sugestao}
    </div>
  ) : null;
};
export default SugestoesProativas;
