//
import './AuraSimbiotica.module.css';

interface AuraSimbioticaProps {
  modo: string;
}

export default function AuraSimbiotica({ modo }: AuraSimbioticaProps) {
  let auraClass = 'auraSimbiotica';
  switch (modo.toLowerCase()) {
    case 'zen':
      auraClass += ' auraZen';
      break;
    case 'foco':
      auraClass += ' auraFoco';
      break;
    case 'expansao':
      auraClass += ' auraExpansao';
      break;
    default:
      break;
  }
  return <div className={auraClass}></div>;
}
