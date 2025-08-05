import styles from './AvatarSimbotico.module.css';

export default function AvatarSimbotico() {
  return (
    <div className={styles.center}>
      <div className={styles.avatar}>
        <span role="img" aria-label="avatar">🧬</span>
      </div>
    </div>
  );
}
