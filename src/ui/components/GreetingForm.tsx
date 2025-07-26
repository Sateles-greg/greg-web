import React, { useState } from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';

const GreetingForm: React.FC = () => {
  const [name, setName] = useState('');
  const { greet, loading } = useSymbiosis();
  return (
    <form onSubmit={e => { e.preventDefault(); greet(name); }}>
      <input
        type="text"
        placeholder="Seu nome..."
        value={name}
        onChange={e => setName(e.target.value)}
        onFocus={() => setName('')}
        aria-label="Nome do usuário"
      />
      <button type="submit" disabled={loading} className={loading ? 'pulse' : ''}>
        {loading ? 'Pensando...' : 'Saudar'}
      </button>
    </form>
  );
};
export default GreetingForm;
