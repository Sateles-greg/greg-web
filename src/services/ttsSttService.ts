// Integração TTS/STT (mock)
export async function falarTexto() {
  // TODO: integrar com OpenAI TTS real
  return { status: 'ok', audio: 'AUDIO_BASE64' };
}

export async function transcreverAudio() {
  // TODO: integrar com OpenAI STT real
  return { status: 'ok', texto: 'Texto transcrito' };
}
