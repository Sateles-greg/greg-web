# Greg

## Introdução

Greg é um projeto avançado que combina Tauri, React e TypeScript para criar uma aplicação moderna e eficiente. Ele inclui funcionalidades como integração com OpenAI, monitoramento inteligente e execução de rotinas automáticas.

## Configuração Inicial

1. Instale as dependências:

    ```bash
    npm install
    ```

2. Configure o ambiente:

    Crie um arquivo `.env` com as variáveis necessárias. Exemplo:

    ```env
    API_KEY=your-api-key
    NODE_ENV=development
    ```

## Executando o Projeto

Para iniciar o projeto localmente:

```bash
npm run dev
```

## Executando os Testes

Execute os testes com o comando:

```bash
npm test
```

Para gerar o relatório de cobertura:

```bash
npm test -- --coverage
```

O relatório será gerado na pasta `coverage/`.

## Exemplos de Uso

### Modo Agente

Ative o modo agente com o comando:

```bash
npm run modo-agente -- --demo
```

Para iniciar a interface CLI interativa:

```bash
npm run modo-agente -- --cli
```

## Integração Contínua

Este projeto utiliza GitHub Actions para integração contínua. O workflow está localizado em `.github/workflows/ci-dashboard.yml` e executa testes automaticamente em cada push ou pull request.

## Ferramentas Recomendadas

- [VS Code](https://code.visualstudio.com/)
- [Tauri Extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [Rust Analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
