import React, { useState } from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';

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
    <section style={{marginTop: '2rem', background:'#f5f5f5', borderRadius:12, padding:20}}>
      <h2>Marketplace de Plugins</h2>
      <ul style={{listStyle:'none', padding:0}}>
        {PLUGINS.map(p => (
          <li key={p.name} style={{marginBottom:16, borderBottom:'1px solid #e0e0e0', paddingBottom:8}}>
            <b>{p.name}</b>: {p.desc}
            {installed.includes(p.name) ? (
              <span style={{color:'#4caf50', marginLeft:12}}>Ativado</span>
            ) : (
              <button onClick={() => handleInstall(p.name)} style={{marginLeft:12, background:'#00bcd4', color:'#fff', border:'none', borderRadius:6, padding:'2px 10px'}}>Ativar</button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Marketplace;
