import express from "express";
import cors from "./config/cors.js";
import feedRoute from "./routes/feed.js";
import runServer from "./database/mongoose.js";

const app = express();

app.use(express.json());
app.use("/image", express.static("asset/img"));
app.use(cors);

app.use("/feed", feedRoute);

// error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

runServer(() => app.listen(8080));
