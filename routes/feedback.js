import express from "express";
import controllerFeedback from "../controller/Feedback.js";

const route = express.Router();

route.get("/feedback", controllerFeedback.getfeedback);

export default route;
