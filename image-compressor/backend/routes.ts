//Dependecies
import cors from "cors";
import express from 'express';
import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";


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

app.get('/download',upload.array('files'), async(req, res) =>{
    const file = path.join(__dirname,'files', req.params.file);
    console.log("Valor do __dirname: " + __dirname);
    res.download(file , (err) =>{
        if(err){
            console.log(err);
        }else{
            console.log("Arquivo baixado com sucesso!");
            res.status(200).send("Arquivo enviado para compressão");
        }
    })
})

app.use(express.static(path.join(__dirname, 'src')));

app.post('/files/:key',upload.array('files'), async(req,res) =>{
    const files = req.files;
    const key = req.params.key;
    await UploadMq.uploadFile(files,res,key);
})

app.get('/files/zip',async(req,res) =>{
    //Aqui vou chamar a classe responsável por lidar com processo de zipagem dos arquivos
    try {
        console.log("Api esta sendo chamada!")
        res.send("Valor de teste")
        // zipeFiles.zipFiles(res);
    } catch (err) {
        console.error("Erro ao gerar ZIP:", err);
        res.status(500).send("Erro ao gerar ZIP");
    }
})


app.listen(3333, () => console.log('Server running on port 3333'));