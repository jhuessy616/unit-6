require("dotenv").config();
const express = require("express");
const app = express();
// console.log(process.env);
const userController = require("./controllers/user.controller")
const movieController = require("./controllers/movie.controller")

// ! Connecting to the DB
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/moviedb");
const db = mongoose.connection;

db.once("open", () => console.log("Connected to the DB"));

// something coming through could be a json object
// we need this
app.use(express.json());

app.use("/user", userController);
app.use("/movie", movieController);

app.listen(process.env.PORT, function () {
  console.log(`movie app is listening on port ${process.env.PORT}`);
});