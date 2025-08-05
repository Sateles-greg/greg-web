import { useContext } from 'react';

// ...existing code...
import './SymbioticAura.css';
import { SymbiosisContext } from '../contexts';

interface SymbioticAuraProps {
  mode: string;
  emotion: string;
}

// Suporte a modos customizados: busca cor do modo no contexto

const SymbioticAura = ({ mode, emotion }: SymbioticAuraProps) => {
  const ctx = useContext(SymbiosisContext);
  let auraClass = 'aura-default';
  let dataAuraColor = undefined;
  let dataAuraColor2 = undefined;
  let dataAuraBg = undefined;
  if (ctx && ctx.modos) {
    const modoObj = ctx.modos.find((m) => m.nome.toLowerCase() === mode.toLowerCase());
    if (modoObj) {
      auraClass = `aura-custom aura-custom-${mode.toLowerCase()}`;
      // dataAuraColor = modoObj.cor; // Propriedade 'cor' pode não existir
      // dataAuraColor2 = modoObj.cor + '33'; // Propriedade 'cor' pode não existir
      dataAuraBg = '#fff';
    } else {
      // fallback para classes antigas
      const legacy: Record<string, string> = {
        zen: 'aura-zen', estrategia: 'aura-foco', expansao: 'aura-expansao', criativo: 'aura-criativo', emocional: 'aura-emocional', noturno: 'aura-noturno', reparo: 'aura-reparo', sombra: 'aura-sombra', guardiao: 'aura-guardiao',
      };
      auraClass = legacy[mode] || 'aura-default';
    }
  }
  return (
    <div
      className={`symbiotic-aura ${auraClass} emotion-${emotion}`}
      data-auracolor={dataAuraColor}
      data-auracolor2={dataAuraColor2}
      data-aurabg={dataAuraBg}
    />
  );
};

export default SymbioticAura;
