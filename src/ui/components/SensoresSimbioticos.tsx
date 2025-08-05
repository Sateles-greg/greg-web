import { useEffect, useRef } from 'react';
import './SensoresSimbioticos.module.css';
import { detectarTomDeVoz, conectarComWearable } from '../../sensores/sensoresSimbioticos';
import { iniciarDeteccaoFacial } from '../../sensores/expressaoFacial';
import { useSymbiosis } from '../contexts';

export default function SensoresSimbioticos() {
  const { setMode } = useSymbiosis();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    detectarTomDeVoz(setMode);
    conectarComWearable(setMode);
    if (videoRef.current) {
      iniciarDeteccaoFacial(videoRef.current, setMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sensoresSimbioticosContainer">
      <h4>Sensores Simbióticos</h4>
      <video ref={videoRef} id="webcam" width={180} height={120} className="sensoresSimbioticosVideo" />
      <div className="sensoresSimbioticosInfo">
        Microfone, Wearable e Expressão Facial ativos<br/>
        (O modo pode mudar automaticamente conforme seu tom de voz, batimentos ou expressão)
      </div>
    </div>
  );
}
