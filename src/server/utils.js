const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const confirmUserSessionSession = function(request, response, next) {
  console.log('hit');
  if (!request.session.username) {
    response.render('login')
  } else {
    next()
  }
}

module.exports = {renderError, confirmUserSessionSession}
