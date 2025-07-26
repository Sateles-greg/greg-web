import { useEffect, useRef, useState } from 'react';
import './AudioAmbienteSimbiotico.module.css';

interface Props {
  modo: string;
}

const sonsPorModo: Record<string, string> = {
  foco: '/sounds/foco.mp3',
  zen: '/sounds/zen.mp3',
  expansao: '/sounds/expansao.mp3',
  reparo: '/sounds/reparo.mp3',
  sombra: '/sounds/sombra.mp3',
};

export default function AudioAmbienteSimbiotico({ modo }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = sonsPorModo[modo.toLowerCase()] || '';
      audio.volume = volume;
      if (!muted && audio.src) audio.play().catch(() => {});
    }
  }, [modo]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // Comando por voz (ex: "silenciar", "ligar som")
  useEffect(() => {
    // @ts-ignore
    const recognition = window.webkitSpeechRecognition ? new window.webkitSpeechRecognition() : null;
    if (!recognition) return;
    recognition.continuous = true;
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const comando = event.results[event.results.length - 1][0].transcript.toLowerCase();
      if (comando.includes('silenciar')) setMuted(true);
      if (comando.includes('ligar som') || comando.includes('ativar áudio')) setMuted(false);
    };

    recognition.start();
    return () => recognition.stop();
  }, []);

  return (
    <div className="audioAmbienteSimbiotico">
      <audio ref={audioRef} loop autoPlay hidden />
      <label>
        Volume: 
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </label>
      <button onClick={() => setMuted(!muted)} className="audioAmbienteBtn">
        {muted ? '🔇 Ativar Som' : '🔊 Silenciar'}
      </button>
    </div>
  );
}
