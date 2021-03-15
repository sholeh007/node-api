const feed = {
  getfeed: (req, res) => {
    res.status(200).json({ message: "success" });
  },
  postFeed: (req, res) => {
    const title = req.body.title;
    const name = req.body.name;

    res.status(201).json({
      id: Date.now().toString(),
      title,
      name,
    });
  },
};

export default feed;
