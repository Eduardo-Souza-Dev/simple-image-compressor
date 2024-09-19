"use client";

import styles from "./page.module.css";
import { IoImages } from "react-icons/io5";
import { FaFileImage } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LuLink2Off } from "react-icons/lu";
import { LuLink2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import FileUploadMQ from "./backend/FileUploadMQ.js";






export default function Home() {
  const [ valuePixel, setValuePixel ] = useState(0);
  const [isLinked, setIsLinked] = useState(false);

  function changedNotLinkedIcon(){
    let not_linked: HTMLElement = document.getElementById('not_linked');
    let linked: HTMLElement = document.getElementById('linked');
    if(not_linked){
      not_linked.style.display = 'none';
      linked.style.display = 'block';
      setIsLinked(true);
    }
    
  }

  console.log(file)

  function changeColor(value:any){
    console.log(value)
    let svg: HTMLElement = document.getElementById('svg');
    let png: HTMLElement = document.getElementById('png');
    let jpeg: HTMLElement = document.getElementById('jpeg');

    if(value == 'svg'){
      //Muda a cor do background
      svg.style.backgroundColor = '#007BFF';
      png.style.background = '#f9f9f9';
      jpeg.style.background = '#f9f9f9';

      //Muda a cor da fonte
      svg.style.color = 'white';
      jpeg.style.color = 'black';
      png.style.color = 'black';
    }
    else if(value == 'jpeg'){
      svg.style.background = '#f9f9f9';
      png.style.background = '#f9f9f9';
      jpeg.style.backgroundColor = '#007BFF';

      jpeg.style.color = 'white';
      png.style.color = 'black';
      svg.style.color = 'black';
    }
    else if(value == 'png'){

      svg.style.background = '#f9f9f9';
      jpeg.style.background = '#f9f9f9';
      png.style.backgroundColor = '#007BFF';
      
      png.style.color = 'white';
      jpeg.style.color = 'black';
      svg.style.color = 'black';
    }

  }

  function changedLinkedIcon(){
    let not_linked: HTMLElement = document.getElementById('not_linked');
    let linked: HTMLElement = document.getElementById('linked');
    if(linked){
      not_linked.style.display = 'block';
      linked.style.display = 'none';
      setIsLinked(false);
    }
    
  }

  function captureValue1(){
    if(isLinked == true){
      let pixel_1: HTMLElement = document.getElementById('pixel_1');
      let pixel_2: HTMLElement = document.getElementById('pixel_2');

      if(pixel_1){
        pixel_2.value = pixel_1.value;
      }
      
  }
}

function captureValue2(){
  if(isLinked == true){
    let pixel_1: HTMLElement = document.getElementById('pixel_1');
    let pixel_2: HTMLElement = document.getElementById('pixel_2');
    
    if(pixel_2){
      pixel_1.value = pixel_2.value;
    }
    
}
}


  function handleFile(event:any){
    const fileValue = event.target.files
    const RabbitSend = new FileUploadMQ;
    RabbitSend.uploadFile(fileValue);
  }

  // let result = Object.entries(file);

    

  return (
    <main className={styles.main}>
      <div className={styles.body_file}>    

        <div className="wrapper"> 
        <div className="container">
          <h1>Envie uma imagem para comprimi-la.</h1>
          <div id="upload-container" className="upload-container">
            <div className="border-container">
              <div className="icons fa-4x">
              <FaFileImage
              style={{margin: '15px'}}
              size={120} />
              </div>
              <input  action={'/myImageRoute'}
                      accept='.png,.jpg,.jpeg,.webp'
                      withCredentials={true} 
                      style={{display:'none'}} 
                      onChange={handleFile} 
                      type="file" 
                      id="file-upload" 
                      multiple/>
              <p>
                <a href="#" id="file-browser"> <label style={{cursor:'pointer'}} for="file-upload"> Clique aqui</label> </a> para adicionar uma imagem.</p>
            </div>
          </div>
          <div style={{margin:'13px 0px 13px 0px'}} className="container-pixel">
            <div className="choose-container">
              <span onClick={() =>{
                // convertSVG();
                changeColor('svg');
              }} className="kindFile" id="svg">.svg</span> 
              <span onClick={() =>{
                // convertSVG();
                changeColor('png');
              }} className="kindFile" id="png">.png</span> 
              <span onClick={() =>{
                // convertSVG();
                changeColor('jpeg');
              }} className="kindFile" id="jpeg">.jpeg</span>
            </div>
            <div className="escale-container">
                <input id = 'pixel_1' className="pixel-value" onChange={captureValue1}/>
                <div className="middle-pixel-value">
                <p style={{fontWeight:'bolder'}}>X</p>                    
                </div>
                <input id = 'pixel_2' className="pixel-value" onChange={captureValue2}/>
                <LuLink2Off onClick={changedNotLinkedIcon}  id="not_linked"  size={23} style={{rotate:'90deg', marginLeft:'5px'}} />
                <LuLink2 id="linked" onClick={changedLinkedIcon} display={'none'} size={23} style={{rotate:'90deg', marginLeft:'5px'}} />
            </div>
           
          </div>
          
          <div className="upload-container" id="images_container" style={{marginTop:'10px', justifyContent:'start', display:'flex', flexWrap:'wrap', overflowY:'scroll', height:'120px', overflowX:'none'}}>
            {
              result.map((item, index) => (
                <div key={index}>
                  <span id={`id_span_${index}`} onClick={function deleteImage(){  
                      document.getElementById(`image_${index}`).remove();
                      document.getElementById(`id_span_${index}`).remove();
                      }
                    } 
                    onMouseEnter={function(){
                    let image: HTMLElement = document.getElementById(`image_${index}`);
                    image.style.borderColor = 'red';
                    image.style.borderWidth = '5px';
                    image.style.transition = 'border-color 0.5s ease';
                    } }
                    onMouseLeave={function(){
                      let image: HTMLElement = document.getElementById(`image_${index}`);
                      image.style.borderColor = '#007BFF';
                      image.style.borderWidth = '3px';
                      image.style.transition = 'border-color 0.5s ease';
                    }}
                    style={{position:'relative',
                     bottom:'86px', 
                     left:'15px',
                     cursor: 'pointer',
                     transition: '0.5s ease',
                    }}
                     >
                      <AiOutlineCloseCircle size={30} color="red" /></span>
                <img className="image-compress" id={`image_${index}`} style={{border:'3px solid #007BFF',margin:'5px'}} src={URL.createObjectURL(item[1])} width="100" height="100"></img>
                </div>               
              ))
            }
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
