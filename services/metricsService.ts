// Serviço de métricas para registrar o uso do sistema

/**
 * Registra métricas de uso no sistema.
 * @param metricName Nome da métrica a ser registrada.
 * @param data Dados adicionais relacionados à métrica.
 */
export function logUsageMetrics(metricName: string, data: Record<string, any> = {}): void {
  console.log(`Métrica registrada: ${metricName}`, data);
  // Aqui você pode adicionar lógica para enviar as métricas para um servidor ou armazená-las localmente.
}
