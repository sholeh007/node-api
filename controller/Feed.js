import fs from "fs/promises";
import { validationResult } from "express-validator";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import __dirname from "../helper/path.js";

function forwardError(err, next) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}

const feed = {
  async getfeed(req, res, next) {
    const currentPage = req.query.page || 1; // 1 is default
    const perPage = 3;
    let totalItems;
    try {
      const count = await postModel.estimatedDocumentCount();
      totalItems = count;
      const data = await postModel
        .find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
      res.status(200).json({ posts: data, totalItems });
    } catch (error) {
      forwardError(error, next);
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

    let creator;
    const title = req.body.title;
    const content = req.body.content;
    const image = req.file.path.replace(/\\/g, "/");
    const imageUrl = image.replace("asset/img", "image");
    const post = new postModel({
      title,
      content,
      imageUrl,
      creator: req.userId,
    });

    try {
      const savePost = await post.save();
      const user = await userModel.findById(req.userId);
      creator = user;
      user.posts.push(post);
      await user.save();
      res.status(201).json({
        message: "Post created succesfully",
        post: savePost,
        creator: {
          _id: creator._id,
          name: creator.name,
        },
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
        await fs.unlink(image);
        return res.status(404).json({ message: "could not find post" });
      }
      if (post.creator.toString() !== req.userId) {
        await fs.unlink(image);
        return res.status(403).json({ message: "Not Authorized" });
      }
      if (imageUrl) {
        const imgBeginning = post.imageUrl.replace("image", "asset/img");
        await fs.unlink(imgBeginning);
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
  async deletePost(req, res, next) {
    const id = req.params.postId;

    try {
      const post = await postModel.findById(id);

      if (!post) {
        return res.status(404).json({ message: "data not found" });
      }
      if (post.creator.toString() !== req.userId) {
        return res.status(403).json({ message: "Not Authorized" });
      }
      const imageUrl = post.imageUrl.replace("image", "asset/img");
      await fs.unlink(imageUrl);
      await postModel.findByIdAndDelete(id);
      res.status(200).json({ message: "success delete" });
    } catch (error) {
      forwardError(error, next);
    }
  },
};

export default feed;
