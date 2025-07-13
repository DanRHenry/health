const mongoose = require("mongoose");

const DailyMealsSchema = new mongoose.Schema({
    mealName: {
        type: String,
        required: true,
        unique: true
    },
    mealTime: {
        type: String,
        required: true
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
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("DailyMeals", DailyMealsSchema);