const dbUsers = require('./db/users')
const {hashPassword} = require('./bcrypt')
const {assignUserRole} = require('./model-helpers')

const signUp = (email, password) => {
  return hashPassword(password)
  .then(hashPassword => {
    return dbUsers.create(email, hashPassword, assignUserRole(email))
  })
}

const grabUserPassword = (email) => {
  return dbUsers.read(email)
}

module.exports = {
  signUp,
  grabUserPassword,
}
