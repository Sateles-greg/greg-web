// import React from 'react';
import StatusCard from './StatusCard';
import LogViewer from './LogViewer';
import AvatarSimbotico from './AvatarSimbotico';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <AvatarSimbotico />
      <h1 className={styles.title}>Painel Simbiótico Greg</h1>
      <StatusCard />
      <LogViewer />
    </div>
  );
}
