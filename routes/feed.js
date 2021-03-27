import express from "express";
import controllerFeedback from "../controller/Feed.js";
import validation from "../helper/validation.js";
import fileLarge from "../middleware/file-large.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.get("/posts", isAuth, controllerFeedback.getfeed);
router.post(
  "/sendPost",
  isAuth,
  validation.feedPost,
  fileLarge,
  controllerFeedback.postFeed
);
router
  .route("/post/:postId")
  .all(isAuth)
  .get(controllerFeedback.getPost)
  .delete(controllerFeedback.deletePost)
  .all(validation.feedPost)
  .put(controllerFeedback.updatePost);

export default router;
