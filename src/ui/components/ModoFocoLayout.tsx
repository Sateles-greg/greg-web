import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { GiHealthNormal, GiSpiralArrow, GiBrain } from 'react-icons/gi';
import { BsGraphUpArrow } from 'react-icons/bs';
import styles from './ModoFocoLayout.module.css';
import ModoBaseLayout from './ModoBaseLayout';
import { useSymbiosis } from '../contexts/SymbiosisContext';

const ModoFocoLayout: React.FC = () => {
  useSymbiosis();
  return (
    <ModoBaseLayout corPrimaria="#0c0c1f" simbolo="🧠" nomeModo="Foco" descricao="Modo de atenção profunda e clareza mental.">
      <div className={styles['foco-layout-root']}>
        {/* Avatar energético animado */}
        <div className={styles['foco-avatar']} />
        {/* Botões Foco */}
        <div className={styles['foco-actions']}>
          <button className={styles['foco-button']}><GiHealthNormal /> Saúde</button>
          <button className={styles['foco-button']}><GiBrain /> Criatividade</button>
          <button className={styles['foco-button']}><GiSpiralArrow /> Emoções</button>
          <button className={styles['foco-button']}><BsGraphUpArrow /> Estratégia</button>
        </div>
        {/* Caixa de entrada multimodal */}
        <div className={styles['foco-input-panel']}>
          <textarea className={styles['foco-textarea']} placeholder="Fale com Greg..." />
          <label className={styles['foco-file-label']} htmlFor="foco-file">Arquivo multimodal</label>
          <input id="foco-file" type="file" className={styles['foco-file']} />
          <div className={styles['foco-mic-btn-wrap']}>
            <button className={styles['foco-mic-btn']} title="Ativar microfone"><FaMicrophone size={24} color="#fff" /></button>
          </div>
        </div>
      </div>
    </ModoBaseLayout>
  );
}

export default ModoFocoLayout;
