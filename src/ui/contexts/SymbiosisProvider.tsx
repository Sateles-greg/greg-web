import React, { useState, useEffect, useCallback } from 'react';
import { getGregState, setGregMode as apiSetGregMode, GregState } from '../../services/api';
import { registrarModo } from '../../services/memoriaSimbioticaAvancada';
import { SymbiosisContext, SymbiosisMode } from './SymbiosisContext';

export const SymbiosisProvider = ({ children }: { children: React.ReactNode }) => {
  const [gregState, setGregState] = useState<GregState>({
    mode: 'offline',
    status: 'Inicializando...',
    usageMetrics: {
      totalRequests: 0,
      lastAnalysis: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('[Symbiosis] Buscando estado inicial...');
        const data = await getGregState();
        console.log('[Symbiosis] Estado recebido:', data);
        setGregState(data);
      } catch (error) {
        console.error('[Symbiosis] Erro ao buscar estado:', error);
        setGregState(prev => ({ ...prev, status: 'Erro de conexão' }));
      }
    };
    fetchData();
  }, []);

  const setMode = useCallback(async (novoModo: SymbiosisMode) => {
    try {
      setGregState(prev => ({ ...prev, status: `Mudando para ${novoModo}...` }));
      const newState = await apiSetGregMode(novoModo);
      setGregState(newState);
      await registrarModo(novoModo);
    } catch (error) {
      console.error('[Symbiosis] Erro ao mudar modo:', error);
      setGregState(prev => ({ ...prev, status: 'Erro ao atualizar modo' }));
    }
  }, []);

  const contextValue = {
    gregState,
    setMode,
    mode: gregState.mode as SymbiosisMode,
    status: gregState.status,
    usoTotal: gregState.usageMetrics.totalRequests,
    lastAnalysis: gregState.usageMetrics.lastAnalysis,
    // mocks para propriedades obrigatórias do contexto
    memory: [],
    addMemory: () => {},
    missoes: [],
    setMissoes: () => {},
    modos: [],
    modeHistory: [],
    sugerirModoPorHistorico: () => null,
  };

  return (
    <SymbiosisContext.Provider value={contextValue}>
      {children}
    </SymbiosisContext.Provider>
  );
};
