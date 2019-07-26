const mongoose = require("mongoose");
const bcrypt = require("../helpers/bcrypt.js");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [
      {
        validator: function(input) {
          let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return input.match(mailformat);
        },
        message: props => `${props.value} invalid email format!`
      },
      {
        validator: function(value) {
          return User.find({
            _id: { $ne: this._id },
            email: value
          })
            .then(data => {
              if (data.length !== 0) {
                throw "";
              }
            })
            .catch(err => {
              throw err;
            });
        },
        message: props => `This email ${props.value} already used!`
      }
    ]
  },
  phonenumber: {
    type: String
  },
  image: String,
  password: {
    type: String,
    required: [true, "Password is required"],
    min: [8, 'Minimal password 6 characters']
  },
  balance: {
    type: Number,
    default: 0
  }
});

UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashPassword(this.password);
  this.image = "";
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
