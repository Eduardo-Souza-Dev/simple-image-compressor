import * as fs from 'fs';
import path from 'path';
import FileUploadMQ from '../../RabbitMQ/Publisher/FileUploadMQ';


const uploadMQ = new FileUploadMQ();
const zipPath = path.join('./src/temp_zip_files/userTeste.zip');

const imageBuffer1 = fs.readFileSync('./src/__test__/assets/userTeste_cat2.png');
const imageBuffer2 = fs.readFileSync('./src/__test__/assets/userTeste_mickey.png');


const fakeFile1: Express.Multer.File | File[] | undefined = {
    fieldname: 'file',
    originalname: 'userTeste_cat2.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: imageBuffer1.length,
    buffer: imageBuffer1,
    stream: fs.createReadStream('./src/__test__/assets/userTeste_cat2.png'),
    destination: '',
    filename: '',
    path: '',
};

const fakeFile2 = {
    fieldname: 'file',
    originalname: 'userTeste_mickey.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: imageBuffer2.length,
    buffer: imageBuffer2,
    stream: fs.createReadStream('./src/__test__/assets/userTeste_mickey.png'),
    destination: '',
    filename: '',
    path: '',
}

const mockFiles = [fakeFile1, fakeFile2];

const fileData = {
    file: mockFiles ,
    key: 'compress',
    type: 'none',
    width: 0,
    height: 0
}

export const uploadFile = async () => {
    await uploadMQ.uploadFile(fileData);
}

export const cleanTestFiles = async () =>{

        // If you want to see the files an the zip that are being deleted, you can uncomment the lines below
        if(fs.existsSync('./src/temp_pictures/userTeste/userTeste_cat2.png') && fs.existsSync('./src/temp_pictures/userTeste/userTeste_mickey.png')){
            fs.unlinkSync('./src/temp_pictures/userTeste/userTeste_cat2.png');
            fs.unlinkSync('./src/temp_pictures/userTeste/userTeste_mickey.png');
        }
    
        // this is to remove the zip file userTeste.zip
        if(fs.existsSync('./src/temp_zip_files/userTeste.zip')){
            fs.unlinkSync('./src/temp_zip_files/userTeste.zip');
        }
    
        // this is to remove the folder temp_pictures/userTeste
        try 
        {
            await fs.promises.rm('./src/temp_pictures/userTeste', { recursive: true, force: true });
        }catch (err) {
            console.error('Erro ao remover a pasta:', err);
        }
        
};

export const getZipPath = () => zipPath;