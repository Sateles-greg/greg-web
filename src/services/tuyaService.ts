// Serviço de integração com Tuya Smart Home (mock inicial)
export interface TuyaDevice {
  id: string;
  name: string;
  type: string;
  state: 'on' | 'off';
}

// Simulação de dispositivos Tuya
const mockDevices: TuyaDevice[] = [
  { id: '1', name: 'Luz Sala', type: 'light', state: 'off' },
  { id: '2', name: 'Ar Condicionado', type: 'ac', state: 'off' },
];

export function listDevices(): Promise<TuyaDevice[]> {
  return Promise.resolve(mockDevices);
}

export function setDeviceState(id: string, state: 'on' | 'off'): Promise<boolean> {
  const device = mockDevices.find(d => d.id === id);
  if (device) {
    device.state = state;
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
}
