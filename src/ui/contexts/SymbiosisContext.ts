
import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { GregState } from '../../services/api';

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

export interface SymbiosisContextValue {
  gregState: GregState;
  setMode: (mode: SymbiosisMode) => Promise<void>;
  memory: string[];
  addMemory?: (item?: string) => void;
  missoes: Missao[];
  setMissoes: Dispatch<SetStateAction<Missao[]>>;
  modos: ModoInfo[];
  modeHistory: { modo: SymbiosisMode; data: string }[];
  sugerirModoPorHistorico: () => SymbiosisMode | null;
  mode: SymbiosisMode;
  status: string;
  usoTotal: number;
  lastAnalysis: string;
}

export const SymbiosisContext = createContext<SymbiosisContextValue | undefined>(undefined);


// Como este arquivo agora é .ts, não pode conter JSX. Forneça uma função para criar o valor do contexto.

export function createSymbiosisContextValue(params: {
  gregState: GregState;
  memory: string[];
  setMode: (arg0: SymbiosisMode) => Promise<void>;
  addMemory: (arg0?: string) => void;
  missoes: Missao[];
  setMissoes: Dispatch<SetStateAction<Missao[]>>;
  modos: ModoInfo[];
  modeHistory: { modo: SymbiosisMode; data: string }[];
  sugerirModoPorHistorico: () => SymbiosisMode | null;
}): SymbiosisContextValue {
  return {
    ...params,
    mode: params.gregState.mode as SymbiosisMode,
    status: params.gregState.status,
    usoTotal: params.gregState.usageMetrics?.totalRequests ?? 0,
    lastAnalysis: params.gregState.usageMetrics?.lastAnalysis ?? '',
  };
}

export const useSymbiosis = () => {
  const context = useContext(SymbiosisContext);
  if (context === undefined) {
    throw new Error('useSymbiosis deve ser usado dentro de um SymbiosisProvider');
  }
  return {
    mode: context.gregState.mode as SymbiosisMode,
    status: context.gregState.status,
    usoTotal: context.gregState.usageMetrics?.totalRequests ?? 0,
    lastAnalysis: context.gregState.usageMetrics?.lastAnalysis ?? '',
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
