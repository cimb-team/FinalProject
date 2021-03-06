const Product = require("../models/product.js");
const Bid = require("../models/bid");
const User = require("../models/user");
const db = require('../FBConfig.js')

class ProductController {
  static create(req, res, next) {
    let product;

    console.log(req.body)
    if (!req.body.newImages){
      req.body.newImages = 'test'
    }
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
        console.log(result)
        product = result;
        return Bid.create({
          bids: [],
          winnerId: null,
          productId: product._id
        })
          .then(bid => {
            console.log(bid)
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

  static findByUserId(req, res, next) {
    Product.find({ userId: req.decoded.id })
      .populate("bid")
      .populate("userId")
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }

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
          res.status(200).json([]);
        }
      })
      .catch(next);
  }

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

  static addBid(req, res, next) {
    Promise.all([
      User.findById(
        req.decoded.id,
      ),
      Bid.findOne({
        productId: req.params.id
      })
      .populate('productId')
    ])
    .then(results => {
      let [userData, bidData] = results
      let adding = 0
      if(bidData.productId.userId.equals(req.decoded.id))
        throw { code: 400, message: 'You cannot bid on your own product'}
      if(bidData.bids.length === 0){
        if(req.body.price <= bidData.productId.initialPrice){
        console.log('+_+_+_+_+_+_+_+_+_+_+_+_+')
          throw { code: 400, message: 'Your bid cannot be less than initial price : ' + bidData.productId.initialPrice }
        }
        adding = req.body.price
      }
      else {
        let highestBid = bidData.bids[bidData.bids.length - 1].price
        if(req.body.price <= highestBid)
          throw { code: 400, message: 'Your bid cannot be less than current highest bid : ' + highestBid }
        let lastBid = bidData.bids.filter(bid => bid.bidderId.equals(req.decoded.id))
        if(lastBid.length > 0)
          adding = req.body.price - lastBid[lastBid.length - 1].price
        else
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@')
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

    })
    .catch(next);
  }


  static quickcountdown(req, res, next){
    let event = new Date()
    event.setSeconds(event.getSeconds()+5);
    let returning
    Product.findById(req.params.id)
      .then(row => {
        if(row.userId.equals(req.decoded.id)){
          row.status = 'open'
          row.closedDate = event
          return row.save()
          
        }
        else{
          throw {code: 401, message: 'Unauthorized product update'}
        }
      })
      .then(row2 =>{
        returning = row2
        if(process.env.NODE_ENV != 'test')
        return db.collection('bidding').doc(row2._id.toString())
        .update({
          updatedAt: row2.updatedAt
        })
      })
      .then(doc =>{
        res.status(201).json(returning)
      })
      .catch(next);
  }
}

module.exports = ProductController;
