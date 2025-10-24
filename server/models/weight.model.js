const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Weight", WeightSchema);