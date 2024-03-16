const mongoose = require("mongoose");
const connect = () => {
    mongoose.connect(`mongodb+srv://ceo:kh051346@cluster0.zyow6tr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        .then(() => {
            console.log("DB Connected Successfully")
        })
        .catch(() => console.log("Error connection to db"))
}
module.exports = { connect }