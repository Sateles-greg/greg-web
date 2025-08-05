// Customização de avatar e animações (mock)
import { SymbiosisMode } from '@contexts/SymbiosisContext';
// export type SymbiosisMode =
//   | 'expansao'
//   | 'foco'
//   | 'guardiao'
//   | 'reparo'
//   | 'sombra';
export function obterAvatarPersonalizado(modo: SymbiosisMode | string) {
  const avatares: Record<SymbiosisMode, string> = {
    zen: '🧘',
    estrategia: '♟️',
    criativo: '🎨',
    emocional: '💖',
    noturno: '🌙',
    foco: '🦉',
    expansao: '🦁',
    reparo: '🦾',
    sombra: '🦇',
    guardiao: '🐺',
    offline: '🤖',
  };
  return avatares[modo as SymbiosisMode] || '🤖';
}
