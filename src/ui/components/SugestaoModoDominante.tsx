import { useSymbiosis, SymbiosisMode } from '../contexts';
import styles from './SugestaoModoDominante.module.css';

export default function SugestaoModoDominante() {
  const { sugerirModoPorHistorico, setMode, mode } = useSymbiosis();
  const modoSugerido = sugerirModoPorHistorico();

  if (!modoSugerido || modoSugerido === mode) return null;

  return (
    <div className={styles.sugestaoContainer}>
      <strong>Sugestão simbiótica:</strong> Seu modo mais usado é <b>{modoSugerido}</b>.
      <button
        className={styles.sugestaoBtn}
        onClick={() => setMode(modoSugerido as SymbiosisMode)}
      >
        Ativar modo sugerido
      </button>
    </div>
  );
}
