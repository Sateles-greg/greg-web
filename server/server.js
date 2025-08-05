const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Habilita o CORS para todas as rotas
app.use(express.static(path.join(__dirname, '../webshare')));
app.use(express.json()); // Middleware para parsear o corpo de requisições JSON

// --- Início da API do Greg ---

// "Banco de dados" em memória para o estado do Greg
let gregState = {
  mode: 'zen',
  status: 'Online e operacional',
  activeModules: ['core', 'symbiosis', 'memory'],
  usageMetrics: {
    totalRequests: 1024,
    lastAnalysis: new Date().toISOString(),
  }
};

// Rota para obter o estado atual do Greg
app.get('/api/greg/status', (req, res) => {
  console.log('GET /api/greg/status -> Enviando estado:', gregState);
  res.json(gregState);
});

// Rota para definir um novo modo para o Greg
app.post('/api/greg/mode', (req, res) => {
  const { mode } = req.body;

  if (!mode) {
    return res.status(400).json({ error: 'O campo "mode" é obrigatório.' });
  }

  console.log(`POST /api/greg/mode -> Alterando modo para: ${mode}`);
  gregState.mode = mode;
  gregState.status = `Modo alterado para ${mode}.`;
  
  // Retorna o novo estado completo
  res.json(gregState);
});

// --- Fim da API do Greg ---

// Endpoint para resposta simbiótica (NLP/IA)
app.post('/api/greg/response', async (req, res) => {
  const { prompt, modo } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt é obrigatório.' });
  }
  try {
    // Tenta OpenAI primeiro
    const openaiKey = process.env.VITE_OPENAI_KEY || process.env.OPENAI_API_KEY;
    if (openaiKey) {
      const openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `Modo: ${modo || 'simbiotico'}` },
            { role: 'user', content: prompt }
          ]
        })
      });
      if (openaiResp.ok) {
        const data = await openaiResp.json();
        const result = data.choices?.[0]?.message?.content || '[sem resposta]';
        return res.json({ result });
      }
    }
    // Fallback para HuggingFace
    const hfKey = process.env.HF_API_KEY;
    if (hfKey) {
      const hfResp = await fetch('https://api-inference.huggingface.co/models/gpt2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hfKey}`
        },
        body: JSON.stringify({ inputs: prompt })
      });
      if (hfResp.ok) {
        const data = await hfResp.json();
        const result = data[0]?.generated_text || '[sem resposta HuggingFace]';
        return res.json({ result });
      }
    }
    return res.status(500).json({ error: 'Nenhuma IA disponível.' });
  } catch (err) {
    console.error('Erro NLP:', err);
    return res.status(500).json({ error: 'Erro ao gerar resposta simbiótica', details: err.message });
  }
});

// Rota para servir o cliente WebRTC
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../webshare/client.html'));
});

// Novo endpoint para verificar o status do GCP
app.get('/api/gcp-status', (req, res) => {
  const pythonScriptPath = path.join(__dirname, '..', 'scripts', 'gcp', 'validate-gcp-access.py');
  
  // Garante que o python seja executado a partir da raiz do projeto
  const projectRoot = path.join(__dirname, '..');

  exec(`python "${pythonScriptPath}"`, { cwd: projectRoot }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o script: ${error.message}`);
      return res.status(500).json({ 
        status: 'error', 
        message: 'Falha ao executar o script de validação.',
        details: stderr 
      });
    }

    // Verifica se a validação foi bem-sucedida pela saída do script
    if (stdout.includes('Validação Concluída com Sucesso')) {
      res.json({ status: 'connected', message: 'Acesso ao GCP e Vertex AI validado com sucesso.' });
    } else {
      res.json({ 
        status: 'error', 
        message: 'A validação do GCP falhou. Verifique os logs do servidor.',
        details: stdout // Envia a saída padrão para depuração no frontend
      });
    }
  });
});


io.on('connection', (socket) => {
  console.log('Um usuário se conectou:', socket.id);

  // Evento para encaminhar a oferta (offer) do WebRTC
  socket.on('offer', (data) => {
    // Encaminha a oferta para todos os outros clientes, exceto o remetente
    socket.broadcast.emit('offer', data);
    console.log('Oferta recebida e retransmitida.');
  });

  // Evento para encaminhar a resposta (answer) do WebRTC
  socket.on('answer', (data) => {
    // Encaminha a resposta para todos os outros clientes, exceto o remetente
    socket.broadcast.emit('answer', data);
    console.log('Resposta recebida e retransmitida.');
  });

  // Evento para encaminhar os candidatos ICE (ICE candidate)
  socket.on('candidate', (data) => {
    // Encaminha o candidato para todos os outros clientes, exceto o remetente
    socket.broadcast.emit('candidate', data);
    console.log('Candidato ICE recebido e retransmitido.');
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor de sinalização rodando na porta ${PORT}`);
});
