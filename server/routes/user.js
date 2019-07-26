const routes = require("express").Router();
const UserController = require("../controllers/user.js");
const { Authentication } = require("../middlewares/auth.js");

//  /

/**
 * AUTH
 */
routes.post("/signup", UserController.signup);
routes.post("/signin", UserController.signin);

routes.use(Authentication);
routes.get("/user", UserController.findOne);

/**
 * AUTH
 */
routes.patch("/topup", UserController.topup);
routes.get("/user/history", UserController.findBidByBidderId);

/**
 * HISTORY DIDAPAT DARI PRODUCTS, NANTI BUAT ROUTES BARU DI PRODUCT
 */
// routes.patch("/:productId", UserController.addProduct);
// routes.get("/history", UserController.readHistory);

module.exports = routes;
