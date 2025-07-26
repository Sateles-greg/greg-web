// health-check.js
// Script para verificar dependências e status do backend automaticamente

const { execSync } = require('child_process');
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

console.log('Testando endpoint /api/sincronizarModo...');
try {
  const result = execSync('curl -i http://localhost:3001/api/sincronizarModo', { encoding: 'utf8' });
  if (result.includes('200 OK')) {
    console.log('Backend está rodando e respondendo corretamente.');
  } else {
    console.log('Backend não está respondendo corretamente.');
  }
} catch (e) {
  console.log('Backend não está rodando ou não responde. Tente rodar "npm run dev" na pasta server.');
}
