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
      .then(person => {console.log('added this dude-->', person)})
      .catch(error => console.log(error))
  }
})

module.exports = router
