// auto-restart.js
// Reinicia o backend automaticamente se cair ou se dependências estiverem faltando

const { execSync, spawn } = require('child_process');
const requiredPackages = ['compression', 'express-rate-limit'];
let missing = [];

for (const pkg of requiredPackages) {
  try {
    require.resolve(pkg);
  } catch (e) {
    missing.push(pkg);
  }
}

if (missing.length > 0) {
  console.log('Instalando dependências faltantes:', missing.join(', '));
  execSync(`npm install ${missing.join(' ')}`, { stdio: 'inherit' });
}

function startBackend() {
  const proc = spawn('node', ['openai-proxy.js'], { stdio: 'inherit' });
  proc.on('exit', (code) => {
    if (code !== 0) {
      console.log('Backend caiu. Reiniciando...');
      setTimeout(startBackend, 2000);
    }
  });
}

startBackend();
