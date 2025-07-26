import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { responderComoGreg } from '../services/gregResponder';
import { gerarRespostaGPT4o } from '../services/gpt4oService';
import { getPeriod } from '../services/gregAPI';
import { Emotion } from '../services/emotionService';
import { getSimulatedSensorData, SensorData } from '../services/sensorService';
import {
  registrarModo,
  recuperarRegistros,
  contarModosMaisUsados,
  sugerirModoPorHistorico,
  gerarDadosParaGrafico,
  exportarRelatorioSimbiotico
} from '../services/memoriaSimbioticaAvancada';

export type SymbiosisMode = 'zen' | 'estrategia' | 'criativo' | 'emocional' | 'noturno' | 'foco' | 'expansao' | 'reparo' | 'sombra' | 'guardiao';

export interface CommandHistoryItem {
  text: string;
  timestamp: number;
  type: 'user' | 'greg';
}

interface ModoCustom {
  nome: string;
  cor: string;
  simbolo: string;
  personalidade: string;
  som: string;
}

export interface MissaoSimbiotica {
  id: string;
  modo: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  dataCriacao: number;
  dataConclusao?: number;
}

interface SymbiosisContextProps {
  gerarRespostaSimbiotica: () => Promise<string>;
  gerarRespostaSimbioticaReal: () => Promise<string>;
  runPlugin: () => void;
  mode: SymbiosisMode;
  setMode: (novoModo: SymbiosisMode) => Promise<void>;
  emotion: Emotion;
  period: string;
  memory: string[];
  addMemory: () => void;
  response: string;
  greet: () => void;
  loading: boolean;
  sensorData: SensorData;
  commandHistory: CommandHistoryItem[];
  addCommandHistory: () => void;
  personality: string;
  modeHistory: Record<string, number>;
  mostUsedMode: string;
  modos: ModoCustom[];
  setModos: React.Dispatch<React.SetStateAction<ModoCustom[]>>;
  missoes: MissaoSimbiotica[];
  setMissoes: React.Dispatch<React.SetStateAction<MissaoSimbiotica[]>>;
  registrarModo: (modo: SymbiosisMode) => Promise<void>;
  recuperarRegistros: () => any[]; // TODO: implementar ou remover se não utilizado
  contarModosMaisUsados: () => Record<string, number>;
  sugerirModoPorHistorico: () => string | null;
  gerarDadosParaGrafico: () => any;
  exportarRelatorioSimbiotico: () => string;
}

export const SymbiosisContext = createContext<SymbiosisContextProps | undefined>(undefined);

// Função para carregar plugins dinamicamente
async function loadPlugin() {
  try {
    // @vite-ignore
    // Nenhum parâmetro utilizado
  } catch {
    // Plugin não encontrado ou erro
  }
}

export const SymbiosisProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [mode] = useState<SymbiosisMode>('zen');
  const [emotion] = useState<Emotion>('neutro');
  const [period] = useState(getPeriod());
  const [memory] = useState<string[]>([]);
  const [response] = useState('');
  const [loading] = useState(false);
  const [sensorData] = useState<SensorData>({});
  const [commandHistory] = useState<CommandHistoryItem[]>([]);
  // Memória emocional dinâmica: histórico de modos
  const [modeHistory, setModeHistory] = useState<Record<string, number>>({ zen: 1 });
  const [mostUsedMode, setMostUsedMode] = useState<string>('zen');
  // Modos customizados (editáveis)
  const [modos, setModos] = useState<ModoCustom[]>([
    { nome: 'Zen', cor: '#6ee7b7', simbolo: '🌱', personalidade: 'Tranquilo', som: '' },
    { nome: 'Estratégia', cor: '#fbbf24', simbolo: '♟️', personalidade: 'Focado', som: '' },
    { nome: 'Expansão', cor: '#818cf8', simbolo: '🌌', personalidade: 'Explorador', som: '' },
    { nome: 'Criativo', cor: '#f472b6', simbolo: '🎨', personalidade: 'Inventivo', som: '' },
    { nome: 'Emocional', cor: '#f87171', simbolo: '💓', personalidade: 'Sensível', som: '' },
    { nome: 'Noturno', cor: '#64748b', simbolo: '🌙', personalidade: 'Reflexivo', som: '' },
    { nome: 'Reparo', cor: '#a3e635', simbolo: '🛠️', personalidade: 'Cuidadoso', som: '' },
    { nome: 'Sombra', cor: '#a78bfa', simbolo: '🦇', personalidade: 'Misterioso', som: '' },
    { nome: 'Guardião', cor: '#facc15', simbolo: '🛡️', personalidade: 'Protetor', som: '' },
  ]);
  // Missões simbióticas por modo
  const [missoes, setMissoes] = useState<MissaoSimbiotica[]>([]);

  // setMode simbiótico: registra toda troca de modo
  const setMode = useCallback(async (novoModo: SymbiosisMode) => {
    // Atualiza o modo e registra
    // Se necessário, pode adicionar lógica para atualizar o estado do modo
    await registrarModo(novoModo);
  }, []); // TODO: dependências podem ser ajustadas se necessário

  // Função para gerar resposta simbiótica via GPT-4o (simulada)
  const gerarRespostaSimbiotica = async () => {
    return await gerarRespostaGPT4o('', mode, emotion);
  };
  // Função para gerar resposta simbiótica real via GPT-4o
  const gerarRespostaSimbioticaReal = async () => {
    return await responderComoGreg('', mode);
  };
  // Personalidade adaptativa por modo
  const personalityMap: Record<SymbiosisMode, string> = {
    zen: 'calmo, gentil, meditativo',
    foco: 'direto, conciso, técnico',
    expansao: 'provocativo, criativo, visionário',
    estrategia: 'analítico, objetivo, estratégico',
    criativo: 'imaginativo, lúdico, inovador',
    emocional: 'empático, sensível, acolhedor',
    noturno: 'silencioso, introspectivo, sereno',
    reparo: 'cuidadoso, restaurador, protetor',
    sombra: 'profundo, reflexivo, misterioso',
    guardiao: 'protetor, vigilante, seguro',
  };
  const personality = personalityMap[mode] || 'neutro';

  const addCommandHistory = useCallback(() => {
    // Parâmetro removido, ajuste conforme uso real
  }, []);

  const addMemory = useCallback(() => {
    // Parâmetro removido, ajuste conforme uso real
  }, []);

  // Atualiza histórico de modos e modo mais usado
  const updateModeHistory = useCallback((newMode: string) => {
    setModeHistory(hist => {
      const updated = { ...hist, [newMode]: (hist[newMode] || 0) + 1 };
      // Descobre o modo mais usado
      const sorted = Object.entries(updated).sort((a, b) => b[1] - a[1]);
      setMostUsedMode(sorted[0][0]);
      return updated;
    });
  }, []);

  // Hook para atualizar histórico ao mudar de modo
  useEffect(() => {
    updateModeHistory(mode);
    // Sempre registra modo ao iniciar
    registrarModo(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, updateModeHistory]); // TODO: dependências podem ser ajustadas se necessário

  const greet = useCallback(() => {
    // Parâmetro removido, ajuste conforme uso real
  }, [mode, period, addMemory, addCommandHistory, personality]);

  useEffect(() => {
    // Removido setPeriod, pois não existe mais setter
    const timer = setInterval(() => {}, 60000);
    return () => clearInterval(timer);
  }, []);
  // Atualização periódica dos sensores simulados
  useEffect(() => {
    const interval = setInterval(() => {
      const data = getSimulatedSensorData();
      // Removido setSensorData, pois não existe mais setter
      // Sensores simbióticos: muda modo automaticamente
      if (data.heartRate && data.heartRate > 95 && mode !== 'reparo') setMode('reparo');
      else if (data.attention && data.attention > 80 && mode !== 'foco') setMode('foco');
      else if (data.soundLevel && data.soundLevel > 60 && mode !== 'noturno') setMode('noturno');
    }, 3000);
    return () => clearInterval(interval);
  }, [mode, setMode]);

  // Função para rodar plugin
  const runPlugin = () => {
    loadPlugin();
  };

  return (
    <SymbiosisContext.Provider value={{
      mode,
      setMode,
      emotion,
      // Removido setEmotion, pois não existe mais setter
      period,
      memory,
      addMemory,
      response,
      greet,
      loading,
      sensorData,
      runPlugin,
      commandHistory,
      addCommandHistory,
      personality,
      modeHistory,
      mostUsedMode,
      modos,
      setModos,
      missoes,
      setMissoes,
      gerarRespostaSimbiotica,
      gerarRespostaSimbioticaReal,
      registrarModo,
      recuperarRegistros,
      contarModosMaisUsados,
      sugerirModoPorHistorico,
      gerarDadosParaGrafico,
      exportarRelatorioSimbiotico
    }}>
      {children}
    </SymbiosisContext.Provider>
  );
}

export function useSymbiosis() {
  const ctx = useContext(SymbiosisContext);
  if (!ctx) throw new Error('useSymbiosis deve ser usado dentro do SymbiosisProvider');
  return ctx;
}
