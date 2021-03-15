import express from "express";
import controllerFeedback from "../controller/Feed.js";

const router = express.Router();

router.get("/posts", controllerFeedback.getfeed);
router.post("/sendPost", controllerFeedback.postFeed);

export default router;
