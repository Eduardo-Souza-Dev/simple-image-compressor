import JSZip from "jszip";
import FileSaver from 'file-saver';
import * as fs from 'node:fs';



class ZipeFiles{
     async zipFiles(){
        const zip = JSZip();

        zip.file("Hello.txt", "Hello World\n");

        const img = zip.folder("images");


        img?.file("smile.gif", URL.createObjectURL(new Blob([new Uint8Array()], {type: 'image/gif'})), {base64: true});
        
        zip.generateAsync({type:"nodebuffer"}).then(function(content) {
            //Salvando zip em folder temporario
            fs.writeFileSync("../../temp_zip_files/example.zip", content)
        });
        
    }
}

export default ZipeFiles;