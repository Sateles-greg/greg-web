#!/usr/bin/env node

import { integradorModoAgente } from '../core/IntegradorModoAgente';
import * as readline from 'readline';

// Interface de linha de comando para o Modo Agente
class CLIModoAgente {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  // Iniciar CLI
  async iniciar(): Promise<void> {
    console.log('🤖 Greg - Modo Agente CLI');
    console.log(
      'Digite "ajuda" para ver comandos disponíveis ou "sair" para encerrar.\n'
    );

    this.mostrarStatus();
    this.aguardarComando();
  }

  // Aguardar comando do usuário
  private aguardarComando(): void {
    this.rl.question('Greg> ', async (input) => {
      const comando = input.trim();

      if (
        comando.toLowerCase() === 'sair' ||
        comando.toLowerCase() === 'exit'
      ) {
        await this.encerrar();
        return;
      }

      if (comando === '') {
        this.aguardarComando();
        return;
      }

      await this.processarComando(comando);
      this.aguardarComando();
    });
  }

  // Processar comando do usuário
  private async processarComando(comando: string): Promise<void> {
    try {
      console.log('\n⏳ Processando...');

      const resultado =
        await integradorModoAgente.processarComandoTexto(comando);

      if (resultado.sucesso) {
        this.exibirResultado(resultado.dados);
      } else {
        console.log(`❌ Erro: ${resultado.erro}`);
      }
    } catch (error) {
      console.log(`❌ Erro inesperado: ${error}`);
    }

    console.log(); // Linha em branco
  }

  // Exibir resultado formatado
  private exibirResultado(dados: any): void {
    if (dados.mensagem) {
      console.log(`✅ ${dados.mensagem}`);
      return;
    }

    if (dados.analise) {
      console.log('📊 Análise do contexto:');
      console.log(`   Modo detectado: ${dados.analise.modo}`);
      console.log(
        `   Confiança: ${(dados.analise.confianca * 100).toFixed(1)}%`
      );
      if (dados.analise.razoes.length > 0) {
        console.log(`   Razões: ${dados.analise.razoes.join(', ')}`);
      }
      if (dados.analise.sugestoes.length > 0) {
        console.log('   Sugestões:');
        dados.analise.sugestoes.forEach((sugestao: string, i: number) => {
          console.log(`     ${i + 1}. ${sugestao}`);
        });
      }
      return;
    }

    if (dados.analiseLocal && dados.analiseIA) {
      console.log('📊 Análise completa:');
      console.log('\n   🧠 Análise Local:');
      console.log(
        `      Modo: ${dados.analiseLocal.modo} (${(dados.analiseLocal.confianca * 100).toFixed(1)}%)`
      );

      console.log('\n   🤖 Análise IA:');
      if (dados.analiseIA.modoDetectado) {
        console.log(`      Modo detectado: ${dados.analiseIA.modoDetectado}`);
      }
      return;
    }

    if (dados.ativo !== undefined) {
      console.log('📋 Status do Sistema:');
      console.log(`   Status: ${dados.ativo ? '✅ Ativo' : '❌ Inativo'}`);

      if (dados.ativo && dados.agenteASI) {
        console.log(`   Modo atual: ${dados.agenteASI.modoAtual}`);
        console.log(
          `   Tarefas executadas: ${dados.agenteASI.estatisticas.tarefasExecutadas}`
        );
        console.log(`   Alertas ativos: ${dados.agenteASI.alertas.length}`);
      }
      return;
    }

    if (dados.modosDisponiveis) {
      console.log('📋 Modos disponíveis:');
      dados.modosDisponiveis.forEach((modo: string) => {
        const marcador = dados.modoAtual === modo ? '👉' : '  ';
        console.log(`   ${marcador} ${modo}`);
      });
      return;
    }

    if (dados.comandos) {
      this.exibirAjuda(dados);
      return;
    }

    if (dados.modoDetectado) {
      console.log('💡 Sugestões personalizadas:');
      console.log(
        `   Modo detectado: ${dados.modoDetectado} (${(dados.confianca * 100).toFixed(1)}%)`
      );
      if (dados.sugestoes.length > 0) {
        console.log('   Recomendações:');
        dados.sugestoes.forEach((sugestao: string, i: number) => {
          console.log(`     ${i + 1}. ${sugestao}`);
        });
      }
      return;
    }

    // Fallback - exibir JSON
    console.log('📄 Resultado:');
    console.log(JSON.stringify(dados, null, 2));
  }

  // Exibir ajuda formatada
  private exibirAjuda(dados: any): void {
    console.log('📖 Ajuda - Comandos Disponíveis:\n');

    Object.entries(dados.comandos).forEach(([categoria, comandos]) => {
      console.log(
        `   ${this.obterIconeCategoria(categoria)} ${this.formatarCategoria(categoria)}:`
      );
      (comandos as string[]).forEach((comando) => {
        console.log(`      • ${comando}`);
      });
      console.log();
    });

    if (dados.exemplos) {
      console.log('   💬 Exemplos de uso:');
      dados.exemplos.forEach((exemplo: string) => {
        console.log(`      "${exemplo}"`);
      });
    }
  }

  // Obter ícone para categoria de comando
  private obterIconeCategoria(categoria: string): string {
    const icones: { [key: string]: string } = {
      controle: '🎮',
      analise: '🔍',
      configuracao: '⚙️',
      informacao: '📊',
    };
    return icones[categoria] || '📝';
  }

  // Formatar nome da categoria
  private formatarCategoria(categoria: string): string {
    const nomes: { [key: string]: string } = {
      controle: 'Controle do Sistema',
      analise: 'Análise e Contexto',
      configuracao: 'Configuração',
      informacao: 'Informações e Relatórios',
    };
    return nomes[categoria] || categoria;
  }

  // Mostrar status resumido
  private mostrarStatus(): void {
    const status = integradorModoAgente.statusResumido;

    if (status.ativo) {
      console.log(
        `📊 Status: Modo Agente ATIVO | Modo: ${status.modo} | Tarefas: ${status.tarefasExecutadas}`
      );
    } else {
      console.log('📊 Status: Modo Agente INATIVO');
    }
    console.log();
  }

  // Encerrar CLI
  private async encerrar(): Promise<void> {
    console.log('\n👋 Encerrando Greg Modo Agente...');

    if (integradorModoAgente.isAtivo) {
      console.log('🔄 Desativando modo agente...');
      await integradorModoAgente.processarComandoTexto('desativar modo agente');
    }

    this.rl.close();
    console.log('✅ Encerrado com sucesso!');
    process.exit(0);
  }
}

// Função principal
async function main(): Promise<void> {
  const cli = new CLIModoAgente();

  // Tratar sinais de interrupção
  process.on('SIGINT', async () => {
    console.log('\n\n⚠️  Interrupção detectada...');
    await cli['encerrar'](); // Acessar método privado para cleanup
  });

  process.on('SIGTERM', async () => {
    console.log('\n\n⚠️  Terminação detectada...');
    await cli['encerrar']();
  });

  await cli.iniciar();
}

// Função de inicialização para uso externo
export function iniciarCLI(): void {
  main().catch((error) => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });
}

export { CLIModoAgente };
