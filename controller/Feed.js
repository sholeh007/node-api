import { validationResult } from "express-validator";
import postModel from "../models/postModel.js";

function forwardError(err, next) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}

const feed = {
  async getfeed(req, res, next) {
    try {
      const data = await postModel.find();
      res.status(200).json({ posts: data });
    } catch (err) {
      forwardError(err, next);
    }
  },
  async postFeed(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("validation failed");
      error.statusCode = 422;
      next(error);
    }

    const title = req.body.title;
    const content = req.body.content;
    const post = new postModel({
      title,
      content,
      imageUrl: "asset/img/Ping.png",
      creator: { name: "saya" },
    });

    try {
      const savePost = await post.save();
      res.status(201).json({
        message: "Post created succesfully",
        post: savePost,
      });
    } catch (err) {
      forwardError(err, next);
    }
  },
  async getPost(req, res, next) {
    const postId = req.params.postId;

    try {
      const dataPost = await postModel.findById(postId);
      if (!dataPost) {
        const error = new Error("Could not find post");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "success", post: dataPost });
    } catch (err) {
      forwardError(err, next);
    }
  },
};

export default feed;
