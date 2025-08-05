'use client';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function ExpansãoLayout({ children }: Props) {
  return (
    <div style={
      backgroundColor: '#047857',
      padding: '2rem',
      borderRadius: '1rem',
      color: '#fff',
      minHeight: '100vh',
      transition: 'background-color 0.5s ease'
    }>
      <h1 style={ fontSize: '2rem' }>🌌 Modo Expansão</h1>
      <p>Interface visual para o modo de abertura criativa e exploração.</p>
      <div style={ marginTop: '2rem' }>
        {children}
      </div>
    </div>
  );
}
