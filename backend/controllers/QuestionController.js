const User = require("../models/User")

const PostQuestion = async (req, res) => {
    if (!(req.body.name && req.body.question)) {
        res.status(400).json("Missing data.")
        return
    }
    const user = await User.findOne({ username: req.params.user });
    user.questions = user.questions.concat({
        name: req.body.name,
        question: req.body.question,
        time: new Date().getTime(),
        opened: false
    })
    await user.save();
    res.json(user)
}
module.exports = { PostQuestion }