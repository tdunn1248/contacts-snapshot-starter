const bcrypt = require('bcrypt')

const hashPassword = function(password) {
  return bcrypt.hash(password, 10)
}

function comparePasswords(myPlaintextPassword, hashPassword) {
  return bcrypt.compare(myPlaintextPassword, hashPassword)
}

module.exports = {
  hashPassword,
  comparePasswords
}
