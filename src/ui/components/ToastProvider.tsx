import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { useTimeout } from '../hooks/useTimer';

interface ToastContextType {
  showToast: (msg: string, type?: 'info' | 'error' | 'success') => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [shouldClearToast, setShouldClearToast] = useState<number | null>(null);

  // Use our custom timeout hook for proper cleanup
  useTimeout(() => {
    setToast(null);
    setShouldClearToast(null);
  }, shouldClearToast);

  function showToast(msg: string, type: 'info' | 'error' | 'success' = 'info') {
    setToast({ msg, type });
    setShouldClearToast(3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          background: toast.type === 'error' ? '#ffdddd' : toast.type === 'success' ? '#d4ffd4' : '#e9f1ff',
          color: toast.type === 'error' ? '#a00' : toast.type === 'success' ? '#0a0' : '#1a3a6b',
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: '0.7em 1.5em',
          zIndex: 9999,
          fontWeight: 600,
          boxShadow: '0 2px 12px #0002',
        }}>
          {toast.msg}
        </div>
      )}
    </ToastContext.Provider>
  );
};
