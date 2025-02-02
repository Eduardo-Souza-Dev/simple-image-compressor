import {describe, expect, test, it, jest, afterEach, beforeEach, afterAll} from '@jest/globals';
import * as fs from 'fs'
import path from "node:path";
import * as httpMocks from 'node-mocks-http' 

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
    const mockBuffer = JSON.stringify(Buffer.from('fake data', 'utf-8'))


    describe('POST /files/:key' , () => {
        it('should return if the files has been send correct', () =>{

           

                const imageBuffer1 = fs.readFileSync('./src/__test__/assets/image003.png');
                const imageBuffer2 = fs.readFileSync('./src/__test__/assets/mickey.png');
               
                const originalName1 = path.basename('./src/__test__/assets/mickey.png');
                const originalName2 = path.basename('./src/__test__/assets/image003.png');

                     // Serializa o objeto em JSON
                const file = {
                    originalname: originalName1,
                    mimetype: 'image/png',
                    size:imageBuffer1.length,
                    buffer: imageBuffer1.toString('base64') // Buffer em Base64 para compatibilidade
                };

                const file2 = {
                    originalname: originalName2,
                    mimetype: 'image/png',
                    size:imageBuffer2.length,
                    buffer: imageBuffer2.toString('base64') // Buffer em Base64 para compatibilidade
                }

                const mockFiles = [file, file2];

                const mockExpressRequest = httpMocks.createRequest({
                    method: 'GET',
                    url: '/files/:key',
                    params: {
                        key: 'compress'
                    },
                });
    
                const mockExpressResponse = httpMocks.createResponse();
    
                uploadMQ.uploadFile(mockFiles, mockExpressRequest.params.key);
                const data = mockExpressResponse._getData();
                console.log(data);
    
                // Trocar o teste para ser direto na API e não na função!
            
                expect(uploadMQ.uploadFile(mockFiles, mockExpressRequest.params.key)).toEqual("All files have been compressed");
            

    

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