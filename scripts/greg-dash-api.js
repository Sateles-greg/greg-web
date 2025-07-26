const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const swaggerUi = require('swagger-ui-express');
const PORT = process.env.PORT || 3030;

const app = express();
app.use(bodyParser.json());

// Banco de dados local
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ status: { memoria: 72, integridade: "Estável", modulosAtivos: 6 }, estado: { estado: "expansão" }, logs: ["[22:00] Manutenção concluída", "[22:05] Backup realizado", "[22:10] Modo Expansão ativado"] }).write();

// Autenticação simples via header
function auth(req, res, next) {
  if (req.headers['x-api-key'] !== 'greg123') return res.status(401).json({ erro: 'Não autorizado' });
  next();
}

// Endpoints GET
app.get('/api/status-sistema', (req, res) => res.json(db.get('status').value()));
app.get('/api/estado-emocional', (req, res) => res.json(db.get('estado').value()));
app.get('/api/logs-simbioticos', (req, res) => res.json({ logs: db.get('logs').value() }));

// Endpoints POST (dinâmicos)
app.post('/api/status-sistema', auth, (req, res) => {
  db.set('status', req.body).write();
  res.json({ ok: true });
});
app.post('/api/estado-emocional', auth, (req, res) => {
  db.set('estado', req.body).write();
  res.json({ ok: true });
});
app.post('/api/logs-simbioticos', auth, (req, res) => {
  db.get('logs').push(req.body.log).write();
  res.json({ ok: true });
});

// Documentação Swagger
const swaggerDocument = {
  openapi: '3.0.0',
  info: { title: 'Greg Dash API', version: '1.0.0' },
  paths: {
    '/api/status-sistema': {
      get: { summary: 'Obter status do sistema', responses: { 200: { description: 'Status atual' } } },
      post: { summary: 'Atualizar status', parameters: [], requestBody: { content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 200: { description: 'Status atualizado' } } }
    },
    '/api/estado-emocional': {
      get: { summary: 'Obter estado emocional', responses: { 200: { description: 'Estado atual' } } },
      post: { summary: 'Atualizar estado emocional', parameters: [], requestBody: { content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 200: { description: 'Estado atualizado' } } }
    },
    '/api/logs-simbioticos': {
      get: { summary: 'Obter logs', responses: { 200: { description: 'Lista de logs' } } },
      post: { summary: 'Adicionar log', parameters: [], requestBody: { content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 200: { description: 'Log adicionado' } } }
    }
  }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`greg-dash-api rodando na porta ${PORT}`));
