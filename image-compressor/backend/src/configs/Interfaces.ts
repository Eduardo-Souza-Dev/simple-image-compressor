interface Image{
    buffer: string;
    originalname: string;
    mimetype: string;
}

interface FileUploadMQInterface {
    file: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[] | undefined;
    key: string;
    type: string | '';
    width: number | '';
    height: number | '';
}


export type { Image, FileUploadMQInterface };