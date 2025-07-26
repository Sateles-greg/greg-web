// import React removido pois não é utilizado
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EticaPainel from '../EticaPainel';

describe('EticaPainel', () => {
  it('renderiza título e mensagem de vazio', () => {
    render(<EticaPainel />);
    expect(screen.getByText(/Painel de Ética Programável/i)).toBeInTheDocument();
    expect(screen.getByText(/Nenhum princípio definido ainda/i)).toBeInTheDocument();
  });
});
