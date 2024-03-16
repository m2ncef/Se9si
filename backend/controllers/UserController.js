const User = require('../models/User')
const { generateUserID } = require("../utils/generateUserID")
const GetUsers = async (req, res) => {
    const Users = await User.find()
    res.json(Users)
}
const GetUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.user });
        if (!(User.exists({ username: req.params.user }))) {
            res.status(404).json("User not found.");
        }
        res.json(user);
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}
const SignUp = async (req, res) => {
    const newUser = new User();
    if (await User.exists({ username: req.body.username })) {
        res.json({
            message: "This username already exists, try logging in."
        })
        return;
    }
    newUser.username = req.body.username;
    if ((String(req.body.pin).length != 4) || (req.body.pin == null || "")) {
        res.json("your pin is invalid, try again.")
        return;
    }
    newUser.pin = req.body.pin;
    newUser.questions = [
        {
            name: "Se9si 💘",
            question: "You will receive all your questions in this section."
        }
    ]
    await newUser.save()
    res.json({
        message: "Successfully signed up.",
        data: newUser
    })
}
const Login = async (req, res) => {
    if (!req.body.username) {
        res.json("username required")
        return
    }
    else if (!req.body.pin) {
        res.json("pin required")
        return
    }
    else {
        const client = await User.findOne({ username: req.body.username })
        if (!client) {
            // SIGNING THE USER UP !!
            const newUser = new User();
            if (req.body.username.includes(" ")) {
                res.status(400).json("space detected")
                return
            } else {
                newUser.username = req.body.username;
            }
            if ((String(req.body.pin).length != 4) || (req.body.pin == null || "")) {
                res.json("your pin is invalid, try again.")
                return;
            }
            newUser.pin = req.body.pin;
            newUser.questions = [
                {
                    name: "Se9si 💘",
                    question: "You will receive all your questions in this section."
                }
            ]
            await newUser.save()
            res.json("Successfully signed.")
            return
        }
        // LOGIN !!
        if (req.body.pin == client.pin) {
            res.json("login successfully")
        } else {
            res.json("wrong credentials, try again")
        }
    }
}
module.exports = { GetUser, Login }