import express from "express";
import route from "./routes/feedback.js";

const app = express();

app.use(route);

app.listen(8080);
