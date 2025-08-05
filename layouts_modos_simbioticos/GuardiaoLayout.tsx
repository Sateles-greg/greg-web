'use client';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function GuardiãoLayout({ children }: Props) {
  return (
    <div style={
      backgroundColor: '#f59e0b',
      padding: '2rem',
      borderRadius: '1rem',
      color: '#fff',
      minHeight: '100vh',
      transition: 'background-color 0.5s ease'
    }>
      <h1 style={ fontSize: '2rem' }>🛡️ Modo Guardião</h1>
      <p>Interface visual para proteção ativa e vigilância simbiótica.</p>
      <div style={ marginTop: '2rem' }>
        {children}
      </div>
    </div>
  );
}
