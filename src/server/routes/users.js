const user = require('../../models/users')
const {comparePassword} = require('../../models/bcrypt')
const {errorHandler} = require('../error-middleware')
const {assignUserSession} = require('../route-helpers')
const router = require('express').Router()

router.get('/signup', (request, response, next) => {
  response.status(200).render('users/signup')
})

router.post('/signup', (request, response, next) => {
  const {email, password, confirm_password} = request.body
  if (password !== confirm_password) {
    next(new Error('Passwords do not match'))
  } else {
    user.signUp(email, password)
    .then(user => {
      assignUserSession(user, request)
      response.redirect('/')
    })
    .catch(error => next(error))
  }
})

router.get('/login', (request, response) => {
  response.render('users/login')
})

router.post('/login', (request, response, next) => {
  const {email, password} = request.body
  user.grabUserPassword(email)
  .then(user => {
    comparePassword(password, user[0].password)
    .then(validLogin => {
      if (!validLogin) { next(new Error('Incorrect Password'))}
      else {
        assignUserSession(user, request)
        response.redirect('/')
      }
    })
  })
  .catch(error => next(error))
})

router.get('/signout', (request, response) => {
  request.session.username = null
  request.session.cookie.expires = new Date()
  response.redirect('/')
})

router.use(errorHandler)

module.exports = router
