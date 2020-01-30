const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// connection to db
mongoose
  .connect("mongodb://localhost/scooters-db")
  .then(db => console.log("db connected"))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require("./routes/index");

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
// routes
app.use("/", indexRoutes);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
