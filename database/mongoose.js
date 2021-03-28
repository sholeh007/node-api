import mongoose from "mongoose";
import "dotenv/config.js";
import socketIo from "../config/socket.js";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lz5mz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connect = async (expressListen) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const io = socketIo.init(expressListen);
    io.on("connection", (socket) => {
      console.log("Connected");
    });
  } catch (e) {
    console.log(e);
  }
};

export default connect;
