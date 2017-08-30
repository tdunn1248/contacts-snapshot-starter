const db = require('./db')

const create = function(email, password){
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
      password,
    ])
}

// const getUserPassword = function(email) {
//   return db.query(`
//     SELECT
//       email, password
//     FROM
//       users
//     WHERE
//       users.email = $1
//   `,
//   [
//     email
//   ])
// }

module.exports = {
  create
  // loginUser,
}
