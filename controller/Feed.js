import fs from "fs/promises";
import path from "path";
import { validationResult } from "express-validator";
import postModel from "../models/postModel.js";
import __dirname from "../helper/path.js";

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
      await fs.unlink(req.file.path);
      return res.status(422).json({ message: "validation failed" });
    }

    if (!req.file) {
      await fs.unlink(req.file.path);
      return res.status(422).json({ message: "No image provided" });
    }

    const title = req.body.title;
    const content = req.body.content;
    const image = req.file.path.replace(/\\/g, "/");
    const imageUrl = image.replace("asset/img", "image");

    const post = new postModel({
      title,
      content,
      imageUrl,
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
  async updatePost(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await fs.unlink(req.file.path);
      return res.status(422).json({ message: "validation failed" });
    }
    const id = req.params.postId;
    const { title, content } = req.body;
    let image = req.body.image;
    let imageUrl;

    if (req.file) {
      image = req.file.path.replace(/\\/g, "/");
      imageUrl = image.replace("asset/img", "image");
    }

    if (!imageUrl) {
      return res.status(422).json({ message: "no file picked" });
    }

    try {
      const post = await postModel.findById(id);

      if (!post) {
        return res.status(404).json({ message: "could not find post" });
      }
      if (imageUrl) {
        const imgBeginning = post.imageUrl.replace("image", "asset/img");
        await fs.unlink(path.join(__dirname, "..", imgBeginning));
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      post.save();

      res.status(200).json({ message: "success", post });
    } catch (err) {
      forwardError(err, next);
    }
  },
};

export default feed;
