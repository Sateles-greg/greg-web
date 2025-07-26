// import React from 'react';

interface IntencaoSimbioticaProps {
  modo: string;
}

export default function IntencaoSimbiotica({ modo }: IntencaoSimbioticaProps) {
  switch (modo) {
    case 'Foco':
      return (
        <div>
          <h2>Checklist de Foco</h2>
          <ul>
            <li>Defina sua meta principal</li>
            <li>Inicie o timer de concentração</li>
            <li>Marque tarefas concluídas</li>
          </ul>
        </div>
      );
    case 'Zen':
      return (
        <div>
          <h2>Mantra Zen</h2>
          <p>Respire fundo. Sinta o momento presente.</p>
        </div>
      );
    case 'Expansao':
      return (
        <div>
          <h2>Provocação Criativa</h2>
          <p>E se você reinventasse sua rotina hoje?</p>
        </div>
      );
    case 'Reparo':
      return (
        <div>
          <h2>Modo Reparo</h2>
          <p>Descanse. Cuide de você. O Greg está aqui para te apoiar.</p>
        </div>
      );
    default:
      return <div>Intenção não reconhecida.</div>;
  }
}
