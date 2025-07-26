import React, { useState } from 'react';
import { detectarModo } from './autoModo';
import PainelDeModosSimbioticos from './PainelDeModosSimbioticos';
import styles from './AutoModoEmotionHandler.module.css';

export default function AutoModoEmotionHandler() {
  const [modoAtual, setModoAtual] = useState<string>('zen');

  const interpretarInput = (input: string) => {
    const modoDetectado = detectarModo(input);
    if (modoDetectado) {
      setModoAtual(modoDetectado);
    }
  };

  const handleInputTexto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputText = (e.currentTarget.elements.namedItem('mensagem') as HTMLInputElement).value;
    interpretarInput(inputText);
    e.currentTarget.reset();
  };

  return (
    <div className={styles['auto-modo-root']}>
      <form onSubmit={handleInputTexto} className={styles['auto-modo-form']}>
        <input
          type="text"
          name="mensagem"
          placeholder="Digite uma mensagem emocional..."
          className={styles['auto-modo-input']}
        />
        <button type="submit" className={styles['auto-modo-btn']}>
          Analisar
        </button>
      </form>
      <PainelDeModosSimbioticos modoAtual={typeof modoAtual === 'number' ? modoAtual : 0} />
    </div>
  );
}
