import jwt from "jsonwebtoken";

const decode = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, process.env.KEY_JWT);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodeToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 403;
    throw error;
  }
  req.userId = decodeToken.id;
  next();
};

export default decode;
