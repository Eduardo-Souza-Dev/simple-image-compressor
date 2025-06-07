"use client";

import styles from "./../css/page.module.css";
import FileController from "./file-controller/page";
import { Toaster } from 'sonner';


export default function Home() {
  return (
    <main className={styles.main}>
      <Toaster richColors position="top-right" />
      <FileController />
    </main>
  );
}