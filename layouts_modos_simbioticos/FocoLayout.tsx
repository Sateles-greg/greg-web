'use client';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function FocoLayout({ children }: Props) {
  return (
    <div style={
      backgroundColor: '#1e40af',
      padding: '2rem',
      borderRadius: '1rem',
      color: '#fff',
      minHeight: '100vh',
      transition: 'background-color 0.5s ease'
    }>
      <h1 style={ fontSize: '2rem' }>🧠 Modo Foco</h1>
      <p>Interface visual para o modo de atenção profunda e clareza mental.</p>
      <div style={ marginTop: '2rem' }>
        {children}
      </div>
    </div>
  );
}
