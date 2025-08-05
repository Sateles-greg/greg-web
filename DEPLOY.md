
# Guia de Deploy - Greg

## Pré-requisitos

- Node.js 18+
- npm
- (Opcional) Docker

## Instalação

1. Clone o repositório
2. Instale as dependências:

   ```sh
   npm install
   cd server && npm install
   ```

3. Configure o arquivo `.env` (baseie-se no `.env.example`)

## Variáveis de Ambiente

- `VITE_API_URL`: URL do backend (ex: [http://localhost:3001](http://localhost:3001))
- `OPENAI_API_KEY`: Chave da API OpenAI
- `JWT_SECRET`: Segredo para autenticação JWT

## Comandos Principais

- Iniciar frontend:

  ```sh
  npm run dev
  ```

- Iniciar backend:

  ```sh
  cd server
  npm run dev
  ```

## Endpoints Backend

- `POST /api/greg`: Proxy para OpenAI
- `POST /api/sincronizarModo`: Sincroniza modo simbiótico
- `GET /api/sincronizarModo`: Lista registros de modos

## Testes

- Para rodar testes:

  ```sh
  npm test
  ```

## Observações

- Para produção, configure HTTPS, autenticação JWT e restrinja CORS.
- Consulte os logs do backend para auditoria e erros.

<!-- Removido heading duplicado e conteúdo de exemplo -->
