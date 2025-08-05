import { executarModoAgente } from '../ModoAgenteMain';

// Mock para simular argumentos da linha de comando
const mockProcessArgv = (args: string[]) => {
  const originalArgv = process.argv;
  process.argv = ['node', 'script', ...args];
  return () => (process.argv = originalArgv);
};

describe('ModoAgenteMain', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('deve exibir ajuda quando --help é passado', async () => {
    const restoreArgv = mockProcessArgv(['--help']);

    await executarModoAgente();

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('USO:'));
    restoreArgv();
  });

  it('deve iniciar CLI quando --cli é passado', async () => {
    const restoreArgv = mockProcessArgv(['--cli']);

    const iniciarCLISpy = jest.spyOn(await import('../cli/ModoAgenteCLI'), 'iniciarCLI').mockImplementation(() => {});

    await executarModoAgente();

    expect(iniciarCLISpy).toHaveBeenCalled();
    restoreArgv();
    iniciarCLISpy.mockRestore();
  });

  it('deve executar demonstração quando --demo é passado', async () => {
    const restoreArgv = mockProcessArgv(['--demo']);

    const executarExemplosSpy = jest.spyOn(await import('../core/ExemploModoAgente'), 'executarExemplos').mockImplementation(async () => Promise.resolve());

    await executarModoAgente();

    expect(executarExemplosSpy).toHaveBeenCalled();
    restoreArgv();
    executarExemplosSpy.mockRestore();
  });

  it('deve exibir mensagem de erro para argumentos inválidos', async () => {
    const restoreArgv = mockProcessArgv(['--invalido']);

    await executarModoAgente();

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Argumento não reconhecido'));
    restoreArgv();
  });
});
