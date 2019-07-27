const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BidSchema = new Schema(
  {
    bids: [
      {
        bidderId: { type: Schema.Types.ObjectId, ref: "User" },
        price: Number,
        dateIssued: Date
      }
    ],
    winnerId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Api" }
  },
  {
    timestamps: true
  }
);

const Bid = mongoose.model("Bid", BidSchema);

module.exports = Bid;
