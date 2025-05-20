import {describe, expect, it, jest, beforeAll, afterAll} from '@jest/globals';
import sharp from 'sharp';
import * as fs from 'fs'
import { uploadFile } from './utils/TestUploadHelper';

describe('ConvertFilesJPEG', () => {   
    beforeAll(async () => {
        await uploadFile('convert','jpeg',0,0);
    });


    it('should return if the file has converted to jpeg',async () =>{

        if(fs.existsSync('./src/temp_pictures/userTeste/userTeste_uuidrandom_mickey.jpeg')){
            await sharp('./src/temp_pictures/userTeste/userTeste_uuidrandom_mickey.jpeg')
            .metadata()
            .then((metadata) => {
                expect(metadata.format).toBe('jpeg');
            });

        }

    });


})