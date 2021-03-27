import { check } from "express-validator";
import User from "../models/userModel.js";

const validation = {
  feedPost: [
    check("title", "min character is 5").notEmpty().trim().isLength({ min: 5 }),
    check("content", "min character is 5")
      .notEmpty()
      .trim()
      .isLength({ min: 5 }),
  ],
  signup: [
    check("email", "email not valid")
      .notEmpty()
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("E-mail already is use");
        }
      }),
    check("name").notEmpty().trim(),
    check("password").notEmpty().trim().isLength({ min: 7 }),
  ],
  status: [check("status", "status empty").notEmpty().trim()],
};

export default validation;
