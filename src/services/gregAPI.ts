import { SymbiosisMode } from '../contexts/SymbiosisContext';

export function getPeriod(): string {
  const hora = new Date().getHours();
  if (hora < 6) return 'madrugada';
  if (hora < 12) return 'manhã';
  if (hora < 18) return 'tarde';
  return 'noite';
}

const frases: Record<string, string> = {
  madrugada: 'É tarde... mas estou aqui, sempre atento.',
  manhã: 'Bom dia! 🌞 Vamos começar com propósito?',
  tarde: 'Boa tarde! Foco e presença.',
  noite: 'Boa noite... hora de acalmar o sistema.',
};

export function getSymbioticResponse(name: string, period: string, mode: SymbiosisMode): string {
  const base = `Olá, ${name}. ${frases[period] || ''}`;
  switch (mode) {
    case 'foco':
      return base + ' Modo Foco ativado: concentração máxima.';
    case 'expansao':
      return base + ' Modo Expansão: criatividade liberada!';
    case 'reparo':
      return base + ' Modo Reparo: hora de cuidar de você.';
    case 'sombra':
      return base + ' Modo Sombra: silêncio e introspecção.';
    case 'guardiao':
      return base + ' Modo Guardião: estou atento e protegendo.';
    default:
      return base;
  }
}

export function getModeTheme(mode: SymbiosisMode) {
  switch (mode) {
    case 'foco':
      return { color: '#00bcd4', bg: '#e0f7fa' };
    case 'expansao':
      return { color: '#ff9800', bg: '#fff3e0' };
    case 'reparo':
      return { color: '#4caf50', bg: '#e8f5e9' };
    case 'sombra':
      return { color: '#212121', bg: '#bdbdbd' };
    case 'guardiao':
      return { color: '#f44336', bg: '#ffebee' };
    default:
      return { color: '#607d8b', bg: '#eceff1' };
  }
}
