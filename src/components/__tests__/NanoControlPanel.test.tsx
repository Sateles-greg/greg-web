import React from 'react';
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

  it('aciona alertas ao clicar nos botões', () => {
    window.alert = jest.fn();
    render(<NanoControlPanel />);
    fireEvent.click(screen.getByRole('button', { name: /Reparar/i }));
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/microscópicos/i));
    fireEvent.click(screen.getByRole('button', { name: /Reconfigurar/i }));
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/molecular/i));
  });
});
