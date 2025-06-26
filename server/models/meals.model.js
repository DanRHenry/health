const mongoose = require("mongoose");

const MealsSchema = new mongoose.Schema({
    breakfast: {
        type: Object,
        // blackbox: true,
        required: true
    },
    lunch: {
        type: Object,
        // blackbox: true,
        required: true
    },
    dinner: {
        type: Object,
        // blackbox: true,
        required: true
    },
    snack: {
        type: Object,
        // blackbox: true,
        required: true
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

module.exports = mongoose.model("Meals", MealsSchema);