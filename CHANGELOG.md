# CHANGELOG - Greg Simbiótico

Todas as alterações significativas no projeto serão documentadas aqui.

## [Unreleased]
### Adicionado
- Planejamento inicial de reorganização estrutural do projeto (`refactor/estrutura-greg`).
- Criação de estrutura simbiótica modular para organização futura:
  - `src/core/`, `src/agents/`, `src/ui/`, `src/training/`, `src/integrations/`, `src/services/`, `src/environments/`, `src/config/`
- Inclusão de instruções para simulação em ambiente seguro.
- Substituição de backups locais por uso de branch dedicada com versionamento Git.
- Planejamento registrado em `git-branch-plan.md`.

### Alterado
- Remoção da dependência de `/legacy-structure/` como forma de backup.

## [0.1.0] - Estrutura inicial
### Adicionado
- Criação do repositório `greg-simbiotico`
- Protótipo funcional com Tauri, React, Python e WebSocket integrados

## ✅ Ações Planejadas
- [ ] Criar branch `refactor/estrutura-greg`
- [ ] Mapear arquivos atuais e sua nova localização
- [ ] Reorganizar os arquivos fisicamente
- [ ] Atualizar caminhos de importação e dependências internas
- [ ] Atualizar scripts de build, start e dev
- [ ] Rodar build/testes para React, Tauri e scripts Python
- [ ] Validar execução local simbiótica de ponta a ponta
- [ ] Commitar alterações por pasta com mensagens claras
- [ ] Documentar mudanças em `CHANGELOG.md`

## 🛑 Políticas
- Nenhum merge direto para `main` sem revisão e testes.
- Todas as alterações devem ser aplicadas **apenas nesta branch** até validação final.
- Testes automáticos e builds devem estar verdes antes de qualquer integração principal.

## 🧠 Observações simbióticas
- Evitar redundância entre `services/` e `integrations/`.
- A camada `agents/` pode evoluir para conter múltiplas inteligências simbióticas com ciclo próprio.
- A pasta `training/` pode conter múltiplos pipelines e configurações adaptáveis a dados do usuário.

## 📆 Histórico desta branch
| Data       | Responsável | Ação                                     |
|------------|-------------|------------------------------------------|
| 2025-07-26 | Greg        | Criação da branch                        |
| 2025-07-26 | Greg        | Estrutura simbiótica inicial criada      |

> Este plano pode ser iterado dinamicamente à medida que o projeto evolui.
