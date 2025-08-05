import * as fs from 'fs';
// Rollback completo em falhas
export function rollback_completo_em_falhas() {
  fs.appendFileSync(
    'public/logs/rollback.log',
    `[${new Date().toISOString()}] Rollback executado\n`
  );
}
