// Serviço de Text-to-Speech (TTS) usando Web Speech API
export function speak(text: string, lang: string = 'pt-BR') {
  if ('speechSynthesis' in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.cancel(); // Para evitar sobreposição
    window.speechSynthesis.speak(utter);
  }
}
