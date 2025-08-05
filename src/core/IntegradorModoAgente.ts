import { ControladorModoAgente } from './ModoAgente';
import {
  analisarContextoCompleto,
  obterSugestoesModo,
  obterModosDisponiveis,
  obterEstatisticasModos,
} from '../autoModo';

// Interface para comandos via CLI ou interface gráfica
interface ComandoModoAgente {
  acao: string;
  parametros?: Record<string, any>;
}

interface RespostaComando {
  sucesso: boolean;
  dados?: any;
  erro?: string;
  timestamp: string;
}

export class IntegradorModoAgente {
  private controlador: ControladorModoAgente;

  constructor() {
    this.controlador = new ControladorModoAgente();
  }

  // Processar comandos de texto natural
  async processarComandoTexto(comando: string): Promise<RespostaComando> {
    const timestamp = new Date().toISOString();

    try {
      // Analisar intenção do comando
      const intencao = this.analisarIntencaoComando(comando);

      // Executar comando baseado na intenção
      const resultado = await this.executarComandoPorIntencao(
        intencao,
        comando
      );

      return {
        sucesso: true,
        dados: resultado,
        timestamp,
      };
    } catch (error) {
      return {
        sucesso: false,
        erro: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp,
      };
    }
  }

  // Analisar intenção do comando em linguagem natural
  private analisarIntencaoComando(comando: string): string {
    const textoLower = comando.toLowerCase();

    // Comandos de controle
    if (
      textoLower.includes('ativar') ||
      textoLower.includes('ligar') ||
      textoLower.includes('iniciar')
    ) {
      return 'ativar';
    }
    if (
      textoLower.includes('desativar') ||
      textoLower.includes('desligar') ||
      textoLower.includes('parar')
    ) {
      return 'desativar';
    }
    if (
      textoLower.includes('status') ||
      textoLower.includes('estado') ||
      textoLower.includes('situação')
    ) {
      return 'status';
    }

    // Comandos de análise
    if (
      textoLower.includes('analisar') ||
      textoLower.includes('como estou') ||
      textoLower.includes('meu modo')
    ) {
      return 'analisar';
    }
    if (
      textoLower.includes('sugestão') ||
      textoLower.includes('recomendação') ||
      textoLower.includes('dica')
    ) {
      return 'sugerir';
    }

    // Comandos de configuração
    if (
      textoLower.includes('configurar') ||
      textoLower.includes('ajustar') ||
      textoLower.includes('mudar')
    ) {
      return 'configurar';
    }

    // Comandos de informação
    if (textoLower.includes('modos') || textoLower.includes('opções')) {
      return 'listarModos';
    }
    if (
      textoLower.includes('estatística') ||
      textoLower.includes('histórico') ||
      textoLower.includes('relatório')
    ) {
      return 'estatisticas';
    }

    // Comandos de ajuda
    if (
      textoLower.includes('ajuda') ||
      textoLower.includes('help') ||
      textoLower.includes('como usar')
    ) {
      return 'ajuda';
    }

    // Se não reconheceu, tenta analisar como contexto
    return 'analisar';
  }

  // Executar comando baseado na intenção identificada
  private async executarComandoPorIntencao(
    intencao: string,
    comando: string
  ): Promise<any> {
    switch (intencao) {
      case 'ativar':
        await this.controlador.ativar();
        return { mensagem: 'Modo agente ativado com sucesso!' };

      case 'desativar':
        await this.controlador.desativar();
        return { mensagem: 'Modo agente desativado.' };

      case 'status':
        return await this.controlador.executarComando('status');

      case 'analisar': {
        const analise = analisarContextoCompleto(comando);
        if (this.controlador.isAtivo) {
          const resultadoIA = await this.controlador.executarComando(
            'analisar',
            { entrada: comando }
          );
          return { analiseLocal: analise, analiseIA: resultadoIA };
        }
        return { analise };
      }

      case 'sugerir':
        return this.obterSugestoesPersonalizadas(comando);

      case 'configurar':
        return this.processarConfiguracaoTexto(comando);

      case 'listarModos':
        return {
          modosDisponiveis: obterModosDisponiveis(),
          modoAtual: this.controlador.isAtivo
            ? this.controlador.statusAgente.agenteASI.modoAtual
            : null,
        };

      case 'estatisticas':
        return {
          estatisticasModos: obterEstatisticasModos(),
          statusSistema: this.controlador.isAtivo
            ? await this.controlador.executarComando('estatisticas')
            : null,
        };

      case 'ajuda':
        return this.obterAjuda();

      default:
        throw new Error(`Intenção não reconhecida: ${intencao}`);
    }
  }

  // Obter sugestões personalizadas
  private obterSugestoesPersonalizadas(comando: string): any {
    const analise = analisarContextoCompleto(comando);
    const sugestoesModo = obterSugestoesModo(analise.modo);

    return {
      modoDetectado: analise.modo,
      confianca: analise.confianca,
      sugestoes: sugestoesModo,
      razoes: analise.razoes,
    };
  }

  // Processar configurações em texto natural
  private processarConfiguracaoTexto(comando: string): any {
    const textoLower = comando.toLowerCase();

    // Configurações de intervalo
    if (textoLower.includes('intervalo') || textoLower.includes('frequência')) {
      const numeros = comando.match(/\d+/g);
      if (numeros && numeros.length > 0) {
        const intervalo = parseInt(numeros[0]) * 1000; // converter para ms
        // Aplicar configuração (implementação simplificada)
        return {
          mensagem: `Intervalo configurado para ${numeros[0]} segundos`,
          configuracao: { intervaloVerificacao: intervalo },
        };
      }
    }

    // Configurações de modo automático
    if (textoLower.includes('automático')) {
      const ativar =
        textoLower.includes('ativar') || textoLower.includes('ligar');
      return {
        mensagem: `Modo automático ${ativar ? 'ativado' : 'desativado'}`,
        configuracao: { modoAutomatico: ativar },
      };
    }

    return {
      mensagem:
        'Configuração não reconhecida. Use comandos como "configurar intervalo 30" ou "ativar modo automático"',
    };
  }

  // Obter ajuda do sistema
  private obterAjuda(): any {
    return {
      comandos: {
        controle: [
          'ativar modo agente',
          'desativar modo agente',
          'mostrar status',
          'reiniciar sistema',
        ],
        analise: [
          'analisar meu estado',
          'como estou me sentindo',
          'que modo estou',
          'dar sugestões',
        ],
        configuracao: [
          'configurar intervalo 30',
          'ativar modo automático',
          'listar modos disponíveis',
        ],
        informacao: ['mostrar estatísticas', 'histórico de modos', 'ajuda'],
      },
      exemplos: [
        'Estou me sentindo muito cansado hoje',
        'Preciso focar no trabalho',
        'Quero explorar ideias criativas',
        'Ativar modo agente',
        'Mostrar meu status atual',
      ],
    };
  }

  // Interface simplificada para comandos estruturados
  async executarComando(comando: ComandoModoAgente): Promise<RespostaComando> {
    const timestamp = new Date().toISOString();

    try {
      let resultado: any;

      switch (comando.acao) {
        case 'ativar':
          await this.controlador.ativar();
          resultado = { mensagem: 'Modo agente ativado' };
          break;

        case 'desativar':
          await this.controlador.desativar();
          resultado = { mensagem: 'Modo agente desativado' };
          break;

        case 'status':
          resultado = await this.controlador.executarComando('status');
          break;

        case 'analisar': {
          const entrada = comando.parametros?.entrada || '';
          resultado = await this.controlador.executarComando('analisar', {
            entrada,
          });
          break;
        }

        case 'configurar':
          resultado = await this.controlador.executarComando(
            'configurar',
            comando.parametros
          );
          break;

        default:
          throw new Error(`Ação não suportada: ${comando.acao}`);
      }

      return {
        sucesso: true,
        dados: resultado,
        timestamp,
      };
    } catch (error) {
      return {
        sucesso: false,
        erro: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp,
      };
    }
  }

  // Verificar se o modo agente está ativo
  get isAtivo(): boolean {
    return this.controlador.isAtivo;
  }

  // Obter configuração atual
  get configuracaoAtual(): any {
    return this.controlador.configAtual;
  }

  // Obter status resumido
  get statusResumido(): any {
    if (!this.controlador.isAtivo) {
      return { ativo: false, mensagem: 'Modo agente inativo' };
    }

    const status = this.controlador.statusAgente;
    return {
      ativo: true,
      modo: status.agenteASI.modoAtual,
      tarefasExecutadas: status.agenteASI.estatisticas.tarefasExecutadas,
      alertas: status.agenteASI.alertas.length,
    };
  }
}

// Instância singleton para uso global
export const integradorModoAgente = new IntegradorModoAgente();
