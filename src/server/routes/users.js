const user = require('../../models/users')
const {comparePasswords} = require('../../models/bcrypt')
const {errorHandler} = require('../error-middleware')

const router = require('express').Router()

router.get('/signup', (request, response, next) => {
  response.status(200).render('users/signup')
})

router.post('/signup', (request, response, next) => {
  const {email, password, confirm_password} = request.body
  if (password !== confirm_password) {
    next(new Error('Please confirm passwords'))
  } else {
    user.signUp(email, password)
    .then(user => {
      request.session.username = user[0].email
      response.redirect('/')
    })
    .catch(next(new Error('Database rejected entry')))
  }
})

router.get('/login', (request, response) => {
  response.render('users/login')
})

router.post('/login', (request, response, next) => {
  const {email, password} = request.body
  user.grabUserPassword(email)
  .then(user => {
    comparePasswords(password, user[0].password)
    .then(validLogin => {
      if (!validLogin) {
        next(new Error('Incorrect Password'))
      } else {
        request.session.username = user[0].email
        response.redirect('/')
      }
    })
  }).catch(next(new Error('Incorrect Email'))) // instead return error from database catch and 
})

router.get('/signout', (request, response) => {
  request.session.username = null
  request.session.cookie.expires = new Date()
  response.redirect('/')
})

router.use(errorHandler)

module.exports = router
