import { validationResult } from "express-validator";
import postModel from "../models/postModel.js";

const feed = {
  getfeed: (req, res) => {
    const data = {
      posts: [
        {
          _id: "1",
          title: "Book",
          content: "This is abook",
          imageUrl: "asset/img/Pin.png",
          creator: {
            name: "kamu",
          },
          createdAt: new Date(),
        },
      ],
    };
    res.status(200).json(data);
  },
  postFeed: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

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
    } catch (e) {
      console.log(e);
    }
  },
};

export default feed;
