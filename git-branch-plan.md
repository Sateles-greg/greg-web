# Plano de Branches e Refatoração - Greg Simbiótico

## Branch principal de refatoração
- Nome: `refactor/estrutura-greg`
- Objetivo: migrar toda a estrutura para o novo padrão simbiótico modular

## Etapas
1. Criar branch `refactor/estrutura-greg`
2. Migrar componentes de UI para `src/ui/`
3. Migrar agentes biomédicos para `src/agents/biomed/`
4. Migrar LLM para `src/agents/llm/`
5. Migrar plugins para `src/agents/plugins/`
6. Migrar contextos globais para `src/core/contexts/`
7. Migrar integrações externas para `src/integrations/`
8. Migrar serviços internos para `src/services/`
9. Atualizar todos os imports
10. Ajustar scripts de build/dev
11. Testar build e execução local
12. Commitar cada etapa com mensagem clara
13. Documentar cada etapa no CHANGELOG.md

## Política
- Não dar merge em `main` sem revisão e testes completos.
- Todas as alterações devem ser aplicadas apenas nesta branch até validação final.
