const mongoose = require("mongoose");

const MealsSchema = new mongoose.Schema({
    mealName: {
        type: String,
        required: true,
        unique: true
    },
    calories: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: false
    },
    sugars: {
        type: Number,
        required: false
    },
    userID: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Meals", MealsSchema);