// full-automation.js
// Orquestra todos os scripts de automação do projeto

const { execSync, spawn } = require('child_process');

console.log('Iniciando automação completa do sistema...');

try {
  execSync('node update-deps.js', { stdio: 'inherit' });
  execSync('node health-check.js', { stdio: 'inherit' });
  execSync('node integration-test.js', { stdio: 'inherit' });
  spawn('node', ['auto-monitor.js'], { stdio: 'inherit' });
  spawn('node', ['../frontend-monitor.js'], { stdio: 'inherit' });
  console.log('Automação total iniciada!');
} catch (e) {
  console.error('Erro na automação:', e.message);
}
