import { ControladorModoAgente, modoAgente } from '../core/ModoAgente';

// Exemplo de uso básico do Modo Agente
async function exemploUsoBasico() {
  console.log('=== Exemplo de Uso do Modo Agente ===\n');

  try {
    // 1. Ativar o modo agente
    console.log('1. Ativando modo agente...');
    await modoAgente.ativar();

    // 2. Verificar status
    console.log('\n2. Verificando status...');
    const status = await modoAgente.executarComando('status');
    console.log('Status:', JSON.stringify(status, null, 2));

    // 3. Analisar contexto usando IA
    console.log('\n3. Analisando contexto...');
    const analise = await modoAgente.executarComando('analisar', {
      entrada:
        'Estou me sentindo muito focado hoje e quero trabalhar em projetos importantes',
    });
    console.log('Análise:', JSON.stringify(analise, null, 2));

    // 4. Obter estatísticas
    console.log('\n4. Obtendo estatísticas...');
    const stats = await modoAgente.executarComando('estatisticas');
    console.log('Estatísticas:', JSON.stringify(stats, null, 2));

    // 5. Aguardar um pouco para ver o agente em ação
    console.log('\n5. Aguardando agente executar rotinas automáticas...');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // 6. Verificar status após execução automática
    console.log('\n6. Status após execução automática...');
    const statusFinal = await modoAgente.executarComando('status');
    console.log(
      'Status Final:',
      JSON.stringify(statusFinal.agenteASI.estatisticas, null, 2)
    );
  } catch (error) {
    console.error(
      'Erro no exemplo:',
      error instanceof Error ? error.message : String(error)
    );
  } finally {
    // 7. Desativar modo agente
    console.log('\n7. Desativando modo agente...');
    await modoAgente.desativar();
  }
}

// Exemplo de configuração personalizada
async function exemploConfiguracaoPersonalizada() {
  console.log('\n=== Exemplo de Configuração Personalizada ===\n');

  const agentePersonalizado = new ControladorModoAgente({
    agenteASI: {
      ativo: true,
      intervaloVerificacao: 10000, // 10 segundos
      modoAutomatico: true,
    },
    integracoes: {
      gregAI: true,
      orchestrator: false, // Desabilitar orchestrator
      sensores: false,
    },
    notificacoes: {
      ativas: true,
      canais: ['console'],
    },
  });

  try {
    await agentePersonalizado.ativar();

    console.log('Configuração personalizada ativa!');
    console.log('Status:', agentePersonalizado.statusAgente);

    // Testar mudança de configuração em tempo real
    await agentePersonalizado.executarComando('configurar', {
      config: {
        agenteASI: {
          intervaloVerificacao: 15000, // Alterar para 15 segundos
        },
      },
    });

    console.log('Configuração atualizada!');

    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (error) {
    console.error(
      'Erro no exemplo personalizado:',
      error instanceof Error ? error.message : String(error)
    );
  } finally {
    await agentePersonalizado.desativar();
  }
}

// Exemplo de análise de diferentes contextos
async function exemploAnaliseContextos() {
  console.log('\n=== Exemplo de Análise de Contextos ===\n');

  const contextos = [
    'Estou muito cansado e exausto hoje',
    'Preciso focar em estudar para a prova',
    'Quero explorar novas ideias criativas',
    'Estou em um momento zen de meditação',
    'Preciso decidir entre duas opções importantes',
  ];

  try {
    await modoAgente.ativar();

    for (const contexto of contextos) {
      console.log(`\nAnalisando: "${contexto}"`);
      const resultado = await modoAgente.executarComando('analisar', {
        entrada: contexto,
      });
      console.log('Resultado:', JSON.stringify(resultado, null, 2));
    }
  } catch (error) {
    console.error(
      'Erro na análise de contextos:',
      error instanceof Error ? error.message : String(error)
    );
  } finally {
    await modoAgente.desativar();
  }
}

// Exemplo de tratamento de erros
async function exemploTratamentoErros() {
  console.log('\n=== Exemplo de Tratamento de Erros ===\n');

  try {
    // Tentar executar comando sem ativar o modo agente
    console.log('Tentando executar comando sem ativar modo agente...');
    await modoAgente.executarComando('status');
  } catch (error) {
    console.log(
      'Erro esperado:',
      error instanceof Error ? error.message : String(error)
    );
  }

  try {
    await modoAgente.ativar();

    // Tentar comando inexistente
    console.log('\nTentando comando inexistente...');
    await modoAgente.executarComando('comando_invalido');
  } catch (error) {
    console.log(
      'Erro esperado:',
      error instanceof Error ? error.message : String(error)
    );
  } finally {
    await modoAgente.desativar();
  }
}

// Função principal para executar todos os exemplos
async function executarExemplos() {
  console.log('🤖 DEMONSTRAÇÃO DO MODO AGENTE GREG 🤖\n');

  try {
    await exemploUsoBasico();
    await exemploConfiguracaoPersonalizada();
    await exemploAnaliseContextos();
    await exemploTratamentoErros();

    console.log('\n✅ Todos os exemplos executados com sucesso!');
  } catch (error) {
    console.error('\n❌ Erro geral:', error);
  }
}

// Exportar funções para uso externo
export {
  exemploUsoBasico,
  exemploConfiguracaoPersonalizada,
  exemploAnaliseContextos,
  exemploTratamentoErros,
  executarExemplos,
};

// Se executado diretamente, rodar os exemplos
// Remover verificação de module para evitar erros TypeScript
// if (require.main === module) {
//   executarExemplos().catch(console.error);
// }
