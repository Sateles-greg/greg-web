// Placeholder para integração com sensores reais ou simulados
export interface SensorData {
  heartRate?: number;
  attention?: number;
  soundLevel?: number;
}

export function getSimulatedSensorData(): SensorData {
  // Simula dados aleatórios para testes
  return {
    heartRate: 60 + Math.round(Math.random() * 40),
    attention: Math.round(Math.random() * 100),
    soundLevel: Math.round(Math.random() * 80)
  };
}
