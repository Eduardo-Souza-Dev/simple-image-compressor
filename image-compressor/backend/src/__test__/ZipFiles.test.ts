import {describe, expect, test, it, jest, afterEach, beforeEach, afterAll} from '@jest/globals';
import * as fs from 'fs'
import path from 'path';
import FileUploadMQ from '../RabbitMQ/Publisher/FileUploadMQ';

// jest.mock('fs');

// jest.mock('fs/promises', () => ({
//     readdir: jest.fn(),
//     writeFileSync: jest.fn(),
//     readFile: jest.fn(),
//   }));
  
  afterEach(() => {
    jest.clearAllMocks();
  });


describe('ZipFiles', () => {
    const uploadMQ = new FileUploadMQ();

    describe('POST /files/:key' , () => {
        it('should return if the files has been send ziped',async () =>{

                const zipPath = path.join('./src/temp_zip_files/userTeste.zip');
                const imageBuffer1 = fs.readFileSync('./src/__test__/assets/userTeste_image003.png');
                const imageBuffer2 = fs.readFileSync('./src/__test__/assets/userTeste_mickey.png');

                const fakeFile1: Express.Multer.File | File[] | undefined = {
                    fieldname: 'file',
                    originalname: 'userTeste_image003.png',
                    encoding: '7bit',
                    mimetype: 'image/png',
                    size: imageBuffer1.length,
                    buffer: imageBuffer1,
                    stream: fs.createReadStream('./src/__test__/assets/userTeste_image003.png'),
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
        
                await uploadMQ.uploadFile(fileData);

                const zipExists = fs.existsSync(zipPath);
                expect(zipExists).toBe(true);

        });
    });

    
    // describe('CompressFiles.ts' , () => {
    //     it('should return the files compressed in the folder temp_pictures', async () =>{

    //         const valuesFiles = {
    //             params:  "compress",    
    //             files: [{
    //                 fieldname: 'files',
    //                 originalname: 'teste1.png',
    //                 mimetype: 'image/png',
    //                 size: 1024,
    //                 buffer: mockBuffer
    //             },        
    //             {
    //                 fieldname: 'files',
    //                 originalname: 'teste2.png',
    //                 mimetype: 'image/png',
    //                 size: 1024,
    //                 buffer: mockBuffer
    //             }],
    //         };

    //         response.on('close', () =>{
    //             expect(response._getData()).toEqual("Arquivos enviados com sucesso!");
    //         })

    //     });
    // });
})