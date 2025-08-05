interface AnaliseContexto {
  modo: string;
  confianca: number; // 0-1
  razoes: string[];
  sugestoes: string[];
}

interface ConfiguracaoDeteccao {
  modos: {
    [key: string]: {
      palavrasChave: string[];
      peso: number;
      acoes: string[];
    };
  };
  historico: string[];
  limiteHistorico: number;
}

const configuracaoDeteccao: ConfiguracaoDeteccao = {
  modos: {
    Reparo: {
      palavrasChave: [
        'exaurido',
        'cansado',
        'exausto',
        'fatigado',
        'esgotado',
        'estressado',
        'sobrecarregado',
        'burnout',
        'descanso',
        'dormir',
        'relaxar',
        'pausa',
        'recarregar',
        'recuperar',
      ],
      peso: 1.0,
      acoes: [
        'Sugerir pausa de 15-20 minutos',
        'Lembrar de hidratação',
        'Recomendar exercícios de respiração',
        'Propor atividade relaxante',
      ],
    },
    Foco: {
      palavrasChave: [
        'foco',
        'concentração',
        'analisar',
        'estratégia',
        'planejar',
        'trabalho',
        'produtividade',
        'meta',
        'objetivo',
        'tarefa',
        'estudar',
        'aprender',
        'resolver',
        'implementar',
        'desenvolver',
      ],
      peso: 1.0,
      acoes: [
        'Bloquear notificações desnecessárias',
        'Organizar tarefas por prioridade',
        'Sugerir técnica Pomodoro',
        'Minimizar distrações',
      ],
    },
    Expansao: {
      palavrasChave: [
        'explorar',
        'ideia',
        'criar',
        'criatividade',
        'inovação',
        'brainstorming',
        'possibilidades',
        'descobrir',
        'experimentar',
        'inspiração',
        'imaginação',
        'inventar',
        'projetar',
        'sonhar',
      ],
      peso: 1.0,
      acoes: [
        'Abrir espaço para experimentação',
        'Sugerir ferramentas criativas',
        'Conectar com recursos inspiradores',
        'Encorajar pensamento lateral',
      ],
    },
    Zen: {
      palavrasChave: [
        'zen',
        'calmo',
        'meditar',
        'meditação',
        'mindfulness',
        'tranquilo',
        'sereno',
        'paz',
        'equilíbrio',
        'harmonia',
        'contemplação',
        'reflexão',
        'silêncio',
        'presente',
      ],
      peso: 1.0,
      acoes: [
        'Reduzir estímulos visuais',
        'Sugerir música ambiente suave',
        'Promover exercícios de respiração',
        'Facilitar estado contemplativo',
      ],
    },
    Social: {
      palavrasChave: [
        'conversar',
        'falar',
        'comunicar',
        'compartilhar',
        'colaborar',
        'reunião',
        'discussão',
        'networking',
        'conectar',
        'interagir',
        'grupo',
        'equipe',
        'comunidade',
        'socializar',
      ],
      peso: 0.8,
      acoes: [
        'Otimizar ferramentas de comunicação',
        'Sugerir pausas sociais',
        'Facilitar colaboração',
        'Lembrar de compromissos sociais',
      ],
    },
    Aprendizado: {
      palavrasChave: [
        'aprender',
        'estudar',
        'curso',
        'tutorial',
        'pesquisar',
        'conhecimento',
        'habilidade',
        'treinar',
        'praticar',
        'desenvolver',
        'entender',
        'compreender',
        'absorver',
        'assimilar',
      ],
      peso: 0.9,
      acoes: [
        'Organizar materiais de estudo',
        'Sugerir técnicas de memorização',
        'Propor intervalos de revisão',
        'Conectar com recursos educacionais',
      ],
    },
  },
  historico: [],
  limiteHistorico: 10,
};

// Função principal melhorada de detecção de modo
export function detectarModo(input: string): string {
  const analise = analisarContextoCompleto(input);
  return analise.modo;
}

// Análise completa do contexto
export function analisarContextoCompleto(input: string): AnaliseContexto {
  const texto = input.toLowerCase();

  // Calcular pontuações para cada modo
  const pontuacoes: {
    [key: string]: { pontos: number; palavrasEncontradas: string[] };
  } = {};

  for (const [modo, config] of Object.entries(configuracaoDeteccao.modos)) {
    pontuacoes[modo] = { pontos: 0, palavrasEncontradas: [] };

    for (const palavra of config.palavrasChave) {
      const regex = new RegExp(`\\b${palavra}\\b`, 'i');
      if (regex.test(texto)) {
        pontuacoes[modo].pontos += config.peso;
        pontuacoes[modo].palavrasEncontradas.push(palavra);
      }
    }
  }

  // Analisar contexto histórico se disponível
  analisarHistorico(pontuacoes);

  // Encontrar modo com maior pontuação
  let modoEscolhido = 'Foco'; // modo padrão
  let maiorPontuacao = 0;
  let palavrasDetectadas: string[] = [];

  for (const [modo, dados] of Object.entries(pontuacoes)) {
    if (dados.pontos > maiorPontuacao) {
      maiorPontuacao = dados.pontos;
      modoEscolhido = modo;
      palavrasDetectadas = dados.palavrasEncontradas;
    }
  }

  // Calcular confiança (0-1)
  const confianca = Math.min(maiorPontuacao / 3, 1); // Normalizar

  // Gerar razões e sugestões
  const razoes =
    palavrasDetectadas.length > 0
      ? [`Detectadas palavras-chave: ${palavrasDetectadas.join(', ')}`]
      : ['Padrão aplicado devido à ausência de indicadores específicos'];

  const sugestoes = configuracaoDeteccao.modos[modoEscolhido]?.acoes || [];

  // Adicionar ao histórico
  adicionarAoHistorico(modoEscolhido);

  return {
    modo: modoEscolhido,
    confianca,
    razoes,
    sugestoes,
  };
}

// Analisar padrões no histórico
function analisarHistorico(pontuacoes: {
  [key: string]: { pontos: number; palavrasEncontradas: string[] };
}): void {
  if (configuracaoDeteccao.historico.length < 2) return;

  // Análise simples: se o último modo foi o mesmo, dar um pequeno boost
  const ultimoModo =
    configuracaoDeteccao.historico[configuracaoDeteccao.historico.length - 1];
  const penultimoModo =
    configuracaoDeteccao.historico[configuracaoDeteccao.historico.length - 2];

  if (ultimoModo === penultimoModo && pontuacoes[ultimoModo]) {
    pontuacoes[ultimoModo].pontos += 0.2; // Pequeno boost por consistência
  }
}

// Adicionar entrada ao histórico
function adicionarAoHistorico(modo: string): void {
  const entrada = `${new Date().toISOString()}: ${modo}`;
  configuracaoDeteccao.historico.push(entrada);

  // Manter limite do histórico
  if (
    configuracaoDeteccao.historico.length > configuracaoDeteccao.limiteHistorico
  ) {
    configuracaoDeteccao.historico.shift();
  }
}

// Obter sugestões para o modo atual
export function obterSugestoesModo(modo: string): string[] {
  return configuracaoDeteccao.modos[modo]?.acoes || [];
}

// Obter todos os modos disponíveis
export function obterModosDisponiveis(): string[] {
  return Object.keys(configuracaoDeteccao.modos);
}

// Obter estatísticas de uso de modos
export function obterEstatisticasModos(): { [key: string]: number } {
  const estatisticas: { [key: string]: number } = {};

  for (const modo of Object.keys(configuracaoDeteccao.modos)) {
    estatisticas[modo] = 0;
  }

  for (const entrada of configuracaoDeteccao.historico) {
    const modo = entrada.split(': ')[1];
    if (estatisticas[modo] !== undefined) {
      estatisticas[modo]++;
    }
  }

  return estatisticas;
}

// Limpar histórico
export function limparHistorico(): void {
  configuracaoDeteccao.historico = [];
}

// Configurar modo personalizado
export function configurarModoPersonalizado(
  nome: string,
  palavrasChave: string[],
  acoes: string[],
  peso: number = 1.0
): void {
  configuracaoDeteccao.modos[nome] = {
    palavrasChave,
    peso,
    acoes,
  };
}

// Remover modo personalizado
export function removerModoPersonalizado(nome: string): boolean {
  if (['Reparo', 'Foco', 'Expansao', 'Zen'].includes(nome)) {
    return false; // Não permitir remoção de modos básicos
  }

  if (configuracaoDeteccao.modos[nome]) {
    delete configuracaoDeteccao.modos[nome];
    return true;
  }

  return false;
}

// Obter histórico completo
export function obterHistorico(): string[] {
  return [...configuracaoDeteccao.historico];
}

// Analisar tendências do usuário
export function analisarTendenciasUsuario(): {
  modoMaisFrequente: string;
  padroesTemporais: string[];
  recomendacoes: string[];
} {
  const estatisticas = obterEstatisticasModos();

  // Encontrar modo mais frequente
  let modoMaisFrequente = 'Foco';
  let maiorFrequencia = 0;

  for (const [modo, frequencia] of Object.entries(estatisticas)) {
    if (frequencia > maiorFrequencia) {
      maiorFrequencia = frequencia;
      modoMaisFrequente = modo;
    }
  }

  // Análise simples de padrões temporais
  const padroesTemporais: string[] = [];
  if (maiorFrequencia > configuracaoDeteccao.historico.length * 0.5) {
    padroesTemporais.push(`Forte tendência para o modo ${modoMaisFrequente}`);
  }

  // Gerar recomendações baseadas nos padrões
  const recomendacoes: string[] = [];
  if (modoMaisFrequente === 'Reparo') {
    recomendacoes.push(
      'Considere melhorar rotinas de descanso e gestão de estresse'
    );
  } else if (modoMaisFrequente === 'Foco') {
    recomendacoes.push(
      'Aproveite sua tendência de foco para estabelecer metas ambiciosas'
    );
  } else if (modoMaisFrequente === 'Expansao') {
    recomendacoes.push('Canal sua criatividade para projetos inovadores');
  } else if (modoMaisFrequente === 'Zen') {
    recomendacoes.push('Mantenha práticas contemplativas regulares');
  }

  return {
    modoMaisFrequente,
    padroesTemporais,
    recomendacoes,
  };
}
