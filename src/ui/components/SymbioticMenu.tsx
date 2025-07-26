import React from 'react';
import styles from './SymbioticMenu.module.css';


interface MenuItem {
  icon: string;
  label: string;
}

const items: MenuItem[] = [
  { icon: '🧘', label: 'Zen' },
  { icon: '⚡', label: 'Estratégia' },
  { icon: '🎨', label: 'Criativo' },
  { icon: '🌀', label: 'Emocional' },
  { icon: '🌒', label: 'Noturno' },
];

interface SymbioticMenuProps {
  activeMode: string;
  onSelect: Function;
}

const SymbioticMenu: React.FC<SymbioticMenuProps> = ({ activeMode, onSelect }) => {
  return (
    <div className={styles.menu}>
    {items.map((item, i) => {
        // modo removido, não utilizado
        const angle = (360 / items.length) * i - 90;
        const rad = (angle * Math.PI) / 180;
        const x = 90 + 80 * Math.cos(rad);
        const y = 90 + 80 * Math.sin(rad);
        return (
          <button
            key={item.label}
            className={
              styles['menu-item'] +
              (activeMode === item.label ? ' ' + styles['active'] : '')
            }
            // estilo removido, agora feito via CSS module
            data-x={x}
            data-y={y}
            onClick={() => onSelect(item.label)}
        // variável removida pois não é utilizada
          >
            <span>{item.icon}</span>
            <div className={styles['menu-label']}>{item.label}</div>
          </button>
        );
      })}
    </div>
  );
};

export default SymbioticMenu;
