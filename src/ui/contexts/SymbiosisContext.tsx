import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getGregState, setGregMode as apiSetGregMode, GregState } from '../../services/api';
import {
  registrarModo,
  recuperarSimbioticos,
  registrarSimbiotico,
  recuperarRegistros,
  sugerirModoPorHistorico
} from '../../services/memoriaSimbioticaAvancada';

// O tipo do modo permanece o mesmo
export type SymbiosisMode =
  | 'zen'
  | 'estrategia'
  | 'criativo'
  | 'emocional'
  | 'noturno'
  | 'foco'
  | 'expansao'
  | 'reparo'
  | 'sombra'
  | 'guardiao'
  | 'offline';

export interface Missao {
  id: string;
  modo: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  dataCriacao: number;
  dataConclusao?: number;
}

interface ModoInfo {
  nome: string;
  descricao: string;
}

interface SymbiosisContextValue {
  gregState: GregState;
  setMode: (novoModo: SymbiosisMode) => Promise<void>;
  memory: string[];
  addMemory: (novoItem?: string) => void;
  missoes: Missao[];
  setMissoes: React.Dispatch<React.SetStateAction<Missao[]>>;
  modos: ModoInfo[];
  modeHistory: { modo: SymbiosisMode; data: string }[];
  sugerirModoPorHistorico: () => SymbiosisMode | null;
}

// O Contexto é criado aqui, mas não é exportado diretamente para manter a consistência.
export const SymbiosisContext = createContext<SymbiosisContextValue | undefined>(undefined);

// O Provider é o componente que vai envolver a aplicação.
export const SymbiosisProvider = ({ children }: { children: React.ReactNode }) => {
  const [gregState, setGregState] = useState<GregState>({
    mode: 'offline',
    status: 'Inicializando...',
    // activeModules removido pois não existe em GregState
    usageMetrics: {
      totalRequests: 0,
      lastAnalysis: '',
    },
  });
  const [memory, setMemory] = useState<string[]>(() => {
    try {
      return recuperarSimbioticos().map((r) => r.conteudo);
    } catch {
      return [];
    }
  });
  const [missoes, setMissoes] = useState<Missao[]>(() => {
    try {
      const raw = localStorage.getItem('greg_missoes');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [modeHistory, setModeHistory] = useState<{ modo: SymbiosisMode; data: string }[]>(() => {
    try {
      return recuperarRegistros();
    } catch {
      return [];
    }
  });

  // Modos disponíveis
  const modos: ModoInfo[] = [
    { nome: 'zen', descricao: 'Relaxamento e meditação' },
    { nome: 'estrategia', descricao: 'Planejamento estratégico' },
    { nome: 'criativo', descricao: 'Criatividade e inovação' },
    { nome: 'emocional', descricao: 'Análise emocional' },
    { nome: 'noturno', descricao: 'Uso noturno' },
    { nome: 'foco', descricao: 'Concentração máxima' },
    { nome: 'expansao', descricao: 'Crescimento e aprendizado' },
    { nome: 'reparo', descricao: 'Manutenção e ajustes' },
    { nome: 'sombra', descricao: 'Aspectos ocultos' },
    { nome: 'guardiao', descricao: 'Proteção e segurança' },
    { nome: 'offline', descricao: 'Desconectado' },
  ];

  // Persistência das missões
  useEffect(() => {
    localStorage.setItem('greg_missoes', JSON.stringify(missoes));
  }, [missoes]);

  // Atualizar histórico de modos ao registrar novo modo
  const setMode = useCallback(async (novoModo: SymbiosisMode) => {
    try {
      setGregState(prevState => ({ ...prevState, status: `Atualizando para ${novoModo}...` }));
      const newState = await apiSetGregMode(novoModo);
      setGregState(newState);
      await registrarModo(novoModo);
      setModeHistory(recuperarRegistros());
    } catch (error) {
      console.error("Falha ao mudar o modo:", error);
      setGregState(prevState => ({ ...prevState, status: 'Erro ao atualizar modo' }));
    }
  }, []);

  // Funções de memória simbiótica
  const addMemory = (item?: string) => {
    if (item && item.trim()) {
      registrarSimbiotico({ tipo: 'aprendizado', conteudo: item, data: new Date().toISOString() });
      setMemory(recuperarSimbioticos().map((r) => r.conteudo));
    }
  };

  return (
    <SymbiosisContext.Provider
      value={{
        gregState,
        setMode,
        memory,
        addMemory,
        missoes,
        setMissoes,
        modos,
        modeHistory,
        sugerirModoPorHistorico,
      }}
    >
      {children}
    </SymbiosisContext.Provider>
  );
};

// O hook customizado para consumir o contexto. Esta é a única forma de acessar o estado.
export const useSymbiosis = () => {
  const context = useContext(SymbiosisContext);
  if (context === undefined) {
    throw new Error('useSymbiosis deve ser usado dentro de um SymbiosisProvider');
  }
  // "Achatando" o contexto para os componentes
  return {
    mode: context.gregState.mode as SymbiosisMode,
    status: context.gregState.status,
    usoTotal: context.gregState.usageMetrics?.totalRequests ?? 0,
    lastAnalysis: context.gregState.usageMetrics?.lastAnalysis ?? '',
    // activeModules removido pois não existe em GregState
    setMode: context.setMode,
    memory: context.memory,
    addMemory: context.addMemory,
    missoes: context.missoes,
    setMissoes: context.setMissoes,
    modos: context.modos,
    modeHistory: context.modeHistory,
    sugerirModoPorHistorico: context.sugerirModoPorHistorico,
  };
};
