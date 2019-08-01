const routes = require("express").Router();
const User = require("./user.js");
const Product = require("./product.js");

routes.get("/", function(req, res, next) {
  res.status(200).json({ message: "server is running" });
});

routes.get("/error", function(req, res, next) {
  next({code: 500})
});


routes.use("/user", User);
routes.use("/product", Product);

module.exports = routes;
