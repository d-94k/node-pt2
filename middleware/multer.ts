import multer from "multer";

export const multerOptions = {};

const storage = multer.diskStorage ({
    destination: "uploads/"
});

export const initMulterMiddleware = () => {
    return multer ({ storage, ...multerOptions })
};