import React, { useEffect } from 'react';
import { useSymbiosis } from '../contexts/SymbiosisContext';
import { speak } from '../services/ttsService';
import styles from './ResponseBox.module.css';

const ResponseBox: React.FC = () => {
  const { response } = useSymbiosis();
  useEffect(() => {
    if (response) speak(response);
  }, [response]);
  return (
    <div className={styles.responseBox} aria-live="polite">
      {response}
    </div>
  );
};
export default ResponseBox;
