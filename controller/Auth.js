import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import argon2 from "argon2";

const Auth = {
  async signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, name, password } = req.body;
    try {
      const hash = await argon2.hash(password);
      const user = new User({
        email,
        name,
        password: hash,
      });
      await user.save();
      res.status(201).json({ message: "user created", userId: user._id });
    } catch (error) {
      res.status(500).json({ message: "internal error" });
    }
  },
};

export default Auth;
