"use client";

import styles from "./page.module.css";
import { IoImages } from "react-icons/io5";
import { FaFileImage } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoUnlinkSharp } from "react-icons/io5";
import { MdLink } from "react-icons/md";
import { useEffect, useState } from "react";






export default function Home() {
  const [ file, setFile ] = useState([]);
  const [ image, setImage ] = useState('');
  const [isLinked, setIsLinked] = useState(false);

  useEffect(() =>{
    let teste = document.getElementById('not_linked');
    if(teste)
      setIsLinked(true);
    else
      setIsLinked(false);
  })

  function changedNotLinkedIcon(){
    let not_linked = document.getElementById('not_linked');
    let linked = document.getElementById('linked');
    if(not_linked){
      not_linked.style.display = 'none';
      linked.style.display = 'block';
    }
    else{
      linked.style.display = 'none';
      not_linked.style.display = 'block';
    }
  }

  function changedLinkedIcon(){
    let not_linked = document.getElementById('not_linked');
    let linked = document.getElementById('linked');
    if(linked){
      not_linked.style.display = 'block';
      linked.style.display = 'none';
    }
  }

  console.log(isLinked)

  function handleFile(event){
    const fileValue = event.target.files
    setFile(fileValue);
  }

  let result = Object.entries(file);

    

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
              Choose
            </div>
            <div className="escale-container">
                <div className="pixel-value">40</div>
                <div className="middle-pixel-value">
                <p style={{fontWeight:'bolder'}}>X</p>                    
                </div>
                <div className="pixel-value">90</div>
                <IoUnlinkSharp onClick={changedNotLinkedIcon} id="not_linked"  size={20} style={{rotate:'90deg', marginLeft:'5px'}} />
                <MdLink id="linked" onClick={changedLinkedIcon}  display={'none'} size={23} style={{rotate:'90deg', marginLeft:'5px'}} />

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
                    let image = document.getElementById(`image_${index}`);
                    image.style.borderColor = ' red';
                    image.style.borderWidth = '5px';
                    image.style.transition = 'border-color 0.5s ease';
                    } }
                    onMouseLeave={function(){
                      let image = document.getElementById(`image_${index}`);
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
