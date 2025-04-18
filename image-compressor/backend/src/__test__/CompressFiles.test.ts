import {describe, expect, it, jest, beforeAll, afterAll} from '@jest/globals';
import * as fs from 'fs'
import JSZip from "jszip";
import { cleanTestFiles, getZipPath, uploadFile } from './utils/TestUploadHelper.test';

describe('CompressFiles', () => {
    beforeAll(async () => {
        await uploadFile();
    });

    afterAll(async () =>{
        jest.clearAllMocks();
        await cleanTestFiles();
    })

//    it('should create a file compressed', async () => {

//    })


})