require("dotenv").config()
const mongoose = require("mongoose");
const connect = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB Connected Successfully")
        })
        .catch(() => console.log("db not linked successfully"))
    } catch {
        console.log('Error connecting to database')
    }
}
module.exports = { connect }