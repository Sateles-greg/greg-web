// Customização de avatar e animações (mock)
export type SymbiosisMode = 'expansao' | 'foco' | 'guardiao' | 'reparo' | 'sombra';
export function obterAvatarPersonalizado(modo: SymbiosisMode | string) {
  const avatares: Record<SymbiosisMode, string> = {
    expansao: '🦁',
    foco: '🦉',
    guardiao: '🐺',
    reparo: '🦾',
    sombra: '🦇'
  };
  return avatares[modo as SymbiosisMode] || '🤖';
}
