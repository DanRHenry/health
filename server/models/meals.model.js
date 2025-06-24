const mongoose = require("mongoose");

const MealsSchema = new mongoose.Schema({
    breakfast: {
        type: object,
        required: true
    },
    lunch: {
        type: object,
        required: true
    },
    dinner: {
        type: object,
        required: true
    },
    snack: {
        type: object,
        required: true
    },
    userID: {
        type: string,
        required: true
    }
})

module.exports = mongoose.model("Meals", MealsSchema);