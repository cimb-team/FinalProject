const Product = require("../models/product.js");
const Bid = require("../models/bid");
class ProductController {
  /**
   * POST /products
   * */
  static create(req, res, next) {
    Product.create({
      title: req.body.title,
      status: "false",
      images: req.body.newImages,
      category: req.body.category,
      details: req.body.details,
      initialPrice: req.body.initialPrice,
      closedDate: new Date(req.body.closedDate),
      userId: req.decoded.id
    })
      .then(product => {
        Bid.create({
          bidderId: [],
          winnerId: null,
          bidPrices: [],
          dateIssued: [],
          productId: product._id
        }).then(bid => {
          res.status(201).json({ ...product._doc, bid });
        });
      })
      .catch(next);
  }

  /**
   * GET /products/user
   **/
  static findByUserId(req, res, next) {
    Product.find({ userId: req.decoded.id })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }

  /**
   * GET /product/:id
   */
  static findById(req, res, next) {
    Product.findOne({
      _id: req.params.id
    })
      .then(result => {
        Bid.findOne({ productId: result._id }).then(bid => {
          res.status(200).json({ ...result, bid });
        });
      })
      .catch(next);
  }

  /**
   * GET /product
   */
  static findAll(req, res, next) {
    Product.find({ status: "false" })
      .then(result => {
        if (result.length >= 1) {
          let sorted = result.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });
          if (req.query) {
            let { sortby } = req.query;
            sortby = sortby.toLowerCase();
            switch (sortby) {
              case "highestprice":
                sorted = result.sort((a, b) => {
                  return a.currentPrice - b.currentPrice;
                });
                break;
              case "lowestprice":
                sorted = result.sort((a, b) => {
                  return b.currentPrice - a.currentPrice;
                });
                break;
              default:
            }
          }
          res.status(200).json(sorted);
        } else {
          res.status(200).json(result);
        }
      })
      .catch(next);
  }

  /**
   * DELETE /product/:id
   */
  static deleteOne(req, res, next) {
    let id = req.params.id;
    Product.deleteOne({
      _id: id
    })
      .then(result => {
        res.status(201).json(result);
      })
      .catch(next);
  }

  //  INI NANTI DI LAKUKAN PAKE CRONJOB
  //   static bidClosed(req, res, next) {
  //     let id = req.params.id;
  //     let closeProduct = {
  //       status: "true"
  //     };
  //     Product.findByIdAndUpdate(id, { $set: closeProduct }, { new: true })
  //       .then(result => {
  //         res.status(201).json(result);
  //       })
  //       .catch(next);
  //   }

  //  BUAT SKEMA SENDIRI SUPAYA DETAIL BIDDING LEBIH LENGKAP UNTUK DI LIST DETAIL BID
  //   static addBid(req, res, next) {
  //     let id = req.params.id;
  //     let addBid = {
  //       bidPrices: req.body.bid
  //     };
  //     Product.findByIdAndUpdate(id, { $push: addBid }, { new: true })
  //       .then(result => {
  //         res.status(201).json(result);
  //       })
  //       .catch(next);
  //   }
}

module.exports = ProductController;
