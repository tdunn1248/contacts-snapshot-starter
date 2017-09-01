module.exports = {
  assignUserSession: (user, request) => {
    request.session.username = user[0].email
    request.session.role = user[0].role
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
