import React, { Suspense, lazy as reactLazy } from 'react';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente wrapper para lazy loading com fallback personalizado
 */
export const LazyWrapper: React.FC<LazyComponentProps> = ({ 
  children, 
  fallback = <div style={{ padding: '20px', textAlign: 'center' }}>Carregando...</div> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

/**
 * Utilitário para criar componentes lazy com configurações padronizadas
 */
export function createLazyComponent<T = {}>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = reactLazy(importFn);
  
  return (props: T) => (
    <LazyWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyWrapper>
  );
}

/**
 * Hook para lazy loading condicional baseado em visibilidade
 */
export function useConditionalLazyLoad(condition: boolean, delay: number = 0) {
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    if (condition && !shouldLoad) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [condition, shouldLoad, delay]);

  return shouldLoad;
}

/**
 * Hook para lazy loading baseado em interseção (viewport)
 */
export function useIntersectionLazyLoad(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldLoad) {
          setIsVisible(true);
          setShouldLoad(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [shouldLoad, threshold]);

  return { ref, isVisible, shouldLoad };
}