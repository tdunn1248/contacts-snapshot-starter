const bcrypt = require('bcrypt')

const hashPassword = (password) => {
  return bcrypt.hash(password, 10)
}

const comparePassword = (myPlaintextPassword, hashPassword) => {
  return bcrypt.compare(myPlaintextPassword, hashPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}
