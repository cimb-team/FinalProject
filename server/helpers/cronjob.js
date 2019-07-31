const cron = require("node-cron");
const Product = require("../models/product");
const Bid = require("../models/bid");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const db = require('../FBConfig')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.GOOGLE_EMAIL}`,
    pass: `${process.env.GOOGLE_PASS}`
  }
})

// var emailCont = `Hi ${result.name}, you've been away for quite some time, we miss you! Please visit us soon by clicking here ${process.env.WEBSITE}`;
// var mailOptions = {
//   from: "<nusantara-art@admin.com>",
//   to: `${result.email}`,
//   subject: "You Have won your bid - Nusantara Art",
//   html: emailCont
// };

// transporter.sendMail(mailOptions, function(err, info) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(info);
//   }
// });

module.exports = () => {
  cron.schedule(
    "*/1 * * * * *",
    () => {
      // Product.deleteMany({})
      // .then(()=>console.log('deleted products'))
      // .catch(err =>console.log(err))
      // Bid.deleteMany({})
      // .then(()=>console.log('deleted bids'))
      // .catch(err =>console.log(err))
      let updatedProducts = []
      let updatedUsers = []
      Product.find({ closedDate: { $lte: new Date() }, status: 'open' })
        .populate('userId')
        .populate({
          path: 'bid',
          populate: {
            path: 'bids.bidderId'
          }
        })
        .sort({ 'bid.bids.price': -1 })
        .then(rows => {
          let productMutations = []
          let userMutations = []
          rows.forEach((row, i) => {
            row.status = 'close'
            if (row.bid.bids.length > 0) {
              row.bid.winnerId = row.bid.bids[row.bid.bids.length - 1].bidderId._id
              userMutations.push(User.findByIdAndUpdate(row.userId._id, { $inc: { balance: row.bid.bids[row.bid.bids.length - 1].price } }))
              let returned = [row.bid.winnerId._id.toString()]

              for (let i = row.bid.bids.length - 2; i >= 0; i--) {
                if (!returned.includes(row.bid.bids[i].bidderId._id.toString())) {
                  userMutations.push(User.findByIdAndUpdate(row.bid.bids[i].bidderId._id, { $inc: { balance: row.bid.bids[i].price } }, { new: true }))
                  console.log('returned to ' + row.bid.bids[i].bidderId.name + ' with amount : ' + row.bid.bids[i].price)
                  updatedUsers.push({
                    ...row.bid.bids[i].bidderId.toObject(),
                    refunded: row.bid.bids[i].price,
                    product: row.toObject()
                  })
                  returned.push(row.bid.bids[i].bidderId._id.toString())
                }
              }
            }
            productMutations.push(row.save())
            updatedProducts.push(row.toObject())
          })
          if (productMutations.length > 0)
            return Promise.all([Promise.all(productMutations), Promise.all(userMutations)])
          else
            throw 'Nothing to update'
        })
        .then(arrayOfSavedProducts => {
          // console.log(JSON.stringify(arrayOfSavedProducts, null, 3))
          console.log('-------------------Cron Job successful---------------------')
          // console.log(JSON.stringify(updatedProducts, null, 3))
          // console.log(JSON.stringify(updatedUsers, null, 3))
          updatedProducts.forEach(product => {
            db.collection("biding").doc(product.bid._id.toString())
            .update({
              closed: true
            })
            .then(function() {
                console.log("Document updated :" + product.title);
            })
            .catch(function(error) {
              // The document probably doesn't exist.
                console.error("Error updating document: " + product.title);
            })
            
            // Send email to product owner
            if (product.bid.winnerId) {
              var emailCont = `
<div style="display: flex; justify-content: center; align-items: center;">
  <img src="cid:logo@nusantara-art.com" width="200"/>
</div>
<h2><b>Hi ${product.userId.name},</b></h2>
Your product "${product.title}" has been sold to ${product.bid.winnerId.name} with highest bid of Rp. ${product.bid.bids[product.bid.bids.length - 1].price},- and has been added to your account balance, please check your app for more details.
  
Best regards,
Nusantara Art Team`;
              var mailOptions = {
                from: process.env.GOOGLE_EMAIL,
                to: `${product.userId.email}`,
                subject: "Your product has been sold - Nusantara Art",
                html: emailCont,
                attachments: [{
                  filename: 'logo.png',
                  path: __dirname + '/logo.png',
                  cid: 'logo@nusantara-art.com' //same cid value as in the html img src
                }]
              };

              
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log('ERROR OWNER')
                  console.log(err);
                } else {
                  console.log('SUCCESS OWNER')
                  console.log(info);
                }
              })

              // Send email to bid winner
              var emailCont = `
<div style="display: flex; justify-content: center; align-items: center;">
  <img src="cid:logo@nusantara-art.com" width="200"/>
</div>
<h2><b>Hi ${product.bid.winnerId.name},</b></h2>
We would like to inform you that you've won your bid for product "${product.title}" with highest bid of Rp. ${product.bid.bids[product.bid.bids.length - 1].price},-. We've included file attachment of your product in this email. Thank you very much for your purchase, please check your app for more details.

Best regards,
Nusantara Art Team`;
              let extensionImage = product.images[0].split('.')
              var mailOptions = {
                from: process.env.GOOGLE_EMAIL,
                to: `${product.bid.winnerId.email}`,
                subject: "Congrats, you've won a product bid' - Nusantara Art",
                html: emailCont,
                attachments: [{   // use URL as an attachment
                  filename: product.title + '.' + extensionImage[extensionImage.length - 1],
                  path: product.images[0]
                },
                {
                  filename: 'logo.png',
                  path: __dirname + '/logo.png',
                  cid: 'logo@nusantara-art.com' //same cid value as in the html img src
                }]
              };
              
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log('ERROR WINNER')
                  console.log(err);
                } else {
                  console.log('SUCCSS WINNER')
                  console.log(info);
                }
              })
            }
            else {
              var emailCont = `
<div style="display: flex; justify-content: center; align-items: center;">
  <img src="cid:logo@nusantara-art.com" width="200"/>
</div>
<h2><b>Hi ${product.userId.name},</b></h2>
We're sorry to inform that your product "${product.title}" has been due with no bidders, please check your app for more details.
  
Best regards,
Nusantara Art Team`;
              var mailOptions = {
                from: process.env.GOOGLE_EMAIL,
                to: `${product.userId.email}`,
                subject: "Your product has been due - Nusantara Art",
                html: emailCont,
                attachments: [{
                  filename: 'logo.png',
                  path: __dirname + '/logo.png',
                  cid: 'logo@nusantara-art.com' //same cid value as in the html img src
                }]
              }

              
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log('ERROR OWNER')
                  console.log(err);
                } else {
                  console.log('SUCCESS OWNER')
                  console.log(info);
                }
              })
            }
          })

          updatedUsers.forEach((user, i) => {
            // Send email to bid losers, except owner
            var emailCont = `
<div style="display: flex; justify-content: center; align-items: center;">
  <img src="cid:logo@nusantara-art.com" width="200"/>
</div>
<h2><b>Hi ${user.name},</b></h2>
We would like to inform you that you've lost your bid for product "${user.product.title}", Rp. ${user.refunded},- of your bid has been fully refunded to your account balance, please check your app for more details.     

Best regards,
Nusantara Art Team`;
            var mailOptions = {
              from: process.env.GOOGLE_EMAIL,
              to: `${user.email}`,
              subject: "Your bid has been refunded - Nusantara Art",
              html: emailCont,
              attachments: [{
                filename: 'logo.png',
                path: __dirname + '/logo.png',
                cid: 'logo@nusantara-art.com' //same cid value as in the html img src
              }]
            };
            

            transporter.sendMail(mailOptions, function (err, info) {
              if (err) {
                console.log('ERROR LOSER')
                console.log(err);
              } else {
                console.log('SUCCESS LOSER')
                console.log(info);
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    {
      timezone: "Asia/Jakarta"
    }
  );
};
