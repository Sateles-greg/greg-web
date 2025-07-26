import React, { useState } from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';
import styles from './Marketplace.module.css';

const PLUGINS = [
  { name: 'motivacional', desc: 'Frases motivacionais e modo expansão.' },
  { name: 'saude', desc: 'Monitoramento de saúde e dicas de bem-estar.' },
  { name: 'agenda', desc: 'Gerencie compromissos e receba lembretes.' },
  { name: 'diario', desc: 'Diário visual simbiótico: registre marcos e emoções.' },
  { name: 'etica', desc: 'Módulo de ética programável: defina princípios e limites.' },
  { name: 'iot', desc: 'Integração IoT: controle luzes e dispositivos inteligentes.' },
  { name: 'colaborativo', desc: 'Colabore em tempo real com outros usuários Greg.' }
];

const Marketplace: React.FC = () => {
  const { runPlugin } = useSymbiosis();
  const [installed, setInstalled] = useState<string[]>([]);

  function handleInstall(name: string) {
    setInstalled(list => [...list, name]);
    runPlugin(name);
  }

  return (
    <section className={styles['market-section']}>
      <h2>Marketplace de Plugins</h2>
      <ul className={styles['market-list']}>
        {PLUGINS.map(p => (
          <li key={p.name} className={styles['market-list-item']}>
            <b>{p.name}</b>: {p.desc}
            {installed.includes(p.name) ? (
              <span className={styles['market-active']}>Ativado</span>
            ) : (
              <button onClick={() => handleInstall(p.name)} className={styles['market-btn']}>Ativar</button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Marketplace;
