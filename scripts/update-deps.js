// update-deps.js
// Atualiza automaticamente todas as dependências do projeto

const { execSync } = require('child_process');
console.log('Atualizando dependências do projeto...');
execSync('npm update', { stdio: 'inherit' });
console.log('Dependências atualizadas!');
