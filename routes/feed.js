import express from "express";
import controllerFeedback from "../controller/Feed.js";
import validation from "../helper/validation.js";

const router = express.Router();

router.get("/posts", controllerFeedback.getfeed);
router.post("/sendPost", validation.feedPost, controllerFeedback.postFeed);

export default router;
