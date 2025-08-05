import pt from './pt.json';
import en from './en.json';

const resources = { pt, en };

export type Lang = 'pt' | 'en';

export function t(key: string, lang: Lang = 'pt') {
  const dict = resources[lang] || resources['pt'];
  return (dict && (dict as Record<string, string>)[key]) || key;
}
