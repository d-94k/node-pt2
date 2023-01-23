import multer from "multer";
import mime from "mime";
import { randomUUID } from "crypto";

const MAX_SIZE = 6 * 1024 * 1024;
const VALID_IMG_TYPES = ["image/png", "image/jpeg"];

const fileFilter : multer.Options["fileFilter"] = (request, file, callback) => {
    if (VALID_IMG_TYPES.includes(file.mimetype)) {
        callback (null, true);
    } else {
        callback (new Error ("uploaded file must be a png or jpeg image"))
    }
}

export const multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }
};

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