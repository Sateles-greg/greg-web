// Serviço: Otimizador de Ambiente
export function optimizeEnvironment(
  goal: 'foco' | 'relaxamento' | 'recuperacao'
) {
  switch (goal) {
    case 'foco':
      return 'Ajustando luz azul, reduzindo ruído, otimizando oxigênio.';
    case 'relaxamento':
      return 'Luz quente, música suave, aromaterapia ativada.';
    case 'recuperacao':
      return 'Ambiente silencioso, temperatura ideal, ionização do ar.';
    default:
      return 'Ambiente padrão.';
  }
}
