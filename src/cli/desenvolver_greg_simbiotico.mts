import fs from 'fs';

import { orquestrarGreg } from '../agents/greg-orchestrator';



export function desenvolver_greg_simbiotico() {
  // Diagnóstico
  const estado = orquestrarGreg();
  // Backup robusto de todo projeto
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 15);
  const backupDir = `backup_greg_${timestamp}`;
  fs.mkdirSync(backupDir, { recursive: true });
  // Copia arquivos principais e logs
  const arquivos = [
    'src/agents/greg-orchestrator/index.ts',
    'src/agents/greg-orchestrator/analisarEstado.ts',
    'src/agents/greg-orchestrator/ativarModulos.ts',
    'src/agents/greg-orchestrator/verificarMemoria.ts',
    'src/agents/greg-orchestrator/integrarDrive.ts',
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

// Execução direta como script ES module com tratamento de erro
if (import.meta.url === `file://${process.argv[1]}` || import.meta.url === `file:///${process.argv[1]}`) {
  try {
    const resultado = desenvolver_greg_simbiotico();
    console.log('Execução concluída:', resultado);
  } catch (err) {
    const msg = `[${new Date().toISOString()}] Erro CLI: ${err}\n`;
    fs.appendFileSync('public/logs/cli.log', msg);
    console.error('Erro na execução do CLI:', err);
  }
}
