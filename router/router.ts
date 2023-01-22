import express from "express";
import { check } from "express-validator";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/user-controllers";

export const router = express.Router ();

router.get ("/", getUsers);
router.post ("/", [check("username").not().isEmpty(), check("password").isLength({min: 5, max: 20})], createUser);
router.put ("/", updateUser);
router.delete ("/:id", deleteUser);