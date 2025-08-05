import { executarExemplos } from './core/ExemploModoAgente';
import { iniciarCLI } from './cli/ModoAgenteCLI';

// Função principal para demonstrar o Modo Agente
// Esta função é o ponto de entrada do programa e processa os argumentos da linha de comando.
// Dependendo dos argumentos fornecidos, ela executa diferentes funcionalidades do Modo Agente.
async function executarModoAgente() {
  exibirCabecalho();

  const argumentosLinhaComando = process.argv.slice(2);

  if (
    argumentosLinhaComando.includes('--help') ||
    argumentosLinhaComando.includes('-h')
  ) {
    exibirAjuda();
    return;
  }

  if (argumentosLinhaComando.includes('--cli')) {
    iniciarModoCLI();
    return;
  }

  if (
    argumentosLinhaComando.includes('--demo') ||
    argumentosLinhaComando.length === 0
  ) {
    executarDemonstracao();
    return;
  }

  exibirMensagemErroArgumento();
}

function exibirCabecalho() {
  console.log('🤖 GREG - MODO AGENTE');
  console.log('='.repeat(50));
}

function exibirMensagemErroArgumento() {
  console.log(
    'Argumento não reconhecido. Use --help para ver opções disponíveis.'
  );
}

function iniciarModoCLI() {
  console.log('Iniciando CLI interativo...\n');
  iniciarCLI();
}

function executarDemonstracao() {
  console.log('Executando demonstração completa...\n');
  executarExemplos();
}

// Função para exibir a ajuda do programa
// Mostra as opções disponíveis e exemplos de uso.
function exibirAjuda() {
  console.log(`
🤖 Greg - Modo Agente

USO:
  npm run modo-agente [opções]

OPÇÕES:
  --demo, (padrão)  Executar demonstração completa das funcionalidades
  --cli            Iniciar interface de linha de comando interativa
  --help, -h       Mostrar esta ajuda

EXEMPLOS:
  npm run modo-agente              # Executar demo
  npm run modo-agente --cli        # CLI interativo
  npm run modo-agente --demo       # Demo completo

FUNCIONALIDADES:
  ✅ Detecção automática de modos (Foco, Expansão, Zen, Reparo)
  ✅ Execução de rotinas automáticas
  ✅ Integração com OpenAI para análise contextual
  ✅ Sistema de notificações inteligentes
  ✅ Monitoramento e estatísticas de uso
  ✅ Interface CLI para interação em tempo real

DOCUMENTAÇÃO:
  Veja src/core/README_MODO_AGENTE.md para documentação completa
`);
}

// Executar automaticamente (comentar se não quiser execução automática)
// executarModoAgente().catch(console.error);

export { executarModoAgente };
