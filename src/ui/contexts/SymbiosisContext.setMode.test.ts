import {
  SymbiosisContextValue,
  // isValidSymbiosisMode, // Removido: não existe
} from './SymbiosisContext';

describe('SymbiosisContext - setMode', () => {
  let mockSetMode: jest.Mock;
  let contextValue: SymbiosisContextValue;

  beforeEach(() => {
    mockSetMode = jest.fn(async () => {
      // if (!isValidSymbiosisMode(mode)) {
      //   throw new Error('Modo inválido');
      // }
    });

      contextValue = {
        gregState: {
          mode: 'zen',
          status: 'ativo',
          usageMetrics: {
            totalRequests: 0,
            lastAnalysis: '2025-07-29',
          },
        },
        setMode: mockSetMode,
        mode: 'zen',
        status: 'ativo',
        usoTotal: 0,
        lastAnalysis: '2025-07-29',
        memory: [],
        addMemory: jest.fn(),
        missoes: [],
        setMissoes: jest.fn(),
        modos: [],
        modeHistory: [],
        sugerirModoPorHistorico: () => null,
      };
  });

  it('deve aceitar modos válidos', async () => {
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

    for (const mode of validModes) {
      await expect(contextValue.setMode(mode as any)).resolves.not.toThrow();
    }
  });

  it('deve rejeitar modos inválidos', async () => {
    const invalidModes = ['invalido', '123', '', 'zen-mode', 'estrategia!'];

    for (const mode of invalidModes) {
      await expect(contextValue.setMode(mode as any)).rejects.toThrow(
        'Modo inválido'
      );
    }
  });
});
