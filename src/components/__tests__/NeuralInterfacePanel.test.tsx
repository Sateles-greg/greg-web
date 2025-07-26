import React from 'react';
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

  it('aciona alertas ao clicar nos botões', () => {
    window.alert = jest.fn();
    render(<NeuralInterfacePanel />);
    fireEvent.click(screen.getByRole('button', { name: /Transmitir|Transmit/i }));
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Insight/i));
    fireEvent.click(screen.getByRole('button', { name: /Induzir|Induce/i }));
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/calma|calm/i));
  });
});
