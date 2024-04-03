const express = require("express");

const auth = require("./middleware/auth")
const { connect } = require("./utils/connect");
const { GetUser, Login } = require("./controllers/UserController");
const { PostQuestion } = require("./controllers/QuestionController");

const app = express();

connect();

app.use(express.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "se9si.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get("/", (req, res) => {
    res.json("Welcome to Se9si API 💘")
})
app.get("/User/:user", auth, GetUser);
app.post("/PostQuestion/:user", PostQuestion);
app.post("/login", Login)

app.listen(9999, () => {
    console.log('Server running')
})
