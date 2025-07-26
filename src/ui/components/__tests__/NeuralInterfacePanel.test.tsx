// ...existing code...
// import React removido pois não é utilizado
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NeuralInterfacePanel from '../NeuralInterfacePanel';

describe('NeuralInterfacePanel', () => {
  it('renderiza título e botões', () => {
    render(<NeuralInterfacePanel />);
    expect(screen.getByText(/Neural Interface/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Transmitir|Transmit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Induzir|Induce/i })).toBeInTheDocument();
  });

  it('exibe toast ao clicar nos botões', () => {
    render(<NeuralInterfacePanel />);
    fireEvent.click(screen.getByRole('button', { name: /Transmitir|Transmit/i }));
    expect(screen.getByText(/Insight transmitido diretamente ao córtex/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Induzir|Induce/i }));
    expect(screen.getByText(/Sensação de calma induzida/i)).toBeInTheDocument();
  });
});
