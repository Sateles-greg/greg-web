// auto-monitor-ml-dashboard-advanced.js
// Dashboard web avançado com gráficos, alertas e análise preditiva

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 4001;

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

app.get('/api/stats', (req, res) => {
  if (!fs.existsSync(LOG_FILE)) return res.json({});
  const logs = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(Boolean);
  const errors = logs.filter(l => l.includes('ERRO') || l.includes('caiu'));
  const byHour = {};
  for (const e of errors) {
    const time = new Date(e.split(']')[0].replace('[',''));
    const hour = time.getHours();
    byHour[hour] = (byHour[hour] || 0) + 1;
  }
  res.json(byHour);
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Dashboard Backend Monitor Avançado</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <h1>Monitoramento Backend Avançado</h1>
        <canvas id="errorChart" width="600" height="200"></canvas>
        <div id="logs"></div>
        <script>
          async function fetchStats() {
            const res = await fetch('/api/stats');
            const stats = await res.json();
            const ctx = document.getElementById('errorChart').getContext('2d');
            const data = {
              labels: Object.keys(stats),
              datasets: [{ label: 'Erros por hora', data: Object.values(stats), backgroundColor: 'rgba(255,99,132,0.2)', borderColor: 'rgba(255,99,132,1)', borderWidth: 1 }]
            };
            if (window.errorChart) window.errorChart.destroy();
            window.errorChart = new Chart(ctx, { type: 'bar', data });
          }
          async function fetchLogs() {
            const res = await fetch('/api/logs');
            const logs = await res.json();
            document.getElementById('logs').innerHTML = '<pre>' + logs.join('\n') + '</pre>';
          }
          setInterval(fetchStats, 5000);
          setInterval(fetchLogs, 2000);
          fetchStats();
          fetchLogs();
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Dashboard avançado rodando em http://localhost:${PORT}`);
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
