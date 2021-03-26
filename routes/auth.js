import express from "express";
import controllerAuth from "../controller/Auth.js";
import validation from "../helper/validation.js";

const router = express.Router();

router.put("/signup", validation.signup, controllerAuth.signup);

export default router;
