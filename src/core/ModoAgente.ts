import { AgenteASI } from '../asi-agente/AgenteASI';
import { orquestrarGreg } from '../agents/greg-orchestrator';
import { analisarSentimento, simularDecisao } from '../services/secureGregAI';
import { detectarModo } from '../autoModo';

interface ConfiguracaoModoAgente {
  agenteASI: {
    ativo: boolean;
    intervaloVerificacao: number;
    modoAutomatico: boolean;
  };
  integracoes: {
    gregAI: boolean;
    orchestrator: boolean;
    sensores: boolean;
  };
  notificacoes: {
    ativas: boolean;
    canais: string[];
  };
}

export class ControladorModoAgente {
  private agenteASI: AgenteASI;
  private configuracao: ConfiguracaoModoAgente;
  private ativo: boolean = false;

  constructor(config: Partial<ConfiguracaoModoAgente> = {}) {
    this.configuracao = {
      agenteASI: {
        ativo: true,
        intervaloVerificacao: 30000,
        modoAutomatico: true,
        ...config.agenteASI,
      },
      integracoes: {
        gregAI: true,
        orchestrator: true,
        sensores: false,
        ...config.integracoes,
      },
      notificacoes: {
        ativas: true,
        canais: ['console', 'sistema'],
        ...config.notificacoes,
      },
    };

    // Inicializar agente ASI
    this.agenteASI = new AgenteASI({
      intervaloVerificacao: this.configuracao.agenteASI.intervaloVerificacao,
      modoAutomatico: this.configuracao.agenteASI.modoAutomatico,
      logAtivo: true,
    });
  }

  // Ativar modo agente
  async ativar(): Promise<void> {
    if (this.ativo) {
      this.log('Modo agente já está ativo');
      return;
    }

    this.log('Ativando modo agente...');

    try {
      // Inicializar componentes
      if (this.configuracao.agenteASI.ativo) {
        this.agenteASI.iniciar();
      }

      // Executar verificações iniciais
      await this.verificacoesIniciais();

      this.ativo = true;
      this.log('Modo agente ativado com sucesso');

      if (this.configuracao.notificacoes.ativas) {
        await this.notificar(
          'Modo agente ativado - Sistema autônomo funcionando'
        );
      }
    } catch (error) {
      this.log(`Erro ao ativar modo agente: ${error}`, 'error');
      throw error;
    }
  }

  // Desativar modo agente
  async desativar(): Promise<void> {
    if (!this.ativo) {
      this.log('Modo agente já está inativo');
      return;
    }

    this.log('Desativando modo agente...');

    try {
      // Parar agente ASI
      this.agenteASI.parar();

      this.ativo = false;
      this.log('Modo agente desativado');

      if (this.configuracao.notificacoes.ativas) {
        await this.notificar(
          'Modo agente desativado - Retornando ao controle manual'
        );
      }
    } catch (error) {
      this.log(`Erro ao desativar modo agente: ${error}`, 'error');
      throw error;
    }
  }

  // Executar análise contextual usando IA
  async analisarContextoIA(entrada: string): Promise<any> {
    if (!this.configuracao.integracoes.gregAI) {
      return null;
    }

    try {
      // Detectar modo baseado na entrada
      const modoDetectado = detectarModo(entrada);

      // Analisar sentimento
      const analiseEmocional = await analisarSentimento(entrada);

      // Simular decisão se necessário
      let simulacao = null;
      if (entrada.includes('decidir') || entrada.includes('escolher')) {
        simulacao = await simularDecisao(entrada);
      }

      return {
        modoDetectado,
        analiseEmocional,
        simulacao,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.log(`Erro na análise contextual IA: ${error}`, 'error');
      return null;
    }
  }

  // Executar comando do usuário em modo agente
  async executarComando(comando: string, parametros: any = {}): Promise<any> {
    if (!this.ativo) {
      throw new Error('Modo agente não está ativo');
    }

    this.log(`Executando comando: ${comando}`);

    switch (comando.toLowerCase()) {
      case 'status':
        return this.obterStatus();

      case 'analisar':
        return await this.analisarContextoIA(parametros.entrada || '');

      case 'modo':
        return this.alterarModo(parametros.novoModo);

      case 'configurar':
        return this.atualizarConfiguracao(parametros.config);

      case 'estatisticas':
        return this.obterEstatisticas();

      case 'reiniciar':
        return await this.reiniciar();

      default:
        throw new Error(`Comando não reconhecido: ${comando}`);
    }
  }

  // Verificações iniciais do sistema
  private async verificacoesIniciais(): Promise<void> {
    this.log('Executando verificações iniciais...');

    // Verificar estado do orchestrator se habilitado
    if (this.configuracao.integracoes.orchestrator) {
      try {
        const estadoSistema = orquestrarGreg();
        this.log(`Estado do sistema: ${JSON.stringify(estadoSistema)}`);
      } catch (error) {
        this.log(`Erro no orchestrator: ${error}`, 'warn');
      }
    }

    // Outras verificações podem ser adicionadas aqui
    this.log('Verificações iniciais concluídas');
  }

  // Obter status completo do modo agente
  private obterStatus(): any {
    return {
      ativo: this.ativo,
      agenteASI: {
        ativo: this.configuracao.agenteASI.ativo,
        estatisticas: this.agenteASI.estatisticas,
        modoAtual: this.agenteASI.modoAtual,
        alertas: this.agenteASI.alertas,
      },
      configuracao: this.configuracao,
      timestamp: new Date().toISOString(),
    };
  }

  // Alterar modo do agente ASI
  private alterarModo(novoModo: string): any {
    // Por enquanto, retorna informação sobre o modo atual
    // A lógica de mudança de modo está dentro do AgenteASI
    return {
      modoAtual: this.agenteASI.modoAtual,
      modoSolicitado: novoModo,
      timestamp: new Date().toISOString(),
    };
  }

  // Atualizar configuração
  private atualizarConfiguracao(
    novaConfig: Partial<ConfiguracaoModoAgente>
  ): any {
    this.configuracao = { ...this.configuracao, ...novaConfig };

    // Atualizar agente ASI se necessário
    if (novaConfig.agenteASI) {
      this.agenteASI.configurar(novaConfig.agenteASI);
    }

    this.log('Configuração atualizada');
    return { sucesso: true, configuracao: this.configuracao };
  }

  // Obter estatísticas detalhadas
  private obterEstatisticas(): any {
    return {
      sistema: {
        ativo: this.ativo,
        tempoAtivo: new Date().toISOString(),
      },
      agenteASI: this.agenteASI.estatisticas,
      configuracao: this.configuracao,
    };
  }

  // Reiniciar modo agente
  private async reiniciar(): Promise<any> {
    this.log('Reiniciando modo agente...');

    await this.desativar();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Aguardar 1 segundo
    await this.ativar();

    return { sucesso: true, timestamp: new Date().toISOString() };
  }

  // Sistema de notificações
  private async notificar(mensagem: string): Promise<void> {
    if (!this.configuracao.notificacoes.ativas) {
      return;
    }

    for (const canal of this.configuracao.notificacoes.canais) {
      switch (canal) {
        case 'console':
          this.log(`[NOTIFICAÇÃO] ${mensagem}`);
          break;
        case 'sistema':
          // Aqui poderia integrar com notificações do SO
          this.log(`[SISTEMA] ${mensagem}`);
          break;
        // Outros canais podem ser adicionados
      }
    }
  }

  // Sistema de log
  private log(
    mensagem: string,
    nivel: 'info' | 'warn' | 'error' = 'info'
  ): void {
    const timestamp = new Date().toISOString();
    const prefixo = `[${timestamp}] [ModoAgente] [${nivel.toUpperCase()}]`;
    console.log(`${prefixo} ${mensagem}`);
  }

  // Getters públicos
  get isAtivo(): boolean {
    return this.ativo;
  }

  get configAtual(): ConfiguracaoModoAgente {
    return { ...this.configuracao };
  }

  get statusAgente(): any {
    return this.obterStatus();
  }
}

// Instância singleton para uso global
export const modoAgente = new ControladorModoAgente();
