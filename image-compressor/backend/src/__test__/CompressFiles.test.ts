import {describe, expect, it, jest, beforeAll, afterAll} from '@jest/globals';
import * as fs from 'fs'
import { uploadFile, getImage } from './utils/TestUploadHelper';

describe('CompressFiles', () => {
    const fakeFile = getImage();

    beforeAll(async () => {
        await uploadFile('compress','none',0,0);
    });

   it('should return if the file has been compressed',async () =>{

        const newFile = fs.statSync('./src/temp_pictures/userTeste/userTeste_uuidrandom_mickey.png');
        const newFileSize = newFile.size / (1024*1024);
        const compareFile = (fakeFile.size / (1024 * 1024)) > newFileSize;
        expect(compareFile).toBe(true);
 
     });


})