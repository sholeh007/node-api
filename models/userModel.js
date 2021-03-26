import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    dafault: "I am new!",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
