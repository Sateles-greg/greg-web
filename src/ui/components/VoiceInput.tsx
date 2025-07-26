import React, { useEffect, useRef, useState } from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';
import styles from './VoiceInput.module.css';

const VoiceInput: React.FC = () => {
  const { greet, loading } = useSymbiosis();
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'pt-BR';
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      greet(text);
      setListening(false);
    };
    recognitionRef.current.onend = () => setListening(false);
  }, [greet]);

  const startListening = () => {
    if (recognitionRef.current && !loading) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div className={styles.voiceInputWrapper}>
      <button
        type="button"
        onClick={startListening}
        disabled={loading || listening}
        className={[
          styles.voiceInputButton,
          listening ? styles.listening : ''
        ].join(' ')}
        aria-pressed={listening ? true : false}
        aria-label={listening ? 'Greg está ouvindo, fale seu comando' : 'Falar com Greg'}
      >
        <span className={styles.voiceInputIcon} aria-hidden="true">🎤</span>
        <span className="sr-only">{listening ? 'Ouvindo...' : 'Falar com Greg'}</span>
      </button>
      <span className={styles.voiceInputText}>{listening ? 'Ouvindo...' : 'Falar com Greg'}</span>
    </div>
  );
};
export default VoiceInput;
