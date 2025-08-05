import express, { Request, Response } from 'express';

const router = express.Router();

// Simulação de dados do sistema para o painel de monitoramento
router.get('/status', (_: Request, res: Response) => {
  const status = {
    modoAtual: 'Foco',
    tarefasEmExecucao: 3,
    alertas: [
      { tipo: 'info', mensagem: 'Sistema funcionando normalmente.' },
      { tipo: 'warning', mensagem: 'Verificação de memória pendente.' },
    ],
    ultimaAtualizacao: new Date().toISOString(),
  };

  res.json(status);
});

export default router;
