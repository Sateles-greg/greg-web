// ...existing code...
import ModoBaseLayout from './ModoBaseLayout';
import styles from './modolayout.module.css';

export default function FocoLayout({ children }: { children?: React.ReactNode }) {
  return (
    <ModoBaseLayout corPrimaria="#1e40af" simbolo="🧠" nomeModo="Foco" descricao="Interface visual para o modo de atenção profunda e clareza mental.">
      <div className={styles.container}>
        <div className={styles.bgPulseFoco} />
        <div className={styles.content}>
          <h2 className={styles.heading}>🎯 Foco Total</h2>
          <p className={styles.text}>Mantenha sua atenção e avance nas metas.</p>
          {children}
          <button className={styles.button}>Alternar Modo</button>
        </div>
      </div>
    </ModoBaseLayout>
  );
}
