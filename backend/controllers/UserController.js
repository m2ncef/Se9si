const bcrypt = require("bcrypt")
const User = require('../models/User')
const { generateUserID } = require("../utils/generateUserID")
const GetUsers = async (req, res) => {
    const Users = await User.find()
    res.json(Users)
}
const GetUser = async (req, res) => {
    try {
        if (User.exists({ username: req.params.user })) {
            const user = await User.findOne({ username: req.params.user });
            res.status(200).json(user);
        } else {
            res.status(404).json("User not found.");
        }
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
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
            if ((String(req.body.pin).length != 4) || (req.body.pin == null)) {
                res.json("your pin is invalid, try again.")
                return;
            }
            const hashedPin = await bcrypt.hash(req.body.pin, 10)
            newUser.pin = hashedPin;
            newUser.questions = [
                {
                    name: "moncef 👨🏻‍💻",
                    question: "hi, you will receive all your questions in this section. ENJOY 🚨❗️",
                    IP: "0.0.0.0",
                    UA: "XXX"
                }
            ]
            await newUser.save()
            res.json(newUser)
            return
        }
        // LOGIN !!
        const match = bcrypt.compare(req.body.pin, client.pin)
        if (match) {
            res.json(client)
        } else {
            res.json("wrong credentials, try again")
        }
    }
}
module.exports = { GetUser, Login }