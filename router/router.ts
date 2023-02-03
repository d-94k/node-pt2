import express from "express";
import { check } from "express-validator";
import { createUser, deleteUser, getUsers, updateUser, uploadPicture } from "../controllers/user-controllers";
import { initMulterMiddleware } from "../middleware/multer";
import { checkAuthorization } from "../middleware/passport";

export const router = express.Router ();

router.get ("/", getUsers);
router.post ("/", checkAuthorization, [check("username").not().isEmpty(), check("password").isLength({min: 5, max: 20})], createUser);
router.put ("/", checkAuthorization, updateUser);
router.delete ("/:id", checkAuthorization, deleteUser);
router.post ("/:id/photo", checkAuthorization, initMulterMiddleware().single("photo"), uploadPicture);
router.use ("/photos", express.static ("uploads"));
