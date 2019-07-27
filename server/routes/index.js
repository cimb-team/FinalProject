const routes = require("express").Router();
const User = require("./user.js");
const Product = require("./product.js");

routes.get("/", function(req, res, next) {
  res.status(200).json({ message: "server is running" });
});
routes.use("/user", User);
routes.use("/product", Product);

module.exports = routes;
