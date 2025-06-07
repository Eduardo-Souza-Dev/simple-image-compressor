"use client";
// Page to handle file upload

import styles from "../../css/file_controller.module.css";
import { FaFileImage } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { LuLink2Off } from "react-icons/lu";
import { LuLink2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';
import { GenerateUUID } from "../../scripts/GenerateUUID";
import OptionsTypeFiles from "../../components/options_type_files";
import FileList from "../../components/file_list";
import { customAlphabet } from "nanoid";
import JSZip from "jszip";
import Timer from 'easytimer.js';



export default function FileController() {
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const [file, setFile ] =  useState<File[]>([]);
  const [fileList, setFileList] = useState<string[]>([]);
  let urlResponse:string = '';
  const [typeFile, setTypeFile] = useState<string>('');
  const [btnDownload, setBtnDownload] = useState<boolean>(false);
  const [widthValue, setWidthValue] = useState<string>('0');
  const [heightValue, setHeightValue] = useState<string>('0');
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

  function removeAllfiles(){

    if(file.length == 0){
      toast.warning('Nenhum arquivo para remover!');
      return;
    }
    // Limpa o array de arquivos
    setFile([]);
    toast.success('Todos os arquivos foram removidos com sucesso!');

  }

  async function ExpireZipDownload() {
    let timer = new Timer();
    timer.start({countdown: true, startValues: {seconds: 300}});

    timer.addEventListener('secondsUpdated', (e) =>{
      let rende_timer = document.getElementById('rende_timer');
 
      if(rende_timer) {
        rende_timer.innerHTML = timer.getTimeValues().toString();
      }

    })

    timer.addEventListener('targetAchieved', (e) => {
      let rende_timer = document.getElementById('rende_timer');
      DeleteZipUser(200);
      if(rende_timer){
        rende_timer.style.display = 'none'; 
      } 
      setBtnDownload(false);
      return;
    })

    
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
    const fileValue = event.target.files;
    const typeFile = fileValue[0]?.type;
    const zipFolder = new JSZip();
    const arrFiles = [];

    if(!['image/png', 'image/jpeg', 'image/svg+xml','application/x-zip-compressed'].includes(typeFile)){
      toast.warning("Somente imagens ou ZIP!");
      return;
    }

    if(typeFile == "application/x-zip-compressed"){
        zipFolder.loadAsync(fileValue[0])
        .then((zip) => {
          zip.forEach(async (filePath,fileContent) =>{
            let blob = await fileContent.async("blob");
            let extension = fileContent.name.split('.').pop()?.toLowerCase(); // Pega o tipo de extensão que é o arquivo

            if(!["jpg", "jpeg", "png", "svg"].includes(extension)){
              toast.warning("Arquivos incompatíveis removidos. Envie apenas imagens nos formatos permitidos.");
              return;
            }

            // Alterando os mimetypes do extension
            if(extension == 'jpeg' || extension == 'jpg'){
              extension = 'image/jpeg';
            }

            if(extension == 'svg'){
              extension = 'image/svg+xml';
            }

            if(extension == 'png'){
              extension = 'image/png';
            }


            const file = new File([blob], fileContent.name, { type: extension }); // converte o arquivo para o tipo blob
            arrFiles.push(file); // faz o push somente de imagens
            setFile(arrFiles); // manda o array para o setFile
          })

      })
    }else{
      setFile(Array.from(fileValue));
    } 

  }

  function dragOverHandler(event){
    event.preventDefault();
    event.currentTarget.style.borderColor = '#ff8c00';
  }

  function dragOnLeave(event){
    event.preventDefault();
    event.currentTarget.style.borderColor = '#666';
  }

  function dragOnEnd(event){
    event.preventDefault();
    event.currentTarget.style.borderColor = '#666';
  }

  function dropHandler(event){
    event.preventDefault();
    event.currentTarget.style.borderColor = '#666';
    const zipFolder = new JSZip();

    if(event.dataTransfer.items){
      
      [...event.dataTransfer.items].forEach((item, i) =>{
        const file = item.getAsFile();
        const arrFiles = [];

        if(item.type != 'image/svg+xml' && item.type != 'image/png' && item.type != 'image/jpeg' && item.type != 'application/x-zip-compressed'){
          toast.warning("Somente imagens ou ZIP!");
          return;
        }

        if(item.type == "application/x-zip-compressed"){
          zipFolder.loadAsync(file)
          .then((zip) => {
            zip.forEach(async (filePath,fileContent) =>{
              let blob = await fileContent.async("blob");
              let extension = fileContent.name.split('.').pop()?.toLowerCase(); // Pega o tipo de extensão que é o arquivo

              if(!["jpg", "jpeg", "png", "svg"].includes(extension)){
                toast.warning("Arquivos incompatíveis removidos. Envie apenas imagens nos formatos permitidos.");
                return;
              }

              // Alterando os mimetypes do extension
              if(extension == 'jpeg' || extension == 'jpg'){
                extension = 'image/jpeg';
              }

              if(extension == 'svg'){
                extension = 'image/svg+xml';
              }

              if(extension == 'png'){
                extension = 'image/png';
              }


              const file = new File([blob], fileContent.name, { type: extension }); // converte o arquivo para o tipo blob
              arrFiles.push(file); // faz o push somente de imagens
              setFile(arrFiles); // manda o array para o setFile
            })
          })
        }else{
          arrFiles.push(file); 
          setFile(arrFiles);
        }

      })
    }

  }

  function downloadImages(){
            // Criamos um link para fazer o donwload do documento comprimido

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
            setFile([]);
            localStorage.clear(); // Limpa o localStorage
            toast.success('Download realizado com sucesso!');



  }

  async function resizeImage(){
    if(heightValue == '' && widthValue == ''){
      toast.warning('Preencha os campos de largura ou altura!');
    }
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
        let nanoidValue = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 5);
        let id = nanoidValue();
        formData.append('files', file, `${UUID}_${id}_${file.name}`);
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
  <div>
    {btnDownload == true ? <div id="rende_timer" className={styles.body_timer}></div> : null}

    <Toaster richColors position="top-right" />

    <div className={styles.content_wrapper}> 
      <div className={styles.upload_section}>
  
        <label htmlFor="file-upload" className={styles.upload_label}>
        <div id="upload-container" onDrop={(e) => dropHandler(e)} onDragOver={(e) => dragOverHandler(e)} onDragLeave={(e) => dragOnLeave(e)} onDragEnd={(e) => dragOnEnd(e)} className={styles.upload_container}>
          
            <div className={styles.upload_icon}>
              <FaFileImage size={60} color="#ff8c00" />
            </div>
            <p className={styles.upload_text}>Clique aqui ou arraste sua imagem/zip.</p>
            <input
              style={{ display: 'none' }}
              onChange={handleFile}
              type="file"
              accept=".png,.jpg,.jpeg,.svg,.zip"
              id="file-upload"
              multiple
            />
         
        </div>
        </label>

        <div className={styles.options_container}>
         <OptionsTypeFiles changeType={ changeType} typeFile={typeFile}/> 

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
           
          <button className={styles.button_mq_download} onClick={() => resizeImage()}>
            Redimensionar Imagens
          </button>
         
        </div>
      </div>
      </div>

    </div>

    <div
    className={styles.files_list_container}
    >
          <span className={styles.h1_arch}>
            <h3 style={{ color: '#eee', marginBottom: '0.5rem' }}>Arquivos: </h3>
            <MdOutlineDeleteSweep className={styles.btnDelete} onClick={() => removeAllfiles()} title="Remover arquivos" size={25} color="#ff4500"/>
          </span>
          <section className={styles.files_list}>
            {file.length > 0 ? (
              <FileList
                files={file.map((f) => f.name)}
                onDelete={(fileName) => {
                  setFile((prevFiles) => prevFiles.filter((f) => f.name !== fileName));
                }}
              />
            ) : (
              <div className={styles.delete_button}>
                <small style={{ color: '#eee' }}><i>Nenhum arquivo adicionado.</i></small>
              </div>
            )}
          </section>
    </div>
</main>
  );
}