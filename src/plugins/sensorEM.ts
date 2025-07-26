// Plugin: sensorEM - Percepção de espectro eletromagnético
import { SymbiosisMode } from '../contexts/SymbiosisContext';

export default function sensorEM(context: any) {
  // Simula leitura de espectro EM
  context.addMemory('[EM] Detecção: Sinal Wi-Fi forte, micro-ondas fracas, sem radiação ionizante detectada.');
  if (context.mode === 'foco') {
    context.setEmotion('alerta');
  }
}
