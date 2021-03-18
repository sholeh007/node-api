import express from "express";
import cors from "./config/cors.js";
import feedRoute from "./routes/feed.js";
import runServer from "./database/mongoose.js";

const app = express();

app.use(express.json());
app.use(cors);

app.use("/feed", feedRoute);

runServer(() => app.listen(8080));
