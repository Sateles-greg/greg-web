import { SymbiosisMode } from '@contexts/SymbiosisContext';

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

export function getSymbioticResponse(
  name: string,
  period: string,
  mode: SymbiosisMode,
  personality?: string
): string {
  const base = `Olá, ${name}. ${frases[period] || ''}`;
  let extra = '';
  switch (mode) {
    case 'foco':
      extra = 'Modo Foco ativado: concentração máxima.';
      break;
    case 'expansao':
      extra = 'Modo Expansão: criatividade liberada!';
      break;
    case 'reparo':
      extra = 'Modo Reparo: hora de cuidar de você.';
      break;
    case 'sombra':
      extra = 'Modo Sombra: silêncio e introspecção.';
      break;
    case 'guardiao':
      extra = 'Modo Guardião: estou atento e protegendo.';
      break;
    default:
      extra = '';
  }
  if (personality) {
    return `${base} (${personality}) ${extra}`;
  }
  return `${base} ${extra}`;
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
