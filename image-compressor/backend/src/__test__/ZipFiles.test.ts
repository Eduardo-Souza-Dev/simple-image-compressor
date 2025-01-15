import {describe, expect, test, it, jest, afterEach, beforeEach} from '@jest/globals';
import * as fs from 'fs/promises';
import path from "node:path";

import FileUploadMQ from '../RabbitMQ/Publisher/FileUploadMQ';

jest.mock('fs');

jest.mock('fs/promises', () => ({
    readdir: jest.fn(),
    writeFileSync: jest.fn(),
  }));



describe('ZipFiles', () => {
    const uploadMQ = new FileUploadMQ();
    const mockBuffer = Buffer.from('fake data', 'utf-8')

    describe('POST /files/:key' , () => {
        it('should return if the files has been created', async () =>{

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
                res: Response,

            };

            expect(uploadMQ.uploadFile(valuesFiles.files, valuesFiles.res, valuesFiles.params)).toEqual("Arquivos enviados com sucesso!");

        });
    });
})