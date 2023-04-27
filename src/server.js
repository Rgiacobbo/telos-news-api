const express = require("express");

const { PORT } = require("./config/env");

const app = express();

app.use("/", (req, res) => {
  res.end("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
