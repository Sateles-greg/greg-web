// import React from 'react'; // Removido: não utilizado
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import { SymbiosisContext, SymbiosisContextValue } from './SymbiosisContext';
import { SymbiosisProvider } from './SymbiosisProvider';
import { useSymbiosis } from './useSymbiosis';

// Componente A que consome o contexto
const ComponentA = () => {
  const context = useContext(SymbiosisContext);

  if (!context) {
    return <div>Contexto não disponível</div>;
  }

  const { mode, setMode } = context;

  return (
    <div>
      <p>Componente A - Modo atual: {mode}</p>
      <button onClick={() => setMode('criativo')}>Definir modo para Criativo</button>
      {/* <button onClick={() => setMode('colaborativo')}>Definir modo para Colaborativo</button>
      <button onClick={() => setMode('automacao')}>Definir modo para Automação</button>
      <button onClick={() => setMode('diagnostico')}>Definir modo para Diagnóstico</button> */}
    </div>
  );
};

// Componente B que consome o contexto
const ComponentB = () => {
  const context = useContext(SymbiosisContext);

  if (!context) {
    return <div>Contexto não disponível</div>;
  }

  const { mode } = context;

  return <p>Componente B - Modo atual: {mode}</p>;
};

const TestComponent = () => {
  const { mode } = useSymbiosis();

  return (
    <div>
      <p>Modo atual: {mode}</p>
      {/* <button onClick={() => setMode('colaborativo')}>Definir modo para Colaborativo</button>
      <button onClick={() => setMode('automacao')}>Definir modo para Automação</button>
      <button onClick={() => setMode('diagnostico')}>Definir modo para Diagnóstico</button> */}
    </div>
  );
};

describe('SymbiosisContext - Integração', () => {
  let mockSetMode: jest.Mock;
  let contextValue: SymbiosisContextValue;

  beforeEach(() => {
    mockSetMode = jest.fn(async (mode) => {
      contextValue.mode = mode; // Atualiza o valor do modo diretamente
      contextValue.gregState.mode = mode; // Propaga o estado para gregState
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
      // mocks para propriedades obrigatórias do contexto
      memory: [],
      addMemory: jest.fn(),
      missoes: [],
      setMissoes: jest.fn(),
      modos: [],
      modeHistory: [],
      sugerirModoPorHistorico: jest.fn(),
    };
  });
      // Validação de modo desabilitada temporariamente

  it('deve propagar alterações de estado entre múltiplos componentes', async () => {
    render(
      <SymbiosisContext.Provider value={contextValue}>
        <ComponentA />
        <ComponentB />
      </SymbiosisContext.Provider>
    );

    // Verifica o estado inicial
    expect(screen.getByText('Componente A - Modo atual: zen')).toBeInTheDocument();
    expect(screen.getByText('Componente B - Modo atual: zen')).toBeInTheDocument();

    // Altera o estado através do Componente A
    fireEvent.click(screen.getByText('Definir modo para Criativo'));

    // Verifica se o estado foi propagado para o Componente B
    await waitFor(() => {
      expect(screen.getByText((content) => content.replace(/\s+/g, ' ').trim().includes('Componente A - Modo atual: criativo'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.replace(/\s+/g, ' ').trim().includes('Componente B - Modo atual: criativo'))).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Definir modo para Automação'));
    await waitFor(() => {
      expect(screen.getByText((content) => content.replace(/\s+/g, ' ').trim().includes('Componente A - Modo atual: automacao'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.replace(/\s+/g, ' ').trim().includes('Componente B - Modo atual: automacao'))).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Definir modo para Diagnóstico'));
    await waitFor(() => {
      expect(screen.getByText((content) => content.replace(/\s+/g, ' ').trim().includes('Componente A - Modo atual: diagnostico'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.replace(/\s+/g, ' ').trim().includes('Componente B - Modo atual: diagnostico'))).toBeInTheDocument();
    });
  });

  it('deve permitir alterar para os novos modos', async () => {
    render(
      <SymbiosisProvider>
        <ComponentA />
        <ComponentB />
      </SymbiosisProvider>
    );

    fireEvent.click(screen.getByText('Definir modo para Colaborativo'));
    await waitFor(() => {
      expect(screen.getByText('Componente A - Modo atual: colaborativo')).toBeInTheDocument();
      expect(screen.getByText('Componente B - Modo atual: colaborativo')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Definir modo para Automação'));
    await waitFor(() => {
      expect(screen.getByText('Componente A - Modo atual: automacao')).toBeInTheDocument();
      expect(screen.getByText('Componente B - Modo atual: automacao')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Definir modo para Diagnóstico'));
    await waitFor(() => {
      expect(screen.getByText('Componente A - Modo atual: diagnostico')).toBeInTheDocument();
      expect(screen.getByText('Componente B - Modo atual: diagnostico')).toBeInTheDocument();
    });
  });
});

describe('SymbiosisContext - Integração com novos modos', () => {
  it('deve permitir alterar para os novos modos', async () => {
    render(
      <SymbiosisProvider>
        <TestComponent />
      </SymbiosisProvider>
    );

    fireEvent.click(screen.getByText('Definir modo para Colaborativo'));

    // Ajustar o teste para verificar o estado correto após a interação
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Modo atual: colaborativo'))).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Definir modo para Automação'));
    expect(screen.getByText('Modo atual: automacao')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Definir modo para Diagnóstico'));
    expect(screen.getByText('Modo atual: diagnostico')).toBeInTheDocument();
  });
});
