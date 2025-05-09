"use client";
// Page to handle file upload and conversion

import styles from "./../css/file_controller.module.css";
import { FaFileImage } from "react-icons/fa";
import { AiOutlineCloseCircle, AiOutlineDelete } from "react-icons/ai";
import { LuLink2Off } from "react-icons/lu";
import { LuLink2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';
import { GenerateUUID } from "../scripts/GenerateUUID";
import { nanoid } from "nanoid";






export default function FileController() {
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



  function changeType(value:any){
    setTypeFile(value);
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

  function dragOverHandler(event){
    event.preventDefault();

  }

  function dropHandler(event){
    event.preventDefault();
    console.log(event.dataTransfer.items);

    if(event.dataTransfer.items){
      [...event.dataTransfer.items].forEach((item, i) =>{
        console.log(item)

        const entry = item.webkitGetAsEntry?.(); // Acesso ao sistema de arquivos

        if(entry?.isDirectory){
          console.log(`📁 Pasta detectada: ${entry.name}`);
        }

        if(item.kind === "file"){
          const file =item.getAsFile();
          console.log(`... file [${i}].name = ${file.name}`)
        }else{
          [...event.dataTransfer.files].forEach((file,i) =>{
            console.log(`... file[${i}].name = ${file.name}`);
          })
        }

      })
    }

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
  <div className={styles.body_file}>
    {btnDownload == true ? <div id="rende_timer" className={styles.body_timer}></div> : null}

    <Toaster richColors position="top-right" />

    <div className={styles.content_wrapper}> {/* Novo wrapper para o conteúdo principal */}
      <div className={styles.upload_section}>
        <h2 style={{ fontSize: '22px', marginBottom: '1rem', color: '#333' }}>
          Arraste e solte seus arquivos aqui ou clique para selecionar.
        </h2>
        <label htmlFor="file-upload" className={styles.upload_label}>
        <div id="upload-container" onDrop={(e) => dropHandler(e)} onDragOver={(e) => dragOverHandler(e)} className={styles.upload_container}>
          
            <div className={styles.upload_icon}>
              <FaFileImage size={60} color="#ff8c00" />
            </div>
            <p className={styles.upload_text}>Clique aqui para adicionar arquivos</p>
            <input
              style={{ display: 'none' }}
              onChange={handleFile}
              type="file"
              id="file-upload"
              multiple
            />
         
        </div>
        </label>

        <div className={styles.options_container}>
          <div className={styles.file_type_selector}>
            <span
              onClick={() => {
                changeType('svg');
              }}
              className={`${styles.kind_file} ${typeFile === 'svg' ? styles.active : ''}`}
              id="svg"
            >
              .svg
            </span>
            <span
              onClick={() => {
                changeType('png');
              }}
              className={`${styles.kind_file} ${typeFile === 'png' ? styles.active : ''}`}
              id="png"
            >
              .png
            </span>
            <span
              onClick={() => {
                changeType('jpeg');
              }}
              className={`${styles.kind_file} ${typeFile === 'jpeg' ? styles.active : ''}`}
              id="jpeg"
            >
              .jpeg
            </span>
          </div>

          <div className={styles.pixel_control}>
            <input
              id="pixel_1"
              className={styles.pixel_value}
              placeholder="Largura"
              onChange={captureValue1}
            />
            <div className={styles.pixel_separator}>
              <p style={{ fontWeight: 'bolder', color: '#FFF' }}>X</p>
            </div>
            <input
              id="pixel_2"
              className={styles.pixel_value}
              placeholder="Altura"
              onChange={captureValue2}
            />
             <LuLink2Off onClick={changedNotLinkedIcon}  id="not_linked"  size={23} style={{rotate:'90deg', marginLeft:'5px'}} />
             <LuLink2 id="linked" onClick={changedLinkedIcon} display={'none'} size={23} style={{rotate:'90deg', marginLeft:'5px'}} />
          </div>
        </div>
      </div>

      <div
        id="files_list_container"
        className={styles.files_list_container}
      >
        <span className={styles.h1_arch}>
        <h3 style={{ color: '#eee', marginBottom: '0.5rem' }}>Arquivos: </h3>
        </span>
        <section className={styles.files_list}>
        {file.map((item, index) => (
          <div key={index} className={styles.file_item}>
            <span className={styles.file_name}>{item.name}</span>
            <span
              id={`id_span_${index}`}
              onClick={function deleteImage() {
                const newFile = [...file];
                newFile.splice(index, 1);
                setFile(newFile);
              }}
              className={styles.delete_button}
            >
              <AiOutlineDelete size={20} color="#ff4500" />
            </span>
          </div>
        ))}
        </section>
      </div>
    </div>

    <div className={styles.buttons_container}>
      <button className={styles.button_mq_compress} onClick={() => sendToRabbit('compress')}>
        Comprimir Arquivos
      </button>
      {btnDownload == true && totalSeconds > 0 ? (
        <button className={styles.button_mq_download} onClick={() => downloadImages()}>
          Baixar Arquivos
        </button>
      ) : null}
      <button className={styles.button_mq_convert} onClick={() => sendToRabbit('convert', typeFile)}>
        Converter para: {typeFile}
      </button>
    </div>
  </div>
</main>
  );
}