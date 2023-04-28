const express = require("express");

const { PORT } = require("./config/env");

const authorRoutes = require("./routes/authors.routes");
const authenticateRoutes = require("./routes/authenticate.routes");
const newsRoutes = require("./routes/news.routes");

const app = express();

app.use(express.json());

app.use(authorRoutes);
app.use(authenticateRoutes);
app.use(newsRoutes);

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
