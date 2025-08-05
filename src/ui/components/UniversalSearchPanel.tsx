import { useState, FormEvent } from 'react';
// ...existing code...
import styles from './UniversalSearchPanel.module.css';

const UniversalSearchPanel = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    // Exemplo: busca na Wikipedia
    try {
      const res = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      const data = await res.json();
      setResult(data.extract || 'Nenhum resultado encontrado.');
    } catch {
      setResult('Erro ao buscar na rede universal.');
    }
    setLoading(false);
  }

  return (
    <section className={styles.universalSection}>
      <h2 className={styles.universalTitle}>Busca Universal</h2>
      <form onSubmit={handleSearch} className={styles.universalForm}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Pesquisar na rede universal..." className={styles.universalInput} />
        <button type="submit" className={styles.universalButton}>Buscar</button>
      </form>
      {loading && <div className={styles.universalLoading}>Buscando...</div>}
      {result && <div className={styles.universalResult}>{result}</div>}
    </section>
  );
};
export default UniversalSearchPanel;
