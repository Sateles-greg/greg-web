import { gerarRelatorioAutomatico } from '../services/monitoramentoRelatorioService';
import { traduzirGoogle, obterRotaGoogle } from '../services/integracaoGoogleService';
import { analisarSentimento } from '../services/integracaoHuggingFaceService';
import { coletarDadosIoT } from '../services/integracaoIoTService';
import { avaliarEAutoajustar } from '../services/autoajusteSimbioService';
import { gerarIdeiaInovadora } from '../services/inovacaoGenerativaService';
import { avaliarDesempenho, autoajustarModelos } from '../services/avaliacaoAutoajusteService';
import { sugerirInovacaoSimbio } from '../services/inovacaoSimbioService';


import Avatar from './Avatar';
import { sincronizarCalendario } from '../services/calendarService';
import { coletarDadosBiometricos } from '../services/biometriaService';
import { sugerirRotina } from '../services/routineService';
import { useEffect, useState } from 'react';
import styles from './DashboardCentral.module.css';
import DiarioDeAtividades from './DiarioDeAtividades';
import FeedbackSimbotico from './FeedbackSimbotico';
import MemoriaGreg from './MemoriaGreg';
import LinhaDoTempo from './LinhaDoTempo';
import RevisaoSimbiotica from './RevisaoSimbiotica';
import EstadosMentaisGreg from './EstadosMentaisGreg';
import PainelCiclos from './PainelCiclos';
import SugestoesDoDia from './SugestoesDoDia';
import PainelLegal from './PainelLegal';
import GregVerseExplorer from './GregVerseExplorer';
import AutoAjusteComparativo from './AutoAjusteComparativo';
import { obterPerfil } from '../services/perfilUsuarioService';
import { recuperarMemorias } from '../services/memoriaSimbioAdaptativa';
import { analisarTexto, respostaSimbio } from '../services/nlpSimbioService';
import { exportarRelatorioJSON } from '../services/exportacaoRelatorioService';
import { auditarRelatorio } from '../services/auditoriaSimbioService';
import { enviarNotificacaoSimbiotica } from '../services/notificacaoSimbioService';
import { BufferInteligente } from '../services/processamentoTempoRealService';
import { traduzirTexto } from '../services/traducaoAutomaticaService';
import { obterRotaInteligente } from '../services/logisticaInteligenteService';
import { gerarAlertaDiagnostico } from '../services/diagnosticoMedicoInteligenteService';
import { criptografarDados } from '../services/segurancaSimbioService';

  // const [diagnostico, setDiagnostico] = useState<string>(''); // Removido: não utilizado
type EventoCalendario = { evento: string; data: string };
type RotinaSugerida = { rotina: string; motivo: string };

export default function DashboardCentral() {
  const [eventos, setEventos] = useState<EventoCalendario[]>([]);
  const [biometria, setBiometria] = useState<any>({});
  const [rotinas, setRotinas] = useState<RotinaSugerida[]>([]);
  const [perfil, setPerfil] = useState<any>(null);
  const [memorias, setMemorias] = useState<any[]>([]);
  const [sentimento, setSentimento] = useState<string>('');
  const [respostaNLP, setRespostaNLP] = useState<string>('');
  const [buffer, setBuffer] = useState<any[]>([]);
  const [traducao, setTraducao] = useState<string>('');
  const [rota, setRota] = useState<any>(null);
  const [diagnostico, setDiagnostico] = useState<string>('');
  const [dadosSeguros, setDadosSeguros] = useState<string>('');
  const [metricas, setMetricas] = useState<any>(null);
  const [ajuste, setAjuste] = useState<string>('');
  const [inovacao, setInovacao] = useState<string>('');
  const [traducaoGoogle, setTraducaoGoogle] = useState<string>('');
  const [rotaGoogle, setRotaGoogle] = useState<any>(null);
  const [sentimentoHF, setSentimentoHF] = useState<string>('');
  const [iot, setIot] = useState<any[]>([]);
  const [ajusteSimbio, setAjusteSimbio] = useState<string>('');
  const [ideiaGen, setIdeiaGen] = useState<string>('');
  const [relatorioAuto, setRelatorioAuto] = useState<any>(null);

  useEffect(() => {
    sincronizarCalendario().then((evs) => setEventos(evs));
    coletarDadosBiometricos().then(setBiometria);
    setRotinas(sugerirRotina());
    setPerfil(obterPerfil());
    setMemorias(recuperarMemorias());
    analisarTexto('Olá Greg, como você está?').then((r) => setSentimento(JSON.stringify(r)));
    respostaSimbio('Olá Greg, como você está?', 'Saudação inicial').then(setRespostaNLP);
    const buf = new BufferInteligente<string>(10);
    buf.adicionar('Dado simbiótico 1');
    buf.adicionar('Dado simbiótico 2');
    setBuffer(buf.obterTodos());
    traduzirTexto('Olá, mundo!', 'en').then(setTraducao);
    obterRotaInteligente('Avenida Paulista, SP', 'Rua Vergueiro, SP').then(setRota);
    gerarAlertaDiagnostico({ label: 'Anemia', confidence: 0.85 }).then(setDiagnostico);
    setDadosSeguros(criptografarDados('dados confidenciais', 'chaveSimbiotica'));
    setMetricas(avaliarDesempenho());
    setAjuste(autoajustarModelos());
    sugerirInovacaoSimbio('Saúde digital e bem-estar', 'Saúde').then(setInovacao);
    traduzirGoogle('Olá, mundo!', 'en').then(setTraducaoGoogle);
    obterRotaGoogle('Avenida Paulista, SP', 'Rua Vergueiro, SP').then(setRotaGoogle);
    analisarSentimento('Greg está evoluindo!').then((r) => setSentimentoHF(JSON.stringify(r)));
    coletarDadosIoT().then(setIot);
    setAjusteSimbio(avaliarEAutoajustar({ acuracia: 0.8, relevancia: 0.9, eficiencia: 0.7, impacto: 0.85 }));
    gerarIdeiaInovadora('Expansão ASI Greg', 'Tecnologia').then(setIdeiaGen);
    gerarRelatorioAutomatico().then(setRelatorioAuto);
  }, []);

  return (
    <div className={styles.dashboardRoot}>
      <Avatar />
      <div className={styles.cardsContainer}>
        <div className={styles.card}><h4>Eventos do Calendário</h4><ul>{eventos.map((e, i) => <li key={i}>{e.evento} - {e.data}</li>)}</ul></div>
        <div className={styles.card}><h4>Biometria</h4><pre>{JSON.stringify(biometria, null, 2)}</pre></div>
        <div className={styles.card}><h4>Rotinas Sugeridas</h4><ul>{rotinas.map((r, i) => <li key={i}>{r.rotina} - {r.motivo}</li>)}</ul></div>
        <div className={styles.card}><h4>Relatório Automático</h4><pre>{JSON.stringify(relatorioAuto, null, 2)}</pre></div>
        <div className={styles.card}><DiarioDeAtividades /></div>
        <div className={styles.card}><FeedbackSimbotico /></div>
        <div className={styles.card}><MemoriaGreg /></div>
        <div className={styles.card}><LinhaDoTempo /></div>
        <div className={styles.card}><RevisaoSimbiotica /></div>
        <div className={styles.card}><EstadosMentaisGreg /></div>
        <div className={styles.card}><PainelCiclos /></div>
        <div className={styles.card}><SugestoesDoDia /></div>
        <div className={styles.card}><PainelLegal /></div>
        <div className={styles.card}><GregVerseExplorer /></div>
        <div className={styles.card}><AutoAjusteComparativo /></div>
        <div className={styles.card}><h4>Perfil Dinâmico</h4><pre>{JSON.stringify(perfil, null, 2)}</pre></div>
        <div className={styles.card}><h4>Memória Simbiótica</h4><pre>{JSON.stringify(memorias, null, 2)}</pre></div>
        <div className={styles.card}><h4>NLP & Resposta Simbiótica</h4><div>Sentimento: {sentimento}</div><div>Resposta: {respostaNLP}</div></div>
        <div className={styles.card}><h4>Processamento em Tempo Real</h4><pre>{JSON.stringify(buffer, null, 2)}</pre></div>
        <div className={styles.card}><h4>Tradução Automática</h4><div>{traducao}</div></div>
        <div className={styles.card}><h4>Logística Inteligente</h4><pre>{JSON.stringify(rota, null, 2)}</pre></div>
        <div className={styles.card}><h4>Diagnóstico Médico Inteligente</h4><div>{diagnostico}</div></div>
        <div className={styles.card}><h4>Privacidade & Segurança</h4><div>Dados criptografados: {dadosSeguros}</div></div>
        <div className={styles.card}><h4>Automação & Inovação Simbiótica</h4><div>Em desenvolvimento...</div></div>
        <div className={styles.card}><h4>Avaliação & Autoajuste</h4><pre>{JSON.stringify(metricas, null, 2)}</pre><div>{ajuste}</div></div>
        <div className={styles.card}><h4>Inovação Simbiótica</h4><div>{inovacao}</div></div>
        <div className={styles.card}><h4>Google APIs</h4><div>Tradução: {traducaoGoogle}</div><pre>{JSON.stringify(rotaGoogle, null, 2)}</pre></div>
        <div className={styles.card}><h4>Hugging Face</h4><div>Sentimento: {sentimentoHF}</div></div>
        <div className={styles.card}><h4>IoT</h4><pre>{JSON.stringify(iot, null, 2)}</pre></div>
        <div className={styles.card}><h4>Autoajuste Simbiótico</h4><div>{ajusteSimbio}</div></div>
        <div className={styles.card}><h4>Inovação Generativa</h4><div>{ideiaGen}</div></div>
        <div className={styles.card}>
          <h4>Ações do Relatório</h4>
          <button onClick={() => {
            try {
              exportarRelatorioJSON();
            } catch (e) {
              alert('Erro ao exportar relatório');
            }
          }}>Exportar JSON</button>
          <button onClick={() => {
            try {
              auditarRelatorio();
            } catch (e) {
              alert('Erro ao auditar relatório');
            }
          }}>Auditar Relatório</button>
          <button onClick={() => {
            (async () => {
              try {
                await enviarNotificacaoSimbiotica('Relatório Greg', JSON.stringify(relatorioAuto));
              } catch (e) {
                alert('Erro ao enviar notificação');
              }
            })();
          }}>Notificar</button>
        </div>
      </div>
    </div>
  );
}
