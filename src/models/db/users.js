const db = require('./db')

const create = (email, password, role) => {
  return db.query(`
    INSERT INTO
    users (email, password, role)
    VALUES
    ($1::text, $2::text, $3::text)
    RETURNING
    email, password, role
    `, [email, password, role])
    .catch(error => error)
}

const read = (email) => {
  return db.query(`
    SELECT email, password, role
    FROM users
    WHERE email = $1
  `, [email])
  .catch(error => error)
}

module.exports = {
  create,
  read
}
