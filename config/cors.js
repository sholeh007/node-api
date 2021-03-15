function cors(req, res, next) {
  res.set("Access-Control-Allow-origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
}
export default cors;
