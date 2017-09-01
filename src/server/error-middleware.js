function userErrorHandler (error, request, response, next) {
  switch(error.message) {
    case ('Passwords do not match'):
      console.log(error.stack)
      response.status(301).render('users/signup', {error: error.message})
      break
    case ('Incorrect Password') :
      console.log(error.stack)
      response.status(301).render('users/login', {error: error.message})
      break
    case ('No User Found') :
      console.log(error.stack);
      response.status(301).render('users/login', {error: error.message})
      break
    case ('Failed to Sign Up User') :
      console.log(error.stack);
      response.status(301).render('users/login', {error: error.message})
      break
  }
}

const contactErrorHandler = (error, request, response, next) => {
  console.log('contact Error: ', error.stack)
}

module.exports = {
  userErrorHandler,
  contactErrorHandler
}
