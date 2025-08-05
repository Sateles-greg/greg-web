// Serviço simulado de tratamento personalizado
export const treatmentService = {
  suggestTreatmentPlan: async () => ({
    plano: 'Dieta balanceada, atividade física regular, Metformina 500mg/dia',
    personalizado: true,
    baseadoEm: ['Genética', 'Histórico', 'Estilo de vida'],
    timestamp: new Date().toISOString(),
  }),
  adjustMedication: async () => ({
    ajuste: 'Reduzir dose de Atorvastatina para 10mg',
    motivo: 'Efeitos colaterais leves',
    monitoramento: 'Reavaliar em 30 dias',
    timestamp: new Date().toISOString(),
  }),
  recommendNonPharma: async () => ({
    intervencoes: ['Meditação', 'Exercícios de respiração', 'Caminhada diária'],
    evidencias: ['Estudos clínicos recentes'],
    timestamp: new Date().toISOString(),
  }),
  monitorRecovery: async () => ({
    status: 'Recuperação dentro do esperado',
    alertas: [],
    acompanhamento: 'Próxima avaliação em 7 dias',
    timestamp: new Date().toISOString(),
  }),
  crisisIntervention: async () => ({
    orientacao: 'Ligue para o SAMU (192) e mantenha a calma',
    infoParamedicos: 'Paciente diabético, em uso de Metformina',
    timestamp: new Date().toISOString(),
  }),
};
