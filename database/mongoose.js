import mongoose from "mongoose";

const database = "messages";
const password = "HJB4YzaElUloBLjk";
const uri = `mongodb+srv://sholeh:${password}@cluster0.lz5mz.mongodb.net/${database}?retryWrites=true&w=majority`;

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
