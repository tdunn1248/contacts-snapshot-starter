const dbUsers = require('./db/users')
const {hashPassword} = require('./bcrypt')
const {assignUserRole} = require('./model-helpers')

function signUp(email, password) {
  return dbUsers.create(email, hashPassword(password), assignUserRole(email))
}

function grabUserPassword(email) {
  return dbUsers.read(email)
}

module.exports = {
  signUp,
  grabUserPassword,
}
