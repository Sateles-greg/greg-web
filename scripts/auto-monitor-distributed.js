// auto-monitor-distributed.js
// Monitoramento distribuído: integra com múltiplos serviços externos e redundância

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const https = require('https');

const LOG_FILE = 'backend-monitor.log';
const WEBHOOKS = [
  'https://webhook.site/seu-endpoint',
  'https://hooks.slack.com/services/seu-endpoint',
  'https://discord.com/api/webhooks/seu-endpoint'
];
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';

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

function sendLocalNotification(subject, text) {
  log('Notificação local: ' + subject + ' - ' + text);
}

function notify(subject, text) {
  sendLocalNotification(subject, text);
  sendWebhook(subject, text);
  // Se ADMIN_EMAIL estiver configurado, pode integrar com e-mail
}

function startBackend() {
  const proc = spawn('node', ['openai-proxy.js'], { stdio: 'pipe' });
  proc.stdout.on('data', data => log('BACKEND: ' + data));
  proc.stderr.on('data', data => log('ERRO: ' + data));
  proc.on('exit', (code) => {
    log('Backend caiu com código ' + code);
    notify('Backend caiu', 'O backend caiu com código ' + code);
    setTimeout(startBackend, 2000);
  });
}

try {
  execSync('node health-check.js', { stdio: 'inherit' });
  log('Health-check executado com sucesso.');
} catch (e) {
  log('Health-check falhou: ' + e.message);
  notify('Health-check falhou', e.message);
}

startBackend();
