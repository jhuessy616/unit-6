require("dotenv").config();
const express = require("express");
const app = express();
// console.log(process.env);
const userController = require("./controllers/user.controller")
const movieController = require("./controllers/movie.controller")
const cors = require("cors")

// ! Connecting to the DB
const mongoose = require("mongoose");
// take away nasty warning
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASEURL);
const db = mongoose.connection;

db.once("open", () => console.log("Connected to the DB"));

// something coming through could be a json object
// we need this
app.use(cors());
app.use(express.json());

app.use("/user", userController);

// app.use(validateSession) // See below for notes on this use
// * using validate session like you see above will protect every route below it. It is important to not have the validateSession above your user controller.

app.use("/movie", movieController);

app.listen(process.env.PORT, function () {
  console.log(`movie app is listening on port ${process.env.PORT}`);
});