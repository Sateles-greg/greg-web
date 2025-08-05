// Serviço de Text-to-Speech (TTS) usando Web Speech API
export function speak(text: string) {
  // Mock: síntese de voz
  if (typeof window !== 'undefined') {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  } else {
    console.log('TTS:', text);
  }
}
