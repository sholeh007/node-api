import { validationResult } from "express-validator";

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
  postFeed: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
      message: "Post created succesfully",
      post: {
        _id: new Date().toString(),
        title,
        content,
        creator: { name: "saya" },
        createdAt: new Date(),
      },
    });
  },
};

export default feed;
