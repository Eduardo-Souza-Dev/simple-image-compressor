import {describe, expect, it, jest, beforeAll, afterAll} from '@jest/globals';
import sharp from 'sharp';
import * as fs from 'fs'
import { uploadFile } from './utils/TestUploadHelper';

describe('ConvertFilesPNG', () => {   
    beforeAll(async () => {
        await uploadFile('convert','png',0,0);
    });


    it('should return if the file has converted to png',async () =>{
    
        if(fs.existsSync('./src/temp_pictures/userTeste/userTeste_littlecat.png')){
        await sharp('./src/temp_pictures/userTeste/userTeste_littlecat.png')
        .metadata()
        .then((metadata) => {
            expect(metadata.format).toBe('png');
        });

        }
    
    });



})


