const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config()

const { GetUser, Login } = require("./controllers/UserController")
const { PostQuestion } = require("./controllers/QuestionController")

const User = require("./models/User");

const app = express()

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("DB Connected Successfully")
    })
    .catch(() => console.log("Error connection to db"))

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get("/", (req, res) => {
    res.json("Welcome to Se9si API 💘")
})

app.get("/User/:user", GetUser);
app.post("/PostQuestion/:user", PostQuestion);
app.post("/login", Login)

app.listen(3001, () => {
    console.log('Server running at port 3001')
})