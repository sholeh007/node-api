import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const Auth = {
  async signup(req, res) {
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
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "email not found" });
      }

      const decrypt = await argon2.verify(user.password, password);
      if (!decrypt) {
        return res.status(401).json({ message: "wrong password" });
      }

      const token = jwt.sign(
        { email: user.email, id: user._id.toString() },
        "somesupersecret",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token, userId: user._id.toString() });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default Auth;
