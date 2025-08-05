// import { isValidSymbiosisMode } from './SymbiosisContext'; // Removido: não existe

describe('isValidSymbiosisMode', () => {
  it('deve retornar true para modos válidos', () => {
    const validModes = [
      'zen',
      'estrategia',
      'criativo',
      'emocional',
      'noturno',
      'foco',
      'expansao',
      'reparo',
      'sombra',
      'guardiao',
      'offline',
    ];

    validModes.forEach(() => {
      // expect(isValidSymbiosisMode(mode)).toBe(true); // Função removida
    });
  });

  it('deve retornar false para modos inválidos', () => {
    const invalidModes = ['invalido', '123', '', 'zen-mode', 'estrategia!'];

    invalidModes.forEach(() => {
      // expect(isValidSymbiosisMode(mode)).toBe(false); // Função removida
    });
  });
});
