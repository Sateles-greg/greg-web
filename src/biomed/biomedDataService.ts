import type { 
  MedicalHistory, 
  RealtimeBiosensorData, 
  GenomicData, 
  EnvironmentalData 
} from '../types/biomed';

// Serviço simulado de integração de dados biomédicos massivos
export const biomedDataService = {
  getUnifiedMedicalHistory: async (): Promise<MedicalHistory> => ({
    exames: ['Hemograma', 'Ressonância Magnética'],
    consultas: ['Cardiologista', 'Endocrinologista'],
    cirurgias: ['Apendicectomia'],
    medicacoes: ['Metformina', 'Atorvastatina'],
    alergias: ['Penicilina'],
    historicoFamiliar: ['Diabetes', 'Hipertensão'],
    fontes: ['Hospital X', 'Laboratório Y', 'Clínica Z'],
    consentimento: true,
    atualizadoEm: new Date().toISOString(),
  }),
  getRealtimeBiosensorData: async (): Promise<RealtimeBiosensorData> => ({
    frequenciaCardiaca: 72 + Math.round(Math.random() * 5),
    oxigenacao: 98 + Math.round(Math.random()),
    temperatura: 36.5 + Math.random() * 0.5,
    sono: '7h 30min',
    atividadeFisica: 'Caminhada',
    glicemia: 90 + Math.round(Math.random() * 10),
    pressaoArterial: '120/80',
    timestamp: new Date().toISOString(),
  }),
  getGenomicData: async (): Promise<GenomicData> => ({
    predisposicoes: ['Diabetes tipo 2', 'Intolerância à lactose'],
    reacoesMedicamentos: ['Metformina: boa resposta'],
    proteomica: ['Proteína X elevada'],
    atualizadoEm: new Date().toISOString(),
  }),
  getEnvironmentalData: async (): Promise<EnvironmentalData> => ({
    qualidadeAr: 'Boa',
    poluicaoSonora: 'Moderada',
    dieta: 'Mediterrânea',
    stress: 'Baixo',
    interacoesSociais: 'Alta',
    timestamp: new Date().toISOString(),
  }),
};
