// import React from 'react'; // Removido: não utilizado
import { detectarModo } from './autoModo';
// import PainelDeModosSimbioticos from './PainelDeModosSimbioticos'; // Removido: não utilizado
import styles from './AutoModoEmotionHandler.module.css';

export default function AutoModoEmotionHandler() {
  // const [modoAtual, setModoAtual] = useState<string>('zen'); // Removido: não utilizado

  const interpretarInput = (input: string) => {
    const modoDetectado = detectarModo(input);
    if (modoDetectado) {
      // setModoAtual(modoDetectado); // Removido: variável não existe mais
    }
  };

  const handleInputTexto = (e: any) => {
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
      {/* <PainelDeModosSimbioticos modoAtual={typeof modoAtual === 'number' ? modoAtual : 0} /> */}
      {/* O prop modoAtual numérico foi desabilitado temporariamente */}
    </div>
  );
}
