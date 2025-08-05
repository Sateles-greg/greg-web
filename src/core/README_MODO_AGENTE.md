# 🤖 Greg - Modo Agente

O Modo Agente é um sistema avançado de automação que torna o Greg uma IA verdadeiramente autônoma, capaz de analisar contextos, tomar decisões e executar ações automaticamente para melhorar a experiência do usuário.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Como Usar](#como-usar)
- [Comandos Disponíveis](#comandos-disponíveis)
- [Configuração](#configuração)
- [Exemplos Práticos](#exemplos-práticos)
- [Desenvolvimento](#desenvolvimento)

## Visão Geral

O Modo Agente transforma o Greg em um assistente proativo que:

- **Analisa automaticamente** o contexto e estado emocional do usuário
- **Detecta modos** (Foco, Expansão, Zen, Reparo) baseado em inputs naturais
- **Executa rotinas automáticas** em intervalos configuráveis
- **Toma decisões inteligentes** usando IA integrada
- **Fornece sugestões personalizadas** baseadas no contexto atual
- **Monitora sistema** e gera alertas quando necessário

## Arquitetura

```text
src/
├── asi-agente/           # Agente ASI (Sistema Inteligente Autônomo)
│   ├── AgenteASI.ts     # Classe principal do agente
│   └── AgenteASI.test.ts # Testes unitários
├── core/                # Núcleo do sistema
│   ├── ModoAgente.ts    # Controlador principal
│   ├── IntegradorModoAgente.ts # Interface de integração
│   └── ExemploModoAgente.ts    # Exemplos de uso
├── cli/                 # Interface de linha de comando
│   └── ModoAgenteCLI.ts # CLI interativo
└── autoModo.ts          # Detecção automática de modos
```

### Componentes Principais

1. **AgenteASI**: Núcleo autônomo que executa rotinas automaticamente
2. **ControladorModoAgente**: Orquestra todas as funcionalidades
3. **IntegradorModoAgente**: Interface unificada para comandos
4. **CLI**: Interface de linha de comando para interação

## Funcionalidades

### 🧠 Detecção Inteligente de Modos

O sistema detecta automaticamente o estado emocional e contexto através de:

- **Palavras-chave contextuais**: Análise semântica do texto
- **Histórico de comportamento**: Padrões de uso anteriores
- **Integração com IA**: Análise de sentimento usando OpenAI
- **Confiança calculada**: Score de certeza para cada detecção

#### Modos Disponíveis

| Modo | Descrição | Ações Automáticas |
|------|-----------|-------------------|
| **Foco** | Concentração e produtividade | Bloquear distrações, organizar tarefas |
| **Expansão** | Criatividade e exploração | Sugerir ferramentas criativas, inspiração |
| **Zen** | Meditação e tranquilidade | Reduzir estímulos, música ambiente |
| **Reparo** | Descanso e recuperação | Sugerir pausas, hidratação, relaxamento |
| **Social** | Interação e comunicação | Otimizar ferramentas sociais |
| **Aprendizado** | Estudo e desenvolvimento | Organizar materiais, técnicas de estudo |

### 🔄 Execução Automática

- **Rotinas programadas**: Verificações periódicas do sistema
- **Análise contextual**: Avaliação contínua do estado do usuário
- **Tomada de decisões**: Ações baseadas no contexto analisado
- **Notificações inteligentes**: Alertas relevantes e oportunos

### 📊 Monitoramento e Estatísticas

- **Histórico de modos**: Rastreamento de padrões de uso
- **Métricas de performance**: Tarefas executadas, tempo ativo
- **Análise de tendências**: Recomendações baseadas no comportamento
- **Alertas de sistema**: Notificações sobre problemas ou oportunidades

## Como Usar

### Instalação

```bash
# Instalar dependências
npm install

# Executar testes
npm test
```

### Uso Básico

#### 1. Via Código TypeScript

```typescript
import { modoAgente } from './src/core/ModoAgente';

// Ativar modo agente
await modoAgente.ativar();

// Analisar contexto
const resultado = await modoAgente.executarComando('analisar', {
  entrada: 'Estou me sentindo muito focado hoje'
});

// Verificar status
const status = await modoAgente.executarComando('status');

// Desativar
await modoAgente.desativar();
```

#### 2. Via Interface Integrada

```typescript
import { integradorModoAgente } from './src/core/IntegradorModoAgente';

// Comando em linguagem natural
const resposta = await integradorModoAgente.processarComandoTexto(
  'Ativar modo agente e analisar como estou me sentindo'
);

console.log(resposta);
```

#### 3. Via CLI Interativo

```typescript
import { iniciarCLI } from './src/cli/ModoAgenteCLI';

// Iniciar interface de linha de comando
iniciarCLI();
```

## Comandos Disponíveis

### Comandos de Controle

- `ativar modo agente` - Ativa o sistema autônomo
- `desativar modo agente` - Desativa o sistema
- `mostrar status` - Exibe status atual
- `reiniciar sistema` - Reinicia o modo agente

### Comandos de Análise

- `analisar meu estado` - Analisa contexto atual
- `como estou me sentindo` - Detecção de modo emocional
- `que modo estou` - Mostra modo atual
- `dar sugestões` - Recomendações personalizadas

### Comandos de Configuração

- `configurar intervalo 30` - Define intervalo de verificação
- `ativar modo automático` - Habilita execução automática
- `listar modos disponíveis` - Mostra todos os modos

### Comandos de Informação

- `mostrar estatísticas` - Relatório de uso
- `histórico de modos` - Padrões de comportamento
- `ajuda` - Lista todos os comandos

## Configuração

### Configuração Básica

```typescript
const config = {
  agenteASI: {
    ativo: true,
    intervaloVerificacao: 30000, // 30 segundos
    modoAutomatico: true
  },
  integracoes: {
    gregAI: true,        // Usar OpenAI para análises
    orchestrator: true,  // Integrar com orchestrador
    sensores: false      // Sensores físicos (futuro)
  },
  notificacoes: {
    ativas: true,
    canais: ['console', 'sistema']
  }
};
```

### Configuração Avançada

```typescript
import { 
  configurarModoPersonalizado,
  analisarTendenciasUsuario 
} from './src/autoModo';

// Criar modo personalizado
configurarModoPersonalizado(
  'Exercicio',
  ['treino', 'academia', 'corrida', 'exercitar'],
  ['Sugerir playlist energética', 'Lembrar hidratação'],
  1.0
);

// Analisar tendências
const tendencias = analisarTendenciasUsuario();
console.log('Modo mais usado:', tendencias.modoMaisFrequente);
```

## Exemplos Práticos

### Exemplo 1: Detecção Automática

```typescript
// O usuário diz: "Estou muito cansado hoje"
const analise = await integradorModoAgente.processarComandoTexto(
  'Estou muito cansado hoje'
);

// Resultado:
// {
//   analise: {
//     modo: 'Reparo',
//     confianca: 0.9,
//     razoes: ['Detectadas palavras-chave: cansado'],
//     sugestoes: [
//       'Sugerir pausa de 15-20 minutos',
//       'Lembrar de hidratação',
//       'Recomendar exercícios de respiração'
//     ]
//   }
// }
```

### Exemplo 2: Uso Contínuo

```typescript
// Ativar e deixar funcionando automaticamente
await modoAgente.ativar();

// O agente executará verificações automáticas a cada 30 segundos
// Analisará contexto, detectará mudanças de modo
// Executará ações apropriadas automaticamente

// Verificar progresso depois de um tempo
setTimeout(async () => {
  const stats = await modoAgente.executarComando('estatisticas');
  console.log('Tarefas executadas:', stats.agenteASI.tarefasExecutadas);
}, 300000); // 5 minutos
```

### Exemplo 3: Integração com IA

```typescript
// Análise completa usando IA
const resultado = await modoAgente.executarComando('analisar', {
  entrada: 'Preciso decidir entre aceitar uma nova oportunidade de trabalho ou ficar onde estou'
});

// O sistema:
// 1. Detecta modo (provavelmente 'Foco' para decisões)
// 2. Usa OpenAI para simular consequências
// 3. Analisa sentimento da mensagem
// 4. Fornece recomendações contextuais
```

## Desenvolvimento

### Estrutura de Testes

```bash
# Executar testes específicos
npm test -- --testPathPattern=AgenteASI

# Executar com cobertura
npm test -- --coverage
```

### Adicionando Novos Modos

```typescript
// Em autoModo.ts
configurarModoPersonalizado(
  'NomeModo',
  ['palavra1', 'palavra2', 'palavra3'],
  ['Ação 1', 'Ação 2', 'Ação 3'],
  1.0 // peso
);
```

### Extending Functionality

```typescript
// Estender ControladorModoAgente
class MeuControladorPersonalizado extends ControladorModoAgente {
  async minhaFuncaoPersonalizada() {
    // Implementação customizada
  }
}
```

## Troubleshooting

### Problemas Comuns

1. **Erro ao ativar**: Verificar se todas as dependências estão instaladas
2. **IA não funciona**: Verificar variável `OPENAI_API_KEY`
3. **Detecção imprecisa**: Ajustar pesos dos modos em `autoModo.ts`

### Debug

```typescript
// Ativar logs detalhados
const agente = new AgenteASI({ logAtivo: true });

// Verificar histórico de detecções
import { obterHistorico } from './src/autoModo';
console.log(obterHistorico());
```

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Greg Modo Agente** - Transformando IA em verdadeira autonomia inteligente 🚀
