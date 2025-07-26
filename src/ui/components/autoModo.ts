// Função simples de detecção de modo baseada em palavras-chave
export function detectarModo(input: string): string | null {
  const texto = input.toLowerCase();
  if (texto.includes('zen') || texto.includes('calmo') || texto.includes('relax')) return 'zen';
  if (texto.includes('foco') || texto.includes('estratégia') || texto.includes('estrategia') || texto.includes('concentrar')) return 'estrategia';
  // Adicione mais detecções conforme novos modos forem criados
  return null;
}
