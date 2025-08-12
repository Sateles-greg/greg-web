import { performanceMetrics } from '../src/ui/services/performanceMetrics';

// Mock performance.now for consistent testing
const mockPerformanceNow = jest.fn();
Object.defineProperty(global, 'performance', {
  value: {
    now: mockPerformanceNow,
  },
  writable: true,
});

describe('PerformanceMetricsService', () => {
  beforeEach(() => {
    performanceMetrics.reset();
    mockPerformanceNow.mockClear();
    mockPerformanceNow.mockReturnValue(0);
  });

  describe('recordMetric', () => {
    test('should record a metric with correct data', () => {
      mockPerformanceNow.mockReturnValue(100);

      performanceMetrics.recordMetric('test_operation', 50, 'component');

      const metrics = performanceMetrics.getMetricsByCategory('component');
      expect(metrics).toHaveLength(1);
      expect(metrics[0]).toEqual({
        name: 'test_operation',
        value: 50,
        timestamp: 100,
        category: 'component'
      });
    });

    test('should use default category when not specified', () => {
      performanceMetrics.recordMetric('test_operation', 50);

      const metrics = performanceMetrics.getMetricsByCategory('component');
      expect(metrics).toHaveLength(1);
      expect(metrics[0].category).toBe('component');
    });

    test('should limit metrics to maxMetrics', () => {
      // Record more than maxMetrics (1000) metrics
      for (let i = 0; i < 1100; i++) {
        performanceMetrics.recordMetric(`test_${i}`, i);
      }

      const allMetrics = performanceMetrics.getMetricsByCategory('component');
      expect(allMetrics.length).toBeLessThanOrEqual(1000);
      
      // Should keep the most recent ones
      expect(allMetrics[allMetrics.length - 1].name).toBe('test_1099');
    });
  });

  describe('timer tracking', () => {
    test('should record timer start', () => {
      mockPerformanceNow.mockReturnValue(100);

      performanceMetrics.recordTimerStart('timer-1', 'interval');

      const stats = performanceMetrics.getTimerStats();
      expect(stats.activeTimers).toBe(1);
      expect(stats.activeIntervals).toBe(1);
      expect(stats.activeTimeouts).toBe(0);
    });

    test('should record timer cleanup', () => {
      mockPerformanceNow.mockReturnValueOnce(100); // Start time
      performanceMetrics.recordTimerStart('timer-1', 'interval');

      mockPerformanceNow.mockReturnValueOnce(200); // End time
      performanceMetrics.recordTimerCleanup('timer-1');

      const stats = performanceMetrics.getTimerStats();
      expect(stats.activeTimers).toBe(0);
      expect(stats.cleanedTimers).toBe(1);

      // Should record lifecycle metric
      const timerMetrics = performanceMetrics.getMetricsByCategory('timer');
      expect(timerMetrics).toHaveLength(1);
      expect(timerMetrics[0].name).toBe('timer_lifecycle_interval');
      expect(timerMetrics[0].value).toBe(100); // 200 - 100
    });

    test('should handle multiple timers', () => {
      performanceMetrics.recordTimerStart('timer-1', 'interval');
      performanceMetrics.recordTimerStart('timer-2', 'timeout');
      performanceMetrics.recordTimerStart('timer-3', 'interval');

      const stats = performanceMetrics.getTimerStats();
      expect(stats.activeTimers).toBe(3);
      expect(stats.activeIntervals).toBe(2);
      expect(stats.activeTimeouts).toBe(1);
      expect(stats.totalTimers).toBe(3);
    });
  });

  describe('measure functions', () => {
    test('should measure synchronous function execution', () => {
      mockPerformanceNow.mockReturnValueOnce(100); // Start
      mockPerformanceNow.mockReturnValueOnce(150); // End

      const result = performanceMetrics.measure('sync_operation', () => {
        return 'test result';
      });

      expect(result).toBe('test result');

      const metrics = performanceMetrics.getMetricsByCategory('component');
      expect(metrics).toHaveLength(1);
      expect(metrics[0].name).toBe('sync_operation');
      expect(metrics[0].value).toBe(50);
    });

    test('should measure async function execution', async () => {
      mockPerformanceNow.mockReturnValueOnce(100); // Start
      mockPerformanceNow.mockReturnValueOnce(200); // End

      const result = await performanceMetrics.measureAsync('async_operation', async () => {
        return 'async result';
      });

      expect(result).toBe('async result');

      const metrics = performanceMetrics.getMetricsByCategory('component');
      expect(metrics).toHaveLength(1);
      expect(metrics[0].name).toBe('async_operation');
      expect(metrics[0].value).toBe(100);
    });

    test('should record error metrics when function throws', () => {
      mockPerformanceNow.mockReturnValueOnce(100); // Start
      mockPerformanceNow.mockReturnValueOnce(150); // End

      expect(() => {
        performanceMetrics.measure('error_operation', () => {
          throw new Error('Test error');
        });
      }).toThrow('Test error');

      const metrics = performanceMetrics.getMetricsByCategory('component');
      expect(metrics).toHaveLength(1);
      expect(metrics[0].name).toBe('error_operation_error');
      expect(metrics[0].value).toBe(50);
    });

    test('should record error metrics when async function throws', async () => {
      mockPerformanceNow.mockReturnValueOnce(100); // Start
      mockPerformanceNow.mockReturnValueOnce(200); // End

      await expect(
        performanceMetrics.measureAsync('async_error_operation', async () => {
          throw new Error('Async test error');
        })
      ).rejects.toThrow('Async test error');

      const metrics = performanceMetrics.getMetricsByCategory('component');
      expect(metrics).toHaveLength(1);
      expect(metrics[0].name).toBe('async_error_operation_error');
      expect(metrics[0].value).toBe(100);
    });
  });

  describe('getSummary', () => {
    test('should return summary with timer stats', () => {
      performanceMetrics.recordTimerStart('timer-1', 'interval');
      performanceMetrics.recordTimerStart('timer-2', 'timeout');

      const summary = performanceMetrics.getSummary();
      
      expect(summary.timers).toEqual({
        activeTimers: 2,
        cleanedTimers: 0,
        totalTimers: 2,
        activeIntervals: 1,
        activeTimeouts: 1
      });
    });

    test('should calculate category statistics', () => {
      mockPerformanceNow.mockReturnValue(100);

      performanceMetrics.recordMetric('op1', 10, 'component');
      performanceMetrics.recordMetric('op2', 20, 'component');
      performanceMetrics.recordMetric('op3', 30, 'component');
      performanceMetrics.recordMetric('net1', 100, 'network');

      const summary = performanceMetrics.getSummary();

      expect(summary.component).toEqual({
        count: 3,
        avg: 20,
        min: 10,
        max: 30
      });

      expect(summary.network).toEqual({
        count: 1,
        avg: 100,
        min: 100,
        max: 100
      });
    });

    test('should only include recent metrics (last 60s)', () => {
      mockPerformanceNow.mockReturnValueOnce(0);
      performanceMetrics.recordMetric('old_op', 10, 'component');

      mockPerformanceNow.mockReturnValueOnce(70000); // 70 seconds later
      performanceMetrics.recordMetric('new_op', 20, 'component');

      const summary = performanceMetrics.getSummary();

      // Should only include the recent metric
      expect(summary.component).toEqual({
        count: 1,
        avg: 20,
        min: 20,
        max: 20
      });
    });
  });

  describe('cleanup', () => {
    test('should remove old metrics', () => {
      mockPerformanceNow.mockReturnValueOnce(0);
      performanceMetrics.recordMetric('old_op', 10, 'component');

      mockPerformanceNow.mockReturnValueOnce(400000); // 400 seconds later
      performanceMetrics.cleanup();

      const metrics = performanceMetrics.getMetricsByCategory('component');
      expect(metrics).toHaveLength(0);
    });

    test('should remove old cleaned timers', () => {
      mockPerformanceNow.mockReturnValueOnce(0);
      performanceMetrics.recordTimerStart('timer-1', 'interval');

      mockPerformanceNow.mockReturnValueOnce(100);
      performanceMetrics.recordTimerCleanup('timer-1');

      mockPerformanceNow.mockReturnValueOnce(400000); // 400 seconds later
      performanceMetrics.cleanup();

      const stats = performanceMetrics.getTimerStats();
      expect(stats.totalTimers).toBe(0);
    });

    test('should keep recent metrics and active timers', () => {
      mockPerformanceNow.mockReturnValueOnce(0);
      performanceMetrics.recordMetric('recent_op', 10, 'component');
      performanceMetrics.recordTimerStart('active-timer', 'interval');

      mockPerformanceNow.mockReturnValueOnce(200000); // 200 seconds later
      performanceMetrics.cleanup();

      const metrics = performanceMetrics.getMetricsByCategory('component');
      expect(metrics).toHaveLength(1);

      const stats = performanceMetrics.getTimerStats();
      expect(stats.activeTimers).toBe(1);
    });
  });
});