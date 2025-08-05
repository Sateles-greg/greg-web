import { detectarModo } from '../autoModo';
// import { analisarSentimento } from '../agents/greg-ai/GregAI'; // Removido: não utilizado

interface ConfiguracaoAgente {
  intervaloVerificacao: number; // em milissegundos
  modoAutomatico: boolean;
  modosHabilitados: string[];
  logAtivo: boolean;
}

interface EstadoAgente {
  modoAtual: string;
  ultimaVerificacao: Date;
  tarefasExecutadas: number;
  alertasAtivos: string[];
}

// Agente autônomo para automação de rotinas e decisões
export class AgenteASI {
  private configuracao: ConfiguracaoAgente;
  private estado: EstadoAgente;
  private intervalId?: NodeJS.Timeout;

  constructor(config: Partial<ConfiguracaoAgente> = {}) {
    this.configuracao = {
      intervaloVerificacao: 30000, // 30 segundos
      modoAutomatico: true,
      modosHabilitados: ['Foco', 'Expansao', 'Zen', 'Reparo'],
      logAtivo: true,
      ...config,
    };

    this.estado = {
      modoAtual: 'Foco',
      ultimaVerificacao: new Date(),
      tarefasExecutadas: 0,
      alertasAtivos: [],
    };
  }

  // Inicia o agente em modo automático
  iniciar(): void {
    if (this.configuracao.modoAutomatico) {
      this.log('Agente ASI iniciado em modo automático');
      this.intervalId = setInterval(() => {
        this.executarRotina();
      }, this.configuracao.intervaloVerificacao);
    }
  }

  // Para o agente
  parar(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      this.log('Agente ASI parado');
    }
  }

  // Execução principal das rotinas automáticas
  async executarRotina(): Promise<void> {
    try {
      this.estado.ultimaVerificacao = new Date();
      this.log('Executando rotina automática...');

      // Verificar estado do sistema
      await this.verificarEstadoSistema();

      // Analisar contexto atual
      await this.analisarContexto();

      // Tomar decisões baseadas no contexto
      await this.tomarDecisoes();

      // Executar ações necessárias
      await this.executarAcoes();

      this.estado.tarefasExecutadas++;
      this.log(
        `Rotina concluída. Total de tarefas: ${this.estado.tarefasExecutadas}`
      );
    } catch (error) {
      this.log(`Erro na execução da rotina: ${error}`, 'error');
      this.adicionarAlerta(`Erro na rotina: ${error}`);
    }
  }

  // Verificar estado geral do sistema
  private async verificarEstadoSistema(): Promise<void> {
    // Verificar memória, CPU, conexões, etc.
    const agora = new Date();
    const ultimaVerificacao = this.estado.ultimaVerificacao;
    const tempoDecorrido = agora.getTime() - ultimaVerificacao.getTime();

    if (tempoDecorrido > this.configuracao.intervaloVerificacao * 2) {
      this.adicionarAlerta(
        'Sistema pode estar sobrecarregado - verificação atrasada'
      );
    }

    // Limpar alertas antigos (mais de 1 hora)
    this.estado.alertasAtivos = this.estado.alertasAtivos.filter(
      (alerta) => alerta.includes(agora.toISOString().slice(0, 13)) // mantém apenas alertas da hora atual
    );
  }

  // Analisar contexto atual do usuário
  private async analisarContexto(): Promise<void> {
    // Aqui poderia integrar com sensores, agenda, localização, etc.
    const contextoSimulado = this.obterContextoSimulado();
    const novoModo = detectarModo(contextoSimulado);

    if (
      novoModo !== this.estado.modoAtual &&
      this.configuracao.modosHabilitados.includes(novoModo)
    ) {
      this.log(
        `Mudança de modo detectada: ${this.estado.modoAtual} → ${novoModo}`
      );
      this.estado.modoAtual = novoModo;
      await this.notificarMudancaModo(novoModo);
    }
  }

  // Tomar decisões baseadas no contexto analisado
  private async tomarDecisoes(): Promise<void> {
    switch (this.estado.modoAtual) {
      case 'Foco':
        await this.decisoesModoFoco();
        break;
      case 'Expansao':
        await this.decisoesModoExpansao();
        break;
      case 'Zen':
        await this.decisoesModoZen();
        break;
      case 'Reparo':
        await this.decisoesModoReparo();
        break;
      default:
        this.log(`Modo não reconhecido: ${this.estado.modoAtual}`);
    }
  }

  // Executar ações determinadas pelas decisões
  private async executarAcoes(): Promise<void> {
    // Implementar ações específicas baseadas nas decisões tomadas
    this.log(`Executando ações para modo: ${this.estado.modoAtual}`);
  }

  // Decisões específicas para modo Foco
  private async decisoesModoFoco(): Promise<void> {
    this.log('Aplicando estratégias de foco...');
    // Bloquear distrações, organizar tarefas, etc.
  }

  // Decisões específicas para modo Expansão
  private async decisoesModoExpansao(): Promise<void> {
    this.log('Aplicando estratégias de expansão...');
    // Sugerir novas ideias, explorar possibilidades, etc.
  }

  // Decisões específicas para modo Zen
  private async decisoesModoZen(): Promise<void> {
    this.log('Aplicando estratégias zen...');
    // Promover relaxamento, meditação, etc.
  }

  // Decisões específicas para modo Reparo
  private async decisoesModoReparo(): Promise<void> {
    this.log('Aplicando estratégias de reparo...');
    // Sugerir descanso, hidratação, exercícios, etc.
  }

  // Notificação automática baseada em contexto
  async notificarAutomaticamente(mensagem?: string): Promise<void> {
    const msg = mensagem || `Agente ASI ativo - Modo: ${this.estado.modoAtual}`;
    this.log(`Notificação: ${msg}`);

    // Aqui poderia integrar com sistema de notificações do OS
    // ou enviar para interfaces de usuário
  }

  // Notificar mudança de modo
  private async notificarMudancaModo(novoModo: string): Promise<void> {
    await this.notificarAutomaticamente(`Modo alterado para: ${novoModo}`);
  }

  // Adicionar alerta ao estado
  private adicionarAlerta(alerta: string): void {
    const alertaComTimestamp = `${new Date().toISOString()}: ${alerta}`;
    this.estado.alertasAtivos.push(alertaComTimestamp);
    this.log(`Alerta adicionado: ${alerta}`, 'warn');
  }

  // Obter contexto simulado (substituir por dados reais)
  private obterContextoSimulado(): string {
    const contextos = [
      'usuário está focado trabalhando',
      'usuário parece cansado e exausto',
      'usuário está explorando novas ideias',
      'usuário está em estado zen e calmo',
    ];
    return contextos[Math.floor(Math.random() * contextos.length)];
  }

  // Sistema de log
  private log(
    mensagem: string,
    nivel: 'info' | 'warn' | 'error' = 'info'
  ): void {
    if (this.configuracao.logAtivo) {
      const timestamp = new Date().toISOString();
      const prefixo = `[${timestamp}] [AgenteASI] [${nivel.toUpperCase()}]`;
      console.log(`${prefixo} ${mensagem}`);
    }
  }

  // Getters para acessar estado
  get modoAtual(): string {
    return this.estado.modoAtual;
  }

  get alertas(): string[] {
    return [...this.estado.alertasAtivos];
  }

  get estatisticas() {
    return {
      modoAtual: this.estado.modoAtual,
      ultimaVerificacao: this.estado.ultimaVerificacao,
      tarefasExecutadas: this.estado.tarefasExecutadas,
      alertasAtivos: this.estado.alertasAtivos.length,
    };
  }

  // Configurar o agente
  configurar(novaConfig: Partial<ConfiguracaoAgente>): void {
    this.configuracao = { ...this.configuracao, ...novaConfig };
    this.log('Configuração atualizada');
  }
}
