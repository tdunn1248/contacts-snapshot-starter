const bcrypt = require('bcrypt')

function hash(password) {
  return bcrypt.hash(password, 10)
}

function comparePasswords(myPlaintextPassword, hashPassword) {
  return bcrypt.compare(myPlaintextPassword, hashPassword)
}

module.exports = {
  hash,
  comparePasswords
}
