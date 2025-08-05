// Serviço de exportação de relatórios automáticos
import { obterRelatorioAtual } from './monitoramentoRelatorioService';

export function exportarRelatorioJSON() {
  const relatorio = obterRelatorioAtual();
  if (!relatorio) return;
  const blob = new Blob([JSON.stringify(relatorio, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `relatorio_greg_${relatorio.timestamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
