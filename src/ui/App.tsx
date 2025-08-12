
import React from 'react';
import { SymbiosisProvider } from './contexts/SymbiosisProvider';
import { useSymbiosis } from './contexts/useSymbiosis';
import SymbioticBackground from './components/SymbioticBackground';
import styles from './App.module.css';
import PainelDeModosSimbioticos from './components/PainelDeModosSimbioticos';
import GregDiagnosticsPanel from './components/GregDiagnosticsPanel';
import { LazyDashboardCentral } from './components/LazyComponents';
import { ToastProvider } from './components/ToastProvider';
import { PerformanceDisplay } from './components/PerformanceDisplay';
import { useIntersectionLazyLoad } from './hooks/useLazyLoading';

const Main = () => {
  const { mode, status } = useSymbiosis();
  const { ref: dashboardRef, shouldLoad: shouldLoadDashboard } = useIntersectionLazyLoad(0.1);

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
        <section className={styles.centerPanel} ref={dashboardRef}>
          {shouldLoadDashboard && <LazyDashboardCentral />}
          {!shouldLoadDashboard && (
            <div style={{ 
              padding: '20px', 
              textAlign: 'center',
              background: 'rgba(0,0,0,0.1)', 
              borderRadius: '8px',
              color: '#fff'
            }}>
              📊 Dashboard será carregado quando visível...
            </div>
          )}
        </section>
        <section className={styles.rightPanel}>
          <GregDiagnosticsPanel />
        </section>
      </main>
      {(typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') && 
        <PerformanceDisplay showDetails={true} />}
    </div>
  );
};

const App = () => (
  <ToastProvider>
    <SymbiosisProvider>
      <Main />
    </SymbiosisProvider>
  </ToastProvider>
);

export default App;

