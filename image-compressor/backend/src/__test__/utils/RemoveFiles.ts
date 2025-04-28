import * as fs from 'fs'

export default async function removeFiles() {

    fs.unlinkSync('./src/temp_zip_files/userTeste.zip');

    await fs.promises.rm('./src/temp_pictures/userTeste', { recursive: true, force: true });
  
}    

