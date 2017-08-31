const db = require('./db')

const create = function(email, password, admin){
  return db.query(`
    INSERT INTO
    users (email, password, admin)
    VALUES
    ($1::text, $2::text, $3::boolean)
    RETURNING
    email, password
    `,
    [
      email,
      password,
      admin
    ])
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
}

module.exports = {
  create,
  readPassword
}
