import React from 'react';
import styles from '../css/header.module.css'; // Importe o arquivo CSS Module
import { FaCodeBranch } from 'react-icons/fa'; // Exemplo de ícone para contribuir

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span style={{ color: '#ff8c00', fontWeight: 'bold', fontSize: '1.5rem' }}>
          FreeFiles
        </span>
      </div>
      <nav className={styles.navigation}>
        <ul>
         <li>
            <a href="/downloads" className={styles.navLink}>
              Meus Downloads
            </a>
          </li>
          <li>
            <a href="/api-doc" className={styles.navLink}>
              API/Doc
            </a>
          </li>
          <li>
            <a href="/contribute" className={`${styles.navLink} ${styles.contributeButton}`}>
              <FaCodeBranch style={{ marginRight: '0.5rem' }} /> Contribuir
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}