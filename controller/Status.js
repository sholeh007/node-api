import userModel from "../models/userModel.js";

const Status = {
  async index(req, res, next) {
    try {
      const user = await userModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json({ status: user.status });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async updateStatus(req, res, next) {
    const newStatus = req.body.status;
    try {
      const user = await userModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      user.status = newStatus;
      await user.save();
      res.status(200).json({ message: "user updated" });
    } catch (error) {}
  },
};

export default Status;
