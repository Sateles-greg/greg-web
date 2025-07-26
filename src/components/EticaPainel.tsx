import React, { useState, useEffect } from 'react';
import styles from './EticaPainel.module.css';
import { salvarPrincipioCloud, carregarPrincipiosCloud, removerPrincipioCloud } from '../services/firebaseService';



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

const EticaPainel: React.FC = () => {
  const [principios, setPrincipios] = useState<string[]>([]);
  const [novo, setNovo] = useState('');

  useEffect(() => {
    carregarPrincipiosCloud().then(p => setPrincipios(Array.isArray(p) ? (p as string[]) : []));
  }, []);

  async function adicionar() {
    if (novo.trim()) {
      setPrincipios(p => [...p, novo]);
      setNovo('');
      playSound('add');
      await salvarPrincipioCloud(novo);
    }
  }
  async function remover(idx: number) {
    const principio = principios[idx];
    setPrincipios(p => p.filter((_, i) => i !== idx));
    playSound('remove');
    await removerPrincipioCloud(principio);
  }

  return (
    <section className={styles.eticaSection} aria-label="Painel de Ética Programável">
      <h2 className={styles.eticaTitle}>Painel de Ética Programável</h2>
      <form className={styles.eticaForm} onSubmit={e => { e.preventDefault(); adicionar(); }} aria-label="Adicionar princípio ético">
        <input
          value={novo}
          onChange={e => setNovo(e.target.value)}
          placeholder="Novo princípio..."
          className={styles.eticaInput}
          aria-label="Novo princípio"
        />
        <button
          type="submit"
          className={styles.eticaButton}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >Adicionar</button>
      </form>
      <ul className={styles.eticaList}>
        {principios.length === 0 && (
          <li className={styles.eticaEmpty}>Nenhum princípio definido ainda.</li>
        )}
        {principios.map((p, i) => (
          <li
            key={i}
            className={styles.eticaItem}
            tabIndex={0}
            aria-label={`Princípio: ${p}`}
          >
            <span className={styles.eticaPrincipio}>{p}</span>
            <button
              onClick={() => remover(i)}
              className={styles.eticaRemove}
              aria-label={`Remover princípio: ${p}`}
              title="Remover princípio"
              onMouseOver={e => e.currentTarget.style.color = '#b71c1c'}
              onMouseOut={e => e.currentTarget.style.color = '#f44336'}
            >×</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default EticaPainel;
