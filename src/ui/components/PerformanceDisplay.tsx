import React, { useState, useEffect } from 'react';
import { performanceMetrics } from '../services/performanceMetrics';
import { useInterval } from '../hooks/useTimer';

interface PerformanceDisplayProps {
  refreshInterval?: number;
  showDetails?: boolean;
}

export const PerformanceDisplay: React.FC<PerformanceDisplayProps> = ({ 
  refreshInterval = 5000,
  showDetails = false 
}) => {
  const [metrics, setMetrics] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  const updateMetrics = () => {
    setMetrics(performanceMetrics.getSummary());
  };

  useInterval(updateMetrics, isVisible ? refreshInterval : null);

  useEffect(() => {
    updateMetrics();
  }, []);

  if (!metrics) return null;

  const styles = {
    container: {
      position: 'fixed' as const,
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '11px',
      fontFamily: 'monospace',
      zIndex: 10000,
      border: '1px solid #333',
      minWidth: '200px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      borderBottom: '1px solid #333',
      paddingBottom: '4px'
    },
    toggle: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '10px'
    },
    section: {
      marginBottom: '8px'
    },
    metric: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '2px 0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>⚡ Performance</span>
        <button 
          style={styles.toggle}
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>
      
      {isVisible && (
        <>
          <div style={styles.section}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Timers</div>
            <div style={styles.metric}>
              <span>Ativos:</span>
              <span>{metrics.timers?.activeTimers || 0}</span>
            </div>
            <div style={styles.metric}>
              <span>Intervals:</span>
              <span>{metrics.timers?.activeIntervals || 0}</span>
            </div>
            <div style={styles.metric}>
              <span>Timeouts:</span>
              <span>{metrics.timers?.activeTimeouts || 0}</span>
            </div>
            <div style={styles.metric}>
              <span>Limpos:</span>
              <span>{metrics.timers?.cleanedTimers || 0}</span>
            </div>
          </div>

          {showDetails && Object.entries(metrics).map(([category, data]: [string, any]) => {
            if (category === 'timers' || !data.count) return null;
            
            return (
              <div key={category} style={styles.section}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
                <div style={styles.metric}>
                  <span>Count:</span>
                  <span>{data.count}</span>
                </div>
                <div style={styles.metric}>
                  <span>Avg:</span>
                  <span>{data.avg?.toFixed(1)}ms</span>
                </div>
                <div style={styles.metric}>
                  <span>Min/Max:</span>
                  <span>{data.min?.toFixed(1)}/{data.max?.toFixed(1)}ms</span>
                </div>
              </div>
            );
          })}

          <div style={{ marginTop: '8px', fontSize: '9px', color: '#aaa' }}>
            Atualizado a cada {refreshInterval/1000}s
          </div>
        </>
      )}
    </div>
  );
};