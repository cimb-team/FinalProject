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
        message: "Invalid email format!"
      },
      {
        validator: function(value) {
          return User.find({
            _id: { $ne: this._id },
            email: value
          })
            .then(data => {
              if (data.length !== 0) {
                return false;
              }
            })
            .catch(err => {
              return true;
            });
        },
        message: "This email already used!"
      }
    ]
  },
  phonenumber: {
    type: String,
    minlength: [8, 'Minimal 8 digits'],
    required: [true, "Phone Number is required"]
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150"
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password should consist of 8 character"]
  },
  balance: {
    type: Number,
    default: 0
  }
});

UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashPassword(this.password);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
