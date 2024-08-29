import styles from "./page.module.css";
import { SiFiles } from "react-icons/si";



export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.body_file}>
      
        <h1>Upload your file here</h1>
      

        <input type="file" />
        <SiFiles 
          className={styles.animate}
          size={170} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md" />
   
      </div>

{/* Provavelmente tem forma mais inteligente de fazer isso aqui abaixo kk, um for etc */}
         <div class="container">
      <SiFiles  className={styles.animate}
          size={150} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"  style={{ left: '10%', animationDelay: '0s' }}/>
      <SiFiles  className={styles.animate}
          size={100} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md" style={{ left: '30%', top:'90%', animationDelay: '0.5s' }}/>
      <SiFiles  className={styles.animate}
          size={170} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"  style={{ left: '10%',top:'60%', animationDelay: '1s' }}/>
      <SiFiles  className={styles.animate}
          size={20} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"  style={{ right: '70%',top:'100%', animationDelay: '1.5s' }}/>
      <SiFiles  className={styles.animate}
          size={80} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"  style={{ left: '20%',top:'80%', animationDelay: '2s' }}/>
      <SiFiles  className={styles.animate}
        size={50} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '90%',top:'100%', animationDelay: '2s' }}/>
        <SiFiles  className={styles.animate}
        size={190} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '80%',top:'70%', animationDelay: '2s' }}/>
        <SiFiles  className={styles.animate}
        size={70} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '50%',top:'80%', animationDelay: '2s' }}/>
        <SiFiles  className={styles.animate}
        size={55} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '55%',top:'90%', animationDelay: '2s' }}/>
        <SiFiles  className={styles.animate}
        size={80} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '77%',top:'60%', animationDelay: '2s' }}/>
        <SiFiles  className={styles.animate}
        size={20} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '70%',top:'100%', animationDelay: '2s' }}/>

      <SiFiles  className={styles.animate}
          size={50} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"  style={{ left: '0%',top:'100%', animationDelay: '2s' }}/>
      </div>
    </main>
  );
}
