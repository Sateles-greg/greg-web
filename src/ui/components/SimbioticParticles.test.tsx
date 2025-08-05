import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
// import React from 'react'; // Removido: não utilizado
import SimbioticParticles from './SimbioticParticles';

jest.mock('@tsparticles/react', () => {
  const React = jest.requireActual('react'); // Usa jest.requireActual para acessar React
  return {
    Particles: () => React.createElement('div', { id: 'tsparticles' })
  };
});

describe('SimbioticParticles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza sem erros para modo "foco"', () => {
    const { container } = render(<SimbioticParticles modo="foco" />);
    expect(container.querySelector('#tsparticles')).toBeInTheDocument();
  });

  it('renderiza sem erros para modo "zen"', () => {
    const { container } = render(<SimbioticParticles modo="zen" />);
    expect(container.querySelector('#tsparticles')).toBeInTheDocument();
  });

  it('usa cor padrão se modo for desconhecido', () => {
    const { container } = render(<SimbioticParticles modo="desconhecido" />);
    expect(container.querySelector('#tsparticles')).toBeInTheDocument();
    // Adicionando validação para cor padrão
    expect(container.querySelector('#tsparticles')).toHaveStyle('color: canvastext');
  });
});
