const routes = require("express").Router();
const User = require("./user.js");
const Product = require("./product.js");

routes.use("/", User);
routes.use("/product", Product);

module.exports = routes;
