const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env");

const { authorDatabase } = require("./authors.controller");

const { compareHash } = require("../utils/hashProvider");

const login = async (req, res) => {
  const { email, password } = req.body;

  const author = authorDatabase.find((a) => a.email === email);

  const loginErrorMessage = {
    error: "@authenticate/login",
    message: "Invalid user or password",
  };

  if (!author) {
    return res.status(400).json(loginErrorMessage);
  }

  const isValidPassword = await compareHash(password, author.password);

  if (!isValidPassword) {
    return res.status(400).json(loginErrorMessage);
  }

  const authorLoged = { ...author };

  const token = jwt.sign(author, JWT_SECRET, {
    expiresIn: "1h",
  });
  delete authorLoged.password;
  return res.send({ ...authorLoged, token });
};

module.exports = {
  login,
};
