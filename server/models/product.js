const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ApiSchema = new Schema(
  {
    title: String,
    status: String,
    images: [{ type: String }],
    category: String,
    details: String,
    initialPrice: Number,
    closedDate: Date,
    UserId: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Api = mongoose.model("Api", ApiSchema);

module.exports = Api;
