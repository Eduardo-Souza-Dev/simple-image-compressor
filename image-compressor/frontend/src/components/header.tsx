import React from 'react';
import styles from '../css/header.module.css';
import { FaCodeBranch } from 'react-icons/fa'; 
import Link from 'next/link';


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href='/'>
          <span style={{ color: '#ff8c00', fontWeight: 'bold', fontSize: '1.5rem' }}>
            FreeFiles
          </span>
        </a>
   
      </div>
      <nav className={styles.navigation}>
        <ul>
         <li>
           <Link href="/files-downloads" className={styles.navLink}>
            Meus Downloads
          </Link>
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