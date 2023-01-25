import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpError } from "../models/http-error";

const prisma = new PrismaClient ();

export const getUsers = async (request: Request, response: Response) => {
    const users = await prisma.user.findMany ();
    response.json (users);
}


export const createUser = async (request: Request, response: Response, next: NextFunction) => {
    const Error = validationResult (request);
    if (!Error.isEmpty()) {
        return next(new HttpError ("invalid user", 422));
    }
    const { username, password } = request.body;
    
    const createdUser = await prisma.user.create ({
        data: {
            username: username,
            password: password
        }
    });
    response.json (createdUser);
}

export const updateUser = async (request: Request, response: Response) => {
    const { id, username } = request.body;
    const updatedUser = await prisma.user.update ({
        where: {
            id: id
        },
        data: {
            username: username
        }
    });
    response.json (updatedUser);
}

export const deleteUser = async (request: Request, response: Response) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: +request.params.id
        }
    });
    response.json (deletedUser)
}

export const uploadPicture = async (request: Request, response: Response, next: NextFunction) => {
    if (!request.file) {
        return next ("no photo uploaded");
    }
    const filePhotoName = request.file.filename;
    try {
        await prisma.user.update ({
            where: {
                id: +request.params.id
            },
            data: {
                filePhotoName
            }
        })
    } catch (error) {
        next ("cannot post picture");
    }
}