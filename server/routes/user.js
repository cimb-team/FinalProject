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
routes.get("/", UserController.findOne);
/**
 * AUTH
 */
routes.patch("/topup", UserController.topup);
routes.get("/history", UserController.findBidByBidderId);

module.exports = routes;
