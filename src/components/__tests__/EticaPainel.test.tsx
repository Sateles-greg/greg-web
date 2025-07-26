import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EticaPainel from '../EticaPainel';

describe('EticaPainel', () => {
  it('renderiza título e mensagem de vazio', () => {
    render(<EticaPainel />);
    expect(screen.getByText(/Painel de Ética Programável/i)).toBeInTheDocument();
    expect(screen.getByText(/Nenhum princípio definido ainda/i)).toBeInTheDocument();
  });
});
