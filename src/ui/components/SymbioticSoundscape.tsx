import { useEffect, useRef } from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';

// Sons ambientes por modo (pode ser expandido para IA/MIDI futuramente)
const modeSounds: Record<string, string> = {
  zen: '/sounds/zen-ambience.mp3',
  foco: '/sounds/focus-ambience.mp3',
  expansao: '/sounds/expansion-ambience.mp3',
  criativo: '/sounds/creative-ambience.mp3',
  emocional: '/sounds/emotional-ambience.mp3',
  noturno: '/sounds/night-ambience.mp3',
  reparo: '/sounds/repair-ambience.mp3',
  sombra: '/sounds/shadow-ambience.mp3',
  guardiao: '/sounds/guardian-ambience.mp3',
};

export default function SymbioticSoundscape() {
  const { mode } = useSymbiosis();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!modeSounds[mode]) return;
    if (audioRef.current) {
      audioRef.current.src = modeSounds[mode];
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.25;
      audioRef.current.play();
    }
  }, [mode]);

  return (
    <audio ref={audioRef} src={modeSounds[mode]} autoPlay loop hidden />
  );
}
