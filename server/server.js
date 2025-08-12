const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

// Import secure logger utility
const { SecureLogger, sanitizeErrorResponse, logEnvironmentInfo } = require('./secureLogger.js');
const logger = new SecureLogger('SERVER');

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
  // Use debug level logging instead of info to avoid production logs
  logger.debug('Status request received');
  res.json(gregState);
});

// Rota para definir um novo modo para o Greg
app.post('/api/greg/mode', (req, res) => {
  const { mode } = req.body;

  if (!mode) {
    return res.status(400).json({ error: 'O campo "mode" é obrigatório.' });
  }

  logger.debug('Mode change requested', { newMode: mode });
  gregState.mode = mode;
  gregState.status = `Modo alterado para ${mode}.`;
  
  // Retorna o novo estado completo
  res.json(gregState);
});

// --- Fim da API do Greg ---

// Endpoint seguro para análise de emoção (substituindo acesso direto do frontend)
app.post('/api/greg/analyze-emotion', async (req, res) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required and must be a string.' });
  }

  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      logger.warn('OpenAI API key not configured for emotion analysis');
      return res.json({ emotion: 'neutro' }); // Fallback
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system', 
            content: 'Classifique a emoção principal do texto em uma palavra (feliz, cansado, ansioso, motivado, neutro, irritado). Responda só a palavra.'
          }, 
          {
            role: 'user', 
            content: text
          }
        ]
      })
    });

    if (!response.ok) {
      logger.error('OpenAI API request failed', { status: response.status });
      return res.json({ emotion: 'neutro' }); // Fallback
    }

    const data = await response.json();
    const emotion = data.choices?.[0]?.message?.content?.toLowerCase() || 'neutro';
    
    // Validate emotion is in allowed list
    const allowedEmotions = ['feliz', 'cansado', 'ansioso', 'motivado', 'neutro', 'irritado'];
    const validEmotion = allowedEmotions.includes(emotion) ? emotion : 'neutro';
    
    res.json({ emotion: validEmotion });
    
  } catch (error) {
    logger.error('Error in emotion analysis', sanitizeErrorResponse(error));
    res.json({ emotion: 'neutro' }); // Always return fallback on error
  }
});

// Endpoint seguro para análise de sentimento
app.post('/api/greg/analyze-sentiment', async (req, res) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required and must be a string.' });
  }

  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      logger.warn('OpenAI API key not configured for sentiment analysis');
      return res.status(503).json({ error: 'AI service not available' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Você é Greg, um analista emocional simbiótico.'
          },
          {
            role: 'user',
            content: `Analise o sentimento da seguinte frase: ${text}`
          }
        ]
      })
    });

    if (!response.ok) {
      logger.error('OpenAI API request failed for sentiment analysis', { status: response.status });
      return res.status(503).json({ error: 'AI service error' });
    }

    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    logger.error('Error in sentiment analysis', sanitizeErrorResponse(error));
    res.status(500).json({ 
      error: 'Error analyzing sentiment',
      ...sanitizeErrorResponse(error)
    });
  }
});

// Endpoint seguro para simulação de decisão
app.post('/api/greg/simulate-decision', async (req, res) => {
  const { action } = req.body;
  
  if (!action || typeof action !== 'string') {
    return res.status(400).json({ error: 'Action is required and must be a string.' });
  }

  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      logger.warn('OpenAI API key not configured for decision simulation');
      return res.status(503).json({ error: 'AI service not available' });
    }

    const functions = [
      {
        name: 'simular_decisao',
        description: 'Simula 3 consequências possíveis para uma decisão simbiótica',
        parameters: {
          type: 'object',
          properties: {
            acao: {
              type: 'string',
              description: 'A ação ou decisão que o usuário está considerando',
            },
          },
          required: ['acao'],
        },
      },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Você é Greg, uma I.A. simbiótica estrategista, focada em proteger e aprimorar a vida do usuário.'
          },
          { 
            role: 'user', 
            content: `Simule consequências se eu decidir: ${action}` 
          },
        ],
        functions,
        function_call: { name: 'simular_decisao' },
      })
    });

    if (!response.ok) {
      logger.error('OpenAI API request failed for decision simulation', { status: response.status });
      return res.status(503).json({ error: 'AI service error' });
    }

    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    logger.error('Error in decision simulation', sanitizeErrorResponse(error));
    res.status(500).json({ 
      error: 'Error simulating decision',
      ...sanitizeErrorResponse(error)
    });
  }
});

// Endpoint seguro para triagem clínica
app.post('/api/greg/clinical-triage', async (req, res) => {
  const { history, symptoms } = req.body;
  
  if (!history || !symptoms || typeof history !== 'string' || typeof symptoms !== 'string') {
    return res.status(400).json({ error: 'History and symptoms are required and must be strings.' });
  }

  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      logger.warn('OpenAI API key not configured for clinical triage');
      return res.status(503).json({ error: 'AI service not available' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Você é Greg, uma IA clínica que faz triagem baseada no histórico pessoal do usuário.'
          },
          {
            role: 'user',
            content: `Histórico: ${history}\nSintomas: ${symptoms}`
          }
        ]
      })
    });

    if (!response.ok) {
      logger.error('OpenAI API request failed for clinical triage', { status: response.status });
      return res.status(503).json({ error: 'AI service error' });
    }

    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    logger.error('Error in clinical triage', sanitizeErrorResponse(error));
    res.status(500).json({ 
      error: 'Error in clinical analysis',
      ...sanitizeErrorResponse(error)
    });
  }
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
    logger.error('Error in NLP processing', sanitizeErrorResponse(err));
    return res.status(500).json({ 
      error: 'Erro ao gerar resposta simbiótica', 
      ...sanitizeErrorResponse(err)
    });
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
      logger.error('Failed to execute GCP validation script', sanitizeErrorResponse(error));
      return res.status(500).json({ 
        status: 'error', 
        message: 'Falha ao executar o script de validação.',
        ...sanitizeErrorResponse(error)
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
  logger.debug('User connected', { socketId: socket.id });

  // Evento para encaminhar a oferta (offer) do WebRTC
  socket.on('offer', (data) => {
    // Encaminha a oferta para todos os outros clientes, exceto o remetente
    socket.broadcast.emit('offer', data);
    logger.debug('WebRTC offer relayed');
  });

  // Evento para encaminhar a resposta (answer) do WebRTC
  socket.on('answer', (data) => {
    // Encaminha a resposta para todos os outros clientes, exceto o remetente
    socket.broadcast.emit('answer', data);
    logger.debug('WebRTC answer relayed');
  });

  // Evento para encaminhar os candidatos ICE (ICE candidate)
  socket.on('candidate', (data) => {
    // Encaminha o candidato para todos os outros clientes, exceto o remetente
    socket.broadcast.emit('candidate', data);
    logger.debug('ICE candidate relayed');
  });

  socket.on('disconnect', () => {
    logger.debug('User disconnected', { socketId: socket.id });
  });
});

server.listen(PORT, () => {
  logger.info(`Servidor de sinalização rodando na porta ${PORT}`);
  logEnvironmentInfo();
});
