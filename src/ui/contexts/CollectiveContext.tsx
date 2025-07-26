import React, { createContext, useContext, useState } from 'react';

interface CollectiveContextProps {
  collectiveThoughts: string[];
  shareThought: () => void;
}

const CollectiveContext = createContext<CollectiveContextProps | undefined>(undefined);

export const CollectiveProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [collectiveThoughts, setCollectiveThoughts] = useState<string[]>([]);
  // Função ajustada: adiciona um pensamento padrão para evitar erro de lógica
  const shareThought = () => setCollectiveThoughts(thoughts => [...thoughts, 'Novo pensamento coletivo']);
  return (
    <CollectiveContext.Provider value={{ collectiveThoughts, shareThought }}>
      {children}
    </CollectiveContext.Provider>
  );
};

export function useCollective() {
  const ctx = useContext(CollectiveContext);
  if (!ctx) throw new Error('useCollective deve ser usado dentro do CollectiveProvider');
  return ctx;
}
