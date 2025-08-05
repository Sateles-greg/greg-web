import { useContext } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { SymbiosisContext, SymbiosisContextValue } from './SymbiosisContext';
import { SymbiosisMode } from './SymbiosisContext';

// Componente de teste que consome o contexto
const TestComponent = () => {
  const context = useContext(SymbiosisContext);

  if (!context) {
    return <div>Contexto não disponível</div>;
  }

  const { mode, setMode } = context;

  return (
    <div>
      <p>Modo atual: {mode}</p>
      <button onClick={() => setMode('zen')}>Definir modo para Zen</button>
      <button onClick={() => setMode('invalido' as unknown as SymbiosisMode)}>Definir modo inválido</button>
    </div>
  );
};

describe('SymbiosisContext - Funcional', () => {
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
      mode: 'estrategia',
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

  it('deve permitir alterar o modo para um valor válido', async () => {
    render(
      <SymbiosisContext.Provider value={contextValue}>
        <TestComponent />
      </SymbiosisContext.Provider>
    );

    fireEvent.click(screen.getByText('Definir modo para Zen'));

    expect(mockSetMode).toHaveBeenCalledWith('zen');
    expect(mockSetMode).toHaveBeenCalledTimes(1);
  });

  it('deve rejeitar alteração para um modo inválido', async () => {
    render(
      <SymbiosisContext.Provider value={contextValue}>
        <TestComponent />
      </SymbiosisContext.Provider>
    );

    await expect(mockSetMode('invalido' as unknown as SymbiosisMode)).rejects.toThrow('Modo inválido');
    expect(mockSetMode).toHaveBeenCalledWith('invalido');
    expect(mockSetMode).toHaveBeenCalledTimes(1);
  });
});
