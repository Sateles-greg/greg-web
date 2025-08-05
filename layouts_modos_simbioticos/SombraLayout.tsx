'use client';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function SombraLayout({ children }: Props) {
  return (
    <div style={
      backgroundColor: '#111827',
      padding: '2rem',
      borderRadius: '1rem',
      color: '#fff',
      minHeight: '100vh',
      transition: 'background-color 0.5s ease'
    }>
      <h1 style={ fontSize: '2rem' }>🕳️ Modo Sombra</h1>
      <p>Interface visual para exploração das emoções profundas e sombras.</p>
      <div style={ marginTop: '2rem' }>
        {children}
      </div>
    </div>
  );
}
