import { useEffect } from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';

export default function AutoSugestaoModoAoIniciar() {
  const { sugerirModoPorHistorico, setMode, mode } = useSymbiosis();

  useEffect(() => {
    const modoSugerido = sugerirModoPorHistorico();
    if (modoSugerido && modoSugerido !== mode) {
      setMode(modoSugerido as any); // Garantir tipo
    }
    // Só sugere uma vez ao montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
