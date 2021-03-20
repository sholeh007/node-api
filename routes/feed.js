import express from "express";
import controllerFeedback from "../controller/Feed.js";
import validation from "../helper/validation.js";
import middleware from "../middleware/file-large.js";

const router = express.Router();

router.get("/posts", controllerFeedback.getfeed);
router.post(
  "/sendPost",
  validation.feedPost,
  middleware,
  controllerFeedback.postFeed
);
router.get("/post/:postId", controllerFeedback.getPost);

export default router;
