import { useCallback } from 'react';
import { simularDecisao, analisarSentimento } from '../services/secureGregAI';

export function useGregAI() {
  const simular = useCallback(async (acao: string) => {
    return await simularDecisao(acao);
  }, []);

  const analisar = useCallback(async (texto: string) => {
    return await analisarSentimento(texto);
  }, []);

  return { simular, analisar };
}
