// Backend simples para proxy OpenAI
const express = require('express');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(compression());
// Limite de 100 requisições por IP a cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});
app.use(limiter);
// Para produção, implemente autenticação JWT:
// const jwt = require('jsonwebtoken');
// app.use((req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Token ausente' });
//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch {
//     return res.status(401).json({ error: 'Token inválido' });
//   }
// });
app.use(cors({
  origin: ['http://localhost:1420'], // ajuste para o domínio do frontend em produção
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/greg', async (req, res) => {
  const { prompt, modo } = req.body;
  console.log(`[AUDIT] /api/greg chamada - modo: ${modo}, prompt: ${prompt?.slice(0, 50)}...`);
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8
    });
    console.log(`[AUDIT] /api/greg resposta OK`);
    res.json({ result: response.data.choices[0].message.content });
  } catch (err) {
    console.error(`[AUDIT] /api/greg erro:`, err);
    res.status(500).json({ error: err.message });
  }
});


// Armazenamento simples em memória
let registrosModo = [];

app.post('/api/sincronizarModo', (req, res) => {
  const registro = req.body;
  console.log(`[AUDIT] /api/sincronizarModo chamada - modo: ${registro?.modo}, data: ${registro?.data}`);
  // Validação profunda do registro
  if (
    registro &&
    typeof registro.modo === 'string' &&
    typeof registro.data === 'string' &&
    /^[a-zA-Z0-9-_]+$/.test(registro.modo) &&
    !isNaN(Date.parse(registro.data))
  ) {
    registrosModo.push(registro);
    // Mantém apenas os últimos 500 registros
    registrosModo = registrosModo.slice(-500);
    res.json({ status: 'ok', total: registrosModo.length });
  } else {
    res.status(400).json({ error: 'Registro inválido' });
  }
});

app.get('/api/sincronizarModo', (req, res) => {
  res.json({ registros: registrosModo });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Greg OpenAI Proxy rodando na porta ${PORT}`);
});
