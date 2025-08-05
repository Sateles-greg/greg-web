import express, { Request, Response } from 'express';

const router = express.Router();

// Simulação de armazenamento de configurações
let configuracoes = {
  modoAtual: 'Foco',
  intervaloVerificacao: 30000,
  notificacoesAtivas: true,
};

// Função de validação
function validarConfiguracoes(dados: any): { valido: boolean; erros: string[] } {
  const erros: string[] = [];

  if (typeof dados.modoAtual !== 'string' || !['Foco', 'Expansao', 'Zen', 'Reparo'].includes(dados.modoAtual)) {
    erros.push('modoAtual inválido. Valores permitidos: Foco, Expansao, Zen, Reparo.');
  }

  if (typeof dados.intervaloVerificacao !== 'number' || dados.intervaloVerificacao < 1000) {
    erros.push('intervaloVerificacao deve ser um número maior ou igual a 1000.');
  }

  if (typeof dados.notificacoesAtivas !== 'boolean') {
    erros.push('notificacoesAtivas deve ser um valor booleano.');
  }

  return { valido: erros.length === 0, erros };
}

// Função para validar propriedades inesperadas
function validarPropriedadesExtras(dados: any, propriedadesPermitidas: string[]): string[] {
  const propriedadesExtras = Object.keys(dados).filter(
    (chave) => !propriedadesPermitidas.includes(chave)
  );
  return propriedadesExtras;
}

// Endpoint para obter configurações
router.get('/config', (_req: Request, res: Response) => {
  res.json(configuracoes);
});

// Endpoint para atualizar configurações
router.post('/config', (req: Request, res: Response) => {
  const propriedadesPermitidas = ['modoAtual', 'intervaloVerificacao', 'notificacoesAtivas'];
  const propriedadesExtras = validarPropriedadesExtras(req.body, propriedadesPermitidas);

  if (propriedadesExtras.length > 0) {
    return res.status(400).json({
      sucesso: false,
      erros: [`Propriedades inesperadas: ${propriedadesExtras.join(', ')}`],
    });
  }

  const { valido, erros } = validarConfiguracoes(req.body);

  if (!valido) {
    return res.status(400).json({ sucesso: false, erros });
  }

  configuracoes = { ...configuracoes, ...req.body };
  res.json({ sucesso: true, configuracoes });
});

export default router;
