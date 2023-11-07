import compression from "compression";

const shouldCompress = (req, res) => {
  if (req.headers["x-no-compression"]) {
    // Don't compress responses with this custom header
    return false;
  }
  return compression.filter(req, res);
};

export { shouldCompress };
