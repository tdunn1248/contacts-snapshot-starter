const bcrypt = require('bcrypt')

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hash(password, 10)
  },
  ComparePasswords: (myPlaintextPassword, hashPassword) => {
    return bcrypt.compare(myPlaintextPassword, hashPassword).then(isValid => isValid)
  }
}
