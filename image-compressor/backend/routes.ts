//Dependecies
import cors from "cors";
import express from 'express';
import multer from "multer"

const storage = multer.memoryStorage();
const upload  = multer({storage: storage});


//Imports archives
import FileUploadMQ from './src/RabbitMQ/Publisher/FileUploadMQ';

const UploadMq = new FileUploadMQ;



console.log(UploadMq);
const app = express();
app.use(express.json());
app.use(cors());

//Aqui chama o arquivo do RabbitMQ

app.post('/files/:key',upload.array('file'),async (req,res) =>{
    //Aqui você faz uma chamada ao RabbitMQ para buscar os arquivos compactados
    //E retorna esses dados para o publisher
    const files = req.files as Express.Multer.File[];
    if (files) {
        files.forEach(file => {
            console.log(`Nome do arquivo: ${file.originalname}`);
            console.log(`Tipo MIME: ${file.mimetype}`);
            console.log(`Tamanho: ${file.size}`);
            console.log(`Buffer:`, file.buffer); // Buffer contendo os dados do arquivo
        });
    }
    const key = req.params.key;
    await UploadMq.uploadFile(files,res,key);
})


app.listen(3333, () => console.log('Server running on port 3333'));