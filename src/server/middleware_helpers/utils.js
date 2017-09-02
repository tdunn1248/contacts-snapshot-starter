module.exports = {
  assignUserStatus: (user, request) => {
    request.session.username = user[0].email
    request.session.role = user[0].role
  },
  assignUserSession: (user, request) => {
    request.session.username = user.name
    request.session.role = user.role
  },
  obtainUserRole: (request) => {
    if (request.session.role === 'regular') {
      return 'regular'
    }
    if (request.session.role === 'admin') {
      return 'admin'
    }
  }
}
