const cron = require("node-cron");
const Product = require("../models/product");
const Bid = require("../models/bid");
const User = require("../models/user");
module.exports = () => {
  cron.schedule(
    "0 0 * * *",
    () => {
      let date = new Date().getUTCDate();
      let month = new Date().getUTCMonth();
      let year = new Date().getUTCFullYear();
      let today = new Date(`${month + 1}-${date}-${year}`);
      Product.find({})
        .populate("userId")
        .then(async products => {
          let closedProduct = [];
          await products.map(product => {
            if (String(product.closedDate) == String(today)) {
              closedProduct.push(product._id);
            }
          });
          await closedProduct.forEach(async cp => {
            // console.log(cp._id, "id product yang di close");
            await Product.findByIdAndUpdate(
              cp._id,
              { status: "close" },
              { new: true, useFindAndModify: true }
            )
              .populate("bid")
              .then(async closed => {
                if (closed.bid.bids.length >= 1) {
                  await closed.bid.bids.sort((a, b) => {
                    return b.price - a.price;
                  });
                  // console.log(closed.bid);
                  // console.log("id designer =>", closed.userId);
                  await closed.bid.bids.forEach(async (b, i) => {
                    if (i === 0) {
                      await Bid.findByIdAndUpdate(
                        closed.bid._id,
                        {
                          winnerId: b._id
                        },
                        { new: true, useFindAndModify: true }
                      ).then(async res => {
                        await User.findByIdAndUpdate(
                          closed.userId,
                          {
                            $inc: { balance: b.price }
                          },
                          { new: true, userFindAndModify: true }
                        ).then(async designer => {
                          // console.log(i);
                          // console.log("harga yang menang bid", b.price);
                          // console.log(
                          //   "ditambah",
                          //   b.price,
                          //   "duitnya jadi",
                          //   designer.balance
                          // );
                        });
                      });
                    } else {
                      await User.findOne({ _id: b.bidderId }).then(async as => {
                        await User.findByIdAndUpdate(
                          b.bidderId,
                          { $inc: { balance: b.price } },
                          { new: true, useFindAndModify: true }
                        ).then(res => {
                          // console.log(
                          //   i,
                          //   b.bidderId,
                          //   "kalah bid, saldo awalnya",
                          //   as.balance,
                          //   ", ditambah",
                          //   b.price,
                          //   ", jadi",
                          //   res.balance
                          // );
                        });
                      });
                    }
                  });
                }
              });
          });
        });
    },
    {
      timezone: "Asia/Jakarta"
    }
  );
};
