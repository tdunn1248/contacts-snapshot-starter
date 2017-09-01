module.exports = {
  assignUserSession: (user, request) => {
    request.session.username = user[0].email
    request.session.role = user[0].role
  }
}
