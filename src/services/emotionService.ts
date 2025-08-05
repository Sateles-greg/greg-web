// Placeholder para detecção de emoção via texto
export type Emotion =
  | 'feliz'
  | 'triste'
  | 'neutro'
  | 'ansioso'
  | 'motivado'
  | 'cansado'
  | 'irritado';

export function detectEmotion(text: string): Emotion {
  const t = text.toLowerCase();
  if (t.match(/(feliz|alegr|sorriso|ótimo|bom)/)) return 'feliz';
  if (t.match(/(triste|cansad|exaust|desanim)/)) return 'cansado';
  if (t.match(/(ansios|preocupad|tenso)/)) return 'ansioso';
  if (t.match(/(irritad|raiva|nervoso)/)) return 'irritado';
  if (t.match(/(motivad|animad|empolgado)/)) return 'motivado';
  return 'neutro';
}
