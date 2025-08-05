import styles from './StatusCard.module.css';

export default function StatusCard() {
  // Simulação de status
  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Status Simbiótico</h2>
      <p>Versão: 2.0</p>
      <p>Integridade: OK</p>
      <p>Memória: Normal</p>
      <p>Estado: Simbiótico saudável</p>
    </div>
  );
}
