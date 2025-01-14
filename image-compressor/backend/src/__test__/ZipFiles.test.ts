import {describe, expect, test, it, jest, afterEach, beforeEach} from '@jest/globals';
import ZipeFiles from "../ZipeFIles";
import JSZip from "jszip";
import * as fs from 'node:fs';
import path from "node:path";
import sinon from 'sinon';

jest.mock('node:fs', () =>{
    return {
        readdir: jest.fn(),
        readFileSync: jest.fn(),
        writeFileSync: jest.fn()
    }
});



describe('ZipFiles', () => {
    const zipper = new ZipeFiles();
    // let readdirStub: sinon.SinonStub;
    // let readFileStub: sinon.SinonStub;

    // beforeEach(() => {
    //     readdirStub = sinon.stub(fs, "readdir");
    //     readFileStub = sinon.stub(fs, "readFile");
    // });

    // afterEach(() => {
    //     readdirStub.restore();
    //     readFileStub.restore();
    // });

    describe('async zipFiles' , () => {
        it('should return a file zipped', async () =>{
            const mockZip = new ZipeFiles;
            const result = await mockZip.zipFiles();
            expect(result).toEqual('example.zip');
        });
    });
})