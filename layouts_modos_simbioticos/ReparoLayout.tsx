'use client';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function ReparoLayout({ children }: Props) {
  return (
    <div style={
      backgroundColor: '#7c3aed',
      padding: '2rem',
      borderRadius: '1rem',
      color: '#fff',
      minHeight: '100vh',
      transition: 'background-color 0.5s ease'
    }>
      <h1 style={ fontSize: '2rem' }>🩺 Modo Reparo</h1>
      <p>Interface visual para regeneração simbólica e cura emocional.</p>
      <div style={ marginTop: '2rem' }>
        {children}
      </div>
    </div>
  );
}
