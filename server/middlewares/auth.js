const jwt = require("../helpers/jwt.js");
const User = require("../models/user.js");
const Product = require("../models/product.js");

module.exports = {
  Authentication: function(req, res, next) {
    let token = req.headers.token;
    let decoded = null;
    try {
      decoded = jwt.verify(token);
    } catch {
      next({
        code: 400
      });
    }
    User.findOne({
      email: decoded.email
    })
      .then(user => {
        /* istanbul ignore else */
        if (user) {
          req.decoded = decoded;
          next();
        }
      })
      .catch(next);
  },
  Authorization: function(req, res, next) {
    console.log('AUTHORIZATIONNNN')
    Product.findById(req.params.id)
      .then(() => {
        next();
      })
      .catch(next);
  }
};
