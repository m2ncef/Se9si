require("dotenv").config()
const mongoose = require("mongoose");
const connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB Connected Successfully")
        })
        .catch(() => console.log("Error connection to db"))
}
module.exports = { connect }