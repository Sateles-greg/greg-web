// ...existing code...
import './ModePanel.css';

interface ModePanelProps {
  mode: string;
}

const modeContent: Record<string, { title: string; description: string }> = {
  foco: {
    title: 'Modo Foco',
    description: 'Greg está em modo de concentração máxima, pronto para executar tarefas complexas e auxiliar em decisões importantes.'
  },
  expansao: {
    title: 'Modo Expansão',
    description: 'Greg está explorando novas possibilidades, aprendendo e se adaptando ao ambiente e ao usuário.'
  },
  reparo: {
    title: 'Modo Descanso/Reparo',
    description: 'Greg está em repouso, otimizando recursos e realizando manutenções internas.'
  },
  sombra: {
    title: 'Modo Hacker/Sombra',
    description: 'Greg está operando em modo avançado de segurança, monitorando ameaças e protegendo o sistema.'
  },
  guardiao: {
    title: 'Modo Guardião',
    description: 'Greg está em modo de proteção ativa, garantindo a integridade e privacidade do usuário.'
  }
};

const ModePanel: React.FC<ModePanelProps> = ({ mode }) => {
  const content = modeContent[mode] || { title: 'Modo Desconhecido', description: 'Modo não reconhecido.' };
  return (
    <div className={`mode-panel mode-panel--${mode}`}>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </div>
  );
};

export default ModePanel;
