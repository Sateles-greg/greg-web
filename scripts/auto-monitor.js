// auto-monitor.js
// Monitoramento avançado do backend com notificações e logs

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const nodemailer = require('nodemailer');

const LOG_FILE = 'backend-monitor.log';
const ADMIN_EMAIL = 'seu-email@dominio.com'; // personalize aqui

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOG_FILE, line);
  console.log(msg);
}

function sendEmail(subject, text) {
  // Configure o transporter com seu serviço de e-mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'seu-email@dominio.com', pass: 'sua-senha' }
  });
  transporter.sendMail({ from: ADMIN_EMAIL, to: ADMIN_EMAIL, subject, text }, (err, info) => {
    if (err) log('Erro ao enviar e-mail: ' + err);
    else log('Notificação enviada: ' + info.response);
  });
}

function startBackend() {
  const proc = spawn('node', ['openai-proxy.js'], { stdio: 'pipe' });
  proc.stdout.on('data', data => log('BACKEND: ' + data));
  proc.stderr.on('data', data => log('ERRO: ' + data));
  proc.on('exit', (code) => {
    log('Backend caiu com código ' + code);
    sendEmail('Backend caiu', 'O backend caiu com código ' + code);
    setTimeout(startBackend, 2000);
  });
}

try {
  execSync('node health-check.js', { stdio: 'inherit' });
  log('Health-check executado com sucesso.');
} catch (e) {
  log('Health-check falhou: ' + e.message);
  sendEmail('Health-check falhou', e.message);
}

startBackend();
