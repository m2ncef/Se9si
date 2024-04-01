const jwt = require('jsonwebtoken');

module.exports = (user)=>{
  const token = jwt.sign(user, process.env.SECRET_TOKEN)
  return token
}
