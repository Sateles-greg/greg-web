// import React from 'react';
import { useMemo } from 'react';
import { Particles } from '@tsparticles/react';

interface Props {
  modo: string;
}

export default function SimbioticParticles({ modo }: Props) {

  const config = useMemo(() => {
    const coresPorModo: Record<string, string[]> = {
      foco: ['#1e40af', '#93c5fd'],
      zen: ['#bbf7d0', '#a7f3d0'],
      expansao: ['#f0abfc', '#a78bfa'],
      sombra: ['#0f172a', '#334155'],
      reparo: ['#c084fc', '#818cf8'],
      estrategia: ['#fbbf24', '#fde68a'],
      criativo: ['#f472b6', '#f9a8d4'],
      emocional: ['#f87171', '#fbbf24'],
      noturno: ['#64748b', '#334155'],
      guardiao: ['#facc15', '#fde047'],
    };
    const cores = coresPorModo[modo.toLowerCase()] || ['#ffffff'];
    return {
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: 40 },
        color: { value: cores },
        links: {
          enable: true,
          distance: 100,
          color: cores[0],
          opacity: 0.3,
          width: 1,
        },
        collisions: { enable: false },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none' as const,
          random: true,
          straight: false,
          outModes: { default: 'bounce' as const },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 4 },
        },
        opacity: {
          value: { min: 0.3, max: 0.6 },
        },
      },
      detectRetina: true,
    };
  }, [modo]);

  return (
    <Particles id='tsparticles' options={config} />
  );
}
