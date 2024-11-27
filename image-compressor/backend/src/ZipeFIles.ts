import JSZip from "jszip";
import FileSaver from 'file-saver';

class ZipeFiles{
     async zipFiles(/*files: any,*/ res:any){
        const teste = "Valor de teste da API";
        res.json(teste);
        // console.log("Zipando arquivos");
        // const file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
        // FileSaver.saveAs(file);
        // const zip = JSZip();

        // zip.file("Hello.txt", "Hello World\n");

        // const img = zip.folder("images");

        // img?.file("smile.gif", URL.createObjectURL(new Blob([new Uint8Array()], {type: 'image/gif'})), {base64: true});
        
        // zip.generateAsync({type:"blob"}).then(function(content) {
        //     // see FileSaver.js
        //    return FileSaver.saveAs(content, "example.zip");
        // });
        
    }
}

export default ZipeFiles;