const confirmUserSessionSession = (error, request, response, next) => {
  if (!request.session.username) {
    response.render('users/login')
  } else {
    next()
  }
}

const assignSession = (error, request, response, next) => {
   response.locals.role = request.session.role
   next()
}

const obtainUserRole = (request) => {
  if (request.session.role === 'regular') {
    return 'regular'
  }
  if (request.session.role === 'admin') {
    return 'admin'
  }
}

const confirmAdminRole = (error, request,response, next) => {
  if (request.session.role === 'admin') {
    next()
  } else {
    response.redirect('/')
  }
}

module.exports = {
  confirmUserSessionSession,
  assignSession,
  obtainUserRole,
  confirmAdminRole
}
