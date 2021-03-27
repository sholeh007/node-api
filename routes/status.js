import express from "express";
import isAuth from "../middleware/is-auth.js";
import controllerStatus from "../controller/Status.js";
import validation from "../helper/validation.js";

const router = express.Router();

router
  .route("/status")
  .all(isAuth)
  .get(controllerStatus.index)
  .all(validation.status)
  .patch(controllerStatus.updateStatus);

export default router;
