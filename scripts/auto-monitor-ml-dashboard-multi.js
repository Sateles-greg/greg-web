// @ts-nocheck
// auto-monitor-ml-dashboard-multi.js
// Dashboard multi-projeto: monitora múltiplos backends, integra logs e gráficos em tempo real

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 4002;

const PROJECTS = [
  { name: 'Greg', log: 'backend-monitor.log' },
  // Adicione outros projetos aqui
  // { name: 'OutroProjeto', log: '../outro-projeto/backend-monitor.log' }
];

app.use(express.static(__dirname));

app.get('/api/logs', (req, res) => {
  const allLogs = PROJECTS.map(p => {
    if (!fs.existsSync(p.log)) return { name: p.name, logs: [] };
    const logs = fs.readFileSync(p.log, 'utf8').split('\n').filter(Boolean);
    return { name: p.name, logs };
  });
  res.json(allLogs);
});

app.get('/api/errors', (req, res) => {
  const allErrors = PROJECTS.map(p => {
    if (!fs.existsSync(p.log)) return { name: p.name, errors: [] };
    const logs = fs.readFileSync(p.log, 'utf8').split('\n').filter(l => l.includes('ERRO') || l.includes('caiu'));
    return { name: p.name, errors: logs };
  });
  res.json(allErrors);
});

app.get('/api/stats', (req, res) => {
  const allStats = PROJECTS.map(p => {
    if (!fs.existsSync(p.log)) return { name: p.name, stats: {} };
    const logs = fs.readFileSync(p.log, 'utf8').split('\n').filter(Boolean);
    const errors = logs.filter(l => l.includes('ERRO') || l.includes('caiu'));
    const byHour = {};
    for (const e of errors) {
      const time = new Date(e.split(']')[0].replace('[',''));
      const hour = time.getHours();
      byHour[hour] = (byHour[hour] || 0) + 1;
    }
    return { name: p.name, stats: byHour };
  });
  res.json(allStats);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

app.listen(PORT, () => {
  console.log(`Dashboard multi-projeto rodando em http://localhost:${PORT}`);
});
