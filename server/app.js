require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const BackgroundJob = require("./helpers/cronjob");

const errorHandler = require("./helpers/error-handler.js");

let DB_PATH;
DB_PATH =
process.env.MONGODB_URL + process.env.NODE_ENV + "?retryWrites=true";

if (process.env.NODE_ENV === "test") {
  DB_PATH = "mongodb://localhost/final-project-" + process.env.NODE_ENV;
}

mongoose.connect(DB_PATH, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log(`CONNECTED TO DB    : ${DB_PATH}`);
    BackgroundJob();
  })
console.log(new Date())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

/* istanbul ignore else */
if (process.env.NODE_ENV === "test") {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`ON ENVIRONMENT   : ${process.env.NODE_ENV}`);
    console.log(`ON PORT          : ${PORT}`);
  });
}
