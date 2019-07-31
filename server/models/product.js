const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ApiSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    status: {
      type: String,
      required: [true, "Status is required"]
    },
    images: { 
      type: [String],
      required: [true, "Images is required"]
    },
    category: {
      type: String,
      required: [true, "Category is required"]
    },
    details: {
      type: String,
      required: [true, "Details is required"]
    },
    initialPrice: {
      type: Number,
      required: [true, "Initial price is required"]
    },
    closedDate: {
      type: Date,
      required: [true, "Date is required"]
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Product Owner ID is required"]
    },
    bid: { type: Schema.Types.ObjectId, ref: "Bid" }
  },
  {
    timestamps: true
  }
);
// auah

const Api = mongoose.model("Api", ApiSchema);

module.exports = Api;
