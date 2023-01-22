import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "./models/http-error";
import { router } from "./router/router";
import { initMulterMiddleware } from "./middleware/multer";

const app = express ();

app.use (express.json());
app.use ("/", router);
app.use (() => {throw new HttpError ("page not found", 404)});
app.use ((error: any, request: Request, response: Response, next: NextFunction) => {
    if (response.headersSent) {
        return next (error);
    }
    response.status (error.code || 500);
    response.json ({error: error.message || "unknown error"});
})

app.listen (3003, () => console.log ("server running at 3003"));