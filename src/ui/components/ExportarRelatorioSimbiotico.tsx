import { useSymbiosis } from '../contexts/SymbiosisContext';
import styles from './ExportarRelatorioSimbiotico.module.css';

export default function ExportarRelatorioSimbiotico() {
  const { exportarRelatorioSimbiotico } = useSymbiosis();

  const handleExport = () => {
    const texto = exportarRelatorioSimbiotico();
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'relatorio_simbiotico.txt';
    link.click();
  };

  return (
    <button onClick={handleExport} className={styles.exportarBtn}>
      Exportar Relatório Simbiótico
    </button>
  );
}
