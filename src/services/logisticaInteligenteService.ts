// Serviço de otimização logística e roteamento inteligente
import axios from 'axios';

const MAPS_API = 'https://maps.googleapis.com/maps/api/directions/json';
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

export async function obterRotaInteligente(origem: string, destino: string, modo: 'driving' | 'walking' | 'bicycling' = 'driving') {
  const res = await axios.get(MAPS_API, {
    params: {
      origin: origem,
      destination: destino,
      mode: modo,
      key: API_KEY
    }
  });
  // Seleciona rota com menor tempo e menor trânsito
  const rotas = res.data.routes;
  return rotas.sort((a: any, b: any) => a.legs[0].duration.value - b.legs[0].duration.value)[0];
}
