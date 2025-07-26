import React, { useEffect, useState } from 'react';
import { listDevices, setDeviceState, TuyaDevice } from '../services/tuyaService';
import styles from './TuyaPanel.module.css';

const TuyaPanel: React.FC = () => {
  const [devices, setDevices] = useState<TuyaDevice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listDevices().then(setDevices);
  }, []);

  const toggleDevice = async (id: string, state: 'on' | 'off') => {
    setLoading(true);
    await setDeviceState(id, state);
    setDevices(devices => devices.map(d => d.id === id ? { ...d, state } : d));
    setLoading(false);
  };

  return (
    <section className={styles.tuyaPanel}>
      <h3 className={styles.tuyaTitle}>Dispositivos Tuya</h3>
      <ul className={styles.tuyaList}>
        {devices.map(device => (
          <li key={device.id} className={styles.tuyaItem}>
            <span>{device.name}</span>
            <button
              onClick={() => toggleDevice(device.id, device.state === 'on' ? 'off' : 'on')}
              disabled={loading}
              className={[
                styles.tuyaButton,
                device.state === 'on' ? styles.on : ''
              ].join(' ')}
            >
              {device.state === 'on' ? 'Desligar' : 'Ligar'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default TuyaPanel;
