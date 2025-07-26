// frontend-monitor.js
// Monitoramento do frontend e reinício automático

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const LOG_FILE = 'frontend-monitor.log';

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOG_FILE, line);
  console.log(msg);
}

function startFrontend() {
  const proc = spawn('npm', ['run', 'dev'], { stdio: 'pipe' });
  proc.stdout.on('data', data => log('FRONTEND: ' + data));
  proc.stderr.on('data', data => log('ERRO: ' + data));
  proc.on('exit', (code) => {
    log('Frontend caiu com código ' + code);
    setTimeout(startFrontend, 2000);
  });
}

try {
  execSync('npm install', { stdio: 'inherit' });
  log('Dependências do frontend atualizadas.');
} catch (e) {
  log('Falha ao atualizar dependências do frontend: ' + e.message);
}

startFrontend();
