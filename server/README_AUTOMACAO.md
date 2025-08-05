# Automação do Backend

Scripts disponíveis:

- `health-check.js`: Verifica dependências e status do backend.
- `auto-restart.js`: Reinicia o backend automaticamente se cair ou faltar dependências.
- `integration-test.js`: Testa endpoints críticos do backend.
- `update-deps.js`: Atualiza todas as dependências do projeto.

## Como usar

1. Execute `node health-check.js` para diagnóstico rápido.
2. Execute `node auto-restart.js` para manter o backend sempre ativo.
3. Execute `node integration-test.js` para validar endpoints.
4. Execute `node update-deps.js` para atualizar dependências.

Esses scripts podem ser integrados ao pipeline de deploy ou rodados manualmente para garantir estabilidade e automação.
