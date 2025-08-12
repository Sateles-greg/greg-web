import type { FHIRResource } from '../types/biomed';

// Integração real com FHIR (Fast Healthcare Interoperability Resources)
// Exemplo usando fetch para servidores FHIR públicos (read-only)
export const fhirService = {
  async getPatient(patientId: string): Promise<FHIRResource> {
    // Exemplo: servidor público HAPI FHIR
    const url = `https://hapi.fhir.org/baseR4/Patient/${patientId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Erro ao buscar paciente FHIR');
    return await res.json();
  },
  async getObservations(patientId: string): Promise<FHIRResource> {
    const url = `https://hapi.fhir.org/baseR4/Observation?patient=${patientId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Erro ao buscar observações FHIR');
    return await res.json();
  },
};
