const dbUsers = require('./db/users')
const bcrypt = require('./bcrypt')

function signUp(email, password) {
  let role 
  return bcrypt.hash(password).then(hashPassword => {
    if (confirmAdminStatus(email)) {
      role = 'admin'
    } else {
      role = 'regular'
    }
    return dbUsers.create(email, hashPassword, role)
  })
}

function grabUserPassword(email) {
  return dbUsers.read(email)
}

function confirmAdminStatus(email) {
  if (email.includes('.admin')) {
    return true
  } else {
    return false
  }
}

module.exports = {
  signUp,
  grabUserPassword,
}
