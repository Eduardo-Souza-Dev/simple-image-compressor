"use client";
// Todo o layout aqui é temporário, apenas para testes
// O layout final será feito com o Bootstrap

import styles from "./page.module.css";
import { IoImages } from "react-icons/io5";
import { FaFileImage } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LuLink2Off } from "react-icons/lu";
import { LuLink2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';
import { GenerateUUID } from "./scripts/GenerateUUID";
import { nanoid } from "nanoid";






export default function Home() {
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const [file, setFile ] =  useState<File[]>([]);
  let urlResponse:string = '';
  const [typeFile, setTypeFile] = useState<string>('');
  const [btnDownload, setBtnDownload] = useState<boolean>(false);
  const [widthValue, setWidthValue] = useState<any>(0);
  const [heightValue, setHeightValue] = useState<any>(0);
  let totalSeconds:number = 300;// 5 minutos = 300 segundos
  const UUID = GenerateUUID();
  

  function changedNotLinkedIcon(){
    let not_linked: HTMLElement = document.getElementById('not_linked');
    let linked: HTMLElement = document.getElementById('linked');
    if(not_linked){
        not_linked.style.display = 'none';
        linked.style.display = 'block';
        setIsLinked(true);
    }
    
  }

  async function ExpireZipDownload() {

    if(typeof window !== 'undefined') { // Aqui é só para garantir que já tenha sido renderizado no browser

      let rende_timer = document.getElementById('rende_timer');

      // Aguarda até que o elemento seja encontrado no DOM
        while (!rende_timer) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Aguarda 100ms antes de tentar novamente
            rende_timer = document.getElementById('rende_timer');
        }
        const element = document.createElement('div');
        element.id = 'demo';
        element.className = 'body_timer';
        element.innerHTML = '05 : 00';
        element.style.display = 'flex';
        element.style.justifyContent = 'center';
        element.style.alignItems = 'center';
        element.style.width = '120px';
        element.style.height = '40px';
        element.style.color = 'white';
        element.style.borderRadius = '5px';
        element.style.backgroundColor = '#006cfa';
        rende_timer.appendChild(element);
        await new Promise(resolve => setTimeout(resolve, 0));

        
        const timerElement = document.getElementById('demo');
        
        const timer = setInterval(function() {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            const formattedTime = 
                `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

            if(timerElement){
              timerElement.textContent = formattedTime;
            }
            
            
            if (totalSeconds <= 0) {
                clearInterval(timer);
                setBtnDownload(false);
                DeleteZipUser(200);
                timerElement.textContent = '00:00'; // Resete do timer
            }
            
            totalSeconds--;
        }, 1000);

      }
    
  }



  function changeColor(value:any){
    setTypeFile(value);
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
   
    let pixel_1 = document.getElementById('pixel_1') as HTMLInputElement;
    let pixel_2 = document.getElementById('pixel_2') as HTMLInputElement;
    setWidthValue(pixel_1.value);
      if(isLinked == true){


          if(pixel_1){
            setHeightValue(pixel_1.value);
            pixel_2.value = pixel_1.value;
          }
        
      }
  }

  function captureValue2(){
    let pixel_1 = document.getElementById('pixel_1') as HTMLInputElement;
    let pixel_2 = document.getElementById('pixel_2') as HTMLInputElement;
    setHeightValue(pixel_2.value);
    if(isLinked == true){
  
      if(pixel_2){
        setWidthValue(pixel_2.value);
        pixel_1.value = pixel_2.value;
      }
      
    }
  }

  async function handleFile(event:any){
    const fileValue = event.target.files
    setFile(Array.from(fileValue));
  }

  function downloadImages(){
            // Criamos um link para já fazer o donwload do documento comprimido

            fetch(`http://localhost:3333/download/${UUID}`,{
              method: 'GET',
            }).then((response) => {
                urlResponse = response.url
              } 
            )
            .then(() => {
              const xmlHTTP = new XMLHttpRequest();
              const link = document.createElement('a');
              link.href = urlResponse;

              xmlHTTP.open('GET', link.href, true);
              // Verifica se o download foi feito com sucesso
              xmlHTTP.onloadend = async () => {
                  if(xmlHTTP.status == 200){
                    // Deleta o arquivo zipado do servidor
                    DeleteZipUser(xmlHTTP.status);
                  }
              }
              xmlHTTP.send();

              document.body.appendChild(link);
              link.click();
            })
            .catch(error => console.error('Error:', error));
           
            setBtnDownload(false);


  }

  async function sendToRabbit(key:string, type: string = 'none'){    
    if(file.length == 0){
      toast.warning('Adicione alguma imagem antes de continuar!');
    }else{
      let arrayFiles = [];
  
      Array.from(file).map((value) => arrayFiles.push((value as File)));

      const formData = new FormData();
      
      file.forEach((file, index) => {
        // Gera um id unico para cada foto e adiciona o id do usuário atual para cada foto
        let nanoidValue = nanoid(5);
          formData.append('files', file, `${UUID}_${nanoidValue}_${file.name}`);
      });
  
     await fetch(`http://localhost:3333/files/${key}/${type}/${heightValue}/${widthValue}`,{
        method: 'POST',
        body: formData,
      })
      .then( response =>
        response.text()
       )
      .then(async(data) => {
        if(data == "All files have been compressed"){
          toast.success('Arquivos comprimidos com sucesso!');
          setBtnDownload(true);
          ExpireZipDownload();
        }
      })
      .catch(error => console.error('Error:', error))
  
    }
  }

  async function DeleteZipUser(data: number){
    if(data == 200){

        fetch(`http://localhost:3333/delete/${UUID}`,{
          method: 'DELETE',
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
    
      }


  }



 

  return (
    <main className={styles.main}>
      <div id="body_file" className={styles.body_file}>    
          {
            btnDownload == true ? 
            <div id="rende_timer"></div>
            : null
          }
      
      
      <Toaster richColors position="top-right" />

        <div className="wrapper"> 
        <div className="container">
          <h2 style={{fontSize:'22px'}}>Envie uma imagem para comprimi-la ou converte-la.</h2>
          <div id="upload-container" className="upload-container">
            <div className="border-container">
              <div className="icons fa-4x">
              <FaFileImage
              style={{margin: '15px'}}
              size={120} />
              </div>
              <input  
                      accept='.png,.jpg,.jpeg,.webp,.svg' 
                      style={{display:'none'}} 
                      onChange={handleFile} 
                      type="file" 
                      id="file-upload" 
                      multiple/>
              <p>
                <a href="#" id="file-browser"> <label style={{cursor:'pointer'}} htmlFor="file-upload"> Clique aqui</label> </a> para adicionar uma imagem.</p>
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
          
          <div className="upload-container" id="images_container" style={{marginTop:'10px', justifyContent:'start', display:'flex', flexWrap:'wrap', overflowY:'scroll', height:'120px', overflowX:'hidden'}}>
            {
              file.map((item, index) => (
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
                <img className="image-compress" id={`image_${index}`} style={{border:'3px solid #007BFF',margin:'5px'}} src={URL.createObjectURL(item)} width="100" height="100"></img>
                </div>               
              ))
            }
          </div>
        </div>
      </div>

      <div className="container-buttons">
          <button className="button-mq" onClick={() => sendToRabbit('compress')} >Comprimir Imagens</button>
          {
            btnDownload == true && totalSeconds > 0 ? 
            <button className="button-mq" onClick={() => downloadImages()} >Baixar Imagens</button>
            : null
          }
          <button className="button-mq" onClick={() => sendToRabbit('convert',typeFile)} >Converter para: 
            {` ${typeFile}`}
          </button>
  
      </div>
   
      </div>        
    
    </main>
  );
}
