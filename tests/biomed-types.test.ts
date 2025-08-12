import { biomedDataService } from '../src/biomed/biomedDataService';
import { diagnosticService } from '../src/biomed/diagnosticService';
import { treatmentService } from '../src/biomed/treatmentService';
import type { 
  MedicalHistory, 
  RealtimeBiosensorData, 
  TreatmentPlan,
  TipoRegistroSimbotico 
} from '../src/types/biomed';

describe('Biomedical Services Type Safety', () => {
  describe('biomedDataService', () => {
    it('should return properly typed medical history', async () => {
      const history: MedicalHistory = await biomedDataService.getUnifiedMedicalHistory();
      
      expect(history).toHaveProperty('exames');
      expect(history).toHaveProperty('consultas');
      expect(history).toHaveProperty('cirurgias');
      expect(history).toHaveProperty('medicacoes');
      expect(history).toHaveProperty('alergias');
      expect(history).toHaveProperty('historicoFamiliar');
      expect(history).toHaveProperty('fontes');
      expect(history).toHaveProperty('consentimento');
      expect(history).toHaveProperty('atualizadoEm');
      
      expect(Array.isArray(history.exames)).toBe(true);
      expect(typeof history.consentimento).toBe('boolean');
      expect(typeof history.atualizadoEm).toBe('string');
    });

    it('should return properly typed biosensor data', async () => {
      const data: RealtimeBiosensorData = await biomedDataService.getRealtimeBiosensorData();
      
      expect(data).toHaveProperty('frequenciaCardiaca');
      expect(data).toHaveProperty('oxigenacao');
      expect(data).toHaveProperty('temperatura');
      expect(data).toHaveProperty('sono');
      expect(data).toHaveProperty('atividadeFisica');
      expect(data).toHaveProperty('glicemia');
      expect(data).toHaveProperty('pressaoArterial');
      expect(data).toHaveProperty('timestamp');
      
      expect(typeof data.frequenciaCardiaca).toBe('number');
      expect(typeof data.oxigenacao).toBe('number');
      expect(typeof data.temperatura).toBe('number');
      expect(typeof data.timestamp).toBe('string');
    });
  });

  describe('diagnosticService', () => {
    it('should return properly typed medical image analysis', async () => {
      const analysis = await diagnosticService.analyzeMedicalImages('Raio-X');
      
      expect(analysis).toHaveProperty('tipo');
      expect(analysis).toHaveProperty('resultado');
      expect(analysis).toHaveProperty('confianca');
      expect(analysis).toHaveProperty('detalhes');
      expect(analysis).toHaveProperty('timestamp');
      
      expect(typeof analysis.confianca).toBe('number');
      expect(analysis.confianca).toBeGreaterThan(0);
      expect(analysis.confianca).toBeLessThanOrEqual(1);
    });

    it('should return properly typed differential diagnosis', async () => {
      const diagnosis = await diagnosticService.generateDifferentialDiagnosis();
      
      expect(diagnosis).toHaveProperty('lista');
      expect(diagnosis).toHaveProperty('sugestoes');
      expect(diagnosis).toHaveProperty('timestamp');
      
      expect(Array.isArray(diagnosis.lista)).toBe(true);
      expect(Array.isArray(diagnosis.sugestoes)).toBe(true);
      
      if (diagnosis.lista.length > 0) {
        expect(diagnosis.lista[0]).toHaveProperty('diagnostico');
        expect(diagnosis.lista[0]).toHaveProperty('probabilidade');
        expect(typeof diagnosis.lista[0].probabilidade).toBe('number');
      }
    });
  });

  describe('treatmentService', () => {
    it('should return properly typed treatment plan', async () => {
      const plan: TreatmentPlan = await treatmentService.suggestTreatmentPlan();
      
      expect(plan).toHaveProperty('plano');
      expect(plan).toHaveProperty('personalizado');
      expect(plan).toHaveProperty('baseadoEm');
      expect(plan).toHaveProperty('timestamp');
      
      expect(typeof plan.plano).toBe('string');
      expect(typeof plan.personalizado).toBe('boolean');
      expect(Array.isArray(plan.baseadoEm)).toBe(true);
    });
  });

  describe('Type Definitions', () => {
    it('should validate TipoRegistroSimbotico union type', () => {
      const validTypes: TipoRegistroSimbotico[] = ['crenca', 'principio', 'aprendizado'];
      
      validTypes.forEach(tipo => {
        expect(['crenca', 'principio', 'aprendizado']).toContain(tipo);
      });
    });
  });
});