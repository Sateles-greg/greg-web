export function rotinaNoturnaReorganizacao() {
  // Simula limpeza e organização de memórias simbióticas
  const registros = recuperarSimbioticos();
  const otimizados = registros.filter(
    (r) => r.tipo !== 'aprendizado' || r.conteudo.length > 10
  );
  localStorage.setItem('greg_memoria_simbiotica', JSON.stringify(otimizados));
  return otimizados.length;
}
export type RegistroSimbiotico = {
  tipo: 'crenca' | 'principio' | 'aprendizado';
  conteudo: string;
  data: string;
};

const STORAGE_SIMBIOTICO = 'greg_memoria_simbiotica';

export function registrarSimbiotico(registro: RegistroSimbiotico) {
  const registros = recuperarSimbioticos();
  registros.push(registro);
  localStorage.setItem(STORAGE_SIMBIOTICO, JSON.stringify(registros));
}

export function recuperarSimbioticos(): RegistroSimbiotico[] {
  const dados = localStorage.getItem(STORAGE_SIMBIOTICO);
  return dados ? JSON.parse(dados) : [];
}
import axios from 'axios';
import { SymbiosisMode } from '@contexts/SymbiosisContext';

function getApiUrl() {
  if (typeof process.env !== 'undefined' && process.env.VITE_API_URL) {
    return process.env.VITE_API_URL;
  }
  return 'http://localhost:3001';
}

// ...existing code...

export type RegistroModo = {
  modo: SymbiosisMode;
  data: string;
};

const STORAGE_KEY = 'greg_memoria_modos';

export async function registrarModo(modo: SymbiosisMode) {
  const agora = new Date().toISOString();
  const registro: RegistroModo = { modo, data: agora };

  const registros = recuperarRegistros();
  registros.push(registro);
  const otimizado = registros.slice(-500);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(otimizado));

  // Tenta sincronizar com o backend apenas se estiver disponível
  try {
    // Verifica se o backend responde antes de tentar sincronizar
    await axios.get(`${getApiUrl()}/api/ping`, { timeout: 2000 });
    await axios.post(`${getApiUrl()}/api/sincronizarModo`, {
      modo,
      data: agora,
    });
  } catch (e) {
    console.warn(
      'Backend não disponível, sincronização será ignorada. Modo salvo apenas localmente.'
    );
  }
}

export function recuperarRegistros(): RegistroModo[] {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

export function contarModosMaisUsados(
  periodoDias?: number
): Record<SymbiosisMode, number> {
  const agora = new Date();
  const limite = periodoDias
    ? new Date(agora.getTime() - periodoDias * 86400000)
    : null;

  const registros = recuperarRegistros().filter(
    (r) => !limite || new Date(r.data) >= limite
  );

  const contagem: Record<SymbiosisMode, number> = {} as any;
  registros.forEach(({ modo }) => {
    contagem[modo] = (contagem[modo] || 0) + 1;
  });

  return contagem;
}

export function sugerirModoPorHistorico(): SymbiosisMode | null {
  const stats = contarModosMaisUsados();
  const entrada = Object.entries(stats);
  if (!entrada.length) return null;
  entrada.sort((a, b) => b[1] - a[1]);
  return entrada[0][0] as SymbiosisMode;
}

export function gerarDadosParaGrafico(periodoDias = 7) {
  const dados = contarModosMaisUsados(periodoDias);
  return {
    labels: Object.keys(dados),
    datasets: [
      {
        label: 'Usos por modo',
        data: Object.values(dados),
        backgroundColor: [
          '#1e40af',
          '#047857',
          '#7c3aed',
          '#111827',
          '#f59e0b',
          '#f87171',
          '#a3e635',
          '#a78bfa',
          '#facc15',
          '#818cf8',
        ],
      },
    ],
  };
}

export function exportarRelatorioSimbiotico(): string {
  const registros = recuperarRegistros();
  const linhas = registros.map((r) => `${r.data} - ${r.modo}`);
  return ['Histórico de Modos Ativados:', ...linhas].join('\n');
}
