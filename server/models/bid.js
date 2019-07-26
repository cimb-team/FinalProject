const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BidSchema = new Schema(
  {
    bidderId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    winnerId: { type: Schema.Types.ObjectId, ref: "User" },
    bidPrices: [{ type: Number }],
    dateIssued: [{ type: Date }],
    productId: { type: Schema.Types.ObjectId, ref: "Api" }
  },
  {
    timestamps: true
  }
);

const Bid = mongoose.model("Bid", BidSchema);

module.exports = Bid;
