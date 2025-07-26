// Serviço simulado de diagnóstico avançado
export const diagnosticService = {
  analyzeMedicalImages: async (imageType: string) => ({
    tipo: imageType,
    resultado: 'Sem anomalias detectadas',
    confianca: 0.99,
    detalhes: 'Análise automatizada por IA',
    timestamp: new Date().toISOString(),
  }),
  generateDifferentialDiagnosis: async (symptoms: string[]) => ({
    lista: [
      { diagnostico: 'Gripe', probabilidade: 0.4 },
      { diagnostico: 'COVID-19', probabilidade: 0.2 },
      { diagnostico: 'Alergia', probabilidade: 0.1 }
    ],
    sugestoes: ['Solicitar PCR', 'Consultar infectologista'],
    timestamp: new Date().toISOString(),
  }),
  detectEarlyPatterns: async (biometricData: any) => ({
    risco: 'Baixo',
    alerta: false,
    padrao: 'Normal',
    timestamp: new Date().toISOString(),
  }),
  interpretSymptoms: async (description: string) => ({
    possiveisCausas: ['Estresse', 'Infecção viral'],
    recomendacao: 'Acompanhar sintomas e hidratar-se',
    timestamp: new Date().toISOString(),
  })
};
