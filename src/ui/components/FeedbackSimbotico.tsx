import React from 'react';
import { useState } from 'react';

export default function FeedbackSimbotico() {
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [novoFeedback, setNovoFeedback] = useState('');

  function registrar() {
    if (novoFeedback.trim()) {
      setFeedbacks([...feedbacks, novoFeedback]);
      setNovoFeedback('');
    }
  }

  return (
    <div>
      <h3>Feedback Simbiótico</h3>
      <input value={novoFeedback} onChange={e => setNovoFeedback(e.target.value)} placeholder="Deixe seu feedback..." />
      <button onClick={registrar}>Registrar</button>
      <ul>
        {feedbacks.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
    </div>
  );
}
