const User = require(`../models/user`);
const Product = require(`../models/product`);
const Bid = require(`../models/bid`);
const jwt = require(`../helpers/jwt`);

module.exports = {
  createMockUser: function(user) {
    if (process.env.NODE_ENV == "test") {
      User.create(user);
    }
  },
  deleteAllUser: function() {
    if (process.env.NODE_ENV == "test") {
      User.deleteMany({});
    }
  },
  deleteAllProduct: function() {
    if (process.env.NODE_ENV == "test") {
      Product.deleteMany({});
    }
  },
  deleteAllBid: function() {
    if (process.env.NODE_ENV == "test") {
      Bid.deleteMany({});
    }
  },
  mockLogin: function(user) {
    return jwt.sign(user);
  },
  createMockProducts: function(product) {
    let products = [];
    for (let i = 0; i < 10; i++) {
      products.push(product);
    }
    Product.insertMany(products).then(res => {});
  }
};
