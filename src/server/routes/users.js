const DbUsers = require('../../db/users')

const router = require('express').Router()

router.get('/signUp', (request, response, next) => {
  response.status(200).render('signUp')
})

router.post('/signUp', (request, response, next) => {
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

module.exports = router
