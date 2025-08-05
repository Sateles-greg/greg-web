import { SymbiosisProvider } from './contexts/SymbiosisProvider';
import { useSymbiosis } from './contexts/useSymbiosis';
import SymbioticBackground from './components/SymbioticBackground';
import styles from './App.module.css';


import PainelDeModosSimbioticos from './components/PainelDeModosSimbioticos';
import GregDiagnosticsPanel from './components/GregDiagnosticsPanel';
import DashboardCentral from './components/DashboardCentral';

const Main = () => {
  const { mode, status } = useSymbiosis();

  return (
    <div className={styles.app}>
      <SymbioticBackground />
      <header className={styles.header}>
        <h1>Greg</h1>
        <div className={styles.status}>
          <span className={`${styles.statusIndicator} ${styles[mode]}`}></span>
          {mode} - {status}
        </div>
      </header>
      <main className={styles.mainContent}>
        <section className={styles.leftPanel}>
          <PainelDeModosSimbioticos />
        </section>
        <section className={styles.centerPanel}>
          <DashboardCentral />
        </section>
        <section className={styles.rightPanel}>
          <GregDiagnosticsPanel />
        </section>
      </main>
    </div>
  );
};

const App = () => (
  <SymbiosisProvider>
    <Main />
  </SymbiosisProvider>
);

export default App;

// Atualizando o tipo SymbiosisContextValue para incluir 'mode', 'status', 'usoTotal' e 'lastAnalysis'
// Adicionar as propriedades ao tipo SymbiosisContextValue

