// Integração com Google APIs (Maps, Translate, Calendar)
import axios from 'axios';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || import.meta.env.JEST_GOOGLE_API_KEY || 'mocked-google-api-key';

export async function traduzirGoogle(texto: string, target: string) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;
  const res = await axios.post(url, { q: texto, target });
  return res.data.data.translations[0].translatedText;
}

export async function obterRotaGoogle(origem: string, destino: string) {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origem)}&destination=${encodeURIComponent(destino)}&key=${GOOGLE_API_KEY}`;
  const res = await axios.get(url);
  return res.data.routes[0];
}
