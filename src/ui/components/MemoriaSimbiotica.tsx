import React, { useState } from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';
import styles from './MemoriaSimbiotica.module.css';

const MemoriaSimbiotica: React.FC = () => {
  const { memory, addMemory } = useSymbiosis();
  const [novo, setNovo] = useState('');

  function handleAdd() {
    if (novo.trim()) {
      addMemory(novo);
      setNovo('');
    }
  }

  function handleRemove() {
    // Apenas adiciona marcador de remoção para feedback.
    addMemory('[Evento removido]');
  }

  return (
    <section className={styles.memoriaSection}>
      <h3>Memória Simbiótica (editável)</h3>
      <ul className={styles.memoriaList}>
        {memory.map((m, i) => (
          <li key={i} className={styles.memoriaItem}>
            {m} <button onClick={handleRemove} className={styles.memoriaRemove}>remover</button>
          </li>
        ))}
      </ul>
      <input value={novo} onChange={e => setNovo(e.target.value)} placeholder="Novo evento..." className={styles.memoriaInput} />
      <button onClick={handleAdd} className={styles.memoriaButton}>Adicionar</button>
    </section>
  );
};
export default MemoriaSimbiotica;
