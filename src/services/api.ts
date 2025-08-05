// src/services/api.ts

const API_BASE_URL = 'http://localhost:3001/api/greg'; // Assumindo que o backend roda na porta 3001

/**
 * Representa o estado completo do Greg, conforme recebido do backend.
 */
export interface GregState {
  mode: string;
  status: string;
  usageMetrics: {
    totalRequests: number;
    lastAnalysis: string;
  };
}

/**
 * Busca o estado atual do Greg no backend.
 * @returns Uma promessa que resolve para o estado atual do Greg.
 */
export const getGregState = async (): Promise<GregState> => {
  try {
    const response = await fetch(`${API_BASE_URL}/status`);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Falha ao buscar o estado do Greg:', error);
    // Em caso de falha, retornamos um estado padrão para não quebrar a UI
    return {
      mode: 'offline',
      status: 'Backend indisponível',
      usageMetrics: {
        totalRequests: 0,
        lastAnalysis: '',
      },
    };
  }
};

/**
 * Define um novo modo para o Greg.
 * @param mode O novo modo a ser definido.
 * @returns Uma promessa que resolve para o novo estado do Greg após a atualização.
 */
export const setGregMode = async (mode: string): Promise<GregState> => {
  try {
    const response = await fetch(`${API_BASE_URL}/mode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mode }),
    });
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Falha ao definir o modo do Greg:', error);
    // Retorna um estado de erro
    return {
      mode: 'offline',
      status: 'Falha ao atualizar modo',
      usageMetrics: {
        totalRequests: 0,
        lastAnalysis: '',
      },
    };
  }
};
