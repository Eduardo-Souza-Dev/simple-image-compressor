import {describe, expect, it, jest, beforeAll, afterAll} from '@jest/globals';
import * as fs from 'fs'
import JSZip from "jszip";
import { getZipPath, uploadFile } from './utils/TestUploadHelper';
  
describe('ZipFiles', () => {
    const zipPath = getZipPath();

    beforeAll(async () => {
        jest.clearAllMocks();
        await uploadFile('compress','none',0,0);
    });

    it('should return if the files has been send ziped',async () =>{
        
            const zipExists = fs.existsSync(zipPath);
            expect(zipExists).toBe(true);

    });


    it('should return if the files has been send to the ziped file',async () =>{

            const zip = await JSZip.loadAsync(fs.readFileSync(zipPath));
            const zipFileNames = Object.keys(zip.files);
            const expectedFileNames = [ 
               "11576965591711520535.svg", 
               "cat2.png", 
               "littlecat.jpeg", 
               "mickey.png"
            ];
            expect(zipFileNames).toEqual(expect.arrayContaining(expectedFileNames));
            expect(zipFileNames.length).toBe(expectedFileNames.length);

    });


    
})