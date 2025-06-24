const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    exerciseName: {
        type: string,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    machine: {
        type: string,
        required: true
    },
    date: {
        type: date,
        required: true
    },
    userID: {
        type: string,
        required: true
    }
})

module.exports = mongoose.model("Workout", WorkoutSchema);