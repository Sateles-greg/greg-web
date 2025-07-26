// auto-monitor-ml-dashboard-cloud.js
// Dashboard web multi-projeto com integração cloud: exporta dados para Google Sheets e BI

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const express = require('express');
const { google } = require('googleapis');
const app = express();
const PORT = 4003;

const PROJECTS = [
  { name: 'Greg', log: 'backend-monitor.log' },
  // Adicione outros projetos aqui
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

app.get('/api/export', async (req, res) => {
  // Simulação: exporta dados para Google Sheets
  // Configure credenciais e ID da planilha
  const auth = new google.auth.GoogleAuth({
    keyFile: 'google-credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  const sheets = google.sheets({ version: 'v4', auth });
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
  // Exemplo de exportação
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: 'SEU_ID_PLANILHA',
      range: 'A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: allStats.map(p => [p.name, JSON.stringify(p.stats)])
      }
    });
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Dashboard Cloud Backend Monitor</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <h1>Monitoramento Cloud Multi-Projeto</h1>
        <button onclick="fetch('/api/export').then(r=>r.json()).then(a=>alert(a.ok?'Exportado!':a.error))">Exportar para Google Sheets</button>
        <div id="charts"></div>
        <div id="logs"></div>
        <script>
          async function fetchStats() {
            const res = await fetch('/api/stats');
            const stats = await res.json();
            let html = '';
            for (const p of stats) {
              html += '<h2>' + p.name + '</h2><canvas id="chart_' + encodeURIComponent(p.name) + '" width="600" height="200"></canvas>';
            }
            document.getElementById('charts').innerHTML = html;
            for (const p of stats) {
              const ctx = document.getElementById('chart_' + encodeURIComponent(p.name)).getContext('2d');
              const data = {
                labels: Object.keys(p.stats),
                datasets: [{ label: 'Erros por hora', data: Object.values(p.stats), backgroundColor: 'rgba(54,162,235,0.2)', borderColor: 'rgba(54,162,235,1)', borderWidth: 1 }]
              };
              if (window['chart_' + p.name]) window['chart_' + p.name].destroy();
              window['chart_' + p.name] = new Chart(ctx, { type: 'bar', data });
            }
          }
          async function fetchLogs() {
            const res = await fetch('/api/logs');
            const logs = await res.json();
            let html = '';
            for (const p of logs) {
              html += '<h2>' + p.name + '</h2><pre>' + p.logs.join('\n') + '</pre>';
            }
            document.getElementById('logs').innerHTML = html;
          }
          setInterval(fetchStats, 5000);
          setInterval(fetchLogs, 2000);
          fetchStats();
          fetchLogs();
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Dashboard cloud rodando em http://localhost:${PORT}`);
});
