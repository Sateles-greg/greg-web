import React, { useState, useEffect } from 'react';
// ...existing code...
import { biomedDataService } from '../../biomed/biomedDataService';
import styles from './BiomedStatusPanel.module.css';

interface BiomedStatus {
  exames: string[];
  consultas: string[];
  cirurgias: string[];
  medicacoes: string[];
  alergias: string[];
  historicoFamiliar: string[];
  fontes: string[];
  consentimento: boolean;
  atualizadoEm: string;
}

interface BiosensorData {
  frequenciaCardiaca: number;
  oxigenacao: number;
  temperatura: number;
  sono: string;
  atividadeFisica: string;
  glicemia: number;
  pressaoArterial: string;
  timestamp: string;
}

const BiomedStatusPanel: React.FC<{ userId?: string }> = ({ userId = 'demo' }) => {
  const [history, setHistory] = useState<BiomedStatus | null>(null);
  const [biosensor, setBiosensor] = useState<BiosensorData | null>(null);

  useEffect(() => {
    biomedDataService.getUnifiedMedicalHistory().then(setHistory);
    const interval = setInterval(() => {
      biomedDataService.getRealtimeBiosensorData().then(setBiosensor);
    }, 3000);
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <section className={styles.biomedPanel}>
      <h3 className={styles.biomedTitle}>Status Biomédico</h3>
      {history && (
        <div className={styles.biomedHistory}>
          <div><b>Exames:</b> {history.exames.join(', ')}</div>
          <div><b>Consultas:</b> {history.consultas.join(', ')}</div>
          <div><b>Cirurgias:</b> {history.cirurgias.join(', ')}</div>
          <div><b>Medicações:</b> {history.medicacoes.join(', ')}</div>
          <div><b>Alergias:</b> {history.alergias.join(', ')}</div>
          <div><b>Hist. Familiar:</b> {history.historicoFamiliar.join(', ')}</div>
          <div><b>Fontes:</b> {history.fontes.join(', ')}</div>
          <div><b>Consentimento:</b> {history.consentimento ? 'Sim' : 'Não'}</div>
        </div>
      )}
      {biosensor && (
        <div>
          <div><b>Frequência Cardíaca:</b> {biosensor.frequenciaCardiaca} bpm</div>
          <div><b>Oxigenação:</b> {biosensor.oxigenacao}%</div>
          <div><b>Temperatura:</b> {biosensor.temperatura.toFixed(1)}°C</div>
          <div><b>Glicemia:</b> {biosensor.glicemia} mg/dL</div>
          <div><b>Pressão:</b> {biosensor.pressaoArterial}</div>
          <div><b>Atividade:</b> {biosensor.atividadeFisica}</div>
          <div><b>Sono:</b> {biosensor.sono}</div>
        </div>
      )}
    </section>
  );
};
export default BiomedStatusPanel;
