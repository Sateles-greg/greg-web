import React, { useContext, useState } from 'react';
import { SymbiosisContext } from '../contexts/SymbiosisContext';
import styles from './MissoesPanel.module.css';
import { v4 as uuidv4 } from 'uuid';

const MissoesPanel: React.FC = () => {
  const ctx = useContext(SymbiosisContext);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [modo, setModo] = useState('');
  if (!ctx) return null;
  const { missoes, setMissoes, modos } = ctx;

  const handleAdd = () => {
    if (!titulo || !modo) return;
    setMissoes([
      ...missoes,
      {
        id: uuidv4(),
        modo,
        titulo,
        descricao,
        concluida: false,
        dataCriacao: Date.now(),
      },
    ]);
    setTitulo('');
    setDescricao('');
    setModo('');
  };

  const handleToggle = (id: string) => {
    setMissoes(missoes.map(m => m.id === id ? { ...m, concluida: !m.concluida, dataConclusao: m.concluida ? undefined : Date.now() } : m));
  };

  const handleRemove = (id: string) => {
    setMissoes(missoes.filter(m => m.id !== id));
  };

  return (
    <div className={styles.panelWrap}>
      <h3>Missões/Intenções Simbióticas</h3>
      <div className={styles.formRow}>
        <input placeholder="Título da missão" value={titulo} onChange={e => setTitulo(e.target.value)} />
        <select value={modo} onChange={e => setModo(e.target.value)} title="Modo da missão" aria-label="Modo da missão">
          <option value="">Modo</option>
          {modos.map((m, i) => <option key={i} value={m.nome}>{m.nome}</option>)}
        </select>
        <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <button onClick={handleAdd}>Adicionar</button>
      </div>
      <ul className={styles.listaMissoes}>
        {missoes.map((m) => (
          <li key={m.id} className={m.concluida ? styles.concluida : ''}>
            <b>{m.titulo}</b> <span>({m.modo})</span> <small>{m.descricao}</small>
            <button onClick={() => handleToggle(m.id)}>{m.concluida ? 'Reabrir' : 'Concluir'}</button>
            <button onClick={() => handleRemove(m.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissoesPanel;
