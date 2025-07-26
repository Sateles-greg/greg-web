// Script para iniciar Vite em uma porta livre automaticamente
const fs = require('fs');
const path = require('path');
const net = require('net');
const { exec } = require('child_process');

const viteConfigPath = path.resolve(__dirname, '../vite.config.ts');
const PORT_START = 3000;
const PORT_END = 9000;

function findFreePort(start, end) {
  return new Promise((resolve) => {
    let port = start;
    function check() {
      if (port > end) return resolve(null);
      const server = net.createServer();
      server.once('error', () => {
        port++;
        check();
      });
      server.once('listening', () => {
        server.close(() => resolve(port));
      });
      server.listen(port);
    }
    check();
  });
}

async function updateViteConfig(port) {
  let config = fs.readFileSync(viteConfigPath, 'utf8');
  config = config.replace(/port:\s*\d{2,5}/, `port: ${port}`);
  fs.writeFileSync(viteConfigPath, config, 'utf8');
}

async function main() {
  const freePort = await findFreePort(PORT_START, PORT_END);
  if (!freePort) {
    console.error('Nenhuma porta livre encontrada!');
    process.exit(1);
  }
  await updateViteConfig(freePort);
  console.log(`Vite configurado para porta livre: ${freePort}`);
  exec('npm run dev', { cwd: path.resolve(__dirname, '..') }, (err, stdout, stderr) => {
    if (err) {
      console.error('Erro ao iniciar Vite:', err);
      return;
    }
    console.log(stdout);
    if (stderr) console.error(stderr);
  });
}

main();
