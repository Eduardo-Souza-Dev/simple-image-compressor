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
    const files = req.files;
    const params = {
        file: req.files,
        key: req.params.key,
        type: req.params.type,
        width: req.params.width,
        height: req.params.height
    }

    try{
        
        const result = await UploadMq.uploadFile(params);
        res.status(200).send(result);
      
    }catch(err){
        res.status(500).send('Erro interno no servidor');
    }
    
})

app.listen(3333, () => console.log('Server running on port 3333'));