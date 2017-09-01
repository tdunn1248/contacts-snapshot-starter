function errorHandler (error, request, response, next) {
  // grab error codes
  // switch case for rendering error messages
  console.log('erro.stack', error.stack);
  // response.status(errorCode).render('users/login', {error: error.message})
  // response.render('users/login', {error: `${errorMessage}`})
}

module.exports = {
  errorHandlexr
}
