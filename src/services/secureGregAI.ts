/**
 * Secure Greg AI Service - Frontend Proxy
 * Replaces direct OpenAI API access with secure backend calls
 */

interface GregAIResponse {
  result?: any;
  error?: string;
}

class SecureGregAIService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  }

  private async makeRequest(endpoint: string, data: any): Promise<GregAIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/greg/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { error: errorData.error || 'Request failed' };
      }

      const result = await response.json();
      return { result };
    } catch (error) {
      return { error: 'Network error or service unavailable' };
    }
  }

  /**
   * Analyze sentiment using secure backend endpoint
   */
  async analisarSentimento(texto: string): Promise<any> {
    if (!texto || typeof texto !== 'string') {
      throw new Error('Text is required for sentiment analysis');
    }

    const response = await this.makeRequest('analyze-sentiment', { text: texto });
    
    if (response.error) {
      throw new Error(response.error);
    }

    return response.result;
  }

  /**
   * Simulate decision using secure backend endpoint
   */
  async simularDecisao(acao: string): Promise<any> {
    if (!acao || typeof acao !== 'string') {
      throw new Error('Action is required for decision simulation');
    }

    const response = await this.makeRequest('simulate-decision', { action: acao });
    
    if (response.error) {
      throw new Error(response.error);
    }

    return response.result;
  }

  /**
   * Clinical triage using secure backend endpoint
   */
  async triagemClinicaIA(historico: string, sintomas: string): Promise<any> {
    if (!historico || !sintomas || typeof historico !== 'string' || typeof sintomas !== 'string') {
      throw new Error('History and symptoms are required for clinical triage');
    }

    const response = await this.makeRequest('clinical-triage', { 
      history: historico, 
      symptoms: sintomas 
    });
    
    if (response.error) {
      throw new Error(response.error);
    }

    return response.result;
  }

  /**
   * Analyze emotion using secure backend endpoint
   */
  async analisarEmocao(texto: string): Promise<string> {
    if (!texto || typeof texto !== 'string') {
      return 'neutro';
    }

    const response = await this.makeRequest('analyze-emotion', { text: texto });
    
    if (response.error) {
      return 'neutro'; // Fallback on error
    }

    return response.result?.emotion || 'neutro';
  }
}

// Export singleton instance
export const secureGregAI = new SecureGregAIService();

// Export individual functions for compatibility
export const analisarSentimento = (texto: string) => secureGregAI.analisarSentimento(texto);
export const simularDecisao = (acao: string) => secureGregAI.simularDecisao(acao);
export const triagemClinicaIA = (historico: string, sintomas: string) => secureGregAI.triagemClinicaIA(historico, sintomas);
export const analisarEmocao = (texto: string) => secureGregAI.analisarEmocao(texto);

export default secureGregAI;