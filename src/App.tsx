import ColaborativoPanel from './components/ColaborativoPanel';

import DiarioVisual from './components/DiarioVisual';
import EticaPainel from './components/EticaPainel';
import IoTPanel from './components/IoTPanel';
import Marketplace from './components/Marketplace';
import NanoControlPanel from './components/NanoControlPanel';
import NeuralInterfacePanel from './components/NeuralInterfacePanel';
import UniversalSearchPanel from './components/UniversalSearchPanel';
import EphemeralInterfacesPanel from './components/EphemeralInterfacesPanel';

import React, { useEffect } from 'react';
import { SymbiosisProvider, useSymbiosis } from './contexts/SymbiosisContext';
import Avatar from './components/Avatar';
import PainelConsciencia from './components/PainelConsciencia';
import HistoricoEmocional from './components/HistoricoEmocional';
import SugestoesProativas from './components/SugestoesProativas';
import MemoriaSimbiotica from './components/MemoriaSimbiotica';
import AdminPanel from './components/AdminPanel';
import VoiceInput from './components/VoiceInput';
import CommandHistory from './components/CommandHistory';
import TuyaPanel from './components/TuyaPanel';
import BiomedStatusPanel from './components/BiomedStatusPanel';
import PrivacyPanel from './components/PrivacyPanel';
import GreetingForm from './components/GreetingForm';
import ResponseBox from './components/ResponseBox';
import SimbioHeader from './components/SimbioHeader';
import './themes/symbiosis.css';

import BiomedPanel from './components/BiomedPanel';

const Main: React.FC = () => {
  const { mode, commandHistory } = useSymbiosis();
  useEffect(() => {
    document.body.setAttribute('data-mode', mode);
  }, [mode]);
  return (
    <>
      <main className="container">
        <h1>Greg: Simbiose Viva</h1>
        <SimbioHeader />
        <Avatar />
        <BiomedPanel />
        <GreetingForm />
        <VoiceInput />
        <CommandHistory history={commandHistory} />
        <ResponseBox />
        <TuyaPanel />
        <BiomedStatusPanel />
        <PrivacyPanel />
        <PainelConsciencia />
        <HistoricoEmocional />
        <SugestoesProativas />
        <MemoriaSimbiotica />
        <Marketplace />
        <UniversalSearchPanel />
        <DiarioVisual />
        <EticaPainel />
        <IoTPanel />
        <ColaborativoPanel />
        <NanoControlPanel />
        <NeuralInterfacePanel />
        <EphemeralInterfacesPanel />
      </main>
      <AdminPanel />
    </>
  );
};

const App: React.FC = () => (
  <SymbiosisProvider>
    <Main />
  </SymbiosisProvider>
);

export default App;
