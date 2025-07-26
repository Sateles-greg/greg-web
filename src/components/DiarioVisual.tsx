import React, { useState, useEffect } from 'react';
import styles from './DiarioVisual.module.css';
import { salvarEventoCloud, carregarEventosCloud } from '../services/firebaseService';

// Função para tocar sons simples
function playSound(type: 'add' | 'remove') {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'triangle';
  o.frequency.value = type === 'add' ? 660 : 330;
  g.gain.value = 0.12;
  o.connect(g); g.connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 0.18);
  setTimeout(() => ctx.close(), 300);
}

// Sugere emoção via OpenAI API (usando variável de ambiente)
async function sugerirEmocao(nota: string): Promise<string> {
  if (!nota.trim()) return 'neutro';
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) return 'neutro';
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{role:'system', content:'Classifique a emoção principal do texto em uma palavra (feliz, cansado, ansioso, motivado, neutro, irritado). Responda só a palavra.'}, {role:'user', content: nota}]
      })
    });
    const data = await res.json();
    const resposta = data.choices?.[0]?.message?.content?.toLowerCase() || 'neutro';
    return EMOCOES.includes(resposta) ? resposta : 'neutro';
  } catch {
    return 'neutro';
  }
}

interface Evento {
  data: string;
  emocao: string;
  nota: string;
}

const EMOCOES = ['feliz', 'cansado', 'ansioso', 'motivado', 'neutro', 'irritado'];

const DiarioVisual: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [emocao, setEmocao] = useState('neutro');
  const [nota, setNota] = useState('');
  const data = new Date().toLocaleDateString();


  useEffect(() => {
    carregarEventosCloud().then(evts => setEventos(Array.isArray(evts) ? (evts as Evento[]) : []));
  }, []);

  async function adicionarEvento() {
    let emocaoFinal = emocao;
    if (nota && emocao === 'neutro') {
      emocaoFinal = await sugerirEmocao(nota);
    }
    const novoEvento = { data, emocao: emocaoFinal, nota };
    setEventos(evts => [...evts, novoEvento]);
    setNota('');
    playSound('add');
    await salvarEventoCloud(novoEvento);
  }

  function removerEvento(idx: number) {
    setEventos(evts => evts.filter((_, i) => i !== idx));
    playSound('remove');
    // (Opcional: implementar remoção cloud)
  }

  return (
    <section className={styles.diarioSection} aria-label="Diário Visual Simbiótico">
      <h2 className={styles.diarioTitle}>Diário Visual Simbiótico</h2>
      <form className={styles.diarioForm} onSubmit={e => { e.preventDefault(); adicionarEvento(); }} aria-label="Adicionar evento ao diário">
        <label htmlFor="emocao" className={styles.diarioLabel}>Emoção:</label>
        <select
          id="emocao"
          value={emocao}
          onChange={e => setEmocao(e.target.value)}
          className={styles.diarioSelect}
          aria-label="Selecionar emoção"
        >
          {EMOCOES.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        <input
          value={nota}
          onChange={e => setNota(e.target.value)}
          placeholder="Nota ou evento..."
          className={styles.diarioInput}
          aria-label="Nota ou evento"
        />
        <button
          type="submit"
          className={styles.diarioButton}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >Adicionar</button>
      </form>
      <ul className={styles.diarioList}>
        {eventos.length === 0 && (
          <li className={styles.diarioEmpty}>Nenhum evento registrado ainda.</li>
        )}
        {eventos.map((ev, i) => (
          <li
            key={i}
            className={styles.diarioItem}
            tabIndex={0}
            aria-label={`Evento de ${ev.data}: ${ev.emocao}, ${ev.nota}`}
          >
            <span>
              <b className={styles.diarioData}>{ev.data}</b> — <span className={styles.diarioEmocao}>{ev.emocao}</span>: {ev.nota}
            </span>
            <button
              onClick={() => removerEvento(i)}
              className={styles.diarioRemove}
              aria-label={`Remover evento de ${ev.data}`}
              title="Remover evento"
              onMouseOver={e => e.currentTarget.style.color = '#b71c1c'}
              onMouseOut={e => e.currentTarget.style.color = '#f44336'}
            >×</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default DiarioVisual;
