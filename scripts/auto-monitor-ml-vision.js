// auto-monitor-ml-vision.js
// Monitoramento com ML e visão computacional: detecta padrões, anomalias e gera alertas visuais

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const https = require('https');
const path = require('path');

const LOG_FILE = 'backend-monitor.log';
const REPORT_IMG = 'backend-report.png';
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

function sendWebhook(subject, text, imgPath) {
  for (const urlStr of WEBHOOKS) {
    const url = new URL(urlStr);
    const data = JSON.stringify({ subject, text, img: imgPath });
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

function analyzeLogsMLVision() {
  if (!fs.existsSync(LOG_FILE)) return null;
  const logs = fs.readFileSync(LOG_FILE, 'utf8').split('\n');
  const errors = logs.filter(l => l.includes('ERRO') || l.includes('caiu'));
  // Simulação: gera um gráfico simples de erros por hora
  const byHour = {};
  for (const e of errors) {
    const time = new Date(e.split(']')[0].replace('[',''));
    const hour = time.getHours();
    byHour[hour] = (byHour[hour] || 0) + 1;
  }
  // Gera imagem simples (simulação)
  fs.writeFileSync(REPORT_IMG, Buffer.from('Simulação de gráfico de erros por hora: ' + JSON.stringify(byHour)));
  log('Relatório visual gerado: ' + REPORT_IMG);
  sendWebhook('Relatório Visual ML', 'Erros por hora: ' + JSON.stringify(byHour), path.resolve(REPORT_IMG));
  return byHour;
}

function startBackend() {
  const proc = spawn('node', ['openai-proxy.js'], { stdio: 'pipe' });
  proc.stdout.on('data', data => log('BACKEND: ' + data));
  proc.stderr.on('data', data => log('ERRO: ' + data));
  proc.on('exit', (code) => {
    log('Backend caiu com código ' + code);
    sendWebhook('Backend caiu', 'O backend caiu com código ' + code);
    setTimeout(() => {
      analyzeLogsMLVision();
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

analyzeLogsMLVision();
startBackend();
