// ...existing code...
// import React removido pois não é utilizado
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NanoControlPanel from '../NanoControlPanel';

describe('NanoControlPanel', () => {
  it('renderiza título e botões', () => {
    render(<NanoControlPanel />);
    expect(screen.getByText(/Nanotech|Quântico/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reparar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reconfigurar/i })).toBeInTheDocument();
  });

  it('exibe toast ao clicar nos botões', () => {
    render(<NanoControlPanel />);
    fireEvent.click(screen.getByRole('button', { name: /Reparar/i }));
    expect(screen.getByText(/Nanobots: Reparos microscópicos simulados/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Reconfigurar/i }));
    expect(screen.getByText(/Quântico: Reconfiguração molecular simulada/i)).toBeInTheDocument();
  });
});
