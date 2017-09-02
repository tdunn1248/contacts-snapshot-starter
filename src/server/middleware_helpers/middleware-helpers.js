module.exports = {
  assignUserStatus: (user, request) => {
    request.session.username = user.emai
    request.session.role = user.role
  },
  assignUserSession: (user, request) => {
    request.session.username = user.name
    request.session.role = user.role
  },
  confirmUserSession: (error, request, response, next) => {
    if (!request.session.username) {
      response.render('users/login')
    } else {
      next()
    }
  },
  assignSession: (error, request, response, next) => {
     response.locals.role = request.session.role
     next()
  },
  confirmAdminRole: (error, request,response, next) => {
    if (request.session.role === 'admin') {
      next()
    } else {
      response.redirect('/')
    }
  }
}
