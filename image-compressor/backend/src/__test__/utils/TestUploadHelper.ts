import * as fs from 'fs';
import path from 'path';
import FileUploadMQ from '../../RabbitMQ/Publisher/FileUploadMQ';


const uploadMQ = new FileUploadMQ();
const zipPath = path.join('./src/temp_zip_files/userTeste.zip');

const imageBuffer1 = fs.readFileSync('./src/__test__/assets/userTeste_cat2.png');
const imageBuffer2 = fs.readFileSync('./src/__test__/assets/userTeste_mickey.png');
const imageBuffer3 = fs.readFileSync('./src/__test__/assets/userTeste_littlecat.jpeg');
const imageBuffer4 = fs.readFileSync('./src/__test__/assets/userTeste_11576965591711520535.svg');



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

const fakeFile2: Express.Multer.File | File[] | undefined = {
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

const fakeFile3: Express.Multer.File | File[] | undefined = {
    fieldname: 'file',
    originalname: 'userTeste_littlecat.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: imageBuffer3.length,
    buffer: imageBuffer3,
    stream: fs.createReadStream('./src/__test__/assets/userTeste_littlecat.jpeg'),
    destination: '',
    filename: '',
    path: '',
}


const fakeFile4: Express.Multer.File | File[] | undefined = {
    fieldname: 'file',
    originalname: 'userTeste_11576965591711520535.svg',
    encoding: '7bit',
    mimetype: 'image/svg+xml',
    size: imageBuffer4.length,
    buffer: imageBuffer4,
    stream: fs.createReadStream('./src/__test__/assets/userTeste_11576965591711520535.svg'),
    destination: '',
    filename: '',
    path: '',
}


const mockFiles = [fakeFile1, fakeFile2, fakeFile3, fakeFile4];


export const uploadFile = async (key: string,type: string,width: number,height: number) => {

    const fileData = {
        file: mockFiles ,
        key: key,
        type: type,
        width: width,
        height: height
    }

    await uploadMQ.uploadFile(fileData);
}

export const getZipPath = () => zipPath;
export const getImage = () => fakeFile1;