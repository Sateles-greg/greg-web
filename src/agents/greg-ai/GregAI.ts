export async function triagemClinicaIA(historico: string, sintomas: string) {
  const payload = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Você é Greg, uma IA clínica que faz triagem baseada no histórico pessoal do usuário." },
      { role: "user", content: `Histórico: ${historico}\nSintomas: ${sintomas}` }
    ]
  };
  const response = await axios.post(`${OPENAI_BASE_URL}/chat/completions`, payload, { headers });
  return response.data;
}
// Módulo Greg-AI: integração com OpenAI
import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const OPENAI_BASE_URL = "https://api.openai.com/v1";

const headers = {
  Authorization: `Bearer ${OPENAI_API_KEY}`,
  "Content-Type": "application/json",
};

export async function simularDecisao(acao: string) {
  const functions = [
    {
      name: "simular_decisao",
      description: "Simula 3 consequências possíveis para uma decisão simbiótica",
      parameters: {
        type: "object",
        properties: {
          acao: {
            type: "string",
            description: "A ação ou decisão que o usuário está considerando",
          }
        },
        required: ["acao"]
      }
    }
  ];

  const payload = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Você é Greg, uma I.A. simbiótica estrategista, focada em proteger e aprimorar a vida do usuário." },
      { role: "user", content: `Simule consequências se eu decidir: ${acao}` }
    ],
    functions,
    function_call: { name: "simular_decisao" }
  };

  const response = await axios.post(`${OPENAI_BASE_URL}/chat/completions`, payload, { headers });
  return response.data;
}

export async function analisarSentimento(texto: string) {
  const payload = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Você é Greg, um analista emocional simbiótico." },
      { role: "user", content: `Analise o sentimento da seguinte frase: ${texto}` }
    ]
  };

  const response = await axios.post(`${OPENAI_BASE_URL}/chat/completions`, payload, { headers });
  return response.data;
}

export async function gerarFala(texto: string, voice: string = "nova") {
  const payload = {
    model: "tts-1",
    input: texto,
    voice,
  };

  const audioResponse = await axios.post(`${OPENAI_BASE_URL}/audio/speech`, payload, {
    headers,
    responseType: "arraybuffer"
  });

  return audioResponse.data; // Retorna o áudio em buffer
}

export async function transcreverAudio(audioBuffer: Buffer) {
  const formData = new FormData();
  formData.append("file", new Blob([audioBuffer]), "audio.wav");
  formData.append("model", "whisper-1");

  const response = await axios.post(`${OPENAI_BASE_URL}/audio/transcriptions`, formData, {
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
  });

  return response.data.text;
}
