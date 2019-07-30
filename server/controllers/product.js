const Product = require("../models/product.js");
const Bid = require("../models/bid");
const User = require("../models/user");
class ProductController {
  /**
   * POST /products
   * */

  static create(req, res, next) {
    let product;
    // let event = new Date()
    // event.setSeconds(event.getSeconds()+30);

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
      .populate("userId")
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
      .populate("userId")
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
      .populate("userId")
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
    Promise.all([
      User.findById(
        req.decoded.id,
      ),
      Bid.findOne({
        productId: req.params.id
      })
    ])
    .then(results => {
      let [userData, bidData] = results
      let adding = 0
      if(bidData.bids.length === 0){
        adding = req.body.price
      }
      else {
        let lastBid = bidData.bids.filter(bid => bid.bidderId.equals(req.decoded.id))
        if(lastBid.length > 0)
          adding = req.body.price - lastBid[lastBid.length - 1].price
        else
          adding = req.body.price
      }
      if(userData.balance - adding >= 0){
        bidData.bids.push({
          bidderId: req.decoded.id,
          price: req.body.price,
          dateIssued: new Date()
        })
        userData.balance -= adding
        return Promise.all([bidData.save({ validateBeforeSave: false }),userData.save({ validateBeforeSave: false })])
      }
      else  
        throw {code: 400, message: 'Your balance is not enough'}
    })
    .then(results2 => {
      res.status(201).json(results2[0]);
      // let { _id, balance } = userData;
      // res.status(200).json({ ...r, user: { _id, balance } });
    })
    .catch(next);
  }

  // QUICK TIMER FOR PRESENTATION
  static quickcountdown(req, res, next){
    let event = new Date()
    event.setSeconds(event.getSeconds()+90);

    Product.findByIdAndUpdate(req.params.id, {
      status: "open",
      closedDate: event
    }, { new: true })
      .then(row => {
        res.status(201).json(row)
      })
      .catch(next);
  }
}

module.exports = ProductController;
