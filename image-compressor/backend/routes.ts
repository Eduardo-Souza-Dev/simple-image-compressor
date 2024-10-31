//Dependecies
import cors from "cors";
import express from 'express';


//Imports archives
import FileUploadMQ from './src/RabbitMQ/Publisher/FileUploadMQ';

const UploadMq = new FileUploadMQ;



console.log(UploadMq);
const app = express();
app.use(express.json());
app.use(cors());

//Aqui chama o arquivo do RabbitMQ

app.post('/files/:key',async (req,res) =>{
    //Aqui você faz uma chamada ao RabbitMQ para buscar os arquivos compactados
    //E retorna esses dados para o publisher
    const file = req.body;
    // const key = req.params.key;
    await UploadMq.uploadFile(file,res);
})


app.listen(3333, () => console.log('Server running on port 3333'));