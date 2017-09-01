const confirmUserSessionSession = function(request, response, next) {
  if (!request.session.username) {
    response.render('users/login')
  } else {
    next()
  }
}

const assignSession = function(request, response, next) {
   response.locals.role = request.session.role
   next()
}

module.exports = {
  confirmUserSessionSession,
  assignSession
}
