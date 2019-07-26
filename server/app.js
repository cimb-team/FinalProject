require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const errorHandler = require("./helpers/error-handler.js");

let DB_PATH;
if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development") {
  DB_PATH = "mongodb://localhost/final-project-" + process.env.NODE_ENV;
} else {
  DB_PATH = process.env.MONGODB_URL + process.env.NODE_ENV;
}
mongoose
  .connect(DB_PATH, { useNewUrlParser: true })
  .then(() => {
    console.log(`CONNECTED TO DB    : ${DB_PATH}`);
  })
  .catch(err => {
    console.log(`DATABASE CONNECTION ERROR`);
    console.log(err);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "2mb" }));
app.use(cors());
app.use("/", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ON ENVIRONMENT   : ${process.env.NODE_ENV}`);
  console.log(`ON PORT          : ${PORT}`);
});

module.exports = app;
