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
