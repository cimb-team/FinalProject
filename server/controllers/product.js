const Product = require("../models/product.js");
const Bid = require("../models/bid");

class ProductController {
  /**
   * POST /products
   * */
  static create(req, res, next) {
    Product.create({
      title: req.body.title,
      status: "open",
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
    console.log("sampai di controller");
    Product.deleteOne({
      _id: id
    })
      .then(result => {
        res.status(201).json(result);
      })
      .catch(next);
  }

  static addBid(req, res, next) {
    let detailProduct;
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
        detailProduct = row;
        return Product.findByIdAndUpdate(req.params.id, {
          currentPrice: req.body.price
        });
      })
      .then(row2 => [res.status(201).json(detailProduct)])
      .catch(next);
  }
}

module.exports = ProductController;
