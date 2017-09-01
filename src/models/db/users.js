const db = require('./db')

const create = function(email, password, role){
  return db.query(`
    INSERT INTO
    users (email, password, role)
    VALUES
    ($1::text, $2::text, $3::text)
    RETURNING
    email, password
    `,
    [
      email,
      password,
      role
    ])
    .catch(error => error)
}

const readPassword = function(email) {
  return db.query(`
    SELECT email, password
    FROM users
    WHERE email = $1
  `,
  [
    email
  ])
  .catch(error => error) // t
}

// CHECK USER STATUS
// const readUserRole = function(email) {
//   return db.query(`
//     SELECT
//       role
//     FROM
//       users
//     WHERE
//       email = $1
//   `,
//   [
//     email
//   ])
// }
//
// readUserRole('td').then(console.log)

module.exports = {
  create,
  readPassword
}
