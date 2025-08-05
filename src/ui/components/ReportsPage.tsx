import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import './ReportsPage.css';

interface UsageData {
  mode: string;
  usageCount: number;
}

const ReportsPage = () => {
  const [usageData, setUsageData] = useState<UsageData[]>([]);

  useEffect(() => {
    fetch('/api/analytics/usage')
      .then((response) => response.json())
      .then((data) => setUsageData(data.data));
  }, []);

  const barChartData = {
    labels: usageData.map((item) => item.mode),
    datasets: [
      {
        label: 'Uso por Modo',
        data: usageData.map((item) => item.usageCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineChartData = {
    labels: usageData.map((item) => item.mode),
    datasets: [
      {
        label: 'Tendência de Uso',
        data: usageData.map((item) => item.usageCount),
        borderColor: 'rgba(153, 102, 255, 0.6)',
        fill: false,
      },
    ],
  };

  return (
    <div className="reports-page">
      <h1>Relatórios de Uso</h1>
      <div className="chart-container">
        <Bar data={barChartData} />
        <Line data={lineChartData} />
      </div>
    </div>
  );
};

export default ReportsPage;
