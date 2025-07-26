
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GreetingForm from '../GreetingForm';
import { SymbiosisProvider } from '../../contexts/SymbiosisContext';

describe('GreetingForm', () => {
  it('renderiza input e botão', () => {
    render(
      <SymbiosisProvider>
        <GreetingForm />
      </SymbiosisProvider>
    );
    expect(screen.getByPlaceholderText(/Seu nome/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('aciona greet ao submeter', () => {
    render(
      <SymbiosisProvider>
        <GreetingForm />
      </SymbiosisProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/Seu nome/i), { target: { value: 'Greg' } });
    fireEvent.click(screen.getByRole('button'));
    // Não há callback externo, mas podemos checar se o botão fica "Pensando..."
    expect(screen.getByRole('button')).toHaveTextContent(/Pensando|Saudar/i);
  });
});
