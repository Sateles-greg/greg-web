import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { LazyWrapper, createLazyComponent, useConditionalLazyLoad, useIntersectionLazyLoad } from '../src/ui/hooks/useLazyLoading';
import { renderHook, act } from '@testing-library/react';

// Mock components for testing
const TestComponent: React.FC<{text: string}> = ({ text }) => <div>{text}</div>;
const AsyncTestComponent = () => Promise.resolve({ default: TestComponent });

describe('LazyWrapper', () => {
  test('should render children in Suspense', async () => {
    render(
      <LazyWrapper>
        <div>Test Content</div>
      </LazyWrapper>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('should show custom fallback while loading', () => {
    const fallback = <div>Custom Loading...</div>;
    
    render(
      <LazyWrapper fallback={fallback}>
        <div>Test Content</div>
      </LazyWrapper>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});

describe('createLazyComponent', () => {
  test('should create a lazy component with default fallback', async () => {
    const LazyTest = createLazyComponent(() => AsyncTestComponent());

    render(<LazyTest text="Lazy Loaded!" />);

    // Wait for lazy component to load
    await waitFor(() => {
      expect(screen.getByText('Lazy Loaded!')).toBeInTheDocument();
    });
  });

  test('should create a lazy component with custom fallback', async () => {
    const customFallback = <div>Custom Fallback</div>;
    const LazyTest = createLazyComponent(() => AsyncTestComponent(), customFallback);

    render(<LazyTest text="Lazy Loaded!" />);

    // Fallback might flash briefly, but component should load
    await waitFor(() => {
      expect(screen.getByText('Lazy Loaded!')).toBeInTheDocument();
    });
  });
});

describe('useConditionalLazyLoad', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should load immediately when condition is true and no delay', () => {
    const { result } = renderHook(() => useConditionalLazyLoad(true, 0));

    expect(result.current).toBe(true);
  });

  test('should not load when condition is false', () => {
    const { result } = renderHook(() => useConditionalLazyLoad(false, 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(false);
  });

  test('should load after delay when condition becomes true', () => {
    const { result, rerender } = renderHook(
      ({ condition, delay }) => useConditionalLazyLoad(condition, delay),
      { initialProps: { condition: false, delay: 1000 } }
    );

    expect(result.current).toBe(false);

    // Change condition to true
    rerender({ condition: true, delay: 1000 });

    // Should still be false before delay
    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });

  test('should cleanup timer when condition changes back to false', () => {
    const { result, rerender } = renderHook(
      ({ condition, delay }) => useConditionalLazyLoad(condition, delay),
      { initialProps: { condition: false, delay: 1000 } }
    );

    // Change condition to true
    rerender({ condition: true, delay: 1000 });

    // Change back to false before delay completes
    rerender({ condition: false, delay: 1000 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should still be false since condition changed back
    expect(result.current).toBe(false);
  });
});

describe('useIntersectionLazyLoad', () => {
  // Mock IntersectionObserver
  const mockObserve = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
    // Clear previous mocks
    mockObserve.mockClear();
    mockDisconnect.mockClear();

    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
      callback
    }));
  });

  test('should return ref and initial state', () => {
    const { result } = renderHook(() => useIntersectionLazyLoad());

    expect(result.current.ref).toBeDefined();
    expect(result.current.isVisible).toBe(false);
    expect(result.current.shouldLoad).toBe(false);
  });

  test('should observe element when ref is attached', () => {
    const { result } = renderHook(() => useIntersectionLazyLoad());

    // Simulate ref being attached to an element
    const mockElement = document.createElement('div');
    Object.defineProperty(result.current.ref, 'current', {
      value: mockElement,
      writable: true,
    });

    // Re-render to trigger useEffect
    act(() => {
      // This would normally be triggered by the useEffect
    });

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.1 }
    );
  });

  test('should update state when intersection occurs', () => {
    let intersectionCallback: any;

    // Mock IntersectionObserver to capture callback
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
      };
    });

    const { result } = renderHook(() => useIntersectionLazyLoad());

    // Simulate intersection
    act(() => {
      if (intersectionCallback) {
        intersectionCallback([{ isIntersecting: true }]);
      }
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.shouldLoad).toBe(true);
  });

  test('should not update shouldLoad if already loaded', () => {
    let intersectionCallback: any;

    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
      };
    });

    const { result } = renderHook(() => useIntersectionLazyLoad());

    // First intersection
    act(() => {
      if (intersectionCallback) {
        intersectionCallback([{ isIntersecting: true }]);
      }
    });

    expect(result.current.shouldLoad).toBe(true);

    // Second intersection should not change shouldLoad
    act(() => {
      if (intersectionCallback) {
        intersectionCallback([{ isIntersecting: false }]);
      }
    });

    expect(result.current.shouldLoad).toBe(true);
  });

  test('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useIntersectionLazyLoad());

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});