const routes = require("express").Router();
const UserController = require("../controllers/user.js");
const { Authentication } = require("../middlewares/auth.js");

/**
 * AUTH
 */
routes.post("/signup", UserController.signup);
routes.post("/signin", UserController.signin);

routes.use(Authentication);
routes.get("/user", UserController.findOne);
routes.patch('/updateprofile', UserController.updateProfile)
routes.patch('/changepass', UserController.changePassword)
routes.patch('/changephone', UserController.changePhoneNumber)
/**
 * AUTH
 */
routes.patch("/topup", UserController.topup);
routes.get("/user/history", UserController.findBidByBidderId);

/**m
 * HISTORY DIDAPAT DARI PRODUCTS, NANTI BUAT ROUTES BARU DI PRODUCT
 */
// routes.patch("/:productId", UserController.addProduct);
// routes.get("/history", UserController.readHistory);

module.exports = routes;
