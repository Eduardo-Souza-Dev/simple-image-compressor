//Dependecies
import cors from "cors";
import express from 'express';
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() });

//Imports archives
import FileUploadMQ from './src/RabbitMQ/Publisher/FileUploadMQ';
import ZipeFiles from "@/ZipeFIles";

const UploadMq = new FileUploadMQ;
const zipeFiles = new ZipeFiles;

const app = express();
app.use(express.json());
app.use(cors());

//Aqui chama o arquivo do RabbitMQ

app.post('/files/:key',upload.array('files'), async(req,res) =>{
    const files = req.files;
    const key = req.params.key;
    await UploadMq.uploadFile(files,res,key);
})

app.post('/files/:key',async(req,res) =>{
    await zipeFiles.zipFiles();
    //Aqui vou chamar a classe responsável por lidar com processo de zipagem dos arquivos
})


app.listen(3333, () => console.log('Server running on port 3333'));