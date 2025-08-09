// iaCentralService.ts - Serviço unificado para integração IA (OpenAI/HuggingFace) com fallback e logging estruturado
import axios from 'axios';

export type IaModo = 'Foco' | 'Zen' | 'Expansao' | 'Reparo' | 'NLP' | 'InovacaoGenerativa' | 'InovacaoSimbio' | string;

export interface IaResposta {
  result: string;
  origem: 'openai' | 'huggingface' | 'simulado' | 'erro';
  erro?: string;
}

export async function obterRespostaIA(
  mensagem: string,
  modo: IaModo = 'Foco',
  endpoint: string = '/api/greg/response',
  apiUrl: string = (typeof process.env.VITE_API_URL !== 'undefined' ? process.env.VITE_API_URL : 'http://localhost:3001')
): Promise<IaResposta> {
  try {
    const response = await axios.post(`${apiUrl}${endpoint}`, { prompt: mensagem, modo });
    if (response.data?.result) {
      return { result: response.data.result, origem: 'openai' };
    }
    // fallback explícito (caso backend não faça)
    if (response.data?.fallback) {
      return { result: response.data.fallback, origem: 'huggingface' };
    }
    return { result: '[sem resposta IA]', origem: 'erro' };
  } catch (err: any) {
    // Logging estruturado
    console.error('[IA][ERRO]', err?.message || err);
    return {
      result: '[Erro ao acessar IA]',
      origem: 'erro',
      erro: err?.message || 'Erro desconhecido'
    };
  }
}

// Exemplo de uso/documentação:
// const resposta = await obterRespostaIA('Olá, Greg!', 'Zen');
// if (resposta.origem === 'erro') mostrarToast(resposta.result);
// else setChat([...chat, resposta.result]);
