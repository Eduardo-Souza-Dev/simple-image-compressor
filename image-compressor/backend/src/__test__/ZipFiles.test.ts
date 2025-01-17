import {describe, expect, test, it, jest, afterEach, beforeEach, afterAll} from '@jest/globals';
import * as fs from 'fs/promises';
import path from "node:path";
import * as httpMocks from 'node-mocks-http' 

import FileUploadMQ from '../RabbitMQ/Publisher/FileUploadMQ';

jest.mock('fs');

jest.mock('fs/promises', () => ({
    readdir: jest.fn(),
    writeFileSync: jest.fn(),
  }));
  
  afterEach(() => {
    jest.clearAllMocks();
  });


const response = httpMocks.createResponse();
const responsejson = response.json();

describe('ZipFiles', () => {
    const uploadMQ = new FileUploadMQ();
    const mockBuffer = Buffer.from('fake data', 'utf-8')

    describe('POST /files/:key' , () => {
        it('should return if the files has been send correct', () =>{

            const valuesFiles = {
                params:  "compress",    
                files: [{
                    fieldname: 'files',
                    originalname: 'teste1.png',
                    mimetype: 'image/png',
                    size: 1024,
                    buffer: mockBuffer
                },        
                {
                    fieldname: 'files',
                    originalname: 'teste2.png',
                    mimetype: 'image/png',
                    size: 1024,
                    buffer: mockBuffer
                }],
            };

            expect(uploadMQ.uploadFile(valuesFiles.files, response, valuesFiles.params)).toEqual("Arquivos enviados com sucesso!");
            
            

            response.on('close', () =>{
                expect(response._getData()).toEqual("Arquivos enviados com sucesso!");
            })

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