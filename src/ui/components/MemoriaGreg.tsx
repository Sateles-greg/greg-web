// ...existing code...
import { useState } from 'react';

export default function MemoriaGreg() {
  const [memorias, setMemorias] = useState<string[]>([]);
  const [novaMemoria, setNovaMemoria] = useState('');

  function registrar() {
    if (novaMemoria.trim()) {
      setMemorias([...memorias, novaMemoria]);
      setNovaMemoria('');
    }
  }

  return (
    <div>
      <h3>Memória Interativa</h3>
      <input value={novaMemoria} onChange={e => setNovaMemoria(e.target.value)} placeholder="Descreva uma memória..." />
      <button onClick={registrar}>Registrar</button>
      <ul>
        {memorias.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    </div>
  );
}
