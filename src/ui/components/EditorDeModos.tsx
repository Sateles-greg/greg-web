import React, { useState } from 'react';
// ...existing code...
import styles from './EditorDeModos.module.css';

interface ModoSimbiotico {
  nome: string;
  cor: string;
  simbolo: string;
  descricao: string;
  tomDeVoz: string;
  som: string;
}

export default function EditorDeModos() {
  const [modo, setModo] = useState<ModoSimbiotico>({
    nome: '',
    cor: '#ffffff',
    simbolo: '',
    descricao: '',
    tomDeVoz: '',
    som: ''
  });

  const [modosSimbioticos, setModosSimbioticos] = useState<ModoSimbiotico[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setModo(prev => ({ ...prev, [name]: value }));
  };

  const salvarModo = async () => {
    try {
      setModosSimbioticos(prev => [...prev, modo]);
      setModo({ nome: '', cor: '#ffffff', simbolo: '', descricao: '', tomDeVoz: '', som: '' });
    } catch (error) {
      console.error('Erro ao salvar modo:', error);
    }
  };

  // Função utilitária para gerar classe de cor
  const corToClass = (cor: string) => {
    if (!cor) return '';
    return `preview-cor-${cor.replace('#','')}`;
  };
  const modoCorToClass = (cor: string) => {
    if (!cor) return '';
    return `modo-cor-${cor.replace('#','')}`;
  };

  return (
    <div className={styles.container}>
      <h1>Editor de Modos Simbióticos</h1>

      <label htmlFor="nome">Nome</label>
      <input id="nome" name="nome" placeholder="Nome" value={modo.nome} onChange={handleChange} />

      <label htmlFor="cor">Cor</label>
      <input id="cor" name="cor" type="color" value={modo.cor} onChange={handleChange} />

      <label htmlFor="simbolo">Símbolo (emoji)</label>
      <input id="simbolo" name="simbolo" placeholder="Símbolo (emoji)" value={modo.simbolo} onChange={handleChange} />

      <label htmlFor="descricao">Descrição</label>
      <textarea id="descricao" name="descricao" placeholder="Descrição" value={modo.descricao} onChange={handleChange} />

      <label htmlFor="tomDeVoz">Tom de Voz</label>
      <input id="tomDeVoz" name="tomDeVoz" placeholder="Tom de Voz" value={modo.tomDeVoz} onChange={handleChange} />

      <label htmlFor="som">Caminho do Som ou Nome</label>
      <input id="som" name="som" placeholder="Caminho do Som ou Nome" value={modo.som} onChange={handleChange} />

      <button onClick={salvarModo}>Salvar Modo</button>

      <h2>Preview em Tempo Real</h2>
      <div className={`${styles.preview} ${corToClass(modo.cor)}`}>
        <h3>{modo.simbolo} {modo.nome}</h3>
        <p>{modo.descricao}</p>
        <p><strong>Tom:</strong> {modo.tomDeVoz}</p>
        <p><strong>Som:</strong> {modo.som}</p>
      </div>

      <h2>Modos Criados</h2>
      <ul>
        {modosSimbioticos.map((m, i) => (
          <li key={i} className={modoCorToClass(m.cor)}>
            <span className={styles.modoCriado}>{m.simbolo} {m.nome}</span> - {m.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}
