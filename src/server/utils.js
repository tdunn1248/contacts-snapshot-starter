module.exports = {
  obtainUserRole: (request) => {
    if (request.session.role === 'regular') {
      return 'regular'
    }
    if (request.session.role === 'admin') {
      return 'admin'
    }
  }
}
