interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'timer' | 'component' | 'network' | 'memory';
}

interface TimerMetric {
  timerId: string;
  type: 'interval' | 'timeout';
  created: number;
  cleaned: number | null;
  duration?: number;
}

class PerformanceMetricsService {
  private metrics: PerformanceMetric[] = [];
  private timerMetrics: Map<string, TimerMetric> = new Map();
  private maxMetrics = 1000; // Limita o número de métricas armazenadas

  // Registra uma métrica de performance
  recordMetric(name: string, value: number, category: PerformanceMetric['category'] = 'component') {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: performance.now(),
      category
    };

    this.metrics.push(metric);
    
    // Remove métricas antigas se exceder o limite
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // Log em desenvolvimento
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      console.debug(`[Performance] ${name}: ${value}ms`);
    }
  }

  // Registra início de timer
  recordTimerStart(timerId: string, type: 'interval' | 'timeout') {
    this.timerMetrics.set(timerId, {
      timerId,
      type,
      created: performance.now(),
      cleaned: null
    });
  }

  // Registra limpeza de timer
  recordTimerCleanup(timerId: string) {
    const timer = this.timerMetrics.get(timerId);
    if (timer) {
      const now = performance.now();
      timer.cleaned = now;
      timer.duration = now - timer.created;
      
      this.recordMetric(
        `timer_lifecycle_${timer.type}`, 
        timer.duration, 
        'timer'
      );
    }
  }

  // Measure performance of a function
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.recordMetric(name, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}_error`, duration);
      throw error;
    }
  }

  // Measure performance of a synchronous function
  measure<T>(name: string, fn: () => T): T {
    const start = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - start;
      this.recordMetric(name, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}_error`, duration);
      throw error;
    }
  }

  // Obtém métricas por categoria
  getMetricsByCategory(category: PerformanceMetric['category']): PerformanceMetric[] {
    return this.metrics.filter(m => m.category === category);
  }

  // Obtém estatísticas de timers
  getTimerStats() {
    const active = Array.from(this.timerMetrics.values()).filter(t => t.cleaned === null);
    const cleaned = Array.from(this.timerMetrics.values()).filter(t => t.cleaned !== null);
    
    return {
      activeTimers: active.length,
      cleanedTimers: cleaned.length,
      totalTimers: this.timerMetrics.size,
      activeIntervals: active.filter(t => t.type === 'interval').length,
      activeTimeouts: active.filter(t => t.type === 'timeout').length
    };
  }

  // Obtém métricas resumidas
  getSummary() {
    const now = performance.now();
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < 60000); // Últimos 60s
    
    const byCategory = recentMetrics.reduce((acc, metric) => {
      if (!acc[metric.category]) {
        acc[metric.category] = [];
      }
      acc[metric.category].push(metric.value);
      return acc;
    }, {} as Record<string, number[]>);

    const summary = Object.entries(byCategory).reduce((acc, [category, values]) => {
      acc[category] = {
        count: values.length,
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values)
      };
      return acc;
    }, {} as Record<string, any>);

    return {
      ...summary,
      timers: this.getTimerStats()
    };
  }

  // Limpa métricas antigas
  cleanup() {
    const cutoff = performance.now() - 300000; // 5 minutos
    this.metrics = this.metrics.filter(m => m.timestamp > cutoff);
    
    // Remove timers antigos que foram limpos
    for (const [id, timer] of this.timerMetrics.entries()) {
      if (timer.cleaned && timer.cleaned < cutoff) {
        this.timerMetrics.delete(id);
      }
    }
  }

  // Reset todas as métricas
  reset() {
    this.metrics = [];
    this.timerMetrics.clear();
  }
}

export const performanceMetrics = new PerformanceMetricsService();

// Auto-cleanup periódico - só executa se estiver no browser
if (typeof window !== 'undefined') {
  setInterval(() => {
    performanceMetrics.cleanup();
  }, 60000); // A cada minuto
}