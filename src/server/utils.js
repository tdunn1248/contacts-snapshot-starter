const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const verifyCurrentSession = function(request, response, next) {
  if (!request.session.name) {
    response.render('login')
  } else {
    next()
  }
}

module.exports = {renderError, verifyCurrentSession}
