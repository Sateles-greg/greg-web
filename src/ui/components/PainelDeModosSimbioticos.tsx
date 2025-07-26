import { useState } from 'react';
import ExpansaoLayout from './ExpansaoLayout';
import FocoLayout from './FocoLayout';
import GuardiaoLayout from './GuardiaoLayout';
import ReparoLayout from './ReparoLayout';
import SombraLayout from './SombraLayout';
import styles from './PainelDeModosSimbioticos.module.css';

const modos = [
  { nome: 'Expansão', componente: ExpansaoLayout },
  { nome: 'Foco', componente: FocoLayout },
  { nome: 'Guardião', componente: GuardiaoLayout },
  { nome: 'Reparo', componente: ReparoLayout },
  { nome: 'Sombra', componente: SombraLayout },
];

type PainelDeModosSimbioticosProps = {
  modoAtual?: number;
};

export default function PainelDeModosSimbioticos({ modoAtual = 0 }: PainelDeModosSimbioticosProps) {
  const [modo, setModo] = useState<number>(modoAtual);
  const ModoComponente = modos[modo].componente;

  const alternarModo = () => {
    setModo((prev: number) => (prev + 1) % modos.length);
  } 

  return (
    <ModoComponente>
      <div className={styles.painelAlternancia}>
        <button onClick={alternarModo} className={styles.painelBotao}>
          Alternar para próximo modo
        </button>
        <p className={styles.painelModoAtual}>
          Modo atual: {modos[modo].nome}
        </p>
      </div>
    </ModoComponente>
  );
}
