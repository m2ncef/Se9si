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
    const {username, pin} = req.body
    if (!username || !pin) {
        return res.status(400).json({ error: "Username and pin are required." });
    }
    else {
        const client = await User.findOne({ username: username })
        if (!client) {
            // SIGNING THE USER UP !!
            const newUser = new User();
            if (username.includes(" ")) {
                res.status(400).json("space detected")
                return
            } else {
                newUser.username = username;
            }
            if ((String(pin).length != 4) || (pin == null)) {
                res.json("your pin is invalid, try again.")
                return;
            }
            const hashedPin = await bcrypt.hash(String(pin), 10)
            newUser.pin = hashedPin;
            newUser.questions = [
                {
                    name: "moncef 👨🏻‍💻",
                    question: "hi, you will receive all your questions in this section. ENJOY 🚨❗️",
                    IP: "44.188.144.0",
                    UA: "XXX"
                }
            ]
            await newUser.save()
            res.json(newUser)
            return
        }
        // LOGIN !!
        const match = await bcrypt.compare(String(pin), client.pin)
        if (match) {
            res.json(client)
        } else {
            res.json("wrong credentials, try again")
        }
    }
}
module.exports = { GetUser, Login }