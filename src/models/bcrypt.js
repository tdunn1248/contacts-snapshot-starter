const bcrypt = require('bcrypt')

const hashPassword = function(password) {
  return bcrypt.hash(password, 10)
}

function comparePassword(myPlaintextPassword, hashPassword) {
  return bcrypt.compare(myPlaintextPassword, hashPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}
