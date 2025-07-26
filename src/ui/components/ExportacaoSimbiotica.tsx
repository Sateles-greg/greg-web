import React, { useContext } from 'react';
import { SymbiosisContext } from '../contexts/SymbiosisContext';
import styles from './ExportacaoSimbiotica.module.css';

const ExportacaoSimbiotica: React.FC = () => {
  const ctx = useContext(SymbiosisContext);
  if (!ctx) return null;
  const { memory, missoes, modos, modeHistory } = ctx;

  const handleExport = () => {
    const data = {
      memoria: memory,
      missoes,
      modos,
      usoModos: modeHistory,
      data: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-simbiotico-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.exportWrap}>
      <h3>Exportação Simbiótica</h3>
      <button onClick={handleExport}>Exportar Relatório JSON</button>
    </div>
  );
};

export default ExportacaoSimbiotica;
