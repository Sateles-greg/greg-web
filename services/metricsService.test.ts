import { logUsageMetrics } from './metricsService';

describe('logUsageMetrics', () => {
  it('deve registrar uma métrica com nome e dados adicionais', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const metricName = 'TesteMetrica';
    const data = { chave: 'valor' };

    logUsageMetrics(metricName, data);

    expect(consoleSpy).toHaveBeenCalledWith(
      `Métrica registrada: ${metricName}`,
      data
    );

    consoleSpy.mockRestore();
  });
});
