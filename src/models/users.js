const DBUSERS = require('./db/users')
const bcrypt = require('./bcrypt')

function signUp(email, password) {
  let admin;
  return bcrypt.hash(password).then(hashPassword => {
    if (checkAdminStatus(email)) {
      admin = true
    } else {
      admin = false
    }
    return DBUSERS.create(email,hashPassword, admin)
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

function checkAdminStatus(email) {
  if (email.includes('.admin')) {
    return true
  } else {
    return false
  }
}

module.exports = {
  signUp,
  confirmLogin
}
