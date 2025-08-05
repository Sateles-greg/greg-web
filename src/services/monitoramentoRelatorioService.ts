// Serviço de monitoramento contínuo e geração de relatórios automáticos
import { obterPerfil } from './perfilUsuarioService';
import { recuperarMemorias } from './memoriaSimbioAdaptativa';
import { coletarDadosIoT } from './integracaoIoTService';

export type RelatorioGreg = {
  timestamp: string;
  perfil: any;
  memorias: any[];
  iot: any[];
  status: string;
};

export async function gerarRelatorioAutomatico() {
  const perfil = obterPerfil();
  const memorias = recuperarMemorias();
  const iot = await coletarDadosIoT();
  const relatorio: RelatorioGreg = {
    timestamp: new Date().toISOString(),
    perfil,
    memorias,
    iot,
    status: 'OK',
  };
  localStorage.setItem('greg_relatorio_auto', JSON.stringify(relatorio));
  return relatorio;
}

export function obterRelatorioAtual(): RelatorioGreg | null {
  const dados = localStorage.getItem('greg_relatorio_auto');
  return dados ? JSON.parse(dados) : null;
}
