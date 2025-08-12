import { useEffect, useRef, useCallback } from 'react';
import { performanceMetrics } from '../services/performanceMetrics';

/**
 * Hook personalizado para gerenciar setInterval com cleanup automático
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();
  const timerIdRef = useRef<string>();

  // Lembra da última versão do callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Configura o interval
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const timerId = Math.random().toString(36);
      timerIdRef.current = timerId;
      
      performanceMetrics.recordTimerStart(timerId, 'interval');
      const id = setInterval(tick, delay);
      
      return () => {
        clearInterval(id);
        if (timerIdRef.current) {
          performanceMetrics.recordTimerCleanup(timerIdRef.current);
        }
      };
    }
  }, [delay]);
}

/**
 * Hook personalizado para gerenciar setTimeout com cleanup automático
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();
  const timerIdRef = useRef<string>();

  // Lembra da última versão do callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Configura o timeout
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
        // Auto-cleanup para timeouts quando executam
        if (timerIdRef.current) {
          performanceMetrics.recordTimerCleanup(timerIdRef.current);
        }
      }
    }

    if (delay !== null) {
      const timerId = Math.random().toString(36);
      timerIdRef.current = timerId;
      
      performanceMetrics.recordTimerStart(timerId, 'timeout');
      const id = setTimeout(tick, delay);
      
      return () => {
        clearTimeout(id);
        if (timerIdRef.current) {
          performanceMetrics.recordTimerCleanup(timerIdRef.current);
        }
      };
    }
  }, [delay]);
}

/**
 * Hook para gerenciar timers com controle manual
 */
export function useTimerControl() {
  const intervalsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const timerIdsRef = useRef<Map<NodeJS.Timeout, string>>(new Map());

  const setManagedInterval = useCallback((callback: () => void, delay: number) => {
    const timerId = Math.random().toString(36);
    performanceMetrics.recordTimerStart(timerId, 'interval');
    
    const intervalId = setInterval(callback, delay);
    intervalsRef.current.add(intervalId);
    timerIdsRef.current.set(intervalId, timerId);
    
    return intervalId;
  }, []);

  const setManagedTimeout = useCallback((callback: () => void, delay: number) => {
    const timerId = Math.random().toString(36);
    performanceMetrics.recordTimerStart(timerId, 'timeout');
    
    const timeoutId = setTimeout(() => {
      callback();
      // Auto-cleanup quando timeout executa
      timeoutsRef.current.delete(timeoutId);
      const trackingId = timerIdsRef.current.get(timeoutId);
      if (trackingId) {
        performanceMetrics.recordTimerCleanup(trackingId);
        timerIdsRef.current.delete(timeoutId);
      }
    }, delay);
    
    timeoutsRef.current.add(timeoutId);
    timerIdsRef.current.set(timeoutId, timerId);
    
    return timeoutId;
  }, []);

  const clearManagedInterval = useCallback((intervalId: NodeJS.Timeout) => {
    clearInterval(intervalId);
    intervalsRef.current.delete(intervalId);
    
    const timerId = timerIdsRef.current.get(intervalId);
    if (timerId) {
      performanceMetrics.recordTimerCleanup(timerId);
      timerIdsRef.current.delete(intervalId);
    }
  }, []);

  const clearManagedTimeout = useCallback((timeoutId: NodeJS.Timeout) => {
    clearTimeout(timeoutId);
    timeoutsRef.current.delete(timeoutId);
    
    const timerId = timerIdsRef.current.get(timeoutId);
    if (timerId) {
      performanceMetrics.recordTimerCleanup(timerId);
      timerIdsRef.current.delete(timeoutId);
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    // Cleanup intervals
    intervalsRef.current.forEach(intervalId => {
      clearInterval(intervalId);
      const timerId = timerIdsRef.current.get(intervalId);
      if (timerId) {
        performanceMetrics.recordTimerCleanup(timerId);
      }
    });
    
    // Cleanup timeouts
    timeoutsRef.current.forEach(timeoutId => {
      clearTimeout(timeoutId);
      const timerId = timerIdsRef.current.get(timeoutId);
      if (timerId) {
        performanceMetrics.recordTimerCleanup(timerId);
      }
    });
    
    intervalsRef.current.clear();
    timeoutsRef.current.clear();
    timerIdsRef.current.clear();
  }, []);

  // Cleanup automático quando o componente desmonta
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  return {
    setManagedInterval,
    setManagedTimeout,
    clearManagedInterval,
    clearManagedTimeout,
    clearAllTimers
  };
}