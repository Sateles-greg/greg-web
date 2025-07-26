// gregResponder.ts - Integração simbiótica real com OpenAI GPT-4o
import axios from 'axios';


export function getApiUrl() {
  if (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return 'http://localhost:3001';
}

// 1. Perfis de Personalidade Simbiótica
export const perfisDePersonalidade: Record<string, string> = {
  Foco: `Você é um assistente altamente objetivo, técnico e direto. Suas respostas devem ser claras, sucintas e sem floreios. Evite emoção.`,
  Zen: `Você é um guia calmo e empático. Suas respostas são pausadas, reflexivas e acolhedoras. Use uma linguagem suave e compassiva.`,
  Expansão: `Você é provocador, criativo e visionário. Use metáforas, estimule novas perspectivas, e encoraje pensamentos fora da caixa. Seja inspirador.`,
};

// 2. Função de Geração de Prompt Simbiótico
export function gerarPromptSimbiotico(modoAtual: string, mensagemUsuario: string): string {
  const estilo = perfisDePersonalidade[modoAtual] || perfisDePersonalidade["Foco"];
  return `\nModo Ativo: ${modoAtual}\nEstilo de Resposta: ${estilo}\n\nMensagem do usuário:\n${mensagemUsuario}\n\nResposta:`;
}


// 3. Integração com OpenAI (real)
export async function responderComoGreg(mensagem: string, modoAtual: string): Promise<string> {
  try {
    const prompt = gerarPromptSimbiotico(modoAtual, mensagem);
    const apiUrl = getApiUrl();
    const response = await axios.post(`${apiUrl}/api/greg`, { prompt, modo: modoAtual });
    return response.data.result;
  } catch (err: any) {
    console.error('Erro ao acessar backend Greg/OpenAI:', err);
    if (typeof window !== 'undefined' && window.alert) {
      window.alert('Não foi possível obter resposta do Greg/OpenAI. Tente novamente mais tarde.');
    }
    return '[Erro ao acessar backend Greg/OpenAI]: ' + (err?.message || 'Erro desconhecido');
  }
}
