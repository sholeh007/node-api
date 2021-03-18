import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: Object,
    required: true,
  },
});
// add options
postSchema.set("timestamps", true);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
