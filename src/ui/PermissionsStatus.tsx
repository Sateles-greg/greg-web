/// src/ui/PermissionsStatus.tsx

import React, { useState, useEffect } from 'react';
import styles from './PermissionsStatus.module.css'; // <-- ADICIONE ESTA LINHA

// --- Tipos e Interfaces ---
interface ApiStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down' | 'unknown' | 'connected' | 'error';
  message?: string;
  usage?: number; 
  limit?: number;
  resets?: string;
}

// --- Função de Busca de Dados Reais ---
const fetchApiStatus = async (): Promise<ApiStatus[]> => {
  try {
    // Chamada para o nosso novo endpoint no server.js
    const response = await fetch('http://localhost:3001/api/gcp-status');
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido no servidor.' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const gcpData = await response.json();

    // Mapeia a resposta do backend para o nosso tipo ApiStatus
    const gcpStatus: ApiStatus = {
      name: 'Google Vertex AI',
      status: gcpData.status === 'connected' ? 'connected' : 'error',
      message: gcpData.message || (gcpData.details ? String(gcpData.details) : 'Resposta inesperada do servidor.'),
    };

    // Retorna o status do GCP junto com outros status (podem ser simulados ou de outras fontes)
    return [
      gcpStatus,
      { name: 'OpenAI GPT-4', status: 'operational', usage: 12500, limit: 100000, resets: 'no dia 1º do mês' },
      { name: 'WebRTC Signaling', status: 'operational', usage: 2, limit: 100, resets: 'diariamente' },
    ];

  } catch (error: any) {
    console.error("Falha ao buscar status do GCP:", error);
    // Retorna um estado de erro claro na UI
    return [
      { name: 'Google Vertex AI', status: 'error', message: error.message || 'Não foi possível conectar ao servidor de backend.' },
      { name: 'OpenAI GPT-4', status: 'unknown', message: 'Status não verificado.' },
      { name: 'WebRTC Signaling', status: 'unknown', message: 'Status não verificado.' },
    ];
  }
};


// --- Componente de Estilo para a Barra de Progresso ---
const UsageBar: React.FC<{ usage?: number; limit?: number }> = ({ usage = 0, limit = 0 }) => {
  const percentage = limit > 0 ? (usage / limit) * 100 : 0;
  let barColor = 'bg-green-500'; // Classe de cor do Tailwind

  if (percentage > 90) {
    barColor = 'bg-red-700';
  } else if (percentage > 75) {
    barColor = 'bg-yellow-500';
  }

  // Define a propriedade customizada do CSS para a largura
  const barFillStyle = {
    '--usage-percentage': `${percentage}%`,
  } as React.CSSProperties;

  return (
    // Usa a classe do CSS module para o container da barra
    <div className={styles.usageBar}>
      {/* 
        Combina as classes do CSS module para o preenchimento 
        com a classe de cor dinâmica do Tailwind.
        A largura é passada via a variável de estilo.
      */}
      <div
        className={`${styles.usageBarFill} ${barColor}`}
        style={barFillStyle}
      ></div>
    </div>
  );
};
// --- Componente Principal ---
const PermissionsStatus: React.FC = () => {
  const [apiData, setApiData] = useState<ApiStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchApiStatus();
      setApiData(data);
      setLoading(false);
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIndicator = (status: ApiStatus['status']) => {
    switch (status) {
      case 'operational': return <span className="text-green-400">● Operacional</span>;
      case 'connected': return <span className="text-blue-400">● Conectado</span>;
      case 'degraded': return <span className="text-yellow-400">● Degradado</span>;
      case 'down': return <span className="text-red-500">● Fora do Ar</span>;
      case 'error': return <span className="text-red-500">✖ Erro</span>;
      default: return <span className="text-gray-500">● Desconhecido</span>;
    }
  };

  if (loading) {
    return <div className="p-4 text-white font-sans">Verificando status...</div>;
  }

  return (
    <div className="p-5 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl font-sans text-white w-80 border border-gray-700">
      <h2 className="text-lg font-bold mb-3 text-gray-100">Status das APIs</h2>
      <div className="space-y-4">
        {apiData.map((api) => (
          <div key={api.name} className="p-3 bg-gray-900 bg-opacity-60 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-200">{api.name}</h3>
              <div className="font-medium text-xs">{getStatusIndicator(api.status)}</div>
            </div>
            {api.message && <p className="text-xs text-gray-400 mb-2 truncate" title={api.message}>{api.message}</p>}
            {api.usage !== undefined && api.limit !== undefined && api.limit > 0 && (
              <>
                <div className="mb-1">
                  <UsageBar usage={api.usage} limit={api.limit} />
                </div>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>{api.usage.toLocaleString()} / {api.limit.toLocaleString()}</span>
                  {api.resets && <span>↻ {api.resets}</span>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionsStatus;
