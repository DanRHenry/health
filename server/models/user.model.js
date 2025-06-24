const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    family: {
        type: String,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    weight: {
        type: Array,
        required: false
    },
    age: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model("User", UserSchema);