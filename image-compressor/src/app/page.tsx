"use client";

import styles from "./page.module.css";
import { IoImages } from "react-icons/io5";
import { FaFileImage } from "react-icons/fa";
import { useEffect, useState } from "react";






export default function Home() {
  const [ file, setFile ] = useState('');
  let dragged;
  useEffect(() =>{
    setFile(document.getElementsByClassName("upload-container"));
    
    if(file[0] !== undefined){
      file[0].addEventListener('dragenter', (event) =>{
        file[0].style.backgroundColor = '#130f4030';
      });

      file[0].addEventListener('dragstart', (event) =>{
        file[0].style.backgroundColor = '#130f4030';
      });

      file[0].addEventListener('dragleave', (event) =>{
        file[0].style.backgroundColor = '#efefef';
      });

      file[0].addEventListener('dragend', (event) =>{
        file[0].style.backgroundColor = '#efefef';
      });
    }

  })

 


  // const []
  // if (typeof window !== 'undefined') {

  // const file_container = document.getElementsByClassName("container");

  // function preventDefaults(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log("Imagem pega")
  // }

  // file_container.addEventListener('drag', (e) =>{
  //   preventDefaults(e);
  //   console.log("Imagem dragged");
  // });

  // preventDefaults()
  // // file_container.addEventListener('dragenter', preventDefaults);
  // // file_container.addEventListener('dragleave', preventDefaults);
  // }
  return (
    <main className={styles.main}>
      <div className={styles.body_file}>    

        <div class="wrapper"> 
        <div class="container">
          <h1>Envie uma imagem para comprimi-la.</h1>
          <div id="upload-container" class="upload-container">
            <div class="border-container">
              <div class="icons fa-4x">
              <FaFileImage
              style={{margin: '15px'}}
              size={120} />
              </div>
              <input style={{display:'none'}} type="file" id="file-upload" multiple/>
              <p>Arraste sua imagem aqui, ou 
                <a href="#" id="file-browser"> <label style={{cursor:'pointer'}} for="file-upload"> clique aqui</label> </a> para adicionar uma imagem.</p>
            </div>
          </div>
        </div>
      </div>
        <IoImages 
          className={styles.animate}
          size={170} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"
          style={{ left: '40%',top:'116%', animationDelay: '0s' }} />
   
      </div>

{/* Provavelmente tem forma mais inteligente de fazer isso aqui abaixo kk, um for etc */}
        
      <IoImages  className={styles.animate}
          size={150} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"  style={{ left: '10%',top:'110%', animationDelay: '0s' }}/>
      <IoImages  className={styles.animate}
          size={100} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md" style={{ left: '30%', top:'110%', animationDelay: '0.5s' }}/>
      <IoImages  className={styles.animate}
          size={170} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"  style={{ left: '10%',top:'110%', animationDelay: '1s' }}/>
      <IoImages  className={styles.animate}
          size={20} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"  style={{ right: '70%',top:'140%', animationDelay: '1.5s' }}/>
      <IoImages  className={styles.animate}
          size={80} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"  style={{ left: '20%',top:'120%', animationDelay: '2s' }}/>
      <IoImages  className={styles.animate}
        size={50} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '90%',top:'130%', animationDelay: '2s' }}/>
        <IoImages  className={styles.animate}
        size={190} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '80%',top:'115%', animationDelay: '2s' }}/>
        <IoImages  className={styles.animate}
        size={70} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '50%',top:'125%', animationDelay: '2s' }}/>
        <IoImages  className={styles.animate}
        size={55} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '55%',top:'117%', animationDelay: '2s' }}/>
        <IoImages  className={styles.animate}
        size={80} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '77%',top:'105%', animationDelay: '2s' }}/>
        <IoImages  className={styles.animate}
        size={20} 
        w = "fit-content"
        p = {6}
        rounded = "3xl"
        boxShadow = "md"  style={{ left: '70%',top:'120%', animationDelay: '2s' }}/>

      <IoImages  className={styles.animate}
          size={50} 
          w = "fit-content"
          p = {6}
          rounded = "3xl"
          boxShadow = "md"  style={{ left: '0%',top:'135%', animationDelay: '2s' }}/>
    
    </main>
  );
}
