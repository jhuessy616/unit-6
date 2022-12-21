const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//! create endpoint
router.post("/create", async (req, res) => {
  try {
    // 1. create a new object based off the Model Schema (ie User)

    const user = new User({
      username: req.body.username,
      // hashing password
      password: bcrypt.hashSync(req.body.password, 10),
    });

    // mongoose has built in .save, writing the file
    const newUser = await user.save();
    //   add token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      user: newUser,
      message: "Success:User Created",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! login endpoint
router.post("/login", async (req, res) => {
  try {
    // 1. Check our database to see if the email that is supplied in the body is found in our database
    const matchedUser = await User.findOne({ username: req.body.username });

    // We don't find a user we exit and throw an ERROR
    if (!matchedUser) {
      throw new Error("User Not Found");
    }
    // 2. if we found a document (aka record) in the database validate that password matches otherwise send a response that we don't have a match
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      matchedUser.password
    );
    // Passwords do not match we throw an ERROR
    if (!isPasswordMatch) {
      throw new Error("Incorrect Password");
    }
    // Passed all our checks
    const token = jwt.sign({ id: matchedUser._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 24,
    });
    res
      .status(202)
      .json({
        matchedUser: matchedUser,
        message: "Successful Login",
        token: token,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
