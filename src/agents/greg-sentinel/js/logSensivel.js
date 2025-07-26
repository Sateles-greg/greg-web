"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log_de_atividades_sensiveis = log_de_atividades_sensiveis;
// Log de atividades sensíveis
function log_de_atividades_sensiveis(atividade) {
    var fs = require('fs');
    var logPath = 'public/logs/atividades_sensiveis.log';
    fs.appendFileSync(logPath, JSON.stringify(atividade) + '\n');
    // Simulação: enviar para Google Drive
    // TODO: integrar upload real
}
