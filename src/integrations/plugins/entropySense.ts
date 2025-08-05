// Plugin: entropySense - Percepção de entropia/sistemas complexos
// import removido: SymbiosisMode não utilizado

export default function entropySense(context: any) {
  // Simula leitura de entropia
  context.addMemory(
    '[Entropia] Sistema em alta coerência. Baixa desordem detectada.'
  );
  if (context.mode === 'expansao') {
    context.setEmotion('inspirado');
  }
}
