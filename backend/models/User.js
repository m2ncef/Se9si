const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    questions: [{
        name: String,
        question: String,
        time: Number,
        opened: Boolean,
        IP: String,
        UA: String
    }],
    username: String,
    pin: String
})

const User = mongoose.model("User", UserSchema)

module.exports = User