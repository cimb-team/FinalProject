const routes = require("express").Router();
const {
  Authentication,
  Authorization,
  BidAuthorization
} = require("../middlewares/auth.js");
const ProductController = require("../controllers/product.js");
const image = require("../middlewares/upload.js");
const Product = require("../models/product");
// => /products
routes.use(Authentication);
routes.post(
  "/",
  image.multer.array("images", 10),
  image.sendUploadToGCS,
  ProductController.create
);
routes.get("/user", ProductController.findByUserId);
routes.get("/:id", ProductController.findById);
routes.get("/", ProductController.findAll);
routes.delete("/:id", Authorization, ProductController.deleteOne);
routes.patch("/:id/addbid", ProductController.addBid);

module.exports = routes;
