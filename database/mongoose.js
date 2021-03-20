import mongoose from "mongoose";
import "dotenv/config.js";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lz5mz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connect = async (runServer) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    runServer();
  } catch (e) {
    console.log(e);
  }
};

export default connect;
