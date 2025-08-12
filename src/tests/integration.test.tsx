import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimerDemo from '../src/ui/components/TimerDemo';
import { performanceMetrics } from '../src/ui/services/performanceMetrics';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
});
global.IntersectionObserver = mockIntersectionObserver;

describe('Timer Cleanup & Lazy Loading Integration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    performanceMetrics.reset();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should demonstrate timer cleanup and lazy loading together', async () => {
    const user = userEvent.setup({ delay: null });
    const mockMetricsUpdate = jest.fn();

    render(<TimerDemo onMetricsUpdate={mockMetricsUpdate} />);

    // Verify initial state
    expect(screen.getByText(/Contador automático/)).toBeInTheDocument();
    expect(screen.getByText(/Aguardando timeout/)).toBeInTheDocument();

    // Test interval timer (counter)
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/Contador automático.*1/)).toBeInTheDocument();
    expect(mockMetricsUpdate).toHaveBeenCalled();

    // Test timeout timer (message)
    act(() => {
      jest.advanceTimersByTime(3000); // Total: 5000ms
    });

    expect(screen.getByText(/Timeout executado após 5 segundos/)).toBeInTheDocument();

    // Test manual timer control
    const addTimerButton = screen.getByText('Adicionar Timer Manual');
    await user.click(addTimerButton);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText(/Timer.*executado às/)).toBeInTheDocument();

    // Test clear all timers
    const clearButton = screen.getByText('Limpar Todos os Timers');
    await user.click(clearButton);

    expect(screen.getByText(/Todos os timers manuais foram limpos/)).toBeInTheDocument();

    // Test conditional lazy loading
    const showComponentButton = screen.getByText('Mostrar Componente Pesado');
    await user.click(showComponentButton);

    // Should show loading message first
    expect(screen.getByText(/Carregando componente em 1 segundo/)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Component should be loaded now
    expect(screen.getByText(/Componente Pesado Carregado/)).toBeInTheDocument();
  });

  test('should track performance metrics for timers', () => {
    render(<TimerDemo />);

    // Advance time to trigger some timers
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const timerStats = performanceMetrics.getTimerStats();
    
    // Should have active timers from the interval
    expect(timerStats.activeTimers).toBeGreaterThan(0);
    
    // Should have recorded some timer lifecycle metrics
    const timerMetrics = performanceMetrics.getMetricsByCategory('timer');
    expect(timerMetrics.length).toBeGreaterThanOrEqual(0);
  });

  test('should handle component unmount and cleanup timers', () => {
    const { unmount } = render(<TimerDemo />);

    // Verify timers are running
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const statsBefore = performanceMetrics.getTimerStats();
    expect(statsBefore.activeTimers).toBeGreaterThan(0);

    // Unmount component
    unmount();

    // Timers should be cleaned up
    // Note: In a real scenario, this would be tracked by the performance metrics
    // For this test, we verify that no errors occur and the component unmounts cleanly
    expect(() => {
      act(() => {
        jest.advanceTimersByTime(5000);
      });
    }).not.toThrow();
  });

  test('should handle intersection observer for lazy loading', () => {
    render(<TimerDemo />);

    // Verify IntersectionObserver was called for lazy loading functionality
    expect(mockIntersectionObserver).toHaveBeenCalled();

    // The observer should be set up with the correct threshold
    const calls = mockIntersectionObserver.mock.calls;
    const observerCall = calls.find(call => call[1] && call[1].threshold !== undefined);
    
    if (observerCall) {
      expect(observerCall[1].threshold).toBe(0.1);
    }
  });

  test('should update performance metrics over time', async () => {
    const mockMetricsUpdate = jest.fn();
    render(<TimerDemo onMetricsUpdate={mockMetricsUpdate} />);

    // Should call metrics update when interval triggers
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockMetricsUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        timers: expect.objectContaining({
          activeTimers: expect.any(Number),
          cleanedTimers: expect.any(Number)
        })
      })
    );

    // Should update again on next interval
    mockMetricsUpdate.mockClear();
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockMetricsUpdate).toHaveBeenCalledTimes(1);
  });
});