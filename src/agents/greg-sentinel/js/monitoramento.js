"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitoramento_de_eventos = monitoramento_de_eventos;
var fs_1 = require("fs");
var path_1 = require("path");
var analiseAmeacas_1 = require("./analiseAmeacas");
var hardening_1 = require("./hardening");
var logSensivel_1 = require("./logSensivel");
var rollback_1 = require("./rollback");
var reciprocidade_1 = require("./reciprocidade");
// Monitoramento de eventos simbióticos
function monitoramento_de_eventos(evento) {
    // Coleta e análise de eventos
    var analise = (0, analiseAmeacas_1.analise_de_ameacas)(evento);
    var hardening = (0, hardening_1.auto_hardening_simbiotico)(evento);
    (0, logSensivel_1.log_de_atividades_sensiveis)({ evento: evento, analise: analise, hardening: hardening });
    // Resposta reativa
    if (analise && analise.ameaca_detectada) {
        (0, reciprocidade_1.resposta_ataques)(analise);
        (0, rollback_1.rollback_completo_em_falhas)();
    }
    // Relatório automático
    var relatorio = {
        evento: evento,
        analise: analise,
        hardening: hardening,
        timestamp: new Date().toISOString()
    };
    var logPath = path_1.default.join('public', 'logs', 'monitoramento.log');
    fs_1.default.appendFileSync(logPath, JSON.stringify(relatorio) + '\n');
    return relatorio;
}
