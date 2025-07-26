import React, { useContext, useState } from 'react';
import { SymbiosisContext } from '../contexts/SymbiosisContext';
import styles from './ModoEditor.module.css';

interface ModoConfig {
  nome: string;
  cor: string;
  simbolo: string;
  personalidade: string;
  som: string;
}

const MODO_PADRAO: ModoConfig = {
  nome: '',
  cor: '#6ee7b7',
  simbolo: '🌱',
  personalidade: '',
  som: '',
};

const ModoEditor: React.FC = () => {
  const ctx = useContext(SymbiosisContext);
  const [modo, setModo] = useState<ModoConfig>(MODO_PADRAO);
  const [editando, setEditando] = useState<number | null>(null);

  if (!ctx) return null;
  const { modos, setModos } = ctx as any;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvar = () => {
    if (editando !== null) {
      const novos = modos.map((m: any, i: number) => (i === editando ? modo : m));
      setModos(novos);
    } else {
      setModos([...modos, modo]);
    }
    setModo(MODO_PADRAO);
    setEditando(null);
  };

  const handleEditar = (idx: number) => {
    setModo(modos[idx]);
    setEditando(idx);
  };

  const handleRemover = (idx: number) => {
    setModos(modos.filter((_: any, i: number) => i !== idx));
    setModo(MODO_PADRAO);
    setEditando(null);
  };

  return (
    <div className={styles.editorWrap}>
      <h3>Editor de Modos Simbióticos</h3>
      <div className={styles.formRow}>
        <input name="nome" placeholder="Nome do modo" value={modo.nome} onChange={handleChange} />
        <input name="cor" type="color" value={modo.cor} onChange={handleChange} title="Cor do modo" />
        <input name="simbolo" placeholder="Símbolo" value={modo.simbolo} onChange={handleChange} maxLength={2} />
        <input name="personalidade" placeholder="Personalidade" value={modo.personalidade} onChange={handleChange} />
        <input name="som" placeholder="URL do som" value={modo.som} onChange={handleChange} />
        <button onClick={handleSalvar}>{editando !== null ? 'Atualizar' : 'Adicionar'}</button>
      </div>
      <ul className={styles.listaModos}>
        {modos.map((m: ModoConfig, idx: number) => (
          <li key={idx} className={styles.modoItem + ' ' + styles['cor-' + idx]}>
            <span className={styles.simbolo}>{m.simbolo}</span> <b>{m.nome}</b> <span>({m.personalidade})</span>
            <button onClick={() => handleEditar(idx)}>Editar</button>
            <button onClick={() => handleRemover(idx)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModoEditor;
