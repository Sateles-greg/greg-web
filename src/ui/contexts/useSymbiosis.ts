import { useContext } from 'react';
import { SymbiosisContext } from './SymbiosisContext';

export const useSymbiosis = () => {
  const context = useContext(SymbiosisContext);

  if (!context) {
    throw new Error(
      'useSymbiosis deve ser usado dentro de um SymbiosisProvider'
    );
  }

  return context;
};
