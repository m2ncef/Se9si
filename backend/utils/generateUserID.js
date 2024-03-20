const generateUserID = () => {
    var pass = "";
    var chars = "AZERTYUIOPQSDFGHJKLMWXCVBN1234567890azertyuiopqsdfghjklmwxcvbn"
    for (i = 0; i < 8; i++) {
        pass += chars.charAt(Math.floor(Math.random() * 60))
    }
    return pass
}
module.exports = { generateUserID }