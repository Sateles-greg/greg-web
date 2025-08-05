import { traduzirGoogle, obterRotaGoogle } from './integracaoGoogleService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  process.env.JEST_GOOGLE_API_KEY = 'mocked-google-api-key';
  console.log('Chave mock configurada:', process.env.JEST_GOOGLE_API_KEY);
});

describe('Serviço de Integração com Google', () => {
  it('deve traduzir texto usando a API do Google Translate', async () => {
    const texto = 'Olá';
    const target = 'en';
    const respostaMock = {
      data: {
        data: {
          translations: [{ translatedText: 'Hello' }],
        },
      },
    };

    mockedAxios.post.mockResolvedValueOnce(respostaMock);

    const resultado = await traduzirGoogle(texto, target);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('https://translation.googleapis.com/language/translate/v2'),
      { q: texto, target }
    );
    expect(resultado).toBe('Hello');
  });

  it('deve obter rota usando a API do Google Maps', async () => {
    const origem = 'São Paulo';
    const destino = 'Rio de Janeiro';
    const respostaMock = {
      data: {
        routes: [{ summary: 'Rota simulada' }],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(respostaMock);

    const resultado = await obterRotaGoogle(origem, destino);

    const urlEsperada = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origem)}&destination=${encodeURIComponent(destino)}&key=mocked-google-api-key`;
    console.log('URL esperada:', urlEsperada);
    console.log('Chamadas ao Axios:', mockedAxios.get.mock.calls);

    // Comparar URLs removendo espaços e caracteres invisíveis
    const chamadaReal = mockedAxios.get.mock.calls[0][0].trim();
    expect(chamadaReal).toBe(urlEsperada.trim());

    expect(resultado).toEqual({ summary: 'Rota simulada' });
  });
});
