// Motor de NLP e Resposta Simbiótica
// @ts-ignore: dependência não instalada no ambiente local
import { pipeline } from '@huggingface/transformers';

let nlpModel: any = null;

export async function inicializarNLP() {
  nlpModel = await pipeline('sentiment-analysis');
}

export async function analisarTexto(texto: string) {
  if (!nlpModel) await inicializarNLP();
  return nlpModel(texto);
}

export async function respostaSimbio(texto: string, contexto: string) {
  const prompt = `Contexto: ${contexto}\nUsuário: ${texto}\nGreg: Responda de forma simbiótica, empática e personalizada.`;
  try {
    const response = await fetch('http://localhost:3001/api/greg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, modo: 'NLP' }),
    });
    const data = await response.json();
    return data.result || '[sem resposta]';
  } catch (erro) {
    console.error('Erro ao gerar resposta simbiótica:', erro);
    return '[Erro ao gerar resposta simbiótica]';
  }
}
