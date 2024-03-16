const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    questions: [{
        name: String,
        question: String,
        time: Number,
        opened: Boolean
    }],
    username: String,
    pin: Number
})

const User = mongoose.model("User", UserSchema)

module.exports = User