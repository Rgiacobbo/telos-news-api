const { Router } = require("express");

const routes = Router();

routes.get("/authors");

routes.post("/authors");

routes.get("/authors/:id");

routes.put("/authors/:id");

routes.delete("/authors/:id");

module.exports = routes;
