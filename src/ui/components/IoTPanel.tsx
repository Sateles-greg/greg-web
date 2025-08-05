import React, { useState, useEffect } from 'react';
// ...existing code...
import styles from './IoTPanel.module.css';
import { salvarDispositivoCloud, carregarDispositivosCloud } from '../../services/firebaseService';
import { t } from '../i18n';
// Troque 'pt' por 'en' para testar em inglês
const lang = 'pt';

const DISPOSITIVOS = [
  { nome: t('luz_escritorio', lang), id: 'luz1' },
  { nome: t('tomada_smart', lang), id: 'tomada1' }
];

// Função para tocar sons simples
function playSound(type: 'on' | 'off') {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'triangle';
  o.frequency.value = type === 'on' ? 880 : 220;
  g.gain.value = 0.13;
  o.connect(g); g.connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 0.16);
  setTimeout(() => ctx.close(), 300);
}

const IoTPanel: React.FC = () => {
  const [status, setStatus] = useState<{[id:string]: boolean}>({});

  useEffect(() => {
    carregarDispositivosCloud().then((cloudStatus) => {
      if (cloudStatus && typeof cloudStatus === 'object') setStatus(cloudStatus as {[id:string]: boolean});
    });
  }, []);

  function toggle(id: string) {
    setStatus(s => {
      const novo = {...s, [id]: !s[id]};
      playSound(novo[id] ? 'on' : 'off');
      salvarDispositivoCloud(novo); // Salva status atualizado na nuvem
      return novo;
    });
  }

  return (
    <section className={styles.iotSection} aria-label={t('painel_iot', lang)}>
      <h2 className={styles.iotTitle}>{t('painel_iot', lang)}</h2>
      <ul className={styles.iotList}>
        {DISPOSITIVOS.map(d => (
          <li
            key={d.id}
            className={styles.iotItem}
            tabIndex={0}
            aria-label={`${t('dispositivo', lang)}: ${d.nome}`}
          >
            <span className={styles.iotDevice}>{d.nome}</span>
            <button
              onClick={() => toggle(d.id)}
              className={status[d.id] ? styles.iotButton : styles.iotButtonOff}
              aria-label={status[d.id] ? `${t('desligar', lang)} ${d.nome}` : `${t('ligar', lang)} ${d.nome}`}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >{status[d.id] ? t('ligado', lang) : t('desligado', lang)}</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default IoTPanel;
