import * as fs from 'fs';
// Log de atividades sensíveis
export function log_de_atividades_sensiveis(atividade: any) {
  const logPath = 'public/logs/atividades_sensiveis.log';
  fs.appendFileSync(logPath, JSON.stringify(atividade) + '\n');
  // Simulação: enviar para Google Drive
  // TODO: integrar upload real
}
