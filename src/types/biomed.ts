// Type definitions for biomedical services and components

export interface MedicalHistory {
  exames: string[];
  consultas: string[];
  cirurgias: string[];
  medicacoes: string[];
  alergias: string[];
  historicoFamiliar: string[];
  fontes: string[];
  consentimento: boolean;
  atualizadoEm: string;
}

export interface RealtimeBiosensorData {
  frequenciaCardiaca: number;
  oxigenacao: number;
  temperatura: number;
  sono: string;
  atividadeFisica: string;
  glicemia: number;
  pressaoArterial: string;
  timestamp: string;
}

export interface GenomicData {
  predisposicoes: string[];
  reacoesMedicamentos: string[];
  proteomica: string[];
  atualizadoEm: string;
}

export interface EnvironmentalData {
  qualidadeAr: string;
  poluicaoSonora: string;
  dieta: string;
  stress: string;
  interacoesSociais: string;
  timestamp: string;
}

export interface MedicalImageAnalysis {
  tipo: string;
  resultado: string;
  confianca: number;
  detalhes: string;
  timestamp: string;
}

export interface DiagnosisOption {
  diagnostico: string;
  probabilidade: number;
}

export interface DifferentialDiagnosis {
  lista: DiagnosisOption[];
  sugestoes: string[];
  timestamp: string;
}

export interface EarlyPatternDetection {
  risco: string;
  alerta: boolean;
  padrao: string;
  timestamp: string;
}

export interface SymptomInterpretation {
  possiveisCausas: string[];
  recomendacao: string;
  timestamp: string;
}

export interface TreatmentPlan {
  plano: string;
  personalizado: boolean;
  baseadoEm: string[];
  timestamp: string;
}

export interface MedicationAdjustment {
  ajuste: string;
  motivo: string;
  monitoramento: string;
  timestamp: string;
}

export interface NonPharmaRecommendation {
  intervencoes: string[];
  evidencias: string[];
  timestamp: string;
}

export interface RecoveryMonitoring {
  status: string;
  alertas: string[];
  acompanhamento: string;
  timestamp: string;
}

export interface CrisisIntervention {
  orientacao: string;
  infoParamedicos: string;
  timestamp: string;
}

// Knowledge Service types
export interface MedicalLiterature {
  titulo: string;
  fonte: string;
  ano: number;
}

export interface ClinicalGuideline {
  condicao: string;
  diretriz: string;
  fonte: string;
  ano: number;
}

export interface ResearchGap {
  area: string;
  descricao: string;
}

// Ethics Service types
export interface AuditLogEntry {
  evento: string;
  por: string;
  data: string;
}

export interface PrivacyStatus {
  criptografia: string;
  consentimento: string;
  compliance: string[];
  acesso: string[];
  logs: AuditLogEntry[];
  ultimoAudit: string;
}

export interface EventLogResult {
  status: string;
  evento: string;
  por: string;
  data: string;
}

// FHIR Service types
export interface FHIRResource {
  [key: string]: unknown;
}

// Blockchain Service types
export interface BlockchainEventResult {
  status: string;
  evento: string;
  por: string;
  hash: string;
  timestamp: string;
}

export interface AuditTrailEntry {
  evento: string;
  por: string;
  hash: string;
  timestamp: string;
}

// Quantum Service types
export interface QuantumKey {
  key: string;
  geradaEm: string;
  status: string;
}

export interface QuantumChannelVerification {
  status: string;
  verificadoEm: string;
}

// Union type for select options in ConsoleSimbotico
export type TipoRegistroSimbotico = 'crenca' | 'principio' | 'aprendizado';

export interface RegistroSimbotico {
  tipo: TipoRegistroSimbotico;
  conteudo: string;
  data: string;
}