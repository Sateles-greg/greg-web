const fs = require('fs');
const path = require('path');
const { orquestrarGreg } = require('../greg-orchestrator/js/index.js');

function backupFile(file) {
  const backupDir = path.join(path.dirname(file), 'backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
  const base = path.basename(file);
  const backupPath = path.join(backupDir, base + '.' + Date.now() + '.bak');
  fs.copyFileSync(file, backupPath);
  return backupPath;
}

function desenvolver_greg_simbiotico() {
  // Diagnóstico
  const estado = orquestrarGreg();
  // Backup robusto de todo projeto
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 15);
  const backupDir = `backup_greg_${timestamp}`;
  fs.mkdirSync(backupDir, { recursive: true });
  // Copia arquivos principais e logs
  const arquivos = [
    'src/greg-orchestrator/index.ts',
    'src/greg-orchestrator/analisarEstado.ts',
    'src/greg-orchestrator/ativarModulos.ts',
    'src/greg-orchestrator/verificarMemoria.ts',
    'src/greg-orchestrator/integrarDrive.ts',
    'src/autoexec/nightMaintenance.ts',
    'public/logs/cli.log'
  ];
  const backups = arquivos.map(file => {
    const dest = `${backupDir}/${file.replace(/\//g, '_')}`;
    fs.copyFileSync(file, dest);
    return dest;
  });
  // Log simbiótico centralizado
  fs.appendFileSync('public/logs/cli.log', `[${new Date().toISOString()}] Execução CLI: ${JSON.stringify(estado)}\nBackup: ${backupDir}\n`);
  return {
    estado,
    backups,
    log: 'public/logs/cli.log',
    backupDir
  };
}

if (require.main === module) {
  try {
    const resultado = desenvolver_greg_simbiotico();
    console.log('Execução concluída:', resultado);
  } catch (err) {
    const msg = `[${new Date().toISOString()}] Erro CLI: ${err && err.stack ? err.stack : err}\n`;
    fs.appendFileSync('public/logs/cli.log', msg);
    console.error('Erro na execução do CLI:', err);
  }
}
