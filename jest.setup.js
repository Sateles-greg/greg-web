// Mock para import.meta.env em ambiente de teste
Object.defineProperty(global, 'import', {
  value: {},
  writable: true,
});
Object.defineProperty(global, 'import.meta', {
  value: { env: { VITE_API_URL: 'http://localhost:3001' } },
  writable: true,
});

// Configurações adicionais para testes
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock para console.log em testes (opcional)
if (process.env.NODE_ENV === 'test') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}
