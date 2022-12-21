const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    movieTitle: String,
    movieDescription: String,
    movieYear: Number, 
    isCurrentlyInTheaters: Boolean,
    rating: Number,
})

module.exports = mongoose.model("Movie", MovieSchema); 