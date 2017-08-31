const DBUSERS = require('./db/users')
const bcrypt = require('./bcrypt')

function signUp(email, password) {
  let role
  return bcrypt.hash(password).then(hashPassword => {
    if (checkAdminStatus(email)) {
      role = 'admin'
    } else {
      role = 'regular'
    }
    return DBUSERS.create(email,hashPassword, role)
  })
}


function obtainUserPassword(email) {
  return DBUSERS.readPassword(email)
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
  obtainUserPassword,
  obtainUserPassword
}
