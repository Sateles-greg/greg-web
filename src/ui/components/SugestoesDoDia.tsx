import React from 'react';


export default function SugestoesDoDia() {
  // Exemplo de sugestões do dia
  const sugestoes = [
    'Meditação matinal',
    'Caminhada pós-almoço',
    'Revisão de metas',
  ];
  return (
    <div>
      <h3>Sugestões do Dia</h3>
      <ul>
        {sugestoes.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}
