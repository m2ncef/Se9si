const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config()

const { GetUser, Login } = require("./controllers/UserController")
const { PostQuestion } = require("./controllers/QuestionController")

const User = require("./models/User");

const app = express()

mongoose.connect("mongodb+srv://ceo:kh051346@cluster0.zyow6tr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("DB Connected Successfully")
    })
    .catch(() => console.log("Error connection to db"))

    app.use(express.json())
    app.use(cors({
        origin: 'https://se9si-api.vercel.app/'
    }));

app.get("/", (req, res) => {
    res.json("Welcome to Se9si API 💘")
})

app.get("/User/:user", GetUser);
app.post("/PostQuestion/:user", PostQuestion);
app.post("/login", Login)

app.listen(3001, () => {
    console.log('Server running at port 3001')
})