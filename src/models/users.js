const DBUSERS = require('./db/users')
const bcrypt = require('./bcrypt')

function signUp(email, password) {
  return bcrypt.hash(password).then(hashPassword => {
    return DBUSERS.create(email,hashPassword)
  })
}

function confirmLogin(email,password) {
  return DBUSERS.readPassword(email).then(userInfo => {
    if (userInfo.length === 0) {
      return new Error('No email found')
    } else {
      return bcrypt.comparePasswords(password, userInfo[0].password)
      .then(res => {
        return dbResponse = {
          name : userInfo[0].email,
          validLogin: res
        }
      })
    }
  })
}


module.exports = {
  signUp,
  confirmLogin
}
