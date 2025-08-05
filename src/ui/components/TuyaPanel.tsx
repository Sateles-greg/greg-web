import React, { useEffect } from 'react';
// import { listDevices, setDeviceState, TuyaDevice } from '../services/tuyaService'; // Corrigido: serviço ausente
// ...existing code...
// import { listDevices, setDeviceState, TuyaDevice } from '../services/tuyaService'; // Removido: módulo não existe
import styles from './TuyaPanel.module.css';

const TuyaPanel: React.FC = () => {
  // const [devices, setDevices] = useState<TuyaDevice[]>([]); // Removido: tipo não existe
  // const [loading, setLoading] = useState(false); // Removido: não utilizado

  useEffect(() => {
    // listDevices().then(setDevices); // Removido: função não existe
  }, []);

  // const toggleDevice = async (id: string, state: 'on' | 'off') => {
  //   setLoading(true);
  //   // await setDeviceState(id, state); // Removido: função não existe
  //   setDevices(devices => devices.map(d => d.id === id ? { ...d, state: state === 'on' } : d));
  //   setLoading(false);
  // };

  return (
    <section className={styles.tuyaPanel}>
      <h3 className={styles.tuyaTitle}>Dispositivos Tuya</h3>
      <ul className={styles.tuyaList}>
        {/* Lista de dispositivos desabilitada temporariamente */}
        {/* {devices.map(device => (
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
        ))} */}
      </ul>
    </section>
  );
};
export default TuyaPanel;
