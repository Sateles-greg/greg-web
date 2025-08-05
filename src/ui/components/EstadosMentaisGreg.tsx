// ...existing code...
import { useState } from 'react';

const modos = [
  'foco',
  'expansao',
  'guardiao',
  'reparo',
  'sombra',
  'zen',
];

export default function EstadosMentaisGreg() {
  const [modoAtual, setModoAtual] = useState(modos[0]);

  return (
    <div>
      <h3>Estados Mentais do Greg</h3>
      <select title="Selecionar estado mental" value={modoAtual} onChange={e => setModoAtual(e.target.value)}>
        {modos.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <p>Modo ativo: <b>{modoAtual}</b></p>
      {/* Aqui pode ser integrado com TTS, avatar e layout dinâmico */}
    </div>
  );
}
