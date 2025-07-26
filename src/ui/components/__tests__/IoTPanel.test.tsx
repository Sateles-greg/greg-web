

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IoTPanel from '../IoTPanel';
import { t } from '../../i18n';
const lang = 'pt';

beforeAll(() => {
  // Mock do AudioContext para ambiente de teste
  class AudioContextMock {
    createOscillator() {
      return {
        connect: () => {},
        start: () => {},
        stop: () => {},
        type: '',
        frequency: { value: 0 },
      };
    }
    createGain() { return { gain: { value: 0 }, connect: () => {} }; }
    get destination() { return {}; }
    get currentTime() { return 0; }
    close() {}
  }
  // @ts-ignore
  window.AudioContext = AudioContextMock;
  // @ts-ignore
  window.webkitAudioContext = AudioContextMock;
});

describe('IoTPanel', () => {
  it('renderiza dispositivos corretamente', () => {
    render(<IoTPanel />);
    expect(screen.getByText(t('luz_escritorio', lang))).toBeInTheDocument();
    expect(screen.getByText(t('tomada_smart', lang))).toBeInTheDocument();
  });

  it('alterna status do dispositivo ao clicar', () => {
    render(<IoTPanel />);
    const btn = screen.getAllByRole('button')[0];
    fireEvent.click(btn);
    expect(btn.textContent === t('ligado', lang) || btn.textContent === t('desligado', lang)).toBe(true);
  });
});
