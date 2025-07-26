// Função para carregar plugins dinamicamente
async function loadPlugin(name: string, context: any) {
  try {
    const plugin = await import(`../plugins/${name}`);
    if (plugin && plugin.default) plugin.default(context);
  } catch (e) {
    // Plugin não encontrado ou erro
  }
}
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getSymbioticResponse, getPeriod } from '../services/gregAPI';
import { detectEmotion, Emotion } from '../services/emotionService';
import { getSimulatedSensorData, SensorData } from '../services/sensorService';

export type SymbiosisMode = 'foco' | 'expansao' | 'reparo' | 'sombra' | 'guardiao';

export interface CommandHistoryItem {
  text: string;
  timestamp: number;
  type: 'user' | 'greg';
}

interface SymbiosisContextProps {
  runPlugin: (name: string) => void;
  mode: SymbiosisMode;
  setMode: (mode: SymbiosisMode) => void;
  emotion: Emotion;
  setEmotion: (emotion: Emotion) => void;
  period: string;
  memory: string[];
  addMemory: (msg: string) => void;
  response: string;
  greet: (name: string) => void;
  loading: boolean;
  sensorData: SensorData;
  commandHistory: CommandHistoryItem[];
  addCommandHistory: (item: CommandHistoryItem) => void;
}

const SymbiosisContext = createContext<SymbiosisContextProps | undefined>(undefined);

export const SymbiosisProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [mode, setMode] = useState<SymbiosisMode>('foco');
  const [emotion, setEmotion] = useState<Emotion>('neutro');
  const [period, setPeriod] = useState(getPeriod());
  const [memory, setMemory] = useState<string[]>([]);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>({});
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);

  const addCommandHistory = useCallback((item: CommandHistoryItem) => {
    setCommandHistory(hist => [...hist, item]);
  }, []);

  const addMemory = useCallback((msg: string) => {
    setMemory(mem => [...mem, msg]);
  }, []);

  const greet = useCallback((name: string) => {
    setLoading(true);
    addCommandHistory({ text: name, timestamp: Date.now(), type: 'user' });
    setTimeout(() => {
      const resp = getSymbioticResponse(name, period, mode);
      setResponse(resp);
      addMemory(resp);
      setEmotion(detectEmotion(resp));
      addCommandHistory({ text: resp, timestamp: Date.now(), type: 'greg' });
      setLoading(false);
    }, 800);
  }, [mode, period, addMemory, addCommandHistory]);

  useEffect(() => {
    const timer = setInterval(() => setPeriod(getPeriod()), 60000);
    return () => clearInterval(timer);
  }, []);
  // Atualização periódica dos sensores simulados
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(getSimulatedSensorData());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Função para rodar plugin
  const runPlugin = (name: string) => {
    loadPlugin(name, { mode, setMode, emotion, setEmotion, period, memory, addMemory, response, greet, loading, sensorData });
  };
  return (
    <SymbiosisContext.Provider value={{ mode, setMode, emotion, setEmotion, period, memory, addMemory, response, greet, loading, sensorData, runPlugin, commandHistory, addCommandHistory }}>
      {children}
    </SymbiosisContext.Provider>
  );
};

export function useSymbiosis() {
  const ctx = useContext(SymbiosisContext);
  if (!ctx) throw new Error('useSymbiosis deve ser usado dentro do SymbiosisProvider');
  return ctx;
}
