// auto-monitor-ml-dashboard.js
// Monitoramento com ML e dashboard web: visualização em tempo real dos dados do backend

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 4000;

const LOG_FILE = 'backend-monitor.log';

app.use(express.static(__dirname));

app.get('/api/logs', (req, res) => {
  if (!fs.existsSync(LOG_FILE)) return res.json([]);
  const logs = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(Boolean);
  res.json(logs);
});

app.get('/api/errors', (req, res) => {
  if (!fs.existsSync(LOG_FILE)) return res.json([]);
  const logs = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(l => l.includes('ERRO') || l.includes('caiu'));
  res.json(logs);
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Dashboard Backend Monitor</title></head>
      <body>
        <h1>Monitoramento Backend</h1>
        <div id="logs"></div>
        <script>
          async function fetchLogs() {
            const res = await fetch('/api/logs');
            const logs = await res.json();
            document.getElementById('logs').innerHTML = '<pre>' + logs.join('\n') + '</pre>';
          }
          setInterval(fetchLogs, 2000);
          fetchLogs();
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Dashboard de monitoramento rodando em http://localhost:${PORT}`);
});

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOG_FILE, line);
  console.log(msg);
}

function startBackend() {
  const proc = spawn('node', ['openai-proxy.js'], { stdio: 'pipe' });
  proc.stdout.on('data', data => log('BACKEND: ' + data));
  proc.stderr.on('data', data => log('ERRO: ' + data));
  proc.on('exit', (code) => {
    log('Backend caiu com código ' + code);
    setTimeout(startBackend, 2000);
  });
}

try {
  execSync('node health-check.js', { stdio: 'inherit' });
  log('Health-check executado com sucesso.');
} catch (e) {
  log('Health-check falhou: ' + e.message);
}

startBackend();
