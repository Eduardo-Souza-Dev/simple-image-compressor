"use client";
// Todo o layout aqui é temporário, apenas para testes
// O layout final será feito com o Bootstrap

import styles from "./../css/page.module.css";
import FileController from "../components/file_controller";
import Header from "../components/header";
import { Toaster } from 'sonner';


export default function Home() {
  return (
    <main className={styles.main}>
      <Toaster richColors position="top-right" />
      <Header />
      <h1>Conversor de Imagens Gratuito ilimitado</h1>

      <FileController />
    </main>
  );
}