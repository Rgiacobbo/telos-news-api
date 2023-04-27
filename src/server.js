const express = require("express");

const { PORT } = require("./config/env");

const authorsRoutes = require("./routes/authors.routes");

const app = express();

app.use(express.json);

app.use(authorsRoutes);

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
