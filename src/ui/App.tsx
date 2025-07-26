import AutoModoEmotionHandler from './components/AutoModoEmotionHandler';
import GregDiagnosticsPanel from './components/GregDiagnosticsPanel';
import SymbioticBackground from './components/SymbioticBackground';
import SimbioticParticles from './components/SimbioticParticles';
import React, { useEffect } from 'react';
import { SymbiosisProvider, useSymbiosis } from './contexts/SymbiosisContext';
import DashboardCentral from './components/DashboardCentral';
import './themes/symbiosis.css';
import SymbioticAvatar from './components/SymbioticAvatar';
import AuraSimbiotica from './components/AuraSimbiotica';
import './components/AvatarAuraWrapper.module.css';
import AudioAmbienteSimbiotico from './components/AudioAmbienteSimbiotico';

const Main: React.FC = () => {
  const { mode } = useSymbiosis();
  useEffect(() => {
    document.body.setAttribute('data-mode', mode);
  }, [mode]);
  return (
    <>
      <SymbioticBackground />
      <SimbioticParticles modo={mode} />
      <div className="avatarAuraWrapper">
        <AuraSimbiotica modo={mode} />
        <SymbioticAvatar mode={mode} />
      </div>
      <AudioAmbienteSimbiotico modo={mode} />
      <AutoModoEmotionHandler />
    </>
  );
};


const App: React.FC = () => (
  <>
    <SymbiosisProvider>
      <Main />
    </SymbiosisProvider>
    <DashboardCentral />
    <GregDiagnosticsPanel />
  </>
);

export default App;
