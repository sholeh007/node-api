function fileLarge(req, res, next) {
  if (req.file.code === "LIMIT_FILE_SIZE") {
    next(new Error("File too large"));
  }
  next();
}

export default fileLarge;
