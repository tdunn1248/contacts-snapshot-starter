const dbUsers = require('./db/users')
const {hashPassword} = require('./model_helpers/bcrypt')
const {assignUserRole} = require('./model_helpers/model-helpers')
const {ComparePasswords} = require('./model_helpers/bcrypt')

const Signup = (email, password) => {
  return hashPassword(password).then(hashPassword => {
    return dbUsers.create(email, hashPassword, assignUserRole(email)).then(user => user)
  })
}

const ConfirmPassword = (email, password) => {
  return dbUsers.read(email).then(user => {
    return ComparePasswords(password, user[0].password).then(isValid => {isValid
      return user = {
        name : user[0].email,
        role: user[0].role,
        confirmed : isValid
      }
    })
  })
}



module.exports = {
  Signup,
  ConfirmPassword
}
