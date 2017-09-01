const dbUsers = require('./db/users')
const {hashPassword} = require('./model_helpers/bcrypt')
const {assignUserRole} = require('./model_helpers/model-helpers')

const signUp = (email, password) => {
  return hashPassword(password).then(hashPassword => {
    return dbUsers.create(email, hashPassword, assignUserRole(email))
  })
}

const grabUserPassword = (email) => {
  return dbUsers.read(email)
}

module.exports = {
  signUp,
  grabUserPassword
}
