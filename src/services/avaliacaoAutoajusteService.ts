// Serviço de avaliação e autoajuste simbiótico
export type MetricasDesempenho = {
  acuracia: number;
  relevancia: number;
  eficiencia: number;
  impacto: number;
};

let historicoMetricas: MetricasDesempenho[] = [];

export function registrarMetricas(metricas: MetricasDesempenho) {
  historicoMetricas.push(metricas);
  if (historicoMetricas.length > 100) historicoMetricas.shift();
}

export function avaliarDesempenho(): MetricasDesempenho {
  if (historicoMetricas.length === 0) return { acuracia: 0, relevancia: 0, eficiencia: 0, impacto: 0 };
  const soma = historicoMetricas.reduce((acc, m) => ({
    acuracia: acc.acuracia + m.acuracia,
    relevancia: acc.relevancia + m.relevancia,
    eficiencia: acc.eficiencia + m.eficiencia,
    impacto: acc.impacto + m.impacto
  }), { acuracia: 0, relevancia: 0, eficiencia: 0, impacto: 0 });
  const n = historicoMetricas.length;
  return {
    acuracia: soma.acuracia / n,
    relevancia: soma.relevancia / n,
    eficiencia: soma.eficiencia / n,
    impacto: soma.impacto / n
  };
}

export function autoajustarModelos() {
  // Simulação: se acuracia < 0.7, troca modelo
  const m = avaliarDesempenho();
  if (m.acuracia < 0.7) return 'Trocar modelo de IA';
  return 'Modelo atual está adequado';
}
