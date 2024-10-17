//Dependecies
import cors from "cors";
import express from 'express';

//Imports archives
import FileUploadMQ from './src/Consumer/FileUploadMQ.ts';

// const UploadMq = new FileUploadMQ;

const app = express();
app.use(express.json());
app.use(cors());

//Aqui chama o arquivo do RabbitMQ

app.get('/files',async (req,res) =>{
    //Aqui você faria uma chamada ao RabbitMQ para buscar os arquivos compactados
    //E retornaria esses dados para a API
    // await UploadMq.uploadFile(req,res);
    console.log("Call the patch method!");
})


app.listen(3333, () => console.log('Server running on port 3333'));