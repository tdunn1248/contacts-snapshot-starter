const bcrypt = require('bcrypt')

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hash(password, 10)
  },
  comparePassword: (myPlaintextPassword, hashPassword) => {
    return bcrypt.compare(myPlaintextPassword, hashPassword)
  }
}
