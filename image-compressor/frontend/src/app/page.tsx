"use client";

import styles from "./../css/page.module.css";
import FileController from "../components/file_controller";
import Header from "../components/header";
import { Toaster } from 'sonner';


export default function Home() {
  return (
    <main className={styles.main}>
      <Toaster richColors position="top-right" />
      <Header />
      <h2 className={styles.h1_main}>Conversor, Redimensionador e Compressor de Imagens online</h2>
      <h3>teste</h3>

      <FileController />
    </main>
  );
}