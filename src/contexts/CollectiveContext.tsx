import React, { createContext, useContext, useState } from 'react';

interface CollectiveContextProps {
  collectiveThoughts: string[];
  shareThought: (msg: string) => void;
}

const CollectiveContext = createContext<CollectiveContextProps | undefined>(undefined);

export const CollectiveProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [collectiveThoughts, setCollectiveThoughts] = useState<string[]>([]);
  const shareThought = (msg: string) => setCollectiveThoughts(thoughts => [...thoughts, msg]);
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
