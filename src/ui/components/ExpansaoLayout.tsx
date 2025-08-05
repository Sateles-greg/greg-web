// ...existing code...
import ModoBaseLayout from './ModoBaseLayout';
import styles from './expansaolayout.module.css';

export default function ExpansaoLayout({ children }: { children?: React.ReactNode }) {
  return (
    <ModoBaseLayout corPrimaria="#047857" simbolo="🌌" nomeModo="Expansão" descricao="Interface visual para o modo de abertura criativa e exploração.">
      <div className={styles.container}>
        {/* Animação de fundo */}
        <div className={styles.bgPulse} />
        {/* Intenção simbiótica */}
        <div className={styles.content}>
          <h2 className={styles.heading}>💡 Provocação Criativa</h2>
          <p className={styles.text}>E se você reinventasse sua rotina hoje?</p>
          {children}
          <button className={styles.button}>
            Alternar Modo
          </button>
        </div>
      </div>
    </ModoBaseLayout>
  );
}
