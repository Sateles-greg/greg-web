import type { SymbiosisMode } from '../ui/contexts/SymbiosisContext';
// sensoresSimbioticos.ts
// Funções utilitárias para sensores simbióticos

// A propriedade bluetooth já está declarada globalmente em navigator-bluetooth.d.ts

export async function detectarTomDeVoz(
  callback: (novoModo: SymbiosisMode) => void
) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const analyser = context.createAnalyser();
  analyser.fftSize = 256;

  const buffer = new Uint8Array(analyser.frequencyBinCount);
  source.connect(analyser);

  function analisarVolume() {
    analyser.getByteFrequencyData(buffer);
    const volume = buffer.reduce((a, b) => a + b, 0) / buffer.length;

    if (volume > 100) callback('expansao');
    else if (volume > 60) callback('foco');
    else callback('zen');

    setTimeout(analisarVolume, 3000);
  }

  analisarVolume();
}

export async function conectarComWearable(
  callback: (novoModo: SymbiosisMode) => void
) {
  try {
    const device = await (navigator as any).bluetooth.requestDevice({
      filters: [{ services: ['heart_rate'] }],
    });

    const server = await device.gatt?.connect();
    const service = await server?.getPrimaryService('heart_rate');
    const characteristic = await service?.getCharacteristic(
      'heart_rate_measurement'
    );

    await characteristic?.startNotifications();
    characteristic?.addEventListener(
      'characteristicvaluechanged',
      (event: any) => {
        const value = event.target.value;
        const bpm = value.getUint8(1);

        if (bpm > 100) callback('guardiao');
        else if (bpm < 60) callback('sombra');
        else callback('reparo');
      }
    );
  } catch (error) {
    console.warn('Wearable não conectado:', error);
  }
}
