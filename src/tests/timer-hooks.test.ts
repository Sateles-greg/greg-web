import { renderHook, act } from '@testing-library/react';
import { useInterval, useTimeout, useTimerControl } from '../src/ui/hooks/useTimer';
import { performanceMetrics } from '../src/ui/services/performanceMetrics';

// Mock para performance metrics
jest.mock('../src/ui/services/performanceMetrics', () => ({
  performanceMetrics: {
    recordTimerStart: jest.fn(),
    recordTimerCleanup: jest.fn(),
  }
}));

describe('useInterval', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should call callback at specified interval', () => {
    const callback = jest.fn();
    const delay = 1000;

    renderHook(() => useInterval(callback, delay));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should not start timer when delay is null', () => {
    const callback = jest.fn();

    renderHook(() => useInterval(callback, null));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  test('should cleanup timer on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1000));

    // Verify timer is active
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    // Unmount and verify timer is cleaned up
    unmount();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Should not have been called again after unmount
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should record performance metrics', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1000));

    expect(performanceMetrics.recordTimerStart).toHaveBeenCalledWith(
      expect.any(String),
      'interval'
    );

    unmount();

    expect(performanceMetrics.recordTimerCleanup).toHaveBeenCalledWith(
      expect.any(String)
    );
  });
});

describe('useTimeout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should call callback once after delay', () => {
    const callback = jest.fn();
    const delay = 1000;

    renderHook(() => useTimeout(callback, delay));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(delay - 1);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    // Should not be called again
    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not start timer when delay is null', () => {
    const callback = jest.fn();

    renderHook(() => useTimeout(callback, null));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  test('should cleanup timer on unmount before execution', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    // Unmount before timeout fires
    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});

describe('useTimerControl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should manage multiple intervals', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { result } = renderHook(() => useTimerControl());

    act(() => {
      result.current.setManagedInterval(callback1, 1000);
      result.current.setManagedInterval(callback2, 2000);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000); // Total: 2000ms
    });

    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  test('should cleanup individual timers', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimerControl());

    let intervalId: NodeJS.Timeout;

    act(() => {
      intervalId = result.current.setManagedInterval(callback, 1000);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.clearManagedInterval(intervalId);
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Should not have been called again after cleanup
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should cleanup all timers', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    const { result } = renderHook(() => useTimerControl());

    act(() => {
      result.current.setManagedInterval(callback1, 1000);
      result.current.setManagedInterval(callback2, 1000);
      result.current.setManagedTimeout(callback3, 500);
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback3).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(500); // Total: 1000ms
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.clearAllTimers();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Should not have been called again after clearAllTimers
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback3).toHaveBeenCalledTimes(1);
  });

  test('should cleanup all timers on unmount', () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useTimerControl());

    act(() => {
      result.current.setManagedInterval(callback, 1000);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Should not have been called again after unmount
    expect(callback).toHaveBeenCalledTimes(1);
  });
});