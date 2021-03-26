import User from "../models/userModel.js";
import { validationResult } from "express-validator";

const Auth = {
  signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, name, password } = req.body;
  },
};

export default Auth;
