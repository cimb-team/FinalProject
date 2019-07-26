const routes = require("express").Router();
const User = require("./user.js");
const Product = require("./product.js");

routes.use("/product", Product);
routes.use("/", User);

module.exports = routes;
