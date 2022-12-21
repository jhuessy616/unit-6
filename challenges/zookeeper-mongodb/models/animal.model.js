const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    legNumber: Number,
    predator: Boolean,
})

module.exports = mongoose.model("Animal", AnimalSchema);