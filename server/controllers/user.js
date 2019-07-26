const User = require("../models/user.js");
const Bid = require("../models/bid");
const register = require("../helpers/bcrypt.js");
const jwt = require("../helpers/jwt.js");

class UserController {
  /**
   * POST /signup
   */
  static signup(req, res, next) {
    let { name, email, password, phonenumber } = req.body;
    User.create({
      name,
      email,
      password,
      phonenumber,
      balance: 0
    })
      .then(result => {
        let { _id, name, email, phonenumber, balance } = result;
        res.status(201).json({ _id, name, email, phonenumber, balance });
      })
      .catch(next);
  }

  /**
   * POST /signin
   */
  static signin(req, res, next) {
    let { email, password } = req.body;
    User.findOne({
      email
    })
      .then(result => {
        if (result) {
          let check = register.checkPassword(password, result.password);
          if (check === true) {
            delete result.password;
            let token = jwt.sign({
              id: result._id,
              email: result.email
            });
            let { _id, name, phonenumber, email, balance, image } = result;
            let user = { _id, name, email, phonenumber, balance, image };
            res.status(200).json({ ...user, token });
          } else {
            throw {
              name: `ValidationError`,
              message: `Invalid email or password`
            };
          }
        } else {
          throw {
            name: `ValidationError`,
            message: `Invalid email or password`
          };
        }
      })
      .catch(next);
  }

  /**
   * GET /user
   */
  static findOne(req, res, next) {
    let { email } = req.decoded;
    User.findOne({
      email
    })
      .then(result => {
        let { _id, name, phonenumber, email, balance, image } = result;
        let user = { _id, name, email, phonenumber, balance, image };
        res.status(200).json(user);
      })
      .catch(next);
  }

  static updateProfile(req, res, next) {
    let obj = {};
    let exclude = [
      "phonenumber",
      "password",
      'balance',
      "_id",
      "__v",
      "createdAt",
      "updatedAt"
    ];

    User.schema.eachPath(path => {
      if (!exclude.includes(path)) {
        if (req.body[path])
          obj[path] = req.body[path];
      }
    });

    User.findByIdAndUpdate(req.decoded.id, obj)
      .then(row => {
        res.status(201).json(row);
      })
      .catch(next);
  }

  static changePassword(req, res, next) {
    User.findById(req.decoded.id)
      .then(result => {
        if (result) {
          let check = register.checkPassword(
            req.body.oldPassword,
            result.password
          );
          if (check === true) {
            result.password = req.body.newPassword;
            result
              .save()
              .then(row => {
                res.status(201).json(row);
              })
              .catch(next);
          } else {
            throw {
              name: `ValidationError`,
              message: `Wrong password`
            };
          }
        } else {
          throw {
            name: `ValidationError`,
            message: `Wrong password`
          };
        }
      })
      .catch(next);
  }

  static changePhoneNumber(req, res, next) {
    User.findById(req.decoded.id)
      .then(result => {
        if (result) {
          let check = register.checkPassword(
            req.body.password,
            result.password
          );
          if (check === true) {
            result.phonenumber = req.body.phonenumber;
            result
              .save()
              .then(row => {
                res.status(201).json(row);
              })
              .catch(next);
          } else {
            throw {
              name: `ValidationError`,
              message: `Wrong password`
            };
          }
        } else {
          throw {
            name: `ValidationError`,
            message: `Wrong password`
          };
        }
      })
      .catch(next);
  }

  /**
   * PATCH /topup
   */
  static topup(req, res, next) {
    let { id } = req.decoded;
    let { balance } = req.body;
    balance = Number(balance);
    console.log(balance);
    User.findByIdAndUpdate(id, { $inc: { balance } }, { new: true })
      .then(result => {
        let { _id, name, phonenumber, email, balance, image } = result;
        let user = { _id, name, email, phonenumber, balance, image };
        res.status(200).json(user);
      })
      .catch(next);
  }

  /**
   * /user/history
   */
  static findBidByBidderId(req, res, next) {
    Bid.find({
      "bids.bidderId": req.decoded.id
    })
      .then(row => {
        res.json(row);
      })
      .catch(next);
  }
}

module.exports = UserController;