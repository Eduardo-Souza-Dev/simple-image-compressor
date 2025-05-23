import {describe, expect, it, jest, beforeAll, afterAll} from '@jest/globals';
import sharp from 'sharp';
import { uploadFile } from './utils/TestUploadHelper';

describe('ReiszeFiles', () => {
    beforeAll(async () => {
        await uploadFile('resize','none',100,100);
    });

   it('should return if the file has been resized to 100x100',async () =>{

        await sharp('./src/temp_pictures/userTeste/userTeste_uuidrandom_mickey.png')
        .metadata()
        .then((metadata) => {
            expect(metadata.width).toBe(100);
            expect(metadata.height).toBe(100);
        });
 
     });


})