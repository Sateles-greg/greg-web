
import React, { useEffect, useState, useRef } from 'react';
import styles from './BiomedPanel.module.css';
import { biomedDataService } from '../biomed/biomedDataService';
import { diagnosticService } from '../biomed/diagnosticService';
import { treatmentService } from '../biomed/treatmentService';
import { ethicsService } from '../biomed/ethicsService';
import { biomedKnowledgeService } from '../biomed/biomedKnowledgeService';
import { fhirService } from '../biomed/fhirService';
import { blockchainService } from '../biomed/blockchainService';
import { quantumSafeService } from '../biomed/quantumSafeService';

const userId = 'usuario-demo';

const blockchainStatus = {
  ativo: true,
  rede: 'Hyperledger (simulado)',
  quantumSafe: true,
  ultimaSincronizacao: new Date().toISOString(),
};

const quantumStatus = {
  ativo: true,
  protocolo: 'Quantum Key Distribution (simulado)',
  ultimaVerificacao: new Date().toISOString(),
};

const BiomedPanel: React.FC = () => {
  const [medicalHistory, setMedicalHistory] = useState<any>(null);
  const [biosensor, setBiosensor] = useState<any>(null);
  const [genomic, setGenomic] = useState<any>(null);
  const [environment, setEnvironment] = useState<any>(null);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [treatment, setTreatment] = useState<any>(null);
  const [privacy, setPrivacy] = useState<any>(null);
  const [literature, setLiterature] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [consentOptions, setConsentOptions] = useState<string[]>([]);
  const [consent, setConsent] = useState<{[k:string]: boolean}>({});
  const [fhirPatient, setFhirPatient] = useState<any>(null);
  const [blockchainAudit, setBlockchainAudit] = useState<any[]>([]);
  const [quantumKey, setQuantumKey] = useState<any>(null);
  const [quantumChannel, setQuantumChannel] = useState<any>(null);
  const logsRef = useRef<any[]>([]);

  // Simulação de eventos dinâmicos
  useEffect(() => {
    let interval: NodeJS.Timeout;
    (async () => {
      setMedicalHistory(await biomedDataService.getUnifiedMedicalHistory(userId));
      setBiosensor(await biomedDataService.getRealtimeBiosensorData(userId));
      setGenomic(await biomedDataService.getGenomicData(userId));
      setEnvironment(await biomedDataService.getEnvironmentalData());
      setDiagnosis(await diagnosticService.generateDifferentialDiagnosis(['tosse', 'febre']));
      setTreatment(await treatmentService.suggestTreatmentPlan({}));
      setPrivacy(await ethicsService.getPrivacyStatus(userId));
      setLiterature(await biomedKnowledgeService.getLatestLiterature('IA médica'));
      const options = await ethicsService.getConsentOptions();
      setConsentOptions(options);
      setConsent(options.reduce((acc, opt) => ({...acc, [opt]: true}), {}));
      // FHIR real: buscar paciente demo
      try {
        const patient = await fhirService.getPatient('example');
        setFhirPatient(patient);
      } catch (e) {
        setFhirPatient({ resourceType: 'Patient', name: [{ given: ['Não encontrado'] }] });
      }
      // Blockchain: obter trilha de auditoria
      setBlockchainAudit(await blockchainService.getAuditTrail());
      // Quantum-safe: gerar chave e verificar canal
      setQuantumKey(await quantumSafeService.generateQuantumKey());
      setQuantumChannel(await quantumSafeService.verifyQuantumChannel());
      const initialLogs = [
        { evento: 'Acesso ao histórico', por: 'Dr. Silva', data: new Date().toISOString() },
        { evento: 'Simulação de ataque detectada', por: 'Firewall', data: new Date().toISOString() },
        { evento: 'Salto de nó na rede biomédica', por: 'MeshNode-42', data: new Date().toISOString() }
      ];
      setLogs(initialLogs);
      logsRef.current = initialLogs;
    })();
    // Eventos dinâmicos
    interval = setInterval(() => {
      const events = [
        { evento: 'Acesso autorizado', por: 'Profissional de saúde', data: new Date().toISOString() },
        { evento: 'Ataque bloqueado', por: 'Firewall', data: new Date().toISOString() },
        { evento: 'Salto de nó', por: 'MeshNode-' + Math.floor(Math.random()*100), data: new Date().toISOString() },
        { evento: 'Consentimento atualizado', por: 'Usuário', data: new Date().toISOString() }
      ];
      const newEvent = events[Math.floor(Math.random()*events.length)];
      logsRef.current = [newEvent, ...logsRef.current].slice(0, 10);
      setLogs([...logsRef.current]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Controle de consentimento granular
  const handleConsentChange = async (opt: string) => {
    setConsent((prev) => ({...prev, [opt]: !prev[opt]}));
    await ethicsService.logEvent('Consentimento alterado: ' + opt, 'Usuário');
    setLogs((prev) => [
      { evento: 'Consentimento alterado: ' + opt, por: 'Usuário', data: new Date().toISOString() },
      ...prev
    ].slice(0, 10));
  };

  return (
    <section className={styles.biomedPanel}>
      <h2>Saúde Integrada & Diagnóstico Avançado</h2>
      <div className={styles.section}>
        <h3>Histórico Médico Unificado</h3>
        {medicalHistory ? (
          <ul>
            <li><b>Exames:</b> {medicalHistory.exames.join(', ')}</li>
            <li><b>Consultas:</b> {medicalHistory.consultas.join(', ')}</li>
            <li><b>Cirurgias:</b> {medicalHistory.cirurgias.join(', ')}</li>
            <li><b>Medicações:</b> {medicalHistory.medicacoes.join(', ')}</li>
            <li><b>Alergias:</b> {medicalHistory.alergias.join(', ')}</li>
            <li><b>Histórico Familiar:</b> {medicalHistory.historicoFamiliar.join(', ')}</li>
            <li><b>Fontes:</b> {medicalHistory.fontes.join(', ')}</li>
            <li><b>Consentimento:</b> {medicalHistory.consentimento ? 'Sim' : 'Não'}</li>
          </ul>
        ) : 'Carregando...'}
      </div>
      <div className={styles.section}>
        <h3>Biossensores & Ambiente</h3>
        {biosensor && environment ? (
          <ul>
            <li><b>Frequência Cardíaca:</b> {biosensor.frequenciaCardiaca} bpm</li>
            <li><b>Oxigenação:</b> {biosensor.oxigenacao}%</li>
            <li><b>Temperatura:</b> {biosensor.temperatura.toFixed(1)}°C</li>
            <li><b>Glicemia:</b> {biosensor.glicemia} mg/dL</li>
            <li><b>Pressão Arterial:</b> {biosensor.pressaoArterial}</li>
            <li><b>Qualidade do Ar:</b> {environment.qualidadeAr}</li>
            <li><b>Poluição Sonora:</b> {environment.poluicaoSonora}</li>
            <li><b>Dieta:</b> {environment.dieta}</li>
            <li><b>Estresse:</b> {environment.stress}</li>
          </ul>
        ) : 'Carregando...'}
      </div>
      <div className={styles.section}>
        <h3>Análise Genômica</h3>
        {genomic ? (
          <ul>
            <li><b>Predisposições:</b> {genomic.predisposicoes.join(', ')}</li>
            <li><b>Reações a Medicamentos:</b> {genomic.reacoesMedicamentos.join(', ')}</li>
            <li><b>Proteômica:</b> {genomic.proteomica.join(', ')}</li>
          </ul>
        ) : 'Carregando...'}
      </div>
      <div className={styles.section}>
        <h3>Diagnóstico Diferencial</h3>
        {diagnosis ? (
          <ul>
            {diagnosis.lista.map((d: any, i: number) => (
              <li key={i}><b>{d.diagnostico}:</b> {Math.round(d.probabilidade*100)}%</li>
            ))}
            <li><b>Sugestões:</b> {diagnosis.sugestoes.join(', ')}</li>
          </ul>
        ) : 'Carregando...'}
      </div>
      <div className={styles.section}>
        <h3>Tratamento Personalizado</h3>
        {treatment ? (
          <ul>
            <li><b>Plano:</b> {treatment.plano}</li>
            <li><b>Baseado em:</b> {treatment.baseadoEm.join(', ')}</li>
          </ul>
        ) : 'Carregando...'}
      </div>
      <div className={styles.section}>
        <h3>Privacidade, Consentimento & Compliance</h3>
        {privacy ? (
          <ul>
            <li><b>Criptografia:</b> {privacy.criptografia}</li>
            <li><b>Consentimento:</b> {privacy.consentimento}</li>
            <li><b>Compliance:</b> {privacy.compliance.join(', ')}</li>
            <li><b>Acesso:</b> {privacy.acesso.join(', ')}</li>
            <li><b>Última Auditoria:</b> {privacy.ultimoAudit}</li>
          </ul>
        ) : 'Carregando...'}
        <div className={styles.consentGranular}>
          <b>Consentimento Granular:</b>
          <ul>
            {consentOptions.map(opt => (
              <li key={opt}>
                <label>
                  <input type="checkbox" checked={!!consent[opt]} onChange={() => handleConsentChange(opt)} /> {opt}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.section}>
        <h3>Status Blockchain & Quântico</h3>
        <ul>
          <li><b>Blockchain:</b> {blockchainStatus.ativo ? 'Ativo' : 'Inativo'} ({blockchainStatus.rede})</li>
          <li><b>Quantum-safe:</b> {blockchainStatus.quantumSafe ? 'Sim' : 'Não'}</li>
          <li><b>Última Sincronização:</b> {blockchainStatus.ultimaSincronizacao}</li>
          <li><b>Protocolo Quântico:</b> {quantumStatus.protocolo}</li>
          <li><b>Última Verificação Quântica:</b> {quantumStatus.ultimaVerificacao}</li>
        </ul>
        <div className={styles.apiStatus}>
          <b>APIs externas:</b> Pronto para integração FHIR, blockchain real, quantum-safe, etc.
        </div>
      </div>
      <div className={styles.section}>
        <h3>Logs & Eventos (Tempo Real)</h3>
        <ul>
          {logs.map((log, i) => (
            <li key={i}><b>{log.evento}</b> — {log.por} — {log.data}</li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h3>FHIR (Dados Reais)</h3>
        {fhirPatient ? (
          <ul>
            <li><b>ID:</b> {fhirPatient.id}</li>
            <li><b>Nome:</b> {fhirPatient.name && fhirPatient.name[0] ? fhirPatient.name[0].given.join(' ') : 'N/A'}</li>
            <li><b>ResourceType:</b> {fhirPatient.resourceType}</li>
          </ul>
        ) : 'Carregando...'}
      </div>
      <div className={styles.section}>
        <h3>Blockchain (Auditoria)</h3>
        <ul>
          {blockchainAudit.map((a, i) => (
            <li key={i}><b>{a.evento}</b> — {a.por} — {a.hash} — {a.timestamp}</li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Quantum-safe</h3>
        <ul>
          <li><b>Chave Quântica:</b> {quantumKey ? quantumKey.key : 'Gerando...'}</li>
          <li><b>Status:</b> {quantumKey ? quantumKey.status : ''}</li>
          <li><b>Canal:</b> {quantumChannel ? quantumChannel.status : ''}</li>
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Literatura & Pesquisa</h3>
        {literature ? (
          <ul>
            {literature.map((art: any, i: number) => (
              <li key={i}><b>{art.titulo}</b> — {art.fonte} ({art.ano})</li>
            ))}
          </ul>
        ) : 'Carregando...'}
      </div>
    </section>
  );
};

export default BiomedPanel;
