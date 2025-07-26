// Serviço de tradução automática multilíngue
import axios from 'axios';

const GOOGLE_TRANSLATE_API = 'https://translation.googleapis.com/language/translate/v2';
const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_KEY;

export async function traduzirTexto(texto: string, target: string, source?: string) {
  const res = await axios.post(GOOGLE_TRANSLATE_API, {
    q: texto,
    target,
    source,
    format: 'text',
    key: API_KEY
  });
  return res.data.data.translations[0].translatedText;
}
