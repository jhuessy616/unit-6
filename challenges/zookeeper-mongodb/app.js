require("dotenv").config();
const express = require('express');
const app = express();
const userController = require("./controllers/user.controller");
const AnimalController = require("./controllers/animal.controller");

// connect to database
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/zookeeper");
const db = mongoose.connection;
// check to see the paths are working and seeing which database we are connected to 
db.once("open", () => console.log("Connected to the database " +db.name));

app.use(express.json());

app.use("/user", userController);

app.use("/animal", AnimalController);

app.listen(process.env.PORT, function () {
  console.log(`zookeeper app is listening on port ${process.env.PORT}`);
});