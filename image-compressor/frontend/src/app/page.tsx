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
      <FileController />
    </main>
  );
}