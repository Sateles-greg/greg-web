// ...existing code...
import styles from './CommandHistory.module.css';

export interface CommandHistoryItem {
  text: string;
  timestamp: number;
  type: 'user' | 'greg';
}

interface CommandHistoryProps {
  history: CommandHistoryItem[];
}

const CommandHistory: React.FC<CommandHistoryProps> = ({ history }) => {
  return (
    <aside className={styles.historyPanel} aria-label="Histórico de comandos">
      <h3 className={styles.historyTitle}>Histórico</h3>
      <ul className={styles.historyList}>
        {history.slice(-10).reverse().map((item, idx) => (
          <li key={idx} className={item.type === 'user' ? styles.user : styles.greg}>
            <span className={styles.time}>{new Date(item.timestamp).toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'})}</span>
            <span className={styles.text}>{item.text}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default CommandHistory;
