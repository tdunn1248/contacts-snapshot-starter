const db = require('./db')
const bcrypt = require('./bcrypt')

const signUpUser = function(email, password){
  return bcrypt.hash(password).then(hashPassword => {
    return db.query(`
      INSERT INTO
      users (email, password)
      VALUES
      ($1::text, $2::text)
      RETURNING
      *
      `,
      [
        email,
        hashPassword,
      ])
  })
}

const loginUser = function(email, password) {
  return db.query(`
    SELECT
      email, password
    FROM
      users
    WHERE
      users.email = $1 AND
      users.password = $2
  `,
  [
    email,
    password
  ])
}

function confirmSignUpPasswordMatch(password, confirmPassword) {
  return (password === confirmPassword) ? true : false
}

module.exports = {
  signUpUser,
  loginUser,
  confirmSignUpPasswordMatch
}
