import multer from "multer";
import mime from "mime";
import { randomUUID } from "crypto";

export const multerOptions = {};

export const generatePhotoFileName = (mimeType: string) => {
    return "" + randomUUID () + "-" + Date.now () + "." + mime.getExtension (mimeType);
}

const storage = multer.diskStorage ({
    destination: "uploads/",
    filename: (request, file, callback) => {
        return callback (null, generatePhotoFileName (file.mimetype));
    }
});

export const initMulterMiddleware = () => {
    return multer ({ storage, ...multerOptions })
};