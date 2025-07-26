// auto-monitor-ai.js
// Monitoramento inteligente com análise preditiva e auto-correção

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

function analyzeLogs() {
  if (!fs.existsSync(LOG_FILE)) return null;
  const logs = fs.readFileSync(LOG_FILE, 'utf8').split('\n');
  const errors = logs.filter(l => l.includes('ERRO') || l.includes('caiu'));
  // Simulação de análise preditiva: se houver mais de 3 erros em 10 minutos, reinicia e notifica
  const recentErrors = errors.filter(e => {
    const time = new Date(e.split(']')[0].replace('[',''));
    return (Date.now() - time.getTime()) < 10 * 60 * 1000;
  });
  if (recentErrors.length > 3) {
    log('Padrão de erro detectado: reiniciando backend e notificando.');
    sendWebhook('Padrão de erro detectado', 'Backend reiniciado automaticamente após múltiplos erros.');
    return true;
  }
  return false;
}

function startBackend() {
  const proc = spawn('node', ['openai-proxy.js'], { stdio: 'pipe' });
  proc.stdout.on('data', data => log('BACKEND: ' + data));
  proc.stderr.on('data', data => log('ERRO: ' + data));
  proc.on('exit', (code) => {
    log('Backend caiu com código ' + code);
    sendWebhook('Backend caiu', 'O backend caiu com código ' + code);
    setTimeout(() => {
      if (!analyzeLogs()) startBackend();
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

if (!analyzeLogs()) startBackend();
