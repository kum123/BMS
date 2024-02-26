// This file will coorrrespond to the "user" collection in Mongo

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel