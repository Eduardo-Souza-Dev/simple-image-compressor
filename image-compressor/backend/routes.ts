//Dependecies
import cors from "cors";
import express from 'express';
import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import * as fs from 'node:fs';


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

app.use(express.static(path.join(__dirname, 'src')));

app.post('/files/:key',upload.array('files'), async(req,res) =>{
    const files = req.files;
    const key = req.params.key;

    try{
        
        const result = await UploadMq.uploadFile(files,key);
        res.status(200).send(result);
      
    }catch(err){
        res.status(500).send('Generic error');
    }
    
})

app.listen(3333, () => console.log('Server running on port 3333'));