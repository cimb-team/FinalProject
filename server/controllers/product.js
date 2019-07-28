const Product = require("../models/product.js");
const Bid = require("../models/bid");
const User = require("../models/user");
class ProductController {
  /**
   * POST /products
   * */

  static create(req, res, next) {
    let product;
    console.log(req.body)
    Product.create({
      userId: req.decoded.id,
      title: req.body.title,
      status: "open",
      images: req.body.newImages,
      category: req.body.category,
      details: req.body.details,
      initialPrice: req.body.initialPrice,
      closedDate: req.body.closedDate
    })
      .then(result => {
        product = result;
        return Bid.create({
          bids: [],
          winnerId: null,
          productId: product._id
        })
          .then(bid => {
            Product.findByIdAndUpdate(
              product._id,
              { bid: bid._id },
              { new: true }
            )
              .then(final => {
                res.status(201).json({ ...product._doc, bid });
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  }

  /**
   * GET /product/user
   **/
  static findByUserId(req, res, next) {
    Product.find({ userId: req.decoded.id })
      .populate("bid")
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
      .populate("bid")
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }

  /**
   * GET /product
   */
  static findAll(req, res, next) {
    Product.find({ status: "open" })
      .populate("bid")
      .then(result => {
        console.log(result.length);
        if (result.length > 0) {
          let sorted = result.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });

          if (req.query.sortby) {
            let sortby = req.query.sortby.toLowerCase();
            switch (sortby) {
              case "highestprice":
                sorted = result.sort((a, b) => {
                  return a.currentPrice - b.currentPrice;
                });
                res.status(200).json(sorted);
              case "lowestprice":
                sorted = result.sort((a, b) => {
                  return b.currentPrice - a.currentPrice;
                });
                res.status(200).json(sorted);
              default:
                res.status(200).json(sorted);
            }
          } else {
            res.status(200).json(sorted);
          }
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

  /**
   * PATCH /product/:id/addbid
   */
  static addBid(req, res, next) {
    console.log(req.body, '==')
    Bid.findOneAndUpdate(
      {
        productId: req.params.id
      },
      {
        $push: {
          bids: {
            bidderId: req.decoded.id,
            price: req.body.price,
            dateIssued: new Date()
          }
        }
      },
      { new: true }
    )
      .then(row => {
        let final;
        let r = row;
        res.status(201).json(row);
        User.findByIdAndUpdate(
          req.decoded.id,
          { $inc: { balance: -Math.abs(req.body.price) } },
          { new: true, useFindAndModify: true }
        )
          .then(userData => {
            let { _id, balance } = userData;
            res.status(200).json({ ...r, user: { _id, balance } });
          })
          .catch(next);
      })
      .catch(next);
  }
}

module.exports = ProductController;
