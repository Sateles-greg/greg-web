// Serviço de perfil dinâmico do usuário para ASI Greg
export type PerfilUsuario = {
  id: string;
  nome: string;
  preferencias: string[];
  objetivos: string[];
  estadosEmocionais: string[];
  historico: Array<{ data: string; acao: string; contexto: string }>;
};

let perfilAtual: PerfilUsuario | null = null;

export function registrarPerfil(perfil: PerfilUsuario) {
  perfilAtual = perfil;
  localStorage.setItem('greg_perfil_usuario', JSON.stringify(perfil));
}

export function obterPerfil(): PerfilUsuario | null {
  if (perfilAtual) return perfilAtual;
  const dados = localStorage.getItem('greg_perfil_usuario');
  return dados ? JSON.parse(dados) : null;
}

export function atualizarEstadoEmocional(estado: string) {
  if (!perfilAtual) return;
  perfilAtual.estadosEmocionais.push(estado);
  registrarPerfil(perfilAtual);
}
