function errorHandler (error, request, response, next) {
  // grab error codes
  // switch case for rendering error messages
  
  // response.status(errorCode).render('users/login', {error: error.message})
  response.render('users/login', {error: error.message})
}

module.exports = {errorHandler}
