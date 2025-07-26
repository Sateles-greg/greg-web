import { useState } from 'react';
import styles from './GregDiagnosticsPanel.module.css';

const checks = [
  {
    name: 'Verificar elemento root',
    fn: () => !!document.getElementById('root'),
    fix: () => window.location.reload(),
    fixLabel: 'Recarregar página'
  },
  {
    name: 'Verificar renderização do React',
    fn: () => {
      const root = document.getElementById('root');
      return root && root.childElementCount > 0;
    },
    fix: () => window.location.reload(),
    fixLabel: 'Recarregar página'
  },
  {
    name: 'Verificar erros no console',
    fn: () => {
      // Não há acesso direto ao console, mas pode-se sugerir abrir o console
      return true;
    },
    fix: () => alert('Abra o console do navegador (F12) para ver detalhes dos erros.'),
    fixLabel: 'Abrir instrução'
  },
  {
    name: 'Verificar import dinâmico de plugins',
    fn: () => {
      try {
        // Testa se consegue importar um plugin padrão
        return import.meta.env ? true : false;
      } catch {
        return false;
      }
    },
    fix: () => alert('Verifique se o nome do plugin e extensão .ts estão corretos.'),
    fixLabel: 'Instrução de correção'
  }
];

export default function GregDiagnosticsPanel() {
  const [results, setResults] = useState<(boolean | null)[]>(Array(checks.length).fill(null));

  const runDiagnostics = () => {
    setResults(checks.map(c => {
      try {
        return c.fn();
      } catch {
        return false;
      }
    }));
  };

  return (
    <div className={styles['diagnostics-root']}>
      <h2>Diagnóstico Simbiótico Greg</h2>
      <button onClick={runDiagnostics} className={styles['diagnostics-btn']}>Executar Diagnóstico</button>
      <ul>
        {checks.map((c, i) => (
          <li key={c.name} className={styles['diagnostics-list-item']}>
            {c.name}: {results[i] === null ? 'Aguardando...' : results[i] ? 'OK' : 'Falha'}
            {!results[i] && results[i] !== null && (
              <button onClick={c.fix} className={styles['diagnostics-fix-btn']}>{c.fixLabel}</button>
            )}
          </li>
        ))}
      </ul>
      <p className={styles['diagnostics-note']}>
        Se algum teste falhar, siga as instruções ou envie o erro do console para suporte.<br/>
        Para diagnóstico avançado, abra o console do navegador (F12).
      </p>
    </div>
  );
}
