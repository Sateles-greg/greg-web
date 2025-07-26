import { SymbiosisMode } from './SymbiosisContext';

export interface SymbiosisContextProps {
  mode: SymbiosisMode;
  setMode: (mode: SymbiosisMode) => void;
  emotion: string;
  setEmotion: (emotion: string) => void;
  period: string;
  memory: string[];
  addMemory: (msg: string) => void;
  response: string;
  greet: (name: string) => void;
  loading: boolean;
}
