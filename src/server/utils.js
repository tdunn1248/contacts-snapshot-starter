const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const confirmUserSessionSession = function(request, response, next) {
  if (!request.session.username) {
    response.render('login')
  } else {
    next()
  }
}

module.exports = {renderError, confirmUserSessionSession}
