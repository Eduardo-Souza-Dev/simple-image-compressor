//Dependecies
import cors from "cors";
import express from 'express';
import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import * as fs from 'node:fs';
import { FileUploadMQInterface } from "@/configs/Interfaces";
import crypto from 'crypto';
import AdmZip from 'adm-zip';


const upload = multer({ storage: multer.memoryStorage() });

//Imports archives
import FileUploadMQ from './src/RabbitMQ/Publisher/FileUploadMQ';

const UploadMq = new FileUploadMQ;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

//Aqui chama o arquivo do RabbitMQ

app.get('/download/:id_user',upload.array('files'), async(req, res) =>{
    
    try{
        const id_user = req.params.id_user;
        const zip_file = path.join(__dirname,`src/temp_zip_files/${id_user}.zip`);
        if(zip_file){
            res.download(zip_file , (err) =>{
                if(err){
                    console.log(err);
                }

            });
        }else{
            console.log('Arquivo não existe');
        }

    }catch(error){
        console.log(error);
    }
   
})

app.delete('/files/delete/:id_user', async(req, res) =>{
    const buffer_hash = crypto.createHash('sha256').update(req.body.buffer_hash).digest('hex');
    const id_user = req.body.id_user;

    const zipFilePath = path.join(__dirname, `src/temp_zip_files/${id_user}.zip`);

    if (fs.existsSync(zipFilePath)) {
        try {
            const zip = new AdmZip(zipFilePath);
            const zipEntries = zip.getEntries();

            // Filtra as entradas do ZIP para encontrar a que corresponde ao buffer_hash
            const entryToDelete = zipEntries.find(entry => crypto.createHash('sha256').update(entry.entryName).digest('hex') === buffer_hash);

            if (entryToDelete) {
                zip.deleteFile(entryToDelete.entryName);
                zip.writeZip(zipFilePath);
                res.status(200).send('Arquivo deletado com sucesso');
            } else {
                res.status(404).send('Arquivo não encontrado no ZIP');
            }
        } catch (error) {
            console.error('Erro ao manipular o ZIP:', error);
            res.status(500).send('Erro ao manipular o arquivo ZIP.');
        }
    } else {
        console.warn('Arquivo ZIP do usuário não existe.');
        res.status(404).send('Arquivo do usuário não existe.');
    }
})
 
app.get('/files/list/:id_user', async(req, res) =>{
  const id_user  = req.params.id_user;
  const zipFilePath = path.join(__dirname, `src/temp_zip_files/${id_user}.zip`);

  if (fs.existsSync(zipFilePath)) {
    try {
      const zip = new AdmZip(zipFilePath);
      const zipEntries = zip.getEntries();

      const fileNames = zipEntries
        .filter(entry => !entry.isDirectory) // Ignora pastas
        .map(entry => ({
            name: entry.entryName,
            data: entry.getCompressedData().toString('base64')
        }));


      res.status(200).json(fileNames);
    } catch (error) {
      console.error('Erro ao ler o zip:', error);
      res.status(500).send('Erro ao ler os arquivos do zip.');
    }
  } else {
    console.warn('Arquivo ZIP do usuário não existe.');
    res.status(404).send('Arquivo do usuário não existe.');
  }
})

app.delete('/delete/:id_user', async(req,res) =>{
    try{
        const id_user = req.params.id_user;

        // Deleta o zip do usuário
        const zip_file = path.join(__dirname,`src/temp_zip_files/${id_user}.zip`);
        if(fs.existsSync(zip_file)){// verifica se o zip realmente existe
            fs.unlink(zip_file, (err) =>{
                if(err){
                    console.log(err);
                }
            });
        }else{
            console.log('ZIP do usuário não existe');
        }

        // Deleta a pasta e os arquivos do usuário
        const user_files = path.join(__dirname,`src/temp_pictures/${id_user}`);
        if(fs.existsSync(user_files)){// Verifica se a pasta realmente existe
            fs.rm( user_files, { recursive: true, force: true}, err =>{
                if(err){
                    console.log(err);
                }
            });
        }else{
            console.log('Arquivo do usuário não existe');
        }


        res.status(200).send('Arquivos e ZIP deletado com sucesso');
    }catch(error){
        console.log(error);
    }
})

app.use(express.static(path.join(__dirname, 'src')));

app.post('/files/:key/:type/:width/:height',upload.array('files'), async(req,res) =>{
    const fileUploadData: FileUploadMQInterface = {
        file: req.files,
        key: req.params.key,
        type: req.params.type,
        width: parseInt(req.params.width, 10),
        height: parseInt(req.params.height, 10)
    };

    try{
        
        const result = await UploadMq.uploadFile(fileUploadData);
        res.status(200).send(result);
      
    }catch(err){
        res.status(500).send('Erro interno no servidor');
    }
    
})

app.listen(3333, () => console.log('Server running on port 3333'));