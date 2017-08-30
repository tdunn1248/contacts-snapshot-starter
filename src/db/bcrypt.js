const bcrypt = require('bcrypt')

function hash(password) {
  return bcrypt.hash(password, 10).then(function(hash) {
    return hash
  });
}

function comparePasswords(myPlaintextPassword, hashPassword) {
  return bcrypt.compare(myPlaintextPassword, hashPassword).then(function(res) {
    return res
});
}
module.exports = {
  hash,
  comparePasswords
}
