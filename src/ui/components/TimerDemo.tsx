import React, { useState } from 'react';
import { useInterval, useTimeout, useTimerControl } from '../hooks/useTimer';
import { performanceMetrics } from '../services/performanceMetrics';
import { useConditionalLazyLoad, useIntersectionLazyLoad } from '../hooks/useLazyLoading';

interface TimerDemoProps {
  onMetricsUpdate?: (metrics: any) => void;
}

const HeavyComponent: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      background: 'rgba(0, 255, 0, 0.1)', 
      border: '1px solid green',
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <h4>🚀 Componente Pesado Carregado!</h4>
      <p>Este componente foi carregado usando lazy loading.</p>
      <div>Simulando processamento pesado... {Math.random().toFixed(6)}</div>
    </div>
  );
};

const TimerDemo: React.FC<TimerDemoProps> = ({ onMetricsUpdate }) => {
  const [counter, setCounter] = useState(0);
  const [timeoutMessage, setTimeoutMessage] = useState('');
  const [manualTimers, setManualTimers] = useState<string[]>([]);
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);
  
  const { setManagedInterval, setManagedTimeout, clearAllTimers } = useTimerControl();
  
  // Lazy loading condicional
  const shouldLoadConditional = useConditionalLazyLoad(showHeavyComponent, 1000);
  
  // Lazy loading por intersection
  const { ref: intersectionRef, shouldLoad: shouldLoadIntersection } = useIntersectionLazyLoad(0.1);

  // Exemplo de useInterval - conta automaticamente
  useInterval(() => {
    setCounter(prev => prev + 1);
    if (onMetricsUpdate) {
      onMetricsUpdate(performanceMetrics.getSummary());
    }
  }, 2000);

  // Exemplo de useTimeout - mostra mensagem após 5 segundos
  useTimeout(() => {
    setTimeoutMessage('⏰ Timeout executado após 5 segundos!');
  }, timeoutMessage ? null : 5000);

  const addManualTimer = () => {
    const timerId = Math.random().toString(36).substr(2, 9);
    const intervalId = setManagedInterval(() => {
      setManualTimers(prev => [...prev, `Timer ${timerId} executado às ${new Date().toLocaleTimeString()}`]);
    }, 3000);
    
    // Limpa automaticamente após 15 segundos
    setManagedTimeout(() => {
      clearInterval(intervalId);
      setManualTimers(prev => [...prev, `Timer ${timerId} foi limpo automaticamente`]);
    }, 15000);
  };

  const clearManualTimers = () => {
    clearAllTimers();
    setManualTimers(prev => [...prev, '🧹 Todos os timers manuais foram limpos']);
  };

  const styles = {
    container: {
      padding: '20px',
      border: '2px solid #333',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      fontFamily: 'monospace',
      margin: '20px'
    },
    section: {
      margin: '15px 0',
      padding: '10px',
      border: '1px solid #555',
      borderRadius: '6px',
      background: 'rgba(0, 0, 0, 0.2)'
    },
    button: {
      padding: '8px 16px',
      margin: '5px',
      border: 'none',
      borderRadius: '4px',
      background: '#007acc',
      color: 'white',
      cursor: 'pointer'
    },
    log: {
      background: 'rgba(0, 0, 0, 0.3)',
      padding: '10px',
      borderRadius: '4px',
      maxHeight: '200px',
      overflowY: 'auto' as const,
      fontSize: '12px'
    }
  };

  return (
    <div style={styles.container}>
      <h3>🔧 Demo: Timer Cleanup & Lazy Loading</h3>
      
      <div style={styles.section}>
        <h4>useInterval Hook</h4>
        <p>Contador automático (atualiza a cada 2s): <strong>{counter}</strong></p>
        <small>Este timer será limpo automaticamente quando o componente for desmontado.</small>
      </div>

      <div style={styles.section}>
        <h4>useTimeout Hook</h4>
        <p>{timeoutMessage || 'Aguardando timeout de 5 segundos...'}</p>
        <small>Este timeout executa uma vez e é limpo automaticamente.</small>
      </div>

      <div style={styles.section}>
        <h4>Timer Control Manual</h4>
        <button style={styles.button} onClick={addManualTimer}>
          Adicionar Timer Manual
        </button>
        <button style={styles.button} onClick={clearManualTimers}>
          Limpar Todos os Timers
        </button>
        <div style={styles.log}>
          {manualTimers.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h4>Lazy Loading Condicional</h4>
        <button 
          style={styles.button} 
          onClick={() => setShowHeavyComponent(!showHeavyComponent)}
        >
          {showHeavyComponent ? 'Ocultar' : 'Mostrar'} Componente Pesado
        </button>
        {shouldLoadConditional && <HeavyComponent />}
        {showHeavyComponent && !shouldLoadConditional && (
          <div style={{ padding: '10px', background: 'rgba(255, 255, 0, 0.1)' }}>
            ⏳ Carregando componente em 1 segundo...
          </div>
        )}
      </div>

      <div style={styles.section}>
        <h4>Lazy Loading por Interseção</h4>
        <div style={{ height: '100px', overflow: 'auto', border: '1px solid #555' }}>
          <div style={{ height: '200px', padding: '10px' }}>
            Role para baixo para ver o lazy loading...
          </div>
          <div ref={intersectionRef} style={{ minHeight: '50px' }}>
            {shouldLoadIntersection && <HeavyComponent />}
            {!shouldLoadIntersection && (
              <div style={{ padding: '10px', background: 'rgba(255, 255, 0, 0.1)' }}>
                🔍 Este componente será carregado quando ficar visível
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerDemo;