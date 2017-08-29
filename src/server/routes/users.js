const DbUsers = require('../../db/users')

const router = require('express').Router()

router.get('/signUp', (request, response, next) => {
  response.status(200).render('signUp')
})

router.post('/signUp', (request, response) => {
  if (!DbUsers.confirmSignUpPasswordMatch(request.body.password, request.body.confirm_password)) {
    response.render('signUp', {error: 'Passwords do not match!'})
  } else {
    DbUsers.signUpUser(request.body)
    .then(person => {response.redirect('/')})
    .catch(error => {
      if (error.code === '23505') {
        response.render('signUp', {error: 'Email is already in use'})
      }
    })
  }
})

router.get('/login', (request, response, next) => {
  response.render('login')
})

router.post('/login', (request, response) => {
  const {email, password} = request.body
  DbUsers.loginUser(email, password)
  .then(user => {
    if(user.length == 0) {
      response.render('login', {error: 'Incorrect Email or Password'})
    } else {
      response.redirect('/')
    }
  })
  .catch(e => console.log('error from login ',e))
})

module.exports = router
