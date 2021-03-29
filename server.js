import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import runServer from "./database/mongoose.js";
import fileUpload from "./config/fileupload.js";
import graphqlSchema from "./graphql/schema.js";
import graphqlResolver from "./graphql/resolvers.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/image", express.static("asset/img"));
app.use(fileUpload);

// error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

runServer(() => app.listen(process.env.APP_PORT));
