import React, { useState } from 'react';
// ...existing code...
import styles from './PrivacyPanel.module.css';

const defaultSettings = {
  dadosBiomedicos: true,
  comandosVoz: true,
  automacao: true,
  compartilhamento: false,
};

const PrivacyPanel: React.FC = () => {
  const [settings, setSettings] = useState(defaultSettings);

  function toggle(key: keyof typeof defaultSettings) {
    setSettings(s => ({ ...s, [key]: !s[key] }));
  }

  return (
    <section className={styles.privacyPanel}>
      <h3 className={styles.privacyTitle}>Privacidade & Consentimento</h3>
      <ul className={styles.privacyList}>
        <li>
          <label><input type="checkbox" checked={settings.dadosBiomedicos} onChange={()=>toggle('dadosBiomedicos')} /> Dados biomédicos</label>
        </li>
        <li>
          <label><input type="checkbox" checked={settings.comandosVoz} onChange={()=>toggle('comandosVoz')} /> Comandos de voz</label>
        </li>
        <li>
          <label><input type="checkbox" checked={settings.automacao} onChange={()=>toggle('automacao')} /> Automação residencial</label>
        </li>
        <li>
          <label><input type="checkbox" checked={settings.compartilhamento} onChange={()=>toggle('compartilhamento')} /> Compartilhar dados com profissionais</label>
        </li>
      </ul>
    </section>
  );
};
export default PrivacyPanel;
