const express = require('express');
const path = require('path');
const statusRouter = require('../api/status');
const configRouter = require('../api/config');

const app = express();
const PORT = 3000;

// Servir o painel de monitoramento
app.use(express.static(path.join(__dirname, 'public')));

// Configurar o endpoint da API
app.use('/api', statusRouter);
app.use('/api', configRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});