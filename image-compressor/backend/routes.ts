//Dependecies
import cors from "cors";
import express from 'express';
import multer from "multer";
import JSZip from "jszip";


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

app.get('/files/zip',async(req,res) =>{
    // await zipeFiles.zipFiles();
    //Aqui vou chamar a classe responsável por lidar com processo de zipagem dos arquivos
    try {
        const zip = new JSZip();

        // Adicionando arquivos ao ZIP dinamicamente
        zip.file("file1.txt", "Hello World!");
        zip.file("file2.txt", "Another file content");

        // Gerando o ZIP em memória como buffer
        const content = await zip.generateAsync({ type: "nodebuffer" });

        // Configurando cabeçalhos HTTP para forçar o download
        res.set({
            "Content-Type": "application/zip",
            "Content-Disposition": 'attachment; filename="example.zip"',
        });

        // Enviando o arquivo diretamente ao cliente
        res.send(content);
    } catch (err) {
        console.error("Erro ao gerar ZIP:", err);
        res.status(500).send("Erro ao gerar ZIP");
    }
})


app.listen(3333, () => console.log('Server running on port 3333'));