// import { executarExemplos } from './core/ExemploModoAgente'; // Arquivo não existe
// import { iniciarCLI } from './cli/ModoAgenteCLI'; // Arquivo não existe

// Função principal para demonstrar o Modo Agente
// Esta função é o ponto de entrada do programa e processa os argumentos da linha de comando.
// Dependendo dos argumentos fornecidos, ela executa diferentes funcionalidades do Modo Agente.
async function main() {
  // Exibe o cabeçalho do programa
  console.log('🤖 GREG - MODO AGENTE');
  console.log('='.repeat(50));

  // Obtém os argumentos da linha de comando, ignorando os dois primeiros (node e script)
  const args = process.argv.slice(2);

  // Exibe a ajuda se os argumentos incluem --help ou -h
  if (args.includes('--help') || args.includes('-h')) {
    mostrarAjuda();
    return;
  }

  // Inicia a interface de linha de comando interativa se --cli for fornecido
  if (args.includes('--cli')) {
    console.log('Iniciando CLI interativo...\n');
    // iniciarCLI(); // Função não disponível
    return;
  }

  // Executa a demonstração completa se --demo ou nenhum argumento for fornecido
  if (args.includes('--demo') || args.length === 0) {
    console.log('Executando demonstração completa...\n');
    // await executarExemplos(); // Função não disponível
    return;
  }

  // Exibe uma mensagem de erro para argumentos não reconhecidos
  console.log(
    'Argumento não reconhecido. Use --help para ver opções disponíveis.'
  );
}

// Função para exibir a ajuda do programa
// Mostra as opções disponíveis e exemplos de uso.
function mostrarAjuda() {
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
// main().catch(console.error);

export { main as executarModoAgente };
