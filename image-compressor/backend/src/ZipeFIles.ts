import JSZip, { forEach } from "jszip";
import FileSaver from 'file-saver';
import * as fs from 'node:fs';



class ZipeFiles{
     async zipFiles(images:any, nameImage:string){
        const zip = JSZip();
        const img = zip.folder("images");
        const imagesBuffer = Buffer.from(images);
        const uint8Array = new Uint8Array(images);
        const blob = new Blob([uint8Array], {type: 'image/jpeg'});
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl);
        img?.file(nameImage, imageUrl, {base64: true});

        // img?.file(nameImage, URL.createObjectURL(new Blob([new Uint8Array(imagesBuffer)], {type: 'image/jpeg'})), {base64: true});
        
        zip.generateAsync({type:"nodebuffer"}).then(function(content) {
            //Salvando zip em folder temporario
            fs.writeFileSync("../../temp_zip_files/example.zip", content)
        });
        
    }
}

export default ZipeFiles;