// Serviço de integração com Tuya Smart Home (mock inicial)
export interface TuyaDevice {
  id: string;
  name: string;
  state: boolean;
}

// Simulação de dispositivos Tuya
const mockDevices: TuyaDevice[] = [
  { id: '1', name: 'Lâmpada', state: true },
  { id: '2', name: 'Tomada', state: false },
];

export function listDevices(): Promise<TuyaDevice[]> {
  return Promise.resolve(mockDevices);
}

export function setDeviceState(
  id: string,
  state: 'on' | 'off'
): Promise<boolean> {
  const device = mockDevices.find((d) => d.id === id);
  if (device) {
    device.state = state === 'on';
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
}
