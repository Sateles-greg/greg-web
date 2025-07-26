// Serviço simulado de base de conhecimento médico global
export const biomedKnowledgeService = {
  getLatestLiterature: async (topic: string) => ([
    { titulo: 'Avanços em IA para Diagnóstico Médico', fonte: 'Lancet', ano: 2025 },
    { titulo: 'Terapias Personalizadas em Oncologia', fonte: 'NEJM', ano: 2024 }
  ]),
  getClinicalGuidelines: async (condition: string) => ([
    { condicao: condition, diretriz: 'Seguir protocolo XYZ', fonte: 'OMS', ano: 2025 }
  ]),
  identifyResearchGaps: async () => ([
    { area: 'Doenças Raras', descricao: 'Pouca evidência clínica disponível' },
    { area: 'Farmacogenômica', descricao: 'Necessidade de mais estudos populacionais' }
  ])
};
