// ...existing code...


export default function LinhaDoTempo() {
  // Exemplo estático
  const eventos = [
    { data: '2025-07-25', descricao: 'Início da autoavaliação' },
    { data: '2025-07-26', descricao: 'Primeira rotina sugerida' },
    { data: '2025-07-27', descricao: 'Feedback simbiótico recebido' },
  ];

  return (
    <div>
      <h3>Linha do Tempo</h3>
      <ul>
        {eventos.map((ev, i) => <li key={i}>{ev.data}: {ev.descricao}</li>)}
      </ul>
    </div>
  );
}
