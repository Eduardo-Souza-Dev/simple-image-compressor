import {describe, expect, it, jest, beforeAll, afterAll} from '@jest/globals';
import * as fs from 'fs'
import JSZip from "jszip";
import { cleanTestFiles, getZipPath, uploadFile } from './utils/TestUploadHelper.test';
  
describe('ZipFiles', () => {
    const zipPath = getZipPath();

    beforeAll(async () => {
        await uploadFile();
    });

    afterAll(async () =>{
        jest.clearAllMocks();
        await cleanTestFiles();
    })

    it('should return if the files has been send ziped',async () =>{
        
            const zipExists = fs.existsSync(zipPath);
            expect(zipExists).toBe(true);

    });

    it('should return if the files has been send to the ziped file',async () =>{

            const zip = await JSZip.loadAsync(fs.readFileSync(zipPath));
            const zipFileNames = Object.keys(zip.files);
            const expectedFileNames = ['userTeste_cat2.png', 'userTeste_mickey.png'];
            expect(zipFileNames).toEqual(expect.arrayContaining(expectedFileNames));
            expect(zipFileNames.length).toBe(expectedFileNames.length);

    });
    
})