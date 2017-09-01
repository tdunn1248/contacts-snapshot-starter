function errorHandler (error, request, response, next) {
  // grab error codes and render status
  // response.status(errorCode).render('users/login', {error: error.message})
  response.render('users/login', {error: error.message})
}

module.exports = {errorHandler}
