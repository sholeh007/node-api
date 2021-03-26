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
router
  .route("/post/:postId")
  .get(controllerFeedback.getPost)
  .delete(controllerFeedback.deletePost)
  .all(validation.feedPost)
  .put(controllerFeedback.updatePost);

export default router;
