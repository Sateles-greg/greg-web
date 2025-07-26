import React from 'react';
import styles from './ModoBaseLayout.module.css';
import override from './ModoBaseLayoutOverride.module.css';

interface ModoBaseLayoutProps {
  corPrimaria: string;
  simbolo: string;
  nomeModo: string;
  descricao: string;
  children?: React.ReactNode;
}

const ModoBaseLayout: React.FC<ModoBaseLayoutProps> = ({
  corPrimaria,
  simbolo,
  nomeModo,
  descricao,
  children
}) => {
  return (
    <div
      className={[
        styles['modo-base-root'],
        corPrimaria && corPrimaria.startsWith('#') ? override[`bg-${corPrimaria.replace('#', '')}`] : '',
        corPrimaria && corPrimaria.startsWith('bg-') ? override[corPrimaria] : ''
      ].filter(Boolean).join(' ')}
    >
      <div className={styles['modo-base-header']}>
        <h1 className={styles['modo-base-title']}>
          {simbolo} {nomeModo}
        </h1>
        <p className={styles['modo-base-desc']}>{descricao}</p>
      </div>
      <div className={styles['modo-base-content']}>
        {children}
      </div>
    </div>
  );
};

export default ModoBaseLayout;
