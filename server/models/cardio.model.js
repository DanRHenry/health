const mongoose = require("mongoose");

const CardioSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    machine: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Cardio", CardioSchema);