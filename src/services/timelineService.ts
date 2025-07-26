// Simulação de linhas do tempo alternativas (mock)
export function simularLinhaDoTempo(decisao: string) {
  // TODO: integrar com GregAI para cenários reais
  return [
    { decisao, impacto: 'Positivo', futuro: 'Maior produtividade' },
    { decisao, impacto: 'Neutro', futuro: 'Pouca mudança' },
    { decisao, impacto: 'Negativo', futuro: 'Estresse aumentado' }
  ];
}
