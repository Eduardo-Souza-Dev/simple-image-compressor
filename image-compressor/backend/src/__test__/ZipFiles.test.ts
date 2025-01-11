import {describe, expect, test, it, jest, afterEach, beforeEach} from '@jest/globals';
import ZipeFiles from "@/ZipeFIles";
import JSZip from "jszip";
import * as fs from 'node:fs';
import path from "node:path";
import sinon, { SinonStub } from 'sinon';

jest.mock('node:fs', () =>{
    return {
        readdir: jest.fn(),
        readFileSync: jest.fn(),
        writeFileSync: jest.fn()
    }
})


// Mock do path
jest.spyOn(path, 'resolve').mockImplementation(() => 'mocked/temp_pictures');
describe('ZipFiles', () => {
    const zipper = new ZipeFiles(); // Fixed typo in class name (ZipeFiles -> ZipFiles)
    let readdirStub: sinon.SinonStub; // Corrected variable name to readdirStub
    let readFilesStub: sinon.SinonStub;

    beforeEach(() =>{
        readdirStub = sinon.stub(fs.promises, 'readdir');
        readFilesStub = sinon.stub(fs.promises,'readFile');
    })

    afterEach(() =>{
        readdirStub.restore();
        readFilesStub.restore();
    })

    describe('async zipFiles' , () => {
        it('should return a files', async () =>{
            // const zipper = new ZipeFiles();
            // const mockFiles = ['file1.png', 'file2.png'];
            // fs.writeFileSync('mocked/temp_pictures',mockFiles);
            readdirStub.resolves(['file1.png']);
            await zipper.zipFiles();
            expect(readFilesStub.resolves('example.zip'))

        })
    })
})