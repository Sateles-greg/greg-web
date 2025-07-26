// integration-test.js
// Testes automatizados dos principais endpoints do backend

const { execSync } = require('child_process');
const endpoints = [
  'http://localhost:3001/api/sincronizarModo',
  'http://localhost:3001/api/greg',
  'http://localhost:3001/api/sincronizarModo',
];

for (const url of endpoints) {
  try {
    const result = execSync(`curl -i ${url}`, { encoding: 'utf8' });
    if (result.includes('200 OK')) {
      console.log(`Endpoint ${url} OK.`);
    } else {
      console.log(`Endpoint ${url} respondeu, mas não está OK.`);
    }
  } catch (e) {
    console.log(`Falha ao acessar ${url}:`, e.message);
  }
}
