import React from 'react';
import { FaMicrophone, FaRegCircle, FaMusic } from 'react-icons/fa';
import { MdSelfImprovement } from 'react-icons/md';
import { IoMdCloudyNight } from 'react-icons/io';
import styles from './ModoZenLayout.module.css';
import ModoBaseLayout from './ModoBaseLayout';

const ModoZenLayout: React.FC = () => {
  return (
    <ModoBaseLayout corPrimaria="linear-gradient(135deg, #fcecd4, #fcd6c2, #d3f1c7)" simbolo="🌿" nomeModo="Zen" descricao="Interação com serenidade e presença.">
      <div className={styles.zenLayoutRoot}>
        {/* Avatar animado */}
        <div className={styles.zenAvatar} />
        {/* Botões Zen */}
        <div className={styles.zenActions}>
          <button className="zen-button"><MdSelfImprovement /> Meditation</button>
          <button className="zen-button"><IoMdCloudyNight /> Breathwork</button>
          <button className="zen-button"><FaRegCircle /> Empty Space</button>
          <button className="zen-button"><FaMusic /> Therapeutic Sounds</button>
        </div>
        {/* Intenção simbiótica removida: componente não encontrado */}
        {/* Caixa de entrada multimodal */}
        <div className={styles.zenInputPanel}>
          <textarea className={styles.zenTextarea} placeholder="Escreva algo para o Greg..." />
          <label className={styles.zenFileLabel} htmlFor="zen-file">Arquivo multimodal</label>
          <input id="zen-file" type="file" className={styles.zenFile} title="Selecionar arquivo multimodal" />
          <div className={styles.zenMicBtnWrap}>
            <button className={styles.zenMicBtn} title="Ativar microfone"><FaMicrophone size={24} color="#2a6442" /></button>
          </div>
        </div>
      </div>
      {/* Estilos migrados para CSS Modules */}
    </ModoBaseLayout>
  );
}
export default ModoZenLayout;
