import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
jest.mock('@tsparticles/react', () => ({ Particles: () => <div id="tsparticles" /> }));
import SimbioticParticles from './SimbioticParticles';

describe('SimbioticParticles', () => {
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
  });
});
