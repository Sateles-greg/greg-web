import { AgenteASI } from './AgenteASI';
import '@testing-library/jest-dom';

describe('AgenteASI', () => {
  let agente: AgenteASI;

  beforeEach(() => {
    agente = new AgenteASI({
      intervaloVerificacao: 1000, // 1 segundo para testes rápidos
      modoAutomatico: false, // Evitar execução automática nos testes
      logAtivo: false, // Evitar logs durante testes
    });
  });

  afterEach(() => {
    agente.parar();
  });

  it('deve inicializar com configurações padrão', () => {
    const agenteDefault = new AgenteASI();
    expect(agenteDefault.modoAtual).toBe('Foco');
    expect(agenteDefault.alertas).toHaveLength(0);
  });

  it('deve executar rotina automaticamente', async () => {
    const estatisticasIniciais = agente.estatisticas;

    await agente.executarRotina();

    const estatisticasFinais = agente.estatisticas;
    expect(estatisticasFinais.tarefasExecutadas).toBeGreaterThan(
      estatisticasIniciais.tarefasExecutadas
    );
  });

  it('deve notificar automaticamente', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const agenteComLog = new AgenteASI({ logAtivo: true });
    await agenteComLog.notificarAutomaticamente('Teste de notificação');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Notificação: Teste de notificação')
    );

    consoleSpy.mockRestore();
  });

  it('deve iniciar e parar corretamente', () => {
    expect(() => agente.iniciar()).not.toThrow();
    expect(() => agente.parar()).not.toThrow();
  });

  it('deve permitir configuração personalizada', () => {
    const novaConfig = {
      intervaloVerificacao: 5000,
      modosHabilitados: ['Foco', 'Zen'],
    };

    agente.configurar(novaConfig);

    // Como a configuração é privada, testamos indiretamente
    expect(() => agente.configurar(novaConfig)).not.toThrow();
  });

  it('deve manter estatísticas corretas', async () => {
    const estatisticasIniciais = agente.estatisticas;

    await agente.executarRotina();
    await agente.executarRotina();

    const estatisticasFinais = agente.estatisticas;
    expect(estatisticasFinais.tarefasExecutadas).toBe(
      estatisticasIniciais.tarefasExecutadas + 2
    );
    expect(estatisticasFinais.ultimaVerificacao).toBeInstanceOf(Date);
  });

  it('deve gerenciar modo atual', () => {
    expect(agente.modoAtual).toBe('Foco');
    expect(typeof agente.modoAtual).toBe('string');
  });

  it('deve gerenciar alertas', () => {
    const alertasIniciais = agente.alertas;
    expect(Array.isArray(alertasIniciais)).toBe(true);
    expect(alertasIniciais.length).toBe(0);
  });
});
