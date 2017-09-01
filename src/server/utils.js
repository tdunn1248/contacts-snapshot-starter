const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

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

module.exports = {renderError, confirmUserSessionSession, assignSession}
