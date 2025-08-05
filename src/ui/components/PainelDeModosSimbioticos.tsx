import { useSymbiosis, SymbiosisMode } from '../contexts';
import styles from './PainelDeModosSimbioticos.module.css';

// Lista de modos disponíveis para seleção na UI
const modosDisponiveis: { key: SymbiosisMode; nome: string; simbolo: string }[] = [
    { key: 'zen', nome: 'Zen', simbolo: '🌱' },
    { key: 'estrategia', nome: 'Estratégia', simbolo: '♟️' },
    { key: 'criativo', nome: 'Criativo', simbolo: '🎨' },
    { key: 'foco', nome: 'Foco', simbolo: '🎯' },
    { key: 'expansao', nome: 'Expansão', simbolo: '🌌' },
    { key: 'reparo', nome: 'Reparo', simbolo: '🛠️' },
    { key: 'sombra', nome: 'Sombra', simbolo: '🦇' },
    { key: 'guardiao', nome: 'Guardião', simbolo: '🛡️' },
    { key: 'noturno', nome: 'Noturno', simbolo: '🌙' },
];

import { useState } from 'react';

export default function PainelDeModosSimbioticos() {
  const { mode: modoAtivo, setMode } = useSymbiosis();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSetMode = async (key: SymbiosisMode) => {
    setLoading(key);
    await setMode(key);
    setTimeout(() => setLoading(null), 350); // Simula feedback visual
  };

  return (
    <div className={styles.painelContainer}>
      <h3 className={styles.titulo}>Modos Simbióticos</h3>
      <div className={styles.listaDeModos}>
        {modosDisponiveis.map((modo) => (
          <button
            key={modo.key}
            onClick={() => handleSetMode(modo.key)}
            className={`${styles.botaoModo} ${modoAtivo === modo.key ? styles.ativo : ''}`}
            tabIndex={0}
            aria-busy={loading === modo.key}
            disabled={loading !== null}
          >
            <span className={styles.simbolo}>{modo.simbolo}</span>
            <span className={styles.nome}>{modo.nome}</span>
            {loading === modo.key && <span style={{marginLeft: 8, fontSize: '0.9em'}}>...</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
