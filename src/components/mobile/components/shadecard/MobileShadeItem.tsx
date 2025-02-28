'use client';

import styles from '../../styles/shadecard.module.css';

interface MobileShadeItemProps {
  number: string;
  name: string;
  color: string;
  onClick?: () => void;
}

export default function MobileShadeItem({
  number,
  name,
  color,
  onClick
}: MobileShadeItemProps) {
  return (
    <button
      onClick={onClick}
      className={styles.shadeItem}
    >
      <div 
        className={styles.colorCircle}
        style={{ backgroundColor: color }}
      />
      <span className={styles.shadeNumber}>{number}</span>
      <span className={styles.shadeName}>{name}</span>
    </button>
  );
}
