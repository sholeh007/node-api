import { check } from "express-validator";

const validation = {
  feedPost: [
    check("title", "min character is 5").notEmpty().trim().isLength({ min: 5 }),
    check("content", "min character is 5")
      .notEmpty()
      .trim()
      .isLength({ min: 5 }),
  ],
};

export default validation;
