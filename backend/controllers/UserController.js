const bcrypt = require("bcrypt")
const User = require('../models/User')
const GetUser = async (req, res) => {
    try {
        if (User.exists({ username: req.params.user })) {
            const user = await User.findOne({ username: req.params.user });
            res.status(200).json(user);
        } else {
            res.status(404).json({message:"User not found."});
        }
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}
const Login = async (req, res) => {
    const {username, pin} = req.body
    if (!username || !pin) {
        return res.status(400).json({ message: "Username and pin are required." });
    }
    if ((String(pin).length != 4) || (pin == null)) {
        return res.status(400).json({message:"Your pin is invalid, try again."})
    }
    if (username.includes(" ")) {
        return res.status(400).json({message:"Space detected in username."})
    }
    if(String(username).length < 5) {
        return res.status(400).json({message:"Your username is too short."})
    }
    else {
        const client = await User.findOne({username})
        if (!client) {
            // SIGNING UP
            const hashedPin = await bcrypt.hash(String(pin), 10)
            const newUser = new User({
              username,
              pin: hashedPin,
              questions: [{
                name: "moncef 👨🏻‍💻",
                question: "hi, you will receive all your questions in this section. ENJOY 🚨❗️",
                IP: "44.188.144.0",
                UA: "XXX"
              }]
            });
            await newUser.save()
            return res.json(newUser)
        }
        // LOGIN
        const match = await bcrypt.compare(String(pin), client.pin)
        if (match) {
            return res.json(client);
        } else {
            res.json({message:"wrong credentials, try again"})
        }
    }
}
module.exports = { GetUser, Login }
