import { useSymbiosis } from '../contexts/SymbiosisContext';
import styles from './HistoricoModos.module.css';

export default function HistoricoModos({ max = 20 }: { max?: number }) {
  const { recuperarRegistros } = useSymbiosis();
  const registros = recuperarRegistros().slice(-max).reverse();

  if (!registros.length) return <div className={styles.historicoEmpty}>Nenhum histórico de modos encontrado.</div>;

  return (
    <div className={styles.historicoContainer}>
      <h3>Histórico de Modos Ativados</h3>
      <ul className={styles.historicoList}>
        {registros.map((r, i) => (
          <li key={i} className={styles.historicoItem}>
            <b>{r.modo}</b> <span className={styles.historicoData}>({new Date(r.data).toLocaleString()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
