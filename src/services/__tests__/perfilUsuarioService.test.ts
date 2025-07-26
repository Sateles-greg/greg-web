import { registrarPerfil, obterPerfil, atualizarEstadoEmocional, PerfilUsuario } from '../perfilUsuarioService';

describe('perfilUsuarioService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('registra e recupera perfil', () => {
    const perfil: PerfilUsuario = {
      id: '1',
      nome: 'Greg',
      preferencias: ['IA', 'Simbiose'],
      objetivos: ['Evoluir'],
      estadosEmocionais: ['neutro'],
      historico: []
    };
    registrarPerfil(perfil);
    expect(obterPerfil()).toEqual(perfil);
  });

  it('atualiza estado emocional', () => {
    const perfil: PerfilUsuario = {
      id: '1',
      nome: 'Greg',
      preferencias: [],
      objetivos: [],
      estadosEmocionais: [],
      historico: []
    };
    registrarPerfil(perfil);
    atualizarEstadoEmocional('feliz');
    const atualizado = obterPerfil();
    expect(atualizado?.estadosEmocionais).toContain('feliz');
  });
});
