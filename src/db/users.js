const db = require('./db')

const signUpUser = function(user){
  return db.query(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [
      user.email,
      user.password,
    ])
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
