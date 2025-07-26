// auto-monitor-ml.js
// Monitoramento com aprendizado de máquina: detecta padrões, sugere correções e gera relatórios

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const https = require('https');

const LOG_FILE = 'backend-monitor.log';
const WEBHOOKS = [
  'https://webhook.site/seu-endpoint',
  'https://hooks.slack.com/services/seu-endpoint',
  'https://discord.com/api/webhooks/seu-endpoint'
];

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOG_FILE, line);
  console.log(msg);
}

function sendWebhook(subject, text) {
  for (const urlStr of WEBHOOKS) {
    const url = new URL(urlStr);
    const data = JSON.stringify({ subject, text });
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    const req = https.request(options, res => {
      log(`Webhook para ${urlStr} enviado: ${res.statusCode}`);
    });
    req.on('error', err => log('Erro ao enviar webhook: ' + err));
    req.write(data);
    req.end();
  }
}

function analyzeLogsML() {
  if (!fs.existsSync(LOG_FILE)) return null;
  const logs = fs.readFileSync(LOG_FILE, 'utf8').split('\n');
  const errors = logs.filter(l => l.includes('ERRO') || l.includes('caiu'));
  // Simulação de ML: detecta padrões de erro e sugere correções
  const errorTypes = {};
  for (const e of errors) {
    const type = e.match(/ERRO: (.*)/);
    if (type && type[1]) {
      errorTypes[type[1]] = (errorTypes[type[1]] || 0) + 1;
    }
  }
  let suggestion = '';
  if (Object.keys(errorTypes).length > 0) {
    suggestion = 'Sugestão: Verifique as dependências, reinicie o backend ou revise o código nas áreas com mais erros.';
    log('Relatório ML: ' + JSON.stringify(errorTypes));
    sendWebhook('Relatório ML', JSON.stringify(errorTypes) + '\n' + suggestion);
  }
  return suggestion;
}

function startBackend() {
  const proc = spawn('node', ['openai-proxy.js'], { stdio: 'pipe' });
  proc.stdout.on('data', data => log('BACKEND: ' + data));
  proc.stderr.on('data', data => log('ERRO: ' + data));
  proc.on('exit', (code) => {
    log('Backend caiu com código ' + code);
    sendWebhook('Backend caiu', 'O backend caiu com código ' + code);
    setTimeout(() => {
      analyzeLogsML();
      startBackend();
    }, 2000);
  });
}

try {
  execSync('node health-check.js', { stdio: 'inherit' });
  log('Health-check executado com sucesso.');
} catch (e) {
  log('Health-check falhou: ' + e.message);
  sendWebhook('Health-check falhou', e.message);
}

analyzeLogsML();
startBackend();
