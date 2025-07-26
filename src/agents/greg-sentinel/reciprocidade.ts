import * as fs from 'fs';
// Resposta a ataques e reversão de fluxos agressivos
export function resposta_ataques(analise: any) {
  fs.appendFileSync('public/logs/reciprocidade.log', `[${new Date().toISOString()}] Resposta a ameaça: ${JSON.stringify(analise)}\n`);
}
