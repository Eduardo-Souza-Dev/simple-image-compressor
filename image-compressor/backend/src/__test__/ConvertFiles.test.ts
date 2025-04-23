import {describe, expect, it, jest, beforeAll, afterAll} from '@jest/globals';
import sharp from 'sharp';
import { cleanTestFiles, uploadFile } from './utils/TestUploadHelper.test';

describe.only('ConvertFiles', () => {   
    // beforeAll(async () => {
    // });


    it('should return if the file has converted to jpeg',async () =>{
        await uploadFile('convert','jpeg',0,0);

        await sharp('./src/temp_pictures/userTeste/userTeste_mickey.jpeg')
        .metadata()
        .then((metadata) => {
            expect(metadata.format).toBe('jpeg');
        });

    });

    // it('should return if the file has converted to svg',async () =>{
    //     await uploadFile('convert','svg',0,0);

    //     await sharp('./src/temp_pictures/userTeste/userTeste_mickey.svg')
    //     .metadata()
    //     .then((metadata) => {
    //         expect(metadata.format).toBe('svg');
    //     });

    // });


    afterAll(async () =>{
        jest.clearAllMocks();
        await cleanTestFiles();
    })


})