const dbUser = require('./db/users')
const bcrypt = require('./bcrypt')

function signUp(email, password) {
  return bcrypt.hash(password).then(hashPassword => {
    return dbUser.create(email,hashPassword)
  })
}



// .then(userInfo => {
//   return bcrypt.comparePasswords(password, userInfo[0].password)
//     .then(res => {
//       return dbResponse = {
//         name : userInfo[0].email,
//         validLogin: res
//       }
//     })
// }).catch(e => console.log('from database', e))

module.exports = {
  signUp
}
