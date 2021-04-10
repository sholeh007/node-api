import swaggerJsDoc from "swagger-jsdoc";
import info from "./info.js";
import servers from "./servers.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info,
    servers,
  },
  apis: ["../routes/*.js"],
};

const spec = await swaggerJsDoc(options);

export default spec;
