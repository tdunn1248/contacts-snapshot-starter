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

const loginUser = function(user) {
  return db.query(`
    SELECT * FROM
      users
    WHERE
      users.email = $1 &&
      users.password = $2
    RETURNING *
  `),
  [
    user.email,
    user.password
  ]
  .catch(error => error)
}

function confirmSignUpPasswordMatch(password, confirmPassword) {
  return (password === confirmPassword) ? true : false
}

module.exports = {
  signUpUser,
  confirmSignUpPasswordMatch
}
