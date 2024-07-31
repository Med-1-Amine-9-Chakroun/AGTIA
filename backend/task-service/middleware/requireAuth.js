const jwt = require("jsonwebtoken");
// const User = require("..")

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  } else {
    next();
  }
};

module.exports = requireAuth;
