const User = require("../../models/user.js");
const Product = require("../../models/product.js");

module.exports = {
  deleteUser: function() {
    if (process.env.NODE_ENV === "test") {
      User.deleteMany({})
        .then(() => {
          console.log('================================================')
          console.log("User cleared");
        })
        .catch(err => {
          console.log('-----------------------------------------------')
          console.log(err);
        });
    }
  },
  deleteProduct: function() {
    if (process.env.NODE_ENV === "test") {
      Product.deleteMany({})
        .then(() => {
          console.log("Product cleared");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
