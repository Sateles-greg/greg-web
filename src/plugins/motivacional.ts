// Plugin de frases motivacionais para o Greg
export default function ativarMotivacional(context: any) {
  context.addMemory('Frases motivacionais ativadas!');
  // Exemplo: alterar modo, emitir sugestões, etc.
  context.setMode('expansao');
}
