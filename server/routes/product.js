const routes = require("express").Router();
const { Authentication, Authorization } = require("../middlewares/auth.js");
const ProductController = require("../controllers/product.js");
const image = require("../middlewares/upload.js");

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
routes.patch('/:id/addbid', ProductController.addBid)

/**
 * DI HANDLE PAKE CRON JOB YANG DILAKUKAN TIAP JAM 12 MALAM TIAP HARI
 * routes.patch("/close/:id", ProductController.bidClosed);
 */

/**
 * BID DIBUATKAN MODEL DAN ROUTES SENDIRI SUPAYA BISA DAPAT DETAIL NYA
 * routes.patch("/bid/:id", BidAuthorization, ProductController.addBid)
 */

module.exports = routes;
