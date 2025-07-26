// import React from 'react';
import { useState } from 'react';
import styles from './DiarioDeAtividades.module.css';

export default function DiarioDeAtividades() {
  const [atividades, setAtividades] = useState<{ descricao: string; data: string }[]>([]);
  const [novaAtividade, setNovaAtividade] = useState('');

  function registrar() {
    if (novaAtividade.trim()) {
      setAtividades([
        ...atividades,
        { descricao: novaAtividade, data: new Date().toLocaleString() }
      ]);
      setNovaAtividade('');
    }
  }

  return (
    <div className={styles.diarioRoot}>
      <h3>Diário de Atividades</h3>
      <div className={styles.inputRow}>
        <input
          value={novaAtividade}
          onChange={e => setNovaAtividade(e.target.value)}
          placeholder="Descreva uma atividade..."
          title="Campo para nova atividade"
          className={styles.input}
        />
        <button onClick={registrar} className={styles.button}>Registrar</button>
      </div>
      <ul className={styles.lista}>
        {atividades.map((a, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.descricao}>{a.descricao}</span>
            <span className={styles.data}>{a.data}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
