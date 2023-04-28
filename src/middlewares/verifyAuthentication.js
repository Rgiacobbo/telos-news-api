const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env");

const verifyAuthenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "@authentication/missing-token",
      message: "Token not sent",
    });
  }

  const [prefix, token] = authorization.split(" ");

  const invalidTokenMessage = {
    error: "@authentication/invalid-token",
    message: "Token provided is invalid",
  };

  if (prefix != "Bearer") {
    return res.status(401).json(invalidTokenMessage);
  }

  if (!token) {
    return res.status(401).json(invalidTokenMessage);
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json(invalidTokenMessage);
    }

    req.author = decoded;

    return next();
  });
};

module.exports = {
  verifyAuthenticate,
};
